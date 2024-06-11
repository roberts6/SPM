DELIMITER //

CREATE FUNCTION calcular_categoria(fecha_nacimiento DATE) RETURNS VARCHAR(25)
DETERMINISTIC
BEGIN
  DECLARE categoria VARCHAR(25);
  DECLARE actual INT DEFAULT YEAR(CURDATE());

  IF YEAR(fecha_nacimiento) <= actual - 22 THEN
    SET categoria = 'Mayor';
  ELSEIF YEAR(fecha_nacimiento) BETWEEN actual - 21 AND actual - 19 THEN
    SET categoria = 'Junior';
  ELSEIF YEAR(fecha_nacimiento) BETWEEN actual - 18 AND actual - 17 THEN
    SET categoria = 'Juvenil';
  ELSEIF YEAR(fecha_nacimiento) BETWEEN actual - 16 AND actual - 15 THEN
    SET categoria = 'Cadete';
  ELSEIF YEAR(fecha_nacimiento) BETWEEN actual - 14 AND actual - 13 THEN
    SET categoria = 'Menor';
  ELSEIF YEAR(fecha_nacimiento) BETWEEN actual - 12 AND actual - 11 THEN
    SET categoria = 'Infantil';
  ELSE
    SET categoria = 'Mini';
  END IF;

  RETURN categoria;
END //

DELIMITER ;


DELIMITER //

-- Trigger para asignar la categoría antes de insertar un nuevo jugador
CREATE TRIGGER asignar_categoria_antes_insert
BEFORE INSERT ON jugador
FOR EACH ROW
BEGIN
    SET NEW.categoria = calcular_categoria(NEW.fecha_nacimiento);
END //

-- Trigger para asignar la categoría antes de actualizar un jugador existente
CREATE TRIGGER actualizar_categoria_antes_update
BEFORE UPDATE ON jugador
FOR EACH ROW
BEGIN
    SET NEW.categoria = calcular_categoria(NEW.fecha_nacimiento);
END //

-- Trigger para calcular la edad antes de insertar un nuevo jugador
CREATE TRIGGER calcular_edad_antes_insert
BEFORE INSERT ON jugador
FOR EACH ROW
BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END //

-- Trigger para calcular la edad antes de actualizar un jugador existente
CREATE TRIGGER calcular_edad_antes_update
BEFORE UPDATE ON jugador
FOR EACH ROW
BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END //

DELIMITER ;

DROP TRIGGER IF EXISTS asignar_categoria_antes_insert;
DROP TRIGGER IF EXISTS actualizar_categoria_antes_update;
DROP TRIGGER IF EXISTS calcular_edad_antes_insert;
DROP TRIGGER IF EXISTS calcular_edad_antes_update;
DROP FUNCTION IF EXISTS calcular_categoria;

