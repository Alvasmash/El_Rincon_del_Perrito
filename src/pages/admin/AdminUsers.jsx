/* Vista de Administración de Usuarios y Roles */
import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../data/db';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers({ onNavigate }) {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleDelete = (run, nombre) => {
    if (currentUser && currentUser.run.toUpperCase() === run.toUpperCase()) {
      alert('No puedes eliminar tu propio usuario en sesión activa.');
      return;
    }

    if (window.confirm(`¿Estás seguro de eliminar al usuario ${nombre} (RUN: ${run})?`)) {
      deleteUser(run);
      setUsers(getUsers());
      setMessage({ type: 'success', text: `Usuario ${nombre} eliminado correctamente.` });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filtered = users.filter(u => {
    const fullName = `${u.nombre} ${u.apellido || ''}`.toLowerCase();
    const matchText = fullName.includes(filterText.toLowerCase()) ||
                      u.run.toLowerCase().includes(filterText.toLowerCase()) ||
                      u.correo.toLowerCase().includes(filterText.toLowerCase());
    const matchRole = filterRole === 'all' || u.rol === filterRole;
    return matchText && matchRole;
  });

  const getRoleBadge = (rol) => {
    switch (rol) {
      case 'Administrador':
        return <span className="badge bg-primary">Administrador</span>;
      case 'Vendedor':
        return <span className="badge bg-success">Vendedor</span>;
      default:
        return <span className="badge bg-secondary">Cliente</span>;
    }
  };

  return (
    <div className="container py-4">
      {/* Cabecera */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Gestión de Usuarios</h1>
          <p className="text-muted mb-0">Administra cuentas, roles y permisos de acceso al sistema</p>
        </div>
        <button className="btn btn-primary mt-2 mt-sm-0" onClick={() => onNavigate('admin-user-new')}>
          <i className="bi bi-person-plus me-1"></i> Agregar Usuario
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Filtros */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por RUN, nombre o correo..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <select
                className="form-select"
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
              >
                <option value="all">Todos los Roles</option>
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>RUN</th>
                  <th>Nombre Completo</th>
                  <th>Correo Electrónico</th>
                  <th>Región / Comuna</th>
                  <th>Rol</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No se encontraron usuarios que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  filtered.map(u => (
                    <tr key={u.run}>
                      <td className="fw-mono fw-semibold">{u.run}</td>
                      <td>
                        <div className="fw-bold text-dark">{u.nombre} {u.apellido}</div>
                      </td>
                      <td>{u.correo}</td>
                      <td className="small text-muted">
                        {u.comuna ? `${u.comuna}, ${u.region || ''}` : 'No especificada'}
                      </td>
                      <td>{getRoleBadge(u.rol)}</td>
                      <td className="text-end">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onNavigate(`admin-user-edit/${u.run}`)}
                            title="Editar usuario"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(u.run, u.nombre)}
                            title="Eliminar usuario"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
