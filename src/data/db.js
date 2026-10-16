/* Fuente de datos simulada con operaciones CRUD y persistencia en LocalStorage */

const KEYS = {
  PRODUCTS: 'rincon_perrito_db_products',
  CATEGORIES: 'rincon_perrito_db_categories',
  USERS: 'rincon_perrito_db_users',
  ORDERS: 'rincon_perrito_db_orders'
};

/* Categorías iniciales */
const INITIAL_CATEGORIES = [
  { id: 'camas', nombre: 'Camas', descripcion: 'Camas cómodas, ortopédicas y térmicas para perritos' },
  { id: 'juguetes', nombre: 'Juguetes', descripcion: 'Mordedores, pelotas y juguetes interactivos' },
  { id: 'collares', nombre: 'Collares', descripcion: 'Collares ajustables, reflectantes y de paseo' },
  { id: 'ofertas', nombre: 'Ofertas Especiales', descripcion: 'Productos seleccionados con descuento exclusivo' }
];

/* Catálogo inicial de productos */
const INITIAL_PRODUCTS = [
  {
    id: 'cama-madera',
    codigo: 'CAM001',
    nombre: 'Cama de Madera para Perrito',
    descripcion: 'Cama de madera sólida con base firme para descanso ergonómico.',
    precio: 14990,
    precioOferta: 11990,
    esOferta: true,
    stock: 12,
    stockCritico: 3,
    categoria: 'camas',
    material: 'Madera de Pino',
    imagen: 'cama.png'
  },
  {
    id: 'cama-tela',
    codigo: 'CAM002',
    nombre: 'Cama Cómoda Térmica',
    descripcion: 'Cama suave con forro térmico especial para proteger del frío.',
    precio: 19990,
    stock: 8,
    stockCritico: 2,
    categoria: 'camas',
    material: 'Tela Acolchada',
    imagen: 'camav2.png'
  },
  {
    id: 'cama-pequena',
    codigo: 'CAM003',
    nombre: 'Cama Nido Compacta',
    descripcion: 'Cama circular compacta ideal para cachorros y perros mini.',
    precio: 12990,
    stock: 15,
    stockCritico: 4,
    categoria: 'camas',
    material: 'Algodón Hipoalergénico',
    imagen: 'camav3.png'
  },
  {
    id: 'cama-acolchada',
    codigo: 'CAM004',
    nombre: 'Cama Acolchada Ortopédica',
    descripcion: 'Colchón viscoelástico para aliviar articulaciones en perros senior.',
    precio: 17990,
    precioOferta: 14990,
    esOferta: true,
    stock: 3,
    stockCritico: 5,
    categoria: 'camas',
    material: 'Memory Foam',
    imagen: 'camav4.png'
  },
  {
    id: 'juguete-plastico',
    codigo: 'JUG001',
    nombre: 'Hueso Interactivo Liviano',
    descripcion: 'Hueso de goma no tóxica para ejercitar mandíbula y jugar a lanzar.',
    precio: 3990,
    stock: 25,
    stockCritico: 5,
    categoria: 'juguetes',
    material: 'Plástico libre de BPA',
    imagen: 'juguetes.png'
  },
  {
    id: 'juguete-mordedor',
    codigo: 'JUG002',
    nombre: 'Pelota Mordedora Dental',
    descripcion: 'Relieves de goma que limpian suavemente encías y dientes.',
    precio: 5990,
    precioOferta: 4490,
    esOferta: true,
    stock: 18,
    stockCritico: 4,
    categoria: 'juguetes',
    material: 'Goma TPR',
    imagen: 'juguetesv2.png'
  },
  {
    id: 'juguete-cuerda',
    codigo: 'JUG003',
    nombre: 'Cuerda Trenzada Resistente',
    descripcion: 'Cuerda de algodón reforzado para jugar al tira y afloja.',
    precio: 4990,
    stock: 14,
    stockCritico: 5,
    categoria: 'juguetes',
    material: 'Algodón Natural',
    imagen: 'juguetesv3.png'
  },
  {
    id: 'juguete-caucho',
    codigo: 'JUG004',
    nombre: 'Kong de Caucho Ultra Durable',
    descripcion: 'Caucho natural ultra resistente rellenable con comida o premios.',
    precio: 6990,
    stock: 2,
    stockCritico: 4,
    categoria: 'juguetes',
    material: 'Caucho Natural',
    imagen: 'juguetesv4.png'
  },
  {
    id: 'collar-clasico',
    codigo: 'COL001',
    nombre: 'Collar Clásico Reflectante',
    descripcion: 'Nylon reforzado con costuras reflectantes para paseos nocturnos seguros.',
    precio: 5990,
    stock: 30,
    stockCritico: 5,
    categoria: 'collares',
    material: 'Nylon y Acero',
    imagen: 'collar.png'
  },
  {
    id: 'collar-ajustable',
    codigo: 'COL002',
    nombre: 'Collar Ajustable Soft Touch',
    descripcion: 'Broche rápido antiahogo y textura acolchada que cuida el pelaje.',
    precio: 7990,
    precioOferta: 5990,
    esOferta: true,
    stock: 11,
    stockCritico: 3,
    categoria: 'collares',
    material: 'Polímero Suave',
    imagen: 'collarv2.png'
  },
  {
    id: 'collar-resistente',
    codigo: 'COL003',
    nombre: 'Collar Aventura Outdoor',
    descripcion: 'Totalmente impermeable y lavable, resistente al agua y barro.',
    precio: 8990,
    stock: 4,
    stockCritico: 5,
    categoria: 'collares',
    material: 'Biothane Impermeable',
    imagen: 'collarv3.png'
  },
  {
    id: 'collar-paseo',
    codigo: 'COL004',
    nombre: 'Collar de Paseo Urbano',
    descripcion: 'Diseño liviano con estampados alegres para uso diario.',
    precio: 6990,
    stock: 16,
    stockCritico: 3,
    categoria: 'collares',
    material: 'Poliéster Reforzado',
    imagen: 'collarv4.png'
  }
];

/* Usuarios iniciales con roles */
const INITIAL_USERS = [
  {
    run: '19011022K',
    nombre: 'Administrador',
    apellidos: 'Principal Duoc',
    correo: 'admin@duocuc.cl',
    clave: 'admin123',
    rol: 'Administrador',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: 'Av. España 123, Campus Duoc UC',
    telefono: '+56911223344'
  },
  {
    run: '181234567',
    nombre: 'Carlos',
    apellidos: 'Vendedor Duoc',
    correo: 'vendedor@duocuc.cl',
    clave: 'vendedor123',
    rol: 'Vendedor',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Calle Valparaíso 456',
    telefono: '+56955667788'
  },
  {
    run: '201112223',
    nombre: 'María',
    apellidos: 'González Pérez',
    correo: 'cliente@gmail.com',
    clave: 'cliente123',
    rol: 'Cliente',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Providencia',
    direccion: 'Av. Providencia 2020, Depto 402',
    telefono: '+56999887766'
  }
];

/* Funciones auxiliares de almacenamiento */
function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error cargando ' + key, e);
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error guardando ' + key, e);
    return false;
  }
}

/* ---------------- CRUD PRODUCTOS ---------------- */
export function getProducts() {
  return loadData(KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export function getProductById(id) {
  return getProducts().find(p => p.id === id);
}

export function createProduct(product) {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: product.id || 'prod-' + Date.now(),
    stock: parseInt(product.stock, 10) || 0,
    stockCritico: parseInt(product.stockCritico, 10) || 0,
    precio: parseFloat(product.precio) || 0
  };
  products.push(newProduct);
  saveData(KEYS.PRODUCTS, products);
  return newProduct;
}

export function updateProduct(id, updatedFields) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products[index] = { ...products[index], ...updatedFields };
  saveData(KEYS.PRODUCTS, products);
  return products[index];
}

export function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id);
  saveData(KEYS.PRODUCTS, products);
  return true;
}

/* ---------------- CRUD CATEGORÍAS ---------------- */
export function getCategories() {
  return loadData(KEYS.CATEGORIES, INITIAL_CATEGORIES);
}

export function createCategory(cat) {
  const categories = getCategories();
  const newCat = { ...cat, id: cat.id || cat.nombre.toLowerCase().replace(/\s+/g, '-') };
  categories.push(newCat);
  saveData(KEYS.CATEGORIES, categories);
  return newCat;
}

export function updateCategory(id, updatedFields) {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return false;
  categories[index] = { ...categories[index], ...updatedFields };
  saveData(KEYS.CATEGORIES, categories);
  return categories[index];
}

export function deleteCategory(id) {
  const categories = getCategories().filter(c => c.id !== id);
  saveData(KEYS.CATEGORIES, categories);
  return true;
}

/* ---------------- CRUD USUARIOS ---------------- */
export function getUsers() {
  return loadData(KEYS.USERS, INITIAL_USERS);
}

export function getUserByEmail(email) {
  if (!email) return null;
  const clean = email.trim().toLowerCase();
  const canonical = clean.replace('@duoc.cl', '@duocuc.cl');
  return getUsers().find(u => {
    const userEmail = u.correo.toLowerCase();
    const userCanonical = userEmail.replace('@duoc.cl', '@duocuc.cl');
    return userEmail === clean || userCanonical === canonical;
  });
}

export function getUserByRut(rut) {
  if (!rut) return null;
  const clean = rut.trim().toUpperCase();
  return getUsers().find(u => u.run.toUpperCase() === clean);
}

export function createUser(user) {
  const users = getUsers();
  users.push(user);
  saveData(KEYS.USERS, users);
  return user;
}

export function updateUser(rut, updatedFields) {
  const users = getUsers();
  const index = users.findIndex(u => u.run.toUpperCase() === rut.toUpperCase());
  if (index === -1) return false;
  users[index] = { ...users[index], ...updatedFields };
  saveData(KEYS.USERS, users);
  return users[index];
}

export function deleteUser(rut) {
  const users = getUsers().filter(u => u.run.toUpperCase() !== rut.toUpperCase());
  saveData(KEYS.USERS, users);
  return true;
}

/* ---------------- CRUD ÓRDENES ---------------- */
export function getOrders() {
  return loadData(KEYS.ORDERS, []);
}

export function getOrderById(id) {
  return getOrders().find(o => o.id === id);
}

export function createOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: orderData.id || '#20240705',
    fecha: new Date().toISOString().split('T')[0],
    ...orderData
  };
  orders.unshift(newOrder);
  saveData(KEYS.ORDERS, orders);

  // Descontar inventario automáticamente
  if (Array.isArray(orderData.items)) {
    orderData.items.forEach(item => {
      const prod = getProductById(item.id);
      if (prod) {
        updateProduct(item.id, { stock: Math.max(0, prod.stock - item.quantity) });
      }
    });
  }
  return newOrder;
}
