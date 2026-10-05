'use client';

import { useEffect, useState } from 'react';
import { PRODUCT_PRICES } from '../lib_products';

// Sustituye esta URL por la invitación permanente de tu servidor de Discord.
const DISCORD_URL = 'https://discord.gg/dhbtnptHsp';
const MAX_DONOR_NAME = 'GoodKyuX';

function currentMonthLabel() {
  return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date());
}

const categories = [
  {
    name: 'Survival 1.21.11',
    icon: '⛏️',
    subcategories: [
      {
        name: 'Comandos',
        products: [
          {id:'comando-condense-permanente', name:'/condense permanente', icon:'⚙️', price:6, desc:'Acceso permanente al comando /condense.'},
          {id:'comando-fly-1-mes', name:'/fly · 1 mes', icon:'🪽', price:6, desc:'Acceso al comando /fly durante 1 mes.'},
          {id:'comando-hack-permanente', name:'/hack permanente', icon:'⚡', price:5, desc:'Acceso permanente al comando /hack.'},
          {id:'comando-school-permanente', name:'/school permanente', icon:'📚', price:6, desc:'Acceso permanente al comando /school.'},
          {id:'comando-inse-permanente', name:'/inse permanente', icon:'✨', price:7, desc:'Acceso permanente al comando /inse.'},
          {id:'fly-permanente', name:'Fly permanente', icon:'🪽', price:18, desc:'Acceso permanente a Fly.'}
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
          {id:'vip', name:'VIP', icon:'👑', price:PRODUCT_PRICES.vip, desc:'Rango VIP para destacar en HorizonMC.'},
          {id:'vipplus', name:'VIP+', icon:'💎', price:PRODUCT_PRICES.vipplus, desc:'Mejora tu experiencia con el rango VIP+.'},
          {id:'mvp', name:'MVP', icon:'⭐', price:PRODUCT_PRICES.mvp, desc:'Rango MVP con ventajas exclusivas.'}
        ]
      },
      {
        name: 'Rangos Avanzados',
        products: [
          {id:'nova', name:'NOVA', icon:'🌌', price:PRODUCT_PRICES.nova, desc:'Rango avanzado NOVA para jugadores destacados.'},
          {id:'vortes', name:'VORTEX', icon:'🌀', price:PRODUCT_PRICES.vortes, desc:'Rango avanzado VORTEX con beneficios especiales.'}
        ]
      },
      {
        name: 'Rangos Premium',
        products: [
          {id:'eterno', name:'ETERNO', icon:'♾️', price:PRODUCT_PRICES.eterno, desc:'Rango premium ETERNO para los jugadores más exclusivos.'},
          {id:'divino', name:'DIVINO', icon:'✨', price:PRODUCT_PRICES.divino, desc:'El rango premium DIVINO con ventajas exclusivas.'}
        ]
      }
    ]
  },
  {
    name: 'Protección',
    icon: '🛡️',
    subcategories: [
      { name: 'Protección', products: [
        {id: 'proteccion-de-clan', name:'Piedra de Protección de Clan 200x200', icon:'🗿', price:PRODUCT_PRICES['proteccion-200'], desc:'Piedra de protección de clan con un área de 200x200 bloques.'}
      ]}
    ]
  },
  {
    name: 'Spawners', icon: '🔥', subcategories: [{ name: 'Spawners de Mobs', products: [
      {id:'spawner-de-golem', name:'Spawner de Golem', icon:'🗿', price:PRODUCT_PRICES.golem, desc:'Spawner de Golem.'},
      {id:'spawner-de-enderman', name:'Spawner de Enderman', icon:'👁️', price:PRODUCT_PRICES.enderman, desc:'Spawner de Enderman.'},
      {id:'spawner-de-blaze', name:'Spawner de Blaze', icon:'🔥', price:PRODUCT_PRICES.blaze, desc:'Spawner de Blaze.'},
      {id:'spawner-de-shulker', name:'Spawner de Shulker', icon:'🟪', price:PRODUCT_PRICES.shulker, desc:'Spawner de Shulker.'},
      {id:'spawner-de-creeper', name:'Spawner de Creeper', icon:'💥', price:PRODUCT_PRICES.creeper, desc:'Spawner de Creeper.'},
      {id:'spawner-de-esqueleto', name:'Spawner de Esqueleto', icon:'💀', price:PRODUCT_PRICES.esqueleto, desc:'Spawner de Esqueleto.'},
      {id:'spawner-de-vaca', name:'Spawner de Vaca', icon:'🐄', price:PRODUCT_PRICES.vaca, desc:'Spawner de Vaca.'},
      {id:'spawner-de-cerdo', name:'Spawner de Cerdo', icon:'🐷', price:PRODUCT_PRICES.cerdo, desc:'Spawner de Cerdo.'},
      {id:'spawner-de-zombi', name:'Spawner de Zombie', icon:'🧟', price:PRODUCT_PRICES.zombie, desc:'Spawner de Zombie.'}
    ]}]
  },
  {
    name: 'Otros', icon: '🧩', subcategories: [{ name: 'Otros', products: [
      {id:'desmuteo-y-limpieza', name:'Desmuteo y limpieza', icon:'🔓', price:16, desc:'Servicio de desmuteo y limpieza de sanciones de chat.'},
      {id:'desvaneo-discord', name:'Desvaneo de Discord', icon:'💬', price:17, desc:'Servicio de desvaneo de Discord.'},
      {id:'desvaneo-total', name:'Desvaneo total', icon:'🔓', price:30, desc:'Servicio de desvaneo total.'},
      {id:'prefijo-custom', name:'Prefijo custom', icon:'🏷️', price:10, desc:'Personaliza tu prefijo dentro del servidor.'}
    ]}]
  },
  {
    name: 'Coins', icon: '🪙', subcategories: [{ name: 'Horizon Coins', products: [
      {id:'5000-horizon-coins', name:'5.000 Horizon Coins', icon:'🪙', price:PRODUCT_PRICES['5000-horizon-coins'], desc:'5.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'},
      {id:'10000-horizon-coins', name:'10.000 Horizon Coins', icon:'🪙', price:PRODUCT_PRICES['10000-horizon-coins'], desc:'10.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'},
      {id:'25000-horizon-coins', name:'25.000 Horizon Coins', icon:'🪙', price:PRODUCT_PRICES['25000-horizon-coins'], desc:'25.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'},
      {id:'50000-horizon-coins', name:'50.000 Horizon Coins', icon:'🪙', price:PRODUCT_PRICES['50000-horizon-coins'], desc:'50.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'},
      {id:'100000-horizon-coins', name:'100.000 Horizon Coins', icon:'🪙', price:PRODUCT_PRICES['100000-horizon-coins'], desc:'100.000 Horizon Coins para gastar en la tienda y ventajas exclusivas de HorizonMC.'}
    ]}]
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
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('horizonmc_current_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        if (parsedUser?.email) setCustomerEmail(parsedUser.email);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tip4servStatus = params.get('tip4serv');

    if (tip4servStatus === 'cancelled') {
      setPaymentError('Has cancelado el pago.');
      setCheckoutOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    if (tip4servStatus === 'success') {
      setPaymentResult('Pago completado correctamente. Tu pedido ha sido recibido y Tip4Serv procesará la entrega en Minecraft.');
      setPaymentError('');
      setPaymentLoading(false);
      setCart([]);
      setCheckoutOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
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
    const username = String(form.get('username') || '').trim();
    const email = String(form.get('email') || '').trim().toLowerCase();
    const password = String(form.get('password') || '');

    if (!username || !password || (authMode === 'register' && !email)) {
      setAuthError('Completa todos los campos.');
      return;
    }

    const accounts = JSON.parse(localStorage.getItem('horizonmc_accounts') || '[]');

    if (authMode === 'register') {
      if (username.length < 3) {
        setAuthError('El usuario debe tener al menos 3 caracteres.');
        return;
      }
      if (password.length < 6) {
        setAuthError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (accounts.some(a => a.username.toLowerCase() === username.toLowerCase())) {
        setAuthError('Ese nombre de usuario ya está registrado.');
        return;
      }
      if (accounts.some(a => a.email === email)) {
        setAuthError('Ese correo ya está registrado.');
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem('horizonmc_accounts', JSON.stringify([...accounts, newUser]));
      localStorage.setItem('horizonmc_current_user', JSON.stringify({ username, email }));
      setUser({ username, email });
      setCustomerEmail(email);
      setAuthMessage('Cuenta creada correctamente.');
      setAuthOpen(false);
      return;
    }

    const found = accounts.find(
      a => (a.username.toLowerCase() === username.toLowerCase() || a.email === email) && a.password === password
    );

    if (!found) {
      setAuthError('Usuario/correo o contraseña incorrectos.');
      return;
    }

    const loggedUser = { username: found.username, email: found.email };
    localStorage.setItem('horizonmc_current_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
    setCustomerEmail(loggedUser.email);
    setAuthOpen(false);
  }

  function logout() {
    localStorage.removeItem('horizonmc_current_user');
    setUser(null);
    setAccountOpen(false);
  }

  const currentCategory = categories.find(c => c.name === selected);
  const currentSub = currentCategory.subcategories.find(s => s.name === sub) || currentCategory.subcategories[0];
  const products = currentSub.products;

  function selectCategory(category) {
    setSelected(category.name);
    setSub(category.subcategories[0].name);
  }

  function add(product) {
    setCart(prev => [...prev, product]);
  }

  function removeFromCart(index) {
    setCart(prev => prev.filter((_, i) => i !== index));
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
      setPaymentError('El carrito está vacío.');
      return;
    }

    setPaymentLoading(true);
    try {
      const response = await fetch('/api/tip4serv/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          cart: cart.map(p => ({ id: p.id }))
        })
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'No se pudo iniciar el checkout de Tip4Serv.');
      }

      window.location.href = data.url;
    } catch (err) {
      setPaymentError(err.message || 'No se pudo iniciar el pago.');
      setPaymentLoading(false);
    }
  }

  const cartTotal = cart.reduce((sum, p) => sum + (typeof p.price === 'number' ? p.price : 0), 0);

  return (
    <main>
      <header className="nav">
        <div className="logo"><span>H</span> HORIZON<span>MC</span></div>
        <nav><a href="#inicio">Inicio</a><a href="#tienda">Tienda</a><a href="#antes-de-comprar">Antes de comprar</a><a href="#como">Cómo funciona</a></nav>
        <div className="navActions">
          {user ? (
            <div className="accountWrap">
              <button className="accountBtn" onClick={() => setAccountOpen(!accountOpen)}>👤 Cuenta</button>
              {accountOpen && (
                <div className="accountMenu">
                  <div className="accountName">👤 <strong>{user.username}</strong></div>
                  <div className="accountEmail">{user.email}</div>
                  <button onClick={logout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <button className="loginBtn" onClick={openLogin}>Iniciar sesión</button>
          )}
          <button className="cartBtn" onClick={() => setOpen(true)}>🛒 Carrito <b>{cart.length}</b></button>
        </div>
      </header>

      <section id="inicio" className="homeIntro">
        <div className="homeIntroGlow"></div>
        <div className="homeIntroInner">
          <div className="welcomeCopy">
            <div className="pill">✦ TIENDA OFICIAL DE HORIZONMC</div>
            <h1>Bienvenido a la tienda oficial de <em>HorizonMC.</em></h1>
            <p className="welcomeLead">
              Aquí podrás adquirir artículos para mejorar tu experiencia dentro del servidor.
              Ofrecemos rangos y ventajas globales y por modalidades.
            </p>
            <p className="welcomeLead">
              Puedes elegir la categoría del producto que desees desde el menú de la parte superior.
            </p>
            <a className="primary" href="#tienda">Ver tienda <span>→</span></a>
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
              <p>
                Asegúrate de que estás comprando en la tienda correcta.
                No realizamos reembolsos por compras realizadas en una tienda equivocada.
              </p>
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
        </div>
      </section>

      <section id="antes-de-comprar" className="beforeBuy">
        <div className="beforeBuyInner">
          <div className="eyebrow">ANTES DE COMPRAR</div>
          <h2>¿Eres padre y tienes dudas sobre lo que tu hij@ quiere adquirir?</h2>
          <p className="beforeLead">
            En nuestra tienda encontrarás únicamente artículos digitales que serán obtenidos dentro del servidor de HorizonMC.
            Con estos artículos tu hij@ puede disfrutar y utilizarlos mientras juega. También tendrá acceso prioritario
            (con la compra de un rango) a la hora de conectarse al servidor si este está lleno o, por ejemplo,
            tendrá su nombre remarcado en colores, lo que le hará destacar frente a otros jugadores.
          </p>

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
            <p>
              En caso de no recibir el artículo solicitado en un plazo <strong>máximo de 24 horas</strong>,
              contacta con el equipo de HorizonMC a través de nuestro Discord.
            </p>
            <a className="discordButton" href={DISCORD_URL}>Abrir Discord <span>↗</span></a>
          </div>

          <div className="refundBox">
            <div className="eyebrow">REEMBOLSO DE PRODUCTOS</div>
            <h3>Política de reembolsos</h3>
            <p>
              Los productos de nuestra tienda no son reembolsables, bajo las políticas y leyes establecidas por Tip4Serv.
              Esto se debe a las características únicas de las transacciones digitales, donde los bienes y servicios se
              consumen instantáneamente y no pueden devolverse en las mismas condiciones que los artículos físicos.
              Los productos que incluyan monedas o cualquier objeto virtual <strong>no son aptos para reembolso bajo ningún concepto</strong>.
            </p>
            <p>
              En casos <strong>muy excepcionales</strong>, se podrá emitir el reembolso de una compra si el propietario
              del servidor/tienda o los encargados responsables lo deciden y aprueban en consenso tras supervisar el caso.
              Esto podrá suceder principalmente cuando se produzca un fallo en la entrega de la compra.
            </p>
            <p>
              <strong>No admitimos reembolsos</strong> de nuestros productos si el motivo es un baneo por incumplir
              nuestros términos de servicio y/o las normas de nuestro servidor o tienda.
            </p>
          </div>

          <a className="backHomeButton" href="#inicio">Volver a la página principal</a>
        </div>
      </section>

      <section id="tienda" className="shop">
        <div className="sectionHead">
          <div><div className="eyebrow">TIENDA</div><h2>Productos de HorizonMC</h2></div>
          <p>Elige una categoría para ver sus productos.</p>
        </div>

        <div className="categoryTabs">
          {categories.map(category => (
            <button key={category.name} className={selected === category.name ? 'category active' : 'category'} onClick={() => selectCategory(category)}>
              <span>{category.icon}</span>
              <b>{category.name}</b>
            </button>
          ))}
        </div>

        <div className="subTabs">
          {currentCategory.subcategories.map(s => (
            <button key={s.name} className={sub === s.name ? 'sub active' : 'sub'} onClick={() => setSub(s.name)}>{s.name}</button>
          ))}
        </div>

        <div className="currentTitle">
          <div className="eyebrow">{selected.toUpperCase()}</div>
          <h3>{currentSub.name}</h3>
        </div>

        <div className="grid">
          {products.map(p => (
            <article className="product" key={p.id}>
              <div className="productIcon">{p.icon}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="buyRow">
                <strong>{typeof p.price === 'number' ? `${p.price.toFixed(2)} €` : 'Precio pendiente'}</strong>
                <div className="productActions">
                  <button className="infoButton" aria-label={`Información sobre ${p.name}`} onClick={() => setInfoProduct(p)}>!</button>
                  <button className="addButton" aria-label={`Añadir ${p.name} al carrito`} onClick={() => add(p)}>+</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="como" className="faq">
        <div className="eyebrow">CÓMO FUNCIONA</div>
        <h2>Compra y recibe tus productos</h2>
        <div className="steps">
          <div><b>01</b><h3>Elige un producto</h3><p>Busca tu rango, protección, spawner o Horizon Coins en la categoría correspondiente.</p></div>
          <div><b>02</b><h3>Realiza el pago</h3><p>Serás enviado al checkout seguro de Tip4Serv para completar el pago.</p></div>
          <div><b>03</b><h3>Recíbelo en Minecraft</h3><p>Tip4Serv procesa automáticamente la entrega en el servidor HorizonMC.</p></div>
        </div>
      </section>

      <section id="soporte" className="paymentsInfo">
        <div className="paymentsIntro">
          <div className="eyebrow">PAGOS SEGUROS</div>
          <h2>Atención al cliente / Soporte</h2>
          <p>
            Los pagos se completarán de forma segura y serán gestionados por HorizonMC.
            Los métodos de pago disponibles pueden variar según tu país.
          </p>
          <a className="supportLink" href="#soporte">Discord del soporte <span>→</span></a>
        </div>

        <div className="paymentsMethods">
          <div className="paymentHeading">
            <strong>Métodos de pago</strong>
            <span>Más de 40 métodos de pago disponibles</span>
          </div>
          <p className="paymentDescription">
            Las tarjetas de crédito y débito se gestionan de forma global.
            Aquí tienes algunos de los principales métodos disponibles actualmente.
          </p>
          <div className="paymentCards">
            <div className="paymentCard"><span className="visaLogo">VISA</span><small>Tarjeta</small></div>
            <div className="paymentCard"><span className="masterLogo"><i></i><i></i></span><small>Mastercard</small></div>
            <div className="paymentCard amexCard"><span>AMERICAN EXPRESS</span><small>Tarjeta</small></div>
            <div className="paymentCard paypalCard"><span className="paypalLogo">P</span><small>PayPal</small></div>
          </div>
        </div>
      </section>

      <footer><div className="logo"><span>H</span> HORIZON<span>MC</span></div><p>© 2026 HorizonMC. Todos los derechos reservados.</p></footer>

      {authOpen && <div className="overlay authOverlay" onClick={() => setAuthOpen(false)}>
        <div className="authModal" onClick={e => e.stopPropagation()}>
          <button className="authClose" onClick={() => setAuthOpen(false)}>✕</button>
          <div className="eyebrow">HORIZONMC</div>
          <h2>{authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
          <p className="authIntro">
            {authMode === 'login'
              ? 'Entra en tu cuenta para gestionar tus compras y tu perfil.'
              : 'Crea tu cuenta de HorizonMC para poder iniciar sesión.'}
          </p>
          <form onSubmit={handleAuth} className="authForm">
            <label>Usuario o correo
              <input name="username" type="text" autoComplete="username" placeholder="Tu usuario" />
            </label>
            {authMode === 'register' && (
              <label>Correo electrónico
                <input name="email" type="email" autoComplete="email" placeholder="correo@ejemplo.com" />
              </label>
            )}
            {authMode === 'login' && (
              <input name="email" type="hidden" value="" readOnly />
            )}
            <label>Contraseña
              <input name="password" type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} placeholder="••••••••" />
            </label>
            {authError && <div className="authError">{authError}</div>}
            {authMessage && <div className="authMessage">{authMessage}</div>}
            <button className="authSubmit" type="submit">
              {authMode === 'login' ? 'Entrar en mi cuenta' : 'Crear cuenta'}
            </button>
          </form>
          <div className="authSwitch">
            {authMode === 'login' ? (
              <>¿No tienes cuenta? <button onClick={openRegister}>Crear cuenta</button></>
            ) : (
              <>¿Ya tienes cuenta? <button onClick={openLogin}>Iniciar sesión</button></>
            )}
          </div>
        </div>
      </div>}

      {infoProduct && <div className="overlay authOverlay" onClick={() => setInfoProduct(null)}>
        <div className="authModal productInfoModal" onClick={e => e.stopPropagation()}>
          <button className="authClose" onClick={() => setInfoProduct(null)}>✕</button>
          <div className="productInfoIcon">{infoProduct.icon}</div>
          <div className="eyebrow">INFORMACIÓN DEL PRODUCTO</div>
          <h2>{infoProduct.name}</h2>
          <p className="authIntro">{infoProduct.desc}</p>
          <div className="checkoutTotal"><span>Precio</span><strong>{Number(infoProduct.price).toFixed(2)} €</strong></div>
          <button className="authSubmit" type="button" onClick={() => { add(infoProduct); setInfoProduct(null); }}>Añadir al carrito +</button>
        </div>
      </div>}

      {checkoutOpen && <div className="overlay authOverlay" onClick={() => setCheckoutOpen(false)}>
        <div className="authModal checkoutModal" onClick={e => e.stopPropagation()}>
          <button className="authClose" onClick={() => setCheckoutOpen(false)}>✕</button>
          <div className="eyebrow">HORIZONMC</div>
          <h2>Finalizar compra</h2>
          <p className="authIntro">Revisa tu pedido antes de continuar con el pago.</p>
          <div className="checkoutSummary">
            {cart.map((p, i) => (
              <div className="checkoutRow" key={`${p.id}-${i}`}>
                <span>{p.icon} {p.name}</span>
                <strong>{typeof p.price === 'number' ? `${p.price.toFixed(2)} €` : 'Precio pendiente'}</strong>
              </div>
            ))}
          </div>
          {paymentResult ? (
            <div className="authMessage">{paymentResult}</div>
          ) : (
            <>
              <div className="checkoutTotal"><span>Total</span><strong>{cartTotal.toFixed(2)} €</strong></div>
              {paymentError && <div className="authError">{paymentError}</div>}
              <div className="paymentButtons">
                <button className="stripePayButton" type="button" onClick={payWithTip4Serv} disabled={paymentLoading}>
                  {paymentLoading ? 'Conectando con Tip4Serv…' : 'Continuar con Tip4Serv →'}
                </button>
              </div>
            </>
          )}
          <button className="backCart" type="button" onClick={() => { setCheckoutOpen(false); setOpen(true); }}>← Volver al carrito</button>
        </div>
      </div>}

      {open && <div className="overlay" onClick={() => setOpen(false)}>
        <aside className="drawer" onClick={e => e.stopPropagation()}>
          <div className="drawerTop">
            <h2>Tu carrito <span className="cartCount">{cart.length}</span></h2>
            <button aria-label="Cerrar carrito" onClick={() => setOpen(false)}>✕</button>
          </div>
          {cart.length === 0 ? (
            <div className="empty">🛒<h3>Tu carrito está vacío</h3><p>Añade un producto para continuar.</p></div>
          ) : (
            <div className="cartContent">
              <div className="cartItems">
                {cart.map((p, i) => (
                  <div className="cartItem" key={`${p.id}-${i}`}>
                    <span className="cartItemIcon">{p.icon}</span>
                    <div className="cartItemInfo">
                      <b>{p.name}</b>
                      <small>{p.price}</small>
                    </div>
                    <button className="removeItem" aria-label={`Quitar ${p.name}`} onClick={() => removeFromCart(i)}>✕</button>
                  </div>
                ))}
              </div>
              <div className="cartBottom">
                <button className="clearCart" onClick={clearCart}>Vaciar carrito</button>
                <button className="checkout" onClick={startCheckout}>Continuar al pago →</button>
              </div>
            </div>
          )}
        </aside>
      </div>}
    </main>
  );
}
