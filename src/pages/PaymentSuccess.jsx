/* Vista de compra exitosa con resumen y botones de boleta (Figura 7) */
import React from 'react';
import { formatPrice } from '../data/validations';

export function PaymentSuccess({ order, onNavigate }) {
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

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    alert('¡Boleta electrónica enviada exitosamente a ' + currentOrder.customer.correo + '!');
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 p-4 p-md-5 bg-white rounded-4">
        {/* Encabezado de éxito (Figura 7) */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-3 text-success">✅</span>
            <h4 className="fw-bold text-success m-0">Se ha realizado la compra. nro #{currentOrder.id}</h4>
          </div>
          <span className="badge bg-light text-muted border small">Código orden: ORDER-{currentOrder.id}</span>
        </div>

        {/* Datos del Cliente */}
        <div className="mb-4">
          <h6 className="fw-bold text-secondary mb-2">Información del cliente:</h6>
          <div className="row g-2 small bg-light p-3 rounded">
            <div className="col-md-4"><strong>Nombre:</strong> {currentOrder.customer.nombre}</div>
            <div className="col-md-4"><strong>Apellidos:</strong> {currentOrder.customer.apellidos}</div>
            <div className="col-md-4"><strong>Correo:</strong> {currentOrder.customer.correo}</div>
          </div>
        </div>

        {/* Dirección de Entrega */}
        <div className="mb-4">
          <h6 className="fw-bold text-secondary mb-2">Dirección de entrega de los productos:</h6>
          <div className="row g-2 small bg-light p-3 rounded">
            <div className="col-md-8"><strong>Calle:</strong> {currentOrder.customer.calle}</div>
            <div className="col-md-4"><strong>Depto:</strong> {currentOrder.customer.depto || 'N/A'}</div>
            <div className="col-md-6"><strong>Región:</strong> {currentOrder.customer.region}</div>
            <div className="col-md-6"><strong>Comuna:</strong> {currentOrder.customer.comuna}</div>
            {currentOrder.customer.indicaciones && (
              <div className="col-12 mt-2 text-muted"><strong>Indicaciones:</strong> {currentOrder.customer.indicaciones}</div>
            )}
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="table-responsive mb-4">
          <table className="table table-sm align-middle">
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
              {currentOrder.items && currentOrder.items.length > 0 ? (
                currentOrder.items.map(it => (
                  <tr key={it.id} className="small">
                    <td><img src={'/Imagenes/' + (it.imagen || 'cama.png')} width="32" height="32" alt={it.nombre} /></td>
                    <td className="fw-bold">{it.nombre}</td>
                    <td>{formatPrice(it.precio)}</td>
                    <td>{it.quantity}</td>
                    <td>{formatPrice(it.precio * it.quantity)}</td>
                  </tr>
                ))
              ) : (
                <tr className="small">
                  <td>🐾</td>
                  <td className="fw-bold">Pack Accesorios Perrito</td>
                  <td>{formatPrice(currentOrder.total)}</td>
                  <td>1</td>
                  <td>{formatPrice(currentOrder.total)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Pagado */}
        <div className="text-end fs-4 fw-bold text-primary mb-4 border-top pt-3">
          Total pagado: {formatPrice(currentOrder.total)}
        </div>

        {/* Botones de acción requeridos (Figura 7) */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button onClick={handlePrint} className="btn btn-danger px-4 fw-bold">
            Imprimir boleta en PDF
          </button>
          <button onClick={handleSendEmail} className="btn btn-primary px-4 fw-bold">
            Enviar boleta por email
          </button>
          <button onClick={() => onNavigate('home')} className="btn btn-outline-secondary px-4">
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
