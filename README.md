# 🐾 El Rincón del Perrito — Tienda Online & Sistema Administrativo

Proyecto correspondiente a la **Evaluación 1 (30%)** de la Escuela de Informática y Telecomunicaciones de **Duoc UC**.

---

## 📋 Características Principales

- **Arquitectura Frontend Modular:** Cada vista tiene su archivo HTML independiente, con hojas de estilos CSS organizadas por componente y scripts JavaScript especializados.
- **Tienda Completa:**
  - Home con hero banner y productos destacados.
  - Catálogo filtrable por categorías (Camas, Juguetes, Collares).
  - Ficha de detalle de producto con selector de cantidad y productos relacionados.
  - Carrito de compras funcional con soporte para cupón de descuento (`PERRITO10`) y checkout con persistencia en `localStorage`.
  - Página institucional "Nosotros" con reseña del equipo de desarrollo de Duoc UC.
  - Sección de Blogs con dos artículos desarrollados en profundidad.
  - Formulario de Contacto con validación de dominios y contador de caracteres.
- **Sistema Administrativo:**
  - Dashboard con métricas clave (KPIs) y tabla de monitoreo de stock crítico.
  - Mantenedor de Productos: Listado, creación, edición, eliminación y alertas de inventario bajo.
  - Mantenedor de Usuarios: Listado, gestión de roles y creación de usuarios con validación de RUN por Módulo 11.
  - Select dependiente dinámico de Regiones y Comunas de Chile (`js/regiones-comunas.js`).
  - Historial de órdenes de compra.
- **Control de Roles:**
  - **Administrador:** Acceso completo al sistema.
  - **Vendedor:** Acceso a productos y órdenes de compra únicamente.
  - **Cliente:** Acceso exclusivo a la tienda.

---

## 🔑 Cuentas Demo para Evaluación

| Rol | Correo | Contraseña | RUN |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@duocuc.cl` | `admin123` | `19011022K` |
| **Vendedor** | `vendedor@duocuc.cl` | `vendedor123` | `181234567` |
| **Cliente** | `cliente@gmail.com` | `cliente123` | `201112223` |

*Cupón de descuento para el carrito:* **`PERRITO10`** (10% de descuento).

---

## 📁 Estructura del Proyecto

```text
Final/
├── index.html                # Redirector automático a html/index.html
├── html/                     # VISTAS DE LA TIENDA
│   ├── index.html            # Home principal
│   ├── productos.html        # Catálogo completo
├── detalle-producto.html     # Detalle de producto
├── carrito.html              # Carrito de compras (Figura 15)
├── nosotros.html             # Quiénes somos y equipo Duoc UC
├── blogs.html                # Noticias y casos curiosos (Figura 6)
├── blog-detalle-1.html       # Caso Curioso #1
├── blog-detalle-2.html       # Caso Curioso #2
├── contacto.html             # Formulario de contacto (Figura 7)
├── login.html                # Inicio de sesión (Figura 5)
├── registro.html             # Registro de cliente (Figura 4)
│
├── admin/                    # Panel administrativo (Figura 10, 11, 12, 13)
│   ├── index.html            # Dashboard principal
│   ├── productos.html        # Mantenedor: Lista de productos
│   ├── producto-form.html    # Mantenedor: Formulario producto
│   ├── usuarios.html         # Mantenedor: Lista de usuarios
│   ├── usuario-form.html     # Mantenedor: Formulario usuario
│   └── ordenes.html          # Listado de pedidos realizados
│
├── css/                      # Estilos modulares
├── js/                       # Módulos JavaScript independientes
├── Imagenes/                 # Recursos gráficos y fotos
└── docs/                     # ERS y Guía de Defensa
    ├── ERS.md                # Especificación de Requerimientos v1
    └── GUIA_DEFENSA.md       # Guía para la presentación de 15 min
```
