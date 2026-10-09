import { formatearPrecio } from '../utils/formato';

/**
 * Sección del carrito de compras. Muestra la lista de productos
 * agregados con su botón "Quitar", el contador total de productos
 * y el total en pesos chilenos. El estado vacío se gestiona con
 * renderizado condicional.
 *
 * @param {Object} props
 * @param {{id?: number, nombre: string, precio: number}[]} props.carrito Ítems actuales del carrito.
 * @param {(indice: number) => void} props.onQuitar Callback para eliminar un ítem por su posición.
 */
function Carrito({ carrito, onQuitar }) {
  // Total del carrito: suma de los precios de todos los ítems.
  const total = carrito.reduce((acumulado, producto) => acumulado + producto.precio, 0);

  return (
    <section id="carrito" className="container py-4" aria-label="Carrito de compras">
      <h2 className="text-center mb-4">Carrito de compras</h2>
      <div className="carrito-panel">
        {/* Renderizado condicional: mensaje de carrito vacío o lista de ítems */}
        {carrito.length === 0 ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item item-carrito">Tu carrito está vacío.</li>
          </ul>
        ) : (
          <ul className="list-group list-group-flush">
            {carrito.map((producto, indice) => (
              <li
                // Key estable basada en el id del producto. El fallback
                // con el índice solo cubre ítems antiguos guardados en
                // localStorage desde la Semana 7, que no incluían id.
                key={producto.id ?? `item-${indice}`}
                className="list-group-item item-carrito d-flex justify-content-between align-items-center gap-2"
              >
                <span>{producto.nombre} - {formatearPrecio(producto.precio)}</span>
                {/* Evento onClick: elimina el ítem del carrito por su posición */}
                <button
                  type="button"
                  className="btn btn-gamer btn-sm"
                  aria-label={`Quitar ${producto.nombre} del carrito`}
                  onClick={() => onQuitar(indice)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Contador total de productos en el carrito (requisito de la actividad) */}
        <p className="contador-carrito-total fs-6 mt-3 mb-0">
          Productos en el carrito: <strong>{carrito.length}</strong>
        </p>
        <p id="total-carrito" className="fs-5 fw-bold mb-0">
          Total: {formatearPrecio(total)}
        </p>
      </div>
    </section>
  );
}

export default Carrito;
