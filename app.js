const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const r = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
const t = (pts, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath(); ctx.fill(); };

ctx.fillStyle = "#222";
ctx.fillRect(0, 0, canvas.width, canvas.height);

t([[280,200],[400,180],[420,400],[280,420]], "#f0cd99");
t([[400,180],[520,200],[520,420],[420,400]], "#d2b48c");

r(310, 260, 40, 20, "#fff");
r(320, 265, 10, 10, "rgba(88, 52, 5, 1)");
t([[450,260],[490,240],[490,280]], "#fff");
t([[460,260],[480,250],[480,270]], "rgba(82, 69, 12, 1)");

ctx.strokeStyle = "#ff6347";
ctx.lineWidth = 6;
ctx.beginPath();
ctx.moveTo(420, 300);
ctx.lineTo(400, 320);
ctx.lineTo(410, 360);
ctx.stroke();

ctx.fillStyle = "rgba(185, 89, 32, 1)";
ctx.beginPath();
ctx.moveTo(360, 380);
ctx.lineTo(440, 380);
ctx.lineTo(430, 395);
ctx.lineTo(370, 395);
ctx.closePath();
ctx.fill();

ctx.strokeStyle = "#000";
ctx.lineWidth = 2;
ctx.stroke();

[
  [260,180],[300,160],[340,150],
  [380,145],[420,150],[460,160],[500,180]
].forEach(([x,y]) => r(x, y, 24, 24, "#a87f0e"));

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