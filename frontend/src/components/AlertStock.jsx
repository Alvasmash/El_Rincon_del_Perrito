/* Componente condicional que alerta cuando el stock es igual o menor al crítico */
import React from 'react';

export function AlertStock({ stock, stockCritico }) {
  const isOutOfStock = stock <= 0;
  const isCritical = !isOutOfStock && stockCritico !== undefined && stock <= stockCritico;

  if (isOutOfStock) {
    return (
      <div className="alert alert-danger py-2 small fw-bold" role="alert">
        ❌ Producto Agotado: No quedan unidades disponibles.
      </div>
    );
  }

  if (isCritical) {
    return (
      <div className="alert alert-warning py-2 small fw-bold" role="alert">
        ⚠️ ¡Atención Stock Crítico! Solo quedan {stock} unidades en bodega.
      </div>
    );
  }

  return null;
}

export default AlertStock;
