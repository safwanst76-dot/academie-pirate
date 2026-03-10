// ═══════════════════════════════════════
// PROGRESSION.JS — Académie Pirate
// XP, niveaux, badges
// Dépend de : hud.js (updateHUD, starsStr, showToast)
// ═══════════════════════════════════════

// (starsStr, showToast, checkBadges, updateHUD sont dans hud.js)
// Ce fichier est un placeholder pour futures fonctions XP étendues.

// Exemple : calcul niveau depuis XP global
function getLevel(totalXP) {
  const levels = [
    {min:0,  name:"Mousse"},
    {min:10, name:"Matelot"},
    {min:25, name:"Quartier-Maître"},
    {min:40, name:"Navigateur"},
    {min:55, name:"Capitaine"},
    {min:70, name:"Vice-Amiral"},
    {min:80, name:"👑 Roi des Pirates"}
  ];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalXP >= levels[i].min) return levels[i];
  }
  return levels[0];
}