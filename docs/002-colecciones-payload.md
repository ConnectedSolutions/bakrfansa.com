# Las colecciones del portal — cómo se organiza el contenido

En esta etapa se definió la estructura interna del portal: qué tipos de contenido existen, qué información guarda cada uno, y cómo se relacionan entre sí.

Piensa en esto como los formularios que Bakr verá en su panel de administración. Cada "colección" es un tipo de contenido diferente.

---

## ¿Qué colecciones se crearon?

### Imágenes
El espacio donde se guardan todas las fotografías que se suban al portal. Cada imagen puede tener una descripción de accesibilidad (para personas con discapacidad visual) y queda vinculada automáticamente al servicio de imágenes Cloudinary para garantizar la mejor calidad.

### Álbumes
Los grupos de obras. Un álbum puede representar una serie de pinturas, una exposición, un período de trabajo, o cualquier agrupación que Bakr quiera crear. Cada álbum tiene:
- Un nombre y una descripción
- Una imagen de portada
- El año al que corresponde
- Un interruptor para hacerlo visible u oculto en el portal público

### Obras
El catálogo completo de pinturas. Es la colección más importante del portal. Cada obra guarda:
- Título y descripción (con formato de texto enriquecido)
- Una o varias fotografías
- La técnica utilizada (ejemplo: "Acrílico sobre óleo en tela")
- Las dimensiones
- El año de creación
- El álbum al que pertenece
- Si es una obra destacada (para aparecer en la portada del portal)
- Si tiene una reproducción disponible para compra

---

## ¿Qué puede hacer ahora el sistema que antes no podía?

El panel de administración ya conoce la estructura del contenido. En cuanto se conecte a la base de datos real, Bakr podrá entrar al backoffice y comenzar a crear álbumes, subir obras con sus fotografías y organizar todo su catálogo.

---

## ¿Hay algo que Bakr deba saber?

Las URLs del portal se generan automáticamente a partir del nombre. Por ejemplo, si Bakr crea un álbum llamado "Serie Azul 2024", su URL será automáticamente `/galeria/serie-azul-2024`. Lo mismo ocurre con cada obra individual. Esto garantiza que las direcciones del portal sean siempre limpias y amigables para los buscadores como Google.

La colección de Productos (para las reproducciones de las obras) existe de forma básica por ahora y se completará más adelante, cuando lleguemos a la parte de la tienda.
