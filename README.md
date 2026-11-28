# El Rincón del Perrito — Frontend (React + Vite + Bootstrap + Axios)

Este repositorio contiene únicamente el **frontend** de la tienda online **El Rincón del Perrito**, pensado para abrirse directo en **Visual Studio Code** y conectarse con el backend (`El_Rincon_del_Perrito_Backend`) en `http://localhost:8080/api`.

---

## 1. Qué necesitas antes de prender el Frontend

1. Tener descargado y prendido el backend desde su propio repositorio (`El_Rincon_del_Perrito_Backend`) junto con **Docker Desktop** (MySQL 8.4).
   - El backend debe estar respondiendo en `http://localhost:8080/api/products`.
   - También puedes revisar todas sus consultas en Swagger: `http://localhost:8080/swagger-ui/index.html`.
2. Tener instalado **Node.js** y **Visual Studio Code**.

---

## 2. Qué aplicaciones tener abiertas

1. **Docker Desktop** (con MySQL y/o el backend corriendo).
2. **IntelliJ IDEA** (con la carpeta `El_Rincon_del_Perrito_Backend` abierta, si corres el backend desde IntelliJ).
3. **Visual Studio Code** con esta carpeta abierta:
   `C:\Users\zente\OneDrive\Escritorio\Rincon_Perrito\El_Rincon_del_Perrito`
4. **Navegador web** (Chrome o Edge).

---

## 3. Paso a paso para prender el Frontend en Visual Studio Code

1. Abre esta carpeta (`El_Rincon_del_Perrito`) en **Visual Studio Code**.
2. Abre la terminal integrada (`Ctrl + ñ` o **Terminal -> Nuevo terminal**).
3. Si es la primera vez que corres el proyecto en este PC (no existe la carpeta `node_modules`), instala las dependencias:
   ```powershell
   npm.cmd install
   ```
   *(En Windows PowerShell usa `npm.cmd` por si está bloqueada la ejecución de `npm.ps1`).*
4. Inicia el servidor de desarrollo:
   ```powershell
   npm.cmd run dev
   ```
   *(También funciona `npm.cmd start`).*
5. El navegador se abrirá automáticamente en:
   `http://localhost:3000`

---

## 4. Qué abrir cuando todo esté corriendo

1. **Tienda online (Frontend):** `http://localhost:3000`
2. **Swagger del Backend (todas las consultas API):** `http://localhost:8080/swagger-ui/index.html`
3. **Ver peticiones en vivo (`F12`):**
   - Presiona **F12** en el navegador -> pestaña **Network** -> filtro **Fetch/XHR**.
   - Al cargar la tienda o iniciar sesión verás las llamadas hacia `http://localhost:8080/api/...`.

### Cuentas de prueba y cupón

| Rol | Correo | Contraseña | Acceso |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@duocuc.cl` | `admin123` | Todo: Dashboard, Productos, Categorías, Usuarios y Pedidos |
| **Vendedor** | `vendedor@duocuc.cl` | `vendedor123` | Dashboard, Productos, Categorías y Pedidos |
| **Cliente** | `cliente@gmail.com` | `cliente123` | Catálogo, carrito, cupón `PERRITO10` y compras |

- **Cupón de descuento:** `PERRITO10` (10% de descuento en el carrito).

---

## 5. Comandos para pruebas, build y apagado

- **Ejecutar pruebas unitarias (Jasmine + Karma — 15 pruebas):**
  ```powershell
  npm.cmd test
  ```
- **Compilar versión de producción:**
  ```powershell
  npm.cmd run build
  ```
- **Detener el frontend:** presiona `Ctrl + C` en la terminal de VS Code.

---

## 6. Documentación adicional

En la carpeta `documentacion-evaluacion-3/` encontrarás las guías de arquitectura, comunicación Axios <-> Spring Boot, ejecución con Docker, demostración y preguntas de defensa.
