/* Punto de Entrada Principal de la Aplicación en React */
import React from 'react';
import ReactDOM from 'react-dom/client';

// Estilos de Bootstrap 5, Bootstrap Icons y estilos corporativos personalizados
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
