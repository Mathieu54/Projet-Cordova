var pos_user_marker;
var pos_lat_user;
var pos_long_user;
var map;
var icon_user = L.icon({
    iconUrl: 'img/user_position.png',
    iconSize:     [20, 30]
});
var icon_monuments_no_visit = L.icon({
    iconUrl: 'img/monuments_not_visited.png',
    iconSize:     [20, 30]
});
var icon_monuments_visit = L.icon({
    iconUrl: 'img/monuments_visited.png',
    iconSize:     [20, 30]
});
var icon_user_gps = L.icon({
    iconUrl: 'img/user_go_to_here.png',
    iconSize:     [20, 30]
});

$(document).ready(function () {

    map = L.map('affiche_map');

   /* function CheckPositionUser() {
            setInterval(function() { 
            navigator.geolocation.getCurrentPosition(update_position, position_error);
        }, 5000);
    }

    CheckPositionUser();

    var update_position = function(position) {
        pos_lat_user = position.coords.latitude.toString();
        pos_long_user = position.coords.longitude.toString();
        if(pos_user_marker == null) {
            pos_user_marker = L.marker([parseFloat(pos_lat_user), parseFloat(pos_long_user)], {icon: icon_user}).addTo(map);
            pos_user_marker.bindPopup("<p>Vous êtes ici !</p>");
            map.panTo(new L.LatLng(parseFloat(pos_lat_user), parseFloat(pos_long_user)));
            pos_user_marker.addLayer
        } else {
            pos_user_marker.setLatLng([position.coords.latitude, position.coords.longitude], {myCustomId: "BITE"}).update();
        }
    };

    function position_error(error) {
        alert('Erreur Code: ' + error.code + '\n' + ' Message: ' + error.message + '\n');
    }

    */

			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Track Monuments',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZ3JvdXBpeCIsImEiOiJjazVlOGJiOHMyOGZnM21wZ203YjdzdW1sIn0.khLqp2UlmiehGfABIEwm0Q'
}).addTo(map);
            map.locate({setView: true, maxZoom: 8});  


        

    /*for (let i=0; i < 5; i++) {

        var marker = L.marker([data[i].latitude, data[i].longitude], {icon: icon_monuments_no_visit}).addTo(map);
  var oneMarker = L.marker(["54.5665","6.646546"], {
    title: "test" + i
  }).bindPopup("<b>BELLE DESC</b>").openPopup();
alert("message?: DOMString");

    oneMarker.properies.name = stops[i].Name;
  oneMarker.properies.description = stops[i].Description;
  oneMarker.properies.othervars = stops[i].othervars;
  oneMarker.addTo(markersLayer);
}*/
var markers = {};

    $.ajax({
        url: 'http://localhost/Cordova/Projet-Cordova/requete/get_monuments_visit.php',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let liste = "";
            for (let i=0; i < data.length; i++) {
            	var id = data[i].id;
                var latLng = L.latLng(data[i].latitude, data[i].longitude);
                markers[id] = new L.marker(latLng, {id: id, icon: icon_monuments_no_visit}).on('click', markerOnClick).addTo(map);

            }
        }
    });
function markerOnClick(e)
{
    console.log(e.sourceTarget.options.id);
  alert("hi. you clicked the marker at " + e.latlng);
}


/*
    $.ajax({
        url: 'http://localhost/Cordova/Projet-Cordova/requete/get_monuments_no_visit.php',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let liste = "";
            for (let i=0; i < data.length; i++) {
            	var marker = L.marker([data[i].latitude, data[i].longitude], {icon: icon_monuments_visit}).addTo(map);
				marker.bindPopup("te NO VISIT");
            }
        }
    });*/
	});











         /*   L.Routing.control({
  waypoints: [
    L.latLng(57.74, 11.94),    // startmarker
    L.latLng(57.6792, 11.949) // endmarker
  ],
  createMarker: function(i, wp, nWps) {
    if (i === 0 || i === nWps - 1) {
      // here change the starting and ending icons
      return L.marker(wp.latLng, {
        icon: icon_user_gps // here pass the custom marker icon instance
      });
    } else {

    }
  }
}).addTo(map);*/