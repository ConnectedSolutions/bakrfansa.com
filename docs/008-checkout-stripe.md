# Pagos — integración con Stripe

En esta etapa se construyó el sistema de pagos completo. Cuando un cliente hace clic en "Finalizar compra", el portal lo lleva a una página segura de Stripe donde ingresa su tarjeta. Al confirmar el pago, el sistema registra el pedido automáticamente.

## ¿Qué se construyó?

### El proceso de pago
Al hacer clic en "Finalizar compra" desde el carrito, el portal envía los artículos seleccionados a Stripe y redirige al cliente a la página de pago oficial de Stripe. Ahí el cliente ingresa sus datos de tarjeta y dirección de envío. Stripe se encarga de toda la seguridad — el portal nunca toca los datos de la tarjeta.

### Registro automático de pedidos
Cuando Stripe confirma que el pago fue exitoso, envía una notificación automática al portal (esto se llama "webhook"). El portal recibe esa notificación y crea el pedido en el panel de Bakr con toda la información: nombre del cliente, dirección de envío, artículos comprados y total pagado.

### Páginas de resultado
- **Pago exitoso** (`/tienda/exito`): Agradece al cliente y le explica qué sigue — Bakr preparará la reproducción y enviará el número de rastreo.
- **Pago cancelado** (`/tienda/cancelado`): Informa que no se realizó ningún cargo y ofrece volver al carrito.

### Los pedidos en el backoffice
Cada pedido llega al panel de Bakr con estado "Pagado". Bakr puede ver todos los datos del cliente y la dirección de envío. Cuando empaca y envía, solo necesita seleccionar la paquetería y escribir el número de guía — eso es todo.

## ¿Hay algo que Bakr deba saber?

**Para activar los pagos reales** se necesitan dos pasos únicos:
1. Crear una cuenta en Stripe (stripe.com) y obtener las claves reales
2. Configurar el webhook en el panel de Stripe apuntando a la dirección del portal

Por ahora el sistema está construido y funciona en modo de prueba — ningún cargo real se realizará hasta conectar las claves reales de Stripe.

Los envíos los gestiona Bakr externamente como siempre: imprime, empaca, genera su guía con la paquetería que prefiera, y registra el número de guía en el backoffice.
