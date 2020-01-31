<?php
	$user = "root";
	$pass = "";
	try {
    	$bdd = new PDO('mysql:host=localhost;dbname=bdd_trackmonuments', $user, $pass);
	} catch (PDOException $e) {
    	print "Error!: " . $e->getMessage() . "<br/>";
    	die();
	}
?>
