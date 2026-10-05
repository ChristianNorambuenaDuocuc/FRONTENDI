function Footer() {
  return (
    <footer
      className="footer mt-5 py-4"
      id="contacto"
    >
      <div className="container">

        <div className="row">

          <div className="col-12 col-md-4 mb-3">
            <h2 className="h5">
              🎮 GameZone
            </h2>

            <p>
              Tu tienda de videojuegos con las mejores aventuras,
              lanzamientos y ofertas.
            </p>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <h2 className="h5">
              Enlaces
            </h2>

            <ul className="list-unstyled">
              <li>
                <a href="#inicio">
                  Inicio
                </a>
              </li>

              <li>
                <a href="#juegos">
                  Juegos
                </a>
              </li>

              <li>
                <a href="#carrito">
                  Carrito
                </a>
              </li>

              <li>
                <a href="#contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <h2 className="h5">
              Contacto
            </h2>

            <p>
              Email: contacto@gamezone.cl
            </p>

            <p>
              Teléfono: +56 9 1234 5678
            </p>
          </div>

        </div>

        <hr />

        <p className="text-center mb-0">
          © 2026 GameZone - Todos los derechos reservados
        </p>

      </div>
    </footer>
  );
}

export default Footer;