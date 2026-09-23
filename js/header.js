/* ==========================================================
   header.js — Comportamiento común del encabezado y alertas toast
   ========================================================== */

function actualizarContadorHeader() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    try {
        // Recupera el carrito guardado y calcula la cantidad total de productos.
        const carrito = JSON.parse(localStorage.getItem("rincon_perrito_carrito_v1")) || [];
        const total = carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);
        contador.textContent = total;
    } catch (e) {
        // Si los datos del carrito no son válidos, muestra cero.
        contador.textContent = "0";
    }
}

function actualizarSesionHeader() {
    const contenedor = document.getElementById("contenedor-auth-header");
    if (!contenedor) return;

    // Obtiene la sesión actual si la función de autenticación está disponible.
    const sesion = typeof obtenerSesionActual === "function" ? obtenerSesionActual() : null;

    if (sesion) {
        // Define la ruta del panel según la ubicación actual de la página.
        const rutaAdmin = window.location.pathname.includes("/admin/") ? "index.html" : "../admin/index.html";

        contenedor.innerHTML = `
            <span class="usuario-pill">
                🐾 ${sesion.nombre} (${sesion.rol})
                ${sesion.rol !== 'Cliente' ? `<a href="${rutaAdmin}" style="margin-left: 6px; font-weight: 700;">[Panel]</a>` : ''}
                <button type="button" class="btn-cerrar-sesion" id="btn-logout" title="Cerrar sesión">Salir</button>
            </span>
        `;

        const btnLogout = document.getElementById("btn-logout");

        if (btnLogout) {
            // Cierra la sesión cuando el usuario pulsa el botón Salir.
            btnLogout.addEventListener("click", () => {
                cerrarSesionUsuario();
            });
        }
    } else {
        // Ajusta las rutas de inicio de sesión según la carpeta donde está la página.
        const prefix = window.location.pathname.includes("/admin/") ? "../html/" : "";

        contenedor.innerHTML = `
            <a href="${prefix}login.html" class="enlace-destacado">Iniciar sesión</a>
            <a href="${prefix}registro.html" class="enlace-destacado">Registrar usuario</a>
        `;
    }
}

function iniciarMenuHamburguesa() {
    const btnMenu = document.getElementById("boton-hamburguesa");
    const menuNav = document.getElementById("menu-principal");
    if (!btnMenu || !menuNav) return;

    // Abre o cierra el menú al pulsar el botón hamburguesa.
    btnMenu.addEventListener("click", () => {
        menuNav.classList.toggle("abierto");
    });
}

function mostrarToast(mensaje, tipo = "exito") {
    let toast = document.getElementById("aviso-toast");

    if (!toast) {
        // Crea el aviso si todavía no existe en el HTML.
        toast = document.createElement("div");
        toast.id = "aviso-toast";
        toast.className = "aviso-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    toast.className = "aviso-toast visible toast-" + tipo;

    // Oculta automáticamente el aviso después de unos segundos.
    setTimeout(() => {
        toast.classList.remove("visible");
    }, 3800);
}

// Espera a que el HTML termine de cargar antes de iniciar las funciones del encabezado.
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorHeader();
    actualizarSesionHeader();
    iniciarMenuHamburguesa();
});