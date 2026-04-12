# Configuración inicial del portal

Se preparó la base sobre la que se construirá todo el portal de Bakr Fansa.
Es como sentar los cimientos de una casa antes de levantar las paredes.

## ¿Qué se construyó?

Se instalaron y conectaron todos los servicios que el portal necesitará para funcionar:

- **La estructura del portal** — se definió cómo se organizarán todas las páginas: la galería pública, la tienda, las páginas de las obras, y el panel de administración donde Bakr gestionará todo su contenido.

- **El sistema de administración** — se preparó el panel privado al que solo Bakr tendrá acceso. Desde ahí podrá cargar obras, crear álbumes, gestionar productos y ver los pedidos. No es visible todavía, pero ya tiene su lugar reservado.
clea

- **La conexión con la base de datos** — se configuró el espacio donde se guardarán todos los datos: las obras, los álbumes, los pedidos de los clientes. Por el momento apunta a un servidor de prueba; cuando el portal esté listo para salir al público se conectará al servidor real.

- **El servicio de imágenes** — se configuró la conexión con Cloudinary, el servicio que garantizará que las fotografías de las obras se vean con la mejor calidad posible en cualquier dispositivo, sin ralentizar la página.

- **Los colores y tipografías** — se registraron en el sistema los colores exactos del portal (el blanco, el lino, el oro arena) y las tipografías elegidas (Playfair Display para títulos, DM Sans para el cuerpo). A partir de ahora todas las páginas usarán estos valores de forma consistente.

- **El carrito de compras** — se preparó la lógica básica del carrito. Cuando un visitante agregue una reproducción, el portal recordará su selección aunque navegue por otras páginas.

## ¿Qué puede hacer ahora el sistema que antes no podía?

Antes de esta etapa no existía nada. Ahora existe un proyecto organizado con una estructura clara donde cada parte del portal tiene su lugar definido.

## ¿Hay algo que Bakr deba saber?

Nada es visible todavía para el visitante del portal — esta etapa es completamente invisible desde afuera, pero necesaria para que todo lo que viene funcione correctamente.

Cuando llegue el momento del lanzamiento, será necesario crear las cuentas reales en tres servicios externos: la base de datos (Railway), el gestor de imágenes (Cloudinary) y los pagos (Stripe). Por ahora se usan valores de prueba para poder construir sin costo.
