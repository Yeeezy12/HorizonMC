# HorizonMC - conexión web ↔ Minecraft

La web incluye una API privada para que el plugin HorizonMC consulte las compras pagadas y ejecute los comandos en el servidor.

## 1. Web

Ejecuta:

```bash
npm install
npm run dev
```

La web debe estar en `http://localhost:3000` si mantienes `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

En `.env.local` debe existir:

```env
HORIZONMC_API_KEY=LA_MISMA_CLAVE_QUE_EN_EL_PLUGIN
```

## 2. Plugin

Copia `HorizonMC(1).jar` a `plugins/`.

Después de arrancar el servidor, edita:

`plugins/HorizonMC/config.yml`

y pon:

```yml
api-url: http://localhost:3000/api/minecraft
api-key: LA_MISMA_CLAVE_QUE_EN_EL_ENV_LOCAL
poll-interval-seconds: 5
```

Reinicia el servidor.

## 3. Comandos configurados

Rangos:
- vip → `lp user {player} parent set vip`
- vipplus → `lp user {player} parent set vipplus`
- mvp → `lp user {player} parent set mvp`
- nova → `lp user {player} parent set nova`
- vortes → `lp user {player} parent set vortes`
- eterno → `lp user {player} parent set eterno`
- divino → `lp user {player} parent set divino`

Spawners:
- golem → `sm give GOLEM 1 {player}`
- enderman → `sm give ENDERMAN 1 {player}`
- blaze → `sm give BLAZE 1 {player}`
- shulker → `sm give SHULKER 1 {player}`
- creeper → `sm give CREEPER 1 {player}`
- esqueleto → `sm give SKELETON 1 {player}`
- vaca → `sm give COW 1 {player}`
- cerdo → `sm give PIG 1 {player}`
- zombie → `sm give ZOMBIE 1 {player}`

La Piedra de Protección 200x200 queda sin comando porque no tengo confirmado el comando exacto de tu plugin de protección.

## Importante

Los rangos asumen que tus grupos de LuckPerms se llaman exactamente `vip`, `vipplus`, `mvp`, `nova`, `vortes`, `eterno` y `divino`.

No se debe publicar `.env.local`. Contiene credenciales privadas de pago.
