/* Vista de registro de usuario con validación de RUN chileno (Figura 4) */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { REGIONES_Y_COMUNAS, getCommunesForRegion } from '../data/chileData';
import { validateRutChile, validateEmail, validatePassword } from '../data/validations';

export function Register({ onNavigate }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    clave: '',
    confirmClave: '',
    telefono: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const availableCommunes = getCommunesForRegion(formData.region);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      const comms = getCommunesForRegion(value);
      setFormData(prev => ({ ...prev, region: value, comuna: comms[0] || '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    /* Validación RUN Módulo 11 */
    const rutCheck = validateRutChile(formData.run);
    if (!rutCheck.isValid) {
      setErrorMsg(rutCheck.message);
      return;
    }

    if (!formData.nombre.trim() || formData.nombre.length > 50) {
      setErrorMsg('El nombre es requerido y no puede superar 50 caracteres.');
      return;
    }

    if (!formData.apellidos.trim() || formData.apellidos.length > 100) {
      setErrorMsg('Los apellidos son requeridos y no pueden superar 100 caracteres.');
      return;
    }

    /* Validación correo */
    const emailCheck = validateEmail(formData.correo);
    if (!emailCheck.isValid) {
      setErrorMsg(emailCheck.message);
      return;
    }

    /* Validación contraseña */
    const passCheck = validatePassword(formData.clave);
    if (!passCheck.isValid) {
      setErrorMsg(passCheck.message);
      return;
    }

    if (formData.clave !== formData.confirmClave) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    if (!formData.direccion.trim() || formData.direccion.length > 300) {
      setErrorMsg('La dirección es requerida (máx 300 caracteres).');
      return;
    }

    const res = register({
      run: formData.run.trim().toUpperCase(),
      nombre: formData.nombre.trim(),
      apellidos: formData.apellidos.trim(),
      correo: formData.correo.trim().toLowerCase(),
      clave: formData.clave,
      rol: 'Cliente',
      region: formData.region,
      comuna: formData.comuna,
      direccion: formData.direccion.trim(),
      telefono: formData.telefono.trim()
    });

    if (!res.ok) {
      setErrorMsg(res.message);
      return;
    }

    alert('¡Registro completado exitosamente!');
    onNavigate('home');
  };

  return (
    <div className="container py-4" style={{ maxWidth: '680px' }}>
      <div className="card card-perrito shadow-sm p-4 p-md-5 bg-white">
        <div className="text-center mb-4">
          <img src="/Imagenes/pata_perrito.png" width="48" height="48" alt="Logo" className="mb-2" />
          <h5 className="fw-bold text-muted m-0">El Rincón del Perrito</h5>
          <h3 className="fw-bold text-primary mt-1">Registro de usuario</h3>
          <p className="text-muted small">Crea tu cuenta de cliente con validaciones oficiales.</p>
        </div>

        {errorMsg && <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label small fw-bold">RUN (Sin puntos ni guión) *</label>
            <input
              type="text"
              name="run"
              className="form-control"
              placeholder="Ej: 19011022K"
              maxLength={9}
              value={formData.run}
              onChange={handleChange}
              required
            />
            <small className="text-muted">Entre 7 y 9 caracteres (Validación Módulo 11)</small>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nombre *</label>
              <input type="text" name="nombre" className="form-control" maxLength={50} value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Apellidos *</label>
              <input type="text" name="apellidos" className="form-control" maxLength={100} value={formData.apellidos} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Correo Electrónico *</label>
            <input type="email" name="correo" className="form-control" maxLength={100} placeholder="ejemplo@duocuc.cl" value={formData.correo} onChange={handleChange} required />
            <small className="text-muted">Dominios: @duocuc.cl, @profesor.duoc.cl, @gmail.com</small>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Contraseña *</label>
              <input type="password" name="clave" className="form-control" maxLength={20} value={formData.clave} onChange={handleChange} required />
              <small className="text-muted">Entre 4 y 20 caracteres</small>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Confirmar Contraseña *</label>
              <input type="password" name="confirmClave" className="form-control" maxLength={20} value={formData.confirmClave} onChange={handleChange} required />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Región *</label>
              <select name="region" className="form-select" value={formData.region} onChange={handleChange}>
                {REGIONES_Y_COMUNAS.map(r => (
                  <option key={r.region} value={r.region}>{r.region}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Comuna *</label>
              <select name="comuna" className="form-select" value={formData.comuna} onChange={handleChange}>
                {availableCommunes.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Dirección *</label>
            <input type="text" name="direccion" className="form-control" placeholder="Calle, número, depto" maxLength={300} value={formData.direccion} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-perrito-primary w-100 fw-bold py-2 mb-3">
            REGISTRAR
          </button>

          <div className="text-center small">
            ¿Ya tienes cuenta? <button type="button" onClick={() => onNavigate('login')} className="btn btn-link p-0 text-decoration-none">Inicia sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
