 

<?php

	header("Access-Control-Allow-Origin:*", true);

	include "connexion.php";

	//****** AddMonumentsVisited ******// 
	
		
	$id_monuments = $_GET["monu"];
	$id_user = $_GET['user'];
	//$id_monuments = 1;
	//$id_users = 2;
	echo("<script>console.log('PHP: " . $id_monuments . "');</script>");
	$reqMonuVis = $bdd->query('SELECT * FROM monuments_all, monuments_visited, users WHERE monuments_all.id = id_monuments AND id_users = users.id AND users.id = "'.$id_user.'";'); 
	$i=0; 
	$trouve = "0";
	
	while ($donneesMonu = $reqMonuVis->fetch()) { 
		if ($donneesMonu["id_monuments"] == $id_monuments){
			$trouve = "1";
		}
		$i++; 
	} 
	$reqMonuVis->closeCursor(); 

	if ($trouve == "0"){
		$sql = $bdd->prepare('INSERT INTO monuments_visited(id_monuments,id_users) VALUES(:id_monuments, :id_users)');
		$sql->execute(array(
			'id_monuments' => $id_monuments,
			'id_users' => $id_user
		));
	}
?>