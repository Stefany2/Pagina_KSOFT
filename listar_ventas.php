<?php
// listar_ventas.php
session_start();
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'bd_ksoft';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  echo '<p>Error al conectar con base de datos.</p>';
  exit;
}

$usuario_id = $_SESSION['user_id'] ?? null;
if (!$usuario_id) {
  echo '<p>No hay usuario autenticado.</p>';
  exit;
}

$sql = "SELECT nombre_producto, descripcion, precio_unitario, cantidad, total FROM ventas WHERE usuario_id = ? ORDER BY id DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo '<p>No tienes ventas registradas.</p>';
} else {
  echo '<table><thead><tr><th>Producto</th><th>Descripción</th><th>Precio Unitario</th><th>Cantidad</th><th>Total</th></tr></thead><tbody>';
  while ($row = $result->fetch_assoc()) {
    echo '<tr>';
    echo '<td>'.htmlspecialchars($row['nombre_producto']).'</td>';
    echo '<td>'.htmlspecialchars($row['descripcion']).'</td>';
    echo '<td>'.number_format($row['precio_unitario'],2).'</td>';
    echo '<td>'.intval($row['cantidad']).'</td>';
    echo '<td>'.number_format($row['total'],2).'</td>';
    echo '</tr>';
  }
  echo '</tbody></table>';
}

$stmt->close();
$conn->close();
?>
