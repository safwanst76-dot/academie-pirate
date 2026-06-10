// ═══════════════════════════════════════════════════════════════════
// CONFIG.JS — Académie Pirate
// Source unique de vérité : URLs, feature flags, mondes, version
// ⚠️  Doit être chargé EN PREMIER dans index.html (avant tout script)
// ⚠️  Ne jamais committer la service_role key ici (anon key seulement)
// ═══════════════════════════════════════════════════════════════════

window.AP_CONFIG = {

  // ── Identité ─────────────────────────────────────────────────────
  APP_NAME:    'Académie Pirate',
  VERSION:     '2.0.0',
  ENV:         'production',   // 'dev' | 'staging' | 'production'
  BASE_URL:    'https://aca-pirate.ch',

  // ── Supabase ─────────────────────────────────────────────────────
  // Clé ANON publique uniquement — jamais la service_role ici
  SUPABASE_URL:      'https://bwxzrqsvccqmzvonsswi.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHpycXN2Y2NxbXp2b25zc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzQyMTgsImV4cCI6MjA4ODU1MDIxOH0.Yd0ZmxRe6bMkjQGrW_RsMnH_yj5pI8Rm-_Sd7bh88e4',

  // ── Buckets Supabase Storage ──────────────────────────────────────
  STORAGE_BASE: 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/',
  BUCKETS: {
    'grand-bleu':        'grand-bleu',
    'magnolia':          'island-magnolia',
    'kanto':             'island-demon-slayer',
    'pays-du-feu':       'island-pays-du-feu',
    'namek':             'island-namek',          
    'brevet':            'island-brevet',         // à créer (assets Phase 2)  
  },

  // ── Feature Flags ─────────────────────────────────────────────────
  // Activer ici sans toucher au code fonctionnel
  FEATURES: {
    LESSONS:          true,   // page leçon avant chaque quiz
    ANALYTICS:        true,   // tracking interne Supabase
    DAILY_REWARD:     false,  // récompense quotidienne (à dev)
    BADGES:           false,  // système de badges (à dev)
    STRIPE:           false,  // BIZ-01 : feature désactivée définitivement
    NOTIFICATIONS:    false,  // push web (à dev)
    BOSS_MECHANIC:    false,  // HP bar boss battle (à dev)
    LEADERBOARD:      false,  // classement familial (à dev)
    REVISION_SM2:     false,  // révision adaptative (à dev)
    SPEED_MODE:       false,  // mode calcul mental chronométré (à dev)
  },

  // ── Mondes ───────────────────────────────────────────────────────
  // active: false = ne pas charger les scripts du monde
  // locked: true  = cadenas sur la carte
  // route:        = hash routing
  // jsFiles:      = scripts à charger dans l'ordre
  WORLDS: {
    'grand-bleu': {
      active:      true,
      locked:      false,
      route:       'iles',
      subject:     'Français',
      universe:    'One Piece',
      color:       '#e63946',
      stripeTier:  'free',
      jsFiles:     ['js/worlds/grand-bleu/audio.js', 'js/worlds/grand-bleu/lesson-data.js', 'js/worlds/grand-bleu/quiz.js'],
    },
    'magnolia': {
      active:      true,
      locked:      false,
      route:       'histoire',
      subject:     'Histoire',
      universe:    'Dragon Ball Z',
      color:       '#8b5cf6',
      stripeTier:  'free',
      jsFiles:     ['js/worlds/magnolia/audio.js', 'js/worlds/magnolia/lesson-data.js', 'js/worlds/magnolia/quiz.js'],
    },
    'kanto': {
      active:      true,
      locked:      false,
      route:       'kanto',
      subject:     'Sciences Physiques',
      universe:    'Demon Slayer',
      color:       '#C0392B',
      stripeTier:  'free',
      jsFiles:     ['js/worlds/kanto/audio.js', 'js/worlds/kanto/lesson-data.js', 'js/worlds/kanto/quiz.js'],
    },
    'pays-du-feu': {
      active:      true,
      locked:      false,
      route:       'pays-du-feu',
      subject:     'Mathématiques',
      universe:    'Naruto',
      color:       '#F97316',
      stripeTier:  'free',
      jsFiles:     ['js/worlds/pays-du-feu/audio.js', 'js/worlds/pays-du-feu/lesson-data.js', 'js/worlds/pays-du-feu/quiz.js'],
    },
    'english': {
      active:      true,
      locked:      false,
      route:       'english',
      subject:     'Anglais',
      universe:    'Attack on Titan',
      color:       '#4a5c3f',
      stripeTier:  'free',
      jsFiles:     ['js/worlds/english/audio.js', 'js/engine/quiz-engine.js', 'js/worlds/english/quiz-router.js', 'js/worlds/english/lesson-data.js'],
    },
    'brevet': {
      active:      true,
      locked:      false,
      route:       'brevet',
      subject:     'Révisions Brevet (Français)',
      universe:    'Multi-manga',
      color:       '#eab308',
      stripeTier:  'free',
      jsFiles:     ['js/engine/quiz-engine.js', 'js/worlds/brevet/quiz-router.js'],
    },
    'namek': {
      active:      true,
      locked:      false,
      route:       'namek',
      subject:     'Géographie',
      universe:    'Jujutsu Kaisen',
      color:       '#7c3aed',
      stripeTier:  'free',
      jsFiles:     ['js/worlds/namek/audio.js', 'js/worlds/namek/lesson-data.js', 'js/worlds/namek/quiz.js'],
    },
    
  },

  // ── Freemium ─────────────────────────────────────────────────────
  FREE_ISLANDS_PER_WORLD: 8,    // BIZ-01 : tout gratuit, valeur conservée pour compatibilité ascendante


  // ── Niveaux et XP ────────────────────────────────────────────────
  XP_PER_CORRECT:   2,
  XP_PER_ISLAND:    22,          // 11 questions × 2 XP
  LEVELS: [
    { level: 1, xpRequired: 0,    title: 'Moussaillon' },
    { level: 2, xpRequired: 50,   title: 'Novice Pirate' },
    { level: 3, xpRequired: 150,  title: 'Pirate Confirmé' },
    { level: 4, xpRequired: 300,  title: 'Ninja Genin' },
    { level: 5, xpRequired: 500,  title: 'Chunin' },
    { level: 6, xpRequired: 800,  title: 'Jonin' },
    { level: 7, xpRequired: 1200, title: 'Capitaine' },
    { level: 8, xpRequired: 1800, title: 'Amiral' },
    { level: 9, xpRequired: 2500, title: 'Légende' },
    { level: 10, xpRequired: 3500, title: 'Roi des Pirates' },
  ],

  // ── Analytics ────────────────────────────────────────────────────
  ANALYTICS_BATCH_SIZE: 10,
  SESSION_TTL_MIN:      30,
  ANALYTICS_ENABLED:    true,

  // ── SEO ──────────────────────────────────────────────────────────
  SITE_NAME:    'Académie Pirate',
  SITE_DESC:    'Plateforme d\'apprentissage gamifiée manga pour enfants 8-13 ans. Français, Maths, Histoire, Sciences.',
  OG_IMAGE:     'https://aca-pirate.ch/assets/images/academie-pirate-apprendre-manga.png',

  // ── Notifications email ───────────────────────────────────────────
  EMAIL_FROM:         'noreply@aca-pirate.ch',
  EMAIL_TEMPLATES: {
    WELCOME:          'welcome-parent',
    WEEKLY_PROGRESS:  'weekly-progress',
    NEW_WORLD:        'new-world-available',
    STREAK_RISK:      'streak-at-risk',
  },
};

// ── Helpers raccourcis ────────────────────────────────────────────────
window.AP_CONFIG.getStorageUrl = function(bucket, path) {
  return this.STORAGE_BASE + (this.BUCKETS[bucket] || bucket) + '/' + path;
};

window.AP_CONFIG.isFeatureEnabled = function(flag) {
  return !!(this.FEATURES && this.FEATURES[flag]);
};

window.AP_CONFIG.getWorld = function(worldKey) {
  return this.WORLDS[worldKey] || null;
};

window.AP_CONFIG.isWorldActive = function(worldKey) {
  var w = this.WORLDS[worldKey];
  return w ? w.active : false;
};

// ── Log version en dev ────────────────────────────────────────────────
if (window.AP_CONFIG.ENV !== 'production') {
  console.info('⚙️ AP_CONFIG chargé — v' + window.AP_CONFIG.VERSION + ' (' + window.AP_CONFIG.ENV + ')');
}