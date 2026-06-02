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
*Document VIVANT : à mettre à jour à chaque erreur capitalisée*
---

## 🏆 PATTERN A — 6 PHASES BACKEND + FRONTEND COMPLÈTES (28/05/2026)

**Contexte initial** :
Le système d'auth des enfants reposait sur un hack : login via PIN seul, puis
restauration manuelle des tokens parent depuis localStorage. Conséquences :
- `auth.uid()` retournait le parent.id dans le contexte enfant (FAUX)
- RLS impossible à écrire proprement
- Multi-device cassé (les tokens stockés sur PC ne suivaient pas sur mobile)
- Sécurité dégradée (tokens parent en localStorage)

**Objectif Pattern A** :
Chaque enfant a un VRAI compte Supabase Auth avec email/password natifs.
- email = `{slug(username)}@aca-pirate.ch` (UNIQUE garanti)
- password = PIN choisi par le parent
- Login natif via `sb.auth.signInWithPassword({ email, password })`
- JWT enfant avec `auth.uid() = child.auth_user_id`
- RLS `child_*` policies fonctionnent naturellement

### Phase 0 — Documentation fondateur (27/05/2026)

**Livrable** : `ARCHITECTURE_AUTH_V2.md` (244 lignes)
- Schéma cible avec exemples SQL
- Flow de création d'enfant via Edge Function
- Flow de login natif enfant
- Plan en 7 phases
- Règle nouvelle : **OUTPUT-01** ajoutée dans `GRAND_BLEU_PATTERN.md` Piège #11
  (livrables longs = `create_file` + `present_files`, jamais heredocs bash)

**Commit** : `c48f564 docs(architecture): Pattern A Supabase Auth enfants + règle OUTPUT-01`

### Phase 1 — DB Schema + Cleanup doublons (27/05/2026)

**Modifications schéma `child_profiles`** :
- `ALTER TABLE child_profiles ADD COLUMN email_login text UNIQUE`
- `ALTER TABLE child_profiles ADD COLUMN auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE`
- `CREATE INDEX idx_child_profiles_auth_user_id`

**Nettoyage des doublons préalable** :
Avant Pattern A, plusieurs enfants pouvaient avoir le même username.
6 doublons identifiés et supprimés :
- `taim ×2` → gardé celui avec 26 progressions (`2fed0402...`)
- `timo ×3` → tous supprimés (test sans progression)
- `adam ×1` → gardé celui avec parent `elfeshawey0`
- `Saf` → supprimé (pin = null, invalide)

→ `UNIQUE(username)` activée
→ 20 enfants restants éligibles à la migration Pattern A

### Phase 2 — Edge Function `child-signup` (27/05/2026)

**Livrable** : `supabase/functions/child-signup/index.ts` (231 lignes TypeScript Deno)

Endpoint Supabase Edge Function qui :
1. Valide les inputs (username 2-30 chars, pin 4-20 chars)
2. Slugifie le username (lowercase, retire accents, [a-z0-9_-])
3. Vérifie l'unicité `email_login` (collision → HTTP 409)
4. Crée le compte via `auth.admin.createUser()`
5. Crée le profil dans `child_profiles` avec `auth_user_id = newAuth.id`
6. Si UPDATE child échoue → ROLLBACK (supprime le compte Auth créé)
7. Retourne `{ child_id, email_login, auth_user_id }`

**Sécurité** :
- `verify_jwt: true` dans `config.toml` → parent doit être authentifié
- Vérifie `parent_id` correspond au JWT
- Logs anti-énumération

**Test prod (27/05)** :
- Création `TestPirate` OK
- Anti-collision 409 OK
- Login `signInWithPassword` OK avec `auth.uid() = 72ce2267...`

**Commit** : `77443a9 feat(auth): edge function child-signup (Pattern A Phase 2)`

### Phase 3 — RLS Policies + Trigger CASCADE (27/05/2026)

**8 nouvelles policies `child_*` créées** sur 6 tables :

| Policy                             | Table                | Effet                                    |
|------------------------------------|----------------------|------------------------------------------|
| `child_sees_self`                  | `child_profiles`     | Enfant lit son propre profil            |
| `child_updates_self`               | `child_profiles`     | Enfant met à jour son profil (avatar, xp)|
| `child_manages_own_progressions`   | `progressions`       | INSERT/UPDATE/SELECT propres seulement   |
| `child_manages_own_badges`         | `child_badges`       | INSERT/SELECT propres                    |
| `child_manages_own_sessions`       | `session_recaps`     | INSERT/SELECT propres                    |
| `child_manages_own_dailies`        | `daily_rewards`      | INSERT/SELECT propres                    |
| `child_manages_own_push`           | `push_subscriptions` | INSERT/UPDATE/DELETE/SELECT propres      |
| `child_sees_own_analytics`         | `funnel_sessions`    | SELECT propres seulement                 |

**Trigger CASCADE** :
- `trg_cascade_delete_auth_user` : BEFORE DELETE on `child_profiles` → DELETE de `auth.users`
- Function `delete_auth_user_on_child_delete()` SECURITY DEFINER

Note : `ON DELETE CASCADE` natif allait dans le mauvais sens (auth.users → child_profiles).
Le trigger comble le besoin inverse pour propager le delete enfant → compte Auth.

**Vérifications** : 4/4 OK, 0 orphelin.

### Phase 4 — Migration 20 enfants legacy (27/05/2026)

**Livrable** : `scripts/migrate-children-to-auth.js` (228 lignes Node.js)

Script de migration idempotent qui :
1. Liste les enfants où `auth_user_id IS NULL`
2. Pour chacun : slugify username → email_login
3. Crée compte Auth via `auth.admin.createUser({ email, password: pin })`
4. UPDATE `child_profiles SET email_login, auth_user_id`
5. Rollback automatique si l'UPDATE échoue

**Modes du script** :
- `--dry-run` : aperçu sans modif
- `--only=USERNAME` : test sur 1 enfant
- (sans flag) : migre tout le reste

**Exécution prod (27/05)** :
- 1 test d'abord : `--only=tito` → OK
- Puis les 19 restants en un coup → 19 OK / 0 skip / 0 erreur
- **Total migré : 20/20 enfants** (taim, tito, Léa, NAÏM, Tess', Ismo 95, etc.)
- Slugify validé : Léa→lea, NAÏM→naim, Tess'→tess, Ismo 95→ismo95, digiMOS→digimos
- Login natif testé : `tito@aca-pirate.ch` + PIN → JWT enfant créé

**Vérifications finales** :
- 20/20 migrés ✅
- 20 comptes Auth créés ✅
- 0 orphelin ✅
- Tableau récap : tous les enfants groupés par parent

**Commit** : `2160ea0 feat(migration): Phase 4 — script de migration enfants legacy`

### Phase 5 — Frontend Pattern A natif (28/05/2026) — AVEC PÉRIPÉTIES

**Décision UX importante (28/05)** :
PIN seul insuffisant car certains enfants partagent le même PIN (ex: taim et tito
ont tous deux `081214`). Solution adoptée : **username + PIN** (standard Duolingo
Kids / Khan Academy Kids). Plus de RPC `lookup_child_by_pin` au login : le
frontend slugifie le username, reconstitue l'email_login, appelle
`signInWithPassword` directement.

**Tentatives** :
- ❌ Première tentative (script `phase5_full_username_pin.sh`) :
  Le script Python utilisait un parseur d'accolades maison pour trouver la fin de
  `afSubmitChildPinLogin`. Bug : a coupé au mauvais endroit → bloc `} catch (e) {`
  orphelin ligne 1397. **Le script a quand même committé et pushé en prod** car
  pas de `node --check` fatal. **Cloudflare a déployé du code cassé**.

- ✅ Recovery : `git revert HEAD` × 2 (un de trop = revert du revert), puis
  un 3e revert pour stabiliser. Site OK à nouveau.

- ✅ Seconde tentative (`phase5_v2_robust.sh`) — version BLINDÉE :
  - Backup `.bak` automatique avant modif
  - `trap ERR` pour rollback auto si erreur
  - `node --check` FATAL avec `exit 1` si syntaxe KO
  - Pas de parser maison : `str_replace` exact sur bloc complet
  - Pause confirmation utilisateur avant commit
  - Idempotent (skip si déjà migré)

**Modifications appliquées** :

`index.html` (lignes 125-160) :
- Titre `Entre ton code secret` → `Connexion Aventurier`
- Hint `Ton parent t'a donné un code...` → `Ton prénom de pirate + ton code secret`
- Nouveau `#login-child-username-field` AVANT le PIN (même style)
- Enter sur username → focus sur PIN (UX naturel)

`js/auth.js` :
- `afSubmitChildPinLogin` réécrit :
  - Lit username + pin
  - Slugify (lowercase, NFD normalize, [a-z0-9_-])
  - `email = slug + '@aca-pirate.ch'`
  - `sb.auth.signInWithPassword({ email, password: pin })`
  - `SELECT child_profiles WHERE auth_user_id = auth.uid()` (RLS naturelle)
  - Erreur générique anti-énumération si échec
- `afLaunchChild` simplifié :
  - 32 lignes du hack `ap_child_tokens_*` supprimées
  - Remplacé par simple `getSession()` pour `_authUser`

**Test prod validé (28/05)** :
```
auth.js:1364 [PIN login] ✅ Session créée — auth.uid: f9a26a58...
auth.js:1040 [auth] session active — auth.uid: f9a26a58...
```

(`f9a26a58...` = auth_user_id de tito, pas du parent → Pattern A confirmé)

**Commit** : `ac8caeb feat(auth): Phase 5 — login enfant Pattern A natif (username + PIN)`

### 📊 État final Pattern A au 28/05/2026

✅ Phase 0 — Doc fondateur (c48f564)
✅ Phase 1 — DB schema + cleanup 6 doublons
✅ Phase 2 — Edge Function child-signup (77443a9)
✅ Phase 3 — RLS policies + trigger CASCADE
✅ Phase 4 — Migration 20 enfants legacy (2160ea0)
✅ Phase 5 — Frontend Pattern A natif (ac8caeb)

🎯 RESTANT :
- [ ] **Phase 5.4** — `_createChildProfile` via Edge Function `child-signup`
  (création de NOUVEAUX enfants depuis dashboard parent)
- [ ] **Phase 6** — Email récapitulatif aux parents avec les credentials enfant
- [ ] **Phase 7** — Cleanup final :
  - DROP RPC `lookup_child_by_pin` (devenue inutile)
  - DROP table `pin_attempts` (rate limit natif Supabase suffit)
  - Suppression colonnes `pin_hash` (Supabase Auth gère bcrypt)
  - Mise à jour `LESSONS_LEARNED.md`

---

## 🔍 GSC JOUR 7 — Enrichissement SEO français 3ème batch 1A (28/05/2026)

**Contexte** :
Sur l'export GSC du 28/05, 12 pages étaient en `Explorées, actuellement non indexées`.
Causes identifiées : contenu trop court (~566 mots, sous le seuil Google content-rich).

**Stratégie validée** :
Compléter avec ~400 mots manquants par leçon (au lieu de réécrire).
Travailler par BATCH cohérent : matière × niveau.
Premier batch : Français 3ème (4 sur 8 leçons).

**Livrables** :
- `scripts/seo/enrichments-francais-3eme-batch-1a.json` (contenu enrichi structuré)
- `scripts/seo/enrich-lesson-content.py` (script Python réutilisable d'injection)

**Sources consultées (rédaction ORIGINALE inspirée)** :
- Eduscol.education.fr (programmes officiels Éducation Nationale)
- Lelivrescolaire.fr (fiches notion)
- Maxicours.com, EspaceFrancais.com
- Wikipédia (concordance des temps, dialectique)

**4 leçons enrichies (Sous-batch 1A)** :

| Slug                                              | Hero            | Notion                              | Avant | Après | Δ     |
|---------------------------------------------------|-----------------|-------------------------------------|-------|-------|-------|
| argumentation-these-antithese-synthese            | Boa Hancock     | Argumentation TAS                   | 566   | ~1000 | +434  |
| l-expression-de-la-cause-et-de-la-consequence     | Trafalgar D. Law| Cause / conséquence                 | 646   | 1018  | +372  |
| l-expression-du-but-et-de-la-condition            | Tony Tony Chopper| But / condition                    | 626   | 1028  | +402  |
| la-concordance-des-temps                          | Usopp           | Concordance temps                   | 548   | 877   | +329  |

**Sections injectées par leçon** :
- 📖 Comprendre en profondeur (encadré bleu, ~200 mots)
- 🎯 Méthode étape par étape (liste numérotée 5-6 étapes)
- 🚫 Erreurs courantes à éviter (encadré rouge, 4 pièges Brevet)

**GSC J7 — 4 URLs demandées en indexation (28/05/2026)** :
1. https://aca-pirate.ch/grand-bleu/francais/3eme/argumentation-these-antithese-synthese/
2. https://aca-pirate.ch/grand-bleu/francais/3eme/l-expression-de-la-cause-et-de-la-consequence/
3. https://aca-pirate.ch/grand-bleu/francais/3eme/l-expression-du-but-et-de-la-condition/
4. https://aca-pirate.ch/grand-bleu/francais/3eme/la-concordance-des-temps/

**Actions GSC complémentaires fait le 28/05** :
- "Valider le correctif" sur 33 pages `Exclue par noindex` (anciennes POC qui redirigent 301)
- "Valider le correctif" sur 12 pages `Doublons canoniques`

**Cumul GSC J1-J7** : 51 + 4 = **55 URLs prioritaires demandées**

**Commits** :
- `4e27f25 feat(seo): enrichissement contenu — sous-batch 1A français 3ème (4 leçons)`
- `d72caf1 chore: ignore __pycache__ Python cache files`

**Prochaines étapes SEO** :
- [ ] Mesurer l'impact dans 2 semaines (les 4 URLs passent-elles de
  "Explorée non indexée" à "Indexée" ?)
- [ ] Si succès → industrialiser sur **sous-batch 1B** (4 dernières leçons français 3ème) :
  - les-modalisateurs (Nefertari Vivi)
  - synthese-brevet-grammaire-et-orthographe (Sabo)
  - l-expression-ecrite-synthese-brevet (Jinbe)
  - les-figures-de-style-personnification-oxymore (Shanks)
- [ ] Puis maths 3ème, anglais 3ème, etc.
- [ ] GSC J8, J9, J10... — continuer l'indexation quotidienne

---

## 🎯 PROCHAINES ÉTAPES — Roadmap au 28/05/2026

### Chantier A — SEO (quotidien, arrière-plan)
- [ ] GSC J8+ : continuer indexations
- [ ] Sous-batch 1B français 3ème (4 leçons restantes)
- [ ] Étendre enrichissement à maths 3ème, anglais 3ème, puis 4ème, 5ème, etc.

### Chantier B — Pattern A finalisation
- [ ] **Phase 5.4** — `_createChildProfile` via Edge Function child-signup
- [ ] **Phase 6** — Email récap parents
- [ ] **Phase 7** — Cleanup (DROP lookup_child_by_pin, pin_hash, pin_attempts)

### Chantier C — Nouveaux mondes
- [ ] Sindria (langue arabe × Magi) — différé après Phase 5.4

---

*Mise à jour : 28 mai 2026*