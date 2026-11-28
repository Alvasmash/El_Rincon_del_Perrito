/* ==========================================================
   regiones-comunas.js — Datos de Regiones y Comunas de Chile
   Requerimiento oficial Duoc UC:
   - Mostrar las regiones que están en un arreglo de JS complementario
   - Al momento de cambiar una región, también cambia la lista de comunas
   ========================================================== */

const REGIONES_Y_COMUNAS = [
    {
        region: "Región Metropolitana de Santiago",
        comunas: [
            "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central",
            "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana",
            "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú",
            "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura",
            "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón",
            "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil",
            "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví",
            "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
        ]
    },
    {
        region: "Región de Valparaíso",
        comunas: [
            "Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "Quillota",
            "La Calera", "Limache", "San Antonio", "Cartagena", "Algarrobo", "Los Andes",
            "San Felipe", "Casablanca", "La Ligua", "Papudo", "Zapallar", "Puchuncaví", "Quintero"
        ]
    },
    {
        region: "Región del Biobío",
        comunas: [
            "Concepción", "Coronel", "Chiguayante", "San Pedro de la Paz", "Talcahuano",
            "Hualpén", "Tomé", "Penco", "Lota", "Los Ángeles", "Arauco", "Cañete", "Curanilahue", "Lebu"
        ]
    },
    {
        region: "Región de La Araucanía",
        comunas: [
            "Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Lautaro", "Victoria",
            "Nueva Imperial", "Carahue", "Pitrufquén", "Collipulli", "Traiguén", "Curacautín"
        ]
    },
    {
        region: "Región de Coquimbo",
        comunas: [
            "La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña", "Salamanca",
            "Los Vilos", "Andacollo", "Combarbalá", "Monte Patria", "Punitaqui"
        ]
    },
    {
        region: "Región de Antofagasta",
        comunas: [
            "Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal", "San Pedro de Atacama", "Sierra Gorda"
        ]
    },
    {
        region: "Región de O'Higgins",
        comunas: [
            "Rancagua", "Machalí", "Graneros", "Rengo", "San Fernando", "Santa Cruz",
            "Pichilemu", "San Vicente", "Mostazal", "Chimbarongo", "Pequenes"
        ]
    },
    {
        region: "Región del Maule",
        comunas: [
            "Talca", "Curicó", "Linares", "Constitución", "Molina", "San Javier",
            "Parral", "Cauquenes", "Longaví", "San Clemente", "Teno"
        ]
    },
    {
        region: "Región de Los Lagos",
        comunas: [
            "Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud", "Frutillar",
            "Llanquihue", "Calbuco", "Quellón", "Chonchi", "Los Muermos"
        ]
    },
    {
        region: "Región de Los Ríos",
        comunas: [
            "Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Paillaco", "Los Lagos",
            "Lanco", "Mariquina", "Futrono", "Corral", "Máfil", "Lago Ranco"
        ]
    },
    {
        region: "Región de Tarapacá",
        comunas: [
            "Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara", "Camiña", "Colchane"
        ]
    },
    {
        region: "Región de Arica y Parinacota",
        comunas: [
            "Arica", "Camarones", "Putre", "General Lagos"
        ]
    },
    {
        region: "Región de Atacama",
        comunas: [
            "Copiapó", "Vallenar", "Caldera", "Chañaral", "Tierra Amarilla", "Huasco", "Diego de Almagro"
        ]
    },
    {
        region: "Región de Ñuble",
        comunas: [
            "Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Yungay", "Quirihue", "Coihueco", "Pemuco"
        ]
    },
    {
        region: "Región de Aysén",
        comunas: [
            "Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane", "Cisnes"
        ]
    },
    {
        region: "Región de Magallanes",
        comunas: [
            "Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"
        ]
    }
];

function inicializarSelectsRegionComuna(selectRegionElement, selectComunaElement, regionInicial = "", comunaInicial = "") {
    // Permite recibir los elementos HTML directamente o sus IDs.
    const selRegion = typeof selectRegionElement === "string"
        ? document.getElementById(selectRegionElement)
        : selectRegionElement;

    const selComuna = typeof selectComunaElement === "string"
        ? document.getElementById(selectComunaElement)
        : selectComunaElement;

    if (!selRegion || !selComuna) return;

    // Limpia el selector y agrega todas las regiones disponibles.
    selRegion.innerHTML = '<option value="">-- Seleccione una región --</option>';

    REGIONES_Y_COMUNAS.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.region;
        opt.textContent = item.region;

        if (item.region === regionInicial) opt.selected = true;

        selRegion.appendChild(opt);
    });

    function actualizarComunas(regionSeleccionada, comSeleccionada = "") {
        // Reinicia la lista de comunas cada vez que cambia la región.
        selComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

        if (!regionSeleccionada) {
            selComuna.disabled = true;
            return;
        }

        // Busca en el arreglo la región seleccionada.
        const hallada = REGIONES_Y_COMUNAS.find((r) => r.region === regionSeleccionada);

        if (hallada) {
            selComuna.disabled = false;

            // Agrega solamente las comunas pertenecientes a esa región.
            hallada.comunas.forEach((com) => {
                const opt = document.createElement("option");
                opt.value = com;
                opt.textContent = com;

                if (com === comSeleccionada) opt.selected = true;

                selComuna.appendChild(opt);
            });
        } else {
            selComuna.disabled = true;
        }
    }

    // Actualiza las comunas automáticamente al cambiar de región.
    selRegion.addEventListener("change", (e) => {
        actualizarComunas(e.target.value);
    });

    // Mantiene región y comuna al cargar datos existentes en modo edición.
    if (regionInicial) {
        actualizarComunas(regionInicial, comunaInicial);
    } else {
        selComuna.disabled = true;
    }
}