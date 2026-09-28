function Hero() {
  return (
    <section
      id="inicio"
      className="container mt-4"
    >
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src={`${import.meta.env.BASE_URL}imagenes/bg3.jpg`}
              className="d-block w-100"
              alt="Baldur's Gate 3"
            />
          </div>

          <div className="carousel-item">
            <img
              src={`${import.meta.env.BASE_URL}imagenes/darksolus.jpg`}
              className="d-block w-100"
              alt="Dark Souls"
            />
          </div>

          <div className="carousel-item">
            <img
              src={`${import.meta.env.BASE_URL}imagenes/rdr2.webp`}
              className="d-block w-100"
              alt="Red Dead Redemption 2"
            />
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Anterior
          </span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Siguiente
          </span>
        </button>

      </div>
    </section>
  );
}

export default Hero;
