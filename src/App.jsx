/* Componente Principal de la Aplicación: Enrutador SPA, Proveedores de Estado y Guardias de Seguridad */
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Importación de componentes comunes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importación de páginas de la tienda online
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentError from './pages/PaymentError';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Importación de vistas del Panel Administrativo
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserForm from './pages/admin/AdminUserForm';
import AdminOrders from './pages/admin/AdminOrders';

/* Componente interno que maneja el enrutamiento reactivo y validación de roles */
function AppContent() {
  const { user, isAdmin, isVendor } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [routeParams, setRouteParams] = useState({});

  // Manejo de navegación SPA con soporte para parámetros
  const navigate = (page, params = {}) => {
    // Si la ruta incluye parámetros en el string (ej: 'product-detail/cama-madera')
    if (page.includes('/')) {
      const [baseRoute, paramValue] = page.split('/');
      setCurrentPage(baseRoute);
      if (baseRoute.includes('product')) {
        setRouteParams({ ...params, id: paramValue });
      } else if (baseRoute.includes('user')) {
        setRouteParams({ ...params, rut: paramValue });
      } else {
        setRouteParams({ ...params, id: paramValue });
      }
      window.location.hash = page;
    } else {
      setCurrentPage(page);
      setRouteParams(params);
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sincronización bidireccional con el Hash de la URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        if (hash.includes('/')) {
          const [baseRoute, paramValue] = hash.split('/');
          setCurrentPage(baseRoute);
          if (baseRoute.includes('product')) {
            setRouteParams({ id: paramValue });
          } else if (baseRoute.includes('user')) {
            setRouteParams({ rut: paramValue });
          } else {
            setRouteParams({ id: paramValue });
          }
        } else {
          setCurrentPage(hash);
        }
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Función para renderizar la página activa según el estado
  const renderCurrentPage = () => {
    // Guardias de seguridad para rutas administrativas
    const isAdminRoute = currentPage.startsWith('admin-');
    if (isAdminRoute) {
      if (!user) {
        return (
          <div className="container py-5 text-center">
            <div className="alert alert-warning d-inline-block shadow-sm p-4">
              <h4 className="fw-bold">Acceso Restringido</h4>
              <p className="mb-3">Debes iniciar sesión con una cuenta autorizada para acceder a esta sección.</p>
              <button className="btn btn-primary" onClick={() => navigate('login')}>
                Ir a Iniciar Sesión
              </button>
            </div>
          </div>
        );
      }

      if (!isAdmin && !isVendor) {
        return (
          <div className="container py-5 text-center">
            <div className="alert alert-danger d-inline-block shadow-sm p-4">
              <h4 className="fw-bold">Permisos Insuficientes</h4>
              <p className="mb-3">Tu rol actual no tiene privilegios para acceder al Panel Administrativo.</p>
              <button className="btn btn-outline-primary" onClick={() => navigate('home')}>
                Volver al Inicio
              </button>
            </div>
          </div>
        );
      }

      // Restricción adicional: Solo el Administrador puede gestionar usuarios
      if (currentPage.startsWith('admin-user') && !isAdmin) {
        return (
          <div className="container py-5 text-center">
            <div className="alert alert-danger d-inline-block shadow-sm p-4">
              <h4 className="fw-bold">Acceso Denegado</h4>
              <p className="mb-3">Solo los usuarios con rol de Administrador pueden gestionar las cuentas de usuario.</p>
              <button className="btn btn-primary" onClick={() => navigate('admin-dashboard')}>
                Volver al Panel
              </button>
            </div>
          </div>
        );
      }
    }

    // Switch de enrutamiento principal
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'products':
        return (
          <Products
            onNavigate={navigate}
            initialCategory={routeParams.category}
            initialSearch={routeParams.search}
          />
        );
      case 'product-detail':
        return <ProductDetail productId={routeParams.id} onNavigate={navigate} />;
      case 'categories':
        return <Categories onNavigate={navigate} />;
      case 'offers':
        return <Offers onNavigate={navigate} />;
      case 'cart':
        return <Cart onNavigate={navigate} />;
      case 'checkout':
        return <Checkout onNavigate={navigate} />;
      case 'payment-success':
        return <PaymentSuccess orderId={routeParams.orderId || '#20240705'} onNavigate={navigate} />;
      case 'payment-error':
        return <PaymentError onNavigate={navigate} />;
      case 'about':
        return <About onNavigate={navigate} />;
      case 'blogs':
        return <Blogs onNavigate={navigate} />;
      case 'contact':
        return <Contact onNavigate={navigate} />;
      case 'login':
        return <Login onNavigate={navigate} />;
      case 'register':
        return <Register onNavigate={navigate} />;

      // Rutas administrativas
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={navigate} />;
      case 'admin-products':
        return <AdminProducts onNavigate={navigate} />;
      case 'admin-product-new':
        return <AdminProductForm onNavigate={navigate} />;
      case 'admin-product-edit':
        return <AdminProductForm productId={routeParams.id} onNavigate={navigate} />;
      case 'admin-categories':
        return <AdminCategories onNavigate={navigate} />;
      case 'admin-users':
        return <AdminUsers onNavigate={navigate} />;
      case 'admin-user-new':
        return <AdminUserForm onNavigate={navigate} />;
      case 'admin-user-edit':
        return <AdminUserForm userRut={routeParams.rut} onNavigate={navigate} />;
      case 'admin-orders':
        return <AdminOrders onNavigate={navigate} />;

      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Barra de navegación superior */}
      <Navbar onNavigate={navigate} currentPage={currentPage} />

      {/* Contenido dinámico principal */}
      <main className="flex-grow-1">
        {renderCurrentPage()}
      </main>

      {/* Pie de página corporativo */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

/* Componente contenedor con Proveedores de Contexto Global */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
