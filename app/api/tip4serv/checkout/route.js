import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TIP4SERV_API =
  'https://api.tip4serv.com/v1';

const STORE_ID = '22965';

const DEFAULT_SITE_URL =
  'https://horizonmc-store-2gkr6g0mg-horizon-mc-web.vercel.app';

/*
 * Obtiene los productos de tu tienda de Tip4Serv.
 *
 * Esto nos permite convertir los IDs internos
 * de tu página, por ejemplo:
 *
 * vip
 * spawner-de-golem
 * spawner-de-blaze
 *
 * en los product_id numéricos reales
 * de Tip4Serv.
 */
async function getTip4ServProducts(apiKey) {
  const response = await fetch(
    `${TIP4SERV_API}/store/products?store=${encodeURIComponent(
      STORE_ID
    )}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      cache: 'no-store'
    }
  );

  const contentType =
    response.headers.get(
      'content-type'
    ) || '';

  const rawResponse =
    await response.text();

  let data = null;

  try {
    data = JSON.parse(rawResponse);
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      data?.error?.message ||
      data?.error ||
      data?.message ||
      rawResponse ||
      `Tip4Serv respondió con ${response.status}.`;

    throw new Error(
      `Error obteniendo productos de Tip4Serv: ${errorMessage}`
    );
  }

  if (!data) {
    throw new Error(
      `Tip4Serv devolvió una respuesta no válida al obtener los productos (${response.status}).`
    );
  }

  return data;
}

/*
 * Busca todos los productos dentro de la
 * respuesta de Tip4Serv.
 *
 * La API puede devolverlos directamente
 * en "products" o dentro de "data".
 */
function extractProducts(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    Array.isArray(data?.products)
  ) {
    return data.products;
  }

  if (
    Array.isArray(data?.data)
  ) {
    return data.data;
  }

  if (
    Array.isArray(data?.data?.products)
  ) {
    return data.data.products;
  }

  return [];
}

/*
 * Normaliza un texto para poder comparar
 * nuestros IDs internos con los datos de
 * Tip4Serv.
 */
function normalize(value) {
  return String(
    value || ''
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export async function POST(request) {
  try {
    /*
     * API KEY
     */
    const apiKey = String(
      process.env.TIP4SERV_API_KEY || ''
    ).trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Falta TIP4SERV_API_KEY en las variables de entorno.'
        },
        {
          status: 500
        }
      );
    }

    /*
     * LEER BODY
     */
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            'La petición recibida no contiene JSON válido.'
        },
        {
          status: 400
        }
      );
    }

    /*
     * CARRITO
     */
    const cart = Array.isArray(
      body?.cart
    )
      ? body.cart
      : [];

    if (!cart.length) {
      return NextResponse.json(
        {
          error:
            'El carrito está vacío.'
        },
        {
          status: 400
        }
      );
    }

    /*
     * DATOS DEL USUARIO
     */
    const minecraftUsername =
      String(
        body?.minecraft_username ||
          ''
      ).trim();

    const email =
      String(
        body?.email || ''
      ).trim();

    /*
     * El usuario debe estar identificado
     * para poder entregar correctamente
     * los productos de Minecraft.
     */
    if (!minecraftUsername) {
      return NextResponse.json(
        {
          error:
            'Falta el nombre de Minecraft.'
        },
        {
          status: 400
        }
      );
    }

    /*
     * OBTENER PRODUCTOS REALES
     * DE TIP4SERV
     */
    const tip4servData =
      await getTip4ServProducts(
        apiKey
      );

    const tip4servProducts =
      extractProducts(
        tip4servData
      );

    if (
      !tip4servProducts.length
    ) {
      return NextResponse.json(
        {
          error:
            'No se pudieron obtener los productos de la tienda de Tip4Serv.'
        },
        {
          status: 502
        }
      );
    }

    /*
     * CONVERTIR LOS PRODUCTOS
     *
     * Tu página usa:
     *
     * id: "vip"
     * id: "spawner-de-golem"
     *
     * Tip4Serv necesita:
     *
     * product_id: 87
     */
    const products = [];

    for (
      const item of cart
    ) {
      const localId =
        String(
          item?.id || ''
        ).trim();

      if (!localId) {
        throw new Error(
          'Hay un producto del carrito sin ID.'
        );
      }

      /*
       * Primero intentamos encontrar
       * el producto por slug/id.
       */
      let tip4servProduct =
        tip4servProducts.find(
          (product) => {
            const productId =
              normalize(
                product?.id
              );

            const productSlug =
              normalize(
                product?.slug
              );

            const productName =
              normalize(
                product?.name
              );

            return (
              productId ===
                normalize(
                  localId
                ) ||
              productSlug ===
                normalize(
                  localId
                ) ||
              productName ===
                normalize(
                  localId
                )
            );
          }
        );

      /*
       * Si el ID interno ya es numérico,
       * también lo aceptamos.
       */
      if (
        !tip4servProduct &&
        /^\d+$/.test(
          localId
        )
      ) {
        tip4servProduct =
          tip4servProducts.find(
            (product) =>
              String(
                product?.id
              ) === localId
          );
      }

      if (
        !tip4servProduct
      ) {
        throw new Error(
          `No encontramos el producto "${localId}" en Tip4Serv.`
        );
      }

      const productId =
        Number(
          tip4servProduct.id
        );

      if (
        !Number.isFinite(
          productId
        )
      ) {
        throw new Error(
          `El producto "${localId}" no tiene un product_id numérico válido en Tip4Serv.`
        );
      }

      products.push({
        product_id:
          productId,

        type:
          'addtocart',

        quantity:
          Number(
            item?.quantity
          ) > 0
            ? Number(
                item.quantity
              )
            : 1,

        custom_fields: {},

        donation_amount:
          0
      });
    }

    /*
     * URL DE LA WEB
     */
    const siteUrl =
      String(
        process.env
          .NEXT_PUBLIC_SITE_URL ||
          DEFAULT_SITE_URL
      )
        .trim()
        .replace(
          /\/$/,
          ''
        );

    /*
     * BODY OFICIAL DEL CHECKOUT
     *
     * Los identificadores del comprador
     * van dentro de "user".
     */
    const checkoutBody = {
      products,

      user: {
        email:
          email,

        minecraft_username:
          minecraftUsername
      },

      redirect_success_checkout:
        `${siteUrl}/?tip4serv=success`,

      redirect_canceled_checkout:
        `${siteUrl}/?tip4serv=cancelled`,

      redirect_pending_checkout:
        `${siteUrl}/?tip4serv=pending`
    };

    console.log(
      'TIP4SERV CHECKOUT PRODUCTS:',
      products
    );

    console.log(
      'TIP4SERV CHECKOUT USER:',
      {
        email,
        minecraft_username:
          minecraftUsername
      }
    );

    /*
     * CREAR CHECKOUT
     */
    const response =
      await fetch(
        `${TIP4SERV_API}/store/checkout?store=${encodeURIComponent(
          STORE_ID
        )}&redirect=true`,
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json',

            Accept:
              'application/json',

            Authorization:
              `Bearer ${apiKey}`
          },

          body:
            JSON.stringify(
              checkoutBody
            ),

          cache:
            'no-store'
        }
      );

    /*
     * LEER RESPUESTA
     */
    const contentType =
      response.headers.get(
        'content-type'
      ) || '';

    const rawResponse =
      await response.text();

    console.log(
      'TIP4SERV CHECKOUT STATUS:',
      response.status
    );

    console.log(
      'TIP4SERV CHECKOUT CONTENT-TYPE:',
      contentType
    );

    console.log(
      'TIP4SERV CHECKOUT RESPONSE:',
      rawResponse
    );

    let data = null;

    try {
      data =
        JSON.parse(
          rawResponse
        );
    } catch {
      data = null;
    }

    /*
     * ERROR DE TIP4SERV
     */
    if (!response.ok) {
      const apiError =
        data?.error?.message ||
        data?.error ||
        data?.message ||
        rawResponse ||
        `Tip4Serv respondió con ${response.status}.`;

      return NextResponse.json(
        {
          error:
            String(
              apiError
            )
        },
        {
          status:
            response.status >=
            400
              ? response.status
              : 502
        }
      );
    }

    /*
     * RESPUESTA OFICIAL:
     *
     * {
     *   "url": "https://checkout.tip4serv.com/..."
     * }
     */
    const checkoutUrl =
      data?.url ||
      data?.data?.url;

    if (
      !checkoutUrl
    ) {
      return NextResponse.json(
        {
          error:
            'Tip4Serv creó la petición correctamente, pero no devolvió la URL del checkout.',

          response:
            data ||
            rawResponse.slice(
              0,
              1000
            )
        },
        {
          status:
            502
        }
      );
    }

    /*
     * DEVOLVER URL AL FRONTEND
     */
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