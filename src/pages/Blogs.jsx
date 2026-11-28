/* Vista de blogs y casos curiosos (Figura 6) */
import React from 'react';

export const BLOGS_DATA = [
  {
    id: 1,
    tag: 'Nutrición & Descanso',
    title: 'CASO CURIOSO #1: Cómo el descanso nocturno influye en la conducta de tu perrito',
    summary: '¿Sabías que un perro adulto duerme entre 12 y 14 horas al día? Descubre por qué contar con una cama ergonómica y térmica reduce la ansiedad y los ladridos nocturnos.',
    image: 'bannerv2.jpg',
    date: '15 de Octubre, 2026',
    author: 'Equipo Veterinario El Rincón del Perrito'
  },
  {
    id: 2,
    tag: 'Estimulación Mental',
    title: 'CASO CURIOSO #2: Enriquecimiento ambiental y juguetes mordedores',
    summary: 'Masticar no es solo diversión: libera endorfinas y limpia la placa bacteriana. Aprende a escoger entre juguetes de caucho, cuerdas y mordedores según su tamaño.',
    image: 'juguetesv3.png',
    date: '18 de Octubre, 2026',
    author: 'Educadores Caninos Duoc UC'
  }
];

export function Blogs({ onNavigate }) {
  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase">NOTICIAS IMPORTANTES</h2>
        <p className="text-muted">Artículos veterinarios y consejos de bienestar para tu mascota.</p>
      </div>

      <div className="d-flex flex-column gap-4" style={{ maxWidth: '880px', margin: '0 auto' }}>
        {BLOGS_DATA.map(blog => (
          <div key={blog.id} className="card card-perrito shadow-sm overflow-hidden">
            <div className="row g-0 align-items-center">
              <div className="col-md-5 bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '220px' }}>
                <img src={'/Imagenes/' + blog.image} alt={blog.title} style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div className="col-md-7 p-4">
                <span className="badge bg-warning text-dark mb-2">{blog.tag}</span>
                <h5 className="fw-bold mb-2">{blog.title}</h5>
                <p className="small text-muted mb-3">{blog.summary}</p>
                <button onClick={() => onNavigate('blog-detail', { id: blog.id })} className="btn btn-sm btn-perrito-primary">
                  VER CASO &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogDetail({ blogId, onNavigate }) {
  const blog = BLOGS_DATA.find(b => b.id === Number(blogId)) || BLOGS_DATA[0];

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <button onClick={() => onNavigate('blogs')} className="btn btn-link text-decoration-none p-0 mb-3">
        &larr; Volver a Noticias
      </button>

      <div className="card card-perrito p-4 p-md-5 shadow-sm bg-white">
        <span className="badge bg-primary align-self-start mb-2">{blog.tag}</span>
        <h2 className="fw-bold mb-2">{blog.title}</h2>
        <small className="text-muted mb-4 d-block">Publicado: {blog.date} | Por: {blog.author}</small>

        <div className="text-center my-3 bg-light p-3 rounded">
          <img src={'/Imagenes/' + blog.image} alt={blog.title} style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain' }} />
        </div>

        <div className="mt-4 text-secondary leading-relaxed">
          <p>{blog.summary}</p>
          <h5 className="fw-bold text-dark mt-4">¿Por qué es clave para su salud?</h5>
          <p>
            Tanto el sueño reparador como el juego estimulante previenen el estrés y los problemas conductuales derivados del sedentarismo en departamentos y casas.
          </p>
          <div className="alert alert-info mt-4">
            🐾 <strong>Tip del Rincón del Perrito:</strong> Revisa nuestro catálogo de camas y juguetes para encontrar el artículo ideal para tu regalón.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
