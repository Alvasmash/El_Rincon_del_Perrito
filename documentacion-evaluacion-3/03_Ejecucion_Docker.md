# 03. Ejecución del Backend con Docker

El backend utiliza **Docker** y **Docker Compose** para levantar la base de datos **MySQL 8.4** y la aplicación **Spring Boot 4.0.3** sin tener que instalar ni configurar MySQL manualmente para el proyecto.

## 1. Archivos Docker del proyecto (en `El_Rincon_del_Perrito_Backend/`)

- `Dockerfile`: Compila el proyecto con Maven y Java 21 (`maven:3.9.9-eclipse-temurin-21`), genera el archivo `.jar` y luego lo copia a una imagen más liviana (`eclipse-temurin:21-jre`) que expone el puerto `8080`.
- `docker-compose.yml`: Define dos servicios conectados en la red interna `rincon-network`:
  1. **`mysql`** (`rincon-perrito-mysql`): Usa la imagen `mysql:8.4`, crea la base de datos `rincon_perrito`, guarda los datos en el volumen persistente `mysql_data` y tiene un `healthcheck` para avisar cuando MySQL ya acepta conexiones. Se expone en el puerto `3307` del computador (`3307:3306`) para evitar choque con el puerto `3306` si ya existe otro MySQL instalado en Windows.
  2. **`backend`** (`rincon-perrito-backend`): Se construye desde `./Dockerfile`, espera a que `mysql` esté `healthy` (`depends_on: condition: service_healthy`), se conecta a `mysql:3306` dentro de la red Docker y expone la API en `http://localhost:8080` (junto con Swagger en `http://localhost:8080/swagger-ui/index.html`).

## 2. Opción A: Levantar todo el backend y MySQL con Docker

Asegúrate de tener **Docker Desktop** abierto y con estado **Engine running**. Luego abre una terminal en la carpeta del backend (`El_Rincon_del_Perrito_Backend`):

```powershell
docker compose up -d --build
```

Para comprobar que ambos contenedores están corriendo:

```powershell
docker ps
```

Deberías ver:
- `rincon-perrito-mysql` en estado `Up (healthy)` en el puerto `0.0.0.0:3307->3306/tcp`.
- `rincon-perrito-backend` en estado `Up` en el puerto `0.0.0.0:8080->8080/tcp`.

Para ver los logs de arranque de Spring Boot y confirmar que se conectó a MySQL:

```powershell
docker logs rincon-perrito-backend --tail 40
```

Resultado esperado en los logs:
- `Started RinconPerritoBackendApplication`
- `HikariPool-1 - Start completed.`
- `Database version: 8.4.13`

## 3. Opción B: Levantar MySQL en Docker y ejecutar el backend desde IntelliJ IDEA

Como el profesor indicó trabajar el backend desde IntelliJ IDEA:

1. Si ya levantaste el contenedor `backend` antes, detenlo para dejar libre el puerto `8080`:
   ```powershell
   docker compose stop backend
   ```
2. Deja corriendo solo MySQL en Docker:
   ```powershell
   docker compose up -d mysql
   ```
3. Abre la carpeta `El_Rincon_del_Perrito_Backend` en **IntelliJ IDEA**.
4. Espera a que Maven cargue las dependencias del `pom.xml`.
5. Ejecuta la clase `RinconPerritoBackendApplication`.
6. Por defecto, `src/main/resources/application.properties` apunta a `localhost:3307/rincon_perrito` con usuario `root` y clave `root123`, así que se conectará directo al contenedor `rincon-perrito-mysql`.

## 4. Comandos útiles de Docker y pruebas del backend

- Ver estado de los contenedores: `docker compose ps`
- Detener los contenedores sin borrar los datos de MySQL: `docker compose down`
- Detener y borrar también el volumen de datos (si quieres reiniciar la base desde cero): `docker compose down -v`
- Ejecutar las pruebas unitarias del backend (JUnit 5 + Mockito) dentro de `backend/`:
  ```powershell
  mvn test
  ```
  (En nuestro proyecto corren 12 pruebas unitarias en `AuthServiceTest`, `ProductServiceTest`, `CategoryServiceTest`, `OrderServiceTest` y `UserServiceTest`.)
