<?php
require("conexion.php");
$con = retornarConexion();

$sql = "
SELECT 
  u.usuario,
  c.nombre AS cuestionario,
  h.puntaje,
  h.intento,
  (h.puntaje * 20) AS porcentaje
FROM historial h
JOIN usuarios u ON h.usuario_id = u.id
JOIN cuestionarios c ON h.cuestionario_id = c.id
ORDER BY h.id DESC
";

$result = mysqli_query($con, $sql);

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);

mysqli_close($con);
?>