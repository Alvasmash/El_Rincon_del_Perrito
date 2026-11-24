/* Vista institucional de la empresa y equipo de desarrollo Duoc UC */
import React from 'react';

export function About() {
  return (
    <div className="container py-4">
      <div className="text-center mb-5" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h2 className="fw-bold mb-3">Sobre El Rincón del Perrito</h2>
        <p className="lead text-muted">
          Somos una tienda especializada en el cuidado, bienestar y confort de perros en todo Chile, comprometidos con la tenencia responsable y productos seguros.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card card-perrito p-4 h-100 shadow-sm">
            <h4 className="fw-bold text-primary mb-3">🎯 Nuestra Misión</h4>
            <p className="text-secondary">
              Ofrecer soluciones innovadoras y de alta durabilidad para perros de todas las razas y edades, facilitando el juego interactivo, el descanso confortable y la salud de tu mascota.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-perrito p-4 h-100 shadow-sm">
            <h4 className="fw-bold text-primary mb-3">🌟 Nuestra Visión</h4>
            <p className="text-secondary">
              Ser la plataforma online de mascotas preferida en el país, reconocida por su servicio cercano, ética empresarial y uso de tecnología moderna y responsiva.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 className="fw-bold">Equipo de Desarrollo Duoc UC</h3>
        <p className="text-muted">Estudiantes de la Escuela de Informática y Telecomunicaciones — Asignatura DSY1104</p>
      </div>

      <div className="row g-4 justify-content-center">
        {[
          { icon: '👨‍💻', name: 'Estudiante Frontend', role: 'Componentes React & Bootstrap', desc: 'Estructuración de componentes bajo Single Responsibility y responsividad móvil.' },
          { icon: '💻', name: 'Desarrollador JavaScript', role: 'Lógica CRUD & Testing', desc: 'Implementación de persistencia con LocalStorage y pruebas unitarias con Jasmine/Karma.' },
          { icon: '🛠️', name: 'Administrador Fullstack', role: 'Gestión de Roles & ERS', desc: 'Control de accesos y redacción del informe de requisitos y cobertura.' }
        ].map((m, i) => (
          <div key={i} className="col-md-4">
            <div className="card card-perrito p-4 text-center h-100 shadow-sm">
              <div className="fs-1 mb-2">{m.icon}</div>
              <h5 className="fw-bold mb-1">{m.name}</h5>
              <span className="badge bg-primary align-self-center mb-2">{m.role}</span>
              <p className="small text-muted">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
