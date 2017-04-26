
//CONFIGURACIÓN
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 1337;
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(perimitirCrossDomain);

var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'buses',
port: 8082
});
app.listen(port,'127.0.0.1');
console.log('Server listening in port ' + port);

//CONEXCION A LA BASE DE DATOS EN MYSQL
conectar(); 


function perimitirCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

function conectar(){
  connection.connect(function(error){
  if(error){
    throw error;
  }else{
    console.log('Conexion correcta.');
   }
  });
}


//------------------Web service--------------------------------------------


//-----------------Insertar Puntos-----------------------------------------
app.post("/routes",function(req,res){
  console.log("latitud: "+req.body.latitud);
  console.log("longitud: "+req.body.longitud);
  console.log('id Ruta:'+ req.body.idRuta);
  res.send("datos recividos");
});

app.post('/insertpuntos', function(req, res){
    var query = connection.query("CALL addPoint(?, ?, ?)", [req.body.id,req.body.latitud,req.body.longitud], function(error, result){
   if(error){
    console.log("entre al error");
      throw error;
   }else{
    console.log("sin error inserte");

      console.log(result);
   }
 });
});
//---------------Insertar Rutas---------------------------------------------
app.post('/insertRutas', function(req, res){
    var query = connection.query("CALL addRute(?, ?, ?, ?)", [req.body.id,req.body.nombre,req.body.inicio,req.body.fin], function(error, result){
   if(error){
    console.log("entre al error");
      throw error;
   }else{
    console.log("sin error inserte");
    console.log(result);
   }
 });
});
//---------------Insertar Puntos x Ruta---------------------------------------------
app.post('/Insertarpxr', function(req, res){
    var query = connection.query("CALL addPointsxRute (?, ?)", [req.body.idr,req.body.idp], function(error, result){
   if(error){
    console.log("entre al error");
      throw error;
   }else{
    console.log("sin error inserte");
    console.log(result);
   }
 });
});
//-------------Obtener Rutas---------------------------------------------------------
app.get('/getRutas', function(req, res){
    var results = [];
    var queryString = 'SELECT * FROM ruta';
 
    connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        results.push(rows[i]);
    }
    return res.json(results);

});
});
///------