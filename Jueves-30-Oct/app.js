document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.screen-container');
    
    const layers = document.querySelectorAll('.parallax-item, .background-text');

    container.addEventListener('mousemove', (e) => {
        
        const sensitivity = 14;
        const mouseX = (e.clientX - (container.offsetWidth / 2)) / sensitivity;
        const mouseY = (e.clientY - (container.offsetHeight / 2)) / sensitivity;

        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth);

            const moveX = -(mouseX * depth);
            const moveY = -(mouseY * depth);

            gsap.to(layer, {
                x: moveX,
                y: moveY,
                duration: 1.0,
                ease: 'power2.out'
            });
        });
    });

});