let figuras = [
    { nombre: "Anakin Skywalker", precio: 20.00 },
    { nombre: "Yoda", precio: 25.00 },
    { nombre: "Luke Skywalker", precio: 22.00 },
    { nombre: "Obi-Wan Kenobi", precio: 30.00 }
];

let carrito = [];

function agregarAlCarrito(nombre, precio) {
    let figura = { nombre, precio };
    carrito.push(figura);
    mostrarCarrito();
    mostrarNotificacion(`${nombre} añadido al carrito`);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    let carritoContenido = document.getElementById("carrito-contenido");
    carritoContenido.innerHTML = "";

    carrito.forEach((figura, index) => {
        let figuraElement = document.createElement("div");
        figuraElement.className = "carrito-figura";

        figuraElement.innerHTML = `
            <p>${figura.nombre} - $${figura.precio.toFixed(2)}</p>
            <button class="btn-eliminar-carrito" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;

        carritoContenido.appendChild(figuraElement);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    mostrarNotificacion("Figura eliminada del carrito");
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function abrirCarrito() {
    let carritoContainer = document.getElementById("carrito");
    carritoContainer.style.display = "flex";
}

function cerrarCarrito() {
    let carritoContainer = document.getElementById("carrito");
    carritoContainer.style.display = "none";
}

function realizarCompra() {
    carrito = [];
    mostrarCarrito();
    cerrarCarrito();
    localStorage.removeItem('carrito');
}

function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
    }).showToast();
}

document.addEventListener("DOMContentLoaded", () => {
    let figurasContainer = document.getElementById("figuras-container");
    figuras.forEach(figura => {
        let figuraElement = document.createElement("div");
        figuraElement.className = "figura-contenedor";

        figuraElement.innerHTML = `
            <img src="img/${figura.nombre.toLowerCase().replace(" ", "_")}.jpg" alt="${figura.nombre}">
            <h3>${figura.nombre}</h3>
            <p>Figura de acción de ${figura.nombre}.</p>
            <p>Precio: $${figura.precio.toFixed(2)}</p>
            <button class="btn-añadir-carrito" onclick="agregarAlCarrito('${figura.nombre}', ${figura.precio})">Añadir al Carrito</button>
        `;

        figurasContainer.appendChild(figuraElement);
    });

    let btnMostrarCarrito = document.getElementById("btnMostrarCarrito");
    btnMostrarCarrito.addEventListener("click", abrirCarrito);

    let btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
    btnCerrarCarrito.addEventListener("click", cerrarCarrito);

    // Cargar carrito desde localStorage al cargar la página
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
});
