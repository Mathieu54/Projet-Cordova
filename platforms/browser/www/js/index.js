/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

<<<<<<< HEAD
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
=======
	var txt_id, txt_mdp;
	let url_api_connect = "https://jordan-portfolio.dyjix.fr/projet/cordova/set_connection.php";
    let url_map = "http://localhost:3000/browser/www/map.html";
    
    //Function qui verifie les inputs (PS: Une verification est réalisé aussi en PHP)
	function verif_input() {
		txt_id = $("#input_identifiant").val(); 
    	txt_mdp =$("#input_mdp").val();
        if(txt_id.length != 0) {
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
>>>>>>> master
    }
};

<<<<<<< HEAD
app.initialize();
=======
    //Quand l'utilisateur clique sur le bouton valider
	$("#validate").click(function(){
		if(verif_input() == true) {
            //Requete Ajax pour la connexion
            $.ajax({
                url : url_api_connect,
                type: 'GET',
                data: {identifiant: txt_id, motdepasse: txt_mdp},
                dataType: 'json',
                success: function (data) {
                    if(data["resultat"] == "valide") {
                        window.location.replace(url_map+"?user="+data["id"]);
                    }else{
                        alert(data["resultat"]);
                    }
                }
            });
        }
	});
});
>>>>>>> master
