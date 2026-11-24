/* Prueba 9: Simulación de evento clic Añadir al Carrito con Jasmine Spies */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import ProductCard from '../components/ProductCard.jsx';

describe('Prueba 9: Simulación de Evento Click en Añadir al Carrito', () => {
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

  it('debe disparar el callback onAddToCart con la información del producto', () => {
    const mockProduct = {
      id: 'juguete-mordedor',
      codigo: 'JUG002',
      nombre: 'Pelota Mordedora Dental',
      precio: 5990,
      stock: 10,
      stockCritico: 2,
      imagen: 'juguetesv2.png'
    };

    const onAddToCartSpy = jasmine.createSpy('onAddToCart');

    act(() => {
      root.render(<ProductCard product={mockProduct} onAddToCart={onAddToCartSpy} />);
    });

    const addBtn = container.querySelector('button');
    expect(addBtn).not.toBeNull();

    act(() => {
      addBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onAddToCartSpy).toHaveBeenCalledTimes(1);
    expect(onAddToCartSpy).toHaveBeenCalledWith(mockProduct);
  });
});
