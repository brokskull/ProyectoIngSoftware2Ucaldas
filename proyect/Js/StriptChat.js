$(document).ready(function(){


 $('#enviarget').on("click",getRutas);
  
});
var cont=0;
function agregar(){

    var div= document.getElementById("container");
    var label=document.createElement("label");
    cont++;
    var t = document.createTextNode("Refrescandome"+ cont);
    label.appendChild(t);
    div.appendChild(label);


}
function InsertarPunto(){
	var data = JSON.stringify({
		'id':1,
		'latitud':1.456,
		'longitud':1.24536
	});

	$.ajax({
		type: 'POST',
		url:'http://127.0.0.1:1337/insertpuntos',
		dataType: "json",
		contentType: 'application/json',
		data: data,      // No olvidar
		success: function(data, status, jqXHR){
		    var datos=data;
		    alert (datos);

		},
		    error: function(jqXHR, status, errorThrown)
		    {
		      alert("Error usuario: " + status);
		    }
		  
		  });
}
function InsertarRuta(){
	var data = JSON.stringify({
		'id':1,
		'nombre':'Carmen',
		'inicio':1,
		'fin':2
	});

	$.ajax({
		type: 'POST',
		url:'http://127.0.0.1:1337/insertRutas',
		dataType: "json",
		contentType: 'application/json',
		data: data,      // No olvidar
		success: function(data, status, jqXHR){
		    var datos=data;
		    alert (datos);

		},
		    error: function(jqXHR, status, errorThrown)
		    {
		      alert("Error usuario: " + status);
		    }
		  
		  });
}
function Insertarpxr(){
	var data = JSON.stringify({
		'idr':1,
		'idp':2,
		
	});

	$.ajax({
		type: 'POST',
		url:'http://127.0.0.1:1337/Insertarpxr',
		dataType: "json",
		contentType: 'application/json',
		data: data,      // No olvidar
		success: function(data, status, jqXHR){
		    var datos=data;
		    alert (datos);

		},
		    error: function(jqXHR, status, errorThrown)
		    {
		      alert("Error usuario: " + status);
		    }
		  
		  });
}
function getRutas(){
	
	$.ajax({
		type: 'GET',
		url:'http://127.0.0.1:1337/getRutas',
		dataType: "json",
		contentType: 'application/json',
		
		success: function(data, status, jqXHR){
		    var datos=data;
		    for (var i in datos) {
        		alert(datos[i].nombre);
            }
		},
		    error: function(jqXHR, status, errorThrown)
		    {
		      alert("Error");
		    }
		  
		  });
}

