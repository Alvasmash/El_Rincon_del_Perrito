# Carpeta `js`

Esta carpeta contiene toda la lógica de JavaScript del proyecto.

El proyecto está dividido en archivos pequeños para que cada uno tenga una responsabilidad específica.

Actualmente se utilizan **17 archivos JavaScript**.

---

# 1. `productos-data.js`

Es la fuente de datos del catálogo.

Define:

```javascript
CATEGORIAS
PRODUCTOS_INICIALES
```

Cada producto contiene datos como:

```text
id
codigo
nombre
descripcion
precio
stock
stockCritico
categoria
material
imagen
```

### Funciones principales

#### `obtenerProductos()`

Busca los productos en `localStorage`.

Si existen y son válidos:

```javascript
return arr;
```

Si no existen, guarda los productos iniciales y los devuelve.

#### `guardarProductos(lista)`

Convierte el arreglo a JSON:

```javascript
JSON.stringify(lista)
```

y lo guarda en:

```text
rincon_perrito_productos_v1
```

#### `buscarProductoPorId(id)`

Utiliza:

```javascript
find(...)
```

para encontrar un producto por su ID.

#### `buscarProductoPorCodigo(codigo)`

Busca por código ignorando diferencias de mayúsculas/minúsculas.

#### `productosPorCategoria(categoria)`

Utiliza:

```javascript
filter(...)
```

para devolver solamente los productos de una categoría.

#### `guardarOActualizarProducto(producto)`

Si el producto ya existe, lo modifica.

Si no existe, lo agrega al arreglo.

Esto permite reutilizar una sola función para:

```text
Crear
Editar
```

#### `eliminarProducto(id)`

Utiliza `filter()` para generar una nueva lista sin el producto indicado.

#### `formatearPrecio(valor)`

Convierte un número en formato visual chileno:

```text
14990 → $14.990
```

Si el precio es cero:

```text
GRATIS
```

---

# 2. `usuarios-data.js`

Maneja los usuarios.

Los usuarios iniciales tienen:

```text
RUN
nombre
apellidos
correo
clave
rol
region
comuna
direccion
telefono
fechaNacimiento
```

### Funciones

`obtenerUsuarios()`
- Recupera usuarios.

`guardarUsuarios(lista)`
- Guarda usuarios.

`buscarUsuarioPorCorreo(correo)`
- Busca por correo.
- Normaliza mayúsculas/minúsculas.
- También contempla equivalencia entre algunos dominios Duoc.

`buscarUsuarioPorRun(run)`
- Limpia caracteres.
- Convierte a mayúscula.
- Busca por RUN.

`guardarOActualizarUsuario(usuario)`
- Actualiza si existe.
- Inserta si no existe.

`eliminarUsuario(run)`
- Elimina por RUN.

---

# 3. `regiones-comunas.js`

Contiene el arreglo:

```javascript
REGIONES_Y_COMUNAS
```

Cada elemento tiene:

```javascript
{
    region: "...",
    comunas: [...]
}
```

### `inicializarSelectsRegionComuna(...)`

Esta función recibe los elementos HTML de región y comuna.

Primero llena el selector de regiones.

Después crea una función interna:

```javascript
actualizarComunas(...)
```

Cuando el usuario cambia la región:

```javascript
selRegion.addEventListener("change", ...)
```

se buscan las comunas correspondientes y se vuelven a crear las opciones del segundo `<select>`.

Por eso el formulario es dependiente:

```text
Región
   ↓
Comunas disponibles
```

---

# 4. `validaciones.js`

Es la biblioteca de validaciones reutilizable del proyecto.

---

## `validarRunChileno(run)`

Implementa el algoritmo Módulo 11.

Proceso simplificado:

```text
RUN ingresado
↓
limpiar y convertir a mayúsculas
↓
separar cuerpo y dígito verificador
↓
multiplicar dígitos por factores
↓
calcular módulo 11
↓
obtener DV esperado
↓
comparar
```

Devuelve un objeto:

```javascript
{
    valido: true,
    mensaje: ""
}
```

o:

```javascript
{
    valido: false,
    mensaje: "..."
}
```

---

## `validarCorreoPermitido(correo)`

Comprueba:

- Que exista cuando es obligatorio.
- Máximo de 100 caracteres.
- Formato básico de email.
- Dominio permitido.

El código contempla dominios Duoc y Gmail definidos por las reglas del proyecto.

---

## `validarLargoTexto(...)`

Es una función reutilizable para campos de texto.

Recibe:

```text
texto
requerido
mínimo
máximo
nombre del campo
```

Así se puede reutilizar para:

```text
Nombre
Apellidos
Dirección
Comentario
Descripción
```

---

## `validarNumeroEntero(...)`

Comprueba que el valor:

- Sea numérico.
- Sea entero.
- Cumpla el mínimo.

Se usa principalmente para stock y stock crítico.

---

## `validarPrecio(...)`

Permite precios decimales y comprueba que no sean negativos.

El proyecto interpreta:

```text
0 = GRATIS
```

---

## `mostrarErrorCampo(...)`

Agrega:

```text
campo-invalido
```

al input y escribe el mensaje.

---

## `limpiarErrorCampo(...)`

Quita el estado inválido y agrega:

```text
campo-valido
```

Esto conecta JavaScript con:

```text
formularios.css
```

---

# 5. `auth.js`

Controla la sesión.

La clave utilizada es:

```text
rincon_perrito_sesion_activa
```

### `obtenerSesionActual()`

Lee la sesión actual desde `localStorage`.

### `iniciarSesionUsuario(usuario)`

Guarda solamente los datos necesarios para representar la sesión:

```text
RUN
nombre
apellidos
correo
rol
```

### `cerrarSesionUsuario()`

Elimina la sesión y recarga la página.

### `verificarAccesoAdmin(permitirVendedor)`

Comprueba:

1. Si existe sesión.
2. Si es Administrador.
3. Si se permite Vendedor.
4. Si debe ser redirigido.

Esto evita que un Cliente entre normalmente al panel administrativo.

---

# 6. `header.js`

Contiene comportamiento compartido por las páginas.

### `actualizarContadorHeader()`

Lee el carrito y suma las cantidades.

Ejemplo:

```text
Cama x2
Juguete x3
----------------
Total = 5
```

Ese resultado aparece junto al carrito.

### `actualizarSesionHeader()`

Revisa la sesión.

Sin sesión:

```text
Iniciar sesión
Registrar usuario
```

Con sesión:

```text
Nombre (Rol)
Salir
```

Si es Administrador o Vendedor, también aparece el acceso al panel.

### `iniciarMenuHamburguesa()`

Agrega un evento al botón:

```javascript
classList.toggle("abierto")
```

Esto abre o cierra el menú móvil.

### `mostrarToast(mensaje, tipo)`

Crea o reutiliza una notificación visual.

Tipos utilizados:

```text
exito
error
alerta
info
```

---

# 7. `catalogo.js`

Es responsable de mostrar productos en las páginas públicas.

### Flujo

```text
Obtener productos
↓
Leer categoría de URL
↓
Filtrar
↓
Crear tarjetas
↓
Insertarlas en #grid-productos
```

Utiliza el arreglo de productos y crea HTML dinámicamente.

### Tarjeta

La tarjeta muestra:

- Imagen.
- Categoría.
- Nombre.
- Descripción.
- Precio.
- Stock.
- Botón agregar.

El atributo:

```html
data-agregar="ID"
```

permite que `carrito.js` sepa qué producto agregar.

---

# 8. `detalle-producto.js`

Genera la ficha individual.

Lee el producto solicitado desde la URL.

Después crea:

- Breadcrumb.
- Imagen principal.
- Miniaturas.
- Categoría.
- Nombre.
- Código.
- Precio.
- Descripción.
- Material.
- Stock.
- Control de cantidad.
- Botón agregar.

También muestra productos relacionados.

### Control de cantidad

Los botones `+` y `-` modifican la cantidad sin permitir superar el stock disponible.

---

# 9. `carrito.js`

Es uno de los archivos más importantes del proyecto.

La clave utilizada es:

```text
rincon_perrito_carrito_v1
```

### `obtenerCarrito()`

Recupera el arreglo.

### `guardarCarrito(items)`

Guarda el carrito y actualiza el contador del header.

### `agregarAlCarrito(productoId, cantidad)`

Proceso:

```text
Buscar producto
↓
Comprobar stock
↓
Buscar si ya existe en carrito
↓
Sumar cantidad o crear item
↓
Guardar
↓
Mostrar mensaje
```

### `modificarCantidad(productoId, delta)`

`delta` puede ser:

```text
-1
+1
```

Controla que la cantidad:

- No sea cero.
- No supere el stock.

### `eliminarDelCarrito(productoId)`

Usa `filter()` para quitar el producto.

### `aplicarCupon()`

El cupón implementado es:

```text
PERRITO10
```

y representa:

```text
10%
```

de descuento.

### `renderizarCarrito()`

Construye visualmente el carrito.

Calcula:

```text
subtotal
descuento
totalFinal
```

### `procesarPagoCarrito(totalMonto)`

Simula el checkout.

Genera una orden:

```javascript
{
    id,
    fecha,
    cliente,
    correo,
    items,
    total,
    estado
}
```

Después:

1. Descuenta stock.
2. Guarda la orden.
3. Vacía el carrito.
4. Actualiza el contador.
5. Muestra confirmación.
6. Regresa al Home.

---

# 10. `login.js`

Maneja el formulario de login.

Valida correo y contraseña en tiempo real mediante:

```text
input
blur
```

Cuando se envía:

```text
validar
↓
buscar usuario
↓
comparar contraseña
↓
crear sesión
↓
redireccionar
```

Los roles Administrador y Vendedor van al panel.

Cliente va a la tienda.

---

# 11. `registro.js`

Controla el registro de usuarios.

Valida en vivo:

- RUN.
- Nombre.
- Apellidos.
- Correo.
- Contraseña.
- Confirmación.
- Región.
- Comuna.
- Dirección.

También verifica que:

```text
RUN no exista
correo no exista
```

Cuando todo es válido crea:

```javascript
nuevoUsuario
```

con:

```javascript
rol: "Cliente"
```

Luego lo guarda y crea la sesión.

---

# 12. `contacto.js`

Controla el formulario de contacto.

Valida:

- Nombre.
- Correo.
- Comentario.

También actualiza:

```text
contador/500 caracteres
```

Cuando el formulario es correcto crea un objeto:

```javascript
{
    nombre,
    correo,
    comentario,
    fecha
}
```

y lo guarda en:

```text
rincon_perrito_contacto_v1
```

---

# 13. `admin-productos.js`

Controla el mantenedor de productos.

Funciones principales:

- Verificar acceso.
- Cargar productos.
- Buscar.
- Filtrar por categoría.
- Mostrar stock crítico.
- Editar.
- Eliminar.

La tabla se vuelve a renderizar después de cambios.

El stock crítico se determina comparando:

```javascript
stock <= stockCritico
```

---

# 14. `admin-producto-form.js`

Controla el formulario administrativo de productos.

Determina si la operación es:

```text
Nuevo producto
```

o:

```text
Editar producto
```

mediante el parámetro `id` de la URL.

Valida campos y finalmente llama a:

```javascript
guardarOActualizarProducto(...)
```

También genera el ID del nuevo producto cuando corresponde.

---

# 15. `admin-usuarios.js`

Controla el listado administrativo de usuarios.

Permite:

- Cargar usuarios.
- Buscar.
- Mostrar roles.
- Editar.
- Eliminar.

La edición utiliza el RUN como identificador.

---

# 16. `admin-usuario-form.js`

Controla el formulario de usuario del panel.

Permite crear o editar:

```text
RUN
Nombre
Apellidos
Correo
Clave
Rol
Región
Comuna
Dirección
Teléfono
Fecha
```

Reutiliza las validaciones comunes.

También utiliza el sistema de regiones y comunas.

---

# 17. `admin-ordenes.js`

Carga las órdenes desde:

```text
rincon_perrito_ordenes_v1
```

La función:

```javascript
inicializarAdminOrdenes()
```

genera una fila por orden.

La cantidad total de productos se calcula mediante:

```javascript
reduce(...)
```

Por ejemplo:

```text
Producto A x2
Producto B x3

Total = 5 productos
```

También muestra:

- ID.
- Fecha.
- Cliente.
- Correo.
- Cantidad.
- Total.
- Estado.

El archivo verifica el acceso permitiendo Administrador y Vendedor.

---

# Flujo completo de JavaScript

## Inicio

```text
HTML carga
↓
productos-data.js
usuarios-data.js
auth.js
header.js
...
↓
DOMContentLoaded
↓
cada módulo inicializa su función
```

## Comprar un producto

```text
Catálogo
↓
data-agregar
↓
carrito.js
↓
localStorage
↓
contador del header
↓
carrito.html
↓
procesarPagoCarrito()
↓
orden en localStorage
↓
descuento de stock
```

## Registrar usuario

```text
registro.html
↓
registro.js
↓
validaciones.js
↓
regiones-comunas.js
↓
usuarios-data.js
↓
localStorage
↓
auth.js
↓
sesión iniciada
```

## Administrar producto

```text
admin/productos.html
↓
admin-productos.js
↓
producto-form.html
↓
admin-producto-form.js
↓
validaciones.js
↓
productos-data.js
↓
localStorage
```

---

# Conceptos de JavaScript que se pueden explicar en una defensa

## `localStorage`

Permite guardar información en el navegador.

## `JSON.stringify()`

Convierte objetos/arreglos a texto para almacenarlos.

## `JSON.parse()`

Convierte el texto almacenado nuevamente en objetos/arreglos.

## `find()`

Busca un elemento.

## `filter()`

Genera una lista filtrada.

## `map()`

Transforma cada elemento en otra representación, en este caso HTML.

## `reduce()`

Acumula valores, por ejemplo para sumar cantidades.

## `addEventListener()`

Escucha eventos del usuario.

## `classList`

Permite agregar, quitar o alternar clases CSS.

Ejemplo:

```javascript
element.classList.toggle("abierto");
```

## `DOMContentLoaded`

Ejecuta código cuando el HTML ya fue cargado.

## `innerHTML`

Permite generar contenido HTML dinámicamente.

## Template literals

El proyecto usa:

```javascript
`Texto ${variable}`
```

para construir HTML y mensajes dinámicos.

---

# Idea general de la arquitectura

Aunque es un proyecto frontend, se separan las responsabilidades:

```text
DATOS
productos-data.js
usuarios-data.js
regiones-comunas.js

VALIDACIÓN
validaciones.js

AUTENTICACIÓN
auth.js

INTERFAZ COMÚN
header.js

TIENDA
catalogo.js
detalle-producto.js
carrito.js
login.js
registro.js
contacto.js

ADMINISTRACIÓN
admin-productos.js
admin-producto-form.js
admin-usuarios.js
admin-usuario-form.js
admin-ordenes.js
```

Esta separación hace que sea más fácil localizar un problema y modificar una funcionalidad sin tener que editar todo el proyecto.
