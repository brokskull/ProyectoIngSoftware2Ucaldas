/**
 * Created by jimmyloaiza on 18/05/17.
 */

$(function () {
    getBuses();

    $("#btnRegister").on('click', function () {
        let placa = $("#placa").val();
        let capacity = $("#capacity").val();
        alert(placa);
        if (checkPlaca(placa) && capacity > 0) {
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:1337/buses/',
                dataType: "json",
                data: {
                    placa: placa,
                    capacidad: capacity
                },
                success: function (data, status, jqXHR) {
                    alert("Successfully registered");
                    getBuses();

                },
                error: function (jqXHR, status, errorThrown) {
                    alert("Error");
                }
            });
        }
        else {
            alert("La placa es invalida");
        }
    });
});

function checkPlaca(placa) {
    let exp = new RegExp("([A-Z]{3})(\\-)(\\d{3})$");
    return exp.test(placa);
}

function getBuses() {
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:1337/buses/',
        dataType: "json",
        contentType: 'application/json',
        success: function (data, status, jqXHR) {
            let datos = data;
            let table = makeTable(data);
            $("#tableResponse").html(table);
        },
        error: function (jqXHR, status, errorThrown) {
            alert("Error");
        }
    });
}

function deleteBus(placa) {
    $.ajax({
        type: 'DELETE',
        url: 'http://127.0.0.1:1337/buses/' + placa,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            alert("Successfully Deleted");
            getBuses();
        }
    });
}
function makeTable(data) {
    let tabla = "<thead> <tr>";
    tabla += "<th>Placa</th>";
    tabla += "<th>Capacity</th>";
    tabla += "<th>Options</th>";
    tabla += "</tr></thead>";
    tabla += "<tbody>";
    $(data).each(function (i, vec) {
        tabla += "<tr id='" + vec.placa + "'>";
        tabla += "<td>" + vec.placa + "</td>";
        tabla += "<td>" + vec.capacidad + "</td>";
        tabla += "<td><a onclick='updateRoute(" + vec.placa + ")'>Update</a></td>";
        tabla += `<td><a onclick='deleteBus("${vec.placa}")'>Delete</a></td>`;
        tabla += "</tr>";
    });
    tabla += "</tbody>";
    return tabla;
}