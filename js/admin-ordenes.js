/* ==========================================================
   admin-ordenes.js — Listado de Órdenes de Compra (Figura 12)
   Permitido para rol Vendedor y rol Administrador
   ========================================================== */

function inicializarAdminOrdenes() {
    const tablaBody = document.getElementById("tabla-ordenes-body");
    if (!tablaBody) return;

    let ordenes = [];
    try {
        ordenes = JSON.parse(localStorage.getItem("rincon_perrito_ordenes_v1")) || [];
    } catch (e) {
        ordenes = [];
    }

    if (ordenes.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 24px;">Aún no se han generado órdenes de compra.</td></tr>';
        return;
    }

    tablaBody.innerHTML = ordenes.map(ord => {
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

document.addEventListener("DOMContentLoaded", () => {
    if (verificarAccesoAdmin(true)) {
        inicializarAdminOrdenes();
    }
});
