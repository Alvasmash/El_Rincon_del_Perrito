/* Regiones y comunas oficiales de Chile */
export const REGIONES_Y_COMUNAS = [
  {
    region: "Región Metropolitana de Santiago",
    comunas: [
      "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central",
      "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana",
      "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú",
      "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura",
      "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón",
      "Vitacura", "Puente Alto", "San Bernardo", "Colina", "Melipilla", "Talagante"
    ]
  },
  {
    region: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "Quillota", "San Antonio", "Los Andes"]
  },
  {
    region: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Coronel", "Chiguayante", "Los Ángeles", "Tomé"]
  },
  {
    region: "Región de La Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Lautaro", "Victoria"]
  },
  {
    region: "Región de Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"]
  },
  {
    region: "Región de Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones"]
  },
  {
    region: "Región de O'Higgins",
    comunas: ["Rancagua", "Machalí", "Rengo", "San Fernando", "Pichilemu"]
  },
  {
    region: "Región del Maule",
    comunas: ["Talca", "Curicó", "Linares", "Constitución", "Molina"]
  },
  {
    region: "Región de Los Lagos",
    comunas: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud", "Frutillar"]
  },
  {
    region: "Región de Los Ríos",
    comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"]
  },
  {
    region: "Región de Tarapacá",
    comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte"]
  },
  {
    region: "Región de Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre"]
  },
  {
    region: "Región de Atacama",
    comunas: ["Copiapó", "Vallenar", "Caldera"]
  },
  {
    region: "Región de Ñuble",
    comunas: ["Chillán", "Chillán Viejo", "San Carlos"]
  },
  {
    region: "Región de Aysén",
    comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico"]
  },
  {
    region: "Región de Magallanes",
    comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"]
  }
];

/* Devuelve las comunas según el nombre de la región */
export function getCommunesForRegion(regionName) {
  if (!regionName) return [];
  const found = REGIONES_Y_COMUNAS.find(r => 
    r.region.toLowerCase() === regionName.toLowerCase() ||
    r.region.toLowerCase().includes(regionName.toLowerCase()) ||
    regionName.toLowerCase().includes(r.region.toLowerCase())
  );
  return found ? found.comunas : [];
}

/* Alias con formato { nombre, comunas } para compatibilidad */
export const REGIONES_CHILE = REGIONES_Y_COMUNAS.map(r => ({
  nombre: r.region,
  region: r.region,
  comunas: r.comunas
}));

