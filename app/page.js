'use client';

import { useEffect, useState } from 'react';
import { PRODUCT_PRICES } from '../lib_products';

const DISCORD_URL = 'https://discord.gg/dhbtnptHsp';
const MAX_DONOR_NAME = 'GoodKyuX';

function currentMonthLabel() {
  return new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}

const categories = [
  {
    name: 'Survival 1.21.11',
    icon: '⛏️',
    subcategories: [
      {
        name: 'Dinero',
        products: [
          {
            id: 'dinero-100000',
            name: '100.000',
            icon: '💰',
            price: 4,
            desc: '100.000 de dinero para gastar en Survival.'
          },
          {
            id: 'dinero-250000',
            name: '250.000',
            icon: '💰',
            price: 8,
           desc: '250.000 de dinero para gastar en Survival.'
          },
          {
           id: 'dinero-500000',
            name: '500.000',
            icon: '💰',
            price: 16,
            desc: '500.000 de dinero para gastar en Survival.'
          },
          {
            id: 'dinero-1000000',
            name: '1.000.000',
            icon: '💰',
            price: 30,
            desc: '1.000.000 de dinero para gastar en Survival.'
          }
        ]
      },
      {
        name: 'Recolectores',
        products: [
          {
            id: 'recolector-cactus',
            name: 'Recolector de Cactus',
            icon: '🌵',
            price: 16,
            desc: 'Recolector de Cactus para Survival.'
          },
          {
            id: 'recolector-amatista',
            name: 'Recolector de Amatista',
            icon: '💎',
            price: 19,
            desc: 'Recolector de Amatista para Survival.'
          },
          {
            id: 'recolector-hierro',
            name: 'Recolector de Hierro',
            icon: '⛓️',
            price: 20,
            desc: 'Recolector de Hierro para Survival.'
          }
        ]
      },
      {
        name: 'Kits Premium',
        products: [
          {
            id: 'kit-aereo',
            name: 'Kit Aéreo',
            icon: '🪽',
            price: 14,
            desc: 'Kit Aéreo premium para Survival.'
          },
          {
            id: 'kit-spawner',
            name: 'Kit Spawner',
            icon: '🔥',
            price: 50,
            desc: 'Kit Spawner premium para Survival.'
          },
          {
            id: 'kit-obrero',
            name: 'Kit Obrero',
            icon: '⛏️',
            price: 25,
            desc: 'Kit Obrero premium para Survival.'
          },
          {
            id: 'kit-atlantis',
            name: 'Kit Atlantis',
            icon: '🌊',
            price: 35,
            desc: 'Kit Atlantis premium para Survival.'
          },
          {
            id: 'kit-celestial',
            name: 'Kit Celestial',
            icon: '✨',
            price: 50,
            desc: 'Kit Celestial premium para Survival.'
          },
          {
            id: 'kit-creador',
            name: 'Kit Creador',
            icon: '🎨',
            price: 60,
            desc: 'Kit Creador premium para Survival.'
          }
        ]
      },
      {
        name: 'Comandos',
        products: [
          {
            id: 'comando-condense-permanente',
            name: '/condense permanente',
            icon: '⚙️',
            price: 6,
            desc: 'Acceso permanente al comando /condense.'
          },
          {
            id: 'comando-fly-1-mes',
            name: '/fly (1 mes)',
            icon: '🪽',
            price: 6,
            desc: 'Acceso al comando /fly durante 1 mes.'
          },
          {
            id: 'comando-hack-permanente',
            name: '/hat permanente',
            icon: '⚡',
            price: 5,
            desc: 'Acceso permanente al comando /hat.'
          },
          {
            id: 'comando-school-permanente',
            name: '/skull permanente',
            icon: '📚',
            price: 6,
            desc: 'Acceso permanente al comando /skull.'
          },
          {
            id: 'comando-inse-permanente',
            name: '/invsee permanente',
            icon: '✨',
            price: 7,
            desc: 'Acceso permanente al comando /invsee.'
          },
          {
            id: 'fly-permanente',
            name: '/fly permanente',
            icon: '🪽',
            price: 18,
            desc: 'Acceso permanente a Fly.'
          }
        ]
      }
    ]
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
            desc: 'Rango VIP para destacar en HorizonMC.'
          },
          {
            id: 'vipplus',
            name: 'VIP+',
            icon: '💎',
            price: PRODUCT_PRICES.vipplus,
            desc: 'Mejora tu experiencia con el rango VIP+.'
          },
          {
            id: 'mvp',
            name: 'MVP',
            icon: '⭐',
            price: PRODUCT_PRICES.mvp,
            desc: 'Rango MVP con ventajas exclusivas.'
          }
        ]
      },
      {
        name: 'Rangos Básicos · Temporales',
        products: [
          {
            id: 'vip-temporal',
            name: 'VIP · Temporal',
            icon: '👑',
            price: null,
            desc: 'Rango VIP temporal.'
          },
          {
            id: 'vipplus-temporal',
            name: 'VIP+ · Temporal',
            icon: '💎',
            price: null,
            desc: 'Rango VIP+ temporal.'
          },
          {
            id: 'mvp-temporal',
            name: 'MVP · Temporal',
            icon: '⭐',
            price: null,
            desc: 'Rango MVP temporal.'
          }
        ]
      },
      {
        name: 'Rangos Avanzados',
        products: [
          {
            id: 'nova',
            name: 'NOVA',
            icon: '🌌',
            price: PRODUCT_PRICES.nova,
            desc: 'Rango avanzado NOVA para jugadores destacados.'
          },
          {
            id: 'vortes',
            name: 'VORTEX',
            icon: '🌀',
            price: PRODUCT_PRICES.vortes,
            desc: 'Rango avanzado VORTEX con beneficios especiales.'
          }
        ]
      },
      {
        name: 'Rangos Avanzados · Temporales',
        products: [
          {
            id: 'nova-temporal',
            name: 'NOVA · Temporal',
            icon: '🌌',
            price: null,
            desc: 'Rango NOVA temporal.'
          },
          {
            id: 'vortex-temporal',
            name: 'VORTEX · Temporal',
            icon: '🌀',
            price: null,
            desc: 'Rango VORTEX temporal.'
          }
        ]
      },
      {
        name: 'Rangos Premium',
        products: [
          {
            id: 'eterno',
            name: 'ETERNO',
            icon: '♾️',
            price: PRODUCT_PRICES.eterno,
            desc: 'Rango premium ETERNO para los jugadores más exclusivos.'
          },
          {
            id: 'divino',
            name: 'DIVINO',
            icon: '✨',
            price: PRODUCT_PRICES.divino,
            desc: 'El rango premium DIVINO con ventajas exclusivas.'
          }
        ]
      },
      {
        name: 'Rangos Premium · Temporales',
        products: [
          {
            id: 'eterno-temporal',
            name: 'ETERNO · Temporal',
            icon: '♾️',
            price: null,
            desc: 'Rango ETERNO temporal.'
          },
          {
            id: 'divino-temporal',
            name: 'DIVINO · Temporal',
            icon: '✨',
            price: null,
            desc: 'Rango DIVINO temporal.'
          }
        ]
      },
      {
        name: 'Rangos Permanentes',
        products: [
          {
            id: 'vip-permanente',
            name: 'VIP Permanente',
            icon: '👑',
            price: PRODUCT_PRICES.vip,
            desc: 'Rango VIP permanente para destacar en HorizonMC.'
          },
          {
            id: 'vipplus-permanente',
            name: 'VIP+ Permanente',
            icon: '💎',
            price: PRODUCT_PRICES.vipplus,
            desc: 'Rango VIP+ permanente con ventajas exclusivas.'
          },
          {
            id: 'mvp-permanente',
            name: 'MVP Permanente',
            icon: '⭐',
            price: PRODUCT_PRICES.mvp,
            desc: 'Rango MVP permanente con ventajas exclusivas.'
          },
          {
            id: 'nova-permanente',
            name: 'NOVA Permanente',
            icon: '🌌',
            price: PRODUCT_PRICES.nova,
            desc: 'Rango NOVA permanente para jugadores destacados.'
          },
          {
            id: 'vortes-permanente',
            name: 'VORTEX Permanente',
            icon: '🌀',
            price: PRODUCT_PRICES.vortes,
            desc: 'Rango VORTEX permanente con beneficios especiales.'
          },
          {
            id: 'eterno-permanente',
            name: 'ETERNO Permanente',
            icon: '♾️',
            price: PRODUCT_PRICES.eterno,
            desc: 'Rango ETERNO permanente para los jugadores más exclusivos.'
          },
          {
            id: 'divino-permanente',
            name: 'DIVINO Permanente',
            icon: '✨',
            price: PRODUCT_PRICES.divino,
            desc: 'El rango DIVINO permanente con ventajas exclusivas.'
          }
        ]
      },
      {
        name: 'Ascenso de rango',
        products: [
          {
            id: 'ascenso-vip-vipplus',
            name: 'VIP → VIP+',
            icon: '⬆️',
            price: 5,
            desc: 'Asciende tu rango de VIP a VIP+ pagando únicamente la diferencia.'
          },
          {
            id: 'ascenso-vipplus-mvp',
            name: 'VIP+ → MVP',
            icon: '⬆️',
            price: 5,
            desc: 'Asciende tu rango de VIP+ a MVP pagando únicamente la diferencia.'
          },
          {
            id: 'ascenso-mvp-nova',
            name: 'MVP → NOVA',
            icon: '⬆️',
            price: 10,
            desc: 'Asciende tu rango de MVP a NOVA pagando únicamente la diferencia.'
          },
          {
            id: 'ascenso-nova-vortex',
            name: 'NOVA → VORTEX',
            icon: '⬆️',
            price: 10,
            desc: 'Asciende tu rango de NOVA a VORTEX pagando únicamente la diferencia.'
          },
          {
            id: 'ascenso-vortex-eterno',
            name: 'VORTEX → ETERNO',
            icon: '⬆️',
            price: 15,
            desc: 'Asciende tu rango de VORTEX a ETERNO pagando únicamente la diferencia.'
          },
          {
            id: 'ascenso-eterno-divino',
            name: 'ETERNO → DIVINO',
            icon: '⬆️',
            price: 15,
            desc: 'Asciende tu rango de ETERNO a DIVINO pagando únicamente la diferencia.'
          }
        ]
      }
    ]
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
            desc: 'Piedra de protección de clan con un área de 200x200 bloques.'
          }
        ]
      }
    ]
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
            desc: 'Spawner de Golem.'
          },
          {
            id: 'spawner-de-enderman',
            name: 'Spawner de Enderman',
            icon: '👁️',
            price: PRODUCT_PRICES.enderman,
            desc: 'Spawner de Enderman.'
          },
          {
            id: 'spawner-de-blaze',
            name: 'Spawner de Blaze',
            icon: '🔥',
            price: PRODUCT_PRICES.blaze,
            desc: 'Spawner de Blaze.'
          },
          {
            id: 'spawner-de-shulker',
            name: 'Spawner de Shulker',
            icon: '🟪',
            price: PRODUCT_PRICES.shulker,
            desc: 'Spawner de Shulker.'
          },
          {
            id: 'spawner-de-creeper',
            name: 'Spawner de Creeper',
            icon: '💥',
            price: PRODUCT_PRICES.creeper,
            desc: 'Spawner de Creeper.'
          },
          {
            id: 'spawner-de-esqueleto',
            name: 'Spawner de Esqueleto',
            icon: '💀',
            price: PRODUCT_PRICES.esqueleto,
            desc: 'Spawner de Esqueleto.'
          },
          {
            id: 'spawner-de-vaca',
            name: 'Spawner de Vaca',
            icon: '🐄',
            price: PRODUCT_PRICES.vaca,
            desc: 'Spawner de Vaca.'
          },
          {
            id: 'spawner-de-cerdo',
            name: 'Spawner de Cerdo',
            icon: '🐷',
            price: PRODUCT_PRICES.cerdo,
            desc: 'Spawner de Cerdo.'
          },
          {
            id: 'spawner-de-zombi',
            name: 'Spawner de Zombie',
            icon: '🧟',
            price: PRODUCT_PRICES.zombie,
            desc: 'Spawner de Zombie.'
          }
        ]
      }
    ]
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
            desc: 'Servicio de desmuteo y limpieza de sanciones de chat.'
          },
          {
            id: 'desvaneo-discord',
            name: 'Desbaneo de Discord',
            icon: '💬',
            price: 17,
            desc: 'Servicio de desbaneo de Discord.'
          },
          {
            id: 'desvaneo-total',
            name: 'Desbaneo total',
            icon: '🔓',
            price: 30,
            desc: 'Servicio de desbaneo total.'
          },
          {
            id: 'prefijo-custom',
            name: 'Prefijo custom',
            icon: '🏷️',
            price: 10,
            desc: 'Personaliza tu prefijo dentro del servidor.'
          }
        ]
      }
    ]
  },
  {
    name: 'Coins',
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
            desc: '5.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'
          },
          {
            id: '10000-horizon-coins',
            name: '10.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['10000-horizon-coins'],
            desc: '10.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'
          },
          {
            id: '25000-horizon-coins',
            name: '25.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['25000-horizon-coins'],
            desc: '25.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'
          },
          {
            id: '50000-horizon-coins',
            name: '50.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['50000-horizon-coins'],
            desc: '50.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'
          },
          {
            id: '100000-horizon-coins',
            name: '100.000 Horizon Coins',
            icon: '🪙',
            price: PRODUCT_PRICES['100000-horizon-coins'],
            desc: '100.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'
          }
        ]
      }
    ]
  }
];

export default function Home() {
  const [selected, setSelected] = useState('Inicio');
  const [sub, setSub] = useState('Rangos Básicos');
  const [rangosOpen, setRangosOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
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
        setUser(JSON.parse(savedUser));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('horizonmc_current_user');

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser);

        if (parsedUser?.email) {
          setCustomerEmail(parsedUser.email);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tip4servStatus = params.get('tip4serv');

    if (tip4servStatus === 'cancelled') {
      setPaymentError('Has cancelado el pago.');
      setCheckoutOpen(true);

      window.history.replaceState(
        {},
        '',
        window.location.pathname
      );

      return;
    }

    if (tip4servStatus === 'success') {
      setPaymentResult(
        'Pago completado correctamente. Tu pedido ha sido recibido y Tip4Serv procesará la entrega en Minecraft.'
      );

      setPaymentError('');
      setPaymentLoading(false);
      setCart([]);
      setCheckoutOpen(true);

      window.history.replaceState(
        {},
        '',
        window.location.pathname
      );
    }
  }, []);

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

  function handleAuth(e) {
    e.preventDefault();

    setAuthError('');
    setAuthMessage('');

    const form = new FormData(e.currentTarget);

    const identifier = String(
      form.get('username') || ''
    ).trim();

    const username = identifier;

    const email = String(
      form.get('email') || ''
    ).trim().toLowerCase();

    const password = String(
      form.get('password') || ''
    );

    if (
      !username ||
      !password ||
      (authMode === 'register' && !email)
    ) {
      setAuthError('Completa todos los campos.');
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem('horizonmc_accounts') || '[]'
    );

    if (authMode === 'register') {
      if (username.length < 3) {
        setAuthError(
          'El usuario debe tener al menos 3 caracteres.'
        );

        return;
      }

      if (password.length < 6) {
        setAuthError(
          'La contraseña debe tener al menos 6 caracteres.'
        );

        return;
      }

      if (
        accounts.some(
          a =>
            a.username.toLowerCase() ===
            username.toLowerCase()
        )
      ) {
        setAuthError(
          'Ese nombre de usuario ya está registrado.'
        );

        return;
      }

      if (
        accounts.some(
          a => a.email === email
        )
      ) {
        setAuthError(
          'Ese correo ya está registrado.'
        );

        return;
      }

      const newUser = {
        username,
        email,
        password
      };

      localStorage.setItem(
        'horizonmc_accounts',
        JSON.stringify([
          ...accounts,
          newUser
        ])
      );

      localStorage.setItem(
        'horizonmc_current_user',
        JSON.stringify({
          username,
          email
        })
      );

      setUser({
        username,
        email
      });

      setCustomerEmail(email);
      setAuthMessage(
        'Cuenta creada correctamente.'
      );

      setAuthOpen(false);

      return;
    }

    const loginIdentifier = username.toLowerCase();

    const found = accounts.find(
      a =>
        (
          a.username.toLowerCase() === loginIdentifier ||
          a.email === loginIdentifier
        ) &&
        a.password === password
    );

    if (!found) {
      setAuthError(
        'Usuario/correo o contraseña incorrectos.'
      );

      return;
    }

    const loggedUser = {
      username: found.username,
      email: found.email
    };

    localStorage.setItem(
      'horizonmc_current_user',
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);
    setCustomerEmail(loggedUser.email);
    setAuthOpen(false);
  }

  function logout() {
    localStorage.removeItem(
      'horizonmc_current_user'
    );

    setUser(null);
    setAccountOpen(false);
  }

  const currentCategory =
    categories.find(
      c => c.name === selected
    ) || categories[0];

  const currentSub =
    currentCategory.subcategories.find(
      s => s.name === sub
    ) ||
    currentCategory.subcategories[0];

  const products =
    currentSub.products;

  function selectCategory(category) {
    setSelected(category.name);
    setSub(
      category.subcategories[0].name
    );
  }

  function goToCategory(category) {
    selectCategory(category);
    setRangosOpen(category.name === 'Rangos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function add(product) {
    setCart(prev => [
      ...prev,
      product
    ]);
  }

  function removeFromCart(index) {
    setCart(prev =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function startCheckout() {
    if (!cart.length) return;

    setPaymentError('');
    setPaymentResult('');
    setOpen(false);
    setCheckoutOpen(true);
  }

  async function payWithTip4Serv() {
    setPaymentError('');
    setPaymentResult('');

    if (!cart.length) {
      setPaymentError(
        'El carrito está vacío.'
      );

      return;
    }

    setPaymentLoading(true);

    try {
      const response = await fetch(
        '/api/tip4serv/checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart.map(p => ({
              id: p.id
            }))
          })
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.url
      ) {
        throw new Error(
          data.error ||
            'No se pudo iniciar el checkout de Tip4Serv.'
        );
      }

      window.location.href =
        data.url;
    } catch (err) {
      setPaymentError(
        err.message ||
          'No se pudo iniciar el pago.'
      );

      setPaymentLoading(false);
    }
  }

  const cartTotal =
    cart.reduce(
      (sum, p) =>
        sum +
        (
          typeof p.price === 'number'
            ? p.price
            : 0
        ),
      0
    );

  return (
    <main>
      <header className="nav">
        <div className="logo">
          <span>H</span> HORIZON
          <span>MC</span>
        </div>

        <div className="navActions">
          {user ? (
            <div className="accountWrap">
              <button
                className="accountBtn"
                onClick={() =>
                  setAccountOpen(
                    !accountOpen
                  )
                }
              >
                👤 Cuenta
              </button>

              {accountOpen && (
                <div className="accountMenu">
                  <div className="accountName">
                    👤{' '}
                    <strong>
                      {user.username}
                    </strong>
                  </div>

                  <div className="accountEmail">
                    {user.email}
                  </div>

                  <button
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="loginBtn"
              onClick={openLogin}
            >
              Iniciar sesión
            </button>
          )}

          <button
            className="cartBtn"
            onClick={() => setOpen(true)}
          >
            🛒 Carrito{' '}
            <b>{cart.length}</b>
          </button>
        </div>
      </header>

      <aside className="horizonSidebar" aria-label="Navegación de la tienda">
        <div className="sidebarBrand">
          <span className="sidebarBrandMark">H</span>
          <div>
            <strong>HORIZONMC</strong>
            <small>Tienda oficial</small>
          </div>
        </div>

        <div className="sidebarSection">
          <span className="sidebarLabel">NAVEGACIÓN</span>

          <button
            className={`sidebarItem ${selected === 'Inicio' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setSelected('Inicio');
              setRangosOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>🏠</span>
            <span>Inicio</span>
          </button>

          {categories.map(category => {
           const isRangos = category.name === 'Rangos';
           const isSurvival = category.name === 'Survival 1.21.11';

           return (
            <div
              key={category.name}
              className={
                isRangos || isSurvival
                  ? 'sidebarCategoryGroup'
                  : ''
             }
           >
             <button
               className={`sidebarItem ${
                 selected === category.name
                   ? 'active'
                   : ''
               }`}
               type="button"
               onClick={() => {
                 if (isRangos) {
                   setRangosOpen(prev => !prev);
                   setSurvivalOpen(false);
                   selectCategory(category);
                   window.scrollTo({
                     top: 0,
                     behavior: 'smooth'
                   });
                 } else if (isSurvival) {
                   setSurvivalOpen(prev => !prev);
                   setRangosOpen(false);
                   selectCategory(category);
                   window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                } else {
                  goToCategory(category);
                }
              }}
              aria-expanded={
                isRangos
                 ? rangosOpen
                 : isSurvival
                  ? survivalOpen
                  : undefined
              }
            >
              <span>{category.icon}</span>

              <span className="sidebarItemLabel">
                {category.name === 'Coins'
                  ? 'Horizon Coins'
                  : category.name}
            </span>

            {(isRangos || isSurvival) && (
              <span
                className={`sidebarArrow ${
                  (
                    isRangos
                      ? rangosOpen
                      : survivalOpen
                  )
                    ? 'open'
                    : ''
                }`}
                aria-hidden="true"
              >
                ›
              </span>
             )}
           </button>

           {(
            (isRangos && rangosOpen) ||
            (isSurvival && survivalOpen)
           ) && (
             <div className="sidebarSubcategories">
               {category.subcategories.map(
                 subcategory => (
                   <button
                     key={subcategory.name}
                     className={`sidebarSubItem ${
                       selected === category.name &&
                       sub === subcategory.name
                         ? 'active'
                         : ''
                     }`}
                     type="button"
                     onClick={() => {
                       setSelected(category.name);
                       setSub(subcategory.name);

                       window.requestAnimationFrame(
                         () => {
                           document
                             .getElementById('tienda')
                             ?.scrollIntoView({
                               behavior: 'smooth',
                               block: 'start'
                             });
                        }
                      );
                    }}
                  >
                    <span className="sidebarSubDot">
                      •
                    </span>

                    <span>
                      {subcategory.name}
                    </span>
                  </button>
                )
              )}
             </div>
           )}
          </div>
        );
      })}

          <button
            className={`sidebarItem ${selected === 'Antes de comprar' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setSelected('Antes de comprar');
              setRangosOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>📋</span>
            <span>Antes de comprar</span>
          </button>
        </div>

        <div className="sidebarBottom">
          <div className="sidebarMiniCard">
            <span>🏆</span>
            <div>
              <small>MÁXIMO DONADOR</small>
              <strong>{MAX_DONOR_NAME}</strong>
            </div>
          </div>

          <div className="sidebarMiniCard premium">
            <span>⚠️</span>
            <div>
              <small>AVISO PREMIUM</small>
              <strong>Si eres Premium, asegúrate de tener puesto el comando /premium en el Servidor antes de comprar.</strong>
            </div>
          </div>
        </div>
      </aside>

      <div className="pageWithSidebar">
        {selected === 'Inicio' && (
          <section id="inicio" className="homeIntro standalonePage">
            <div className="homeIntroGlow"></div>
            <div className="homeIntroInner">
              <div className="welcomeCopy">
                <div className="pill">✦ TIENDA OFICIAL DE HORIZONMC</div>
                <h1>Bienvenido a la tienda oficial de <em>HorizonMC</em></h1>
                <p className="welcomeLead">Aquí podrás adquirir artículos para mejorar tu experiencia dentro del servidor. Ofrecemos rangos y ventajas globales y por modalidades.</p>
                <p className="welcomeLead">Elige una categoría desde el menú lateral para entrar directamente en su página.</p>
                <button className="primary" type="button" onClick={() => { const category = categories.find(c => c.name === 'Rangos'); if (category) goToCategory(category); }}>Ver tienda <span>→</span></button>
              </div>

              <div className="welcomeVisual creatorCard">
                <div className="welcomeOrb creatorOrb" aria-hidden="true">👑</div>
                <span className="creatorLabel">CREADOR</span>
                <span className="creatorName">Yeezy</span>
                <div className="skinFrame">
                  <img src="/creator-skin.png" alt="Skin del creador de HorizonMC" />
                </div>
              </div>

              <div className="homePanels">
                <article className="homePanel warningPanel">
                  <div className="panelIcon">!</div>
                  <div>
                    <span className="panelEyebrow">IMPORTANTE</span>
                    <h2>Estás en la tienda oficial de HorizonMC</h2>
                    <p>Asegúrate de que estás comprando en la tienda correcta. No realizamos reembolsos por compras realizadas en una tienda equivocada.</p>
                  </div>
                </article>

                <article className="homePanel premiumPanel">
                  <div className="panelIcon">✓</div>
                  <div>
                    <span className="panelEyebrow">IMPORTANTE PARA PREMIUM</span>
                    <h2>Si eres Premium, usa /premium antes de comprar</h2>
                    <p>Por seguridad, asegúrate de tener puesto el comando <strong>/premium</strong> en el servidor antes de realizar tu compra.</p>
                  </div>
                </article>

                <article className="homePanel donorPanel">
                  <div className="donorCrown">🏆</div>
                  <div>
                    <span className="panelEyebrow">MÁXIMO DONADOR</span>
                    <h2>{MAX_DONOR_NAME}</h2>
                    <p>Fue quien más donó durante <strong>{monthLabel || 'este mes'}</strong>.</p>
                    <small>El periodo se actualiza cada mes.</small>
                  </div>
                </article>

                <article className="homePanel paymentPanel">
                  <div className="panelIcon">💳</div>
                  <div className="paymentPanelContent">
                    <span className="panelEyebrow">MÉTODOS DE PAGO</span>
                    <h2>Más de 45 métodos de pago disponibles</h2>
                    <p>Paga de forma segura utilizando los métodos disponibles para tu país.</p>

                    <div className="paymentBrands" aria-label="Métodos de pago disponibles">
                      <span className="paymentBrand visa">VISA</span>
                      <span className="paymentBrand mastercard"><i></i><i></i></span>
                      <span className="paymentBrand amex">AMERICAN<br />EXPRESS</span>
                      <span className="paymentBrand paypal">P</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {selected === 'Antes de comprar' && (
          <section id="antes-de-comprar" className="beforeBuy standalonePage">
            <div className="beforeBuyInner">
              <div className="eyebrow">ANTES DE COMPRAR</div>
              <h2>¿Eres padre y tienes dudas sobre lo que tu hij@ quiere adquirir?</h2>
              <p className="beforeLead">En nuestra tienda encontrarás únicamente artículos digitales que serán obtenidos dentro del servidor de HorizonMC. Con estos artículos tu hij@ puede disfrutar y utilizarlos mientras juega. También tendrá acceso prioritario (con la compra de un rango) a la hora de conectarse al servidor si este está lleno o, por ejemplo, tendrá su nombre remarcado en colores, lo que le hará destacar frente a otros jugadores.</p>

              <div className="beforeBuyNotice">
                <h3>Información importante antes de comprar</h3>
                <ul>
                  <li>Todas las compras realizadas en esta tienda de HorizonMC están bajo la regulación de Tip4Serv. Al comprar, aceptas sus términos y condiciones. Revísalos antes de comprar nada.</li>
                  <li>Al realizar una compra de objetos, asegúrate de tener el <strong>inventario vacío</strong> para no perder ningún ítem. En caso de pérdida o muerte dentro del juego, HorizonMC no se hace responsable.</li>
                  <li>Los rangos son <strong>personales e intransferibles</strong>.</li>
                </ul>
              </div>

              <div className="beforeBuySupport">
                <h3>¿No has recibido tu artículo?</h3>
                <p>En caso de no recibir el artículo solicitado en un plazo <strong>máximo de 24 horas</strong>, contacta con el equipo de HorizonMC a través de nuestro Discord.</p>
                <a className="discordButton" href={DISCORD_URL}>
                  Abrir Discord <span>↗</span>
                </a>
              </div>

              <div className="refundBox">
                <div className="eyebrow">REEMBOLSO DE PRODUCTOS</div>
                <h3>Política de reembolsos</h3>
                <p>Los productos de nuestra tienda no son reembolsables, bajo las políticas y leyes establecidas por Tip4Serv. Esto se debe a las características únicas de las transacciones digitales, donde los bienes y servicios se consumen instantáneamente y no pueden devolverse en las mismas condiciones que los artículos físicos. Los productos que incluyan monedas o cualquier objeto virtual <strong>no son aptos para reembolso bajo ningún concepto</strong>.</p>
                <p>En casos <strong>muy excepcionales</strong>, se podrá emitir el reembolso de una compra si el propietario del servidor/tienda o los encargados responsables lo deciden y aprueban en consenso tras supervisar el caso. Esto podrá suceder principalmente cuando se produzca un fallo en la entrega de la compra.</p>
                <p><strong>No admitimos reembolsos</strong> de nuestros productos si el motivo es un baneo por incumplir nuestros términos de servicio y/o las normas de nuestro servidor o tienda.</p>
              </div>
            </div>
          </section>
        )}

        {selected !== 'Inicio' && selected !== 'Antes de comprar' && currentCategory && (
          <section id="tienda" className="shop standaloneShopPage">
            <div className="shopPageHeader">
              <div className="eyebrow">{currentCategory.icon} {currentCategory.name.toUpperCase()}</div>
              <h1>{currentCategory.name}</h1>
              <p>Selecciona una subcategoría y encuentra los productos disponibles.</p>
            </div>

            {currentCategory.subcategories.length > 1 && (
              <div className="categoryTabs">
                {currentCategory.subcategories.map(subcategory => (
                  <button
                    key={subcategory.name}
                    type="button"
                    className={`categoryTab ${sub === subcategory.name ? 'active' : ''}`}
                    onClick={() => {
                      setSub(subcategory.name);
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            )}

            <div className="currentTitle">
              <div className="eyebrow">CATEGORÍA</div>
              <h3>{currentSub.name}</h3>
            </div>

            <div className="grid">
              {products.map(p => (
                <article className="product" key={p.id}>
                  <div className="productIcon">{p.icon}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>

                  <div className="buyRow">
                    <strong>
                      {typeof p.price === 'number'
                        ? `${p.price.toFixed(2)} €`
                        : 'Precio pendiente'}
                    </strong>

                    <div className="productActions">
                      <button
                        className="infoButton"
                        aria-label={`Información sobre ${p.name}`}
                        onClick={() => setInfoProduct(p)}
                      >
                        !
                      </button>

                      <button
                        className="addButton"
                        aria-label={`Añadir ${p.name} al carrito`}
                        onClick={() => add(p)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {authOpen && (
        <div
          className="overlay authOverlay"
          onClick={() =>
            setAuthOpen(false)
          }
        >
          <div
            className="authModal"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <button
              className="authClose"
              onClick={() =>
                setAuthOpen(false)
              }
            >
              ✕
            </button>

            <div className="eyebrow">
              HORIZONMC
            </div>

            <h2>
              {authMode === 'login'
                ? 'Iniciar sesión'
                : 'Crear cuenta'}
            </h2>

            <p className="authIntro">
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

              {authMode === 'login' && (
                <input
                  name="email"
                  type="hidden"
                  value=""
                  readOnly
                />
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
                  <button
                    onClick={openRegister}
                  >
                    Crear cuenta
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={openLogin}
                  >
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
          className="overlay authOverlay"
          onClick={() =>
            setInfoProduct(null)
          }
        >
          <div
            className="authModal productInfoModal"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <button
              className="authClose"
              onClick={() =>
                setInfoProduct(null)
              }
            >
              ✕
            </button>

            <div className="productInfoIcon">
              {infoProduct.icon}
            </div>

            <div className="eyebrow">
              INFORMACIÓN DEL PRODUCTO
            </div>

            <h2>
              {infoProduct.name}
            </h2>

            <p className="authIntro">
              {infoProduct.desc}
            </p>

            <div className="checkoutTotal">
              <span>
                Precio
              </span>

              <strong>
                {Number(
                  infoProduct.price
                ).toFixed(2)} €
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
          className="overlay authOverlay"
          onClick={() =>
            setCheckoutOpen(false)
          }
        >
          <div
            className="authModal checkoutModal"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <button
              className="authClose"
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              ✕
            </button>

            <div className="eyebrow">
              HORIZONMC
            </div>

            <h2>
              Finalizar compra
            </h2>

            <p className="authIntro">
              Revisa tu pedido antes de
              continuar con el pago.
            </p>

            <div className="checkoutSummary">
              {cart.map((p, i) => (
                <div
                  className="checkoutRow"
                  key={`${p.id}-${i}`}
                >
                  <span>
                    {p.icon} {p.name}
                  </span>

                  <strong>
                    {typeof p.price ===
                    'number'
                      ? `${p.price.toFixed(2)} €`
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
                  <span>
                    Total
                  </span>

                  <strong>
                    {cartTotal.toFixed(2)} €
                  </strong>
                </div>

                {paymentError && (
                  <div className="authError">
                    {paymentError}
                  </div>
                )}

                <div className="paymentButtons">
                  <button
                    className="stripePayButton"
                    type="button"
                    onClick={
                      payWithTip4Serv
                    }
                    disabled={
                      paymentLoading
                    }
                  >
                    {paymentLoading
                      ? 'Conectando con Tip4Serv…'
                      : 'Continuar con Tip4Serv →'}
                  </button>
                </div>
              </>
            )}

            <button
              className="backCart"
              type="button"
              onClick={() => {
                setCheckoutOpen(false);
                setOpen(true);
              }}
            >
              ← Volver al carrito
            </button>
          </div>
        </div>
      )}

      {open && (
        <div
          className="overlay"
          onClick={() =>
            setOpen(false)
          }
        >
          <aside
            className="drawer"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <div className="drawerTop">
              <h2>
                Tu carrito{' '}
                <span className="cartCount">
                  {cart.length}
                </span>
              </h2>

              <button
                aria-label="Cerrar carrito"
                onClick={() =>
                  setOpen(false)
                }
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty">
                🛒

                <h3>
                  Tu carrito está vacío
                </h3>

                <p>
                  Añade un producto para
                  continuar.
                </p>
              </div>
            ) : (
              <div className="cartContent">
                <div className="cartItems">
                  {cart.map((p, i) => (
                    <div
                      className="cartItem"
                      key={`${p.id}-${i}`}
                    >
                      <span className="cartItemIcon">
                        {p.icon}
                      </span>

                      <div className="cartItemInfo">
                        <b>
                          {p.name}
                        </b>

                        <small>
                          {p.price}
                        </small>
                      </div>

                      <button
                        className="removeItem"
                        aria-label={`Quitar ${p.name}`}
                        onClick={() =>
                          removeFromCart(i)
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cartBottom">
                  <button
                    className="clearCart"
                    onClick={clearCart}
                  >
                    Vaciar carrito
                  </button>

                  <button
                    className="checkout"
                    onClick={
                      startCheckout
                    }
                  >
                    Continuar al pago →
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      <style jsx>{`
        .horizonSidebar {
          position: fixed;
          left: 18px;
          top: 96px;
          bottom: 18px;
          width: 238px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          padding: 18px 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          background: rgba(10, 12, 18, 0.96);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(18px);
          overflow-y: auto;
        }

        .sidebarBrand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 7px 18px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .sidebarBrandMark {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, #ffffff, #8f96a3);
          color: #090b10;
          font-weight: 900;
        }

        .sidebarBrand strong,
        .sidebarBrand small {
          display: block;
        }

        .sidebarBrand strong {
          font-size: 13px;
          letter-spacing: 0.08em;
        }

        .sidebarBrand small {
          margin-top: 2px;
          color: rgba(255, 255, 255, 0.45);
          font-size: 10px;
        }

        .sidebarSection {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sidebarLabel {
          padding: 8px 10px 5px;
          color: rgba(255, 255, 255, 0.35);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .sidebarItem {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 12px;
          border: 1px solid transparent;
          border-radius: 12px;
          background: transparent;
          color: rgba(255, 255, 255, 0.72);
          text-align: left;
          font: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .sidebarItem:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          transform: translateX(2px);
        }

        .sidebarItem.active {
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(255, 255, 255, 0.12);
          color: #fff;
          box-shadow: inset 3px 0 0 #fff;
        }

        .sidebarCategoryGroup {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .sidebarItemLabel {
          flex: 1;
        }

        .sidebarArrow {
          display: grid;
          place-items: center;
          width: 22px;
          height: 22px;
          margin-left: auto;
          color: rgba(255, 255, 255, 0.5);
          font-size: 22px;
          line-height: 1;
          transform: rotate(0deg);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .sidebarArrow.open {
          transform: rotate(90deg);
          color: #fff;
        }

        .sidebarItem > span:first-child {
          width: 22px;
          text-align: center;
          font-size: 16px;
        }

        .sidebarSubcategories {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin: 0 0 4px 33px;
          padding-left: 10px;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sidebarSubItem {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 10px;
          border: 1px solid transparent;
          border-radius: 9px;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          text-align: left;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .sidebarSubItem:hover {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .sidebarSubItem.active {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .sidebarSubDot {
          width: 10px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 14px;
          line-height: 1;
        }

        .sidebarSubItem.active .sidebarSubDot {
          color: #fff;
        }

        .sidebarBottom {
          display: grid;
          gap: 8px;
          margin-top: auto;
          padding-top: 14px;
        }

        .sidebarMiniCard {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .sidebarMiniCard > span {
          font-size: 18px;
        }

        .sidebarMiniCard small,
        .sidebarMiniCard strong {
          display: block;
        }

        .sidebarMiniCard small {
          color: rgba(255, 255, 255, 0.35);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .sidebarMiniCard strong {
          margin-top: 2px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 11px;
        }

        .sidebarMiniCard.premium {
          align-items: flex-start;
        }

        .sidebarMiniCard.premium strong {
          line-height: 1.35;
          font-size: 10px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.68);
        }

        .welcomeCopy h1 em {
          color: #b58cff !important;
          font-style: normal;
        }

        .homePanels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 38px;
          width: 100%;
        }

        .homePanel {
          min-width: 0;
          min-height: 145px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.035);
        }

        .homePanel > div:last-child {
          min-width: 0;
          flex: 1;
        }

        .homePanel h2 {
          margin: 5px 0 9px;
          line-height: 1.25;
        }

        .homePanel p {
          margin: 0;
          line-height: 1.65;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .product {
          min-width: 0;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.035);
        }

        .product h3 {
          margin: 13px 0 9px;
          line-height: 1.3;
        }

        .product p {
          margin: 0;
          min-height: 48px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }

        .buyRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: auto;
          padding-top: 22px;
        }

        .productActions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .infoButton,
        .addButton {
          min-width: 38px;
          height: 38px;
          padding: 0 12px;
          border-radius: 10px;
        }

        .paymentPanel {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .paymentPanelContent {
          min-width: 0;
          flex: 1;
        }

        .paymentPanel h2 {
          margin: 4px 0 7px;
        }

        .paymentPanel p {
          margin: 0 0 14px;
        }

        .paymentBrands {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .paymentBrand {
          height: 30px;
          min-width: 40px;
          padding: 0 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background: #fff;
          color: #111;
          font-weight: 900;
          line-height: 1;
          box-sizing: border-box;
        }

        .paymentBrand.visa {
          color: #173ea5;
          font-size: 12px;
        }

        .paymentBrand.mastercard {
          position: relative;
          width: 40px;
          min-width: 40px;
          overflow: hidden;
        }

        .paymentBrand.mastercard i {
          position: absolute;
          width: 19px;
          height: 19px;
          border-radius: 50%;
        }

        .paymentBrand.mastercard i:first-child {
          left: 6px;
          background: #eb001b;
        }

        .paymentBrand.mastercard i:last-child {
          right: 6px;
          background: #f79e1b;
        }

        .paymentBrand.amex {
          min-width: 42px;
          background: #1476c6;
          color: #fff;
          font-size: 5px;
          line-height: 0.9;
          text-align: center;
          letter-spacing: 0.02em;
        }

        .paymentBrand.paypal {
          min-width: 40px;
          background: #0874b9;
          color: #fff;
          font-size: 21px;
          font-style: italic;
        }

        .paymentMethodsText {
          color: #9bdcff;
          font-size: 15px;
          white-space: nowrap;
        }

        .paymentMethodsText strong {
          font-weight: 600;
        }

        .pageWithSidebar {
          padding-left: 276px;
        }

        #tienda {
          scroll-margin-top: 96px;
        }

        .standalonePage,
        .standaloneShopPage {
          min-height: calc(100vh - 96px);
          scroll-margin-top: 96px;
        }

        .standaloneShopPage {
          padding-top: 80px;
          padding-bottom: 100px;
        }

        .shopPageHeader {
          max-width: 820px;
          margin: 0 auto 30px;
          text-align: center;
        }

        .shopPageHeader h1 {
          margin: 8px 0 10px;
          font-size: clamp(38px, 5vw, 64px);
        }

        .shopPageHeader p {
          color: rgba(255,255,255,.52);
          margin: 0;
        }

        .categoryTabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 auto 36px;
        }

        .categoryTab {
          padding: 10px 15px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 999px;
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.6);
          cursor: pointer;
          font: inherit;
          transition: .18s ease;
        }

        .categoryTab:hover,
        .categoryTab.active {
          color: #fff;
          background: rgba(255,255,255,.1);
          border-color: rgba(255,255,255,.16);
        }

        @media (max-width: 1200px) {
          /* En ventanas intermedias el contenido pierde ancho por la barra lateral.
             Los paneles de inicio pasan a una sola columna para que el texto
             nunca quede comprimido palabra por palabra. */
          .homePanels {
            grid-template-columns: 1fr;
          }

          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .horizonSidebar {
            position: sticky;
            top: 76px;
            left: auto;
            bottom: auto;
            width: calc(100% - 24px);
            margin: 12px;
            max-height: none;
            flex-direction: row;
            align-items: center;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 8px;
            border-radius: 14px;
          }

          .sidebarBrand,
          .sidebarBottom,
          .sidebarLabel {
            display: none;
          }

          .sidebarSection {
            flex-direction: row;
            width: max-content;
          }

          .sidebarItem {
            width: auto;
            white-space: nowrap;
            padding: 9px 11px;
          }

          .pageWithSidebar {
            padding-left: 0;
          }

          .homePanels {
            grid-template-columns: 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .paymentPanel {
            align-items: flex-start;
          }

          .paymentBrands {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </main>
  );
}