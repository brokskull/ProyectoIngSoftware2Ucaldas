/**
 * Created by jhona on 24/05/17.
 */

let express = require('express');
let router = express.Router();

const Connection = require('../models/Connection');
let dataBase = new Connection();
let connection = dataBase.connection;

//get points in a route
router.route("/points/:idRuta")
    .get((req, res) => {
        console.log(req.params.idruta);
        const queryString = 'SELECT p.latitud, p.longitud ' +
            'from punto p, puntosxruta r ' +
            'where r.id_punto=p.id_punto and r.id_ruta=?';
        connection.query(queryString, [req.params.idRuta],function (err, rows, fields) {
            if (err)
                console.log(err);
            return res.json(rows);
        });
    });


module.exports = router;