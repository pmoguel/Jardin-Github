const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

const lineScale = 0.6;

const totalBars = 23;
const barWidth = 8 * lineScale;
const spacing = 19.8 * lineScale;
const baseY = canvas.height / 2;

const totalWidth = (totalBars - 1) * spacing;
const startX = canvas.width / 2 - totalWidth / 2;

ctx.strokeStyle = '#ffffff';
ctx.lineWidth = barWidth;
ctx.lineCap = 'round';

const barHeights = [
  15, 60, 20, 42, 10, 52, 75, 20, 20, 54,
  32, 85, 85, 30, 20, 43, 54, 54, 54, 44,
  10, 19, 10
];
const scaledHeights = barHeights.map(h => h * lineScale);

scaledHeights.forEach((height, i) => {
  const x = startX + i * spacing;
  const yStart = baseY - height / 2;
  const yEnd = baseY + height / 2;

  ctx.beginPath();
  ctx.moveTo(x, yStart);
  ctx.lineTo(x, yEnd);
  ctx.stroke();
});

