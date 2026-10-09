/* ============================================================
   Utilidades reutilizables del proyecto (criterio 6 de la pauta:
   funciones reutilizables con convenciones claras).
   ============================================================ */

/**
 * Formatea un número como precio en pesos chilenos.
 * @param {number} valor Valor numérico del precio.
 * @returns {string} Precio formateado para mostrar en pantalla.
 */
export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')} CLP`;
}

/**
 * Pone en mayúscula la primera letra de un texto (para mostrar
 * las categorías en el menú y en los mensajes).
 * @param {string} texto Texto a transformar.
 * @returns {string} Texto con la primera letra en mayúscula.
 */
export function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
