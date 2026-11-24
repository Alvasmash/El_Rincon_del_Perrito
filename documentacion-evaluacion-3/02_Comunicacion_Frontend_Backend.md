# 02. Comunicación entre Frontend y Backend

La comunicación entre el frontend en React y el backend en Spring Boot se hace usando una **API REST** sobre HTTP con intercambio de datos en formato **JSON**.

## 1. Cómo se envían las peticiones desde el Frontend

En `frontend/src/api/apiClient.js` se crea una instancia de **Axios** apuntando a `http://localhost:8080/api`:

```javascript
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('rincon_perrito_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

Este interceptor hace que cada vez que el usuario inicia sesión y guarda su token JWT en `localStorage`, todas las peticiones siguientes envíen automáticamente la cabecera `Authorization: Bearer <token>`.

Las funciones que llaman a cada endpoint están centralizadas en `frontend/src/data/db.js` y `frontend/src/context/AuthContext.jsx`, y son consumidas por las páginas (`Home.jsx`, `Products.jsx`, `ProductDetail.jsx`, `Categories.jsx`, `Offers.jsx`, `Login.jsx`, `Register.jsx`, `Checkout.jsx`, `Contact.jsx` y `src/pages/admin/`).

## 2. Endpoints reales del Backend y qué hace cada uno

### Autenticación (`AuthController` -> `/api/auth`)

| Método | Ruta | Quién puede usarla | Qué envía el frontend | Qué responde el backend |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Público | `{ correo, clave }` | `{ token, user }` (HTTP 200 o 401 si falla) |
| `POST` | `/api/auth/register` | Público | `{ run, nombre, apellidos, correo, clave, region, comuna, direccion, telefono }` | `{ token, user }` con rol `Cliente` (HTTP 201 o 409 si ya existe) |

### Productos (`ProductController` -> `/api/products`)

| Método | Ruta | Quién puede usarla | Qué hace |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Público | Devuelve la lista de productos desde MySQL |
| `GET` | `/api/products/{id}` | Público | Devuelve el detalle de un producto por su ID |
| `POST` | `/api/products` | Administrador o Vendedor | Crea un producto nuevo |
| `PUT` | `/api/products/{id}` | Administrador o Vendedor | Actualiza los datos o el stock de un producto |
| `DELETE` | `/api/products/{id}` | Administrador o Vendedor | Elimina un producto |

### Categorías (`CategoryController` -> `/api/categories`)

| Método | Ruta | Quién puede usarla | Qué hace |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Público | Lista todas las categorías |
| `POST` | `/api/categories` | Administrador o Vendedor | Crea una categoría nueva |
| `PUT` | `/api/categories/{id}` | Administrador o Vendedor | Actualiza nombre o descripción |
| `DELETE` | `/api/categories/{id}` | Administrador o Vendedor | Elimina la categoría (si no tiene productos asociados; si tiene, responde 409) |

### Usuarios (`UserController` -> `/api/users`)

| Método | Ruta | Quién puede usarla | Qué hace |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Solo Administrador | Lista los usuarios sin devolver la clave (`UserResponse`) |
| `GET` | `/api/users/{run}` | Solo Administrador | Busca un usuario por RUN |
| `POST` | `/api/users` | Solo Administrador | Crea un usuario con su clave encriptada con BCrypt |
| `PUT` | `/api/users/{run}` | Solo Administrador | Edita los datos o el rol del usuario |
| `DELETE` | `/api/users/{run}` | Solo Administrador | Elimina un usuario por RUN |

### Órdenes de Compra (`OrderController` -> `/api/orders`)

| Método | Ruta | Quién puede usarla | Qué hace |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Público (cliente o invitado) | Guarda el pedido y sus ítems en MySQL y descuenta el stock de cada producto |
| `GET` | `/api/orders` | Administrador o Vendedor | Lista todas las órdenes registradas |
| `GET` | `/api/orders/{id}` | Administrador o Vendedor | Obtiene el detalle de una orden específica |

### Contacto (`ContactController` -> `/api/contact`)

| Método | Ruta | Quién puede usarla | Qué hace |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Público | Guarda el mensaje del formulario de contacto en la tabla `contact_messages` |
| `GET` | `/api/contact` | Administrador o Vendedor | Lista los mensajes recibidos |

## 3. Ejemplo real de envío y recepción de datos

Cuando un usuario inicia sesión en `Login.jsx`:

1. `Login.jsx` llama a `await login(email, password)` en `AuthContext.jsx`.
2. `AuthContext.jsx` ejecuta `apiClient.post('/auth/login', { correo: email, clave: password })`.
3. El backend recibe el JSON en `AuthController.login()`, valida la contraseña encriptada con `PasswordEncoder` en `AuthService`, genera el JWT en `JwtService` y responde con:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiJ9...",
     "user": {
       "run": "19011022K",
       "nombre": "Administrador",
       "apellidos": "Principal Duoc",
       "correo": "admin@duocuc.cl",
       "rol": "Administrador",
       "region": "Región Metropolitana de Santiago",
       "comuna": "Santiago",
       "direccion": "Av. España 123, Campus Duoc UC",
       "telefono": "+56911223344"
     }
   }
   ```
4. El frontend guarda `token` en `rincon_perrito_token` y `user` en `rincon_perrito_session`, y redirige al panel administrativo o al inicio.

## 4. Cómo se configuró CORS y el manejo de errores

- **CORS (`SecurityConfig.java`):** Como el frontend corre en el puerto `3000` y el backend en el `8080`, el navegador bloquearía las peticiones si el backend no las autorizara. Por eso `corsConfigurationSource()` permite los orígenes `http://localhost:3000` y `http://localhost:5173`, los métodos `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, y las cabeceras `Authorization` y `Content-Type`.
- **Errores (`GlobalExceptionHandler.java` y `getApiErrorMessage`):** Cuando ocurre un error en el backend (clave incorrecta, stock insuficiente, categoría con productos, acceso sin permiso), Spring Boot devuelve un JSON `{ "message": "..." }` con el código HTTP correspondiente (400, 401, 403, 404 o 409) y el frontend muestra ese texto en pantalla con una alerta de Bootstrap.
