# El Rincón del Perrito — Proyecto Full Stack (Evaluación 3)

Guía rápida y paso a paso para prender todo el proyecto desde cero y saber qué abrir, qué comandos escribir y qué revisar en el navegador.

---

## 1. Qué programas necesitas instalados

- **Docker Desktop** (para levantar la base de datos MySQL 8.4 y el backend en contenedores).
- **Java 21 (o superior)** y **Maven** (para compilar/ejecutar el backend o correr pruebas).
- **IntelliJ IDEA** (si vas a ejecutar o mostrar el backend desde el IDE).
- **Node.js y npm** (para el frontend en React).
- **Visual Studio Code** (para abrir y ejecutar el frontend).
- **Navegador web** (Chrome o Edge).

---

## 2. Qué aplicaciones debes tener abiertas

Antes de empezar a tirar comandos, abre estas aplicaciones:

1. **Docker Desktop:** Ábrelo primero y espera hasta que abajo a la izquierda diga **Engine running** en verde.
2. **Visual Studio Code:** Abre aquí la carpeta `frontend/` (`El_Rincon_del_Perrito/frontend`).
3. **IntelliJ IDEA** *(solo si vas a correr el backend desde IntelliJ en vez de hacerlo solo con Docker)*: Abre aquí la carpeta `backend/` (`El_Rincon_del_Perrito/backend`).
4. **Navegador web (Chrome o Edge):** Para ver la tienda funcionando y revisar la pestaña Network con `F12`.

---

## 3. Paso a paso para prender todo (en orden)

### Paso 1: Prender la base de datos MySQL y el Backend

Tienes **dos formas** de prender el backend. Elige la que vayas a usar:

#### Forma A: Prender MySQL + Backend juntos en Docker (la más rápida)

1. Abre una terminal en la carpeta raíz del proyecto:
   `C:\Users\zente\OneDrive\Escritorio\Rincon_Perrito\El_Rincon_del_Perrito`
2. Ejecuta este comando para construir y prender MySQL + Backend:
   ```powershell
   docker compose up -d --build
   ```
3. Comprueba que ambos contenedores estén arriba:
   ```powershell
   docker ps
   ```
   Deberías ver `rincon-perrito-mysql` como `(healthy)` en el puerto `3307` y `rincon-perrito-backend` arriba en el puerto `8080`.

#### Forma B: Prender MySQL en Docker y el Backend desde IntelliJ IDEA

1. Si tenías prendido el contenedor del backend en Docker, apágalo primero para que no ocupe el puerto `8080`:
   ```powershell
   docker compose stop backend
   ```
2. Prende solo el contenedor de MySQL en Docker desde la raíz del proyecto:
   ```powershell
   docker compose up -d mysql
   ```
3. Ve a **IntelliJ IDEA** (con la carpeta `backend/` abierta), espera que cargue Maven y dale clic al botón verde **Run** en la clase `RinconPerritoBackendApplication`.
4. En la consola de IntelliJ debería aparecer `Started RinconPerritoBackendApplication`.

---

### Paso 2: Comprobar que el Backend está respondiendo

Antes de prender el frontend, abre en tu navegador:

- `http://localhost:8080/api/products`

Si todo prendió bien, verás un JSON con los 12 productos cargados desde MySQL.

---

### Paso 3: Prender el Frontend en Visual Studio Code

1. En **Visual Studio Code**, con la carpeta `frontend/` abierta, abre la terminal integrada (`Ctrl + ñ`).
2. Si es la primera vez que corres el proyecto en este PC (no existe `node_modules`), instala las dependencias:
   ```powershell
   npm.cmd install
   ```
   *(En Windows PowerShell usa `npm.cmd` por si PowerShell tiene bloqueado `npm.ps1`).*
3. Prende el servidor del frontend:
   ```powershell
   npm.cmd run dev
   ```
4. Espera un par de segundos y se abrirá automáticamente el navegador en:
   `http://localhost:3000`

---

## 4. Qué abrir y probar una vez que todo esté corriendo

1. **Tienda online (Frontend):** `http://localhost:3000`
2. **API del servidor (Backend):** `http://localhost:8080/api/products`
3. **Herramientas de desarrollador (`F12`):**
   - Abre la pestaña **Network** y filtra por **Fetch/XHR**.
   - Al navegar por el catálogo, iniciar sesión o hacer una compra, verás ahí las peticiones reales hacia `http://localhost:8080/api/...`.

### Cuentas de prueba ya creadas en MySQL

| Rol | Correo | Contraseña | Qué puede hacer |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@duocuc.cl` | `admin123` | Todo: Dashboard, Productos, Categorías, Usuarios y Pedidos |
| **Vendedor** | `vendedor@duocuc.cl` | `vendedor123` | Dashboard, Productos, Categorías y Pedidos |
| **Cliente** | `cliente@gmail.com` | `cliente123` | Ver catálogo, carrito, cupón `PERRITO10` y comprar |

- **Cupón de descuento:** `PERRITO10` (aplica 10% en el carrito).

---

## 5. Comandos para correr las pruebas automatizadas

- **Pruebas del Backend (JUnit 5 + Mockito)** — en la carpeta `backend/`:
  ```powershell
  mvn test
  ```
- **Pruebas del Frontend (Jasmine + Karma)** — en la carpeta `frontend/`:
  ```powershell
  npm.cmd test
  ```

---

## 6. Cómo apagar todo cuando termines

1. En la terminal de **VS Code**, presiona `Ctrl + C` para detener el frontend.
2. Si prendiste el backend desde **IntelliJ IDEA**, presiona el botón rojo **Stop**.
3. En la terminal de la raíz del proyecto, apaga los contenedores de Docker (sin borrar tus datos de MySQL):
   ```powershell
   docker compose down
   ```

---

## 7. Estructura del repositorio

- `frontend/`: Aplicación React 18 + Vite + Bootstrap 5 + Axios + Karma/Jasmine.
- `backend/`: API REST Spring Boot 4.0.3 + Java 21 + MySQL + Spring Security + JWT + JUnit 5/Mockito.
- `docker-compose.yml`: Orquestación de MySQL 8.4 (`3307:3306`) y Backend (`8080:8080`).
- `documentacion-evaluacion-3/`: Documentos completos de arquitectura, comunicación, ejecución, demostración y preguntas de defensa.
