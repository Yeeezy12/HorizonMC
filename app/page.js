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
            name: '/fly · 1 mes',
            icon: '🪽',
            price: 6,
            desc: 'Acceso al comando /fly durante 1 mes.'
          },
          {
            id: 'comando-hack-permanente',
            name: '/hack permanente',
            icon: '⚡',
            price: 5,
            desc: 'Acceso permanente al comando /hack.'
          },
          {
            id: 'comando-school-permanente',
            name: '/school permanente',
            icon: '📚',
            price: 6,
            desc: 'Acceso permanente al comando /school.'
          },
          {
            id: 'comando-inse-permanente',
            name: '/inse permanente',
            icon: '✨',
            price: 7,
            desc: 'Acceso permanente al comando /inse.'
          },
          {
            id: 'fly-permanente',
            name: 'Fly permanente',
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
            desc: 'Rango premium DIVINO con ventajas exclusivas.'
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
            name: 'Desvaneo de Discord',
            icon: '💬',
            price: 17,
            desc: 'Servicio de desvaneo de Discord.'
          },
          {
            id: 'desvaneo-total',
            name: 'Desvaneo total',
            icon: '🔓',
            price: 30,
            desc: 'Servicio de desvaneo total.'
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
  const [selected, setSelected] = useState('Rangos');
  const [sub, setSub] = useState('Rangos Básicos');
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

    const username = String(
      form.get('username') || ''
    ).trim();

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

    const identifier = username.toLowerCase();

    const found = accounts.find(
      a =>
        (
          a.username.toLowerCase() === identifier ||
          a.email === identifier
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
    );

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

    window.requestAnimationFrame(() => {
      document.getElementById('tienda')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
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

      <aside
        className="horizonSidebar"
        aria-label="Navegación de la tienda"
      >
        <div className="sidebarBrand">
          <span className="sidebarBrandMark">H</span>

          <div>
            <strong>HORIZONMC</strong>
            <small>Tienda oficial</small>
          </div>
        </div>

        <div className="sidebarSection">
          <span className="sidebarLabel">
            NAVEGACIÓN
          </span>

          <button
            className="sidebarItem"
            type="button"
            onClick={() =>
              document.getElementById('inicio')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            }
          >
            <span>🏠</span>
            <span>Inicio</span>
          </button>

          {categories.map(category => (
            <button
              key={category.name}
              className={`sidebarItem ${
                selected === category.name ? 'active' : ''
              }`}
              type="button"
              onClick={() => goToCategory(category)}
            >
              <span>{category.icon}</span>

              <span>
                {category.name === 'Coins'
                  ? 'Horizon Coins'
                  : category.name}
              </span>
            </button>
          ))}

          <button
            className="sidebarItem"
            type="button"
            onClick={() =>
              document
                .getElementById('antes-de-comprar')
                ?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
            }
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
              <strong>Usa /premium</strong>
            </div>
          </div>
        </div>
      </aside>

      <div className="pageWithSidebar">