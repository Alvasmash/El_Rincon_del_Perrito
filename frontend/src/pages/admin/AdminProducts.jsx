/* Vista de Catálogo de Productos para Administración */
import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, getCategories } from '../../data/db';
import { formatCLP } from '../../data/validations';
import AlertStock from '../../components/AlertStock';

export default function AdminProducts({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
  }, []);

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
      deleteProduct(id);
      setProducts(getProducts());
      setMessage({ type: 'success', text: `Producto "${nombre}" eliminado correctamente.` });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filtered = products.filter(p => {
    const matchText = p.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
                      p.codigo.toLowerCase().includes(filterText.toLowerCase());
    const matchCat = filterCat === 'all' || p.categoria === filterCat;
    return matchText && matchCat;
  });

  return (
    <div className="container py-4">
      {/* Cabecera */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Gestión de Productos</h1>
          <p className="text-muted mb-0">Administra el inventario, precios y stock crítico de la tienda</p>
        </div>
        <button className="btn btn-primary mt-2 mt-sm-0" onClick={() => onNavigate('admin-product-new')}>
          <i className="bi bi-plus-lg me-1"></i> Agregar Producto
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Filtros */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o código (ej. CAM001)..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <select
                className="form-select"
                value={filterCat}
                onChange={e => setFilterCat(e.target.value)}
              >
                <option value="all">Todas las Categorías</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '80px' }}>Imagen</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Alerta</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No se encontraron productos que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={`/Imagenes/${p.imagen || 'cama.png'}`}
                          alt={p.nombre}
                          className="rounded object-fit-cover"
                          style={{ width: '50px', height: '50px' }}
                          onError={e => { e.target.src = '/Imagenes/cama.png'; }}
                        />
                      </td>
                      <td className="fw-semibold text-secondary">{p.codigo}</td>
                      <td>
                        <div className="fw-bold text-dark">{p.nombre}</div>
                        {p.esOferta && (
                          <span className="badge bg-warning text-dark me-1">Oferta</span>
                        )}
                        <small className="text-muted">{p.material}</small>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border text-capitalize">
                          {p.categoria}
                        </span>
                      </td>
                      <td>
                        {p.esOferta && p.precioOferta ? (
                          <div>
                            <div className="fw-bold text-danger">{formatCLP(p.precioOferta)}</div>
                            <small className="text-muted text-decoration-line-through">{formatCLP(p.precio)}</small>
                          </div>
                        ) : (
                          <span className="fw-bold">{formatCLP(p.precio)}</span>
                        )}
                      </td>
                      <td>
                        <span className={`fw-bold ${p.stock <= p.stockCritico ? 'text-danger' : 'text-dark'}`}>
                          {p.stock} un.
                        </span>
                      </td>
                      <td>
                        <AlertStock stock={p.stock} stockCritico={p.stockCritico} />
                      </td>
                      <td className="text-end">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onNavigate(`admin-product-edit/${p.id}`)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(p.id, p.nombre)}
                            title="Eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
