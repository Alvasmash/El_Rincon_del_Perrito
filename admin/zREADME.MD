# Carpeta `admin`

Esta carpeta contiene el **sistema administrativo** de El Rincón del Perrito.  
Su objetivo es permitir que los usuarios con los roles correspondientes puedan administrar productos, usuarios y revisar las órdenes generadas desde la tienda.

El panel funciona completamente en el frontend. No existe una base de datos ni un servidor propio: la información se mantiene en `localStorage` del navegador mediante los archivos JavaScript de la carpeta `js`.

---

## 1. `index.html` — Dashboard administrativo

Es la pantalla principal del panel.

### ¿Qué contiene?

- Barra lateral (`aside`) con las opciones del sistema.
- Dashboard principal.
- Tarjetas KPI:
  - Total de productos.
  - Productos con stock crítico.
  - Usuarios registrados.
  - Órdenes realizadas.
- Tabla de productos que necesitan atención por stock bajo.
- Accesos directos a los mantenedores.

### ¿Cómo funciona?

Al cargar la página se ejecuta JavaScript dentro del propio HTML.

Primero se llama:

```javascript
verificarAccesoAdmin(true)
```

Esto comprueba que exista una sesión y permite entrar al Administrador o al Vendedor.

Después se obtiene:

```javascript
const sesion = obtenerSesionActual();
```

Con la sesión se muestra el nombre y el rol del usuario.

### Diferencia entre Administrador y Vendedor

Si el usuario es Vendedor, el código oculta:

- Gestión de usuarios.
- Nuevo usuario.
- Nuevo producto.
- KPI de usuarios.
- Accesos relacionados con esas funciones.

El Vendedor queda orientado principalmente a consultar productos y órdenes.

### Cálculo de stock crítico

Se obtienen los productos:

```javascript
const productos = obtenerProductos();
```

Luego se filtran los que cumplen:

```javascript
p.stockCritico && p.stock <= p.stockCritico
```

Esto significa que si el stock actual es menor o igual al límite definido, el producto aparece como crítico.

Finalmente se actualizan los elementos HTML usando:

```javascript
textContent
```

y:

```javascript
innerHTML
```

para construir la tabla.

---

## 2. `productos.html` — Mantenedor de productos

Es la vista donde se consulta el inventario.

### Elementos principales

- Campo para buscar por nombre o código.
- Selector de categoría.
- Botón para crear un producto.
- Tabla de productos.
- Columnas de:
  - Código.
  - Nombre.
  - Categoría.
  - Precio.
  - Stock.
  - Stock crítico.
  - Acciones.

La tabla comienza vacía y JavaScript la genera dinámicamente.

### JavaScript utilizado

Carga:

```html
<script src="../js/productos-data.js"></script>
<script src="../js/usuarios-data.js"></script>
<script src="../js/auth.js"></script>
<script src="../js/header.js"></script>
<script src="../js/admin-productos.js"></script>
```

El orden es importante porque los archivos posteriores utilizan funciones definidas por los anteriores.

Por ejemplo, `admin-productos.js` necesita las funciones de `productos-data.js`.

---

## 3. `producto-form.html` — Crear y editar productos

Es el formulario utilizado para registrar o modificar productos.

### Campos

- Código.
- Categoría.
- Nombre.
- Descripción.
- Precio.
- Stock.
- Stock crítico.
- Imagen.

### Concepto importante: crear o editar

La misma página sirve para las dos operaciones.

El JavaScript revisa si la URL contiene un parámetro:

```text
?id=...
```

Si existe, se busca el producto correspondiente y se cargan sus datos.

Si no existe, el formulario se interpreta como creación de un producto nuevo.

### Ejemplo de URL

```text
producto-form.html?id=cama-madera
```

El `id` permite identificar qué producto debe modificarse.

### Validaciones

Se comprueba, entre otras cosas:

- Código mínimo.
- Nombre máximo de caracteres.
- Descripción máxima.
- Precio mayor o igual a cero.
- Stock entero.
- Stock crítico entero.

Cuando todo es correcto se utiliza la función de persistencia:

```javascript
guardarOActualizarProducto(producto)
```

Esto permite reutilizar la misma lógica para crear y editar.

---

## 4. `usuarios.html` — Mantenedor de usuarios

Permite consultar los usuarios registrados en el sistema.

### Funciones de la pantalla

- Mostrar usuarios.
- Buscar por nombre, correo o RUN.
- Editar usuarios.
- Eliminar usuarios.
- Mostrar el rol.

La gestión de usuarios está restringida al Administrador.

La información proviene de:

```javascript
obtenerUsuarios()
```

definida en `usuarios-data.js`.

---

## 5. `usuario-form.html` — Crear y editar usuarios

Es el formulario administrativo para administrar cuentas.

### Datos manejados

- RUN.
- Nombre.
- Apellidos.
- Correo.
- Contraseña.
- Rol.
- Región.
- Comuna.
- Dirección.
- Teléfono.
- Fecha de nacimiento.

### Roles

El sistema utiliza tres roles:

```text
Administrador
Vendedor
Cliente
```

El rol determina qué partes del sistema puede utilizar el usuario.

### Región y comuna

El formulario utiliza:

```javascript
inicializarSelectsRegionComuna(...)
```

La región se carga desde un arreglo JavaScript y, al cambiarla, se actualiza automáticamente el selector de comunas.

---

## 6. `ordenes.html` — Órdenes de compra

Muestra las compras realizadas desde la tienda.

Las órdenes se almacenan en:

```text
rincon_perrito_ordenes_v1
```

dentro de `localStorage`.

La tabla muestra:

- Número de orden.
- Fecha.
- Cliente.
- Correo.
- Cantidad de productos.
- Total.
- Estado.

Las órdenes son creadas desde el carrito cuando se ejecuta el proceso de pago.

---

# Cómo se conecta todo el panel

El flujo general es:

```text
Login
  ↓
auth.js
  ↓
Verificación del rol
  ↓
Dashboard
  ├── Productos
  │    └── Crear / Editar
  ├── Usuarios
  │    └── Crear / Editar
  └── Órdenes
```

Los datos no viajan a un backend. Se almacenan localmente:

```text
Productos → localStorage
Usuarios → localStorage
Sesión → localStorage
Carrito → localStorage
Órdenes → localStorage
Mensajes de contacto → localStorage
```

---

# Conceptos de código que se utilizan

## DOM

JavaScript utiliza:

```javascript
document.getElementById(...)
```

para localizar elementos HTML.

También utiliza:

```javascript
document.querySelector(...)
```

cuando corresponde seleccionar elementos mediante selectores CSS.

## Eventos

El panel responde a acciones del usuario mediante eventos como:

```javascript
click
input
change
submit
DOMContentLoaded
```

## Renderizado dinámico

Las tablas se construyen con:

```javascript
element.innerHTML = `...`;
```

Esto permite generar filas dependiendo de los datos guardados.

## `localStorage`

Permite conservar los datos después de cerrar o recargar la página.

Para guardar:

```javascript
localStorage.setItem("clave", JSON.stringify(datos));
```

Para recuperar:

```javascript
JSON.parse(localStorage.getItem("clave"));
```

---

# Importante

El sistema es una simulación frontend. `localStorage` no equivale a una base de datos real y las contraseñas se almacenan en el navegador.

Por eso, el proyecto sirve para demostrar la lógica de una tienda y su panel administrativo, pero no debe considerarse un sistema listo para producción sin backend, autenticación segura y base de datos
