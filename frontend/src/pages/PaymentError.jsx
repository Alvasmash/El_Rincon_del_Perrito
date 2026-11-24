/* Vista de fallo en el pago con opción de reintentar (Figura 8) */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrderById } from '../data/db';
import { formatPrice } from '../data/validations';

export function PaymentError({ order, orderId, onNavigate }) {
  const { user } = useAuth();
  const [loadedOrder, setLoadedOrder] = useState(order || null);

  useEffect(() => {
    if (order) {
      setLoadedOrder(order);
      return;
    }
    if (orderId) {
      getOrderById(orderId)
        .then(res => { if (res) setLoadedOrder(res); })
        .catch(() => {});
    }
  }, [order, orderId]);

  const currentOrder = loadedOrder || {
    id: orderId ? String(orderId).replace('#', '') : '20240705',
    customer: user
      ? {
          nombre: user.nombre || 'Cliente',
          apellidos: user.apellidos || '',
          correo: user.correo || '',
          calle: user.direccion || 'Dirección registrada',
          comuna: user.comuna || 'Santiago'
        }
      : {
          nombre: 'Pedro',
          apellidos: 'Hacker',
          correo: 'pedro.hacker20@duocuc.cl',
          calle: 'Los Crisantemos, Edificio Norte',
          comuna: 'Cerrillos'
        },
    items: [],
    total: 28775
  };

  const customer = currentOrder.customer || currentOrder.cliente || (user ? {
    nombre: user.nombre || 'Cliente',
    apellidos: user.apellidos || '',
    correo: user.correo || '',
    calle: user.direccion || '',
    comuna: user.comuna || ''
  } : {
    nombre: 'Pedro',
    apellidos: 'Hacker',
    correo: 'pedro.hacker20@duocuc.cl',
    calle: 'Los Crisantemos, Edificio Norte',
    comuna: 'Cerrillos'
  });

  const orderNum = String(currentOrder.id || '20240705').replace(/^#/, '');

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 p-4 p-md-5 bg-white rounded-4 text-center">
        {/* Encabezado de fallo (Figura 8) */}
        <div className="mb-4">
          <span className="fs-1 text-danger">❌</span>
          <h4 className="fw-bold text-danger mt-2">No se pudo realizar el pago. nro #{orderNum}</h4>
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
            <div className="col-md-6"><strong>Cliente:</strong> {customer.nombre} {customer.apellidos || customer.apellido || ''}</div>
            <div className="col-md-6"><strong>Correo:</strong> {customer.correo}</div>
            <div className="col-12"><strong>Dirección:</strong> {customer.calle || currentOrder.direccion?.calle || 'N/A'}, {customer.comuna || currentOrder.direccion?.comuna || 'N/A'}</div>
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
