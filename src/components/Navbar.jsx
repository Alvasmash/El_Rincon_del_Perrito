/* Barra de navegación responsiva con Bootstrap y estado de sesión */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/validations';

export function Navbar({ onNavigate, currentPage }) {
  const { user, logout, isAdmin, isVendor } = useAuth();
  const { total, totalCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('products', { search: searchTerm });
  };

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      {/* Barra superior con buscador y accesos */}
      <div className="container py-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          className="d-flex align-items-center gap-2 text-decoration-none text-dark fw-bold fs-4"
        >
          <img src="/Imagenes/pata_perrito.png" alt="Logo" width="38" height="38" />
          <span>El Rincón del Perrito</span>
        </a>

        {/* Formulario de búsqueda en tiempo real */}
        <form onSubmit={handleSearchSubmit} className="d-flex align-items-center gap-2 flex-grow-1 mx-lg-4" style={{ maxWidth: '420px' }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar camas, juguetes, collares..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-perrito-primary">Buscar</button>
        </form>

        {/* Acceso a usuario / Auth */}
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                🐾 {user.nombre} <span className="badge bg-primary ms-1">{user.rol}</span>
              </button>
              {isMenuOpen && (
                <ul className="dropdown-menu show position-absolute end-0 mt-1 shadow">
                  {(isAdmin || isVendor) && (
                    <li>
                      <button className="dropdown-item fw-bold text-primary" onClick={() => { setIsMenuOpen(false); onNavigate('admin-dashboard'); }}>
                        ⚙️ Panel Admin
                      </button>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => { setIsMenuOpen(false); logout(); onNavigate('home'); }}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="d-flex gap-2">
              <button onClick={() => onNavigate('login')} className="btn btn-sm btn-outline-primary">Iniciar Sesión</button>
              <button onClick={() => onNavigate('register')} className="btn btn-sm btn-perrito-primary">Crear Cuenta</button>
            </div>
          )}

          {/* Botón Carrito con monto acumulado */}
          <button
            onClick={() => onNavigate('cart')}
            className="btn btn-sm btn-success d-flex align-items-center gap-2 fw-bold"
          >
            🛒 Carrito ({totalCount}) {formatPrice(total)}
          </button>
        </div>
      </div>

      {/* Menú de enlaces de navegación principal */}
      <nav className="bg-light border-top">
        <div className="container d-flex flex-wrap gap-1 py-1">
          {[
            { id: 'home', label: 'Home' },
            { id: 'categories', label: 'Categorías' },
            { id: 'offers', label: 'Ofertas 🔥' },
            { id: 'products', label: 'Productos' },
            { id: 'about', label: 'Nosotros' },
            { id: 'blogs', label: 'Blog' },
            { id: 'contact', label: 'Contacto' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={'btn btn-sm px-3 ' + (currentPage === item.id ? 'btn-perrito-primary' : 'btn-link text-dark text-decoration-none')}
            >
              {item.label}
            </button>
          ))}
          {(isAdmin || isVendor) && (
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="btn btn-sm btn-warning ms-auto fw-bold"
            >
              Panel Administrativo
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
