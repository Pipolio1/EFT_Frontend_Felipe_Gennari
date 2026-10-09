/* ============================================================
   Utilidad para el manejo granular de errores en peticiones
   fetch (retroalimentación S8: diferenciar errores HTTP y
   mensajes según la situación, para facilitar el soporte y
   la depuración técnica).
   ============================================================ */

/**
 * Traduce un error capturado en una petición fetch a un mensaje
 * amigable y específico para el usuario, diferenciando la causa:
 * - Error HTTP con código de estado (4xx/5xx): el servidor respondió,
 *   pero con un fallo. El código se incluye para facilitar la depuración.
 * - Timeout/abort (AbortError): la petición superó el tiempo de espera.
 * - Error de red (TypeError): no hubo conexión con el servidor.
 * - Datos inválidos: la respuesta llegó, pero malformada o vacía.
 *
 * @param {Error} error Error capturado en el catch de la petición.
 * @param {string} contexto Qué se estaba cargando (ej. 'catálogo de productos', 'noticias').
 * @returns {string} Mensaje descriptivo según la situación detectada.
 */
export function describirErrorFetch(error, contexto) {
  // Error HTTP: el servidor respondió con un código de estado de error.
  if (Number.isFinite(error.status)) {
    return `El servidor respondió con un error HTTP ${error.status} al cargar ${contexto}. Intenta nuevamente en unos minutos.`;
  }

  // Timeout: la petición se canceló por superar el tiempo máximo de espera.
  if (error.name === 'AbortError') {
    return `La carga de ${contexto} tardó demasiado y se agotó el tiempo de espera. Revisa tu conexión e intenta nuevamente.`;
  }

  // Error de red: fetch lanza TypeError cuando no logra conectar
  // (sin internet, DNS caído, servidor inalcanzable, etc.).
  if (error instanceof TypeError) {
    return `No se pudo conectar para cargar ${contexto}. Revisa tu conexión a internet e intenta nuevamente.`;
  }

  // Datos inválidos: la respuesta llegó, pero el JSON está malformado
  // o no contiene elementos válidos (mensaje propio lanzado al validar).
  return `Los datos de ${contexto} llegaron incompletos o en un formato inválido. (${error.message})`;
}
