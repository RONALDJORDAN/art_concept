const PALETTE = [
  '#e5ddd1', '#e7e0d2', '#e6ded4', '#e8e0d7', '#e3d7c5', '#e2d8c9', '#e9e1d8', '#e4dcd2'
];
const BG_COLOR = '#000000';
const CANVAS_W = 1170;
const CANVAS_H = 2532;

const tipoArte = document.getElementById('tipoArte');
const qtdImagens = document.getElementById('qtdImagens');
const btnGerar = document.getElementById('btnGerar');
const gallery = document.getElementById('gallery');

let gerando = false;

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function lerpColor(c1, c2, t) {
  const r1 = hexToRgb(c1), r2 = hexToRgb(c2);
  const r = Math.round(r1.r + (r2.r - r1.r) * t);
  const g = Math.round(r1.g + (r2.g - r1.g) * t);
  const b = Math.round(r1.b + (r2.b - r1.b) * t);
  return `rgb(${r},${g},${b})`;
}

function clearCanvas(ctx) {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

function drawGeometrico(ctx) {
  const n = randomInt(8, 20);
  for (let i = 0; i < n; i++) {
    const x = randomRange(0, CANVAS_W);
    const y = randomRange(0, CANVAS_H);
    const size = randomRange(40, 300);
    const color = randomPick(PALETTE);
    const alpha = randomRange(0.15, 0.6);
    const rotation = randomRange(0, Math.PI * 2);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    const type = randomInt(0, 3);
    if (type === 0) {
      ctx.fillRect(-size / 2, -size / 2, size, size);
    } else if (type === 1) {
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawOrganico(ctx) {
  const n = randomInt(5, 12);
  for (let i = 0; i < n; i++) {
    const x = randomRange(0, CANVAS_W);
    const y = randomRange(0, CANVAS_H);
    const rx = randomRange(60, 400);
    const ry = randomRange(60, 400);
    const color = randomPick(PALETTE);
    const alpha = randomRange(0.1, 0.4);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(randomRange(0, Math.PI));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawLinhas(ctx) {
  const n = randomInt(15, 40);
  for (let i = 0; i < n; i++) {
    const x1 = randomRange(0, CANVAS_W);
    const y1 = randomRange(0, CANVAS_H);
    const x2 = x1 + randomRange(-300, 300);
    const y2 = y1 + randomRange(-300, 300);
    const color = randomPick(PALETTE);
    const alpha = randomRange(0.1, 0.5);
    const width = randomRange(1, 6);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  const dots = randomInt(20, 60);
  for (let i = 0; i < dots; i++) {
    const x = randomRange(0, CANVAS_W);
    const y = randomRange(0, CANVAS_H);
    const r = randomRange(2, 10);
    const color = randomPick(PALETTE);
    const alpha = randomRange(0.2, 0.7);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawGradientes(ctx) {
  const n = randomInt(3, 8);
  for (let i = 0; i < n; i++) {
    const x = randomRange(-200, CANVAS_W + 200);
    const y = randomRange(-200, CANVAS_H + 200);
    const r = randomRange(300, 900);
    const c1 = randomPick(PALETTE);
    const c2 = randomPick(PALETTE);

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, lerpColor(c1, BG_COLOR, 0.3));
    grad.addColorStop(1, BG_COLOR);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }
}

function gerarImagem(tipo) {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');

  clearCanvas(ctx);

  if (tipo === 'geometrico') {
    drawGeometrico(ctx);
  } else if (tipo === 'organico') {
    drawOrganico(ctx);
  } else if (tipo === 'linhas') {
    drawLinhas(ctx);
  } else if (tipo === 'gradientes') {
    drawGradientes(ctx);
  } else {
    drawGeometrico(ctx);
    drawOrganico(ctx);
    drawLinhas(ctx);
    drawGradientes(ctx);
  }

  return canvas;
}

function adicionarNaGaleria(canvas, index) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.innerHTML = `
    <div class="gallery-frame">
      <img src="${canvas.toDataURL()}" alt="Arte gerada ${index}">
    </div>
    <div class="gallery-info">
      <div class="gallery-title">Arte ${index} - ${tipoArte.options[tipoArte.selectedIndex].text}</div>
      <div class="gallery-actions">
        <button class="btn-small download" onclick="baixarCanvas(this)">Baixar PNG</button>
        <button class="btn-small" onclick="abrirTelaCheia(this)">Ver maior</button>
      </div>
    </div>
  `;

  // Armazenar canvas para download
  item.querySelector('.download').dataset.canvas = canvas.toDataURL();

  gallery.appendChild(item);
  anime({
    targets: item,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 400,
    easing: 'easeOutExpo'
  });
}

function baixarCanvas(btn) {
  const dataUrl = btn.dataset.canvas;
  const link = document.createElement('a');
  link.download = `arte-identidade-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}

function abrirTelaCheia(btn) {
  const item = btn.closest('.gallery-item');
  const img = item.querySelector('img');
  const win = window.open('');
  win.document.write(`
    <html><body style="background:#000;margin:0;display:flex;align-items:center;justify-content:center;height:100vh">
      <img src="${img.src}" style="max-width:90vw;max-height:90vh;object-fit:contain">
    </body></html>
  `);
}

window.baixarCanvas = baixarCanvas;
window.abrirTelaCheia = abrirTelaCheia;

btnGerar.addEventListener('click', async () => {
  if (gerando) return;
  gerando = true;
  btnGerar.classList.add('loading');
  btnGerar.textContent = 'Gerando...';

  gallery.innerHTML = '';
  const tipo = tipoArte.value;
  const qtd = parseInt(qtdImagens.value);

  for (let i = 0; i < qtd; i++) {
    await new Promise(resolve => setTimeout(resolve, 50));
    const canvas = gerarImagem(tipo);
    adicionarNaGaleria(canvas, i + 1);
  }

  btnGerar.classList.remove('loading');
  btnGerar.textContent = 'Gerar Imagens';
  gerando = false;
  anime({ targets: '#gallery', opacity: [0, 1], duration: 400 });
});
