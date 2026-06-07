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

---

### 🔴 Erreur #5 — 22/05/2026 — FAILLE RLS CRITIQUE : anon_pin_lookup sur child_profiles

**Contexte** : Audit sécurité Supabase RLS complet.

**Erreur** : La policy `anon_pin_lookup` sur la table `child_profiles` était définie
avec `USING (true)`, ce qui permettait à n'importe quel anonyme (avec l'anon key
publique exposée dans `js/supabase.js`) de lire TOUS les profils enfants du monde
entier : username, PIN, parent_id, avatar_id, xp_total, level.

**Conséquence potentielle** :
- Fuite RGPD massive (données enfants 8-15 ans = vulnerable personnes)
- Sanction CNIL jusqu'à 4% du CA mondial
- Vol d'identités enfant (login comme n'importe quel enfant via son PIN)
- Confiance utilisateur ruinée si exploit public

**Origine** : Cette policy avait été créée à des fins de "login enfant anonyme par PIN"
(sans Supabase Auth pour les enfants), mais la solution technique choisie exposait
toute la table au lieu d'un seul profil correspondant au PIN.

**Correction (commit b57615d... → ce commit)** :
1. Création table `pin_attempts` (rate limiting)
2. Création fonction RPC `lookup_child_by_pin(pin_input)` :
   - SECURITY DEFINER (bypass RLS de manière contrôlée)
   - Rate limiting : max 5 échecs / 15 min / IP
   - Validation longueur PIN (4-20 chars)
   - Retourne UN SEUL profil correspondant + UNIQUEMENT les champs nécessaires
   - Logge chaque tentative dans pin_attempts (IP + succès booléen, pas le PIN)
3. Migration JS `auth.js:afSubmitChildPinLogin` → utilise sb.rpc(...)
4. Suppression de la fonction `_fetchChildByPinDirect` (fallback REST devenu inutile)
5. DROP POLICY anon_pin_lookup ON child_profiles (verrouillage final)

**Test final post-fix (validé en prod 22/05/2026)** :
- ✅ Login enfant fonctionne via la RPC
- ✅ `sb.from('child_profiles').select('*')` en anon → retourne `[]` (vide)
- ✅ Rate limiting actif

**Prévention** :
- ⚠️ TOUTE policy avec `USING (true)` sur des données utilisateurs sensibles =
  RED FLAG → exposer la table entière
- ✅ Pour les besoins "lookup par champ unique sans auth" (PIN, slug public, etc.),
  utiliser une fonction RPC SECURITY DEFINER qui retourne UNIQUEMENT le résultat
  correspondant, pas la table entière
- ✅ Toujours combiner avec du rate limiting pour empêcher l'énumération
- ✅ Logger les tentatives mais SANS la donnée sensible (RGPD : pas de PIN dans les logs)

**Documentation** : voir SECURITY_AUDIT.md (à créer)

---

### 🟡 Alertes mineures détectées console (22/05/2026, en passant)

À tracker comme tickets séparés :

1. **config.js:121 — SyntaxError 'jsFiles'** : bug syntaxe à corriger
2. **funnel_sessions 401** : analytics anonyme ne fonctionne pas
3. **push-notifications subscription failed** : push web ne marche pas
4. **meta apple-mobile-web-app-capable** : remplacer par `mobile-web-app-capable`
5. **og-preview.png 404** : image Open Graph manquante (impact SEO/partage)

Ces 5 points seront traités dans des sessions ultérieures dédiées.


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

---

## ⚠️ ERREURS CRITIQUES — Capitalisées lors de Phase 5 (28/05/2026)

### Erreur #6 — `node --check` FATAL obligatoire avant tout commit JS

**Date détection** : 28/05/2026, 14h22 GMT+1
**Contexte** : Script `phase5_full_username_pin.sh` qui patche `js/auth.js`
**Symptôme** : Code JS cassé avec `} catch (e) {` orphelin pushé en prod
**Impact prod** : 🚨 CRITIQUE — site cassé pendant 4 min avant revert

**Détail du bug** :
Le script Python utilisait un parseur d'accolades maison pour identifier
la fin de la fonction `afSubmitChildPinLogin`. Le parseur a coupé au mauvais
endroit, laissant un bloc `} catch (e) {` orphelin sans son `try {`. Erreur
syntaxe JS catastrophique.

Le script affichait `node --check js/auth.js` comme une **simple vérification
informationnelle**, sans `exit 1` si fail. Donc même avec la syntaxe cassée,
le script continuait, faisait `git add`, `git commit`, `git push` → bug en prod.

**Bonne pratique** :
```bash
if ! node --check js/auth.js; then
  echo "Syntaxe JS cassée — ROLLBACK"
  cp js/auth.js.bak js/auth.js
  exit 1
fi
```

**Bénéfice** :
- Aucun commit possible sur du code cassé
- Rollback automatique en cas d'erreur

**Statut** : Appliquée dans `phase5_v2_robust.sh` (28/05/2026)

---

### Erreur #7 — `git revert HEAD` deux fois = revert du revert

**Date détection** : 28/05/2026, 14h35 GMT+1
**Contexte** : Recovery après push en prod du commit Phase 5 cassé
**Symptôme** : Le 2e revert a RÉ-APPLIQUÉ le bug en prod

**Détail du bug** :
1. Commit cassé pushé en prod
2. `git revert --no-edit HEAD` une 1ère fois → revert OK
3. Confusion : relancé une 2e fois
4. → revert du revert = "Reapply" du bug
5. Bug à nouveau en prod
6. 3e revert pour stabiliser

**Pourquoi c'est arrivé** :
- `git revert HEAD` annule le DERNIER commit
- Si le dernier commit est lui-même un revert, l'annuler RÉ-APPLIQUE le bug

**Bonne pratique** :
- Toujours vérifier `git log --oneline -3` AVANT de relancer `git revert`
- Si le revert est déjà fait, NE PAS le relancer

**Statut** : Documentée (28/05/2026)

---

### Erreur #8 — Backup `.bak` + `trap ERR` obligatoires dans scripts de migration

**Date détection** : 28/05/2026, 14h45 GMT+1
**Contexte** : Bug Phase 5 a poussé du code cassé sans possibilité de rollback simple

**Le problème** :
Les scripts de migration modifient directement des fichiers sources.
Si le script échoue à mi-chemin, les fichiers sont laissés dans un état
incohérent. Sans backup, il faut faire `git checkout` ou `git revert`.

**Bonne pratique** :
```bash
# 1. Backup AVANT modif
cp js/auth.js js/auth.js.bak

# 2. Trap ERR pour rollback auto
cleanup_on_error() {
  cp js/auth.js.bak js/auth.js
  exit 1
}
trap cleanup_on_error ERR
set -euo pipefail

# 3. Modifs + vérif FATALE
python3 patch.py
node --check js/auth.js || exit 1

# 4. Pause confirmation utilisateur
read -p "Diff OK ? Tape ENTRÉE pour commit"

# 5. Désactiver le trap (zone safe)
trap - ERR
rm -f js/auth.js.bak

# 6. Commit
git add . && git commit && git push
```

**Bénéfice** :
- Rollback automatique en 1 ligne si erreur
- État du repo toujours propre

**Statut** : Appliquée dans `phase5_v2_robust.sh` (28/05/2026)

---

## 📚 Méta-leçon : Audit avant production

Les 3 erreurs ci-dessus (#6, #7, #8) auraient TOUTES été évitées par UN script
de migration BLINDÉ dès le départ. Coût d'investissement initial : ~30 minutes.
Bénéfice : zéro downtime prod.

**Règle d'or pour TOUS les futurs scripts de migration** :
1. `set -euo pipefail` en début
2. Backup `.bak` AVANT modif
3. `trap ERR` pour rollback auto
4. Validation FATALE après modif (exit 1 si fail)
5. Pause confirmation utilisateur avant commit
6. Désactivation du trap APRÈS confirmation
7. Cleanup backups seulement en cas de succès complet

**Template canonique** : `phase5_v2_robust.sh`

---

*Erreurs #6-#8 capitalisées le 28 mai 2026 lors de Pattern A Phase 5*

---

## 📐 RÈGLES PERMANENTES DE CONTENU (codifiées 07/06/2026)

> À respecter pour TOUTE nouvelle matière, nouveau monde, nouvelle leçon.
> À lire en début de session au même titre que les Erreurs capitalisées.

### Règle CONTENU-01 — Minimum 1000 mots visibles par page

Toute page de leçon publiée et indexable doit dépasser **1000 mots visibles** (texte
effectivement rendu, hors HTML / JSON-LD / attributs).
- **Pourquoi** : seuil content-rich validé empiriquement dans GSC — en dessous de ~600 mots,
  les pages restaient en « Explorées, actuellement non indexées ».
- **Comment** : à la fin de chaque dry-run d'enrichissement, mesurer les mots visibles et
  **bumper toute leçon sous 1000 mots** AVANT injection réelle.
- **Statut** : règle permanente — aucune exception en prod indexable.

### Règle CONTENU-02 — Couverture CM2 → 3ème complète

Toute matière **démarre au CM2 et se termine en 3ème** : 5 niveaux (CM2, 6ème, 5ème, 4ème, 3ème),
8 leçons / niveau = 40 leçons / matière.
- Une matière n'est « livrable indexable » que lorsque **ses 5 niveaux** respectent CONTENU-01.
- Pas de niveau orphelin indexé sans ses voisins (cohérence parcours + maillage interne).

---

## 🏆 BILAN — Enrichissement v3 terminé (240 leçons) — 07/06/2026

L'enrichissement SEO/AEO v3 est **complet** : 6 matières × 5 niveaux × 8 leçons = **240 leçons**,
toutes > 1000 mots visibles (détail dans `PLAN_ACTION.md`, section « ENRICHISSEMENT v3 — 240
LEÇONS COMPLÈTES »). Dernier lot : Sciences 3ème.

**Méta-leçon** : l'invariant du workflow d'enrichissement (discovery → calibrage du mock au minimum
réel → dry-run gate → injection → vérif sec/cta/html + mots → commit/push) a tenu sur les 240 leçons
sans régression. À reconduire à l'identique pour toute future matière / monde.

---

## ⏭️ BACKLOG — Phase 7 (encore ouvert)

**Phase 7 — Cleanup DB + fix trigger `child_profiles`** :
- DROP RPC `lookup_child_by_pin`, table `pin_attempts`, colonnes `pin_hash` / `pin`.
- **Bug à corriger** : boucle de trigger **BEFORE** sur DELETE de `child_profiles` (ERROR 27000).
  Le chemin de suppression correct = **supprimer depuis `auth.users`** et laisser le FK CASCADE
  nettoyer `child_profiles`. **Ne JAMAIS** faire un DELETE direct sur `child_profiles`.

---

*Règles permanentes CONTENU-01 / CONTENU-02 + bilan v3 ajoutés le 07 juin 2026.*
