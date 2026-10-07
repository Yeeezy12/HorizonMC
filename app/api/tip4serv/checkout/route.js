import { NextResponse } from 'next/server';

const TIP4SERV_API = 'https://api.tip4serv.com/v1';
const STORE_ID = '22965';
const DEFAULT_SITE_URL =
  'https://horizonmc-store-2gkr6g0mg-horizon-mc-web.vercel.app';

export async function POST(request) {
  try {
    const apiKey = process.env.TIP4SERV_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Falta la variable TIP4SERV_API_KEY en Vercel.'
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const cart = Array.isArray(body?.cart) ? body.cart : [];
    const minecraftUsername = String(
      body?.minecraft_username || ''
    ).trim();
    const email = String(body?.email || '').trim();

    if (!cart.length) {
      return NextResponse.json(
        {
          error: 'El carrito está vacío.'
        },
        { status: 400 }
      );
    }

    if (!minecraftUsername) {
      return NextResponse.json(
        {
          error: 'Falta el nombre de Minecraft.'
        },
        { status: 400 }
      );
    }

    /*
     * Obtenemos los productos reales de Tip4Serv
     * para convertir los IDs de nuestra tienda
     * en los product_id de Tip4Serv.
     */
    const productsResponse = await fetch(
      `${TIP4SERV_API}/store/products?store=${encodeURIComponent(STORE_ID)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json'
        },
        cache: 'no-store'
      }
    );

    const productsRaw = await productsResponse.text();

    let productsData = null;

    try {
      productsData = productsRaw ? JSON.parse(productsRaw) : null;
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
          error: 'No se pudieron obtener los productos de Tip4Serv.',
          response: productsData || productsRaw.slice(0, 1000)
        },
        { status: 502 }
      );
    }

    const tip4servProducts =
      Array.isArray(productsData)
        ? productsData
        : Array.isArray(productsData?.data)
          ? productsData.data
          : Array.isArray(productsData?.products)
            ? productsData.products
            : [];

    /*
     * Convertimos cada producto del carrito
     * al product_id que utiliza Tip4Serv.
     */
    const products = [];

    for (const cartProduct of cart) {
      const localId = String(cartProduct?.id ?? '').trim();
      const localSlug = String(cartProduct?.slug ?? '').trim();
      const localName = String(cartProduct?.name ?? '').trim();

      const foundProduct = tip4servProducts.find((product) => {
        const productId = String(
          product?.id ??
          product?.product_id ??
          ''
        ).trim();

        const productSlug = String(
          product?.slug ?? ''
        ).trim();

        const productName = String(
          product?.name ?? ''
        ).trim();

        return (
          (localId && productId === localId) ||
          (localSlug && productSlug === localSlug) ||
          (localName && productName === localName)
        );
      });

      if (!foundProduct) {
        return NextResponse.json(
          {
            error: `No se encontró el producto "${localName || localId}" en Tip4Serv.`
          },
          { status: 400 }
        );
      }

      const productId =
        foundProduct?.id ??
        foundProduct?.product_id;

      if (!productId) {
        return NextResponse.json(
          {
            error: `El producto "${localName || localId}" no tiene un ID válido de Tip4Serv.`
          },
          { status: 400 }
        );
      }

      products.push({
        product_id: Number(productId),
        type: 'addtocart',
        quantity: Number(cartProduct?.quantity || 1),
        custom_fields: {},
        server_selection: 1,
        donation_amount: 0
      });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      DEFAULT_SITE_URL;

    /*
     * IMPORTANTE:
     * Tip4Serv espera los identificadores del comprador
     * dentro del objeto "user".
     */
    const checkoutBody = {
      products,

      user: {
        ...(email ? { email } : {}),
        minecraft_username: minecraftUsername
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
      JSON.stringify(checkoutBody, null, 2)
    );

    const response = await fetch(
      `${TIP4SERV_API}/store/checkout?store=${encodeURIComponent(
        STORE_ID
      )}&redirect=true`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(checkoutBody),
        cache: 'no-store'
      }
    );

    const contentType =
      response.headers.get('content-type') || '';

    const rawResponse = await response.text();

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
      data = rawResponse
        ? JSON.parse(rawResponse)
        : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.message ||
            data?.error ||
            'Tip4Serv rechazó la creación del checkout.',

          response:
            data ||
            rawResponse.slice(0, 1000)
        },
        { status: response.status }
      );
    }

    /*
     * Tip4Serv normalmente devuelve:
     *
     * {
     *   "url": "https://checkout.tip4serv.com/..."
     * }
     */
    const checkoutUrl =
      data?.url ||
      data?.data?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        {
          error:
            'Tip4Serv creó la petición correctamente, pero no devolvió la URL del checkout.',

          response:
            data ||
            rawResponse.slice(0, 1000)
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      url: checkoutUrl
    });

  } catch (error) {
    console.error(
      'TIP4SERV CHECKOUT ERROR:',
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          'Error interno al crear el checkout de Tip4Serv.'
      },
      { status: 500 }
    );
  }
}