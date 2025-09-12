// Sesión 05: Ejercicio 03: Ilusión óptica tipo "Café Wall"
// Dibujamos líneas horizontales paralelas y bloques alternados para crear una ilusión visual.

console.log("Sesion 05: Ejercicio 03: Ilusión óptica");
console.log("Canvas 2D");

// Configurar <canvas>
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

// Parámetros generales
const totalLines = 9; // Número de líneas horizontales
const squaresPerRow = 7; // Número de bloques por fila

// Cálculos de espaciado y dimensiones
const spacingY = canvas.height / (totalLines + 1); // Espaciado vertical entre líneas
const marginX = 30; // Margen lateral
const availableWidth = canvas.width - marginX * 2; // Área útil horizontal

const squareSize = spacingY; // Altura de cada bloque (igual al espaciado entre líneas)
const spacingX = (availableWidth - squareSize * squaresPerRow) / (squaresPerRow - 1); // Espaciado horizontal entre bloques

// Estilo de línea
ctx.strokeStyle = '#000';
ctx.lineWidth = 1;

// Dibujar líneas horizontales paralelas
for (let i = 1; i <= totalLines; i++) {
  const y = Math.round(i * spacingY) + 0.5;
  ctx.beginPath();
  ctx.moveTo(marginX, y);
  ctx.lineTo(canvas.width - marginX, y);
  ctx.stroke();
}

// Estilo de relleno para los bloques
ctx.fillStyle = '#000';

const offsetStep = 8; // Desplazamiento horizontal entre filas alternadas

// Dibujar bloques alternados entre líneas
for (let row = 0; row < totalLines - 1; row++) {
  const y = Math.round((row + 1) * spacingY) + 0.5;

  // Alternar desplazamiento horizontal en cada fila
  const offset = (row % 2 === 0 ? 0 : offsetStep);

  for (let col = 0; col < squaresPerRow; col++) {
    const x = marginX + offset + col * (squareSize + spacingX);
    ctx.beginPath();
    ctx.rect(x, y, squareSize, squareSize); // Dibujar bloque
    ctx.fill(); // Rellenar bloque
    ctx.stroke(); // Contorno del bloque
  }
}