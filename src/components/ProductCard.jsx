/* Componente de tarjeta de producto (Single Responsibility) */
import React from 'react';
import { formatPrice } from '../data/validations';

export function ProductCard({ product, onAddToCart, onSelect }) {
  if (!product) return null;
  const isOutOfStock = (product.stock ?? 0) <= 0;
  const isLowStock = !isOutOfStock && product.stockCritico && product.stock <= product.stockCritico;
  const finalPrice = product.esOferta && product.precioOferta ? product.precioOferta : product.precio;

  return (
    <div className="card h-100 card-perrito shadow-sm position-relative">
      {/* Badge de oferta */}
      {product.esOferta && (
        <span className="position-absolute top-0 start-0 m-2 badge badge-oferta">
          OFERTA
        </span>
      )}

      {/* Imagen */}
      <div
        className="d-flex align-items-center justify-content-center p-3 bg-light rounded-top"
        style={{ height: '180px', cursor: 'pointer' }}
        onClick={() => onSelect && onSelect(product.id)}
      >
        <img
          src={'/Imagenes/' + (product.imagen || 'cama.png')}
          alt={product.nombre}
          style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>

      <div className="card-body d-flex flex-column p-3">
        <span className="badge bg-light text-primary border align-self-start mb-2 text-uppercase small">
          {product.categoria}
        </span>
        <h6
          className="card-title fw-bold text-truncate mb-1"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect && onSelect(product.id)}
          title={product.nombre}
        >
          {product.nombre}
        </h6>
        <p className="card-text text-muted small flex-grow-1" style={{ fontSize: '0.85rem' }}>
          {product.descripcion ? product.descripcion.slice(0, 65) + '...' : ''}
        </p>

        {/* Alerta stock crítico en tarjeta */}
        {isLowStock && (
          <div className="text-warning fw-bold small mb-1">
            ⚠️ ¡Últimas {product.stock} unidades!
          </div>
        )}

        {/* Precios */}
        <div className="d-flex align-items-baseline gap-2 my-2">
          <span className="fs-5 fw-bold text-primary">{formatPrice(finalPrice)}</span>
          {product.esOferta && product.precioOferta && (
            <span className="text-muted text-decoration-line-through small">
              {formatPrice(product.precio)}
            </span>
          )}
        </div>

        {/* Botón de acción */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => onAddToCart && onAddToCart(product)}
          className={'btn btn-sm w-100 fw-bold ' + (isOutOfStock ? 'btn-secondary' : 'btn-perrito-primary')}
        >
          {isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
