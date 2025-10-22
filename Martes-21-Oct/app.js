console.log("Martes 21 Oct");

const canvas = document.getElementById("lienzo");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const geometry = new THREE.IcosahedronGeometry(1, 0);

const material = new THREE.MeshStandardMaterial({
  color: 0x9333ea,
  roughness: 0.4,
  metalness: 0.6,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.position.y = Math.sin(elapsedTime) * 0.5;

  mesh.rotation.x = Math.sin(elapsedTime * 0.7) * 0.3;
  mesh.rotation.y = Math.cos(elapsedTime * 0.5) * 0.4;
  mesh.rotation.z = Math.sin(elapsedTime * 0.3) * 0.2;

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();

const handleResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener('resize', handleResize);

