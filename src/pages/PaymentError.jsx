/* Vista de fallo en el pago con opción de reintentar (Figura 8) */
import React from 'react';
import { formatPrice } from '../data/validations';

export function PaymentError({ order, onNavigate }) {
  const currentOrder = order || {
    id: '20240705',
    customer: {
      nombre: 'Pedro',
      apellidos: 'Hacker',
      correo: 'pedro.hacker20@duocuc.cl',
      calle: 'Los Crisantemos, Edificio Norte',
      depto: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos',
      indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
    },
    items: [],
    total: 28775
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 p-4 p-md-5 bg-white rounded-4 text-center">
        {/* Encabezado de fallo (Figura 8) */}
        <div className="mb-4">
          <span className="fs-1 text-danger">❌</span>
          <h4 className="fw-bold text-danger mt-2">No se pudo realizar el pago. nro #{currentOrder.id}</h4>
          <p className="text-muted small">Hubo un problema de autorización con el medio de pago seleccionado.</p>
        </div>

        {/* Botón principal Reintentar (Figura 8) */}
        <div className="mb-4">
          <button
            onClick={() => onNavigate('checkout')}
            className="btn btn-success btn-lg px-5 fw-bold shadow"
          >
            VOLVER A REALIZAR EL PAGO
          </button>
        </div>

        {/* Detalle de la compra */}
        <div className="text-start bg-light p-3 rounded mb-4">
          <h6 className="fw-bold text-secondary mb-2">Detalle de la compra:</h6>
          <div className="row g-2 small">
            <div className="col-md-6"><strong>Cliente:</strong> {currentOrder.customer.nombre} {currentOrder.customer.apellidos}</div>
            <div className="col-md-6"><strong>Correo:</strong> {currentOrder.customer.correo}</div>
            <div className="col-12"><strong>Dirección:</strong> {currentOrder.customer.calle}, {currentOrder.customer.comuna}</div>
            <div className="col-12 text-primary fs-5 fw-bold mt-2">Total a pagar: {formatPrice(currentOrder.total)}</div>
          </div>
        </div>

        <div>
          <button onClick={() => onNavigate('cart')} className="btn btn-link text-decoration-none">
            &larr; Volver al Carrito de Compras
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentError;
