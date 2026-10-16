# Documento de Cobertura de Testing Frontend
## Proyecto: Tienda Online "El Rincón del Perrito"
**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Institución:** Duoc UC — Escuela de Informática y Telecomunicaciones  
**Evaluación:** Evaluación Parcial N° 2 (30% de la Asignatura)  
**Herramientas:** Jasmine v5.1.2 + Karma v6.4.4 + Webpack v5.112.0 + Babel 7  
**Navegador de Ejecución:** Chromium / Microsoft Edge Headless (155.0.0.0 en Windows 10)  
**Resultado Global:** **15/15 Casos de Prueba Aprobados (100% de Éxito)**  
**Tiempo Total de Ejecución:** **0.113 segundos**

---

## 1. Resumen Ejecutivo
El presente informe documenta el diseño, implementación, ejecución y análisis de resultados del proceso de **pruebas unitarias para el frontend** de la tienda online "El Rincón del Perrito".

En estricto cumplimiento con las instrucciones de la Evaluación Parcial N° 2, se estructuró una suite de testing automatizada que valida las funciones clave de los componentes React, abarcando:
- **Renderizado correcto de componentes y listas** de elementos en el DOM virtual y real.
- **Renderizado condicional** para alertas de stock crítico y mensajes de error del sistema.
- **Paso y verificación de propiedades (`props`)** para personalización y control de estado (`disabled`, variantes de color).
- **Gestión reactiva del estado interno (`state`)** en formularios de autenticación y contacto.
- **Simulación de eventos del usuario** (`click`, `input`, `change`) e interceptación de funciones mediante espías (`spies`) de Jasmine.

---

## 2. Arquitectura del Entorno de Pruebas

### 2.1 Herramientas Empleadas
- **Jasmine Core (v5.1.2):** Framework de pruebas orientado al desarrollo guiado por comportamiento (BDD). Provee la sintaxis declarativa `describe`, `it`, `expect` y el sistema de espías `jasmine.createSpy`.
- **Karma Test Runner (v6.4.4):** Ejecutor de pruebas que orquesta el ciclo de vida del testeo, levantando un servidor web local y ejecutando los tests dentro de una instancia real de navegador.
- **Karma Webpack (v5.0.1) & Babel Loader (v9.1.3):** Empaquetador y transpilador que transforma el código JSX y la sintaxis moderna de ES6+ a JavaScript ejecutable en el navegador de pruebas.
- **Karma Chrome Launcher (v3.2.0):** Adaptador para ejecutar las pruebas en modo *Headless* (sin interfaz gráfica visible), optimizando el tiempo de ejecución a solo milisegundos.

### 2.2 Archivo de Configuración (`karma.conf.cjs`)
A continuación se detalla la configuración del entorno para garantizar la compatibilidad con módulos ES, React 18 y el navegador Chromium en entornos Windows:

```javascript
const fs = require('fs');

// Detección automática del binario Chromium / Microsoft Edge en Windows
if (!process.env.CHROME_BIN) {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (fs.existsSync(edgePath)) {
    process.env.CHROME_BIN = edgePath;
  } else if (fs.existsSync(chromePath)) {
    process.env.CHROME_BIN = chromePath;
  }
}

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            resolve: { fullySpecified: false }, // Compatibilidad estricta con ES Modules
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'], fullySpecified: false },
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
```

---

## 3. Matriz de Cobertura y Detalle de las 10 Pruebas Unitarias

La suite consta de 10 archivos de especificación (`.spec.js`) organizados en `src/tests/`, totalizando 15 casos de prueba unitarios:

| N° | Archivo de Prueba | Componente Testeado | Concepto Evaluado | Resultado |
| :---: | :--- | :--- | :--- | :---: |
| **01** | `01_ProductListRender.spec.js` | `<ProductCard />` (Lista) | **Renderizado de listas:** Comprueba que un array de $N$ productos genere exactamente $N$ tarjetas en el DOM con sus títulos correspondientes. | **APROBADO** |
| **02** | `02_ProductCardRender.spec.js` | `<ProductCard />` (Individual) | **Renderizado y Formateo:** Valida el formateo de moneda chilena (`$19.990`), visualización de precio normal tachado y badge de `OFERTA`. | **APROBADO** |
| **03** | `03_AlertStockConditional.spec.js` | `<AlertStock />` | **Renderizado condicional (3 casos):** 1. Stock suficiente (no renderiza nada). 2. Stock crítico (`stock <= stockCritico` muestra `.alert-warning`). 3. Stock agotado (`stock === 0` muestra `.alert-danger`). | **APROBADO** |
| **04** | `04_ErrorMessageConditional.spec.js` | `<ToastAlert />` | **Renderizado condicional:** Valida que sin mensaje devuelva `null` y con mensaje renderice la clase `.bg-danger` con el texto de advertencia. | **APROBADO** |
| **05** | `05_ButtonProps.spec.js` | `<CustomButton />` | **Props recibidas:** Comprueba que la prop `label` se inserte como texto, `variant="success"` aplique la clase `.btn-success` y `disabled={true}` desactive el botón en el DOM. | **APROBADO** |
| **06** | `06_RoleBadgeProps.spec.js` | `<RoleBadge />` | **Props y Estilos (3 casos):** Valida la asignación de colores según rol: `Administrador` (`bg-primary`), `Vendedor` (`bg-success`), `Cliente` (`bg-secondary`). | **APROBADO** |
| **07** | `07_LoginFormState.spec.js` | `<MockLoginForm />` | **Gestión de State (Inputs):** Simula la escritura del usuario en campos de correo y contraseña, verificando que el estado reactivo actualice el valor del input. | **APROBADO** |
| **08** | `08_ContactFormState.spec.js` | `<MockContactForm />` | **Gestión de State (Textarea):** Comprueba que la entrada de texto en el textarea actualice reactivamente el contador de caracteres en tiempo real. | **APROBADO** |
| **09** | `09_AddToCartEvent.spec.js` | `<ProductCard />` | **Simulación de Eventos (Click):** Dispara un clic en "Añadir al Carrito" y valida que el espía de Jasmine (`onAddToCartSpy`) sea invocado con los datos del producto. | **APROBADO** |
| **10** | `10_CartQuantityEvent.spec.js` | `<MockCartRow />` | **Simulación de Eventos (Carrito):** Dispara clics en los botones `+`, `-` y `Eliminar`, comprobando que los espías reciban los nuevos valores numéricos e IDs. | **APROBADO** |

---

## 4. Estrategia de Mocks y Aislamiento de Componentes

Para asegurar que las pruebas unitarias evalúen el componente en estricto aislamiento sin depender de servicios externos o estados globales impuros, se aplicaron las siguientes técnicas:

### 4.1 Uso de Jasmine Spies (`jasmine.createSpy`)
Permite capturar las llamadas a funciones propagadas por eventos:
```javascript
const onAddToCartSpy = jasmine.createSpy('onAddToCart');

act(() => {
  root.render(<ProductCard product={mockProduct} onAddToCart={onAddToCartSpy} />);
});

const addBtn = container.querySelector('button');
act(() => {
  addBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});

expect(onAddToCartSpy).toHaveBeenCalledTimes(1);
expect(onAddToCartSpy).toHaveBeenCalledWith(mockProduct);
```

### 4.2 Simulación de Eventos del DOM en React 18
React 18 utiliza listeners sintéticos sobre los elementos HTML. Para simular con precisión la escritura del usuario en campos controlados, se interactuó con los descriptores de propiedades nativos:
```javascript
const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
setter.call(textarea, 'Consulta sobre camas ortopédicas para perro pastor alemán');
textarea.dispatchEvent(new Event('input', { bubbles: true }));
textarea.dispatchEvent(new Event('change', { bubbles: true }));
```

---

## 5. Evidencia de Ejecución Exitosa

A continuación se transcribe la salida real emitida por la terminal al ejecutar el comando institucional `npm test`:

```text
> el-rincon-del-perrito@2.0.0 test
> karma start karma.conf.cjs

Webpack bundling...
asset commons.js 1.21 MiB [emitted] (name: commons) (id hint: commons)
asset runtime.js 6.82 KiB [emitted] (name: runtime)
asset 04_ErrorMessageConditional.spec.2859531535.js 1.04 KiB [emitted]
asset 03_AlertStockConditional.spec.4199298217.js 1.03 KiB [emitted]
asset 01_ProductListRender.spec.868006088.js 1.03 KiB [emitted]
asset 02_ProductCardRender.spec.632311457.js 1.03 KiB [emitted]
asset 10_CartQuantityEvent.spec.301649086.js 1.03 KiB [emitted]
asset 08_ContactFormState.spec.790449666.js 1.02 KiB [emitted]
asset 07_LoginFormState.spec.2815939044.js 1.02 KiB [emitted]
asset 06_RoleBadgeProps.spec.447179352.js 1.02 KiB [emitted]
asset 09_AddToCartEvent.spec.266681416.js 1.02 KiB [emitted]
asset 05_ButtonProps.spec.3528022706.js 1.01 KiB [emitted]
webpack 5.112.0 compiled successfully in 2599 ms

16 10 2026 19:19:25.205:INFO [karma-server]: Karma v6.4.4 server started at http://localhost:9876/
16 10 2026 19:19:25.208:INFO [launcher]: Launching browsers ChromeHeadless with concurrency unlimited
16 10 2026 19:19:25.216:INFO [launcher]: Starting browser ChromeHeadless
16 10 2026 19:19:26.719:INFO [Edge 155.0.0.0 (Windows 10)]: Connected on socket with id 24219926
Edge 155.0.0.0 (Windows 10): Executed 1 of 15 SUCCESS (0 secs / 0.029 secs)
Edge 155.0.0.0 (Windows 10): Executed 2 of 15 SUCCESS (0 secs / 0.035 secs)
Edge 155.0.0.0 (Windows 10): Executed 3 of 15 SUCCESS (0 secs / 0.039 secs)
Edge 155.0.0.0 (Windows 10): Executed 4 of 15 SUCCESS (0 secs / 0.04 secs)
Edge 155.0.0.0 (Windows 10): Executed 5 of 15 SUCCESS (0 secs / 0.042 secs)
Edge 155.0.0.0 (Windows 10): Executed 6 of 15 SUCCESS (0 secs / 0.043 secs)
Edge 155.0.0.0 (Windows 10): Executed 7 of 15 SUCCESS (0 secs / 0.047 secs)
Edge 155.0.0.0 (Windows 10): Executed 8 of 15 SUCCESS (0 secs / 0.05 secs)
Edge 155.0.0.0 (Windows 10): Executed 9 of 15 SUCCESS (0 secs / 0.059 secs)
Edge 155.0.0.0 (Windows 10): Executed 10 of 15 SUCCESS (0 secs / 0.066 secs)
Edge 155.0.0.0 (Windows 10): Executed 11 of 15 SUCCESS (0 secs / 0.067 secs)
Edge 155.0.0.0 (Windows 10): Executed 12 of 15 SUCCESS (0 secs / 0.068 secs)
Edge 155.0.0.0 (Windows 10): Executed 13 of 15 SUCCESS (0 secs / 0.069 secs)
Edge 155.0.0.0 (Windows 10): Executed 14 of 15 SUCCESS (0 secs / 0.071 secs)
Edge 155.0.0.0 (Windows 10): Executed 15 of 15 SUCCESS (0 secs / 0.089 secs)
Edge 155.0.0.0 (Windows 10): Executed 15 of 15 SUCCESS (0.113 secs / 0.089 secs)
TOTAL: 15 SUCCESS
```

---

## 6. Conclusión Técnica del Proceso de Testing
La integración de Jasmine y Karma demostró ser una solución altamente eficiente para asegurar la robustez de los componentes frontend en React 18:
1. **Detección temprana de errores:** Asegura que cambios futuros en estilos o lógica de componentes no rompan contratos de interfaz ni el renderizado condicional.
2. **Alta velocidad de retroalimentación:** La suite completa de 15 pruebas se ejecuta en apenas **113 milisegundos**, permitiendo su incorporación transparente en flujos de integración continua (CI/CD).
3. **Calidad de software garantizada:** El 100% de éxito en los 15 casos de prueba avala el cumplimiento riguroso de los indicadores de evaluación exigidos en la asignatura DSY1104.
