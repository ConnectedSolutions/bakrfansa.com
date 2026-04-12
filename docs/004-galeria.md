# La galería — álbumes, obras y visor de imágenes

En esta etapa se construyeron las páginas de la galería: el catálogo de álbumes, las páginas individuales de cada álbum, y el visor de imágenes a pantalla completa.

## ¿Qué se construyó?

### Catálogo de álbumes (`/galeria`)
La página principal de la galería muestra todos los álbumes disponibles en una cuadrícula. Cada álbum tiene portada, nombre, año y número de obras. Al hacer clic entra al álbum.

### Página de álbum individual (`/galeria/nombre-del-album`)
Cada álbum tiene su propia página con encabezado, descripción y un grid de todas sus obras en formato mosaico — las imágenes se acomodan automáticamente sin cortes ni espacios vacíos, como en una galería de arte real.

Debajo de cada obra aparece su título, técnica, año, y una etiqueta discreta si tiene reproducción disponible para compra.

### Visor de imágenes (Lightbox)
Al hacer clic en cualquier obra dentro de un álbum, la imagen se abre a pantalla completa sobre un fondo oscuro. Se puede:
- Cerrar presionando **Escape** o el botón de cierre
- Navegar entre imágenes con las flechas del teclado o los botones en pantalla
- Hacer clic fuera de la imagen para cerrar

Si una obra tiene varias fotografías (detalle, ángulo, etc.) se puede navegar entre ellas dentro del mismo visor.

## ¿Qué puede hacer ahora el sistema que antes no podía?

El portal ya tiene una galería funcional. Un visitante puede entrar, explorar los álbumes, ver las obras y ampliarlas para apreciar los detalles — todo sin abandonar el sitio.

## ¿Hay algo que Bakr deba saber?

Las obras mostradas ahora son de ejemplo. Cuando se conecte el panel de administración, Bakr podrá crear sus propios álbumes y subir sus obras reales — el diseño y el comportamiento de la galería serán exactamente los mismos.

La galería usa un formato de mosaico ("masonry") que respeta las proporciones originales de cada pintura — una obra vertical no se deformará para caber en una cuadrícula cuadrada. El portal trata las imágenes con el mismo cuidado que una sala de exposición.
