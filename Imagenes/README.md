# Carpeta `Imagenes`

Esta carpeta contiene los recursos gráficos utilizados por El Rincón del Perrito.

Las imágenes son cargadas desde HTML y JavaScript mediante rutas relativas como:

```html
<img src="../Imagenes/pata_perrito.png">
```

o:

```javascript
"../Imagenes/" + producto.imagen
```

---

# 1. `pata_perrito.png`

Es el recurso principal de identidad visual.

Se utiliza como:

- Logo del encabezado.
- Favicon.
- Logo del panel administrativo.
- Imagen asociada a formularios o elementos del sitio.

En HTML se utiliza con `alt` para describir la imagen:

```html
<img
    src="../Imagenes/pata_perrito.png"
    alt="Logo El Rincón del Perrito"
>
```

El atributo `alt` ayuda a la accesibilidad y también sirve como texto alternativo si la imagen no puede cargarse.

---

# 2. `banner.jpg`

Es la imagen principal del Home.

Se muestra dentro de:

```html
<section class="hero-banner">
```

El CSS utiliza:

```css
object-fit: cover;
```

para adaptar la imagen al espacio del banner sin deformarla.

---

# 3. `bannerv2.jpg`

Se utiliza principalmente en el contenido de blogs.

Aparece como imagen destacada del artículo relacionado con el descanso de los perros.

---

# 4. Imágenes de camas

```text
cama.png
camav2.png
camav3.png
camav4.png
```

Representan diferentes productos de la categoría Camas.

El nombre del archivo se almacena en cada objeto del catálogo:

```javascript
imagen: "cama.png"
```

Después JavaScript utiliza ese valor para construir la ruta de la imagen.

---

# 5. Imágenes de juguetes

```text
juguetes.png
juguetesv2.png
juguetesv3.png
juguetesv4.png
```

Se utilizan para productos de la categoría Juguetes.

También pueden utilizarse en el contenido de blogs, por ejemplo para ilustrar el artículo sobre estimulación mental.

---

# 6. Imágenes de collares

```text
collar.png
collarv2.png
collarv3.png
collarv4.png
```

Representan productos de la categoría Collares.

---

# Cómo se relacionan las imágenes con los productos

El catálogo no necesita guardar una ruta completa.

Guarda solamente el nombre:

```javascript
{
    id: "cama-madera",
    nombre: "Cama de Madera para Perrito",
    imagen: "cama.png"
}
```

Luego el código construye la ruta:

```javascript
../Imagenes/cama.png
```

Esto separa los datos del producto de la ubicación física de los archivos.

---

# Imágenes en el formulario administrativo

El formulario de productos permite seleccionar una imagen.

El `<select>` contiene opciones como:

```text
cama.png
camav2.png
camav3.png
...
```

Cuando se guarda el producto, se almacena el nombre del archivo dentro del objeto.

Después el catálogo y el detalle del producto utilizan ese mismo valor.

---

# Recomendaciones para agregar una imagen nueva

1. Copiar la imagen a `Imagenes`.
2. Usar un nombre simple, por ejemplo:
   ```text
   collarv5.png
   ```
3. Agregarla al selector del formulario administrativo si se quiere seleccionar desde el panel.
4. Guardar ese nombre en el objeto producto.
5. Verificar que la ruta sea correcta.

No es necesario modificar CSS solamente por agregar una nueva imagen si mantiene una proporción razonable, porque las tarjetas ya utilizan `object-fit`.

---

# Relación con JavaScript

El archivo `productos-data.js` guarda el nombre de la imagen.

Después:

```text
productos-data.js
        ↓
producto.imagen
        ↓
catalogo.js / detalle-producto.js / carrito.js
        ↓
../Imagenes/nombre-imagen
        ↓
HTML <img>
```

Así las mismas imágenes pueden reutilizarse en diferentes partes del proyecto.
