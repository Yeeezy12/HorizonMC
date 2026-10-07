import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TIP4SERV_API = 'https://api.tip4serv.com/v1';
const STORE_ID = '22965';

const DEFAULT_SITE_URL =
  'https://horizonmc-store-2gkr6g0mg-horizon-mc-web.vercel.app';

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
            'Falta TIP4SERV_API_KEY en las variables de entorno de Vercel.'
        },
        {
          status: 500
        }
      );
    }

    /*
     * LEER PETICIÓN
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
    const cart = Array.isArray(body?.cart)
      ? body.cart
      : [];

    /*
     * DATOS DEL JUGADOR
     */
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

    /*
     * CONVERTIR CARRITO A PRODUCTOS DE TIP4SERV
     */
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

    /*
     * URL DE LA WEB
     */
    const siteUrl = String(
      process.env.NEXT_PUBLIC_SITE_URL ||
        DEFAULT_SITE_URL
    )
      .trim()
      .replace(/\/$/, '');

    /*
     * DATOS DEL CHECKOUT
     */
    const checkoutBody = {
      products,

      redirect_success_checkout:
        `${siteUrl}/?tip4serv=success`,

      redirect_canceled_checkout:
        `${siteUrl}/?tip4serv=cancelled`
    };

    /*
     * CONSERVAR EL NOMBRE DEL JUGADOR
     */
    if (minecraftUsername) {
      checkoutBody.minecraft_username =
        minecraftUsername;
    }

    /*
     * CONSERVAR EL EMAIL
     */
    if (email) {
      checkoutBody.email = email;
    }

    /*
     * LLAMAR A TIP4SERV
     */
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

        body: JSON.stringify(
          checkoutBody
        ),

        cache: 'no-store'
      }
    );

    /*
     * LEER RESPUESTA DE TIP4SERV
     *
     * No utilizamos response.json()
     * directamente porque si Tip4Serv
     * devuelve texto también queremos
     * poder procesarlo.
     */
    const contentType =
      response.headers.get(
        'content-type'
      ) || '';

    const rawResponse =
      await response.text();

    console.log(
      'TIP4SERV STATUS:',
      response.status
    );

    console.log(
      'TIP4SERV CONTENT-TYPE:',
      contentType
    );

    console.log(
      'TIP4SERV RAW RESPONSE:',
      rawResponse
    );

    /*
     * INTENTAR PARSEAR JSON
     */
    let data = null;

    try {
      data = JSON.parse(
        rawResponse
      );
    } catch {
      data = null;
    }

    /*
     * SI TIP4SERV DEVUELVE ERROR
     */
    if (!response.ok) {
      const apiError =
        data?.error?.message ||
        data?.error ||
        data?.message ||
        rawResponse ||
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

    /*
     * BUSCAR LA URL DEL CHECKOUT
     *
     * Admitimos varios formatos posibles.
     */
    let checkoutUrl = null;

    /*
     * Si la respuesta JSON es directamente
     * una cadena:
     *
     * "https://..."
     */
    if (typeof data === 'string') {
      checkoutUrl = data;
    }

    /*
     * Si Tip4Serv devuelve un objeto.
     */
    if (
      data &&
      typeof data === 'object'
    ) {
      checkoutUrl =
        data.url ||
        data.checkout_url ||
        data.checkoutUrl ||
        data.redirect_url ||
        data.redirectUrl ||
        data.data?.url ||
        data.data?.checkout_url ||
        data.data?.checkoutUrl ||
        data.data?.redirect_url ||
        data.data?.redirectUrl ||
        null;
    }

    /*
     * Si Tip4Serv devuelve directamente
     * la URL como texto plano.
     */
    if (
      !checkoutUrl &&
      rawResponse
    ) {
      const trimmed =
        rawResponse.trim();

      if (
        trimmed.startsWith(
          'https://'
        ) ||
        trimmed.startsWith(
          'http://'
        )
      ) {
        checkoutUrl =
          trimmed;
      }
    }

    /*
     * SI NO ENCONTRAMOS LA URL
     */
    if (!checkoutUrl) {
      return NextResponse.json(
        {
          error:
            'Tip4Serv respondió con 200, pero no encontramos la URL del checkout.',

          status:
            response.status,

          contentType,

          response:
            rawResponse.slice(
              0,
              1000
            )
        },
        {
          status: 502
        }
      );
    }

    /*
     * DEVOLVER URL AL FRONTEND
     */
    return NextResponse.json({
      url: checkoutUrl
    });

  } catch (error) {
    /*
     * ERROR GENERAL
     */
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