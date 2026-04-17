<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/conexion.php";
$con = retornarConexion();

// Leer JSON
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
  echo json_encode(["ok" => false, "mensaje" => "No llegaron datos"]);
  exit;
}

// Datos
$nombre   = trim($data['name'] ?? '');
$apellido = trim($data['lastname'] ?? '');
$email    = trim($data['email'] ?? '');
$usuario  = trim($data['user'] ?? '');
$password = $data['password'] ?? '';

// Validaciones
if ($nombre === '' || $apellido === '' || $email === '' || $usuario === '' || $password === '') {
  echo json_encode(["ok" => false, "mensaje" => "Campos obligatorios"]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["ok" => false, "mensaje" => "Email no válido"]);
  exit;
}

// Verificar duplicados
$check = $con->prepare("SELECT 1 FROM usuarios WHERE email=? OR usuario=? LIMIT 1");
$check->bind_param('ss', $email, $usuario);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
  echo json_encode(["ok" => false, "mensaje" => "Email o usuario ya registrado"]);
  exit;
}
$check->close();

// HASH CORRECTO
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar
$ins = $con->prepare("INSERT INTO usuarios (nombre, apellido, email, usuario, password_hash) VALUES (?, ?, ?, ?, ?)");
$ins->bind_param('sssss', $nombre, $apellido, $email, $usuario, $hash);

if ($ins->execute()) {

  $idInsertado = $con->insert_id;

  $_SESSION['idUsuario'] = $idInsertado;
  $_SESSION['usuario'] = $usuario;

  echo json_encode([
    "ok" => true,
    "mensaje" => "Registro exitoso",
    "idUsuario" => $idInsertado
  ]);

} else {
  echo json_encode(["ok" => false, "mensaje" => "Error al registrar"]);
}

$ins->close();