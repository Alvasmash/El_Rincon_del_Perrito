# Carpeta `css`

Esta carpeta contiene todos los estilos visuales del proyecto.

El CSS está separado por responsabilidades para evitar tener un único archivo gigante. Cada archivo se concentra en una parte determinada del sistema.

Actualmente la carpeta está organizada en **12 archivos CSS**.

---

# 1. `variables.css`

Es la base visual del proyecto.

Dentro de:

```css
:root {
    --celeste: #4FB8DD;
    --azul-boton: #167094;
    --tinta: #0F3F52;
}
```

se definen variables CSS.

### ¿Por qué se usan variables?

En vez de repetir:

```css
color: #167094;
```

muchas veces, se puede escribir:

```css
color: var(--azul-boton);
```

Si después se cambia el color de la variable, todos los elementos que la utilizan cambian automáticamente.

### Variables principales

- Colores de fondo.
- Colores principales.
- Colores de botones.
- Colores de texto.
- Estados de error, éxito, alerta e información.
- Fuentes.
- Radios de borde.
- Ancho máximo.
- Sombras.
- Transiciones.

También se definen:

```css
--fuente-titulos
--fuente-texto
--radio
--radio-chico
--radio-redondo
--ancho-max
--sombra
--sombra-fuerte
--transicion
```

---

# 2. `general.css`

Contiene los estilos generales que comparten prácticamente todas las páginas.

### Reset

El selector:

```css
*,
*::before,
*::after
```

elimina márgenes y espacios predeterminados del navegador y utiliza:

```css
box-sizing: border-box;
```

Esto facilita controlar el tamaño real de los elementos.

### `body`

Define:

- Fondo.
- Color de texto.
- Fuente.
- Tamaño.
- Alto mínimo.
- Distribución vertical.

El `body` utiliza:

```css
display: flex;
flex-direction: column;
```

y `main` usa:

```css
flex: 1;
```

para ayudar a mantener el footer abajo cuando hay poco contenido.

### `.contenedor`

Es el contenedor central reutilizado por las páginas:

```css
.contenedor {
    max-width: var(--ancho-max);
    margin: 0 auto;
}
```

Esto mantiene el contenido centrado y evita que se extienda demasiado en pantallas grandes.

### Botones

Define clases como:

```text
.boton
.boton-secundario
.boton-calido
.boton-peligro
```

También existen estados:

```text
:hover
:disabled
```

### Badges

Se utilizan:

```text
.badge
.badge-exito
.badge-alerta
.badge-error
.badge-info
```

para mostrar estados visuales.

### Toast

`.aviso-toast` es la caja de notificación que aparece temporalmente cuando JavaScript ejecuta:

```javascript
mostrarToast(...)
```

### Accesibilidad

Se utiliza:

```css
:focus-visible
```

para mostrar un contorno cuando un botón, enlace o campo recibe foco mediante teclado.

---

# 3. `header.css`

Controla el encabezado y menú principal.

### `.encabezado`

Es:

```css
position: sticky;
top: 0;
```

por lo que el encabezado permanece visible mientras se desplaza la página.

### Elementos

- Barra superior.
- Logo.
- Nombre de la tienda.
- Navegación.
- Carrito.
- Usuario.
- Menú hamburguesa.

También utiliza:

```css
backdrop-filter
```

para generar el efecto visual translúcido.

---

# 4. `footer.css`

Controla el pie de página.

Organiza:

- Descripción de la tienda.
- Navegación.
- Categorías.
- Newsletter.
- Pie inferior.

Utiliza CSS Grid para organizar las columnas.

---

# 5. `productos.css`

Es uno de los archivos principales del catálogo.

### Banner

Controla:

```text
.hero-banner
.hero-texto
```

El banner utiliza una imagen grande y coloca el texto encima mediante:

```css
position: absolute;
```

### Filtros

Controla:

```text
.filtros-categoria
.filtro-btn
.filtro-btn.activo
```

El estado `.activo` indica visualmente la categoría seleccionada.

### Grid

```css
.grid-productos {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
```

Esto crea cuatro columnas en escritorio.

### Tarjetas

`.tarjeta-producto` controla cada producto.

Incluye:

- Imagen.
- Categoría.
- Nombre.
- Descripción.
- Precio.
- Botón.
- Estado sin stock.

Al pasar el mouse:

```css
transform: translateY(-4px);
```

la tarjeta se eleva visualmente.

---

# 6. `detalle-producto.css`

Controla la ficha individual del producto.

### Estructura

La ficha usa:

```css
.detalle-grid
```

para separar:

```text
Galería de imágenes | Información del producto
```

### Galería

Incluye:

```text
.foto-principal
.galeria-thumbs
.thumb-item
```

Los thumbnails pueden marcarse como:

```text
.activo
```

### Información

Controla:

- Categoría.
- Nombre.
- Código.
- Precio.
- Descripción.
- Características.
- Stock crítico.
- Cantidad.
- Botón de compra.

---

# 7. `carrito.css`

Controla la página del carrito.

La estructura principal utiliza:

```css
.contenedor-carrito {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
}
```

Esto deja:

```text
Productos del carrito | Resumen
```

### `.item-carrito`

Representa cada producto agregado.

Tiene columnas para:

- Imagen.
- Información.
- Precio.
- Cantidad.
- Eliminar.

### Resumen

`.resumen-compra` muestra:

- Subtotal.
- Descuento.
- Total.
- Cupón.
- Botón pagar.

También contiene el diseño del estado de carrito vacío.

---

# 8. `formularios.css`

Se utiliza en:

- Login.
- Registro.
- Contacto.
- Formularios administrativos.

### `.tarjeta-formulario`

Crea la tarjeta blanca donde está el formulario.

### `.form-grupo`

Agrupa:

```text
label
input/select/textarea
mensaje de error
sugerencia
```

### Estados

Cuando JavaScript detecta un error se agrega:

```text
campo-invalido
```

Cuando el dato es correcto:

```text
campo-valido
```

Por eso la validación JavaScript también produce cambios visuales.

---

# 9. `blogs.css`

Controla:

- Lista de blogs.
- Tarjetas de artículos.
- Imagen.
- Etiqueta.
- Título.
- Descripción.
- Botón.

`.tarjeta-blog` utiliza Grid para colocar imagen y contenido lado a lado.

Las páginas de detalle reutilizan las clases relacionadas con los artículos.

---

# 10. `nosotros.css`

Controla la página Nosotros.

Incluye:

```text
.hero-nosotros
.seccion-mision-vision
.tarjeta-mision
.seccion-equipo
.grid-equipo
.tarjeta-miembro
.avatar-desarrollador
```

El equipo se organiza en tres columnas en escritorio.

Las tarjetas tienen efectos `hover`.

---

# 11. `admin.css`

Contiene el diseño exclusivo del panel administrativo.

Controla:

- Sidebar.
- Topbar.
- Dashboard.
- KPI.
- Tablas.
- Botones de acciones.
- Alertas.
- Formularios y elementos propios del panel.

El layout administrativo separa visualmente:

```text
Sidebar | Contenido
```

Esto permite que el administrador tenga una navegación permanente.

---

# 12. `responsive.css`

Contiene las reglas para adaptar el sitio a diferentes tamaños de pantalla.

Se utilizan media queries como:

```css
@media (max-width: ...)
```

para modificar:

- Número de columnas.
- Tamaños.
- Espaciados.
- Menú.
- Formularios.
- Tablas.
- Carrito.
- Detalles de productos.

La idea es que una estructura como:

```text
4 productos por fila
```

pueda transformarse en menos columnas en tablets y celulares.

---

# Cómo trabajan juntos los CSS

El flujo normalmente es:

```text
variables.css
      ↓
general.css
      ↓
header.css / footer.css
      ↓
CSS específico de la página
      ↓
responsive.css
```

Por ejemplo, `productos.html` carga:

```html
variables.css
general.css
header.css
footer.css
productos.css
responsive.css
```

De esta forma:

- `variables.css` define la identidad visual.
- `general.css` define reglas comunes.
- `header.css` define el encabezado.
- `footer.css` define el pie.
- `productos.css` define el catálogo.
- `responsive.css` adapta todo a pantallas pequeñas.
