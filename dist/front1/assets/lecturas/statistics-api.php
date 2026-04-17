<?php
header('Content-Type: application/json');

$loginUser = $_GET['idUsuario'] ?? 0;

require("conexion.php");
$con = retornarConexion();

$sql = "
SELECT 
  u.usuario,
  c.nombre AS cuestionario,
  h.intento,
  ROUND(h.puntaje * 100 / h.total_preguntas, 0) AS porcentaje
FROM historial h
JOIN usuarios u ON h.usuario_id = u.id
JOIN cuestionarios c ON h.cuestionario_id = c.id
WHERE h.usuario_id = '$loginUser'
ORDER BY h.id ASC
";

$result = mysqli_query($con, $sql);

$labels = [];
$valores = [];
$nombreUsuario = "";

while ($row = mysqli_fetch_assoc($result)) {
    $labels[] = $row['cuestionario'] . "-" . $row['intento'];
    $valores[] = (int)$row['porcentaje'];
    $nombreUsuario = $row['usuario'];
}

echo json_encode([
  "usuario" => $nombreUsuario,
  "labels" => $labels,
  "data" => $valores
]);

mysqli_close($con);
?>