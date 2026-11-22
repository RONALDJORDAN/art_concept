# Art Concept

Ferramentas leves de geração e transferência de estilo artístico, baseadas na identidade visual extraída da pasta `base/`.

<div align="center">

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![anime.js](https://img.shields.io/badge/anime.js-3.2.2-purple)](https://animejs.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Pillow](https://img.shields.io/badge/Pillow-13.0.0-red)](https://python-pillow.org/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](Awesome-Portrait-Style-Transfer/LICENSE)

</div>

---

## 📸 Capa / Amostra Visual

<div align="center">

![Capa do projeto Art Concept](Awesome-Portrait-Style-Transfer/content/cover.png)

<p><em>Fluxo: imagem original (acima) → imagem estilizada (abaixo)</em></p>

</div>

---

## 📋 Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Ferramentas](#ferramentas)
- [Identidade Visual Extraída](#identidade-visual-extraída)
- [Como Usar](#como-usar)
- [Tecnologias](#tecnologias)
- [Licença](#licença)

---

## 📂 Estrutura do Projeto

```
art_concept/
├── .gitignore                  # Ignora base/ e arquivos locais (não versiona imagens da base)
├── README.md                   # Este arquivo
├── IDENTIDADE_VISUAL.md        # Documento técnico da identidade extraída da base
├── analisar_base.py            # Script Python/Pillow que analisa cores e dimensões da base
├── gerador-identidade.html     # Gerador procedural de arte pela identidade visual
├── assets/
│   ├── css/gerador.css         # Estilos do gerador
│   └── js/gerador.js           # Lógica de geração procedural (Canvas API)
├── base/                       # ⚠️ Imagens de referência (NÃO versionadas)
│   ├── IMG_0022.PNG
│   ├── IMG_0023.PNG
│   ├── IMG_0024.PNG
│   ├── IMG_0025.PNG
│   ├── IMG_0026.PNG
│   ├── IMG_0027.PNG
│   ├── IMG_0028.PNG
│   └── IMG_0029.PNG
└── style-transfer-tool/
    ├── index.html              # Ferramenta de transferência de estilo
    └── assets/
        ├── css/style.css
        └── js/
            ├── script.js
            └── background-worker.js
```

> A pasta `base/` contém as imagens originais de referência. Está ignorada no `.gitignore` e **não será enviada para o repositório remoto**.

---

## 🛠️ Ferramentas

### 1. Style Transfer Tool (`style-transfer-tool/index.html`)

Página única, sem menu superior. Apenas uma barra central para upload de imagem.

| Recurso | Descrição |
|---------|-----------|
| Layout | Imagem original acima, imagem estilizada abaixo |
| Upload | Clique ou arraste a imagem para a barra central |
| Galeria da base | 8 miniaturas das imagens de `base/` para seleção rápida |
| Estilos | 30 estilos artísticos disponíveis |
| Processamento | Web Worker em background (RAM < 500 MB) |
| Download | Baixar imagem estilizada em PNG |

#### Estilos disponíveis

Óleo · Aquarela · Lápis · Quadrinho · Cyberpunk · Vaporwave · Ukiyo-e · Impressionismo · Cubismo · Surrealismo · Art Nouveau · Bauhaus · Pixel Art · Low Poly · Neon · Sépia · Preto e Branco · Cinema · Desenho Animado · Mosaico · Pontilhismo · Expressionismo · Futurismo · Minimalista · Retrô 80s · Gótico · Steampunk · Pop Art · Grafite · Sonhador

---

### 2. Gerador de Identidade Visual (`gerador-identidade.html`)

Cria novas imagens procedurais seguindo a identidade visual extraída da pasta base.

| Recurso | Descrição |
|---------|-----------|
| Dimensões | 1170 × 2532 px (9:16 retrato) |
| Fundo | Preto puro `#000000` |
| Elementos | Tons bege/areia/creme da paleta extraída |
| Tipos de arte | Geométrico, Orgânico, Linhas e Pontos, Camadas de Gradiente, Misturado |
| Quantidade | 1, 3, 5 ou 10 imagens por geração |
| Download | Baixar cada imagem individualmente em PNG |

---

## 🎯 Identidade Visual Extraída

Extraída automaticamente das 8 imagens da pasta `base/` via script Python + Pillow.

| Item | Valor |
|------|-------|
| Dimensões | 1170 × 2532 px |
| Proporção | 9:16 (retrato vertical) |
| Fundo dominante | `#000000` (preto puro) |
| Cores de destaque | `#e5ddd1`, `#e7e0d2`, `#e6ded4`, `#e3d7c5`, `#e2d8c9` |
| Brilho médio | 90 / 255 (escuro / moody) |
| Contraste médio | 0.3619 (alto) |
| Estética | Minimalista, conceitual, moody |

**Paleta visual:**

<div align="center">
  <span style="display:inline-block;width:32px;height:32px;background:#000000;border:1px solid #333;border-radius:6px;margin:2px;vertical-align:middle;"></span>
  <span style="display:inline-block;width:32px;height:32px;background:#e5ddd1;border:1px solid #333;border-radius:6px;margin:2px;vertical-align:middle;"></span>
  <span style="display:inline-block;width:32px;height:32px;background:#e7e0d2;border:1px solid #333;border-radius:6px;margin:2px;vertical-align:middle;"></span>
  <span style="display:inline-block;width:32px;height:32px;background:#e6ded4;border:1px solid #333;border-radius:6px;margin:2px;vertical-align:middle;"></span>
  <span style="display:inline-block;width:32px;height:32px;background:#e3d7c5;border:1px solid #333;border-radius:6px;margin:2px;vertical-align:middle;"></span>
  <span style="display:inline-block;width:32px;height:32px;background:#e2d8c9;border:1px solid #333;border-radius:6px;margin:2px;vertical-align:middle;"></span>
</div>

Detalhes completos: [`IDENTIDADE_VISUAL.md`](IDENTIDADE_VISUAL.md)

---

## 🚀 Como Usar

Não é necessário instalar dependências nem servidor. Abra os arquivos HTML diretamente no navegador.

### Style Transfer Tool

1. Abra `style-transfer-tool/index.html`
2. Clique na barra central ou arraste uma imagem para upload
3. (Opcional) selecione uma imagem da galeria da base
4. Escolha um dos 30 estilos artísticos
5. Aguarde o processamento em background
6. Baixe o resultado estilizado

### Gerador de Identidade Visual

1. Abra `gerador-identidade.html`
2. Escolha o tipo de arte e a quantidade de imagens
3. Clique em "Gerar Imagens"
4. Baixe as imagens geradas individualmente

---

## 🧪 Tecnologias

| Camada | Tecnologia | Uso |
|--------|------------|-----|
| Frontend | HTML5 + CSS3 | Estrutura e estilização |
| Animações | anime.js 3.2.2 | Transições e efeitos visuais |
| Processamento | Web Workers | Thread de background (RAM < 500 MB) |
| Manipulação de imagem | Canvas API | Desenho procedural e exportação PNG |
| Análise de base | Python 3 + Pillow | Extração de cores e dimensões |

---

## 📜 Licença

Distribuído sob a Licença Apache 2.0. Veja o arquivo [`LICENSE`](Awesome-Portrait-Style-Transfer/LICENSE) para mais detalhes.

---

<div align="center">

**Art Concept** — Ferramentas leves de arte conceitual baseadas em identidade visual extraída.

</div>
