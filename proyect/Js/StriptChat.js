//Function to create the table

$(document).ready(function () {


    $('#enviarget').on("click", getRutas);

});

var cont = 0;
function agregar() {
    var div = document.getElementById("container");
    var label = document.createElement("label");
    cont++;
    var t = document.createTextNode("Refrescandome" + cont);
    label.appendChild(t);
    div.appendChild(label);
}

function InsertarPunto() {
    var data = JSON.stringify({
        'id': 1,
        'latitud': 1.456,
        'longitud': 1.24536
    });

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:1337/insertpuntos',
        dataType: "json",
        contentType: 'application/json',
        data: data,      // No olvidar
        success: function (data, status, jqXHR) {
            var datos = data;
            alert(datos);

        },
        error: function (jqXHR, status, errorThrown) {
            alert("Error usuario: " + status);
        }

    });
}
function InsertarRuta() {
    var data = JSON.stringify({
        'id': 1,
        'nombre': 'Carmen',
        'inicio': 1,
        'fin': 2
    });

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:1337/insertRutas',
        dataType: "json",
        contentType: 'application/json',
        data: data,      // No olvidar
        success: function (data, status, jqXHR) {
            var datos = data;
            alert(datos);

        },
        error: function (jqXHR, status, errorThrown) {
            alert("Error usuario: " + status);
        }

    });
}
function Insertarpxr() {
    var data = JSON.stringify({
        'idr': 1,
        'idp': 2,

    });

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:1337/Insertarpxr',
        dataType: "json",
        contentType: 'application/json',
        data: data,      // No olvidar
        success: function (data, status, jqXHR) {
            var datos = data;
            alert(datos);

        },
        error: function (jqXHR, status, errorThrown) {
            alert("Error usuario: " + status);
        }

    });
}

function getRutas() {
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:1337/getRutas',
        dataType: "json",
        contentType: 'application/json',

        success: function (data, status, jqXHR) {
            var datos = data;
            var table = makeTable(data);
            $("#tableResponse").html(table);
        },
        error: function (jqXHR, status, errorThrown) {
            alert("Error");
        }

    });
}

function deleteRoute(id) {
    alert(`LLegue hasta acá perra ${id}`);

    $.ajax({
        type: 'DELETE',
        url: 'http://127.0.0.1:1337/routes/delete/' + id,
        dataType: "json",
        contentType: 'application/json',
        success: function (data, status, jqXHR) {
            alert("Successfully Deleted");
        }
    });
}

function makeTable(data) {
    let tabla = "<thead> <tr>";
    tabla += "<th>Name</th>";
    tabla += "<th>Start Point ID</th>";
    tabla += "<th>Finish Point ID</th>";
    tabla += "<th>Options</th>";
    tabla += "</tr></thead>";
    tabla += "<tbody>";
    $(data).each(function (i, vec) {
        tabla += "<tr id='" + vec.id_ruta + "'>";
        tabla += "<td>" + vec.nombre + "</td>";
        tabla += "<td>" + vec.id_punto_inicio + "</td>";
        tabla += "<td>" + vec.id_punto_fin + "</td>";
        tabla += "<td><a onclick='deleteRoute(" + vec.id_ruta + ")'>Delete</a></td>";

        tabla += "</tr>";
    });
    tabla += "</tbody>";
    return tabla;
}