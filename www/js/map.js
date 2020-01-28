var pos_user_marker;
var pos_lat_user;
var pos_long_user;
var map = L.map('affiche_map').setView([0,0], 0);
var time_check_pos_user = 1000;
var markers_monu = {};
var circles_peri = [];
var circles_zoom = {};
var radius_visit = 500;
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
   
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Track Monuments', maxZoom: 20, id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiZ3JvdXBpeCIsImEiOiJjazVlOGJiOHMyOGZnM21wZ203YjdzdW1sIn0.khLqp2UlmiehGfABIEwm0Q'}).addTo(map);
        map.locate({setView: true, maxZoom: 15});  

   	function CheckPositionUser(data) {
        setInterval(function() { 
            navigator.geolocation.getCurrentPosition(update_position, position_error);
        
            for(let j = 1; j <= data.length; j++){
                //longi-lat
                
                if(markers_monu[j] != null){
                    //console.log(markers_monu[j]);
                    var radius = data[j]._mRadius; // On stock  le diametre du cercle (en mètre)
                    var centerPointCircle = data[j].getLatLng(); // On prend le centre du cercle

                    var distance = pos_user_marker.getLatLng().distanceTo(centerPointCircle); // On calcul la distance entre les deux
                    
                    if(distance <= radius){
                        new_markers_visit(j);
                        if(device.platform != "browser"){
                            navigator.vibrate(3000);
                        }
                        j = data.length;
                    }
                }      
            }
        }, time_check_pos_user);
    }

    CheckPositionUser(circles_peri);

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

    //Get parameter id user in url
    function get_id_user() {
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
        
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
        
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        };
        var user = getUrlParameter('user');
        return user;
    }

    add_markers_monument();

    function add_markers_monument() {
        $.ajax({
            url: 'https://jordan-portfolio.dyjix.fr/projet/cordova/get_monuments_all_monuments.php',
            type: 'GET',
            dataType: 'json',
            
            success: function (data) {
                for (let i=0; i < data.length; i++) {
                    var id = data[i].id;
                    var latLng = L.latLng(data[i].latitude, data[i].longitude);
                    markers_monu[id] = new L.marker(latLng, {id: id, icon: icon_monuments_no_visit}).addTo(map);
                    circles_peri[id] = new L.circle([data[i].latitude, data[i].longitude], {color: '#787878', fillColor: '#787878', fillOpacity: 0.1, radius: radius_visit}).addTo(map);
                    circles_zoom[id] = new L.circle([data[i].latitude, data[i].longitude], {fill: false, stroke: false, radius: radius_zoom}).addTo(map);
                    update_markers_visit();
                }
            }
        });
    }

    function update_markers_visit() {
        var user = get_id_user();
        $.ajax({
            url: 'https://jordan-portfolio.dyjix.fr/projet/cordova/get_monuments_user_visit.php',
            type: 'GET',
            data: {user: user},
            dataType: 'json',
            success: function (data2) {
                for (let i=0; i < data2.length; i++) {
                    var id = data2[i].id_monuments;  
                    markers_monu[id].setIcon(icon_monuments_visit).update();
                    circles_peri[id].setStyle({color: '#25AA22', fillColor: '#25AA22', fillOpacity: 0.1}).addTo(map);
                }
            }
        });
    }

    function new_markers_visit(j) {
        var user = get_id_user();
        $.ajax({
            url: 'https://jordan-portfolio.dyjix.fr/projet/cordova/add_monuments_users.php?monu='+j+'&user='+user,
            type: 'POST',
            data:{
                id_monuments: j,
                id_users: user,
              },
            success: function () {
                markers_monu[j].setIcon(icon_monuments_visit).update();
                circles_peri[j].setStyle({color: '#25AA22', fillColor: '#25AA22', fillOpacity: 0.1}).addTo(map);       
            }, 
        });
    }

    //FONCTION QUI MARCHE PAS MAIS A REfaire pour prendre en compte les id ici on recup juste l'id 1 ici

    //CheckIfUserIsoncircle(circles_peri);
    function CheckIfUserIsoncircle(data){

        
     
       /* setInterval(function() { 
            for (let i=0; i < data.length; i++) {
                var d = map.distance(circles_peri[i]._latlng, circles_peri[i].getLatLng());
                if(d > circles_peri[i].getRadius()) {
                    circles_peri[i].setStyle({fillColor: 'red'});
                }
            }
        }, 1000);*/
    }


   






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
});