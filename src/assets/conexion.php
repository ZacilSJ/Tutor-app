<?php
function retornarConexion() {

  $host = "sql101.infinityfree.com";
  $user = "if0_41638629";
  $pass = "LA_CONTRASEÑA_REAL"; 
  $db   = "if0_41638629_dbtutor";

  $con = mysqli_connect($host, $user, $pass, $db);

  if (!$con) {
    die("Error de conexión: " . mysqli_connect_error());
  }

  return $con;
}
?>
