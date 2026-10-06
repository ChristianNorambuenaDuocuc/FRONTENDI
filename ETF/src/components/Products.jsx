import { useState } from "react";
import ProductoCard from "./ProductoCard";

function Products({
  productos,
  busqueda,
  agregarAlCarrito,
  estaEnCarrito,
  cargando,
  error,
  reintentar,
  eliminarVideojuego
}) {

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // Obtiene las categorías disponibles directamente desde los productos
  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria))
  ];

  // Filtra por búsqueda y por categoría
  const productosFiltrados = productos.filter((producto) => {

    const coincideBusqueda =
      producto.titulo
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      producto.categoria
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.categoria === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  });

  if (cargando) {
    return (
      <section className="mt-5">
        <div className="alert alert-info">
          Cargando productos...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-5">
        <div className="alert alert-danger">
          <p>No fue posible cargar los productos.</p>

          <button
            className="btn btn-danger"
            onClick={reintentar}
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="juegos" className="mt-5">

      <h2 className="text-light mb-3">
        Juegos destacados
      </h2>

      <p className="text-light mb-4">
        Descubre nuestros videojuegos destacados.
      </p>

      {/* FILTRO POR CATEGORÍA */}
      <div className="mb-4">
        <label
          htmlFor="filtroCategoria"
          className="form-label text-light"
        >
          Filtrar por categoría
        </label>

        <select
          id="filtroCategoria"
          className="form-select"
          value={categoriaSeleccionada}
          onChange={(event) =>
            setCategoriaSeleccionada(event.target.value)
          }
        >
          {categorias.map((categoria) => (
            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="row g-4 mt-1">

        {productosFiltrados.length === 0 ? (

  <div className="col-12">

    <div className="alert alert-warning">

      <p className="mb-3">
        No hay videojuegos disponibles.
      </p>

      {productos.length === 0 && (
        <button
          className="btn btn-primary"
          onClick={reintentar}
        >
          Restaurar catálogo
        </button>
      )}

    </div>

  </div>

) : (

          // LISTADO DE PRODUCTOS

          productosFiltrados.map((producto) => (

            <ProductoCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
              estaEnCarrito={estaEnCarrito(producto.id)}
              eliminarVideojuego={eliminarVideojuego}
            />

          ))

        )}

      </div>

    </section>
  );
}

export default Products;