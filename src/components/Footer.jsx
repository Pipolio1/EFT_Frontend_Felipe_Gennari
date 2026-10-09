/**
 * Pie de página con la información de contacto y redes sociales.
 * Componente funcional presentacional (sin estado).
 */
function Footer() {
  return (
    <footer className="text-center py-4 px-3 mt-4">
      <h2 className="fs-4">Contacto</h2>
      <p>Email: contacto@gaminghouse.cl</p>
      <p>Síguenos en redes sociales:</p>
      {/* Redes sociales centradas con utilidades flex de Bootstrap */}
      <ul className="redes list-unstyled d-flex justify-content-center gap-4">
        <li>
          <a href="https://www.instagram.com/gaminghouseejemplo" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/gaminghouseejemplo" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </li>
      </ul>
      <p className="mb-0">Copyright &copy; 2026 Gaming House. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
