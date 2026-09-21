// Guarda todos los productos obtenidos desde productos.json.
let listaProductos = [];

// Guarda los productos seleccionados por el usuario.
let carrito = [];

// Muestra dinámicamente los productos obtenidos desde el archivo JSON.
// Recorre cada producto y crea una tarjeta Bootstrap dentro del contenedor #productos.
// Muestra dinámicamente los productos obtenidos desde el archivo JSON.
// Recorre cada producto y crea una tarjeta Bootstrap dentro del contenedor #productos.
const mostrarProductos = (productos) => {

    const rowProductos = document.getElementById("productos");

    // Limpia el contenido anterior antes de mostrar los productos.
    rowProductos.innerHTML = "";
    if (productos.length === 0) {

        rowProductos.innerHTML = `
            <div class="col-12">

                <div class="alert alert-warning" role="alert">

                    No se encontraron videojuegos
                    con ese criterio de búsqueda.

                </div>

            </div>
        `;

        return;
    }


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

                <div>
                    <h3 class="card-title">
                        ${producto.titulo}
                    </h3>

                    <p class="card-text descripcion-producto">
                        ${producto.descripcion}
                    </p>
                </div>

                <div class="mt-auto">
                    <p class="card-text mb-2">
                        Categoría: ${producto.categoria}
                    </p>

                    <p class="fw-bold fs-5 mb-3">
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <button
                        type="button"
                        class="btn btn-primary w-100 boton-carrito"
                        data-id="${producto.id}"
                    >
                        Agregar al carrito
                    </button>
                </div>

            </div>

        </article>

    </div>
`;

        rowProductos.innerHTML += tarjeta;

    });

};

// Busca el producto seleccionado por su ID
// y lo agrega al carrito.
const agregarAlCarrito = (idProducto) => {

    const productoSeleccionado = listaProductos.find(producto =>
        producto.id === idProducto
    );

    if (productoSeleccionado) {

        carrito.push(productoSeleccionado);

        actualizarCarrito();

    }

};


// Actualiza visualmente el contenido del carrito
// y calcula el precio total.
const actualizarCarrito = () => {

    const contenedorCarrito =
        document.getElementById("carrito");

    const totalCarrito =
        document.getElementById("total_carrito");

    // Limpia el carrito antes de volver a dibujarlo.
    contenedorCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        const productoCarrito =
            document.createElement("div");

        productoCarrito.className =
            "border-bottom py-2";

        productoCarrito.innerHTML = `
            <strong>
                ${producto.titulo}
            </strong>

            <span class="float-end">
                $${producto.precio.toLocaleString("es-CL")}
            </span>
        `;

        contenedorCarrito.appendChild(productoCarrito);

        total += producto.precio;

    });

    totalCarrito.textContent =
        `$${total.toLocaleString("es-CL")}`;

};

// Carga los productos desde un archivo JSON utilizando Fetch API.
// Convierte la respuesta a formato JSON, muestra los datos y controla posibles errores.
// Carga los productos desde un archivo JSON utilizando Fetch API.
// Controla errores de conexión o respuestas incorrectas.
const cargarProductos = () => {

    const rowProductos =
        document.getElementById("productos");

    rowProductos.innerHTML = `
        <p class="text-white">
            Cargando productos...
        </p>
    `;

    fetch("./data/productos.json")

        .then(response => {

            // Verifica que la respuesta del servidor sea correcta.
            if (!response.ok) {

                throw new Error(
                    "No fue posible cargar los productos."
                );

            }

            return response.json();

        })

        .then(data => {

            // Guarda los productos para utilizarlos
            // posteriormente en búsquedas y carrito.
            listaProductos = data;

            mostrarProductos(listaProductos);

        })

        .catch(error => {

            rowProductos.innerHTML = `
                <div class="col-12">

                    <div
                        class="alert alert-danger"
                        role="alert"
                    >
                        Lo sentimos. No fue posible
                        cargar los productos.
                        Intenta nuevamente más tarde.
                    </div>

                </div>
            `;

            console.error(
                "Error al cargar los productos:",
                error
            );

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
const contenedorProductos = document.getElementById("productos");

// Detecta los clics realizados sobre los botones
// "Agregar al carrito".
contenedorProductos.addEventListener("click", (event) => {

    if (event.target.classList.contains("boton-carrito")) {

        const idProducto =
            Number(event.target.dataset.id);

        agregarAlCarrito(idProducto);

    }

});

// Procesa el formulario de búsqueda.
formBusqueda.addEventListener("submit", (event) => {

    event.preventDefault();

    const textoBusqueda =
        inputBusqueda.value.trim().toLowerCase();

    // Si el campo está vacío, vuelve a mostrar todos los productos.
    if (textoBusqueda === "") {

        mostrarProductos(listaProductos);

        return;
    }

    // Busca coincidencias en el título o categoría.
    const productosFiltrados =
        listaProductos.filter(producto =>

            producto.titulo
                .toLowerCase()
                .includes(textoBusqueda)

            ||

            producto.categoria
                .toLowerCase()
                .includes(textoBusqueda)

        );

    mostrarProductos(productosFiltrados);

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