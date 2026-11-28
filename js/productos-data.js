/* ==========================================================
   productos-data.js — Catálogo de productos y persistencia en localStorage
   Cumple con los campos requeridos en el PDF:
   - Código producto (mín. 3 caracteres)
   - Nombre (máx. 100)
   - Descripción (opcional, máx. 500)
   - Precio (mín. 0, decimales permitidos, 0 = FREE)
   - Stock (mín. 0, enteros)
   - Stock Crítico (opcional, mín. 0, enteros; alerta si stock <= stockCritico)
   - Categorías (Camas, Juguetes, Collares)
   - Imagen (opcional)
   ========================================================== */

const CLAVE_PRODUCTOS = "rincon_perrito_productos_v1";

const CATEGORIAS = {
    camas: "Camas",
    juguetes: "Juguetes",
    collares: "Collares"
};

// Productos que se cargan automáticamente cuando no existen datos guardados.
const PRODUCTOS_INICIALES = [
    {
        id: "cama-madera",
        codigo: "CAM001",
        nombre: "Cama de Madera para Perrito",
        descripcion: "Cama de madera sólida tratada con base firme, diseñada para proporcionar el mejor descanso y postura a perros medianos y grandes.",
        precio: 14990,
        stock: 12,
        stockCritico: 3,
        categoria: "camas",
        material: "Madera de Pino",
        imagen: "cama.png"
    },
    {
        id: "cama-tela",
        codigo: "CAM002",
        nombre: "Cama Cómoda Térmica",
        descripcion: "Cama de tela suave y afelpada con relleno térmico para acompañar a tu perrito durante las noches frías de invierno.",
        precio: 19990,
        stock: 8,
        stockCritico: 2,
        categoria: "camas",
        material: "Tela Acolchada",
        imagen: "camav2.png"
    },
    {
        id: "cama-pequena",
        codigo: "CAM003",
        nombre: "Cama Nido Compacta",
        descripcion: "Cama de algodón hipoalergénico en formato redondo compacto, ideal para cachorros o perritos de razas pequeñas.",
        precio: 12990,
        stock: 15,
        stockCritico: 4,
        categoria: "camas",
        material: "Algodón Suave",
        imagen: "camav3.png"
    },
    {
        id: "cama-acolchada",
        codigo: "CAM004",
        nombre: "Cama Acolchada Ortopédica",
        descripcion: "Colchón viscoelástico con funda desmontable y lavable para aliviar la presión articular en perritos senior.",
        precio: 17990,
        stock: 3,
        stockCritico: 5,
        categoria: "camas",
        material: "Espuma Memory Foam",
        imagen: "camav4.png"
    },
    {
        id: "juguete-plastico",
        codigo: "JUG001",
        nombre: "Hueso Interactivo Liviano",
        descripcion: "Juguete de plástico seguro no tóxico para entrenar el agarre y divertirse jugando a lanzar y recoger.",
        precio: 3990,
        stock: 25,
        stockCritico: 5,
        categoria: "juguetes",
        material: "Plástico libre de BPA",
        imagen: "juguetes.png"
    },
    {
        id: "juguete-mordedor",
        codigo: "JUG002",
        nombre: "Pelota Mordedora Dental",
        descripcion: "Mordedor con relieves de goma que limpian suavemente las encías y dientes mientras tu mascota mastica.",
        precio: 5990,
        stock: 18,
        stockCritico: 4,
        categoria: "juguetes",
        material: "Goma TPR no tóxica",
        imagen: "juguetesv2.png"
    },
    {
        id: "juguete-cuerda",
        codigo: "JUG003",
        nombre: "Cuerda Trenzada Resistente",
        descripcion: "Juguete de cuerdas de algodón trenzado reforzado, excelente para juegos de tira y afloja entre dueño y perro.",
        precio: 4990,
        stock: 14,
        stockCritico: 5,
        categoria: "juguetes",
        material: "Cuerda de Algodón",
        imagen: "juguetesv3.png"
    },
    {
        id: "juguete-caucho",
        codigo: "JUG004",
        nombre: "Kong de Caucho Ultra Durable",
        descripcion: "Juguete de caucho natural ultra resistente que se puede rellenar con premios o comida para estimulación mental prolongada.",
        precio: 6990,
        stock: 2,
        stockCritico: 4,
        categoria: "juguetes",
        material: "Caucho Natural",
        imagen: "juguetesv4.png"
    },
    {
        id: "collar-clasico",
        codigo: "COL001",
        nombre: "Collar Clásico Reflectante",
        descripcion: "Collar resistente de nylon con cinta reflectante para máxima visibilidad y seguridad en paseos nocturnos.",
        precio: 5990,
        stock: 30,
        stockCritico: 5,
        categoria: "collares",
        material: "Nylon y Hebilla Metálica",
        imagen: "collar.png"
    },
    {
        id: "collar-ajustable",
        codigo: "COL002",
        nombre: "Collar Ajustable Soft Touch",
        descripcion: "Collar de fácil regulación con broche rápido antiahogo y textura acolchada que no maltrata el pelaje.",
        precio: 7990,
        stock: 11,
        stockCritico: 3,
        categoria: "collares",
        material: "Polímero Acolchado",
        imagen: "collarv2.png"
    },
    {
        id: "collar-resistente",
        codigo: "COL003",
        nombre: "Collar Aventura Outdoor",
        descripcion: "Collar impermeable a prueba de agua y barro, con anillo reforzado de acero inoxidable para correa de tiro.",
        precio: 8990,
        stock: 4,
        stockCritico: 5,
        categoria: "collares",
        material: "Biothane Impermeable",
        imagen: "collarv3.png"
    },
    {
        id: "collar-paseo",
        codigo: "COL004",
        nombre: "Collar de Paseo Urbano",
        descripcion: "Collar liviano y colorido de tela de alta densidad con diseño moderno ideal para el paseo diario.",
        precio: 6990,
        stock: 16,
        stockCritico: 3,
        categoria: "collares",
        material: "Tela Poliéster Reforzado",
        imagen: "collarv4.png"
    }
];

function obtenerProductos() {
    try {
        // Recupera los productos guardados y los convierte desde JSON a un arreglo.
        const almacenados = localStorage.getItem(CLAVE_PRODUCTOS);

        if (almacenados) {
            const arr = JSON.parse(almacenados);

            // Usa los datos guardados solo si forman un arreglo con productos.
            if (Array.isArray(arr) && arr.length > 0) return arr;
        }
    } catch (e) {
        console.error("Error al leer productos de localStorage:", e);
    }

    // Si no existen productos guardados, carga el catálogo inicial.
    guardarProductos(PRODUCTOS_INICIALES);
    return PRODUCTOS_INICIALES;
}

function guardarProductos(lista) {
    try {
        // Convierte el arreglo a JSON para poder almacenarlo en LocalStorage.
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
        return true;
    } catch (e) {
        console.error("Error al guardar productos en localStorage:", e);
        return false;
    }
}

function buscarProductoPorId(id) {
    // Busca un producto utilizando su identificador único.
    return obtenerProductos().find((p) => p.id === id);
}

function buscarProductoPorCodigo(codigo) {
    if (!codigo) return undefined;

    // Compara códigos ignorando diferencias entre mayúsculas y minúsculas.
    return obtenerProductos().find(
        (p) => p.codigo && p.codigo.trim().toUpperCase() === codigo.trim().toUpperCase()
    );
}

function productosPorCategoria(categoria) {
    const todos = obtenerProductos();

    if (!categoria) return todos;

    // Filtra los productos que pertenecen a la categoría indicada.
    return todos.filter((p) => p.categoria === categoria);
}

function guardarOActualizarProducto(producto) {
    const productos = obtenerProductos();

    // Busca si el producto ya existe para actualizarlo o agregar uno nuevo.
    const indice = productos.findIndex((p) => p.id === producto.id);

    if (indice >= 0) {
        productos[indice] = { ...productos[indice], ...producto };
    } else {
        productos.push(producto);
    }

    guardarProductos(productos);
    return true;
}

function eliminarProducto(id) {
    let productos = obtenerProductos();

    // Filtra el producto indicado y conserva todos los demás.
    productos = productos.filter((p) => p.id !== id);

    guardarProductos(productos);
    return true;
}

function formatearPrecio(valor) {
    const num = Number(valor) || 0;

    // El precio cero se muestra como "GRATIS".
    if (num === 0) return "GRATIS";

    // Redondea el precio y agrega puntos como separadores de miles.
    return "$" + String(Math.round(num)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}