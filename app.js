const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const r = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
const t = (pts, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath(); ctx.fill(); };

ctx.fillStyle = "#222";
ctx.fillRect(0, 0, canvas.width, canvas.height);

t([[280,200],[400,180],[420,400],[280,420]], "#f0cd99");
t([[400,180],[520,200],[520,420],[420,400]], "#d2b48c");

r(300, 470, 200, 150, "#6b8e23");
r(320, 470, 160, 20, "#4b5320");
ctx.strokeStyle = "#333";
ctx.lineWidth = 4;
ctx.beginPath(); ctx.moveTo(400, 470); ctx.lineTo(400, 620); ctx.stroke();
for (let y = 490; y < 620; y += 10) r(398, y, 4, 4, "#ddd");

t([[360, 420], [440, 420], [460, 470], [340, 470]], "#d2b48c");

ctx.strokeStyle = "#aa8d65";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(400, 420);
ctx.lineTo(400, 470);
ctx.stroke();
