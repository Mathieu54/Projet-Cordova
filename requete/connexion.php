<?php
	$user = "root";
	$pass = "";
	try {
    	$db_connexion = new PDO('mysql:host=localhost;dbname=bdd_trackmonuments', $user, $pass);
	} catch (PDOException $e) {
    	print "Error!: " . $e->getMessage() . "<br/>";
    	die();
	}
?>
