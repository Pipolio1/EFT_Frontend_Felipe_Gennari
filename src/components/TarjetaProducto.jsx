import { formatearPrecio } from '../utils/formato';

/**
 * Tarjeta de un producto del catálogo (componente card de Bootstrap).
 * Muestra imagen, nombre, descripción corta, precio normal tachado,
 * precio de oferta destacado y el botón para agregar/quitar del carrito.
 *
 * Mejora Semana 8: el botón usa renderizado condicional según el estado
 * del carrito — "Agregar al carrito" cuando el producto no está y
 * "En el carrito ✓" (con estilo destacado) cuando ya fue agregado.
 * Al hacer clic en "En el carrito ✓" el producto se quita del carrito.
 *
 * @param {Object} props
 * @param {{id: number, nombre: string, descripcion: string, precio: number, precioOferta: number, imagen: string, alt: string, categoria: string}} props.producto
 * @param {boolean} props.enCarrito true si el producto ya está en el carrito.
 * @param {(producto: Object) => void} props.onAlternar Callback al hacer click en el botón (agrega o quita).
 */
function TarjetaProducto({ producto, enCarrito, onAlternar }) {
  // Renderizado condicional: el precio normal tachado y la etiqueta
  // "¡Oferta!" solo se muestran cuando el producto tiene precio de oferta.
  const tieneOferta = Number.isFinite(producto.precioOferta) && producto.precioOferta < producto.precio;
  const precioFinal = tieneOferta ? producto.precioOferta : producto.precio;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className="card card-producto h-100 position-relative">
        {tieneOferta && <span className="etiqueta-oferta">¡Oferta!</span>}
        <img src={producto.imagen} alt={producto.alt} className="card-img-top" loading="lazy" />
        <div className="card-body d-flex flex-column">
          <h3 className="card-title fs-5">{producto.nombre}</h3>
          <p className="card-text">{producto.descripcion}</p>
          <p className="card-text mt-auto">
            {tieneOferta && (
              <>
                Precio normal: <span className="precio-normal">{formatearPrecio(producto.precio)}</span>
                <br />
              </>
            )}
            Precio oferta: <span className="precio-oferta">{formatearPrecio(precioFinal)}</span>
          </p>
          {/* Renderizado condicional del botón (Semana 8): cambia de
              texto y estilo según el producto esté o no en el carrito.
              onClick alterna: agrega con su precio final o lo quita. */}
          <button
            type="button"
            className={`btn btn-gamer${enCarrito ? ' btn-en-carrito' : ''}`}
            aria-pressed={enCarrito}
            onClick={() => onAlternar({ id: producto.id, nombre: producto.nombre, precio: precioFinal })}
          >
            {enCarrito ? 'En el carrito ✓' : 'Agregar al carrito'}
          </button>
        </div>
      </article>
    </div>
  );
}

export default TarjetaProducto;
