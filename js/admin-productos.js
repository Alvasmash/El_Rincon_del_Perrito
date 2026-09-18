/* ==========================================================
   admin-productos.js — Listado y gestión de productos en Admin (Figura 12)
   - Muestra tabla con datos de productos
   - Alerta visual de stock crítico cuando stock <= stockCritico
   - Acciones Editar y Eliminar
   - Control de permisos de roles (Vendedor puede visualizar y ver detalle)
   ========================================================== */

function inicializarAdminProductos() {
    const tablaBody = document.getElementById("tabla-productos-body");
    if (!tablaBody) return;

    const sesion = obtenerSesionActual();
    const esSoloVendedor = sesion && sesion.rol === "Vendedor";

    // Si es solo vendedor, ocultar botón "Nuevo Producto"
    const btnNuevo = document.getElementById("btn-nuevo-producto");
    if (btnNuevo && esSoloVendedor) {
        btnNuevo.style.display = "none";
    }

    function renderizarTabla(filtroTexto = "", filtroCat = "") {
        let productos = obtenerProductos();

        if (filtroCat) {
            productos = productos.filter(p => p.categoria === filtroCat);
        }

        if (filtroTexto) {
            const query = filtroTexto.toLowerCase();
            productos = productos.filter(p =>
                p.nombre.toLowerCase().includes(query) ||
                (p.codigo && p.codigo.toLowerCase().includes(query))
            );
        }

        if (productos.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 24px;">No se encontraron productos.</td></tr>';
            return;
        }

        tablaBody.innerHTML = productos.map(p => {
            const esCritico = p.stockCritico && p.stock <= p.stockCritico;
            return `
                <tr>
                    <td><strong>${p.codigo || 'N/A'}</strong></td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="../Imagenes/${p.imagen}" style="width: 40px; height: 40px; object-fit: contain; background: #FFF; border-radius: 4px; padding: 2px;">
                            <span>${p.nombre}</span>
                        </div>
                    </td>
                    <td><span class="badge badge-info">${CATEGORIAS[p.categoria] || p.categoria}</span></td>
                    <td><strong>${formatearPrecio(p.precio)}</strong></td>
                    <td>
                        ${p.stock}
                        ${esCritico ? '<span class="alerta-critica-badge">⚠️ Stock Crítico</span>' : ''}
                    </td>
                    <td>${p.stockCritico !== undefined && p.stockCritico !== null ? p.stockCritico : '-'}</td>
                    <td>
                        <div class="tabla-acciones">
                            ${!esSoloVendedor ? `
                                <a href="producto-form.html?id=${encodeURIComponent(p.id)}" class="btn-accion btn-accion-editar">Editar</a>
                                <button type="button" class="btn-accion btn-accion-eliminar" onclick="confirmarEliminarProducto('${p.id}')">Eliminar</button>
                            ` : `
                                <a href="../html/detalle-producto.html?id=${encodeURIComponent(p.id)}" class="btn-accion btn-accion-editar" target="_blank">Ver Detalle</a>
                            `}
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    const inputBuscar = document.getElementById("filtro-buscar");
    const selectCat = document.getElementById("filtro-categoria");

    if (inputBuscar) {
        inputBuscar.addEventListener("input", () => {
            renderizarTabla(inputBuscar.value, selectCat ? selectCat.value : "");
        });
    }

    if (selectCat) {
        selectCat.addEventListener("change", () => {
            renderizarTabla(inputBuscar ? inputBuscar.value : "", selectCat.value);
        });
    }

    renderizarTabla();
}

function confirmarEliminarProducto(id) {
    const prod = buscarProductoPorId(id);
    if (!prod) return;
    if (confirm(`¿Está seguro de eliminar el producto "${prod.nombre}" (${prod.codigo})?`)) {
        eliminarProducto(id);
        mostrarToast("Producto eliminado con éxito.", "info");
        inicializarAdminProductos();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (verificarAccesoAdmin(true)) {
        inicializarAdminProductos();
    }
});
