<?php
session_start();

// Aquí obtén el nombre del usuario desde sesión, por ejemplo:
$nombreUsuario = $_SESSION['user_name'] ?? 'Usuario';

// Si no hay usuario logueado, puedes redirigir al login
if (!$nombreUsuario) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Bienvenido</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #4366e6, #03006b);
            color: white;
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.5rem;
            margin-top: 0;
        }
        /* Animación suave */
        .fade-in {
            animation: fadeIn 1.5s ease forwards;
            opacity: 0;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    </style>
    <script>
        // Redirigir a operaciones.html después de 3 segundos
        setTimeout(() => {
            window.location.href = "operaciones.html";
        }, 3000);
    </script>
</head>
<body>
    <div class="fade-in">
        <h1>¡Bienvenido, <?php echo htmlspecialchars($nombreUsuario); ?>!</h1>
        <p>Preparando tu sesión...</p>
    </div>
</body>
</html>
