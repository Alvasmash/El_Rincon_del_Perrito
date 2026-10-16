# 🐾 El Rincón del Perrito — Tienda Online & Sistema Administrativo (React SPA)

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?logo=bootstrap&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-5.1.2-8A4182?logo=jasmine&logoColor=white)
![Karma](https://img.shields.io/badge/Karma-6.4.4-43B02A?logo=karma&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?logo=vite&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-15%2F15%20Passing-brightgreen)

Proyecto correspondiente a la **Evaluación Parcial N° 2 (30% de la Asignatura)** de la carrera de Ingeniería en Informática / Analista Programador Computacional en **Duoc UC**.  
**Asignatura:** Desarrollo Fullstack II (DSY1104).  
**Resultado de Aprendizaje Evaluado:** RA2 — *Implementando frontend y pruebas unitarias a mi tienda online*.

---

## 🚀 Inicio Rápido (Comandos Principales)

### 1. Instalación de Dependencias
```bash
npm install
```

### 2. Ejecutar la Suite de Pruebas Unitarias (Jasmine + Karma)
```bash
npm test
```
> Ejecuta Karma en modo headless (Chromium / Microsoft Edge), validando los **10 archivos de especificación (15 casos de prueba unitarios)** con un 100% de éxito en milisegundos.

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
> Abre tu navegador en [http://localhost:5173](http://localhost:5173).

### 4. Compilar para Producción
```bash
npm run build
```

---

## 📋 Arquitectura y Características de la Versión 2.0

- **Migración a React 18 + Vite:** Arquitectura basada en Single Page Application (SPA) con enrutamiento reactivo, navegación fluida por Hash y sincronización de historial sin recargas de página.
- **Diseño Responsivo con Bootstrap 5:** Interfaz adaptable (Mobile-First) en smartphones, tablets y pantallas de escritorio mediante el sistema de cuadrículas `grid`, utilidades flexbox y tipografías Fredoka y Work Sans.
- **Gestión de Estado Global (React Context):**
  - `AuthContext`: Control de sesión activa, persistencia en `localStorage`, roles (`Administrador`, `Vendedor`, `Cliente`) y guardias de seguridad para rutas administrativas.
  - `CartContext`: Gestión reactiva del carrito, cálculo automático de subtotales, validación estricta de stock disponible y soporte para cupón promocional `PERRITO10` (10% de descuento).
- **Flujos Transaccionales Completos:**
  - **Categorías (Figura 4):** Vista dedicada para explorar bloques temáticos de Camas, Juguetes y Collares.
  - **Ofertas Especiales:** Sección exclusiva con badges de descuento y precios normales tachados.
  - **Ficha Técnica de Producto:** Detalle ampliado con control reactivo de inventario y selección de unidades.
  - **Checkout Geográfico:** Formulario con autocompletado y selector en cascada dependiente de las **16 regiones de Chile y sus comunas oficiales**.
  - **Pago Exitoso (Orden #20240705):** Pantalla de confirmación con número de orden oficial, detalle de compra y botones para "Descargar Comprobante PDF" y "Reenviar Boleta al Correo".
  - **Pago con Error (Orden #20240705):** Pantalla de contingencia bancaria con opción de reintentar la transacción.
- **Panel de Control Administrativo (Figura 9 de la rúbrica):**
  - 4 Tarjetas de Métricas (KPIs): Total Ventas ($ CLP), Total Productos, Total Usuarios y Alertas de Stock Crítico.
  - Tabla de monitoreo de inventario con componente `<AlertStock />`.
  - Módulos CRUD completos: Productos (código, precio, stock, alerta crítica), Categorías y Usuarios (RUN con Módulo 11, roles y contraseñas de hasta 20 caracteres).
- **Suite Automatizada de Testing con Jasmine y Karma:**
  - 10 especificaciones `.spec.js` que cubren: renderizado de listas, renderizado condicional, verificación de props, gestión de state y simulación de eventos con espías (`spies`).

---

## 🔑 Cuentas de Acceso para Evaluación y Defensa

| Rol | Correo Electrónico | Contraseña | RUN (Módulo 11) | Permisos en la Plataforma |
| :--- | :--- | :--- | :--- | :--- |
| **Administrador** | `admin@duocuc.cl` | `admin123` | `19011022K` | Acceso completo: Dashboard, Productos, Categorías, Usuarios y Órdenes. |
| **Vendedor** | `vendedor@duocuc.cl` | `vendedor123` | `181234567` | Acceso a Dashboard, Catálogo de Productos, Categorías y Órdenes. |
| **Cliente** | `cliente@gmail.com` | `cliente123` | `201112223` | Navegación de catálogo, carrito, cupones, checkout y compras. |

> **Cupón de descuento institucional:** Ingresar **`PERRITO10`** en el carrito para obtener un **10% de descuento** sobre el subtotal.  
> **Límite de contraseña:** Configurado hasta **20 caracteres** para soportar contraseñas largas (`vendedor123`).  
> **Dominios de correo permitidos:** `@duocuc.cl`, `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`.

---

## 🧪 Cobertura de Pruebas Unitarias (Jasmine + Karma)

| N° | Archivo en `src/tests/` | Componente | Alcance / Aserción |
| :---: | :--- | :--- | :--- |
| **01** | `01_ProductListRender.spec.js` | `<ProductCard />` (Lista) | Verifica renderizado correcto de una colección de productos en el DOM. |
| **02** | `02_ProductCardRender.spec.js` | `<ProductCard />` (Card) | Comprueba formateo CLP (`$19.990`), precio tachado e insignia de oferta. |
| **03** | `03_AlertStockConditional.spec.js` | `<AlertStock />` | Valida los 3 casos de renderizado condicional (Stock normal, crítico y agotado). |
| **04** | `04_ErrorMessageConditional.spec.js` | `<ToastAlert />` | Valida renderizado condicional de alertas y clases CSS (`bg-danger`). |
| **05** | `05_ButtonProps.spec.js` | `<CustomButton />` | Verifica props recibidas: etiqueta, variantes de color y atributo `disabled`. |
| **06** | `06_RoleBadgeProps.spec.js` | `<RoleBadge />` | Comprueba props de rol y aplicación de estilos según `Administrador/Vendedor/Cliente`. |
| **07** | `07_LoginFormState.spec.js` | `<MockLoginForm />` | Evalúa la actualización de state reactivo ante la escritura en inputs. |
| **08** | `08_ContactFormState.spec.js` | `<MockContactForm />` | Verifica gestión de state en textareas y actualización de contador de caracteres. |
| **09** | `09_AddToCartEvent.spec.js` | `<ProductCard />` | Simula clic en "Añadir al Carrito" y valida la invocación del espía de Jasmine. |
| **10** | `10_CartQuantityEvent.spec.js` | `<MockCartRow />` | Simula eventos de clic en incremento, decremento y eliminación de cantidades. |

---

## 📁 Estructura del Proyecto

```text
El_Rincon_del_Perrito/
├── karma.conf.cjs                 # Configuración oficial de Karma + Webpack + Babel
├── package.json                   # Dependencias de React 18, Bootstrap 5 y testing
├── vite.config.js                 # Configuración de empaquetado con Vite
├── index.html                     # Entry point HTML de la aplicación
├── docs/                          # DOCUMENTACIÓN FORMAL DE EVALUACIÓN
│   ├── ERS_V2.md                  # Especificación de Requisitos de Software terminada
│   ├── COBERTURA_TESTING.md       # Informe de herramientas, mocks y resultados
│   └── GUIA_DEFENSA_V2.md         # Guion verbal y banco de preguntas de la presentación
├── src/
│   ├── App.jsx                    # Enrutador SPA, guardias de seguridad y Layout
│   ├── index.jsx                  # Montaje de React 18 en #root
│   ├── index.css                  # Estilos corporativos y personalización Bootstrap
│   ├── components/                # COMPONENTES MODULARES REUTILIZABLES
│   │   ├── Navbar.jsx             # Barra de navegación con buscador y badge de carrito
│   │   ├── Footer.jsx             # Pie de página institucional y newsletter
│   │   ├── ProductCard.jsx        # Tarjeta de producto con precios y stock
│   │   ├── CategoryCard.jsx       # Tarjetas temáticas para Figura 4
│   │   ├── AlertStock.jsx         # Renderizado condicional de stock crítico
│   │   ├── RoleBadge.jsx          # Insignia dinámica de roles
│   │   ├── CustomButton.jsx       # Botón parametrizable con props
│   │   └── ToastAlert.jsx         # Notificaciones flotantes
│   ├── context/                   # ESTADO GLOBAL
│   │   ├── AuthContext.jsx        # Autenticación, sesión y roles
│   │   └── CartContext.jsx        # Carrito, cupones y control de stock
│   ├── data/                      # PERSISTENCIA Y MODELOS
│   │   ├── db.js                  # Fuente de datos y operaciones CRUD (LocalStorage)
│   │   ├── chileData.js           # 16 regiones y comunas oficiales de Chile
│   │   └── validations.js         # Módulo 11 RUN, correos institucionales y formatCLP
│   ├── pages/                     # PÁGINAS DE LA TIENDA PÚBLICA
│   │   ├── Home.jsx               # Vista principal con banner 1200x300
│   │   ├── Products.jsx           # Catálogo con filtros y búsqueda
│   │   ├── ProductDetail.jsx      # Ficha técnica individual
│   │   ├── Categories.jsx         # Vista de categorías (Figura 4)
│   │   ├── Offers.jsx             # Sección de ofertas y descuentos
│   │   ├── Cart.jsx               # Carrito interactivo y cupones
│   │   ├── Checkout.jsx           # Formulario con selects dependientes
│   │   ├── PaymentSuccess.jsx     # Comprobante Pago Exitoso #20240705
│   │   ├── PaymentError.jsx       # Comprobante Pago con Error #20240705
│   │   ├── About.jsx              # Nosotros y equipo Duoc UC
│   │   ├── Blogs.jsx              # Artículos y casos curiosos
│   │   ├── Contact.jsx            # Formulario de contacto con contador
│   │   ├── Login.jsx              # Inicio de sesión (pass 20 chars)
│   │   └── Register.jsx           # Registro con RUN chileno
│   ├── pages/admin/               # PANEL DE CONTROL Y ADMINISTRACIÓN
│   │   ├── AdminDashboard.jsx     # KPIs de ventas, catálogo y stock crítico (Figura 9)
│   │   ├── AdminProducts.jsx      # Catálogo administrativo de inventario
│   │   ├── AdminProductForm.jsx   # Formulario crear/editar producto
│   │   ├── AdminCategories.jsx    # Gestión de categorías de catálogo
│   │   ├── AdminUsers.jsx         # Gestión de usuarios y asignación de roles
│   │   ├── AdminUserForm.jsx      # Formulario crear/editar usuario con RUN
│   │   └── AdminOrders.jsx        # Historial y auditoría de pedidos
│   └── tests/                     # SUITE DE PRUEBAS UNITARIAS JASMINE
│       ├── 01_ProductListRender.spec.js
│       ├── 02_ProductCardRender.spec.js
│       ├── 03_AlertStockConditional.spec.js
│       ├── 04_ErrorMessageConditional.spec.js
│       ├── 05_ButtonProps.spec.js
│       ├── 06_RoleBadgeProps.spec.js
│       ├── 07_LoginFormState.spec.js
│       ├── 08_ContactFormState.spec.js
│       ├── 09_AddToCartEvent.spec.js
│       └── 10_CartQuantityEvent.spec.js
```

---

## 📄 Documentación Institucional

Para más detalles sobre los requisitos, la estrategia de testing y la defensa del proyecto, consulta los documentos oficiales generados en la carpeta `docs/`:
- [Especificación de Requisitos de Software (ERS V2)](./docs/ERS_V2.md)
- [Informe de Cobertura de Testing](./docs/COBERTURA_TESTING.md)
- [Guía Maestra para la Presentación Oral](./docs/GUIA_DEFENSA_V2.md)
