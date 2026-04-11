<?php
session_start();
require("conexion.php");
$con = retornarConexion();

$loginUser = $_SESSION['idUsuario'] ?? 0;

$idLectura = mysqli_query($con,"SELECT RDL2 FROM avance WHERE usuario_id='$loginUser'");

if ($idLectura && mysqli_num_rows($idLectura) > 0) {
    $row = mysqli_fetch_assoc($idLectura);
    echo json_encode($row['RDL2']);
} else {
    echo json_encode(0);
}

mysqli_close($con);?>
