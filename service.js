

let express = require('express');
let bodyParser = require('body-parser');

const Connection = require('./models/Connection');
let dataBase = new Connection();
dataBase.connect();

let connection = dataBase.connection;

let routesBus = require('./routes/bus');
let routesRoute = require('./routes/ruta');

let app = express();
let port = process.env.PORT || 1337;

app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({extended: false}));

app.use(perimitirCrossDomain);

/**
 * Connect to Database
 */

app.listen(port, '127.0.0.1');

console.log('Server listening in port ' + port);

function perimitirCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}



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
            res.json('Succesfully Deleted');
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
app.use(routesRoute);
///------


