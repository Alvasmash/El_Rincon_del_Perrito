/* Formulario de contacto con validaciones en tiempo real (Figura 7) */
import React, { useState } from 'react';
import { validateEmail } from '../data/validations';

export function Contact() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', comentario: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    /* Validación en vivo */
    if (name === 'correo') {
      const check = validateEmail(value);
      setErrors(prev => ({ ...prev, correo: check.isValid ? '' : check.message }));
    }
    if (name === 'nombre') {
      setErrors(prev => ({ ...prev, nombre: value.trim() ? '' : 'El nombre es requerido.' }));
    }
    if (name === 'comentario') {
      setErrors(prev => ({ ...prev, comentario: value.trim() ? '' : 'El comentario es requerido.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailCheck = validateEmail(formData.correo);
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido.';
    if (!emailCheck.isValid) newErrors.correo = emailCheck.message;
    if (!formData.comentario.trim()) newErrors.comentario = 'El comentario es requerido.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setFormData({ nombre: '', correo: '', comentario: '' });
    setErrors({});
  };

  return (
    <div className="container py-4" style={{ maxWidth: '640px' }}>
      <div className="card card-perrito shadow-sm p-4 p-md-5 bg-white">
        <div className="text-center mb-4">
          <img src="/Imagenes/pata_perrito.png" width="48" height="48" alt="Logo" className="mb-2" />
          <h5 className="fw-bold text-muted m-0">El Rincón del Perrito</h5>
          <h3 className="fw-bold text-primary mt-1">FORMULARIO DE CONTACTOS</h3>
          <p className="text-muted small">Escríbenos y resolveremos tus dudas a la brevedad.</p>
        </div>

        {submitted && (
          <div className="alert alert-success py-2 text-center small mb-3">
            ¡Mensaje enviado con éxito! Nos comunicaremos contigo pronto.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label small fw-bold">NOMBRE COMPLETO *</label>
            <input
              type="text"
              name="nombre"
              className={'form-control ' + (errors.nombre ? 'is-invalid' : '')}
              placeholder="Ej: Juan Pérez"
              maxLength={100}
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            <small className="text-muted">Máx: 100 caracteres</small>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">CORREO ELECTRÓNICO *</label>
            <input
              type="email"
              name="correo"
              className={'form-control ' + (errors.correo ? 'is-invalid' : '')}
              placeholder="nombre@duocuc.cl o usuario@gmail.com"
              maxLength={100}
              value={formData.correo}
              onChange={handleChange}
              required
            />
            {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
            <small className="text-muted">Permitidos: @duocuc.cl, @profesor.duoc.cl, @gmail.com</small>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-bold">COMENTARIO *</label>
              <small className={formData.comentario.length > 500 ? 'text-danger fw-bold' : 'text-muted'}>
                {formData.comentario.length}/500
              </small>
            </div>
            <textarea
              name="comentario"
              rows="4"
              className={'form-control ' + (errors.comentario ? 'is-invalid' : '')}
              placeholder="Escribe tu consulta o sugerencia..."
              maxLength={500}
              value={formData.comentario}
              onChange={handleChange}
              required
            ></textarea>
            {errors.comentario && <div className="invalid-feedback">{errors.comentario}</div>}
          </div>

          <button type="submit" className="btn btn-perrito-primary w-100 fw-bold py-2">
            ENVIAR MENSAJE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
