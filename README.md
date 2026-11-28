# El Rincón del Perrito — Frontend

Aquí está la página web de la tienda (**React 18 + Vite + Bootstrap 5 + Axios**).
Ruta del proyecto: `C:\Users\zente\OneDrive\Escritorio\Frontend\El_Rincon_del_Perrito`

---

## Antes de empezar: qué tener abierto

1. **Docker Desktop** corriendo (**Engine running**).
2. **El Backend prendido** desde la carpeta `El_Rincon_del_Perrito_Backend` (por Docker o por IntelliJ IDEA).
   - Comprueba primero en tu navegador que `http://localhost:8080` responda `"Backend activo"`.
3. **Visual Studio Code** abierto en esta carpeta (`El_Rincon_del_Perrito`).
4. **Navegador** (Chrome o Edge).

---

## Cómo prender el Frontend paso a paso

1. Abre la terminal integrada de **Visual Studio Code** (`Ctrl + ñ`).
2. *(Solo la primera vez si no existe la carpeta `node_modules`)* instala las librerías:
   ```powershell
   npm.cmd install
   ```
3. Prende la tienda:
   ```powershell
   npm.cmd run dev
   ```
4. Se abrirá automáticamente tu navegador en:
   `http://localhost:3000`

*(Nota: en PowerShell de Windows usa `npm.cmd` por si bloquea `npm`).*

---

## Qué abrir y probar cuando todo esté corriendo

1. **Tienda online (Frontend):** `http://localhost:3000`
2. **Swagger del Backend (todas las consultas API):** `http://localhost:8080/swagger-ui/index.html`
3. **Ver la comunicación en vivo (`F12`):**
   - Presiona **F12** en la página -> pestaña **Network** -> filtro **Fetch/XHR**.
   - Recarga la página o inicia sesión y verás las peticiones yendo a `http://localhost:8080/api/...`.

### Cuentas de prueba y cupón

- **Admin:** `admin@duocuc.cl` / `admin123`
- **Vendedor:** `vendedor@duocuc.cl` / `vendedor123`
- **Cliente:** `cliente@gmail.com` / `cliente123`
- **Cupón de descuento:** `PERRITO10` (10% en el carrito)

---

## Cómo correr las pruebas del frontend

En la terminal de Visual Studio Code dentro de esta carpeta:

```powershell
npm.cmd test
```

*(Deben pasar las 15 pruebas de Jasmine + Karma).*

---

## Cómo apagar todo cuando termines

1. En la terminal de **Visual Studio Code**, presiona **`Ctrl + C`** (y confirma con `S` si pregunta) para apagar el frontend.
2. En **IntelliJ IDEA**, presiona el botón rojo **Stop** (si el backend corría ahí).
3. En la carpeta del backend (`El_Rincon_del_Perrito_Backend`), ejecuta:
   ```powershell
   docker compose down
   ```
4. Ya puedes cerrar Visual Studio Code, IntelliJ IDEA y Docker Desktop.
