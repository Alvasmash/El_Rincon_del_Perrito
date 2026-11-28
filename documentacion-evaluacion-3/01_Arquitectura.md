# 01. Arquitectura del Proyecto: El Rincón del Perrito

Mi proyecto es una aplicación web Full Stack para la tienda online de accesorios para perros **"El Rincón del Perrito"**. Está dividida en dos proyectos que trabajan juntos dentro del mismo repositorio: el **frontend** (lo que ve y usa el usuario en el navegador) y el **backend** (el servidor que guarda los datos en MySQL y valida la seguridad).

## 1. Estructura general en dos repositorios

El proyecto está separado en **dos repositorios independientes** dentro de la carpeta `Rincon_Perrito`:

- `El_Rincon_del_Perrito/` (Frontend): Aplicación web en React 18 con Vite, Bootstrap 5, Axios y pruebas con Jasmine y Karma. Se abre en **Visual Studio Code**.
- `El_Rincon_del_Perrito_Backend/` (Backend): API REST en Java 21 con Spring Boot 4.0.3, Maven, Spring Data JPA, Spring Security + JWT, Swagger (`springdoc-openapi`), `Dockerfile`, `docker-compose.yml` y pruebas con JUnit 5 y Mockito. Se abre en **IntelliJ IDEA**.
- `documentacion-evaluacion-3/`: Documentos de apoyo para la Evaluación 3 dentro del repositorio del frontend.

## 2. Qué hace el Frontend (`El_Rincon_del_Perrito/`)

El frontend se encarga de toda la interfaz visual y la interacción con el usuario en `http://localhost:3000`:

- Muestra el catálogo de productos (`Home.jsx`, `Products.jsx`, `Offers.jsx`, `Categories.jsx`, `ProductDetail.jsx`).
- Administra el carrito de compras y el cupón `PERRITO10` desde `src/context/CartContext.jsx`.
- Maneja la sesión del usuario y el token JWT en `src/context/AuthContext.jsx`.
- Valida formularios en el navegador (RUN chileno con Módulo 11, correos permitidos y contraseñas) desde `src/data/validations.js` y carga las 16 regiones y comunas desde `src/data/chileData.js`.
- Ofrece un panel administrativo (`src/pages/admin/`) para que el Administrador o Vendedor gestione productos, categorías, pedidos y usuarios.
- Se comunica con el backend mediante **Axios** configurado en `src/api/apiClient.js` y `src/data/db.js`.

## 3. Qué hace el Backend (`El_Rincon_del_Perrito_Backend/`)

El backend corre en `http://localhost:8080` y se encarga de la lógica del negocio, la seguridad y la base de datos:

- **Controladores (`controller/`):** Reciben las peticiones HTTP del frontend (`AuthController`, `ProductController`, `CategoryController`, `UserController`, `OrderController`, `ContactController`) y devuelven respuestas JSON.
- **Servicios (`service/`):** Aplican la lógica del negocio, por ejemplo encriptar claves con BCrypt en `AuthService`, validar que no se borre una categoría con productos en `CategoryService` o descontar el stock en MySQL cuando se crea un pedido en `OrderService`.
- **Repositorios (`repository/`):** Interfaces de Spring Data JPA que consultan y guardan datos en MySQL sin escribir SQL manual para las operaciones básicas.
- **Entidades (`entity/`):** Representan las tablas de MySQL: `categories`, `products`, `users`, `orders`, `order_items` y `contact_messages`.
- **Seguridad (`security/` y `config/SecurityConfig.java`):** Protege las rutas privadas usando **Spring Security + JWT** y configura **CORS** para aceptar peticiones desde `http://localhost:3000` y `http://localhost:5173`.
- **Carga inicial (`config/DataInitializer.java`):** Al arrancar por primera vez con las tablas vacías, crea las 4 categorías, los 12 productos y los 3 usuarios de prueba (`admin@duocuc.cl`, `vendedor@duocuc.cl`, `cliente@gmail.com`) con sus claves encriptadas.

## 4. Cómo se relacionan todas las partes

El flujo completo funciona así:

```text
Navegador (Usuario)
   │
   ▼  (http://localhost:3000)
Frontend React + Axios (apiClient.js)
   │
   ▼  Petición HTTP + JSON + Header Authorization: Bearer <JWT>
Backend Spring Boot (http://localhost:8080/api/...)
   │
   ▼  Spring Data JPA / Hibernate (JDBC)
Base de datos MySQL 8.4 (rincon_perrito, puerto 3306 interno / 3307 en host Docker)
```

1. El usuario hace una acción en React (por ejemplo, iniciar sesión, abrir el catálogo o confirmar una compra).
2. `db.js` o `AuthContext.jsx` usa Axios (`apiClient.js`) para enviar una petición HTTP al backend en `http://localhost:8080/api`.
3. `JwtAuthenticationFilter` revisa si viene un token válido en la cabecera `Authorization` y `SecurityConfig` verifica si el rol tiene permiso.
4. El controlador llama al servicio, el servicio usa el repositorio para leer o guardar en MySQL, y la respuesta vuelve en JSON al frontend para actualizar la pantalla.
