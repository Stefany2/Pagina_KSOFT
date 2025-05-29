<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";      
$password = "";      
$dbname = "bd_ksoft";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  echo json_encode(['error' => "Error de conexión: " . $conn->connect_error]);
  exit;
}

$sql = "SELECT * FROM ventas ORDER BY id DESC";
$result = $conn->query($sql);

if(!$result){
  echo json_encode(['error' => "Error al obtener datos: " . $conn->error]);
  exit;
}

$ventas = [];
while($row = $result->fetch_assoc()){
  $ventas[] = $row;
}

echo json_encode($ventas);
$conn->close();
