CREATE TABLE jugador (
    id_jugador INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    edad INT NULL,
    categoria VARCHAR(45) NULL,
    genero VARCHAR(45) NOT NULL,
    telefono VARCHAR(45)  NULL,
    direccion VARCHAR(200)  NULL,
    email VARCHAR(145) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    club VARCHAR(45) NULL,
    telefono_emergencia VARCHAR(45) NOT NULL,
    prestador_servicio_emergencia VARCHAR(45) NOT NULL,
    habilitado TINYINT(1),
    PRIMARY KEY (id_jugador)
);


ALTER TABLE jugador
ADD COLUMN fk_id_club INT,
ADD FOREIGN KEY (fk_id_club) REFERENCES club(id_club);

ALTER TABLE jugador
ADD COLUMN fk_id_entrenador INT,
ADD FOREIGN KEY (fk_id_entrenador) REFERENCES entrenador(id_entrenador);

ALTER TABLE jugador
ADD COLUMN fk_id_categoria INT,
ADD FOREIGN KEY (fk_id_categoria) REFERENCES categoria(id_categoria);


CREATE TABLE club (
id_club INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
telefono VARCHAR(45) NOT NULL,
direccion VARCHAR(200) NOT NULL,
email VARCHAR(45) NOT NULL,
socio_desde DATETIME NOT NULL,
habilitado TINYINT(1),
cantidad_jugadores_activos INT,
telefono_emergencia VARCHAR(45) NOT NULL,
prestador_servicio_emergencia VARCHAR(45) NOT NULL,
PRIMARY KEY (id_club)
);


CREATE TABLE categoria (
id_categoria INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
cantidad_jugadores_activos INT,
PRIMARY KEY (id_categoria)
);

CREATE TABLE arbitro (
id_arbitro INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
apellido VARCHAR(45) NOT NULL,
edad INT NOT NULL,
genero VARCHAR(45) NOT NULL,
telefono VARCHAR(45) NOT NULL,
direccion VARCHAR(200) NOT NULL,
habilitado TINYINT(1),
email VARCHAR(45) NOT NULL,
fecha_nacimiento DATETIME NOT NULL,
PRIMARY KEY (id_arbitro)
);

CREATE TABLE entrenador (
id_entrenador INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
apellido VARCHAR(45) NOT NULL,
edad INT NOT NULL,
categoria INT NOT NULL,
genero VARCHAR(45) NOT NULL,
telefono VARCHAR(45) NOT NULL,
direccion VARCHAR(200) NOT NULL,
email VARCHAR(45) NOT NULL,
fecha_nacimiento DATETIME NOT NULL,
club VARCHAR(45) NOT NULL,
habilitado TINYINT(1),
PRIMARY KEY (id_entrenador)
);

ALTER TABLE entrenador
drop column fk_id_jugador;

ALTER TABLE entrenador
ADD COLUMN fk_id_jugador INT,
ADD FOREIGN KEY (fk_id_jugador) REFERENCES jugador(id_jugador);

ALTER TABLE entrenador
ADD COLUMN fk_id_club INT,
ADD FOREIGN KEY (fk_id_club) REFERENCES club(id_club);


CREATE TABLE delegado (
id_delegado INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
apellido VARCHAR(45) NOT NULL,
edad INT,
categoria INT,
genero VARCHAR(45),
telefono VARCHAR(45) NOT NULL,
direccion VARCHAR(200) NOT NULL,
email VARCHAR(45) NOT NULL,
fecha_nacimiento DATETIME NOT NULL,
club VARCHAR(45) NOT NULL,
habilitado TINYINT(1),
PRIMARY KEY (id_delegado)
);

ALTER TABLE delegado
ADD COLUMN fk_id_club INT,
ADD FOREIGN KEY (fk_id_club) REFERENCES club(id_club);

create table campeonato (
id_campeonato INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
categoria VARCHAR(45) NOT NULL,
genero VARCHAR(45) NOT NULL,
PRIMARY KEY (id_campeonato)
);

select * from campeonato;

ALTER TABLE campeonato
DROP COLUMN torneo;

ALTER TABLE campeonato
ADD COLUMN federacion VARCHAR(100) NOT NULL;

ALTER TABLE campeonato
ADD COLUMN id_torneo INT;


ALTER TABLE campeonato
ADD CONSTRAINT FK_Campeonato_Torneo
FOREIGN KEY (id_torneo)
REFERENCES torneo(id_torneo);

CREATE TABLE torneo (
    id_torneo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_campeonato INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (id_campeonato) REFERENCES campeonato(id_campeonato)
);


CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_torneo INT,
    genero VARCHAR(10),
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo)
);


CREATE TABLE categoriaJugador (
    id_categoriaJugador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_campeonato INT,
    id_torneo INT,
    genero VARCHAR(10),
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_campeonato) REFERENCES torneo(id_campeonato)
);


CREATE TABLE partido (
    id_partido INT AUTO_INCREMENT PRIMARY KEY,
    id_torneo INT,
    id_categoria INT,
    fecha DATETIME,
    lugar VARCHAR(200),
    id_club_local INT,
    id_club_visitante INT,
    resultado_local INT,
    resultado_visitante INT,
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_club_local) REFERENCES club(id_club),
    FOREIGN KEY (id_club_visitante) REFERENCES club(id_club)
);

CREATE TABLE estadisticas_jugador (
    id_estadistica INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT,
    id_partido INT,
    lanzamientos INT DEFAULT 0,
    goles INT DEFAULT 0,
    atajadas INT DEFAULT 0,
    perdidas INT DEFAULT 0,
    recuperaciones INT DEFAULT 0,
    asistencia INT DEFAULT 0,
    amarilla INT DEFAULT 0, -- Asumiendo 1 para amarilla, 0 para no amarilla
    roja INT DEFAULT 0, -- Asumiendo 1 para roja, 0 para no roja
    dos_minutos INT DEFAULT 0, -- Asumiendo 1 para penalización de 2 minutos, 0 para no penalización
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador),
    FOREIGN KEY (id_partido) REFERENCES partido(id_partido)
);

-- garantiza que no haya entradas repetidas por cada jugador en cada partido
ALTER TABLE estadisticas_jugador
ADD CONSTRAINT UC_Estadisticas_Jugador_Partido UNIQUE (id_jugador, id_partido);

-- si el número de 2 minutos recibidos llega a 3 actualiza el estado de "roja"
DELIMITER //

CREATE TRIGGER update_roja
BEFORE INSERT ON estadisticas_jugador
FOR EACH ROW
BEGIN
    IF NEW.dos_minutos >= 3 THEN
        SET NEW.roja = 1;
    END IF;
END //

DELIMITER ;

-- garantiza que se actualice las estadisticas del jugador con la roja recibida
DELIMITER //

CREATE TRIGGER update_roja_on_update
BEFORE UPDATE ON estadisticas_jugador
FOR EACH ROW
BEGIN
    IF NEW.dos_minutos >= 3 THEN
        SET NEW.roja = 1;
    END IF;
END //

DELIMITER ;


CREATE TABLE lesion (
    id_lesion INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT,
    descripcion VARCHAR(200),
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador)
);

CREATE TABLE disciplina (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT,
    descripcion VARCHAR(200),
    fecha DATE,
    tipo VARCHAR(50), -- Ejemplo: "Sanción", "Suspensión", etc.
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador)
);

CREATE TABLE fixture (
    id_fixture INT AUTO_INCREMENT PRIMARY KEY,
    id_torneo INT,
    id_partido INT,
    fecha DATETIME,
    lugar VARCHAR(200),
    id_club_local INT,
    id_club_visitante INT,
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_partido) REFERENCES partido(id_partido),
    FOREIGN KEY (id_club_local) REFERENCES club(id_club),
    FOREIGN KEY (id_club_visitante) REFERENCES club(id_club)
);

CREATE TABLE resultado (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_partido INT,
    resultado_local INT,
    resultado_visitante INT,
    FOREIGN KEY (id_partido) REFERENCES partido(id_partido)
);

CREATE TABLE historial_partido (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_partido INT,
    evento VARCHAR(200),
    minuto INT,
    detalle VARCHAR(500),
    FOREIGN KEY (id_partido) REFERENCES partido(id_partido)
);

CREATE TABLE asistencia (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_partido INT,
    id_jugador INT,
    asistio BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_partido) REFERENCES partido(id_partido),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador)
);