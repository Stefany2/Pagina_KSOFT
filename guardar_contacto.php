<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "bd_ksoft";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['name'];
$apellido = $_POST['lastname'];
$email = $_POST['email'];
$telefono = $_POST['phone'];
$servicio = $_POST['service'];
$mensaje = $_POST['message'];

// Corregir la consulta SQL (había un campo extra)
$sql = "INSERT INTO contactanos (nombres, apellidos, correo_electronico, numero_contacto, servicio, mensaje) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nombre, $apellido, $email, $telefono, $servicio, $mensaje);

if ($stmt->execute()) {
    // Redireccionar a WhatsApp después de guardar
    $whatsapp_number = "51987654321"; // Reemplaza con tu número
    $whatsapp_message = "Hola KINGSOFT, soy $nombre $apellido. Estoy interesado en: $servicio. $mensaje. Mi teléfono es: $telefono";
    $encoded_message = urlencode($whatsapp_message);
    
    header("Location: https://wa.me/$whatsapp_number?text=$encoded_message");
    exit();
} else {
    echo "<script>alert('Error al guardar los datos. Por favor inténtalo nuevamente.'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>