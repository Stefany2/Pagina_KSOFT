<?php
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

// Si tienes usuario_id para filtrar, puedes usarlo, aquí mostramos todos los proyectos
$sql = "SELECT nombre_proyecto, descripcion, fecha_inicio, fecha_fin, estado FROM proyecto ORDER BY id DESC";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
  echo '<p>No hay proyectos registrados.</p>';
} else {
  echo '<table><thead><tr><th>Nombre Proyecto</th><th>Descripción</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Estado</th></tr></thead><tbody>';
  while ($row = $result->fetch_assoc()) {
    echo '<tr>';
    echo '<td>'.htmlspecialchars($row['nombre_proyecto']).'</td>';
    echo '<td>'.htmlspecialchars($row['descripcion']).'</td>';
    echo '<td>'.htmlspecialchars($row['fecha_inicio']).'</td>';
    echo '<td>'.htmlspecialchars($row['fecha_fin']).'</td>';
    echo '<td>'.htmlspecialchars($row['estado']).'</td>';
    echo '</tr>';
  }
  echo '</tbody></table>';
}

$conn->close();
?>
