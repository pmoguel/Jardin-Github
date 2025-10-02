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


gsap.registerPlugin(MotionPathPlugin);

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
            motionPath: {
                path: [
                    {x: window.innerWidth * 0.35, y: -100},
                    {x: window.innerWidth * 0.65, y: 0},
                    {x: window.innerWidth * 0.35, y: 100},
                    {x: 0, y: 0}
                ],
                curviness: 1.5,
                align: boomerang,
            },
            rotation: 1440,
            duration: 4.5,
            ease: 'power1.inOut',
        });
    });
});