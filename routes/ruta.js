/**
 * Created by jhona on 24/05/17.
 */

let express = require('express');
let mysql = require('mysql');

let router = express.Router();


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jhona369',
    database: 'BUSES',
    port: 3306
});

//get puntos por ruta
router.route("/points/:idruta")
    .get((req, res) => {
        console.log(req.params.idruta);
        const queryString = 'SELECT latitud,longitud ' +
            'from punto p, puntosxruta r ' +
            'where r.id_punto=p.id_punto and r.id_ruta=?';
        connection.query("SELECT latitud,longitud " +
            "from punto p, puntosxruta r where r.id_punto=p.id_punto and r.id_ruta=?", [req.params.idruta],function (err, rows, fields) {
            if (err)
                console.log(err);
            return res.json(rows);
        });
    });


module.exports = router;