// 🏴‍☠️ AUDIO ENGINE — Académie Pirate
// Dépendance : Howler.js (chargé dans index.html)
// Ce fichier expose TOUTES les fonctions audio en global
// pour qu'elles soient appelables depuis quiz.js, hud.js,
// cinematic.js, islands.js, etc.

// ═══════════════════════════════════════
// ÉTAT GLOBAL AUDIO
// ═══════════════════════════════════════
var actx = null;
var masterVol = 0.5;
var sfxEnabled = true;
var voiceEnabled = true;
var musicPlaying = false;
var bgmAudio = null;
var currentBGM = null;

// Voix FR pour SpeechSynthesis
var _voicesFR = [];

// ═══════════════════════════════════════
// BGM — Musique de fond (Audio natif)
// ═══════════════════════════════════════
var BGM_TRACKS = {
  map:     'assets/audio/bgm/map-theme.mp3',
  battle:  'assets/audio/bgm/battle-theme.mp3',
  victory: 'assets/audio/bgm/victory-theme.mp3',
  defeat:  'assets/audio/bgm/defeat-theme.mp3',
  'isle-1':'assets/audio/bgm/isle-1.mp3',
  'isle-2':'assets/audio/bgm/isle-2.mp3',
  'isle-3':'assets/audio/bgm/isle-3.mp3',
  'isle-4':'assets/audio/bgm/isle-4.mp3',
  'isle-5':'assets/audio/bgm/isle-5.mp3',
  'isle-6':'assets/audio/bgm/isle-6.mp3',
  'isle-7':'assets/audio/bgm/isle-7.mp3',
  'isle-8':'assets/audio/bgm/isle-8.mp3',
  'dbz-battle':  'assets/audio/bgm/dbz-battle.mp3',
  'dbz-victory': 'assets/audio/bgm/dbz-victory.mp3',
  'dbz-map':     'assets/audio/bgm/dbz-map.mp3',
  'dbz-isle':    'assets/audio/bgm/dbz-isle.mp3',
};

function playBGM(track, loop) {
  if (loop === undefined) loop = true;
  if (!musicPlaying) return;
  var src = BGM_TRACKS[track];
  if (!src) return;
  if (currentBGM === src) return;
  stopBGM();
  try {
    bgmAudio = new Audio(src);
    bgmAudio.loop = loop;
    bgmAudio.volume = masterVol * 0.35;
    bgmAudio.play().catch(function() {});
    currentBGM = src;
  } catch(e) {}
}

function stopBGM() {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
    bgmAudio = null;
    currentBGM = null;
  }
}

function toggleMusic() {
  musicPlaying = !musicPlaying;
  var btn = document.getElementById('btnMusic');
  if (btn) {
    btn.classList.toggle('active', musicPlaying);
    btn.classList.toggle('muted', !musicPlaying);
    btn.innerHTML = '🎵 Musique ' + (musicPlaying ? '▶' : '⏸');
  }
  if (musicPlaying) {
    playBGM('map');
  } else {
    stopBGM();
  }
}

// ═══════════════════════════════════════
// AUDIO CONTEXT — pour SFX synthétiques
// ═══════════════════════════════════════
function getActx() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  return actx;
}

function tone(f, type, dur, vol, delay) {
  if (!sfxEnabled) return;
  delay = delay || 0;
  try {
    var c = getActx();
    var o = c.createOscillator();
    var g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.frequency.value = f; o.type = type;
    var t = c.currentTime + delay;
    var v = vol * masterVol;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.03);
    g.gain.linearRampToValueAtTime(0, t + dur);
    o.start(t); o.stop(t + dur + 0.01);
  } catch(e) {}
}

function noiseBurst(dur, vol, delay) {
  if (!sfxEnabled) return;
  delay = delay || 0;
  try {
    var c = getActx();
    var buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    var src = c.createBufferSource();
    src.buffer = buf;
    var g = c.createGain();
    var filt = c.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = 400;
    src.connect(filt); filt.connect(g); g.connect(c.destination);
    var t = c.currentTime + delay;
    g.gain.setValueAtTime(vol * masterVol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.start(t); src.stop(t + dur);
  } catch(e) {}
}

// ═══════════════════════════════════════
// SFX GLOBAUX
// ═══════════════════════════════════════
function sfxOK() {
  if (!sfxEnabled) return;
  [523, 659, 784, 1047].forEach(function(f, i) { tone(f, 'sine', 0.18, 0.28, i * 0.1); });
}

function sfxKO() {
  if (!sfxEnabled) return;
  tone(220, 'sawtooth', 0.12, 0.3, 0);
  tone(150, 'sawtooth', 0.2, 0.25, 0.1);
  noiseBurst(0.15, 0.2, 0);
}

function sfxFanfare() {
  if (!sfxEnabled) return;
  var m = [523, 523, 523, 659, 523, 659, 784, 1047];
  var d = [0.1, 0.1, 0.1, 0.4, 0.1, 0.1, 0.3, 0.7];
  var t = 0;
  m.forEach(function(f, i) { tone(f, 'square', d[i], 0.15, t); t += d[i]; });
}

function sfxCombo() {
  if (!sfxEnabled) return;
  [784, 1047, 1319, 1568].forEach(function(f, i) { tone(f, 'triangle', 0.18, 0.22, i * 0.08); });
}

function sfxPerfect() {
  if (!sfxEnabled) return;
  [523, 587, 659, 698, 784, 880, 988, 1047].forEach(function(f, i) { tone(f, 'sine', 0.2, 0.18, i * 0.07); });
  setTimeout(function() { sfxFanfare(); }, 700);
}

function sfxSwoosh() {
  if (!sfxEnabled) return;
  try {
    var c = getActx();
    var o = c.createOscillator();
    var g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(200, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.12);
    g.gain.setValueAtTime(0.15 * masterVol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
    o.start(); o.stop(c.currentTime + 0.16);
  } catch(e) {}
}

function sfxPow() {
  if (!sfxEnabled) return;
  noiseBurst(0.08, 0.4, 0);
  tone(120, 'sine', 0.15, 0.5, 0);
  tone(80, 'sine', 0.2, 0.3, 0.05);
}

function sfxSlash() {
  if (!sfxEnabled) return;
  try {
    var c = getActx();
    var o = c.createOscillator();
    var g = c.createGain();
    var filt = c.createBiquadFilter();
    filt.type = 'highpass'; filt.frequency.value = 2000;
    o.connect(filt); filt.connect(g); g.connect(c.destination);
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(1200, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.18);
    g.gain.setValueAtTime(0.25 * masterVol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
    o.start(); o.stop(c.currentTime + 0.22);
    noiseBurst(0.12, 0.25, 0.02);
  } catch(e) {}
}

function sfxIsland() {
  if (!sfxEnabled) return;
  [392, 523, 659].forEach(function(f, i) { tone(f, 'triangle', 0.25, 0.2, i * 0.12); });
}

// ── SFX cinématiques ──────────────────
function sfxCineDrum() {
  try {
    var c = getActx();
    var buf = c.createBuffer(1, c.sampleRate * 0.3, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.05));
    var src = c.createBufferSource(); src.buffer = buf;
    var g = c.createGain();
    g.gain.setValueAtTime(0.9, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
    src.connect(g); g.connect(c.destination); src.start();
  } catch(e) {}
}

function sfxCineRiser() {
  try {
    var c = getActx();
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(80, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(600, c.currentTime + 0.7);
    g.gain.setValueAtTime(0.4, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.8);
  } catch(e) {}
}

function sfxCineVictory() {
  [0, 0.15, 0.3, 0.45].forEach(function(delay, i) {
    try {
      var c = getActx();
      var o = c.createOscillator();
      var g = c.createGain();
      var notes = [523, 659, 784, 1047];
      o.type = 'triangle'; o.frequency.value = notes[i];
      g.gain.setValueAtTime(0.35, c.currentTime + delay);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + 0.35);
      o.connect(g); g.connect(c.destination);
      o.start(c.currentTime + delay); o.stop(c.currentTime + delay + 0.35);
    } catch(e) {}
  });
}

function sfxCineDefeat() {
  [0, 0.18, 0.36].forEach(function(delay, i) {
    try {
      var c = getActx();
      var o = c.createOscillator();
      var g = c.createGain();
      var notes = [400, 320, 220];
      o.type = 'sawtooth'; o.frequency.value = notes[i];
      g.gain.setValueAtTime(0.3, c.currentTime + delay);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + 0.5);
      o.connect(g); g.connect(c.destination);
      o.start(c.currentTime + delay); o.stop(c.currentTime + delay + 0.5);
    } catch(e) {}
  });
}

// ═══════════════════════════════════════
// VOLUME & TOGGLES
// ═══════════════════════════════════════
function setVolume(v) {
  masterVol = parseFloat(v);
  if (bgmAudio) bgmAudio.volume = masterVol * 0.35;
}

function toggleSfx() {
  sfxEnabled = !sfxEnabled;
  var btn = document.getElementById('btnSfx');
  if (btn) {
    btn.classList.toggle('active', sfxEnabled);
    btn.classList.toggle('muted', !sfxEnabled);
    btn.innerHTML = (sfxEnabled ? '💥' : '🔇') + ' Effets';
  }
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  var btn = document.getElementById('btnVoice');
  if (btn) {
    btn.classList.toggle('active', voiceEnabled);
    btn.classList.toggle('muted', !voiceEnabled);
    btn.innerHTML = (voiceEnabled ? '🗣️' : '🔕') + ' Voix';
  }
  if (!voiceEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
}

// ═══════════════════════════════════════
// VOIX — SpeechSynthesis FR
// ═══════════════════════════════════════
var CHAR_QUOTES = {
  1: ['Je serai le Roi des Pirates !', 'Mes nakamas comptent plus que tout !', 'Je vais gagner, crois-moi !', 'La viande ! Allez, on y va !'],
  2: ['Je ne me perdrai jamais !', 'Rien ne peut arrêter mon épée !', 'Je deviendrai le plus grand épéiste !', 'Pour mon capitaine, je donne tout !'],
  3: ["L'argent et les cartes, voilà ce qui compte !", 'Je naviguerai sur toutes les mers !', "Avec ma météo, rien ne m'arrête !", 'Ne touchez pas à mes nakamas !'],
  4: ["Je suis le grand capitaine Usopp !", "J'ai dix mille soldats derrière moi !", 'Mon courage grandit à chaque défi !', 'Mon lance-pierres ne rate jamais !'],
  5: ['Mes pieds sont mes armes redoutables !', 'Je cuisinerai pour tous mes nakamas !', "Jamais je ne laisse quelqu'un mourir de faim !", 'Je trouverai le All Blue un jour !'],
  6: ['Je ne suis pas content du tout !', 'Je soignerai tous mes nakamas !', 'La médecine peut tout guérir !', "Luffy m'a appris la valeur des amis !"],
  7: ['La connaissance est la vraie arme.', 'Je veux découvrir la véritable histoire.', 'Je veux vivre ! Emmenez-moi avec vous !', 'Les Ponéglyphes révèlent tout.'],
  8: ['Yohohoho ! Puis-je voir votre culotte ?', 'La musique unit tous les nakamas !', 'Je suis mort mais mon âme chante encore !', 'Je reverrai Laboon, je le promets !']
};

// Mapping île → nom personnage pour AudioEngine.VOICES
var ISLE_CHAR_MAP = {1:'luffy', 2:'nami', 3:'zoro', 4:'robin', 5:'usopp', 6:'sanji', 7:'chopper', 8:'brook'};

function initVoicesFR() {
  function load() {
    var all = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    _voicesFR = all.filter(function(v) { return v.lang.startsWith('fr'); });
    if (!_voicesFR.length) _voicesFR = all;
  }
  load();
  if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = load;
}

function initVoices() {
  // Alias — même chose que initVoicesFR
  initVoicesFR();
}

function speakCharQuote(isleNum) {
  if (!voiceEnabled) return;
  if (!window.speechSynthesis) return;
  var quotes = CHAR_QUOTES[isleNum] || CHAR_QUOTES[1];
  var quote = quotes[Math.floor(Math.random() * quotes.length)];
  window.speechSynthesis.cancel();
  var utt = new SpeechSynthesisUtterance(quote);
  utt.lang = 'fr-FR';
  utt.rate = 0.92;
  utt.pitch = isleNum === 1 ? 1.3 : isleNum === 2 ? 0.75 : isleNum === 3 ? 1.4 : isleNum === 6 ? 1.5 : 1.0;
  utt.volume = 1.0;
  if (_voicesFR.length) utt.voice = _voicesFR[0];
  window.speechSynthesis.speak(utt);
  return quote;
}

function speakChar(isleNum, type) {
  if (!voiceEnabled) return;
  // Tente d'abord les fichiers audio Howl
  var charName = ISLE_CHAR_MAP[isleNum] || 'luffy';
  var voices = AudioEngine.VOICES[charName];
  if (voices && voices[type] && voices[type].length) {
    try {
      new Howl({ src: [voices[type][0]], volume: masterVol }).play();
      return;
    } catch(e) {}
  }
  // Fallback : SpeechSynthesis
  speakCharQuote(isleNum);
}

// ═══════════════════════════════════════
// OBJECT AudioEngine (pour compatibilité)
// ═══════════════════════════════════════
const AudioEngine = {
  bgm: null,
  masterVolume: 0.5,
  sfxEnabled: true,
  voiceEnabled: true,
  bgmEnabled: false,

  BGM_TRACKS: BGM_TRACKS,

  VOICES: {
    luffy:   { correct: ['assets/audio/voices/luffy/correct_1.mp3'],   wrong: ['assets/audio/voices/luffy/wrong_1.mp3'],   intro: ['assets/audio/voices/luffy/intro_1.mp3'],   perfect: ['assets/audio/voices/luffy/perfect_1.mp3']   },
    nami:    { correct: ['assets/audio/voices/nami/correct_1.mp3'],    wrong: ['assets/audio/voices/nami/wrong_1.mp3'],    intro: ['assets/audio/voices/nami/intro_1.mp3'],    perfect: ['assets/audio/voices/nami/perfect_1.mp3']    },
    zoro:    { correct: ['assets/audio/voices/zoro/correct_1.mp3'],    wrong: ['assets/audio/voices/zoro/wrong_1.mp3'],    intro: ['assets/audio/voices/zoro/intro_1.mp3'],    perfect: ['assets/audio/voices/zoro/perfect_1.mp3']    },
    robin:   { correct: ['assets/audio/voices/robin/correct_1.mp3'],   wrong: ['assets/audio/voices/robin/wrong_1.mp3'],   intro: ['assets/audio/voices/robin/intro_1.mp3'],   perfect: ['assets/audio/voices/robin/perfect_1.mp3']   },
    usopp:   { correct: ['assets/audio/voices/usopp/correct_1.mp3'],   wrong: ['assets/audio/voices/usopp/wrong_1.mp3'],   intro: ['assets/audio/voices/usopp/intro_1.mp3'],   perfect: ['assets/audio/voices/usopp/perfect_1.mp3']   },
    sanji:   { correct: ['assets/audio/voices/sanji/correct_1.mp3'],   wrong: ['assets/audio/voices/sanji/wrong_1.mp3'],   intro: ['assets/audio/voices/sanji/intro_1.mp3'],   perfect: ['assets/audio/voices/sanji/perfect_1.mp3']   },
    chopper: { correct: ['assets/audio/voices/chopper/correct_1.mp3'], wrong: ['assets/audio/voices/chopper/wrong_1.mp3'], intro: ['assets/audio/voices/chopper/intro_1.mp3'], perfect: ['assets/audio/voices/chopper/perfect_1.mp3'] },
    brook:   { correct: ['assets/audio/voices/brook/correct_1.mp3'],   wrong: ['assets/audio/voices/brook/wrong_1.mp3'],   intro: ['assets/audio/voices/brook/intro_1.mp3'],   perfect: ['assets/audio/voices/brook/perfect_1.mp3']   },
  },

  playVoice: function(char, type) {
    speakChar(ISLE_CHAR_MAP[char] !== undefined ? char : 1, type);
  },

  playBGM: function(track) { playBGM(track); },
  stopBGM: function() { stopBGM(); },
  setVolume: function(v) { setVolume(v); },
  toggle: function(type) {
    if (type === 'bgm')   toggleMusic();
    if (type === 'sfx')   toggleSfx();
    if (type === 'voice') toggleVoice();
  }
};

window.AudioEngine = AudioEngine;

// ═══════════════════════════════════════
// EXPOSITION GLOBALE — point crucial !
// Toutes ces fonctions doivent être window.X
// pour être appelables depuis quiz.js, hud.js,
// cinematic.js, avatar.js, index.html, etc.
// ═══════════════════════════════════════
window.playBGM        = playBGM;
window.stopBGM        = stopBGM;
window.toggleMusic    = toggleMusic;
window.toggleSfx      = toggleSfx;
window.toggleVoice    = toggleVoice;
window.setVolume      = setVolume;
window.sfxOK          = sfxOK;
window.sfxKO          = sfxKO;
window.sfxFanfare     = sfxFanfare;
window.sfxCombo       = sfxCombo;
window.sfxPerfect     = sfxPerfect;
window.sfxSwoosh      = sfxSwoosh;
window.sfxPow         = sfxPow;
window.sfxSlash       = sfxSlash;
window.sfxIsland      = sfxIsland;
window.sfxCineDrum    = sfxCineDrum;
window.sfxCineRiser   = sfxCineRiser;
window.sfxCineVictory = sfxCineVictory;
window.sfxCineDefeat  = sfxCineDefeat;
window.speakChar      = speakChar;
window.speakCharQuote = speakCharQuote;
window.initVoices     = initVoices;
window.initVoicesFR   = initVoicesFR;

console.info('🏴‍☠️ audio-engine.js chargé — toutes les fonctions audio sont globales');