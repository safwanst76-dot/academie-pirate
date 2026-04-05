/**
 * ACADÉMIE PIRATE — Lesson Dialog Component
 * js/components/lesson-dialog.js
 * Règles : ARCHI-01 · RD-01 · UX-01 · AV-01
 * Préfixe CSS : .ld-*
 *
 * Affiche l'avatar de l'enfant comme compagnon dans la leçon :
 * - Panneau héros : l'avatar demande au héros d'enseigner
 * - Contenu : l'avatar introduit le warmup
 * - Warmup : réaction animée après chaque réponse
 *
 * Usage :
 *   LessonDialog.renderCompanion(containerEl, options)
 *   LessonDialog.reactWarmup(questionIdx, isCorrect)
 *   LessonDialog.showIntro(containerEl, options)
 */

(function (global) {
  'use strict';

  /* ─── Résoudre l'avatar et l'enfant depuis AP.state ─────────── */
  function _getChild() {
    if (global.AP && global.AP.state) {
      return global.AP.state.get('child') || {};
    }
    return {};
  }

  function _getAvatar() {
    if (global.AP && global.AP.state) {
      return global.AP.state.get('avatar') || {};
    }
    // Fallback : playerData (rétro-compat)
    if (typeof global.playerData !== 'undefined') {
      return {
        id:    global.playerData.avatarId || 'luffy',
        img:   global.playerData.avatarImg || 'assets/images/avatars/luffy.png',
        color: global.playerData.avatarColor || '#e63946',
        name:  global.playerData.charName || 'Luffy',
        quote_lesson: global.playerData.avatarQuote || ''
      };
    }
    return { id: 'luffy', img: 'assets/images/avatars/luffy.png', color: '#e63946', name: 'Luffy' };
  }

  function _getChildName() {
    var child = _getChild();
    return child.username || child.name || 'Toi';
  }

  function _getQuoteLesson(avatar, heroName) {
    var quotes = avatar.quote_lesson
      ? [avatar.quote_lesson]
      : [
          'Allez ' + heroName + ' ! Montre-moi ce que tu sais !',
          'On y va, ' + heroName + ' ! J\'suis prêt !',
          'Explique-moi bien, ' + heroName + ' !',
        ];
    return quotes[0];
  }

  /* ─── Injecter les styles ────────────────────────────────────── */
  function _injectStyles() {
    if (document.getElementById('ld-styles')) return;
    var style = document.createElement('style');
    style.id = 'ld-styles';
    style.textContent = `
/* ═══ Lesson Dialog — .ld-* ═══ */
.ld-companion {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px 16px 0;
  animation: ld-slide-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both;
}
@keyframes ld-slide-in {
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
}

/* Avatar rond */
.ld-avatar-wrap {
  flex-shrink: 0;
  position: relative;
  width: 52px;
  height: 52px;
}
.ld-avatar-img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  border: 2.5px solid var(--ld-color, #e63946);
  box-shadow: 0 0 12px color-mix(in srgb, var(--ld-color, #e63946) 35%, transparent);
  transition: transform 0.3s var(--ap-ease-spring, cubic-bezier(0.175,0.885,0.32,1.275));
}
.ld-avatar-wrap.ld-celebrate .ld-avatar-img {
  animation: ld-bounce 0.6s cubic-bezier(0.175,0.885,0.32,1.275) 2;
}
.ld-avatar-wrap.ld-confused .ld-avatar-img {
  animation: ld-shake 0.4s ease 1;
}
@keyframes ld-bounce {
  0%,100% { transform:scale(1) translateY(0); }
  40%      { transform:scale(1.18) translateY(-6px); }
  70%      { transform:scale(0.95) translateY(2px); }
}
@keyframes ld-shake {
  0%,100% { transform:rotate(0deg); }
  25%      { transform:rotate(-8deg); }
  75%      { transform:rotate(8deg); }
}

/* Étoiles celebrate */
.ld-stars {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 1rem;
  opacity: 0;
  pointer-events: none;
}
.ld-avatar-wrap.ld-celebrate .ld-stars {
  animation: ld-stars-pop 0.5s ease 0.1s both;
}
@keyframes ld-stars-pop {
  0%   { opacity:0; transform:scale(0) rotate(-20deg); }
  60%  { opacity:1; transform:scale(1.2) rotate(10deg); }
  100% { opacity:1; transform:scale(1) rotate(0deg); }
}

/* Bulle dialogue manga */
.ld-bubble {
  background: rgba(255,255,255,0.97);
  color: #1a1a2e;
  border-radius: 14px 14px 14px 4px;
  padding: 10px 14px;
  font-family: 'Nunito', sans-serif;
  font-size: clamp(0.78rem, 2.2vw, 0.88rem);
  font-weight: 800;
  line-height: 1.45;
  max-width: 260px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  position: relative;
  flex: 1;
}
.ld-bubble::before {
  content: '';
  position: absolute;
  left: -8px;
  bottom: 10px;
  border: 8px solid transparent;
  border-right-color: rgba(255,255,255,0.97);
  border-left: 0;
}
.ld-bubble-name {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ld-color, #e63946);
  margin-bottom: 3px;
}
.ld-bubble-text {
  color: #1a1a2e;
}

/* Bulle de réaction inline (warmup) */
.ld-reaction {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 10px;
  animation: ld-slide-in 0.35s ease both;
}
.ld-reaction .ld-avatar-img {
  width: 40px;
  height: 40px;
}
.ld-reaction .ld-bubble {
  font-size: 0.8rem;
  padding: 8px 12px;
  max-width: 200px;
}

/* Intro warmup */
.ld-warmup-intro {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: color-mix(in srgb, var(--ld-color, #ffd700) 8%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--ld-color, #ffd700) 25%, transparent);
  border-radius: 12px;
  margin-bottom: 16px;
  animation: ld-slide-in 0.4s ease both;
}
.ld-warmup-intro .ld-avatar-img {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}
.ld-warmup-intro-text {
  font-family: 'Nunito', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--ap-text, #e8eaf6);
  line-height: 1.4;
}
.ld-warmup-intro-text strong {
  color: var(--ld-color, #ffd700);
}

/* Mobile */
@media (max-width: 380px) {
  .ld-bubble { max-width: 200px; font-size: 0.75rem; }
  .ld-avatar-img { width: 44px; height: 44px; }
}
`;
    document.head.appendChild(style);
  }

  /* ─── Rendu compagnon (panneau héros) ───────────────────────── */
  function renderCompanion(container, options) {
    _injectStyles();
    if (!container) return;

    options = options || {};
    var avatar   = _getAvatar();
    var child    = _getChildName();
    var heroName = options.heroName || 'le héros';
    var accent   = avatar.color || '#e63946';
    var quote    = options.quote || _getQuoteLesson(avatar, heroName);

    // Personnaliser avec le prénom si présent
    quote = quote.replace('{name}', child).replace('[name]', child);

    var el = document.createElement('div');
    el.className = 'ld-companion';
    el.style.setProperty('--ld-color', accent);
    el.innerHTML =
      '<div class="ld-avatar-wrap" id="ld-companion-avatar">' +
        '<img class="ld-avatar-img" src="' + _esc(avatar.img) + '"' +
          ' alt="' + _esc(avatar.name) + '"' +
          ' onerror="this.src=\'assets/images/avatars/luffy.png\'">' +
        '<span class="ld-stars">⭐</span>' +
      '</div>' +
      '<div class="ld-bubble">' +
        '<div class="ld-bubble-name" style="color:' + accent + '">' + _esc(child) + '</div>' +
        '<div class="ld-bubble-text">' + _esc(quote) + '</div>' +
      '</div>';

    container.appendChild(el);
  }

  /* ─── Intro section warmup ───────────────────────────────────── */
  function showWarmupIntro(container, options) {
    _injectStyles();
    if (!container) return;

    options = options || {};
    var avatar = _getAvatar();
    var child  = _getChildName();
    var accent = avatar.color || '#e63946';
    var text   = options.text ||
      '<strong>' + _esc(child) + '</strong> — à toi de jouer ! 2 questions éclair avant le quiz 🔥';

    var el = document.createElement('div');
    el.className = 'ld-warmup-intro';
    el.style.setProperty('--ld-color', accent);
    el.innerHTML =
      '<img class="ld-avatar-img" src="' + _esc(avatar.img) + '"' +
        ' alt="' + _esc(avatar.name) + '"' +
        ' onerror="this.src=\'assets/images/avatars/luffy.png\'" style="border:2.5px solid ' + accent + ';border-radius:50%;object-fit:cover;object-position:top">' +
      '<div class="ld-warmup-intro-text">' + text + '</div>';

    container.insertBefore(el, container.firstChild);
  }

  /* ─── Réaction au warmup ─────────────────────────────────────── */
  function reactWarmup(questionIdx, isCorrect) {
    _injectStyles();

    var avatar = _getAvatar();
    var child  = _getChildName();
    var accent = avatar.color || '#e63946';

    var cardEl = document.getElementById('lwucard_' + questionIdx);
    if (!cardEl) return;

    // Retirer une réaction précédente si elle existe
    var prev = cardEl.querySelector('.ld-reaction');
    if (prev) prev.remove();

    // Messages selon le résultat
    var messages = isCorrect
      ? [
          'Yes ! Trop fort ' + child + ' ! 🎉',
          'C\'est ça ! Bien joué ' + child + ' ! ⚡',
          'Parfait ! Tu maîtrises ça ! 💪',
          'BOOM ! En plein dans le mille ! ✨',
        ]
      : [
          'Hmm... c\'est pas grave ' + child + ' ! On retient ! 💡',
          'Presque ! La prochaine fois tu vas y arriver ! 🔥',
          'Pas de panique ' + child + ' — ça reste en mémoire ! 💪',
          'Continue ! L\'erreur c\'est la meilleure leçon ! ⚡',
        ];

    var msg = messages[Math.floor(Math.random() * messages.length)];

    // Créer la bulle de réaction
    var el = document.createElement('div');
    el.className = 'ld-reaction';
    el.style.setProperty('--ld-color', accent);
    el.innerHTML =
      '<div class="ld-avatar-wrap" id="ld-warmup-avatar-' + questionIdx + '">' +
        '<img class="ld-avatar-img" src="' + _esc(avatar.img) + '"' +
          ' alt="' + _esc(avatar.name) + '"' +
          ' onerror="this.src=\'assets/images/avatars/luffy.png\'"' +
          ' style="border:2px solid ' + accent + ';border-radius:50%;object-fit:cover;object-position:top">' +
        '<span class="ld-stars">⭐</span>' +
      '</div>' +
      '<div class="ld-bubble">' +
        '<div class="ld-bubble-name" style="color:' + accent + '">' + _esc(child) + '</div>' +
        '<div class="ld-bubble-text">' + _esc(msg) + '</div>' +
      '</div>';

    cardEl.appendChild(el);

    // Animation sur l'avatar
    setTimeout(function () {
      var wrap = document.getElementById('ld-warmup-avatar-' + questionIdx);
      if (!wrap) return;
      wrap.classList.remove('ld-celebrate', 'ld-confused');
      void wrap.offsetWidth; // reflow
      wrap.classList.add(isCorrect ? 'ld-celebrate' : 'ld-confused');
    }, 50);

    // Scroll smooth vers la réaction
    setTimeout(function () {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  }

  /* ─── Utils ──────────────────────────────────────────────────── */
  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ─── Exposition ARCHI-01 ────────────────────────────────────── */
  global.AP = global.AP || {};
  global.AP.components = global.AP.components || {};
  global.AP.components.LessonDialog = {
    renderCompanion:  renderCompanion,
    showWarmupIntro:  showWarmupIntro,
    reactWarmup:      reactWarmup
  };

  global.LessonDialog = global.AP.components.LessonDialog;

  console.info('💬 LessonDialog chargé — avatar compagnon dans les leçons');

})(window);
