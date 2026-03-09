// ═══════════════════════════════════════════════════════
// CARTE AU TRÉSOR 2D — Académie Pirate
// ═══════════════════════════════════════════════════════

const CONTINENTS = [
  {
    id: 'french',
    name: 'Grand Bleu',
    subject: 'Français',
    universe: 'One Piece',
    emoji: '🏴‍☠️',
    color: '#e63946',
    chars: ['Nami', 'Luffy', 'Robin'],
    charColors: ['#f59e0b', '#e63946', '#6366f1'],
    desc: "Maîtrise la grammaire avec l'équipage Chapeau de Paille !",
    locked: false,
    path: 'M 120,80 C 140,60 180,55 210,70 C 240,85 255,110 250,135 C 245,160 225,175 200,178 C 175,181 150,170 135,152 C 118,133 108,105 120,80 Z',
    labelX: 185, labelY: 118, subX: 185, subY: 133, emojiX: 173, emojiY: 95,
  },
  {
    id: 'math',
    name: 'Pays du Feu',
    subject: 'Maths',
    universe: 'Naruto',
    emoji: '⚔️',
    color: '#ff6b35',
    chars: ['Sakura', 'Naruto', 'Tsunade'],
    charColors: ['#ec4899', '#f97316', '#eab308'],
    desc: 'Entraîne-toi aux calculs comme un vrai ninja !',
    locked: true,
    path: 'M 390,55 C 415,45 450,50 468,68 C 486,86 485,118 470,138 C 455,158 428,165 405,158 C 382,151 368,130 368,108 C 368,84 372,65 390,55 Z',
    labelX: 425, labelY: 103, subX: 425, subY: 118, emojiX: 413, emojiY: 75,
  },
  {
    id: 'history',
    name: 'Magnolia',
    subject: 'Histoire',
    universe: 'Fairy Tail',
    emoji: '✨',
    color: '#8b5cf6',
    chars: ['Erza', 'Lucy', 'Wendy'],
    charColors: ['#ef4444', '#eab308', '#3b82f6'],
    desc: 'Voyage dans le temps avec la guilde Fairy Tail !',
    locked: true,
    path: 'M 540,110 C 562,92 595,90 615,108 C 635,126 635,158 618,175 C 601,192 572,195 552,180 C 532,165 525,140 530,120 C 532,115 536,112 540,110 Z',
    labelX: 578, labelY: 145, subX: 578, subY: 160, emojiX: 565, emojiY: 115,
  },
  {
    id: 'science',
    name: 'Kanto',
    subject: 'Sciences',
    universe: 'Pokémon',
    emoji: '🌿',
    color: '#22c55e',
    chars: ['Misty', 'Dawn', 'May'],
    charColors: ['#ef4444', '#3b82f6', '#ec4899'],
    desc: 'Explore la nature et les créatures avec tes Pokémon !',
    locked: true,
    path: 'M 430,240 C 455,218 495,215 518,232 C 541,249 545,282 530,302 C 515,322 485,328 462,315 C 438,302 425,275 428,255 C 429,249 430,244 430,240 Z',
    labelX: 483, labelY: 270, subX: 483, subY: 285, emojiX: 470, emojiY: 240,
  },
  {
    id: 'geography',
    name: 'Namek',
    subject: 'Géographie',
    universe: 'Dragon Ball Z',
    emoji: '💥',
    color: '#3b82f6',
    chars: ['Bulma', 'Android 18', 'Videl'],
    charColors: ['#3b82f6', '#6366f1', '#ec4899'],
    desc: "Parcours l'univers avec Goku et ses amis !",
    locked: true,
    path: 'M 150,260 C 172,238 210,232 235,248 C 260,264 268,298 255,320 C 242,342 212,350 188,340 C 163,330 148,305 148,282 C 148,274 149,267 150,260 Z',
    labelX: 205, labelY: 290, subX: 205, subY: 305, emojiX: 192, emojiY: 260,
  }
];

function buildTreasureMap() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  container.id = 'treasure-map';
  container.style.cssText = 'width:min(700px,96vw);position:relative;border-radius:12px;overflow:hidden;box-shadow:0 0 0 3px #8B6914,0 0 0 6px #2a1a00,0 8px 40px rgba(0,0,0,.7);cursor:default;height:auto;';
  container.innerHTML = '';

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 720 400');
  svg.style.cssText = 'width:100%;height:auto;display:block;';

  // ── Defs ──
  const defs = document.createElementNS(svgNS, 'defs');
  const parchGrad = document.createElementNS(svgNS, 'radialGradient');
  parchGrad.id = 'parchment';
  parchGrad.setAttribute('cx', '50%'); parchGrad.setAttribute('cy', '45%'); parchGrad.setAttribute('r', '75%');
  [['0%','#1e2a1a'],['35%','#0f1a2a'],['70%','#080d18'],['100%','#030608']].forEach(([off, col]) => {
    const s = document.createElementNS(svgNS, 'stop');
    s.setAttribute('offset', off); s.setAttribute('stop-color', col); parchGrad.appendChild(s);
  });
  defs.appendChild(parchGrad);

  // Glow filter
  const glowFilter = document.createElementNS(svgNS, 'filter');
  glowFilter.id = 'glow';
  const feBlur = document.createElementNS(svgNS, 'feGaussianBlur');
  feBlur.setAttribute('stdDeviation', '3'); feBlur.setAttribute('result', 'blur');
  const feMerge = document.createElementNS(svgNS, 'feMerge');
  const mn1 = document.createElementNS(svgNS, 'feMergeNode'); mn1.setAttribute('in', 'blur');
  const mn2 = document.createElementNS(svgNS, 'feMergeNode'); mn2.setAttribute('in', 'SourceGraphic');
  feMerge.appendChild(mn1); feMerge.appendChild(mn2);
  glowFilter.appendChild(feBlur); glowFilter.appendChild(feMerge);
  defs.appendChild(glowFilter);

  svg.appendChild(defs);

  // ── Fond ──
  const bg = document.createElementNS(svgNS, 'rect');
  bg.setAttribute('width', '720'); bg.setAttribute('height', '400');
  bg.setAttribute('fill', 'url(#parchment)');
  svg.appendChild(bg);

  // ── Grille navigation ──
  for (let x = 60; x < 720; x += 60) {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', x); l.setAttribute('y1', 0); l.setAttribute('x2', x); l.setAttribute('y2', 400);
    l.setAttribute('stroke', 'rgba(100,150,200,0.08)'); l.setAttribute('stroke-width', '0.5');
    svg.appendChild(l);
  }
  for (let y = 50; y < 400; y += 50) {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', 0); l.setAttribute('y1', y); l.setAttribute('x2', 720); l.setAttribute('y2', y);
    l.setAttribute('stroke', 'rgba(100,150,200,0.08)'); l.setAttribute('stroke-width', '0.5');
    svg.appendChild(l);
  }

  // ── Vagues ──
  const waves = [
    'M 20,40 Q 45,33 70,40 Q 95,47 120,40',
    'M 280,25 Q 310,18 340,25 Q 370,32 400,25',
    'M 490,38 Q 515,31 540,38',
    'M 620,50 Q 648,43 676,50',
    'M 30,200 Q 58,193 86,200',
    'M 310,175 Q 338,168 366,175',
    'M 590,195 Q 618,188 646,195',
    'M 50,360 Q 78,353 106,360 Q 134,367 162,360',
    'M 380,370 Q 408,363 436,370',
    'M 620,355 Q 648,348 676,355',
  ];
  waves.forEach(d => {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', d); p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'rgba(59,130,246,0.35)'); p.setAttribute('stroke-width', '1.5');
    svg.appendChild(p);
  });

  // ── Titre ──
  const title = document.createElementNS(svgNS, 'text');
  title.setAttribute('x', '360'); title.setAttribute('y', '20');
  title.setAttribute('text-anchor', 'middle');
  title.setAttribute('font-family', 'Bangers, cursive');
  title.setAttribute('font-size', '10'); title.setAttribute('letter-spacing', '3');
  title.setAttribute('fill', 'rgba(255,215,0,0.35)');
  title.textContent = '— GRAND LINE — ☠ — ONE PIECE —';
  svg.appendChild(title);

  // ── Continents ──
  CONTINENTS.forEach(c => {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'continent-zone' + (c.locked ? ' locked' : ''));

    // Ombre
    const shadow = document.createElementNS(svgNS, 'path');
    shadow.setAttribute('d', c.path);
    shadow.setAttribute('fill', 'rgba(0,0,0,0.5)');
    shadow.setAttribute('transform', 'translate(5,5)');
    g.appendChild(shadow);

    // Corps
    const shape = document.createElementNS(svgNS, 'path');
    shape.setAttribute('d', c.path);
    shape.setAttribute('fill', c.locked ? `${c.color}44` : `${c.color}bb`);
    shape.setAttribute('stroke', c.locked ? 'rgba(255,255,255,0.15)' : '#000');
    shape.setAttribute('stroke-width', '2');
    shape.setAttribute('stroke-linejoin', 'round');
    g.appendChild(shape);

    // Hachures
    const hatch = document.createElementNS(svgNS, 'path');
    hatch.setAttribute('d', c.path);
    hatch.setAttribute('fill', 'none');
    hatch.setAttribute('stroke', c.locked ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)');
    hatch.setAttribute('stroke-width', '8');
    hatch.setAttribute('stroke-dasharray', '1 6');
    g.appendChild(hatch);

    // Emoji
    const em = document.createElementNS(svgNS, 'text');
    em.setAttribute('x', c.emojiX); em.setAttribute('y', c.emojiY);
    em.setAttribute('text-anchor', 'middle'); em.setAttribute('font-size', '16');
    em.textContent = c.emoji;
    g.appendChild(em);

    // Nom
    const lbl = document.createElementNS(svgNS, 'text');
    lbl.setAttribute('x', c.labelX); lbl.setAttribute('y', c.labelY);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('font-family', 'Bangers, cursive');
    lbl.setAttribute('font-size', '13'); lbl.setAttribute('letter-spacing', '1');
    lbl.setAttribute('fill', c.locked ? 'rgba(255,255,255,0.45)' : '#fff');
    lbl.setAttribute('stroke', '#000'); lbl.setAttribute('stroke-width', '3');
    lbl.setAttribute('paint-order', 'stroke');
    lbl.textContent = c.name;
    g.appendChild(lbl);

    // Matière
    const sub = document.createElementNS(svgNS, 'text');
    sub.setAttribute('x', c.subX); sub.setAttribute('y', c.subY);
    sub.setAttribute('text-anchor', 'middle');
    sub.setAttribute('font-family', 'Nunito, sans-serif');
    sub.setAttribute('font-size', '9'); sub.setAttribute('font-weight', '800');
    sub.setAttribute('letter-spacing', '1');
    sub.setAttribute('fill', c.locked ? 'rgba(255,255,255,0.35)' : '#ffd700');
    sub.setAttribute('stroke', '#000'); sub.setAttribute('stroke-width', '2');
    sub.setAttribute('paint-order', 'stroke');
    sub.textContent = c.subject.toUpperCase();
    g.appendChild(sub);

    // Verrou
    if (c.locked) {
      const lkCirc = document.createElementNS(svgNS, 'circle');
      lkCirc.setAttribute('cx', String(c.emojiX + 13));
      lkCirc.setAttribute('cy', String(c.emojiY - 5));
      lkCirc.setAttribute('r', '8');
      lkCirc.setAttribute('fill', 'rgba(0,0,0,0.7)');
      lkCirc.setAttribute('stroke', 'rgba(255,255,255,0.2)');
      lkCirc.setAttribute('stroke-width', '1');
      g.appendChild(lkCirc);
      const lkTxt = document.createElementNS(svgNS, 'text');
      lkTxt.setAttribute('x', String(c.emojiX + 13));
      lkTxt.setAttribute('y', String(c.emojiY));
      lkTxt.setAttribute('text-anchor', 'middle'); lkTxt.setAttribute('font-size', '10');
      lkTxt.textContent = '🔒';
      g.appendChild(lkTxt);
    }

    g.style.cursor = 'pointer';
    g.addEventListener('click', () => showContinentPanel(c));
    if (!c.locked) {
      g.addEventListener('mouseenter', () => {
        shape.setAttribute('fill', `${c.color}ee`);
        shape.setAttribute('stroke-width', '3');
        g.setAttribute('filter', 'url(#glow)');
      });
      g.addEventListener('mouseleave', () => {
        shape.setAttribute('fill', `${c.color}bb`);
        shape.setAttribute('stroke-width', '2');
        g.removeAttribute('filter');
      });
    }

    svg.appendChild(g);
  });

  // ── Crâne central One Piece ──
  const skull = document.createElementNS(svgNS, 'text');
  skull.setAttribute('x', '360'); skull.setAttribute('y', '216');
  skull.setAttribute('text-anchor', 'middle'); skull.setAttribute('font-size', '24');
  skull.setAttribute('opacity', '0.4');
  skull.textContent = '☠️';
  svg.appendChild(skull);
  const skullLbl = document.createElementNS(svgNS, 'text');
  skullLbl.setAttribute('x', '360'); skullLbl.setAttribute('y', '232');
  skullLbl.setAttribute('text-anchor', 'middle');
  skullLbl.setAttribute('font-family', 'Bangers, cursive');
  skullLbl.setAttribute('font-size', '8'); skullLbl.setAttribute('letter-spacing', '3');
  skullLbl.setAttribute('fill', 'rgba(255,215,0,0.3)');
  skullLbl.textContent = 'ONE PIECE';
  svg.appendChild(skullLbl);

  // ── Boussole ──
  const cx = 660, cy = 345;
  const compassG = document.createElementNS(svgNS, 'g');
  const compassCirc = document.createElementNS(svgNS, 'circle');
  compassCirc.setAttribute('cx', cx); compassCirc.setAttribute('cy', cy); compassCirc.setAttribute('r', '22');
  compassCirc.setAttribute('fill', 'rgba(0,0,0,0.5)');
  compassCirc.setAttribute('stroke', 'rgba(139,105,20,0.5)'); compassCirc.setAttribute('stroke-width', '1.5');
  compassG.appendChild(compassCirc);
  [['N', 0, -14, '#e63946'], ['S', 0, 14, '#aaa'], ['E', 14, 0, '#aaa'], ['O', -14, 0, '#aaa']].forEach(([lbl, dx, dy, col]) => {
    const t = document.createElementNS(svgNS, 'text');
    t.setAttribute('x', cx + dx); t.setAttribute('y', cy + dy + 3);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', 'Bangers, cursive'); t.setAttribute('font-size', '8');
    t.setAttribute('fill', col); t.textContent = lbl;
    compassG.appendChild(t);
  });
  const compassStar = document.createElementNS(svgNS, 'text');
  compassStar.setAttribute('x', cx); compassStar.setAttribute('y', cy + 4);
  compassStar.setAttribute('text-anchor', 'middle'); compassStar.setAttribute('font-size', '10');
  compassStar.setAttribute('fill', 'rgba(255,215,0,0.5)'); compassStar.textContent = '✦';
  compassG.appendChild(compassStar);
  svg.appendChild(compassG);

  container.appendChild(svg);
}

function showContinentPanel(c) {
  let overlay = document.getElementById('globe-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'globe-overlay';
    overlay.onclick = hideContinentPanel;
    document.body.appendChild(overlay);
  }
  overlay.classList.add('visible');

  const panel = document.getElementById('globe-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="gp-header">
      <div class="gp-emoji">${c.emoji}</div>
      <div>
        <div class="gp-name">${c.name}</div>
        <div class="gp-universe" style="color:${c.color}">${c.universe}</div>
      </div>
      <button class="gp-close" onclick="hideContinentPanel()">✕</button>
    </div>
    <div class="gp-subject">📚 ${c.subject}</div>
    <div class="gp-desc">${c.desc}</div>
    <div class="gp-chars">
      ${c.chars.map((ch, i) => `
        <span class="gp-char-badge" style="border-color:${c.charColors[i]}55;color:${c.charColors[i]}">
          👤 ${ch}
        </span>`).join('')}
    </div>
    ${c.locked
      ? `<div class="gp-locked-msg">🔒 Bientôt disponible !</div>`
      : `<button class="gp-play-btn"
           style="background:linear-gradient(135deg,${c.color},${c.color}99)"
           onclick="hideContinentPanel();document.getElementById('map-sec').scrollIntoView({behavior:'smooth'})">
           ⚔️ COMMENCER L'AVENTURE !
         </button>`
    }
  `;
  panel.classList.add('visible');
}

function hideContinentPanel() {
  document.getElementById('globe-panel')?.classList.remove('visible');
  document.getElementById('globe-overlay')?.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', buildTreasureMap);