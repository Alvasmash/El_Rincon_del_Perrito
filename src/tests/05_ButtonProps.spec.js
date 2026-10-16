/* Prueba 5: Verificación de propiedades (props) recibidas en CustomButton */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import CustomButton from '../components/CustomButton.jsx';

describe('Prueba 5: Props recibidas en Componente Botón Reutilizable', () => {
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

  it('debe reflejar en el DOM el label, variante CSS y estado disabled', () => {
    act(() => {
      root.render(
        <CustomButton
          label="Pagar Pedido"
          variant="success"
          disabled={true}
          className="w-100"
        />
      );
    });

    const btn = container.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toBe('Pagar Pedido');
    expect(btn.classList.contains('btn-success')).toBe(true);
    expect(btn.disabled).toBe(true);
  });
});
