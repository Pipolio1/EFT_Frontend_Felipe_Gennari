/* ============================================================
   Gaming House — Componente principal App (Semana 8, React)
   Autor: Felipe Gennari — PFY2201 Desarrollo Frontend I

   Centraliza el estado de la aplicación con el hook useState:
   - productos: catálogo cargado desde el JSON local (fetch + useEffect).
   - carrito: ítems agregados, persistidos en localStorage (useEffect).
   - categoria / terminoBusqueda: filtros activos del catálogo.
   - mensaje: aviso dinámico mostrado bajo el carrusel.
   - detalleError: causa específica del último error de carga
     (HTTP con código, red o datos inválidos — ver utils/errores.js).

   Los datos derivados (categorías, ids en carrito y productos
   visibles) se calculan con useMemo y la utilidad pura
   filtrarProductos (utils/filtrado.js), evitando recálculos
   innecesarios en cada renderizado.

   Mejora Semana 8: el botón de cada tarjeta alterna entre
   "Agregar al carrito" y "En el carrito ✓" (alternarCarrito),
   identificando los productos por su id.
   ============================================================ */

import { useEffect, useMemo, useState } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Carrusel from './components/Carrusel';
import Mensaje from './components/Mensaje';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import Noticias from './components/Noticias';
import FormularioContacto from './components/FormularioContacto';
import Footer from './components/Footer';

import { describirErrorFetch } from './utils/errores';
import { filtrarProductos } from './utils/filtrado';

/** Clave de localStorage donde se guarda el carrito entre sesiones. */
const CLAVE_CARRITO = 'gaminghouse_carrito';

/** Ruta del catálogo JSON local (servido desde la carpeta public/). */
const RUTA_PRODUCTOS = `${import.meta.env.BASE_URL}data/productos.json`;

/**
 * Lee y valida el carrito guardado en localStorage.
 * Se usa como inicializador perezoso de useState para que la
 * lectura ocurra una sola vez, al montar la aplicación.
 * @returns {{id?: number, nombre: string, precio: number}[]} Ítems válidos guardados.
 */
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));

    if (Array.isArray(guardado)) {
      // El id es opcional para no descartar carritos guardados
      // con la versión anterior (Semana 7), que no lo incluía.
      return guardado.filter((producto) => producto
        && typeof producto.nombre === 'string'
        && Number.isFinite(Number(producto.precio)));
    }
  } catch (error) {
    console.error('No se pudo restaurar el carrito desde localStorage:', error);
  }

  return [];
}

/**
 * Componente raíz de la aplicación: gestiona el estado global y
 * compone los componentes funcionales de cada sección de la página.
 */
function App() {
  // ---------- Estados principales (hook useState) ----------
  const [productos, setProductos] = useState([]);
  const [estadoCarga, setEstadoCarga] = useState('cargando'); // 'cargando' | 'ok' | 'error'
  const [detalleError, setDetalleError] = useState(''); // causa específica del último error de carga
  const [carrito, setCarrito] = useState(leerCarritoGuardado);
  const [categoria, setCategoria] = useState('todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [mensaje, setMensaje] = useState({
    texto: 'Interactividad cargada: busca productos, filtra por categoría o agrega items al carrito.',
    tipo: 'info',
  });

  /**
   * Carga el catálogo desde el JSON local con la Fetch API.
   * Se define fuera del useEffect para reutilizarla en el
   * botón "Reintentar" del estado de error.
   * Manejo granular de errores: distingue errores HTTP (con código
   * de estado), fallos de red y datos inválidos, guardando un
   * detalle específico en detalleError para facilitar la depuración.
   */
  async function cargarProductos() {
    setEstadoCarga('cargando');
    setDetalleError('');

    try {
      const respuesta = await fetch(RUTA_PRODUCTOS);

      if (!respuesta.ok) {
        // Error HTTP: se adjunta el código de estado para diferenciarlo
        // en el catch (404 = no encontrado, 500 = fallo del servidor, etc.).
        const errorHttp = new Error(`Error HTTP: ${respuesta.status}`);
        errorHttp.status = respuesta.status;
        throw errorHttp;
      }

      const datos = await respuesta.json();

      // Valida y normaliza los productos antes de guardarlos en el
      // estado: descarta entradas malformadas y limpia los textos.
      const productosValidos = Array.isArray(datos)
        ? datos
            .filter((producto) => producto
              && typeof producto.nombre === 'string'
              && typeof producto.descripcion === 'string'
              && typeof producto.imagen === 'string'
              && typeof producto.categoria === 'string'
              && Number.isFinite(Number(producto.precio)))
            .map((producto) => ({
              id: producto.id,
              nombre: producto.nombre.trim(),
              descripcion: producto.descripcion.trim(),
              precio: Number(producto.precio),
              precioOferta: Number.isFinite(Number(producto.precioOferta))
                ? Number(producto.precioOferta)
                : null,
              imagen: producto.imagen.trim(),
              alt: typeof producto.alt === 'string' && producto.alt.trim() !== ''
                ? producto.alt.trim()
                : `Imagen de ${producto.nombre.trim()}`,
              categoria: producto.categoria.trim().toLowerCase(),
            }))
            .filter((producto) => producto.nombre !== '' && producto.imagen !== '')
        : [];

      if (productosValidos.length === 0) {
        throw new Error('El archivo JSON no contiene productos válidos.');
      }

      setProductos(productosValidos);
      setEstadoCarga('ok');
    } catch (error) {
      console.error('Error al cargar productos:', error);
      // Mensaje específico según la causa del fallo (HTTP, red o datos).
      const detalle = describirErrorFetch(error, 'catálogo de productos');
      setEstadoCarga('error');
      setDetalleError(detalle);
      setMensaje({ texto: detalle, tipo: 'error' });
    }
  }

  // ---------- Efectos (hook useEffect) ----------

  // Carga del catálogo una sola vez, al montar la aplicación.
  useEffect(() => {
    cargarProductos();
  }, []);

  // Persistencia: guarda el carrito en localStorage cada vez que cambia,
  // para que sobreviva a recargas o cierres del navegador.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch (error) {
      console.error('No se pudo guardar el carrito en localStorage:', error);
    }
  }, [carrito]);

  // ---------- Manejadores de eventos ----------

  /**
   * Alterna un producto dentro/fuera del carrito (mejora Semana 8).
   * Si el producto ya está en el carrito (mismo id), lo elimina;
   * si no está, lo agrega. Permite que el botón de la tarjeta
   * cambie de texto: "Agregar al carrito" ⇄ "En el carrito ✓".
   * @param {{id: number, nombre: string, precio: number}} producto Producto seleccionado.
   */
  function alternarCarrito(producto) {
    const yaEsta = carrito.some((item) => item.id === producto.id);

    if (yaEsta) {
      // Quita la primera coincidencia con ese id.
      setCarrito((carritoActual) => {
        const indice = carritoActual.findIndex((item) => item.id === producto.id);
        return carritoActual.filter((_, i) => i !== indice);
      });
      setMensaje({ texto: `${producto.nombre} eliminado del carrito.`, tipo: 'info' });
    } else {
      setCarrito((carritoActual) => [...carritoActual, producto]);
      setMensaje({ texto: `${producto.nombre} agregado al carrito.`, tipo: 'exito' });
    }
  }

  /**
   * Elimina el ítem del carrito en la posición indicada.
   * @param {number} indice Posición del ítem dentro del carrito.
   */
  function quitarDelCarrito(indice) {
    setCarrito((carritoActual) => {
      const quitado = carritoActual[indice];
      setMensaje({ texto: `${quitado.nombre} eliminado del carrito.`, tipo: 'info' });
      return carritoActual.filter((_, i) => i !== indice);
    });
  }

  /**
   * Aplica el filtro por categoría elegido en la navbar.
   * @param {string} nuevaCategoria Categoría seleccionada ('todas' o una del catálogo).
   */
  function filtrarPorCategoria(nuevaCategoria) {
    setCategoria(nuevaCategoria);
    setTerminoBusqueda('');
    setMensaje({
      texto: nuevaCategoria === 'todas'
        ? 'Mostrando todas las categorías.'
        : `Mostrando la categoría "${nuevaCategoria}".`,
      tipo: 'info',
    });
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Aplica la búsqueda enviada desde el formulario de la navbar.
   * Reutiliza la utilidad pura filtrarProductos para contar las
   * coincidencias (misma lógica que usa el render del catálogo).
   * @param {string} termino Texto ingresado por el usuario.
   */
  function buscarProductos(termino) {
    const terminoLimpio = termino.trim().toLowerCase();
    setTerminoBusqueda(terminoLimpio);

    if (terminoLimpio === '') {
      setMensaje({ texto: 'Mostrando todos los productos disponibles.', tipo: 'info' });
      return;
    }

    // La búsqueda ignora el filtro de categoría activo ('todas').
    const coincidencias = filtrarProductos(productos, 'todas', terminoLimpio);

    setMensaje(
      coincidencias.length > 0
        ? { texto: `Se encontraron ${coincidencias.length} producto(s) para "${terminoLimpio}".`, tipo: 'exito' }
        : { texto: `No se encontraron productos para "${terminoLimpio}".`, tipo: 'error' }
    );
  }

  // ---------- Datos derivados del estado ----------
  // Memorizados con useMemo: solo se recalculan cuando cambian sus
  // dependencias, evitando recálculos innecesarios en cada renderizado.

  // Categorías únicas del catálogo para el menú desplegable.
  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))],
    [productos]
  );

  // Ids de los productos que están en el carrito: permite que cada
  // tarjeta sepa si debe mostrar "Agregar al carrito" o "En el carrito ✓".
  const idsEnCarrito = useMemo(
    () => new Set(carrito.map((item) => item.id)),
    [carrito]
  );

  // Productos visibles tras aplicar el filtro de categoría y la búsqueda,
  // delegando la lógica en la utilidad pura filtrarProductos.
  const productosVisibles = useMemo(
    () => filtrarProductos(productos, categoria, terminoBusqueda),
    [productos, categoria, terminoBusqueda]
  );

  // ---------- Render ----------
  return (
    <>
      <Header />
      <Navbar
        categorias={categorias}
        categoriaActiva={categoria}
        onFiltrarCategoria={filtrarPorCategoria}
        onBuscar={buscarProductos}
        cantidadCarrito={carrito.length}
      />
      <Carrusel />
      <main>
        <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />
        <ListaProductos
          productos={productosVisibles}
          estadoCarga={estadoCarga}
          detalleError={detalleError}
          onReintentar={cargarProductos}
          idsEnCarrito={idsEnCarrito}
          onAlternar={alternarCarrito}
        />
        <Carrito carrito={carrito} onQuitar={quitarDelCarrito} />
        <Noticias />
        <FormularioContacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
