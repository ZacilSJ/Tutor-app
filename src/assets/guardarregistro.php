<?php

session_start();
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
//header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/conexion.php";
$con = retornarConexion();

// Lee JSON (Angular envía JSON)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) { echo json_encode(["ok" => false, "mensaje" => "No llegaron datos"]); exit; }

// Sanitiza y valida
$nombre   = trim($data['name'] ?? '');
$apellido = trim($data['lastname'] ?? '');
$email    = trim($data['email'] ?? '');
$usuario  = trim($data['user'] ?? '');
$password = $data['password'] ?? '';

if ($nombre === '' || $apellido === '' || $email === '' || $usuario === '' || $password === '') {
  echo json_encode(["ok" => false, "mensaje" => "Campos obligatorios"]); exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["ok" => false, "mensaje" => "Email no válido"]); exit;
}

// ¿Existe ya email o usuario?
$check = $con->prepare("SELECT 1 FROM usuarios WHERE email=? OR usuario=? LIMIT 1");
$check->bind_param('ss', $email, $usuario);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
  echo json_encode(["ok" => false, "mensaje" => "Email o usuario ya registrado"]); exit;
}
$check->close();

// Hash de contraseña
$hash = password_hash($password, PASSWORD_BCRYPT);

// Inserta con preparadas
$ins = $con->prepare("INSERT INTO usuarios (nombre, apellido, email, usuario, password_hash) VALUES (?, ?, ?, ?, ?)");
$ins->bind_param('sssss', $nombre, $apellido, $email, $usuario, $hash);


if ($ins->execute()) {

  // OBTENER ID DEL USUARIO
  $idInsertado = $con->insert_id;

  // GUARDAR EN SESIÓN
  $_SESSION['idUsuario'] = $idInsertado;
  $_SESSION['SessionNombre'] = $nombre;

  echo json_encode([
    "ok" => true,
    "mensaje" => "Registro exitoso",
    "idUsuario" => $idInsertado
  ]);

} else {
  echo json_encode(["ok" => false, "mensaje" => "Error al registrar"]);
}
//if ($ins->execute()) {
 // echo json_encode(["ok" => true, "mensaje" => "Registro exitoso"]);
//} else {
  echo json_encode(["ok" => false, "mensaje" => "Error al registrar"]);
//}
$ins->close();