/**
 * ACADÉMIE PIRATE — Mini-jeu : Flashcards
 * Phase 3 — js/engine/minigames/flashcards.js
 * Moteur autonome — aucune dépendance externe
 * Règle PR-00 : Production Ready
 * Préfixe DOM : .mg-fc-*
 *
 * Usage :
 *   MiniFlashcards.init(containerEl, data, onComplete)
 *
 * data = {
 *   title: '🃏 Vocabulaire express',
 *   cards: [
 *     { front: 'one', back: '1 — un / une', example: 'I have one titan.' },
 *     ...
 *   ]
 * }
 */

(function (global) {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     ÉTAT INTERNE (isolé par appel)
  ════════════════════════════════════════════════════════════ */

  function createSession(cards) {
    return {
      deck:        shuffle(cards.slice()),  // copie mélangée
      review:      [],                      // cartes à revoir
      done:        [],                      // cartes maîtrisées
      currentIdx:  0,
      round:       1,
      maxRounds:   3,
      flipped:     false,
    };
  }

  /* ═══════════════════════════════════════════════════════════
     POINT D'ENTRÉE PUBLIC
  ════════════════════════════════════════════════════════════ */

  function init(container, data, onComplete) {
    if (!container || !data || !Array.isArray(data.cards) || data.cards.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    var sess = createSession(data.cards);
    render(container, data, sess, onComplete);
  }

  /* ═══════════════════════════════════════════════════════════
     RENDU PRINCIPAL
  ════════════════════════════════════════════════════════════ */

  function render(container, data, sess, onComplete) {
    container.innerHTML = buildShell(data, sess);
    bindEvents(container, data, sess, onComplete);
    showCard(container, sess);
    updateProgress(container, sess);
  }

  function buildShell(data, sess) {
    return [
      '<div class="mg-fc-wrap">',

        '<div class="mg-fc-header">',
          '<div class="mg-fc-title">' + esc(data.title || '🃏 Flashcards') + '</div>',
          '<div class="mg-fc-meta">',
            '<span class="mg-fc-round" id="mg-fc-round">Tour ' + sess.round + '/' + sess.maxRounds + '</span>',
            '<span class="mg-fc-prog-txt" id="mg-fc-prog-txt"></span>',
          '</div>',
          '<div class="mg-fc-progress-track">',
            '<div class="mg-fc-progress-fill" id="mg-fc-progress-fill" style="width:0%"></div>',
          '</div>',
        '</div>',

        '<div class="mg-fc-stage">',

          // Carte principale
          '<div class="mg-fc-card-wrap" id="mg-fc-card-wrap">',
            '<div class="mg-fc-card" id="mg-fc-card">',
              '<div class="mg-fc-front" id="mg-fc-front">',
                '<div class="mg-fc-hint">Tap pour retourner</div>',
                '<div class="mg-fc-word" id="mg-fc-word"></div>',
                '<div class="mg-fc-tap-icon">👆</div>',
              '</div>',
              '<div class="mg-fc-back" id="mg-fc-back">',
                '<div class="mg-fc-translation" id="mg-fc-translation"></div>',
                '<div class="mg-fc-example" id="mg-fc-example"></div>',
              '</div>',
            '</div>',
          '</div>',

          // Boutons réponse (cachés jusqu'au flip)
          '<div class="mg-fc-actions" id="mg-fc-actions" style="opacity:0;pointer-events:none">',
            '<button class="mg-fc-btn mg-fc-btn-review" id="mg-fc-btn-review">',
              '🔄 À revoir',
            '</button>',
            '<button class="mg-fc-btn mg-fc-btn-known" id="mg-fc-btn-known">',
              '✅ Je connais',
            '</button>',
          '</div>',

        '</div>',

        // Légende compteurs
        '<div class="mg-fc-counters">',
          '<div class="mg-fc-counter mg-fc-counter-done">',
            '<span class="mg-fc-counter-icon">✅</span>',
            '<span id="mg-fc-cnt-done">0</span> maîtrisé' + (data.cards.length > 1 ? 'es' : 'e'),
          '</div>',
          '<div class="mg-fc-counter mg-fc-counter-review">',
            '<span class="mg-fc-counter-icon">🔄</span>',
            '<span id="mg-fc-cnt-review">0</span> à revoir',
          '</div>',
        '</div>',

        // Bouton passer
        '<button class="mg-fc-skip-btn" id="mg-fc-skip-btn">⏭ Passer les flashcards</button>',

      '</div>',
    ].join('');
  }

  /* ═══════════════════════════════════════════════════════════
     AFFICHER LA CARTE COURANTE
  ════════════════════════════════════════════════════════════ */

  function showCard(container, sess) {
    var card = container.querySelector('#mg-fc-card');
    var front = container.querySelector('#mg-fc-word');
    var backTrans = container.querySelector('#mg-fc-translation');
    var backEx = container.querySelector('#mg-fc-example');
    var actions = container.querySelector('#mg-fc-actions');
    if (!card || !front) return;

    var current = sess.deck[sess.currentIdx];
    if (!current) return;

    // Reset flip state
    sess.flipped = false;
    card.classList.remove('mg-fc-flipped');

    // Contenu
    front.innerHTML = esc(current.front);
    backTrans.innerHTML = esc(current.back || '');
    backEx.innerHTML = current.example
      ? '<em>' + esc(current.example) + '</em>'
      : '';

    // Cacher boutons
    actions.style.opacity = '0';
    actions.style.pointerEvents = 'none';

    // Animation entrée
    var wrap = container.querySelector('#mg-fc-card-wrap');
    if (wrap) {
      wrap.classList.remove('mg-fc-slide-in');
      void wrap.offsetWidth; // reflow
      wrap.classList.add('mg-fc-slide-in');
    }
  }

  /* ═══════════════════════════════════════════════════════════
     FLIP
  ════════════════════════════════════════════════════════════ */

  function flipCard(container, sess) {
    if (sess.flipped) return;
    sess.flipped = true;

    var card = container.querySelector('#mg-fc-card');
    var actions = container.querySelector('#mg-fc-actions');
    if (!card) return;

    card.classList.add('mg-fc-flipped');

    // Afficher boutons avec délai (pendant l'animation flip)
    setTimeout(function () {
      if (actions) {
        actions.style.opacity = '1';
        actions.style.pointerEvents = 'auto';
      }
    }, 320);
  }

  /* ═══════════════════════════════════════════════════════════
     RÉPONSE UTILISATEUR
  ════════════════════════════════════════════════════════════ */

  function answer(container, data, sess, onComplete, known) {
    if (!sess.flipped) return;

    var current = sess.deck[sess.currentIdx];
    if (!current) return;

    if (known) {
      sess.done.push(current);
      if (typeof sfxOK === 'function') sfxOK();
    } else {
      sess.review.push(current);
      if (typeof sfxKO === 'function') sfxKO();
    }

    updateCounters(container, sess);
    sess.currentIdx++;

    if (sess.currentIdx >= sess.deck.length) {
      // Fin du deck courant
      endDeck(container, data, sess, onComplete);
    } else {
      showCard(container, sess);
      updateProgress(container, sess);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     FIN D'UN DECK — passer au tour suivant ou terminer
  ════════════════════════════════════════════════════════════ */

  function endDeck(container, data, sess, onComplete) {
    // Toutes les cartes maîtrisées → fin immédiate
    if (sess.review.length === 0) {
      showCompletion(container, sess, onComplete, true);
      return;
    }

    // Tours restants épuisés → fin
    if (sess.round >= sess.maxRounds) {
      showCompletion(container, sess, onComplete, false);
      return;
    }

    // Prochain tour avec les cartes à revoir
    sess.round++;
    sess.deck = shuffle(sess.review.slice());
    sess.review = [];
    sess.currentIdx = 0;

    // Mettre à jour le tour
    var roundEl = container.querySelector('#mg-fc-round');
    if (roundEl) roundEl.textContent = 'Tour ' + sess.round + '/' + sess.maxRounds;

    showCard(container, sess);
    updateProgress(container, sess);
  }

  /* ═══════════════════════════════════════════════════════════
     ÉCRAN DE FIN
  ════════════════════════════════════════════════════════════ */

  function showCompletion(container, sess, onComplete, perfect) {
    var total = sess.done.length + sess.review.length;
    var doneCount = sess.done.length;
    var pct = total > 0 ? Math.round(doneCount / total * 100) : 100;

    var star = pct === 100 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : '⭐';
    var msg = pct === 100
      ? 'Parfait ! Tu maîtrises toutes les cartes !'
      : pct >= 70
        ? 'Bien joué ! Continue à pratiquer les autres.'
        : 'Continue à t\'entraîner, tu vas y arriver !';

    container.innerHTML = [
      '<div class="mg-fc-wrap mg-fc-completion">',
        '<div class="mg-fc-done-stars">' + star + '</div>',
        '<div class="mg-fc-done-score">' + doneCount + ' / ' + total + '</div>',
        '<div class="mg-fc-done-label">cartes maîtrisées</div>',
        '<div class="mg-fc-done-msg">' + esc(msg) + '</div>',
        '<button class="mg-fc-continue-btn" id="mg-fc-continue">',
          'Continuer la leçon →',
        '</button>',
      '</div>',
    ].join('');

    var btn = container.querySelector('#mg-fc-continue');
    if (btn) btn.addEventListener('click', function () {
      if (onComplete) onComplete();
    });
  }

  /* ═══════════════════════════════════════════════════════════
     MISE À JOUR UI
  ════════════════════════════════════════════════════════════ */

  function updateProgress(container, sess) {
    var total = sess.deck.length;
    var done = sess.currentIdx;
    var pct = total > 0 ? Math.round(done / total * 100) : 0;

    var fill = container.querySelector('#mg-fc-progress-fill');
    var txt  = container.querySelector('#mg-fc-prog-txt');
    if (fill) fill.style.width = pct + '%';
    if (txt)  txt.textContent = done + ' / ' + total;
  }

  function updateCounters(container, sess) {
    var cntDone   = container.querySelector('#mg-fc-cnt-done');
    var cntReview = container.querySelector('#mg-fc-cnt-review');
    if (cntDone)   cntDone.textContent   = sess.done.length;
    if (cntReview) cntReview.textContent = sess.review.length;
  }

  /* ═══════════════════════════════════════════════════════════
     BINDING ÉVÉNEMENTS
  ════════════════════════════════════════════════════════════ */

  function bindEvents(container, data, sess, onComplete) {
    // Flip sur clic carte
    var card = container.querySelector('#mg-fc-card');
    if (card) card.addEventListener('click', function () {
      flipCard(container, sess);
    });

    // Bouton "Je connais"
    var btnKnown = container.querySelector('#mg-fc-btn-known');
    if (btnKnown) btnKnown.addEventListener('click', function (e) {
      e.stopPropagation();
      answer(container, data, sess, onComplete, true);
    });

    // Bouton "À revoir"
    var btnReview = container.querySelector('#mg-fc-btn-review');
    if (btnReview) btnReview.addEventListener('click', function (e) {
      e.stopPropagation();
      answer(container, data, sess, onComplete, false);
    });

    // Bouton passer
    var btnSkip = container.querySelector('#mg-fc-skip-btn');
    if (btnSkip) btnSkip.addEventListener('click', function () {
      if (onComplete) onComplete();
    });

    // Swipe gauche/droite (mobile) — natif touch
    var touchStartX = null;
    if (card) {
      card.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      card.addEventListener('touchend', function (e) {
        if (touchStartX === null || !sess.flipped) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) < 50) return; // trop court
        answer(container, data, sess, onComplete, dx > 0); // droite = ✅, gauche = 🔄
      }, { passive: true });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     UTILITAIRES
  ════════════════════════════════════════════════════════════ */

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ═══════════════════════════════════════════════════════════
     EXPOSITION PUBLIQUE
  ════════════════════════════════════════════════════════════ */

  global.MiniFlashcards = { init: init };

})(window);
