/* Botón reutilizable con props para pruebas unitarias de Jasmine */
import React from 'react';

export function CustomButton({ label, onClick, variant = 'primary', disabled = false, className = '' }) {
  return (
    <button
      type="button"
      className={'btn btn-' + variant + ' ' + className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default CustomButton;
