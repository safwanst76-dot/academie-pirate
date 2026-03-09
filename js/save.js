// ═══════════════════════════════════════
// SAVE / LOAD — Académie Pirate
// DB Supabase (enfant actif) + localStorage fallback
// ═══════════════════════════════════════

function saveProgress() {
  // 1. localStorage immédiat
  var data = { xp: xp, streak: streak, completedIslands: completedIslands, timestamp: new Date().toISOString() };
  try { localStorage.setItem('academie_pirate_v3', JSON.stringify(data)); } catch(e) {}

  // 2. Supabase DB si enfant actif
  var child = (typeof dbGetActiveChild === 'function') ? dbGetActiveChild() : null;
  if (!child) return;

  Object.entries(completedIslands).forEach(function(entry) {
    var isleId = parseInt(entry[0]);
    var score  = entry[1];
    dbSaveProgression(child.id, 'french1', isleId, {
      xp:             isleId * 2,
      score:          score,
      completed:      score > 0,
      time_spent_sec: 0
    }).catch(function(e) { console.warn('DB saveProgress:', e); });
  });
}

async function loadProgress() {
  // 1. Essayer Supabase DB si enfant actif
  var child = (typeof dbGetActiveChild === 'function') ? dbGetActiveChild() : null;
  if (child) {
    try {
      var prog = await dbGetLessonProgression(child.id, 'french1');
      if (prog && Object.keys(prog).length > 0) {
        xp = 0;
        completedIslands = {};
        Object.entries(prog).forEach(function(entry) {
          var isleId = parseInt(entry[0]);
          var row    = entry[1];
          if (row.completed) {
            completedIslands[isleId] = row.score || 0;
            xp += row.xp || 0;
            var starsEl = document.getElementById('stars' + isleId);
            var isleEl  = document.getElementById('isle'  + isleId);
            if (starsEl) starsEl.textContent = starsStr(row.score || 0, 10);
            if (isleEl)  isleEl.classList.add('done');
          }
        });
        updateHUD();
        return; // DB chargée — on s'arrête là
      }
    } catch(e) { console.warn('DB loadProgress:', e); }
  }

  // 2. Fallback localStorage
  try {
    var s = localStorage.getItem('academie_pirate_v3');
    if (!s) return;
    var d = JSON.parse(s);
    xp               = d.xp || 0;
    streak           = d.streak || 0;
    completedIslands = d.completedIslands || {};
    Object.keys(completedIslands).forEach(function(n) {
      var starsEl = document.getElementById('stars' + n);
      var isleEl  = document.getElementById('isle'  + n);
      if (starsEl) starsEl.textContent = starsStr(completedIslands[n], 10);
      if (isleEl)  isleEl.classList.add('done');
    });
    updateHUD();
  } catch(e) {}
}