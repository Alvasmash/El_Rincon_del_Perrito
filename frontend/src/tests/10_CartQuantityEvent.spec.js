/* Prueba 10: Simulación de eventos de incremento y decremento de cantidad en Carrito */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';

function MockCartRow({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-row">
      <span className="item-name">{item.nombre}</span>
      <span className="item-qty">{item.quantity}</span>
      <button
        data-testid="btn-decrease"
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
      >
        -
      </button>
      <button
        data-testid="btn-increase"
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        +
      </button>
      <button data-testid="btn-remove" onClick={() => onRemove(item.id)}>
        Eliminar
      </button>
    </div>
  );
}

describe('Prueba 10: Simulación de Eventos de Cantidad en el Carrito', () => {
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

  it('debe ejecutar los callbacks al presionar botones de incremento, decremento y eliminar', () => {
    const mockItem = { id: 'p1', nombre: 'Cama Térmica', quantity: 2, precio: 19990 };
    const updateSpy = jasmine.createSpy('onUpdateQuantity');
    const removeSpy = jasmine.createSpy('onRemove');

    act(() => {
      root.render(
        <MockCartRow
          item={mockItem}
          onUpdateQuantity={updateSpy}
          onRemove={removeSpy}
        />
      );
    });

    const incBtn = container.querySelector('[data-testid="btn-increase"]');
    const decBtn = container.querySelector('[data-testid="btn-decrease"]');
    const remBtn = container.querySelector('[data-testid="btn-remove"]');

    act(() => {
      incBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(updateSpy).toHaveBeenCalledWith('p1', 3);

    act(() => {
      decBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(updateSpy).toHaveBeenCalledWith('p1', 1);

    act(() => {
      remBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(removeSpy).toHaveBeenCalledWith('p1');
  });
});
