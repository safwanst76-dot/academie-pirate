// ═══════════════════════════════════════════════════════
// CARTE AU TRÉSOR v4 — Style parchemin pirate
// Fond beige/doré usé + continents + décos One Piece
// ═══════════════════════════════════════════════════════

const CONTINENTS = [
  {
    id: 'french', name: 'Grand Bleu', subject: 'Français', universe: 'One Piece',
    emoji: '🏴‍☠️', color: '#c0392b', fillColor: '#c8774a',
    chars: ['Nami','Luffy','Robin'], charColors: ['#f59e0b','#e63946','#6366f1'],
    desc: "Maîtrise la grammaire avec l'équipage Chapeau de Paille !",
    locked: false,
    // Amériques
    path: `M85,35 C90,28 102,26 110,30 C118,34 121,44 120,52 C124,57 129,62 130,70
           C131,78 127,87 122,93 C127,99 130,108 127,116 C124,124 115,128 111,136
           C114,143 113,153 108,160 C103,167 95,170 91,177 C88,184 89,194 85,201
           C81,208 73,212 69,219 C65,226 64,236 60,243 C56,250 48,254 45,261
           C42,268 44,277 40,283 C36,289 28,291 25,287 C22,283 24,275 27,269
           C23,263 21,254 24,247 C27,240 34,236 36,230 C33,223 32,214 35,207
           C38,200 45,196 48,189 C45,182 43,173 46,166 C49,159 56,155 59,148
           C62,141 62,131 67,125 C72,119 80,116 84,110 C88,104 87,94 90,88
           C86,82 83,74 86,67 C89,60 88,48 85,35Z
           M28,295 C32,290 39,289 43,293 C47,297 47,306 43,310
           C39,314 32,312 29,308 C26,304 26,298 28,295Z`,
    labelX: 80, labelY: 125, subX: 80, subY: 138, emojiX: 64, emojiY: 50,
  },
  {
    id: 'math', name: 'Pays du Feu', subject: 'Maths', universe: 'Naruto',
    emoji: '⚔️', color: '#8B4513', fillColor: '#c8a96e',
    chars: ['Sakura','Naruto','Tsunade'], charColors: ['#ec4899','#f97316','#eab308'],
    desc: 'Entraîne-toi aux calculs comme un vrai ninja !',
    locked: true,
    // Europe
    path: `M245,42 C250,36 260,34 268,38 C276,42 279,52 277,60
           C281,65 287,69 287,76 C287,83 282,90 278,95
           C282,99 285,106 282,113 C279,120 271,124 265,121
           C268,128 267,136 262,141 C257,146 249,147 244,142
           C239,137 239,129 242,123 C237,118 233,111 235,104
           C232,98 228,90 230,83 C232,76 239,72 243,66
           C239,60 236,52 239,46 C241,40 244,42 245,42Z
           M266,40 C271,34 281,33 286,39 C291,45 289,56 283,60
           C277,64 270,60 267,54 C264,48 264,43 266,40Z`,
    labelX: 260, labelY: 95, subX: 260, subY: 108, emojiX: 244, emojiY: 52,
  },
  {
    id: 'history', name: 'Magnolia', subject: 'Histoire', universe: 'Fairy Tail',
    emoji: '✨', color: '#6B3FA0', fillColor: '#b8a0d8',
    chars: ['Erza','Lucy','Wendy'], charColors: ['#ef4444','#eab308','#3b82f6'],
    desc: 'Voyage dans le temps avec la guilde Fairy Tail !',
    locked: true,
    // Afrique
    path: `M278,150 C284,143 295,140 304,144 C313,148 318,159 318,169
           C323,176 329,182 329,191 C329,200 323,208 321,217
           C325,225 326,235 322,244 C318,253 309,258 303,256
           C297,265 291,272 284,270 C277,268 273,260 271,251
           C267,243 265,234 267,225 C264,217 260,208 262,199
           C264,190 270,184 273,175 C270,167 268,157 272,150 C273,147 276,150 278,150Z`,
    labelX: 295, labelY: 210, subX: 295, subY: 223, emojiX: 280, emojiY: 158,
  },
  {
    id: 'science', name: 'Kanto', subject: 'Sciences', universe: 'Pokémon',
    emoji: '🌿', color: '#1a6b35', fillColor: '#7ab87a',
    chars: ['Misty','Dawn','May'], charColors: ['#ef4444','#3b82f6','#ec4899'],
    desc: 'Explore la nature et les créatures avec tes Pokémon !',
    locked: true,
    // Asie
    path: `M358,32 C367,25 382,23 395,30 C408,37 415,51 417,65
           C423,71 431,77 433,86 C435,95 430,106 424,113
           C429,120 432,130 429,139 C426,148 416,153 409,150
           C412,158 411,168 404,174 C397,180 387,180 381,175
           C376,182 368,188 360,184 C352,180 349,170 351,161
           C346,155 340,147 341,138 C337,131 332,122 334,113
           C330,106 326,97 329,88 C332,79 341,74 346,67
           C341,60 338,51 342,44 C345,37 354,34 358,32Z
           M410,34 C417,27 429,27 435,34 C441,41 439,54 432,58
           C425,62 416,58 413,51 C410,44 408,38 410,34Z
           M436,80 C443,73 456,73 461,81 C466,89 463,102 455,106
           C447,110 437,105 434,97 C431,89 431,83 436,80Z`,
    labelX: 388, labelY: 118, subX: 388, subY: 131, emojiX: 369, emojiY: 44,
  },
  {
    id: 'geography', name: 'Namek', subject: 'Géographie', universe: 'Dragon Ball Z',
    emoji: '💥', color: '#1a3a8b', fillColor: '#6a9ad4',
    chars: ['Bulma','Android 18','Videl'], charColors: ['#3b82f6','#6366f1','#ec4899'],
    desc: "Parcours l'univers avec Goku et ses amis !",
    locked: true,
    // Australie
    path: `M448,202 C457,193 473,191 486,198 C499,205 506,221 503,236
           C500,251 488,262 476,264 C464,266 451,257 446,244
           C441,231 441,211 448,202Z
           M492,185 C499,178 513,178 520,187 C527,196 523,210 515,214
           C507,218 496,213 493,204 C490,195 487,189 492,185Z
           M524,218 C530,211 542,211 547,219 C552,227 549,240 541,244
           C533,248 522,243 520,234 C518,225 520,222 524,218Z`,
    labelX: 488, labelY: 230, subX: 488, subY: 243, emojiX: 458, emojiY: 208,
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
  svg.setAttribute('viewBox', '0 0 580 320');
  svg.style.cssText = 'width:100%;height:auto;display:block;';

  // ── DEFS ──
  const defs = document.createElementNS(svgNS, 'defs');

  // Gradient parchemin fond
  const pg = document.createElementNS(svgNS,'radialGradient');
  pg.id='parchment'; pg.setAttribute('cx','50%'); pg.setAttribute('cy','45%'); pg.setAttribute('r','75%');
  [['0%','#d4b483'],['40%','#c8a55a'],['75%','#b8923a'],['100%','#8B6914']].forEach(([o,c])=>{
    const s=document.createElementNS(svgNS,'stop'); s.setAttribute('offset',o); s.setAttribute('stop-color',c); pg.appendChild(s);
  });
  defs.appendChild(pg);

  // Gradient océan (eau sur parchemin = bleu pastel ancien)
  const og = document.createElementNS(svgNS,'radialGradient');
  og.id='ocean'; og.setAttribute('cx','40%'); og.setAttribute('cy','40%'); og.setAttribute('r','80%');
  [['0%','#8ab4c8'],['60%','#6a9ab8'],['100%','#4a7a98']].forEach(([o,c])=>{
    const s=document.createElementNS(svgNS,'stop'); s.setAttribute('offset',o); s.setAttribute('stop-color',c); og.appendChild(s);
  });
  defs.appendChild(og);

  // Glow filter
  const gf=document.createElementNS(svgNS,'filter'); gf.id='glow';
  gf.setAttribute('x','-30%'); gf.setAttribute('y','-30%'); gf.setAttribute('width','160%'); gf.setAttribute('height','160%');
  const fb=document.createElementNS(svgNS,'feGaussianBlur'); fb.setAttribute('stdDeviation','4'); fb.setAttribute('result','blur');
  const fm=document.createElementNS(svgNS,'feMerge');
  [['blur'],['SourceGraphic']].forEach(([i])=>{
    const n=document.createElementNS(svgNS,'feMergeNode'); n.setAttribute('in',i); fm.appendChild(n);
  });
  gf.appendChild(fb); gf.appendChild(fm); defs.appendChild(gf);

  // Texture hachures continents
  const pat=document.createElementNS(svgNS,'pattern'); pat.id='relief';
  pat.setAttribute('patternUnits','userSpaceOnUse'); pat.setAttribute('width','8'); pat.setAttribute('height','8');
  pat.setAttribute('patternTransform','rotate(30)');
  const pl=document.createElementNS(svgNS,'line'); pl.setAttribute('x1','0'); pl.setAttribute('y1','0');
  pl.setAttribute('x2','0'); pl.setAttribute('y2','8'); pl.setAttribute('stroke','rgba(0,0,0,0.08)'); pl.setAttribute('stroke-width','1');
  pat.appendChild(pl); defs.appendChild(pat);

  svg.appendChild(defs);

  // ── FOND PARCHEMIN ──
  const bg=document.createElementNS(svgNS,'rect'); bg.setAttribute('width','580'); bg.setAttribute('height','320');
  bg.setAttribute('fill','url(#parchment)'); svg.appendChild(bg);

  // ── OCÉAN (rectangle intérieur légèrement teinté) ──
  const ocean=document.createElementNS(svgNS,'rect'); ocean.setAttribute('x','12'); ocean.setAttribute('y','12');
  ocean.setAttribute('width','556'); ocean.setAttribute('height','296'); ocean.setAttribute('rx','4');
  ocean.setAttribute('fill','url(#ocean)'); ocean.setAttribute('opacity','0.55'); svg.appendChild(ocean);

  // ── BORDURE PARCHEMIN usée ──
  // Bord extérieur décoratif
  const border=document.createElementNS(svgNS,'rect'); border.setAttribute('x','4'); border.setAttribute('y','4');
  border.setAttribute('width','572'); border.setAttribute('height','312'); border.setAttribute('rx','6');
  border.setAttribute('fill','none'); border.setAttribute('stroke','#6b4c10'); border.setAttribute('stroke-width','3');
  svg.appendChild(border);
  const border2=document.createElementNS(svgNS,'rect'); border2.setAttribute('x','8'); border2.setAttribute('y','8');
  border2.setAttribute('width','564'); border2.setAttribute('height','304'); border2.setAttribute('rx','4');
  border2.setAttribute('fill','none'); border2.setAttribute('stroke','#8B6914'); border2.setAttribute('stroke-width','1');
  border2.setAttribute('opacity','0.6'); svg.appendChild(border2);

  // ── COINS DÉCORATION ──
  [
    [18,18], [562,18], [18,302], [562,302]
  ].forEach(([x,y])=>{
    const c=document.createElementNS(svgNS,'circle'); c.setAttribute('cx',x); c.setAttribute('cy',y); c.setAttribute('r','5');
    c.setAttribute('fill','none'); c.setAttribute('stroke','#6b4c10'); c.setAttribute('stroke-width','1.5'); svg.appendChild(c);
  });

  // ── GRILLE NAVIGATION style ancien ──
  for(let x=40;x<580;x+=40){
    const l=document.createElementNS(svgNS,'line'); l.setAttribute('x1',x); l.setAttribute('y1',0); l.setAttribute('x2',x); l.setAttribute('y2',320);
    l.setAttribute('stroke','rgba(80,50,10,0.12)'); l.setAttribute('stroke-width','0.5'); l.setAttribute('stroke-dasharray','2,6'); svg.appendChild(l);
  }
  for(let y=40;y<320;y+=40){
    const l=document.createElementNS(svgNS,'line'); l.setAttribute('x1',0); l.setAttribute('y1',y); l.setAttribute('x2',580); l.setAttribute('y2',y);
    l.setAttribute('stroke','rgba(80,50,10,0.12)'); l.setAttribute('stroke-width','0.5'); l.setAttribute('stroke-dasharray','2,6'); svg.appendChild(l);
  }

  // ── VAGUES style parchemin ──
  ['M20,35 Q45,28 70,35 Q95,42 120,35','M200,22 Q228,15 256,22','M320,18 Q348,11 376,18','M440,28 Q465,21 490,28',
   'M20,160 Q48,153 76,160','M220,155 Q248,148 276,155','M460,158 Q488,151 516,158',
   'M20,285 Q50,278 80,285 Q110,292 140,285','M350,290 Q378,283 406,290','M480,280 Q508,273 536,280'].forEach(d=>{
    const p=document.createElementNS(svgNS,'path'); p.setAttribute('d',d); p.setAttribute('fill','none');
    p.setAttribute('stroke','rgba(30,80,130,0.35)'); p.setAttribute('stroke-width','1.5'); svg.appendChild(p);
  });

  // ── TITRE CARTE ──
  // Bandeau titre style parchemin
  const titleBg=document.createElementNS(svgNS,'rect'); titleBg.setAttribute('x','185'); titleBg.setAttribute('y','6');
  titleBg.setAttribute('width','210'); titleBg.setAttribute('height','20'); titleBg.setAttribute('rx','3');
  titleBg.setAttribute('fill','rgba(107,76,16,0.3)'); svg.appendChild(titleBg);
  const tt=document.createElementNS(svgNS,'text'); tt.setAttribute('x','290'); tt.setAttribute('y','20');
  tt.setAttribute('text-anchor','middle'); tt.setAttribute('font-family','Bangers, cursive');
  tt.setAttribute('font-size','10'); tt.setAttribute('letter-spacing','3'); tt.setAttribute('fill','rgba(60,30,5,0.7)');
  tt.textContent='— GRAND LINE — ☠ — ONE PIECE —'; svg.appendChild(tt);

  // ── DÉCO : Poulpe/Kraken coin bas gauche ──
  const kraken=document.createElementNS(svgNS,'text'); kraken.setAttribute('x','165'); kraken.setAttribute('y','300');
  kraken.setAttribute('font-size','28'); kraken.setAttribute('opacity','0.25'); kraken.textContent='🐙'; svg.appendChild(kraken);

  // ── DÉCO : Bateau pirate ──
  const ship=document.createElementNS(svgNS,'text'); ship.setAttribute('x','198'); ship.setAttribute('y','62');
  ship.setAttribute('font-size','22'); ship.setAttribute('opacity','0.35'); ship.textContent='⛵'; svg.appendChild(ship);

  // ── DÉCO : Bateau 2 ──
  const ship2=document.createElementNS(svgNS,'text'); ship2.setAttribute('x','480'); ship2.setAttribute('y','170');
  ship2.setAttribute('font-size','18'); ship2.setAttribute('opacity','0.3'); ship2.textContent='🚢'; svg.appendChild(ship2);

  // ── LUFFY (tête de Luffy) ──
  // Chapeau de paille stylisé + visage SVG
  const luffyG = document.createElementNS(svgNS,'g');
  luffyG.setAttribute('transform','translate(275,155)');
  luffyG.setAttribute('opacity','0.4');
  // Chapeau
  const hat=document.createElementNS(svgNS,'ellipse'); hat.setAttribute('cx','0'); hat.setAttribute('cy','-18');
  hat.setAttribute('rx','22'); hat.setAttribute('ry','8'); hat.setAttribute('fill','#d4a017'); hat.setAttribute('stroke','#8B6914'); hat.setAttribute('stroke-width','1.5'); luffyG.appendChild(hat);
  const hatTop=document.createElementNS(svgNS,'ellipse'); hatTop.setAttribute('cx','0'); hatTop.setAttribute('cy','-22');
  hatTop.setAttribute('rx','14'); hatTop.setAttribute('ry','6'); hatTop.setAttribute('fill','#c8900a'); luffyG.appendChild(hatTop);
  const hatBand=document.createElementNS(svgNS,'line'); hatBand.setAttribute('x1','-22'); hatBand.setAttribute('y1','-18');
  hatBand.setAttribute('x2','22'); hatBand.setAttribute('y2','-18'); hatBand.setAttribute('stroke','#e63946'); hatBand.setAttribute('stroke-width','2'); luffyG.appendChild(hatBand);
  // Visage
  const face=document.createElementNS(svgNS,'circle'); face.setAttribute('cx','0'); face.setAttribute('cy','-4');
  face.setAttribute('r','14'); face.setAttribute('fill','#e8c090'); face.setAttribute('stroke','#8B6914'); face.setAttribute('stroke-width','1'); luffyG.appendChild(face);
  // Sourire
  const smile=document.createElementNS(svgNS,'path'); smile.setAttribute('d','M -6,2 Q 0,8 6,2');
  smile.setAttribute('fill','none'); smile.setAttribute('stroke','#5a3010'); smile.setAttribute('stroke-width','1.5'); smile.setAttribute('stroke-linecap','round'); luffyG.appendChild(smile);
  // Yeux
  [-5,5].forEach(x=>{
    const eye=document.createElementNS(svgNS,'circle'); eye.setAttribute('cx',x); eye.setAttribute('cy','-7');
    eye.setAttribute('r','2.5'); eye.setAttribute('fill','#1a0a00'); luffyG.appendChild(eye);
  });
  // Cicatrice
  const scar=document.createElementNS(svgNS,'line'); scar.setAttribute('x1','5'); scar.setAttribute('y1','-4');
  scar.setAttribute('x2','7'); scar.setAttribute('y2','0'); scar.setAttribute('stroke','#e63946'); scar.setAttribute('stroke-width','1.5'); scar.setAttribute('stroke-linecap','round'); luffyG.appendChild(scar);
  svg.appendChild(luffyG);

  // ── X DU TRÉSOR (là où est le One Piece) ──
  const xMark=document.createElementNS(svgNS,'text'); xMark.setAttribute('x','290'); xMark.setAttribute('y','180');
  xMark.setAttribute('text-anchor','middle'); xMark.setAttribute('font-size','14');
  xMark.setAttribute('fill','#e63946'); xMark.setAttribute('opacity','0.6'); xMark.setAttribute('font-weight','bold');
  xMark.setAttribute('font-family','Bangers, cursive'); xMark.textContent='✕'; svg.appendChild(xMark);

  // Chemin pointillé vers le trésor
  const treasure_path=document.createElementNS(svgNS,'path');
  treasure_path.setAttribute('d','M 80,130 Q 150,200 230,185 Q 270,178 290,178');
  treasure_path.setAttribute('fill','none'); treasure_path.setAttribute('stroke','#e63946');
  treasure_path.setAttribute('stroke-width','1.5'); treasure_path.setAttribute('stroke-dasharray','4,3');
  treasure_path.setAttribute('opacity','0.5'); svg.appendChild(treasure_path);

  // ── CONTINENTS ──
  CONTINENTS.forEach(c=>{
    const g=document.createElementNS(svgNS,'g'); g.style.cursor='pointer';

    // Ombre portée
    const sh=document.createElementNS(svgNS,'path'); sh.setAttribute('d',c.path);
    sh.setAttribute('fill','rgba(0,0,0,0.25)'); sh.setAttribute('transform','translate(3,3)'); g.appendChild(sh);

    // Remplissage continent (couleur terre style parchemin)
    const sp=document.createElementNS(svgNS,'path'); sp.setAttribute('d',c.path);
    sp.setAttribute('fill', c.locked ? `${c.fillColor}70` : `${c.fillColor}ee`);
    sp.setAttribute('stroke', c.locked ? 'rgba(80,50,10,0.3)' : '#6b3a10');
    sp.setAttribute('stroke-width','1.5'); sp.setAttribute('stroke-linejoin','round'); g.appendChild(sp);

    // Relief hachures
    const hp=document.createElementNS(svgNS,'path'); hp.setAttribute('d',c.path);
    hp.setAttribute('fill','url(#relief)'); g.appendChild(hp);

    // Contour intérieur (effet elevation)
    const hl=document.createElementNS(svgNS,'path'); hl.setAttribute('d',c.path);
    hl.setAttribute('fill','none'); hl.setAttribute('stroke','rgba(255,220,150,0.4)');
    hl.setAttribute('stroke-width','2'); hl.setAttribute('stroke-linejoin','round'); g.appendChild(hl);

    // Couleur bordure matière (petit trait de couleur)
    if(!c.locked){
      const accent=document.createElementNS(svgNS,'path'); accent.setAttribute('d',c.path);
      accent.setAttribute('fill','none'); accent.setAttribute('stroke',c.color);
      accent.setAttribute('stroke-width','2.5'); accent.setAttribute('stroke-linejoin','round');
      accent.setAttribute('opacity','0.6'); g.appendChild(accent);
    }

    // Emoji
    const em=document.createElementNS(svgNS,'text'); em.setAttribute('x',c.emojiX); em.setAttribute('y',c.emojiY);
    em.setAttribute('text-anchor','middle'); em.setAttribute('font-size','13'); em.textContent=c.emoji; g.appendChild(em);

    // Nom continent
    const lb=document.createElementNS(svgNS,'text'); lb.setAttribute('x',c.labelX); lb.setAttribute('y',c.labelY);
    lb.setAttribute('text-anchor','middle'); lb.setAttribute('font-family','Bangers, cursive');
    lb.setAttribute('font-size','10'); lb.setAttribute('letter-spacing','1');
    lb.setAttribute('fill', c.locked ? 'rgba(60,30,5,0.45)' : 'rgba(40,15,0,0.9)');
    lb.setAttribute('stroke','rgba(255,220,150,0.6)'); lb.setAttribute('stroke-width','2.5'); lb.setAttribute('paint-order','stroke');
    lb.textContent=c.name; g.appendChild(lb);

    // Matière (en couleur vive)
    const sb=document.createElementNS(svgNS,'text'); sb.setAttribute('x',c.subX); sb.setAttribute('y',c.subY);
    sb.setAttribute('text-anchor','middle'); sb.setAttribute('font-family','Bangers, cursive');
    sb.setAttribute('font-size','8'); sb.setAttribute('letter-spacing','1.5');
    sb.setAttribute('fill', c.locked ? 'rgba(60,30,5,0.35)' : c.color);
    sb.setAttribute('stroke','rgba(255,220,150,0.7)'); sb.setAttribute('stroke-width','2'); sb.setAttribute('paint-order','stroke');
    sb.textContent=c.subject.toUpperCase(); g.appendChild(sb);

    // Verrou
    if(c.locked){
      const lc=document.createElementNS(svgNS,'circle');
      lc.setAttribute('cx',String(Number(c.emojiX)+14)); lc.setAttribute('cy',String(Number(c.emojiY)-5)); lc.setAttribute('r','7');
      lc.setAttribute('fill','rgba(107,76,16,0.8)'); lc.setAttribute('stroke','rgba(255,220,150,0.4)'); lc.setAttribute('stroke-width','1'); g.appendChild(lc);
      const lt=document.createElementNS(svgNS,'text');
      lt.setAttribute('x',String(Number(c.emojiX)+14)); lt.setAttribute('y',String(Number(c.emojiY)));
      lt.setAttribute('text-anchor','middle'); lt.setAttribute('font-size','9'); lt.textContent='🔒'; g.appendChild(lt);
    }

    // Hover
    if(!c.locked){
      g.addEventListener('mouseenter',()=>{ sp.setAttribute('fill',`${c.fillColor}`); g.setAttribute('filter','url(#glow)'); });
      g.addEventListener('mouseleave',()=>{ sp.setAttribute('fill',`${c.fillColor}ee`); g.removeAttribute('filter'); });
    }
    g.addEventListener('click',()=>showContinentPanel(c));
    svg.appendChild(g);
  });

  // ── BOUSSOLE style parchemin ──
  const cx=544, cy=288;
  const cg=document.createElementNS(svgNS,'g');
  // Fond boussole
  const cBg=document.createElementNS(svgNS,'circle'); cBg.setAttribute('cx',cx); cBg.setAttribute('cy',cy); cBg.setAttribute('r','24');
  cBg.setAttribute('fill','rgba(212,180,100,0.7)'); cBg.setAttribute('stroke','#6b4c10'); cBg.setAttribute('stroke-width','1.5'); cg.appendChild(cBg);
  const cBg2=document.createElementNS(svgNS,'circle'); cBg2.setAttribute('cx',cx); cBg2.setAttribute('cy',cy); cBg2.setAttribute('r','18');
  cBg2.setAttribute('fill','none'); cBg2.setAttribute('stroke','#6b4c10'); cBg2.setAttribute('stroke-width','1'); cBg2.setAttribute('opacity','0.5'); cg.appendChild(cBg2);
  // Flèches N/S
  const arrow=document.createElementNS(svgNS,'path');
  arrow.setAttribute('d',`M ${cx},${cy-18} L ${cx-4},${cy} L ${cx},${cy-6} Z`);
  arrow.setAttribute('fill','#e63946'); cg.appendChild(arrow);
  const arrow2=document.createElementNS(svgNS,'path');
  arrow2.setAttribute('d',`M ${cx},${cy+18} L ${cx-4},${cy} L ${cx},${cy+6} Z`);
  arrow2.setAttribute('fill','rgba(60,30,5,0.6)'); cg.appendChild(arrow2);
  const arrow3=document.createElementNS(svgNS,'path');
  arrow3.setAttribute('d',`M ${cx},${cy-18} L ${cx+4},${cy} L ${cx},${cy-6} Z`);
  arrow3.setAttribute('fill','rgba(60,30,5,0.4)'); cg.appendChild(arrow3);
  // Labels
  [['N',0,-20,'#e63946'],['S',0,24,'rgba(60,30,5,0.7)'],['E',22,3,'rgba(60,30,5,0.7)'],['O',-22,3,'rgba(60,30,5,0.7)']].forEach(([l,dx,dy,col])=>{
    const t=document.createElementNS(svgNS,'text'); t.setAttribute('x',cx+dx); t.setAttribute('y',cy+dy);
    t.setAttribute('text-anchor','middle'); t.setAttribute('font-family','Bangers, cursive'); t.setAttribute('font-size','8');
    t.setAttribute('fill',col); t.textContent=l; cg.appendChild(t);
  });
  svg.appendChild(cg);

  container.appendChild(svg);
}

function showContinentPanel(c) {
  const route = typeof getCurrentRoute === 'function' ? getCurrentRoute() : 'carte';
  const globeSec = document.getElementById('globe-sec');
  let panel = document.getElementById('globe-panel');
  if (!panel) { panel = document.createElement('div'); panel.id='globe-panel'; globeSec?.appendChild(panel); }
  if (globeSec && panel.parentElement !== globeSec) globeSec.appendChild(panel);

  panel.style.cssText = `
    position:relative;bottom:auto;left:auto;transform:none;
    width:100%;max-width:min(680px,96vw);border-radius:16px;
    border:2px solid rgba(255,215,0,.25);margin-top:14px;
    display:flex;flex-direction:column;gap:14px;
    background:linear-gradient(160deg,#0a0d1a,#120820);
    padding:22px 20px;box-shadow:0 8px 40px rgba(0,0,0,.6);
  `;
  panel.innerHTML = `
    <div class="gp-header">
      <div class="gp-emoji">${c.emoji}</div>
      <div><div class="gp-name">${c.name}</div>
        <div class="gp-universe" style="color:${c.color}">${c.universe}</div></div>
    </div>
    <div class="gp-subject">📚 ${c.subject}</div>
    <div class="gp-desc">${c.desc}</div>
    <div class="gp-chars">${c.chars.map((ch,i)=>`<span class="gp-char-badge" style="border-color:${c.charColors[i]}55;color:${c.charColors[i]}">👤 ${ch}</span>`).join('')}</div>
    ${c.locked
      ? `<div class="gp-locked-msg">🔒 Bientôt disponible !</div>`
      : `<button class="gp-play-btn" style="background:linear-gradient(135deg,${c.color},${c.color}99)"
           onclick="navigateTo('iles')">⚔️ COMMENCER L'AVENTURE !</button>`}
  `;
  setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'nearest'}),100);
}

function hideContinentPanel() {
  const p=document.getElementById('globe-panel');
  if(p){ p.style.display='none'; p.classList.remove('visible'); }
  const o=document.getElementById('globe-overlay');
  if(o) o.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', buildTreasureMap);