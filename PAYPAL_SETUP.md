# HorizonMC — PayPal Checkout

La tienda usa **Stripe + PayPal**. Stripe sigue funcionando por separado y PayPal se muestra como una opción independiente en el checkout.

## 1. Credenciales

En PayPal Developer crea una aplicación y obtén:
- Client ID
- Client Secret

Para pruebas usa Sandbox. Para cobrar dinero real cambia `PAYPAL_ENV=production` y usa las credenciales Live.

## 2. Configura `.env.local`

Copia `.env.local.example` como `.env.local` y completa:

```env
PAYPAL_ENV=sandbox
PAYPAL_CLIENT_ID=TU_CLIENT_ID
PAYPAL_CLIENT_SECRET=TU_CLIENT_SECRET
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**No publiques ni compartas `PAYPAL_CLIENT_SECRET`.**

## 3. Precios

Edita `lib_products.js` y sustituye cada `null` por el precio en euros, por ejemplo:

```js
vip: 4.99,
vipplus: 9.99,
```

El servidor vuelve a comprobar los precios antes de crear la orden para evitar que el navegador pueda modificar el importe.

## 4. Ejecutar

```cmd
npm install
npm run dev
```

Abre `http://localhost:3000`.

## 5. Flujo

1. El cliente añade productos.
2. Introduce su nick de Minecraft.
3. Pulsa **Pagar con PayPal**.
4. Se abre PayPal para aprobar el pedido.
5. PayPal vuelve a HorizonMC.
6. El servidor captura el pago mediante PayPal Orders API.

En Sandbox, los pagos se realizan con las cuentas de prueba de PayPal. En producción, los pagos se gestionan con la cuenta de PayPal vinculada a las credenciales Live.
