<?php
	header("Access-Control-Allow-Origin:*", true);
	require_once("connexion.php");
	
	$iden = $_GET['identifiant']; 
	$password = $_GET['motdepasse']; 

	$sql = $bdd->prepare('SELECT * FROM users WHERE identifiant = :identifiant AND mdp = :mdp ;'); 
	$sql->bindParam(':identifiant', $iden); 
	$sql->bindParam(':mdp', $password); 
	$sql->execute(); 
	$data = array(); 
	if($donnees = $sql->fetch()) 
	{ 
		$data["resultat"] = "valide";
		$data["id"] = $donnees["id"];
	}
	else{
		$data["resultat"] = "[Erreur] identifiant ou mot de passe incorrect !";
	}
	echo json_encode($data);
	$sql->closeCursor(); 
?>