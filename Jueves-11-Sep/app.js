const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

const totalLines = 9;
const squaresPerRow = 7;

const spacingY = canvas.height / (totalLines + 1);
const marginX = 30;
const availableWidth = canvas.width - marginX * 2;
const squareSize = spacingY;
const spacingX = (availableWidth - squareSize * squaresPerRow) / (squaresPerRow - 1);

ctx.strokeStyle = '#000';
ctx.lineWidth = 1;

for (let i = 1; i <= totalLines; i++) {
  const y = Math.round(i * spacingY) + 0.5;
  ctx.beginPath();
  ctx.moveTo(marginX, y);
  ctx.lineTo(canvas.width - marginX, y);
  ctx.stroke();
}

ctx.fillStyle = '#000';

const offsetStep = 8;

for (let row = 0; row < totalLines - 1; row++) {
  const y = Math.round((row + 1) * spacingY) + 0.5;

  const offset = (row % 2 === 0 ? 0 : offsetStep);

  for (let col = 0; col < squaresPerRow; col++) {
    const x = marginX + offset + col * (squareSize + spacingX);
    ctx.beginPath();
    ctx.rect(x, y, squareSize, squareSize);
    ctx.fill();
    ctx.stroke();
  }
}