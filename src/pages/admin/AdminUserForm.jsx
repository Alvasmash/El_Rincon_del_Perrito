/* Formulario de Creación y Edición de Usuarios */
import React, { useState, useEffect } from 'react';
import { getUsers, getUserByRut, createUser, updateUser } from '../../data/db';
import { validateRut, validateInstitutionalEmail } from '../../data/validations';
import { REGIONES_CHILE, getCommunesForRegion } from '../../data/chileData';

export default function AdminUserForm({ userRut, onNavigate }) {
  const isEdit = Boolean(userRut);
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: 'Cliente',
    region: 'Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: ''
  });
  const [communes, setCommunes] = useState([]);
  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const u = getUserByRut(userRut);
      if (u) {
        setFormData({
          run: u.run || '',
          nombre: u.nombre || '',
          apellido: u.apellido || '',
          correo: u.correo || '',
          password: u.password || '',
          rol: u.rol || 'Cliente',
          region: u.region || 'Metropolitana de Santiago',
          comuna: u.comuna || 'Santiago',
          direccion: u.direccion || ''
        });
        setCommunes(getCommunesForRegion(u.region || 'Metropolitana de Santiago'));
      }
    } else {
      setCommunes(getCommunesForRegion('Metropolitana de Santiago'));
    }
  }, [userRut, isEdit]);

  const handleRegionChange = (e) => {
    const reg = e.target.value;
    const newCommunes = getCommunesForRegion(reg);
    setCommunes(newCommunes);
    setFormData(prev => ({
      ...prev,
      region: reg,
      comuna: newCommunes[0] || ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!isEdit) {
      const rutCheck = validateRut(formData.run);
      if (!rutCheck.valid) {
        errs.run = rutCheck.message;
      } else if (getUserByRut(formData.run)) {
        errs.run = 'Ya existe un usuario con este RUN.';
      }
    }

    if (!formData.nombre.trim()) {
      errs.nombre = 'El nombre es obligatorio.';
    }

    if (!formData.correo.trim()) {
      errs.correo = 'El correo es obligatorio.';
    } else if (!validateInstitutionalEmail(formData.correo)) {
      errs.correo = 'Debe ser correo válido (@duocuc.cl, @duoc.cl, @profesor.duoc.cl, @gmail.com).';
    }

    if (!isEdit && (!formData.password || formData.password.length < 4 || formData.password.length > 20)) {
      errs.password = 'La contraseña debe tener entre 4 y 20 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      updateUser(userRut, {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        correo: formData.correo.trim().toLowerCase(),
        password: formData.password || undefined,
        rol: formData.rol,
        region: formData.region,
        comuna: formData.comuna,
        direccion: formData.direccion.trim()
      });
      setStatusMsg({ type: 'success', text: 'Usuario actualizado exitosamente.' });
    } else {
      createUser({
        run: formData.run.trim().toUpperCase(),
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        correo: formData.correo.trim().toLowerCase(),
        password: formData.password,
        rol: formData.rol,
        region: formData.region,
        comuna: formData.comuna,
        direccion: formData.direccion.trim()
      });
      setStatusMsg({ type: 'success', text: 'Usuario creado exitosamente.' });
    }

    setTimeout(() => {
      onNavigate('admin-users');
    }, 1200);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 fw-bold text-dark mb-0">
              {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h1>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate('admin-users')}>
              <i className="bi bi-arrow-left me-1"></i> Volver a Usuarios
            </button>
          </div>

          {statusMsg && (
            <div className={`alert alert-${statusMsg.type} fade show`} role="alert">
              {statusMsg.text}
            </div>
          )}

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* RUN */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">RUN (sin puntos ni guión) *</label>
                    <input
                      type="text"
                      name="run"
                      className={`form-control ${errors.run ? 'is-invalid' : ''}`}
                      placeholder="19011022K"
                      value={formData.run}
                      onChange={handleChange}
                      disabled={isEdit}
                    />
                    {errors.run && <div className="invalid-feedback">{errors.run}</div>}
                    <small className="text-muted">Ejemplo: 19011022K o 181234567</small>
                  </div>

                  {/* Rol */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Rol en el Sistema *</label>
                    <select
                      name="rol"
                      className="form-select"
                      value={formData.rol}
                      onChange={handleChange}
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>

                  {/* Nombre y Apellido */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      className="form-control"
                      value={formData.apellido}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Correo */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="correo"
                      className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                      placeholder="usuario@duocuc.cl"
                      value={formData.correo}
                      onChange={handleChange}
                    />
                    {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                  </div>

                  {/* Contraseña */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      {isEdit ? 'Contraseña (dejar en blanco para no cambiar)' : 'Contraseña (hasta 20 caracteres) *'}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="••••••••"
                      maxLength={20}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* Región y Comuna dependiente */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Región</label>
                    <select
                      className="form-select"
                      value={formData.region}
                      onChange={handleRegionChange}
                    >
                      {REGIONES_CHILE.map(r => (
                        <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Comuna</label>
                    <select
                      name="comuna"
                      className="form-select"
                      value={formData.comuna}
                      onChange={handleChange}
                    >
                      {communes.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dirección */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      className="form-control"
                      placeholder="Calle, número, depto..."
                      value={formData.direccion}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Botones */}
                  <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => onNavigate('admin-users')}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary px-4">
                      <i className="bi bi-save me-1"></i> {isEdit ? 'Guardar Cambios' : 'Registrar Usuario'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
