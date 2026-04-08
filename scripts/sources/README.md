# scripts/sources/ — Images prioritaires (meilleure qualité)

Ce dossier contient tes images téléchargées manuellement.
Elles sont TOUJOURS utilisées en priorité sur Jikan lors d'un `audit --fix`.

## Structure
```
sources/
├── aot/
│   ├── levi.jpg        ← même ID que dans scripts/assets/aot.json
│   ├── eren.jpeg
│   └── historia.jpg
├── ds/
│   ├── tanjiro.jpg
│   └── nezuko.jpeg
├── naruto/
├── jjk/
├── one-piece/
└── dbz/
```

## Usage
```bash
# Déposer une image prioritaire
cp ~/Downloads/ma-belle-image-levi.jpg scripts/sources/aot/levi.jpg

# Lancer l'audit — détecte automatiquement et uploade en priorité
SUPABASE_SERVICE_KEY=xxx node scripts/audit.js --fix --world=aot
```

## Règle ASSET-01
Les fichiers dans sources/ ne sont PAS versionnés (gitignore).
Ils servent de source locale temporaire pour l'upload vers Supabase.
