import { NextResponse } from 'next/server';

export function paypalBaseUrl() {
  return process.env.PAYPAL_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Faltan PAYPAL_CLIENT_ID o PAYPAL_CLIENT_SECRET en .env.local');
  }

  const response = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`PayPal OAuth error: ${details}`);
  }

  const data = await response.json();
  return data.access_token;
}

export function jsonError(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}
