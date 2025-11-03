// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.screen-container');
    
    // Selecciona TODOS los elementos que tienen el atributo 'data-depth'
    const layers = document.querySelectorAll('.parallax-item, .background-text');

    container.addEventListener('mousemove', (e) => {

        const sensitivity = 14;
        const mouseX = (e.clientX - (container.offsetWidth / 2)) / sensitivity;
        const mouseY = (e.clientY - (container.offsetHeight / 2)) / sensitivity;

        // 2. Mover cada capa
        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth);

            const moveX = -(mouseX * depth);
            const moveY = -(mouseY * depth);

            // 3. Aplicar la animación con GSAP
            gsap.to(layer, {
                x: moveX,
                y: moveY,
                duration: 1.0,
                ease: 'power2.out'
            });
        });
    });

});