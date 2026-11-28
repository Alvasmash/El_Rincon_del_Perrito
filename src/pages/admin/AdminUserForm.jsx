/* Formulario de Creación y Edición de Usuarios */
import React, { useState, useEffect } from 'react';
import { getUserByRut, createUser, updateUser } from '../../data/db';
import { getApiErrorMessage } from '../../api/apiClient';
import { validateRut, validateInstitutionalEmail } from '../../data/validations';
import { REGIONES_CHILE, getCommunesForRegion } from '../../data/chileData';

export default function AdminUserForm({ userRut, onNavigate }) {
  const isEdit = Boolean(userRut);
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    clave: '',
    rol: 'Cliente',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: ''
  });
  const [communes, setCommunes] = useState([]);
  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadUser() {
      if (isEdit) {
        try {
          const u = await getUserByRut(userRut);
          if (u && active) {
            const userRegion = u.region || 'Región Metropolitana de Santiago';
            setFormData({
              run: u.run || '',
              nombre: u.nombre || '',
              apellidos: u.apellidos || u.apellido || '',
              correo: u.correo || '',
              clave: '',
              rol: u.rol || 'Cliente',
              region: userRegion,
              comuna: u.comuna || 'Santiago',
              direccion: u.direccion || ''
            });
            setCommunes(getCommunesForRegion(userRegion));
          }
        } catch (err) {
          if (active) setStatusMsg({ type: 'danger', text: getApiErrorMessage(err, 'No se pudo cargar el usuario.') });
        }
      } else {
        setCommunes(getCommunesForRegion('Región Metropolitana de Santiago'));
      }
    }
    loadUser();
    return () => { active = false; };
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
      if (!rutCheck.isValid) {
        errs.run = rutCheck.message;
      }
    }

    if (!formData.nombre.trim()) {
      errs.nombre = 'El nombre es obligatorio.';
    }

    if (!formData.correo.trim()) {
      errs.correo = 'El correo es obligatorio.';
    } else if (!validateInstitutionalEmail(formData.correo).isValid) {
      errs.correo = 'Debe ser correo válido (@duocuc.cl, @duoc.cl, @profesor.duoc.cl, @gmail.com).';
    }

    if (!isEdit && (!formData.clave || formData.clave.length < 4 || formData.clave.length > 20)) {
      errs.clave = 'La contraseña debe tener entre 4 y 20 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEdit) {
        await updateUser(userRut, {
          nombre: formData.nombre.trim(),
          apellidos: formData.apellidos.trim(),
          correo: formData.correo.trim().toLowerCase(),
          clave: formData.clave || undefined,
          rol: formData.rol,
          region: formData.region,
          comuna: formData.comuna,
          direccion: formData.direccion.trim()
        });
        setStatusMsg({ type: 'success', text: 'Usuario actualizado exitosamente.' });
      } else {
        await createUser({
          run: formData.run.trim().toUpperCase(),
          nombre: formData.nombre.trim(),
          apellidos: formData.apellidos.trim(),
          correo: formData.correo.trim().toLowerCase(),
          clave: formData.clave,
          rol: formData.rol,
          region: formData.region,
          comuna: formData.comuna,
          direccion: formData.direccion.trim()
        });
        setStatusMsg({ type: 'success', text: 'Usuario creado exitosamente.' });
      }

      setTimeout(() => {
        onNavigate('admin-users');
      }, 1000);
    } catch (err) {
      setStatusMsg({ type: 'danger', text: getApiErrorMessage(err, 'No se pudo guardar el usuario.') });
    }
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
                    <label className="form-label fw-semibold">Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      className="form-control"
                      value={formData.apellidos}
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
                      name="clave"
                      className={`form-control ${errors.clave ? 'is-invalid' : ''}`}
                      placeholder="••••••••"
                      maxLength={20}
                      value={formData.clave}
                      onChange={handleChange}
                    />
                    {errors.clave && <div className="invalid-feedback">{errors.clave}</div>}
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
