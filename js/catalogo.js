/* ==========================================================
   catalogo.js — Muestra productos en portada y catálogo con filtros
   ========================================================== */

function crearTarjetaProducto(p) {
    const sinStock = p.stock <= 0;
    const stockBajo = !sinStock && p.stockCritico && p.stock <= p.stockCritico;
    const precioTxt = formatearPrecio(p.precio);

    return `
        <article class="tarjeta-producto">
            ${sinStock ? '<span class="sin-stock-tag">Agotado</span>' : ''}
            <div class="img-contenedor">
                <a href="detalle-producto.html?id=${encodeURIComponent(p.id)}">
                    <img src="../Imagenes/${p.imagen}" alt="${p.nombre}" loading="lazy">
                </a>
            </div>
            <span class="etiqueta-cat">${CATEGORIAS[p.categoria] || p.categoria}</span>
            <h3>
                <a href="detalle-producto.html?id=${encodeURIComponent(p.id)}">${p.nombre}</a>
            </h3>
            <p class="descripcion-corta">${p.descripcion ? p.descripcion.substring(0, 80) + '...' : ''}</p>
            ${stockBajo ? `<span style="color: var(--alerta); font-size: 0.78rem; font-weight: 700;">¡Últimas ${p.stock} unidades!</span>` : ''}
            <div class="precio-fila">
                <span class="precio">${precioTxt}</span>
                <button type="button" class="boton btn-agregar" data-agregar="${p.id}" ${sinStock ? 'disabled' : ''}>
                    ${sinStock ? 'Sin stock' : 'Añadir'}
                </button>
            </div>
        </article>
    `;
}

function inicializarCatalogo() {
    const contenedor = document.getElementById("grid-productos");
    if (!contenedor) return;

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("categoria");
    const limiteParam = parseInt(contenedor.dataset.limite, 10) || 0;

    let productos = catParam ? productosPorCategoria(catParam) : obtenerProductos();

    // Marcar filtro activo
    document.querySelectorAll(".filtro-btn").forEach(btn => {
        const cat = btn.dataset.categoria;
        if ((!catParam && !cat) || catParam === cat) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });

    const contadorCatalogo = document.getElementById("conteo-catalogo");
    if (contadorCatalogo) {
        const catNombre = CATEGORIAS[catParam] || "Todos los productos";
        contadorCatalogo.textContent = `Mostrando ${productos.length} producto(s) en ${catNombre}`;
    }

    if (limiteParam > 0) {
        productos = productos.slice(0, limiteParam);
    }

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="subtitulo-seccion" style="grid-column: 1/-1; text-align: center;">No hay productos disponibles en esta categoría.</p>';
        return;
    }

    contenedor.innerHTML = productos.map(crearTarjetaProducto).join("");
}

document.addEventListener("DOMContentLoaded", inicializarCatalogo);
