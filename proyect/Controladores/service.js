var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 1337;
var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgres://Anderlink234:anderlink234@localhost:5432/JuventudM';

function perimitirCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(perimitirCrossDomain);

var mysql = require('mysql');

app.get('/prueba', function(req, res){
  console.log('entre a la peticion get');
	var results = [];

	res.setHeader("Content-Type", "application/json");
  var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'prueba',
   port: 1337
});

var query=connection.query("select nombre from personaje;");
connection.connect(function(error){
   if(error){
      throw error;
   }else{
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
           client.end();
            return res.json(results);
        });
      console.log('Conexion correcta.');
   }
});
});

app.listen(port);
console.log('Server listening on port ' + port);