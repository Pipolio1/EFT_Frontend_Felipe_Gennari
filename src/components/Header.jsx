/**
 * Encabezado principal del sitio: logo y tagline de la tienda.
 * Componente funcional presentacional (sin estado).
 */
function Header() {
  // import.meta.env.BASE_URL respeta la base configurada en vite.config.js,
  // necesario para que las imágenes funcionen también en GitHub Pages.
  const base = import.meta.env.BASE_URL;

  return (
    <header id="inicio" className="text-center py-4 px-3">
      <h1>
        <img
          src={`${base}img/logo.webp`}
          alt="Logo de Gaming House"
          className="logo img-fluid"
          width="550"
          height="261"
          fetchpriority="high"
        />
      </h1>
      <p className="mb-0">Tu tienda especializada en videojuegos, consolas y accesorios para gamers.</p>
    </header>
  );
}

export default Header;
