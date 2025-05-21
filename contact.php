<?php
// Conexión a la base de datos
$servername = "localhost";  // Cambia esto con el nombre de tu servidor
$username = "root";         // Cambia esto con tu usuario
$password = "";             // Cambia esto con tu contraseña
$dbname = "bd_ksoft";       // El nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombres = $_POST['name'];
    $apellidos = $_POST['lastname'];
    $correo_electronico = $_POST['email'];
    $numero_contacto = $_POST['phone'];
    $servicio = $_POST['service'];
    $mensaje = $_POST['message'];

    // Insertar los datos en la tabla
    $sql = "INSERT INTO contactanos (nombres, apellidos, correo_electronico, numero_contacto, servicio, mensaje)
            VALUES ('$nombres', '$apellidos', '$correo_electronico', '$numero_contacto', '$servicio', '$mensaje')";

    if ($conn->query($sql) === TRUE) {
        // Redirigir a WhatsApp con los datos del formulario
        $whatsappMessage = "Nombre: $nombres $apellidos\nEmail: $correo_electronico\nTeléfono: $numero_contacto\nServicio: $servicio\nMensaje: $mensaje";
        $phoneNumber = '51931576209';  // Número de WhatsApp de tu empresa
        $whatsappUrl = "https://wa.me/$phoneNumber?text=" . urlencode($whatsappMessage);

        // Redirigir al usuario a WhatsApp
        header("Location: $whatsappUrl");
        exit();
    } else {
        echo "Error al insertar los datos: " . $conn->error;
    }

    $conn->close();
}
?>
