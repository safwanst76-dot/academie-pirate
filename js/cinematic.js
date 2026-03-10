// ═══════════════════════════════════════
// CINEMATIC.JS — Académie Pirate
// Scènes d'intro/fin + moteur particules
// ═══════════════════════════════════════

const ISLE_INTRO = {
  1:{bg:'#1a0005',tint:'tint-gold',lines:['GUM GUM…','… PISTOL !!!','Prêt(e) à tout déchirer ?'],kanji:'出発 !!',kanjiColor:'#f97316',bubble:"Je vais être Roi des Pirates ! Montre ce que tu sais !",particles:'sparks'},
  2:{bg:'#1a0e00',tint:'tint-gold',lines:['Navigation…','… au TOP !','Cartographie ton savoir !'],kanji:'地図 !!',kanjiColor:'#f59e0b',bubble:"L'argent ET la grammaire, ça compte ! Allons-y !",particles:'sparks'},
  3:{bg:'#001a05',tint:'tint-blue',lines:['Style des…','… Trois Sabres !!','Affronte les questions !'],kanji:'三刀流 !!',kanjiColor:'#22c55e',bubble:"Je ne me perdrai jamais… ni toi dans cette leçon !",particles:'ice'},
  4:{bg:'#0d0020',tint:'tint-blue',lines:['Fleur…','… FLEUR !!','La connaissance est une arme.'],kanji:'知識 !!',kanjiColor:'#a78bfa',bubble:"Chaque réponse est une clé. Trouve-les toutes !",particles:'sparks'},
  5:{bg:'#1a1000',tint:'tint-gold',lines:["J'ai 8000 hommes !",'Sniper King…','… est avec toi !'],kanji:'勇気 !!',kanjiColor:'#f59e0b',bubble:"Je ne mens jamais quand il s'agit de grammaire !",particles:'sparks'},
  6:{bg:'#00081a',tint:'tint-blue',lines:['Jambe…','… DIABLE !!','Cuisine ta réponse !'],kanji:'愛 !!',kanjiColor:'#3b82f6',bubble:"Pour les Nakamas — je donne le meilleur de moi !",particles:'fire'},
  7:{bg:'#1a001a',tint:'tint-gold',lines:['Rumble…','… BALL !!','Point Reindeer !'],kanji:'治療 !!',kanjiColor:'#ec4899',bubble:"Je ne suis PAS content d'être ton prof… si si en fait !",particles:'ice'},
  8:{bg:'#060010',tint:'tint-blue',lines:['Yohohoho…','… !!!','Soul King chante pour toi !'],kanji:'大勝利',kanjiColor:'#8b5cf6',bubble:"Puis-je voir ta réponse ? Yohohoho !",particles:'sparks'},
};

const ISLE_END = {
  1:[
    {tier:'legendary',kanji:'大勝利 !!',kanjiColor:'#f97316',tint:'tint-gold',lines:['LÉGENDAIRE !','10 / 10 !!!'],particles:'fire',bubble:"GUM GUM LEGEND ! 10/10 ! Shanks serait fier de toi !",sfx:'fanfare'},
    {tier:'great',kanji:'勝利 !!',kanjiColor:'#f59e0b',tint:'tint-gold',lines:['EXCELLENT !','Nakama confirmé !'],particles:'sparks',bubble:"Super boulot Moussaillon ! Tu progresses vite !",sfx:'ok'},
    {tier:'good',kanji:'よし !!',kanjiColor:'#22c55e',tint:'tint-blue',lines:['Bien joué !','Continue !'],particles:'sparks',bubble:"Pas mal ! Quelques erreurs mais le cap est bon !",sfx:'ok'},
    {tier:'mid',kanji:'もう一度',kanjiColor:'#f59e0b',tint:'',lines:['Continue…','Entraîne-toi !'],particles:'ice',bubble:"Hmm… Tu peux faire mieux ! Rejoue pour t'améliorer.",sfx:'ko'},
    {tier:'fail',kanji:'負け…',kanjiColor:'#e63946',tint:'tint-red',lines:['Défaite…','Ne lâche pas !'],particles:'slash',bubble:"C'est dur mais ne renonce pas ! Luffy n'abandonne jamais !",sfx:'ko'},
  ],
  2:[
    {tier:'legendary',kanji:'完璧 !!',kanjiColor:'#f59e0b',tint:'tint-gold',lines:['PARFAIT !','10 / 10 !'],particles:'fire',bubble:"La carte est complète ! 10/10 ! Tu navigues parfaitement !",sfx:'fanfare'},
    {tier:'great',kanji:'すごい !!',kanjiColor:'#f97316',tint:'tint-gold',lines:['SUPERBE !','Presque parfait !'],particles:'sparks',bubble:"Excellent travail ! Quelques petits détails à revoir.",sfx:'ok'},
    {tier:'good',kanji:'進歩 !!',kanjiColor:'#22c55e',tint:'tint-blue',lines:['Bien !','En route !'],particles:'sparks',bubble:"La route est bonne ! Quelques accords à réviser.",sfx:'ok'},
    {tier:'mid',kanji:'練習',kanjiColor:'#f59e0b',tint:'',lines:['Hmm…','Révise encore !'],particles:'ice',bubble:"Les accords avec être sont piégeux ! Rejoue !",sfx:'ko'},
    {tier:'fail',kanji:'失敗…',kanjiColor:'#e63946',tint:'tint-red',lines:['Raté…','Courage !'],particles:'slash',bubble:"Pas grave ! Même Nami se perd parfois. Réessaie !",sfx:'ko'},
  ],
  3:[
    {tier:'legendary',kanji:'最強 !!',kanjiColor:'#22c55e',tint:'tint-gold',lines:['IMBATTABLE !','10 / 10 !'],particles:'fire',bubble:"Style des Trois Sabres niveau MAX ! 10/10 parfait !",sfx:'fanfare'},
    {tier:'great',kanji:'強い !!',kanjiColor:'#22c55e',tint:'tint-gold',lines:['FORT !','Presque !'],particles:'sparks',bubble:"Zoro approuve ! Tu maîtrises les accords avec être !",sfx:'ok'},
    {tier:'good',kanji:'前進 !!',kanjiColor:'#3b82f6',tint:'tint-blue',lines:['Bien !','Avance !'],particles:'sparks',bubble:"Bonne base ! Quelques accords féminins à retravailler.",sfx:'ok'},
    {tier:'mid',kanji:'修行',kanjiColor:'#f59e0b',tint:'',lines:['Entraîne-toi','encore !'],particles:'ice',bubble:"Zoro s'entraîne 10 000 heures. Toi, rejoue juste une fois !",sfx:'ko'},
    {tier:'fail',kanji:'敗北…',kanjiColor:'#e63946',tint:'tint-red',lines:['Défaite…','Relève-toi !'],particles:'slash',bubble:"Même Zoro tombe parfois. L'important c'est de se relever !",sfx:'ko'},
  ],
  4:[
    {tier:'legendary',kanji:'知識 !!',kanjiColor:'#a78bfa',tint:'tint-gold',lines:['SAVANT(E) !','10 / 10 !'],particles:'fire',bubble:"Robin est fière de toi ! Connaissance = Puissance. 10/10 !",sfx:'fanfare'},
    {tier:'great',kanji:'よく出来た',kanjiColor:'#8b5cf6',tint:'tint-gold',lines:['EXCELLENT !','Bien lu !'],particles:'sparks',bubble:"Tu lis les ponéglyphes de la grammaire comme Robin !",sfx:'ok'},
    {tier:'good',kanji:'進歩',kanjiColor:'#6366f1',tint:'tint-blue',lines:['Bonne base !','Continue !'],particles:'sparks',bubble:"La connaissance s'accumule. Tu progressses bien !",sfx:'ok'},
    {tier:'mid',kanji:'もっと',kanjiColor:'#f59e0b',tint:'',lines:['Plus dur…','Révise !'],particles:'ice',bubble:"Les participes passés avec avoir piègent même les grands !",sfx:'ko'},
    {tier:'fail',kanji:'失敗',kanjiColor:'#e63946',tint:'tint-red',lines:['Pas encore…','Courage !'],particles:'slash',bubble:"Même Robin a mis des années à tout apprendre. Courage !",sfx:'ko'},
  ],
};
// Îles 5–8 : réutilisent les configs 1–4
for (let i = 5; i <= 8; i++) ISLE_END[i] = ISLE_END[i - 4];

// ── PARTICLE ENGINE ──
let _cineAF = null;

function startParticles(type) {
  const cv = document.getElementById('cine-canvas');
  const ctx = cv.getContext('2d');
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  const P = [], W = cv.width, H = cv.height;
  if (type === 'fire')   { for (let i=0;i<80;i++) P.push({x:Math.random()*W,y:H+10,vx:(Math.random()-.5)*3,vy:-(2+Math.random()*5),r:3+Math.random()*6,life:1,col:`hsl(${20+Math.random()*40},100%,${50+Math.random()*30}%)`}); }
  else if (type === 'ice')    { for (let i=0;i<60;i++) P.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*2,vy:1+Math.random()*4,r:2+Math.random()*5,life:1,col:`hsl(${190+Math.random()*40},80%,${70+Math.random()*20}%)`}); }
  else if (type === 'sparks') { for (let i=0;i<100;i++) P.push({x:W/2+(Math.random()-.5)*W*.6,y:H/2+(Math.random()-.5)*H*.6,vx:(Math.random()-.5)*8,vy:(Math.random()-.5)*8,r:1+Math.random()*3,life:1,col:`hsl(${40+Math.random()*30},100%,${60+Math.random()*30}%)`}); }
  else if (type === 'slash')  { for (let i=0;i<40;i++) P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*6,vy:-(1+Math.random()*3),r:1+Math.random()*3,life:1,col:`hsl(${350+Math.random()*20},90%,55%)`}); }

  function loop() {
    ctx.clearRect(0,0,W,H);
    P.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.life-=.018;
      if (type==='fire') p.vy-=.05;
      if (type==='ice')  p.vy+=.03;
      ctx.globalAlpha=Math.max(0,p.life);
      ctx.fillStyle=p.col;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
    for (let i=P.length-1;i>=0;i--) if (P[i].life<=0) P.splice(i,1);
    if (P.length > 0) _cineAF = requestAnimationFrame(loop);
    else ctx.clearRect(0,0,W,H);
  }
  if (_cineAF) cancelAnimationFrame(_cineAF);
  loop();
}

function stopParticles() {
  if (_cineAF) { cancelAnimationFrame(_cineAF); _cineAF = null; }
  const cv = document.getElementById('cine-canvas');
  if (cv) cv.getContext('2d').clearRect(0,0,cv.width,cv.height);
}


function skipCine() { flashScreen(() => closeCine()); }

function makeKanji(text, color, delay, type) {
  const el = document.createElement('div');
  el.className = 'cine-kanji';
  el.textContent = text;
  el.style.color = color || '#f97316';
  setTimeout(() => el.classList.add(type || 'pop'), delay || 0);
  return el;
}

// ── INTRO SCENE ──
function playIntroScene(n, afterCallback) {
  const cfg = ISLE_INTRO[n] || ISLE_INTRO[1];
  const charImg = charImages[n] || FALLBACK[n];
  const isle = ISLANDS[n];

  const panels = `
    <div class="cine-panel ${cfg.tint} from-left">
      <div class="spd"></div>
      <img src="${charImg}" alt="${isle.charName}" onerror="this.src='${FALLBACK[n]}'">
      <div class="cine-label">${isle.name}</div>
      <div class="cine-bubble">${cfg.bubble}</div>
    </div>
    <div class="cine-panel from-top" style="background:${cfg.bg};display:flex;align-items:center;justify-content:center;border-bottom:3px solid #000">
      <div class="spd"></div>
      <div style="text-align:center;padding:10px">
        <div style="font-size:clamp(1.4rem,5vw,2.2rem);color:#fff;letter-spacing:3px;text-shadow:3px 3px 0 #000;animation:bPop .4s .2s both">${cfg.lines[0]||''}</div>
        <div style="font-size:clamp(1.8rem,6vw,3rem);color:${cfg.kanjiColor};letter-spacing:3px;text-shadow:3px 3px 0 #000;animation:bPop .4s .4s both">${cfg.lines[1]||''}</div>
      </div>
    </div>
    <div class="cine-panel from-right" style="background:${cfg.bg};display:flex;align-items:center;justify-content:center">
      <div class="spd"></div>
      <div style="text-align:center;padding:10px">
        <div style="font-size:clamp(1rem,3.5vw,1.4rem);color:rgba(255,255,255,.85);font-family:'Nunito',sans-serif;font-weight:800;animation:bPop .4s .6s both;padding:0 8px">${cfg.lines[2]||''}</div>
        <div style="margin-top:8px;font-size:clamp(.7rem,2vw,.85rem);color:rgba(255,255,255,.5);font-family:'Nunito',sans-serif;font-weight:700;animation:bPop .4s .8s both;letter-spacing:1px">${isle.qs.length} QUESTIONS</div>
      </div>
    </div>`;

  const kanji = makeKanji(cfg.kanji, cfg.kanjiColor, 600, 'pop');
  const pName = (typeof playerData !== 'undefined' && playerData.name) ? playerData.name : 'Moussaillon';
  const bottomHTML = `
    <div style="font-family:'Nunito',sans-serif;font-size:.8rem;color:rgba(255,255,255,.5);letter-spacing:1px;margin-bottom:6px">
      Prêt(e) <strong style="color:var(--gold)">${pName}</strong> ?
    </div>
    <button class="btn btn-gold" onclick="skipCine();setTimeout(()=>_launchIsland(${n}),50)">⚔️ COMMENCER L'ÎLE !</button>
    <button class="btn btn-outline btn-sm" onclick="skipCine()">⏭ PASSER</button>
  `;

  setTimeout(() => sfxCineDrum(), 50);
  setTimeout(() => sfxCineRiser(), 300);
  setTimeout(() => flashScreen(), 400);
  setTimeout(() => { document.querySelectorAll('#cine-scene .cine-panel').forEach(p => p.classList.add('burst')); }, 700);

  showCine(panels, kanji, bottomHTML, cfg.bg, cfg.particles, afterCallback);
  document.getElementById('cinePanels').classList.add('layout-3');
}

// ── END SCENE ──
function playEndScene(n, score, afterCallback) {
  const endCfgs = ISLE_END[n] || ISLE_END[1];
  const tier = score===10?0:score>=8?1:score>=6?2:score>=4?3:4;
  const cfg = endCfgs[tier];
  const charImg = charImages[n] || FALLBACK[n];
  const isle = ISLANDS[n];
  const gained = score * 2;
  const isVictory = score >= 6;

  let panelsHTML, layoutClass;

  if (isVictory) {
    layoutClass = 'layout-2';
    panelsHTML = `
      <div class="cine-panel ${cfg.tint} from-left">
        <div class="spd"></div>
        <img src="${charImg}" alt="${isle.charName}" onerror="this.src='${FALLBACK[n]}'">
        <div class="cine-bubble">${cfg.bubble}</div>
      </div>
      <div class="cine-panel from-right" style="background:${ISLE_INTRO[n]?ISLE_INTRO[n].bg:'#0a0d1a'};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">
        <div class="spd"></div>
        <div class="cine-score">
          <div class="cine-score-num" style="color:${cfg.kanjiColor}">${score}<span style="font-size:.4em;color:rgba(255,255,255,.5)">/10</span></div>
          <div class="cine-score-lbl">SCORE FINAL</div>
        </div>
        <div style="font-family:'Bangers',cursive;font-size:clamp(1.2rem,4vw,1.8rem);color:${cfg.kanjiColor};letter-spacing:3px;text-shadow:3px 3px 0 #000;animation:bPop .5s .3s both;text-align:center;padding:0 10px">${cfg.lines[0]}<br>${cfg.lines[1]||''}</div>
        <div style="font-family:'Nunito',sans-serif;font-size:clamp(.8rem,2.5vw,1rem);font-weight:800;color:var(--gold2);letter-spacing:2px;animation:bPop .4s .7s both">+${gained} XP 🏴‍☠️</div>
        <div style="font-size:clamp(1.2rem,3.5vw,1.8rem);letter-spacing:4px;animation:bPop .4s .9s both">${starsStr(score,10)}</div>
      </div>`;
  } else {
    layoutClass = 'layout-1';
    panelsHTML = `
      <div class="cine-panel tint-red from-bot" style="position:relative">
        <div class="spd"></div>
        <img src="${charImg}" alt="${isle.charName}" onerror="this.src='${FALLBACK[n]}'" style="filter:grayscale(.5) contrast(1.2)">
        <div class="cine-slash show">
          <div class="cine-slash-line" style="top:35%;transform:rotate(-8deg)"></div>
          <div class="cine-slash-line" style="top:55%;transform:rotate(-12deg);opacity:.6"></div>
        </div>
        <div class="cine-bubble" style="border-color:#e63946">${cfg.bubble}</div>
        <div style="position:absolute;top:14px;left:50%;transform:translateX(-50%);font-family:'Bangers',cursive;font-size:clamp(1.2rem,4vw,1.8rem);color:#e63946;-webkit-text-stroke:2px #000;text-shadow:3px 3px 0 #000;white-space:nowrap;animation:kShake .6s .4s both;z-index:10">
          ${score}/10 — ${cfg.lines[0]}
        </div>
      </div>`;
  }

  const kanji = makeKanji(cfg.kanji, cfg.kanjiColor, 500, isVictory ? 'pop' : 'shake');
  const bottomHTML = `
    <button class="btn btn-gold" onclick="skipCine()">🗺️ RETOUR À LA CARTE</button>
    <button class="btn btn-outline" onclick="skipCine();setTimeout(()=>retry(${n}),200)">🔁 REJOUER</button>`;

  if (isVictory) {
    playBGM('victory', false);
    setTimeout(() => sfxCineVictory(), 200);
    if (score === 10) setTimeout(() => sfxFanfare(), 900);
  } else {
    playBGM('defeat', false);
    setTimeout(() => sfxCineDefeat(), 100);
    setTimeout(() => sfxSlash(), 350);
  }
  setTimeout(() => { document.querySelectorAll('#cine-scene .cine-panel').forEach(p => p.classList.add('burst')); }, 600);

  showCine(panelsHTML, kanji, bottomHTML, ISLE_INTRO[n] ? ISLE_INTRO[n].bg : '#0a0d1a', cfg.particles, afterCallback);
  document.getElementById('cinePanels').classList.add(layoutClass);
}