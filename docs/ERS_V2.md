# Especificación de Requisitos de Software (ERS) — Versión 2.0
## Proyecto: Tienda Online "El Rincón del Perrito"
**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Institución:** Duoc UC — Escuela de Informática y Telecomunicaciones  
**Evaluación:** Evaluación Parcial N° 2 (30% de la Asignatura)  
**Fecha:** Octubre 2026  
**Versión:** 2.0 (Migración a Framework React, Bootstrap 5 y Testing Unitario con Jasmine/Karma)

---

## 1. Introducción y Propósito del Documento
El presente documento constituye la versión definitiva y actualizada de la Especificación de Requisitos de Software (ERS) para la tienda web **"El Rincón del Perrito"**, correspondiente a la Situación Evaluativa 1 de la Evaluación Parcial N° 2.

El propósito fundamental de este entregable es documentar la modernización arquitectónica del proyecto: desde una estructura inicial estática basada en HTML5/CSS/JS plano hacia una **Single Page Application (SPA)** de alto estándar desarrollada en **React 18**, con estilos responsivos estructurados mediante **Bootstrap 5**, componentes reutilizables con estricta gestión de propiedades (`props`) y estados (`useState`, `useContext`), y un riguroso proceso de aseguramiento de calidad respaldado por una suite automatizada de pruebas unitarias ejecutadas sobre **Jasmine y Karma**.

---

## 2. Alcance del Producto
"El Rincón del Perrito" es una plataforma de comercio electrónico orientada a la venta de accesorios, camas térmicas, juguetes y artículos de paseo para perros. En esta segunda versión, el sistema amplía su alcance funcional integrando:
1. **Catálogo Dinámico e Interactivo:** Filtrado por texto en tiempo real, segmentación por categorías oficiales (Camas, Juguetes, Collares) y sección exclusiva de Ofertas con badges de descuento.
2. **Ficha Detallada de Producto:** Vista individual con especificaciones técnicas, composición de materiales y alertas reactivas de stock.
3. **Flujo Transaccional Completo (Checkout):** Formulario con validación de RUN chileno (algoritmo Módulo 11 sin puntos ni guión), correos institucionales y selector dinámico en cascada de las 16 regiones de Chile y sus respectivas comunas.
4. **Pantallas de Confirmación de Transacción:** Pantalla de *Pago Exitoso* con el identificador oficial de orden **#20240705**, desglose de compra, botones de descarga de comprobante en PDF y reenvío de boleta por correo; junto con la pantalla de *Pago con Error* para gestión de contingencias bancarias.
5. **Panel de Control Administrativo (Figura 9 de la rúbrica):** Métricas consolidadas en tiempo real (Total Ventas en CLP, Conteo de Productos, Conteo de Usuarios y Alerta de Stock Crítico), respaldado por un módulo CRUD completo para la gestión de inventario, categorías y usuarios del sistema.
6. **Sistema de Autenticación y Autorización por Roles:** Perfiles diferenciados para *Administrador*, *Vendedor* y *Cliente*, con guardias de seguridad que previenen accesos no autorizados a rutas protegidas.

---

## 3. Requisitos Funcionales (RF)

### 3.1 Módulo Público y Catálogo de Productos
- **RF01 - Catálogo General de Productos:** El sistema debe presentar una cuadrícula responsiva (`ProductCard`) que visualice imagen, código, nombre, categoría, material, precio normal y precio en oferta.
- **RF02 - Vista de Categorías (Figura 4):** El sistema debe ofrecer una página dedicada que agrupe los productos en bloques temáticos (Camas, Juguetes, Collares), permitiendo navegación directa al catálogo filtrado.
- **RF03 - Vista de Ofertas Especiales:** El sistema debe filtrar automáticamente aquellos artículos que posean la bandera `esOferta = true`, destacando el porcentaje de descuento y el precio normal tachado.
- **RF04 - Detalle de Producto:** Vista ampliada accesible al hacer clic en cualquier tarjeta, indicando disponibilidad de unidades, materiales de fabricación y botón para añadir al carrito.
- **RF05 - Búsqueda en Tiempo Real:** La barra de navegación superior debe permitir ingresar términos clave y filtrar instantáneamente los productos por coincidencia en nombre o código.

### 3.2 Módulo de Carrito y Checkout Transaccional
- **RF06 - Gestión del Carrito de Compras:** Debe permitir agregar productos, modificar cantidades (incremento/decremento), eliminar artículos individuales y vaciar el carrito, persistiendo los datos en `localStorage`.
- **RF07 - Control de Stock en Carrito:** El sistema no debe permitir que el usuario añada o aumente cantidades que sobrepasen el inventario real en bodega (`stock`).
- **RF08 - Aplicación de Cupón de Descuento:** Debe aceptar el código promocional institucional `PERRITO10`, aplicando un 10% de rebaja sobre el subtotal del pedido.
- **RF09 - Formulario de Despacho y Checkout:** Debe capturar RUN, Nombre, Apellido, Teléfono, Correo, Región, Comuna y Dirección de entrega.
- **RF10 - Selector Geográfico en Cascada:** Al seleccionar una de las 16 regiones de Chile, el selector de comunas debe actualizarse reactivamente con las comunas pertenecientes a dicha región.
- **RF11 - Comprobante de Pago Exitoso (Orden #20240705):** Debe mostrar el número de pedido oficial, resumen de productos comprados, dirección de envío y botones de acción para "Descargar Comprobante PDF" y "Reenviar Boleta al Correo".
- **RF12 - Gestión de Pago Fallido:** Debe desplegar la pantalla de error con el código de transacción, detalle de causas comunes (fondos insuficientes o rechazo emisor) y enlace directo para reintentar el pago.

### 3.3 Módulo de Autenticación y Perfiles
- **RF13 - Autenticación de Usuarios:** Formulario de inicio de sesión con soporte para correos institucionales (`@duocuc.cl`, `@duoc.cl`, `@profesor.duoc.cl`) y personales (`@gmail.com`), aceptando contraseñas de hasta 20 caracteres (ej: `vendedor123`, `admin123`).
- **RF14 - Registro de Clientes:** Formulario de registro con validación de RUN chileno sin puntos ni guión (ej: `19011022K`), correo válido y coincidencia obligatoria de contraseña y confirmación.
- **RF15 - Guardias de Seguridad por Roles (RBAC):** Las vistas administrativas (`admin-*`) deben restringir el acceso exclusivamente a usuarios con rol `Administrador` o `Vendedor`. La gestión de cuentas de usuario (`admin-users`) queda reservada exclusivamente al `Administrador`.

### 3.4 Módulo Administrativo y Gestión de Inventario
- **RF16 - Panel de Métricas (Dashboard):** Visualización de 4 tarjetas de indicadores clave (KPIs): Total de Ingresos por Ventas ($ CLP), Total de Productos en Catálogo, Total de Usuarios Registrados y Conteo de Productos en Stock Crítico (`stock <= stockCritico`).
- **RF17 - CRUD de Productos e Inventario:** Interfaz para crear, listar, editar y eliminar productos, asignando código único, precios, categoría y umbral de stock crítico.
- **RF18 - CRUD de Categorías:** Interfaz para crear y administrar categorías de productos, verificando la integridad referencial antes de permitir la eliminación.
- **RF19 - Gestión de Usuarios y Asignación de Roles:** Interfaz para consultar la base de datos de usuarios, editar datos de contacto y modificar el rol asignado (`Cliente`, `Vendedor`, `Administrador`).
- **RF20 - Auditoría de Órdenes de Compra:** Tabla de seguimiento de todos los pedidos cursados en el sistema con detalle de ítems, totales y estado de aprobación.

---

## 4. Requisitos No Funcionales (RNF)

- **RNF01 - Usabilidad y Responsividad:** La interfaz debe ser 100% responsiva, adaptándose fluidamente a dispositivos móviles (smartphones), tabletas y computadores de escritorio utilizando el sistema de grillas (`grid`), contenedores y utilidades de Bootstrap 5.
- **RNF02 - Arquitectura de Componentes en React:** Cada vista debe estar modularizada en componentes basados en el Principio de Responsabilidad Única (SRP), separando presentación, lógica de negocio y contextos de estado global (`AuthContext`, `CartContext`).
- **RNF03 - Rendimiento y Tiempos de Carga:** El empaquetado del frontend mediante Vite debe generar bundles optimizados con carga inferior a 1.5 segundos en redes estándar.
- **RNF04 - Persistencia Local (Offline-Ready):** Todas las operaciones transaccionales y de mutación de datos deben persistir de manera desacoplada en el `localStorage` del navegador, garantizando consistencia ante recargas de página.
- **RNF05 - Validación de Datos en el Cliente:** Todo ingreso de información crítica (RUN, correo, longitud de contraseña, precios positivos) debe validarse antes del procesamiento con retroalimentación visual inmediata (`is-invalid` y mensajes explicativos).
- **RNF06 - Calidad de Código y Cobertura de Testing:** El proyecto debe contar con una suite completa de pruebas unitarias automatizadas con Jasmine y Karma, cubriendo renderizado, lógica condicional, propiedades, state y eventos con 100% de tasa de éxito.
- **RNF07 - Compatibilidad Cross-Browser:** La aplicación debe funcionar sin degradación en Google Chrome, Microsoft Edge, Mozilla Firefox y Safari.

---

## 5. Matriz de Trazabilidad de Requisitos

| ID Requisito | Descripción | Componente Frontend React | Módulo / Contexto | Estado de Cumplimiento |
| :--- | :--- | :--- | :--- | :--- |
| **RF01** | Catálogo general de productos | `Products.jsx`, `ProductCard.jsx` | `src/pages/`, `src/components/` | **Completado (100%)** |
| **RF02** | Vista de categorías (Figura 4) | `Categories.jsx`, `CategoryCard.jsx` | `src/pages/`, `src/components/` | **Completado (100%)** |
| **RF03** | Vista de ofertas con badges | `Offers.jsx`, `ProductCard.jsx` | `src/pages/`, `src/components/` | **Completado (100%)** |
| **RF04** | Detalle técnico del producto | `ProductDetail.jsx`, `AlertStock.jsx` | `src/pages/`, `src/components/` | **Completado (100%)** |
| **RF05** | Búsqueda reactiva en navbar | `Navbar.jsx` | `src/components/` | **Completado (100%)** |
| **RF06** | Carrito y control de cantidades | `Cart.jsx`, `CartContext.jsx` | `src/pages/`, `src/context/` | **Completado (100%)** |
| **RF07** | Control de stock máximo | `CartContext.jsx`, `AlertStock.jsx` | `src/context/`, `src/components/` | **Completado (100%)** |
| **RF08** | Cupón de descuento `PERRITO10` | `Cart.jsx`, `CartContext.jsx` | `src/pages/`, `src/context/` | **Completado (100%)** |
| **RF09** | Checkout y validaciones | `Checkout.jsx`, `validations.js` | `src/pages/`, `src/data/` | **Completado (100%)** |
| **RF10** | Selects dependientes 16 regiones | `Checkout.jsx`, `chileData.js` | `src/pages/`, `src/data/` | **Completado (100%)** |
| **RF11** | Pago Exitoso Orden #20240705 | `PaymentSuccess.jsx` | `src/pages/` | **Completado (100%)** |
| **RF12** | Pago con Error Orden #20240705 | `PaymentError.jsx` | `src/pages/` | **Completado (100%)** |
| **RF13** | Inicio de sesión (pass 20 chars) | `Login.jsx`, `AuthContext.jsx` | `src/pages/`, `src/context/` | **Completado (100%)** |
| **RF14** | Registro con RUN Módulo 11 | `Register.jsx`, `validations.js` | `src/pages/`, `src/data/` | **Completado (100%)** |
| **RF15** | Guardias de seguridad por roles | `App.jsx`, `AuthContext.jsx` | `src/App.jsx`, `src/context/` | **Completado (100%)** |
| **RF16** | Dashboard Admin (Figura 9) | `AdminDashboard.jsx`, `db.js` | `src/pages/admin/`, `src/data/` | **Completado (100%)** |
| **RF17** | CRUD Productos e inventario | `AdminProducts.jsx`, `AdminProductForm.jsx` | `src/pages/admin/` | **Completado (100%)** |
| **RF18** | CRUD Categorías de catálogo | `AdminCategories.jsx`, `db.js` | `src/pages/admin/` | **Completado (100%)** |
| **RF19** | CRUD Usuarios y roles | `AdminUsers.jsx`, `AdminUserForm.jsx` | `src/pages/admin/` | **Completado (100%)** |
| **RF20** | Auditoría y detalle de órdenes | `AdminOrders.jsx`, `db.js` | `src/pages/admin/` | **Completado (100%)** |

---

## 6. Conclusión
El presente documento ERS Versión 2.0 refleja de manera exhaustiva la totalidad de los requerimientos y compromisos de desarrollo para la Evaluación Parcial N° 2 de la asignatura DSY1104, demostrando el dominio de las competencias asociadas a la construcción de aplicaciones frontend modernas en React y el aseguramiento de su calidad técnica.
