# 05. Guía de Demostración para la Evaluación 3

Esta guía resume el orden exacto para presentar la aplicación funcionando frente al profesor y comprobar en vivo que el frontend se comunica con el backend y la base de datos MySQL.

## Parte 1: Preparar Docker y Backend

1. **Abrir Docker Desktop** y mostrar al profesor que está activo (`Engine running`).
2. **Levantar los servicios con Docker** (en la carpeta `El_Rincon_del_Perrito_Backend`):
   ```powershell
   docker compose up -d
   docker ps
   ```
   Muestra que están arriba los contenedores `rincon-perrito-mysql` (MySQL 8.4) y `rincon-perrito-backend` (Spring Boot en el puerto `8080`).
   *(Si el profesor pide ejecutar el backend desde IntelliJ IDEA, detén solo el contenedor backend con `docker compose stop backend`, deja `rincon-perrito-mysql` corriendo, y dale Play a `RinconPerritoBackendApplication` en IntelliJ).*
3. **Comprobar que el backend responde y mostrar Swagger:**
   - Abre en el navegador `http://localhost:8080/swagger-ui/index.html` para mostrar todos los endpoints documentados en Swagger.
   - También puedes abrir `http://localhost:8080/api/products` para ver el JSON directo con los 12 productos que vienen de MySQL.

## Parte 2: Iniciar el Frontend en Visual Studio Code

1. Abre la carpeta `El_Rincon_del_Perrito` en **Visual Studio Code**.
2. En la terminal integrada ejecuta:
   ```powershell
   npm.cmd run dev
   ```
3. Se abrirá el navegador en `http://localhost:3000`.

## Parte 3: Demostración con DevTools (F12 -> Pestaña Network)

Antes de probar las pantallas, presiona **F12** en el navegador, entra a la pestaña **Network** (Red) y selecciona el filtro **Fetch/XHR**. Así el profesor podrá ver cada petición HTTP en vivo.

### 1. Carga del catálogo desde MySQL
- Recarga la página en `http://localhost:3000`.
- En **Network** aparecerán `GET http://localhost:8080/api/products` y `GET http://localhost:8080/api/categories` con código **200 OK**.
- Haz clic en una de ellas y muestra la pestaña **Response** con los datos reales que llegaron desde Spring Boot.

### 2. Inicio de sesión con JWT
- Haz clic en **Iniciar Sesión**.
- Ingresa con la cuenta de administrador:
  - Correo: `admin@duocuc.cl`
  - Clave: `admin123`
- En **Network** se verá `POST http://localhost:8080/api/auth/login` con código **200 OK**.
- En la pestaña **Response** muestra que el backend devolvió el `token` JWT y el objeto `user` con rol `Administrador`.

### 3. Acción protegida en el Panel Administrativo
- Entra a **Panel Administrativo** -> **Gestión de Productos** (o **Gestión de Usuarios**).
- En **Network** haz clic en `GET http://localhost:8080/api/users` o `POST /api/products` al crear un producto nuevo.
- Abre la pestaña **Headers** -> **Request Headers** y señala la línea `Authorization: Bearer eyJ...` para demostrar cómo Axios envía el token JWT en cada solicitud protegida.
- Recarga la página (`F5`) para demostrar que el producto creado o editado sigue ahí porque se guardó en MySQL y no en memoria temporal.

### 4. Flujo de compra real y descuento de stock
- Agrega un producto al carrito (por ejemplo, `Cama de Madera para Perrito`).
- En el carrito puedes aplicar el cupón `PERRITO10` (10% de descuento).
- Ve a **Comprar ahora**, completa los datos de despacho y confirma el pago.
- En **Network** se verá `POST http://localhost:8080/api/orders` con estado **201 Created**.
- Luego vuelve al **Panel Administrativo -> Historial Pedidos** para mostrar la orden guardada y verifica que el stock del producto comprado bajó en el inventario de MySQL.

## Parte 4: Pruebas automatizadas (si el profesor las pide)

- **Backend (JUnit 5 + Mockito):** dentro de `backend/`, ejecutar `mvn test` (12 pruebas aprobadas).
- **Frontend (Jasmine + Karma):** dentro de `frontend/`, ejecutar `npm.cmd test` (15 pruebas aprobadas).
