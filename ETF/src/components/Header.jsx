function Header({ cantidadCarrito, busqueda, setBusqueda }) {

  return (
    <header>

      <nav className="navbar navbar-expand-lg navbar-dark">

        <div className="container-fluid px-4">

          <a className="navbar-brand" href="#inicio">
            🎮 GameZone
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarGameZone"
            aria-controls="navbarGameZone"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarGameZone"
          >

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link active" href="#inicio">
                  Inicio
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#juegos">
                  Juegos
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#carrito">
                  Carrito
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#contacto">
                  Contacto
                </a>
              </li>

            </ul>

            <input
            className="form-control me-3"
            style={{ maxWidth: "220px" }}
            type="search"
            placeholder="Buscar videojuegos"
            value={busqueda}
            onChange={(event) =>
                setBusqueda(event.target.value)
            }
            />

            <span className="text-white text-nowrap">
              🛒 {cantidadCarrito}
            </span>

          </div>

        </div>

      </nav>

    </header>
  );
}

export default Header;