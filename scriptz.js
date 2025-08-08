const box = document.getElementById("gradientBox");
const colorPicker = document.getElementById("colorPicker");
const noiseRange = document.getElementById("noiseRange");
const glowSize = document.getElementById("glowSize");
const circleSize = document.getElementById("circleSize");
const randomColor = document.getElementById("randomColor");
const noiseCanvas = document.getElementById("noiseCanvas");
const noiseCtx = noiseCanvas.getContext('2d');

function resizeNoiseCanvas() {
  noiseCanvas.width = box.clientWidth;
  noiseCanvas.height = box.clientHeight;
  drawNoise(noiseCtx, noiseCanvas.width, noiseCanvas.height);
}

window.addEventListener('resize', resizeNoiseCanvas);
resizeNoiseCanvas();

function drawNoise(ctx, w, h) {
  const imageData = ctx.createImageData(w, h);
  const buffer = new Uint32Array(imageData.data.buffer);
  for(let i = 0; i < buffer.length; i++) {
    const v = (Math.random() * 255) | 0;
    buffer[i] = (255 << 24) | (v << 16) | (v << 8) | v;
  }
  ctx.putImageData(imageData, 0, 0);
}

noiseRange.addEventListener('input', () => {
  noiseCanvas.style.opacity = noiseRange.value;
});

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function spawnCircle(e) {
  const circle = document.createElement("div");
  circle.className = "circle";

  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const size = 0;  
  const glow = parseInt(glowSize.value);
  const color = randomColor.checked ? getRandomColor() : colorPicker.value;

  circle.style.left = x + "px";
  circle.style.top = y + "px";
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.backgroundColor = "transparent"; 
  circle.style.boxShadow = `0 0 ${glow * 2}px ${glow}px ${color}`;


  box.appendChild(circle);
}

function clearCircles() {
  const circles = box.querySelectorAll('.circle');
  circles.forEach(c => c.remove());
}
