// ═══════════════════════════════════════
// PARENT.JS — Académie Pirate
// Dashboard parent + lien enfant/parent
// Note : la logique principale est dans supabase.js
// (handleParent, showParentDashboard, saveParentProfile)
// Ce fichier contient les helpers supplémentaires.
// ═══════════════════════════════════════

// Déconnexion parent
function handleLogout() {
  if (typeof sbSignOut === 'function') {
    sbSignOut();
  } else {
    location.reload();
  }
}

// Afficher le lien invitation pour un enfant
function getChildInviteLink(parentEmail) {
  const base = 'https://safwanst76-dot.github.io/academie-pirate';
  return `${base}?parent=${encodeURIComponent(parentEmail)}`;
}