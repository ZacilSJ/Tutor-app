<?php
header('Content-Type: application/json');

require("conexion.php");
$con = retornarConexion();

// Obtener ID de usuario
$idUsuario = $_GET['idUsuario'] ?? 0;

// Validación básica
if (!$idUsuario) {
    echo json_encode(["error" => "Falta idUsuario"]);
    exit;
}

// Consulta
$sql = "
SELECT 
  u.usuario,
  c.nombre AS cuestionario,
  h.intento,
  ROUND(h.puntaje * 100 / h.total_preguntas, 0) AS porcentaje
FROM historial h
JOIN usuarios u ON h.usuario_id = u.id
JOIN cuestionarios c ON h.cuestionario_id = c.id
WHERE h.usuario_id = '$idUsuario'
ORDER BY h.id ASC
";

$result = mysqli_query($con, $sql);

// Arrays para Angular
$labels = [];
$data = [];
$usuario = "";

// Procesar resultados
while ($row = mysqli_fetch_assoc($result)) {
    $labels[] = $row['cuestionario'] . "-" . $row['intento'];
    $data[] = (int)$row['porcentaje'];
    $usuario = $row['usuario'];
}

// Respuesta final
echo json_encode([
    "usuario" => $usuario,
    "labels" => $labels,
    "data" => $data
]);

mysqli_close($con);
?>