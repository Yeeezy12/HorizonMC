import { NextResponse } from 'next/server';
import { markPaymentPaid } from '../../../../lib/minecraft-bridge';

const STRIPE_API = 'https://api.stripe.com/v1';

export async function POST(request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Falta STRIPE_SECRET_KEY en .env.local.' }, { status: 500 });
    }

    const { sessionID } = await request.json();
    if (!sessionID) {
      return NextResponse.json({ error: 'Falta el identificador de la sesión.' }, { status: 400 });
    }

    const response = await fetch(
      `${STRIPE_API}/checkout/sessions/${encodeURIComponent(sessionID)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: 'no-store',
      }
    );

    const session = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: session.error?.message || 'No se pudo consultar el pago de Stripe.' },
        { status: response.status }
      );
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'El pago todavía no figura como pagado.', paymentStatus: session.payment_status },
        { status: 409 }
      );
    }

    const order = markPaymentPaid(session.id, 'stripe');
    if (!order) {
      return NextResponse.json(
        { error: 'El pago figura como pagado, pero no se encontró la orden de HorizonMC.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      queued: order.commands.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error confirmando el pago.' },
      { status: 500 }
    );
  }
}
