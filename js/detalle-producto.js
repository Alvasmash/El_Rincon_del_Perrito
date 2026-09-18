/* ==========================================================
   detalle-producto.js — Ficha técnica detallada del producto
   ========================================================== */

function inicializarDetalleProducto() {
    const contenedor = document.getElementById("vista-detalle");
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const producto = buscarProductoPorId(id);

    if (!producto) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>Producto no encontrado</h2>
                <p>El producto que buscas no existe o ha sido modificado.</p>
                <a href="productos.html" class="boton">Volver al catálogo</a>
            </div>
        `;
        return;
    }

    document.title = producto.nombre + " — El Rincón del Perrito";

    // Miga de pan
    const migaPan = document.getElementById("miga-pan-dinamica");
    if (migaPan) {
        migaPan.innerHTML = `
            <a href="index.html">Home</a> &gt;
            <a href="productos.html?categoria=${producto.categoria}">${CATEGORIAS[producto.categoria] || producto.categoria}</a> &gt;
            <span>${producto.nombre}</span>
        `;
    }

    const sinStock = producto.stock <= 0;
    const stockBajo = !sinStock && producto.stockCritico && producto.stock <= producto.stockCritico;
    const precioTxt = formatearPrecio(producto.precio);

    contenedor.innerHTML = `
        <div class="detalle-grid">
            <div class="detalle-galeria">
                <div class="foto-principal">
                    <img id="img-principal" src="../Imagenes/${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="galeria-thumbs">
                    <div class="thumb-item activo" onclick="cambiarFoto('../Imagenes/${producto.imagen}', this)">
                        <img src="../Imagenes/${producto.imagen}" alt="Vista 1">
                    </div>
                    <div class="thumb-item" onclick="cambiarFoto('../Imagenes/pata_perrito.png', this)">
                        <img src="../Imagenes/pata_perrito.png" alt="Sello de Calidad">
                    </div>
                </div>
            </div>

            <div class="detalle-info">
                <span class="badge badge-info cat-badge">${CATEGORIAS[producto.categoria] || producto.categoria}</span>
                <h1>${producto.nombre}</h1>
                <p class="detalle-codigo">Código: <strong>${producto.codigo}</strong></p>
                <div class="detalle-precio">${precioTxt}</div>
                <p class="detalle-descripcion">${producto.descripcion || 'Sin descripción detallada disponible.'}</p>

                <ul class="detalle-caracteristicas">
                    <li><strong>Material:</strong> <span>${producto.material || 'Estándar de calidad'}</span></li>
                    <li><strong>Stock disponible:</strong> <span>${producto.stock} unidades</span></li>
                </ul>

                ${stockBajo ? `
                    <div class="alerta-stock-critico">
                        ⚠️ <strong>¡Stock Crítico!</strong> Quedan solo ${producto.stock} unidades disponibles en inventario.
                    </div>
                ` : ''}

                ${sinStock ? `
                    <div class="alerta-stock-critico" style="background: var(--error-fondo); color: var(--error);">
                        ❌ <strong>Agotado:</strong> Este producto no tiene stock en este momento.
                    </div>
                ` : `
                    <div class="accion-compra">
                        <div class="selector-cantidad">
                            <button type="button" class="btn-cant" onclick="ajustarInputDetalle(-1)">-</button>
                            <input type="number" id="input-cantidad-detalle" class="input-cant" value="1" min="1" max="${Math.min(producto.stock, 10)}" readonly>
                            <button type="button" class="btn-cant" onclick="ajustarInputDetalle(1, ${Math.min(producto.stock, 10)})">+</button>
                        </div>
                        <button type="button" class="boton" onclick="agregarDesdeDetalle('${producto.id}')">
                            Añadir al carrito
                        </button>
                    </div>
                `}
            </div>
        </div>

        <section class="productos-relacionados">
            <h2 class="titulo-seccion">Productos Relacionados</h2>
            <div class="grid-productos" id="relacionados-grid"></div>
        </section>
    `;

    // Renderizar relacionados
    const relGrid = document.getElementById("relacionados-grid");
    if (relGrid) {
        const rels = productosPorCategoria(producto.categoria)
            .filter(p => p.id !== producto.id)
            .slice(0, 4);
        if (rels.length > 0) {
            relGrid.innerHTML = rels.map(crearTarjetaProducto).join("");
        } else {
            relGrid.innerHTML = '<p class="subtitulo-seccion">No hay otros productos relacionados.</p>';
        }
    }
}

function cambiarFoto(ruta, elementoThumb) {
    const mainImg = document.getElementById("img-principal");
    if (mainImg) mainImg.src = ruta;
    document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("activo"));
    if (elementoThumb) elementoThumb.classList.add("activo");
}

function ajustarInputDetalle(cambio, maximo = 10) {
    const input = document.getElementById("input-cantidad-detalle");
    if (!input) return;
    let val = parseInt(input.value, 10) || 1;
    val += cambio;
    if (val < 1) val = 1;
    if (val > maximo) val = maximo;
    input.value = val;
}

function agregarDesdeDetalle(productoId) {
    const input = document.getElementById("input-cantidad-detalle");
    const cantidad = input ? parseInt(input.value, 10) : 1;
    if (typeof agregarAlCarrito === "function") {
        agregarAlCarrito(productoId, cantidad);
    }
}

document.addEventListener("DOMContentLoaded", inicializarDetalleProducto);
