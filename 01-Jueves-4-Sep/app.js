console.log("Jardin Github - 01-Jueves-4-Sep");
console.log(THREE);
console.log(gsap);

//configurar <canvas>.
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//creamos nuestros elementos básicos:
//Escena, Cámara, Mesh, Renderer.
//Escena
const scene = new THREE.Scene();

//Cámara
//const camera = new THREE.Camera(fov, aspectRatio, near, far)
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

//Mesh
////Geometría
const geometry = new THREE.SphereGeometry();
////Material
const material = new THREE.MeshNormalMaterial({flatShading: true,});

// Botón para activar animación
const boton = document.getElementById("moverSol");

boton.addEventListener("click", () => {
    const duracion = 5;
    const inicioX = -6;
    const finX = 6;

    const animador = { progreso: 0 };

    gsap.to(animador, {
        progreso: 1,
        duration: duracion,
        ease: "power1.inOut",
        onUpdate: () => {
            // Movimiento horizontal
            mesh.position.x = inicioX + (finX - inicioX) * animador.progreso;

            // Movimiento vertical
            const t = (animador.progreso - 0.5) * 3;
            mesh.position.y = -(t * t) + 1;
        }
    });
});

//////// CONFIGURACION DE MATCAPS
/////// INICIO
// Material.
const textureLoader = new THREE.TextureLoader();
var matcapMaterial;
var mesh;
var matcapMap = textureLoader.load(
   // Textura URL
   './texturas/matcap1.png',
   // on Load callback
   function (texture) {
       matcapMaterial = new THREE.MeshMatcapMaterial( { matcap: texture } );
       // Mesh.
       mesh = new THREE.Mesh( geometry, matcapMaterial );
       // 3. Poner objeto en la escena.
       scene.add(mesh);
       mesh.position.z = -8;

       // 4. Activar animación.
       animate();
   },
   // on Progress (no funciona por ahora)
   undefined,
   // on Error callback
   function (error) { console.error("Algo salio mal con la textura,", error); }
);

// Otro objeto para horizonte con textura matcap2
const matcapMap2 = textureLoader.load(
    './texturas/matcap2.png',
    function (texturaHorizonte) {
        // Geometría grande para el horizonte
        const horizonteGeometry = new THREE.SphereGeometry(20, 32, 32);

        // Material con textura matcap2
        const horizonteMaterial = new THREE.MeshMatcapMaterial({ matcap: texturaHorizonte });

        // Mesh del horizonte
        const horizonte = new THREE.Mesh(horizonteGeometry, horizonteMaterial);

        // Posicionar debajo de la cámara
        horizonte.position.set(0, -21, -5);

        // Agregar a la escena
        scene.add(horizonte);
    }
);

//////// FIN

//Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(canvas.width, canvas.height);

// Dar instruccion de renderizar o imprimir nuestro elemento
renderer.render(scene, camera);

// Tip para animar nuestro mesh:
function animate() {
   requestAnimationFrame(animate);

   mesh.rotation.x += 0.01;
   mesh.rotation.y += 0.01;

   renderer.render(scene, camera);
}
//animate();