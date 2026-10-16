/* Prueba 2: Renderizado individual de ProductCard con formato CLP y badge de oferta */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import ProductCard from '../components/ProductCard.jsx';

describe('Prueba 2: Renderizado de Tarjeta Individual ProductCard', () => {
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

  it('debe formatear el precio en CLP y mostrar la insignia de oferta', () => {
    const mockOfferProduct = {
      id: 'cama-oferta',
      codigo: 'CAM099',
      nombre: 'Cama Ergonómica Deluxe',
      precio: 25000,
      precioOferta: 19990,
      esOferta: true,
      stock: 6,
      stockCritico: 2,
      categoria: 'camas',
      imagen: 'cama.png'
    };

    act(() => {
      root.render(<ProductCard product={mockOfferProduct} />);
    });

    expect(container.textContent).toContain('Cama Ergonómica Deluxe');
    expect(container.textContent).toContain('$19.990');
    expect(container.textContent).toContain('$25.000');
    expect(container.textContent).toContain('OFERTA');
  });
});
