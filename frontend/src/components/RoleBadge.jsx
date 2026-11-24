/* Componente de Insignia de Rol con variantes visuales según props */
import React from 'react';

export function RoleBadge({ rol }) {
  if (rol === 'Administrador') {
    return <span className="badge bg-primary" data-testid="role-badge">Administrador</span>;
  }
  if (rol === 'Vendedor') {
    return <span className="badge bg-success" data-testid="role-badge">Vendedor</span>;
  }
  if (rol === 'Cliente') {
    return <span className="badge bg-secondary" data-testid="role-badge">Cliente</span>;
  }
  return <span className="badge bg-light text-dark" data-testid="role-badge">Sin Rol</span>;
}

export default RoleBadge;
