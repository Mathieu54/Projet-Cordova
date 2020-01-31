let map = L.map('affiche_map').setView([0,0], 0);
let time_check_pos_user = 1000;
let pos_user_marker, pos_lat_user, pos_long_user, pos_gps_icon;;
let markers_monu = {};
let circles_visit_monu = [];
let circles_info_marker = [];
let radius_visit = 20;
let radius_info = 100;
let repeat = false;
let save_monu = 1;

let icon_user = L.icon({
    iconUrl:  url_images + 'user_position.png',
    iconSize:     [20, 30]
});
let icon_monuments_no_visit = L.icon({
    iconUrl:  url_images + 'monuments_not_visited.png',
    iconSize:     [20, 30]
});
let icon_monuments_visit = L.icon({
    iconUrl:  url_images + 'monuments_visited.png',
    iconSize:     [20, 30]
});
let icon_user_gps = L.icon({
    iconUrl:  url_images + 'user_go_to_here.png',
    iconSize:     [20, 30]
});

$("#btn_itineraire").hide();
$("#btn_del_iti").hide();
$("#id").hide();
$("#info_map").hide();
$(document).ready(function () {

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Track Monuments', maxZoom: 20, id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiZ3JvdXBpeCIsImEiOiJjazYxMXhvaWcwOXB6M21xaXExejhleW56In0.4pfgvn-gRwh0Y0r0hOERAg'}).addTo(map);

    map.locate({setView: true, maxZoom: 13});

    //Fonction qui check x time la position de l'user
    function CheckPositionUser(data) {
        setInterval(function() {
            navigator.geolocation.getCurrentPosition(update_position, position_error); //Fonction du plugin cordova geolocation
            for(let j = 1; j <= data.length; j++){
                if(markers_monu[j] != null){
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

    function CheckMarkerPopupDisplay(data) {
        setInterval(function() {
            for(let j = 1; j <= data.length; j++){
                if(markers_monu[j] != null){
                    var radius = data[j]._mRadius; // On stock  le diametre du cercle (en mètre)
                    var centerPointCircle = data[j].getLatLng(); // On prend le centre du cercle
                    var distance = pos_user_marker.getLatLng().distanceTo(centerPointCircle); // On calcul la distance entre les deux
                    var radius_specific = circles_info_marker[save_monu]._mRadius; // On stock  le diametre du cercle (en mètre)
                    var centerPointCircle_specific = circles_info_marker[save_monu].getLatLng(); // On prend le centre du cercle
                    var distance_specific = pos_user_marker.getLatLng().distanceTo(centerPointCircle_specific); // On calcul la distance entre les deux
                    if(distance_specific <= radius_specific){
                    } else {
                        repeat = false;
                    }
                    if(distance <= radius){
                        save_monu = j;
                        showpopup(j);
                        j = data.length;
                    }
                }
            }
        }, time_check_pos_user);
    }

    CheckPositionUser(circles_visit_monu);
    CheckMarkerPopupDisplay(circles_info_marker);

    //Variable qui permet d'update la position de l'utilsiateur et la recupérer aussi
    var update_position = function(position) {

        pos_lat_user = position.coords.latitude.toString();
        pos_long_user = position.coords.longitude.toString(); //On convert en string pour bien faire fonctionner la création du marker
        if(pos_user_marker == null) {
            pos_user_marker = L.marker([parseFloat(pos_lat_user), parseFloat(pos_long_user)], {icon: icon_user, zIndexOffset: 100}).on('click', clique_pos_marker_user).addTo(map); //Le marker est prioritaire sur les autres marqueurs
            pos_user_marker.bindPopup("<div class='entete_popup_user'><p>Vous êtes ici !</p></div>");
            map.panTo(new L.LatLng(parseFloat(pos_lat_user), parseFloat(pos_long_user))); //Et on redigire vers sa position
        } else {
            pos_user_marker.setLatLng([position.coords.latitude, position.coords.longitude]).update(); //Et on update tous les x temps la position
        }
    };

    //Fonction qui alert juste si il ya une erreur lors du get de la position de l'user
    function position_error(error) {
        alert('Erreur Code: ' + error.code + '\n' + ' Message: ' + error.message + '\n');
    }

    add_markers_monument();

    function add_markers_monument() {
        $.ajax({
            url: url_getall_monu,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                for (let i=0; i < data.length; i++) {
                    var id = data[i].id;
                    var latLng = L.latLng(data[i].latitude, data[i].longitude);
                    markers_monu[id] = new L.marker(latLng, {id: id, nom: data[i].nom, desc: data[i].description, image: data[i].image, icon: icon_monuments_no_visit}).on('click', clique_marker).addTo(map);
                    markers_monu[id].bindPopup("<div class='entete_popup_marker'><h2 class='titre_marker'>"+ data[i].nom +"</h2><p class='lieu_non_visit'>Lieu non visité !</p><img src='" + url_images + data[i].image + "' height='150px' width='250px;'/></div>");
                    circles_visit_monu[id] = new L.circle([data[i].latitude, data[i].longitude], {color: '#787878', fillColor: '#787878', fillOpacity: 0.1, radius: radius_visit}).addTo(map);
                    circles_info_marker[id] = new L.circle([data[i].latitude, data[i].longitude], {fill: false, stroke: false, radius: radius_info}).addTo(map);
                }
                update_markers_visit();
            }
        });
    }

    function update_markers_visit() {
        var user = sessionStorage.getItem('id_user');
        $.ajax({
            url: url_getmonu_visit,
            type: 'GET',
            data: {user: user},
            dataType: 'json',
            success: function (data2) {
                for (let i=0; i < data2.length; i++) {
                    var id = data2[i].id_monuments;
                    markers_monu[id].setIcon(icon_monuments_visit).update();
                    markers_monu[id].bindPopup("<div class='entete_popup_marker'><h2 class='titre_marker'>"+ data2[i].nom +"</h2><p class='lieu_visit'>Lieu visité !</p><img src='" + url_images + data2[i].image + "' height='150px' width='250px;'/></div>").update();
                    circles_visit_monu[id].setStyle({color: '#25AA22', fillColor: '#25AA22', fillOpacity: 0.1}).addTo(map);
                }
            }
        });
    }

    function new_markers_visit(j) {
        var user = sessionStorage.getItem('id_user');
        $.ajax({
            url: url_set_visit_monu + '?monu='+j+'&user='+user,
            type: 'POST',
            data:{
                id_monuments: j,
                id_users: user,
            },
            success: function () {
                markers_monu[j].setIcon(icon_monuments_visit).update();
                console.log(markers_monu[j].options.image);
                markers_monu[j].bindPopup("<div class='entete_popup_marker'><h2 class='titre_marker'>"+ markers_monu[j].options.nom +"</h2><p class='lieu_visit'>Lieu visité !</p><img src='" + url_images + markers_monu[j].options.image + "' height='150px' width='250px;'/></div>").update();
                circles_visit_monu[j].setStyle({color: '#25AA22', fillColor: '#25AA22', fillOpacity: 0.1}).addTo(map);
            },
        });
    }

    function showpopup(j) {
        if(repeat == false) {
            markers_monu[j].openPopup();
            $("#image_marker").show();
            $("#btn_itineraire").show();
            $("#info_map").show();
            $("#title_marker").text(markers_monu[j].options.nom);
            $("#description_marker").text(markers_monu[j].options.desc);
            $("#btn_itineraire").text("Itinéraire vers : " + markers_monu[j].options.nom);
            $("#id").text(markers_monu[j].options.id);
            map.locate({setView: true, maxZoom: 17});
            repeat = true;
        }
    }

    function clique_marker(marker) {
        $("#btn_del_iti").hide();
        $("#btn_itineraire").show();
        $("#info_map").show();
        $("#title_marker").text(marker.sourceTarget.options.nom);
        $("#description_marker").text(marker.sourceTarget.options.desc);
        $("#image_marker").attr("src", "img/" + marker.sourceTarget.options.image);
        $("#btn_itineraire").text("Itinéraire vers : " + marker.sourceTarget.options.nom);
        $("#id").text(marker.sourceTarget.options.id);
    }

    function clique_pos_marker_user() {
        $("#btn_del_iti").hide();
        $("#btn_itineraire").hide();
        $("#info_map").show();
        $("#title_marker").text("Bienvenue sur Track Monuments");
        $("#description_marker").text("Le marqueur rouge est votre position actuelle. Pour plus d'information sur les monuments ou bien un itinéraire cliquez sur les marqueurs.");
    }

    $("#fermer_info").click(function() {
        $("#btn_itineraire").hide();
        $("#btn_del_iti").hide();
        $("#info_map").hide();
        markers_monu[$("#id").text()].closePopup();
    });

    $("#btn_del_iti").click(function() {
        pos_gps_icon.spliceWaypoints(0, 2);
        $(".leaflet-routing-container").remove();
        $("#btn_del_iti").hide();
        $("#info_map").hide();
    });

    $("#btn_itineraire").click(function() {
        var id_get = $("#id").text();
        $("#btn_itineraire").hide();
        $("#btn_del_iti").show();
        markers_monu[id_get].closePopup();
        if(pos_gps_icon == null) {
            pos_gps_icon = new L.Routing.control({waypoints: [pos_user_marker.getLatLng(),markers_monu[id_get].getLatLng()],
                createMarker: function(i, wp, nWps) {
                    if (i === nWps - 1) {
                        return L.marker(wp.latLng, {
                            icon: icon_user_gps
                        }).on('click', clique_marker_itini).bindPopup("<div class='entete_popup_marker'><h2 class='titre_marker'>"+ markers_monu[id_get].options.nom +"</h2><p class='lieu_itineraire'>Itinéraire enregistré vers ce lieu !</p><img src='" + url_images + markers_monu[id_get].options.image + "' height='150px' width='250px;'/></div>");
                    }
            }}).addTo(map);
        } else {
            pos_gps_icon.spliceWaypoints(0, 2);
            $(".leaflet-routing-container").remove();
            pos_gps_icon = new L.Routing.control({waypoints: [pos_user_marker.getLatLng(),markers_monu[id_get].getLatLng()],
                createMarker: function(i, wp, nWps) {
                    if (i === nWps - 1) {
                        return L.marker(wp.latLng, {
                            icon: icon_user_gps
                        }).on('click', clique_marker_itini).bindPopup("<div class='entete_popup_marker'><h2 class='titre_marker'>"+ markers_monu[id_get].options.nom +"</h2><p class='lieu_itineraire'>Itinéraire enregistré vers ce lieu !</p><img src='" + url_images + markers_monu[id_get].options.image + "' height='150px' width='250px;'/></div>");
                    }
            }}).addTo(map);
        }
    });

    function clique_marker_itini() {
        $("#btn_itineraire").hide();
        $("#btn_del_iti").show();
        $("#info_map").show();
    }


});
