<?php
// login.php
session_start();

// Datos conexión BD
$host = "localhost";
$user = "root";  
$password = ""; 
$dbname = "bd_ksoft";

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Revisar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos POST
$correo = $_POST['correo'] ?? '';
$pass = $_POST['password'] ?? '';

if (!$correo || !$pass) {
    die("Debe llenar todos los campos.");
}

// Preparar consulta para evitar SQL Injection
$stmt = $conn->prepare("SELECT id, nombre, apellido, contraseña FROM usuarios WHERE correo_electronico = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Para producción deberías usar password_hash y password_verify
    if ($user['contraseña'] === $pass) {
        // Login exitoso
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['nombre'] . " " . $user['apellido'];

        // Redirigir a panel o inicio
        header("Location: bienvenido.php");
        exit();
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}

$stmt->close();
$conn->close();
?>
