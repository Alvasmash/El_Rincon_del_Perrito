/* Vista de Checkout / Paso de Pago con datos y dirección de entrega (Figura 6) */
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { REGIONES_Y_COMUNAS, getCommunesForRegion } from '../data/chileData';
import { formatPrice, validateEmail } from '../data/validations';
import { createOrder } from '../data/db';

export function Checkout({ onNavigate }) {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();

  /* Si el usuario ha iniciado sesión se añade de forma automática (Requisito Nota pág 6) */
  const [formData, setFormData] = useState({
    nombre: user ? user.nombre : '',
    apellidos: user ? user.apellidos : '',
    correo: user ? user.correo : '',
    calle: user ? user.direccion : '',
    depto: '',
    region: user ? user.region : 'Región Metropolitana de Santiago',
    comuna: user ? user.comuna : 'Santiago',
    indicaciones: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [simulateError, setSimulateError] = useState(false);

  /* Actualizar comunas cuando cambia la región */
  const availableCommunes = getCommunesForRegion(formData.region);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      const newCommunes = getCommunesForRegion(value);
      setFormData(prev => ({
        ...prev,
        region: value,
        comuna: newCommunes[0] || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellidos || !formData.correo || !formData.calle) {
      setErrorMsg('Por favor completa todos los campos requeridos con asterisco (*).');
      return;
    }

    const emailCheck = validateEmail(formData.correo);
    if (!emailCheck.isValid) {
      setErrorMsg(emailCheck.message);
      return;
    }

    /* Generar ID de orden */
    const orderNumber = '2024' + Math.floor(1000 + Math.random() * 9000);

    if (simulateError) {
      onNavigate('payment-error', {
        order: {
          id: orderNumber,
          customer: formData,
          items: cartItems,
          total: total
        }
      });
      return;
    }

    /* Crear orden y guardar en DB */
    const newOrder = createOrder({
      id: orderNumber,
      customer: formData,
      items: cartItems,
      total: total
    });

    clearCart();
    onNavigate('payment-success', { order: newOrder });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>No hay productos para pagar</h3>
        <button onClick={() => onNavigate('products')} className="btn btn-perrito-primary mt-3">Ver productos</button>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: '840px' }}>
      {/* Encabezado y Tabla de Carrito Resumen (Figura 6) */}
      <div className="card shadow-sm border-0 p-4 mb-4 bg-white rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="fw-bold mb-1">Carrito de compra</h3>
            <p className="text-muted small mb-0">Completa la siguiente información para tu entrega.</p>
          </div>
          <span className="badge bg-primary fs-6 p-2">Total a pagar: {formatPrice(total)}</span>
        </div>

        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="small">
                  <td><img src={'/Imagenes/' + (item.imagen || 'cama.png')} width="36" height="36" alt={item.nombre} /></td>
                  <td className="fw-bold">{item.nombre}</td>
                  <td>{formatPrice(item.precio)}</td>
                  <td>{item.quantity}</td>
                  <td className="fw-bold">{formatPrice(item.precio * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulario de Checkout (Figura 6) */}
      <form onSubmit={handlePay} className="card shadow-sm border-0 p-4 bg-white rounded-4">
        {user && (
          <div className="alert alert-info py-2 small mb-3">
            ℹ️ <strong>Usuario identificado:</strong> Hemos completado tus datos automáticamente con tu cuenta registrada.
          </div>
        )}

        <h5 className="fw-bold mb-3 border-bottom pb-2">Información del cliente</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Nombre *</label>
            <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Apellidos *</label>
            <input type="text" name="apellidos" className="form-control" value={formData.apellidos} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Correo *</label>
            <input type="email" name="correo" className="form-control" value={formData.correo} onChange={handleChange} required />
            <small className="text-muted">Dominios: @duocuc.cl, @profesor.duoc.cl, @gmail.com</small>
          </div>
        </div>

        <h5 className="fw-bold mb-3 border-bottom pb-2">Dirección de entrega de los productos</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label small fw-bold">Calle y Número *</label>
            <input type="text" name="calle" className="form-control" placeholder="Ej: Los Crisantemos 123" value={formData.calle} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Departamento (opcional)</label>
            <input type="text" name="depto" className="form-control" placeholder="Ej: Depto 603" value={formData.depto} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Región *</label>
            <select name="region" className="form-select" value={formData.region} onChange={handleChange}>
              {REGIONES_Y_COMUNAS.map(r => (
                <option key={r.region} value={r.region}>{r.region}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Comuna *</label>
            <select name="comuna" className="form-select" value={formData.comuna} onChange={handleChange}>
              {availableCommunes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Indicaciones para la entrega (opcional)</label>
            <textarea
              name="indicaciones"
              className="form-control"
              rows="2"
              placeholder="Ej: Dejar con el conserje, portón verde..."
              value={formData.indicaciones}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {errorMsg && <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>}

        {/* Switch para simular fallo de pago con fines evaluativos */}
        <div className="form-check form-switch mb-3 p-2 bg-light rounded">
          <input
            className="form-check-input ms-0 me-2"
            type="checkbox"
            id="simError"
            checked={simulateError}
            onChange={(e) => setSimulateError(e.target.checked)}
          />
          <label className="form-check-label small text-muted" htmlFor="simError">
            Simular error en el pago (para demostrar la vista de "Pago con Error" - Figura 8)
          </label>
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100 fw-bold shadow-sm">
          Pagar ahora {formatPrice(total)}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
