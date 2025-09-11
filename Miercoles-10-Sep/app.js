console.log("Jardin 04");

// Escena y cámara
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 150;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental y puntual
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 100, 200);
scene.add(pointLight);

// Parámetros de escala y diseño
const lineScale = 0.6;
const totalBars = 23;
const barWidth = 8 * lineScale;
const spacing = 19.8 * lineScale;
const barHeights = [
  15, 60, 20, 42, 10, 52, 75, 20, 20, 54,
  32, 85, 85, 30, 20, 43, 54, 54, 54, 44,
  10, 19, 10
];
const scaledHeights = barHeights.map(h => h * lineScale);

// Centrado horizontal
const totalWidth = (totalBars - 1) * spacing;
const startX = -totalWidth / 2;

// Material básico para visibilidad
const material = new THREE.MeshStandardMaterial({ color: '#ffffff' });

// Crear las cajas
scaledHeights.forEach((height, i) => {
  const x = startX + i * spacing;
  const geometry = new THREE.BoxGeometry(barWidth, height, Math.random() * 40 + 5);
  const cube = new THREE.Mesh(geometry, material);

  // Centrado vertical
  cube.position.set(x, height / 2 - 20, 0);
  scene.add(cube);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();