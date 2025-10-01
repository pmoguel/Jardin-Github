const canvas = document.getElementById("lienzo");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 5, 12);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.7, 4, 32);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 2; 
scene.add(trunk);

const leavesGeometry = new THREE.IcosahedronGeometry(2, 0); 
const leavesMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x228b22,
    flatShading: true,
});
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 5.5; 
scene.add(leaves);

const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x6b8e23 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});