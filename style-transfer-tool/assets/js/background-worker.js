self.onmessage = function(e) {
  const { imageData, styleId, width, height } = e.data;
  const d = imageData.data;
  const len = d.length;

  for (let i = 0; i < len; i += 4) {
    const r = d[i], g = d[i+1], b = d[i+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    switch (styleId) {
      case 'oil': {
        const k = Math.floor(lum / 255 * 4) / 4;
        const v = k * 255;
        d[i] = d[i+1] = d[i+2] = v;
        break;
      }
      case 'watercolor': {
        d[i] = Math.min(255, r * 1.1);
        d[i+1] = Math.min(255, g * 1.2);
        d[i+2] = Math.min(255, b * 1.05);
        break;
      }
      case 'pencil': {
        const edge = Math.abs(r - g) + Math.abs(g - b);
        const v = Math.min(255, lum + edge * 0.6);
        d[i] = d[i+1] = d[i+2] = v;
        break;
      }
      case 'comic': {
        const q = Math.floor(lum / 51) * 51;
        d[i] = d[i+1] = d[i+2] = q;
        break;
      }
      case 'cyberpunk': {
        d[i] = Math.min(255, r * 0.8);
        d[i+1] = Math.min(255, g * 0.6);
        d[i+2] = Math.min(255, b * 1.4);
        break;
      }
      case 'vaporwave': {
        d[i] = Math.min(255, r * 1.2);
        d[i+1] = Math.min(255, g * 0.7);
        d[i+2] = Math.min(255, b * 1.5);
        break;
      }
      case 'ukiyoe': {
        const q = Math.floor(lum / 64) * 64;
        d[i] = d[i+1] = d[i+2] = q;
        break;
      }
      case 'impressionism': {
        const noise = (Math.random() - 0.5) * 40;
        const v = Math.min(255, Math.max(0, lum + noise));
        d[i] = d[i+1] = d[i+2] = v;
        break;
      }
      case 'cubism': {
        const q = Math.floor(lum / 85) * 85;
        d[i] = d[i+1] = d[i+2] = q;
        break;
      }
      case 'surrealism': {
        d[i] = Math.min(255, 255 - r);
        d[i+1] = Math.min(255, g * 1.3);
        d[i+2] = Math.min(255, b * 0.8);
        break;
      }
      case 'artnouveau': {
        d[i] = Math.min(255, r * 1.05);
        d[i+1] = Math.min(255, g * 1.15);
        d[i+2] = Math.min(255, b * 0.95);
        break;
      }
      case 'bauhaus': {
        const q = Math.floor(lum / 128) * 128;
        d[i] = d[i+1] = d[i+2] = q;
        break;
      }
      case 'pixel': {
        const step = 16;
        d[i] = d[i+1] = d[i+2] = Math.floor(lum / step) * step;
        break;
      }
      case 'lowpoly': {
        const step = 32;
        d[i] = d[i+1] = d[i+2] = Math.floor(lum / step) * step;
        break;
      }
      case 'neon': {
        d[i] = Math.min(255, r * 1.4);
        d[i+1] = Math.min(255, g * 0.5);
        d[i+2] = Math.min(255, b * 1.6);
        break;
      }
      case 'sepia': {
        d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        d[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        d[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        break;
      }
      case 'bw': {
        const v = lum > 128 ? 255 : 0;
        d[i] = d[i+1] = d[i+2] = v;
        break;
      }
      case 'cinematic': {
        d[i] = Math.min(255, r * 1.1);
        d[i+1] = Math.min(255, g * 0.9);
        d[i+2] = Math.min(255, b * 0.8);
        break;
      }
      case 'cartoon': {
        const q = Math.floor(lum / 48) * 48;
        d[i] = d[i+1] = d[i+2] = q;
        break;
      }
      case 'mosaic': {
        const step = 40;
        d[i] = d[i+1] = d[i+2] = Math.floor(lum / step) * step;
        break;
      }
      case 'pointillism': {
        const noise = (Math.random() - 0.5) * 60;
        const v = Math.min(255, Math.max(0, lum + noise));
        d[i] = d[i+1] = d[i+2] = v;
        break;
      }
      case 'expressionism': {
        d[i] = Math.min(255, r * 1.4);
        d[i+1] = Math.min(255, g * 1.2);
        d[i+2] = Math.min(255, b * 0.8);
        break;
      }
      case 'futurism': {
        d[i] = Math.min(255, r * 0.7);
        d[i+1] = Math.min(255, g * 1.3);
        d[i+2] = Math.min(255, b * 1.5);
        break;
      }
      case 'minimal': {
        const v = lum > 200 ? 255 : lum < 60 ? 0 : 128;
        d[i] = d[i+1] = d[i+2] = v;
        break;
      }
      case 'retro80s': {
        d[i] = Math.min(255, r * 1.3);
        d[i+1] = Math.min(255, g * 0.6);
        d[i+2] = Math.min(255, b * 1.4);
        break;
      }
      case 'gothic': {
        d[i] = Math.min(255, r * 0.8);
        d[i+1] = Math.min(255, g * 0.7);
        d[i+2] = Math.min(255, b * 0.9);
        break;
      }
      case 'steampunk': {
        d[i] = Math.min(255, r * 1.1);
        d[i+1] = Math.min(255, g * 0.9);
        d[i+2] = Math.min(255, b * 0.7);
        break;
      }
      case 'popart': {
        const q = Math.floor(lum / 64) * 64;
        d[i] = Math.min(255, q + 40);
        d[i+1] = Math.min(255, q);
        d[i+2] = Math.min(255, q + 80);
        break;
      }
      case 'graffiti': {
        d[i] = Math.min(255, r * 1.3);
        d[i+1] = Math.min(255, g * 1.1);
        d[i+2] = Math.min(255, b * 0.8);
        break;
      }
      case 'dreamy': {
        d[i] = Math.min(255, r * 1.15);
        d[i+1] = Math.min(255, g * 1.1);
        d[i+2] = Math.min(255, b * 1.2);
        break;
      }
      default: break;
    }
  }

  self.postImageData ? null : null;
  self.postMessage({ imageData, styleId, width, height });
};
