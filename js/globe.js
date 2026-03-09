// ═══════════════════════════════════════════════════════
// CARTE AU TRÉSOR — Académie Pirate
// Continents style carte ancienne réaliste
// ═══════════════════════════════════════════════════════

const CONTINENTS = [
  {
    id: 'french', name: 'Grand Bleu', subject: 'Français', universe: 'One Piece',
    emoji: '🏴‍☠️', color: '#e63946',
    chars: ['Nami', 'Luffy', 'Robin'], charColors: ['#f59e0b','#e63946','#6366f1'],
    desc: "Maîtrise la grammaire avec l'équipage Chapeau de Paille !",
    locked: false,
    // Amérique (Nord+Sud)
    path: `M 82,48 C 88,42 102,40 114,44 C 126,48 132,56 134,66
           C 136,76 130,84 138,92 C 146,100 148,110 144,120
           C 140,130 130,138 128,150 C 126,162 132,172 128,182
           C 124,192 112,198 104,194 C 96,190 90,180 88,168
           C 86,156 90,144 86,132 C 82,120 72,114 70,102
           C 68,90 74,78 82,48 Z
           M 104,202 C 110,198 120,200 124,208 C 128,216 124,228 118,236
           C 112,244 102,248 96,242 C 90,236 92,224 96,214
           C 98,208 100,204 104,202 Z`,
    labelX: 104, labelY: 110, subX: 104, subY: 124, emojiX: 88, emojiY: 62,
  },
  {
    id: 'math', name: 'Pays du Feu', subject: 'Maths', universe: 'Naruto',
    emoji: '⚔️', color: '#ff6b35',
    chars: ['Sakura','Naruto','Tsunade'], charColors: ['#ec4899','#f97316','#eab308'],
    desc: 'Entraîne-toi aux calculs comme un vrai ninja !',
    locked: true,
    // Europe
    path: `M 268,52 C 276,46 288,44 298,48 C 308,52 314,62 318,72
           C 322,82 320,94 316,102 C 312,110 304,116 310,124
           C 316,132 320,142 316,150 C 312,158 300,162 290,158
           C 280,154 274,144 272,132 C 270,120 274,108 270,98
           C 266,88 258,80 260,68 C 262,58 264,54 268,52 Z
           M 296,52 C 304,46 318,44 326,50 C 334,56 332,68 326,72
           C 320,76 310,72 304,66 C 298,60 294,54 296,52 Z`,
    labelX: 293, labelY: 104, subX: 293, subY: 118, emojiX: 278, emojiY: 66,
  },
  {
    id: 'history', name: 'Magnolia', subject: 'Histoire', universe: 'Fairy Tail',
    emoji: '✨', color: '#8b5cf6',
    chars: ['Erza','Lucy','Wendy'], charColors: ['#ef4444','#eab308','#3b82f6'],
    desc: 'Voyage dans le temps avec la guilde Fairy Tail !',
    locked: true,
    // Afrique
    path: `M 310,168 C 320,160 336,158 348,164 C 360,170 366,184 366,198
           C 366,212 360,226 366,238 C 372,250 374,264 368,276
           C 362,288 348,296 336,292 C 324,288 316,276 312,262
           C 308,248 310,232 308,218 C 306,204 304,192 310,168 Z`,
    labelX: 337, labelY: 228, subX: 337, subY: 242, emojiX: 322, emojiY: 178,
  },
  {
    id: 'science', name: 'Kanto', subject: 'Sciences', universe: 'Pokémon',
    emoji: '🌿', color: '#22c55e',
    chars: ['Misty','Dawn','May'], charColors: ['#ef4444','#3b82f6','#ec4899'],
    desc: 'Explore la nature et les créatures avec tes Pokémon !',
    locked: true,
    // Asie
    path: `M 420,44 C 436,36 460,34 478,42 C 496,50 506,66 510,84
           C 514,102 508,120 514,136 C 520,152 524,168 516,180
           C 508,192 490,198 472,196 C 454,194 438,184 428,170
           C 418,156 416,138 420,122 C 424,106 432,94 428,78
           C 424,64 416,50 420,44 Z
           M 490,60 C 500,54 514,54 520,62 C 526,70 522,82 514,86
           C 506,90 496,86 492,78 C 488,70 486,64 490,60 Z
           M 508,100 C 518,96 530,98 534,106 C 538,114 532,124 524,126
           C 516,128 508,122 506,114 C 504,108 504,102 508,100 Z`,
    labelX: 472, labelY: 122, subX: 472, subY: 136, emojiX: 454, emojiY: 56,
  },
  {
    id: 'geography', name: 'Namek', subject: 'Géographie', universe: 'Dragon Ball Z',
    emoji: '💥', color: '#3b82f6',
    chars: ['Bulma','Android 18','Videl'], charColors: ['#3b82f6','#6366f1','#ec4899'],
    desc: "Parcours l'univers avec Goku et ses amis !",
    locked: true,
    // Océanie + Antarctique stylisé
    path: `M 490,222 C 502,214 518,214 528,222 C 538,230 540,246 534,258
           C 528,270 514,276 502,272 C 490,268 484,254 486,240
           C 487,232 488,226 490,222 Z
           M 524,238 C 534,232 548,234 554,244 C 560,254 556,268 546,272
           C 536,276 524,270 520,260 C 516,250 518,242 524,238 Z`,
    labelX: 518, labelY: 248, subX: 518, subY: 262, emojiX: 500, emojiY: 228,
  }
];

function buildTreasureMap() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  container.id = 'treasure-map';
  container.style.cssText = '';
  container.innerHTML = '';

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 620 310');
  svg.style.cssText = 'width:100%;height:auto;display:block;';

  // ── Defs ──
  const defs = document.createElementNS(svgNS, 'defs');

  // Gradient fond océan
  const oceanGrad = document.createElementNS(svgNS, 'radialGradient');
  oceanGrad.id = 'ocean'; oceanGrad.setAttribute('cx','50%'); oceanGrad.setAttribute('cy','50%'); oceanGrad.setAttribute('r','80%');
  [['0%','#0d1f35'],['60%','#071424'],['100%','#030a12']].forEach(([o,c])=>{
    const s = document.createElementNS(svgNS,'stop'); s.setAttribute('offset',o); s.setAttribute('stop-color',c); oceanGrad.appendChild(s);
  });
  defs.appendChild(oceanGrad);

  // Glow filter
  const glowF = document.createElementNS(svgNS,'filter'); glowF.id='glow';
  glowF.setAttribute('x','-30%'); glowF.setAttribute('y','-30%');
  glowF.setAttribute('width','160%'); glowF.setAttribute('height','160%');
  const feB = document.createElementNS(svgNS,'feGaussianBlur');
  feB.setAttribute('stdDeviation','4'); feB.setAttribute('result','blur');
  const feM = document.createElementNS(svgNS,'feMerge');
  const n1 = document.createElementNS(svgNS,'feMergeNode'); n1.setAttribute('in','blur');
  const n2 = document.createElementNS(svgNS,'feMergeNode'); n2.setAttribute('in','SourceGraphic');
  feM.appendChild(n1); feM.appendChild(n2); glowF.appendChild(feB); glowF.appendChild(feM);
  defs.appendChild(glowF);

  svg.appendChild(defs);

  // ── Fond océan ──
  const bg = document.createElementNS(svgNS,'rect');
  bg.setAttribute('width','620'); bg.setAttribute('height','310');
  bg.setAttribute('fill','url(#ocean)');
  svg.appendChild(bg);

  // ── Grille de navigation ──
  for(let x=40;x<620;x+=40){
    const l=document.createElementNS(svgNS,'line');
    l.setAttribute('x1',x);l.setAttribute('y1',0);l.setAttribute('x2',x);l.setAttribute('y2',310);
    l.setAttribute('stroke','rgba(100,160,220,0.07)');l.setAttribute('stroke-width','0.5');
    svg.appendChild(l);
  }
  for(let y=40;y<310;y+=40){
    const l=document.createElementNS(svgNS,'line');
    l.setAttribute('x1',0);l.setAttribute('y1',y);l.setAttribute('x2',620);l.setAttribute('y2',y);
    l.setAttribute('stroke','rgba(100,160,220,0.07)');l.setAttribute('stroke-width','0.5');
    svg.appendChild(l);
  }

  // ── Vagues décoratives ──
  const waveD = [
    'M 10,30 Q 30,24 50,30 Q 70,36 90,30',
    'M 160,20 Q 185,14 210,20',
    'M 380,15 Q 405,9 430,15',
    'M 550,25 Q 575,19 600,25',
    'M 10,160 Q 35,154 60,160',
    'M 200,155 Q 225,149 250,155',
    'M 570,160 Q 595,154 615,160',
    'M 10,280 Q 40,274 70,280 Q 100,286 130,280',
    'M 400,290 Q 430,284 460,290',
    'M 560,275 Q 585,269 610,275',
  ];
  waveD.forEach(d=>{
    const p=document.createElementNS(svgNS,'path');
    p.setAttribute('d',d); p.setAttribute('fill','none');
    p.setAttribute('stroke','rgba(59,130,246,0.3)'); p.setAttribute('stroke-width','1.2');
    svg.appendChild(p);
  });

  // ── Titre carte ──
  const mapTitle = document.createElementNS(svgNS,'text');
  mapTitle.setAttribute('x','310'); mapTitle.setAttribute('y','16');
  mapTitle.setAttribute('text-anchor','middle');
  mapTitle.setAttribute('font-family','Bangers, cursive');
  mapTitle.setAttribute('font-size','9'); mapTitle.setAttribute('letter-spacing','3');
  mapTitle.setAttribute('fill','rgba(255,215,0,0.3)');
  mapTitle.textContent = '— GRAND LINE — ☠ — ONE PIECE —';
  svg.appendChild(mapTitle);

  // ── Continents ──
  CONTINENTS.forEach(c => {
    const g = document.createElementNS(svgNS,'g');
    g.style.cursor = 'pointer';

    // Ombre
    const shadow = document.createElementNS(svgNS,'path');
    shadow.setAttribute('d', c.path);
    shadow.setAttribute('fill','rgba(0,0,0,0.45)');
    shadow.setAttribute('transform','translate(4,4)');
    g.appendChild(shadow);

    // Corps du continent
    const shape = document.createElementNS(svgNS,'path');
    shape.setAttribute('d', c.path);
    shape.setAttribute('fill', c.locked ? `${c.color}40` : `${c.color}cc`);
    shape.setAttribute('stroke', c.locked ? 'rgba(255,255,255,0.12)' : `${c.color}`);
    shape.setAttribute('stroke-width','1.5');
    shape.setAttribute('stroke-linejoin','round');
    g.appendChild(shape);

    // Relief (highlight intérieur)
    const highlight = document.createElementNS(svgNS,'path');
    highlight.setAttribute('d', c.path);
    highlight.setAttribute('fill','none');
    highlight.setAttribute('stroke','rgba(255,255,255,0.12)');
    highlight.setAttribute('stroke-width','4');
    highlight.setAttribute('stroke-linejoin','round');
    g.appendChild(highlight);

    // Emoji
    const em = document.createElementNS(svgNS,'text');
    em.setAttribute('x', c.emojiX); em.setAttribute('y', c.emojiY);
    em.setAttribute('text-anchor','middle'); em.setAttribute('font-size','14');
    em.textContent = c.emoji;
    g.appendChild(em);

    // Nom continent
    const lbl = document.createElementNS(svgNS,'text');
    lbl.setAttribute('x', c.labelX); lbl.setAttribute('y', c.labelY);
    lbl.setAttribute('text-anchor','middle');
    lbl.setAttribute('font-family','Bangers, cursive');
    lbl.setAttribute('font-size','11'); lbl.setAttribute('letter-spacing','1');
    lbl.setAttribute('fill', c.locked ? 'rgba(255,255,255,0.4)' : '#fff');
    lbl.setAttribute('stroke','rgba(0,0,0,0.8)'); lbl.setAttribute('stroke-width','3');
    lbl.setAttribute('paint-order','stroke');
    lbl.textContent = c.name;
    g.appendChild(lbl);

    // Matière
    const sub = document.createElementNS(svgNS,'text');
    sub.setAttribute('x', c.subX); sub.setAttribute('y', c.subY);
    sub.setAttribute('text-anchor','middle');
    sub.setAttribute('font-family','Nunito, sans-serif');
    sub.setAttribute('font-size','8'); sub.setAttribute('font-weight','800');
    sub.setAttribute('letter-spacing','1.5');
    sub.setAttribute('fill', c.locked ? 'rgba(255,255,255,0.3)' : '#ffd700');
    sub.setAttribute('stroke','rgba(0,0,0,0.8)'); sub.setAttribute('stroke-width','2');
    sub.setAttribute('paint-order','stroke');
    sub.textContent = c.subject.toUpperCase();
    g.appendChild(sub);

    // Verrou
    if(c.locked){
      const lkC = document.createElementNS(svgNS,'circle');
      lkC.setAttribute('cx', String(Number(c.emojiX)+14));
      lkC.setAttribute('cy', String(Number(c.emojiY)-4));
      lkC.setAttribute('r','7');
      lkC.setAttribute('fill','rgba(0,0,0,0.75)');
      lkC.setAttribute('stroke','rgba(255,255,255,0.2)'); lkC.setAttribute('stroke-width','1');
      g.appendChild(lkC);
      const lkT = document.createElementNS(svgNS,'text');
      lkT.setAttribute('x', String(Number(c.emojiX)+14));
      lkT.setAttribute('y', String(Number(c.emojiY)));
      lkT.setAttribute('text-anchor','middle'); lkT.setAttribute('font-size','9');
      lkT.textContent = '🔒';
      g.appendChild(lkT);
    }

    // Hover
    if(!c.locked){
      g.addEventListener('mouseenter',()=>{
        shape.setAttribute('fill',`${c.color}ff`);
        g.setAttribute('filter','url(#glow)');
      });
      g.addEventListener('mouseleave',()=>{
        shape.setAttribute('fill',`${c.color}cc`);
        g.removeAttribute('filter');
      });
    }
    g.addEventListener('click',()=> showContinentPanel(c));
    svg.appendChild(g);
  });

  // ── Crâne central ──
  const skull = document.createElementNS(svgNS,'text');
  skull.setAttribute('x','310'); skull.setAttribute('y','175');
  skull.setAttribute('text-anchor','middle'); skull.setAttribute('font-size','20');
  skull.setAttribute('opacity','0.25'); skull.textContent='☠️';
  svg.appendChild(skull);

  // ── Boussole ──
  const cx=578, cy=278;
  const compG = document.createElementNS(svgNS,'g');
  const compC = document.createElementNS(svgNS,'circle');
  compC.setAttribute('cx',cx); compC.setAttribute('cy',cy); compC.setAttribute('r','18');
  compC.setAttribute('fill','rgba(0,0,0,0.5)');
  compC.setAttribute('stroke','rgba(139,105,20,0.5)'); compC.setAttribute('stroke-width','1');
  compG.appendChild(compC);
  [['N',0,-12,'#e63946'],['S',0,12,'#777'],['E',12,0,'#777'],['O',-12,0,'#777']].forEach(([l,dx,dy,col])=>{
    const t=document.createElementNS(svgNS,'text');
    t.setAttribute('x',cx+dx); t.setAttribute('y',cy+dy+3);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','Bangers, cursive'); t.setAttribute('font-size','7');
    t.setAttribute('fill',col); t.textContent=l; compG.appendChild(t);
  });
  const cStar=document.createElementNS(svgNS,'text');
  cStar.setAttribute('x',cx); cStar.setAttribute('y',cy+3);
  cStar.setAttribute('text-anchor','middle'); cStar.setAttribute('font-size','8');
  cStar.setAttribute('fill','rgba(255,215,0,0.5)'); cStar.textContent='✦';
  compG.appendChild(cStar);
  svg.appendChild(compG);

  container.appendChild(svg);
}

function showContinentPanel(c) {
  let overlay = document.getElementById('globe-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'globe-overlay';
    overlay.onclick = hideContinentPanel;
    document.body.appendChild(overlay);
  }
  overlay.classList.add('visible');

  const panel = document.getElementById('globe-panel');
  if(!panel) return;

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
      ${c.chars.map((ch,i)=>`
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