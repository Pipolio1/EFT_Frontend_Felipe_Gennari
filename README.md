# Gaming House — Exp3_S8_Felipe_Gennari (React)

Actividad Semana 8 — **Mejorando funcionalidades clave en el eCommerce con React**
Curso: Desarrollo Frontend I (PFY2201) — Duoc UC
Autor: Felipe Gennari

## Descripción

Continuación del proyecto "Gaming House" de la Semana 7 (eCommerce migrado a **React con Vite**). En esta entrega se **agrega y optimiza una funcionalidad clave**: el botón de cada tarjeta de producto ahora **alterna entre "Agregar al carrito" y "En el carrito ✓"**, aplicando gestión de estado con **useState**, efectos con **useEffect** y **renderizado condicional** para mejorar la interacción del usuario.

## Novedades Semana 8

- **Botón toggle en las tarjetas de producto**: al hacer clic en "Agregar al carrito" el botón cambia a **"En el carrito ✓"** con un estilo visual destacado (clase `btn-en-carrito` y `aria-pressed`). Al hacer clic de nuevo, el producto **se quita del carrito** y el botón vuelve a su estado inicial.
- **Identificación por `id`**: los ítems del carrito ahora guardan el `id` del producto, lo que permite saber en todo momento qué productos están agregados (dato derivado `idsEnCarrito` en `App.jsx`).
- **Mensajes dinámicos** tanto al agregar como al quitar desde la tarjeta, manteniendo la persistencia del carrito en `localStorage`.

## Funcionalidades

- **Catálogo dinámico**: los productos se cargan con Fetch API desde `public/data/productos.json` dentro de un `useEffect`, con estados de carga (spinner), error (botón "Reintentar") y éxito.
- **Manejo granular de errores**: las peticiones distinguen errores HTTP (con código de estado), fallos de red, timeout y datos inválidos, mostrando un mensaje específico según la causa (`utils/errores.js`).
- **Filtrado y búsqueda con utilidades puras**: la lógica de filtro por categoría y búsqueda vive en `filtrarProductos` (`utils/filtrado.js`), reutilizada por el render y los mensajes, con datos derivados memorizados mediante `useMemo` para evitar recálculos innecesarios.
- **Tarjetas de producto**: cada producto muestra imagen, nombre, descripción corta, **precio normal tachado** y **precio de oferta** destacado (renderizado condicional según exista oferta).
- **Carrito de compras persistente**: agregar y quitar productos (desde la tarjeta con el botón toggle o desde el carrito con "Quitar"), **contador del número total de productos** (badge en la navbar y resumen en el carrito), **total en CLP** actualizado en tiempo real y persistencia en **localStorage** mediante `useEffect`.
- **Renderizado condicional**: mensaje de carrito vacío, estados de carga/error/vacío, etiqueta "¡Oferta!" y el botón "Agregar al carrito" ⇄ "En el carrito ✓".
- **Filtro por categorías**: menú desplegable en la navbar generado dinámicamente desde las categorías del JSON (Consolas, Videojuegos, Accesorios).
- **Búsqueda**: formulario controlado (`onSubmit`/`onChange`) que filtra productos sin recargar la página, con aviso cuando no hay resultados.
- **Noticias desde API externa**: sección de novedades cargada con Fetch API desde JSONPlaceholder, con timeout (AbortController), estados de carga/error/vacío y botón "Reintentar".
- **Mensajes dinámicos accesibles**: avisos de info/éxito/error con `role="status"` y `aria-live="polite"`.

## Estructura del proyecto

```
├── index.html                  # Punto de montaje (#root)
├── Capturas de pantalla/       # Evidencias WebPC / WebTablet / WebMovil
├── public/
│   ├── img/                    # Logo e imágenes del carrusel (WebP)
│   └── data/productos.json     # Catálogo local (con precioOferta)
└── src/
    ├── main.jsx                # Entrada React + imports de Bootstrap
    ├── index.css               # Tema gamer sobre Bootstrap 5 (+ .btn-en-carrito)
    ├── App.jsx                 # Estado global (useState/useEffect/useMemo), alternarCarrito y composición
    ├── utils/formato.js        # formatearPrecio, capitalizar (funciones reutilizables)
    ├── utils/filtrado.js       # filtrarProductos (utilidad pura de filtro por categoría y búsqueda)
    └── utils/errores.js        # describirErrorFetch (mensajes diferenciados según el tipo de error)
    └── components/             # Componentes funcionales
        ├── Header.jsx
        ├── Navbar.jsx          # Menú, categorías, buscador, badge contador
        ├── Carrusel.jsx        # Carrusel de ofertas (Bootstrap)
        ├── Mensaje.jsx         # Mensajes dinámicos accesibles
        ├── ListaProductos.jsx  # Grilla + estados de carga/error/vacío
        ├── TarjetaProducto.jsx # Card con botón toggle "En el carrito ✓"
        ├── Carrito.jsx         # Lista, quitar ítems, contador y total
        ├── Noticias.jsx        # Fetch API externa con useEffect
        └── Footer.jsx
```

## Cómo ejecutar

Requisito: [Node.js](https://nodejs.org/) LTS instalado.

```bash
npm install     # instala las dependencias
npm run dev     # servidor de desarrollo en http://localhost:5173
npm run build   # build de producción en dist/
npm run deploy  # build + publicación en la rama gh-pages
```

## Tecnologías

- **React 18** (componentes funcionales, hooks useState, useEffect y useMemo, renderizado condicional)
- **Vite 5** (entorno de desarrollo y build)
- **Bootstrap 5.3** (navbar, carrusel, grilla responsiva, cards)
- Fetch API, localStorage, CSS3 (variables CSS)

## Enlaces

- Repositorio GitHub: https://github.com/Pipolio1/Exp3_S8_Felipe_Gennari_
- Sitio desplegado (GitHub Pages): https://pipolio1.github.io/Exp3_S8_Felipe_Gennari_/
