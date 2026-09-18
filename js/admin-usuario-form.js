/* ==========================================================
   admin-usuario-form.js — Formulario Nuevo / Editar Usuario (Figura 13)
   Campos según requerimiento del PDF:
   - RUN: Requerido, validar RUN (módulo 11 sin puntos ni guión, min 7, max 9)
   - Nombre: Requerido, máx 50 caracteres
   - Apellidos: Requerido, máx 100 caracteres
   - Correo: Requerido, máx 100 (@duoc.cl, @profesor.duoc.cl, @gmail.com)
   - Fecha de Nacimiento: Opcional
   - Tipo de Usuario: Select (Administrador, Cliente, Vendedor)
   - Región y Comuna: Selects dependientes con arreglo JS
   - Dirección: Requerido, máx 300 caracteres
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!verificarAccesoAdmin(false)) return;

    const form = document.getElementById("form-usuario-admin");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const runParam = params.get("run");
    const esEdicion = Boolean(runParam);

    const inputRun = document.getElementById("usr-run");
    const inputNombre = document.getElementById("usr-nombre");
    const inputApellidos = document.getElementById("usr-apellidos");
    const inputCorreo = document.getElementById("usr-correo");
    const inputClave = document.getElementById("usr-clave");
    const inputFecha = document.getElementById("usr-fecha");
    const selectRol = document.getElementById("usr-rol");
    const selectRegion = document.getElementById("usr-region");
    const selectComuna = document.getElementById("usr-comuna");
    const inputDireccion = document.getElementById("usr-direccion");
    const inputTelefono = document.getElementById("usr-telefono");

    const errRun = document.getElementById("error-usr-run");
    const errNombre = document.getElementById("error-usr-nombre");
    const errApellidos = document.getElementById("error-usr-apellidos");
    const errCorreo = document.getElementById("error-usr-correo");
    const errClave = document.getElementById("error-usr-clave");
    const errRol = document.getElementById("error-usr-rol");
    const errRegion = document.getElementById("error-usr-region");
    const errComuna = document.getElementById("error-usr-comuna");
    const errDireccion = document.getElementById("error-usr-direccion");

    const tituloPag = document.getElementById("titulo-form-usuario");
    if (tituloPag) {
        tituloPag.textContent = esEdicion ? "Editar Usuario" : "Nuevo Usuario";
    }

    let regInicial = "";
    let comInicial = "";

    if (esEdicion) {
        const u = buscarUsuarioPorRun(runParam);
        if (u) {
            inputRun.value = u.run;
            inputRun.readOnly = true;
            inputNombre.value = u.nombre || "";
            inputApellidos.value = u.apellidos || "";
            inputCorreo.value = u.correo || "";
            inputClave.value = u.clave || "";
            if (inputFecha) inputFecha.value = u.fechaNacimiento || "";
            selectRol.value = u.rol || "Cliente";
            regInicial = u.region || "";
            comInicial = u.comuna || "";
            inputDireccion.value = u.direccion || "";
            if (inputTelefono) inputTelefono.value = u.telefono || "";
        }
    }

    inicializarSelectsRegionComuna("usr-region", "usr-comuna", regInicial, comInicial);

    function validarRun() {
        if (esEdicion) return true;
        const res = validarRunChileno(inputRun.value);
        if (!res.valido) {
            mostrarErrorCampo(inputRun, errRun, res.mensaje);
            return false;
        }
        if (buscarUsuarioPorRun(inputRun.value)) {
            mostrarErrorCampo(inputRun, errRun, "Este RUN ya está registrado.");
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
        const existente = buscarUsuarioPorCorreo(inputCorreo.value);
        if (existente && (!esEdicion || existente.run !== runParam)) {
            mostrarErrorCampo(inputCorreo, errCorreo, "Este correo ya está en uso.");
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
    inputNombre.addEventListener("input", validarNombre);
    inputApellidos.addEventListener("input", validarApellidos);
    inputCorreo.addEventListener("input", validarCorreo);
    inputClave.addEventListener("input", validarClave);
    selectRegion.addEventListener("change", validarRegionYComuna);
    selectComuna.addEventListener("change", validarRegionYComuna);
    inputDireccion.addEventListener("input", validarDireccion);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const v1 = validarRun();
        const v2 = validarNombre();
        const v3 = validarApellidos();
        const v4 = validarCorreo();
        const v5 = validarClave();
        const v6 = validarRegionYComuna();
        const v7 = validarDireccion();

        if (v1 && v2 && v3 && v4 && v5 && v6 && v7) {
            const usuarioGuardar = {
                run: inputRun.value.trim().toUpperCase(),
                nombre: inputNombre.value.trim(),
                apellidos: inputApellidos.value.trim(),
                correo: inputCorreo.value.trim().toLowerCase(),
                clave: inputClave.value,
                rol: selectRol.value,
                region: selectRegion.value,
                comuna: selectComuna.value,
                direccion: inputDireccion.value.trim(),
                telefono: inputTelefono ? inputTelefono.value.trim() : "",
                fechaNacimiento: inputFecha ? inputFecha.value : ""
            };

            guardarOActualizarUsuario(usuarioGuardar);
            alert(esEdicion ? "Usuario actualizado correctamente." : "Usuario creado correctamente.");
            window.location.href = "usuarios.html";
        } else {
            mostrarToast("Por favor revise los errores en el formulario.", "error");
        }
    });
});
