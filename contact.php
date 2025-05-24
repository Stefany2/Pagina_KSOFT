<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost"; 
$username = "root";   
$password = "";
$dbname = "bd_ksoft";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir y limpiar datos
    $nombres = $conn->real_escape_string($_POST['name']);
    $apellidos = $conn->real_escape_string($_POST['lastname']);
    $correo = $conn->real_escape_string($_POST['email']);
    $numero_contacto = $conn->real_escape_string($_POST['phone']);
    $servicio = $conn->real_escape_string($_POST['service']);
    $mensaje = $conn->real_escape_string($_POST['message']);

    // Validación simple (opcional)
    if (empty($nombres) || empty($apellidos) || empty($correo) || empty($numero_contacto) || empty($servicio) || empty($mensaje)) {
        die("Por favor, completa todos los campos.");
    }

    // Preparar y ejecutar consulta con sentencia preparada
   $stmt = $conn->prepare("INSERT INTO contactanos (nombres, apellidos, correo_electronico, numero_contacto, servicio, mensaje) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $nombres, $apellidos, $correo, $numero_contacto, $servicio, $mensaje);

    if ($stmt->execute()) {
        echo "Mensaje enviado correctamente.";
        // Aquí puedes redirigir o mostrar un mensaje personalizado
        // header("Location: gracias.html");
        // exit();
    } else {
        echo "Error al enviar el mensaje: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
