const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

const totalLines = 8;
const spacing = canvas.height / (totalLines + 1);

ctx.strokeStyle = '#black';
ctx.lineWidth = 1;

for (let i = 1; i <= totalLines; i++) {
  const y = Math.round(i * spacing) + 0.5;
  ctx.beginPath();
  ctx.moveTo(30, y);
  ctx.lineTo(canvas.width - 30, y);
  ctx.stroke();
}