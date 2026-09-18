/* ==========================================================
   registro.js — Registro de Usuario con Selects Dinámicos y Módulo 11
   Requisitos del PDF:
   - RUN: Requerido, validar si está correcto (módulo 11), sin puntos ni guión, min 7, max 9
   - Nombre: Requerido, máx 50 caracteres
   - Apellidos: Requerido, máx 100 caracteres
   - Correo: Requerido, máx 100 caracteres, solo @duoc.cl, @profesor.duoc.cl, @gmail.com
   - Contraseña: Entre 4 y 10 caracteres
   - Región y Comuna: Arreglo JS con cambio dependiente
   - Dirección: Requerido, máx 300 caracteres
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-registro");
    if (!form) return;

    // Inicializar selects dependientes de regiones y comunas
    inicializarSelectsRegionComuna("registro-region", "registro-comuna");

    const inputRun = document.getElementById("registro-run");
    const inputNombre = document.getElementById("registro-nombre");
    const inputApellidos = document.getElementById("registro-apellidos");
    const inputCorreo = document.getElementById("registro-correo");
    const inputClave = document.getElementById("registro-clave");
    const inputClaveConfirm = document.getElementById("registro-clave-confirm");
    const selectRegion = document.getElementById("registro-region");
    const selectComuna = document.getElementById("registro-comuna");
    const inputDireccion = document.getElementById("registro-direccion");

    const errRun = document.getElementById("error-registro-run");
    const errNombre = document.getElementById("error-registro-nombre");
    const errApellidos = document.getElementById("error-registro-apellidos");
    const errCorreo = document.getElementById("error-registro-correo");
    const errClave = document.getElementById("error-registro-clave");
    const errClaveConfirm = document.getElementById("error-registro-clave-confirm");
    const errRegion = document.getElementById("error-registro-region");
    const errComuna = document.getElementById("error-registro-comuna");
    const errDireccion = document.getElementById("error-registro-direccion");

    function validarRun() {
        const res = validarRunChileno(inputRun.value);
        if (!res.valido) {
            mostrarErrorCampo(inputRun, errRun, res.mensaje);
            return false;
        }
        if (buscarUsuarioPorRun(inputRun.value)) {
            mostrarErrorCampo(inputRun, errRun, "Este RUN ya se encuentra registrado.");
            return false;
        }
        limpiarErrorCampo(inputRun, errRun);
        return true;
    }

    function validarNombre() {
        const res = validarLargoTexto(inputNombre.value, true, 2, 50, "El nombre");
        if (!res.valido) {
            mostrarErrorCampo(inputNombre, errNombre, res.mensaje);
            return false;
        }
        limpiarErrorCampo(inputNombre, errNombre);
        return true;
    }

    function validarApellidos() {
        const res = validarLargoTexto(inputApellidos.value, true, 2, 100, "Los apellidos");
        if (!res.valido) {
            mostrarErrorCampo(inputApellidos, errApellidos, res.mensaje);
            return false;
        }
        limpiarErrorCampo(inputApellidos, errApellidos);
        return true;
    }

    function validarCorreo() {
        const res = validarCorreoPermitido(inputCorreo.value, true);
        if (!res.valido) {
            mostrarErrorCampo(inputCorreo, errCorreo, res.mensaje);
            return false;
        }
        if (buscarUsuarioPorCorreo(inputCorreo.value)) {
            mostrarErrorCampo(inputCorreo, errCorreo, "Este correo ya se encuentra registrado.");
            return false;
        }
        limpiarErrorCampo(inputCorreo, errCorreo);
        return true;
    }

    function validarClave() {
        const val = inputClave.value;
        if (!val || val.length < 4 || val.length > 20) {
            mostrarErrorCampo(inputClave, errClave, "La contraseña debe tener entre 4 y 20 caracteres.");
            return false;
        }
        limpiarErrorCampo(inputClave, errClave);
        return true;
    }

    function validarClaveConfirm() {
        if (inputClaveConfirm.value !== inputClave.value) {
            mostrarErrorCampo(inputClaveConfirm, errClaveConfirm, "Las contraseñas no coinciden.");
            return false;
        }
        limpiarErrorCampo(inputClaveConfirm, errClaveConfirm);
        return true;
    }

    function validarRegionYComuna() {
        let ok = true;
        if (!selectRegion.value) {
            mostrarErrorCampo(selectRegion, errRegion, "Seleccione una región.");
            ok = false;
        } else {
            limpiarErrorCampo(selectRegion, errRegion);
        }

        if (!selectComuna.value) {
            mostrarErrorCampo(selectComuna, errComuna, "Seleccione una comuna.");
            ok = false;
        } else {
            limpiarErrorCampo(selectComuna, errComuna);
        }
        return ok;
    }

    function validarDireccion() {
        const res = validarLargoTexto(inputDireccion.value, true, 5, 300, "La dirección");
        if (!res.valido) {
            mostrarErrorCampo(inputDireccion, errDireccion, res.mensaje);
            return false;
        }
        limpiarErrorCampo(inputDireccion, errDireccion);
        return true;
    }

    inputRun.addEventListener("input", validarRun);
    inputRun.addEventListener("blur", validarRun);

    inputNombre.addEventListener("input", validarNombre);
    inputNombre.addEventListener("blur", validarNombre);

    inputApellidos.addEventListener("input", validarApellidos);
    inputApellidos.addEventListener("blur", validarApellidos);

    inputCorreo.addEventListener("input", validarCorreo);
    inputCorreo.addEventListener("blur", validarCorreo);

    inputClave.addEventListener("input", validarClave);
    inputClave.addEventListener("blur", validarClave);

    inputClaveConfirm.addEventListener("input", validarClaveConfirm);
    inputClaveConfirm.addEventListener("blur", validarClaveConfirm);

    selectRegion.addEventListener("change", validarRegionYComuna);
    selectComuna.addEventListener("change", validarRegionYComuna);

    inputDireccion.addEventListener("input", validarDireccion);
    inputDireccion.addEventListener("blur", validarDireccion);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const v1 = validarRun();
        const v2 = validarNombre();
        const v3 = validarApellidos();
        const v4 = validarCorreo();
        const v5 = validarClave();
        const v6 = validarClaveConfirm();
        const v7 = validarRegionYComuna();
        const v8 = validarDireccion();

        if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8) {
            const inputTel = document.getElementById("registro-telefono");
            const inputFecha = document.getElementById("registro-fecha");

            const nuevoUsuario = {
                run: inputRun.value.trim().toUpperCase(),
                nombre: inputNombre.value.trim(),
                apellidos: inputApellidos.value.trim(),
                correo: inputCorreo.value.trim().toLowerCase(),
                clave: inputClave.value,
                rol: "Cliente",
                region: selectRegion.value,
                comuna: selectComuna.value,
                direccion: inputDireccion.value.trim(),
                telefono: inputTel ? inputTel.value.trim() : "",
                fechaNacimiento: inputFecha ? inputFecha.value : ""
            };

            guardarOActualizarUsuario(nuevoUsuario);
            iniciarSesionUsuario(nuevoUsuario);

            alert("¡Registro exitoso! Bienvenido a El Rincón del Perrito.");
            window.location.href = "index.html";
        } else {
            mostrarToast("Por favor corrija los errores marcados en el formulario.", "error");
        }
    });
});
