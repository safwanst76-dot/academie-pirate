// ═══════════════════════════════════════════════════════════════
// QUIZ-ROUTER-ENGLISH.JS V2 — Académie Pirate
// Navigation : sélection niveau → grille îles → leçon → quiz
// Fond animé : Jikan API AOT (ID 16498) en priorité
// Leçon : lesson_english(niveau, numero, callback) avant quiz
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var _currentNiveau = null;
  var _chapitres     = [];
  var _bgLoaded      = false;
  var MATIERE_CODE   = 'english';

  var STORAGE_AOT = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/';

  // ── Données cinématiques par île (niveau CM2 = îles 1-8) ──────
  // Clés : 'niveau_numero' — ex: 'cm2_1', '6eme_3', '4eme_7'
  var AOT_ISLE_INTRO = {
    // ── CM2 ──────────────────────────────────────────────────────
    'cm2_1': { bg:'#0a0a00', lines:["L'ALPHABET…","… ANGLAIS !!","26 lettres pour la liberté !"],       kanji:'自由 !!', kanjiColor:'#8b6914', bubble:"L'alphabet, c'est la première étape vers la liberté ! 26 lettres pour conquérir l'anglais !" },
    'cm2_2': { bg:'#000a0a', lines:["LES NOMBRES…","… EN ANGLAIS !!","One, two, three — en avant !"],   kanji:'数字 !!', kanjiColor:'#4a5c3f', bubble:"Les chiffres sont des armes. Compte de 1 à 100 comme un vrai soldat de l'Armée d'Exploration !" },
    'cm2_3': { bg:'#0a0500', lines:["LES COULEURS…","… DU MONDE !!","Red, blue, green !"],              kanji:'色彩 !!', kanjiColor:'#c0a030', bubble:"Les couleurs du monde sont infinies ! Apprends-les en anglais et peins ta liberté !" },
    'cm2_4': { bg:'#050a00', lines:["LES ANIMAUX…","… SAUVAGES !!","Cat, dog, lion !"],                 kanji:'動物 !!', kanjiColor:'#8b6914', bubble:"Même les animaux méritent le respect. Connais leurs noms en anglais, c'est un ordre !" },
    'cm2_5': { bg:'#0a0008', lines:["LA FAMILLE…","… EN ANGLAIS !!","Mum, dad, sister !"],              kanji:'家族 !!', kanjiColor:'#4a5c3f', bubble:"La famille, c'est ce qu'on choisit. Apprenons les membres de la famille en anglais !" },
    'cm2_6': { bg:'#080005', lines:["LE CORPS…","… HUMAIN !!","Head, shoulders, knees !"],             kanji:'身体 !!', kanjiColor:'#8b6914', bubble:"Connais ton corps comme tu connais ton équipement ! Tête, épaules, genoux et pieds !" },
    'cm2_7': { bg:'#00080a', lines:["L'ÉCOLE…","… EN ANGLAIS !!","Teacher, book, Monday !"],           kanji:'学校 !!', kanjiColor:'#4a5c3f', bubble:"À l'école on apprend, on découvre, on grandit ! Voici le vocabulaire de l'école en anglais !" },
    'cm2_8': { bg:'#0a0800', lines:["LA MÉTÉO…","… EN ANGLAIS !!","Sunny, rainy, windy !"],            kanji:'天気 !!', kanjiColor:'#8b6914', bubble:"Un bon commandant connaît la météo avant la mission ! Apprenons à décrire le temps qu'il fait !" },
    // ── 6ème ─────────────────────────────────────────────────────
    '6eme_1': { bg:'#00100a', lines:["LE PRÉSENT…","… SIMPLE !!","He speaks, she runs !"],             kanji:'現在 !!', kanjiColor:'#4a5c3f', bubble:"Le Present Simple, c'est l'arme de base ! He speaks, she goes — maîtrise le +s de la 3ème personne !" },
    '6eme_2': { bg:'#080010', lines:["BE ET HAVE…","… LES FONDATIONS !!","I am, she has !"],           kanji:'存在 !!', kanjiColor:'#8b6914', bubble:"BE et HAVE sont les deux verbes fondamentaux. I am, you are, he IS — pas d'excuses pour les oublier !" },
    '6eme_3': { bg:'#100800', lines:["A, AN, THE…","… LES ARTICLES !!","A cat, the sun !"],            kanji:'冠詞 !!', kanjiColor:'#c0a030', bubble:"A, an, the — trois petits mots, une grande différence ! Écoute le son, pas la lettre !" },
    '6eme_4': { bg:'#001008', lines:["LES PLURIELS…","… EN ANGLAIS !!","Cats, children, sheep !"],    kanji:'複数 !!', kanjiColor:'#4a5c3f', bubble:"Un soldat, deux soldats ! Les pluriels en anglais ont leurs règles — et leurs exceptions !" },
    '6eme_5': { bg:'#100010', lines:["LES ADJECTIFS…","… INVARIABLES !!","Big, beautiful, old !"],    kanji:'形容詞 !!', kanjiColor:'#8b6914', bubble:"Les adjectifs, ce sont les couleurs du langage ! Et en anglais, ils ne s'accordent JAMAIS !" },
    '6eme_6': { bg:'#001010', lines:["LES PRÉPOSITIONS…","… DE LIEU !","In, on, under !"],            kanji:'前置詞 !!', kanjiColor:'#c0a030', bubble:"La position de tes soldats sur le terrain, c'est comme les prépositions — in, on, under, between !" },
    '6eme_7': { bg:'#080010', lines:["LES QUESTIONS…","… EN ANGLAIS !!","Do you? Where does?"],       kanji:'質問 !!', kanjiColor:'#4a5c3f', bubble:"Do you speak English? Does she play sports? Les questions au Present Simple, c'est fastoche !" },
    '6eme_8': { bg:'#100500', lines:["VOCABULAIRE…","… QUOTIDIEN !!","Food, routines, always !"],     kanji:'日常 !!', kanjiColor:'#8b6914', bubble:"La nourriture, c'est ma passion ! Et le vocabulaire quotidien c'est la nourriture de l'esprit !" },
    // ── 5ème ─────────────────────────────────────────────────────
    '5eme_1': { bg:'#150000', lines:["LE PASSÉ…","… SIMPLE !!","I walked, she played !"],             kanji:'過去 !!', kanjiColor:'#8b6914', bubble:"Le passé m'obsède ! Le Past Simple parle d'actions terminées — walked, played, stopped !" },
    '5eme_2': { bg:'#001500', lines:["LES IRRÉGULIERS…","… À MAÎTRISER !!","Go, went, gone !"],      kanji:'不規則 !!', kanjiColor:'#4a5c3f', bubble:"Les irréguliers, c'est comme l'entraînement — il faut les répéter jusqu'à les connaître par cœur !" },
    '5eme_3': { bg:'#000015', lines:["L'ACTION…","… EN COURS !!","I am running now !"],               kanji:'進行 !!', kanjiColor:'#c0a030', bubble:"Le Present Continuous ! I am explaining grammar RIGHT NOW — l'action est en train de se passer !" },
    '5eme_4': { bg:'#150010', lines:["LES MODAUX…","… LES POUVOIRS !!","Can, must, should !"],        kanji:'助動詞 !!', kanjiColor:'#8b6914', bubble:"Les modaux expriment la possibilité, l'obligation, le conseil — après eux, toujours la base verbale !" },
    '5eme_5': { bg:'#001500', lines:["LES COMPARATIFS…","… PLUS GRAND !!","Taller, more beautiful !"], kanji:'比較 !!', kanjiColor:'#4a5c3f', bubble:"Mon cheval est PLUS rapide que le tien ! Plus grand, plus fort — maîtrise les comparatifs !" },
    '5eme_6': { bg:'#150500', lines:["LE PASSÉ…","… CONTINU !!","Was running, were singing !"],      kanji:'過去進行 !!', kanjiColor:'#c0a030', bubble:"Past ou Continuous ? C'est comme choisir les bonnes armes — les deux ont leur moment !" },
    '5eme_7': { bg:'#050015', lines:["LES QUESTIONS…","… AU PASSÉ !!","Did she? What happened?"],    kanji:'過去質問 !!', kanjiColor:'#8b6914', bubble:"Les questions au passé permettent de reconstituer l'histoire — Did, WH-, who est sujet ?" },
    '5eme_8': { bg:'#001510', lines:["RÉVISIONS…","… 5ÈME !!","Tous les temps réunis !"],            kanji:'復習 !!', kanjiColor:'#4a5c3f', bubble:"Récapitulatif 5ème : présent, passé, continu, modaux, comparatifs — tout en un combat final !" },
    // ── 4ème ─────────────────────────────────────────────────────
    '4eme_1': { bg:'#0a0020', lines:["LE PRESENT PERFECT…","… L'EXPÉRIENCE !!","I have been, she has seen !"], kanji:'経験 !!', kanjiColor:'#8b6914', bubble:"Le Present Perfect relie le passé et le présent — I have lived tant de choses qui façonnent qui je suis !" },
    '4eme_2': { bg:'#200005', lines:["SINCE OU FOR…","… LA DURÉE !!","Since 2020, for 3 years !"],   kanji:'継続 !!', kanjiColor:'#4a5c3f', bubble:"Present Perfect ou Past Simple ? Je n'ai pas le temps pour les erreurs — distingue-les précisément !" },
    '4eme_3': { bg:'#001020', lines:["LE FUTUR WILL…","… LES PRÉDICTIONS !!","It will snow !"],      kanji:'未来 !!', kanjiColor:'#c0a030', bubble:"Le futur avec WILL ! Prédiction, décision spontanée, promesse — will est l'arme du futur incertain !" },
    '4eme_4': { bg:'#200010', lines:["GOING TO…","… LES PLANS !!","I'm going to study !"],           kanji:'計画 !!', kanjiColor:'#8b6914', bubble:"Going to, c'est pour les plans stratégiques déjà décidés — une attaque préparée, un futur certain !" },
    '4eme_5': { bg:'#102000', lines:["LES SUPERLATIFS…","… LE MEILLEUR !!","The best, the worst !"], kanji:'最上級 !!', kanjiColor:'#4a5c3f', bubble:"Comparatifs ET superlatifs ! Le plus fort, le meilleur — THE best, THE most difficult !" },
    '4eme_6': { bg:'#001020', lines:["QUESTION TAGS…","… LA CONFIRMATION !!","isn't she? don't you?"], kanji:'付加疑問 !!', kanjiColor:'#c0a030', bubble:"Les question tags, c'est chercher une confirmation — You understand me, don't you ?" },
    '4eme_7': { bg:'#200000', lines:["LA VOIX PASSIVE…","… LA TRANSFORMATION !!","Was destroyed !"], kanji:'受動態 !!', kanjiColor:'#8b6914', bubble:"La voix passive ! Le mur a été attaqué — on ne sait pas qui, mais le résultat est là !" },
    '4eme_8': { bg:'#002010', lines:["RÉVISIONS…","… 4ÈME !!","PP, will, going to, passif !"],       kanji:'総復習 !!', kanjiColor:'#4a5c3f', bubble:"Grande révision de 4ème ! Present Perfect, will, going to, superlatifs, passif — tout réuni !" },
    // ── 3ème Brevet B1 ─────────────────────────────────────────────
    '3eme_1': { bg:'#001530', lines:["PAST SIMPLE…","… PAST CONTINUOUS !!","While I was watching…"], kanji:'過去 !!', kanjiColor:'#3b82f6', bubble:"Past Simple raconte le passé terminé, Past Continuous décrit ce qui était en cours. Use both !" },
    '3eme_2': { bg:'#003015', lines:["PRESENT PERFECT…","… SINCE & FOR !!","I have known since…"],   kanji:'現在完了 !!', kanjiColor:'#3b82f6', bubble:"Present Perfect relie le passé au présent. I have known Eren since we were children." },
    '3eme_3': { bg:'#150030', lines:["CONDITIONALS…","… IF-CLAUSES !!","If I were… if I had…"],     kanji:'仮定 !!', kanjiColor:'#3b82f6', bubble:"If-clauses : zero (toujours vrai), first (probable), second (hypothèse), third (regret passé). Strategy !" },
    '3eme_4': { bg:'#301500', lines:["MODAL VERBS…","… OBLIGATION & ADVICE !!","Must, should, might !"], kanji:'助動詞 !!', kanjiColor:'#3b82f6', bubble:"Modals: must (obligation!), should (advice), can (ability), might (maybe). Use them wisely !" },
    '3eme_5': { bg:'#000530', lines:["REPORTED SPEECH…","… PASSIVE VOICE !!","She said… was killed by…"], kanji:'変換 !!', kanjiColor:'#3b82f6', bubble:"Reported speech and passive voice — transformations grammaticales. Stay focused !" },
    '3eme_6': { bg:'#102505', lines:["SCHOOL & JOBS…","… FUTURE PLANS !!","I want to be a…"],          kanji:'未来 !!', kanjiColor:'#3b82f6', bubble:"School life, jobs, future plans. A commander must speak about goals and dreams !" },
    '3eme_7': { bg:'#250010', lines:["ENGLISH WORLD…","… UK, USA, AUSTRALIA !!","Cultural facts !"],   kanji:'世界 !!', kanjiColor:'#3b82f6', bubble:"English-speaking world : UK, USA, Australia, Canada. Cultural facts — essential for the Brevet !" },
    '3eme_8': { bg:'#0a0a3e', lines:["BREVET FINAL…","… ULTIMATE TEST !!","Third conditional !"],       kanji:'卒業試験 !!', kanjiColor:'#dc2626', bubble:"Final Brevet challenge : mixed grammar, third conditional, question tags. The ultimate test !" },
  };

  var NIVEAUX = [
    { code: 'cm2',  nom: 'CM2',  emoji: '⭐',      color: '#8b6914', desc: 'Vocabulaire de base' },
    { code: '6eme', nom: '6ème', emoji: '⭐⭐',     color: '#4a5c3f', desc: 'Grammaire fondamentale' },
    { code: '5eme', nom: '5ème', emoji: '⭐⭐⭐',   color: '#c0a030', desc: 'Grammaire intermédiaire' },
    { code: '4eme', nom: '4ème', emoji: '⭐⭐⭐⭐', color: '#8b4513', desc: 'Grammaire avancée' },
    { code: '3eme', nom: '3ème', emoji: '⭐⭐⭐⭐⭐', color: '#3b82f6', desc: 'Préparation Brevet B1' },
  ];

  // ══════════════════════════════════════════════════════════════
  // ENTRÉE — appelé par router.js showEnglish()
  // ══════════════════════════════════════════════════════════════

  function showEnglish(silent) {
    // URL-01 : push #/english sauf si appelé silencieusement par handleRoute
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null, '', '#/english');
    }
    // Masquer TOUT (globe, autres mondes) — règle NR-01
    if (typeof hideAll === 'function') hideAll();

    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';

    var aotBg = document.getElementById('aot-bg');
    if (aotBg) aotBg.classList.add('visible');

    _show('aot-levels-sec');
    _hide('aot-iles-sec');
    _hide('aot-quiz-sec');

    _buildLevels();
    loadAotBgStrips();
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════
  // FOND ANIMÉ — Jikan API AOT (pattern exact pays-du-feu)
  // ══════════════════════════════════════════════════════════════

  var _aotBgLoaded = false;
  async function loadAotBgStrips() {
    if (_aotBgLoaded) return;
    _aotBgLoaded = true;

    var bg = document.getElementById('aot-bg');
    if (!bg) return;
    bg.innerHTML = '';

    // Fallback Supabase (toujours disponible, jamais de rate-limit)
    var supabaseGifs = [
      STORAGE_AOT + 'gifs/aot-win-1.gif',
      STORAGE_AOT + 'gifs/aot-win-2.gif',
      STORAGE_AOT + 'gifs/aot-win-3.gif',
      STORAGE_AOT + 'gifs/aot-win-4.gif',
      STORAGE_AOT + 'gifs/aot-win-5.gif',
      STORAGE_AOT + 'gifs/aot-perfect-1.gif',
      STORAGE_AOT + 'gifs/aot-perfect-2.gif',
      STORAGE_AOT + 'gifs/aot-perfect-3.gif',
    ];

    // Priorité 1 : Jikan AOT Saison 1 (ID 16498)
    var urls = supabaseGifs;
    try {
      var r = await fetch('https://api.jikan.moe/v4/anime/16498/pictures');
      if (r.ok) {
        var data = await r.json();
        if (data.data && data.data.length >= 8) {
          urls = data.data.map(function(p){
            return p.jpg.large_image_url || p.jpg.image_url;
          });
        }
      }
    } catch(e) {}

    // Priorité 2 : Jikan AOT Saison 2 (ID 25777) si S1 rate-limité
    if (urls === supabaseGifs) {
      try {
        var r2 = await fetch('https://api.jikan.moe/v4/anime/25777/pictures');
        if (r2.ok) {
          var data2 = await r2.json();
          if (data2.data && data2.data.length >= 8) {
            urls = data2.data.map(function(p){
              return p.jpg.large_image_url || p.jpg.image_url;
            });
          }
        }
      } catch(e) {}
    }

    // Distribuer en round-robin sur 5 strips (pattern exact V1)
    var doubled = urls.concat(urls);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'aot-bg-strip';
      var stripImgs = doubled.filter(function(_, i){ return i % 5 === s; });
      if (!stripImgs.length) stripImgs = doubled.slice(0, 4);
      stripImgs.forEach(function(src) {
        var img = document.createElement('img');
        img.src = src; img.alt = ''; img.loading = 'lazy';
        img.onerror = function(){ this.style.display = 'none'; };
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // ÉCRAN SÉLECTION NIVEAU
  // ══════════════════════════════════════════════════════════════

  function _buildLevels() {
    var sec = document.getElementById('aot-levels-sec');
    if (!sec) return;

    var html =
      '<div class="aot-map-header">' +
        '<div class="aot-map-title">⚔️ ANGLAIS — PARADIS</div>' +
        '<div class="aot-map-sub">Attack on Titan · Choisis ton niveau</div>' +
      '</div>' +
      '<div class="aot-levels-grid">';

    NIVEAUX.forEach(function(n) {
      html +=
        '<div class="aot-level-card" ' +
          'onclick="window.aot_showLevel(\'' + n.code + '\')" ' +
          'style="--level-color:' + n.color + '">' +
          '<div class="aot-level-emoji">' + n.emoji + '</div>' +
          '<div class="aot-level-nom">' + n.nom + '</div>' +
          '<div class="aot-level-desc">' + n.desc + '</div>' +
          '<div class="aot-level-btn">COMMENCER ⚔️</div>' +
        '</div>';
    });

    html += '</div>';
    sec.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // GRILLE DES ÎLES
  // ══════════════════════════════════════════════════════════════

  async function showLevel(niveauCode, silent) {
    _currentNiveau = niveauCode;
    // URL-01 : push #/english/cm2 etc.
    if (!silent && window.history && window.history.pushState) {
      history.pushState(null, '', '#/english/' + niveauCode);
    }
    var niveau = NIVEAUX.find(function(n){ return n.code === niveauCode; });
    if (!niveau) return;

    // Masquer globe + autres sections
    if (typeof hideAll === 'function') hideAll();
    var mangaBg = document.getElementById('manga-bg');
    if (mangaBg) mangaBg.style.display = 'none';
    var aotBg = document.getElementById('aot-bg');
    if (aotBg) aotBg.classList.add('visible');

    var ilesEl = document.getElementById('aot-iles-sec');
    if (ilesEl) {
      ilesEl.innerHTML =
        '<div class="aot-map-header">' +
          '<div class="aot-map-title">⚔️ ' + niveau.nom + ' — ANGLAIS</div>' +
          '<div class="aot-map-sub">Chargement...</div>' +
        '</div>' +
        '<div style="text-align:center;padding:40px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800"><div style="font-size:2rem">⏳</div></div>';
    }

    _show('aot-iles-sec');
    _hide('aot-levels-sec');
    _hide('aot-quiz-sec');
    window.scrollTo(0, 0);

    // Charger depuis DB
    _chapitres = [];
    if (window.AP_QuizEngine) {
      _chapitres = await window.AP_QuizEngine.getChapitres(MATIERE_CODE, niveauCode);
    }

    var progress = {};
    if (window.AP_QuizEngine) {
      progress = window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, niveauCode);
    }

    _buildGrid(niveau, progress);
  }

  function _buildGrid(niveau, progress) {
    var ilesEl = document.getElementById('aot-iles-sec');
    if (!ilesEl) return;

    var backBtn =
      '<button class="aot-back-btn" onclick="history.back()">← Changer de niveau</button>';

    var header =
      '<div class="aot-map-header">' +
        backBtn +
        '<div class="aot-map-title">⚔️ ' + niveau.nom + ' — ANGLAIS</div>' +
        '<div class="aot-map-sub">' + niveau.desc + ' · Attack on Titan</div>' +
      '</div>';

    if (!_chapitres.length) {
      ilesEl.innerHTML = header +
        '<div style="text-align:center;padding:60px;color:rgba(255,255,255,.4);' +
        'font-family:Nunito,sans-serif;font-weight:800">🔒 Ce niveau arrive bientôt !</div>';
      return;
    }

    var grid = '<div class="aot-islands-grid" id="aot-islands-grid">';

    _chapitres.forEach(function(ch) {
      var key   = MATIERE_CODE + '_' + _currentNiveau + '_' + ch.numero;
      var prog  = progress[key];
      var done  = !!prog;
      var score = prog ? prog.score : 0;
      var total = prog ? prog.total : 11;
      var stars = done
        ? _state_questions_to_stars(score, total)
        : '';

      grid +=
        '<div class="aot-isle-card' + (done ? ' done' : '') + '" ' +
          'style="--isle-color:' + (ch.ile_color || '#4a5c3f') + '" ' +
          'onclick="window.aot_startIsland(\'' + ch.id + '\')">' +
          '<div class="aot-isle-img-wrap">' +
            '<img class="aot-isle-img" src="' + (ch.hero_image || '') + '" ' +
              'alt="' + (ch.hero_name || '') + '" onerror="this.style.display=\'none\';' +
              'this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="aot-isle-img-fallback" ' +
              'style="background:' + (ch.ile_color || '#4a5c3f') + '22;' +
              'color:' + (ch.ile_color || '#4a5c3f') + '">⚔️</div>' +
            '<div class="aot-isle-overlay" ' +
              'style="background:linear-gradient(to top,' + (ch.ile_color || '#4a5c3f') + 'cc,transparent)">' +
            '</div>' +
          '</div>' +
          '<div class="aot-isle-body">' +
            '<div class="aot-isle-num">ÎLE #' + ch.numero + '</div>' +
            '<div class="aot-isle-name" style="color:' + (ch.ile_color || '#8b6914') + '">' +
              (ch.nom || '').toUpperCase() +
            '</div>' +
            '<div class="aot-isle-topic">' + (ch.topic || '') + '</div>' +
            '<div class="aot-isle-level" ' +
              'style="border-color:' + (ch.ile_color || '#8b6914') + '55;' +
              'color:' + (ch.ile_color || '#8b6914') + '">' +
              niveau.nom +
            '</div>' +
            (done ? '<div class="aot-isle-stars">' + score + '/' + total + ' ' + stars + '</div>' : '') +
          '</div>' +
        '</div>';
    });

    grid += '</div>';
    ilesEl.innerHTML = header + grid;
  }

  function _state_questions_to_stars(score, total) {
    var s = '';
    for (var i = 0; i < Math.min(score, 5); i++) s += '⭐';
    return s;
  }

  // ══════════════════════════════════════════════════════════════
  // DÉMARRAGE D'UNE ÎLE — leçon AVANT quiz (règle AU-04)
  // ══════════════════════════════════════════════════════════════

  function startIsland(chapitreId) {
    if (!chapitreId) return;
    var ch = _chapitres.find(function(c){ return c.id === chapitreId; });
    if (!ch) return;

    // Pattern exact V1 : leçon → cinématique → quiz
    if (typeof lesson_english === 'function') {
      lesson_english(_currentNiveau, ch.numero, function() {
        // Après leçon → cinématique (comme pdf/jjk)
        if (typeof playBGM === 'function') playBGM(ch.bgm || 'aot-battle');
        _playCinematic(ch, function() {
          _launchQuiz(chapitreId, ch);
        });
      });
    } else {
      if (typeof playBGM === 'function') playBGM(ch.bgm || 'aot-battle');
      _playCinematic(ch, function() {
        _launchQuiz(chapitreId, ch);
      });
    }
  }

  // ══════════════════════════════════════════════════════════════
  // CINÉMATIQUE — pattern exact jjk_playCinematic / pdf_playCinematic
  // ══════════════════════════════════════════════════════════════

  function _playCinematic(ch, callback) {
    var cfg = AOT_ISLE_INTRO[_currentNiveau + '_' + ch.numero];
    if (!cfg) { if (callback) callback(); return; }

    // Créer/récupérer l'overlay (créé dynamiquement comme V1)
    var ov = document.getElementById('aot-cine-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'aot-cine-overlay';
      document.body.appendChild(ov);
    }

    ov.innerHTML =
      '<div class="aot-cine-inner" style="background:' + cfg.bg + ';min-height:100vh;height:100vh">' +
        '<div class="aot-cine-char-wrap">' +
          '<img src="' + (ch.hero_image || '') + '" class="aot-cine-char" onerror="this.style.display=\'none\'">' +
          '<div class="aot-cine-char-emoji" style="color:' + cfg.kanjiColor + '">⚔️</div>' +
        '</div>' +
        '<div class="aot-cine-content">' +
          '<div class="aot-cine-kanji" style="color:' + cfg.kanjiColor + '">' + cfg.kanji + '</div>' +
          '<div class="aot-cine-lines">' + cfg.lines.map(function(l){ return '<div class="aot-cine-line">' + l + '</div>'; }).join('') + '</div>' +
          '<div class="aot-cine-bubble">' +
            '<span class="aot-cine-char-name" style="color:' + cfg.kanjiColor + '">' + (ch.hero_name || '') + '</span>' +
            '<span class="aot-cine-bubble-text">"' + cfg.bubble + '"</span>' +
          '</div>' +
        '</div>' +
        '<button class="aot-skip-btn" onclick="window.aot_skipCine()">⏭ PASSER</button>' +
      '</div>';

    ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;opacity:0;transition:opacity .3s;pointer-events:auto';
    ov._cb = callback;
    requestAnimationFrame(function(){ ov.style.opacity = '1'; });
    ov._t  = setTimeout(window.aot_skipCine, 7000);

    // TTS — identique V1 (fr-FR, rate 0.9, pitch 1.1)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utt = new SpeechSynthesisUtterance(cfg.bubble);
      utt.lang = 'fr-FR'; utt.rate = 0.9; utt.pitch = 1.1;
      window.speechSynthesis.speak(utt);
    }
  }

  function _launchQuiz(chapitreId, ch) {
    if (!window.AP_QuizEngine) {
      console.error('[AotRouter] AP_QuizEngine non chargé');
      return;
    }

    _show('aot-quiz-sec');
    _hide('aot-iles-sec');
    _hide('aot-levels-sec');

    window.AP_QuizEngine.launch(chapitreId, {
      matiere: MATIERE_CODE,
      niveau:  _currentNiveau,
      onBack: function() {
        // Recharger la grille avec la progression mise à jour
        _show('aot-iles-sec');
        _hide('aot-quiz-sec');
        var niveau = NIVEAUX.find(function(n){ return n.code === _currentNiveau; });
        var progress = window.AP_QuizEngine
          ? window.AP_QuizEngine.getLocalProgress(MATIERE_CODE, _currentNiveau)
          : {};
        if (niveau) _buildGrid(niveau, progress);
        if (typeof playBGM === 'function') setTimeout(function(){ playBGM('aot-map'); }, 300);
      },
    });
  }

  // ══════════════════════════════════════════════════════════════
  // UTILITAIRES
  // ══════════════════════════════════════════════════════════════

  function _show(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
  }

  function _hide(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  // EXPORTS GLOBAUX
  // ══════════════════════════════════════════════════════════════

  // skipCine global (utilisé dans onclick du bouton PASSER)
  window.aot_skipCine = function() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    var ov = document.getElementById('aot-cine-overlay');
    if (!ov) return;
    clearTimeout(ov._t);
    var cb = ov._cb;
    ov.style.display = 'none'; ov.style.zIndex = '-1'; ov.innerHTML = '';
    if (cb) cb();
  };

  window.showEnglish     = showEnglish;   // ← appelé par router.js
  window.aot_showEnglish = showEnglish;
  window.aot_showLevel   = showLevel;     // ← URL-01 navigation directe par niveau
  window.aot_showLevel   = showLevel;
  window.aot_startIsland = startIsland;
  window.buildAotLevels  = showEnglish;
  window.loadAotBgStrips = loadAotBgStrips;

  console.info('⚔️ quiz-router-english.js v2 chargé — Jikan AOT + leçon avant quiz');

})();
