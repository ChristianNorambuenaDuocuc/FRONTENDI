import { useEffect, useState } from "react";
import Carrito from "./components/Carrito";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Contacto from "./components/Contacto";


function App() {
const [productos, setProductos] = useState([]);
const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem("carrito");

  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  }

  return [];
});

const [busqueda, setBusqueda] = useState("");
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(false);

  // Guarda el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);

const cargarProductos = () => {
  setCargando(true);
  setError(false);

  fetch(`${import.meta.env.BASE_URL}data/productos.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      return response.json();
    })
    .then((data) => {
      // Validamos que los productos tengan los datos necesarios
      const productosValidos = data.filter((producto) =>
        producto.id &&
        producto.titulo &&
        producto.descripcion &&
        producto.categoria &&
        producto.precioNormal &&
        producto.precioOferta &&
        producto.imagen &&
        producto.imagen.src
      );

      setProductos(productosValidos);
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
      setError(true);
    })
    .finally(() => {
      setCargando(false);
    });
};

useEffect(() => {
  cargarProductos();
}, []);

  // Agrega un producto al carrito evitando duplicados
const agregarAlCarrito = (producto) => {
  const existe = carrito.some(
    (productoCarrito) => productoCarrito.id === producto.id
  );

  if (!existe) {
    setCarrito([...carrito, producto]);
  }
};

// Comprueba si un producto ya está agregado
const estaEnCarrito = (idProducto) => {
  return carrito.some(
    (producto) => producto.id === idProducto
  );
};

  // Elimina un producto utilizando su identificador único
const eliminarDelCarrito = (idProducto) => {
  const nuevoCarrito = carrito.filter(
    (producto) => producto.id !== idProducto
  );

  setCarrito(nuevoCarrito);
};



const eliminarVideojuego = (idProducto) => {
  const nuevaLista = productos.filter(
    (producto) => producto.id !== idProducto
  );

  setProductos(nuevaLista);
};

 return (
  <>
    <Header cantidadCarrito={carrito.length}
    busqueda={busqueda}
    setBusqueda={setBusqueda} />

    <Hero />

    <main className="container mt-5">

      <Products
      productos={productos}
      busqueda={busqueda}
      agregarAlCarrito={agregarAlCarrito}
      estaEnCarrito={estaEnCarrito}
      cargando={cargando}
      error={error}
      reintentar={cargarProductos}
      eliminarVideojuego={eliminarVideojuego}
    />

      

      <Carrito
        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
      />

      <Contacto />

    </main>

    <Footer />
  </>
);
}

export default App;