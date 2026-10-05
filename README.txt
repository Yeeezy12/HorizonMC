HORIZONMC — CAMBIOS SOLICITADOS

Este paquete aplica:
- Fondo de HorizonMC en el inicio.
- Tarjeta del creador: corona pequeña a la izquierda, CREADOR en amarillo y la skin proporcionada.
- Se quita el bloque de soporte de la parte superior.
- Atención al cliente / Soporte / Pagos seguros queda debajo de “Cómo funciona”.
- El enlace de Discord se actualiza a https://discord.gg/dhbtnptHsp.

CÓMO APLICARLO
1. Extrae esta carpeta dentro de D:\HorizonMC-WEB\HorizonMC-WEB (o copia su contenido allí).
2. Entra en la carpeta del proyecto y ejecuta:
   python aplicar-cambios.py
3. Comprueba la web en local con npm run dev.
4. Si todo está bien:
   git add .
   git commit -m "Actualizar inicio y soporte de HorizonMC"
   git push

NO BORRES .git, .env.local, node_modules ni el resto de tu proyecto.
