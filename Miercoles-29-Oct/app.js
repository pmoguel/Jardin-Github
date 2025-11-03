// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos los elementos que necesitamos
    const titleElement = document.querySelector('.main-header-title');
    const images = document.querySelectorAll('.grid-item');
    
    // El título original ahora es un espacio vacío
    const originalTitle = "";

    // Función para animar el texto
    function animateTitle(newText) {
        // 1. Anima el texto actual hacia ARRIBA y afuera
        gsap.to(titleElement, { 
            duration: 0.3, 
            y: '-100%',
            opacity: 0, 
            ease: 'power2.in',
            onComplete: () => {
                // 2. Cuando termina, cambia el texto
                titleElement.textContent = newText;
                
                // 3. Mueve el (nuevo) texto ABAJO (invisible)
                gsap.set(titleElement, { y: '100%', opacity: 0 });
                
                // 4. Anima el nuevo texto hacia ARRIBA (al centro)
                gsap.to(titleElement, { 
                    duration: 0.3, 
                    y: '0%', 
                    opacity: 1, 
                    ease: 'power2.out' 
                });
            }
        });
    }

    // Añadimos un "listener" a cada imagen
    images.forEach(image => {
        
        const newTitle = image.dataset.title;

        // Cuando el mouse entra...
        image.addEventListener('mouseenter', () => {
            // Animación del título
            if (titleElement.textContent !== newTitle) {
                animateTitle(newTitle);
            }

            // --- Lógica para desenfocar ---
            images.forEach(img => {
                if (img !== image) { // Si NO es la imagen que estamos viendo
                    img.classList.add('is-blurred');
                }
            });
            // --- Fin de la lógica ---
        });

        // Cuando el mouse sale...
        image.addEventListener('mouseleave', () => {
            // Animación del título
            if (titleElement.textContent !== originalTitle) {
                animateTitle(originalTitle);
            }

            // --- Lógica para quitar desenfoque ---
            images.forEach(img => {
                img.classList.remove('is-blurred');
            });
            // --- Fin de la lógica ---
        });
    });

});