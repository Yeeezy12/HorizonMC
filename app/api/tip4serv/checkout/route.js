import { NextResponse } from 'next/server';

const TIP4SERV_API = 'https://api.tip4serv.com/v1';
const DEFAULT_STORE_ID = '22965';
const DEFAULT_SITE_URL =
  'https://horizonmc-store-2gkr6g0mg-horizon-mc-web.vercel.app';

export async function POST(request) {
  try {
    const storeId = String(
      process.env.TIP4SERV_STORE_ID || DEFAULT_STORE_ID
    ).trim();

    const apiKey = String(process.env.TIP4SERV_API_KEY || '').trim();

    if (!storeId) {
      return NextResponse.json(
        { error: 'Falta TIP4SERV_STORE_ID.' },
        { status: 500 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Falta TIP4SERV_API_KEY en las variables de entorno de Vercel.'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const cart = Array.isArray(body.cart) ? body.cart : [];

    if (!cart.length) {
      return NextResponse.json(
        { error: 'El carrito está vacío.' },
        { status: 400 }
      );
    }

    const products = cart.map((item) => {
      const slug = String(item?.id || '').trim();

      if (!slug) {
        throw new Error('Hay un producto sin slug configurado.');
      }

      return {
        product_slug: slug,
        type: 'addtocart',
        quantity: 1
      };
    });

    const siteUrl = String(
      process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
    )
      .trim()
      .replace(/\/$/, '');

    const response = await fetch(
      `${TIP4SERV_API}/store/checkout?store=${encodeURIComponent(
        storeId
      )}&redirect=true`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          products,
          redirect_success_checkout: `${siteUrl}/?tip4serv=success`,
          redirect_canceled_checkout: `${siteUrl}/?tip4serv=cancelled`
        }),
        cache: 'no-store'
      }
    );

    const data = await response.json();

    if (!response.ok || !data.url) {
      const apiError =
        data?.error?.message ||
        data?.error ||
        data?.message ||
        'Tip4Serv no pudo generar el checkout.';

      return NextResponse.json(
        { error: String(apiError) },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo iniciar el checkout de Tip4Serv.'
      },
      { status: 500 }
    );
  }
}