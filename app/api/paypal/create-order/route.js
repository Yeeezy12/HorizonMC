import { NextResponse } from 'next/server';
import { PRODUCT_PRICES } from '../../../../lib_products';
import { getPayPalAccessToken, paypalBaseUrl } from '../_config';
import { savePendingPayment } from '../../../../lib/minecraft-bridge';

export async function POST(request) {
  try {
    const body = await request.json();
    const cart = Array.isArray(body.cart) ? body.cart : [];
    const minecraftUsername = String(body.minecraftUsername || '').trim();

    if (!cart.length) return NextResponse.json({ error: 'El carrito está vacío.' }, { status: 400 });
    if (!minecraftUsername) return NextResponse.json({ error: 'Introduce tu nombre de Minecraft.' }, { status: 400 });

    const items = cart.map((item) => {
      const price = PRODUCT_PRICES[item.id];
      if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        throw new Error(`El producto ${item.id} todavía no tiene un precio configurado.`);
      }
      return {
        id: item.id,
        name: String(item.name || item.id).slice(0, 127),
        quantity: 1,
        unit_amount: Number(price.toFixed(2)),
      };
    });

    const total = items.reduce((sum, item) => sum + item.unit_amount * item.quantity, 0);
    const totalValue = total.toFixed(2);
    const token = await getPayPalAccessToken();

    const response = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': crypto.randomUUID(),
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          description: `Compra HorizonMC - ${minecraftUsername}`.slice(0, 127),
          custom_id: minecraftUsername.slice(0, 127),
          amount: {
            currency_code: 'EUR',
            value: totalValue,
            breakdown: {
              item_total: { currency_code: 'EUR', value: totalValue },
            },
          },
          items: items.map((item) => ({
            name: item.name,
            quantity: String(item.quantity),
            unit_amount: { currency_code: 'EUR', value: item.unit_amount.toFixed(2) },
            category: 'DIGITAL_GOODS',
          })),
        }],
        application_context: {
          brand_name: 'HorizonMC',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?paypal=return`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?paypal=cancelled`,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.message || 'PayPal no pudo crear el pedido.' }, { status: response.status });

    const approvalUrl = data.links?.find((link) => link.rel === 'approve')?.href;
    savePendingPayment({
      paymentId: data.id,
      provider: 'paypal',
      minecraftUsername,
      cart: items.map(item => ({ id: item.id, name: item.name })),
    });
    return NextResponse.json({ orderID: data.id, approvalUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'No se pudo iniciar el pago.' }, { status: 500 });
  }
}
