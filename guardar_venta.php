<?php
// guardar_venta.php
header('Content-Type: application/json');
session_start();

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'bd_ksoft';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
  echo json_encode(['success' => false, 'message' => 'Error en conexión BD']);
  exit;
}

// Obtener datos POST
$usuario_id = $_SESSION['user_id'] ?? null; 
$nombre_producto = $_POST['nombre_producto'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$precio_unitario = $_POST['precio_unitario'] ?? 0;
$cantidad = $_POST['cantidad'] ?? 0;
$total = $_POST['total'] ?? 0;

if (!$usuario_id || !$nombre_producto || !$precio_unitario || !$cantidad) {
  echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO ventas (usuario_id, nombre_producto, descripcion, precio_unitario, cantidad, total) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issdii", $usuario_id, $nombre_producto, $descripcion, $precio_unitario, $cantidad, $total);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al guardar en BD']);
}

$stmt->close();
$conn->close();
?>
