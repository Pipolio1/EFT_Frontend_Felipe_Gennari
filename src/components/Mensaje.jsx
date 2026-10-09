/**
 * Mensaje dinámico accesible para informar acciones del usuario
 * (búsquedas, filtros, carrito, errores de carga).
 * El atributo role="status" permite que lectores de pantalla
 * anuncien los cambios automáticamente.
 * @param {{texto: string, tipo: 'info'|'exito'|'error'}} props
 */
function Mensaje({ texto, tipo }) {
  return (
    <div className="container">
      <p className={`mensaje-interaccion mensaje-${tipo}`} role="status" aria-live="polite">
        {texto}
      </p>
    </div>
  );
}

export default Mensaje;
