import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TIP4SERV_API = 'https://api.tip4serv.com/v1';
const STORE_ID = '22965';

const DEFAULT_SITE_URL =
  'https://horizonmc-store-2gkr6g0mg-horizon-mc-web.vercel.app';

export async function POST(request) {
  try {
    const apiKey = String(
      process.env.TIP4SERV_API_KEY || ''
    ).trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Falta TIP4SERV_API_KEY en las variables de entorno de Vercel.'
        },
        { status: 500 }
      );
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: 'La petición recibida no contiene JSON válido.'
        },
        { status: 400 }
      );
    }

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
        { status: 400 }
      );
    }

    const products = cart.map((item) => {
      const productSlug = String(
        item?.id || ''
      ).trim();

      if (!productSlug) {
        throw new Error(
          'Hay un producto sin ID configurado.'
        );
      }

      return {
        product_slug: productSlug,
        type: 'addtocart',
        quantity: 1
      };
    });

    const siteUrl = String(
      process.env.NEXT_PUBLIC_SITE_URL ||
        DEFAULT_SITE_URL
    )
      .trim()
      .replace(/\/$/, '');

    const checkoutBody = {
      products,

      redirect_success_checkout:
        `${siteUrl}/?tip4serv=success`,

      redirect_canceled_checkout:
        `${siteUrl}/?tip4serv=cancelled`
    };

    /*
     * Conservamos los datos del jugador.
     * Solo los añadimos cuando existen.
     */
    if (minecraftUsername) {
      checkoutBody.minecraft_username =
        minecraftUsername;
    }

    if (email) {
      checkoutBody.email = email;
    }

    const response = await fetch(
      `${TIP4SERV_API}/store/checkout?store=${encodeURIComponent(
        STORE_ID
      )}&redirect=true`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        },

        body: JSON.stringify(checkoutBody),

        cache: 'no-store'
      }
    );

    /*
     * NO hacemos response.json() directamente.
     * Primero comprobamos qué nos ha devuelto Tip4Serv.
     */
    const contentType =
      response.headers.get('content-type') || '';

    const rawResponse =
      await response.text();

    console.log('TIP4SERV STATUS:', response.status);
    console.log('TIP4SERV CONTENT-TYPE:', contentType);
    console.log('TIP4SERV RAW RESPONSE:', rawResponse);

    let data = null;

    try {
      data = JSON.parse(rawResponse);
    } catch {
      data = null;
    }
    /*
     * Si Tip4Serv devuelve HTML, mostramos un
     * error controlado en lugar de romper con
     * "Unexpected token <".
     */
    if (!data) {
      return NextResponse.json(
        {
          error:
            `Tip4Serv devolvió una respuesta no válida (${response.status}).`,
          status: response.status,
          response:
            rawResponse.slice(0, 500)
        },
        {
          status: 502
        }
      );
    }

    if (!response.ok) {
      const apiError =
        data?.error?.message ||
        data?.error ||
        data?.message ||
        'Tip4Serv rechazó la creación del checkout.';

      return NextResponse.json(
        {
          error: String(apiError)
        },
        {
          status:
            response.status >= 400
              ? response.status
              : 502
        }
      );
    }

    if (!data.url) {
      return NextResponse.json(
        {
          error:
            'Tip4Serv respondió correctamente, pero no devolvió una URL de checkout.',
          response: data
        },
        {
          status: 502
        }
      );
    }

    return NextResponse.json({
      url: data.url
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