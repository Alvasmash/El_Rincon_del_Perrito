# Guía Maestra para la Presentación y Defensa Oral
## Evaluación Parcial N° 2 — DSY1104 Desarrollo Fullstack II
**Ponderación:** 60% de la Evaluación Parcial 2 (Nota individual)  
**Tiempo Estimado:** 12 a 15 minutos de exposición + 5 minutos de preguntas del docente  
**Proyecto:** El Rincón del Perrito — Tienda Online en React, Bootstrap 5 y Testing con Jasmine/Karma

---

## 1. Estructura de la Presentación (Cronograma Minuto a Minuto)

```
[00:00 - 02:30] Bloque 1: Arquitectura y Diseño de la Aplicación en React 18
[02:30 - 06:00] Bloque 2: Componentes, Props, States y Responsividad con Bootstrap 5
[06:00 - 09:30] Bloque 3: Suite de Pruebas Unitarias con Jasmine y Karma (10 Tests)
[09:30 - 12:30] Bloque 4: Entorno de Testeo, Mocks, Análisis de Resultados y Demostración
[12:30 - 15:00] Bloque 5: Demostración en Vivo (Flujo Cliente y Panel de Control Admin)
```

---

## 2. Guion Verbal Paso a Paso (Qué decir y cómo argumentar)

### Bloque 1: Diseño con Framework Moderno de JavaScript (Indicador 1)
> **Qué decir:**
> *"Buenos días profesor(a). Hoy presento la modernización integral del frontend de nuestra tienda 'El Rincón del Perrito'. Para cumplir con los objetivos del Resultado de Aprendizaje 2, migramos la aplicación desde una base estática en HTML y JS plano hacia una Single Page Application (SPA) moderna construida sobre **React 18** y empaquetada con **Vite**.
>
> Decidimos utilizar React debido a su arquitectura basada en componentes desacoplados, su Virtual DOM que optimiza el rendimiento en el renderizado reactivo y su ecosistema de Hooks (`useState`, `useEffect`, `useContext`).
> Para gestionar el estado global sin sobrecargar la aplicación con librerías pesadas como Redux, implementamos dos contextos nativos: `AuthContext`, que controla la sesión, persistencia en `localStorage` y control de acceso basado en roles (Administrador, Vendedor y Cliente); y `CartContext`, que encapsula el carrito de compras, el cálculo reactivo de subtotales, la validación estricta de stock disponible en bodega y la aplicación del cupón de descuento institucional `PERRITO10`."*

---

### Bloque 2: Componentes, Props, States y Bootstrap Responsivo (Indicador 2)
> **Qué decir:**
> *"La interfaz fue diseñada bajo el Principio de Responsabilidad Única. Cada componente cumple un rol exclusivo:
> 1. `<ProductCard />`: Recibe el objeto producto mediante `props`, formatea precios a moneda chilena ($ CLP) y maneja el evento de añadir al carrito.
> 2. `<AlertStock />`: Implementa renderizado condicional. Si el stock es mayor al stock crítico, no contamina el DOM; si el stock cae por debajo del umbral mínimo configurado, despliega automáticamente una alerta de advertencia `.alert-warning`; y si el inventario llega a cero, muestra la alerta de producto agotado `.alert-danger`.
> 3. `<CustomButton />` y `<RoleBadge />`: Componentes altamente reutilizables cuya apariencia y comportamiento se parametrizan dinámicamente mediante `props` (`variant`, `disabled`, `rol`).
>
> En el diseño visual, integramos **Bootstrap 5**, aplicando un enfoque Mobile-First. Mediante el sistema de grillas responsivas (`col-12 col-md-6 col-lg-3`) y contenedores fluidos, garantizamos que la tienda se visualice de forma perfecta en smartphones, tablets y pantallas de escritorio.
> Además, en el formulario de Checkout implementamos selects dinámicos dependientes de las **16 regiones oficiales de Chile**, actualizando en tiempo real la lista de comunas según la región seleccionada."*

---

### Bloque 3: Creación de Pruebas Unitarias con Jasmine y Karma (Indicador 3)
> **Qué decir:**
> *"Para garantizar la calidad y estabilidad del código, implementamos una suite automatizada de pruebas unitarias compuesta por **10 archivos de especificación (.spec.js)** con un total de **15 casos de prueba unitarios**, utilizando **Jasmine** como framework BDD y **Karma** como ejecutor en navegador real (`ChromeHeadless`/`Edge`).
>
> La suite cubre todas las dimensiones de calidad exigidas en la rúbrica:
> - **Renderizado de listas:** Verificamos que una colección de $N$ productos renderice exactamente $N$ tarjetas en el DOM con sus respectivos títulos (`01_ProductListRender.spec.js`).
> - **Renderizado individual:** Comprobamos el formateo de precios en CLP y la aparición del badge de oferta cuando `esOferta: true` (`02_ProductCardRender.spec.js`).
> - **Renderizado condicional:** Validamos los 3 estados del stock crítico en `AlertStock` (`03_AlertStockConditional.spec.js`) y las alertas flotantes en `ToastAlert` (`04_ErrorMessageConditional.spec.js`).
> - **Props recibidas:** Comprobamos la correcta propagación de etiquetas, clases CSS y estados `disabled` en botones e insignias de roles (`05_ButtonProps.spec.js` y `06_RoleBadgeProps.spec.js`).
> - **Gestión de State:** Evaluamos que los cambios en inputs de login y textareas de contacto actualicen fielmente el estado interno del componente y los contadores de caracteres (`07_LoginFormState.spec.js` y `08_ContactFormState.spec.js`).
> - **Simulación de eventos:** Disparamos eventos nativos de `click` y verificamos que los callbacks sean ejecutados con los parámetros exactos mediante espías de Jasmine (`jasmine.createSpy`) tanto en la adición de productos como en el incremento/decremento de cantidades del carrito (`09_AddToCartEvent.spec.js` y `10_CartQuantityEvent.spec.js`)."*

---

### Bloque 4: Entorno de Testeo, Mocks y Análisis de Resultados (Indicador 4)
> **Qué decir:**
> *"Para configurar el entorno de pruebas (`karma.conf.cjs`), integramos `karma-webpack` con `babel-loader` para la transpilación de JSX y JSX Runtime de React 18, resolviendo las extensiones y configurando `resolve: { fullySpecified: false }` para compatibilidad con ES Modules.
>
> Respecto a la estrategia de aislamiento:
> - Utilizamos **Mocks de Datos** para independizar las pruebas del almacenamiento local (`localStorage`) o de servicios externos.
> - Empleamos **Mocks de Funciones (Spies)** para interceptar y certificar la ejecución de callbacks como `onAddToCart` y `onUpdateQuantity`, inspeccionando la cantidad de llamadas y los argumentos recibidos.
> - Configuramos la variable global `IS_REACT_ACT_ENVIRONMENT = true` para asegurar el procesamiento síncrono del Virtual DOM mediante `act()`.
>
> Como resultado, al ejecutar `npm test` en la terminal, Karma compila el bundle en milisegundos y lanza Edge en modo headless, obteniendo un **100% de éxito (15 de 15 pruebas aprobadas, 0 fallos)** en tan solo **0.113 segundos**, garantizando un ciclo de retroalimentación inmediata."*

---

## 3. Guía de Demostración Práctica en Vivo

### Paso 1: Ejecutar la Suite de Pruebas Unitarias
1. Abre la terminal en la raíz del proyecto.
2. Ejecuta:
   ```bash
   npm test
   ```
3. Muestra en pantalla la salida de Karma:
   - `webpack compiled successfully`.
   - `Edge 155.0.0.0 (Windows 10): Executed 15 of 15 SUCCESS`.
   - `TOTAL: 15 SUCCESS`.
4. Resalta: *"Como pueden observar, las 15 pruebas pasan con cero errores en una fracción de segundo"*.

---

### Paso 2: Iniciar la Tienda Online
1. Ejecuta en la terminal:
   ```bash
   npm run dev
   ```
2. Abre el navegador en `http://localhost:5173`.
3. Recorrido funcional recomendado:
   - **Navegación:** Haz clic en **Categorías (Figura 4)** y muestra las tarjetas temáticas de Camas, Juguetes y Collares.
   - **Catálogo y Ofertas:** Muestra cómo los productos en oferta tienen su badge amarillo y precio rebajado.
   - **Detalle de Producto:** Haz clic en un producto para ver su ficha técnica, material y disponibilidad.
   - **Carrito interactivo:** Agrega 2 productos, aplica el cupón `PERRITO10` y observa cómo se aplica el 10% de descuento.
   - **Checkout:** Haz clic en "Proceder al Pago", muestra la validación de RUN chileno (`19011022K`), correo `@duocuc.cl`, y selecciona diferentes regiones de Chile para ver cómo cambian las comunas.
   - **Pantalla de Pago Exitoso:** Finaliza la compra y muestra el número de orden oficial **#20240705**, con el desglose de productos y los botones para descargar PDF y reenviar boleta.
   - **Pantalla de Pago con Error:** Muestra la URL o enlace `#payment-error` para evidenciar la gestión de pagos fallidos exigida en la pauta.

---

### Paso 3: Demostración del Panel Administrativo (Figura 9)
1. Haz clic en "Iniciar Sesión" e ingresa con:
   - **Correo:** `admin@duocuc.cl`
   - **Contraseña:** `admin123`
2. Haz clic en el botón superior **"Panel Administrativo"**:
   - Muestra las **4 tarjetas de KPIs** (Total Ventas en CLP, Conteo de Productos, Conteo de Usuarios y Alertas de Stock Crítico).
   - Muestra la tabla de alertas de stock con el componente `<AlertStock />`.
   - Navega a **Gestión de Productos** y muestra la edición o creación de un producto con validación de precios y stock.
   - Navega a **Gestión de Usuarios** y muestra los roles (`Administrador`, `Vendedor`, `Cliente`) y la validación de RUN chileno.
   - Cierra sesión y demuestra que si un usuario sin privilegios intenta entrar a una ruta `admin-*`, el sistema bloquea el acceso con una alerta de seguridad.

---

## 4. Banco de Preguntas Frecuentes del Docente y Respuestas Modelo

### P1: ¿Por qué eligieron React en lugar de continuar con JavaScript Vanilla?
> **Respuesta:**
> *"JavaScript Vanilla requiere manipular el DOM directamente mediante métodos imperativos (`document.getElementById`, `innerHTML`), lo cual genera código acoplado, difícil de escalar y propenso a errores de sincronización. React introduce un modelo declarativo basado en componentes y un Virtual DOM que calcula la diferencia mínima (`diffing algorithm`) necesaria para actualizar la interfaz. Esto nos permitió crear componentes altamente reutilizables como `<ProductCard>` y `<AlertStock>`, además de separar el estado de la aplicación mediante React Context."*

---

### P2: ¿Cómo gestionaron el estado global del carrito y de la autenticación?
> **Respuesta:**
> *"Implementamos la Context API nativa de React con `AuthContext` y `CartContext`. En `AuthContext`, almacenamos el usuario autenticado, sus permisos por rol y persistimos la sesión en `localStorage`. En `CartContext`, centralizamos las operaciones de agregar, quitar, modificar cantidades, validar el stock máximo disponible y aplicar el cupón de descuento `PERRITO10`. Esto evita el problema de 'prop drilling', permitiendo que cualquier componente (como el Navbar o el Checkout) acceda al estado del carrito consumiendo un hook personalizado como `useCart()`."*

---

### P3: ¿Cómo asegura el componente `AlertStock` el renderizado condicional?
> **Respuesta:**
> *"El componente `AlertStock` recibe dos props: `stock` y `stockCritico`. Evalúa dos condiciones: si `stock <= 0`, retorna un banner de alerta roja (`alert-danger`) indicando producto agotado; si el stock es mayor a 0 pero menor o igual a `stockCritico`, retorna una alerta amarilla (`alert-warning`) advirtiendo stock bajo; y si el stock es holgado, retorna `null`. Al retornar `null`, React no inyecta ningún nodo en el DOM, optimizando la memoria y la limpieza visual."*

---

### P4: ¿Qué diferencia existe entre Jasmine y Karma en la arquitectura de testing?
> **Respuesta:**
> *"Jasmine es el framework de pruebas BDD: nos proporciona las funciones de estructuración (`describe`, `it`), los matchers de aserción (`expect().toBe()`, `toContain()`) y la creación de espías (`jasmine.createSpy`). Karma, en cambio, es el Test Runner o ejecutor: su tarea es levantar un servidor HTTP, cargar los archivos procesados por Webpack, abrir una instancia real de navegador (`ChromeHeadless` o Edge Chromium), ejecutar las pruebas de Jasmine en ese entorno real y reportar el resultado consolidado en la consola."*

---

### P5: ¿Qué es un Mock y por qué es fundamental en las pruebas unitarias?
> **Respuesta:**
> *"Un Mock es un objeto o función simulada que imita el comportamiento de una dependencia real en un entorno controlado. En nuestras pruebas unitarias, los mocks son fundamentales porque permiten aislar el componente que estamos testeando. Por ejemplo, al probar `<ProductCard>`, no necesitamos conectarnos a una base de datos real ni a internet; le pasamos un producto simulado (mock) y un callback espía (`jasmine.createSpy`). De esta forma, si el test falla, sabemos con certeza que el error está en la lógica del componente y no en un servicio externo."*

---

### P6: ¿Cómo validaron el RUN chileno en los formularios?
> **Respuesta:**
> *"Implementamos una función en `src/data/validations.js` que aplica el algoritmo Módulo 11 oficial de Chile. Primero verifica que el formato venga sin puntos ni guión (ej: `19011022K`), luego toma el cuerpo numérico, multiplica cada dígito en orden inverso por la serie numérica 2 al 7, suma los productos, calcula el resto de 11 menos dicha suma y determina si el dígito verificador corresponde a un número, '0' o 'K'. Si no coincide, el formulario marca el campo con `.is-invalid` y bloquea el envío."*

---

### P7: ¿Cómo funciona el selector dependiente de regiones y comunas?
> **Respuesta:**
> *"Creamos una base de datos oficial en `src/data/chileData.js` con las 16 regiones de Chile y sus comunas asociadas. En el componente de Checkout o de Registro, tenemos un estado para la región seleccionada. Cuando el usuario cambia la región en el `<select>`, se dispara el evento `onChange`, que ejecuta la función auxiliar `getCommunesForRegion(regionSeleccionada)` y actualiza el estado de las comunas, refrescando instantáneamente las opciones del segundo select."*

---

### P8: ¿Cómo se protegen las rutas del panel administrativo contra accesos no autorizados?
> **Respuesta:**
> *"En `src/App.jsx`, implementamos guardias de seguridad condicionales. Antes de renderizar cualquier vista administrativa que comience con `admin-`, el sistema consulta el estado `user` del `AuthContext`. Si el usuario no ha iniciado sesión, renderiza un mensaje de acceso restringido con enlace al Login. Si está autenticado pero su rol no es `Administrador` ni `Vendedor`, muestra un mensaje de permisos insuficientes. Además, la vista de usuarios (`admin-users`) está restringida de forma exclusiva para el rol `Administrador`."*

---

### P9: ¿Cómo solucionaron el límite de caracteres en la contraseña para usuarios como `vendedor123`?
> **Respuesta:**
> *"Originalmente los formularios tenían un límite estrecho de 10 caracteres. Dado que `vendedor123` posee 11 caracteres, ampliamos la regla de validación en `validatePassword` para aceptar entre 4 y 20 caracteres, y ajustamos el atributo `maxLength={20}` en los inputs de contraseña de Login, Registro y Administración de Usuarios, garantizando la compatibilidad con todas las cuentas del caso de estudio."*

---

### P10: ¿Qué aporta la herramienta Vite frente al Create React App tradicional?
> **Respuesta:**
> *"Vite utiliza servidores de desarrollo basados en ES Modules nativos del navegador y el empaquetador ultrarrápido Esbuild escrito en Go. Esto permite que el servidor arranque en menos de 300 milisegundos y que las actualizaciones de código en caliente (HMR - Hot Module Replacement) se reflejen de forma casi instantánea, superando con creces la lentitud y el sobrepeso de Create React App o Webpack puro en desarrollo."*

---

## 5. Resumen de Credenciales de Prueba para la Presentación

| Perfil de Usuario | Correo Electrónico | Contraseña | RUN (Módulo 11) | Permisos y Alcance |
| :--- | :--- | :--- | :--- | :--- |
| **Administrador** | `admin@duocuc.cl` | `admin123` | `19011022K` | Acceso total: Dashboard, Productos, Categorías, Usuarios y Órdenes. |
| **Vendedor** | `vendedor@duocuc.cl` | `vendedor123` | `181234567` | Acceso a Dashboard, Inventario de Productos, Categorías y Órdenes. |
| **Cliente** | `cliente@gmail.com` | `cliente123` | `201112223` | Navegación de catálogo, carrito, cupones, checkout y compras. |
| **Cupón Descuento** | Código: `PERRITO10` | N/A | N/A | **10% de descuento** directo en el subtotal del carrito. |
