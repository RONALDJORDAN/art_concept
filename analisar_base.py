from PIL import Image
import os
from collections import Counter

BASE_DIR = r"C:\projetos\Projetos\art_concept\base"
IMAGES = [f"IMG_{i:04d}.PNG" for i in range(22, 30)]

def analyze(path):
    with Image.open(path) as img:
        img = img.convert("RGB")
        w, h = img.size
        # Cores dominantes (amostragem)
        small = img.resize((150, 150))
        pixels = list(small.getdata())
        counter = Counter(pixels)
        top_colors = counter.most_common(8)
        # Brilho médio
        gray = img.convert("L")
        gpixels = list(gray.getdata())
        avg_brightness = sum(gpixels) / len(gpixels)
        # Contraste (desvio padrão simplificado)
        mean = avg_brightness / 255.0
        var = sum(((p/255.0) - mean) ** 2 for p in gpixels) / len(gpixels)
        std = var ** 0.5
        return {
            "file": os.path.basename(path),
            "size": f"{w}x{h}",
            "mode": img.mode,
            "format": img.format,
            "avg_brightness": round(avg_brightness, 1),
            "contrast_std": round(std, 4),
            "top_colors": [(f"#{r:02x}{g:02x}{b:02x}", cnt) for (r, g, b), cnt in top_colors],
        }

results = []
for name in IMAGES:
    path = os.path.join(BASE_DIR, name)
    if os.path.exists(path):
        results.append(analyze(path))

print("=== ANALISE DE IDENTIDADE VISUAL - PASTA BASE ===\n")
for r in results:
    print(f"Arquivo: {r['file']}")
    print(f"  Dimensoes: {r['size']} | Modo: {r['mode']} | Formato: {r['format']}")
    print(f"  Brilho medio: {r['avg_brightness']} / 255 | Contraste (desvio padrao): {r['contrast_std']}")
    print(f"  Cores dominantes:")
    for color, cnt in r['top_colors']:
        print(f"    - {color} ({cnt} pixels)")
    print()

# Resumo geral
if results:
    sizes = [r['size'] for r in results]
    print("=== RESUMO GERAL ===")
    print(f"Total de imagens analisadas: {len(results)}")
    print(f"Dimensoes: {', '.join(sizes)}")
    brilhos = [r['avg_brightness'] for r in results]
    print(f"Brilho medio geral: {round(sum(brilhos)/len(brilhos), 1)} / 255")
    contrastes = [r['contrast_std'] for r in results]
    print(f"Contraste medio: {round(sum(contrastes)/len(contrastes), 4)}")
