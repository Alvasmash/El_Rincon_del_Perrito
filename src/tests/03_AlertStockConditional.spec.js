/* Prueba 3: Renderizado condicional de stock crítico con AlertStock */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import AlertStock from '../components/AlertStock.jsx';

describe('Prueba 3: Renderizado Condicional de Stock Crítico', () => {
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

  it('no debe renderizar alerta si el stock es suficiente', () => {
    act(() => {
      root.render(<AlertStock stock={15} stockCritico={3} />);
    });
    expect(container.innerHTML).toBe('');
  });

  it('debe renderizar alerta de advertencia cuando el stock es igual o menor al crítico', () => {
    act(() => {
      root.render(<AlertStock stock={2} stockCritico={3} />);
    });
    expect(container.textContent).toContain('Atención Stock Crítico');
    expect(container.querySelector('.alert-warning')).not.toBeNull();
  });

  it('debe renderizar alerta de peligro cuando el producto está agotado (stock 0)', () => {
    act(() => {
      root.render(<AlertStock stock={0} stockCritico={3} />);
    });
    expect(container.textContent).toContain('Producto Agotado');
    expect(container.querySelector('.alert-danger')).not.toBeNull();
  });
});
