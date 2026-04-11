<?php
function retornarConexion() {
  $servidor = "localhost";
  $usuario = "root";  
  $password = "";
  $bd = "bdtutor";

  $con=mysqli_connect("$servidor", "$usuario", "$password","$bd");
  if (!$con) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

//echo "Éxito: Se realizó una conexión apropiada a MySQL! La base de datos mi_bd es genial." . PHP_EOL;
//echo "Información del host: " . mysqli_get_host_info($con) . PHP_EOL;
  return $con;
}
/*function retornarConexion() {
  $con=mysqli_connect("localhost","root","","bdtutor");
  return $con;
}*/
?>
