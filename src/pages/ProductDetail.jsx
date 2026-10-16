/* Vista de detalle de producto con galería y selector de unidades */
import React, { useState } from 'react';
import { getProductById, getProducts } from '../data/db';
import { formatPrice } from '../data/validations';
import { AlertStock } from '../components/AlertStock.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext';

export function ProductDetail({ productId, onNavigate }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(null);

  const product = getProductById(productId);
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Producto no encontrado</h3>
        <button onClick={() => onNavigate('products')} className="btn btn-perrito-primary mt-3">Volver al catálogo</button>
      </div>
    );
  }

  const currentImg = activeImg || ('/Imagenes/' + (product.imagen || 'cama.png'));
  const related = getProducts().filter(p => p.categoria === product.categoria && p.id !== product.id).slice(0, 4);
  const maxStock = product.stock ?? 0;
  const isOutOfStock = maxStock <= 0;

  return (
    <div className="container py-4">
      {/* Miga de pan */}
      <nav aria-label="breadcrumb" className="mb-3 small">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><button onClick={() => onNavigate('home')} className="btn btn-link p-0 text-decoration-none">Home</button></li>
          <li className="breadcrumb-item"><button onClick={() => onNavigate('products')} className="btn btn-link p-0 text-decoration-none">Productos</button></li>
          <li className="breadcrumb-item active">{product.nombre}</li>
        </ol>
      </nav>

      <div className="row g-4 bg-white p-4 rounded-4 shadow-sm mb-5">
        {/* Galería de fotos */}
        <div className="col-md-6">
          <div className="bg-light p-4 rounded d-flex align-items-center justify-content-center mb-3" style={{ height: '360px' }}>
            <img src={currentImg} alt={product.nombre} style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
          <div className="d-flex gap-2">
            {['/Imagenes/' + product.imagen, '/Imagenes/pata_perrito.png'].map((src, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(src)}
                className="border rounded p-1 bg-light cursor-pointer"
                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
              >
                <img src={src} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Información y compra */}
        <div className="col-md-6 d-flex flex-column">
          <span className="badge bg-info text-dark align-self-start mb-2 text-uppercase">{product.categoria}</span>
          <h2 className="fw-bold">{product.nombre}</h2>
          <p className="text-muted small">Código: <strong>{product.codigo}</strong> | Material: {product.material || 'Estándar'}</p>

          <div className="fs-2 fw-bold text-primary mb-3">
            {formatPrice(product.esOferta && product.precioOferta ? product.precioOferta : product.precio)}
          </div>

          <p className="lead fs-6 text-secondary mb-4">{product.descripcion}</p>

          {/* Componente condicional de alerta de stock */}
          <AlertStock stock={product.stock} stockCritico={product.stockCritico} />

          {!isOutOfStock && (
            <div className="d-flex align-items-center gap-3 my-3">
              <label className="fw-bold">Cantidad:</label>
              <div className="input-group" style={{ width: '130px' }}>
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="text" className="form-control text-center fw-bold" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}>+</button>
              </div>
              <span className="small text-muted">({maxStock} disponibles)</span>
            </div>
          )}

          <div className="mt-auto pt-3 border-top">
            <button
              disabled={isOutOfStock}
              onClick={() => addToCart(product, quantity)}
              className="btn btn-perrito-primary btn-lg w-100 fw-bold"
            >
              {isOutOfStock ? 'Sin stock disponible' : 'Añadir al Carrito de Compras'}
            </button>
          </div>
        </div>
      </div>

      {/* Productos Relacionados */}
      {related.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold mb-3">Productos Relacionados</h4>
          <div className="row g-4">
            {related.map(r => (
              <div key={r.id} className="col-6 col-md-3">
                <ProductCard product={r} onAddToCart={(p) => addToCart(p)} onSelect={(id) => onNavigate('product-detail', { id })} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
