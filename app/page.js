'use client';

import { useEffect, useMemo, useState } from 'react';
import { PRODUCT_PRICES } from '../lib_products';

const DISCORD_URL = 'https://discord.gg/dhbtnptHsp';
const MAX_DONOR_NAME = 'GoodKyuX';

function currentMonthLabel() {
  return new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

const categories = [
  {
    name: 'Inicio',
    icon: '⌂',
    subcategories: [],
  },
  {
    name: 'Ofertas',
    icon: '🔥',
    subcategories: [
      {
        name: 'Ofertas',
        products: [],
      },
    ],
  },
  {
    name: 'Horizon Coins',
    icon: '🪙',
    subcategories: [
      {
        name: 'Horizon Coins',
        products: [
          {
            id: '5000-horizon-coins',
            name: '5.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['5000-horizon-coins'],
            desc: '5.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.',
          },
          {
            id: '10000-horizon-coins',
            name: '10.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['10000-horizon-coins'],
            desc: '10.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.',
          },
          {
            id: '25000-horizon-coins',
            name: '25.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['25000-horizon-coins'],
            desc: '25.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.',
          },
          {
            id: '50000-horizon-coins',
            name: '50.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['50000-horizon-coins'],
            desc: '50.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.',
          },
          {
            id: '100000-horizon-coins',
            name: '100.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['100000-horizon-coins'],
            desc: '100.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.',
          },
        ],
      },
    ],
  },
  {
    name: 'Rangos',
    icon: '👑',
    subcategories: [
      {
        name: 'Rangos Básicos',
        products: [
          {
            id: 'vip',
            name: 'VIP',
            icon: '👑',
            price: PRODUCT_PRICES.vip,
            desc: 'Rango VIP para destacar en HorizonMC.',
          },
          {
            id: 'vipplus',
            name: 'VIP+',
            icon: '💎',
            price: PRODUCT_PRICES.vipplus,
            desc: 'Mejora tu experiencia con el rango VIP+.',
          },
          {
            id: 'mvp',
            name: 'MVP',
            icon: '⭐',
            price: PRODUCT_PRICES.mvp,
            desc: 'Rango MVP con ventajas exclusivas.',
          },
        ],
      },
      {
        name: 'Rangos Avanzados',
        products: [
          {
            id: 'nova',
            name: 'NOVA',
            icon: '🌌',
            price: PRODUCT_PRICES.nova,
            desc: 'Rango avanzado NOVA para jugadores destacados.',
          },
          {
            id: 'vortes',
            name: 'VORTEX',
            icon: '🌀',
            price: PRODUCT_PRICES.vortes,
            desc: 'Rango avanzado VORTEX con beneficios especiales.',
          },
        ],
      },
      {
        name: 'Rangos Premium',
        products: [
          {
            id: 'eterno',
            name: 'ETERNO',
            icon: '♾️',
            price: PRODUCT_PRICES.eterno,
            desc: 'Rango premium ETERNO para los jugadores más exclusivos.',
          },
          {
            id: 'divino',
            name: 'DIVINO',
            icon: '✨',
            price: PRODUCT_PRICES.divino,
            desc: 'El rango premium DIVINO con ventajas exclusivas.',
          },
        ],
      },
    ],
  },
  {
    name: 'Survival 1.21.11',
    icon: '⛏️',
    subcategories: [
      {
        name: 'Comandos',
        products: [
          {
            id: 'comando-condense-permanente',
            name: '/condense permanente',
            icon: '⚙️',
            price: 6,
            desc: 'Acceso permanente al comando /condense.',
          },
          {
            id: 'comando-fly-1-mes',
            name: '/fly · 1 mes',
            icon: '🪽',
            price: 6,
            desc: 'Acceso al comando /fly durante 1 mes.',
          },
          {
            id: 'comando-hack-permanente',
            name: '/hack permanente',
            icon: '⚡',
            price: 5,
            desc: 'Acceso permanente al comando /hack.',
          },
          {
            id: 'comando-school-permanente',
            name: '/school permanente',
            icon: '📚',
            price: 6,
            desc: 'Acceso permanente al comando /school.',
          },
          {
            id: 'comando-inse-permanente',
            name: '/inse permanente',
            icon: '✨',
            price: 7,
            desc: 'Acceso permanente al comando /inse.',
          },
          {
            id: 'fly-permanente',
            name: 'Fly permanente',
            icon: '🪽',
            price: 18,
            desc: 'Acceso permanente a Fly.',
          },
        ],
      },
    ],
  },
  {
    name: 'Protección',
    icon: '🛡️',
    subcategories: [
      {
        name: 'Protección',
        products: [
          {
            id: 'proteccion-de-clan',
            name: 'Piedra de Protección de Clan 200x200',
            icon: '🗿',
            price: PRODUCT_PRICES['proteccion-200'],
            desc: 'Piedra de protección de clan con un área de 200x200 bloques.',
          },
        ],
      },
    ],
  },
  {
    name: 'Spawners',
    icon: '🔥',
    subcategories: [
      {
        name: 'Spawners de Mobs',
        products: [
          {
            id: 'spawner-de-golem',
            name: 'Spawner de Golem',
            icon: '🗿',
            price: PRODUCT_PRICES.golem,
            desc: 'Spawner de Golem.',
          },
          {
            id: 'spawner-de-enderman',
            name: 'Spawner de Enderman',
            icon: '👁️',
            price: PRODUCT_PRICES.enderman,
            desc: 'Spawner de Enderman.',
          },
          {
            id: 'spawner-de-blaze',
            name: 'Spawner de Blaze',
            icon: '🔥',
            price: PRODUCT_PRICES.blaze,
            desc: 'Spawner de Blaze.',
          },
          {
            id: 'spawner-de-shulker',
            name: 'Spawner de Shulker',
            icon: '🟪',
            price: PRODUCT_PRICES.shulker,
            desc: 'Spawner de Shulker.',
          },
          {
            id: 'spawner-de-creeper',
            name: 'Spawner de Creeper',
            icon: '💥',
            price: PRODUCT_PRICES.creeper,
            desc: 'Spawner de Creeper.',
          },
          {
            id: 'spawner-de-esqueleto',
            name: 'Spawner de Esqueleto',
            icon: '💀',
            price: PRODUCT_PRICES.esqueleto,
            desc: 'Spawner de Esqueleto.',
          },
          {
            id: 'spawner-de-vaca',
            name: 'Spawner de Vaca',
            icon: '🐄',
            price: PRODUCT_PRICES.vaca,
            desc: 'Spawner de Vaca.',
          },
          {
            id: 'spawner-de-cerdo',
            name: 'Spawner de Cerdo',
            icon: '🐷',
            price: PRODUCT_PRICES.cerdo,
            desc: 'Spawner de Cerdo.',
          },
          {
            id: 'spawner-de-zombi',
            name: 'Spawner de Zombie',
            icon: '🧟',
            price: PRODUCT_PRICES.zombie,
            desc: 'Spawner de Zombie.',
          },
        ],
      },
    ],
  },
  {
    name: 'Otros',
    icon: '🧩',
    subcategories: [
      {
        name: 'Otros',
        products: [
          {
            id: 'desmuteo-y-limpieza',
            name: 'Desmuteo y limpieza',
            icon: '🔓',
            price: 16,
            desc: 'Servicio de desmuteo y limpieza de sanciones de chat.',
          },
          {
            id: 'desvaneo-discord',
            name: 'Desvaneo de Discord',
            icon: '💬',
            price: 17,
            desc: 'Servicio de desvaneo de Discord.',
          },
          {
            id: 'desvaneo-total',
            name: 'Desvaneo total',
            icon: '🔓',
            price: 30,
            desc: 'Servicio de desvaneo total.',
          },
          {
            id: 'prefijo-custom',
            name: 'Prefijo custom',
            icon: '🏷️',
            price: 10,
            desc: 'Personaliza tu prefijo dentro del servidor.',
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const [selected, setSelected] = useState('Rangos');
  const [sub, setSub] = useState('Rangos Básicos');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState('');

  const [infoProduct, setInfoProduct] = useState(null);
  const [monthLabel, setMonthLabel] = useState('');

  useEffect(() => {
    setMonthLabel(currentMonthLabel());
  }, []);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('horizonmc_current_user');

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('tip4serv');

    if (status === 'cancelled') {
      setPaymentError('Has cancelado el pago.');
      setCheckoutOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }

    if (status === 'success') {
      setPaymentResult(
        'Pago completado correctamente. Tu pedido ha sido recibido y Tip4Serv procesará la entrega en Minecraft.'
      );
      setPaymentError('');
      setPaymentLoading(false);
      setCart([]);
      setCheckoutOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const currentCategory = categories.find((c) => c.name === selected);

  const currentSub =
    currentCategory?.subcategories?.find((s) => s.name === sub) ||
    currentCategory?.subcategories?.[0];

  const products = currentSub?.products || [];

  const cartTotal = cart.reduce(
    (sum, product) =>
      sum + (typeof product.price === 'number' ? product.price : 0),
    0
  );

  const cartCount = cart.length;

  const featuredProducts = useMemo(() => {
    const result = [];

    for (const category of categories) {
      for (const subcategory of category.subcategories || []) {
        for (const product of subcategory.products || []) {
          result.push(product);
        }
      }
    }

    return result.slice(0, 6);
  }, []);

  function selectCategory(category) {
    if (category.name === 'Inicio') {
      setSelected('Inicio');
      setMobileMenu(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (category.name === 'Ofertas') {
      setSelected('Ofertas');
      setSub('Ofertas');
      setMobileMenu(false);
      document.getElementById('tienda')?.scrollIntoView({
        behavior: 'smooth',
      });
      return;
    }

    setSelected(category.name);
    setSub(category.subcategories?.[0]?.name || '');
    setMobileMenu(false);

    setTimeout(() => {
      document.getElementById('tienda')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  }

  function add(product) {
    setCart((previous) => [...previous, product]);
  }

  function removeFromCart(index) {
    setCart((previous) => previous.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  function openLogin() {
    setAuthMode('login');
    setAuthError('');
    setAuthMessage('');
    setAccountOpen(false);
    setAuthOpen(true);
  }

  function openRegister() {
    setAuthMode('register');
    setAuthError('');
    setAuthMessage('');
    setAuthOpen(true);
  }

  function handleAuth(event) {
    event.preventDefault();

    setAuthError('');
    setAuthMessage('');

    const form = new FormData(event.currentTarget);

    const username = String(form.get('username') || '').trim();
    const email = String(form.get('email') || '')
      .trim()
      .toLowerCase();

    const password = String(form.get('password') || '');

    if (!username || !password || (authMode === 'register' && !email)) {
      setAuthError('Completa todos los campos.');
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem('horizonmc_accounts') || '[]'
    );

    if (authMode === 'register') {
      if (username.length < 3) {
        setAuthError('El usuario debe tener al menos 3 caracteres.');
        return;
      }

      if (password.length < 6) {
        setAuthError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      if (
        accounts.some(
          (account) =>
            account.username.toLowerCase() === username.toLowerCase()
        )
      ) {
        setAuthError('Ese nombre de usuario ya está registrado.');
        return;
      }

      if (accounts.some((account) => account.email === email)) {
        setAuthError('Ese correo ya está registrado.');
        return;
      }

      const newUser = {
        username,
        email,
        password,
      };

      localStorage.setItem(
        'horizonmc_accounts',
        JSON.stringify([...accounts, newUser])
      );

      const loggedUser = {
        username,
        email,
      };

      localStorage.setItem(
        'horizonmc_current_user',
        JSON.stringify(loggedUser)
      );

      setUser(loggedUser);
      setAuthMessage('Cuenta creada correctamente.');
      setAuthOpen(false);

      return;
    }

    const found = accounts.find(
      (account) =>
        (
          account.username.toLowerCase() === username.toLowerCase() ||
          account.email === username.toLowerCase()
        ) &&
        account.password === password
    );

    if (!found) {
      setAuthError('Usuario/correo o contraseña incorrectos.');
      return;
    }

    const loggedUser = {
      username: found.username,
      email: found.email,
    };

    localStorage.setItem(
      'horizonmc_current_user',
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);
    setAuthOpen(false);
  }

  function logout() {
    localStorage.removeItem('horizonmc_current_user');
    setUser(null);
    setAccountOpen(false);
  }

  function startCheckout() {
    if (!cart.length) return;

    setPaymentError('');
    setPaymentResult('');
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  async function payWithTip4Serv() {
    setPaymentError('');
    setPaymentResult('');

    if (!cart.length) {
      setPaymentError('El carrito está vacío.');
      return;
    }

    setPaymentLoading(true);

    try {
      const response = await fetch('/api/tip4serv/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart.map((product) => ({
            id: product.id,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(
          data.error || 'No se pudo iniciar el checkout de Tip4Serv.'
        );
      }

      window.location.href = data.url;
    } catch (error) {
      setPaymentError(
        error.message || 'No se pudo iniciar el pago.'
      );
      setPaymentLoading(false);
    }
  }

  function scrollToShop() {
    document.getElementById('tienda')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  function scrollToBeforeBuy() {
    document.getElementById('antes-de-comprar')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <main className="horizonStore">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .horizonStore {
          min-height: 100vh;
          background:
            radial-gradient(circle at 70% 0%, rgba(90, 54, 255, 0.13), transparent 32%),
            radial-gradient(circle at 10% 50%, rgba(0, 179, 255, 0.05), transparent 28%),
            #07080d;
          color: #f7f7fb;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .storeLayout {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 255px minmax(0, 1fr);
        }

        .sidebar {
          position: fixed;
          z-index: 30;
          width: 255px;
          height: 100vh;
          overflow-y: auto;
          padding: 24px 16px;
          background: rgba(9, 10, 16, 0.96);
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(20px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 4px 10px 25px;
          font-weight: 900;
          letter-spacing: -0.04em;
          font-size: 21px;
        }

        .brandMark {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: linear-gradient(135deg, #6b4cff, #9d76ff);
          box-shadow: 0 8px 30px rgba(107, 76, 255, 0.3);
          font-weight: 950;
        }

        .brand span {
          color: #8e76ff;
        }

        .sideLabel {
          color: #6f7180;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
          padding: 0 11px 9px;
        }

        .sideNav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sideButton {
          width: 100%;
          border: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 12px;
          border-radius: 10px;
          background: transparent;
          color: #999ba8;
          text-align: left;
          transition: 0.18s ease;
          font-size: 13px;
          font-weight: 700;
        }

        .sideButton:hover {
          color: white;
          background: rgba(255, 255, 255, 0.055);
        }

        .sideButton.active {
          color: white;
          background: linear-gradient(
            90deg,
            rgba(111, 78, 255, 0.24),
            rgba(111, 78, 255, 0.08)
          );
          box-shadow: inset 3px 0 0 #7d60ff;
        }

        .sideIcon {
          width: 23px;
          text-align: center;
          font-size: 17px;
        }

        .sidebarBottom {
          margin-top: 25px;
          display: grid;
          gap: 10px;
        }

        .donorMini,
        .premiumMini {
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 13px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.025);
        }

        .donorMini {
          background:
            radial-gradient(circle at 90% 0%, rgba(255, 195, 55, 0.12), transparent 50%),
            rgba(255, 255, 255, 0.025);
        }

        .miniTitle {
          color: #70727f;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .donorName {
          margin-top: 7px;
          font-weight: 900;
          color: #ffd978;
        }

        .donorDate {
          margin-top: 4px;
          color: #777987;
          font-size: 10px;
        }

        .premiumMini {
          border-color: rgba(116, 88, 255, 0.2);
          background: rgba(111, 78, 255, 0.06);
        }

        .premiumMini strong {
          display: block;
          margin: 6px 0 4px;
          font-size: 12px;
        }

        .premiumMini p {
          margin: 0;
          color: #838593;
          font-size: 10px;
          line-height: 1.55;
        }

        .mainArea {
          grid-column: 2;
          min-width: 0;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          height: 73px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 0 34px;
          background: rgba(7, 8, 13, 0.86);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(18px);
        }

        .mobileBrand {
          display: none;
          font-weight: 900;
        }

        .topLinks {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .topLinks button {
          border: 0;
          background: transparent;
          color: #858794;
          font-size: 12px;
          font-weight: 700;
        }

        .topLinks button:hover {
          color: white;
        }

        .topActions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .topButton {
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.035);
          color: #dddde5;
          border-radius: 9px;
          padding: 9px 12px;
          font-size: 11px;
          font-weight: 800;
        }

        .topButton:hover {
          background: rgba(255, 255, 255, 0.07);
        }

        .cartTop {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cartBubble {
          min-width: 19px;
          height: 19px;
          padding: 0 5px;
          display: grid;
          place-items: center;
          border-radius: 99px;
          background: #7659ff;
          color: white;
          font-size: 9px;
        }

        .accountWrap {
          position: relative;
        }

        .accountMenu {
          position: absolute;
          top: calc(100% + 9px);
          right: 0;
          width: 220px;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 12px;
          background: #11121a;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .accountMenu strong {
          color: white;
        }

        .accountEmail {
          margin: 6px 0 12px;
          color: #727481;
          font-size: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .accountMenu button {
          width: 100%;
          border: 0;
          border-radius: 8px;
          padding: 9px;
          background: rgba(255, 255, 255, 0.05);
          color: #ddd;
          font-size: 11px;
          font-weight: 700;
        }

        .hero {
          padding: 55px 46px 34px;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -180px;
          top: -240px;
          background: rgba(104, 74, 255, 0.14);
          filter: blur(100px);
          border-radius: 50%;
          pointer-events: none;
        }

        .heroGrid {
          max-width: 1250px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.45fr 0.8fr;
          gap: 22px;
          align-items: stretch;
        }

        .heroMain {
          min-height: 310px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 38px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          background:
            linear-gradient(135deg, rgba(104, 77, 255, 0.12), rgba(255, 255, 255, 0.018)),
            #0d0e15;
          position: relative;
          overflow: hidden;
        }

        .heroMain::after {
          content: "H";
          position: absolute;
          right: 15px;
          bottom: -55px;
          font-size: 300px;
          font-weight: 1000;
          color: rgba(255, 255, 255, 0.018);
          pointer-events: none;
        }

        .eyebrow {
          color: #8871ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.17em;
        }

        .hero h1 {
          max-width: 760px;
          margin: 13px 0 13px;
          font-size: clamp(34px, 4vw, 60px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .hero h1 span {
          color: #8871ff;
        }

        .hero p {
          max-width: 610px;
          margin: 0;
          color: #858794;
          line-height: 1.65;
          font-size: 13px;
        }

        .heroButtons {
          display: flex;
          gap: 9px;
          margin-top: 25px;
        }

        .primaryButton {
          border: 0;
          border-radius: 9px;
          padding: 12px 17px;
          background: #7356ff;
          color: white;
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 10px 30px rgba(115, 86, 255, 0.25);
        }

        .primaryButton:hover {
          background: #8369ff;
        }

        .secondaryButton {
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 9px;
          padding: 11px 16px;
          background: rgba(255, 255, 255, 0.035);
          color: #c5c6cf;
          font-size: 11px;
          font-weight: 800;
        }

        .heroSide {
          display: grid;
          gap: 12px;
        }

        .heroCard {
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 17px;
          padding: 21px;
          background: #0d0e15;
        }

        .heroCard.crown {
          background:
            radial-gradient(circle at 100% 0%, rgba(255, 196, 58, 0.12), transparent 45%),
            #0d0e15;
        }

        .heroCard.premium {
          background:
            radial-gradient(circle at 100% 0%, rgba(111, 78, 255, 0.16), transparent 45%),
            #0d0e15;
        }

        .cardIcon {
          font-size: 25px;
          margin-bottom: 15px;
        }

        .heroCard small {
          display: block;
          color: #666876;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .heroCard h3 {
          margin: 7px 0 5px;
          font-size: 19px;
        }

        .heroCard p {
          color: #777986;
          margin: 0;
          font-size: 10px;
          line-height: 1.55;
        }

        .content {
          max-width: 1250px;
          margin: 0 auto;
          padding: 15px 46px 70px;
        }

        .notice {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 35px;
        }

        .noticeCard {
          display: flex;
          gap: 13px;
          padding: 17px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.025);
        }

        .noticeCard.warning {
          border-color: rgba(255, 188, 67, 0.12);
        }

        .noticeCard.purple {
          border-color: rgba(112, 81, 255, 0.16);
        }

        .noticeIcon {
          flex: 0 0 31px;
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }

        .noticeCard strong {
          display: block;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .noticeCard p {
          margin: 0;
          color: #70727f;
          font-size: 10px;
          line-height: 1.55;
        }

        .shopHead {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 17px;
        }

        .shopHead h2 {
          margin: 6px 0 0;
          font-size: 26px;
          letter-spacing: -0.04em;
        }

        .shopHead p {
          color: #656773;
          font-size: 11px;
          margin: 0;
        }

        .categoryBar {
          display: flex;
          gap: 7px;
          padding: 5px;
          overflow-x: auto;
          margin-bottom: 25px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.018);
        }

        .categoryButton {
          flex: 0 0 auto;
          border: 0;
          border-radius: 8px;
          padding: 10px 13px;
          background: transparent;
          color: #777985;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
        }

        .categoryButton:hover {
          color: white;
          background: rgba(255, 255, 255, 0.045);
        }

        .categoryButton.active {
          background: #7356ff;
          color: white;
          box-shadow: 0 7px 20px rgba(115, 86, 255, 0.18);
        }

        .categoryButton span {
          margin-right: 6px;
        }

        .subBar {
          display: flex;
          gap: 7px;
          margin-bottom: 20px;
        }

        .subButton {
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.025);
          color: #747681;
          padding: 8px 11px;
          font-size: 10px;
          font-weight: 700;
        }

        .subButton.active {
          color: white;
          border-color: rgba(122, 92, 255, 0.4);
          background: rgba(115, 86, 255, 0.11);
        }

        .productsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 13px;
        }

        .productCard {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 255px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 15px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.012)),
            #0c0d13;
          transition: transform 0.18s ease, border 0.18s ease, box-shadow 0.18s ease;
        }

        .productCard:hover {
          transform: translateY(-3px);
          border-color: rgba(124, 95, 255, 0.35);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.23);
        }

        .productTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .productIcon {
          width: 51px;
          height: 51px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: rgba(115, 86, 255, 0.08);
          border: 1px solid rgba(115, 86, 255, 0.13);
          font-size: 25px;
        }

        .productInfoButton {
          width: 27px;
          height: 27px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.025);
          color: #7e808c;
          font-size: 10px;
          font-weight: 900;
        }

        .productCard h3 {
          margin: 18px 0 7px;
          font-size: 14px;
          line-height: 1.3;
        }

        .productCard p {
          margin: 0;
          color: #6e707d;
          font-size: 10px;
          line-height: 1.6;
        }

        .productBottom {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 10px;
          margin-top: auto;
          padding-top: 20px;
        }

        .productPrice small {
          display: block;
          color: #626470;
          font-size: 8px;
          margin-bottom: 4px;
        }

        .productPrice strong {
          font-size: 17px;
          letter-spacing: -0.03em;
        }

        .addProduct {
          border: 0;
          border-radius: 8px;
          padding: 10px 13px;
          background: #7356ff;
          color: white;
          font-size: 10px;
          font-weight: 900;
        }

        .addProduct:hover {
          background: #846bff;
        }

        .emptyProducts {
          grid-column: 1 / -1;
          padding: 60px 20px;
          text-align: center;
          border: 1px dashed rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          color: #70727e;
        }

        .emptyProducts strong {
          display: block;
          color: #c2c3ca;
          margin-bottom: 5px;
        }

        .beforeBuy {
          margin-top: 55px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.018);
        }

        .beforeBuy h2 {
          max-width: 750px;
          margin: 8px 0 10px;
          font-size: 25px;
          letter-spacing: -0.04em;
        }

        .beforeBuy > p {
          max-width: 850px;
          color: #757783;
          font-size: 11px;
          line-height: 1.7;
        }

        .beforeGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 20px;
        }

        .infoBox {
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.018);
        }

        .infoBox h3 {
          margin: 0 0 9px;
          font-size: 12px;
        }

        .infoBox p,
        .infoBox li {
          color: #737580;
          font-size: 10px;
          line-height: 1.65;
        }

        .infoBox ul {
          padding-left: 16px;
          margin-bottom: 0;
        }

        .discordButton {
          display: inline-flex;
          margin-top: 7px;
          padding: 9px 12px;
          border-radius: 8px;
          background: rgba(115, 86, 255, 0.12);
          color: #a795ff;
          text-decoration: none;
          font-size: 10px;
          font-weight: 800;
        }

        .support {
          margin-top: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 23px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          background: linear-gradient(
            90deg,
            rgba(115, 86, 255, 0.08),
            rgba(255, 255, 255, 0.015)
          );
        }

        .support h2 {
          margin: 6px 0 5px;
          font-size: 19px;
        }

        .support p {
          margin: 0;
          color: #71737f;
          font-size: 10px;
        }

        footer {
          margin-left: 0;
          padding: 28px 46px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #555763;
          font-size: 10px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          justify-content: flex-end;
          background: rgba(0, 0, 0, 0.68);
          backdrop-filter: blur(7px);
        }

        .modalOverlay {
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .drawer {
          width: min(440px, 100%);
          height: 100%;
          padding: 23px;
          background: #0c0d14;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: -20px 0 70px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
        }

        .drawerTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .drawerTop h2 {
          margin: 0;
          font-size: 19px;
        }

        .drawerTop button,
        .modalClose {
          border: 0;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #a4a5ae;
        }

        .cartCount {
          display: inline-grid;
          place-items: center;
          min-width: 21px;
          height: 21px;
          padding: 0 5px;
          margin-left: 5px;
          border-radius: 50%;
          background: #7356ff;
          font-size: 9px;
        }

        .emptyCart {
          flex: 1;
          display: grid;
          place-content: center;
          text-align: center;
          color: #656773;
        }

        .emptyCartIcon {
          font-size: 35px;
          margin-bottom: 10px;
        }

        .emptyCart h3 {
          margin: 0 0 5px;
          color: #d2d3d9;
          font-size: 14px;
        }

        .emptyCart p {
          margin: 0;
          font-size: 10px;
        }

        .cartContent {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .cartItems {
          flex: 1;
          overflow-y: auto;
          padding: 16px 0;
        }

        .cartItem {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.045);
        }

        .cartItemIcon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: rgba(115, 86, 255, 0.08);
        }

        .cartItemInfo {
          flex: 1;
          min-width: 0;
        }

        .cartItemInfo b {
          display: block;
          font-size: 10px;
          line-height: 1.35;
        }

        .cartItemInfo small {
          display: block;
          color: #858692;
          margin-top: 3px;
          font-size: 9px;
        }

        .removeItem {
          border: 0;
          background: transparent;
          color: #686a76;
          font-size: 12px;
        }

        .cartBottom {
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .cartTotal {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: #80828e;
          font-size: 11px;
        }

        .cartTotal strong {
          color: white;
          font-size: 16px;
        }

        .cartBottomButtons {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 8px;
        }

        .clearCart {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          background: transparent;
          color: #858692;
          font-size: 10px;
          font-weight: 800;
        }

        .checkoutButton {
          border: 0;
          border-radius: 8px;
          background: #7356ff;
          color: white;
          padding: 12px;
          font-size: 10px;
          font-weight: 900;
        }

        .modal {
          position: relative;
          width: min(460px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          padding: 27px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 17px;
          background: #0e0f17;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.55);
        }

        .modalClose {
          position: absolute;
          right: 17px;
          top: 17px;
        }

        .modal h2 {
          margin: 8px 0;
          font-size: 25px;
          letter-spacing: -0.04em;
        }

        .modalIntro {
          margin: 0 0 20px;
          color: #777985;
          font-size: 10px;
          line-height: 1.6;
        }

        .authForm {
          display: grid;
          gap: 13px;
        }

        .authForm label {
          color: #999ba7;
          font-size: 10px;
          font-weight: 700;
        }

        .authForm input {
          width: 100%;
          margin-top: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 12px;
          outline: none;
          background: rgba(255, 255, 255, 0.035);
          color: white;
        }

        .authForm input:focus {
          border-color: rgba(115, 86, 255, 0.6);
        }

        .authSubmit {
          border: 0;
          border-radius: 8px;
          padding: 12px;
          background: #7356ff;
          color: white;
          font-size: 10px;
          font-weight: 900;
        }

        .authError,
        .authMessage {
          padding: 10px;
          border-radius: 8px;
          font-size: 10px;
          line-height: 1.5;
        }

        .authError {
          background: rgba(255, 70, 70, 0.08);
          color: #ff9292;
        }

        .authMessage {
          background: rgba(74, 210, 143, 0.08);
          color: #75dda9;
        }

        .authSwitch {
          margin-top: 17px;
          color: #686a76;
          text-align: center;
          font-size: 10px;
        }

        .authSwitch button {
          border: 0;
          background: transparent;
          color: #9b89ff;
          font-weight: 800;
        }

        .productInfoIcon {
          width: 65px;
          height: 65px;
          display: grid;
          place-items: center;
          margin-bottom: 17px;
          border-radius: 14px;
          background: rgba(115, 86, 255, 0.1);
          font-size: 31px;
        }

        .checkoutRows {
          max-height: 280px;
          overflow-y: auto;
          margin: 15px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .checkoutRow {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 10px;
        }

        .checkoutRow:last-child {
          border-bottom: 0;
        }

        .checkoutRow strong {
          white-space: nowrap;
        }

        .checkoutTotal {
          display: flex;
          justify-content: space-between;
          margin: 16px 0;
          color: #777985;
          font-size: 11px;
        }

        .checkoutTotal strong {
          color: white;
          font-size: 18px;
        }

        .paymentButton {
          width: 100%;
          border: 0;
          border-radius: 9px;
          padding: 13px;
          background: #7356ff;
          color: white;
          font-size: 10px;
          font-weight: 900;
        }

        .paymentButton:disabled {
          opacity: 0.55;
          cursor: wait;
        }

        .backButton {
          width: 100%;
          margin-top: 9px;
          border: 0;
          background: transparent;
          color: #656773;
          padding: 8px;
          font-size: 10px;
        }

        .mobileMenuButton {
          display: none;
        }

        @media (max-width: 1100px) {
          .productsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .heroGrid {
            grid-template-columns: 1fr;
          }

          .heroSide {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 800px) {
          .storeLayout {
            display: block;
          }

          .sidebar {
            display: none;
          }

          .sidebar.mobileOpen {
            display: block;
            position: fixed;
            inset: 0 auto 0 0;
            width: 285px;
          }

          .mainArea {
            width: 100%;
          }

          .mobileBrand {
            display: block;
          }

          .mobileMenuButton {
            display: grid;
            place-items: center;
            width: 35px;
            height: 35px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.04);
            color: white;
          }

          .topbar {
            padding: 0 16px;
          }

          .topLinks {
            display: none;
          }

          .topActions .loginTop {
            display: none;
          }

          .hero {
            padding: 25px 16px 20px;
          }

          .content {
            padding: 10px 16px 50px;
          }

          .heroMain {
            padding: 25px;
            min-height: 350px;
          }

          .heroSide {
            grid-template-columns: 1fr;
          }

          .notice {
            grid-template-columns: 1fr;
          }

          .beforeGrid {
            grid-template-columns: 1fr;
          }

          footer {
            padding: 25px 16px;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .productsGrid {
            grid-template-columns: 1fr;
          }

          .shopHead {
            display: block;
          }

          .shopHead p {
            margin-top: 7px;
          }

          .hero h1 {
            font-size: 39px;
          }

          .heroButtons {
            flex-direction: column;
          }

          .heroButtons button {
            width: 100%;
          }

          .support {
            display: block;
          }

          .support .discordButton {
            margin-top: 14px;
          }

          .categoryBar {
            margin-left: -4px;
            margin-right: -4px;
          }
        }
      `}</style>

      <div className="storeLayout">
        <aside className={`sidebar ${mobileMenu ? 'mobileOpen' : ''}`}>
          <div className="brand">
            <div className="brandMark">H</div>
            <div>
              HORIZON<span>MC</span>
            </div>
          </div>

          <div className="sideLabel">TIENDA</div>

          <nav className="sideNav">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`sideButton ${
                  selected === category.name ? 'active' : ''
                }`}
                onClick={() => selectCategory(category)}
              >
                <span className="sideIcon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}

            <button
              className="sideButton"
              onClick={scrollToBeforeBuy}
            >
              <span className="sideIcon">📋</span>
              <span>Antes de comprar</span>
            </button>
          </nav>

          <div className="sidebarBottom">
            <div className="donorMini">
              <div className="miniTitle">🏆 MÁXIMO DONADOR</div>
              <div className="donorName">{MAX_DONOR_NAME}</div>
              <div className="donorDate">
                Donador de {monthLabel || 'este mes'}
              </div>
            </div>

            <div className="premiumMini">
              <div className="miniTitle">⚠️ PREMIUM</div>
              <strong>¿Eres Premium?</strong>
              <p>
                Usa <b>/premium</b> antes de realizar tu compra.
              </p>
            </div>
          </div>
        </aside>

        <div className="mainArea">
          <header className="topbar">
            <button
              className="mobileMenuButton"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Abrir menú"
            >
              ☰
            </button>

            <div className="mobileBrand">
              HORIZON<span style={{ color: '#8871ff' }}>MC</span>
            </div>

            <nav className="topLinks">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Inicio
              </button>
              <button onClick={scrollToShop}>Tienda</button>
              <button onClick={scrollToBeforeBuy}>
                Antes de comprar
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('soporte')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Soporte
              </button>
            </nav>

            <div className="topActions">
              {user ? (
                <div className="accountWrap">
                  <button
                    className="topButton"
                    onClick={() => setAccountOpen(!accountOpen)}
                  >
                    👤 {user.username}
                  </button>

                  {accountOpen && (
                    <div className="accountMenu">
                      <div>
                        <strong>{user.username}</strong>
                      </div>

                      <div className="accountEmail">
                        {user.email}
                      </div>

                      <button onClick={logout}>
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="topButton loginTop"
                  onClick={openLogin}
                >
                  Iniciar sesión
                </button>
              )}

              <button
                className="topButton cartTop"
                onClick={() => setCartOpen(true)}
              >
                🛒
                <span>Carrito</span>
                <span className="cartBubble">{cartCount}</span>
              </button>
            </div>
          </header>

          <section className="hero">
            <div className="heroGrid">
              <div className="heroMain">
                <div className="eyebrow">
                  ✦ TIENDA OFICIAL DE HORIZONMC
                </div>

                <h1>
                  Mejora tu experiencia en{' '}
                  <span>HorizonMC.</span>
                </h1>

                <p>
                  Rangos, Horizon Coins, spawners, protección y ventajas
                  exclusivas para nuestro servidor Minecraft.
                </p>

                <div className="heroButtons">
                  <button
                    className="primaryButton"
                    onClick={scrollToShop}
                  >
                    Explorar tienda →
                  </button>

                  <button
                    className="secondaryButton"
                    onClick={scrollToBeforeBuy}
                  >
                    Antes de comprar
                  </button>
                </div>
              </div>

              <div className="heroSide">
                <div className="heroCard crown">
                  <div className="cardIcon">🏆</div>
                  <small>MÁXIMO DONADOR</small>
                  <h3>{MAX_DONOR_NAME}</h3>
                  <p>
                    El jugador que más ha donado durante{' '}
                    {monthLabel || 'este mes'}.
                  </p>
                </div>

                <div className="heroCard premium">
                  <div className="cardIcon">🛡️</div>
                  <small>AVISO PREMIUM</small>
                  <h3>Usa /premium</h3>
                  <p>
                    Si eres Premium, utiliza el comando antes de
                    realizar tu compra.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="content">
            <div className="notice">
              <div className="noticeCard warning">
                <div className="noticeIcon">!</div>
                <div>
                  <strong>Tienda oficial de HorizonMC</strong>
                  <p>
                    Asegúrate de que estás comprando en la tienda
                    oficial. No realizamos reembolsos por compras
                    realizadas en una tienda equivocada.
                  </p>
                </div>
              </div>

              <div className="noticeCard purple">
                <div className="noticeIcon">✓</div>
                <div>
                  <strong>Entrega dentro del servidor</strong>
                  <p>
                    Tus compras serán procesadas mediante Tip4Serv y
                    entregadas dentro de HorizonMC.
                  </p>
                </div>
              </div>
            </div>

            <section id="tienda">
              <div className="shopHead">
                <div>
                  <div className="eyebrow">TIENDA</div>
                  <h2>Productos de HorizonMC</h2>
                </div>

                <p>
                  Selecciona una categoría para ver sus productos.
                </p>
              </div>

              <div className="categoryBar">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`categoryButton ${
                      selected === category.name ? 'active' : ''
                    }`}
                    onClick={() => selectCategory(category)}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              {currentCategory?.subcategories?.length > 0 && (
                <div className="subBar">
                  {currentCategory.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.name}
                      className={`subButton ${
                        sub === subcategory.name ? 'active' : ''
                      }`}
                      onClick={() => setSub(subcategory.name)}
                    >
                      {subcategory.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="productsGrid">
                {products.length > 0 ? (
                  products.map((product) => (
                    <article
                      className="productCard"
                      key={product.id}
                    >
                      <div className="productTop">
                        <div className="productIcon">
                          {product.icon}
                        </div>

                        <button
                          className="productInfoButton"
                          aria-label={`Información sobre ${product.name}`}
                          onClick={() => setInfoProduct(product)}
                        >
                          i
                        </button>
                      </div>

                      <h3>{product.name}</h3>

                      <p>{product.desc}</p>

                      <div className="productBottom">
                        <div className="productPrice">
                          <small>PRECIO</small>
                          <strong>
                            {typeof product.price === 'number'
                              ? `${product.price.toFixed(2)} €`
                              : 'Precio pendiente'}
                          </strong>
                        </div>

                        <button
                          className="addProduct"
                          onClick={() => add(product)}
                        >
                          Añadir +
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="emptyProducts">
                    <strong>Próximamente</strong>
                    Esta categoría todavía no tiene productos.
                  </div>
                )}
              </div>
            </section>

            <section
              id="antes-de-comprar"
              className="beforeBuy"
            >
              <div className="eyebrow">ANTES DE COMPRAR</div>

              <h2>
                Información importante antes de realizar una compra
              </h2>

              <p>
                En nuestra tienda encontrarás únicamente artículos
                digitales que serán obtenidos dentro del servidor de
                HorizonMC. Estos artículos permiten disfrutar de
                diferentes ventajas mientras juegas.
              </p>

              <div className="beforeGrid">
                <div className="infoBox">
                  <h3>🛒 Antes de realizar tu compra</h3>

                  <ul>
                    <li>
                      Todas las compras realizadas están bajo la
                      regulación de Tip4Serv.
                    </li>

                    <li>
                      Asegúrate de tener el{' '}
                      <strong>inventario vacío</strong> cuando
                      compres objetos.
                    </li>

                    <li>
                      Los rangos son{' '}
                      <strong>personales e intransferibles</strong>.
                    </li>
                  </ul>
                </div>

                <div className="infoBox">
                  <h3>📦 ¿No has recibido tu artículo?</h3>

                  <p>
                    Si no recibes el artículo solicitado en un plazo
                    máximo de 24 horas, contacta con el equipo de
                    HorizonMC mediante Discord.
                  </p>

                  <a
                    className="discordButton"
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir Discord ↗
                  </a>
                </div>

                <div className="infoBox">
                  <h3>💳 Política de reembolsos</h3>

                  <p>
                    Los productos de nuestra tienda no son
                    reembolsables bajo las políticas establecidas por
                    Tip4Serv. Los productos digitales, monedas y
                    objetos virtuales no son aptos para reembolso bajo
                    ningún concepto.
                  </p>
                </div>

                <div className="infoBox">
                  <h3>⚠️ Compras y sanciones</h3>

                  <p>
                    No se admiten reembolsos cuando el motivo sea un
                    baneo por incumplir las normas del servidor o de
                    la tienda.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="soporte"
              className="support"
            >
              <div>
                <div className="eyebrow">SOPORTE</div>

                <h2>¿Necesitas ayuda?</h2>

                <p>
                  Contacta con el equipo de HorizonMC a través de
                  nuestro Discord.
                </p>
              </div>

              <a
                className="discordButton"
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
              >
                Discord del soporte →
              </a>
            </section>
          </div>

          <footer>
            <div>
              <strong style={{ color: '#8880ff' }}>
                HORIZONMC
              </strong>
            </div>

            <div>
              © 2026 HorizonMC. Todos los derechos reservados.
            </div>
          </footer>
        </div>
      </div>

      {authOpen && (
        <div
          className="overlay modalOverlay"
          onClick={() => setAuthOpen(false)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modalClose"
              onClick={() => setAuthOpen(false)}
            >
              ✕
            </button>

            <div className="eyebrow">HORIZONMC</div>

            <h2>
              {authMode === 'login'
                ? 'Iniciar sesión'
                : 'Crear cuenta'}
            </h2>

            <p className="modalIntro">
              {authMode === 'login'
                ? 'Entra en tu cuenta para gestionar tus compras y tu perfil.'
                : 'Crea tu cuenta de HorizonMC para poder iniciar sesión.'}
            </p>

            <form
              onSubmit={handleAuth}
              className="authForm"
            >
              <label>
                Usuario o correo

                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Tu usuario"
                />
              </label>

              {authMode === 'register' && (
                <label>
                  Correo electrónico

                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                  />
                </label>
              )}

              <label>
                Contraseña

                <input
                  name="password"
                  type="password"
                  autoComplete={
                    authMode === 'login'
                      ? 'current-password'
                      : 'new-password'
                  }
                  placeholder="••••••••"
                />
              </label>

              {authError && (
                <div className="authError">
                  {authError}
                </div>
              )}

              {authMessage && (
                <div className="authMessage">
                  {authMessage}
                </div>
              )}

              <button
                className="authSubmit"
                type="submit"
              >
                {authMode === 'login'
                  ? 'Entrar en mi cuenta'
                  : 'Crear cuenta'}
              </button>
            </form>

            <div className="authSwitch">
              {authMode === 'login' ? (
                <>
                  ¿No tienes cuenta?{' '}
                  <button onClick={openRegister}>
                    Crear cuenta
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <button onClick={openLogin}>
                    Iniciar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {infoProduct && (
        <div
          className="overlay modalOverlay"
          onClick={() => setInfoProduct(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modalClose"
              onClick={() => setInfoProduct(null)}
            >
              ✕
            </button>

            <div className="productInfoIcon">
              {infoProduct.icon}
            </div>

            <div className="eyebrow">
              INFORMACIÓN DEL PRODUCTO
            </div>

            <h2>{infoProduct.name}</h2>

            <p className="modalIntro">
              {infoProduct.desc}
            </p>

            <div className="checkoutTotal">
              <span>Precio</span>

              <strong>
                {Number(infoProduct.price).toFixed(2)} €
              </strong>
            </div>

            <button
              className="authSubmit"
              type="button"
              onClick={() => {
                add(infoProduct);
                setInfoProduct(null);
              }}
            >
              Añadir al carrito +
            </button>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div
          className="overlay modalOverlay"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modalClose"
              onClick={() => setCheckoutOpen(false)}
            >
              ✕
            </button>

            <div className="eyebrow">HORIZONMC</div>

            <h2>Finalizar compra</h2>

            <p className="modalIntro">
              Revisa tu pedido antes de continuar con el pago.
            </p>

            <div className="checkoutRows">
              {cart.map((product, index) => (
                <div
                  className="checkoutRow"
                  key={`${product.id}-${index}`}
                >
                  <span>
                    {product.icon} {product.name}
                  </span>

                  <strong>
                    {typeof product.price === 'number'
                      ? `${product.price.toFixed(2)} €`
                      : 'Precio pendiente'}
                  </strong>
                </div>
              ))}
            </div>

            {paymentResult ? (
              <div className="authMessage">
                {paymentResult}
              </div>
            ) : (
              <>
                <div className="checkoutTotal">
                  <span>Total</span>
                  <strong>
                    {cartTotal.toFixed(2)} €
                  </strong>
                </div>

                {paymentError && (
                  <div className="authError">
                    {paymentError}
                  </div>
                )}

                <button
                  className="paymentButton"
                  type="button"
                  onClick={payWithTip4Serv}
                  disabled={paymentLoading}
                >
                  {paymentLoading
                    ? 'Conectando con Tip4Serv…'
                    : 'Continuar con Tip4Serv →'}
                </button>
              </>
            )}

            <button
              className="backButton"
              type="button"
              onClick={() => {
                setCheckoutOpen(false);
                setCartOpen(true);
              }}
            >
              ← Volver al carrito
            </button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div
          className="overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawerTop">
              <h2>
                Tu carrito{' '}
                <span className="cartCount">
                  {cartCount}
                </span>
              </h2>

              <button
                aria-label="Cerrar carrito"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="emptyCart">
                <div className="emptyCartIcon">
                  🛒
                </div>

                <h3>Tu carrito está vacío</h3>

                <p>
                  Añade un producto para continuar.
                </p>
              </div>
            ) : (
              <div className="cartContent">
                <div className="cartItems">
                  {cart.map((product, index) => (
                    <div
                      className="cartItem"
                      key={`${product.id}-${index}`}
                    >
                      <span className="cartItemIcon">
                        {product.icon}
                      </span>

                      <div className="cartItemInfo">
                        <b>{product.name}</b>

                        <small>
                          {typeof product.price === 'number'
                            ? `${product.price.toFixed(2)} €`
                            : 'Precio pendiente'}
                        </small>
                      </div>

                      <button
                        className="removeItem"
                        aria-label={`Quitar ${product.name}`}
                        onClick={() =>
                          removeFromCart(index)
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cartBottom">
                  <div className="cartTotal">
                    <span>Total</span>

                    <strong>
                      {cartTotal.toFixed(2)} €
                    </strong>
                  </div>

                  <div className="cartBottomButtons">
                    <button
                      className="clearCart"
                      onClick={clearCart}
                    >
                      Vaciar
                    </button>

                    <button
                      className="checkoutButton"
                      onClick={startCheckout}
                    >
                      Continuar al pago →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}