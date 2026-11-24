/* Vista de Gestión de Categorías para el Administrador */
import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory, getProducts } from '../../data/db';

export default function AdminCategories({ onNavigate }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCat, setNewCat] = useState({ id: '', nombre: '', descripcion: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setCategories(getCategories());
    setProducts(getProducts());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const errs = {};
    if (!newCat.id.trim()) {
      errs.id = 'El identificador (ID) es obligatorio (ej: ropa, snack).';
    } else if (categories.some(c => c.id.toLowerCase() === newCat.id.trim().toLowerCase())) {
      errs.id = 'Ya existe una categoría con ese identificador.';
    }

    if (!newCat.nombre.trim()) {
      errs.nombre = 'El nombre de la categoría es obligatorio.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    createCategory({
      id: newCat.id.trim().toLowerCase(),
      nombre: newCat.nombre.trim(),
      descripcion: newCat.descripcion.trim()
    });

    setCategories(getCategories());
    setNewCat({ id: '', nombre: '', descripcion: '' });
    setErrors({});
    setMessage({ type: 'success', text: '¡Categoría agregada exitosamente!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = (id, nombre) => {
    const hasProducts = products.some(p => p.categoria === id);
    if (hasProducts) {
      alert(`No puedes eliminar la categoría "${nombre}" porque tiene productos asociados en el catálogo.`);
      return;
    }

    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${nombre}"?`)) {
      deleteCategory(id);
      setCategories(getCategories());
      setMessage({ type: 'info', text: `Categoría "${nombre}" eliminada.` });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="container py-4">
      {/* Cabecera */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Gestión de Categorías</h1>
          <p className="text-muted mb-0">Organiza los grupos de productos para facilitar la búsqueda</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => onNavigate('admin-dashboard')}>
          <i className="bi bi-arrow-left me-1"></i> Volver al Panel
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Formulario de nueva categoría */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Nueva Categoría</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAdd}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">ID / Slug *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    placeholder="ej: snacks"
                    value={newCat.id}
                    onChange={e => setNewCat({ ...newCat, id: e.target.value })}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                  <small className="text-muted">Identificador único en minúsculas sin espacios.</small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre de la Categoría *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    placeholder="ej: Snacks y Premios"
                    value={newCat.nombre}
                    onChange={e => setNewCat({ ...newCat, nombre: e.target.value })}
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Breve detalle de los productos que incluye..."
                    value={newCat.descripcion}
                    onChange={e => setNewCat({ ...newCat, descripcion: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  <i className="bi bi-plus-circle me-1"></i> Agregar Categoría
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla de categorías existentes */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Categorías Registradas</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Productos</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => {
                      const count = products.filter(p => p.categoria === cat.id).length;
                      return (
                        <tr key={cat.id}>
                          <td className="fw-mono small text-secondary">{cat.id}</td>
                          <td className="fw-bold text-dark">{cat.nombre}</td>
                          <td className="text-muted small">{cat.descripcion}</td>
                          <td>
                            <span className="badge bg-secondary">{count} prods</span>
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(cat.id, cat.nombre)}
                              title="Eliminar categoría"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
