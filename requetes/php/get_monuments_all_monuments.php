<?php
	header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');
	include "connexion.php";

	//****** Monuments ******// 

	$reqMonu = $bdd->query('SELECT * FROM monuments_all'); 
	$data = array(); 
	$i=0; 

	while ($donneesMonu = $reqMonu->fetch()) 
	{ 
		$data[$i]["id"] = $donneesMonu["id"]; 
		$data[$i]["nom"] = $donneesMonu["nom"]; 
		$data[$i]["description"] = $donneesMonu["description"]; 
		$data[$i]["image"] = $donneesMonu["image"]; 
		$data[$i]["longitude"] = $donneesMonu["longitude"]; 
		$data[$i]["latitude"] = $donneesMonu["latitude"]; 
		$i++; 
	} 
	$reqMonu->closeCursor(); 
	header('Content-Type:Application/json'); 
	echo json_encode($data); 

?>