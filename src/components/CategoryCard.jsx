/* Tarjeta de categoría interactiva para la vista de Categorías */
import React from 'react';

export function CategoryCard({ category, isSelected, onClick }) {
  const images = {
    camas: 'cama.png',
    juguetes: 'juguetesv3.png',
    collares: 'collarv2.png',
    ofertas: 'bannerv2.jpg'
  };

  return (
    <div
      onClick={onClick}
      className={'card text-center p-3 h-100 shadow-sm cursor-pointer ' + (isSelected ? 'border-primary border-3 bg-light' : 'border')}
      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
    >
      <div className="d-flex align-items-center justify-content-center bg-white rounded p-2 mb-2" style={{ height: '100px' }}>
        <img
          src={'/Imagenes/' + (images[category.id] || 'pata_perrito.png')}
          alt={category.nombre}
          style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>
      <h6 className="fw-bold mb-1">{category.nombre}</h6>
      <p className="small text-muted mb-0">{category.descripcion}</p>
    </div>
  );
}

export default CategoryCard;
