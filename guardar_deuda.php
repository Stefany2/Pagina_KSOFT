<?php
header('Content-Type: application/json');
session_start();

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'bd_ksoft';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  echo json_encode(['success' => false, 'message' => 'Error de conexión']);
  exit;
}

$usuario_id = $_SESSION['user_id'] ?? null;
$nombre = $_POST['nombre_deuda'] ?? '';
$dni = $_POST['dni_deuda'] ?? '';
$descripcion = $_POST['descripcion_deuda'] ?? '';
$monto = floatval($_POST['monto_deuda'] ?? 0);
$estado = $_POST['estado_deuda'] ?? 'Pendiente';
$fecha = $_POST['fecha_deuda'] ?? null;

if (!$usuario_id || !$nombre || !$dni || $monto <= 0 || !$fecha) {
  echo json_encode(['success' => false, 'message' => 'Datos incompletos o inválidos']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO deudas (usuario_id, nombre, dni, descripcion, monto, estado, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssdss", $usuario_id, $nombre, $dni, $descripcion, $monto, $estado, $fecha);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al guardar deuda']);
}

$stmt->close();
$conn->close();
?>
