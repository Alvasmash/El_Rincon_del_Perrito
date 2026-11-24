/* Catálogo completo con buscador y filtros de categorías */
import React, { useState } from 'react';
import { getProducts, getCategories } from '../data/db';
import { ProductCard } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext';

export function Products({ onNavigate, initialCategory = '', initialSearch = '' }) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState('default');

  const products = getProducts();
  const categories = getCategories();

  /* Filtrado por categoría y búsqueda */
  let filtered = products.filter(p => {
    const matchesCat = !selectedCategory || p.categoria === selectedCategory;
    const matchesSearch = !searchTerm || p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  /* Ordenar por precio */
  if (sortOrder === 'asc') filtered.sort((a, b) => a.precio - b.precio);
  if (sortOrder === 'desc') filtered.sort((a, b) => b.precio - a.precio);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Catálogo de Productos</h2>
      <p className="text-muted mb-4">Explora todos los artículos disponibles para tu mascota.</p>

      {/* Barra de Filtros */}
      <div className="card p-3 mb-4 shadow-sm bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Orden por defecto</option>
              <option value="asc">Precio: Menor a Mayor</option>
              <option value="desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3 text-muted small">
        Mostrando <strong>{filtered.length}</strong> producto(s) encontrados.
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-info py-4 text-center">
          No se encontraron productos que coincidan con los filtros aplicados.
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map(prod => (
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

export default Products;
