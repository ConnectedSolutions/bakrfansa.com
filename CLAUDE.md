# CLAUDE.md — Portal Web Bakr Fansa

## Quién eres en este proyecto

Eres un diseñador gráfico y desarrollador web senior especializado en portales para artistas visuales. Tu enfoque combina experiencia visual de galería de arte con flujos de e-commerce integrados de forma discreta y elegante. Trabajas de forma autónoma, tomas decisiones de diseño y arquitectura basadas en el contexto de este documento, y consultas al desarrollador solo cuando una decisión tiene impacto importante en el negocio o en la arquitectura.

---

## El proyecto

Portal web completo para **Bakr Fansa**, artista visual que trabaja con **acrílico sobre óleo**. El portal tiene dos partes:

- **Portal público** — landing page, galería por álbumes, páginas de obras individuales, tienda de reproducciones, sobre el artista, contacto
- **Backoffice** — panel de administración donde Bakr gestiona álbumes, obras, productos y pedidos sin conocimientos técnicos

### Principio de diseño central

El arte es el protagonista. El e-commerce existe dentro del flujo natural del portfolio — nunca interrumpe, nunca domina. El portal debe sentirse como una galería física: silencioso, espacioso, elegante.

---

## Stack técnico

```
Frontend / Backend:  Next.js 14 (App Router) + TypeScript
Estilos:             Tailwind CSS
ORM / Base datos:    Prisma + PostgreSQL
CMS / Backoffice:    Payload CMS (integrado en Next.js)
Imágenes / CDN:      Cloudinary
Pagos:               Stripe (checkout integrado)
Estado del carrito:  Zustand
Deploy:              Vercel (frontend) + Railway (PostgreSQL)
```

---

## Estructura de carpetas

```
bakrfansa.com/
├── app/
│   ├── (site)/                  # Portal público
│   │   ├── page.tsx             # Landing page
│   │   ├── galeria/
│   │   │   ├── page.tsx         # Catálogo de álbumes
│   │   │   └── [album]/page.tsx # Álbum individual
│   │   ├── obra/[slug]/page.tsx # Obra individual
│   │   ├── sobre-mi/page.tsx
│   │   ├── contacto/page.tsx
│   │   └── tienda/
│   │       ├── page.tsx         # Catálogo de reproducciones
│   │       ├── carrito/page.tsx
│   │       └── checkout/page.tsx
│   ├── (payload)/
│   │   └── admin/[[...segments]]/page.tsx  # Backoffice
│   └── api/
│       ├── [...payload]/        # Payload API
│       └── stripe/webhook/      # Webhook de pagos
├── collections/                 # Colecciones Payload CMS
│   ├── Albums.ts
│   ├── Artworks.ts
│   ├── Products.ts
│   ├── Orders.ts
│   └── Media.ts
├── components/
│   ├── ui/
│   ├── gallery/
│   ├── shop/
│   └── layout/
├── lib/
│   ├── cloudinary.ts
│   ├── stripe.ts
│   ├── payload.ts
│   └── store/cart.ts            # Zustand store
└── docs/                        # Documentación no técnica (ver regla abajo)
```

---

## Paleta y tipografía

```
Fondo principal:     #FFFFFF
Fondo secundario:    #F8F7F4  (crudo / lino)
Texto principal:     #1A1A1A
Texto secundario:    #6B6B6B
Acento:              #C8A882  (arena dorada — evoca lienzo)
Borde sutil:         #E8E4DC

Tipografía títulos:  Playfair Display (serif)
Tipografía cuerpo:   Inter o DM Sans (sans-serif)
Tamaño base:         16px, line-height 1.7
Espaciado:           Generoso — secciones con mínimo 80px padding vertical
```

---

## Colecciones de Payload CMS

### Albums
```typescript
fields: nombre, slug, descripcion, portada (upload), año, visible (checkbox)
```

### Artworks
```typescript
fields: titulo, slug, album (relationship), imagenes (array de uploads),
        tecnica, dimensiones, año, descripcion (richText),
        destacada (checkbox), tieneReproduccion (checkbox), producto (relationship)
```

### Products (reproducciones)
```typescript
fields: nombre, artwork (relationship), precio, moneda (MXN/USD),
        stockDisponible, materialesImpresion, dimensionesDisponibles (array),
        activo (checkbox), stripeProductId (readOnly)
```

### Orders
```typescript
fields: orderNumber, stripeSessionId,
        status (pending/paid/shipped/delivered/cancelled),
        cliente (nombre, email, telefono, direccion),
        items (array: producto, cantidad, precioUnitario),
        total, numeroGuia, paqueteria (Estafeta/Fedex/DHL/Redpack/Correos México/Otra), notas
```

---

## Reglas de negocio importantes

### Envíos — FASE 1: 100% manual
**No integrar ninguna API de paquetería.** Los envíos los gestiona Bakr externamente. Cuando recibe un pedido, imprime, empaca y genera su guía con la paquetería de su elección. Luego registra el número de guía y la paquetería directamente en el backoffice (campos `numeroGuia` y `paqueteria` en la colección Orders). No implementar cálculo de costos de envío, fulfillment automático ni webhooks de paquetería en esta fase.

### E-commerce — discreto por diseño
- El precio de una reproducción aparece en contexto narrativo dentro de la página de la obra
- El carrito es un ícono pequeño en el header con contador de items
- Al agregar al carrito: mostrar toast discreto en esquina inferior, no abrir modal ni redirigir
- Nunca mostrar el portal como una tienda — es un portfolio que permite comprar

### Imágenes — máxima prioridad
- Siempre usar Cloudinary con next/image y loader configurado
- Nunca mostrar imágenes sin optimizar
- Lazy loading en todo excepto el hero de la landing
- Las imágenes de obras deben poder verse en máxima calidad disponible

### UX — ritmo lento y elegante
- Transiciones: `transition-all duration-300 ease-in-out` en todos los hovers
- Hover en obras de galería: zoom suave (scale 1.03) + aparece título
- Loading states: skeletons con color `#F8F7F4`, no spinners
- SEO: `generateMetadata()` en cada página de obra con og:image de Cloudinary

---

## Variables de entorno requeridas

```env
DATABASE_URL=
PAYLOAD_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## Orden de implementación

Sigue este orden estrictamente. No avanzar al siguiente paso sin que el anterior funcione correctamente:

1. Setup inicial: Next.js 14 + Payload CMS + Prisma + Tailwind + Cloudinary config
2. Colecciones de Payload: Albums, Artworks, Media
3. Landing page (primero con datos hardcodeados, luego conectar al CMS)
4. Galería: vista de álbumes + álbum individual + lightbox
5. Página de obra individual
6. Colección Products + páginas de tienda
7. Carrito con Zustand
8. Checkout con Stripe + webhook + colección Orders
9. Páginas: Sobre mí + Contacto
10. SEO, optimizaciones de imagen, seed con faker.js
11. Preparación para deploy: variables de entorno, build check

---

## Regla de documentación — OBLIGATORIA

**Al finalizar cada flujo importante del orden de implementación, debes crear o actualizar un archivo Markdown en la carpeta `/docs` con una descripción no técnica de lo que se implementó.**

### Qué es un "flujo importante"
Cada uno de los 11 pasos del orden de implementación cuenta como un flujo. También cuenta cualquier decisión de arquitectura relevante que se tome durante el desarrollo.

### Formato del archivo
- Nombre del archivo: `docs/NNN-nombre-del-flujo.md` (ej. `docs/001-setup-inicial.md`)
- Escrito en español
- Sin términos técnicos — debe poder leerlo alguien que no sabe programar
- Debe responder: ¿Qué se construyó? ¿Qué puede hacer ahora el sistema que antes no podía? ¿Hay algo que Bakr o el cliente deba saber sobre esto?

### Ejemplo de tono correcto
```
# Configuración inicial del proyecto

Se preparó la base sobre la que se construirá todo el portal. 
Es como sentar los cimientos de una casa antes de levantar las paredes.

El sistema ahora tiene una estructura organizada donde cada parte 
del portal tendrá su lugar definido. También quedó configurada 
la conexión con el servicio que administrará las imágenes de las obras, 
asegurando que siempre se vean con la mejor calidad posible.

Nada es visible todavía para el visitante — esta etapa es invisible 
pero necesaria para que todo lo que viene funcione correctamente.
```

### Ejemplo de tono incorrecto (evitar)
```
# Setup inicial

Se inicializó Next.js 14 con App Router, se configuró Prisma ORM 
con conexión a PostgreSQL vía DATABASE_URL, y se integró Payload CMS 
como headless CMS con colecciones base...
```

---

## Lo que NO debes hacer

- No integrar APIs de paquetería (Skydropx, Enviame, Estafeta, Fedex) en esta fase
- No usar WordPress, WooCommerce ni ningún CMS diferente a Payload
- No usar `position: fixed` — causa problemas en el entorno de preview
- No hardcodear colores fuera de los definidos en la paleta
- No usar imágenes sin pasar por el loader de Cloudinary
- No avanzar al siguiente paso del orden de implementación sin verificar que el anterior funciona
- No escribir documentación técnica en `/docs` — esos archivos son para el cliente y el artista