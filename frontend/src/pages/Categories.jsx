/* Vista dedicada que separa los productos por categorías (Figura 4) */
import React, { useState, useEffect } from 'react';
import { getCategories, getProducts } from '../data/db';
import { getApiErrorMessage } from '../api/apiClient';
import { CategoryCard } from '../components/CategoryCard.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext';

export function Categories({ onNavigate }) {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState('camas');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
        if (active) {
          setCategories(cats);
          setProducts(prods);
          if (cats.length > 0 && !cats.some(c => c.id === selectedCat)) {
            setSelectedCat(cats[0].id);
          }
        }
      } catch (err) {
        if (active) setErrorMsg(getApiErrorMessage(err, 'No se pudieron cargar las categorías.'));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  const activeCategory = categories.find(c => c.id === selectedCat) || categories[0] || { nombre: '', descripcion: '' };
  const filteredProducts = products.filter(p => p.categoria === selectedCat);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-2">Categorías</h2>
      <p className="text-muted mb-4">Selecciona una categoría para ver los productos correspondientes.</p>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {loading ? (
        <div className="text-center py-5 text-muted">Cargando categorías...</div>
      ) : (
        <>
          {/* Cuadrícula superior de Categorías (Figura 4) */}
          <div className="row g-3 mb-5">
            {categories.map(cat => (
              <div key={cat.id} className="col-6 col-md-3">
                <CategoryCard
                  category={cat}
                  isSelected={selectedCat === cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                />
              </div>
            ))}
          </div>

          {/* Listado de productos de la categoría seleccionada */}
          <div className="border-top pt-4">
            <h4 className="fw-bold text-capitalize text-primary mb-3">
              {activeCategory.nombre}
            </h4>
            <p className="text-muted small mb-4">{activeCategory.descripcion}</p>

            {filteredProducts.length === 0 ? (
              <div className="alert alert-light border text-center py-4">
                No hay productos registrados en esta categoría aún.
              </div>
            ) : (
              <div className="row g-4">
                {filteredProducts.map(prod => (
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
        </>
      )}
    </div>
  );
}

export default Categories;
