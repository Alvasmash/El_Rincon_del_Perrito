/* Vista de ofertas con productos rebajados y promociones especiales */
import React from 'react';
import { getProducts } from '../data/db';
import { ProductCard } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext';

export function Offers({ onNavigate }) {
  const { addToCart } = useCart();
  const offers = getProducts().filter(p => p.esOferta);

  return (
    <div className="container py-4">
      <div className="bg-danger text-white p-4 p-md-5 rounded-4 mb-5 shadow-sm text-center">
        <span className="badge bg-warning text-dark fs-6 fw-bold mb-2">Descuentos Especiales</span>
        <h1 className="display-5 fw-bold">OFERTAS Y PROMOCIONES 🔥</h1>
        <p className="lead mb-0">Aprovecha los mejores precios en camas, juguetes y accesorios por tiempo limitado.</p>
      </div>

      <h3 className="fw-bold mb-3">Productos en Descuento</h3>
      <div className="row g-4">
        {offers.map(prod => (
          <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard
              product={prod}
              onAddToCart={(p) => addToCart(p)}
              onSelect={(id) => onNavigate('product-detail', { id })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
