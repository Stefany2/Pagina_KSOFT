// Configuración del Escenario Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("background").appendChild(renderer.domElement);

// Crear un grupo de luces flotantes
const lightParticles = [];
const lightMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.1, transparent: true });

const lightGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(200 * 3);
for (let i = 0; i < 200 * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}
lightGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const lightMesh = new THREE.Points(lightGeometry, lightMaterial);
scene.add(lightMesh);
lightParticles.push(lightMesh);

// Agregar un torus animado al fondo
const torusGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Configurar la posición inicial de la cámara
camera.position.z = 5;

// Animación de los elementos
function animate() {
    requestAnimationFrame(animate);

    // Rotación del torus
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;

    // Movimiento de las partículas
    lightParticles.forEach(particle => {
        particle.rotation.y += 0.001;
        particle.rotation.x += 0.001;
    });

    renderer.render(scene, camera);
}
animate();

// Efecto Parallax con el Mouse
document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    camera.position.x = x;
    camera.position.y = -y;
});

// Ajustar tamaño cuando se cambia la ventana
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
