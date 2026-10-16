/* Vista de inicio de sesión con validaciones en tiempo real (Figura 5) */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../data/validations';

export function Login({ onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMsg(emailCheck.message);
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.isValid) {
      setErrorMsg(passCheck.message);
      return;
    }

    const res = login(email, password);
    if (!res.ok) {
      setErrorMsg(res.message);
      return;
    }

    if (res.user.rol === 'Administrador' || res.user.rol === 'Vendedor') {
      onNavigate('admin-dashboard');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '480px' }}>
      <div className="card card-perrito shadow-sm p-4 p-md-5 bg-white">
        <div className="text-center mb-4">
          <img src="/Imagenes/pata_perrito.png" width="48" height="48" alt="Logo" className="mb-2" />
          <h5 className="fw-bold text-muted m-0">El Rincón del Perrito</h5>
          <h3 className="fw-bold text-primary mt-1">Inicio de sesión</h3>
        </div>

        {/* Demo Box para la Evaluación Docente */}
        <div className="alert alert-light border small mb-4">
          <strong className="d-block mb-1 text-primary">💡 Cuentas de prueba para la evaluación:</strong>
          <div>• <strong>Admin:</strong> admin@duocuc.cl | admin123</div>
          <div>• <strong>Vendedor:</strong> vendedor@duocuc.cl | vendedor123</div>
          <div>• <strong>Cliente:</strong> cliente@gmail.com | cliente123</div>
        </div>

        {errorMsg && <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label small fw-bold">CORREO *</label>
            <input
              type="email"
              className="form-control"
              placeholder="nombre@duocuc.cl"
              maxLength={100}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <small className="text-muted">Dominios: @duocuc.cl, @profesor.duoc.cl, @gmail.com</small>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">CONTRASEÑA *</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <small className="text-muted">Entre 4 y 20 caracteres</small>
          </div>

          <button type="submit" className="btn btn-perrito-primary w-100 fw-bold py-2 mb-3">
            Iniciar sesión
          </button>

          <div className="text-center small">
            ¿No tienes cuenta? <button type="button" onClick={() => onNavigate('register')} className="btn btn-link p-0 text-decoration-none">Regístrate aquí</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
