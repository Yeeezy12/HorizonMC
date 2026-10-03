import { NextResponse } from 'next/server';

const TIP4SERV_API = 'https://api.tip4serv.com/v1';

export async function POST(request) {
  try {
    const storeId = process.env.TIP4SERV_STORE_ID;
    if (!storeId) {
      return NextResponse.json({ error: 'Falta TIP4SERV_STORE_ID en .env.local.' }, { status: 500 });
    }

    const body = await request.json();
    const cart = Array.isArray(body.cart) ? body.cart : [];

    if (!cart.length) {
      return NextResponse.json({ error: 'El carrito está vacío.' }, { status: 400 });
    }

    const products = cart.map((item) => {
      const slug = String(item?.id || '').trim();
      if (!slug) throw new Error('Hay un producto sin slug configurado.');
      return { product_slug: slug, type: 'addtocart', quantity: 1 };
    });

    const response = await fetch(
      `${TIP4SERV_API}/store/checkout?store=${encodeURIComponent(storeId)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products,
          redirect_success_checkout: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?tip4serv=success`,
          redirect_canceled_checkout: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?tip4serv=cancelled`,
        }),
        cache: 'no-store',
      }
    );

    const data = await response.json();
    if (!response.ok || !data.url) {
      return NextResponse.json(
        { error: data.error || 'Tip4Serv no pudo generar el checkout.' },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'No se pudo iniciar el checkout de Tip4Serv.' },
      { status: 500 }
    );
  }
}
