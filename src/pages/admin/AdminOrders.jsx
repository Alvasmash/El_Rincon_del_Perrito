/* Vista de Historial y Detalle de Pedidos para el Administrador */
import React, { useState, useEffect } from 'react';
import { getOrders } from '../../data/db';
import { formatCLP } from '../../data/validations';

export default function AdminOrders({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="container py-4">
      {/* Cabecera */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Historial de Pedidos y Ventas</h1>
          <p className="text-muted mb-0">Revisa todas las transacciones generadas en la tienda online</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => onNavigate('admin-dashboard')}>
          <i className="bi bi-arrow-left me-1"></i> Volver al Panel
        </button>
      </div>

      {/* Tabla de órdenes */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>N° Orden</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Ubicación</th>
                  <th>Método Pago</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-end">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No hay compras registradas en el historial.
                    </td>
                  </tr>
                ) : (
                  orders.map(o => (
                    <tr key={o.id}>
                      <td className="fw-bold text-primary">{o.id}</td>
                      <td>{o.fecha || 'Reciente'}</td>
                      <td>
                        <div className="fw-semibold">{(o.cliente?.nombre || o.customer?.nombre) ? `${o.cliente?.nombre || o.customer?.nombre} ${o.cliente?.apellido || o.customer?.apellidos || ''}` : 'Cliente'}</div>
                        <small className="text-muted">{o.cliente?.correo || o.customer?.correo || ''}</small>
                      </td>
                      <td className="small">
                        {(o.direccion?.comuna || o.customer?.comuna) ? `${o.direccion?.comuna || o.customer?.comuna}, ${o.direccion?.region || o.customer?.region}` : 'Chile'}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border text-capitalize">
                          {o.pago?.metodo || 'Webpay Plus'}
                        </span>
                      </td>
                      <td className="fw-bold">{formatCLP(o.total)}</td>
                      <td>
                        <span className="badge bg-success">Aprobada</span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedOrder(o)}
                        >
                          <i className="bi bi-eye me-1"></i> Ver
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal / Card con Detalle del Pedido seleccionado */}
      {selectedOrder && (
        <div className="card shadow-sm border-primary border-2 mt-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">Detalle del Pedido {selectedOrder.id}</h5>
            <button
              className="btn btn-sm btn-close btn-close-white"
              onClick={() => setSelectedOrder(null)}
            ></button>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <h6 className="fw-bold text-dark">Información del Cliente</h6>
                <p className="mb-1"><strong>Nombre:</strong> {selectedOrder.cliente?.nombre || selectedOrder.customer?.nombre} {selectedOrder.cliente?.apellido || selectedOrder.customer?.apellidos || ''}</p>
                <p className="mb-1"><strong>Correo:</strong> {selectedOrder.cliente?.correo || selectedOrder.customer?.correo}</p>
                <p className="mb-1"><strong>Teléfono:</strong> {selectedOrder.cliente?.telefono || selectedOrder.customer?.telefono || 'No registrado'}</p>
              </div>
              <div className="col-12 col-md-4">
                <h6 className="fw-bold text-dark">Dirección de Entrega</h6>
                <p className="mb-1"><strong>Dirección:</strong> {selectedOrder.direccion?.calle || selectedOrder.customer?.calle} {selectedOrder.direccion?.depto || selectedOrder.customer?.depto || ''}</p>
                <p className="mb-1"><strong>Comuna:</strong> {selectedOrder.direccion?.comuna || selectedOrder.customer?.comuna}</p>
                <p className="mb-1"><strong>Región:</strong> {selectedOrder.direccion?.region || selectedOrder.customer?.region}</p>
              </div>
              <div className="col-12 col-md-4">
                <h6 className="fw-bold text-dark">Resumen de Pago</h6>
                <p className="mb-1"><strong>Método:</strong> {selectedOrder.pago?.metodo || 'Tarjeta de Débito/Crédito'}</p>
                <p className="mb-1"><strong>Subtotal:</strong> {formatCLP(selectedOrder.subtotal || selectedOrder.total)}</p>
                {selectedOrder.descuento > 0 && (
                  <p className="mb-1 text-success"><strong>Descuento (10%):</strong> -{formatCLP(selectedOrder.descuento)}</p>
                )}
                <p className="mb-1 fs-5 fw-bold text-primary"><strong>Total:</strong> {formatCLP(selectedOrder.total)}</p>
              </div>
            </div>

            <h6 className="fw-bold text-dark mb-2">Productos en este pedido:</h6>
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map(item => (
                    <tr key={item.id}>
                      <td className="fw-medium">{item.nombre}</td>
                      <td>{formatCLP(item.precio)}</td>
                      <td>{item.quantity} un.</td>
                      <td className="text-end fw-bold">{formatCLP(item.precio * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
