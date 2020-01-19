<?php
	require_once("connexion.php"); 
	$iden = $_GET['identifiant']; 
	$password = $_GET['motdepasse']; 
	if (empty($iden) || empty($password)) { 
		$rep = array('error' => "Erreur le login et le mot de passe ne peuvent pas être vide !");
		echo json_encode($rep);
		return false; 
	} 
	$sql = $db_connexion->prepare('SELECT * FROM users WHERE identifiant = :identifiant AND mdp = :mdp ;'); 
	$sql->bindParam(':identifiant', $iden); 
	$sql->bindParam(':mdp', $password); 
	$sql->execute(); 
	$donnees = $sql->fetch(); 
	if(!empty($donnees['identifiant']) OR !empty($donnees['mdp'])) {

		if(($iden == $donnees['identifiant']) AND ($password == $donnees['mdp'])) {
			$donnees = array("resultat" => $donnees['id']);
			echo json_encode($donnees);
		} else { 
			$donnees = array("resultat" => "[Erreur] identifiant ou mot de passe incorrect !");
			echo json_encode($donnees);
		}

	} else {
		$donnees = array("resultat" => "[Erreur] identifiant ou mot de passe incorrect !");
		echo json_encode($donnees);
	}
?>