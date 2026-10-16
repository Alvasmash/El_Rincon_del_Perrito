/* Prueba 4: Renderizado condicional de mensaje de error con ToastAlert */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import ToastAlert from '../components/ToastAlert.jsx';

describe('Prueba 4: Renderizado Condicional de Mensajes de Error', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    act(() => {
      if (root) root.unmount();
    });
    if (container) {
      container.remove();
      container = null;
    }
  });

  it('no debe renderizar nada si el mensaje está vacío o nulo', () => {
    act(() => {
      root.render(<ToastAlert message="" />);
    });
    expect(container.innerHTML).toBe('');
  });

  it('debe renderizar el mensaje de error con estilo danger cuando se suministra', () => {
    act(() => {
      root.render(<ToastAlert message="Contraseña o correo inválido" type="danger" />);
    });
    expect(container.textContent).toContain('Contraseña o correo inválido');
    expect(container.querySelector('.bg-danger')).not.toBeNull();
  });
});
