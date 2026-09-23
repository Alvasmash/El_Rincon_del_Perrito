/* ==========================================================
   usuarios-data.js — Usuarios registrados y persistencia en localStorage
   Cumple con los roles y campos especificados en el PDF:
   - RUN: sin puntos ni guión (Ej: 19011022K), min 7, max 9, validación algoritmo
   - Nombre: máx 50 caracteres
   - Apellidos: máx 100 caracteres
   - Correo: máx 100 caracteres (@duoc.cl, @profesor.duoc.cl, @gmail.com)
   - Roles: Administrador, Vendedor, Cliente
   - Región y Comuna
   - Dirección: máx 300 caracteres
   ========================================================== */

const CLAVE_USUARIOS = "rincon_perrito_usuarios_v1";

const USUARIOS_INICIALES = [
    {
        run: "19011022K",
        nombre: "Administrador",
        apellidos: "Principal",
        correo: "admin@duocuc.cl",
        clave: "admin123",
        rol: "Administrador",
        region: "Región Metropolitana de Santiago",
        comuna: "Santiago",
        direccion: "Av. España 123, Campus Duoc UC",
        telefono: "+56911223344",
        fechaNacimiento: "1995-05-12"
    },
    {
        run: "181234567",
        nombre: "Carlos",
        apellidos: "Vendedor Duoc",
        correo: "vendedor@duocuc.cl",
        clave: "vendedor123",
        rol: "Vendedor",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Calle Valparaíso 456",
        telefono: "+56955667788",
        fechaNacimiento: "1998-09-20"
    },
    {
        run: "201112223",
        nombre: "María",
        apellidos: "González Pérez",
        correo: "cliente@gmail.com",
        clave: "cliente123",
        rol: "Cliente",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "Av. Providencia 2020",
        telefono: "+56999887766",
        fechaNacimiento: "2001-03-15"
    }
];

function obtenerUsuarios() {
    try {
        // Recupera los usuarios guardados y los convierte desde JSON a un arreglo.
        const data = localStorage.getItem(CLAVE_USUARIOS);

        if (data) {
            const arr = JSON.parse(data);

            // Usa los datos guardados solo si forman un arreglo con usuarios.
            if (Array.isArray(arr) && arr.length > 0) return arr;
        }
    } catch (e) {
        console.error("Error al leer usuarios de localStorage:", e);
    }

    // Si no existen usuarios guardados, carga los usuarios iniciales.
    guardarUsuarios(USUARIOS_INICIALES);
    return USUARIOS_INICIALES;
}

function guardarUsuarios(lista) {
    try {
        // Convierte el arreglo a JSON para poder almacenarlo en LocalStorage.
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
        return true;
    } catch (e) {
        console.error("Error al guardar usuarios en localStorage:", e);
        return false;
    }
}

function buscarUsuarioPorCorreo(correo) {
    if (!correo) return undefined;

    const buscado = correo.trim().toLowerCase();

    // Normaliza @duoc.cl y @duocuc.cl para considerarlos equivalentes.
    const canonico = buscado.replace("@duoc.cl", "@duocuc.cl");

    return obtenerUsuarios().find((u) => {
        const usrCorreo = u.correo.trim().toLowerCase();
        const usrCanonico = usrCorreo.replace("@duoc.cl", "@duocuc.cl");

        // Busca coincidencias tanto con el correo original como con su versión normalizada.
        return usrCorreo === buscado || usrCanonico === canonico;
    });
}

function buscarUsuarioPorRun(run) {
    if (!run) return undefined;

    // Elimina puntos, guiones y otros caracteres antes de comparar el RUN.
    const limpio = run.trim().replace(/[^0-9kK]/g, "").toUpperCase();

    // Busca un usuario cuyo RUN coincida con el valor normalizado.
    return obtenerUsuarios().find((u) => u.run.trim().toUpperCase() === limpio);
}

function guardarOActualizarUsuario(usuario) {
    const usuarios = obtenerUsuarios();

    // Busca el usuario por RUN para saber si debe actualizarse o agregarse.
    const indice = usuarios.findIndex(
        (u) => u.run.toUpperCase() === usuario.run.toUpperCase()
    );

    if (indice >= 0) {
        // Actualiza los datos manteniendo los campos que ya existían.
        usuarios[indice] = { ...usuarios[indice], ...usuario };
    } else {
        // Agrega el usuario cuando todavía no existe.
        usuarios.push(usuario);
    }

    guardarUsuarios(usuarios);
    return true;
}

function eliminarUsuario(run) {
    let usuarios = obtenerUsuarios();

    // Filtra el usuario indicado y conserva todos los demás.
    usuarios = usuarios.filter((u) => u.run.toUpperCase() !== run.toUpperCase());

    guardarUsuarios(usuarios);
    return true;
}