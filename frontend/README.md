# El Rincon del Perrito - Tienda Online y Sistema Administrativo (React SPA)

Proyecto correspondiente a la Evaluacion Parcial N 2 de la asignatura Desarrollo Fullstack II (DSY1104) en Duoc UC.

## Instrucciones de Instalacion y Ejecucion

### 1. Instalacion de dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicacion estara disponible en: [http://localhost:3000](http://localhost:3000)

### 3. Ejecutar pruebas unitarias (Jasmine + Karma)
```bash
npm test
```
Ejecuta los 10 archivos de especificacion con 15 pruebas unitarias en modo headless.

### 4. Compilar para produccion
```bash
npm run build
```

## Cuentas de Acceso para Pruebas

| Rol | Correo | Clave | RUN | Permisos |
| :--- | :--- | :--- | :--- | :--- |
| Administrador | admin@duocuc.cl | admin123 | 19011022K | Acceso total: Dashboard, Productos, Categorias, Usuarios y Pedidos |
| Vendedor | vendedor@duocuc.cl | vendedor123 | 181234567 | Acceso a Dashboard, Productos, Categorias y Pedidos |
| Cliente | cliente@gmail.com | cliente123 | 201112223 | Catalogo, carrito, checkout y compras |

Cupon de descuento: PERRITO10 (10% de descuento en el carrito).

## Caracteristicas Principales

- Frontend SPA construido con React 18 y Vite.
- Diseno responsivo con Bootstrap 5.
- Estado global gestionado con React Context (AuthContext y CartContext).
- Persistencia local mediante LocalStorage para productos, categorias, usuarios y ordenes.
- Validaciones en formularios: RUN chileno (Modulo 11), correos institucionales y limite de caracteres.
- Selectores dependientes de las 16 regiones de Chile y sus comunas.
- Panel administrativo con control de inventario y alertas de stock critico.
- Suite de pruebas unitarias automatizadas con Jasmine y Karma.

## Documentacion

Los documentos de entrega se encuentran en la carpeta docs/:
- docs/ERS_V2.md: Especificacion de Requisitos de Software.
- docs/COBERTURA_TESTING.md: Informe de cobertura y resultados de pruebas unitarias.
- docs/GUIA_DEFENSA_V2.md: Guia para la defensa oral del proyecto.
