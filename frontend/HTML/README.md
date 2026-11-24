# Carpeta `HTML`

Esta carpeta contiene las páginas públicas de la tienda.

El HTML representa la estructura de la aplicación y utiliza etiquetas semánticas como:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

La lógica dinámica no está escrita directamente en cada página: se delega a JavaScript.

---

# Estructura general de una página

La mayoría de las páginas siguen este patrón:

```text
DOCTYPE
└── html
    ├── head
    │   ├── meta
    │   ├── title
    │   ├── fuentes
    │   ├── CSS
    │   └── favicon
    │
    └── body
        ├── header
        ├── main
        └── footer
            └── scripts
```

Esto permite mantener una estructura consistente.

---

# 1. `index.html`

Es la página principal.

### `<head>`

Define:

- Idioma español.
- Codificación UTF-8.
- Viewport para responsive.
- Título.
- Google Fonts.
- CSS globales.
- Favicon.

### `<header>`

Contiene:

- Barra superior.
- Logo.
- Nombre.
- Menú.
- Inicio de sesión.
- Registro.
- Carrito.
- Botón hamburguesa.

El elemento:

```html
<span id="contador-carrito">0</span>
```

es actualizado por JavaScript.

### Banner

```html
<section class="hero-banner">
```

presenta la imagen principal y un botón hacia productos.

### Productos destacados

El elemento:

```html
<div id="grid-productos" data-limite="8"></div>
```

está vacío inicialmente.

JavaScript lo rellena con las tarjetas de productos.

### Beneficios

Muestra tres bloques:

- Envíos.
- Materiales.
- Pago.

### Scripts

Carga los datos y comportamientos en este orden:

```text
productos-data.js
usuarios-data.js
auth.js
header.js
catalogo.js
carrito.js
```

---

# 2. `productos.html`

Es el catálogo completo.

Tiene:

```html
<nav class="filtros-categoria">
```

con enlaces para:

- Todos.
- Camas.
- Juguetes.
- Collares.

Cada categoría utiliza un parámetro en la URL:

```text
?categoria=camas
```

JavaScript lee ese parámetro y filtra los productos.

El elemento:

```html
<div id="grid-productos"></div>
```

es el contenedor donde se generan las tarjetas.

---

# 3. `detalle-producto.html`

No contiene toda la información del producto escrita directamente.

Tiene un contenedor:

```html
<div id="vista-detalle"></div>
```

JavaScript busca el producto solicitado y genera la ficha.

Esto permite reutilizar una sola página para todos los productos.

También existe:

```html
<nav id="miga-pan-dinamica">
```

que funciona como breadcrumb:

```text
Home > Productos > Producto
```

---

# 4. `carrito.html`

La página contiene el espacio donde JavaScript genera el carrito.

El contenido dinámico se inserta en:

```html
<div id="contenedor-carrito-dinamico"></div>
```

JavaScript agrega:

- Productos.
- Cantidades.
- Subtotal.
- Cupón.
- Descuento.
- Total.
- Botón de pago.

---

# 5. `nosotros.html`

Explica la empresa y cumple la sección informativa.

Incluye:

### Presentación

```html
<section class="hero-nosotros">
```

### Misión y visión

Se utilizan elementos:

```html
<article class="tarjeta-mision">
```

### Equipo

```html
<section class="seccion-equipo">
```

Muestra tarjetas con los roles relacionados al desarrollo.

Esta página es principalmente informativa y no necesita lógica compleja de JavaScript.

---

# 6. `blogs.html`

Es el listado de artículos.

Cada artículo se representa con:

```html
<article class="tarjeta-blog">
```

Incluye:

- Imagen.
- Categoría.
- Título.
- Resumen.
- Botón.

Los botones llevan a:

```text
blog-detalle-1.html
blog-detalle-2.html
```

---

# 7. `blog-detalle-1.html`

Es la página completa del primer artículo.

Utiliza:

```html
<article class="articulo-detalle">
```

y contiene:

- Breadcrumb.
- Título.
- Fecha.
- Autor.
- Categoría.
- Imagen destacada.
- Párrafos.
- Subtítulos.
- Listas.
- Enlace al catálogo.

Es contenido estático: no necesita un JavaScript específico del artículo.

---

# 8. `blog-detalle-2.html`

Funciona de forma equivalente al primer detalle, pero contiene el segundo artículo.

La estructura mantiene:

```text
Header
↓
Breadcrumb
↓
Artículo
↓
Contenido
↓
Footer
```

Esto facilita que ambos artículos tengan el mismo diseño.

---

# 9. `contacto.html`

Contiene el formulario de contacto.

Los campos principales son:

- Nombre.
- Correo.
- Comentario.

Cada campo tiene un elemento destinado a mostrar errores.

Ejemplo conceptual:

```html
<input ...>
<span class="mensaje-error" ...></span>
```

JavaScript actualiza esos elementos en tiempo real.

También existe un contador de caracteres para el comentario.

---

# 10. `login.html`

Contiene el formulario de inicio de sesión.

Campos:

```text
Correo
Contraseña
```

JavaScript:

1. Valida los datos.
2. Busca el usuario.
3. Compara la contraseña.
4. Crea la sesión.
5. Redirige según el rol.

Administrador y Vendedor:

```text
→ admin/index.html
```

Cliente:

```text
→ index.html
```

---

# 11. `registro.html`

Es el formulario para registrar clientes.

Incluye:

- RUN.
- Nombre.
- Apellidos.
- Correo.
- Contraseña.
- Confirmación.
- Región.
- Comuna.
- Dirección.
- Teléfono.
- Fecha de nacimiento.

La región y comuna no están escritas manualmente como una lista fija del HTML. JavaScript las carga desde `regiones-comunas.js`.

Cuando el registro es válido:

```javascript
guardarOActualizarUsuario(nuevoUsuario);
```

guarda el usuario y luego:

```javascript
iniciarSesionUsuario(nuevoUsuario);
```

inicia automáticamente la sesión.

---

# Conceptos HTML utilizados

## Atributos `id`

Se usan para que JavaScript encuentre elementos concretos:

```html
id="grid-productos"
id="form-login"
id="contador-carrito"
```

## Clases

Las clases conectan HTML con CSS:

```html
class="tarjeta-producto"
```

y también permiten que JavaScript seleccione grupos de elementos.

## `data-*`

Por ejemplo:

```html
data-categoria="camas"
```

permite guardar información personalizada en el elemento.

Otro ejemplo:

```html
data-agregar="cama-madera"
```

indica qué producto debe agregarse al carrito.

## Parámetros de URL

La página de productos utiliza:

```text
productos.html?categoria=camas
```

y la página de detalle utiliza un identificador de producto en la URL.

JavaScript lee esos valores para saber qué información mostrar.

---

# Relación entre HTML, CSS y JS

```text
HTML
↓
estructura de la página

CSS
↓
apariencia y responsive

JavaScript
↓
datos, validaciones e interacción
```

Ejemplo:

```text
productos.html
    ↓
<div id="grid-productos">
    ↓
catalogo.js
    ↓
obtenerProductos()
    ↓
crear tarjetas HTML
    ↓
productos.css
    ↓
tarjetas visuales
```
