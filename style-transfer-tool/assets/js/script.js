const BASE_IMAGES = [
  'base/IMG_0022.PNG',
  'base/IMG_0023.PNG',
  'base/IMG_0024.PNG',
  'base/IMG_0025.PNG',
  'base/IMG_0026.PNG',
  'base/IMG_0027.PNG',
  'base/IMG_0028.PNG',
  'base/IMG_0029.PNG',
];

const STYLES = [
  { id: 'oil', name: 'Óleo', emoji: '🎨' },
  { id: 'watercolor', name: 'Aquarela', emoji: '💧' },
  { id: 'pencil', name: 'Lápis', emoji: '✏️' },
  { id: 'comic', name: 'Quadrinho', emoji: '💥' },
  { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🤖' },
  { id: 'vaporwave', name: 'Vaporwave', emoji: '🌅' },
  { id: 'ukiyoe', name: 'Ukiyo-e', emoji: '🗻' },
  { id: 'impressionism', name: 'Impressionismo', emoji: '🖌️' },
  { id: 'cubism', name: 'Cubismo', emoji: '⬟' },
  { id: 'surrealism', name: 'Surrealismo', emoji: '🌀' },
  { id: 'artnouveau', name: 'Art Nouveau', emoji: '🌿' },
  { id: 'bauhaus', name: 'Bauhaus', emoji: '⬡' },
  { id: 'pixel', name: 'Pixel Art', emoji: '🟦' },
  { id: 'lowpoly', name: 'Low Poly', emoji: '🔺' },
  { id: 'neon', name: 'Neon', emoji: '💡' },
  { id: 'sepia', name: 'Sépia', emoji: '📜' },
  { id: 'bw', name: 'Preto e Branco', emoji: '⚪' },
  { id: 'cinematic', name: 'Cinema', emoji: '🎬' },
  { id: 'cartoon', name: 'Desenho Animado', emoji: '🎭' },
  { id: 'mosaic', name: 'Mosaico', emoji: '🧩' },
  { id: 'pointillism', name: 'Pontilhismo', emoji: '•' },
  { id: 'expressionism', name: 'Expressionismo', emoji: '😱' },
  { id: 'futurism', name: 'Futurismo', emoji: '🚀' },
  { id: 'minimal', name: 'Minimalista', emoji: '⬜' },
  { id: 'retro80s', name: 'Retrô 80s', emoji: '📼' },
  { id: 'gothic', name: 'Gótico', emoji: '🏰' },
  { id: 'steampunk', name: 'Steampunk', emoji: '⚙️' },
  { id: 'popart', name: 'Pop Art', emoji: '⭐' },
  { id: 'graffiti', name: 'Grafite', emoji: '🎨' },
  { id: 'dreamy', name: 'Sonhador', emoji: '☁️' },
];

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const originalImage = document.getElementById('originalImage');
const galleryGrid = document.getElementById('galleryGrid');
const stylesGrid = document.getElementById('stylesGrid');
const resultCanvas = document.getElementById('resultCanvas');
const resultStyleName = document.getElementById('resultStyleName');
const btnDownload = document.getElementById('btnDownload');
const btnReset = document.getElementById('btnReset');
const bgOverlay = document.getElementById('bgOverlay');
const frameStyled = document.getElementById('frameStyled');

let currentImage = null;
let selectedStyle = null;
let worker = null;

if (window.Worker) {
  worker = new Worker('assets/js/background-worker.js');
}

function showBg(show) {
  if (show) {
    bgOverlay.hidden = false;
    anime({ targets: '.bg-spinner', rotate: [0, 360], duration: 800, loop: true, easing: 'linear' });
  } else {
    bgOverlay.hidden = true;
    anime.remove('.bg-spinner');
  }
}

// --- Upload ---
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const url = URL.createObjectURL(file);
  currentImage = new Image();
  currentImage.onload = () => {
    originalImage.src = url;
    resultCanvas.style.display = 'none';
    resultStyleName.textContent = 'Nenhum estilo selecionado';
    document.querySelectorAll('.gallery-item').forEach(g => g.classList.remove('selected'));
    document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
    anime({
      targets: '#frameOriginal,#frameStyled',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      easing: 'easeOutExpo'
    });
  };
  currentImage.src = url;
}

btnReset.addEventListener('click', () => {
  currentImage = null;
  selectedStyle = null;
  fileInput.value = '';
  originalImage.src = '';
  resultCanvas.style.display = 'none';
  resultStyleName.textContent = 'Nenhum estilo selecionado';
  document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.gallery-item').forEach(g => g.classList.remove('selected'));
  anime({ targets: '#dropZone', scale: [0.95, 1], duration: 300 });
});

// --- Render estilos ---
STYLES.forEach(s => {
  const card = document.createElement('div');
  card.className = 'style-card';
  card.dataset.id = s.id;
  card.innerHTML = `
    <div class="style-thumb">${s.emoji}</div>
    <div class="style-name">${s.name}</div>
  `;
  card.addEventListener('click', () => selectStyle(s, card));
  stylesGrid.appendChild(card);
});

function selectStyle(style, cardEl) {
  if (!currentImage) return;
  document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');
  selectedStyle = style;

  anime({
    targets: cardEl,
    scale: [1, 1.05, 1],
    duration: 300,
    easing: 'easeOutQuad'
  });

  applyStyleViaWorker(style);
}

// --- Render galeria da base ---
BASE_IMAGES.forEach(path => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.innerHTML = `
    <img src="${path}" alt="${path}">
    <div class="gallery-label">${path.split('/').pop()}</div>
  `;
  item.addEventListener('click', () => loadBaseImage(path, item));
  galleryGrid.appendChild(item);
});

function loadBaseImage(path, itemEl) {
  document.querySelectorAll('.gallery-item').forEach(g => g.classList.remove('selected'));
  itemEl.classList.add('selected');

  currentImage = new Image();
  currentImage.onload = () => {
    originalImage.src = path;
    resultCanvas.style.display = 'none';
    resultStyleName.textContent = 'Nenhum estilo selecionado';
    document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
  };
  currentImage.src = path;
}

// --- Aplicar estilo via Worker ---
function applyStyleViaWorker(style) {
  if (!currentImage) return;

  const maxW = 700;
  const maxH = 400;
  const img = currentImage;
  let w = img.width, h = img.height;
  const scale = Math.min(maxW / w, maxH / h, 1);
  w = Math.floor(w * scale);
  h = Math.floor(h * scale);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  const ctx = tempCanvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  showBg(true);

  const imgData = ctx.getImageData(0, 0, w, h);

  if (worker) {
    worker.postMessage({ imageData: imgData, styleId: style.id, width: w, height: h }, [imgData.data.buffer]);
  } else {
    setTimeout(() => {
      processCanvasFallback(imgData, style.id);
      finishResult(imgData, w, h, style);
    }, 100);
  }

  worker.onmessage = function(e) {
    const { imageData: processed, width, height } = e.data;
    finishResult(processed, width, height, style);
    showBg(false);
  };

  worker.onerror = function() {
    showBg(false);
    processCanvasFallback(imgData, style.id);
    finishResult(imgData, w, h, style);
  };
}

function finishResult(imgData, w, h, style) {
  resultCanvas.width = w;
  resultCanvas.height = h;
  const ctx = resultCanvas.getContext('2d');
  ctx.putImageData(imgData, 0, 0);

  resultCanvas.style.display = 'block';
  resultStyleName.textContent = style.name;

  anime({
    targets: '#resultCanvas',
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutElastic(1, 0.6)'
  });
}

function processCanvasFallback(imgData, type) {
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i+1], b = d[i+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    switch (type) {
      case 'oil': {
        const v = Math.floor(lum / 255 * 4) / 4 * 255;
        d[i] = d[i+1] = d[i+2] = v; break;
      }
      case 'pencil': {
        const edge = Math.abs(r - g) + Math.abs(g - b);
        const v = Math.min(255, lum + edge * 0.6);
        d[i] = d[i+1] = d[i+2] = v; break;
      }
      case 'comic': {
        const q = Math.floor(lum / 51) * 51;
        d[i] = d[i+1] = d[i+2] = q; break;
      }
      case 'sepia': {
        d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        d[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        d[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        break;
      }
      case 'bw': {
        const v = lum > 128 ? 255 : 0;
        d[i] = d[i+1] = d[i+2] = v; break;
      }
      case 'lowpoly': {
        const step = 32;
        d[i] = d[i+1] = d[i+2] = Math.floor(lum / step) * step; break;
      }
      case 'mosaic': {
        const step = 40;
        d[i] = d[i+1] = d[i+2] = Math.floor(lum / step) * step; break;
      }
      case 'popart': {
        const q = Math.floor(lum / 64) * 64;
        d[i] = Math.min(255, q + 40);
        d[i+1] = Math.min(255, q);
        d[i+2] = Math.min(255, q + 80);
        break;
      }
      case 'minimal': {
        const v = lum > 200 ? 255 : lum < 60 ? 0 : 128;
        d[i] = d[i+1] = d[i+2] = v; break;
      }
      case 'cartoon': {
        const q = Math.floor(lum / 48) * 48;
        d[i] = d[i+1] = d[i+2] = q; break;
      }
      default: break;
    }
  }
}

// --- Download ---
btnDownload.addEventListener('click', () => {
  if (!selectedStyle) return;
  const link = document.createElement('a');
  link.download = `estilo-${selectedStyle.id}.png`;
  link.href = resultCanvas.toDataURL();
  link.click();
  anime({
    targets: btnDownload,
    scale: [1, 0.9, 1],
    duration: 200
  });
});
