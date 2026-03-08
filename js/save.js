// ═══════════════════════════════════════
// SAVE / LOAD — Académie Pirate
// Progression séparée par joueur
// ═══════════════════════════════════════

function saveProgress() {
  var data = {xp: xp, streak: streak, completedIslands: completedIslands, timestamp: new Date().toISOString()};
  try { localStorage.setItem(progressKey(), JSON.stringify(data)); } catch(e) {}
  if (typeof WEBAPP_URL !== 'undefined' && WEBAPP_URL) {
    fetch(WEBAPP_URL, {method:'POST', body: JSON.stringify(data)}).catch(function(){});
  }
}

function loadProgress() {
  try {
    var s = localStorage.getItem(progressKey());
    if (!s) return;
    var d = JSON.parse(s);
    xp = d.xp || 0;
    streak = d.streak || 0;
    completedIslands = d.completedIslands || {};
    Object.keys(completedIslands).forEach(function(n) {
      var el = document.getElementById('stars' + n);
      if (el) el.textContent = starsStr(completedIslands[n], 10);
      var isle = document.getElementById('isle' + n);
      if (isle) isle.classList.add('done');
    });
    updateHUD();
  } catch(e) {}
}
