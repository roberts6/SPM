// voy a crear una api usando Node
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getJugadoresFull() {
    try {
        const [jugadoresFull] = await pool.query(
            `SELECT DISTINCT *
            FROM jugador;`
        );
        
        console.log(jugadoresFull);
        return jugadoresFull;
    } catch (error) {
        console.error('Error al obtener todos los jugadores:', error);
        throw error; 
    }
}


export async function getJugadorByClub(club) {
    const [jugadorClub] = await pool.query(
        `SELECT DISTINCT *
        FROM jugador
        WHERE club = ?;`,[club] // se pasa la variable de esta manera para que no se pueda obtener información por fuera
        )
        console.log(jugadorClub)
        return jugadorClub
}

export async function getClub(club) {
    const [busquedaClub] = await pool.query(
        `SELECT DISTINCT club
        FROM jugadores
        WHERE club LIKE ?;`, [`%${club}%`] // se pasa la variable de esta manera para que no se pueda obtener información por fuera
    );
    return busquedaClub;
}

export async function getJugadoresByClubHabilitado(club) {
    const [jugadorClub] = await pool.query(
        `SELECT DISTINCT *
        FROM jugador
        WHERE jugador.club = ? AND jugador.habilitado = 1;`,[club] // se pasa la variable de esta manera para que no se pueda obtener información por fuera
        )
        return jugadorClub
}

export async function getJugadorById(id_jugador) {
    const [jugadorId] = await pool.query(
        `SELECT *
        FROM jugador
        WHERE id_jugador = ?;`,[id_jugador] 
        )
        console.log(jugadorId)
        return jugadorId
}

export async function getJugadorByEmail(email) {
    const [jugadorEmail] = await pool.query(
        `SELECT *
        FROM jugador
        WHERE jugador.email = ?;`,[email] 
        )
        console.log(jugadorEmail)
        return jugadorEmail
}


export async function getJugadorByApellido(apellido) {
    const [jugadorApellido] = await pool.query(
        `SELECT *
        FROM jugador
        WHERE LOWER(jugador.apellido) = ?;`,[apellido] 
    );
    console.log(jugadorApellido);
    return jugadorApellido;
}


export async function getJugadorHabilitado(habilitado) {
    const [jugadorHabilitado] = await pool.query(
        `SELECT *
        FROM jugador
        WHERE jugador.habilitado = ?;`,[habilitado] 
        )
         console.log(jugadorHabilitado) 
        return jugadorHabilitado
}

export async function getJugadorNoHabilitado(habilitado) {
    const [jugadorNoHabilitado] = await pool.query(
        `SELECT *
        FROM jugador
        WHERE jugador.habilitado = ?;`,[habilitado] 
        )
         console.log(jugadorNoHabilitado) 
        return jugadorNoHabilitado
}


export async function getEntrenadorNoHabilitado(habilitado) {
    const [entrenadorNoHabilitado] = await pool.query(
        `SELECT *
        FROM entrenador
        WHERE entrenador.habilitado = ?;`,[habilitado] 
        )
         console.log(entrenadorNoHabilitado) 
        return entrenadorNoHabilitado
}


export async function getEntrenadorHabilitado(habilitado) {
    const [entrenadorHabilitado] = await pool.query(
        `SELECT *
        FROM entrenador
        WHERE entrenador.habilitado = ?;`,[habilitado] 
        )
         console.log(entrenadorHabilitado) 
        return entrenadorHabilitado
}

// Busca por apellido o nombre
export async function getJugador(busqueda) {
    const query = `SELECT * FROM jugador WHERE nombre LIKE ? OR apellido LIKE ?;`;
    const escapedBusqueda = '%' + busqueda + '%';
  
    try {
        const [jugadorNombre] = await pool.query(query, [escapedBusqueda, escapedBusqueda]);
        console.log('Resultados de búsqueda:', jugadorNombre);
        return jugadorNombre;
    } catch (error) {
        console.error('Error al buscar jugadores:', error);
        return [];
    }
}

// crea un jugador nuevo
export async function crearJugador(nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia, prestador_servicio_emergencia, habilitado) {
    const [jugadorNuevo] = await pool.query(
        `INSERT INTO jugador (nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia, prestador_servicio_emergencia, habilitado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia, prestador_servicio_emergencia, habilitado]
    );

    const id_jugador = jugadorNuevo.insertId;
    console.log('Este es el jugador creado:', jugadorNuevo);

    return getJugadorById(id_jugador);
}


export async function actualizarJugador(id_jugador, nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia, prestador_servicio_emergencia, habilitado) {
    try {
        // Registro los parámetros recibidos
        console.log("Parámetros de actualización recibidos: ", {
            id_jugador, nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia, prestador_servicio_emergencia, habilitado
        });

        // Ejecuto la consulta y registro la consulta ejecutada en forma de cadena para depuración
        const query = `UPDATE jugador
                       SET nombre = ?, apellido = ?, edad = ?, genero = ?, telefono = ?, direccion = ?, 
                           email = ?, fecha_nacimiento = ?, club = ?, telefono_emergencia = ?, 
                           prestador_servicio_emergencia = ?, habilitado = ?
                       WHERE id_jugador = ?`;
        const values = [
            nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia,
            prestador_servicio_emergencia, habilitado, id_jugador
        ];
        
        // console.log("Consulta SQL: ", query);
        // console.log("Valores: ", values);
        
        const [jugadorActualizado] = await pool.query(query, values);

        // Verifico si la actualización fue exitosa
        if (jugadorActualizado.affectedRows === 0) {
            throw new Error("No se encontró el jugador con el ID proporcionado.");
        }

        // recibo los datos actualizados del jugador
        return getJugadorById(id_jugador);
    } catch (error) {
        console.error("Error en la función actualizarJugador:", error);
        throw error;
    }
}


export async function eliminarJugador(id_jugador){
    const [jugadorEliminado] = await pool.query(
        `DELETE FROM jugador where id_jugador = ?`,[id_jugador]
    )
    console.log(jugadorEliminado)
    return jugadorEliminado
}