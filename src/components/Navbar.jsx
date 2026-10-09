import { useState } from 'react';
import { capitalizar } from '../utils/formato';

/**
 * Barra de navegación principal (Navbar de Bootstrap).
 * Incluye el menú desplegable "Categorías" (generado dinámicamente desde
 * las categorías presentes en el catálogo), el buscador de productos y
 * el badge contador con el número total de productos en el carrito.
 *
 * @param {Object} props
 * @param {string[]} props.categorias Categorías únicas del catálogo.
 * @param {string} props.categoriaActiva Categoría seleccionada actualmente.
 * @param {(categoria: string) => void} props.onFiltrarCategoria Callback al elegir categoría.
 * @param {(termino: string) => void} props.onBuscar Callback al enviar la búsqueda.
 * @param {number} props.cantidadCarrito Número total de ítems en el carrito.
 */
function Navbar({ categorias, categoriaActiva, onFiltrarCategoria, onBuscar, cantidadCarrito }) {
  // Estado local del campo de búsqueda (input controlado).
  const [termino, setTermino] = useState('');

  /**
   * Maneja el submit del buscador evitando la recarga de la página
   * y avisando al componente padre (App) del término ingresado.
   * @param {React.FormEvent} evento Evento submit del formulario.
   */
  function manejarSubmit(evento) {
    evento.preventDefault();
    onBuscar(termino);
  }

  /**
   * Maneja el click sobre una opción del menú "Categorías":
   * avisa al padre y limpia el buscador local.
   * @param {string} categoria Categoría elegida ('todas' o una del catálogo).
   */
  function manejarClickCategoria(categoria) {
    onFiltrarCategoria(categoria);
    setTermino('');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-gamer" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">Gaming House</a>
        {/* Botón toggler visible solo cuando el menú está colapsado */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#ofertas">Ofertas</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos">Productos</a></li>
            {/* Menú desplegable con las categorías de productos.
                Las opciones se generan desde las categorías del catálogo. */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#productos"
                id="menu-categorias"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </a>
              <ul className="dropdown-menu" aria-labelledby="menu-categorias">
                {['todas', ...categorias].map((categoria) => (
                  <li key={categoria}>
                    <a
                      className={`dropdown-item${categoriaActiva === categoria ? ' active' : ''}`}
                      href="#productos"
                      onClick={(evento) => {
                        evento.preventDefault();
                        manejarClickCategoria(categoria);
                      }}
                    >
                      {categoria === 'todas' ? 'Todas' : capitalizar(categoria)}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {/* Enlace al carrito con badge contador de productos */}
            <li className="nav-item">
              <a className="nav-link" href="#carrito">
                Carrito
                {cantidadCarrito > 0 && (
                  <span className="badge contador-carrito ms-1">{cantidadCarrito}</span>
                )}
              </a>
            </li>
            <li className="nav-item"><a className="nav-link" href="#noticias-api">Noticias</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
          </ul>
          {/* Barra buscadora dentro de la navbar: filtra productos
              sin recargar la página mediante el evento submit */}
          <form className="d-flex ms-lg-3 mt-2 mt-lg-0" role="search" onSubmit={manejarSubmit}>
            <label htmlFor="buscador" className="visually-hidden">Buscar productos</label>
            <input
              className="form-control me-2"
              type="search"
              id="buscador"
              name="busqueda"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              value={termino}
              onChange={(evento) => setTermino(evento.target.value)}
            />
            <button className="btn btn-gamer" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
