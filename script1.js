document.addEventListener('DOMContentLoaded', function() {
    // Rotación de videos de fondo
    const videos = document.querySelectorAll('.video-background video');
    let currentVideo = 0;
    
    // Mostrar el primer video
    if (videos.length > 0) {
        videos[currentVideo].classList.add('active');
    }
    
    // Rotar videos cada 5 segundos
    function rotateVideos() {
        if (videos.length > 1) {
            videos[currentVideo].classList.remove('active');
            currentVideo = (currentVideo + 1) % videos.length;
            videos[currentVideo].classList.add('active');
        }
    }
    
    const videoInterval = setInterval(rotateVideos, 5000);
    
    // Pausar el intervalo cuando la página no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(videoInterval);
        } else {
            clearInterval(videoInterval); // Detener el intervalo antes de reiniciarlo
            setInterval(rotateVideos, 5000); // Reiniciar el intervalo
        }
    });
});
