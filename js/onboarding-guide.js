// ═══════════════════════════════════════════════════════
// ONBOARDING-GUIDE.JS — Académie Pirate
// Guide interactif pas-à-pas (Pattern B — Stripe/Duolingo style)
// Activé pour TOUS les nouveaux utilisateurs (SEO + organiques)
// ═══════════════════════════════════════════════════════
(function() {
  'use strict';

  var STATE = {
    step:    parseInt(localStorage.getItem('ap_onb_step')    || '0', 10),
    skipped: localStorage.getItem('ap_onb_skipped') === '1',
    done:    localStorage.getItem('ap_onb_done')    === '1'
  };

  var STEPS = [
    { id:1, type:'fullscreen', emoji:'⚓', title:'BIENVENUE À BORD !',
      lines:['Tu es à 6 étapes de l\'aventure éducative.',
             'On te guide pas-à-pas — promis, c\'est rapide.'],
      cta:"C'EST PARTI", ctaIcon:'🚀' },

    { id:2, type:'banner', screenId:'login-screen', target:'#loginEmail',
      title:'Ton email pirate',
      instruction:'👇 Saisis ton email puis clique sur "Envoyer le lien magique"',
      tip:'On ne demande pas de mot de passe, juste un email valide.' },

    { id:3, type:'fullscreen', emoji:'📧', title:'LIEN ENVOYÉ !',
      lines:['Va dans ta boîte mail et clique sur le lien magique.',
             '⚠️ Si tu ne vois rien, regarde dans tes SPAMS / Courriers indésirables.'],
      cta:"J'AI CLIQUÉ LE LIEN", ctaIcon:'✉️',
      hint:'Le lien expire après 1 heure' },

    { id:4, type:'banner', screenId:'af-parent-onboard', target:'#af-onboard-prenom',
      title:'Crée ton compte parent',
      instruction:'👇 Remplis Prénom et Nom puis clique sur "CRÉER MON COMPTE"',
      tip:'Le téléphone est optionnel — tu peux laisser vide.' },

    { id:5, type:'banner', screenId:'af-create-child', target:'#af-child-username',
      title:'Ton premier aventurier',
      instruction:'👇 Nomme ton enfant, choisis un avatar, crée un code secret (4-8 caractères)',
      tip:'Note bien le code secret — ton enfant en aura besoin pour se connecter !' },

    { id:6, type:'banner', screenId:'af-pin-entry', target:'#af-entry-pin-field',
      title:'Connexion de l\'enfant',
      instruction:'👇 Demande à ton enfant de saisir le code secret que tu viens de créer',
      tip:'C\'est la dernière étape avant l\'aventure !' },

    { id:7, type:'fullscreen', emoji:'🎉', title:'BRAVO CAPITAINE !',
      lines:['Ton équipage est prêt à embarquer.','Bonne aventure éducative !'],
      cta:'COMMENCER LE QUIZ', ctaIcon:'🏴‍☠️' }
  ];

  var TOTAL = STEPS.length;

  // ── CSS scope strict .ap-onb-* ──
  function injectCSS() {
    if (document.getElementById('ap-onb-styles')) return;
    var st = document.createElement('style');
    st.id = 'ap-onb-styles';
    st.textContent = [
      '@keyframes apOnbFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
      '@keyframes apOnbSlideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}',
      '@keyframes apOnbBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}',
      '@keyframes apOnbPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,.6)}50%{box-shadow:0 0 0 12px rgba(255,215,0,0)}}',
      '.ap-onb-fullscreen{position:fixed;inset:0;z-index:5000;background:rgba(5,8,16,.97);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;padding:20px;animation:apOnbFadeIn .4s ease}',
      '.ap-onb-card{max-width:480px;width:100%;background:linear-gradient(135deg,rgba(15,20,40,.95),rgba(10,13,26,.98));border:2px solid rgba(255,215,0,.3);border-radius:24px;padding:32px 24px;box-shadow:0 20px 60px rgba(0,0,0,.8);text-align:center}',
      '.ap-onb-progress{display:flex;gap:8px;justify-content:center;margin-bottom:8px}',
      '.ap-onb-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.15);transition:all .3s}',
      '.ap-onb-dot.done{background:#22c55e}',
      '.ap-onb-dot.active{background:#ffd700;animation:apOnbPulse 1.8s ease infinite;transform:scale(1.3)}',
      '.ap-onb-step-label{font-family:Nunito,sans-serif;font-size:.75rem;font-weight:900;color:rgba(255,215,0,.7);letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}',
      '.ap-onb-emoji{font-size:4rem;margin-bottom:8px;filter:drop-shadow(0 4px 16px rgba(255,215,0,.3))}',
      '.ap-onb-title{font-family:Bangers,cursive;font-size:clamp(1.8rem,6vw,2.4rem);color:#ffd700;letter-spacing:3px;margin-bottom:16px;text-shadow:2px 2px 0 rgba(0,0,0,.4)}',
      '.ap-onb-lines{font-family:Nunito,sans-serif;font-size:.95rem;font-weight:700;color:rgba(255,255,255,.85);line-height:1.6;margin-bottom:24px}',
      '.ap-onb-lines p{margin:8px 0}',
      '.ap-onb-cta{font-family:Bangers,cursive;font-size:1.25rem;letter-spacing:3px;padding:14px 24px;border-radius:14px;border:none;background:linear-gradient(135deg,#e63946,#f97316);color:#fff;cursor:pointer;width:100%;box-shadow:0 6px 24px rgba(230,57,70,.45);text-shadow:2px 2px 0 rgba(0,0,0,.3);transition:transform .15s;-webkit-tap-highlight-color:transparent}',
      '.ap-onb-cta:hover{transform:translateY(-2px)}',
      '.ap-onb-cta:active{transform:translateY(0)}',
      '.ap-onb-hint{font-family:Nunito,sans-serif;font-size:.72rem;font-weight:700;color:rgba(255,255,255,.4);margin-top:12px}',
      '.ap-onb-skip-btn{margin-top:16px;background:transparent;border:none;color:rgba(255,255,255,.4);font-family:Nunito,sans-serif;font-size:.78rem;font-weight:700;text-decoration:underline;cursor:pointer;padding:6px 12px}',
      '.ap-onb-skip-btn:hover{color:rgba(255,255,255,.7)}',
      '.ap-onb-banner{position:fixed;top:0;left:0;right:0;z-index:3500;background:linear-gradient(135deg,rgba(230,57,70,.97),rgba(249,115,22,.97));backdrop-filter:blur(8px);box-shadow:0 6px 24px rgba(0,0,0,.4);animation:apOnbSlideDown .5s ease;color:#fff}',
      '.ap-onb-banner-inner{max-width:720px;margin:0 auto;padding:12px 16px 14px;position:relative}',
      '.ap-onb-banner-progress{display:flex;gap:6px;margin-bottom:6px}',
      '.ap-onb-banner-progress .ap-onb-dot{width:7px;height:7px;background:rgba(255,255,255,.3)}',
      '.ap-onb-banner-progress .ap-onb-dot.done{background:rgba(255,255,255,.95)}',
      '.ap-onb-banner-progress .ap-onb-dot.active{background:#ffd700;transform:scale(1.4)}',
      '.ap-onb-banner-step{font-family:Bangers,cursive;font-size:.95rem;letter-spacing:2px;margin-bottom:4px;text-shadow:1px 1px 0 rgba(0,0,0,.3)}',
      '.ap-onb-banner-instruction{font-family:Nunito,sans-serif;font-size:.85rem;font-weight:800;line-height:1.4}',
      '.ap-onb-banner-tip{font-family:Nunito,sans-serif;font-size:.72rem;font-weight:700;color:rgba(255,255,255,.85);margin-top:4px;font-style:italic}',
      '.ap-onb-banner-skip{position:absolute;top:8px;right:10px;background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.25);color:#fff;font-family:Nunito,sans-serif;font-size:.7rem;font-weight:700;padding:4px 10px;border-radius:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}',
      '.ap-onb-arrow{position:fixed;z-index:5500;font-size:2.5rem;pointer-events:none;animation:apOnbBounce 1s ease infinite;filter:drop-shadow(0 4px 8px rgba(0,0,0,.5))}',
      'body.ap-onb-banner-active{padding-top:90px}',
      '@media(max-width:480px){.ap-onb-card{padding:24px 18px}.ap-onb-emoji{font-size:3rem}.ap-onb-title{font-size:1.6rem}body.ap-onb-banner-active{padding-top:110px}}',
      '@media(prefers-reduced-motion:reduce){.ap-onb-fullscreen,.ap-onb-banner,.ap-onb-dot.active,.ap-onb-arrow{animation:none!important}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function dotsHtml(current) {
    var h = '';
    for (var i = 1; i <= TOTAL; i++) {
      var cls = (i === current) ? 'active' : (i < current ? 'done' : '');
      h += '<span class="ap-onb-dot ' + cls + '"></span>';
    }
    return h;
  }

  function cleanup() {
    ['ap-onb-fullscreen','ap-onb-banner','ap-onb-arrow'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.remove();
    });
    document.body.classList.remove('ap-onb-banner-active');
  }

  function showFullscreen(step) {
    cleanup();
    var d = document.createElement('div');
    d.id = 'ap-onb-fullscreen';
    d.className = 'ap-onb-fullscreen';
    d.setAttribute('role', 'dialog');
    d.innerHTML =
      '<div class="ap-onb-card">' +
        '<div class="ap-onb-progress">' + dotsHtml(step.id) + '</div>' +
        '<div class="ap-onb-step-label">Étape ' + step.id + ' sur ' + TOTAL + '</div>' +
        '<div class="ap-onb-emoji">' + step.emoji + '</div>' +
        '<div class="ap-onb-title">' + step.title + '</div>' +
        '<div class="ap-onb-lines">' + step.lines.map(function(l){return '<p>'+l+'</p>';}).join('') + '</div>' +
        '<button class="ap-onb-cta" id="ap-onb-cta-btn">' + (step.ctaIcon || '') + ' ' + step.cta + ' →</button>' +
        (step.hint ? '<div class="ap-onb-hint">' + step.hint + '</div>' : '') +
        '<button class="ap-onb-skip-btn" id="ap-onb-skip-btn">Passer le guide</button>' +
      '</div>';
    document.body.appendChild(d);
    document.getElementById('ap-onb-cta-btn').addEventListener('click', next);
    document.getElementById('ap-onb-skip-btn').addEventListener('click', skipGuide);
  }

  function showBanner(step) {
    cleanup();
    var b = document.createElement('div');
    b.id = 'ap-onb-banner';
    b.className = 'ap-onb-banner';
    b.innerHTML =
      '<div class="ap-onb-banner-inner">' +
        '<div class="ap-onb-banner-progress">' + dotsHtml(step.id) + '</div>' +
        '<div class="ap-onb-banner-step">Étape ' + step.id + '/' + TOTAL + ' — ' + step.title + '</div>' +
        '<div class="ap-onb-banner-instruction">' + step.instruction + '</div>' +
        (step.tip ? '<div class="ap-onb-banner-tip">💡 ' + step.tip + '</div>' : '') +
        '<button class="ap-onb-banner-skip" id="ap-onb-skip-btn">Passer</button>' +
      '</div>';
    document.body.appendChild(b);
    document.body.classList.add('ap-onb-banner-active');
    document.getElementById('ap-onb-skip-btn').addEventListener('click', skipGuide);

    if (step.target) {
      setTimeout(function(){ pointAt(step.target); }, 600);
    }
  }

  function pointAt(selector) {
    var t = document.querySelector(selector);
    if (!t || t.offsetParent === null) return;
    var rect = t.getBoundingClientRect();
    var arr = document.createElement('div');
    arr.id = 'ap-onb-arrow';
    arr.className = 'ap-onb-arrow';
    arr.textContent = '👇';
    arr.style.left = (rect.left + rect.width/2 - 22) + 'px';
    arr.style.top  = (rect.top - 56) + 'px';
    document.body.appendChild(arr);
  }

  function setStep(n) {
    STATE.step = n;
    localStorage.setItem('ap_onb_step', String(n));
  }

  function next() {
    if (STATE.step >= TOTAL) { complete(); return; }
    setStep(STATE.step + 1);
    render();
  }

  function complete() {
    localStorage.setItem('ap_onb_done', '1');
    STATE.done = true;
    cleanup();
  }

  function skipGuide() {
    localStorage.setItem('ap_onb_skipped', '1');
    STATE.skipped = true;
    cleanup();
  }

  function getVisibleScreen() {
    var ids = ['login-screen','af-parent-onboard','af-create-child','af-pin-entry'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.offsetParent !== null) {
        var cs = getComputedStyle(el);
        if (cs.display !== 'none' && cs.visibility !== 'hidden') return ids[i];
      }
    }
    return null;
  }

  function render() {
    if (STATE.done || STATE.skipped) { cleanup(); return; }
    var s = STEPS[STATE.step - 1];
    if (!s) return;
    if (s.type === 'fullscreen') {
      showFullscreen(s);
    } else if (s.type === 'banner') {
      var visible = getVisibleScreen();
      if (visible === s.screenId) showBanner(s);
      else cleanup();
    }
  }

  function handleScreenChange() {
    if (STATE.done || STATE.skipped) return;
    if (document.getElementById('ap-onb-fullscreen')) return;

    var visible = getVisibleScreen();
    var map = { 'login-screen': 2, 'af-parent-onboard': 4, 'af-create-child': 5, 'af-pin-entry': 6 };
    var expected = map[visible];

    if (expected && STATE.step < expected) {
      setStep(expected);
      render();
    } else if (expected && STATE.step === expected) {
      if (!document.getElementById('ap-onb-banner')) render();
    } else if (!visible && STATE.step >= 4) {
      // L'utilisateur a quitté les écrans onboarding → quiz lancé
      setStep(7);
      render();
    }
  }

  function attachSubmitListeners() {
    // Detect "Envoyer le lien magique" → step 3
    document.addEventListener('click', function(e) {
      if (STATE.done || STATE.skipped) return;
      var t = e.target;
      if (!t) return;
      var txt = (t.textContent || '').toLowerCase();
      var isMagic = txt.indexOf('magique') >= 0 || txt.indexOf('envoyer le lien') >= 0;
      if (isMagic && STATE.step <= 2) {
        setTimeout(function() {
          var email = document.getElementById('loginEmail');
          if (email && email.value && email.value.indexOf('@') > 0) {
            setStep(3);
            render();
          }
        }, 600);
      }
    }, true);
  }

  function init() {
    if (STATE.done || STATE.skipped) {
      console.info('[onb] guide skippé ou terminé');
      return;
    }
    injectCSS();
    if (STATE.step === 0) setStep(1);
    render();

    // Observer les changements d'écran
    if (window.MutationObserver) {
      var obs = new MutationObserver(function() {
        handleScreenChange();
      });
      obs.observe(document.body, {
        attributes: true, childList: true, subtree: true,
        attributeFilter: ['style','class']
      });
    }
    setInterval(handleScreenChange, 1000); // backup polling

    attachSubmitListeners();
    console.info('[onb] guide initialisé, step =', STATE.step);
  }

  // API publique
  window.AP_Onboarding = {
    init: init,
    next: next,
    skip: skipGuide,
    complete: complete,
    reset: function() {
      localStorage.removeItem('ap_onb_step');
      localStorage.removeItem('ap_onb_done');
      localStorage.removeItem('ap_onb_skipped');
      cleanup();
      location.reload();
    },
    state: STATE
  };

  console.info('🏴\u200d☠️ onboarding-guide.js chargé — appel : AP_Onboarding.init()');
})();
