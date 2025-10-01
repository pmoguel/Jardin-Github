const canvas = document.getElementById("lienzo");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);


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
});


document.addEventListener('DOMContentLoaded', () => {
    const boomerang = document.getElementById('rectangulo');
    let isAnimating = false;

    if (!boomerang) return;

    boomerang.addEventListener('click', () => {
        if (isAnimating) return; 

        isAnimating = true;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        tl.to(boomerang, {
            x: '75vw', // Menos recorrido horizontal
            y: '-250px', // Más alto para una curva más amplia
            rotation: 720, // 2 rotaciones completas
            duration: 2.5, // Más lento
            ease: 'power1.inOut', // Más suave al inicio y al final
        })

        .to(boomerang, {
            x: '0vw', // Vuelve al inicio horizontal
            y: '0px', // Vuelve a la posición Y original
            rotation: 1440, // 4 rotaciones completas (otras 2 adicionales)
            duration: 2.8, // Regreso ligeramente más lento
            ease: 'power2.out', // Suave al final del regreso
        }, '+=0.2') // Pequeño retraso antes de volver

        .to(boomerang, {
            rotation: 0, 
            duration: 0, 
        });
    });
});