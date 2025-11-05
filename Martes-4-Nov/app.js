// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    let scene, camera, renderer;
    let mesh1, mesh2, mesh3; // Referencias individuales a cada geometría
    let material;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2(); // Posición normalizada del mouse

    const container = document.getElementById('scene-container');
    const objects = []; // Array para almacenar los objetos 3D y que el raycaster los detecte

    function init() {
        // --- Configuración Básica ---
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // --- ¡ILUMINACIÓN MEJORADA para MÁS REFLEJOS! ---
        // Luz ambiental suave para iluminación general
        const ambientLight = new THREE.AmbientLight(0x404040, 2.0); 
        scene.add(ambientLight);

        // Luz direccional para simular una fuente de luz principal (como el sol)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        // Múltiples luces puntuales para crear reflejos especulares dinámicos
        const pointLight1 = new THREE.PointLight(0xffffff, 2.0, 100); // Intensidad más alta
        pointLight1.position.set(5, 5, 5); 
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 100); // Otra luz
        pointLight2.position.set(-5, 3, -5); 
        scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0xffffff, 1.0, 100); // Otra luz más
        pointLight3.position.set(0, -5, 5); 
        scene.add(pointLight3);

        const pointLight4 = new THREE.PointLight(0xffffff, 1.0, 100); // Cuarta luz para más reflejos
        pointLight4.position.set(-8, -8, 8); 
        scene.add(pointLight4);


        // --- MATERIAL AJUSTADO (MeshPhongMaterial) ---
        material = new THREE.MeshPhongMaterial({
            color: 0x888888,     // Color base gris
            specular: 0xffffff,  // Reflejos blancos y brillantes
            shininess: 200       // ¡Mayor shininess para reflejos más nítidos y pequeños!
        });

        // --- Geometrías ---
        // 1. TorusKnot
        const geo1 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        mesh1 = new THREE.Mesh(geo1, material);
        mesh1.position.x = -3;
        mesh1.userData.originalPosition = mesh1.position.clone(); 
        scene.add(mesh1);
        objects.push(mesh1); 

        // 2. Icosahedron
        const geo2 = new THREE.IcosahedronGeometry(1.5);
        mesh2 = new THREE.Mesh(geo2, material);
        mesh2.position.x = 0;
        mesh2.userData.originalPosition = mesh2.position.clone();
        scene.add(mesh2);
        objects.push(mesh2);

        // 3. Torus
        const geo3 = new THREE.TorusGeometry(1, 0.3, 16, 100);
        mesh3 = new THREE.Mesh(geo3, material);
        mesh3.position.x = 3;
        mesh3.userData.originalPosition = mesh3.position.clone();
        scene.add(mesh3);
        objects.push(mesh3);

        // --- Event Listeners ---
        container.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);

        // Iniciar la animación
        animate();
    }

    // --- Manejador de Movimiento del Mouse (Interacción Individual - ¡EMPUJAR!) ---
    function onMouseMove(event) {
        // Normaliza la posición del mouse para Raycaster (-1 a +1)
        mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(objects);

        objects.forEach(obj => {
            if (intersects.some(i => i.object === obj)) {
                // Si el mouse está sobre este objeto: moverlo HACIA ATRÁS (empujar) y rotarlo
                gsap.to(obj.rotation, {
                    x: -mouse.y * 0.5, // Invertir rotación X para que se sienta como empuje
                    y: -mouse.x * 0.5, // Invertir rotación Y para que se sienta como empuje
                    duration: 0.5,
                    ease: "power2.out"
                });
                gsap.to(obj.position, {
                    z: -0.5, // ¡Empujar hacia atrás!
                    duration: 0.3,
                    ease: "power1.out"
                });
            } else {
                // Si el mouse NO está sobre este objeto: volver a la posición y rotación original
                gsap.to(obj.rotation, {
                    x: 0, 
                    y: 0, 
                    duration: 1, 
                    ease: "elastic.out(1, 0.5)" 
                });
                gsap.to(obj.position, {
                    z: obj.userData.originalPosition.z, // Volver a la Z original
                    duration: 0.5,
                    ease: "power1.out"
                });
            }
        });
    }

    // --- Manejador de Redimensión de Ventana ---
    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    // --- Bucle de Animación ---
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    // Iniciar todo
    init();
    
});