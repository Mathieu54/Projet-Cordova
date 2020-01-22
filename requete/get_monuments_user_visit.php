

<?php
header("Access-Control-Allow-Origin:*", true);

include "connexion.php";

$res = $db_connexion->query('SELECT * FROM monuments_all, monuments_visited, users WHERE monuments_all.id = id_monuments AND id_users = users.id AND users.id = 2;', PDO::FETCH_OBJ);
echo json_encode($res->fetchAll());
?>