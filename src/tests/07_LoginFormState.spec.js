/* Prueba 7: Gestión de state en inputs de login */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';

function MockLoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <input
        type="email"
        data-testid="email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        data-testid="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

describe('Prueba 7: Gestión de State en Formulario de Login', () => {
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

  it('debe actualizar el state de los inputs cuando el usuario escribe', () => {
    act(() => {
      root.render(<MockLoginForm />);
    });

    const emailInput = container.querySelector('[data-testid="email-input"]');
    const passwordInput = container.querySelector('[data-testid="password-input"]');

    const setVal = (el, val) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    act(() => {
      setVal(emailInput, 'vendedor@duocuc.cl');
    });

    act(() => {
      setVal(passwordInput, 'vendedor123');
    });

    expect(emailInput.value).toBe('vendedor@duocuc.cl');
    expect(passwordInput.value).toBe('vendedor123');
  });
});
