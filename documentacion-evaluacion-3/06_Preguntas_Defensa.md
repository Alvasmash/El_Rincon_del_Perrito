# 06. Preguntas y Respuestas para la Defensa

## 1. ¿Cómo está dividido tu proyecto y qué tecnología usa cada parte?
El proyecto está separado en dos carpetas dentro del repositorio:
- En `frontend/` está la interfaz web construida con **React 18**, **Vite**, **Bootstrap 5** y **Axios** para las peticiones HTTP, además de pruebas con **Jasmine y Karma**.
- En `backend/` está la API REST construida con **Java 21**, **Spring Boot 4.0.3**, **Maven**, **Spring Data JPA**, **Spring Security + JWT** y pruebas con **JUnit 5 y Mockito**.
- Los datos se guardan en una base de datos **MySQL 8.4** administrada con **Docker**.

## 2. ¿Cómo se comunica el frontend con el backend?
Se comunican mediante peticiones HTTP a una API REST en formato JSON. En `frontend/src/api/apiClient.js` configuramos **Axios** apuntando a `http://localhost:8080/api`. Las funciones de `frontend/src/data/db.js` y `AuthContext.jsx` hacen llamadas `GET`, `POST`, `PUT` y `DELETE` hacia los controladores de Spring Boot (`/api/products`, `/api/categories`, `/api/auth/login`, `/api/orders`, `/api/users`, `/api/contact`).

## 3. ¿Cómo funciona la seguridad y el JWT en tu aplicación?
Cuando un usuario inicia sesión en `Login.jsx`, el frontend envía `{ correo, clave }` a `POST /api/auth/login`. En el backend, `AuthService` compara la contraseña con la clave encriptada en MySQL usando `BCryptPasswordEncoder`. Si es correcta, `JwtService` genera un token firmado con los datos del usuario y su rol. El frontend guarda ese token en `localStorage` (`rincon_perrito_token`) y un interceptor de Axios lo agrega en la cabecera `Authorization: Bearer <token>` de todas las peticiones. En cada solicitud, `JwtAuthenticationFilter` valida el token y `SecurityConfig` decide si el rol (`Administrador`, `Vendedor` o `Cliente`) tiene permiso para ese endpoint.

## 4. ¿Qué es CORS y cómo lo resolviste?
CORS es una medida de seguridad del navegador que bloquea peticiones entre orígenes o puertos distintos. Como el frontend corre en `http://localhost:3000` y el backend en `http://localhost:8080`, configuré un bean `CorsConfigurationSource` en `SecurityConfig.java` permitiendo esos orígenes, los métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`) y la cabecera `Authorization`.

## 5. ¿Por qué usaste Docker y qué hace tu `docker-compose.yml`?
Usamos Docker para empaquetar y ejecutar el entorno de forma ordenada sin depender de instalaciones manuales en cada computador. En `docker-compose.yml` hay dos servicios: `mysql` (con la imagen `mysql:8.4` y un volumen `mysql_data` para no perder los datos al apagar el contenedor) y `backend` (construido con `backend/Dockerfile`, que espera a que MySQL pase su `healthcheck` antes de iniciar).

## 6. ¿Por qué MySQL en Docker usa el puerto `3307:3306`?
Dentro de la red de Docker (`rincon-network`), el backend se conecta al contenedor `mysql` por el puerto interno `3306`. Sin embargo, en mi computador Windows el puerto `3306` ya estaba ocupado por otra instancia local de MySQL, así que mapeamos el puerto externo a `3307` (`3307:3306`) para poder conectarnos desde IntelliJ IDEA sin conflictos ni errores de puerto ocupado.

## 7. ¿Qué pasa cuando el usuario confirma una compra en el Checkout?
1. `Checkout.jsx` valida los datos del formulario y llama a `createOrder(orderData)` en `db.js`.
2. Axios envía un `POST /api/orders` con los datos del cliente, la dirección, los ítems del carrito y el total.
3. En el backend, `OrderController` pasa la solicitud a `OrderService.create()`, que tiene la anotación `@Transactional`.
4. `OrderService` busca cada producto en MySQL, verifica que alcance el stock, descuenta la cantidad comprada, guarda la orden en `orders` y sus ítems en `order_items`.
5. Si algún producto no tiene stock suficiente, lanza un error HTTP 400, la transacción se revierte y el frontend muestra el mensaje de error sin vaciar el carrito.

## 8. ¿Qué diferencia hay entre las pruebas del frontend y las del backend?
En el frontend probamos componentes visuales, renderizado condicional, props, estados y eventos de clic usando **Jasmine y Karma** (`npm test`, 15 pruebas). En el backend probamos la lógica de negocio de los servicios (`AuthService`, `ProductService`, `CategoryService`, `OrderService`, `UserService`) usando **JUnit 5 y Mockito** (`mvn test`, 12 pruebas), simulando los repositorios para no depender de una base de datos real durante las pruebas unitarias.

## 9. ¿Cómo verificas que una petición realmente llegó al backend?
Abriendo las herramientas de desarrollador del navegador (**F12**) en la pestaña **Network** (filtro Fetch/XHR) para revisar la URL, el método HTTP, el código de respuesta (`200`, `201`, `401`, `403`, etc.) y el JSON devuelto; y mirando la consola de IntelliJ IDEA o los logs de Docker (`docker logs rincon-perrito-backend`) donde Hibernate registra las consultas SQL ejecutadas en MySQL.
