/**
 * Created by jimmyloaiza on 24/05/17.
 */

let map;
let Points = [];
let contador = 0;

$(function () {
    getRoutes();
    $('#btnShowMap').on('click', getPoints);
    $('#btnShowBus').on('click', concurrent);
});

function getRoutes () {

}

function getPoints () {

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:1337/getPoints',
        dataType: 'json',
        contentType: 'application/json',

        success: function (data, status, jqXHR) {
            Points = data;
            console.log(data);
            PintarRuta(data);
        },
        error: function (jqXHR, status, errorThrown) {
            alert('Error');
        }

    });
}

function DrawBus () {
    //let latlng = new google.maps.LatLng(88.2121,-102.12121)
    //marker.setPosition(latlng);

    /*beachMarker.setMap(null);
     let latlng = new google.maps.LatLng(Points[contador].latitud, Points[contador].longitud);
     contador++;
     beachMarker.setPosition(latlng);*/

    /*  for (let i=0; i<Points.length;i++){
     console.log(Points[i].longitud);

     }*/
    // for (let i in Points) {

    //alert("Moviendo Busesito");

    beachMarker.setMap(null);
    let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    beachMarker = new google.maps.Marker({
        position: {lat: Points[contador].latitud, lng: Points[contador].longitud},
        map: map,
        icon: image
    });
    contador++;

    /*
     let latlng = new google.maps.LatLng(Points[i].latitud, Points[i].longitud);
     beachMarker.setPosition(latlng);
     map.panTo(beachMarker.getPosition());
     */
    //}
}

function PintarRuta (Puntos) {

    let mapDiv = $('#map-area')[0];
    let mapOptions = {
        center: new google.maps.LatLng(Puntos[0].latitud, Puntos[0].longitud),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(mapDiv, mapOptions);

    let destinations = [];
    console.log(Puntos[0]);
    for (let i in Puntos) {
        destinations.push(new google.maps.LatLng(Puntos[i].latitud, Puntos[i].longitud));
    }

    let polilineaOptions = {path: destinations};
    let polilinea = new google.maps.Polyline(polilineaOptions);
    polilinea.setMap(map);

}

let beachMarker;
function concurrent () {
    let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    beachMarker = new google.maps.Marker({
        position: {lat: 0, lng: 0},
        map: map,
        icon: image
    });
    DrawBus();
}

/*
* Jimmy es gay
* */