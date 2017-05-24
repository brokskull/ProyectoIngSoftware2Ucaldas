DROP PROCEDURE addBus;
CREATE PROCEDURE addBus(
   IN placa VARCHAR(10),
   IN capacidad INT
)
BEGIN
  DECLARE _placaNueva VARCHAR(10);
  SET _placaNueva = placa;
  INSERT INTO bus (placa, capacidad) VALUES (_placaNueva, capacidad);
END;
