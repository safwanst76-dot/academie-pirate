// ═══════════════════════════════════════
// AUTH.JS — Académie Pirate
// Gestion des boutons Nouveau / Déjà Pirate
// Dépend de : supabase.js
// ═══════════════════════════════════════

function switchLoginMode(mode) {
  const btnNew   = document.getElementById('btnNouveauPirate');
  const btnExist = document.getElementById('btnDejapirate');
  const hint     = document.querySelector('.login-hint');

  if (mode === 'new') {
    if (btnNew)   { btnNew.style.background = 'rgba(230,57,70,0.35)'; btnNew.style.borderColor = '#e63946'; btnNew.style.color = '#fff'; }
    if (btnExist) { btnExist.style.background = 'transparent'; btnExist.style.color = 'rgba(255,255,255,.5)'; }
    if (hint) hint.textContent = 'Crée ton compte pirate avec ton email !';
  } else {
    if (btnExist) { btnExist.style.background = 'rgba(255,215,0,0.15)'; btnExist.style.borderColor = '#ffd700'; btnExist.style.color = '#ffd700'; }
    if (btnNew)   { btnNew.style.background = 'transparent'; btnNew.style.color = 'rgba(255,255,255,.5)'; }
    if (hint) hint.textContent = 'Entre ton email pour recevoir ton lien de connexion !';
  }
}