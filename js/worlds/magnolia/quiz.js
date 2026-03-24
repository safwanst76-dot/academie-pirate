// ═══════════════════════════════════════════════════════════
// QUIZ-HISTOIRE.JS v4 — Académie Pirate
// ✅ FIX avatars : mapping corrigé (3=Piccolo, 4=Gohan, 5=Trunks, 7=Android18, 8=Babidi)
// ✅ FIX audio : hist_playBGM robuste avec audio HTML5 direct
// ✅ FIX clics : data-v au lieu de JSON.stringify dans onclick
// ✅ Musique extensible par île (propriété bgm)
// ═══════════════════════════════════════════════════════════

// ── GIFs DBZ (Giphy) ──
var HIST_GIFS_PERFECT = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg2M3V1aW9pcmNvOGMydGxxNmV1aW1xcXZ2bmdyazcza3VzOHI4YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8TrnpRGoEHwgJyUzdx/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eTE2eG9iYXJqdm4yMWVlZmxiNnVidG44YzMxdTRmbmQ3cGpzNzh4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MUOEQ4hUrzGz6/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjI0dnd2NHg0ZnZzd3hyN29rbXp6cmFzM3FqeHhsenlyb3NnN2V5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmFXUZ5up1T896HP8B/giphy.gif'
];
var HIST_GIFS_WIN = [
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eTE2eG9iYXJqdm4yMWVlZmxiNnVidG44YzMxdTRmbmQ3cGpzNzh4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EjLTU9HAnnskywtJ9j/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg2M3V1aW9pcmNvOGMydGxxNmV1aW1xcXZ2bmdyazcza3VzOHI4YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6BXC2QXk4utJm/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3emRwa29vdzBhMTRncTEycG1ucmZ3cW13cThpYjJtb2JqcmU0ZTI0eCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/XqtPxCcZF2Lsip14Uk/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eWR0eDY5OGJpcTIxMTAyY2c1cTM1N2lxODkxd3Btb2FpdXk2cm9uYiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/LgpHGoIh3pXSPYAlif/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MXV0cDNocnVjaWVkNjBrbTB2ZXptZ2F0eDkwNTMzcDh4c2wxcmt5dCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/UL2pY1IRDzDAjmeoqS/giphy.gif'
];
var HIST_GIFS_CORRECT = [
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eTE2eG9iYXJqdm4yMWVlZmxiNnVidG44YzMxdTRmbmQ3cGpzNzh4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vThGQEkz4f9eg/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGpleGQydWlkZWFkeHJxZXoybG5heWdub2RxY3JnNThxOWRrdGRwMSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/l4GomTccooD6M/giphy.gif'
];
var HIST_GIFS_WRONG = [
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDdrcDd6Ynl4NWh6bG5sbGdnYXZiN3piZWdycjUwcWUyc212NzBlbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/whXLLjSHDaBckGK4ir/giphy.gif'
];
var HIST_GIFS_LOSE = [
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDdrcDd6Ynl4NWh6bG5sbGdnYXZiN3piZWdycjUwcWUyc212NzBlbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/whXLLjSHDaBckGK4ir/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eWR0eDY5OGJpcTIxMTAyY2c1cTM1N2lxODkxd3Btb2FpdXk2cm9uYiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/LgpHGoIh3pXSPYAlif/giphy.gif'
];

// ══════════════════════════════════════════════════════
// ✅ AVATARS DBZ — MAPPING CORRIGÉ v4
// 1=Goku, 2=Vegeta, 3=Piccolo(NEW), 4=Gohan(NEW),
// 5=Trunks(NEW), 6=Krilin, 7=Android18(NEW), 8=Babidi(NEW)
// Placer les fichiers dans assets/images/dbz/
// ══════════════════════════════════════════════════════
var HIST_AVATARS = {
  1: 'assets/images/dbz/1.png',   // Goku
  2: 'assets/images/dbz/2.png',   // Vegeta
  3: 'assets/images/dbz/3.png',   // Piccolo  ← nouveau fichier
  4: 'assets/images/dbz/4.png',   // Gohan    ← nouveau fichier
  5: 'assets/images/dbz/5.png',   // Trunks   ← nouveau fichier
  6: 'assets/images/dbz/6.png',   // Krilin
  7: 'assets/images/dbz/7.png',   // Android 18 ← nouveau fichier (remplace Bulma)
  8: 'assets/images/dbz/8.png'    // Babidi   ← nouveau fichier (remplace Yamcha)
};

// ✅ BOSS AVATARS — images séparées pour les cinématiques de boss
var HIST_BOSS_AVATARS = {
  'Freezer':    'assets/images/dbz/freezer.png',
  'Cell':       'assets/images/dbz/cell.png',      // nouveau fichier
  'Broly':      'assets/images/dbz/broly.png',     // nouveau fichier
  'Majin Buu':  'assets/images/dbz/majinbuu.png',
  'Beerus':     'assets/images/dbz/beerus.png',
  'Babidi':     'assets/images/dbz/babidi.png',    // nouveau fichier
  'Black Goku': 'assets/images/dbz/blackgoku.png',
  'Zamasu':     'assets/images/dbz/zamasu.png'
};

var HIST_FALLBACK = {
  1:'🐉', 2:'👑', 3:'👽', 4:'💥', 5:'⚔️', 6:'🥋', 7:'🤖', 8:'👹'
};

// ══════════════════════════════════════════════════════
// ✅ AUDIO ENGINE DBZ — robuste avec fallback
// Gère les MP3 spécifiques à cette île
// Nommage attendu : assets/audio/dbz-battle.mp3
//                   assets/audio/dbz-victory.mp3
//                   assets/audio/dbz-map.mp3
// ══════════════════════════════════════════════════════
var _hist_audioEl = null;
var _hist_currentTrack = '';

function hist_playBGM(track) {
  if (!track) return;

  // ── 1. Si audio-engine.js global est disponible, l'utiliser en priorité
  if (typeof playBGM === 'function') {
    try { playBGM(track); return; } catch(e) { /* fallback ci-dessous */ }
  }

  // ── 2. Fallback : audio HTML5 direct
  if (_hist_currentTrack === track && _hist_audioEl && !_hist_audioEl.paused) return;

  var paths = [
    'assets/audio/' + track + '.mp3',
    'assets/sounds/' + track + '.mp3',
    'audio/' + track + '.mp3',
    'sounds/' + track + '.mp3'
  ];

  if (!_hist_audioEl) {
    _hist_audioEl = new Audio();
    _hist_audioEl.loop = true;
    _hist_audioEl.volume = 0.45;
  }

  _hist_currentTrack = track;

  // Essayer chaque chemin jusqu'à succès
  (function tryPaths(i) {
    if (i >= paths.length) {
      console.warn('[hist_playBGM] Aucun fichier audio trouvé pour :', track);
      return;
    }
    _hist_audioEl.src = paths[i];
    _hist_audioEl.load();
    var p = _hist_audioEl.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function() { tryPaths(i + 1); });
    }
  })(0);
}

function hist_stopBGM() {
  if (typeof stopBGM === 'function') { try { stopBGM(); return; } catch(e) {} }
  if (_hist_audioEl) { _hist_audioEl.pause(); _hist_audioEl.currentTime = 0; }
  _hist_currentTrack = '';
}

// ══════════════════════════════════════════════════════
// FOND ANIMÉ DBZ
// ══════════════════════════════════════════════════════
var _histBgLoaded = false;

async function loadHistBgStrips() {
  if (_histBgLoaded) return;
  _histBgLoaded = true;
  var bg = document.getElementById('hist-bg');
  if (!bg) return;
  try {
    var r = await fetch('https://api.jikan.moe/v4/anime/813/pictures');
    if (!r.ok) { loadHistBgFallback(); return; }
    var data = await r.json();
    if (!data.data || !data.data.length) { loadHistBgFallback(); return; }
    var pics = data.data.slice(0, 20);
    var perStrip = Math.ceil(pics.length / 5);
    for (var s = 0; s < 5; s++) {
      var strip = document.createElement('div');
      strip.className = 'hist-bg-strip';
      var slicePics = pics.slice(s * perStrip, s * perStrip + perStrip);
      var all = slicePics.concat(slicePics);
      all.forEach(function(p) {
        var img = document.createElement('img');
        img.src = (p.jpg && p.jpg.large_image_url) ? p.jpg.large_image_url : p.jpg.image_url;
        img.alt = ''; img.loading = 'lazy';
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  } catch(e) { loadHistBgFallback(); }
}

function loadHistBgFallback() {
  var bg = document.getElementById('hist-bg');
  if (!bg || bg.children.length > 0) return;
  var imgs = Object.values(HIST_AVATARS);
  for (var s = 0; s < 5; s++) {
    var strip = document.createElement('div');
    strip.className = 'hist-bg-strip';
    imgs.concat(imgs).forEach(function(src) {
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.loading = 'lazy';
      strip.appendChild(img);
    });
    bg.appendChild(strip);
  }
}

// ══════════════════════════════════════════════════════════════
// DONNÉES : 8 ÎLES × 11 QUESTIONS
// bgm : nom du fichier MP3 dans assets/audio/ (sans extension)
// ══════════════════════════════════════════════════════════════
const ISLANDS_HISTOIRE = {

  1:{name:"ÎLE DE GOKU",charName:"Goku",color:"#f97316",topic:"L'Égypte Ancienne",level:"6ème",bgm:"dbz-battle",
    msgs:["Kaio-Ken × 3 ! Réponds vite !","Un Saiyan ne renonce jamais !","Spirit Bomb de connaissance !","Chi-Chi serait fière de toi !","Même Vegeta révise son histoire !"],
    qs:[
      {q:"Quel fleuve a permis le développement de la civilisation égyptienne ?",o:["Le Tigre","Le Nil","L'Euphrate","Le Congo"],a:"Le Nil",exp:"Le Nil fertilise les terres par ses crues annuelles. Sans le Nil, pas d'Égypte !"},
      {q:"Comment appelle-t-on l'écriture des anciens Égyptiens ?",o:["L'alphabet phénicien","Les cunéiformes","Les hiéroglyphes","Les runes"],a:"Les hiéroglyphes",exp:"Les hiéroglyphes sont les signes de l'écriture égyptienne, utilisés depuis 3200 av. J.-C."},
      {q:"Qui dirigeait l'Égypte ancienne ?",o:["Le sultan","L'empereur","Le pharaon","Le consul"],a:"Le pharaon",exp:"Le pharaon est le roi d'Égypte, considéré comme un dieu vivant — fils du soleil Rê."},
      {q:"À quoi servaient les pyramides ?",o:["De palais pour les pharaons","De greniers à grain","De tombeaux pour les pharaons","De temples pour les dieux"],a:"De tombeaux pour les pharaons",exp:"Les pyramides protégeaient le corps du pharaon pour son voyage vers l'au-delà."},
      {q:"Qu'est-ce que la momification ?",o:["Un rituel de mariage","Une technique de conservation des corps","Une forme de sacrifice","Un sport égyptien"],a:"Une technique de conservation des corps",exp:"La momification désèche le corps pour le conserver. L'âme peut ainsi le retrouver dans l'au-delà."},
      {q:"Qui est Osiris dans la religion égyptienne ?",o:["Le dieu du soleil","Le dieu des morts","Le dieu de la guerre","Le dieu de la mer"],a:"Le dieu des morts",exp:"Osiris préside le tribunal de l'au-delà où les âmes sont jugées après la mort."},
      {q:"Qu'est-ce que le papyrus ?",o:["Un animal sacré","Une plante servant à fabriquer du papier","Un type de pyramide","Une arme de guerre"],a:"Une plante servant à fabriquer du papier",exp:"Le papyrus est une plante du bord du Nil dont les tiges permettaient de fabriquer des feuilles pour écrire."},
      {q:"Comment s'appelle le dieu soleil en Égypte ancienne ?",o:["Osiris","Anubis","Rê","Horus"],a:"Rê",exp:"Rê est le dieu soleil principal. Le pharaon était considéré comme son fils."},
      {q:"Que signifie le mot 'pharaon' ?",o:["Grand guerrier","Grande maison","Grand prêtre","Grand navigateur"],a:"Grande maison",exp:"'Pharaon' vient de l'égyptien 'per-aâ' (Grande maison), désignant d'abord le palais, puis le roi."},
      {q:"En quel millénaire la civilisation égyptienne est-elle née ?",o:["Au 1er millénaire av. J.-C.","Au 5ème millénaire av. J.-C.","Au 3ème millénaire av. J.-C.","Au 1er millénaire apr. J.-C."],a:"Au 3ème millénaire av. J.-C.",exp:"La civilisation égyptienne s'est développée vers 3000 av. J.-C., au 3ème millénaire avant notre ère."},
      {q:"⚔️ BOSS — Freezer envahit l'Égypte !<br><em>Quel animal sacré représentait le dieu Anubis ?</em>",o:["Le crocodile","Le chacal","Le chat","L'ibis"],a:"Le chacal",exp:"Anubis, dieu de l'embaumement, était représenté avec une tête de chacal. Il guidait les âmes vers l'au-delà.",isBoss:true,bossName:"Freezer"}
    ]
  },

  2:{name:"ÎLE DE VEGETA",charName:"Vegeta",color:"#3b82f6",topic:"La Grèce Antique",level:"6ème",bgm:"dbz-battle",
    msgs:["Je suis le Prince des Saiyans ! Réponds !","Un guerrier d'élite connaît son histoire !","N'espère pas me décevoir !","Kakarot aurait répondu juste, lui !","Bien… tu n'es peut-être pas inutile."],
    qs:[
      {q:"Comment appelle-t-on les cités-États de la Grèce antique ?",o:["Les républiques","Les poleis","Les empires","Les dèmes"],a:"Les poleis",exp:"Les cités-États grecques s'appellent des poleis. Chaque polis est une ville indépendante avec ses propres lois."},
      {q:"Quelle cité-État était célèbre pour son armée redoutable ?",o:["Athènes","Corinthe","Thèbes","Sparte"],a:"Sparte",exp:"Les garçons spartiates étaient entraînés dès 7 ans pour devenir des guerriers d'élite."},
      {q:"Qu'est-ce que la démocratie athénienne ?",o:["Un régime où le roi décide seul","Un régime où les citoyens votent les lois","Un régime dirigé par les prêtres","Un régime militaire"],a:"Un régime où les citoyens votent les lois",exp:"À Athènes sous Périclès, les citoyens votaient à l'Ecclésia, l'assemblée du peuple."},
      {q:"Qui est Zeus dans la mythologie grecque ?",o:["Dieu de la mer","Dieu du soleil","Roi des dieux de l'Olympe","Dieu des enfers"],a:"Roi des dieux de l'Olympe",exp:"Zeus est le roi des dieux grecs. Il habite sur le mont Olympe avec les autres dieux."},
      {q:"Qu'est-ce que les Jeux Olympiques antiques ?",o:["Une guerre entre cités","Des fêtes religieuses avec compétitions sportives","Un marché commercial","Un rituel funéraire"],a:"Des fêtes religieuses avec compétitions sportives",exp:"Les Jeux Olympiques (à Olympie, tous les 4 ans) étaient dédiés à Zeus."},
      {q:"Quelle est la fonction d'un philosophe en Grèce antique ?",o:["Un soldat d'élite","Un prêtre du temple","Un penseur qui cherche la vérité","Un marchand de luxe"],a:"Un penseur qui cherche la vérité",exp:"Socrate, Platon et Aristote sont les plus célèbres philosophes grecs. 'Philosophie' = 'amour de la sagesse'."},
      {q:"Comment s'appelle le récit d'Homère sur la guerre de Troie ?",o:["L'Odyssée","L'Énéide","L'Iliade","La Théogonie"],a:"L'Iliade",exp:"L'Iliade raconte la guerre de Troie. L'Odyssée raconte le retour d'Ulysse."},
      {q:"Qui était Périclès ?",o:["Un grand général spartiate","Un stratège athénien promoteur de la démocratie","Un philosophe","Un dieu olympien"],a:"Un stratège athénien promoteur de la démocratie",exp:"Périclès (Ve s. av. J.-C.) développa la démocratie à Athènes et fit construire le Parthénon."},
      {q:"Quel bâtiment célèbre se trouve sur l'Acropole d'Athènes ?",o:["Le Colisée","Le Panthéon","Le Parthénon","L'Agora"],a:"Le Parthénon",exp:"Le Parthénon est un temple dédié à Athéna, déesse protectrice d'Athènes, construit au Ve s. av. J.-C."},
      {q:"Qu'est-ce que l'agora dans une polis grecque ?",o:["Le temple principal","La place publique et marché","La salle de sport","Le tribunal militaire"],a:"La place publique et marché",exp:"L'agora est le cœur de la cité : lieu de marché, de discussions politiques et de vie sociale."},
      {q:"⚔️ BOSS — Cell s'empare d'Athènes !<br><em>Qui a fondé la première démocratie athénienne au VIe s. av. J.-C. ?</em>",o:["Périclès","Clisthène","Socrate","Alexandre"],a:"Clisthène",exp:"Clisthène (508 av. J.-C.) est le père de la démocratie athénienne. Périclès l'a ensuite perfectionnée.",isBoss:true,bossName:"Cell"}
    ]
  },

  3:{name:"ÎLE DE PICCOLO",charName:"Piccolo",color:"#22c55e",topic:"Rome Antique",level:"6ème",bgm:"dbz-battle",
    msgs:["Makanko Sappo ! Concentre-toi !","La discipline, c'est la victoire.","Gohan s'entraîne — toi aussi !","Ne me déçois pas.","Un vrai guerrier connaît son passé."],
    qs:[
      {q:"Selon la légende, qui a fondé Rome ?",o:["Julius César","Romulus et Rémus","Auguste","Énée"],a:"Romulus et Rémus",exp:"Rome a été fondée en 753 av. J.-C. par Romulus et Rémus, élevés par une louve selon la légende."},
      {q:"Comment appelle-t-on le chef de la République romaine ?",o:["L'empereur","Le roi","Le consul","Le sénateur"],a:"Le consul",exp:"La République romaine était dirigée par deux consuls élus pour un an. Ils partageaient le pouvoir."},
      {q:"Qu'est-ce que le Sénat romain ?",o:["L'armée de Rome","L'assemblée des citoyens nobles qui vote les lois","Le tribunal populaire","La garde du roi"],a:"L'assemblée des citoyens nobles qui vote les lois",exp:"Le Sénat rassemblait les patriciens (nobles) et guidait la politique de Rome."},
      {q:"Qui est Jules César ?",o:["Un général et homme politique romain","Le premier empereur de Rome","Un gladiateur célèbre","Un philosophe romain"],a:"Un général et homme politique romain",exp:"Jules César conquit la Gaule (58-51 av. J.-C.). Il fut assassiné le 15 mars 44 av. J.-C."},
      {q:"Qui est Auguste ?",o:["Le dernier roi de Rome","Le premier empereur de Rome","Un grand philosophe","Un gladiateur"],a:"Le premier empereur de Rome",exp:"Auguste (63 av. J.-C. – 14 apr. J.-C.) est le premier empereur romain, neveu de Jules César."},
      {q:"Comment appelle-t-on les combattants dans l'arène romaine ?",o:["Les légionnaires","Les gladiateurs","Les centurions","Les tribuns"],a:"Les gladiateurs",exp:"Les gladiateurs combattaient dans des arènes (comme le Colisée) pour divertir la foule romaine."},
      {q:"Qu'est-ce que le Colisée ?",o:["Un temple romain","Un marché couvert","Un amphithéâtre pour les spectacles","Un palais impérial"],a:"Un amphithéâtre pour les spectacles",exp:"Le Colisée (75-80 apr. J.-C.) pouvait accueillir 50 000 spectateurs pour des combats de gladiateurs."},
      {q:"Comment s'appelle le calendrier inventé par Jules César ?",o:["Le calendrier grégorien","Le calendrier républicain","Le calendrier julien","Le calendrier lunaire"],a:"Le calendrier julien",exp:"Jules César réforme le calendrier en 46 av. J.-C. Le calendrier julien est la base de notre calendrier."},
      {q:"Quelle langue parlaient les Romains ?",o:["Le grec","L'osque","Le latin","L'étrusque"],a:"Le latin",exp:"Le latin est la langue de Rome. Il a donné naissance au français, à l'espagnol et à l'italien."},
      {q:"Qu'est-ce qu'un légionnaire romain ?",o:["Un soldat de l'armée romaine","Un fonctionnaire impérial","Un prêtre du temple","Un esclave"],a:"Un soldat de l'armée romaine",exp:"Les légionnaires formaient la puissante armée romaine, organisée en légions de ~5 000 hommes."},
      {q:"⚔️ BOSS — Broly détruit Rome !<br><em>En quelle année a eu lieu la chute de l'Empire romain d'Occident ?</em>",o:["395 apr. J.-C.","476 apr. J.-C.","1453 apr. J.-C.","753 av. J.-C."],a:"476 apr. J.-C.",exp:"476 apr. J.-C. marque la fin de l'Empire romain d'Occident. L'Empire d'Orient (Byzance) survit jusqu'en 1453.",isBoss:true,bossName:"Broly"}
    ]
  },

  4:{name:"ÎLE DE GOHAN",charName:"Gohan",color:"#a78bfa",topic:"Les Religions Monothéistes",level:"6ème",bgm:"dbz-battle",
    msgs:["Je suis Super Saiyan 2 ! Réponds !","Papa serait fier si tu réussis !","La connaissance est une arme !","Continue, tu y es presque !","KAMEHAMEHA de savoir !"],
    qs:[
      {q:"Combien de dieux reconnaissent les religions monothéistes ?",o:["Plusieurs dieux","Aucun dieu","Un seul Dieu","Deux dieux opposés"],a:"Un seul Dieu",exp:"Les religions monothéistes (judaïsme, christianisme, islam) reconnaissent l'existence d'un seul et unique Dieu."},
      {q:"Quelle est la ville sainte des trois religions monothéistes ?",o:["Rome","La Mecque","Jérusalem","Constantinople"],a:"Jérusalem",exp:"Jérusalem est sainte pour les trois religions : Temple (judaïsme), Saint-Sépulcre (christianisme), Al-Aqsa (islam)."},
      {q:"Quel est le livre sacré du judaïsme ?",o:["La Bible","La Torah","Le Coran","Les Vedas"],a:"La Torah",exp:"La Torah (les 5 premiers livres de la Bible) est le texte fondateur du judaïsme."},
      {q:"Qui est le fondateur du christianisme ?",o:["Moïse","Abraham","Jésus de Nazareth","Saint Paul"],a:"Jésus de Nazareth",exp:"Jésus de Nazareth est le fondateur du christianisme. Ses disciples ont répandu son message."},
      {q:"Qui est le prophète de l'islam ?",o:["Moïse","Abraham","Jésus","Mohammad"],a:"Mohammad",exp:"Mohammad (570-632 apr. J.-C.) est le prophète de l'islam. Il reçut le Coran à La Mecque et Médine."},
      {q:"Comment s'appelle le livre sacré de l'islam ?",o:["La Torah","La Bible","Le Coran","Les Évangiles"],a:"Le Coran",exp:"Le Coran est la parole de Dieu (Allah) révélée à Mohammed par l'ange Jibril (Gabriel)."},
      {q:"Quelle ville est sainte pour l'islam, lieu de naissance de Mohammad ?",o:["Jérusalem","Médine","La Mecque","Bagdad"],a:"La Mecque",exp:"La Mecque est la ville la plus sainte de l'islam. Les musulmans y font le pèlerinage (hajj)."},
      {q:"Comment appelle-t-on le lieu de culte des chrétiens ?",o:["La mosquée","La synagogue","Le temple","L'église"],a:"L'église",exp:"Les chrétiens prient dans une église. Les juifs dans une synagogue, les musulmans dans une mosquée."},
      {q:"Qu'est-ce que le monothéisme ?",o:["La croyance en plusieurs dieux","La croyance en un seul Dieu","Le refus de toute religion","La croyance en des esprits"],a:"La croyance en un seul Dieu",exp:"Mono = un seul. Théisme = croyance en Dieu. Monothéisme = croyance en un seul Dieu unique."},
      {q:"Quel est le livre sacré des chrétiens ?",o:["La Torah","Le Coran","La Bible","Le Talmud"],a:"La Bible",exp:"La Bible chrétienne comprend l'Ancien Testament (partagé avec le judaïsme) et le Nouveau Testament."},
      {q:"⚔️ BOSS — Majin Buu menace les villes saintes !<br><em>Quel est le lieu de pèlerinage le plus important de l'islam ?</em>",o:["Jérusalem","Médine","La Mecque","Istanbul"],a:"La Mecque",exp:"La Mecque abrite la Grande Mosquée et la Kaaba, vers laquelle prient tous les musulmans du monde.",isBoss:true,bossName:"Majin Buu"}
    ]
  },

  5:{name:"ÎLE DE TRUNKS",charName:"Trunks",color:"#8b5cf6",topic:"Le Moyen-Âge",level:"5ème",bgm:"dbz-battle",
    msgs:["Je viens du futur — étudie ou c'est perdu !","Mon épée punit les mauvaises réponses !","Vegeta et Bulma seraient déçus...","Excellent travail, continue !","Le futur dépend de tes réponses !"],
    qs:[
      {q:"Quand commence le Moyen-Âge en Europe ?",o:["En 476 av. J.-C.","En 476 apr. J.-C.","En 1453 apr. J.-C.","En 800 apr. J.-C."],a:"En 476 apr. J.-C.",exp:"Le Moyen-Âge commence en 476 apr. J.-C. avec la chute de l'Empire romain d'Occident."},
      {q:"Qu'est-ce que le système féodal ?",o:["Un système d'échange commercial","Une organisation basée sur la vassalité et la terre","Un régime démocratique","Un système religieux"],a:"Une organisation basée sur la vassalité et la terre",exp:"Dans le système féodal, le roi donne des terres (fiefs) à des seigneurs (vassaux) en échange de loyauté."},
      {q:"Qui était Charlemagne ?",o:["Un pape","Un roi franc couronné Empereur d'Occident","Un chevalier","Un marchand"],a:"Un roi franc couronné Empereur d'Occident",exp:"Charlemagne est couronné Empereur d'Occident le 25 décembre 800 à Rome par le pape Léon III."},
      {q:"Qu'est-ce qu'un serf au Moyen-Âge ?",o:["Un chevalier","Un paysan lié à la terre d'un seigneur","Un moine","Un marchand"],a:"Un paysan lié à la terre d'un seigneur",exp:"Les serfs ne pouvaient pas quitter la terre du seigneur sans permission. Ils lui devaient des services."},
      {q:"Comment appelle-t-on la résidence fortifiée d'un seigneur ?",o:["Une cathédrale","Un monastère","Un château fort","Une basilique"],a:"Un château fort",exp:"Le château fort protège le seigneur et ses habitants. Il symbolise le pouvoir féodal."},
      {q:"Quelle est la bataille de 732 qui arrête l'expansion arabe en Europe ?",o:["La bataille d'Hastings","La bataille de Poitiers","La bataille de Bouvines","La bataille d'Azincourt"],a:"La bataille de Poitiers",exp:"Charles Martel arrête l'expansion des Arabes à Poitiers (732). Cette victoire préserve l'Europe."},
      {q:"Qu'est-ce qu'une cathédrale gothique ?",o:["Un château fort","Une grande église avec arcs-boutants et vitraux","Un palais royal","Un marché couvert"],a:"Une grande église avec arcs-boutants et vitraux",exp:"Les cathédrales gothiques (XIIe-XVe s.) se reconnaissent à leurs arcs-boutants et vitraux colorés."},
      {q:"Qui sont les Croisés ?",o:["Des marchands arabes","Des soldats chrétiens partant reprendre Jérusalem","Des moines bouddhistes","Des pirates vikings"],a:"Des soldats chrétiens partant reprendre Jérusalem",exp:"Les Croisades (1095-1291) sont des expéditions militaires chrétiennes pour reprendre les Lieux Saints."},
      {q:"En quelle année se situe la fin du Moyen-Âge ?",o:["En 800","En 1066","En 1453","En 1789"],a:"En 1453",exp:"Le Moyen-Âge se termine en 1453 avec la chute de Constantinople prise par les Turcs Ottomans."},
      {q:"Qu'est-ce qu'un vassal dans le système féodal ?",o:["Un esclave","Un seigneur qui doit fidélité à un suzerain","Un marchand libre","Un moine"],a:"Un seigneur qui doit fidélité à un suzerain",exp:"Le vassal prête serment de fidélité à son suzerain (seigneur plus puissant) en échange d'un fief."},
      {q:"⚔️ BOSS — Beerus, Dieu de la Destruction, attaque !<br><em>En quelle année Guillaume le Conquérant conquiert-il l'Angleterre ?</em>",o:["1066","1096","1215","1337"],a:"1066",exp:"Guillaume le Conquérant bat Harold à la bataille d'Hastings (1066) et devient roi d'Angleterre.",isBoss:true,bossName:"Beerus"}
    ]
  },

  6:{name:"ÎLE DE KRILIN",charName:"Krilin",color:"#f59e0b",topic:"L'Islam et son Expansion",level:"5ème",bgm:"dbz-battle",
    msgs:["Destructo-Disk de savoir !","Même sans cheveux, on peut être brillant !","Android 18 me regarde... je dois réussir !","Continue, tu es fort !","La connaissance, c'est mon vrai pouvoir !"],
    qs:[
      {q:"En quelle année l'Hégire marque-t-elle le début de l'islam ?",o:["En 570 apr. J.-C.","En 622 apr. J.-C.","En 632 apr. J.-C.","En 750 apr. J.-C."],a:"En 622 apr. J.-C.",exp:"622 apr. J.-C. est l'année de l'Hégire : la fuite de Mohammad de La Mecque à Médine. Début du calendrier islamique."},
      {q:"Qu'est-ce que l'Hégire ?",o:["La mort de Mohammad","La fuite de Mohammad de La Mecque à Médine","La conquête de Jérusalem","La révélation du Coran"],a:"La fuite de Mohammad de La Mecque à Médine",exp:"L'Hégire (622) est le point de départ du calendrier islamique."},
      {q:"Comment s'appelle la communauté des croyants musulmans ?",o:["La Oumma","La Sharia","La Sunna","La Fatwa"],a:"La Oumma",exp:"La Oumma est la communauté universelle des musulmans, par-delà les frontières et nationalités."},
      {q:"Quelle période est surnommée l'Âge d'or islamique ?",o:["L'Empire byzantin","La civilisation arabo-islamique du IXe au XIe siècle","L'Empire perse","L'Empire ottoman"],a:"La civilisation arabo-islamique du IXe au XIe siècle",exp:"Du IXe au XIe s., les savants musulmans ont enrichi les sciences (médecine, mathématiques, astronomie)."},
      {q:"Qui est Ibn Battouta ?",o:["Un calife de Bagdad","Un grand voyageur et géographe arabe","Un général","Un philosophe"],a:"Un grand voyageur et géographe arabe",exp:"Ibn Battouta (XIVe s.) a parcouru 120 000 km et décrit 44 pays dans son récit 'La Rihla'."},
      {q:"Quelle ville devient la capitale du califat abbasside ?",o:["Jérusalem","Damas","Bagdad","Cordoue"],a:"Bagdad",exp:"Bagdad est fondée en 762. Elle devient le plus grand centre culturel du monde médiéval."},
      {q:"Comment s'appelle le chef politique et religieux des musulmans ?",o:["Le sultan","Le calife","L'imam","L'émir"],a:"Le calife",exp:"Le calife (= successeur du prophète) est le chef politique et religieux de la communauté musulmane."},
      {q:"Quelle ville espagnole symbolise le rayonnement islamique en Europe ?",o:["Madrid","Barcelone","Cordoue","Séville"],a:"Cordoue",exp:"Cordoue (Al-Andalus) est au Xe s. la plus grande ville d'Europe. Sa Grande Mosquée est un chef-d'œuvre."},
      {q:"Combien de piliers compte l'islam ?",o:["3","4","5","6"],a:"5",exp:"Les 5 piliers : Shahada (profession de foi), Salat (prière), Zakat (aumône), Sawm (jeûne), Hajj (pèlerinage)."},
      {q:"Quel nom porte l'Espagne sous domination musulmane ?",o:["L'Ibérie","Al-Andalus","La Castille","L'Hispanie"],a:"Al-Andalus",exp:"Al-Andalus désigne la péninsule ibérique sous domination musulmane (711-1492)."},
      {q:"⚔️ BOSS — Babidi menace Bagdad !<br><em>Comment s'appelle le livre de voyage d'Ibn Battouta ?</em>",o:["Les Mille et une Nuits","La Rihla","Les Croisades","Al-Qanun"],a:"La Rihla",exp:"'La Rihla' (le Voyage) d'Ibn Battouta raconte ses 28 ans de voyage à travers l'Afrique, l'Asie et l'Europe.",isBoss:true,bossName:"Babidi"}
    ]
  },

  7:{name:"ÎLE D'ANDROID 18",charName:"Android 18",color:"#06b6d4",topic:"Chrétienté et Croisades",level:"5ème",bgm:"dbz-battle",
    msgs:["Mon radar détecte les erreurs !","Je suis plus forte que n'importe quel Super Saiyan !","Capsule Corp ne peut rien pour toi ici !","Bien joué, presque aussi fort que Vegeta !","Allez, encore un effort !"],
    qs:[
      {q:"Quand commence la première croisade ?",o:["En 1054","En 1095","En 1187","En 1291"],a:"En 1095",exp:"La première croisade est lancée en 1095 par le pape Urbain II au concile de Clermont."},
      {q:"Quel est l'objectif principal des croisades ?",o:["Conquérir Rome","Reprendre Jérusalem aux musulmans","Envahir Byzance","Convertir les vikings"],a:"Reprendre Jérusalem aux musulmans",exp:"Les croisades visent à libérer les Lieux Saints (Jérusalem, Bethléem, Nazareth)."},
      {q:"Qu'est-ce que le schisme de 1054 ?",o:["La guerre entre Rome et Byzance","La séparation entre catholiques et orthodoxes","La création de l'islam","La chute de Rome"],a:"La séparation entre catholiques et orthodoxes",exp:"En 1054, l'Église se divise : catholique (Rome, pape) et orthodoxe (Constantinople, patriarche)."},
      {q:"Quel sultan musulman reprend Jérusalem en 1187 ?",o:["Gengis Khan","Soliman le Magnifique","Saladin","Al-Mansur"],a:"Saladin",exp:"Saladin reprend Jérusalem en 1187 à la bataille des Cornes de Hattin."},
      {q:"Combien y a-t-il eu de croisades au total ?",o:["2","4","7","10"],a:"7",exp:"Il y a eu 7 croisades officielles entre 1095 et 1291."},
      {q:"Qu'est-ce que le Saint-Empire romain germanique ?",o:["Un empire arabe","Un empire chrétien d'Europe centrale","Un empire byzantin","Un empire scandinave"],a:"Un empire chrétien d'Europe centrale",exp:"Le Saint-Empire (962-1806) est un empire chrétien centré sur l'Allemagne actuelle."},
      {q:"Quel est le rôle du pape au Moyen-Âge ?",o:["Diriger une armée","Chef spirituel catholique avec autorité sur les rois","Gérer les marchés","Commander la marine"],a:"Chef spirituel catholique avec autorité sur les rois",exp:"Le pape peut excommunier les rois (les exclure de l'Église). Son pouvoir est immense au Moyen-Âge."},
      {q:"Qu'est-ce qu'un pèlerinage au Moyen-Âge ?",o:["Une expédition militaire","Un voyage vers un lieu saint pour se rapprocher de Dieu","Un marché annuel","Une fête de village"],a:"Un voyage vers un lieu saint pour se rapprocher de Dieu",exp:"Les pèlerinages vers Rome, Jérusalem ou Saint-Jacques-de-Compostelle étaient très fréquents."},
      {q:"Qui était Richard Coeur de Lion ?",o:["Un roi de France","Un roi d'Angleterre chef de la 3e croisade","Un calife de Bagdad","Un pape"],a:"Un roi d'Angleterre chef de la 3e croisade",exp:"Richard Ier d'Angleterre mena la 3e croisade. Il s'opposa à Saladin sans reprendre Jérusalem."},
      {q:"Qu'est-ce qu'un ordre monastique au Moyen-Âge ?",o:["Une armée de croisés","Une communauté de moines vivant selon une règle religieuse","Un tribunal religieux","Un système fiscal"],a:"Une communauté de moines vivant selon une règle religieuse",exp:"Les ordres monastiques (Bénédictins, Franciscains...) conservaient le savoir et aidaient les pauvres."},
      {q:"⚔️ BOSS — Black Goku attaque Jérusalem !<br><em>En quelle année la première croisade prend-elle Jérusalem ?</em>",o:["1095","1099","1187","1291"],a:"1099",exp:"Jérusalem est prise par les croisés le 15 juillet 1099, 4 ans après le lancement de la 1ère croisade.",isBoss:true,bossName:"Black Goku"}
    ]
  },

  8:{name:"ÎLE DE BABIDI",charName:"Babidi",color:"#e63946",topic:"Renaissance et Grandes Découvertes",level:"5ème",bgm:"dbz-battle",
    msgs:["Pui Pui ! Réponds ou tu disparais !","Ma magie punit les ignorants !","Dabura serait déçu de tes erreurs !","Continue… tu résistes à mes pouvoirs !","Le sorcier des étoiles connaît son cours !"],
    qs:[
      {q:"Qu'est-ce que la Renaissance ?",o:["Une révolution politique","Un mouvement culturel de retour aux arts et savoirs antiques","Une guerre religieuse","Une épidémie de peste"],a:"Un mouvement culturel de retour aux arts et savoirs antiques",exp:"La Renaissance (XVe-XVIe s.) est née en Italie. Elle redécouvre l'Antiquité dans les arts, sciences et philosophie."},
      {q:"Qui est Christophe Colomb ?",o:["Un explorateur portugais","Un explorateur génois au service de l'Espagne","Un navigateur français","Un marin anglais"],a:"Un explorateur génois au service de l'Espagne",exp:"Christophe Colomb découvre l'Amérique le 12 octobre 1492 en cherchant une route vers l'Asie."},
      {q:"En quelle année Christophe Colomb arrive-t-il en Amérique ?",o:["1488","1492","1498","1519"],a:"1492",exp:"Le 12 octobre 1492, Christophe Colomb arrive aux Bahamas. Il croit avoir atteint les Indes."},
      {q:"Qui est Vasco de Gama ?",o:["Un conquistador espagnol","Un navigateur portugais qui atteint l'Inde par le Cap","Un peintre de la Renaissance","Un pape"],a:"Un navigateur portugais qui atteint l'Inde par le Cap",exp:"Vasco de Gama (1498) contourne l'Afrique par le cap de Bonne-Espérance et atteint Calicut en Inde."},
      {q:"Qui a inventé l'imprimerie en Europe ?",o:["Léonard de Vinci","Gutenberg","Copernic","Magellan"],a:"Gutenberg",exp:"Johannes Gutenberg invente l'imprimerie à caractères mobiles vers 1450. Les idées se diffusent très vite."},
      {q:"Qui est Léonard de Vinci ?",o:["Un conquérant espagnol","Un artiste et savant universel de la Renaissance","Un navigateur portugais","Un réformateur religieux"],a:"Un artiste et savant universel de la Renaissance",exp:"Léonard de Vinci (1452-1519) est peintre (La Joconde), sculpteur, architecte, ingénieur et scientifique."},
      {q:"Qui est Magellan ?",o:["Un peintre espagnol","Le premier navigateur à réaliser le tour du monde","Un philosophe","Un pape"],a:"Le premier navigateur à réaliser le tour du monde",exp:"Fernand de Magellan dirige la première circumnavigation (1519-1522), mais meurt aux Philippines."},
      {q:"Qu'est-ce que l'humanisme à la Renaissance ?",o:["Une religion nouvelle","Un courant de pensée qui place l'être humain au centre","Un mouvement artistique uniquement","Un système politique"],a:"Un courant de pensée qui place l'être humain au centre",exp:"Les humanistes (Erasme, Rabelais) placent l'homme au centre et encouragent l'éducation et la raison."},
      {q:"Qu'est-ce que l'héliocentrisme de Copernic ?",o:["La théorie de la gravité","La Terre tourne autour du Soleil","Le géocentrisme","La théorie de l'évolution"],a:"La Terre tourne autour du Soleil",exp:"Copernic (1543) démontre que la Terre tourne autour du Soleil, renversant la vision médiévale géocentrique."},
      {q:"Quelle civilisation américaine est conquise par Hernán Cortés en 1519 ?",o:["Les Mayas","Les Incas","Les Aztèques","Les Iroquois"],a:"Les Aztèques",exp:"Hernán Cortés conquiert l'empire aztèque (Mexique) entre 1519 et 1521, détruisant Tenochtitlan."},
      {q:"⚔️ BOSS — Zamasu veut effacer les Grandes Découvertes !<br><em>Quelle oeuvre de Léonard de Vinci est la plus célèbre au monde ?</em>",o:["La Vénus de Milo","La Joconde","Le David","La Naissance de Vénus"],a:"La Joconde",exp:"La Joconde (1503-1519) est le portrait le plus célèbre du monde. Elle est exposée au Musée du Louvre à Paris.",isBoss:true,bossName:"Zamasu"}
    ]
  }
};

// ══════════════════════════════════════════════════════════════
// ÉTAT GLOBAL
// ══════════════════════════════════════════════════════════════
var hist_xp = 0, hist_completedIslands = {}, hist_currentIsland = 0;
var hist_streak = 0, hist_answers = {};

// ── Cinématique intro ──
const HIST_ISLE_INTRO = {
  1:{bg:'#1a0800',lines:['ÉGYPTE…','… ANCIENNE !!','Le Nil coule dans tes veines !'],kanji:'古代 !!',kanjiColor:'#f97316',bubble:"Kaio-Ken x 3 ! On va tout savoir sur l'Egypte !"},
  2:{bg:'#00051a',lines:['GRÈCE…','… ANTIQUE !!','La démocratie t\'appelle !'],kanji:'民主 !!',kanjiColor:'#3b82f6',bubble:"Je suis le Prince ! Et les Grecs sont mes ancêtres de savoir."},
  3:{bg:'#001a05',lines:['ROME…','… ÉTERNELLE !!','César te regarde !'],kanji:'永遠 !!',kanjiColor:'#22c55e',bubble:"Makanko Sappo ! On démarre Rome avec puissance."},
  4:{bg:'#0d0020',lines:['RELIGIONS…','… MONOTHÉISTES !!','Trois révélations, un seul Dieu !'],kanji:'信仰 !!',kanjiColor:'#a78bfa',bubble:"Super Saiyan 2 ! La foi et la connaissance sont ma force !"},
  5:{bg:'#050014',lines:['MOYEN-ÂGE…','… MÉDIÉVAL !!','Les châteaux te défient !'],kanji:'中世 !!',kanjiColor:'#8b5cf6',bubble:"Je viens du futur — les chevaliers n'ont aucun secret pour moi !"},
  6:{bg:'#1a1000',lines:['ISLAM…','… ÂGE D\'OR !!','Bagdad t\'accueille !'],kanji:'知識 !!',kanjiColor:'#f59e0b',bubble:"Destructo-Disk ! On va tout écraser sur l'Islam !"},
  7:{bg:'#00101a',lines:['CROISADES…','… ET CHRÉTIENTÉ !!','Jérusalem t\'attend !'],kanji:'十字 !!',kanjiColor:'#06b6d4',bubble:"Infinite Energy ! Aucune erreur ne m'échappe !"},
  8:{bg:'#1a0000',lines:['RENAISSANCE…','… GRANDES DÉCOUVERTES !!','Colomb a besoin de toi !'],kanji:'発見 !!',kanjiColor:'#e63946',bubble:"Bibbidi Bobbidi Boo ! Je vais tester tes connaissances !"}
};

// ══════════════════════════════════════════════════════════════
// DÉMARRAGE — musique par île via propriété bgm
// ══════════════════════════════════════════════════════════════
function hist_startIsland(n) {
  var track = (ISLANDS_HISTOIRE[n] && ISLANDS_HISTOIRE[n].bgm) ? ISLANDS_HISTOIRE[n].bgm : 'dbz-battle';
  hist_playBGM(track);

  if (typeof lesson_magnolia === 'function') {
    lesson_magnolia(n, function() {
      hist_playCinematic(n, function() { hist_launchIsland(n); });
    });
  } else {
    hist_playCinematic(n, function() { hist_launchIsland(n); });
  }
}

function hist_launchIsland(n) {
  hist_currentIsland = n;
  hist_answers = {};

  // ── Forcer l'overlay cinématique à zéro ──
  var ov = document.getElementById('hist-cine-overlay');
  if (ov) {
    ov.style.display = 'none';
    ov.style.pointerEvents = 'none';
    ov.style.zIndex = '-1';
    ov.innerHTML = '';
  }

  const isle = ISLANDS_HISTOIRE[n];
  var secIles = document.getElementById('histoire-iles-sec');
  var secQuiz = document.getElementById('histoire-quiz-sec');
  if (secIles) secIles.style.display = 'none';
  if (secQuiz) {
    secQuiz.style.display = 'block';
    secQuiz.style.pointerEvents = 'auto';
    secQuiz.style.zIndex = '5';
  }
  window.scrollTo(0, 0);

  document.getElementById('hist-qTitle').textContent = isle.name + ' — ' + isle.topic;
  document.getElementById('hist-qProgFill').style.width = '0%';
  document.getElementById('hist-qProgLbl').textContent = '0 / ' + isle.qs.length;

  const keys = ['A','B','C','D'];
  let html = '';

  isle.qs.forEach(function(e, i) {
    const msg = isle.msgs[i % isle.msgs.length];
    const avatar = HIST_AVATARS[n] || '';
    const bossBanner = e.isBoss ? '<div class="hist-boss-banner">' +
      '<div class="hist-boss-label">⚔️ COMBAT FINAL</div>' +
      '<div class="hist-boss-name">' + (e.bossName||'BOSS') + '</div>' +
      '<div class="hist-boss-hp"><div class="hist-boss-hp-fill"></div></div>' +
      '</div>' : '';

    const opts = e.o.map(function(opt, j) {
      var safeVal = opt.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
      return '<label class="hist-opt" id="hist-lbl' + i + '_' + j + '"' +
        ' data-qi="' + i + '" data-oi="' + j + '" data-v="' + safeVal + '"' +
        ' onclick="hist_selectOpt(this.dataset.qi, this.dataset.oi, this.dataset.v)">' +
        '<span class="hist-opt-key">' + keys[j] + '</span>' +
        '<span class="hist-opt-txt">' + opt + '</span></label>';
    }).join('');

    html += '<div class="hist-q-card' + (e.isBoss ? ' hist-boss-q' : '') + '" id="hist-card' + i + '" style="--isle-color:' + isle.color + '">' +
      bossBanner +
      '<div class="hist-char-bubble">' +
        '<img src="' + avatar + '" alt="' + isle.charName + '" class="hist-char-img"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="hist-char-fallback" style="display:none;background:' + isle.color + '22;color:' + isle.color + '">' + HIST_FALLBACK[n] + '</div>' +
        '<div class="hist-bubble-txt">' + msg + '</div>' +
      '</div>' +
      '<div class="hist-q-number">Question ' + (i+1) + ' / ' + isle.qs.length + '</div>' +
      '<div class="hist-q-text">' + e.q + '</div>' +
      '<div class="hist-opts">' + opts + '</div>' +
      '<div class="hist-fb" id="hist-fb' + i + '"></div>' +
      '<div class="hist-expl" id="hist-exp' + i + '"></div>' +
    '</div>';
  });

  html += '<div class="hist-submit-wrap"><button class="hist-btn hist-btn-gold" onclick="hist_corriger(' + n + ')">🐉 CORRIGER MES RÉPONSES</button></div>';
  document.getElementById('hist-qContainer').innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// SÉLECTION & CORRECTION
// ══════════════════════════════════════════════════════════════
function hist_selectOpt(qi, oi, val) {
  qi = parseInt(qi); oi = parseInt(oi);
  if (typeof sfxSwoosh === 'function') sfxSwoosh();
  hist_answers[qi] = {oi: oi, val: val};

  ISLANDS_HISTOIRE[hist_currentIsland].qs[qi].o.forEach(function(_, j) {
    var b = document.getElementById('hist-lbl' + qi + '_' + j);
    if (b) b.classList.remove('hist-selected');
  });

  var sel = document.getElementById('hist-lbl' + qi + '_' + oi);
  if (sel) sel.classList.add('hist-selected');

  const total = ISLANDS_HISTOIRE[hist_currentIsland].qs.length;
  document.getElementById('hist-qProgFill').style.width = Math.round(Object.keys(hist_answers).length / total * 100) + '%';
  document.getElementById('hist-qProgLbl').textContent = Object.keys(hist_answers).length + ' / ' + total;
}

function hist_corriger(n) {
  const isle = ISLANDS_HISTOIRE[n];
  if (!isle) return;
  let score = 0;
  hist_streak = 0;

  isle.qs.forEach(function(e, i) {
    const ans = hist_answers[i];
    const fb = document.getElementById('hist-fb' + i);
    const expl = document.getElementById('hist-exp' + i);

    e.o.forEach(function(_, j) {
      var b = document.getElementById('hist-lbl' + i + '_' + j);
      if (b) b.style.pointerEvents = 'none';
    });

    if (!ans) {
      if (fb) { fb.innerHTML = '⚠️ Pas de réponse ! Réponse : <strong>' + e.a + '</strong>'; fb.className = 'hist-fb hist-ko'; }
      hist_streak = 0;
    } else {
      const ok = ans.val === e.a;
      if (ok) {
        score++; hist_streak++;
        if (fb) { fb.innerHTML = '✅ Exact !'; fb.className = 'hist-fb hist-ok'; }
        var btn = document.getElementById('hist-lbl' + i + '_' + ans.oi);
        if (btn) btn.classList.add('hist-correct');
        if (typeof sfxOK === 'function') sfxOK();
        if (typeof showCombatGif === 'function') showCombatGif(score === 10 ? 'perfect' : 'correct');
        if (hist_streak >= 3 && typeof starRain === 'function') starRain(4);
        if (hist_streak >= 5 && typeof showToast === 'function') setTimeout(function() { showToast('🐉 SPIRIT BOMB × ' + hist_streak + ' !'); }, 400);
      } else {
        hist_streak = 0;
        if (fb) { fb.innerHTML = '❌ Raté ! Réponse correcte : <strong>' + e.a + '</strong>'; fb.className = 'hist-fb hist-ko'; }
        var wb = document.getElementById('hist-lbl' + i + '_' + ans.oi);
        if (wb) wb.classList.add('hist-wrong');
        e.o.forEach(function(opt, j) {
          if (opt === e.a) {
            var b = document.getElementById('hist-lbl' + i + '_' + j);
            if (b) b.classList.add('hist-correct');
          }
        });
        if (typeof sfxKO === 'function') sfxKO();
        if (typeof showCombatGif === 'function') showCombatGif('wrong');
      }
    }
    if (expl) { expl.innerHTML = '💡 ' + e.exp; expl.className = 'hist-expl hist-show'; }
  });

  hist_xp += score * 2;
hist_completedIslands[n] = score;
// Sync XP global pour le HUD
if (typeof xp !== 'undefined') xp += score * 2;window._histLastScore = score;
if (typeof completedIslands !== 'undefined') completedIslands['hist_' + n] = score;
if (typeof updateHUD    === 'function') updateHUD();
if (typeof checkBadges  === 'function') checkBadges();
if (typeof saveProgress === 'function') saveProgress();

  if (score === 10) {
    hist_playBGM('dbz-victory'); // score parfait → fanfare victoire
  } else if (score >= 6) {
    hist_playBGM('dbz-map');     // bon score → retour calme
  } else {
    hist_playBGM('dbz-defeat');    // score faible → musique défaite/boss
  }

  hist_showResults(n, score);
}

// ══════════════════════════════════════════════════════════════
// RÉSULTATS
// ══════════════════════════════════════════════════════════════
function hist_showResults(n, score) {
  const isle = ISLANDS_HISTOIRE[n];
  const gained = score * 2;
  const txts = [
    {min:10, t:'ULTRA INSTINCT ! 10/10 !'},
    {min:8,  t:'EXCELLENT ! Saiyan d\'élite !'},
    {min:6,  t:'Bien joué, apprenti guerrier !'},
    {min:4,  t:'Continue l\'entraînement !'},
    {min:0,  t:'Ne lâche pas ! Kaio-Ken !'}
  ];
  const res = txts.find(function(r) { return score >= r.min; }) || txts[txts.length - 1];
  const gif = score === 10
    ? HIST_GIFS_PERFECT[Math.floor(Math.random() * HIST_GIFS_PERFECT.length)]
    : score >= 6
      ? HIST_GIFS_WIN[n % HIST_GIFS_WIN.length]
      : HIST_GIFS_LOSE[0];
  const stars = Array.from({length:10}, function(_, i) { return i < score ? '⭐' : '☆'; }).join('');

  const html = '<div class="hist-result-card" id="hist-resCard" style="--isle-color:' + isle.color + '">' +
    '<div class="hist-result-banner">' +
      '<img src="' + (HIST_AVATARS[n]||'') + '" alt="' + isle.charName + '" class="hist-result-avatar" onerror="this.style.display=\'none\'">' +
      '<div class="hist-result-score-wrap">' +
        '<div class="hist-result-score">' + score + '/10</div>' +
        '<div class="hist-result-title">' + res.t + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="hist-result-body">' +
      '<div class="hist-result-topic">📚 ' + isle.topic + '</div>' +
      '<div class="hist-result-stars">' + stars + '</div>' +
      '<img src="' + gif + '" alt="reaction" class="hist-result-gif" onerror="this.style.display=\'none\'">' +
      '<div class="hist-result-xp">+' + gained + ' XP histoire 🐉 — Total : ' + hist_xp + ' XP</div>' +
      '<button class="hist-btn hist-btn-gold" onclick="hist_goBack()">🗺️ RETOUR À LA CARTE</button>' +
      '<button class="hist-btn hist-btn-outline" onclick="hist_retry(' + n + ')">🔁 REJOUER</button>' +
    '</div></div>';

  var c = document.getElementById('hist-qContainer');
  if (c) c.innerHTML += html;
  setTimeout(function() {
    var rc = document.getElementById('hist-resCard');
    if (rc) rc.scrollIntoView({behavior:'smooth', block:'center'});
  }, 400);

  var stEl = document.getElementById('hist-stars' + n);
  if (stEl) stEl.textContent = stars;
}

function hist_goBack() {
  if (window.AP && window.AP.recap) {
    window.AP.recap.show('magnolia', window._histLastScore || 0, 10, hist_currentIsland, function() {
      hist_playBGM('dbz-map');
      var secQuiz = document.getElementById('histoire-quiz-sec');
      var secIles = document.getElementById('histoire-iles-sec');
      if (secQuiz) secQuiz.style.display = 'none';
      if (secIles) secIles.style.display = 'block';
      hist_answers = {};
      window.scrollTo(0, 0);
      var grid = document.getElementById('hist-islands-grid');
      if (grid) { grid.innerHTML = ''; buildHistoireGrid(); }
    });
  } else {
    hist_playBGM('dbz-map');
    var secQuiz = document.getElementById('histoire-quiz-sec');
    var secIles = document.getElementById('histoire-iles-sec');
    if (secQuiz) secQuiz.style.display = 'none';
    if (secIles) secIles.style.display = 'block';
    hist_answers = {};
    window.scrollTo(0, 0);
    var grid = document.getElementById('hist-islands-grid');
    if (grid) { grid.innerHTML = ''; buildHistoireGrid(); }
  }
}

function hist_retry(n) {
  hist_answers = {};
  hist_startIsland(n);
}

// ══════════════════════════════════════════════════════════════
// ✅ CINÉMATIQUE DBZ — FIX plein écran personnage non tronqué
// ══════════════════════════════════════════════════════════════
function hist_playCinematic(n, callback) {
  const cfg = HIST_ISLE_INTRO[n];
  if (!cfg) { if (callback) callback(); return; }
  const avatar = HIST_AVATARS[n] || '';
  const isle = ISLANDS_HISTOIRE[n];

  var ov = document.getElementById('hist-cine-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'hist-cine-overlay';
    document.body.appendChild(ov);
  }

  ov.innerHTML =
    '<div class="hist-cine-inner" style="background:' + cfg.bg + ';min-height:100vh;height:100vh">' +
      '<div class="hist-cine-char-wrap">' +
        '<img src="' + avatar + '" alt="' + isle.charName + '" class="hist-cine-char"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="hist-cine-char-emoji" style="display:none;color:' + cfg.kanjiColor + '">' + HIST_FALLBACK[n] + '</div>' +
      '</div>' +
      '<div class="hist-cine-content">' +
        '<div class="hist-cine-kanji" style="color:' + cfg.kanjiColor + '">' + cfg.kanji + '</div>' +
        '<div class="hist-cine-lines">' +
          cfg.lines.map(function(l) { return '<div class="hist-cine-line">' + l + '</div>'; }).join('') +
        '</div>' +
        '<div class="hist-cine-bubble">' +
          '<span class="hist-cine-char-name" style="color:' + cfg.kanjiColor + '">' + isle.charName + '</span>' +
          '<span class="hist-cine-bubble-text">"' + cfg.bubble + '"</span>' +
        '</div>' +
      '</div>' +
      '<button class="hist-skip-btn" onclick="hist_skipCine()">⏭ PASSER</button>' +
    '</div>';

  ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;align-items:stretch;justify-content:stretch;opacity:0;transition:opacity 0.3s;pointer-events:auto';
  ov._cb = callback;
  requestAnimationFrame(function() { ov.style.opacity = '1'; });
  ov._t = setTimeout(function() { hist_skipCine(); }, 4500);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(cfg.bubble);
    utt.lang = 'fr-FR';
    utt.rate = 0.9;
    utt.pitch = 1.1;
    window.speechSynthesis.speak(utt);
  }
}

function hist_skipCine() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  var ov = document.getElementById('hist-cine-overlay');
  if (!ov) return;
  clearTimeout(ov._t);
  var cb = ov._cb;
  ov.style.display = 'none';
  ov.style.pointerEvents = 'none';
  ov.style.zIndex = '-1';
  ov.innerHTML = '';
  if (cb) cb();
}

// ══════════════════════════════════════════════════════════════
// GRILLE DES ÎLES
// ══════════════════════════════════════════════════════════════
function buildHistoireGrid() {
  var grid = document.getElementById('hist-islands-grid');
  if (!grid || grid.children.length > 0) return;
  var html = '';
  for (var n = 1; n <= 8; n++) {
    var isle = ISLANDS_HISTOIRE[n];
    var avatar = HIST_AVATARS[n] || '';
    var score = hist_completedIslands[n] || 0;
    var done = hist_completedIslands[n] !== undefined;
    var stars = Array.from({length:10}, function(_, i) { return i < score ? '⭐' : '☆'; }).join('');
    html += '<div class="hist-isle-card' + (done ? ' done' : '') + '" onclick="hist_startIsland(' + n + ')" style="--isle-color:' + isle.color + '">' +
      '<div class="hist-isle-img-wrap">' +
        '<img src="' + avatar + '" alt="' + isle.charName + '" class="hist-isle-img"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="hist-isle-img-fallback" style="background:' + isle.color + '22;color:' + isle.color + '">' + HIST_FALLBACK[n] + '</div>' +
        '<div class="hist-isle-overlay" style="background:linear-gradient(to top,' + isle.color + 'cc,transparent)"></div>' +
      '</div>' +
      '<div class="hist-isle-body">' +
        '<div class="hist-isle-num">ÎLE #' + n + '</div>' +
        '<div class="hist-isle-name" style="color:' + isle.color + '">' + isle.charName.toUpperCase() + '</div>' +
        '<div class="hist-isle-topic">' + isle.topic + '</div>' +
        '<div class="hist-isle-level" style="border-color:' + isle.color + '55;color:' + isle.color + '">' + isle.level + '</div>' +
        '<div class="hist-isle-stars" id="hist-stars' + n + '">' + stars + '</div>' +
      '</div></div>';
  }
  grid.innerHTML = html;
}

console.info('🐉 quiz-histoire.js v4 — avatars corrigés + audio robuste + ciné fix');