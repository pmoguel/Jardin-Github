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

const boton = document.getElementById("moverSol");

boton.addEventListener("click", function () {
    // Movimiento horizontal (x)
    gsap.to(mesh.position, {
        x: 5, // ajusta según tu escena
        duration: 3,
        ease: "power1.inOut"
    });

    // Movimiento vertical (y)
    gsap.to(mesh.position, {
        y: 2, // ajusta según tu escena
        duration: 3,
        ease: "power1.inOut"
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
       const boton = document.getElementById("moverSol");

boton.addEventListener("click", () => {
    const duracion = 5;
    const inicioX = -5;
    const finX = 5;

    const animador = { progreso: 0 };

    gsap.to(animador, {
        progreso: 1,
        duration: duracion,
        ease: "power1.inOut",
        onUpdate: () => {
            // Movimiento horizontal
            mesh.position.x = inicioX + (finX - inicioX) * animador.progreso;

            // Movimiento vertical en forma de parábola invertida
            mesh.position.y = -Math.pow((animador.progreso - 0.5) * 2, 2) + 2;
        }
    });
});
       animate();
   },
   // on Progress (no funciona por ahora)
   undefined,
   // on Error callback
   function (error) { console.error("Algo salio mal con la textura,", error); 

});


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