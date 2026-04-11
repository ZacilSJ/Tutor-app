<?php
session_start();

if (!isset($_SESSION['idUsuario'])) {
    die("No hay sesión activa");
}

$loginUser = $_SESSION['idUsuario'];

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
    $valores[] = $row['porcentaje'];
    $nombreUsuario = $row['usuario'];
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
body {
    font-family: Arial;
    background: white;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.contenedor-grafica {
    max-width: 900px;
    margin: 40px auto;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.scroll-x {
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 40px;
}

canvas {
    height: 400px !important;
}

h2 {
    text-align: center;
}
</style>
</head>

<body>
<title>Statistics</title>
<h2>
Progreso general del estudiante - 
<span style="color:#1a73e8;">
<?= $nombreUsuario ?>
</span>
</h2>

<div class="contenedor-grafica">
    <div class="scroll-x">
        <canvas id="graficaGeneral"></canvas>
    </div>
</div>

<script>
const labels = <?= json_encode($labels) ?>;
const data = <?= json_encode($valores) ?>;

const canvas = document.getElementById('graficaGeneral');

if (labels.length > 15) {
    canvas.style.width = (labels.length * 60) + "px";
}

new Chart(canvas, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Porcentaje obtenido',
            data: data,
            borderWidth: 1,
            barPercentage: 0.85,
            categoryPercentage: 0.8
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 70,
                    minRotation: 45,
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }
});
</script>

</body>
</html>

<?php mysqli_close($con); ?>