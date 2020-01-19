var pos_user_marker;
var pos_lat_user;
var pos_long_user;
var map;
var greenIcon = L.icon({
    iconUrl: 'img/user_position.png',
    iconSize:     [30, 50], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
$(document).ready(function () {

    map = L.map('affiche_map');
    function CheckPositionUser() {
        setInterval(function() { 
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }, 1000);
    }

    CheckPositionUser();

    var onSuccess = function(position) {
        pos_lat_user = position.coords.latitude.toString();
        pos_long_user = position.coords.longitude.toString();
        if(pos_user_marker == null) {
            pos_user_marker = L.marker([parseFloat(pos_lat_user), parseFloat(pos_long_user)]).addTo(map);
            pos_user_marker.bindPopup("<p>Vous êtes ici !</p>");
            map.panTo(new L.LatLng(parseFloat(pos_lat_user), parseFloat(pos_long_user)));
        } else {
            pos_user_marker.setLatLng([position.coords.latitude, position.coords.longitude]).update();
        }
               
      
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZ3JvdXBpeCIsImEiOiJjazVlOGJiOHMyOGZnM21wZ203YjdzdW1sIn0.khLqp2UlmiehGfABIEwm0Q'
}).addTo(map);
            map.locate({setView: true, maxZoom: 8});  


    $.ajax({
        url: 'http://localhost/Cordova/Cordova-Projet/requete/get_monuments_visit.php',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let liste = "";
            for (let i=0; i < data.length; i++) {
            	var marker = L.marker([data[i].latitude, data[i].longitude]).addTo(map);
				marker.bindPopup("te").openPopup();
            }
        }
    });

    $.ajax({
        url: 'http://localhost/Cordova/Cordova-Projet/requete/get_monuments_no_visit.php',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let liste = "";
            for (let i=0; i < data.length; i++) {
            	var marker = L.marker([data[i].latitude, data[i].longitude]).addTo(map);
				marker.bindPopup("te NO VISIT").openPopup();
            }
        }
    });
	});