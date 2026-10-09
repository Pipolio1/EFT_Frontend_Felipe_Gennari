import TarjetaProducto from './TarjetaProducto';

/**
 * Sección del catálogo de productos. Renderiza las tarjetas en una grilla
 * responsiva de Bootstrap: 1 columna en móvil, 2 en tablet y 3 en escritorio.
 * Gestiona con renderizado condicional los estados de carga (spinner),
 * error (con botón "Reintentar") y "sin resultados" de búsqueda o filtro.
 *
 * @param {Object} props
 * @param {Array} props.productos Productos ya filtrados a mostrar.
 * @param {'cargando'|'ok'|'error'} props.estadoCarga Estado de la carga del catálogo.
 * @param {string} props.detalleError Causa específica del error de carga (HTTP, red o datos inválidos).
 * @param {() => void} props.onReintentar Callback para reintentar la carga ante un error.
 * @param {Set<number>} props.idsEnCarrito Ids de los productos que están en el carrito.
 * @param {(producto: Object) => void} props.onAlternar Callback para agregar/quitar del carrito (Semana 8).
 */
function ListaProductos({ productos, estadoCarga, detalleError, onReintentar, idsEnCarrito, onAlternar }) {
  return (
    <section id="productos" className="container py-4">
      <h2 className="text-center mb-4">Productos destacados</h2>

      {/* Renderizado condicional según el estado de la carga del catálogo */}
      {estadoCarga === 'cargando' && (
        <p className="text-center" role="status" aria-live="polite">
          Cargando catálogo de productos...{' '}
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
        </p>
      )}

      {estadoCarga === 'error' && (
        <p className="text-center" role="status">
          {/* Detalle específico del fallo (código HTTP, red o datos),
              para facilitar el soporte y la depuración */}
          {detalleError}{' '}
          <button type="button" className="btn btn-gamer btn-sm" onClick={onReintentar}>
            Reintentar
          </button>
        </p>
      )}

      {estadoCarga === 'ok' && (
        <p className="text-center" role="status" aria-live="polite">
          Catálogo cargado desde JSON local: {productos.length} producto(s) disponibles.
        </p>
      )}

      {/* Grilla de tarjetas de producto */}
      <div className="row g-4" aria-busy={estadoCarga === 'cargando'}>
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
            enCarrito={idsEnCarrito.has(producto.id)}
            onAlternar={onAlternar}
          />
        ))}
      </div>

      {/* Estado vacío: visible cuando la búsqueda o el filtro por
          categoría no arroja coincidencias */}
      {estadoCarga === 'ok' && productos.length === 0 && (
        <p className="mensaje-interaccion mensaje-info" role="status">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      )}
    </section>
  );
}

export default ListaProductos;
