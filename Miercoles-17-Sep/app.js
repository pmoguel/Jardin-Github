console.log("Rectángulo que escapa del mouse");

const rect = document.getElementById('rectangulo');
const body = document.body;

// Posición inicial centrada
gsap.set(rect, {
  x: window.innerWidth / 2 - rect.offsetWidth / 2,
  y: window.innerHeight / 2 - rect.offsetHeight / 2
});

// Función para generar colores vibrantes usando HSL
function getVibrantColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 100;                            
  const lightness = 50 + Math.random() * 20;         
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Función para asegurar que dos colores no sean iguales
function getTwoDistinctColors() {
  let color1 = getVibrantColor();
  let color2 = getVibrantColor();
  let attempts = 0;

  while (color1 === color2 && attempts < 10) {
    color2 = getVibrantColor();
    attempts++;
  }

  return [color1, color2];
}

rect.addEventListener('click', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const maxX = window.innerWidth - rect.offsetWidth;
  const maxY = window.innerHeight - rect.offsetHeight;

  let newX, newY;
  let attempts = 0;

  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts++;
  } while (
    Math.abs(newX - mouseX) < 150 &&
    Math.abs(newY - mouseY) < 150 &&
    attempts < 100
  );

  // Mover el rectángulo
  gsap.to(rect, {
    duration: 0.6,
    x: newX,
    y: newY,
    ease: "power2.out"
  });

  // Obtener dos colores vibrantes distintos
  const [bgColor, rectColor] = getTwoDistinctColors();

  // Aplicar colores
  gsap.to(body, {
    duration: 0.6,
    backgroundColor: bgColor,
    ease: "power1.inOut"
  });

  gsap.to(rect, {
    duration: 0.6,
    backgroundColor: rectColor,
    ease: "power1.inOut"
  });

});