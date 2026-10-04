function ProductoCard({ producto, agregarAlCarrito }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className="card card-juego h-100">

        <img
          src={`${import.meta.env.BASE_URL}${producto.imagen.src}`}
          className="card-img-top"
          alt={producto.imagen.alt}
        />

        <div className="card-body d-flex flex-column">

          <h3 className="card-title">
            {producto.titulo}
          </h3>

          <p className="card-text descripcion-producto">
            {producto.descripcion}
          </p>

          <p className="card-text">
            Categoría: {producto.categoria}
          </p>

          <p className="text-decoration-line-through text-secondary mb-1">
            Precio normal: $
            {producto.precioNormal.toLocaleString("es-CL")}
          </p>

          <p className="fw-bold fs-5 text-warning">
            Oferta: $
            {producto.precioOferta.toLocaleString("es-CL")}
          </p>

          <button
            className="btn btn-primary mt-auto"
            onClick={() => agregarAlCarrito(producto)}
            >
            Agregar al carrito
            </button>

        </div>

      </article>
    </div>
  );
}

export default ProductoCard;
