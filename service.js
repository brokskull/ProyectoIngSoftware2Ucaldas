let express = require('express');
let bodyParser = require('body-parser');
let routesBus = require('./routes/bus');

let app = express();
let port = process.env.PORT || 1337;

app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({extended: false}));

app.use(perimitirCrossDomain);

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'loaiza1144',
    database: 'BUSES',
    port: 3306
});

app.listen(port, '127.0.0.1');
console.log('Server listening in port ' + port);

//CONEXCION A LA BASE DE DATOS EN MYSQL
conectar();

function perimitirCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

function conectar () {
    connection.connect(function (error) {
        if (error) {
            throw error;
        } else {
            console.log('Conexion correcta.');
        }
    });
}

//------------------Web service--------------------------------------------

//-----------------Insertar Puntos-----------------------------------------
app.post('/routes', function (req, res) {
    console.log('latitud: ' + req.body.latitud);
    console.log('longitud: ' + req.body.longitud);
    console.log('id Ruta:' + req.body.idRuta);
    res.send('datos recividos');
});

app.post('/insertpuntos', function (req, res) {
    let query = connection.query('CALL addPoint(?, ?, ?)', [req.body.id, req.body.latitud, req.body.longitud], function (error, result) {
        if (error) {
            console.log('entre al error');
            throw error;
        } else {
            console.log('sin error inserte');
            console.log(result);
        }
    });
});

//---------------Insertar Rutas---------------------------------------------
app.post('/insertRutas', function (req, res) {
    let query = connection.query('CALL addRute(?, ?, ?, ?)', [req.body.id, req.body.nombre, req.body.inicio, req.body.fin], function (error, result) {
        if (error) {
            console.log('entre al error');
            throw error;
        } else {
            console.log('sin error inserte');
            console.log(result);
        }
    });
});

//---------------Insertar Puntos x Ruta---------------------------------------------
app.post('/Insertarpxr', function (req, res) {
    connection.query('CALL addPointsxRute (?, ?)', [req.body.idr, req.body.idp], function (error, result) {
        if (error) {
            console.log('entre al error');
            throw error;
        } else {
            console.log('sin error inserte');
            console.log(result);
        }
    });
});
//-------------Obtener Rutas---------------------------------------------------------
app.get('/getRutas', function (req, res) {
    let results = [];
    let queryString = 'SELECT * FROM ruta';

    connection.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        for (let row in rows) {
            results.push(row);
        }
        return res.json(results);

    });
});

app.delete('/routes/delete/:idRoute', (req, res) => {
    console.log('You want delete ' + req.params.idRoute);
    let query = connection.query(`CALL deleteRoute (${req.params.idRoute})`, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.json('Successfully Deleted');
        }
    });
});

//--------------Obtener Puntos----------------------------------------------------------
app.get('/getPoints', function (req, res) {
    var queryString = 'SELECT * FROM punto';

    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        return res.json(rows);
    });
});

app.use(routesBus);

///------


