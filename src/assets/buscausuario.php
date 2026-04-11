<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=utf-8"); // por ahora retorna texto simple

require_once __DIR__ . "/conexion.php";
session_start();

$user = $_GET['user'] ?? '';
$password = $_GET['password'] ?? '';

if ($user === '' || $password === '') {
  http_response_code(400);
  echo "Faltan datos";
  exit;
}

$con = retornarConexion();

// Permite login por email o por usuario
$stmt = $con->prepare("SELECT id, usuario, password_hash FROM usuarios WHERE email = ? OR usuario = ? LIMIT 1");
$stmt->bind_param('ss', $user, $user);
$stmt->execute();
$res = $stmt->get_result();
$u = $res->fetch_assoc();
$stmt->close();

if (!$u || !password_verify($password, $u['password_hash'])) {
  http_response_code(401);
  echo "Credenciales inválidas";
  exit;
}

//  LIMPIAR SESIÓN ANTERIOR
session_unset();
session_destroy();
session_start();

// GUARDAR EL ID CORRECTO
$_SESSION['idUsuario'] = $u['id'];
$_SESSION['usuario'] = $u['usuario'];

// RESPUESTA (puedes dejar el nombre)
echo $u['usuario'];


// Si es válido, guarda sesión y responde el identificador (igual que antes)
//$_SESSION['SessionUsuario'] = $u['usuario'];
//echo $u['usuario']; // el frontend espera un texto (token simple por ahora)

  //

  //if ($registro=mysqli_query($con,"select usuario from login where user='anas' AND password='anas'")){  //cambiar o agregar user
  //  $row=mysqli_num_rows($registro);
  //  if  ($row)>0{
      //$row=mysqli_fetch_array($registro,MYSQLI_ASSOC);
  //    $vec=$row[0];
  //  }
  //  else {echo "no volvieron registros";}
  //}
  //echo json_encode($row);
  //echo "el usuario logeado es:",$row;  //revisar que sea integer

  //$registro=mysqli_query($con,"select usuario from login where user=$user AND password=$password");  //parece funcionar
  //$registro=mysqli_query($con,"select usuario from login where user='anas' AND password='anas'");  //cambiar o agregar user
  ////echo $registro; OJO No puede convertir registro a string para ver el valor
  //$row=mysqli_fetch_array($registro,MYSQLI_ASSOC);
  //if (count($row)==0)//($row_cnt!=0) {
  //  {echo "no volvieron registros";}
  //else {




