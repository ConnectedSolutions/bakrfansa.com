# La tienda y el carrito

En esta etapa se construyeron las páginas de la tienda de reproducciones y el carrito de compras.

## ¿Qué se construyó?

### Catálogo de reproducciones (`/tienda`)
Una página sobria con las reproducciones disponibles. Cada tarjeta muestra la imagen de la obra, el título, el precio y cuántas medidas están disponibles. Si un producto está agotado, aparece marcado como tal sin desaparecer del catálogo.

En la parte superior hay un bloque informativo discreto sobre envíos, empaque y métodos de pago.

### Botón "Agregar al carrito"
Aparece dentro de la página de cada obra (cuando tiene reproducción disponible). Permite:
- Seleccionar la medida deseada (con precio actualizado en tiempo real)
- Agregar al carrito con un clic

Al agregar, aparece un mensaje discreto en la esquina inferior izquierda ("Agregado al carrito") que desaparece solo en tres segundos. No abre ningún modal ni redirige — el visitante sigue viendo la obra.

### El carrito (`/tienda/carrito`)
Muestra todos los productos agregados con imagen, nombre, medida y precio. Permite:
- Aumentar o reducir la cantidad de cada artículo
- Eliminar artículos individuales
- Ver el total del pedido

Si el carrito está vacío, invita a explorar la tienda.

### Checkout (`/tienda/checkout`)
La página existe y está preparada. La conexión real con el sistema de pagos (Stripe) se realizará en el Paso 8.

## ¿Hay algo que Bakr deba saber?

El carrito guarda su contenido aunque el visitante cierre el navegador o navegue por otras páginas — los artículos no se pierden hasta que se complete la compra o se eliminen manualmente.

El precio de las reproducciones en distintas medidas se suma automáticamente al precio base. Por ejemplo, si una reproducción cuesta $3,200 en la medida pequeña y la medida grande tiene un costo adicional de $800, el sistema muestra $4,000 al seleccionar la medida grande.
