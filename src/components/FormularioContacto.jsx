import { useState } from 'react';

/**
 * Formulario de contacto (requisito EFT Semana 9).
 * Campos: nombre, email y mensaje. Valida la información antes de
 * "enviarla": muestra un mensaje de error por campo cuando falta
 * información o está mal ingresada, y un aviso de éxito cuando el
 * formulario es válido.
 *
 * Componente con estado propio (useState): los valores de los campos,
 * los errores de validación y el aviso de resultado se manejan de
 * forma local, sin intervenir el estado global de App.
 */

/** Valores iniciales (y de reinicio) de los campos del formulario. */
const VALORES_INICIALES = { nombre: '', email: '', mensaje: '' };

/** Expresión regular básica para validar el formato del correo. */
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida los campos del formulario y devuelve un objeto con los
 * errores encontrados (vacío si todo está correcto). Función pura:
 * mismas entradas → mismo resultado, sin efectos laterales.
 * @param {{nombre: string, email: string, mensaje: string}} valores Valores actuales de los campos.
 * @returns {{nombre?: string, email?: string, mensaje?: string}} Mensajes de error por campo.
 */
function validarCampos(valores) {
  const errores = {};

  if (valores.nombre.trim() === '') {
    errores.nombre = 'El nombre es obligatorio.';
  } else if (valores.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (valores.email.trim() === '') {
    errores.email = 'El email es obligatorio.';
  } else if (!REGEX_EMAIL.test(valores.email.trim())) {
    errores.email = 'Ingresa un email válido (ejemplo: nombre@correo.cl).';
  }

  if (valores.mensaje.trim() === '') {
    errores.mensaje = 'El mensaje es obligatorio.';
  } else if (valores.mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errores;
}

function FormularioContacto() {
  // Estados locales del componente (hook useState).
  const [valores, setValores] = useState(VALORES_INICIALES); // valores de los campos (inputs controlados)
  const [errores, setErrores] = useState({}); // errores de validación por campo
  const [aviso, setAviso] = useState(null); // aviso de resultado: { texto, tipo: 'exito' | 'error' }

  /**
   * Actualiza el valor del campo modificado (input controlado) y
   * limpia su error de validación, si tenía uno, para que el usuario
   * vea desaparecer el mensaje mientras corrige.
   * @param {React.ChangeEvent} evento Evento change del input o textarea.
   */
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));

    if (errores[name]) {
      setErrores((actuales) => {
        const nuevos = { ...actuales };
        delete nuevos[name];
        return nuevos;
      });
    }
  }

  /**
   * Maneja el envío del formulario: evita la recarga de la página,
   * valida los campos y muestra errores por campo o un aviso de
   * éxito (reiniciando el formulario) según corresponda.
   * @param {React.FormEvent} evento Evento submit del formulario.
   */
  function manejarSubmit(evento) {
    evento.preventDefault();

    const nuevosErrores = validarCampos(valores);
    setErrores(nuevosErrores);

    // Si hay errores, se muestran bajo cada campo y se avisa en el resumen.
    if (Object.keys(nuevosErrores).length > 0) {
      setAviso({ texto: 'Revisa el formulario: hay campos incompletos o con errores.', tipo: 'error' });
      return;
    }

    // Formulario válido: aviso de éxito y reinicio de los campos.
    setAviso({
      texto: `¡Gracias, ${valores.nombre.trim()}! Tu mensaje fue enviado correctamente. Te contactaremos pronto.`,
      tipo: 'exito',
    });
    setValores(VALORES_INICIALES);
  }

  return (
    <section id="contacto" className="container py-4" aria-label="Formulario de contacto">
      <h2 className="text-center mb-4">Contáctanos</h2>
      <div className="formulario-contacto mx-auto">
        <p className="text-center mb-4">
          ¿Dudas sobre un producto o tu compra? Escríbenos y te responderemos a la brevedad.
        </p>

        {/* noValidate: la validación la hace JavaScript (no el navegador)
            para mostrar mensajes de error personalizados por campo */}
        <form noValidate onSubmit={manejarSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre-contacto" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre-contacto"
              name="nombre"
              className={`form-control${errores.nombre ? ' is-invalid' : ''}`}
              placeholder="Tu nombre"
              value={valores.nombre}
              onChange={manejarCambio}
              required
            />
            {/* Renderizado condicional: el error solo aparece si el campo falló la validación */}
            {errores.nombre && <p className="invalid-feedback d-block mb-0">{errores.nombre}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email-contacto" className="form-label">Email</label>
            <input
              type="email"
              id="email-contacto"
              name="email"
              className={`form-control${errores.email ? ' is-invalid' : ''}`}
              placeholder="nombre@correo.cl"
              value={valores.email}
              onChange={manejarCambio}
              required
            />
            {errores.email && <p className="invalid-feedback d-block mb-0">{errores.email}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje-contacto" className="form-label">Mensaje</label>
            <textarea
              id="mensaje-contacto"
              name="mensaje"
              className={`form-control${errores.mensaje ? ' is-invalid' : ''}`}
              rows="4"
              placeholder="Escribe tu mensaje..."
              value={valores.mensaje}
              onChange={manejarCambio}
              required
            ></textarea>
            {errores.mensaje && <p className="invalid-feedback d-block mb-0">{errores.mensaje}</p>}
          </div>

          <button type="submit" className="btn btn-gamer w-100">Enviar mensaje</button>
        </form>

        {/* Aviso accesible del resultado del envío (éxito o error).
            role="status" + aria-live permiten que lectores de pantalla
            anuncien el resultado automáticamente */}
        {aviso && (
          <p className={`mensaje-interaccion mensaje-${aviso.tipo} mb-0`} role="status" aria-live="polite">
            {aviso.texto}
          </p>
        )}
      </div>
    </section>
  );
}

export default FormularioContacto;
