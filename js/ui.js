// ═══════════════════════════════════════
// UI.JS — Académie Pirate
// Toast, flash, combat GIF, star rain
// ═══════════════════════════════════════

const GIFS_CORRECT = [
  'https://media.giphy.com/media/T7Qx28nEdo9NK/giphy.gif',
  'https://media0.giphy.com/media/TXSxuSHx9i6TNeBSry/giphy.gif',
  'https://media.giphy.com/media/tIZUToOMEFGM0/giphy.gif',
  'https://media.giphy.com/media/7BW9U2cJPQZ0s/giphy.gif',
];
const GIFS_WRONG = [
  'https://media.giphy.com/media/9QPhSxfiHKdGdJfrlT/giphy.gif',
  'https://media.giphy.com/media/U8fhZ6bL4gm0eZ7NJH/giphy.gif',
  'https://media.giphy.com/media/l4EoSBIpWo73b9bW0/giphy.gif',
];
const GIFS_PERFECT = [
  'https://media.giphy.com/media/vplUlYHL0WnaE/giphy.gif',
  'https://media.giphy.com/media/Muqc4t03A8sz4ksa5i/giphy.gif',
  'https://media.giphy.com/media/1195W96ZIyUra8/giphy.gif',
];
const GIFS_ISLE_WIN = [
  'https://media.giphy.com/media/PEMfdDHDcfEQw/giphy.gif',
  'https://media.giphy.com/media/z8499G57Bne3m/giphy.gif',
  'https://media.giphy.com/media/p8WDYgByyFJTy/giphy.gif',
  'https://media.giphy.com/media/12K8GGWstl229G/giphy.gif',
  'https://media.giphy.com/media/PoK3zuKMTYqNUFFbaG/giphy.gif',
  'https://media.giphy.com/media/SJXzadwbexJEAZ9S1B/giphy.gif',
  'https://media.giphy.com/media/Godtj62ewycxy/giphy.gif',
  'https://media.giphy.com/media/ckq3M52jTUH4f5UYWp/giphy.gif',
];
const GIFS_ISLE_LOSE = [
  'https://media.giphy.com/media/9QPhSxfiHKdGdJfrlT/giphy.gif',
  'https://media.giphy.com/media/s55XB0bzfwo9y/giphy.gif',
];

// ── Toast ──
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}

// ── Stars string ──
function starsStr(s, max) {
  var r = '';
  for (var i = 0; i < max; i++) r += i < s ? '⭐' : '☆';
  return r;
}

// ── Screen flash FX ──
function fxCorrect(word) {
  var el = document.getElementById('attackCorrect');
  if (!el) return;
  el.textContent = word || 'PARFAIT!';
  el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire');
  setTimeout(function() { el.classList.remove('fire'); }, 750);
  var sf = document.getElementById('screenFlash');
  if (sf) { sf.className = 'screen-flash green-f'; setTimeout(function() { sf.className = 'screen-flash'; }, 400); }
}

function fxWrong() {
  var el = document.getElementById('attackWrong');
  if (!el) return;
  el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire');
  setTimeout(function() { el.classList.remove('fire'); }, 550);
  var sf = document.getElementById('screenFlash');
  if (sf) { sf.className = 'screen-flash red-f'; setTimeout(function() { sf.className = 'screen-flash'; }, 400); }
}

// ── Star rain ──
function starRain(n) {
  n = n || 6;
  var emojis = ['⭐','✨','💫','🌟','⚡','🔥'];
  for (var i = 0; i < n; i++) {
    (function(i) {
      setTimeout(function() {
        var s = document.createElement('div');
        s.className = 'star-p';
        s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        s.style.left = Math.random() * 85 + 'vw';
        s.style.top = (10 + Math.random() * 50) + 'vh';
        document.body.appendChild(s);
        setTimeout(function() { s.remove(); }, 1300);
      }, i * 90);
    })(i);
  }
}

// ── Combat GIF overlay ──
var gifTimer = null;
function showCombatGif(type) {
  var list = type === 'perfect' ? GIFS_PERFECT : type === 'correct' ? GIFS_CORRECT : GIFS_WRONG;
  var src = list[Math.floor(Math.random() * list.length)];
  var overlay = document.getElementById('combat-gif-overlay');
  var img = document.getElementById('combat-gif-img');
  if (!overlay || !img) return;
  img.src = src;
  overlay.classList.add('active');
  if (gifTimer) clearTimeout(gifTimer);
  gifTimer = setTimeout(function() { overlay.classList.remove('active'); }, 2500);
}

function closeCombatVideo() {
  var v = document.getElementById('combat-video');
  var o = document.getElementById('combat-overlay');
  if (v) { v.pause(); v.src = ''; }
  if (o) o.classList.remove('active');
}