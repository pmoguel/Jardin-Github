document.addEventListener('DOMContentLoaded', () => {

    // --- Interacción 1: Escalar Tarjetas al Hover ---

    const cards = document.querySelectorAll('.carousel-card');

    cards.forEach(card => {
        
        let initialScale = 1;
        
        if (card.classList.contains('card-left') || card.classList.contains('card-right')) {
            initialScale = 0.9;
        }

        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                scale: initialScale * 1.05,
                duration: 0.3, 
                ease: 'power2.out' 
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                scale: initialScale, 
                duration: 0.3, 
                ease: 'power2.out' 
            });
        });
    });

    // --- Interacción 2: Escalar Botón "Next" al Hover ---

    const nextButton = document.querySelector('.next-button');

    nextButton.addEventListener('mouseenter', () => {
        gsap.to(nextButton, { 
            scale: 1.05, 
            duration: 0.3, 
            ease: 'power2.out' 
        });
    });

    nextButton.addEventListener('mouseleave', () => {
        gsap.to(nextButton, { 
            scale: 1, 
            duration: 0.3, 
            ease: 'power2.out' 
        });
    });
    
});