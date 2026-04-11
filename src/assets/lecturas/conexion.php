<?php
function retornarConexion() {

  $servidor = "sql101.infinityfree.com";
  $usuario = "if0_41638629";
  $password = "F945ghjo"; // ← la de InfinityFree
  $bd = "if0_41638629_dbtutor";

  $con = mysqli_connect($servidor, $usuario, $password, $bd);

  if (!$con) {
    die("Error de conexión: " . mysqli_connect_error());
  }

  return $con;
}
?>