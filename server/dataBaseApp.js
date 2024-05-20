import express from 'express'
import {getJugadorByClub,
    getJugadoresFull, 
    getJugador,
    getJugadoresByClubHabilitado,
    getJugadorById,
    getJugadorByEmail,
    getJugadorByApellido,
    getJugadorHabilitado,
    getJugadorNoHabilitado,
    getEntrenadorNoHabilitado,
    getEntrenadorHabilitado,
    crearJugador,
    actualizarJugador,
    eliminarJugador
} from './dataBase.js'
import cors from 'cors';

// para que la API sea privada se crea esta constante
const corsOptions = {
    origin: "http://192.168.86.29:8081", // especifica el origen de la request. En este caso solo va a estar disponible para el uso desde mi localhost
    methods: ["POST", "GET", "PUT", "DELETE"], // métodos autorizados
    credentials: true // si acepta enviar cookies o autenticaciones
}
const app = express();
app.use(express.json()); // solo escucha request cuya respuesta es un json
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); //si no se especifica nada (app.use(cors());) se deja la API abierta para cualquier persona
const PORT = 8083

//trae a todos los jugadores de la base de datos
app.get('/jugadores/full', async (req, res) => {
    console.log('Solicitud recibida para /jugadores/full ');
    try {
        const jugadores = await getJugadoresFull();
        res.json(jugadores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todos los jugadores' });
    }
});


// busca un jugador por su id
app.get("/jugador/id/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10); // convierte el id en número si lo pasa como string
  
    if (isNaN(id)) {
      return res.status(400).send({ message: "formato inválido de ID" });
    }
  
    try {
      const jugador = await getJugadorById(id);
      if (!jugador) {
        return res.status(404).send({ message: "Jugador no encontrado" });
      }
      res.json(jugador); 
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ocurrió un error" });
    }
  });

  // devuelve un jugador buscado por nombre o apellido
  app.get("/jugador/nombre/:nombre", async (req, res) => {
    const nombre = req.params.nombre.replace(/-/g, ' ');
    const nombreFormatted = nombre.toLowerCase(); // o .toUpperCase(), dependiendo de la situación
  
    try {
      const jugadores = await getJugador(nombreFormatted);
      if (jugadores.length === 0) {
        return res.status(404).send({ message: "Jugadores no encontrados con este nombre." });
      }
      res.send(jugadores);
    } catch (error) {
      res.status(500).send({ message: "Error al recuperar jugadores nombre: " + nombreFormatted });
    }
});


// busca jugadores por club
app.get("/jugadores/club/:club", async (req, res) => {
    // Reemplaza guiones con espacios para coincidir con los valores de la base de datos
    const club = req.params.club.replace(/-/g, ' ');

    const clubFormatted = club.toLowerCase(); // o .toUpperCase(), dependiendo de la situación
  
    try {
      const jugadores = await getJugadorByClub(clubFormatted);
      if (jugadores.length === 0) {
        return res.status(404).send({ message: "Jugadores no encontrados para este club." });
      }
      res.send(jugadores);
    } catch (error) {
      res.status(500).send({ message: "Error al recuperar jugadores del club: " + club });
    }
  });

  // busca jugadores habiilitados por club
  app.get("/jugadores/habilitados/:club", async (req, res) => {
    // Reemplaza guiones con espacios para coincidir con los valores de la base de datos
    const club = req.params.club.replace(/-/g, ' ');

    const clubFormatted = club.toLowerCase(); // o .toUpperCase(), dependiendo de la situación
  
    try {
      const jugadores = await getJugadoresByClubHabilitado(clubFormatted);
      if (jugadores.length === 0) {
        return res.status(404).send({ message: "Jugadores no encontrados para este club." });
      }
      res.send(jugadores);
    } catch (error) {
      res.status(500).send({ message: "Error al recuperar jugadores del club: " + club });
    }
  });
  
// actualiza un jugador por su ID
app.put("/jugador/actualizar/:id", async (req, res) => {
    const id_jugador = parseInt(req.params.id, 10);
    
    if (isNaN(id_jugador)) {
        return res.status(400).send({ message: "Formato inválido para el ID" });
    }
  
    // Registra los parámetros de la solicitud
    console.log("ID del jugador: ", id_jugador);
    console.log("Datos recibidos en el body: ", req.body);
  
    const { 
        nombre, 
        apellido, 
        edad, 
        genero, 
        telefono, 
        direccion, 
        email, 
        fecha_nacimiento, 
        club, 
        telefono_emergencia, 
        prestador_servicio_emergencia,
        habilitado 
    } = req.body;
  
    try {
        const jugadorActualizado = await actualizarJugador(
            id_jugador,
            nombre,
            apellido,
            edad,
            genero,
            telefono,
            direccion,
            email,
            fecha_nacimiento,
            club,
            telefono_emergencia,
            prestador_servicio_emergencia,
            habilitado 
        );
        res.json(jugadorActualizado);
    } catch (error) {
        console.error("Error al actualizar el jugador:", error);
        res.status(500).send({ message: "Error al actualizar el jugador", detail: error.message });
    }
});


  
// borra un jugador por su ID
app.delete("/jugador/borrar/:id", async (req, res) => {
    const id_jugador = parseInt(req.params.id, 10);
    if (isNaN(id_jugador)) {
      return res.status(400).send({ message: "Formato inválido para el ID" });
    } 
    try {
      const jugadorEliminado = await eliminarJugador(id_jugador);

      if (jugadorEliminado.affectedRows === 0) {
        return res.status(404).send({ message: "Jugador no encontrado" });
      }
  
      res.status(200).send({ message: "Jugador eliminado. ID: ", id_jugador });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al eliminar al jugador id: ", id_jugador });
    }
  });

// Crea un jugador nuevo
app.post("/jugador/crear", async (req, res) => {
    const { nombre, apellido, edad, genero, telefono, direccion, email, fecha_nacimiento, club, telefono_emergencia, prestador_servicio_emergencia } = req.body;
  
    try {
      const jugadorNuevo = await crearJugador(
        nombre,
        apellido,
        edad,
        genero,
        telefono,
        direccion,
        email,
        fecha_nacimiento,
        club,
        telefono_emergencia,
        prestador_servicio_emergencia
      );
      res.json(jugadorNuevo);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el jugador", error });
    }
  });
  
  

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto ", PORT)
})