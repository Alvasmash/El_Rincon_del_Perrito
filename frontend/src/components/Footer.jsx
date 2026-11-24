/* Pie de página con información institucional y suscripción */
import React, { useState } from 'react';

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5 border-top border-4 border-info">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-info fw-bold mb-3">El Rincón del Perrito</h5>
            <p className="small text-muted">
              Cuidado, bienestar y diversión para tu mascota con los más altos estándares de calidad.
            </p>
            <p className="small text-muted mb-1"><strong>Campus:</strong> Duoc UC — Escuela de Informática</p>
            <p className="small text-muted"><strong>Asignatura:</strong> DSY1104 Fullstack II</p>
          </div>

          <div className="col-lg-2 col-md-3">
            <h6 className="text-info fw-bold mb-3">Navegación</h6>
            <ul className="list-unstyled small">
              <li><button onClick={() => onNavigate('home')} className="btn btn-link text-light p-0 text-decoration-none">Home</button></li>
              <li><button onClick={() => onNavigate('categories')} className="btn btn-link text-light p-0 text-decoration-none">Categorías</button></li>
              <li><button onClick={() => onNavigate('offers')} className="btn btn-link text-light p-0 text-decoration-none">Ofertas</button></li>
              <li><button onClick={() => onNavigate('products')} className="btn btn-link text-light p-0 text-decoration-none">Catálogo</button></li>
              <li><button onClick={() => onNavigate('about')} className="btn btn-link text-light p-0 text-decoration-none">Nosotros</button></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3">
            <h6 className="text-info fw-bold mb-3">Categorías</h6>
            <ul className="list-unstyled small">
              <li><button onClick={() => onNavigate('products', { category: 'camas' })} className="btn btn-link text-light p-0 text-decoration-none">Camas</button></li>
              <li><button onClick={() => onNavigate('products', { category: 'juguetes' })} className="btn btn-link text-light p-0 text-decoration-none">Juguetes</button></li>
              <li><button onClick={() => onNavigate('products', { category: 'collares' })} className="btn btn-link text-light p-0 text-decoration-none">Collares</button></li>
              <li><button onClick={() => onNavigate('blogs')} className="btn btn-link text-light p-0 text-decoration-none">Casos y Noticias</button></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="text-info fw-bold mb-3">Boletín Informativo</h6>
            <p className="small text-muted">Recibe promociones y consejos veterinarios para tu regalón.</p>
            {subscribed ? (
              <div className="alert alert-success py-1 small">¡Gracias por suscribirte al boletín!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="tu-correo@duocuc.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-sm btn-info text-dark fw-bold">Suscribir</button>
              </form>
            )}
          </div>
        </div>

        <div className="text-center pt-4 mt-4 border-top border-secondary small text-muted">
          © 2026 El Rincón del Perrito — Evaluación Parcial 2 (Duoc UC). Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
