// Muestra dinámicamente los productos obtenidos desde el archivo JSON.
// Recorre cada producto y crea una tarjeta Bootstrap dentro del contenedor #productos.
const mostrarProductos = (productos) => {

    const rowProductos = document.getElementById("productos");

    rowProductos.innerHTML = "";

    productos.forEach(producto => {
    const tarjeta = `
    <div class="col-12 col-md-6 col-lg-4">

        <article class="card card-juego h-100">

            <img
                src="${producto.imagen.src}"
                class="card-img-top"
                alt="${producto.imagen.alt}"
            >

            <div class="card-body d-flex flex-column">

                <h3 class="card-title">
                    ${producto.titulo}
                </h3>

                <p class="card-text">
                    ${producto.descripcion}
                </p>

                <a
                    href="${producto.boton.url}"
                    class="btn btn-primary mt-auto"
                >
                    ${producto.boton.texto}
                </a>

            </div>

        </article>

    </div>
`;

    rowProductos.innerHTML += tarjeta;

});

};

// Carga los productos desde un archivo JSON utilizando Fetch API.
// Convierte la respuesta a formato JSON, muestra los datos y controla posibles errores.
const cargarProductos = () => {

   const rowProductos = document.getElementById("productos");

    rowProductos.innerHTML = `
        <p class="text-white">Cargando productos...</p>
    `;

    fetch("./data/productos.json")
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => {
    rowProductos.innerHTML = `
        <p class="text-white">
            Error al cargar los productos.
        </p>
    `;

    console.error("Error al cargar los productos:", error);
});

};

// Restablece el color original de todos los párrafos de la página
// después de que hayan sido modificados temporalmente.
const restablecerColores = () => {

    const parrafos = document.querySelectorAll("p");

    parrafos.forEach(p => {
        p.style.color = "";
    });

};

// Ejecuta las acciones principales cuando el HTML ha terminado de cargar.
// Aquí se configuran los eventos, cambios de estilo y la carga de productos.
document.addEventListener("DOMContentLoaded", function() {

const parrafos = document.querySelectorAll("p");

    parrafos.forEach(p => {
        p.style.color = "red";
    });

    setTimeout(restablecerColores, 3000);

const menuJuegos = document.getElementById("menu_juegos");
const menuOfertas = document.getElementById("menu_ofertas");
const menuContacto = document.getElementById("menu_contacto");
const botonOfertas = document.getElementById("boton_ofertas");
const inputBusqueda = document.getElementById("input_busqueda");
const formBusqueda = document.getElementById("form_busqueda");

formBusqueda.addEventListener("submit", (event) => {

    event.preventDefault();

    if (inputBusqueda.value.trim() === "") {
        alert("Debes ingresar un videojuego para buscar.");
        return;
    }

    alert("Buscando: " + inputBusqueda.value);

});

const leadInfo = document.getElementById("lead_info");
const leadDefault = "Descubre nuestros videojuegos destacados.";




menuJuegos.addEventListener("mouseover", () => {
  
    leadInfo.innerHTML = "Explora nuestra selección de videojuegos.";
});

menuJuegos.addEventListener("mouseout", () => {
    leadInfo.innerHTML = leadDefault;
});

menuOfertas.addEventListener("mouseover", () => {
    leadInfo.innerHTML = "Revisa nuestras ofertas especiales en videojuegos.";
});

menuOfertas.addEventListener("mouseout", () => {
    leadInfo.innerHTML = leadDefault;
});

menuContacto.addEventListener("mouseover", () => {
    leadInfo.innerHTML = "Ponte en contacto con GameZone para resolver tus dudas.";
});

menuContacto.addEventListener("mouseout", () => {
    leadInfo.innerHTML = leadDefault;
});

botonOfertas.addEventListener("click", () => {
    alert("¡Aprovecha nuestras ofertas especiales en videojuegos!");
});

cargarProductos();

});