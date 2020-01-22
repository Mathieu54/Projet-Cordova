var pos_user_marker;
var pos_lat_user;
var pos_long_user;
var map;
var time_check_pos_user = 1000;
var markers_monu = {};
var circles_peri = {};
var circles_zoom = {};
var radius_visit = 30;
var radius_zoom = 100;
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

   	function CheckPositionUser() {
            setInterval(function() { 
            navigator.geolocation.getCurrentPosition(update_position, position_error);
        }, time_check_pos_user);
    }

    CheckPositionUser();

    var update_position = function(position) {
        pos_lat_user = position.coords.latitude.toString();
        pos_long_user = position.coords.longitude.toString();
        if(pos_user_marker == null) {
            pos_user_marker = L.marker([parseFloat(pos_lat_user), parseFloat(pos_long_user)], {icon: icon_user, zIndexOffset: 1000}).addTo(map);
            pos_user_marker.bindPopup("<p>Vous êtes ici !</p>");
            map.panTo(new L.LatLng(parseFloat(pos_lat_user), parseFloat(pos_long_user)));
        } else {
            pos_user_marker.setLatLng([position.coords.latitude, position.coords.longitude]).update();
        }
    };

    function position_error(error) {
        alert('Erreur Code: ' + error.code + '\n' + ' Message: ' + error.message + '\n');
    }

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Track Monuments', maxZoom: 20, id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZ3JvdXBpeCIsImEiOiJjazVlOGJiOHMyOGZnM21wZ203YjdzdW1sIn0.khLqp2UlmiehGfABIEwm0Q'}).addTo(map);
    map.locate({setView: true, maxZoom: 15});  

    add_markers_monument();

    function add_markers_monument() {
        $.ajax({
            url: 'http://localhost/Cordova/Projet-Cordova/requete/get_monuments_all_monuments.php',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                let liste = "";
                for (let i=0; i < data.length; i++) {
                    var id = data[i].id;
                    var latLng = L.latLng(data[i].latitude, data[i].longitude);
                    markers_monu[id] = new L.marker(latLng, {id: id, icon: icon_monuments_no_visit}).addTo(map);
                    circles_peri[id] = new L.circle([data[i].latitude, data[i].longitude], {color: '#787878', fillColor: '#787878', fillOpacity: 0.1, radius: radius_visit}).addTo(map);
                    circles_zoom[id] = new L.circle([data[i].latitude, data[i].longitude], {fill: false, stroke: false, radius: radius_zoom}).addTo(map);
                }
                update_markers_visit();
            }
        });
    }

    function update_markers_visit() {
        $.ajax({
            url: 'http://localhost/Cordova/Projet-Cordova/requete/get_monuments_user_visit.php',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                let liste = "";
                for (let i=0; i < data.length; i++) {
                    var id = data[i].id_monuments;
                    markers_monu[id].setIcon(icon_monuments_visit).update();
                    circles_peri[id].setStyle({color: '#25AA22', fillColor: '#25AA22', fillOpacity: 0.1}).addTo(map);
                    circles_zoom[id].remove();
                }
            }
        });
    }

    //FONCTION QUI MARCHE PAS MAIS A REfaire pour prendre en compte les id ici on recup juste l'id 1 ici

	CheckIfUserIsoncircle();

    function CheckIfUserIsoncircle() {
            setInterval(function() { 
            var d = map.distance(circles_peri[1]._latlng, circles_peri[1].getLatLng());
    		if(d > circles_peri[1].getRadius()) {
	    		circles_peri[1].setStyle({fillColor: 'red'});
    		}
        }, 1000);
    }

	});






/*CODE TEST A PAS EFFACER PEUT ETRE UTILE*/

/*function markerOnClick(e)
{
    markers[e.sourceTarget.options.id].setLatLng(["52.65665", "6.6462654"]).update();
    console.log(e.sourceTarget.options.id);
  alert("hi. you clicked the marker at " + e.latlng);
  console.log("Résultat :");
console.log(markers[1].options.id);
}*/

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

