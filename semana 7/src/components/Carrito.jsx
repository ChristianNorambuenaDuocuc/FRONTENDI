function Carrito({ carrito, eliminarDelCarrito }) {

  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precioOferta,
    0
  );

  return (
    <section id="carrito" className="mt-5">

      <h2 className="text-light mb-4">
        🛒 Carrito de compras
      </h2>

      <div className="card carrito-card">
        <div className="card-body">

          {carrito.length === 0 ? (

            <div className="alert alert-secondary mb-0">
              Tu carrito está vacío.
            </div>

          ) : (

            <>
              {carrito.map((producto, index) => (

                <div
                  key={`${producto.id}-${index}`}
                  className="border-bottom py-3"
                >

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <strong>
                        {producto.titulo}
                      </strong>

                      <p className="mb-0">
                        ${producto.precioOferta.toLocaleString("es-CL")}
                      </p>
                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarDelCarrito(index)}
                    >
                      Eliminar
                    </button>

                  </div>

                </div>

              ))}

              <div className="mt-4">
                <p className="fw-bold fs-5 mb-0">
                  Total: ${total.toLocaleString("es-CL")}
                </p>
              </div>
            </>

          )}

        </div>
      </div>

    </section>
  );
}

export default Carrito;