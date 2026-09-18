/* ==========================================================
   carrito.js — Gestión completa del carrito de compras (Figura 15)
   - Guardado en LOCALSTORAGE (rincon_perrito_carrito_v1)
   - Control de cantidades y límites de stock
   - Aplicación de cupón de descuento
   - Checkout con generación de orden de compra
   ========================================================== */

const CLAVE_CARRITO = "rincon_perrito_carrito_v1";
let cuponAplicado = null; // { codigo: 'PERRITO10', descuentoPorc: 0.10 }

function obtenerCarrito() {
    try {
        const raw = localStorage.getItem(CLAVE_CARRITO);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function guardarCarrito(items) {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
        if (typeof actualizarContadorHeader === "function") {
            actualizarContadorHeader();
        }
        return true;
    } catch (e) {
        return false;
    }
}

function agregarAlCarrito(productoId, cantidad = 1) {
    const producto = buscarProductoPorId(productoId);
    if (!producto) {
        mostrarToast("Producto no encontrado.", "error");
        return;
    }

    if (producto.stock <= 0) {
        mostrarToast(producto.nombre + " se encuentra agotado.", "error");
        return;
    }

    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.id === productoId);
    const cantActual = itemExistente ? itemExistente.cantidad : 0;
    const nuevaCant = cantActual + cantidad;

    if (nuevaCant > producto.stock) {
        mostrarToast(`Solo quedan ${producto.stock} unidades disponibles de ${producto.nombre}.`, "alerta");
        return;
    }

    if (itemExistente) {
        itemExistente.cantidad = nuevaCant;
    } else {
        carrito.push({
            id: producto.id,
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    mostrarToast(`¡${producto.nombre} agregado al carrito!`, "exito");
}

function modificarCantidad(productoId, delta) {
    let carrito = obtenerCarrito();
    const item = carrito.find(it => it.id === productoId);
    if (!item) return;

    const producto = buscarProductoPorId(productoId);
    const stockMax = producto ? producto.stock : 99;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }

    if (item.cantidad > stockMax) {
        item.cantidad = stockMax;
        mostrarToast(`No hay más de ${stockMax} unidades disponibles.`, "alerta");
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

function eliminarDelCarrito(productoId) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(it => it.id !== productoId);
    guardarCarrito(carrito);
    renderizarCarrito();
    mostrarToast("Producto eliminado del carrito.", "info");
}

function aplicarCupon() {
    const input = document.getElementById("input-cupon");
    if (!input) return;

    const codigo = input.value.trim().toUpperCase();
    if (codigo === "PERRITO10") {
        cuponAplicado = { codigo: "PERRITO10", descuentoPorc: 0.10 };
        mostrarToast("¡Cupón del 10% de descuento aplicado!", "exito");
        renderizarCarrito();
    } else {
        mostrarToast("Cupón inválido. Prueba con PERRITO10", "error");
    }
}

function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito-dinamico");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <svg viewBox="0 0 24 24"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM1 2v2h2l3.6 7.6-1.4 2.4A2 2 0 0 0 7 17h12v-2H7.4l1.1-2h7.5a2 2 0 0 0 1.75-1.03l3.6-6.5A1 1 0 0 0 20.5 4H5.2l-.94-2H1Z"/></svg>
                <h2>Tu carrito está vacío</h2>
                <p>Aún no has agregado ningún producto para consentir a tu perrito.</p>
                <a href="productos.html" class="boton">Ver Catálogo de Productos</a>
            </div>
        `;
        return;
    }

    let subtotal = 0;
    const itemsHtml = carrito.map(item => {
        const totalFila = item.precio * item.cantidad;
        subtotal += totalFila;
        return `
            <div class="item-carrito">
                <img src="../Imagenes/${item.imagen}" alt="${item.nombre}">
                <div class="info">
                    <h3>${item.nombre}</h3>
                    <p>Código: ${item.codigo || item.id}</p>
                </div>
                <div class="precio-unitario">${formatearPrecio(item.precio)}</div>
                <div class="control-cantidades">
                    <button type="button" onclick="modificarCantidad('${item.id}', -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button type="button" onclick="modificarCantidad('${item.id}', 1)">+</button>
                </div>
                <button type="button" class="btn-eliminar" onclick="eliminarDelCarrito('${item.id}')" title="Quitar">×</button>
            </div>
        `;
    }).join("");

    let descuento = 0;
    if (cuponAplicado) {
        descuento = Math.round(subtotal * cuponAplicado.descuentoPorc);
    }
    const totalFinal = Math.max(0, subtotal - descuento);

    contenedor.innerHTML = `
        <div class="lista-carrito">
            ${itemsHtml}
        </div>

        <div class="resumen-compra">
            <h2>Resumen del Pedido</h2>
            <div class="resumen-fila">
                <span>Subtotal</span>
                <span>${formatearPrecio(subtotal)}</span>
            </div>
            ${cuponAplicado ? `
                <div class="resumen-fila" style="color: var(--exito); font-weight: 600;">
                    <span>Descuento (${cuponAplicado.codigo})</span>
                    <span>-${formatearPrecio(descuento)}</span>
                </div>
            ` : ''}
            <div class="resumen-fila total">
                <span>TOTAL</span>
                <span>${formatearPrecio(totalFinal)}</span>
            </div>

            <div class="seccion-cupon">
                <label for="input-cupon">¿Tienes un cupón de descuento?</label>
                <div class="input-cupon-grupo">
                    <input type="text" id="input-cupon" placeholder="Ej: PERRITO10" value="${cuponAplicado ? cuponAplicado.codigo : ''}">
                    <button type="button" onclick="aplicarCupon()">Aplicar</button>
                </div>
                <span style="font-size: 0.75rem; color: var(--tinta-clara); display: block; margin-top: 4px;">Usa cupón: <strong>PERRITO10</strong></span>
            </div>

            <button type="button" class="boton btn-pagar" onclick="procesarPagoCarrito(${totalFinal})">PAGAR</button>
        </div>
    `;
}

function procesarPagoCarrito(totalMonto) {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    const sesion = typeof obtenerSesionActual === "function" ? obtenerSesionActual() : null;
    const ordenId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const fecha = new Date().toISOString().split("T")[0];

    const nuevaOrden = {
        id: ordenId,
        fecha: fecha,
        cliente: sesion ? (sesion.nombre + " " + sesion.apellidos) : "Cliente Invitado",
        correo: sesion ? sesion.correo : "cliente@gmail.com",
        items: carrito,
        total: totalMonto,
        estado: "Completado"
    };

    // Descontar stock de productos
    const productos = obtenerProductos();
    carrito.forEach(item => {
        const prod = productos.find(p => p.id === item.id);
        if (prod) {
            prod.stock = Math.max(0, prod.stock - item.cantidad);
        }
    });
    guardarProductos(productos);

    // Guardar orden
    try {
        const ordenesPrevias = JSON.parse(localStorage.getItem("rincon_perrito_ordenes_v1")) || [];
        ordenesPrevias.unshift(nuevaOrden);
        localStorage.setItem("rincon_perrito_ordenes_v1", JSON.stringify(ordenesPrevias));
    } catch (e) {
        console.error("Error al registrar la orden:", e);
    }

    // Vaciar carrito
    localStorage.removeItem(CLAVE_CARRITO);
    cuponAplicado = null;
    if (typeof actualizarContadorHeader === "function") {
        actualizarContadorHeader();
    }

    alert(`¡Pago realizado con éxito!\n\nOrden: ${ordenId}\nTotal pagado: ${formatearPrecio(totalMonto)}\n\nGracias por comprar en El Rincón del Perrito.`);
    window.location.href = "index.html";
}

// Delegación de eventos para botones data-agregar en cualquier página
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-agregar]");
    if (!btn) return;
    const prodId = btn.dataset.agregar;
    agregarAlCarrito(prodId, 1);
});

document.addEventListener("DOMContentLoaded", renderizarCarrito);
