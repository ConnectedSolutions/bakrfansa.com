# Cómo configurar Stripe para recibir pagos

Esta guía explica paso a paso cómo activar los pagos reales en el portal de Bakr Fansa.
No se necesitan conocimientos técnicos — solo seguir los pasos en orden.

---

## Paso 1 — Crear una cuenta en Stripe

1. Ve a **stripe.com**
2. Haz clic en **"Start now"** o **"Crear cuenta"**
3. Ingresa tu correo electrónico, nombre completo y una contraseña
4. Stripe te pedirá verificar tu correo — revisa tu bandeja de entrada y haz clic en el enlace

---

## Paso 2 — Activar tu cuenta (para cobros reales)

Stripe empieza en modo de prueba. Para cobrar dinero real necesitas activar la cuenta:

1. En el panel de Stripe, haz clic en **"Activate your account"**
2. Completa el formulario con:
   - Tipo de negocio (puedes elegir "Individual" o "Sole proprietorship")
   - País: **México**
   - Descripción del negocio: "Venta de reproducciones de arte"
   - Datos bancarios: la cuenta donde quieres recibir el dinero
3. Stripe puede pedir una identificación oficial (INE o pasaporte) — es un proceso estándar de verificación

> Mientras no actives la cuenta, los pagos solo funcionan en modo de prueba (tarjetas de mentira). El portal ya está listo para cuando actives.

---

## Paso 3 — Obtener las claves del API

Las "claves" son como contraseñas que conectan el portal con tu cuenta de Stripe.

1. En el panel de Stripe, ve al menú izquierdo → **"Developers"** → **"API keys"**
2. Verás dos claves:
   - **Publishable key** — empieza con `pk_live_...`
   - **Secret key** — empieza con `sk_live_...` (haz clic en "Reveal" para verla)
3. Copia ambas claves

4. Abre el archivo **`.env`** en la raíz del proyecto y reemplaza los placeholders:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_TU_CLAVE_AQUI
STRIPE_SECRET_KEY=sk_live_TU_CLAVE_AQUI
```

> **Importante:** Las claves que empiezan con `pk_test_` y `sk_test_` son para pruebas. Las que empiezan con `pk_live_` y `sk_live_` son para cobros reales. Usa las `live` cuando el portal esté publicado.

---

## Paso 4 — Configurar el Webhook

El webhook es lo que le avisa al portal cuando un cliente paga exitosamente. Sin esto, los pedidos no se registran automáticamente.

1. En el panel de Stripe → **"Developers"** → **"Webhooks"**
2. Haz clic en **"Add endpoint"**
3. En el campo URL escribe la dirección del portal seguida de `/api/stripe/webhook`:
   ```
   https://bakrfansa.com/api/stripe/webhook
   ```
   *(Reemplaza `bakrfansa.com` con la dirección real del portal cuando esté publicado)*
4. En **"Select events"** busca y selecciona:
   - `checkout.session.completed`
5. Haz clic en **"Add endpoint"**

6. Una vez creado, Stripe muestra el **"Signing secret"** — empieza con `whsec_...`
7. Copia ese valor y pégalo en el archivo `.env`:

```
STRIPE_WEBHOOK_SECRET=whsec_TU_CLAVE_AQUI
```

---

## Paso 5 — Probar que todo funciona

Antes de publicar el portal puedes hacer una compra de prueba:

1. En el panel de Stripe, asegúrate de estar en **modo de prueba** (hay un interruptor en la esquina superior derecha)
2. En el portal, agrega una reproducción al carrito y haz clic en "Finalizar compra"
3. En la página de pago de Stripe usa esta tarjeta de prueba:
   - Número: **4242 4242 4242 4242**
   - Fecha: cualquier fecha futura (ejemplo: 12/28)
   - CVC: cualquier 3 dígitos (ejemplo: 123)
4. Completa el formulario y confirma el pago
5. Deberías ver la página de "Pedido confirmado"
6. En el backoffice del portal (cuando esté conectado a la base de datos) el pedido debería aparecer con estado "Pagado"

---

## Resumen de claves necesarias

| Variable en `.env` | Dónde encontrarla en Stripe |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Developers → API keys → Publishable key |
| `STRIPE_SECRET_KEY` | Developers → API keys → Secret key |
| `STRIPE_WEBHOOK_SECRET` | Developers → Webhooks → tu endpoint → Signing secret |

---

## Preguntas frecuentes

**¿Stripe cobra por cada venta?**
Sí. Stripe cobra aproximadamente el 3.6% + $3 MXN por cada transacción exitosa. No hay cuota mensual fija.

**¿Cuándo recibo el dinero?**
Stripe transfiere el saldo a tu cuenta bancaria típicamente en 2–7 días hábiles después de cada venta.

**¿Qué pasa si un cliente pide reembolso?**
Desde el panel de Stripe puedes emitir reembolsos parciales o totales. El dinero regresa al cliente en 5–10 días hábiles.

**¿Necesito RFC o empresa?**
No necesariamente. Puedes operar como persona física. Stripe pedirá tu información fiscal durante la activación de la cuenta.
