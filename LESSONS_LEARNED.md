# 🧠 LESSONS LEARNED — Académie Pirate
*Créé le 22 mai 2026 — Mémoire externe persistante du projet*

---

## 🎯 OBJECTIF

Ce fichier capitalise CHAQUE erreur faite par Claude (ou tout dev) lors
du développement, AVEC sa correction et sa règle de prévention.

**Toute future session Claude doit lire ce fichier en début de session.**

---

## 📋 PROTOCOLE D'UTILISATION

### Au DÉBUT de chaque session

Lire instructions-projet-claude_1.md
Lire LESSONS_LEARNED.md (apprendre du passé)
Lire WORLD_EVOLUTION_PATTERN.md + GRAND_BLEU_PATTERN.md
Annoncer à l'user : "j'ai relu les patterns + leçons, je suis prêt"


### AVANT toute création de fichier

ls + cat sur les fichiers équivalents existants (PROD-01)
Copier leur format à l'identique
JAMAIS inventer un format


### APRÈS toute erreur (la tienne ou pointée par l'user)

Ajouter une nouvelle entrée dans LESSONS_LEARNED.md
Format obligatoire : date · contexte · erreur · correction · prévention
Si récurrence possible → ajouter un Piège dans GRAND_BLEU_PATTERN.md
Commit séparé "docs(lessons): leçon apprise — XYZ"


---

## 📚 ERREURS CAPITALISÉES

---

### 🔴 Erreur #1 — 22/05/2026 — Format JSON inventé sans vérifier l'existant

**Contexte** : Création du fichier `scripts/assets/sindria.json` pour le nouveau monde Sindria.

**Erreur** : J'ai inventé un format JSON avec des champs `subject`, `universe`, `level` qui
n'existent dans AUCUN des 6 .json existants (aot.json, dbz.json, ds.json, jjk.json,
naruto.json, one-piece.json).

**Conséquence** : Format incompatible avec `scripts/upload.js`. Le fichier aurait
échoué silencieusement à l'upload.

**Correction** : Suppression du fichier inventé, lecture de `aot.json` et `one-piece.json`,
recréation avec le VRAI format (`name`, `emoji`, `storage`, `bucket`, `localDir`, `color`,
`characters[].id/.name/.type/.path/.jikanId`).

**Prévention** : **AVANT** toute création de fichier dans une catégorie connue (JSON config,
SQL migration, JS world, CSS quiz), faire OBLIGATOIREMENT :
```bash
ls scripts/assets/         # voir les fichiers existants
cat scripts/assets/aot.json | head -30  # voir le format
```
Pattern documenté dans Piège #9 (GRAND_BLEU_PATTERN.md).

---

### 🔴 Erreur #2 — 22/05/2026 — Convention de nommage inventée

**Contexte** : Même fichier `scripts/assets/sindria.json`.

**Erreur** : J'ai nommé le fichier `sindria.json` (= nom du monde).
La convention réelle = nom du MANGA : aot, dbz, ds, jjk, naruto, one-piece.
Le bon nom était `magi.json`.

**Conséquence** : Confusion future, scripts qui cherchent `{manga}.json` ne trouveraient pas.

**Correction** : Renommé `sindria.json` → `magi.json`.

**Prévention** : Documenter EXPLICITEMENT chaque convention de nommage du projet :
ÉlémentConventionExemplescripts/assets/{X}.jsonNOM DU MANGAmagi.jsonscripts/sources/{X}/NOM DU MANGAmagi/js/worlds/{X}/NOM DU MONDEsindria/css/quiz-{X}.cssNOM DU MONDEquiz-sindria.cssbucket SupabaseNOM DU BUCKETisland-sindria

---

### 🔴 Erreur #3 — 22/05/2026 — Dossier sources mal nommé

**Contexte** : Création du dossier `scripts/sources/sindria/`.

**Erreur** : Même cause que #2 — nom du monde au lieu du nom du manga.
Aurait dû être `scripts/sources/magi/`.

**Conséquence** : Le `scripts/sources/README.md` documente explicitement le pattern
`sources/{manga}/...` (aot/, ds/, naruto/...). Mon dossier `sindria/` ne suivait pas.

**Correction** : Supprimé `sindria/`, créé `magi/`.

**Prévention** : Le `README.md` d'un dossier est SOURCE DE VÉRITÉ — toujours le lire AVANT
d'ajouter du contenu dans ce dossier.

---

### 🔴 Erreur #4 — 22/05/2026 — URL Supabase pointait vers le mauvais bucket

**Contexte** : Fichiers JS `js/worlds/sindria/*.js` créés avec URL Supabase
pointant vers `/storage/v1/object/public/sindria/...`

**Erreur** : Le nom du dossier MONDE est `sindria`, mais le BUCKET Supabase doit être
`island-sindria` (convention : préfixe `island-` pour les nouveaux mondes, sauf grand-bleu).

**Conséquence** : Les 40 personnages ne se seraient pas chargés (404 sur Supabase Storage).

**Correction** : `sed -i 's|public/sindria/|public/island-sindria/|g'` sur les 4 JS.

**Prévention** : Lors de la création d'un monde, TOUJOURS générer une **table de mapping**
explicite en début de fichier de plan :
Monde URL    : sindria
Manga        : magi
Bucket S3    : island-sindria
JSON assets  : magi.json
CSS file     : quiz-sindria.css
JS dossier   : js/worlds/sindria/

Et vérifier la cohérence avec un grep en fin de session :
```bash
grep -r "public/sindria" js/ css/   # doit retourner ZÉRO résultat
grep -r "public/island-sindria" js/ css/   # doit avoir des résultats
```

---

## 🛠️ AMÉLIORATIONS AUTONOMES (auto-décidées par Claude)

À chaque session, Claude peut détecter des opportunités d'amélioration du code
vers les meilleures pratiques (CSS moderne, sécurité, accessibility, perf, UX).
Quand c'est le cas, il les propose ET les applique si l'user valide.

### Format d'amélioration
🟢 Amélioration #N — JJ/MM/AAAA — [Sujet]
Détectée dans : [fichier:ligne]
Pratique actuelle : [état]
Meilleure pratique : [proposition]
Bénéfice : [impact concret]
Statut : ✅ Appliquée | ⏸️ En attente validation | ❌ Refusée

### Améliorations à venir
*(à remplir au fur et à mesure des audits)*

---

## 🔐 AUDITS SÉCURITÉ

Voir `SECURITY_AUDIT.md` (à créer lors du prochain audit).

Audits prévus :
- [ ] Supabase RLS sur toutes les tables (enfants, parents, comptes)
- [ ] CSP headers + sanitization XSS frontend
- [ ] RGPD enfants : consentement parental, minimisation données, droit oubli
- [ ] Rate limiting Edge Functions
- [ ] Secrets management (SERVICE_KEY, DKIM, IndexNow)
- [ ] Auth flows (PIN enfant alphanumérique, JWT expiration)

---

*LESSONS LEARNED V1.0 — Académie Pirate — 22 Mai 2026*
*Document VIVANT : à mettre à jour à chaque erreur capitalisée*
