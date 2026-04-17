<?php
function retornarConexion() {

  $host = "localhost";
  $user = "u454752946_zacil";
  $pass = "F945ghjo";
  $db = "u454752946_dbtutor";

  $con = mysqli_connect($host, $user, $pass, $db);

  if (!$con) {
    die("Error de conexión: " . mysqli_connect_error());
  }

  return $con;
}
?>