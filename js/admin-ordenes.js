/* ==========================================================
   admin-ordenes.js — Listado de Órdenes de Compra (Figura 12)
   Permitido para rol Vendedor y rol Administrador
   ========================================================== */

function inicializarAdminOrdenes() {
    const tablaBody = document.getElementById("tabla-ordenes-body");
    if (!tablaBody) return;

    let ordenes = [];

    try {
        // Recupera las órdenes guardadas en LocalStorage.
        ordenes = JSON.parse(localStorage.getItem("rincon_perrito_ordenes_v1")) || [];
    } catch (e) {
        // Si ocurre un error al leer los datos, se usa un arreglo vacío.
        ordenes = [];
    }

    // Muestra un mensaje si todavía no existen órdenes.
    if (ordenes.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 24px;">Aún no se han generado órdenes de compra.</td></tr>';
        return;
    }

    // Genera las filas de la tabla a partir de las órdenes guardadas.
    tablaBody.innerHTML = ordenes.map(ord => {
        // Suma la cantidad de productos incluidos en la orden.
        const cantProductos = ord.items.reduce((s, it) => s + (it.cantidad || 1), 0);

        return `
            <tr>
                <td><strong>${ord.id}</strong></td>
                <td>${ord.fecha}</td>
                <td>
                    <div><strong>${ord.cliente}</strong></div>
                    <small style="color: var(--tinta-clara);">${ord.correo}</small>
                </td>
                <td>${cantProductos} producto(s)</td>
                <td><strong>${formatearPrecio(ord.total)}</strong></td>
                <td><span class="badge badge-exito">${ord.estado || 'Completado'}</span></td>
            </tr>
        `;
    }).join("");
}

// Espera a que el HTML termine de cargar antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", () => {
    // Comprueba que el usuario tenga permisos para acceder a las órdenes.
    if (verificarAccesoAdmin(true)) {
        inicializarAdminOrdenes();
    }
});