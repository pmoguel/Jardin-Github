// Sesión 05: Ejercicio 03 - Ilusión óptica con Three.js
console.log("Three.js: Escena con cambio de color al redimensionar");

// Obtener el canvas
const canvas = document.getElementById('lienzo');

// Crear renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Crear escena y fondo
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Gris claro

// Crear cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Crear geometría y materiales
const geometry = new THREE.BoxGeometry(1, 1, 1);
let materialIndex = 0;
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff3366 }), // Rojo
  new THREE.MeshBasicMaterial({ color: 0x33ffcc }), // Verde agua
  new THREE.MeshBasicMaterial({ color: 0x3366ff })  // Azul
];

// Crear cubo
const cube = new THREE.Mesh(geometry, materials[materialIndex]);
scene.add(cube);

// Animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Evento resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  materialIndex = (materialIndex + 1) % materials.length;
  cube.material = materials[materialIndex];

  console.log(`Resize → Material actualizado a índice: ${materialIndex}`);
});