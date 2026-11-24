/* Vista de ofertas con productos rebajados y promociones especiales */
import React, { useState, useEffect } from 'react';
import { getProducts } from '../data/db';
import { getApiErrorMessage } from '../api/apiClient';
import { ProductCard } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext';

export function Offers({ onNavigate }) {
  const { addToCart } = useCart();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;
    async function loadOffers() {
      try {
        const prods = await getProducts();
        if (active) setOffers(prods.filter(p => p.esOferta));
      } catch (err) {
        if (active) setErrorMsg(getApiErrorMessage(err, 'No se pudieron cargar las ofertas.'));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadOffers();
    return () => { active = false; };
  }, []);

  return (
    <div className="container py-4">
      <div className="bg-danger text-white p-4 p-md-5 rounded-4 mb-5 shadow-sm text-center">
        <span className="badge bg-warning text-dark fs-6 fw-bold mb-2">Descuentos Especiales</span>
        <h1 className="display-5 fw-bold">OFERTAS Y PROMOCIONES 🔥</h1>
        <p className="lead mb-0">Aprovecha los mejores precios en camas, juguetes y accesorios por tiempo limitado.</p>
      </div>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <h3 className="fw-bold mb-3">Productos en Descuento</h3>
      {loading ? (
        <div className="text-center py-4 text-muted">Cargando ofertas...</div>
      ) : (
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
      )}
    </div>
  );
}

export default Offers;
