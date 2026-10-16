/* Formulario de Creación y Edición de Productos con validaciones */
import React, { useState, useEffect } from 'react';
import { getProducts, getProductById, createProduct, updateProduct, getCategories } from '../../data/db';

export default function AdminProductForm({ productId, onNavigate }) {
  const isEdit = Boolean(productId);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    esOferta: false,
    precioOferta: '',
    stock: '',
    stockCritico: 3,
    categoria: 'camas',
    material: '',
    imagen: 'cama.png'
  });
  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    const cats = getCategories();
    setCategories(cats);

    if (isEdit) {
      const prod = getProductById(productId);
      if (prod) {
        setFormData({
          codigo: prod.codigo || '',
          nombre: prod.nombre || '',
          descripcion: prod.descripcion || '',
          precio: prod.precio || '',
          esOferta: Boolean(prod.esOferta),
          precioOferta: prod.precioOferta || '',
          stock: prod.stock !== undefined ? prod.stock : '',
          stockCritico: prod.stockCritico || 3,
          categoria: prod.categoria || (cats[0]?.id || 'camas'),
          material: prod.material || '',
          imagen: prod.imagen || 'cama.png'
        });
      }
    }
  }, [productId, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.codigo.trim()) {
      errs.codigo = 'El código del producto es obligatorio (ej: CAM001).';
    } else if (formData.codigo.trim().length < 3) {
      errs.codigo = 'El código debe tener al menos 3 caracteres.';
    }

    if (!formData.nombre.trim()) {
      errs.nombre = 'El nombre es obligatorio.';
    } else if (formData.nombre.trim().length < 3) {
      errs.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    const precioNum = Number(formData.precio);
    if (!formData.precio || isNaN(precioNum) || precioNum <= 0) {
      errs.precio = 'El precio debe ser un número positivo mayor a 0.';
    }

    if (formData.esOferta) {
      const ofertaNum = Number(formData.precioOferta);
      if (!formData.precioOferta || isNaN(ofertaNum) || ofertaNum <= 0) {
        errs.precioOferta = 'El precio de oferta debe ser mayor a 0.';
      } else if (ofertaNum >= precioNum) {
        errs.precioOferta = 'El precio de oferta debe ser menor al precio normal.';
      }
    }

    const stockNum = Number(formData.stock);
    if (formData.stock === '' || isNaN(stockNum) || stockNum < 0) {
      errs.stock = 'El stock debe ser un número entero mayor o igual a 0.';
    }

    const criticoNum = Number(formData.stockCritico);
    if (formData.stockCritico === '' || isNaN(criticoNum) || criticoNum < 0) {
      errs.stockCritico = 'El stock crítico debe ser mayor o igual a 0.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      codigo: formData.codigo.trim().toUpperCase(),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: Number(formData.precio),
      esOferta: Boolean(formData.esOferta),
      precioOferta: formData.esOferta && formData.precioOferta ? Number(formData.precioOferta) : null,
      stock: Number(formData.stock),
      stockCritico: Number(formData.stockCritico),
      categoria: formData.categoria,
      material: formData.material.trim(),
      imagen: formData.imagen
    };

    if (isEdit) {
      updateProduct(productId, payload);
      setStatusMsg({ type: 'success', text: '¡Producto actualizado exitosamente!' });
    } else {
      createProduct(payload);
      setStatusMsg({ type: 'success', text: '¡Producto creado exitosamente!' });
    }

    setTimeout(() => {
      onNavigate('admin-products');
    }, 1200);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 fw-bold text-dark mb-0">
              {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate('admin-products')}>
              <i className="bi bi-arrow-left me-1"></i> Volver a la lista
            </button>
          </div>

          {statusMsg && (
            <div className={`alert alert-${statusMsg.type} fade show`} role="alert">
              {statusMsg.text}
            </div>
          )}

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* Código */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Código del Producto *</label>
                    <input
                      type="text"
                      name="codigo"
                      className={`form-control ${errors.codigo ? 'is-invalid' : ''}`}
                      placeholder="Ej: CAM001"
                      value={formData.codigo}
                      onChange={handleChange}
                    />
                    {errors.codigo && <div className="invalid-feedback">{errors.codigo}</div>}
                  </div>

                  {/* Categoría */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Categoría *</label>
                    <select
                      name="categoria"
                      className="form-select"
                      value={formData.categoria}
                      onChange={handleChange}
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nombre */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Nombre del Producto *</label>
                    <input
                      type="text"
                      name="nombre"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      placeholder="Ej: Cama de Madera para Perrito"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>

                  {/* Descripción */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea
                      name="descripcion"
                      className="form-control"
                      rows="3"
                      placeholder="Detalles sobre el producto, beneficios, tamaño..."
                      value={formData.descripcion}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Precios */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Precio Normal ($ CLP) *</label>
                    <input
                      type="number"
                      name="precio"
                      className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                      placeholder="14990"
                      value={formData.precio}
                      onChange={handleChange}
                    />
                    {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-check mt-md-4 pt-md-2">
                      <input
                        type="checkbox"
                        id="esOferta"
                        name="esOferta"
                        className="form-check-input"
                        checked={formData.esOferta}
                        onChange={handleChange}
                      />
                      <label htmlFor="esOferta" className="form-check-label fw-semibold">
                        ¿Activar precio en Oferta?
                      </label>
                    </div>
                  </div>

                  {formData.esOferta && (
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-danger">Precio Oferta ($ CLP) *</label>
                      <input
                        type="number"
                        name="precioOferta"
                        className={`form-control ${errors.precioOferta ? 'is-invalid' : ''}`}
                        placeholder="11990"
                        value={formData.precioOferta}
                        onChange={handleChange}
                      />
                      {errors.precioOferta && <div className="invalid-feedback">{errors.precioOferta}</div>}
                    </div>
                  )}

                  {/* Stock y Stock Crítico */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Stock Actual *</label>
                    <input
                      type="number"
                      name="stock"
                      className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                      placeholder="10"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                    {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Stock Crítico (Mínimo de alerta) *</label>
                    <input
                      type="number"
                      name="stockCritico"
                      className={`form-control ${errors.stockCritico ? 'is-invalid' : ''}`}
                      placeholder="3"
                      value={formData.stockCritico}
                      onChange={handleChange}
                    />
                    {errors.stockCritico && <div className="invalid-feedback">{errors.stockCritico}</div>}
                  </div>

                  {/* Material e Imagen */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Material / Composición</label>
                    <input
                      type="text"
                      name="material"
                      className="form-control"
                      placeholder="Ej: Madera de Pino, Algodón..."
                      value={formData.material}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Imagen del Producto</label>
                    <select
                      name="imagen"
                      className="form-select"
                      value={formData.imagen}
                      onChange={handleChange}
                    >
                      <option value="cama.png">Cama Estándar (cama.png)</option>
                      <option value="camav2.png">Cama Térmica (camav2.png)</option>
                      <option value="camav3.png">Cama Nido (camav3.png)</option>
                      <option value="camav4.png">Cama Ortopédica (camav4.png)</option>
                      <option value="juguetes.png">Juguete Hueso (juguetes.png)</option>
                      <option value="juguetesv2.png">Juguete Pelota (juguetesv2.png)</option>
                      <option value="juguetesv3.png">Juguete Cuerda (juguetesv3.png)</option>
                      <option value="juguetesv4.png">Juguete Sonajero (juguetesv4.png)</option>
                      <option value="collares.png">Collar Clásico (collares.png)</option>
                      <option value="collaresv2.png">Collar Reflectante (collaresv2.png)</option>
                      <option value="collaresv3.png">Collar Cuero (collaresv3.png)</option>
                      <option value="collaresv4.png">Collar Acolchado (collaresv4.png)</option>
                    </select>
                  </div>

                  {/* Botones de acción */}
                  <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => onNavigate('admin-products')}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary px-4">
                      <i className="bi bi-save me-1"></i> {isEdit ? 'Guardar Cambios' : 'Crear Producto'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
