import { NextResponse } from 'next/server';
import { getApiKey, getPendingCommands } from '../../../../lib/minecraft-bridge';

export const dynamic = 'force-dynamic';

function authorized(request) {
  const configured = getApiKey();
  const header = request.headers.get('authorization') || '';
  return Boolean(configured) && header === `Bearer ${configured}`;
}

export async function GET(request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  return NextResponse.json(getPendingCommands(), {
    headers: { 'Cache-Control': 'no-store', 'Connection': 'close' },
  });
}
