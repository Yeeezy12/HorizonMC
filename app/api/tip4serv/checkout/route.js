import { NextResponse } from 'next/server';

const TIP4SERV_API = 'https://api.tip4serv.com/v1';
const STORE_ID = '22965';

const DEFAULT_SITE_URL =
  'https://horizonmc-store-2gkr6g0mg-horizon-mc-web.vercel.app';

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

const PRODUCT_ALIASES = {
  vip: ['vip'],
  vipplus: ['vipplus', 'vip+', 'vip plus', 'vip-plus'],
  mvp: ['mvp'],
  nova: ['nova'],
  vortex: ['vortex', 'vortes'],
  eterno: ['eterno'],
  divino: ['divino'],

  'proteccion-de-clan': [
    'protecciondeclan',
    'piedradeprotecciondeclan200x200',
    'proteccion200',
    'proteccion-200'
  ]
};

function getPossibleNames(localId, localName) {
  const normalizedId = normalizeText(localId);
  const normalizedName = normalizeText(localName);

  const aliases = PRODUCT_ALIASES[localId] || [];

  return [
    normalizedId,
    normalizedName,
    ...aliases.map(normalizeText)
  ].filter(Boolean);
}

function findTip4ServProduct(products, localId, localName) {
  const possibleNames = getPossibleNames(
    localId,
    localName
  );

  let found = products.find((product) => {
    const productName = normalizeText(product?.name);
    const productSlug = normalizeText(product?.slug);
    const productTitle = normalizeText(product?.title);

    return (
      possibleNames.includes(productName) ||
      possibleNames.includes(productSlug) ||
      possibleNames.includes(productTitle)
    );
  });

  if (found) {
    return found;
  }

  found = products.find((product) => {
    const values = [
      product?.name,
      product?.slug,
      product?.title
    ]
      .map(normalizeText)
      .filter(Boolean);

    return values.some((value) =>
      possibleNames.some(
        (possibleName) =>
          value === possibleName ||
          value.includes(possibleName) ||
          possibleName.includes(value)
      )
    );
  });

  return found || null;
}

function extractProducts(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.data?.products)) {
    return data.data.products;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
}

export async function POST(request) {
  try {
    // =========================================================
    // API KEY
    // =========================================================

    const apiKey = process.env.TIP4SERV_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Falta TIP4SERV_API_KEY en las variables de entorno de Vercel.'
        },
        {
          status: 500
        }
      );
    }

    // =========================================================
    // DATOS DEL CLIENTE
    // =========================================================

    const body = await request.json();

    const cart = Array.isArray(body?.cart)
      ? body.cart
      : [];

    const minecraftUsername = String(
      body?.minecraft_username || ''
    ).trim();

    const email = String(
      body?.email || ''
    ).trim();

    if (!cart.length) {
      return NextResponse.json(
        {
          error: 'El carrito está vacío.'
        },
        {
          status: 400
        }
      );
    }

    if (!minecraftUsername) {
      return NextResponse.json(
        {
          error: 'Falta el nombre de Minecraft.'
        },
        {
          status: 400
        }
      );
    }

    // =========================================================
    // OBTENER PRODUCTOS DE TIP4SERV
    // =========================================================

    const productsResponse = await fetch(
      `${TIP4SERV_API}/store/products?store=${encodeURIComponent(
        STORE_ID
      )}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json'
        },
        cache: 'no-store'
      }
    );

    const productsRaw =
      await productsResponse.text();

    let productsData = null;

    try {
      productsData = productsRaw
        ? JSON.parse(productsRaw)
        : null;
    } catch {
      productsData = null;
    }

    if (!productsResponse.ok) {
      console.error(
        'TIP4SERV PRODUCTS STATUS:',
        productsResponse.status
      );

      console.error(
        'TIP4SERV PRODUCTS RESPONSE:',
        productsRaw
      );

      return NextResponse.json(
        {
          error:
            'No se pudieron obtener los productos de Tip4Serv.',

          status:
            productsResponse.status,

          response:
            productsData ||
            productsRaw.slice(0, 2000)
        },
        {
          status: 502
        }
      );
    }

    const tip4servProducts =
      extractProducts(productsData);

    console.log(
      'TIP4SERV PRODUCTS FOUND:',
      tip4servProducts.length
    );

    if (!tip4servProducts.length) {
      return NextResponse.json(
        {
          error:
            'Tip4Serv respondió correctamente, pero no devolvió ningún producto para esta tienda.'
        },
        {
          status: 502
        }
      );
    }

    // =========================================================
    // BUSCAR PRODUCTOS DEL CARRITO
    // =========================================================

    const checkoutProducts = [];

    for (const cartProduct of cart) {
      const localId = String(
        cartProduct?.id ?? ''
      ).trim();

      const localName = String(
        cartProduct?.name ?? ''
      ).trim();

      const quantity = Number(
        cartProduct?.quantity || 1
      );

      console.log(
        'BUSCANDO PRODUCTO:',
        {
          localId,
          localName
        }
      );

      const foundProduct =
        findTip4ServProduct(
          tip4servProducts,
          localId,
          localName
        );

      if (!foundProduct) {
        console.error(
          'PRODUCTO NO ENCONTRADO:',
          {
            localId,
            localName
          }
        );

        return NextResponse.json(
          {
            error:
              `No se encontró el producto "${localName || localId}" en Tip4Serv.`,

            local_product: {
              id: localId,
              name: localName
            },

            available_products:
              tip4servProducts.map(
                (product) => ({
                  id:
                    product?.id ??
                    product?.product_id,

                  name:
                    product?.name ??
                    product?.title,

                  slug:
                    product?.slug
                })
              )
          },
          {
            status: 400
          }
        );
      }

      const tip4servProductId =
        foundProduct?.id ??
        foundProduct?.product_id;

      if (
        tip4servProductId === undefined ||
        tip4servProductId === null ||
        tip4servProductId === ''
      ) {
        return NextResponse.json(
          {
            error:
              `El producto "${localName || localId}" existe en Tip4Serv, pero no tiene un product_id válido.`,

            product:
              foundProduct
          },
          {
            status: 400
          }
        );
      }

      // =======================================================
      // PRODUCTO NORMAL
      //
      // NO donation_amount
      // NO server_selection
      // NO discord_id
      // =======================================================

      checkoutProducts.push({
        product_id:
          Number(tip4servProductId),

        type:
          'addtocart',

        quantity:
          Number.isFinite(quantity) &&
          quantity > 0
            ? quantity
            : 1,

        custom_fields:
          {}
      });
    }

    // =========================================================
    // URL DE LA WEB
    // =========================================================

    const siteUrl = String(
      process.env.NEXT_PUBLIC_SITE_URL ||
      DEFAULT_SITE_URL
    )
      .trim()
      .replace(/\/$/, '');

    // =========================================================
    // CHECKOUT
    //
    // IMPORTANTE:
    // NO HAY discord_id AQUÍ
    // =========================================================

    const checkoutBody = {
      products:
        checkoutProducts,

      user: {
        minecraft_username:
          minecraftUsername,

        ...(email
          ? {
              email: email
            }
          : {})
      },

      redirect_success_checkout:
        `${siteUrl}/?tip4serv=success`,

      redirect_canceled_checkout:
        `${siteUrl}/?tip4serv=cancelled`,

      redirect_pending_checkout:
        `${siteUrl}/?tip4serv=pending`
    };

    console.log(
      'TIP4SERV CHECKOUT REQUEST:',
      JSON.stringify(
        checkoutBody,
        null,
        2
      )
    );

    // =========================================================
    // ENVIAR CHECKOUT
    // =========================================================

    const checkoutResponse =
      await fetch(
        `${TIP4SERV_API}/store/checkout?store=${encodeURIComponent(
          STORE_ID
        )}&redirect=true`,
        {
          method: 'POST',

          headers: {
            Authorization:
              `Bearer ${apiKey}`,

            'Content-Type':
              'application/json',

            Accept:
              'application/json'
          },

          body:
            JSON.stringify(
              checkoutBody
            ),

          cache:
            'no-store'
        }
      );

    const checkoutRaw =
      await checkoutResponse.text();

    let checkoutData = null;

    try {
      checkoutData = checkoutRaw
        ? JSON.parse(checkoutRaw)
        : null;
    } catch {
      checkoutData = null;
    }

    console.log(
      'TIP4SERV CHECKOUT STATUS:',
      checkoutResponse.status
    );

    console.log(
      'TIP4SERV CHECKOUT RESPONSE:',
      checkoutRaw
    );

    // =========================================================
    // ERROR
    // =========================================================

    if (!checkoutResponse.ok) {
      const errorMessage =
        checkoutData?.error?.message ||
        checkoutData?.error ||
        checkoutData?.message ||
        checkoutRaw ||
        `Tip4Serv respondió con ${checkoutResponse.status}.`;

      return NextResponse.json(
        {
          error:
            String(errorMessage),

          response:
            checkoutData ||
            checkoutRaw.slice(0, 2000)
        },
        {
          status:
            checkoutResponse.status
        }
      );
    }

    // =========================================================
    // URL DE PAGO
    // =========================================================

    const checkoutUrl =
      checkoutData?.url ||
      checkoutData?.data?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        {
          error:
            'Tip4Serv aceptó el checkout, pero no devolvió la URL de pago.',

          response:
            checkoutData ||
            checkoutRaw.slice(0, 2000)
        },
        {
          status: 502
        }
      );
    }

    // =========================================================
    // RESPUESTA
    // =========================================================

    return NextResponse.json({
      url:
        checkoutUrl
    });

  } catch (error) {
    console.error(
      'TIP4SERV CHECKOUT ERROR:',
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo iniciar el checkout de Tip4Serv.'
      },
      {
        status: 500
      }
    );
  }
}