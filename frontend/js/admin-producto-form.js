/* ==========================================================
   admin-producto-form.js — Formulario Nuevo / Editar Producto (Figura 13)
   Validaciones del PDF:
   - Código producto: Requerido, texto, Mín: 3, Máx: no tiene límite
   - Nombre: Requerido, Máx: 100
   - Descripción: Opcional, Máx: 500
   - Precio: Requerido, Mín: 0 (0 = FREE), números decimales permitidos
   - Stock: Requerido, Mín: 0, números enteros
   - Stock Crítico: Opcional, Mín: 0, números enteros
   - Categorías: Requerido, select con categorías
   - Imagen: Opcional
   ========================================================== */

// Espera a que el HTML termine de cargar antes de ejecutar el formulario.
document.addEventListener("DOMContentLoaded", () => {
    if (!verificarAccesoAdmin(false)) return;

    const form = document.getElementById("form-producto");
    if (!form) return;

    // Obtiene el ID desde la URL para saber si se está editando un producto.
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get("id");
    const esEdicion = Boolean(prodId);

    // Referencias a los campos del formulario.
    const inputCodigo = document.getElementById("prod-codigo");
    const inputNombre = document.getElementById("prod-nombre");
    const inputDesc = document.getElementById("prod-descripcion");
    const inputPrecio = document.getElementById("prod-precio");
    const inputStock = document.getElementById("prod-stock");
    const inputStockCritico = document.getElementById("prod-stock-critico");
    const selectCategoria = document.getElementById("prod-categoria");
    const selectImagen = document.getElementById("prod-imagen");

    // Referencias a los espacios donde se muestran los mensajes de error.
    const errCodigo = document.getElementById("error-prod-codigo");
    const errNombre = document.getElementById("error-prod-nombre");
    const errDesc = document.getElementById("error-prod-descripcion");
    const errPrecio = document.getElementById("error-prod-precio");
    const errStock = document.getElementById("error-prod-stock");
    const errStockCritico = document.getElementById("error-prod-stock-critico");
    const errCategoria = document.getElementById("error-prod-categoria");

    const tituloPag = document.getElementById("titulo-form-producto");

    // Cambia el título según si se crea o edita un producto.
    if (tituloPag) {
        tituloPag.textContent = esEdicion ? "Editar Producto" : "Nuevo Producto";
    }

    // Si es edición, busca el producto y carga sus datos en el formulario.
    if (esEdicion) {
        const prod = buscarProductoPorId(prodId);

        if (prod) {
            inputCodigo.value = prod.codigo || "";
            inputNombre.value = prod.nombre || "";
            inputDesc.value = prod.descripcion || "";
            inputPrecio.value = prod.precio;
            inputStock.value = prod.stock;
            inputStockCritico.value = prod.stockCritico !== undefined ? prod.stockCritico : "";
            selectCategoria.value = prod.categoria || "";

            if (selectImagen) selectImagen.value = prod.imagen || "";
        }
    }

    // Valida el código del producto mientras el usuario escribe.
    function validarCodigo() {
        const val = inputCodigo.value.trim();

        if (!val || val.length < 3) {
            mostrarErrorCampo(inputCodigo, errCodigo, "El código es requerido y debe tener al menos 3 caracteres.");
            return false;
        }

        // Comprueba que el código no pertenezca a otro producto.
        const existente = buscarProductoPorCodigo(val);

        if (existente && (!esEdicion || existente.id !== prodId)) {
            mostrarErrorCampo(inputCodigo, errCodigo, "Ya existe un producto con este código.");
            return false;
        }

        limpiarErrorCampo(inputCodigo, errCodigo);
        return true;
    }

    function validarNombre() {
        const res = validarLargoTexto(inputNombre.value, true, 2, 100, "El nombre del producto");

        if (!res.valido) {
            mostrarErrorCampo(inputNombre, errNombre, res.mensaje);
            return false;
        }

        limpiarErrorCampo(inputNombre, errNombre);
        return true;
    }

    function validarDesc() {
        const res = validarLargoTexto(inputDesc.value, false, 0, 500, "La descripción");

        if (!res.valido) {
            mostrarErrorCampo(inputDesc, errDesc, res.mensaje);
            return false;
        }

        limpiarErrorCampo(inputDesc, errDesc);
        return true;
    }

    function validarPrecioInput() {
        const res = validarPrecio(inputPrecio.value, true);

        if (!res.valido) {
            mostrarErrorCampo(inputPrecio, errPrecio, res.mensaje);
            return false;
        }

        limpiarErrorCampo(inputPrecio, errPrecio);
        return true;
    }

    function validarStockInput() {
        const res = validarNumeroEntero(inputStock.value, true, 0, "El stock");

        if (!res.valido) {
            mostrarErrorCampo(inputStock, errStock, res.mensaje);
            return false;
        }

        limpiarErrorCampo(inputStock, errStock);
        return true;
    }

    function validarStockCriticoInput() {
        const res = validarNumeroEntero(inputStockCritico.value, false, 0, "El stock crítico");

        if (!res.valido) {
            mostrarErrorCampo(inputStockCritico, errStockCritico, res.mensaje);
            return false;
        }

        limpiarErrorCampo(inputStockCritico, errStockCritico);
        return true;
    }

    function validarCategoria() {
        if (!selectCategoria.value) {
            mostrarErrorCampo(selectCategoria, errCategoria, "Debe seleccionar una categoría.");
            return false;
        }

        limpiarErrorCampo(selectCategoria, errCategoria);
        return true;
    }

    // Ejecuta las validaciones mientras se escribe o al salir de cada campo.
    inputCodigo.addEventListener("input", validarCodigo);
    inputCodigo.addEventListener("blur", validarCodigo);

    inputNombre.addEventListener("input", validarNombre);
    inputNombre.addEventListener("blur", validarNombre);

    inputDesc.addEventListener("input", validarDesc);
    inputDesc.addEventListener("blur", validarDesc);

    inputPrecio.addEventListener("input", validarPrecioInput);
    inputPrecio.addEventListener("blur", validarPrecioInput);

    inputStock.addEventListener("input", validarStockInput);
    inputStock.addEventListener("blur", validarStockInput);

    inputStockCritico.addEventListener("input", validarStockCriticoInput);
    inputStockCritico.addEventListener("blur", validarStockCriticoInput);

    selectCategoria.addEventListener("change", validarCategoria);

    // Controla el envío final del formulario.
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Ejecuta todas las validaciones antes de guardar.
        const v1 = validarCodigo();
        const v2 = validarNombre();
        const v3 = validarDesc();
        const v4 = validarPrecioInput();
        const v5 = validarStockInput();
        const v6 = validarStockCriticoInput();
        const v7 = validarCategoria();

        if (v1 && v2 && v3 && v4 && v5 && v6 && v7) {
            // Mantiene el ID existente al editar o genera uno nuevo al crear.
            const nuevoId = esEdicion ? prodId : ("prod-" + Date.now());

            const productoGuardar = {
                id: nuevoId,
                codigo: inputCodigo.value.trim().toUpperCase(),
                nombre: inputNombre.value.trim(),
                descripcion: inputDesc.value.trim(),
                precio: parseFloat(inputPrecio.value),
                stock: parseInt(inputStock.value, 10),
                stockCritico: inputStockCritico.value !== "" ? parseInt(inputStockCritico.value, 10) : 0,
                categoria: selectCategoria.value,
                material: "Estándar de calidad",
                imagen: selectImagen && selectImagen.value ? selectImagen.value : "cama.png"
            };

            // Guarda el producto y muestra un mensaje según la operación realizada.
            guardarOActualizarProducto(productoGuardar);
            alert(esEdicion ? "Producto actualizado con éxito." : "Producto creado con éxito.");
            window.location.href = "productos.html";
        } else {
            // Informa al usuario si existe algún campo que debe corregir.
            mostrarToast("Por favor corrija los campos requeridos.", "error");
        }
    });
});