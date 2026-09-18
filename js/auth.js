/* ==========================================================
   auth.js — Control de sesión de usuario y roles
   Roles:
   - Administrador: acceso total al sistema
   - Vendedor: productos y órdenes únicamente
   - Cliente: solo acceso a la tienda
   ========================================================== */

const CLAVE_SESION = "rincon_perrito_sesion_activa";

function obtenerSesionActual() {
    try {
        const raw = localStorage.getItem(CLAVE_SESION);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function iniciarSesionUsuario(usuario) {
    const sesion = {
        run: usuario.run,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol
    };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

function cerrarSesionUsuario() {
    localStorage.removeItem(CLAVE_SESION);
    window.location.reload();
}

function verificarAccesoAdmin(permitirVendedor = false) {
    const sesion = obtenerSesionActual();
    if (!sesion) {
        window.location.href = "../html/login.html?mensaje=requiere_inicio";
        return false;
    }

    if (sesion.rol === "Administrador") {
        return true;
    }

    if (permitirVendedor && sesion.rol === "Vendedor") {
        return true;
    }

    alert("Acceso no autorizado para su perfil (" + sesion.rol + ").");
    window.location.href = "../html/index.html";
    return false;
}
