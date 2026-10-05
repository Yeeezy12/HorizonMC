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
            desc: 'El rango premium DIVINO con ventajas exclusivas.'
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

            return (
              <div
                key={category.name}
                className={isRangos ? 'sidebarCategoryGroup' : ''}
              >
                <button
                  className={`sidebarItem ${
                    selected === category.name ? 'active' : ''
                  }`}
                  type="button"
                  onClick={() => {
                    if (isRangos) {
                      setRangosOpen(prev => !prev);
                      selectCategory(category);
                      goToCategory(category);
                    } else {
                      goToCategory(category);
                    }
                  }}
                  aria-expanded={isRangos ? rangosOpen : undefined}
                >
                  <span>{category.icon}</span>
                  <span className="sidebarItemLabel">
                    {category.name === 'Coins'
                      ? 'Horizon Coins'
                      : category.name}
                  </span>
                  {isRangos && (
                    <span
                      className={`sidebarArrow ${
                        rangosOpen ? 'open' : ''
                      }`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  )}
                </button>

                {isRangos && rangosOpen && (
                  <div className="sidebarSubcategories">
                    {category.subcategories.map(subcategory => (
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
                          window.requestAnimationFrame(() => {
                            document
                              .getElementById('tienda')
                              ?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                              });
                          });
                        }}
                      >
                        <span className="sidebarSubDot">•</span>
                        <span>{subcategory.name}</span>
                      </button>
                    ))}
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
                <h1>Bienvenido a la tienda oficial de <em>HorizonMC.</em></h1>
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

                      <span className="paymentBrand mastercard">
                        <i></i>
                        <i></i>
                      </span>

                      <span className="paymentBrand amex">
                        AMERICAN
                        <br />
                        EXPRESS
                      </span>

                      <span className="paymentBrand paypal">
                        P
                      </span>
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
              <div className="eyebrow">{currentCategory.icon} {currentCategory.name}</div>
              <h1>{currentSub.name}</h1>
              <p>Selecciona el producto que quieras adquirir para ver toda la información.</p>
            </div>

            <div className="categoryTabs">
              {currentCategory.subcategories.map(subcategory => (
                <button
                  key={subcategory.name}
                  type="button"
                  className={`categoryTab ${
                    currentSub.name === subcategory.name ? 'active' : ''
                  }`}
                  onClick={() => setSub(subcategory.name)}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>

            <div className="productGrid">
              {products.map(product => (
                <article className="productCard" key={product.id}>
                  <div className="productIcon">
                    {product.icon}
                  </div>

                  <div className="productCardBody">
                    <span className="productCategory">
                      {currentSub.name}
                    </span>

                    <h3>{product.name}</h3>

                    <p>{product.desc}</p>

                    <div className="productBottom">
                      <strong className="productPrice">
                        {product.price}€
                      </strong>

                      <div className="productActions">
                        <button
                          className="infoButton"
                          type="button"
                          onClick={() => setInfoProduct(product)}
                        >
                          Info
                        </button>

                        <button
                          className="addButton"
                          type="button"
                          onClick={() => add(product)}
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {infoProduct && (
        <div
          className="modalBackdrop"
          onClick={() => setInfoProduct(null)}
        >
          <div
            className="infoModal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modalClose"
              type="button"
              onClick={() => setInfoProduct(null)}
            >
              ×
            </button>

            <div className="infoProductIcon">
              {infoProduct.icon}
            </div>

            <div className="eyebrow">INFORMACIÓN DEL PRODUCTO</div>

            <h2>{infoProduct.name}</h2>

            <p>{infoProduct.desc}</p>

            <div className="infoPrice">
              {infoProduct.price}€
            </div>

            <button
              className="primary fullButton"
              type="button"
              onClick={() => {
                add(infoProduct);
                setInfoProduct(null);
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      )}

      {open && (
        <div
          className="cartBackdrop"
          onClick={() => setOpen(false)}
        >
          <aside
            className="cartDrawer"
            onClick={e => e.stopPropagation()}
          >
            <div className="cartHeader">
              <div>
                <span className="eyebrow">TU COMPRA</span>
                <h2>Carrito</h2>
              </div>

              <button
                className="modalClose"
                type="button"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="cartContent">
              {!cart.length ? (
                <div className="emptyCart">
                  <div>🛒</div>
                  <h3>Tu carrito está vacío</h3>
                  <p>Añade productos desde la tienda para continuar.</p>
                </div>
              ) : (
                <>
                  <div className="cartItems">
                    {cart.map((product, index) => (
                      <div
                        className="cartItem"
                        key={`${product.id}-${index}`}
                      >
                        <div className="cartItemIcon">
                          {product.icon}
                        </div>

                        <div className="cartItemInfo">
                          <strong>{product.name}</strong>
                          <span>{product.price}€</span>
                        </div>

                        <button
                          className="removeCartItem"
                          type="button"
                          onClick={() => removeFromCart(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cartFooter">
                    <div className="cartTotalRow">
                      <span>Total</span>
                      <strong>{cartTotal.toFixed(2)}€</strong>
                    </div>

                    <button
                      className="primary fullButton"
                      type="button"
                      onClick={startCheckout}
                    >
                      Finalizar compra
                    </button>

                    <button
                      className="clearCartButton"
                      type="button"
                      onClick={clearCart}
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div
          className="modalBackdrop"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="checkoutModal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modalClose"
              type="button"
              onClick={() => setCheckoutOpen(false)}
            >
              ×
            </button>

            <div className="eyebrow">FINALIZAR COMPRA</div>

            <h2>Revisa tu pedido</h2>

            {paymentResult ? (
              <div className="paymentSuccess">
                <div className="successIcon">✓</div>
                <h3>Pago completado</h3>
                <p>{paymentResult}</p>
              </div>
            ) : (
              <>
                <div className="checkoutProducts">
                  {cart.map((product, index) => (
                    <div
                      className="checkoutProduct"
                      key={`${product.id}-${index}`}
                    >
                      <span>
                        {product.icon} {product.name}
                      </span>

                      <strong>
                        {product.price}€
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="checkoutTotal">
                  <span>Total</span>
                  <strong>{cartTotal.toFixed(2)}€</strong>
                </div>

                {paymentError && (
                  <div className="paymentError">
                    {paymentError}
                  </div>
                )}

                <label className="checkoutLabel">
                  Correo electrónico
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </label>

                <button
                  className="primary fullButton"
                  type="button"
                  disabled={paymentLoading}
                  onClick={payWithTip4Serv}
                >
                  {paymentLoading
                    ? 'Conectando con Tip4Serv...'
                    : 'Continuar al pago'}
                </button>

                <p className="checkoutNote">
                  Serás redirigido a Tip4Serv para completar el pago de forma segura.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {authOpen && (
        <div
          className="modalBackdrop"
          onClick={() => setAuthOpen(false)}
        >
          <div
            className="authModal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modalClose"
              type="button"
              onClick={() => setAuthOpen(false)}
            >
              ×
            </button>

            <div className="eyebrow">
              {authMode === 'login'
                ? 'CUENTA HORIZONMC'
                : 'CREAR CUENTA'}
            </div>

            <h2>
              {authMode === 'login'
                ? 'Iniciar sesión'
                : 'Crear cuenta'}
            </h2>

            <form onSubmit={handleAuth}>
              <label className="checkoutLabel">
                Usuario
                <input
                  name="username"
                  type="text"
                  placeholder="Tu usuario"
                  autoComplete="username"
                />
              </label>

              {authMode === 'register' && (
                <label className="checkoutLabel">
                  Correo electrónico
                  <input
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </label>
              )}

              <label className="checkoutLabel">
                Contraseña
                <input
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  autoComplete={
                    authMode === 'login'
                      ? 'current-password'
                      : 'new-password'
                  }
                />
              </label>

              {authError && (
                <div className="paymentError">
                  {authError}
                </div>
              )}

              {authMessage && (
                <div className="paymentSuccess compact">
                  {authMessage}
                </div>
              )}

              <button
                className="primary fullButton"
                type="submit"
              >
                {authMode === 'login'
                  ? 'Iniciar sesión'
                  : 'Crear cuenta'}
              </button>
            </form>

            <button
              className="switchAuth"
              type="button"
              onClick={() => {
                setAuthMode(
                  authMode === 'login'
                    ? 'register'
                    : 'login'
                );
                setAuthError('');
                setAuthMessage('');
              }}
            >
              {authMode === 'login'
                ? '¿No tienes cuenta? Crear una'
                : '¿Ya tienes cuenta? Iniciar sesión'}
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 50% -10%, rgba(79, 113, 150, 0.16), transparent 34%),
            #07090d;
          color: #fff;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(7, 9, 13, 0.84);
          backdrop-filter: blur(20px);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 900;
          font-size: 17px;
          letter-spacing: 0.12em;
        }

        .logo span {
          color: #fff;
        }

        .navActions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .loginBtn,
        .accountBtn,
        .cartBtn {
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.045);
          color: rgba(255, 255, 255, 0.82);
          border-radius: 10px;
          padding: 10px 14px;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .loginBtn:hover,
        .accountBtn:hover,
        .cartBtn:hover {
          background: rgba(255, 255, 255, 0.09);
          color: #fff;
        }

        .cartBtn b {
          display: inline-grid;
          place-items: center;
          min-width: 20px;
          height: 20px;
          margin-left: 4px;
          padding: 0 5px;
          border-radius: 999px;
          background: #fff;
          color: #080a0f;
          font-size: 10px;
        }

        .accountWrap {
          position: relative;
        }

        .accountMenu {
          position: absolute;
          top: calc(100% + 9px);
          right: 0;
          width: 230px;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          background: rgba(13, 16, 22, 0.98);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
        }

        .accountName {
          font-size: 14px;
        }

        .accountEmail {
          margin: 4px 0 12px;
          color: rgba(255, 255, 255, 0.45);
          font-size: 11px;
          word-break: break-word;
        }

        .accountMenu > button {
          width: 100%;
          padding: 9px 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          cursor: pointer;
        }

        .horizonSidebar {
          position: fixed;
          z-index: 40;
          top: 92px;
          left: 18px;
          bottom: 18px;
          width: 240px;
          display: flex;
          flex-direction: column;
          padding: 16px 12px;
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

        .homeIntro {
          position: relative;
          min-height: calc(100vh - 76px);
          padding: 70px 5vw 100px;
          overflow: hidden;
        }

        .homeIntroGlow {
          position: absolute;
          top: -180px;
          left: 25%;
          width: 700px;
          height: 500px;
          border-radius: 50%;
          background: rgba(69, 106, 143, 0.15);
          filter: blur(80px);
          pointer-events: none;
        }

        .homeIntroInner {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        .welcomeCopy {
          max-width: 760px;
        }

        .pill,
        .eyebrow,
        .panelEyebrow {
          color: rgba(255, 255, 255, 0.42);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .pill {
          display: inline-flex;
          padding: 8px 11px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
        }

        .welcomeCopy h1 {
          margin: 18px 0 16px;
          font-size: clamp(44px, 6vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .welcomeCopy h1 em {
          font-style: normal;
          color: #9fd5ff;
        }

        .welcomeLead {
          max-width: 700px;
          margin: 0 0 10px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 15px;
          line-height: 1.75;
        }

        .primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 22px;
          padding: 12px 18px;
          border: 0;
          border-radius: 11px;
          background: #fff;
          color: #080a0f;
          font-weight: 800;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.12);
        }

        .creatorCard {
          position: absolute;
          top: 0;
          right: 0;
          width: 250px;
          min-height: 310px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          background:
            radial-gradient(circle at 50% 20%, rgba(105, 169, 221, 0.18), transparent 50%),
            rgba(255, 255, 255, 0.035);
          text-align: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
        }

        .welcomeOrb {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          margin: 0 auto 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          font-size: 21px;
        }

        .creatorLabel {
          display: block;
          color: rgba(255, 255, 255, 0.35);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .creatorName {
          display: block;
          margin-top: 5px;
          font-size: 24px;
          font-weight: 900;
        }

        .skinFrame {
          width: 145px;
          height: 170px;
          margin: 14px auto 0;
          overflow: hidden;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.045);
        }

        .skinFrame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .homePanels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 52px;
        }

        .homePanel {
          display: flex;
          gap: 14px;
          min-height: 145px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.035);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .panelIcon,
        .donorCrown {
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.075);
          font-weight: 900;
        }

        .donorCrown {
          font-size: 20px;
        }

        .homePanel h2 {
          margin: 5px 0 7px;
          font-size: 18px;
        }

        .homePanel p {
          margin: 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          line-height: 1.6;
        }

        .homePanel small {
          display: block;
          margin-top: 9px;
          color: rgba(255, 255, 255, 0.28);
          font-size: 10px;
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

        .beforeBuy {
          padding: 80px 5vw 100px;
        }

        .beforeBuyInner {
          max-width: 900px;
          margin: 0 auto;
        }

        .beforeBuyInner h2 {
          max-width: 800px;
          margin: 10px 0 16px;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.02;
          letter-spacing: -0.04em;
        }

        .beforeLead {
          color: rgba(255, 255, 255, 0.56);
          line-height: 1.8;
          font-size: 15px;
        }

        .beforeBuyNotice,
        .beforeBuySupport,
        .refundBox {
          margin-top: 22px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.035);
        }

        .beforeBuyNotice h3,
        .beforeBuySupport h3,
        .refundBox h3 {
          margin: 0 0 12px;
          font-size: 18px;
        }

        .beforeBuyNotice ul {
          margin: 0;
          padding-left: 20px;
          color: rgba(255, 255, 255, 0.56);
          line-height: 1.75;
          font-size: 14px;
        }

        .beforeBuySupport p,
        .refundBox p {
          color: rgba(255, 255, 255, 0.56);
          line-height: 1.75;
          font-size: 14px;
        }

        .discordButton {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: #5865f2;
          color: #fff;
          text-decoration: none;
          font-weight: 800;
          font-size: 13px;
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

        .productGrid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .productCard {
          min-width: 0;
          padding: 20px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px;
          background: rgba(255,255,255,.035);
          transition: .18s ease;
        }

        .productCard:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,.13);
          background: rgba(255,255,255,.05);
        }

        .productIcon {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          margin-bottom: 18px;
          border-radius: 15px;
          background: rgba(255,255,255,.07);
          font-size: 24px;
        }

        .productCategory {
          color: rgba(255,255,255,.32);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .productCard h3 {
          margin: 6px 0 8px;
          font-size: 18px;
        }

        .productCard p {
          min-height: 45px;
          margin: 0;
          color: rgba(255,255,255,.5);
          font-size: 13px;
          line-height: 1.55;
        }

        .productBottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          margin-top: 20px;
        }

        .productPrice {
          font-size: 21px;
        }

        .productActions {
          display: flex;
          gap: 6px;
        }

        .infoButton,
        .addButton {
          padding: 8px 11px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
        }

        .infoButton {
          border: 1px solid rgba(255,255,255,.09);
          background: transparent;
          color: rgba(255,255,255,.65);
        }

        .addButton {
          border: 0;
          background: #fff;
          color: #080a0f;
        }

        .modalBackdrop,
        .cartBackdrop {
          position: fixed;
          z-index: 100;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,.72);
          backdrop-filter: blur(9px);
        }

        .infoModal,
        .checkoutModal,
        .authModal {
          position: relative;
          width: min(100%, 520px);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          padding: 30px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 22px;
          background: #0c0f15;
          box-shadow: 0 25px 80px rgba(0,0,0,.5);
        }

        .modalClose {
          position: absolute;
          top: 13px;
          right: 13px;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px;
          background: rgba(255,255,255,.05);
          color: rgba(255,255,255,.75);
          cursor: pointer;
          font-size: 20px;
        }

        .infoProductIcon {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          margin-bottom: 18px;
          border-radius: 18px;
          background: rgba(255,255,255,.07);
          font-size: 30px;
        }

        .infoModal h2,
        .checkoutModal h2,
        .authModal h2 {
          margin: 8px 0 12px;
          font-size: 30px;
        }

        .infoModal p {
          color: rgba(255,255,255,.56);
          line-height: 1.7;
        }

        .infoPrice {
          margin-top: 18px;
          font-size: 27px;
          font-weight: 900;
        }

        .fullButton {
          width: 100%;
          margin-top: 18px;
        }

        .cartDrawer {
          position: fixed;
          z-index: 101;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(440px, 94vw);
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(255,255,255,.08);
          background: #0b0e14;
          box-shadow: -20px 0 60px rgba(0,0,0,.4);
        }

        .cartHeader {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 25px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .cartHeader h2 {
          margin: 5px 0 0;
        }

        .cartContent {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .emptyCart {
          display: grid;
          place-items: center;
          min-height: 300px;
          padding: 30px;
          text-align: center;
        }

        .emptyCart > div {
          font-size: 45px;
        }

        .emptyCart h3 {
          margin: 12px 0 5px;
        }

        .emptyCart p {
          margin: 0;
          color: rgba(255,255,255,.45);
          font-size: 13px;
        }

        .cartItems {
          flex: 1;
          padding: 16px 20px;
        }

        .cartItem {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .cartItemIcon {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
          border-radius: 10px;
          background: rgba(255,255,255,.06);
        }

        .cartItemInfo {
          min-width: 0;
          flex: 1;
        }

        .cartItemInfo strong,
        .cartItemInfo span {
          display: block;
        }

        .cartItemInfo strong {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cartItemInfo span {
          margin-top: 3px;
          color: rgba(255,255,255,.45);
          font-size: 11px;
        }

        .removeCartItem {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,.5);
          cursor: pointer;
        }

        .cartFooter {
          padding: 18px 20px;
          border-top: 1px solid rgba(255,255,255,.07);
          background: #0b0e14;
        }

        .cartTotalRow,
        .checkoutTotal {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255,255,255,.6);
        }

        .cartTotalRow strong,
        .checkoutTotal strong {
          color: #fff;
          font-size: 22px;
        }

        .clearCartButton {
          width: 100%;
          margin-top: 8px;
          padding: 9px;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.4);
          cursor: pointer;
          font-size: 11px;
        }

        .checkoutProducts {
          margin: 18px 0;
          padding: 12px 0;
          border-top: 1px solid rgba(255,255,255,.06);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .checkoutProduct {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 9px 0;
          color: rgba(255,255,255,.62);
          font-size: 13px;
        }

        .checkoutTotal {
          margin-bottom: 16px;
        }

        .checkoutLabel {
          display: block;
          margin-top: 14px;
          color: rgba(255,255,255,.6);
          font-size: 11px;
          font-weight: 700;
        }

        .checkoutLabel input {
          width: 100%;
          margin-top: 7px;
          padding: 12px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 10px;
          outline: none;
          background: rgba(255,255,255,.045);
          color: #fff;
        }

        .checkoutLabel input:focus {
          border-color: rgba(255,255,255,.2);
        }

        .paymentError {
          margin-top: 12px;
          padding: 10px 12px;
          border: 1px solid rgba(255, 85, 85, .2);
          border-radius: 9px;
          background: rgba(255, 85, 85, .08);
          color: #ffb4b4;
          font-size: 12px;
        }

        .paymentSuccess {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid rgba(89, 218, 133, .18);
          border-radius: 14px;
          background: rgba(89, 218, 133, .07);
          text-align: center;
        }

        .paymentSuccess.compact {
          text-align: left;
          padding: 10px 12px;
          color: #a8efbf;
          font-size: 12px;
        }

        .successIcon {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          margin: 0 auto 12px;
          border-radius: 50%;
          background: rgba(89, 218, 133, .15);
          color: #72e99b;
          font-size: 25px;
          font-weight: 900;
        }

        .paymentSuccess h3 {
          margin: 0 0 8px;
        }

        .paymentSuccess p {
          margin: 0;
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.6;
        }

        .checkoutNote {
          margin: 12px 0 0;
          color: rgba(255,255,255,.3);
          text-align: center;
          font-size: 10px;
          line-height: 1.5;
        }

        .switchAuth {
          display: block;
          margin: 16px auto 0;
          border: 0;
          background: transparent;
          color: #9bdcff;
          cursor: pointer;
          font-size: 11px;
        }

        @media (max-width: 1100px) {
          .creatorCard {
            position: relative;
            top: auto;
            right: auto;
            margin: 35px auto 0;
          }

          .productGrid {
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

          .homeIntro {
            padding-top: 35px;
          }

          .homePanels {
            grid-template-columns: 1fr;
          }

          .paymentPanel {
            grid-column: auto;
            align-items: flex-start;
          }

          .paymentBrands {
            flex-wrap: wrap;
          }

          .productGrid {
            grid-template-columns: 1fr;
          }

          .nav {
            padding: 0 14px;
          }

          .logo {
            font-size: 14px;
          }

          .loginBtn {
            display: none;
          }

          .cartBtn {
            padding: 9px 11px;
          }
        }

        @media (max-width: 600px) {
          .homeIntro {
            padding-left: 18px;
            padding-right: 18px;
          }

          .beforeBuy {
            padding-left: 18px;
            padding-right: 18px;
          }

          .standaloneShopPage {
            padding-left: 18px;
            padding-right: 18px;
          }

          .creatorCard {
            width: 100%;
          }

          .homePanel {
            padding: 17px;
          }

          .paymentPanel {
            flex-direction: column;
          }

          .paymentBrands {
            margin-top: 3px;
          }

          .productBottom {
            align-items: center;
          }

          .productActions {
            flex-wrap: wrap;
            justify-content: flex-end;
          }

          .infoModal,
          .checkoutModal,
          .authModal {
            padding: 24px 18px;
          }
        }
      `}</style>
    </main>
  );
}