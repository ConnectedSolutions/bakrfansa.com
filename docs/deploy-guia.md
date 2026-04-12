# Guía de lanzamiento — cómo publicar el portal

Esta guía explica paso a paso cómo publicar el portal de Bakr Fansa en internet.
Se necesitan tres servicios: **Railway** (base de datos), **Vercel** (el portal) y **Cloudinary** (imágenes).

---

## Orden de configuración

1. Railway — crear la base de datos
2. Cloudinary — crear la cuenta de imágenes
3. Vercel — publicar el portal
4. Conectar Stripe (ver `docs/stripe-configuracion.md`)

---

## Parte 1 — Railway (base de datos)

Railway es el servicio donde se guardarán todos los datos: obras, álbumes, pedidos, usuarios.

1. Ve a **railway.app** y crea una cuenta (puedes usar tu cuenta de GitHub)
2. Haz clic en **"New Project"**
3. Selecciona **"Provision PostgreSQL"**
4. Railway crea la base de datos automáticamente
5. En el panel de tu base de datos, ve a la pestaña **"Connect"**
6. Copia el valor de **"DATABASE_URL"** — se ve así:
   ```
   postgresql://postgres:AbCdEfGh@roundhouse.proxy.rlwy.net:12345/railway
   ```
7. Guarda ese valor — lo necesitarás en el Paso 3

**Costo:** Railway tiene un plan gratuito con 500 horas/mes. Para producción se recomienda el plan Starter (~$5 USD/mes).

---

## Parte 2 — Cloudinary (imágenes)

Cloudinary es el servicio que optimiza y sirve todas las imágenes de las obras.

1. Ve a **cloudinary.com** y crea una cuenta gratuita
2. En el panel principal verás tus credenciales:
   - **Cloud name** — ejemplo: `bakrfansa`
   - **API Key** — un número largo
   - **API Secret** — una cadena de letras y números
3. Guarda estos tres valores

**Costo:** El plan gratuito incluye 25 créditos/mes — suficiente para empezar. Las imágenes de las obras no consumen mucho.

---

## Parte 3 — Vercel (publicar el portal)

Vercel es la plataforma donde vive el portal. Se conecta directamente con GitHub.

### 3.1 Subir el código a GitHub

1. Crea un repositorio en **github.com** (puede ser privado)
2. En la terminal del proyecto ejecuta:
   ```bash
   git add .
   git commit -m "Portal Bakr Fansa — listo para deploy"
   git remote add origin https://github.com/TU_USUARIO/bakrfansa.git
   git push -u origin main
   ```

### 3.2 Crear el proyecto en Vercel

1. Ve a **vercel.com** y crea una cuenta (usa tu cuenta de GitHub)
2. Haz clic en **"Add New Project"**
3. Importa el repositorio que creaste
4. Vercel detecta automáticamente que es un proyecto Next.js
5. **Antes de hacer clic en "Deploy"**, configura las variables de entorno

### 3.3 Variables de entorno en Vercel

En la pantalla de configuración de Vercel, agrega estas variables una por una:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | El valor que copiaste de Railway |
| `PAYLOAD_SECRET` | Una cadena aleatoria de 32+ caracteres (genera una en: randomkeygen.com) |
| `CLOUDINARY_CLOUD_NAME` | Tu cloud name de Cloudinary |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | El mismo cloud name (se repite) |
| `CLOUDINARY_API_KEY` | Tu API key de Cloudinary |
| `CLOUDINARY_API_SECRET` | Tu API secret de Cloudinary |
| `STRIPE_SECRET_KEY` | Tu clave secreta de Stripe |
| `STRIPE_WEBHOOK_SECRET` | El signing secret del webhook de Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Tu clave pública de Stripe |
| `NEXT_PUBLIC_SITE_URL` | La URL del portal (ejemplo: `https://bakrfansa.com`) |

6. Haz clic en **"Deploy"**
7. Vercel construye y publica el portal — tarda 2-3 minutos
8. Vercel te da una URL temporal como `bakrfansa.vercel.app`

### 3.4 Conectar tu dominio propio

Si tienes el dominio `bakrfansa.com`:
1. En Vercel → tu proyecto → **"Domains"**
2. Escribe tu dominio y sigue las instrucciones para apuntar los DNS

---

## Parte 4 — Crear el primer usuario del backoffice

Una vez publicado el portal, Bakr necesita crear su cuenta de administrador:

1. Ve a `https://bakrfansa.com/admin`
2. La primera vez que se accede, Payload CMS pedirá crear el usuario inicial
3. Ingresa el correo y contraseña de Bakr
4. Listo — el backoffice está disponible

Desde ahí Bakr puede:
- Crear álbumes y subir obras con sus fotos reales
- Gestionar productos y reproducciones
- Ver y gestionar los pedidos recibidos

---

## Parte 5 — Formulario de contacto (correo real)

El formulario de contacto actualmente muestra la confirmación pero no envía correos. Para activarlo:

1. Crear una cuenta gratuita en **Resend** (resend.com) — el servicio más simple para enviar correos desde Next.js
2. Obtener la API key de Resend
3. Instalar en el proyecto: `npm install resend`
4. Agregar la variable `RESEND_API_KEY` en Vercel
5. Crear la ruta `/api/contacto` que use Resend para enviar el formulario al correo de Bakr

Este paso es el último — puede hacerse después del lanzamiento inicial sin afectar nada.

---

## Resumen de servicios y costos aproximados

| Servicio | Plan recomendado | Costo aproximado |
|---|---|---|
| Vercel | Pro (si supera límites del free) | $20 USD/mes |
| Railway | Starter | $5 USD/mes |
| Cloudinary | Free → Plus si crece | $0–$89 USD/mes |
| Stripe | Por transacción | ~3.6% + $3 MXN por venta |
| Resend | Free (100 emails/día) | $0 |
| Dominio | Según registrador | ~$200 MXN/año |

Para empezar, el costo mensual puede ser de $0 a $5 USD mientras el tráfico sea bajo.
