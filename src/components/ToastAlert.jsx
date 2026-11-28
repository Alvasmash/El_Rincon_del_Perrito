/* Notificación flotante de confirmación */
import React from 'react';

export function ToastAlert({ message, type = 'success', onClose }) {
  if (!message) return null;
  const bgClass = type === 'success' ? 'bg-success text-white' : 'bg-danger text-white';

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div className={'toast show align-items-center border-0 ' + bgClass} role="alert">
        <div className="d-flex">
          <div className="toast-body fw-bold">{message}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}

export default ToastAlert;
