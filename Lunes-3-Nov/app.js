document.addEventListener('DOMContentLoaded', () => {

    // --- Seleccionamos todos los elementos interactivos ---
    const mediaItems = document.querySelectorAll('.media-container');
    const menuButton = document.querySelector('.menu-btn');
    const exploreButton = document.querySelector('.explore-button');
    const navLinks = document.querySelectorAll('.header-center a'); // ¡NUEVO!

    // --- Función genérica para hover (entrar) ---
    const onHoverEnter = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.05, 
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    // --- Función genérica para hover (salir) ---
    const onHoverLeave = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.0, 
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    // --- Aplicamos los listeners a todos los elementos ---
    
    mediaItems.forEach(item => {
        item.addEventListener('mouseenter', onHoverEnter);
        item.addEventListener('mouseleave', onHoverLeave);
    });

    menuButton.addEventListener('mouseenter', onHoverEnter);
    menuButton.addEventListener('mouseleave', onHoverLeave);

    exploreButton.addEventListener('mouseenter', onHoverEnter);
    exploreButton.addEventListener('mouseleave', onHoverLeave);
    

    // --- ¡NUEVO! Nav Link Hover Interaction ---

    navLinks.forEach(link => {
        const originalLetter = link.textContent;
        const fullWord = link.dataset.full;

        // Mouse entra
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                opacity: 0,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    link.textContent = fullWord;
                    gsap.to(link, {
                        opacity: 1,
                        duration: 0.2,
                        ease: 'power1.out'
                    });
                }
            });
        });

        // Mouse sale
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                opacity: 0,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    link.textContent = originalLetter;
                    gsap.to(link, {
                        opacity: 1,
                        duration: 0.2,
                        ease: 'power1.out'
                    });
                }
            });
        });
    });
    
});