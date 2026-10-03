import { NextResponse } from 'next/server';
import { acknowledgeCommand, getApiKey } from '../../../../lib/minecraft-bridge';

export const dynamic = 'force-dynamic';

function authorized(request) {
  const configured = getApiKey();
  const header = request.headers.get('authorization') || '';
  return Boolean(configured) && header === `Bearer ${configured}`;
}

export async function POST(request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = String(body.id || '');
    const success = body.success === true;

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del comando.' }, { status: 400 });
    }

    const found = acknowledgeCommand(id, success);
    if (!found) {
      return NextResponse.json({ error: 'Comando no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { headers: { 'Connection': 'close' } });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error procesando la confirmación.' },
      { status: 500 }
    );
  }
}
