/* Vista del carrito de compras con control de unidades y cupón (Figura 5) */
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/validations';

export function Cart({ onNavigate }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, discountAmount, total, coupon, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMsg(res);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="p-5 bg-white rounded-4 shadow-sm" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="fs-1 mb-2">🛒</div>
          <h3 className="fw-bold mb-2">Tu carrito está vacío</h3>
          <p className="text-muted mb-4">Aún no has agregado productos para tu perrito.</p>
          <button onClick={() => onNavigate('products')} className="btn btn-perrito-primary">
            Explorar Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Carrito de Compras</h2>

      <div className="row g-4">
        {/* Tabla de ítems del carrito (Figura 5) */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ width: '70px' }}>
                        <img src={'/Imagenes/' + (item.imagen || 'cama.png')} alt={item.nombre} width="50" height="50" style={{ objectFit: 'contain' }} />
                      </td>
                      <td>
                        <div className="fw-bold">{item.nombre}</div>
                        <small className="text-muted">Código: {item.codigo}</small>
                      </td>
                      <td>{formatPrice(item.precio)}</td>
                      <td className="text-center" style={{ width: '130px' }}>
                        <div className="input-group input-group-sm">
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span className="form-control text-center">{item.quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </td>
                      <td className="fw-bold text-primary">{formatPrice(item.precio * item.quantity)}</td>
                      <td>
                        <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-outline-danger" title="Eliminar">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-footer bg-white d-flex justify-content-between p-3">
              <button onClick={clearCart} className="btn btn-sm btn-outline-secondary">Limpiar Carrito</button>
              <button onClick={() => onNavigate('products')} className="btn btn-sm btn-link text-decoration-none">Continuar comprando</button>
            </div>
          </div>
        </div>

        {/* Resumen y cupón (Figura 5) */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-3 mb-3">
            <h5 className="fw-bold border-bottom pb-2">Resumen de Compra</h5>

            <div className="d-flex justify-content-between my-2">
              <span>Subtotal:</span>
              <span className="fw-bold">{formatPrice(subtotal)}</span>
            </div>

            {coupon && (
              <div className="d-flex justify-content-between my-2 text-success fw-bold">
                <span>Descuento (10%):</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-2 my-2 text-primary">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>

            {/* Cupón */}
            <form onSubmit={handleApplyCoupon} className="mt-3">
              <label className="form-label small fw-bold">Cupón de descuento:</label>
              <div className="input-group input-group-sm mb-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: PERRITO10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="submit" className="btn btn-perrito-primary">Aplicar</button>
              </div>
              <small className="text-muted d-block mb-2">Prueba el cupón: <strong>PERRITO10</strong></small>
              {couponMsg && (
                <div className={'alert py-1 small ' + (couponMsg.ok ? 'alert-success' : 'alert-danger')}>
                  {couponMsg.message}
                </div>
              )}
            </form>

            <button
              onClick={() => onNavigate('checkout')}
              className="btn btn-success btn-lg w-100 fw-bold mt-3 shadow-sm"
            >
              Comprar ahora {formatPrice(total)} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
