import ProductoCard from "./ProductoCard";

function Products({
  productos,
  busqueda,
  agregarAlCarrito
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
            />

          ))

        )}

      </div>

    </section>
  );
}

export default Products;