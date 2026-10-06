import { useState } from "react";

function Contacto() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validarFormulario = (event) => {
    event.preventDefault();

    const nuevosErrores = {};

    if (nombre.trim() === "") {
      nuevosErrores.nombre = "Debes ingresar tu nombre.";
    }

    if (correo.trim() === "") {
      nuevosErrores.correo = "Debes ingresar tu correo.";
    } else if (!correo.includes("@")) {
      nuevosErrores.correo = "Ingresa un correo válido.";
    }

    if (mensaje.trim() === "") {
      nuevosErrores.mensaje = "Debes escribir un mensaje.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {

      setEnviado(true);

      setNombre("");
      setCorreo("");
      setMensaje("");
    } else {
      setEnviado(false);
    }
  };

  return (
    <section id="contacto" className="mt-5">

      <h2 className="text-light mb-4">
        Contacto
      </h2>

      <div className="card carrito-card">

        <div className="card-body">

          <p className="text-light mb-4">
            ¿Tienes alguna consulta? Escríbenos.
          </p>

          {enviado && (
            <div className="alert alert-success">
              Mensaje enviado correctamente.
            </div>
          )}

          <form onSubmit={validarFormulario}>

            <div className="mb-3">

              <label
                htmlFor="nombre"
                className="form-label text-light"
              >
                Nombre
              </label>

              <input
                id="nombre"
                type="text"
                className={`form-control ${
                  errores.nombre ? "is-invalid" : ""
                }`}
                value={nombre}
                onChange={(event) =>
                  setNombre(event.target.value)
                }
              />

              {errores.nombre && (
                <div className="invalid-feedback">
                  {errores.nombre}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label
                htmlFor="correo"
                className="form-label text-light"
              >
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                className={`form-control ${
                  errores.correo ? "is-invalid" : ""
                }`}
                value={correo}
                onChange={(event) =>
                  setCorreo(event.target.value)
                }
              />

              {errores.correo && (
                <div className="invalid-feedback">
                  {errores.correo}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label
                htmlFor="mensaje"
                className="form-label text-light"
              >
                Mensaje
              </label>

              <textarea
                id="mensaje"
                className={`form-control ${
                  errores.mensaje ? "is-invalid" : ""
                }`}
                rows="4"
                value={mensaje}
                onChange={(event) =>
                  setMensaje(event.target.value)
                }
              ></textarea>

              {errores.mensaje && (
                <div className="invalid-feedback">
                  {errores.mensaje}
                </div>
              )}

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Enviar mensaje
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contacto;