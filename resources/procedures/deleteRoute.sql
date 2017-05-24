CREATE PROCEDURE deleteRoute(IN idRoute INT)
  BEGIN
  #Delete first the pointXRuta
  #DELETE
  #FROM puntosxruta
  #WHERE id_ruta = idRoute;

  DELETE
  FROM ruta
  WHERE id_ruta = idRoute;
END;
