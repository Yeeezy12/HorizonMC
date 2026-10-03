import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'minecraft-orders.json');

const PRODUCT_COMMANDS = {
  // Rangos (LuckPerms)
  vip: 'lp user {player} parent set vip',
  vipplus: 'lp user {player} parent set vipplus',
  mvp: 'lp user {player} parent set mvp',
  nova: 'lp user {player} parent set nova',
  vortes: 'lp user {player} parent set vortes',
  eterno: 'lp user {player} parent set eterno',
  divino: 'lp user {player} parent set divino',

  // Spawners (Spawner Meta)
  golem: 'sm give GOLEM 1 {player}',
  enderman: 'sm give ENDERMAN 1 {player}',
  blaze: 'sm give BLAZE 1 {player}',
  shulker: 'sm give SHULKER 1 {player}',
  creeper: 'sm give CREEPER 1 {player}',
  esqueleto: 'sm give SKELETON 1 {player}',
  vaca: 'sm give COW 1 {player}',
  cerdo: 'sm give PIG 1 {player}',
  zombie: 'sm give ZOMBIE 1 {player}',

  // Protección: déjalo aquí para configurar el comando real del plugin de protección.
  // 'proteccion-200': 'TU_COMANDO_AQUI {player}',
};

function ensureStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]', 'utf8');
}

function readOrders() {
  ensureStore();
  try {
    const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  ensureStore();
  const tmp = `${ORDERS_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2), 'utf8');
  fs.renameSync(tmp, ORDERS_FILE);
}

export function getApiKey() {
  return process.env.HORIZONMC_API_KEY || '';
}


export function savePendingPayment({ paymentId, provider, minecraftUsername, cart }) {
  const player = String(minecraftUsername || '').trim();
  const products = Array.isArray(cart) ? cart : [];
  const orders = readOrders();
  const existing = orders.find(o => o.paymentId === paymentId && o.provider === provider);
  if (existing) return existing;

  const order = {
    paymentId,
    provider,
    minecraftUsername: player,
    cart: products.map(item => ({
      id: String(item.id || ''),
      name: String(item.name || item.id || ''),
    })),
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    commands: [],
  };

  orders.push(order);
  writeOrders(orders);
  return order;
}

export function markPaymentPaid(paymentId, provider) {
  const orders = readOrders();
  const order = orders.find(o => o.paymentId === paymentId && o.provider === provider);
  if (!order) return null;

  if (order.paymentStatus === 'paid' && (order.commands || []).length) {
    return order;
  }

  order.paymentStatus = 'paid';
  order.paidAt = new Date().toISOString();

  if (!(order.commands || []).length) {
    order.commands = [];
    for (const item of order.cart || []) {
      const commandTemplate = PRODUCT_COMMANDS[item.id];
      if (!commandTemplate) {
        throw new Error(`El producto ${item.id} no tiene un comando configurado.`);
      }
      order.commands.push({
        id: `${paymentId}-${item.id}-${Math.random().toString(36).slice(2, 9)}`,
        command: commandTemplate.replaceAll('{player}', order.minecraftUsername),
        productId: item.id,
        player: order.minecraftUsername,
        status: 'pending',
      });
    }
  }

  writeOrders(orders);
  return order;
}

export function queuePaidOrder({ paymentId, provider, minecraftUsername, cart }) {
  const player = String(minecraftUsername || '').trim();
  if (!player) throw new Error('Falta el nombre de Minecraft.');

  const products = Array.isArray(cart) ? cart : [];
  const commands = [];

  for (const item of products) {
    const id = String(item.id || '').trim();
    const commandTemplate = PRODUCT_COMMANDS[id];
    if (!commandTemplate) {
      throw new Error(`El producto ${id} no tiene un comando configurado.`);
    }

    const command = commandTemplate.replaceAll('{player}', player);
    commands.push({
      id: `${paymentId}-${id}-${Math.random().toString(36).slice(2, 9)}`,
      command,
      productId: id,
      player,
      status: 'pending',
    });
  }

  const orders = readOrders();
  const existing = orders.find(o => o.paymentId === paymentId && o.provider === provider);
  if (existing) return existing;

  const order = {
    paymentId,
    provider,
    minecraftUsername: player,
    createdAt: new Date().toISOString(),
    commands,
  };

  orders.push(order);
  writeOrders(orders);
  return order;
}

export function getPendingCommands() {
  return readOrders().flatMap(order =>
    (order.commands || [])
      .filter(c => c.status === 'pending')
      .map(c => ({ id: c.id, command: c.command }))
  );
}

export function acknowledgeCommand(id, success) {
  const orders = readOrders();
  let found = false;

  for (const order of orders) {
    const command = (order.commands || []).find(c => c.id === id);
    if (!command) continue;
    found = true;

    if (success) {
      command.status = 'delivered';
      command.deliveredAt = new Date().toISOString();
    } else {
      command.lastError = 'Minecraft no pudo ejecutar el comando.';
      // Se mantiene pendiente para poder reintentarlo en el siguiente ciclo.
    }
    break;
  }

  if (found) writeOrders(orders);
  return found;
}
