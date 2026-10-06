# 🎮 GameZone

GameZone es una aplicación web desarrollada como proyecto académico de Frontend I.

El sitio permite visualizar un catálogo de videojuegos, buscar y filtrar productos, utilizar un carrito de compras y enviar un formulario de contacto validado.

El proyecto fue desarrollado utilizando React, JavaScript, CSS, Bootstrap 5 y Vite.

## 🚀 Funcionalidades

- Visualización de catálogo de videojuegos.
- Carga dinámica de videojuegos desde un archivo JSON.
- Generación dinámica de tarjetas de videojuegos.
- Búsqueda de videojuegos por nombre o categoría.
- Filtrado de videojuegos por categoría.
- Eliminación temporal de videojuegos de la lista utilizando el estado de React.
- Restauración del catálogo original desde el archivo JSON.
- Carrito de compras.
- Agregar videojuegos al carrito.
- Eliminar videojuegos del carrito.
- Cálculo automático del total del carrito.
- Persistencia del carrito utilizando LocalStorage.
- Formulario de contacto.
- Validación de nombre, correo electrónico y mensaje.
- Carrusel de videojuegos destacados.
- Diseño responsivo para computadores, tablets y dispositivos móviles.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Bootstrap 5
- Vite
- Git
- GitHub
- GitHub Pages

## 🧩 Componentes principales

La aplicación está dividida en distintos componentes React:

- `Header.jsx`: contiene la barra de navegación, buscador y contador del carrito.
- `Hero.jsx`: contiene el carrusel de videojuegos destacados.
- `Products.jsx`: muestra la lista de videojuegos y permite buscar, filtrar y restaurar el catálogo.
- `ProductoCard.jsx`: representa individualmente cada videojuego.
- `Carrito.jsx`: muestra los productos seleccionados, permite eliminarlos y calcula el total.
- `Contacto.jsx`: contiene el formulario de contacto y sus validaciones.
- `Footer.jsx`: contiene información general y enlaces del sitio.

## ⚛️ Uso de React

El proyecto utiliza componentes, props y estado (`useState`) para manejar dinámicamente la información de la aplicación.

La lista de videojuegos se mantiene en el estado principal de la aplicación.

Los videojuegos pueden eliminarse temporalmente de la lista y la interfaz se actualiza automáticamente.

El catálogo original puede restaurarse cargando nuevamente los datos desde el archivo JSON.

También se utilizan props para comunicar información y funciones entre los componentes.

## 📦 Carga de videojuegos

Los videojuegos son cargados dinámicamente desde un archivo JSON mediante `fetch`.

Cada videojuego contiene información como:

- Nombre.
- Categoría.
- Precio normal.
- Precio de oferta.
- Descripción.
- Imagen.

Luego, React recorre la lista y genera automáticamente las tarjetas de cada videojuego.

## 🔎 Búsqueda y filtrado

La aplicación permite buscar videojuegos utilizando el buscador ubicado en la barra de navegación.

La búsqueda considera:

- Nombre del videojuego.
- Categoría.

Además, existe un selector que permite filtrar los videojuegos específicamente por categoría.

## 🛒 Carrito de compras

Los usuarios pueden agregar videojuegos al carrito.

El carrito permite:

- Visualizar los videojuegos seleccionados.
- Evitar productos duplicados.
- Eliminar productos.
- Calcular automáticamente el valor total.
- Mantener la información almacenada mediante LocalStorage.

## ✉️ Formulario de contacto

El sitio incluye un formulario de contacto con los siguientes campos:

- Nombre.
- Correo electrónico.
- Mensaje.

Antes de procesar el formulario se validan los datos ingresados.

Si algún campo está vacío o el correo no tiene un formato válido, se muestra un mensaje de error.

Cuando todos los datos son correctos, se muestra un mensaje indicando que el formulario fue enviado correctamente.

## 📱 Diseño responsivo

La aplicación utiliza Bootstrap 5 y CSS personalizado para adaptar el contenido a diferentes tamaños de pantalla.

Las tarjetas de videojuegos se organizan de la siguiente manera:

- Teléfonos: 1 tarjeta por fila.
- Tablets: 2 tarjetas por fila.
- Pantallas grandes: 3 tarjetas por fila.

La barra de navegación también se adapta automáticamente a dispositivos móviles mediante el menú colapsable de Bootstrap.

## 📂 Estructura general del proyecto

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Products.jsx
│   ├── ProductoCard.jsx
│   ├── Carrito.jsx
│   ├── Contacto.jsx
│   └── Footer.jsx
│
├── App.jsx
├── main.jsx
└── style.css

public/
│
├── data/
│   └── productos.json
│
└── imagenes/
```

## 💻 Instalación

Para ejecutar el proyecto de forma local, primero se deben instalar las dependencias:

```bash
npm install
```

Luego se inicia el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local donde se encuentra ejecutándose la aplicación.

## 🔨 Compilar el proyecto

Para crear la versión de producción:

```bash
npm run build
```

Los archivos compilados se almacenarán en la carpeta `dist`.

## 🌐 Publicación

El proyecto está preparado para ser publicado mediante GitHub Pages.

Antes de publicar se recomienda verificar que:

- Todas las dependencias estén instaladas.
- El archivo JSON esté incluido.
- Las imágenes estén disponibles.
- La búsqueda funcione correctamente.
- El filtro por categoría funcione.
- El carrito permita agregar y eliminar productos.
- La eliminación y restauración del catálogo funcionen.
- El formulario de contacto valide correctamente los datos.
- No existan errores en la consola.
- El proyecto compile correctamente con `npm run build`.

## 👨‍💻 Autor

Proyecto desarrollado como actividad académica de Frontend I.
