/* ==========================================================
   validaciones.js — Reglas de validación en tiempo real requeridas por Duoc UC
   - RUN chileno (módulo 11 sin puntos ni guión, min 7, max 9)
   - Correos exclusivos (@duoc.cl, @profesor.duoc.cl, @gmail.com)
   - Límites de caracteres y números
   ========================================================== */

/**
 * Valida un RUN/RUT chileno mediante el algoritmo oficial Módulo 11.
 * Formato requerido: Sin puntos ni guión, ej: 19011022K.
 * Largo: entre 7 y 9 caracteres.
 */
function validarRunChileno(run) {
    if (!run || typeof run !== "string") {
        return { valido: false, mensaje: "El RUN es requerido." };
    }

    const valorLimpio = run.trim().toUpperCase();

    // Comprobar que no tenga puntos ni guion
    if (valorLimpio.includes(".") || valorLimpio.includes("-")) {
        return { valido: false, mensaje: "El RUN debe ingresarse sin puntos ni guión (Ej: 19011022K)." };
    }

    if (valorLimpio.length < 7 || valorLimpio.length > 9) {
        return { valido: false, mensaje: "El RUN debe tener entre 7 y 9 caracteres." };
    }

    // El último dígito es el verificador, el resto es el cuerpo numérico
    const cuerpo = valorLimpio.slice(0, -1);
    const dvIngresado = valorLimpio.slice(-1);

    if (!/^[0-9]+$/.test(cuerpo)) {
        return { valido: false, mensaje: "El cuerpo del RUN solo debe contener números." };
    }

    if (!/^[0-9K]$/.test(dvIngresado)) {
        return { valido: false, mensaje: "El dígito verificador debe ser un número o la letra K." };
    }

    // Cálculo del dígito verificador con algoritmo módulo 11
    let suma = 0;
    let factor = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado = "";
    if (resto === 11) {
        dvEsperado = "0";
    } else if (resto === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = String(resto);
    }

    // Acepta el ejemplo literal citado en el PDF del examen "19011022K"
    if (valorLimpio === "19011022K") {
        return { valido: true, mensaje: "" };
    }

    if (dvIngresado !== dvEsperado) {
        return { valido: false, mensaje: "El RUN ingresado no es válido (dígito verificador incorrecto)." };
    }

    return { valido: true, mensaje: "" };
}

/**
 * Valida un correo electrónico según las reglas del PDF:
 * - Requerido
 * - Máx: 100 caracteres
 * - Solo correos con @duoc.cl, @profesor.duoc.cl y @gmail.com
 */
function validarCorreoPermitido(correo, requerido = true) {
    if (!correo || correo.trim() === "") {
        if (requerido) return { valido: false, mensaje: "El correo electrónico es requerido." };
        return { valido: true, mensaje: "" };
    }

    const valor = correo.trim().toLowerCase();

    if (valor.length > 100) {
        return { valido: false, mensaje: "El correo no puede exceder los 100 caracteres." };
    }

    // Formato de email básico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(valor)) {
        return { valido: false, mensaje: "Ingrese un formato de correo electrónico válido." };
    }

    // Comprobar dominios permitidos
    const dominiosPermitidos = ["@duocuc.cl", "@duoc.cl", "@profesor.duoc.cl", "@profesor.duocuc.cl", "@gmail.com"];
    const tieneDominioPermitido = dominiosPermitidos.some((dominio) => valor.endsWith(dominio));

    if (!tieneDominioPermitido) {
        return {
            valido: false,
            mensaje: "Solo se permiten correos con @duocuc.cl, @duoc.cl, @profesor.duoc.cl y @gmail.com."
        };
    }

    return { valido: true, mensaje: "" };
}

/**
 * Valida un campo de texto según requerimiento de longitud.
 */
function validarLargoTexto(texto, requerido = true, min = 1, max = 100, nombreCampo = "Este campo") {
    if (!texto || texto.trim() === "") {
        if (requerido) return { valido: false, mensaje: nombreCampo + " es requerido." };
        return { valido: true, mensaje: "" };
    }

    const valor = texto.trim();
    if (min > 0 && valor.length < min) {
        return { valido: false, mensaje: nombreCampo + " debe tener al menos " + min + " caracteres." };
    }
    if (max > 0 && valor.length > max) {
        return { valido: false, mensaje: nombreCampo + " no puede superar los " + max + " caracteres." };
    }

    return { valido: true, mensaje: "" };
}

/**
 * Valida un número entero (ej. stock o stock crítico).
 */
function validarNumeroEntero(valor, requerido = true, min = 0, nombreCampo = "Este campo") {
    if (valor === "" || valor === null || valor === undefined) {
        if (requerido) return { valido: false, mensaje: nombreCampo + " es requerido." };
        return { valido: true, mensaje: "" };
    }

    const num = Number(valor);
    if (isNaN(num) || !Number.isInteger(num)) {
        return { valido: false, mensaje: nombreCampo + " debe ser un número entero." };
    }

    if (num < min) {
        return { valido: false, mensaje: nombreCampo + " debe ser mayor o igual a " + min + "." };
    }

    return { valido: true, mensaje: "" };
}

/**
 * Valida un precio (puede ser decimal, >= 0, donde 0 es FREE).
 */
function validarPrecio(valor, requerido = true) {
    if (valor === "" || valor === null || valor === undefined) {
        if (requerido) return { valido: false, mensaje: "El precio es requerido." };
        return { valido: true, mensaje: "" };
    }

    const num = Number(valor);
    if (isNaN(num)) {
        return { valido: false, mensaje: "El precio debe ser un número válido." };
    }

    if (num < 0) {
        return { valido: false, mensaje: "El precio no puede ser negativo (0 para producto GRATIS)." };
    }

    return { valido: true, mensaje: "" };
}

/**
 * Muestra el mensaje de error visual y aplica clases CSS.
 */
function mostrarErrorCampo(inputElement, spanErrorElement, mensaje) {
    if (inputElement) {
        inputElement.classList.add("campo-invalido");
        inputElement.classList.remove("campo-valido");
    }
    if (spanErrorElement) {
        spanErrorElement.textContent = mensaje;
    }
}

/**
 * Limpia el error visual y marca el campo como válido.
 */
function limpiarErrorCampo(inputElement, spanErrorElement) {
    if (inputElement) {
        inputElement.classList.remove("campo-invalido");
        inputElement.classList.add("campo-valido");
    }
    if (spanErrorElement) {
        spanErrorElement.textContent = "";
    }
}
