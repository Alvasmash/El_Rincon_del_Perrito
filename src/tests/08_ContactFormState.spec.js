/* Prueba 8: Gestión de state en textarea y formulario de contacto */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';

function MockContactForm() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <textarea
        data-testid="contact-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <span data-testid="char-counter">{message.length} caracteres</span>
    </div>
  );
}

describe('Prueba 8: Gestión de State en Formulario de Contacto', () => {
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

  it('debe actualizar el state del mensaje y reflejar el conteo de caracteres', () => {
    act(() => {
      root.render(<MockContactForm />);
    });

    const textarea = container.querySelector('[data-testid="contact-message"]');
    const counter = container.querySelector('[data-testid="char-counter"]');

    expect(counter.textContent).toBe('0 caracteres');

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      setter.call(textarea, 'Consulta sobre camas ortopédicas para perro pastor alemán');
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(textarea.value).toContain('pastor alemán');
    expect(counter.textContent).toBe('57 caracteres');
  });
});
