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
$nombre_proyecto = $_POST['nombre_proyecto'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$fecha_inicio = $_POST['fecha_inicio'] ?? null;
$fecha_fin = $_POST['fecha_fin'] ?? null;
$estado = $_POST['estado'] ?? 'Pendiente';

if (!$usuario_id || !$nombre_proyecto || !$fecha_inicio || !$fecha_fin || !$estado) {
  echo json_encode(['success' => false, 'message' => 'Datos incompletos o inválidos']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO proyecto (nombre_proyecto, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nombre_proyecto, $descripcion, $fecha_inicio, $fecha_fin, $estado);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al guardar proyecto']);
}

$stmt->close();
$conn->close();
?>
