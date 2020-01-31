<?php
	header("Access-Control-Allow-Origin:*", true);

	include "connexion.php";

	//****** MonumentsVisited ******// 
	$id_user = $_GET['user'];
	$reqMonuVis = $bdd->query('SELECT * FROM monuments_all, monuments_visited, users WHERE monuments_all.id = id_monuments AND id_users = users.id AND users.id = "'.$id_user.'";'); 
	$data = array(); 
	$i=0; 

	while ($donneesMonu = $reqMonuVis->fetch()) 
	{ 
		$data[$i]["id_monuments"] = $donneesMonu["id_monuments"]; 
		$data[$i]["id_users"] = $donneesMonu["id_users"]; 
		$data[$i]["nom"] = $donneesMonu["nom"];
        $data[$i]["image"] = $donneesMonu["image"];
        $i++;
	} 
	$reqMonuVis->closeCursor(); 
	header('Content-Type:Application/json'); 
	echo json_encode($data); 
?>
