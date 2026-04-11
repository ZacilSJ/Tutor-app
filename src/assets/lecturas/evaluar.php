<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$loginUser = $_SESSION['idUsuario'] ?? 0;

function calcularResultado($respuestas)
{
    $total = 0;
    $res = [];
    $contador = 0;

    foreach ($respuestas as $respuesta) {

        if (is_array($respuesta)) {
            $total += calcularResultado($respuesta)[0];
        }

        if (is_string($respuesta) && strpos($respuesta, ":=") !== false) {
            $valor = floatval(substr($respuesta, strpos($respuesta, ":=") + 2));
            $res[] = $valor;
            $contador++;
            $total += $valor;
        }

        if (is_numeric($respuesta)) {
            $total += floatval($respuesta);
        }
    }

    return [$total, $res, $contador];
}

// ================= DATOS =================
$idcuestionario = $_POST['idcuestionario'] ?? 0;
$respuestas = $_POST['respuestas'] ?? [];

list($total, $res, $contador) = calcularResultado($respuestas);
$today = date("Y-m-d H:i:s");

require_once("conexion.php");
$con = retornarConexion();

$loginUser = $_SESSION['idUsuario'] ?? 0;

// 🔹 verificar intentos ANTES de todo
//$sqlCheck = "
//SELECT COUNT(*) as total 
//FROM historial 
//WHERE usuario_id = '$loginUser' 
//AND cuestionario_id = '$idcuestionario'
//";

//$resultCheck = mysqli_query($con, $sqlCheck);
//$rowCheck = mysqli_fetch_assoc($resultCheck);

//if ($rowCheck['total'] >= 2) {
    //echo "<script>
       // //alert('Ya alcanzaste el máximo de intentos');
        //window.location.href='/Tutor/recomender';
    //</script>";
    //exit();
//}


// ================= MENSAJE =================
if ($total == $contador) {
    $mensaje = "Excelente!!!";
    $incremento = 2;
} elseif ($total > ($contador - 2)) {
    $mensaje = "Vas bien, puedes mejorar";
    $incremento = 1;
} else {
    $mensaje = "Puedes hacerlo mejor";
    $incremento = 0;
}


// ================= INTENTOS =================
$sqlIntento = "
SELECT COUNT(*) as total 
FROM historial 
WHERE usuario_id = '$loginUser' 
AND cuestionario_id = '$idcuestionario'
";

$queryIntento = mysqli_query($con, $sqlIntento);

if (!$queryIntento) {
    die("Error en intento: " . mysqli_error($con));
}

$rowIntento = mysqli_fetch_assoc($queryIntento);
$intentosActuales = $rowIntento['total'];

//  BLOQUEO
//$bloqueado = $intentosActuales >= 2;

// solo guarda si NO está bloqueado
//if (!$bloqueado) {

    $intento = $intentosActuales + 1;

    // INSERT
    $sqlInsert = "
    INSERT INTO historial
    (usuario_id, cuestionario_id, puntaje, total_preguntas, intento, fecha)
    VALUES
    ('$loginUser', '$idcuestionario', '$total', '$contador', '$intento', '$today')
    ";

    if (!mysqli_query($con, $sqlInsert)) {
        die("Error en insert: " . mysqli_error($con));
    }

    // ================= AVANCE =================
    $sqlLectura = "SELECT RDL2 FROM avance WHERE usuario_id='$loginUser'";
    $resultLectura = mysqli_query($con, $sqlLectura);

    if ($resultLectura && mysqli_num_rows($resultLectura) > 0) {
        $row = mysqli_fetch_assoc($resultLectura);
        $lecturaAnterior = $row['RDL2'];
    } else {
        $lecturaAnterior = 0;
    }

    $lecturaFutura = $lecturaAnterior + $incremento;

    $sqlUpdate = "UPDATE avance SET RDL2='$lecturaFutura' WHERE usuario_id='$loginUser'";

    if (!mysqli_query($con, $sqlUpdate)) {
        die("Error en update: " . mysqli_error($con));
    }
//}

mysqli_close($con);
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Evaluation Result</title>

<style>
body {
    background-color: #f6f9fc;
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #1f2d3d;
    margin: 0;
    padding: 0;
}
.container {
    max-width: 1000px;
    margin: 10px auto;
    padding: 10px;
}
h1 {
    font-size: 26px;
    margin-bottom: 5px;
}
.subtitle {
    color: #6b7c93;
    margin-bottom: 30px;
}
.grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
}
.card {
    background: #ffffff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}
.score {
    font-size: 40px;
    font-weight: bold;
    color: #1a73e8;
}
.score span {
    font-size: 18px;
    color: #6b7c93;
}
.badge {
    background-color: #e8f0fe;
    color: #1a73e8;
    padding: 10px 15px;
    border-radius: 8px;
    margin-top: 20px;
    display: inline-block;
    font-weight: 500;
}
.small-title {
    font-size: 14px;
    color: #6b7c93;
    margin-bottom: 5px;
}
.progress {
    font-size: 28px;
    font-weight: bold;
}
.btn {
    display: inline-block;
    margin-top: 25px;
    padding: 12px 22px;
    background-color: #1a73e8;
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
}
.btn:hover {
    background-color: #1558b0;
}
</style>
</head>

<body>

<div class="container">

<h1>Your evaluation result</h1>
<div class="subtitle">
A simple summary of how you did in this questionnaire.
</div>

<div class="grid">

<div class="card">
<div class="small-title">Score</div>
<div class="score">
<?= $total ?> <span>/ <?= $contador ?></span>
</div>

<div class="badge">
Mensaje: <?= $mensaje ?>
</div>

<a href="/tutor/assets/lecturas/cuestionario_<?= $idcuestionario ?>.htm" class="btn">
Repeat this questionnaire
</a>

</div>

<div>

<div class="card" style="margin-bottom:20px;">
<div class="small-title">Status</div>
<strong>Completed today</strong>
<div style="color:#6b7c93; font-size:14px; margin-top:5px;">
Your last attempt has been saved.
</div>
</div>

<div class="card">
<div class="small-title">Progress</div>
<div class="progress">
<?= $contador > 0 ? round(($total / $contador) * 100) : 0 ?>%
</div>
</div>

</div>
</div>
</div>

</body>
</html>