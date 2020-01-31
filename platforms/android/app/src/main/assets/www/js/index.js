$(document).ready(function () { //Quand la page est ready
<<<<<<< HEAD
    var txt_id, txt_mdp;
=======

	var txt_id, txt_mdp;
	let url_api_connect = "https://jordan-portfolio.dyjix.fr/projet/cordova/set_connection.php";
    let url_map = "http://localhost:3000/browser/www/map.html";
    
>>>>>>> master
    //Function qui verifie les inputs (PS: Une verification est réalisé aussi en PHP)
    function verif_input() {
        txt_id = $("#input_identifiant").val();
        txt_mdp = $("#input_mdp").val();
        if(txt_id.length != 0) { //Check du login et mot de passe si vide
            if(txt_mdp.length != 0) {
                return true;
            } else {
                alert("[Erreur] Le mot de passe est vide !");
                return false;
            }
        } else {
            alert("[Erreur] L'identifiant est vide !");
            return false;
        }
    }
    //Quand l'utilisateur clique sur le bouton valider
    $("#validate").click(function(){
        if(verif_input() == true) {
            //Requete Ajax pour la connexion
            $.ajax({
                url : url_login,
                type: 'GET',
                data: {identifiant: txt_id, motdepasse: txt_mdp},
<<<<<<< HEAD
                dataType: 'JSON',
                success: function (data) { //Si le résultat est valide alors on change de page
                    if(data["resultat"] == "valide") {
                        window.location.replace(url_map);
                        sessionStorage.setItem('id_user', data["id"]);
=======
                dataType: 'json',
                success: function (data) {
                    if(data["resultat"] == "valide") {
                        window.location.replace(url_map+"?user="+data["id"]);
>>>>>>> master
                    }else{
                        alert(data["resultat"]);
                    }
                }
            });
        }
    });
});
