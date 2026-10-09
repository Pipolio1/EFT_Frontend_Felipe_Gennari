/**
 * Carrusel de ofertas destacadas (Carousel de Bootstrap).
 * data-bs-ride="carousel" inicia el deslizamiento automático y cada
 * imagen usa data-bs-interval="3000" para cambiar cada 3 segundos.
 * Componente funcional presentacional (sin estado).
 */
function Carrusel() {
  const base = import.meta.env.BASE_URL;

  // Datos de las ofertas: mantener el contenido separado del JSX
  // facilita agregar o quitar imágenes del carrusel.
  const ofertas = [
    { src: 'img/descuento-1.webp', src640: 'img/descuento-1-640.webp', alt: 'Oferta 1: Nintendo Switch 2 con 25% de descuento' },
    { src: 'img/descuento-2.webp', src640: 'img/descuento-2-640.webp', alt: 'Oferta 2: Zelda Breath of the Wild con 40% de descuento' },
    { src: 'img/descuento-3.webp', src640: 'img/descuento-3-640.webp', alt: 'Oferta 3: Final Fantasy VII Remake con 30% de descuento' },
  ];

  return (
    <section id="ofertas" className="container py-5" aria-label="Ofertas destacadas">
      <h2 className="text-center mb-4">Ofertas de la semana</h2>
      <div id="carruselOfertas" className="carousel slide mx-auto" data-bs-ride="carousel">
        {/* Indicadores (puntos inferiores) */}
        <div className="carousel-indicators">
          {ofertas.map((oferta, indice) => (
            <button
              key={oferta.src}
              type="button"
              data-bs-target="#carruselOfertas"
              data-bs-slide-to={indice}
              className={indice === 0 ? 'active' : ''}
              aria-current={indice === 0 ? 'true' : undefined}
              aria-label={`Oferta ${indice + 1}`}
            ></button>
          ))}
        </div>
        {/* Imágenes del carrusel en formato WebP con versiones escaladas:
            1100px para escritorio y 640px para móviles (srcset/sizes).
            La primera imagen se carga con prioridad alta (visible al cargar);
            las demás usan carga diferida (lazy). */}
        <div className="carousel-inner">
          {ofertas.map((oferta, indice) => (
            <div key={oferta.src} className={`carousel-item${indice === 0 ? ' active' : ''}`} data-bs-interval="3000">
              <img
                src={`${base}${oferta.src}`}
                srcSet={`${base}${oferta.src640} 640w, ${base}${oferta.src} 1100w`}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="d-block w-100"
                alt={oferta.alt}
                width="1100"
                height="521"
                loading={indice === 0 ? undefined : 'lazy'}
                fetchpriority={indice === 0 ? 'high' : undefined}
              />
            </div>
          ))}
        </div>
        {/* Controles anterior / siguiente */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carruselOfertas" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselOfertas" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}

export default Carrusel;
