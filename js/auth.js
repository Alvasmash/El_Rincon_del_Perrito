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
        // Recupera la sesión guardada y la convierte desde JSON a un objeto.
        const raw = localStorage.getItem(CLAVE_SESION);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        // Si los datos guardados no son válidos, se considera que no hay sesión.
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

    // Guarda los datos básicos de la sesión en LocalStorage.
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

function cerrarSesionUsuario() {
    // Elimina la sesión actual y recarga la página.
    localStorage.removeItem(CLAVE_SESION);
    window.location.reload();
}

function verificarAccesoAdmin(permitirVendedor = false) {
    const sesion = obtenerSesionActual();

    // Si no existe una sesión, redirige al inicio de sesión.
    if (!sesion) {
        window.location.href = "../html/login.html?mensaje=requiere_inicio";
        return false;
    }

    // El administrador tiene acceso completo al panel.
    if (sesion.rol === "Administrador") {
        return true;
    }

    // Permite el acceso al vendedor solo cuando la página lo autoriza.
    if (permitirVendedor && sesion.rol === "Vendedor") {
        return true;
    }

    // Bloquea cualquier otro rol y vuelve a la tienda principal.
    alert("Acceso no autorizado para su perfil (" + sesion.rol + ").");
    window.location.href = "../html/index.html";
    return false;
}