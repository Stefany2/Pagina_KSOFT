document.addEventListener('DOMContentLoaded', () => {
    // Control del menú hamburguesa (se mantiene igual)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
// Función para mostrar y ocultar los paneles de información

// Función para la sección Qué Hacemos
function mostrarInfo(servicioId) {
    document.querySelectorAll('.panel-info').forEach(panel => {
        panel.classList.remove('active');
    });

    document.querySelectorAll('.servicio').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`info-${servicioId}`).classList.add('active');
    document.getElementById(servicioId).classList.add('active');
}
    // Efecto Three.js mejorado con partículas rojas de fondo
    const initParticleEffect = () => {
        const container = document.getElementById('threejs-container');
        if (!container) return;

        // Verificar compatibilidad con WebGL
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                container.style.background = 'linear-gradient(135deg, #6e48aa, #9d50bb)';
                return;
            }
        } catch (e) {
            container.style.background = 'linear-gradient(135deg, #6e48aa, #9d50bb)';
            return;
        }

        // Configuración inicial
        const width = container.clientWidth;
        const height = container.clientHeight;
        const isMobile = window.innerWidth < 768;
        
        // Escena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        
        // Cámara
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = isMobile ? 40 : 30;
        
        // Renderizador optimizado
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: true
        });
        
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // =============================================
        // 1. PARTÍCULAS ROJAS DE FONDO (NUEVO)
        // =============================================
        const createBackgroundParticles = () => {
            const bgParticlesGeometry = new THREE.BufferGeometry();
            const bgParticleCount = isMobile ? 3000 : 5000; // Muchas más partículas
            
            const bgPosArray = new Float32Array(bgParticleCount * 3);
            const bgColorArray = new Float32Array(bgParticleCount * 3);
            
            // Colores rojos con variaciones
            const redColors = [
                new THREE.Color(0xff0000), // Rojo puro
                new THREE.Color(0xff3333), // Rojo claro
                new THREE.Color(0xcc0000), // Rojo oscuro
                new THREE.Color(0xff6666)  // Rojo pastel
            ];
            
            for(let i = 0; i < bgParticleCount * 3; i += 3) {
                // Distribución en todo el espacio visible
                bgPosArray[i] = (Math.random() - 0.5) * width * 0.1;
                bgPosArray[i + 1] = (Math.random() - 0.5) * height * 0.1;
                bgPosArray[i + 2] = (Math.random() - 0.5) * 100; // Profundidad
                
                const color = redColors[Math.floor(Math.random() * redColors.length)];
                bgColorArray[i] = color.r;
                bgColorArray[i + 1] = color.g;
                bgColorArray[i + 2] = color.b;
            }
            
            bgParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(bgPosArray, 3));
            bgParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(bgColorArray, 3));
            
            return bgParticlesGeometry;
        };
        
        const bgParticlesGeometry = createBackgroundParticles();
        const bgParticlesMaterial = new THREE.PointsMaterial({
            size: isMobile ? 0.3 : 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        const bgParticlesMesh = new THREE.Points(bgParticlesGeometry, bgParticlesMaterial);
        bgParticlesMesh.position.z = -50; // Colocar detrás de las otras partículas
        scene.add(bgParticlesMesh);

        // =============================================
        // 2. PARTÍCULAS CENTRALES (ORIGINALES MEJORADAS)
        // =============================================
        const createCenterParticles = () => {
            const particlesGeometry = new THREE.BufferGeometry();
            const particleCount = isMobile ? 1000 : 2000;
            
            const posArray = new Float32Array(particleCount * 3);
            const colorArray = new Float32Array(particleCount * 3);
            
            const colors = [
                new THREE.Color(0x6e48aa),
                new THREE.Color(0x9d50bb),
                new THREE.Color(0x4776E6),
                new THREE.Color(0x8E54E9)
            ];
            
            for(let i = 0; i < particleCount * 3; i += 3) {
                const radius = 10;
                const angle = Math.random() * Math.PI * 2;
                const randomZ = (Math.random() - 0.5) * (isMobile ? 3 : 5);
                
                posArray[i] = Math.cos(angle) * radius;
                posArray[i + 1] = Math.sin(angle) * radius;
                posArray[i + 2] = randomZ;
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                colorArray[i] = color.r;
                colorArray[i + 1] = color.g;
                colorArray[i + 2] = color.b;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
            
            return particlesGeometry;
        };
        
        const centerParticlesGeometry = createCenterParticles();
        const centerParticlesMaterial = new THREE.PointsMaterial({
            size: isMobile ? 0.25 : 0.15,
            vertexColors: true,
            transparent: true,
            opacity: isMobile ? 1 : 0.9,
            blending: isMobile ? THREE.NormalBlending : THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        const centerParticlesMesh = new THREE.Points(centerParticlesGeometry, centerParticlesMaterial);
        scene.add(centerParticlesMesh);

        // =============================================
        // ANIMACIÓN COMBINADA
        // =============================================
        const clock = new THREE.Clock();
        let animationFrameId;
        
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            const elapsedTime = clock.getElapsedTime();
            const rotationSpeed = isMobile ? 0.05 : 0.1;
            
            // Animación partículas centrales
            centerParticlesMesh.rotation.z = elapsedTime * rotationSpeed;
            
            const centerPositions = centerParticlesGeometry.attributes.position.array;
            const oscillationIntensity = isMobile ? 0.005 : 0.01;
            
            for(let i = 0; i < centerPositions.length; i += 3) {
                centerPositions[i] += Math.sin(elapsedTime * 0.5 + i) * oscillationIntensity;
                centerPositions[i + 1] += Math.cos(elapsedTime * 0.5 + i) * oscillationIntensity;
            }
            centerParticlesGeometry.attributes.position.needsUpdate = true;
            
            // Animación partículas de fondo (más lenta)
            const bgPositions = bgParticlesGeometry.attributes.position.array;
            const bgSpeed = 0.2;
            
            for(let i = 0; i < bgPositions.length; i += 3) {
                bgPositions[i] += Math.sin(elapsedTime * bgSpeed + i) * 0.02;
                bgPositions[i + 1] += Math.cos(elapsedTime * bgSpeed + i) * 0.02;
                bgPositions[i + 2] += Math.sin(elapsedTime * 0.3 + i) * 0.01;
            }
            bgParticlesGeometry.attributes.position.needsUpdate = true;
            
            renderer.render(scene, camera);
        };
        
        // Manejo de redimensionamiento
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            const newIsMobile = window.innerWidth < 768;
            
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            
            if (newIsMobile !== isMobile) {
                cancelAnimationFrame(animationFrameId);
                initParticleEffect();
                return;
            }
            
            renderer.setSize(newWidth, newHeight);
            
            // Ajustar parámetros para móviles
            if (newIsMobile) {
                camera.position.z = 40;
                centerParticlesMaterial.size = 0.25;
                centerParticlesMaterial.blending = THREE.NormalBlending;
                bgParticlesMaterial.size = 0.3;
            } else {
                camera.position.z = 30;
                centerParticlesMaterial.size = 0.15;
                centerParticlesMaterial.blending = THREE.AdditiveBlending;
                bgParticlesMaterial.size = 0.2;
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Iniciar animación
        animate();
        
        // Limpieza
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    };

    // Inicializar con retraso
    setTimeout(() => {
        const cleanup = initParticleEffect();
    }, 100);

});
