import ProductoCard from "./ProductoCard";

function Products({
  productos,
  busqueda,
  agregarAlCarrito,
  estaEnCarrito,
  cargando,
  error,
  reintentar
}) {

  const productosFiltrados = productos.filter(
    (producto) =>

      producto.titulo
        .toLowerCase()
        .includes(busqueda.toLowerCase())

      ||

      producto.categoria
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

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

      <h2 className="text-light mb-4">
        Juegos destacados
      </h2>

      <p className="text-light">
        Descubre nuestros videojuegos destacados.
      </p>

      <div className="row g-4 mt-1">

        {productosFiltrados.length === 0 ? (

          <div className="col-12">

            <div className="alert alert-warning">

              No se encontraron videojuegos
              con ese criterio de búsqueda.

            </div>

          </div>

        ) : (

          productosFiltrados.map((producto) => (

            <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
            estaEnCarrito={estaEnCarrito(producto.id)}
          />

          ))

        )}

      </div>

    </section>
  );
}

export default Products;