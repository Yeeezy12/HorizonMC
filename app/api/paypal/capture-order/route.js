import { NextResponse } from 'next/server';
import { getPayPalAccessToken, paypalBaseUrl } from '../_config';
import { markPaymentPaid } from '../../../../lib/minecraft-bridge';

export async function POST(request) {
  try {
    const { orderID } = await request.json();
    if (!orderID) return NextResponse.json({ error: 'Falta el identificador del pedido.' }, { status: 400 });

    const token = await getPayPalAccessToken();
    const response = await fetch(`${paypalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.message || 'No se pudo capturar el pago.' }, { status: response.status });

    if (data.status !== 'COMPLETED') {
      return NextResponse.json({
        success: false,
        status: data.status,
        orderID: data.id,
      });
    }

    const order = markPaymentPaid(data.id, 'paypal');
    if (!order) {
      return NextResponse.json(
        { error: 'El pago se capturó, pero no se encontró la orden de HorizonMC.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: data.status,
      orderID: data.id,
      queued: order.commands.length,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error capturando el pago.' }, { status: 500 });
  }
}
