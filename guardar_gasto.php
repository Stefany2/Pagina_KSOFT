<?php
header('Content-Type: application/json');
session_start();

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'bd_ksoft';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
  exit;
}

$usuario_id = $_SESSION['user_id'] ?? null;
$descripcion = $_POST['descripcion_gasto'] ?? '';
$monto = floatval($_POST['monto'] ?? 0);
$fecha = date('Y-m-d');  // Guarda la fecha actual

if (!$usuario_id || !$descripcion || $monto <= 0) {
  echo json_encode(['success' => false, 'message' => 'Datos incompletos o inválidos']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO gastos (usuario_id, descripcion, monto, fecha) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isds", $usuario_id, $descripcion, $monto, $fecha);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al guardar gasto']);
}

$stmt->close();
$conn->close();
?>
