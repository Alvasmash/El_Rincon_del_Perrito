/* Vista de Panel de Control Administrativo (Figura 9 de la rúbrica) */
import React, { useState, useEffect } from 'react';
import { getProducts, getUsers, getOrders, getCategories } from '../../data/db';
import { formatCLP } from '../../data/validations';
import AlertStock from '../../components/AlertStock';

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    totalVentas: 0,
    totalProductos: 0,
    totalUsuarios: 0,
    stockCriticoCount: 0
  });
  const [criticalProducts, setCriticalProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Cargar datos consolidados para las métricas del panel
    const products = getProducts();
    const users = getUsers();
    const orders = getOrders();

    const ventas = orders.reduce((acc, o) => acc + (o.total || 0), 0);
    const criticos = products.filter(p => p.stock <= p.stockCritico);

    setStats({
      totalVentas: ventas,
      totalProductos: products.length,
      totalUsuarios: users.length,
      stockCriticoCount: criticos.length
    });
    setCriticalProducts(criticos.slice(0, 5));
    setRecentOrders(orders.slice(0, 5));
  }, []);

  return (
    <div className="container py-4">
      {/* Título y bienvenida */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Panel de Control Administrativo</h1>
          <p className="text-muted mb-0">Gestión de inventario, usuarios y ventas de El Rincón del Perrito</p>
        </div>
        <div className="btn-group mt-2 mt-sm-0">
          <button className="btn btn-primary" onClick={() => onNavigate('admin-product-new')}>
            <i className="bi bi-plus-circle me-1"></i> Nuevo Producto
          </button>
          <button className="btn btn-outline-primary" onClick={() => onNavigate('admin-user-new')}>
            <i className="bi bi-person-plus me-1"></i> Nuevo Usuario
          </button>
        </div>
      </div>

      {/* 4 Cards de Métricas / KPIs */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-primary border-4 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">Total Ventas</div>
                  <div className="fs-4 fw-bold text-dark">{formatCLP(stats.totalVentas)}</div>
                </div>
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                  <i className="bi bi-currency-dollar fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-success border-4 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">Productos</div>
                  <div className="fs-4 fw-bold text-dark">{stats.totalProductos}</div>
                </div>
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                  <i className="bi bi-box-seam fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-info border-4 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">Usuarios</div>
                  <div className="fs-4 fw-bold text-dark">{stats.totalUsuarios}</div>
                </div>
                <div className="bg-info bg-opacity-10 text-info p-3 rounded-circle">
                  <i className="bi bi-people fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-danger border-4 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small fw-semibold text-uppercase">Stock Crítico</div>
                  <div className="fs-4 fw-bold text-danger">{stats.stockCriticoCount}</div>
                </div>
                <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle">
                  <i className="bi bi-exclamation-triangle fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <button className="btn btn-outline-dark w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2" onClick={() => onNavigate('admin-products')}>
            <i className="bi bi-boxes fs-5 text-primary"></i>
            <span className="fw-semibold">Catálogo Productos</span>
          </button>
        </div>
        <div className="col-12 col-md-3">
          <button className="btn btn-outline-dark w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2" onClick={() => onNavigate('admin-categories')}>
            <i className="bi bi-tags fs-5 text-success"></i>
            <span className="fw-semibold">Categorías</span>
          </button>
        </div>
        <div className="col-12 col-md-3">
          <button className="btn btn-outline-dark w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2" onClick={() => onNavigate('admin-users')}>
            <i className="bi bi-person-gear fs-5 text-info"></i>
            <span className="fw-semibold">Gestión Usuarios</span>
          </button>
        </div>
        <div className="col-12 col-md-3">
          <button className="btn btn-outline-dark w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2" onClick={() => onNavigate('admin-orders')}>
            <i className="bi bi-receipt fs-5 text-warning"></i>
            <span className="fw-semibold">Historial Pedidos</span>
          </button>
        </div>
      </div>

      {/* Sección doble: Alertas de Stock y Últimas Órdenes */}
      <div className="row g-4">
        {/* Productos con stock bajo */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="bi bi-exclamation-circle text-danger me-2"></i>
                Alertas de Stock
              </h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => onNavigate('admin-products')}>
                Ver todos
              </button>
            </div>
            <div className="card-body p-0">
              {criticalProducts.length === 0 ? (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-check-circle-fill text-success fs-2 mb-2 d-block"></i>
                  No hay productos con stock crítico en este momento.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th>Producto</th>
                        <th>Stock Actual</th>
                        <th>Mínimo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criticalProducts.map(p => (
                        <tr key={p.id}>
                          <td className="fw-medium">{p.nombre}</td>
                          <td className="text-danger fw-bold">{p.stock}</td>
                          <td>{p.stockCritico}</td>
                          <td>
                            <AlertStock stock={p.stock} stockCritico={p.stockCritico} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Últimas Órdenes Registradas */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="bi bi-clock-history text-primary me-2"></i>
                Últimos Pedidos
              </h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => onNavigate('admin-orders')}>
                Ver historial
              </button>
            </div>
            <div className="card-body p-0">
              {recentOrders.length === 0 ? (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-cart-x fs-2 mb-2 d-block"></i>
                  Aún no se han registrado compras.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th>Orden</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(o => (
                        <tr key={o.id}>
                          <td className="fw-semibold text-primary">{o.id}</td>
                          <td>{o.cliente?.nombre ? `${o.cliente.nombre} ${o.cliente.apellido || ''}` : o.cliente?.correo || 'Cliente'}</td>
                          <td className="fw-bold">{formatCLP(o.total)}</td>
                          <td>
                            <span className="badge bg-success">Aprobada</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
