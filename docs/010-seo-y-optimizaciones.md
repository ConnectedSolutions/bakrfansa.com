# SEO y optimizaciones

En esta etapa se preparó el portal para ser encontrado correctamente en buscadores como Google, y se optimizó el manejo de imágenes para garantizar la mejor calidad posible.

## ¿Qué se construyó?

### Mapa del sitio (`/sitemap.xml`)
El portal genera automáticamente un mapa con todas sus páginas: la landing, la galería, cada álbum y cada obra individual. Este archivo lo usan Google y otros buscadores para saber qué páginas indexar y con qué frecuencia revisarlas.

### Instrucciones para buscadores (`/robots.txt`)
Un archivo que le indica a Google qué partes del sitio puede indexar (las páginas públicas) y cuáles no (el panel de administración y las rutas internas). Esto evita que páginas privadas aparezcan en resultados de búsqueda.

### Vista previa al compartir en redes sociales
Cada página tiene configurada su propia vista previa para cuando alguien comparte el enlace en WhatsApp, Twitter, Facebook o iMessage. Las páginas de obras individuales muestran la imagen de la pintura como vista previa.

### Loader de Cloudinary
Se preparó el componente que conecta las imágenes del portal con Cloudinary. Cuando las cuentas estén activas, cada imagen se servirá automáticamente en el formato más eficiente para cada navegador (WebP o AVIF) y en el tamaño exacto que necesita la pantalla — ni más grande ni más pequeña.

### Esqueletos de carga
Se construyeron los bloques grises animados que aparecen mientras las imágenes cargan. Tienen la misma forma y proporción que las imágenes reales, así la página no "salta" mientras aparece el contenido.

### Script de datos de prueba
Se preparó un script (`npm run seed`) que genera álbumes y obras de ejemplo con datos aleatorios. Útil para poblar el sistema cuando se conecte la base de datos real y verificar que todo funciona antes de cargar el contenido real de Bakr.

## ¿Hay algo que Bakr deba saber?

Para que Google indexe correctamente el portal, lo ideal es registrarlo en **Google Search Console** una vez que esté publicado. Es gratuito y permite ver cómo el buscador ve el sitio.

El sitemap se actualiza automáticamente cada vez que se publique una obra nueva — no hay que hacer nada manualmente.
