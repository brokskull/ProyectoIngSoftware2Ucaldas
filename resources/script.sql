DROP TABLE RutasBuses;
DROP TABLE bus;
DROP TABLE puntosxruta;
DROP TABLE ruta;
DROP TABLE punto;


create table punto(
	id_punto int primary key,
	longitud decimal(9,6) NOT NULL,
	latitud decimal(9,6) NOT NULL
);


CREATE TABLE ruta (
	id_ruta int PRIMARY KEY ,
	nombre varchar(30) null,
	id_punto_inicio int null,
	id_punto_fin int null,
	constraint ruta_fk_puntoInicio
		foreign key (id_punto_inicio) references BUSES.punto (id_punto),
	constraint ruta_fk_puntoFinal
		foreign key (id_punto_fin) references BUSES.punto (id_punto)
);


create table puntosxruta(
	id_ruta int null,
	id_punto int null,
	constraint puntosxruta_fk_idRuta
		foreign key (id_ruta) references BUSES.ruta (id_ruta),
	constraint puntosxruta_fk_idPunto
		foreign key (id_punto) references BUSES.punto (id_punto)
);

CREATE TABLE bus(
  placa VARCHAR(10) PRIMARY KEY,
  capacidad INTEGER NOT NULL,
  CONSTRAINT checkPlaca CHECK (LENGTH(placa) = 6)
);


create table RutasBuses(
	placa VARCHAR(10) NOT NULL,
	idRuta int NOT NULL,
	startDate TIMESTAMP default CURRENT_TIMESTAMP not null,
	finishDate TIMESTAMP default '0000-00-00 00:00:00' not null,
	constraint RutasBuses_fk_placa
		foreign key (placa) references BUSES.bus (placa)
			on delete cascade,
	constraint RutasBuses_fk_idRuta
		foreign key (idRuta) references BUSES.ruta (id_ruta)
			on delete cascade
);

