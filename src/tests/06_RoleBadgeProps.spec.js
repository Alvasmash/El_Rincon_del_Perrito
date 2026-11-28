/* Prueba 6: Verificación de props en componente de insignia de rol RoleBadge */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import RoleBadge from '../components/RoleBadge.jsx';

describe('Prueba 6: Props en Insignia de Rol (RoleBadge)', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    act(() => {
      if (root) root.unmount();
    });
    if (container) {
      container.remove();
      container = null;
    }
  });

  it('debe aplicar la clase bg-primary para Administrador', () => {
    act(() => {
      root.render(<RoleBadge rol="Administrador" />);
    });
    const badge = container.querySelector('[data-testid="role-badge"]');
    expect(badge.textContent).toBe('Administrador');
    expect(badge.classList.contains('bg-primary')).toBe(true);
  });

  it('debe aplicar la clase bg-success para Vendedor', () => {
    act(() => {
      root.render(<RoleBadge rol="Vendedor" />);
    });
    const badge = container.querySelector('[data-testid="role-badge"]');
    expect(badge.textContent).toBe('Vendedor');
    expect(badge.classList.contains('bg-success')).toBe(true);
  });

  it('debe aplicar la clase bg-secondary para Cliente', () => {
    act(() => {
      root.render(<RoleBadge rol="Cliente" />);
    });
    const badge = container.querySelector('[data-testid="role-badge"]');
    expect(badge.textContent).toBe('Cliente');
    expect(badge.classList.contains('bg-secondary')).toBe(true);
  });
});
