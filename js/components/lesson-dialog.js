/**
 * ACADÉMIE PIRATE — Lesson Dialog v2
 * js/components/lesson-dialog.js
 * Règles : ARCHI-01 · RD-01 · UX-01 · AV-01
 *
 * Refonte complète : avatar enfant comme personnage central
 * - Scène héros : avatar enfant face au héros, dialogue manga
 * - Warmup      : avatar pose la question visuellement
 * - Réaction    : feedback grande taille, émotionnel
 */

(function (global) {
  'use strict';

  /* ─── Données avatar depuis AP.state ─────────────────────── */
  function _av() {
    // Priorité 1 : AP.state (mis à jour par AvatarPicker)
    if (global.AP && global.AP.state) {
      var stateAv = global.AP.state.get('avatar');
      if (stateAv && stateAv.img) return stateAv;
    }
    // Priorité 2 : _activeChild (enfant connecté par PIN)
    if (typeof global._activeChild !== 'undefined' && global._activeChild) {
      var child = global._activeChild;
      var avatarId = child.avatar_id || 'luffy';
      // Résoudre l'URL depuis AVATARS (data/avatars.json)
      var img = 'assets/images/avatars/' + avatarId + '.jpg';
      if (typeof global.AVATARS !== 'undefined' && Array.isArray(global.AVATARS)) {
        var found = global.AVATARS.find(function(av) { return av.id === avatarId; });
        if (found && found.img) img = found.img;
      }
      return { id: avatarId, img: img, color: '#e63946', name: avatarId, quote_lesson: '' };
    }
    // Priorité 3 : playerData legacy
    if (typeof global.playerData !== 'undefined') return {
      id: global.playerData.avatarId || 'luffy',
      img: global.playerData.avatarImg || 'assets/images/avatars/luffy.jpg',
      color: global.playerData.avatarColor || '#e63946',
      name: global.playerData.charName || 'Luffy',
      quote_lesson: global.playerData.avatarQuote || ''
    };
    return { id:'luffy', img:'assets/images/avatars/luffy.jpg', color:'#e63946', name:'Luffy', quote_lesson:'' };
  }

  function _childName() {
    var c = global.AP && global.AP.state ? global.AP.state.get('child') : null;
    return (c && (c.username || c.name)) || 'Toi';
  }

  /* ─── CSS injecté une seule fois ─────────────────────────── */
  function _css() {
    if (document.getElementById('ld-v2-css')) return;
    var s = document.createElement('style');
    s.id = 'ld-v2-css';
    s.textContent = `

/* ══ SCÈNE HÉROS — avatar enfant face au héros ══ */
.ld-scene {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 420px;
  margin: 12px auto 0;
  position: relative;
}

/* ══ COMPAGNON — grand personnage côté droit du héros ══ */
.ld-companion-wrap {
  position: relative;
  width: clamp(120px, 30vw, 180px);
  height: clamp(160px, 40vw, 240px);
  flex-shrink: 0;
  animation: ld-enter-right .7s cubic-bezier(.34,1.56,.64,1) .3s both;
}
@keyframes ld-enter-right {
  from { opacity:0; transform:translateX(30px) scale(.7); }
  to   { opacity:1; transform:translateX(0) scale(1); }
}
.ld-companion-aura {
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  z-index: 0;
  animation: ld-aura-pulse 2s ease-in-out infinite;
}
@keyframes ld-aura-pulse { 0%,100%{transform:scale(1);opacity:.7;} 50%{transform:scale(1.12);opacity:1;} }

.ld-companion-ring {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2.5px solid;
  z-index: 0;
  animation: ld-ring-spin 4s linear infinite;
}
.ld-ring-2 { inset: -20px; border-width: 2px; border-style: dashed; animation-duration: 6s; animation-direction: reverse; }
@keyframes ld-ring-spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

.ld-companion-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 14px;
  filter: drop-shadow(0 0 14px var(--ld-color, #e63946)) saturate(1.3);
  animation: ld-hero-appear .8s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes ld-hero-appear {
  from { transform:scale(.5) translateY(30px); opacity:0; }
  to   { transform:scale(1) translateY(0); opacity:1; }
}

.ld-companion-name {
  font-family: 'Bangers', cursive;
  font-size: clamp(.75rem, 2.5vw, .95rem);
  letter-spacing: 2px;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
  margin-top: 4px;
  position: relative;
  z-index: 2;
  animation: ld-name-appear .5s ease .3s both;
}
@keyframes ld-name-appear { from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:translateY(0);} }

.ld-companion-bubble {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: max-content;
  max-width: clamp(130px, 35vw, 190px);
  animation: ld-bubble-pop .5s cubic-bezier(.34,1.56,.64,1) .6s both;
}
@keyframes ld-bubble-pop { from{opacity:0;transform:translateX(-50%) scale(.6);} to{opacity:1;transform:translateX(-50%) scale(1);} }

.ld-companion-bubble-inner {
  background: rgba(255,255,255,.96);
  border: 2.5px solid #000;
  border-radius: 14px 14px 14px 4px;
  padding: 10px 13px;
  font-family: 'Nunito', sans-serif;
  font-size: clamp(.7rem, 2vw, .82rem);
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.4;
  box-shadow: 3px 3px 0 rgba(0,0,0,.35);
  text-align: center;
}
.ld-companion-tail {
  width: 0; height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 9px solid #000;
  margin: 0 auto;
  position: relative;
}
.ld-companion-tail::after {
  content:'';
  position:absolute;
  top:-11px; left:-6px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid rgba(255,255,255,.96);
}

/* VS badge */
.ld-vs {
  font-family: 'Bangers', cursive;
  font-size: 1.1rem;
  letter-spacing: 2px;
  color: #ffd700;
  text-shadow: 2px 2px 0 #000;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 28px;
  z-index: 5;
  background: rgba(0,0,0,.6);
  border: 1.5px solid rgba(255,215,0,.4);
  border-radius: 20px;
  padding: 2px 10px;
}

/* Avatar côté enfant */
.ld-child-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  animation: ld-enter-right .6s cubic-bezier(.34,1.56,.64,1) .3s both;
}
@keyframes ld-enter-right {
  from { opacity:0; transform:translateX(30px) scale(.8); }
  to   { opacity:1; transform:translateX(0) scale(1); }
}

.ld-child-avatar {
  width: clamp(72px,18vw,100px);
  height: clamp(72px,18vw,100px);
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  border: 3px solid var(--ld-color, #e63946);
  box-shadow:
    0 0 0 4px rgba(0,0,0,.5),
    0 0 20px rgba(230,57,70,.45);
  flex-shrink: 0;
}

.ld-child-name {
  font-family: 'Bangers', cursive;
  font-size: .9rem;
  letter-spacing: 2px;
  color: var(--ld-color, #e63946);
  text-shadow: 1px 1px 0 #000;
}

/* Bulle de l'enfant (pointe à gauche = vient de droite) */
.ld-child-bubble {
  background: rgba(255,255,255,.96);
  border: 2.5px solid #000;
  border-radius: 12px 12px 4px 12px;
  padding: 10px 13px;
  font-family: 'Nunito', sans-serif;
  font-size: clamp(.72rem,2vw,.85rem);
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.4;
  position: relative;
  box-shadow: 3px 3px 0 rgba(0,0,0,.4);
  max-width: 160px;
  text-align: center;
  animation: ld-bubble-pop .5s cubic-bezier(.34,1.56,.64,1) .7s both;
}
@keyframes ld-bubble-pop {
  from { opacity:0; transform:scale(.6); }
  to   { opacity:1; transform:scale(1); }
}
.ld-child-bubble::after {
  content:'';
  position:absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #000;
}
.ld-child-bubble::before {
  content:'';
  position:absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(255,255,255,.96);
  z-index: 1;
}

/* ══ WARMUP — avatar pose la question ══ */
.ld-warmup-asker {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
  pointer-events: none;
}
.ld-warmup-asker * { pointer-events: none; }
.lesson-warmup-opts {
  position: relative;
  z-index: 2;
}
.lesson-warmup-opt {
  position: relative;
  z-index: 2;
  pointer-events: auto !important;
}

.ld-asker-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  border: 2.5px solid var(--ld-color, #e63946);
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(230,57,70,.3);
}

.ld-asker-bubble {
  background: rgba(255,255,255,.96);
  border: 2px solid #000;
  border-radius: 4px 14px 14px 14px;
  padding: 10px 14px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.45;
  flex: 1;
  box-shadow: 2px 2px 0 rgba(0,0,0,.3);
  position: relative;
}
.ld-asker-label {
  font-size: .62rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ld-color, #e63946);
  font-weight: 900;
  margin-bottom: 4px;
}
.ld-asker-q {
  font-size: clamp(.82rem,2.2vw,.95rem);
  color: #1a1a2e;
}

/* ══ RÉACTION — feedback grande taille ══ */
.ld-react-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  margin-top: 10px;
  animation: ld-react-in .4s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes ld-react-in {
  from { opacity:0; transform:scale(.85) translateY(8px); }
  to   { opacity:1; transform:scale(1) translateY(0); }
}

.ld-react-panel.ld-ok {
  background: rgba(6,214,160,.12);
  border: 2px solid #06d6a0;
}
.ld-react-panel.ld-ko {
  background: rgba(239,68,68,.1);
  border: 2px solid #ef4444;
}

.ld-react-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
  border: 3px solid var(--ld-color, #e63946);
}
.ld-react-panel.ld-ok .ld-react-avatar {
  animation: ld-jump 0.5s cubic-bezier(.34,1.56,.64,1) both;
}
.ld-react-panel.ld-ko .ld-react-avatar {
  animation: ld-wobble 0.5s ease both;
}
@keyframes ld-jump {
  0%   { transform:translateY(0) scale(1); }
  40%  { transform:translateY(-12px) scale(1.15); }
  70%  { transform:translateY(4px) scale(.95); }
  100% { transform:translateY(0) scale(1); }
}
@keyframes ld-wobble {
  0%,100% { transform:rotate(0); }
  20%      { transform:rotate(-10deg); }
  60%      { transform:rotate(10deg); }
}

.ld-react-text {
  flex: 1;
}
.ld-react-emoji {
  font-size: 1.6rem;
  line-height: 1;
  margin-bottom: 4px;
}
.ld-react-msg {
  font-family: 'Nunito', sans-serif;
  font-size: clamp(.82rem,2vw,.92rem);
  font-weight: 800;
  color: #e8eaf6;
  line-height: 1.4;
}

/* Mobile compact */
@media (min-width: 600px) {
  .ld-companion-wrap { width: 200px; height: 270px; }
}
@media (max-width: 380px) {
  .ld-child-avatar { width: 60px; height: 60px; }
  .ld-child-bubble { font-size: .7rem; max-width: 130px; }
  .ld-react-avatar { width: 52px; height: 52px; }
  .ld-companion-wrap { width: 90px; height: 130px; }
}
`;
    document.head.appendChild(s);
  }

  /* ─── 1. Scène héros — avatar face au héros ─────────────── */
  function renderCompanion(container, options) {
    _css();
    if (!container) return;
    var av     = _av();
    var child  = _childName();
    var hero   = options && options.heroName ? options.heroName : 'le héros';
    var accent = av.color || '#e63946';

    var quotes = [
      'Eh ' + hero + ' ! On y va ?',
      'Montre-moi ce que tu sais, ' + hero + ' !',
      'C\'est parti ' + hero + ' !',
      'Allez ' + hero + ', apprends-moi ça !',
    ];
    var quote = (av.quote_lesson || quotes[Math.floor(Math.random() * quotes.length)])
      .replace('{name}', child).replace('[name]', child);

    // Grand perso style héros — même taille que l'image AOT
    container.innerHTML =
      '<div class="ld-companion-wrap" style="--ld-color:' + accent + '">' +
        // Aura colorée derrière
        '<div class="ld-companion-aura" style="background:radial-gradient(ellipse,' + accent + '44 0%,transparent 70%)"></div>' +
        // Anneaux rotatifs comme le héros
        '<div class="ld-companion-ring" style="border-color:' + accent + '"></div>' +
        '<div class="ld-companion-ring ld-ring-2" style="border-color:' + accent + '66"></div>' +
        // Grande image du personnage
        '<img class="ld-companion-img"' +
          ' src="' + _esc(av.img) + '"' +
          ' alt="' + _esc(child) + '"' +
          ' onerror="this.onerror=null;this.src=\'assets/images/avatars/luffy.jpg\'">' +
        // Nom + bulle
        '<div class="ld-companion-name" style="color:' + accent + '">' + _esc(child) + '</div>' +
        '<div class="ld-companion-bubble">' +
          '<div class="ld-companion-bubble-inner">' + _esc(quote) + '</div>' +
          '<div class="ld-companion-tail"></div>' +
        '</div>' +
      '</div>';
  }

  /* ─── 2. Warmup — avatar pose la question ───────────────── */
  function buildWarmupCard(w, i, accent) {
    _css();
    var av     = _av();
    var child  = _childName();
    var optsHTML = w.o.map(function(opt, j) {
      return '<button class="lesson-warmup-opt" id="lwu_' + i + '_' + j + '"' +
        ' onclick="lessonWarmupSelect(' + i + ',' + j + ',' + JSON.stringify(w.a).replace(/</g,'&lt;') + ')"' +
        ' data-val="' + opt.replace(/"/g,'&quot;') + '">' + opt + '</button>';
    }).join('');

    return '<div class="lesson-warmup-card" id="lwucard_' + i + '">' +
      '<div class="ld-warmup-asker" style="--ld-color:' + accent + '">' +
        '<img class="ld-asker-avatar"' +
          ' src="' + _esc(av.img) + '"' +
          ' alt="' + _esc(child) + '"' +
          ' onerror="this.onerror=null;this.src=\'assets/images/avatars/luffy.jpg\'">' +
        '<div class="ld-asker-bubble">' +
          '<div class="ld-asker-label" style="color:' + accent + '">' + _esc(child) + ' demande :</div>' +
          '<div class="ld-asker-q">' + w.q + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="lesson-warmup-opts">' + optsHTML + '</div>' +
      '<div class="lesson-warmup-fb" id="lwufb_' + i + '"></div>' +
    '</div>';
  }

  /* ─── 3. Réaction après réponse ─────────────────────────── */
  function reactWarmup(qi, isCorrect) {
    _css();
    var av    = _av();
    var child = _childName();
    var card  = document.getElementById('lwucard_' + qi);
    if (!card) return;

    var prev = card.querySelector('.ld-react-panel');
    if (prev) prev.remove();

    var okMsgs = [
      { e:'🎉', m: 'Excellent ' + child + ' ! Tu maîtrises ça !' },
      { e:'⚡', m: 'BOOM ! En plein dans le mille ' + child + ' !' },
      { e:'🔥', m: 'Parfait ! C\'est exactement ça !' },
      { e:'💪', m: 'Trop fort ' + child + ' ! Continue !' },
    ];
    var koMsgs = [
      { e:'💡', m: 'Pas grave ' + child + ' — maintenant tu sais !' },
      { e:'🔄', m: 'L\'erreur, c\'est la meilleure leçon !' },
      { e:'💪', m: 'Presque ! Tu vas y arriver ' + child + ' !' },
      { e:'🎯', m: 'Retiens bien — tu auras une chance au quiz !' },
    ];
    var msgs = isCorrect ? okMsgs : koMsgs;
    var m    = msgs[Math.floor(Math.random() * msgs.length)];
    var accent = av.color || '#e63946';

    var el = document.createElement('div');
    el.className = 'ld-react-panel ' + (isCorrect ? 'ld-ok' : 'ld-ko');
    el.style.setProperty('--ld-color', accent);
    el.innerHTML =
      '<img class="ld-react-avatar"' +
        ' src="' + _esc(av.img) + '"' +
        ' alt="' + _esc(child) + '"' +
        ' onerror="this.onerror=null;this.src=\'assets/images/avatars/luffy.jpg\'">' +
      '<div class="ld-react-text">' +
        '<div class="ld-react-emoji">' + m.e + '</div>' +
        '<div class="ld-react-msg">' + _esc(m.m) + '</div>' +
      '</div>';

    card.appendChild(el);
    setTimeout(function () {
      el.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }, 150);
  }

  /* ─── Utils ─────────────────────────────────────────────── */
  function _esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ─── Exposition ARCHI-01 ───────────────────────────────── */
  global.AP = global.AP || {};
  global.AP.components = global.AP.components || {};
  global.AP.components.LessonDialog = { renderCompanion, buildWarmupCard, reactWarmup };
  global.LessonDialog = global.AP.components.LessonDialog;

  console.info('💬 LessonDialog v2 — scène manga · avatar questioner · réactions émotionnelles');

})(window);
