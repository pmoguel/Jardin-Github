console.log("Jardin 04 - Barras 3D");
console.log(THREE);

// Configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Elementos básicos: Escena, Cámara, Renderer
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Luz puntual
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 100, 200);
scene.add(pointLight);

// Parámetros de diseño
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

// Cargar textura JPG como Matcap
const textureLoader = new THREE.TextureLoader();
const barras = [];

textureLoader.load('./textura/cromo.jpg', function (texture) {
  const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: texture });

  // Crear las barras cilíndricas
  scaledHeights.forEach((height, i) => {
    const x = startX + i * spacing;

    const geometry = new THREE.CylinderGeometry(
      barWidth / 2,
      barWidth / 2,
      height,
      16
    );

    const barra = new THREE.Mesh(geometry, matcapMaterial);

    // Centrado vertical y desplazado en Z como en el ejemplo original
    barra.position.set(x, 0, -200);

    scene.add(barra);
    barras.push(barra);
  });

  // Activar animación
  animate();
});

// Animación
function animate() {
  requestAnimationFrame(animate);

  // Rotar cada barra en diagonal
  barras.forEach(barra => {
    barra.rotation.x += 0.01;
    barra.rotation.y += 0.01;
    barra.rotation.z += 0.02;
  });

  renderer.render(scene, camera);
}