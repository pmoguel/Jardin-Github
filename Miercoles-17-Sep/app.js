console.log("Three.js: Escena con estrella al centro");

// Configurar canvas y renderer
const canvas = document.getElementById('lienzo');
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

// Crear forma de estrella 2D
const starShape = new THREE.Shape();
const outerRadius = 1;
const innerRadius = 0.4;
const spikes = 5;
const step = Math.PI / spikes;

for (let i = 0; i < spikes * 2; i++) {
  const radius = i % 2 === 0 ? outerRadius : innerRadius;
  const angle = i * step;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  if (i === 0) {
    starShape.moveTo(x, y);
  } else {
    starShape.lineTo(x, y);
  }
}
starShape.closePath();

// Extruir la forma para convertirla en geometría 3D
const extrudeSettings = {
  depth: 0.3,
  bevelEnabled: false
};
const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

// Materiales definidos
let materialIndex = 0;
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff3366 }), // Rojo
  new THREE.MeshBasicMaterial({ color: 0x33ffcc }), // Verde agua
  new THREE.MeshBasicMaterial({ color: 0x3366ff })  // Azul
];

// Crear estrella
const star = new THREE.Mesh(geometry, materials[materialIndex]);
scene.add(star);

// Animación con rotación
function animate() {
  requestAnimationFrame(animate);

  // Rotación suave en eje Y
  star.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

// Evento resize: actualiza cámara y cambia material
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Cambiar material de forma cíclica
  materialIndex = (materialIndex + 1) % materials.length;
  star.material = materials[materialIndex];

  console.log(`Resize → Material actualizado a índice: ${materialIndex}`);
});