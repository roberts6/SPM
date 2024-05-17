CREATE TABLE jugador (
id_jugador INT auto_increment NOT NULL,
nombre VARCHAR(45) NOT NULL,
apellido VARCHAR(45) NOT NULL,
edad INT NOT NULL,
genero VARCHAR(45) NOT NULL,
telefono VARCHAR(45) NOT NULL,
direccion VARCHAR(200) NOT NULL,
email VARCHAR(45) NOT NULL,
fecha_nacimiento DATETIME NOT NULL,
club VARCHAR(45) NOT NULL,
telefono_emergencia VARCHAR(45) NOT NULL,
prestador_servicio_emergencia VARCHAR(45) NOT NULL,
habilitado TINYINT(1),
PRIMARY KEY (id_jugador)
);

alter table jugador
modify column email VARCHAR(145) unique NOT NULL;

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