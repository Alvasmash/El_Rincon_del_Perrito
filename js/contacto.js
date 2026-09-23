/* ==========================================================
   contacto.js — Formulario de contacto con validaciones en tiempo real
   Requisitos del PDF:
   - Nombre: Requerido, Máx: 100 caracteres
   - Correo: Máx: 100 caracteres, solo @duoc.cl, @profesor.duoc.cl y @gmail.com
   - Comentario: Requerido, Máx: 500 caracteres
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contacto");
    if (!form) return;

    const inputNombre = document.getElementById("contacto-nombre");
    const inputCorreo = document.getElementById("contacto-correo");
    const inputComentario = document.getElementById("contacto-comentario");
    const contadorChars = document.getElementById("contador-comentario");

    const errNombre = document.getElementById("error-contacto-nombre");
    const errCorreo = document.getElementById("error-contacto-correo");
    const errComentario = document.getElementById("error-contacto-comentario");

    // Valida el nombre mientras el usuario escribe o sale del campo.
    function validarCampoNombre() {
        const res = validarLargoTexto(inputNombre.value, true, 2, 100, "El nombre completo");

        if (!res.valido) {
            mostrarErrorCampo(inputNombre, errNombre, res.mensaje);
            return false;
        } else {
            limpiarErrorCampo(inputNombre, errNombre);
            return true;
        }
    }

    // Valida el correo según los dominios permitidos.
    function validarCampoCorreo() {
        const res = validarCorreoPermitido(inputCorreo.value, true);

        if (!res.valido) {
            mostrarErrorCampo(inputCorreo, errCorreo, res.mensaje);
            return false;
        } else {
            limpiarErrorCampo(inputCorreo, errCorreo);
            return true;
        }
    }

    // Valida el comentario y actualiza el contador de caracteres.
    function validarCampoComentario() {
        const largo = inputComentario.value.length;

        if (contadorChars) {
            contadorChars.textContent = `${largo}/500 caracteres`;
            contadorChars.style.color = largo > 500 ? "var(--error)" : "var(--tinta-clara)";
        }

        const res = validarLargoTexto(inputComentario.value, true, 10, 500, "El comentario");

        if (!res.valido) {
            mostrarErrorCampo(inputComentario, errComentario, res.mensaje);
            return false;
        } else {
            limpiarErrorCampo(inputComentario, errComentario);
            return true;
        }
    }

    inputNombre.addEventListener("input", validarCampoNombre);
    inputNombre.addEventListener("blur", validarCampoNombre);

    inputCorreo.addEventListener("input", validarCampoCorreo);
    inputCorreo.addEventListener("blur", validarCampoCorreo);

    inputComentario.addEventListener("input", validarCampoComentario);
    inputComentario.addEventListener("blur", validarCampoComentario);

    // Controla el envío y comprueba todos los campos antes de guardar.
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const esNomValido = validarCampoNombre();
        const esCorrValido = validarCampoCorreo();
        const esComValido = validarCampoComentario();

        if (esNomValido && esCorrValido && esComValido) {
            const nuevoMensaje = {
                nombre: inputNombre.value.trim(),
                correo: inputCorreo.value.trim(),
                comentario: inputComentario.value.trim(),
                fecha: new Date().toLocaleString()
            };

            // Recupera los mensajes anteriores y agrega el nuevo al final.
            const guardados = JSON.parse(localStorage.getItem("rincon_perrito_contacto_v1")) || [];
            guardados.push(nuevoMensaje);
            localStorage.setItem("rincon_perrito_contacto_v1", JSON.stringify(guardados));

            mostrarToast("¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.", "exito");
            form.reset();

            // Elimina las clases visuales de validación después de enviar.
            document.querySelectorAll(".form-control").forEach(inp => inp.classList.remove("campo-valido"));

            if (contadorChars) contadorChars.textContent = "0/500 caracteres";
        } else {
            mostrarToast("Por favor corrija los campos con errores.", "error");
        }
    });
});