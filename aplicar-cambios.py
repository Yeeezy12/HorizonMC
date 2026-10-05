from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / 'app' / 'page.js'
CSS = ROOT / 'app' / 'globals.css'
PUBLIC = ROOT / 'public'
PATCH_ROOT = Path(__file__).resolve().parent

if not PAGE.exists() or not CSS.exists():
    raise SystemExit(f'No encuentro app/page.js o app/globals.css en: {ROOT}')

# Copiar las dos imágenes al proyecto.
PUBLIC.mkdir(exist_ok=True)
shutil.copy2(PATCH_ROOT / 'public' / 'horizon-bg.png', PUBLIC / 'horizon-bg.png')
shutil.copy2(PATCH_ROOT / 'public' / 'creator-skin.png', PUBLIC / 'creator-skin.png')

page = PAGE.read_text(encoding='utf-8')
css = CSS.read_text(encoding='utf-8')

# Discord real del soporte.
page = page.replace("const DISCORD_URL = '#soporte';", "const DISCORD_URL = 'https://discord.gg/dhbtnptHsp';")

old_visual = '''          <div className="welcomeVisual">\n            <div className="welcomeOrb">H</div>\n            <span>HORIZONMC</span>\n            <strong>Tienda oficial</strong>\n            <p>Rangos · Protección · Spawners · Coins</p>\n          </div>'''
new_visual = '''          <div className="welcomeVisual creatorVisual">\n            <div className="welcomeOrb">👑</div>\n            <span>CREADOR</span>\n            <div className="creatorSkinFrame">\n              <img src="/creator-skin.png" alt="Skin de Minecraft del creador" />\n            </div>\n          </div>'''
if old_visual not in page:
    raise SystemExit('No encontré la tarjeta actual del inicio en app/page.js. No se ha modificado el archivo.')
page = page.replace(old_visual, new_visual, 1)

# El bloque de soporte de la parte superior se elimina; el soporte queda abajo en paymentsInfo.
support_panel = '''          <article className="homePanel supportPanel" id="soporte">\n            <div className="panelIcon">💬</div>\n            <div>\n              <span className="panelEyebrow">DISCORD DEL SOPORTE</span>\n              <h2>¿Necesitas ayuda?</h2>\n              <p>Entra en nuestro Discord para contactar con el equipo de soporte y crear un ticket.</p>\n              <a className="discordButton" href={DISCORD_URL}>Abrir Discord <span>↗</span></a>\n            </div>\n          </article>\n'''
if support_panel not in page:
    raise SystemExit('No encontré el bloque superior de soporte. No se ha modificado ese bloque.')
page = page.replace(support_panel, '', 1)

# Mover paymentsInfo: se quita de la zona superior y se inserta después de "Cómo funciona".
start = page.find('      <section className="paymentsInfo">')
if start == -1:
    raise SystemExit('No encontré la sección paymentsInfo.')
end = page.find('      </section>', start)
if end == -1:
    raise SystemExit('No encontré el final de paymentsInfo.')
end += len('      </section>')
payments_block = page[start:end]
page = page[:start] + page[end:]

# Dale un id al bloque inferior para que los enlaces de soporte puedan llevar a él si fuese necesario.
payments_block = payments_block.replace('<section className="paymentsInfo">', '<section id="soporte" className="paymentsInfo">', 1)

faq_end = page.find('      </section>', page.find('      <section id="como"'))
if faq_end == -1:
    raise SystemExit('No encontré el final de la sección Cómo funciona.')
faq_end += len('      </section>')
page = page[:faq_end] + '\n\n' + payments_block + page[faq_end:]

PAGE.write_text(page, encoding='utf-8')

# Cambios visuales específicos.
css = css.replace(
'''  background:\n    radial-gradient(circle at 78% 28%,rgba(147,51,234,.13),transparent 32%),\n    linear-gradient(180deg,#0a0810 0%,#0b0910 100%);''',
'''  background:\n    linear-gradient(90deg,rgba(8,7,13,.94) 0%,rgba(8,7,13,.74) 48%,rgba(8,7,13,.58) 100%),\n    url("/horizon-bg.png") center/cover no-repeat;''',
1)

css = css.replace(
'''  justify-content:center;\n  align-items:center;\n  text-align:center;''',
'''  justify-content:flex-start;\n  align-items:flex-start;\n  text-align:left;''',
1)
css = css.replace(
'''  width:92px;height:92px;''',
'''  width:72px;height:72px;''',
1)
css = css.replace(
'''  font-size:40px;''',
'''  font-size:30px;''',
1)
css = css.replace(
'''  margin-bottom:18px;''',
'''  margin:0 0 14px 0;''',
1)
css = css.replace(
'''  color:#bd74ff;\n  font-size:11px;''',
'''  color:#ffd34f;\n  font-size:11px;''',
1)

# La skin ocupa la zona donde antes estaban "Tienda oficial / Rangos...".
css += '''\n\n/* Tarjeta del creador: corona pequeña a la izquierda + CREADOR amarillo + skin */\n.creatorVisual{position:relative;overflow:hidden}\n.creatorVisual .welcomeOrb{align-self:flex-start;flex:0 0 auto}\n.creatorVisual > span{display:block;color:#ffd34f;font-size:11px;letter-spacing:3px;font-weight:900;margin-bottom:12px}\n.creatorSkinFrame{width:100%;height:205px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;margin-top:auto}\n.creatorSkinFrame img{height:205px;width:auto;max-width:100%;object-fit:contain;image-rendering:auto;filter:drop-shadow(0 12px 18px rgba(0,0,0,.55))}\n@media(max-width:800px){.creatorSkinFrame{height:230px}.creatorSkinFrame img{height:230px}}\n'''

CSS.write_text(css, encoding='utf-8')
print('Cambios aplicados correctamente.')
print(f'Proyecto: {ROOT}')
print('Archivos modificados: app/page.js, app/globals.css')
print('Imágenes copiadas: public/horizon-bg.png, public/creator-skin.png')
