// ═══════════════════════════════════════════════════════════════
// QUIZ-KANTO.JS — Académie Pirate
// Pays : Kanto · Sciences Physiques · Univers : DEMON SLAYER
// Niveaux : 6ème / 5ème — Transmission de l'information
// Architecture identique à quiz-histoire.js (Magnolia/DBZ)
// ✅ Assets (images, GIFs, musiques) chargés depuis Supabase
// ✅ Cinématique intro/fin avec personnages DS
// ✅ Sauvegarde progression via save.js / Supabase DB
// ═══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// 1. ASSETS SUPABASE — URLs publiques
//    Bucket : island-demon-slayer
//    Chargés au démarrage via loadKantoAssets()
// ══════════════════════════════════════════════════════════════

var SUPABASE_URL_KANTO = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
var BUCKET_KANTO       = 'island-demon-slayer';
var KANTO_STORAGE      = SUPABASE_URL_KANTO + '/storage/v1/object/public/' + BUCKET_KANTO;

// ✅ CORRECTION : extensions exactes vérifiées dans le bucket via diagnostic
// tanjiro→.jpg  zenitsu→.jpg  inosuke→.jpg  giyu→.png  shinobu→.png
// rengoku→.jpg  tengen→.jpg   muichiro→.jpg
var KANTO_AVATARS = {
  1: KANTO_STORAGE + '/characters/tanjiro.jpg',
  2: KANTO_STORAGE + '/characters/zenitsu.jpg',
  3: KANTO_STORAGE + '/characters/inosuke.jpg',
  4: KANTO_STORAGE + '/characters/kokushibo.png',
  5: KANTO_STORAGE + '/characters/shinobu.png',
  6: KANTO_STORAGE + '/characters/rengoku.jpg',
  7: KANTO_STORAGE + '/characters/tengen.jpg',
  8: KANTO_STORAGE + '/characters/muichiro.jpg',
};

// ✅ CORRECTION : uniquement des fichiers CONFIRMÉS dans le bucket
// muzan/akaza/daki/rui/gyomei/sanemi n'existent pas → remplacés par fichiers disponibles
var KANTO_BOSS_AVATARS = {
  'Muzan':     KANTO_STORAGE + '/characters/nakime.jpeg',   // ✓ existe dans bucket
  'Akaza':     KANTO_STORAGE + '/characters/gyutaro.jpg',   // ✓ existe dans bucket
  'Kokushibo': KANTO_STORAGE + '/characters/kokushibo.png', // ✓ existe dans bucket
  'Daki':      KANTO_STORAGE + '/characters/kanao.jpg',     // ✓ existe dans bucket
  'Rui':       KANTO_STORAGE + '/characters/nezuko.jpeg',   // ✓ existe dans bucket
  'Gyomei':    KANTO_STORAGE + '/characters/giyu.png',      // ✓ existe dans bucket
  'Sanemi':    KANTO_STORAGE + '/characters/inosuke.jpg',   // ✓ existe dans bucket
  'Obanai':    KANTO_STORAGE + '/characters/obanai.jpeg',   // ✓ existe dans bucket
};

// Fallback emoji si l'image Supabase ne charge pas
var KANTO_FALLBACK = {
  1: '🗡️', 2: '⚡', 3: '🐗', 4: '🌊',
  5: '🦋', 6: '🔥', 7: '💎', 8: '🌫️'
};

// GIFs chargés depuis Supabase ou Giphy
var KANTO_GIFS_PERFECT = [];
var KANTO_GIFS_WIN     = [];
var KANTO_GIFS_CORRECT = [];
var KANTO_GIFS_WRONG   = [];
var KANTO_GIFS_LOSE    = [];

// ✅ CORRECTION : fallback 100% Supabase Storage (noms vérifiés via diagnostic)
var KANTO_GIFS_DEFAULTS = {
  perfect: [
    KANTO_STORAGE + '/gifs/perfect/perfect_tanjiro.gif',
    KANTO_STORAGE + '/gifs/perfect/perfect_mitsuri.gif',
    KANTO_STORAGE + '/gifs/perfect/perfect_ds.gif',
  ],
  correct: [
    KANTO_STORAGE + '/gifs/correct/correct_tanjiro.gif',
    KANTO_STORAGE + '/gifs/correct/correct_zenitsu.gif',
    KANTO_STORAGE + '/gifs/correct/correct_mitsuri.gif',
    KANTO_STORAGE + '/gifs/correct/correct_fight.gif',
    KANTO_STORAGE + '/gifs/correct/correct_crunchyroll.gif',
  ],
  wrong: [
    KANTO_STORAGE + '/gifs/wrong/wrong_zenitsu.gif',
    KANTO_STORAGE + '/gifs/wrong/wrong_giyu.gif',
    KANTO_STORAGE + '/gifs/wrong/wrong_ds1.gif',
    KANTO_STORAGE + '/gifs/wrong/wrong_ds2.gif',
  ],
  lose: [
    KANTO_STORAGE + '/gifs/wrong/wrong_zenitsu.gif',
    KANTO_STORAGE + '/gifs/wrong/wrong_ds1.gif',
  ],
};

// Charger les assets dynamiquement depuis Supabase (table island_assets)
async function loadKantoAssets() {
  try {
    if (typeof sb === 'undefined') throw new Error('Supabase non init');
    var { data, error } = await sb
      .from('island_assets')
      .select('asset_type, url')
      .eq('island_key', 'demon-slayer');
    if (error) throw error;

    data.forEach(function (row) {
      var t   = row.asset_type;
      var url = row.url;
      if (t === 'gif_correct') KANTO_GIFS_CORRECT.push(url);
      if (t === 'gif_wrong')   KANTO_GIFS_WRONG.push(url);
      if (t === 'gif_perfect') KANTO_GIFS_PERFECT.push(url);
    });
    console.info('⚔️  Kanto assets chargés depuis Supabase :', data.length, 'entrées');
  } catch (e) {
    console.warn('⚔️  Kanto assets — fallback Storage :', e.message);
  }

  // Compléter avec les defaults si vides
  if (!KANTO_GIFS_PERFECT.length) KANTO_GIFS_PERFECT = KANTO_GIFS_DEFAULTS.perfect.slice();
  if (!KANTO_GIFS_CORRECT.length) KANTO_GIFS_CORRECT = KANTO_GIFS_DEFAULTS.correct.slice();
  if (!KANTO_GIFS_WRONG.length)   KANTO_GIFS_WRONG   = KANTO_GIFS_DEFAULTS.wrong.slice();
  if (!KANTO_GIFS_LOSE.length)    KANTO_GIFS_LOSE    = KANTO_GIFS_DEFAULTS.lose.slice();
  KANTO_GIFS_WIN = KANTO_GIFS_CORRECT.slice();
}

// ══════════════════════════════════════════════════════════════
// 2. FOND ANIMÉ DS — strips de personnages
// ══════════════════════════════════════════════════════════════
var _kantoBgLoaded = false;

async function loadKantoBgStrips() {
  if (_kantoBgLoaded) return;
  _kantoBgLoaded = true;

  var bg = document.getElementById('kanto-bg');
  if (!bg) return;

  // Utiliser les images DS uploadées dans Supabase
  var dsImages = Object.values(KANTO_AVATARS).concat(Object.values(KANTO_BOSS_AVATARS));

  // Essayer d'abord l'API Jikan pour DS (anime id 40748)
  try {
    var r = await fetch('https://api.jikan.moe/v4/anime/40748/pictures');
    if (r.ok) {
      var data = await r.json();
      if (data.data && data.data.length) {
        var pics = data.data.slice(0, 20);
var all  = pics.concat(pics); // doubler pour scroll infini
for (var s = 0; s < 5; s++) {
  var strip = document.createElement('div');
  strip.className = 'kanto-bg-strip';
  // Round-robin : strip 0 prend indices 0,5,10… strip 1 prend 1,6,11…
  var stripImgs = all.filter(function(_, i) { return i % 5 === s; });
  if (!stripImgs.length) stripImgs = all;
  stripImgs.forEach(function (p) {
    var img = document.createElement('img');
    img.src = p.jpg.large_image_url || p.jpg.image_url;
    img.alt = ''; img.loading = 'lazy';
    strip.appendChild(img);
  });
  bg.appendChild(strip);
}
        return;
      }
    }
  } catch (e) { /* fallback */ }

  // Fallback : utiliser les images DS de Supabase
  for (var s2 = 0; s2 < 5; s2++) {
    var strip2 = document.createElement('div');
    strip2.className = 'kanto-bg-strip';
    dsImages.concat(dsImages).forEach(function (src) {
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.loading = 'lazy';
      strip2.appendChild(img);
    });
    bg.appendChild(strip2);
  }
}

// ══════════════════════════════════════════════════════════════
// 3. CINÉMATIQUE INTRO DS — calquée sur hist_playCinematic
// ══════════════════════════════════════════════════════════════
var KANTO_ISLE_INTRO = {
  1: { bg:'#1a0005', lines:['SIGNAUX…','… DE LUMIÈRE !!','La voie du chasseur commence !'], kanji:'信号 !!', kanjiColor:'#C0392B', bubble:"Tanjiro te guide ! Qu'est-ce qu'un signal ? Voyons si tu le sais !" },
  // ✅ CORRECTION : kanjiColor '#D4AF37' (or Zenitsu) au lieu de '#3b82f6' (bleu incohérent)
  2: { bg:'#1a1400', lines:['ÉMETTEUR…','… ET RÉCEPTEUR !!','Qui envoie ? Qui reçoit ?'], kanji:'送受 !!', kanjiColor:'#D4AF37', bubble:"Thunder Breathing ! Qui émet ? Qui reçoit ? Réponds VITE !" },
  3: { bg:'#001a05', lines:['TROIS…','… TYPES DE SIGNAUX !!','Lumineux, Sonore, Électrique !'], kanji:'三種 !!', kanjiColor:'#22c55e', bubble:"BEAST BREATHING ! Nomme les 3 types de signaux ou tu affrontes mes doubles sabres !" },
  4: { bg:'#1a0e00', lines:['CODE…','… MORSE !!','Points et traits vers la victoire !'], kanji:'電信 !!', kanjiColor:'#D4AF37', bubble:"Water Breathing Form 11 ! Le télégraphe de Morse n'a aucun secret pour moi !" },
  5: { bg:'#00051a', lines:['ONDES…','… RADIO !!','Les signaux invisibles t\'entourent !'], kanji:'電波 !!', kanjiColor:'#7B5FA0', bubble:"Insect Breathing ! Je détecte chaque onde radio. Toi aussi, tu peux !" },
  6: { bg:'#1a0800', lines:['FIBRE…','… OPTIQUE !!','La lumière transporte internet !'], kanji:'光速 !!', kanjiColor:'#E55E00', bubble:"FLAME HASHIRA ! La lumière se propage comme le feu de Rengoku. Apprenons ça !" },
  7: { bg:'#050014', lines:['DU FIL…','… À LA 5G !!','Bell à Tanjiro en quelques siècles !'], kanji:'電話 !!', kanjiColor:'#a855f7', bubble:"Son du bruit ! Le téléphone convertit ta voix. Comme moi, il transmet sans perdre !" },
  8: { bg:'#001510', lines:['MONDE…','… CONNECTÉ !!','IoT, GPS, 5G… tout est lié !'], kanji:'接続 !!', kanjiColor:'#06b6d4', bubble:"Mist Breathing ! Dans le monde moderne, tout est signal. Prouve que tu le sais !" },
};

function kanto_playCinematic(n, callback) {
  var cfg    = KANTO_ISLE_INTRO[n];
  var isle   = ISLANDS_KANTO[n];
  if (!cfg || !isle) { if (callback) callback(); return; }

  var avatar = KANTO_AVATARS[n] || '';

  var ov = document.getElementById('kanto-cine-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'kanto-cine-overlay';
    document.body.appendChild(ov);
  }

  ov.innerHTML =
    '<div class="kanto-cine-inner" style="background:' + cfg.bg + ';min-height:100vh;height:100vh">' +
      '<div class="kanto-cine-char-wrap">' +
        '<img src="' + avatar + '" alt="' + isle.charName + '" class="kanto-cine-char"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="kanto-cine-char-emoji" style="display:none;color:' + cfg.kanjiColor + '">' +
          KANTO_FALLBACK[n] +
        '</div>' +
      '</div>' +
      '<div class="kanto-cine-content">' +
        '<div class="kanto-cine-kanji" style="color:' + cfg.kanjiColor + '">' + cfg.kanji + '</div>' +
        '<div class="kanto-cine-lines">' +
          cfg.lines.map(function (l) { return '<div class="kanto-cine-line">' + l + '</div>'; }).join('') +
        '</div>' +
        '<div class="kanto-cine-bubble">' +
          '<span class="kanto-cine-char-name" style="color:' + cfg.kanjiColor + '">' + isle.charName + '</span>' +
          '<span class="kanto-cine-bubble-text">"' + cfg.bubble + '"</span>' +
        '</div>' +
      '</div>' +
      '<button class="kanto-skip-btn" onclick="kanto_skipCine()">⏭ PASSER</button>' +
    '</div>';

  ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;align-items:stretch;justify-content:stretch;opacity:0;transition:opacity .3s;pointer-events:auto';
  ov._cb = callback;
  requestAnimationFrame(function () { ov.style.opacity = '1'; });
  ov._t  = setTimeout(kanto_skipCine, 4500);

  // Voix FR
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    var utt     = new SpeechSynthesisUtterance(cfg.bubble);
    utt.lang    = 'fr-FR';
    utt.rate    = 0.9;
    utt.pitch   = 1.1;
    window.speechSynthesis.speak(utt);
  }
}

function kanto_skipCine() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  var ov = document.getElementById('kanto-cine-overlay');
  if (!ov) return;
  clearTimeout(ov._t);
  var cb = ov._cb;
  ov.style.display       = 'none';
  ov.style.pointerEvents = 'none';
  ov.style.zIndex        = '-1';
  ov.innerHTML           = '';
  if (cb) cb();
}

// ══════════════════════════════════════════════════════════════
// 4. DONNÉES — 8 ÎLES × (11 questions + 1 boss)
//    Sciences Physiques — Transmission de l'information
//    bgm : clé pour audio-engine-kanto-patch.js
// ══════════════════════════════════════════════════════════════
var ISLANDS_KANTO = {

  1: {
    name: "ÎLE DE TANJIRO",
    charName: "Tanjiro",
    color: "#C0392B",
    topic: "C'est quoi un signal ?",
    level: "6ème",
    bgm: "kanto-isle-1",
    msgs: [
      "La voie de l'eau commence ici !",
      "Rappelle-toi ce que ton sensei t'a appris !",
      "Un chasseur doit tout observer !",
      "Continue ! Tu progresses !",
      "Le Soleil Hinokami guide ta réponse !"
    ],
    qs: [
      { q:"Qu'est-ce qu'un signal ?", o:["Un objet qu'on peut toucher","Un moyen qui transmet une information à distance","Une couleur particulière","Un son très fort"], a:"Un moyen qui transmet une information à distance", exp:"Un signal permet la transmission d'un message à distance entre un émetteur et un récepteur." },
      { q:"Un feu tricolore rouge transmet quelle information ?", o:["Autoriser à passer","Avertir d'un danger","Interdire de passer","Accélérer"], a:"Interdire de passer", exp:"Un feu rouge est un signal lumineux qui transmet l'information 'interdire de passer'." },
      { q:"La sirène d'une ambulance est un signal de quel type ?", o:["Signal lumineux","Signal électrique","Signal sonore","Signal radio"], a:"Signal sonore", exp:"La sirène produit un son : c'est un signal sonore qui avertit les autres conducteurs." },
      { q:"Quel est l'objectif principal d'un signal ?", o:["Faire du bruit","Transporter une information d'un émetteur à un récepteur","Décorer l'espace","Produire de la lumière"], a:"Transporter une information d'un émetteur à un récepteur", exp:"Un signal sert toujours à transporter une information entre celui qui l'envoie et celui qui la reçoit." },
      { q:"La sonnerie du collège est un exemple de quel type de signal ?", o:["Signal lumineux","Signal sonore","Signal électrique","Signal radio"], a:"Signal sonore", exp:"La sonnerie produit un son audible : c'est un signal sonore qui transmet l'information 'fin de cours'." },
      { q:"Parmi ces exemples, lequel n'est PAS un signal ?", o:["Un feu tricolore","Une sirène","Une pierre posée sur le sol","Un flash lumineux"], a:"Une pierre posée sur le sol", exp:"Une pierre posée sur le sol ne transmet aucune information à distance : ce n'est pas un signal." },
      { q:"Le phare d'un voilier émet un signal qui sert à :", o:["Chauffer le bateau","Avertir les autres bateaux de sa présence","Décorer le bateau","Alimenter le moteur"], a:"Avertir les autres bateaux de sa présence", exp:"Le feu d'un voilier est un signal lumineux qui avertit les autres navires pour éviter les collisions." },
      { q:"Combien existe-t-il de types principaux de signaux ?", o:["2 (lumineux et sonores)","3 (lumineux, sonores, électriques)","4 (lumineux, sonores, électriques, radio)","5"], a:"4 (lumineux, sonores, électriques, radio)", exp:"On distingue principalement 4 types : lumineux, sonores, électriques et radio." },
      { q:"Le témoin lumineux d'un téléphone en charge informe que :", o:["Le téléphone est éteint","La batterie est en cours de recharge","Le wifi est activé","Un appel arrive"], a:"La batterie est en cours de recharge", exp:"Ce témoin lumineux est un signal qui transmet l'information 'en cours de recharge'." },
      { q:"La Tour Eiffel a longtemps été utilisée comme :", o:["Un récepteur de signaux uniquement","Un émetteur de signaux radio et lumineux lors d'événements","Un récepteur de signaux électriques","Un simple monument décoratif"], a:"Un émetteur de signaux radio et lumineux lors d'événements", exp:"Le sommet de la Tour Eiffel a été utilisé comme émetteur de signaux radio et lumineux." },
      { q:"Une information peut avoir pour fonction d'avertir. Quel signal joue ce rôle ?", o:["Un feu vert","Un feu rouge","Une sirène de pompiers","Un écran éteint"], a:"Une sirène de pompiers", exp:"La sirène des pompiers est un signal sonore dont la fonction est d'avertir d'un danger.", isBoss:true, bossName:"Muzan" }
    ]
  },

  2: {
    name: "ÎLE DE ZENITSU",
    charName: "Zenitsu",
    color: "#D4AF37",
    topic: "Émetteur et Récepteur",
    level: "6ème",
    bgm: "kanto-isle-2",
    msgs: [
      "Je suis peut-être peureux mais je sais répondre !",
      "Thunder Breathing Form 1 — THUNDERCLAP !",
      "Même endormi je connais mes signaux !",
      "Continue ! Je crois en toi !",
      "La foudre frappe juste — comme ta réponse !"
    ],
    qs: [
      { q:"Qu'est-ce qu'un émetteur ?", o:["Un objet qui reçoit un signal","Une personne ou un dispositif qui émet le signal","Un câble qui transporte l'électricité","Un écran qui affiche une image"], a:"Une personne ou un dispositif qui émet le signal", exp:"Un émetteur est une personne ou un dispositif qui produit et envoie le signal." },
      { q:"Dans une conversation, la bouche est :", o:["Un récepteur","Un émetteur","Un canal de transmission","Un signal"], a:"Un émetteur", exp:"La bouche produit des sons (signaux sonores) : elle est donc l'émetteur." },
      { q:"Dans une conversation, l'oreille est :", o:["Un émetteur","Un récepteur","Un signal","Un canal"], a:"Un récepteur", exp:"L'oreille perçoit les sons : c'est le récepteur de la chaîne de transmission sonore." },
      { q:"Un batteur dans un concert émet des signaux. Quel est le récepteur ?", o:["La batterie","Les baguettes","Le public","Le micro"], a:"Le public", exp:"Le batteur est l'émetteur, il produit des sons. Le public reçoit ces sons : c'est le récepteur." },
      { q:"Pour qu'une information soit transmise, il faut au minimum :", o:["Un émetteur seulement","Un récepteur seulement","Un émetteur et un récepteur","Deux émetteurs"], a:"Un émetteur et un récepteur", exp:"La transmission nécessite toujours un émetteur (qui envoie) ET un récepteur (qui reçoit)." },
      { q:"Un thermostat envoie une consigne au chauffage. Le thermostat est :", o:["Le récepteur","Le signal","L'émetteur","Le canal"], a:"L'émetteur", exp:"Le thermostat émet une consigne de température (signal électrique) : il est l'émetteur." },
      { q:"Un feu bicolore indique à un piéton qu'il peut passer. L'œil du piéton est :", o:["L'émetteur","Le signal","Le récepteur","Le canal"], a:"Le récepteur", exp:"L'œil perçoit la lumière du feu : c'est le récepteur. Le feu est l'émetteur." },
      { q:"Pour que le récepteur comprenne le signal, il faut que :", o:["Le signal soit très fort","Le signal puisse être mesuré par le récepteur","L'émetteur soit très proche","Le signal soit visible"], a:"Le signal puisse être mesuré par le récepteur", exp:"Pour que l'information soit comprise, il faut que le récepteur soit capable de détecter et mesurer le signal." },
      { q:"Dans un appel téléphonique, le microphone joue le rôle de :", o:["Récepteur du son","Émetteur du son","Canal de transmission","Signal électrique"], a:"Émetteur du son", exp:"Le microphone capte la voix et la transforme en signal électrique : il est l'émetteur dans la chaîne." },
      { q:"Un ordinateur envoie des données à un serveur. L'ordinateur est :", o:["Le récepteur","Le signal","L'émetteur","La fibre optique"], a:"L'émetteur", exp:"L'ordinateur envoie les données : il est l'émetteur. Le serveur qui les reçoit est le récepteur." },
      { q:"⚔️ BOSS — Akaza surgit ! Dans un concert, un guitariste électrique joue via un ampli. Identifie l'émetteur final du son :", o:["La guitare","Le musicien","L'amplificateur (haut-parleur)","Le public"], a:"L'amplificateur (haut-parleur)", exp:"Le haut-parleur de l'ampli convertit le signal électrique en son : c'est lui qui émet le son final perçu par le public.", isBoss:true, bossName:"Akaza" }
    ]
  },

  3: {
    name: "ÎLE D'INOSUKE",
    charName: "Inosuke",
    color: "#22c55e",
    topic: "Les 3 types de signaux",
    level: "6ème",
    bgm: "kanto-isle-3",
    msgs: [
      "Beast Breathing ! Réponds maintenant !",
      "Je suis le roi de la montagne !",
      "Mes lames tranchent les mauvaises réponses !",
      "INOZAGANE WAWAJIMA ! Bien joué !",
      "Continue ou je te défie en combat !"
    ],
    qs: [
      { q:"Un signal lumineux est transmis par :", o:["Un son","La lumière","Le courant électrique","Une onde radio"], a:"La lumière", exp:"Un signal lumineux utilise la lumière pour transmettre une information (feux tricolores, phares, fibre optique)." },
      { q:"Les signaux sonores peuvent-ils se propager dans le vide ?", o:["Oui, ils se propagent partout","Non, ils ont besoin de matière pour se propager","Oui, mais très lentement","Seulement s'ils sont très forts"], a:"Non, ils ont besoin de matière pour se propager", exp:"Les signaux sonores sont des ondes mécaniques : ils ont besoin de matière (air, eau, solide) pour se propager." },
      { q:"Pourquoi voit-on l'éclair avant d'entendre le tonnerre ?", o:["Car le son part avant la lumière","Car la lumière se propage beaucoup plus vite que le son","Car le tonnerre vient d'un endroit différent","Car nos yeux sont plus sensibles que nos oreilles"], a:"Car la lumière se propage beaucoup plus vite que le son", exp:"La lumière se propage à 300 000 km/s alors que le son ne se propage qu'à 340 m/s dans l'air." },
      { q:"Un signal électrique est transmis par :", o:["L'air","La lumière","Le courant électrique dans un circuit","Des ondes radio"], a:"Le courant électrique dans un circuit", exp:"Un signal électrique utilise le courant électrique qui circule dans des fils conducteurs." },
      { q:"Les phares d'une voiture sont un exemple de :", o:["Signal sonore","Signal électrique","Signal lumineux","Signal radio"], a:"Signal lumineux", exp:"Les phares émettent de la lumière : ce sont des signaux lumineux qui informent les autres conducteurs." },
      { q:"Le klaxon d'une voiture est un exemple de :", o:["Signal lumineux","Signal sonore","Signal électrique","Signal radio"], a:"Signal sonore", exp:"Le klaxon produit un son fort : c'est un signal sonore d'avertissement." },
      { q:"Les téléphones fixes utilisent quel type de signal pour transmettre la voix ?", o:["Des signaux lumineux","Des signaux sonores uniquement","Des signaux électriques","Des signaux radio"], a:"Des signaux électriques", exp:"Les téléphones fixes convertissent la voix en signal électrique qui circule dans des câbles conducteurs." },
      { q:"Quel type de signal peut se propager dans le vide ?", o:["Les signaux sonores uniquement","Les signaux électriques uniquement","Les signaux lumineux et radio","Aucun signal"], a:"Les signaux lumineux et radio", exp:"Les signaux lumineux et radio sont des ondes électromagnétiques : elles peuvent se propager dans le vide." },
      { q:"L'alarme d'un réveil émet quel type de signal ?", o:["Signal lumineux","Signal sonore","Signal électrique","Signal radio"], a:"Signal sonore", exp:"L'alarme d'un réveil produit un son audible : c'est un signal sonore." },
      { q:"La fibre optique transmet des informations grâce à :", o:["Des signaux électriques","Des signaux sonores","Des signaux lumineux guidés","Des signaux radio"], a:"Des signaux lumineux guidés", exp:"La fibre optique utilise des signaux lumineux (laser) guidés à l'intérieur d'un tube de verre." },
      { q:"⚔️ BOSS — Kokushibo, Lune Sup. 1 ! Lors d'un orage à 3 km, le son se propage à 340 m/s. Combien de secondes avant d'entendre le tonnerre ?", o:["Environ 1 seconde","Environ 3 secondes","Environ 9 secondes","Environ 30 secondes"], a:"Environ 9 secondes", exp:"3 km = 3000 m. Temps = 3000 ÷ 340 ≈ 8,8 secondes ≈ 9 secondes. La règle pratique : 3 secondes par km !", isBoss:true, bossName:"Kokushibo" }
    ]
  },

  4: {
    name: "ÎLE DE GIYU",
    charName: "Giyu",
    color: "#3b82f6",
    topic: "Le Code Morse",
    level: "6ème",
    bgm: "kanto-isle-4",
    msgs: [
      "Dead Calm — sois précis comme l'eau.",
      "L'eau prend la forme du récipient. Adapte ta réponse.",
      "Water Breathing — onzième forme !",
      "Bien. Tu n'es pas inutile.",
      "Continue, Pillar de l'Eau t'observe."
    ],
    qs: [
      { q:"À quoi sert le code Morse ?", o:["À produire de la musique","À coder un message pour le transmettre via un signal","À décorer les messages","À stocker des images"], a:"À coder un message pour le transmettre via un signal", exp:"Le code Morse associe à chaque lettre une séquence de points (courts) et traits (longs) pour transmettre un message." },
      { q:"En code Morse, SOS = … — … Que signifie SOS ?", o:["Signal Ordinaire Simple","Système d'Organisation des Signaux","Signal de détresse international","Sons Ordonnés Spéciaux"], a:"Signal de détresse international", exp:"SOS est le signal de détresse international reconnu dans le monde entier." },
      { q:"Le code Morse peut être utilisé avec quel(s) type(s) de signal(s) ?", o:["Uniquement sonore","Uniquement lumineux","Uniquement radio","Lumineux, sonore ou radio : n'importe quel signal"], a:"Lumineux, sonore ou radio : n'importe quel signal", exp:"Le Morse est un code universel : il peut être transmis par n'importe quel type de signal." },
      { q:"En quelle année le premier message télégraphique en Morse a-t-il été envoyé ?", o:["1794","1844","1900","1750"], a:"1844", exp:"Le premier message télégraphique en Morse a parcouru 60 km entre Washington et Baltimore le 24 mai 1844." },
      { q:"Le télégraphe électrique fonctionne grâce à :", o:["Des signaux lumineux dans une fibre","Un circuit électrique avec un manipulateur et un récepteur","Des ondes radio entre deux antennes","Des signaux sonores dans un tube"], a:"Un circuit électrique avec un manipulateur et un récepteur", exp:"Le manipulateur ouvre et ferme le circuit pour créer des signaux courts ou longs." },
      { q:"Pour qu'un code soit compris par le récepteur, il faut que :", o:["Le signal soit très fort","Le récepteur connaisse le code utilisé","L'émetteur et le récepteur soient proches","Le signal soit lumineux"], a:"Le récepteur connaisse le code utilisé", exp:"Un code ne peut être compris que si le destinataire connaît la convention utilisée." },
      { q:"La Tour Chappe (1794) transmettait des informations grâce à :", o:["Des signaux électriques dans des câbles","Des bras articulés formant des signes visibles à distance","Des signaux radio entre antennes","Des signaux sonores comme des cloches"], a:"Des bras articulés formant des signes visibles à distance", exp:"Le télégraphe de Chappe utilisait des bras articulés sur des tours espacées d'environ 10 km." },
      { q:"La Tour Chappe réduisait le temps de transmission Paris-Strasbourg (400 km) à :", o:["Plusieurs jours à cheval","2 heures","1 minute","Instantanément"], a:"2 heures", exp:"Avant les tours Chappe, un message à cheval mettait 2,5 jours. Les tours le réduisaient à 2 heures !" },
      { q:"En code Morse, un point (.) représente :", o:["Un signal long","Un signal court","Une pause","La fin du message"], a:"Un signal court", exp:"En Morse, le point (.) est un signal court et le trait (—) est un signal long." },
      { q:"Jusqu'en quelle année le code Morse est-il resté le code international officiel ?", o:["1920","1945","1999","2010"], a:"1999", exp:"Le code Morse a été le code de communication internationale officiel jusqu'en 1999 — 155 ans après son invention !" },
      { q:"⚔️ BOSS — Daki, Lune Sup. 6 ! Comment envoyer SOS avec une lampe torche ?", o:["3 longs, 3 courts, 3 longs","3 courts, 3 longs, 3 courts","6 courts puis 3 longs","3 longs uniquement"], a:"3 courts, 3 longs, 3 courts", exp:"SOS = S O S = … — — — … = 3 courts (S) + 3 longs (O) + 3 courts (S). Signal de détresse universel !", isBoss:true, bossName:"Daki" }
    ]
  },

  5: {
    name: "ÎLE DE SHINOBU",
    charName: "Shinobu",
    color: "#7B5FA0",
    topic: "Les Ondes Radio",
    level: "5ème",
    bgm: "kanto-isle-5",
    msgs: [
      "Insect Breathing — dansons avec les ondes !",
      "Mon poison d'information va te marquer !",
      "Je ne peux pas trancher les démons… mais je peux te faire réfléchir !",
      "Bien ! Tu progresses, jeune chasseur !",
      "Les papillons volent sur les ondes radio !"
    ],
    qs: [
      { q:"Les signaux radio sont émis et reçus par :", o:["Des câbles électriques","Des fibres optiques","Des antennes","Des microphones"], a:"Des antennes", exp:"Les signaux radio (ondes électromagnétiques) sont émis et captés exclusivement par des antennes." },
      { q:"Le wifi fonctionne grâce à :", o:["Des câbles ethernet","Des signaux radio transmis localement","Des signaux lumineux","Des signaux sonores"], a:"Des signaux radio transmis localement", exp:"Le wifi utilise des signaux radio transmis sur un périmètre de 30 à 50 mètres autour de la borne." },
      { q:"Les signaux radio peuvent-ils se propager dans le vide ?", o:["Non, comme le son ils ont besoin de matière","Oui, ce sont des ondes électromagnétiques","Seulement dans l'eau","Seulement dans les métaux"], a:"Oui, ce sont des ondes électromagnétiques", exp:"Les ondes radio sont électromagnétiques : elles se propagent dans le vide et dans l'air." },
      { q:"La 4G/5G est un exemple de :", o:["Signal électrique par câble","Signal lumineux par fibre","Signal radio pour les téléphones mobiles","Signal sonore amplifié"], a:"Signal radio pour les téléphones mobiles", exp:"La 4G et la 5G utilisent des signaux radio émis par des antennes relais pour connecter les téléphones mobiles." },
      { q:"Lors d'un appel mobile, la voix est transformée en :", o:["Signal sonore transmis dans l'air directement","Signal électrique puis signal radio entre antennes","Signal lumineux dans une fibre optique","Signal morse en points et traits"], a:"Signal électrique puis signal radio entre antennes", exp:"La voix (son) est convertie en signal électrique par le micro, puis en signal radio émis par l'antenne." },
      { q:"Le Bluetooth est une technologie qui utilise :", o:["Des câbles","Des signaux radio de courte portée","Des signaux lumineux infrarouges","Des ultrasons"], a:"Des signaux radio de courte portée", exp:"Le Bluetooth utilise des signaux radio de très courte portée (environ 10 mètres)." },
      { q:"Les satellites de télécommunication transmettent des signaux de type :", o:["Sonore","Électrique par câble","Lumineux par fibre","Radio entre antennes au sol et satellite"], a:"Radio entre antennes au sol et satellite", exp:"Les satellites reçoivent et retransmettent des signaux radio entre les antennes au sol et l'espace." },
      { q:"Pourquoi les signaux radio ne nécessitent-ils pas de fil ?", o:["Car ils utilisent l'eau comme support","Car ce sont des ondes électromagnétiques qui se propagent librement","Car ils rebondissent sur les nuages","Car ils utilisent le sol comme conducteur"], a:"Car ce sont des ondes électromagnétiques qui se propagent librement", exp:"Les ondes radio se propagent librement dans l'air et le vide sans avoir besoin d'un support physique." },
      { q:"Les ondes radio se propagent à quelle vitesse ?", o:["340 m/s (vitesse du son)","300 000 km/s (vitesse de la lumière)","1 000 km/h","100 m/s"], a:"300 000 km/s (vitesse de la lumière)", exp:"Les ondes radio sont des ondes électromagnétiques : elles se propagent à la vitesse de la lumière." },
      { q:"Une télécommande de télévision utilise généralement quel type de signal ?", o:["Signal radio comme le wifi","Signal infrarouge (lumière invisible)","Signal sonore ultrason","Signal électrique par câble"], a:"Signal infrarouge (lumière invisible)", exp:"La plupart des télécommandes utilisent des signaux infrarouges (lumière invisible pour l'œil humain)." },
      { q:"⚔️ BOSS — Rui, Lune Inf. 5 ! Dans le vide de l'espace, un astronaute frappe sur la coque. Son voisin à 10m l'entend-il ?", o:["Oui — l'air dans les combinaisons transmet le son","Non — dans le vide de l'espace, le son ne peut pas se propager","Oui — la vibration se transmet quand même dans l'air","Non — le son va trop lentement dans l'espace"], a:"Non — dans le vide de l'espace, le son ne peut pas se propager", exp:"Dans le vide de l'espace, il n'y a pas de matière pour transmettre le son. On ne peut pas l'entendre !", isBoss:true, bossName:"Rui" }
    ]
  },

  6: {
    name: "ÎLE DE RENGOKU",
    charName: "Rengoku",
    color: "#E55E00",
    topic: "La Fibre Optique",
    level: "5ème",
    bgm: "kanto-isle-6",
    msgs: [
      "SET YOUR HEART ABLAZE ! Apprends la fibre !",
      "La flamme et la lumière, même énergie !",
      "FLAME BREATHING — neuvième forme !",
      "UMAI ! Excellente réponse !",
      "Mon père aurait approuvé cette réponse !"
    ],
    qs: [
      { q:"La fibre optique transmet des informations grâce à :", o:["Du courant électrique","Des ondes radio","De la lumière (laser) guidée dans un tube de verre","Des ondes sonores"], a:"De la lumière (laser) guidée dans un tube de verre", exp:"La fibre optique est un câble en verre très fin dans lequel un signal lumineux (laser) se propage." },
      { q:"Par rapport au câble en cuivre, la fibre optique permet de transmettre les données :", o:["Plus lentement mais avec moins d'erreurs","À la même vitesse","Beaucoup plus rapidement et sur de plus grandes distances","Uniquement sur de courtes distances"], a:"Beaucoup plus rapidement et sur de plus grandes distances", exp:"La fibre optique utilise la lumière (300 000 km/s), bien plus rapide que le signal électrique du cuivre." },
      { q:"Dans une fibre optique, le signal qui se propage est :", o:["Un signal électrique","Un signal sonore","Un signal lumineux (laser)","Un signal radio"], a:"Un signal lumineux (laser)", exp:"Dans la fibre optique, c'est un faisceau laser (signal lumineux) qui transporte les informations." },
      { q:"La fibre optique est utilisée pour :", o:["Alimenter les maisons en électricité","Transmettre rapidement de très grandes quantités de données (internet haut débit)","Écouter la radio","Recevoir la télévision par satellite"], a:"Transmettre rapidement de très grandes quantités de données (internet haut débit)", exp:"La fibre optique est la technologie utilisée pour le très haut débit internet." },
      { q:"La fibre optique est faite principalement de :", o:["Cuivre","Plastique souple","Verre ou silice très pure","Aluminium"], a:"Verre ou silice très pure", exp:"La fibre optique est constituée d'un cœur en verre (silice) très pur dans lequel la lumière se propage." },
      { q:"Les câbles sous-marins de fibre optique permettent de :", o:["Transporter l'électricité entre continents","Relier les continents pour l'internet mondial","Détecter les tremblements de terre","Alimenter les bateaux en énergie"], a:"Relier les continents pour l'internet mondial", exp:"Des milliers de km de câbles sous-marins en fibre optique constituent l'épine dorsale d'internet mondial." },
      { q:"La fibre optique peut-elle être affectée par les interférences électromagnétiques ?", o:["Oui, comme les câbles en cuivre","Non, car elle utilise la lumière et non l'électricité","Oui, mais seulement à grande distance","Non, car elle est enterrée"], a:"Non, car elle utilise la lumière et non l'électricité", exp:"La fibre optique transporte de la lumière et non de l'électricité : pas d'interférences électromagnétiques." },
      { q:"Pour lire un CD, on utilise :", o:["Un signal électrique de lecture","Un faisceau laser qui lit les creux et plats de la surface","Une aiguille comme sur un vinyle","Des ultrasons"], a:"Un faisceau laser qui lit les creux et plats de la surface", exp:"Un laser lit la surface du CD en détectant la différence de réflexion entre les creux et les plats gravés." },
      { q:"La vitesse de transmission dans une fibre optique est proche de :", o:["La vitesse du son (340 m/s)","La vitesse d'un TGV (300 km/h)","La vitesse de la lumière (300 000 km/s)","La vitesse d'un avion (900 km/h)"], a:"La vitesse de la lumière (300 000 km/s)", exp:"La lumière dans la fibre optique se propage à environ 200 000 km/s, quasi la vitesse de la lumière." },
      { q:"Laquelle de ces affirmations sur la fibre optique est FAUSSE ?", o:["Elle utilise la lumière pour transmettre des données","Elle est plus rapide que le câble en cuivre","Elle ne peut fonctionner que sur des distances inférieures à 100m","Elle est utilisée pour le très haut débit internet"], a:"Elle ne peut fonctionner que sur des distances inférieures à 100m", exp:"FAUX ! La fibre optique peut transmettre sur des milliers de kilomètres (câbles sous-marins)." },
      { q:"⚔️ BOSS — Gyomei, Pilier de la Pierre ! La 'réflexion totale interne' dans la fibre optique sert à :", o:["Amplifier la lumière à chaque rebond","Permettre à la lumière de rester piégée dans la fibre sur de longues distances","Transformer la lumière en signal électrique","Protéger la fibre contre la chaleur"], a:"Permettre à la lumière de rester piégée dans la fibre sur de longues distances", exp:"La réflexion totale interne fait rebondir la lumière sur les parois de la fibre sans qu'elle en sorte.", isBoss:true, bossName:"Gyomei" }
    ]
  },

  7: {
    name: "ÎLE DE TENGEN",
    charName: "Tengen",
    color: "#ec4899",
    topic: "Le Téléphone — De Bell à la 5G",
    level: "5ème",
    bgm: "kanto-isle-7",
    msgs: [
      "FLAMBOYANT ! Réponds avec style !",
      "Sound Breathing — Première Forme !",
      "Mes trois épouses révisent les sciences, toi aussi !",
      "ULTRA FLAMBOYANT ! Excellente réponse !",
      "Un vrai guerrier d'élite connaît ses signaux !"
    ],
    qs: [
      { q:"Le premier téléphone reposait sur la transmission de quel type de signal ?", o:["Signal radio","Signal lumineux","Signal électrique dans des câbles","Signal sonore dans un tuyau"], a:"Signal électrique dans des câbles", exp:"Les premiers téléphones convertissaient la voix en signal électrique transmis dans des câbles conducteurs." },
      { q:"Comment le téléphone transforme-t-il la voix pour la transmettre ?", o:["Il la transmet directement sans transformation","Il la transforme en signal électrique grâce au microphone","Il la code en Morse automatiquement","Il la transforme en signal lumineux"], a:"Il la transforme en signal électrique grâce au microphone", exp:"Le microphone du téléphone capte les vibrations sonores et les convertit en variations de courant électrique." },
      { q:"Dans un appel téléphonique fixe, la chaîne de signaux est :", o:["Son → signal radio → son","Son → signal électrique → son","Son → signal lumineux → son","Signal électrique → son → signal électrique"], a:"Son → signal électrique → son", exp:"Microphone convertit le son en signal électrique → transmis par câble → haut-parleur reconvertit en son." },
      { q:"Le téléphone mobile fonctionne différemment car il utilise :", o:["Des câbles téléphoniques souterrains","Des signaux radio émis entre le téléphone et des antennes relais","Des signaux lumineux par fibre optique","Des satellites uniquement"], a:"Des signaux radio émis entre le téléphone et des antennes relais", exp:"Le téléphone mobile convertit le signal électrique en signal radio émis vers des antennes relais du réseau." },
      { q:"À quelle époque sont apparus les premiers téléphones électriques ?", o:["Au XVIIIe siècle (1700s)","Dans la seconde moitié du XIXe siècle (1800s)","Au XXe siècle (1900s)","Au XXIe siècle (2000s)"], a:"Dans la seconde moitié du XIXe siècle (1800s)", exp:"Le téléphone a été développé dans la seconde moitié du XIXe siècle grâce à Meucci, Bell et Gray." },
      { q:"Les antennes relais servent à :", o:["Amplifier le son directement","Recevoir le signal radio du téléphone et le retransmettre vers le réseau","Stocker les messages","Convertir le signal en fibre optique uniquement"], a:"Recevoir le signal radio du téléphone et le retransmettre vers le réseau", exp:"Les antennes relais captent le signal radio de ton téléphone et le transmettent au réseau téléphonique." },
      { q:"La 5G permet, par rapport à la 4G :", o:["Uniquement un meilleur signal en zones rurales","Des débits 10 à 100 fois plus élevés et une latence très faible","Uniquement une meilleure qualité sonore","La connexion à des satellites"], a:"Des débits 10 à 100 fois plus élevés et une latence très faible", exp:"La 5G offre des débits jusqu'à 20 Gbits/s et une latence inférieure à 1ms." },
      { q:"Un smartphone peut utiliser simultanément :", o:["Uniquement la 4G","Wifi, 4G/5G, Bluetooth, GPS — plusieurs types de signaux radio","Uniquement le wifi","Uniquement la fibre optique"], a:"Wifi, 4G/5G, Bluetooth, GPS — plusieurs types de signaux radio", exp:"Un smartphone intègre plusieurs antennes pour différents signaux radio : wifi, 4G/5G, Bluetooth, GPS, NFC..." },
      { q:"Le haut-parleur d'un téléphone joue le rôle de :", o:["Émetteur sonore — il convertit le signal électrique en son","Récepteur électrique uniquement","Émetteur de signal radio","Amplificateur de signal lumineux"], a:"Émetteur sonore — il convertit le signal électrique en son", exp:"Le haut-parleur reçoit un signal électrique et le convertit en vibrations sonores audibles." },
      { q:"Antonio Meucci est reconnu comme l'un des inventeurs du téléphone. De quelle nationalité était-il ?", o:["Américain","Britannique","Français","Italien"], a:"Italien", exp:"Antonio Meucci était un inventeur italo-américain. Il développa un dispositif de communication vocale dès les années 1850." },
      { q:"⚔️ BOSS — Sanemi, Pilier du Vent ! Un appel WhatsApp Paris-Tokyo passe par : (reconstitue le trajet correct)", o:["Voix → Wifi → Signal radio 4G → Satellite → Son","Voix → Signal électrique → Signal radio → Fibre optique sous-marine → Signal radio → Son","Voix → Signal lumineux → Fibre optique aérienne → Signal sonore → Son","Voix → Signal Morse → Câble électrique sous-marin → Son"], a:"Voix → Signal électrique → Signal radio → Fibre optique sous-marine → Signal radio → Son", exp:"Voix → micro (signal électrique) → signal radio (4G/wifi) → câble fibre optique sous-marin → signal radio au Japon → haut-parleur → son. Tout ça en moins de 200ms !", isBoss:true, bossName:"Sanemi" }
    ]
  },

  8: {
    name: "ÎLE DE MUICHIRO",
    charName: "Muichiro",
    color: "#06b6d4",
    topic: "Le Monde Connecté",
    level: "5ème",
    bgm: "kanto-isle-8",
    msgs: [
      "Mist Breathing — ma mémoire est parfaite.",
      "Je n'ai que 14 ans mais je sais tout ça.",
      "Hashira de la Brume — concentration maximale.",
      "Ta mémoire s'améliore, comme la mienne.",
      "Excellent. Même Kokushibo serait impressionné."
    ],
    qs: [
      { q:"Internet repose principalement sur :", o:["Des signaux radio entre satellites uniquement","Des câbles en fibre optique + signaux radio (wifi/4G)","Des câbles électriques en cuivre uniquement","Des signaux lumineux dans l'atmosphère"], a:"Des câbles en fibre optique + signaux radio (wifi/4G)", exp:"Internet combine des câbles en fibre optique (terrestres et sous-marins) et des signaux radio (wifi, 4G, 5G)." },
      { q:"Le GPS fonctionne grâce à :", o:["Des signaux radio émis par des satellites vers nos appareils","Des signaux lumineux entre tours","Des câbles électriques enterrés","Des signaux sonores ultrasonores"], a:"Des signaux radio émis par des satellites vers nos appareils", exp:"Le GPS reçoit des signaux radio émis par au moins 4 satellites et calcule ta position grâce au temps de trajet." },
      { q:"L'IoT (Internet des Objets) désigne :", o:["Uniquement les smartphones connectés","Des objets du quotidien connectés à internet via des signaux","Le réseau de câbles sous-marins","Les satellites de communication"], a:"Des objets du quotidien connectés à internet via des signaux", exp:"L'IoT connecte à internet des objets (réfrigérateurs, ampoules, montres, voitures) via des signaux wifi, Bluetooth ou 4G." },
      { q:"Lors du streaming d'une vidéo, les données passent par :", o:["Un seul type de signal du serveur à ton écran","Plusieurs types : fibre optique, routeurs, signal radio wifi ou 4G","Uniquement des signaux radio satellites","Uniquement des câbles en cuivre"], a:"Plusieurs types : fibre optique, routeurs, signal radio wifi ou 4G", exp:"Serveur → fibre optique → box internet → signal radio wifi → ta tablette/TV. Plusieurs technologies s'enchaînent." },
      { q:"La numérisation d'un signal consiste à :", o:["Convertir un signal en chiffres binaires (0 et 1)","Amplifier le signal pour qu'il soit plus fort","Convertir un signal lumineux en signal sonore","Filtrer les bruits parasites uniquement"], a:"Convertir un signal en chiffres binaires (0 et 1)", exp:"Numériser un signal, c'est le convertir en suite de 0 et de 1 (code binaire) pour que les ordinateurs le traitent." },
      { q:"Pourquoi les informations sont-elles souvent numérisées avant d'être transmises ?", o:["Car c'est plus rapide à envoyer","Car le signal numérique est moins sensible aux perturbations et peut être corrigé","Car les antennes ne peuvent transmettre que des 0 et des 1","Car les câbles ne supportent que le numérique"], a:"Car le signal numérique est moins sensible aux perturbations et peut être corrigé", exp:"Le numérique (0 et 1) est beaucoup plus résistant aux perturbations qu'un signal analogique." },
      { q:"La domotique (maison intelligente) utilise des signaux pour :", o:["Chauffer la maison électriquement","Contrôler à distance éclairage, chauffage, sécurité via wifi ou Bluetooth","Transmettre la télévision par satellite","Alimenter les appareils en énergie solaire"], a:"Contrôler à distance éclairage, chauffage, sécurité via wifi ou Bluetooth", exp:"La domotique utilise des signaux radio (wifi, Zigbee, Bluetooth) pour connecter et contrôler les équipements d'une maison." },
      { q:"La 5G par rapport à la 4G :", o:["Une portée plus grande mais un débit similaire","Des débits 10 à 100 fois plus élevés permettant de nouveaux usages","Uniquement une meilleure couverture en zones rurales","Un signal plus résistant à la pluie"], a:"Des débits 10 à 100 fois plus élevés permettant de nouveaux usages", exp:"La 5G offre des débits jusqu'à 20 Gbits/s et une latence inférieure à 1ms, permettant les voitures autonomes." },
      { q:"Lequel de ces dispositifs émet ET reçoit des signaux (émetteur-récepteur) ?", o:["Une ampoule LED simple","Un haut-parleur passif","Un smartphone","Un thermostat analogique"], a:"Un smartphone", exp:"Un smartphone est un émetteur-récepteur complet : il émet des signaux radio (appels, wifi, bluetooth) et en reçoit." },
      { q:"L'avantage principal d'un câble en fibre optique sous-marin par rapport à un câble électrique sous-marin :", o:["Il est moins cher à fabriquer","Il peut transmettre beaucoup plus de données à très grande vitesse avec moins de pertes","Il est plus facile à réparer","Il résiste mieux à la pression de l'eau"], a:"Il peut transmettre beaucoup plus de données à très grande vitesse avec moins de pertes", exp:"La fibre optique transporte des milliers de fois plus de données qu'un câble en cuivre, à la vitesse de la lumière." },
      { q:"⚔️ BOSS FINAL — Obanai, Pilier du Serpent ! Tu envoies une photo Paris-Sydney (17 000 km) via fibre (200 000 km/s). Combien de temps ?", o:["Environ 1 minute","Environ 1 seconde","Environ 0,085 seconde (85 millisecondes)","Instantanément (0 seconde)"], a:"Environ 0,085 seconde (85 millisecondes)", exp:"Temps = 17 000 km ÷ 200 000 km/s = 0,085 s = 85 ms ! En pratique ~200-300ms à cause des relais, mais quasi-instantané !", isBoss:true, bossName:"Obanai" }
    ]
  }
};

// ══════════════════════════════════════════════════════════════
// 5. ÉTAT GLOBAL
// ══════════════════════════════════════════════════════════════
var kanto_xp                = 0;
var kanto_completedIslands  = {};
var kanto_currentIsland     = 0;
var kanto_streak            = 0;
var kanto_answers           = {};

// ══════════════════════════════════════════════════════════════
// 6. AUDIO
// ══════════════════════════════════════════════════════════════
function kanto_playBGM(track) {
  if (typeof playBGM === 'function') {
    try { playBGM(track); return; } catch (e) {}
  }
  console.warn('[Kanto] playBGM non disponible pour', track);
}
function kanto_stopBGM() {
  if (typeof stopBGM === 'function') stopBGM();
}

// ══════════════════════════════════════════════════════════════
// 7. DÉMARRAGE D'UNE ÎLE
// ══════════════════════════════════════════════════════════════
function kanto_startIsland(n) {
  var isle = ISLANDS_KANTO[n];
  if (!isle) return;
  kanto_playBGM(isle.bgm || 'kanto-isle');

  if (typeof lesson_kanto === 'function') {
    lesson_kanto(n, function() {
      kanto_playCinematic(n, function() { kanto_launchIsland(n); });
    });
  } else {
    kanto_playCinematic(n, function() { kanto_launchIsland(n); });
  }
}

function kanto_launchIsland(n) {
  kanto_currentIsland = n;
  kanto_answers       = {};

  // Boss battle — init si l'île contient une question boss
  var _kb = ISLANDS_KANTO[n];
  if (_kb && _kb.qs && _kb.qs.some(function(q){ return q.isBoss; })) {
    var _bq = _kb.qs.find(function(q){ return q.isBoss; });
    if (window.AP && window.AP.boss) {
      window.AP.boss.init('kanto', _bq.bossName || 'BOSS', '', 1); // img résolue par boss-battle.js BOSS_IMGS
    }
  }

  // Fermer la cinématique proprement
  var ov = document.getElementById('kanto-cine-overlay');
  if (ov) {
    ov.style.display       = 'none';
    ov.style.pointerEvents = 'none';
    ov.style.zIndex        = '-1';
    ov.innerHTML           = '';
  }

  var secIles = document.getElementById('kanto-iles-sec');
  var secQuiz = document.getElementById('kanto-quiz-sec');
  if (secIles) secIles.style.display = 'none';
  if (secQuiz) {
    secQuiz.style.display       = 'block';
    secQuiz.style.pointerEvents = 'auto';
    secQuiz.style.zIndex        = '5';
  }
  window.scrollTo(0, 0);

  var isle = ISLANDS_KANTO[n];
  document.getElementById('kanto-qTitle').textContent     = isle.name + ' — ' + isle.topic;
  document.getElementById('kanto-qProgFill').style.width  = '0%';
  document.getElementById('kanto-qProgLbl').textContent   = '0 / ' + isle.qs.length;

  var keys = ['A', 'B', 'C', 'D'];
  var html = '';

  isle.qs.forEach(function (e, i) {
    var msg    = isle.msgs[i % isle.msgs.length];
    var avatar = KANTO_AVATARS[n] || '';
    var bossBanner = e.isBoss
      ? '<div class="kanto-boss-banner">' +
          '<div class="kanto-boss-label">⚔️ COMBAT FINAL</div>' +
          '<div class="kanto-boss-name">' + (e.bossName || 'BOSS') + '</div>' +
          '<div class="kanto-boss-hp"><div class="kanto-boss-hp-fill"></div></div>' +
        '</div>'
      : '';

    var opts = e.o.map(function (opt, j) {
      var safe = opt.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
      return '<label class="kanto-opt" id="kanto-lbl' + i + '_' + j + '"' +
        ' data-qi="' + i + '" data-oi="' + j + '" data-v="' + safe + '"' +
        ' onclick="kanto_selectOpt(this.dataset.qi,this.dataset.oi,this.dataset.v)">' +
        '<span class="kanto-opt-key">' + keys[j] + '</span>' +
        '<span class="kanto-opt-txt">' + opt + '</span>' +
        '</label>';
    }).join('');

    html +=
      '<div class="kanto-q-card' + (e.isBoss ? ' kanto-boss-q' : '') + '"' +
        ' id="kanto-card' + i + '" style="--isle-color:' + isle.color + '">' +
        bossBanner +
        '<div class="kanto-char-bubble">' +
          '<img src="' + avatar + '" alt="' + isle.charName + '" class="kanto-char-img"' +
            ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="kanto-char-fallback" style="display:none;background:' + isle.color + '22;color:' + isle.color + '">' +
            KANTO_FALLBACK[n] +
          '</div>' +
          '<div class="kanto-bubble-txt">' + msg + '</div>' +
        '</div>' +
        '<div class="kanto-q-number">Question ' + (i + 1) + ' / ' + isle.qs.length + '</div>' +
        '<div class="kanto-q-text">' + e.q + '</div>' +
        '<div class="kanto-opts">' + opts + '</div>' +
        '<div class="kanto-fb" id="kanto-fb' + i + '"></div>' +
        '<div class="kanto-expl" id="kanto-exp' + i + '"></div>' +
      '</div>';
  });

  html += '<div class="kanto-submit-wrap">' +
    '<button class="kanto-btn kanto-btn-red" onclick="kanto_corriger(' + n + ')">⚔️ CORRIGER MES RÉPONSES</button>' +
    '</div>';

  document.getElementById('kanto-qContainer').innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// 8. SÉLECTION D'UNE OPTION
// ══════════════════════════════════════════════════════════════
function kanto_selectOpt(qi, oi, val) {
  qi = parseInt(qi); oi = parseInt(oi);
  if (typeof sfxSwoosh === 'function') sfxSwoosh();
  kanto_answers[qi] = { oi: oi, val: val };

  ISLANDS_KANTO[kanto_currentIsland].qs[qi].o.forEach(function (_, j) {
    var b = document.getElementById('kanto-lbl' + qi + '_' + j);
    if (b) b.classList.remove('kanto-selected');
  });
  var sel = document.getElementById('kanto-lbl' + qi + '_' + oi);
  if (sel) sel.classList.add('kanto-selected');

  var total = ISLANDS_KANTO[kanto_currentIsland].qs.length;
  document.getElementById('kanto-qProgFill').style.width =
    Math.round(Object.keys(kanto_answers).length / total * 100) + '%';
  document.getElementById('kanto-qProgLbl').textContent =
    Object.keys(kanto_answers).length + ' / ' + total;
}

// ══════════════════════════════════════════════════════════════
// 9. CORRECTION
// ══════════════════════════════════════════════════════════════
function kanto_corriger(n) {
  var isle  = ISLANDS_KANTO[n];
  if (!isle) return;
  var score = 0;
  kanto_streak = 0;

  isle.qs.forEach(function (e, i) {
    var ans  = kanto_answers[i];
    var fb   = document.getElementById('kanto-fb'  + i);
    var expl = document.getElementById('kanto-exp' + i);

    // Désactiver toutes les options
    e.o.forEach(function (_, j) {
      var b = document.getElementById('kanto-lbl' + i + '_' + j);
      if (b) b.style.pointerEvents = 'none';
    });

    if (!ans) {
      if (fb) { fb.innerHTML = '⚠️ Pas de réponse ! Réponse : <strong>' + e.a + '</strong>'; fb.className = 'kanto-fb kanto-ko'; }
      kanto_streak = 0;
    } else {
      var ok = (ans.val === e.a);
      if (ok) {
        score++; kanto_streak++;
        if (fb) { fb.innerHTML = '✅ Exact !'; fb.className = 'kanto-fb kanto-ok'; }
        var btn = document.getElementById('kanto-lbl' + i + '_' + ans.oi);
        if (btn) btn.classList.add('kanto-correct');
        if (typeof sfxOK      === 'function') sfxOK();
        if (typeof fxCorrect  === 'function') fxCorrect('⚔️ PARFAIT !');
        if (typeof showCombatGif === 'function') showCombatGif(score === isle.qs.length ? 'perfect' : 'correct');
        if (kanto_streak >= 3 && typeof starRain === 'function') starRain(4);
        if (kanto_streak >= 5 && typeof showToast === 'function')
          setTimeout(function () { showToast('⚔️ SÉRIE × ' + kanto_streak + ' !'); }, 400);
      } else {
        kanto_streak = 0;
        if (fb) { fb.innerHTML = '❌ Raté ! Réponse correcte : <strong>' + e.a + '</strong>'; fb.className = 'kanto-fb kanto-ko'; }
        var wb = document.getElementById('kanto-lbl' + i + '_' + ans.oi);
        if (wb) wb.classList.add('kanto-wrong');
        e.o.forEach(function (opt, j) {
          if (opt === e.a) {
            var cb = document.getElementById('kanto-lbl' + i + '_' + j);
            if (cb) cb.classList.add('kanto-correct');
          }
        });
        if (typeof sfxKO    === 'function') sfxKO();
        if (typeof fxWrong  === 'function') fxWrong();
        if (typeof showCombatGif === 'function') showCombatGif('wrong');
      }
    }
    if (expl) { expl.innerHTML = '💡 ' + e.exp; expl.className = 'kanto-expl kanto-show'; }
  });

  // XP + progression
  var gained = score * 2;
  window._kantoLastScore = score;
  kanto_xp += gained;
  kanto_completedIslands[n] = score;

  // Sync avec le système global si dispo
  if (typeof xp !== 'undefined') xp += gained;
  if (typeof completedIslands !== 'undefined') completedIslands['kanto_' + n] = score;
  if (typeof updateHUD       === 'function') updateHUD();
  if (typeof checkBadges     === 'function') checkBadges();
  if (typeof saveProgress    === 'function') saveProgress();

  // Sauvegarde Supabase directe
  _kantoSaveDB(n, score, gained);

  // Boss battle — résultat
  if (window.AP && window.AP.boss && window.AP.boss.isActive()) {
    if (isle.qs.some(function(q){ return q.isBoss; })) {
      window.AP.boss.hit(score >= isle.qs.length - 1, true);
    }
  }
  // BGM résultat
  if (score === isle.qs.length) {
    kanto_playBGM('kanto-victory');
    if (typeof sfxPerfect === 'function') sfxPerfect();
    if (typeof starRain   === 'function') starRain(12);
  } else {
    kanto_playBGM('kanto-map');
  }

  kanto_showResults(n, score);
}

// Sauvegarde Supabase
async function _kantoSaveDB(n, score, xpGained) {
  try {
    if (typeof dbGetActiveChild !== 'function') return;
    var child = dbGetActiveChild();
    if (!child) return;
    await dbSaveProgression(child.id, 'kanto_' + n, score, xpGained);
  } catch (e) {
    console.warn('[Kanto] DB save error:', e.message);
  }
}

// ══════════════════════════════════════════════════════════════
// 10. RÉSULTATS
// ══════════════════════════════════════════════════════════════
function kanto_showResults(n, score) {
  var isle   = ISLANDS_KANTO[n];
  var gained = score * 2;

  var txts = [
    { min: 11, t: 'HASHIRA DE LA SCIENCE ! 11/11 !' },
    { min: 9,  t: 'EXCELLENT ! Pilier confirmé !' },
    { min: 7,  t: 'Bien joué, chasseur !' },
    { min: 5,  t: 'Continue l\'entraînement !' },
    { min: 0,  t: 'Ne lâche pas ! Réessaie !' }
  ];
  var res = txts.find(function (r) { return score >= r.min; }) || txts[txts.length - 1];

  var gif = (score === isle.qs.length)
    ? KANTO_GIFS_PERFECT[Math.floor(Math.random() * KANTO_GIFS_PERFECT.length)]
    : score >= Math.ceil(isle.qs.length * 0.6)
      ? KANTO_GIFS_WIN[n % Math.max(1, KANTO_GIFS_WIN.length)]
      : KANTO_GIFS_LOSE[0];

  var stars = Array.from({ length: isle.qs.length }, function (_, i) {
    return i < score ? '⭐' : '☆';
  }).join('');

  var html =
    '<div class="kanto-result-card" id="kanto-resCard" style="--isle-color:' + isle.color + '">' +
      '<div class="kanto-result-banner">' +
        '<img src="' + (KANTO_AVATARS[n] || '') + '" alt="' + isle.charName + '" class="kanto-result-avatar"' +
          ' onerror="this.style.display=\'none\'">' +
        '<div class="kanto-result-score-wrap">' +
          '<div class="kanto-result-score">' + score + '/' + isle.qs.length + '</div>' +
          '<div class="kanto-result-title">' + res.t + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="kanto-result-body">' +
        '<div class="kanto-result-topic">🔬 ' + isle.topic + '</div>' +
        '<div class="kanto-result-stars">' + stars + '</div>' +
        (gif ? '<img src="' + gif + '" alt="reaction" class="kanto-result-gif" onerror="this.style.display=\'none\'">' : '') +
        '<div class="kanto-result-xp">+' + gained + ' XP Sciences ⚔️ — Total Kanto : ' + kanto_xp + ' XP</div>' +
        '<button class="kanto-btn kanto-btn-red" onclick="kanto_goBack()">🗺️ RETOUR À LA CARTE</button>' +
        '<button class="kanto-btn kanto-btn-outline" onclick="kanto_retry(' + n + ')">🔁 REJOUER</button>' +
      '</div>' +
    '</div>';

  var c = document.getElementById('kanto-qContainer');
  if (c) c.innerHTML += html;

  // Mettre à jour les étoiles dans la grille
  var stEl = document.getElementById('kanto-stars' + n);
  if (stEl) stEl.textContent = stars;

  setTimeout(function () {
    var rc = document.getElementById('kanto-resCard');
    if (rc) rc.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 400);
}

// ══════════════════════════════════════════════════════════════
// 11. NAVIGATION
// ══════════════════════════════════════════════════════════════
function kanto_goBack() {
  if (window.AP && window.AP.recap) {
    var isle = ISLANDS_KANTO[kanto_currentIsland];
    var total = isle ? isle.qs.length : 11;
    window.AP.recap.show('kanto', window._kantoLastScore || 0, total, kanto_currentIsland, function() {
      kanto_playBGM('kanto-map');
      var secQuiz = document.getElementById('kanto-quiz-sec');
      var secIles = document.getElementById('kanto-iles-sec');
      if (secQuiz) secQuiz.style.display = 'none';
      if (secIles) secIles.style.display = 'block';
      kanto_answers = {};
      window.scrollTo(0, 0);
      var grid = document.getElementById('kanto-islands-grid');
      if (grid) { grid.innerHTML = ''; buildKantoGrid(); }
    });
  } else {
    kanto_playBGM('kanto-map');
    var secQuiz = document.getElementById('kanto-quiz-sec');
    var secIles = document.getElementById('kanto-iles-sec');
    if (secQuiz) secQuiz.style.display = 'none';
    if (secIles) secIles.style.display = 'block';
    kanto_answers = {};
    window.scrollTo(0, 0);
    var grid = document.getElementById('kanto-islands-grid');
    if (grid) { grid.innerHTML = ''; buildKantoGrid(); }
  }
}

function kanto_retry(n) {
  kanto_answers = {};
  kanto_startIsland(n);
}

// ══════════════════════════════════════════════════════════════
// 12. GRILLE DES ÎLES
// ══════════════════════════════════════════════════════════════
function buildKantoGrid() {
  var grid = document.getElementById('kanto-islands-grid');
  if (!grid || grid.children.length > 0) return;
  var html = '';

  for (var n = 1; n <= 8; n++) {
    var isle   = ISLANDS_KANTO[n];
    var avatar = KANTO_AVATARS[n] || '';
    var score  = kanto_completedIslands[n] || 0;
    var done   = kanto_completedIslands[n] !== undefined;
    var stars  = Array.from({ length: isle.qs.length }, function (_, i) {
      return i < score ? '⭐' : '☆';
    }).join('');

    html +=
      '<div class="kanto-isle-card' + (done ? ' done' : '') + '"' +
        ' onclick="kanto_startIsland(' + n + ')"' +
        ' style="--isle-color:' + isle.color + '">' +
        '<div class="kanto-isle-img-wrap">' +
          '<img src="' + avatar + '" alt="' + isle.charName + '" class="kanto-isle-img"' +
            ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="kanto-isle-img-fallback" style="background:' + isle.color + '22;color:' + isle.color + '">' +
            KANTO_FALLBACK[n] +
          '</div>' +
          '<div class="kanto-isle-overlay" style="background:linear-gradient(to top,' + isle.color + 'cc,transparent)"></div>' +
        '</div>' +
        '<div class="kanto-isle-body">' +
          '<div class="kanto-isle-num">ÎLE #' + n + '</div>' +
          '<div class="kanto-isle-name" style="color:' + isle.color + '">' + isle.charName.toUpperCase() + '</div>' +
          '<div class="kanto-isle-topic">' + isle.topic + '</div>' +
          '<div class="kanto-isle-level" style="border-color:' + isle.color + '55;color:' + isle.color + '">' + isle.level + '</div>' +
          '<div class="kanto-isle-stars" id="kanto-stars' + n + '">' + stars + '</div>' +
        '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// 13. CHARGEMENT PROGRESSION SAUVEGARDÉE
// ══════════════════════════════════════════════════════════════
async function loadKantoProgress() {
  // Essayer Supabase d'abord
  var child = (typeof dbGetActiveChild === 'function') ? dbGetActiveChild() : null;
  if (child) {
    try {
      var prog = await dbGetProgression(child.id);
      prog.forEach(function (row) {
        if (String(row.island_id).startsWith('kanto_')) {
          var n = parseInt(row.island_id.replace('kanto_', ''));
          if (n >= 1 && n <= 8) {
            kanto_completedIslands[n] = row.score || 0;
            kanto_xp += row.xp || 0;
          }
        }
      });
      return;
    } catch (e) { /* fallback localStorage */ }
  }

  // Fallback localStorage
  try {
    var key   = 'kanto_progress';
    var saved = localStorage.getItem(key);
    if (!saved) return;
    var d = JSON.parse(saved);
    kanto_xp               = d.xp || 0;
    kanto_completedIslands = d.completedIslands || {};
  } catch (e) {}
}

// ══════════════════════════════════════════════════════════════
// 14. ENTRÉE DANS LE PAYS KANTO (appelé par router.js)
// ══════════════════════════════════════════════════════════════
async function showKanto() {
  // Stopper la musique actuelle et lancer celle de Kanto
  kanto_stopBGM();
  setTimeout(function () { kanto_playBGM('kanto-map'); }, 300);

  // Afficher les sections
  var sec = document.getElementById('kanto-iles-sec');
  if (sec) {
    sec.style.display = 'block';
    buildKantoGrid();
  }

  // Fond animé
  var bg = document.getElementById('kanto-bg');
  if (bg) bg.classList.add('visible');

  // Charger les assets Supabase (GIFs, avatars)
  await loadKantoAssets();
  await loadKantoProgress();
  loadKantoBgStrips();
}

console.info('⚔️  quiz-kanto.js chargé — Sciences · Demon Slayer · 8 îles × 11 questions');