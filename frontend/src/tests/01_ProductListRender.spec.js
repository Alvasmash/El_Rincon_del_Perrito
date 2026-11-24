/* Prueba 1: Renderizado correcto de lista de productos */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import ProductCard from '../components/ProductCard.jsx';

describe('Prueba 1: Renderizado de Lista de Productos', () => {
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

  it('debe renderizar todos los productos del listado con sus respectivos títulos', () => {
    const mockProducts = [
      { id: 'p1', codigo: 'CAM001', nombre: 'Cama Madera', precio: 15000, stock: 5, stockCritico: 2, imagen: 'cama.png' },
      { id: 'p2', codigo: 'JUG001', nombre: 'Pelota Goma', precio: 4000, stock: 10, stockCritico: 3, imagen: 'juguetes.png' },
      { id: 'p3', codigo: 'COL001', nombre: 'Collar Rojo', precio: 8000, stock: 7, stockCritico: 2, imagen: 'collares.png' }
    ];

    act(() => {
      root.render(
        <div className="product-list">
          {mockProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      );
    });

    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(3);
    expect(container.textContent).toContain('Cama Madera');
    expect(container.textContent).toContain('Pelota Goma');
    expect(container.textContent).toContain('Collar Rojo');
  });
});
