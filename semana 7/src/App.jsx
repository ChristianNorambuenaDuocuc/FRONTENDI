import { useEffect, useState } from "react";
import Carrito from "./components/Carrito";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");

 useEffect(() => {
  fetch(`${import.meta.env.BASE_URL}data/productos.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar productos.json");
      }

      return response.json();
    })
    .then((data) => {
      setProductos(data);
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
    });
}, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter(
      (_, posicion) => posicion !== index
    );

    setCarrito(nuevoCarrito);
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
      />

      <Carrito
        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
      />

    </main>

    <Footer />
  </>
);
}

export default App;
