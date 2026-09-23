/* ==========================================================
   login.js — Formulario de Inicio de Sesión con validaciones en tiempo real
   Requisitos del PDF:
   - Correo: Requerido, Máx: 100 caracteres, solo @duoc.cl, @profesor.duoc.cl, @gmail.com
   - Contraseña: Requerido, entre 4 a 10 caracteres
   - Redirección por Rol (Administrador / Vendedor -> Admin, Cliente -> Tienda)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");
    if (!form) return;

    const inputCorreo = document.getElementById("login-correo");
    const inputClave = document.getElementById("login-clave");
    const errCorreo = document.getElementById("error-login-correo");
    const errClave = document.getElementById("error-login-clave");

    // Valida que el correo tenga un formato y dominio permitido.
    function validarCorreo() {
        const res = validarCorreoPermitido(inputCorreo.value, true);

        if (!res.valido) {
            mostrarErrorCampo(inputCorreo, errCorreo, res.mensaje);
            return false;
        } else {
            limpiarErrorCampo(inputCorreo, errCorreo);
            return true;
        }
    }

    // Comprueba que la contraseña exista y tenga una longitud válida.
    function validarClave() {
        const val = inputClave.value;

        if (!val) {
            mostrarErrorCampo(inputClave, errClave, "La contraseña es requerida.");
            return false;
        }

        if (val.length < 4 || val.length > 20) {
            mostrarErrorCampo(inputClave, errClave, "La contraseña debe tener entre 4 y 20 caracteres.");
            return false;
        }

        limpiarErrorCampo(inputClave, errClave);
        return true;
    }

    // Ejecuta las validaciones mientras el usuario escribe o sale de cada campo.
    inputCorreo.addEventListener("input", validarCorreo);
    inputCorreo.addEventListener("blur", validarCorreo);

    inputClave.addEventListener("input", validarClave);
    inputClave.addEventListener("blur", validarClave);

    // Controla el envío del formulario de inicio de sesión.
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const corrOk = validarCorreo();
        const claveOk = validarClave();

        if (!corrOk || !claveOk) {
            mostrarToast("Por favor complete correctamente los campos.", "error");
            return;
        }

        const correo = inputCorreo.value.trim().toLowerCase();
        const clave = inputClave.value;

        // Busca al usuario registrado usando su correo.
        const usuario = buscarUsuarioPorCorreo(correo);

        // Comprueba que el correo exista y que la contraseña coincida.
        if (!usuario || usuario.clave !== clave) {
            mostrarErrorCampo(inputClave, errClave, "Correo o contraseña incorrectos.");
            mostrarToast("Credenciales incorrectas.", "error");
            return;
        }

        // Guarda la sesión del usuario y muestra un mensaje de bienvenida.
        iniciarSesionUsuario(usuario);
        mostrarToast(`¡Bienvenido(a) ${usuario.nombre}!`, "exito");

        // Redirige al usuario según el rol que tenga registrado.
        setTimeout(() => {
            if (usuario.rol === "Administrador" || usuario.rol === "Vendedor") {
                window.location.href = "../admin/index.html";
            } else {
                window.location.href = "index.html";
            }
        }, 800);
    });
});