/**
 * Created by jimmyloaiza on 16/05/17.
 */

let express = require('express');

let router = express.Router();

const Connection = require('../models/Connection');
let dataBase = new Connection();
let connection = dataBase.connection;

//Set of bus
router.route('/buses')
.get((req, res) => {
    const queryString = 'CALL getBuses()';
    connection.query(queryString, function (err, rows) {
        if (err)
            console.log(err);
        return res.json(rows[0]);
    });
})
.post((req, res) => {
    console.log(req.body);
    //connection.query(`INSERT INTO bus VALUES (''${req.body.placa}'', ${req.body.capacidad})`,
    connection.query('CALL addBus (?, ?)', [req.body.placa, req.body.capacidad],
      (error, result) => {
          if (error) {
              console.log(error);
              throw error;
          }
          console.log('Successfully Deleted');
          res.json('Successfully Deleted');
      });
});

//Individual bus ayudame
router.route('/buses/:placa')
.get((req, res) => {
    const queryString = `SELECT * FROM bus where placa = ${req.body.placa}`;
    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        return res.json(rows);
    });
})
.put((req, res) => {
    const queryString = `UPDATE bus SET capacidad = ${req.body.capacidad}
        where placa = ${req.body.placa}`;
    connection.query(queryString, function (err, rows, fields) {
        if (err)
            console.log(err);
        return res.json(rows);
    });
})
.delete((req, res) => {
    const queryString = `DELETE FROM bus where placa = '${req.params.placa}'`;
    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.json('Successfully Deleted');
        }
    });
});

module.exports = router;
