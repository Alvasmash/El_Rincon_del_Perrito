/* ==========================================================
   admin-usuarios.js — Listado de Usuarios en Admin (Figura 12)
   - Exclusivo para rol Administrador
   - Muestra RUN, Nombre completo, Correo, Rol, Región/Comuna
   - Acciones Editar y Eliminar
   ========================================================== */

function inicializarAdminUsuarios() {
    const tablaBody = document.getElementById("tabla-usuarios-body");
    if (!tablaBody) return;

    function renderizarTabla(filtroTexto = "") {
        let usuarios = obtenerUsuarios();

        // Filtra los usuarios por nombre, apellidos, RUN o correo.
        if (filtroTexto) {
            const query = filtroTexto.toLowerCase();
            usuarios = usuarios.filter(u =>
                u.nombre.toLowerCase().includes(query) ||
                u.apellidos.toLowerCase().includes(query) ||
                u.run.toLowerCase().includes(query) ||
                u.correo.toLowerCase().includes(query)
            );
        }

        // Muestra un mensaje cuando no existen usuarios que coincidan.
        if (usuarios.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 24px;">No se encontraron usuarios.</td></tr>';
            return;
        }

        // Genera las filas de la tabla con los usuarios encontrados.
        tablaBody.innerHTML = usuarios.map(u => {
            let badgeRol = "badge-info";

            // Cambia el estilo visual según el rol del usuario.
            if (u.rol === "Administrador") badgeRol = "badge-error";
            if (u.rol === "Vendedor") badgeRol = "badge-alerta";

            return `
                <tr>
                    <td><strong>${u.run}</strong></td>
                    <td>${u.nombre} ${u.apellidos}</td>
                    <td>${u.correo}</td>
                    <td><span class="badge ${badgeRol}">${u.rol}</span></td>
                    <td>${u.comuna || 'N/A'}, ${u.region || ''}</td>
                    <td>${u.direccion || 'N/A'}</td>
                    <td>
                        <div class="tabla-acciones">
                            <a href="usuario-form.html?run=${encodeURIComponent(u.run)}" class="btn-accion btn-accion-editar">Editar</a>
                            <button type="button" class="btn-accion btn-accion-eliminar" onclick="confirmarEliminarUsuario('${u.run}')">Eliminar</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    const inputBuscar = document.getElementById("filtro-buscar-usuario");

    if (inputBuscar) {
        // Actualiza la tabla mientras el administrador escribe en el buscador.
        inputBuscar.addEventListener("input", () => {
            renderizarTabla(inputBuscar.value);
        });
    }

    renderizarTabla();
}

function confirmarEliminarUsuario(run) {
    const u = buscarUsuarioPorRun(run);
    if (!u) return;

    const sesion = obtenerSesionActual();

    // Impide que el administrador elimine su propia cuenta.
    if (sesion && sesion.run === u.run) {
        alert("No puede eliminarse a usted mismo.");
        return;
    }

    // Pide confirmación antes de eliminar al usuario.
    if (confirm(`¿Está seguro de eliminar al usuario "${u.nombre} ${u.apellidos}" (${u.run})?`)) {
        eliminarUsuario(run);
        mostrarToast("Usuario eliminado con éxito.", "info");
        inicializarAdminUsuarios();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Comprueba que el usuario tenga rol Administrador.
    if (verificarAccesoAdmin(false)) {
        inicializarAdminUsuarios();
    }
});