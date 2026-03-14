// ═══════════════════════════════════════════════════════
// CARTE AU TRÉSOR — Académie Pirate
// Fond = vraie carte One Piece + zones cliquables SVG
// ═══════════════════════════════════════════════════════

const CONTINENTS = [
  {
    id: 'french', name: 'Grand Bleu', subject: 'Français', universe: 'One Piece',
    emoji: '🏴‍☠️', color: '#e63946',
    chars: ['Nami','Luffy','Robin'], charColors: ['#f59e0b','#e63946','#6366f1'],
    desc: "Maîtrise la grammaire avec l'équipage Chapeau de Paille !",
    locked: false,
    // Zone cliquable Amériques (gauche de la carte)
    zone: 'M 55,35 L 75,30 L 88,38 L 90,55 L 85,72 L 90,88 L 85,105 L 78,120 L 80,138 L 74,155 L 66,170 L 60,188 L 54,205 L 48,220 L 44,238 L 40,252 L 36,266 L 32,278 L 28,268 L 30,252 L 34,238 L 38,222 L 42,206 L 38,192 L 36,178 L 40,164 L 44,150 L 40,136 L 38,122 L 42,108 L 48,94 L 44,80 L 42,65 L 46,52 L 52,40 Z',
    labelX: 58, labelY: 128, subX: 58, subY: 142, emojiX: 44, emojiY: 50,
  },
  {
    id: 'math', name: 'Pays du Feu', subject: 'Maths', universe: 'Naruto',
    emoji: '⚔️', color: '#ff6b35',
    chars: ['Sakura','Naruto','Tsunade'], charColors: ['#ec4899','#f97316','#eab308'],
    desc: 'Entraîne-toi aux calculs comme un vrai ninja !',
    locked: true,
    // Zone Europe/Nord-Ouest
    zone: 'M 195,38 L 220,30 L 245,34 L 258,48 L 252,65 L 258,80 L 252,95 L 240,105 L 228,110 L 215,106 L 205,95 L 200,80 L 198,65 L 200,50 Z',
    labelX: 228, labelY: 72, subX: 228, subY: 85, emojiX: 210, emojiY: 46,
  },
  {
    id: 'history', name: 'Magnolia', subject: 'Histoire', universe: 'Fairy Tail',
    emoji: '✨', color: '#8b5cf6',
    chars: ['Erza','Lucy','Wendy'], charColors: ['#ef4444','#eab308','#3b82f6'],
    desc: 'Voyage dans le temps avec la guilde Fairy Tail !',
    locked: false,
    // Zone centre-bas (continent principal de la carte OP)
    zone: 'M 245,115 L 295,108 L 340,115 L 368,128 L 375,148 L 368,168 L 355,182 L 335,190 L 308,192 L 282,188 L 262,178 L 248,162 L 240,144 L 242,128 Z',
    labelX: 308, labelY: 155, subX: 308, subY: 168, emojiX: 260, emojiY: 125,
  },
  {
    id: 'science', name: 'Kanto', subject: 'Sciences', universe: 'Pokémon',
    emoji: '🌿', color: '#22c55e',
    chars: ['Misty','Dawn','May'], charColors: ['#ef4444','#3b82f6','#ec4899'],
    desc: 'Explore la nature et les créatures avec tes Pokémon !',
    locked: false,
    // Zone droite/Asie
    zone: 'M 385,45 L 420,38 L 455,42 L 472,58 L 470,78 L 462,95 L 448,108 L 428,114 L 408,110 L 392,98 L 384,80 L 382,62 Z',
    labelX: 428, labelY: 78, subX: 428, subY: 91, emojiX: 392, emojiY: 55,
  },
  {
    id: 'geography', name: 'Namek', subject: 'Géographie', universe: 'Dragon Ball Z',
    emoji: '💥', color: '#3b82f6',
    chars: ['Bulma','Android 18','Videl'], charColors: ['#3b82f6','#6366f1','#ec4899'],
    desc: "Parcours l'univers avec Goku et ses amis !",
    locked: true,
    // Zone bas-droite (Océanie/îles)
    zone: 'M 420,155 L 452,148 L 478,155 L 488,172 L 482,190 L 464,198 L 444,194 L 428,182 L 420,168 Z',
    labelX: 454, labelY: 175, subX: 454, subY: 188, emojiX: 428, emojiY: 162,
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
  // Même ratio que l'image One Piece (600x450 ≈ 4:3)
  svg.setAttribute('viewBox', '0 0 520 390');
  svg.style.cssText = 'width:100%;height:auto;display:block;';

  const defs = document.createElementNS(svgNS, 'defs');

  // Glow filter
  const gf=document.createElementNS(svgNS,'filter'); gf.id='glow';
  gf.setAttribute('x','-20%'); gf.setAttribute('y','-20%'); gf.setAttribute('width','140%'); gf.setAttribute('height','140%');
  const fb=document.createElementNS(svgNS,'feGaussianBlur'); fb.setAttribute('stdDeviation','4'); fb.setAttribute('result','blur');
  const fm=document.createElementNS(svgNS,'feMerge');
  ['blur','SourceGraphic'].forEach(i=>{ const n=document.createElementNS(svgNS,'feMergeNode'); n.setAttribute('in',i); fm.appendChild(n); });
  gf.appendChild(fb); gf.appendChild(fm); defs.appendChild(gf);

  svg.appendChild(defs);

  // ── IMAGE ONE PIECE MAP EN FOND ──
  const img = document.createElementNS(svgNS, 'image');
  img.setAttribute('href', 'assets/images/onepiece-map.png');
  img.setAttribute('x', '0'); img.setAttribute('y', '0');
  img.setAttribute('width', '520'); img.setAttribute('height', '390');
  img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.appendChild(img);

  // ── OVERLAY LÉGER pour lisibilité des labels ──
  const overlay = document.createElementNS(svgNS,'rect');
  overlay.setAttribute('width','520'); overlay.setAttribute('height','390');
  overlay.setAttribute('fill','rgba(0,0,0,0.08)'); svg.appendChild(overlay);

  // ── ZONES CLIQUABLES + LABELS ──
  CONTINENTS.forEach(c => {
    const g = document.createElementNS(svgNS,'g'); g.style.cursor='pointer';

    // Zone semi-transparente colorée
    const zone = document.createElementNS(svgNS,'path');
    zone.setAttribute('d', c.zone);
    zone.setAttribute('fill', c.locked ? `${c.color}18` : `${c.color}28`);
    zone.setAttribute('stroke', c.locked ? `${c.color}55` : `${c.color}cc`);
    zone.setAttribute('stroke-width', '2');
    zone.setAttribute('stroke-linejoin','round');
    g.appendChild(zone);

    // Badge matière — fond
    const badgeBg = document.createElementNS(svgNS,'rect');
    const bw = c.locked ? 72 : 78;
    badgeBg.setAttribute('x', String(c.labelX - bw/2));
    badgeBg.setAttribute('y', String(c.labelY - 13));
    badgeBg.setAttribute('width', String(bw)); badgeBg.setAttribute('height','16');
    badgeBg.setAttribute('rx','8');
    badgeBg.setAttribute('fill', c.locked ? 'rgba(0,0,0,0.55)' : `${c.color}dd`);
    g.appendChild(badgeBg);

    // Nom continent
    const lb = document.createElementNS(svgNS,'text');
    lb.setAttribute('x', c.labelX); lb.setAttribute('y', c.labelY);
    lb.setAttribute('text-anchor','middle'); lb.setAttribute('font-family','Bangers, cursive');
    lb.setAttribute('font-size','10'); lb.setAttribute('letter-spacing','1');
    lb.setAttribute('fill','#fff'); lb.setAttribute('paint-order','stroke');
    lb.textContent = c.name; g.appendChild(lb);

    // Badge matière
    const subBg = document.createElementNS(svgNS,'rect');
    subBg.setAttribute('x', String(c.subX - 35)); subBg.setAttribute('y', String(c.subY - 10));
    subBg.setAttribute('width','70'); subBg.setAttribute('height','13'); subBg.setAttribute('rx','6');
    subBg.setAttribute('fill','rgba(0,0,0,0.6)'); g.appendChild(subBg);

    const sb = document.createElementNS(svgNS,'text');
    sb.setAttribute('x', c.subX); sb.setAttribute('y', c.subY);
    sb.setAttribute('text-anchor','middle'); sb.setAttribute('font-family','Bangers, cursive');
    sb.setAttribute('font-size','8'); sb.setAttribute('letter-spacing','1.5');
    sb.setAttribute('fill', c.locked ? 'rgba(255,255,255,0.5)' : '#ffd700');
    sb.textContent = c.subject.toUpperCase(); g.appendChild(sb);

    // Emoji flottant
    const em = document.createElementNS(svgNS,'text');
    em.setAttribute('x', c.emojiX); em.setAttribute('y', c.emojiY);
    em.setAttribute('text-anchor','middle'); em.setAttribute('font-size','14'); em.textContent=c.emoji; g.appendChild(em);

    // Verrou
    if(c.locked){
      const lc=document.createElementNS(svgNS,'circle');
      lc.setAttribute('cx',String(Number(c.emojiX)+16)); lc.setAttribute('cy',String(Number(c.emojiY)-6)); lc.setAttribute('r','8');
      lc.setAttribute('fill','rgba(0,0,0,0.7)'); lc.setAttribute('stroke','rgba(255,255,255,0.2)'); lc.setAttribute('stroke-width','1'); g.appendChild(lc);
      const lt=document.createElementNS(svgNS,'text');
      lt.setAttribute('x',String(Number(c.emojiX)+16)); lt.setAttribute('y',String(Number(c.emojiY)));
      lt.setAttribute('text-anchor','middle'); lt.setAttribute('font-size','10'); lt.textContent='🔒'; g.appendChild(lt);
    }

    // Hover
    if(!c.locked){
      g.addEventListener('mouseenter',()=>{
        zone.setAttribute('fill',`${c.color}50`);
        zone.setAttribute('stroke-width','3');
        g.setAttribute('filter','url(#glow)');
      });
      g.addEventListener('mouseleave',()=>{
        zone.setAttribute('fill',`${c.color}28`);
        zone.setAttribute('stroke-width','2');
        g.removeAttribute('filter');
      });
    } else {
      g.addEventListener('mouseenter',()=>{ zone.setAttribute('fill',`${c.color}30`); });
      g.addEventListener('mouseleave',()=>{ zone.setAttribute('fill',`${c.color}18`); });
    }
    g.addEventListener('click',()=>showContinentPanel(c));
    svg.appendChild(g);
  });

  container.appendChild(svg);
}

function showContinentPanel(c) {
  const globeSec = document.getElementById('globe-sec');
  let panel = document.getElementById('globe-panel');
  if(!panel){ panel=document.createElement('div'); panel.id='globe-panel'; globeSec?.appendChild(panel); }
  if(globeSec && panel.parentElement !== globeSec) globeSec.appendChild(panel);

  panel.style.cssText = `
    position:relative;bottom:auto;left:auto;transform:none;
    width:100%;max-width:min(700px,96vw);border-radius:16px;
    border:2px solid rgba(255,215,0,.3);margin-top:14px;
    display:flex;flex-direction:column;gap:14px;
    background:linear-gradient(160deg,#0a0d1a,#120820);
    padding:22px 20px;box-shadow:0 8px 40px rgba(0,0,0,.7);
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
           onclick="navigateTo('${c.id}')">⚔️ COMMENCER L'AVENTURE !</button>`}
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