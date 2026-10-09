/* ============================================================
   Utilidad pura de filtrado del catálogo (retroalimentación S8:
   consolidar filtrado y búsqueda en utilidades puras, con una
   relación explícita entre entradas y resultados, reutilizable
   tanto en el render como en los mensajes de búsqueda).
   ============================================================ */

/**
 * Filtra el catálogo por categoría y/o término de búsqueda.
 * Función pura: mismas entradas → mismo resultado, sin efectos
 * laterales, lo que permite revisarla y probarla de forma independiente.
 *
 * @param {{nombre: string, descripcion: string, categoria: string}[]} productos Catálogo completo.
 * @param {string} categoria Categoría activa ('todas' no filtra).
 * @param {string} termino Término de búsqueda (se limpia internamente; '' no filtra).
 * @returns {Array} Productos que coinciden con ambos criterios.
 */
export function filtrarProductos(productos, categoria, termino) {
  const terminoLimpio = termino.trim().toLowerCase();

  return productos.filter((producto) => {
    const coincideCategoria = categoria === 'todas' || producto.categoria === categoria;
    const coincideBusqueda = terminoLimpio === ''
      || `${producto.nombre} ${producto.descripcion}`.toLowerCase().includes(terminoLimpio);
    return coincideCategoria && coincideBusqueda;
  });
}
