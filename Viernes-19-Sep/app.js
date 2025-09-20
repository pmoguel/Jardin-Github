console.log("Viernes 19 Sep");

const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.width, canvas.height);
renderer.setClearColor("#0a0c2c");

const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshStandardMaterial({ color: "#ffffff" });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const botonGiro = document.getElementById("girarBtn");

botonGiro.addEventListener("click", () => {
  gsap.to(mesh.rotation, {
    y: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut"
  });
});

const light = new THREE.PointLight("#ffffff", 1);
light.position.set(5, 5, 5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
