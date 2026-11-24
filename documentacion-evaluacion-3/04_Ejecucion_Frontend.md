# 04. Ejecución del Frontend desde Visual Studio Code

El frontend está en la carpeta `frontend/` y fue construido con **React 18.3.1**, **Vite 5.3.4**, **Bootstrap 5.3.3** y **Axios**. Para las pruebas unitarias utiliza **Jasmine 5** y **Karma 6**.

## 1. Cómo abrir el proyecto en Visual Studio Code

1. Abre **Visual Studio Code**.
2. Ve a **Archivo -> Abrir carpeta** (`File -> Open Folder`).
3. Selecciona la carpeta:
   `C:\Users\zente\OneDrive\Escritorio\Rincon_Perrito\El_Rincon_del_Perrito\frontend`
4. Abre la terminal integrada de VS Code (`Ctrl + ñ` o menú **Terminal -> Nuevo terminal**).

## 2. Instalar dependencias (solo la primera vez o si cambian paquetes)

Si todavía no existe la carpeta `node_modules` dentro de `frontend/`, ejecuta:

```powershell
npm.cmd install
```

*(Nota para Windows PowerShell: si `npm` muestra un error de política de ejecución de scripts `npm.ps1`, usa `npm.cmd` o abre una terminal Command Prompt `cmd` en VS Code).*

## 3. Iniciar el servidor de desarrollo

Con el backend ya corriendo en el puerto `8080`, ejecuta dentro de `frontend/`:

```powershell
npm.cmd run dev
```

*(También funciona `npm.cmd start` porque ambos scripts en `package.json` ejecutan `vite`).*

Resultado esperado en consola:
- Vite inicia en unos segundos y muestra la dirección: `http://localhost:3000/`.
- El navegador se abre automáticamente en `http://localhost:3000`.

## 4. Ejecutar las pruebas unitarias del frontend (Jasmine + Karma)

Para correr los 10 archivos de prueba (`src/tests/*.spec.js` con 15 casos en total):

```powershell
npm.cmd test
```

Resultado esperado:
- Webpack compila los archivos `.spec.js`.
- Karma abre Edge o Chrome en modo headless.
- Al finalizar muestra `TOTAL: 15 SUCCESS`.

## 5. Compilar versión de producción

Para comprobar que todo el código React compila sin errores:

```powershell
npm.cmd run build
```

Esto genera la carpeta `frontend/dist/`.

## 6. Errores comunes al iniciar el frontend

- **La página abre pero aparece "No se pudieron cargar los productos del backend":** El backend no está corriendo en `http://localhost:8080` o Docker está detenido. Revisa que `http://localhost:8080/api/products` responda primero.
- **Error de CORS en la consola del navegador:** Verifica en `SecurityConfig.java` que el origen `http://localhost:3000` esté permitido.
- **Error de PowerShell `npm.ps1` deshabilitado:** Usa `npm.cmd` en lugar de `npm`.
