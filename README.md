# Gaming House — EFT Felipe Gennari (React)

**Evaluación Final Transversal — Semana 9**
Curso: Desarrollo Frontend I (PFY2201) — Duoc UC
Autor: Felipe Gennari

## Descripción

Sitio web **"Gaming House"**, tienda online de videojuegos, consolas y accesorios. Proyecto final del curso, construido con **HTML5, CSS3, JavaScript, Bootstrap 5 y React (con Vite)**, a partir del caso planteado en la EFT: página principal con el catálogo de productos, filtrado por categoría, formulario de contacto validado y código modularizado en componentes React.

El proyecto es la evolución de las entregas semanales del curso (ver [Historial de versiones](#historial-de-versiones)).

## Funcionalidades

- **Catálogo dinámico**: los productos se cargan con Fetch API desde `public/data/productos.json` dentro de un `useEffect`, con estados de carga (spinner), error (botón "Reintentar") y éxito. Cada producto se muestra en una **tarjeta** con imagen, nombre, descripción, precio normal tachado y precio de oferta.
- **Filtro por categorías**: menú desplegable en la navbar generado dinámicamente desde las categorías del catálogo (Consolas, Videojuegos, Accesorios), implementado con la utilidad pura `filtrarProductos` (`utils/filtrado.js`).
- **Búsqueda**: formulario controlado que filtra productos por nombre o descripción sin recargar la página, con aviso cuando no hay resultados.
- **Carrito de compras con estado (useState)**: agregar y quitar productos (botón toggle "Agregar al carrito" ⇄ "En el carrito ✓" en cada tarjeta, o "Quitar" desde el carrito), contador total de productos (badge en la navbar y resumen en el carrito), total en CLP en tiempo real y persistencia en **localStorage** mediante `useEffect`.
- **Formulario de contacto validado**: campos nombre, email y mensaje. La validación se realiza con JavaScript antes del envío, mostrando un **mensaje de error por campo** cuando falta información o está mal ingresada (formato de email, largos mínimos), y un aviso de éxito cuando el formulario es válido. Componente `FormularioContacto.jsx` con estado local e inputs controlados.
- **Noticias desde API externa**: sección de novedades cargada con Fetch API desde JSONPlaceholder, con timeout (AbortController), estados de carga/error/vacío y botón "Reintentar".
- **Manejo granular de errores**: las peticiones distinguen errores HTTP (con código de estado), fallos de red, timeout y datos inválidos (`utils/errores.js`).
- **Mensajes dinámicos accesibles**: avisos de info/éxito/error con `role="status"` y `aria-live="polite"`.
- **Diseño responsivo**: grilla de Bootstrap 5 (1 columna en móvil, 2 en tablet, 3 en escritorio), navbar colapsable y tema gamer personalizado con variables CSS.

## Estructura del proyecto

```
├── index.html                  # Punto de montaje (#root)
├── Capturas de pantalla/       # Evidencias WebPC / WebTablet / WebMovil
├── public/
│   ├── img/                    # Logo e imágenes del carrusel (WebP)
│   └── data/productos.json     # Catálogo local (con precioOferta)
└── src/
    ├── main.jsx                # Entrada React + imports de Bootstrap
    ├── index.css               # Tema gamer sobre Bootstrap 5
    ├── App.jsx                 # Estado global (useState/useEffect/useMemo) y composición
    ├── utils/formato.js        # formatearPrecio, capitalizar (funciones reutilizables)
    ├── utils/filtrado.js       # filtrarProductos (utilidad pura de filtro y búsqueda)
    ├── utils/errores.js        # describirErrorFetch (mensajes según el tipo de error)
    └── components/             # Componentes funcionales
        ├── Header.jsx
        ├── Navbar.jsx              # Menú, categorías, buscador, badge contador
        ├── Carrusel.jsx            # Carrusel de ofertas (Bootstrap)
        ├── Mensaje.jsx             # Mensajes dinámicos accesibles
        ├── ListaProductos.jsx      # Grilla + estados de carga/error/vacío
        ├── TarjetaProducto.jsx     # Card con botón toggle "En el carrito ✓"
        ├── Carrito.jsx             # Lista, quitar ítems, contador y total
        ├── Noticias.jsx            # Fetch API externa con useEffect
        ├── FormularioContacto.jsx  # Formulario validado (nombre, email, mensaje)
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
- **Bootstrap 5.3** (navbar, carrusel, grilla responsiva, cards, formularios)
- HTML5 semántico, CSS3 (variables CSS), JavaScript ES6+, Fetch API, localStorage

## Historial de versiones

El proyecto se desarrolló progresivamente durante el curso, con un repositorio por semana:

- **Semana 8** (Exp3_S8 — carrito con botón toggle): https://github.com/Pipolio1/Exp3_S8_Felipe_Gennari_
- **Semana 9** (EFT — este repositorio): https://github.com/Pipolio1/EFT_Frontend_Felipe_Gennari
- *(Agregar aquí los enlaces de los repositorios de las semanas anteriores)*

## Enlaces

- Repositorio GitHub: https://github.com/Pipolio1/EFT_Frontend_Felipe_Gennari
- Sitio desplegado (GitHub Pages): *(agregar enlace una vez publicado con `npm run deploy`)*
