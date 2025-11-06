document.addEventListener('DOMContentLoaded', () => {

    const links = document.querySelectorAll('.nav-link');
    const navContainer = document.querySelector('.nav-container');

    links.forEach(link => {
        
        link.addEventListener('mouseenter', () => {
            // 1. Obtener los datos del link
            const imgId = link.dataset.imgId;
            const imgPos = link.dataset.imgPos;
            const targetImage = document.getElementById(imgId);

            // 2. Ocultar todas las imágenes (excepto la actual)
            document.querySelectorAll('.image-container img.is-visible').forEach(img => {
                if (img.id !== imgId) {
                    img.classList.remove('is-visible');
                }
            });

            // 3. Quitar el 'active' de todos los links
            links.forEach(l => l.classList.remove('is-active'));

            // 4. Mover y mostrar la imagen correcta
            if (targetImage) {
                targetImage.style.left = imgPos;
                targetImage.classList.add('is-visible');
            }

            // 5. Activar el link actual
            link.classList.add('is-active');
        });
    });

    // Cuando el mouse sale de todo el contenedor de links
    navContainer.addEventListener('mouseleave', () => {
        // Ocultar todas las imágenes
        document.querySelectorAll('.image-container img.is-visible').forEach(img => {
            img.classList.remove('is-visible');
        });

        // Quitar el 'active' de todos los links
        links.forEach(l => l.classList.remove('is-active'));
    });
    
});