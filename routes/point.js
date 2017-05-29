/**
 * Created by jimmyloaiza on 24/05/17.
 */


let express = require('express');

let router = express.Router();

const Connection = require('../models/Connection');
let dataBase = new Connection();
let connection = dataBase.connection;

router.route('/routes', function (req, res) {
    console.log('latitud: ' + req.body.latitud);
    console.log('longitud: ' + req.body.longitud);
    console.log('id Ruta:' + req.body.idRuta);
    res.send('datos recividos');
});

router.post((req, res) => {
    let query = connection.query('CALL addPoint(?, ?)', [req.body.latitud, req.body.longitud],
      function (error, result) {
          if (error) {
              throw error;
          } else {

          }
      });
});