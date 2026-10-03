import { NextResponse } from 'next/server';
import { PRODUCT_PRICES } from '../../../../lib_products';
import { savePendingPayment } from '../../../../lib/minecraft-bridge';

const STRIPE_API = 'https://api.stripe.com/v1';


export async function POST(request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Falta STRIPE_SECRET_KEY en .env.local.' }, { status: 500 });
    }

    const body = await request.json();
    const cart = Array.isArray(body.cart) ? body.cart : [];
    const minecraftUsername = String(body.minecraftUsername || '').trim();

    if (!cart.length) return NextResponse.json({ error: 'El carrito está vacío.' }, { status: 400 });
    if (!minecraftUsername) return NextResponse.json({ error: 'Introduce tu nombre de Minecraft.' }, { status: 400 });

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?stripe=success&session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?stripe=cancelled`);
    params.set('billing_address_collection', 'auto');
    params.set('automatic_tax[enabled]', 'false');
    params.set('metadata[minecraft_username]', minecraftUsername.slice(0, 500));
    params.set('locale', 'auto');

    cart.forEach((item, index) => {
      const price = PRODUCT_PRICES[item.id];
      if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        throw new Error(`El producto ${item.id} todavía no tiene un precio configurado.`);
      }
      params.set(`line_items[${index}][quantity]`, '1');
      params.set(`line_items[${index}][price_data][currency]`, 'eur');
      params.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(price * 100)));
      params.set(`line_items[${index}][price_data][product_data][name]`, String(item.name || item.id).slice(0, 250));
      params.set(`line_items[${index}][price_data][product_data][metadata][product_id]`, String(item.id).slice(0, 500));
    });

    const response = await fetch(`${STRIPE_API}/checkout/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      cache: 'no-store',
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Stripe no pudo crear el checkout.' }, { status: response.status });
    }

    savePendingPayment({
      paymentId: data.id,
      provider: 'stripe',
      minecraftUsername,
      cart: cart.map(item => ({ id: item.id, name: item.name })),
    });

    return NextResponse.json({ url: data.url, sessionID: data.id });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'No se pudo iniciar el pago.' }, { status: 500 });
  }
}
