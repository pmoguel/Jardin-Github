console.log("Miercoles 29 Oct");
// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos los elementos que necesitamos
    const titleElement = document.querySelector('.main-header-title');
    const images = document.querySelectorAll('.grid-item');
    
    // Guardamos el título original para poder volver a él
    const originalTitle = titleElement.textContent;

    // Función para animar el texto
    function animateTitle(newText) {
        // 1. Anima el texto actual hacia ARRIBA y afuera
        gsap.to(titleElement, { 
            duration: 0.3, 
            y: '-100%',         // Mueve 100% de su altura hacia arriba
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
        
        // Obtenemos el nuevo título del atributo 'data-title' que pusimos en el HTML
        const newTitle = image.dataset.title;

        // Cuando el mouse entra...
        image.addEventListener('mouseenter', () => {
            // Solo animamos si el texto es diferente
            if (titleElement.textContent !== newTitle) {
                animateTitle(newTitle);
            }
        });

        // Cuando el mouse sale...
        image.addEventListener('mouseleave', () => {
            // Volvemos al título original
            if (titleElement.textContent !== originalTitle) {
                animateTitle(originalTitle);
            }
        });
    });

});