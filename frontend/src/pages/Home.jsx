/* Vista principal de la tienda con banner y productos destacados */
import React from 'react';
import { getProducts, getCategories } from '../data/db';
import { ProductCard } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext';

export function Home({ onNavigate }) {
  const { addToCart } = useCart();
  const products = getProducts();
  const categories = getCategories();
  const featured = products.slice(0, 8);

  return (
    <div className="container py-4">
      {/* Banner Principal (1200 x 300) */}
      <div className="position-relative rounded-4 overflow-hidden mb-5 shadow-sm text-white" style={{ minHeight: '320px', background: 'linear-gradient(rgba(15, 63, 82, 0.45), rgba(15, 63, 82, 0.45)), url(/Imagenes/banner.jpg) center/cover no-repeat' }}>
        <div className="p-4 p-md-5 d-flex flex-column justify-content-center" style={{ minHeight: '320px', maxWidth: '600px' }}>
          <span className="badge bg-warning text-dark align-self-start mb-2 fw-bold">Nuevos Lanzamientos</span>
          <h1 className="display-5 fw-bold text-white mb-2">TIENDA ONLINE</h1>
          <p className="lead text-light mb-4">
            Encuentra camas térmicas, juguetes resistentes y collares seguros para acompañar a tu perrito todos los días.
          </p>
          <div className="d-flex gap-2">
            <button onClick={() => onNavigate('products')} className="btn btn-perrito-primary btn-lg">
              Ver Catálogo
            </button>
            <button onClick={() => onNavigate('offers')} className="btn btn-warning btn-lg fw-bold">
              Ver Ofertas 🔥
            </button>
          </div>
        </div>
      </div>

      {/* Bloque de Categorías */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold m-0">Categorías Populares</h3>
          <button onClick={() => onNavigate('categories')} className="btn btn-link text-decoration-none">
            Ver todas &rarr;
          </button>
        </div>
        <div className="row g-3">
          {categories.slice(0, 4).map(cat => (
            <div key={cat.id} className="col-6 col-md-3">
              <div
                onClick={() => onNavigate('products', { category: cat.id })}
                className="card card-perrito text-center p-3 h-100 shadow-sm"
                style={{ cursor: 'pointer' }}
              >
                <h6 className="fw-bold text-primary m-0">{cat.nombre}</h6>
                <small className="text-muted">{cat.descripcion}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productos Destacados */}
      <div className="mb-5">
        <h3 className="fw-bold mb-3">Productos Destacados</h3>
        <div className="row g-4">
          {featured.map(prod => (
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
    </div>
  );
}

export default Home;
