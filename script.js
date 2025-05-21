document.addEventListener('DOMContentLoaded', function() {
    // Cambio de videos de fondo cada 8 segundos
    const videos = document.querySelectorAll('.video-background video');
    let currentVideo = 0;
    
    function changeVideo() {
        videos[currentVideo].classList.remove('active');
        currentVideo = (currentVideo + 1) % videos.length;
        videos[currentVideo].classList.add('active');
        
        // Asegurarse de que el video se está reproduciendo
        videos[currentVideo].play().catch(e => console.log("Autoplay prevented:", e));
    }
    
    // Iniciar el ciclo de cambio de videos
    const videoInterval = setInterval(changeVideo, 8000);
    
    // Asegurar que el primer video se reproduzca
    videos[0].play().catch(e => console.log("Autoplay prevented:", e));
    
    // Menú móvil - Versión mejorada
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navList.classList.toggle('active');
    });
    
    // Submenús en móvil - Versión mejorada
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
        const link = item.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Cerrar otros submenús abiertos
                document.querySelectorAll('.has-submenu').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Abrir/cerrar el submenú actual
                item.classList.toggle('active');
            }
        });
    });
    
    // Cerrar menús al hacer clic en un enlace del submenú
    document.querySelectorAll('.submenu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                document.querySelectorAll('.has-submenu').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
                navList.classList.remove('active');
                hasSubmenu.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
    });
    
    // Actualizar en redimensionamiento
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            hasSubmenu.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Pausar el intervalo cuando la pestaña no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(videoInterval);
            videos[currentVideo].pause();
        } else {
            setInterval(changeVideo, 8000);
            videos[currentVideo].play().catch(e => console.log("Autoplay prevented:", e));
        }
    });
});