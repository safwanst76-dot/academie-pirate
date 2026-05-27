# 🏗️ ARCHITECTURE AUTH V2 — Pattern A (Supabase Auth Children)
*Document fondateur — Décidé le 26 mai 2026*
*Source de vérité pour le système d'authentification de Académie Pirate*

---

## 🎯 OBJECTIF

Construire un système d'authentification **robuste, scalable, multi-device**,
compatible web + app mobile iOS/Android, conforme RGPD enfants, et qui place
le projet dans le **top 1% mondial** des plateformes edtech enfants.

---

## 📊 CONTEXTE — Pourquoi cette refonte

### Architecture précédente (fragile)
- L'enfant n'avait PAS de compte Supabase Auth
- Hack : stockage des tokens du PARENT dans localStorage
- Quand l'enfant se connectait par PIN → on restaurait la session parent
- Résultat : auth.uid() = parent.id quand l'enfant agissait
- RLS policies basées sur parent_id = auth.uid()

### Problèmes identifiés (26/05/2026)
- 🚨 Faille RLS critique : `anon_pin_lookup` exposait toute la table child_profiles
- 🚨 Bug INSERT silencieux : quiz-engine.js sauvait sans child_id
- 🚨 Sessions perdues : tokens parent absents → RLS bloque INSERT
- 🚨 Multi-device cassé : localStorage pas partagé entre devices
- 🚨 Mobile incompatible : WebView/native = localStorage différent
- 🚨 Migration mobile impossible sans cette refonte

### Solution choisie : Pattern A — Supabase Auth pour les enfants

Chaque enfant a un **vrai compte Supabase Auth** avec :
- email synthétique : `{username}@aca-pirate.ch` (unique)
- password : PIN du parent (hashé côté Supabase)
- JWT propre → auth.uid() = child's auth_user_id

---

## 🏛️ ARCHITECTURE CIBLE

### Tables Supabase
auth.users                    (table système Supabase, contient les comptes Auth)
├─ id (uuid)
├─ email (varchar)
└─ encrypted_password (varchar)
public.child_profiles         (table métier, enrichie)
├─ id (uuid, PK)
├─ parent_id (uuid, FK profiles_parents)
├─ username (text, UNIQUE)         ← contrainte ajoutée
├─ email_login (text, UNIQUE)      ← NOUVEAU : "taim@aca-pirate.ch"
├─ auth_user_id (uuid, FK auth.users) ← NOUVEAU : lien avec compte Auth
├─ avatar_id (text)
├─ pin (text)                      ← gardé pour rétro-compatibilité brève
├─ pin_hash (text)                 ← gardé temporaire
├─ xp_total (int)
├─ level (int)
├─ created_at (timestamptz)
└─ updated_at (timestamptz)

### Flow de création enfant (parent connecté)

Parent clique "Ajouter un aventurier"
Saisit : username = "Taim", PIN = "1234", avatar
Frontend valide : username unique (check side-client)
Frontend appelle Edge Function "child-signup" :
POST /functions/v1/child-signup
{ username: "Taim", pin: "1234", avatar_id: "luffy" }
Authorization: Bearer <parent's JWT>
Edge Function (verify_jwt) :

Vérifie que le parent est authentifié
Vérifie username pas déjà pris (DB lookup)
Génère email_login = "taim@aca-pirate.ch" (lowercase + slug)
Crée compte Supabase Auth via auth.admin.createUser()
INSERT child_profiles avec parent_id, auth_user_id, email_login
Retourne le profil créé


Frontend reçoit confirmation → refresh dashboard parent


### Flow de login enfant (page login publique)

Enfant arrive sur https://aca-pirate.ch/ → onglet "Enfant"
Saisit son PIN (le seul truc qu'il connaît)
Frontend appelle RPC child_email_by_username (lookup léger)
→ retourne l'email correspondant au username + PIN
OU
Frontend demande directement : "Quel est ton prénom ?" + "Ton code ?"
sb.auth.signInWithPassword({
email: "taim@aca-pirate.ch",
password: "1234"
})
JWT enfant créé → auth.uid() = child.auth_user_id
Toutes les RLS policies fonctionnent naturellement
INSERT progressions → RLS check auth.uid() = child.auth_user_id ✅


### Flow d'accès parent → progression enfant
Parent connecté avec son JWT (auth.uid() = parent.id)
RLS policy progressions :
USING (
child_id IN (
SELECT id FROM child_profiles WHERE parent_id = auth.uid()
)
)
→ Parent voit TOUTES les progressions de ses enfants ✅
→ Enfant ne voit QUE sa propre progression

---

## 🛡️ SÉCURITÉ

### Rate limiting
- Supabase Auth a un rate limit natif sur signInWithPassword
- + notre table pin_attempts existante (héritée du fix faille #1)

### Password (PIN)
- Hashé par Supabase Auth (bcrypt natif)
- Jamais stocké en clair en DB après migration
- pin_hash custom progressivement supprimé

### Anti-énumération
- L'erreur signInWithPassword est générique "Invalid credentials"
- Impossible de distinguer "username inexistant" de "PIN incorrect"

### Reset PIN
- Le parent peut reset le PIN d'un enfant depuis le dashboard
- Bouton "Réinitialiser le code secret"
- Appelle Edge Function "reset-child-pin" (verify_jwt parent)

---

## 📋 RÈGLES DE NOMMAGE

### Email enfant (email_login)
Format : {username_slug}@aca-pirate.ch
Slug rules :

lowercase
accents removed (é→e, à→a, ç→c)
spaces removed
only [a-z0-9_-]
length 2-30 chars

Examples :
"Taim"           → taim@aca-pirate.ch
"Léa Bonheur"    → leabonheur@aca-pirate.ch
"TomPirate123"   → tompirate123@aca-pirate.ch
"Hassan_Ali"     → hassan_ali@aca-pirate.ch

### Collision : refus de création

Si username (slugified) déjà pris :
- Frontend affiche : "Ce nom d'aventurier est déjà pris, choisis-en un autre"
- Backend retourne 409 Conflict
- L'utilisateur DOIT changer le username

---

## 🚀 PLAN DE MIGRATION (7 PHASES)

| Phase | Durée | Description |
|-------|-------|-------------|
| 0 | 30min | Documentation (ce fichier) |
| 1 | 30min | DB schema : colonnes email_login, auth_user_id sur child_profiles |
| 2 | 1h    | Edge Function child-signup |
| 3 | 30min | RLS policies update |
| 4 | 45min | Migration des 22 enfants existants (script atomique) |
| 5 | 1h    | Frontend : login enfant via sb.auth.signInWithPassword |
| 6 | 30min | Email récapitulatif aux parents |
| 7 | 30min | Cleanup : suppression du hack tokens + RPC lookup_child_by_pin |

**TOTAL : 4-5h** de travail propre, testé phase par phase.

---

## 📧 EMAIL POST-MIGRATION AUX PARENTS

### Sujet
🏴‍☠️ Académie Pirate : nouveau système de connexion pour vos enfants

### Template
Bonjour {prenom},
Bonne nouvelle ! Nous venons d'améliorer le système de connexion d'Académie
Pirate pour offrir à vos enfants une expérience encore plus fluide,
sécurisée, et compatible avec notre future application mobile iOS/Android.
🎯 CE QUI CHANGE
Chaque aventurier a maintenant son propre compte (lié au vôtre),
ce qui nous permet de :

Sauvegarder en temps réel sa progression sur tous ses devices
Vous donner accès au détail de TOUS ses quiz et résultats
Préparer la transition vers notre app mobile (sortie prévue été 2026)

🔑 COMMENT VOS ENFANTS SE CONNECTENT MAINTENANT
Voici la liste de vos aventuriers et leurs nouveaux identifiants :
⚓ {child_username}
Email de connexion : {email_login}
Code secret : celui que vous lui avez choisi (inchangé)
[répéter pour chaque enfant]
🌐 OÙ SE CONNECTER
Sur https://aca-pirate.ch → onglet "Enfant" → entrer le code secret
🛠️ VOUS AVEZ UN PROBLÈME ?

Code secret oublié ? Connectez-vous à votre espace parent et utilisez
le bouton "Réinitialiser le code secret" sur la carte de l'enfant.
Email pas connu de l'enfant ? Pas grave : il suffit de taper son code
secret depuis la page d'accueil.

📊 DÉSORMAIS, VOUS POUVEZ VOIR
Dans votre espace parent, cliquez sur la carte de votre enfant pour
accéder à un nouveau tableau de bord détaillé :

Tous les quiz qu'il a faits
Ses scores par île, par matière, par niveau
Son temps de jeu cumulé
Ses badges débloqués

Merci pour votre confiance,
L'équipe Académie Pirate ⚓

---

## ✅ ENGAGEMENT QUALITÉ

Ce chantier respecte :
- **PROD-01** : audit avant chaque modif, format vérifié
- **NR-01** : 0 régression utilisateur (migration transparente côté UX)
- **RGPD** : minimisation données, consentement parental clair
- **AU-01** : assets et tokens via Supabase, jamais en clair
- **BIZ-01** : two-faced public/interne uniforme

Et vise le **standard top 1% mondial** des plateformes edtech enfants :
- Duolingo Kids, Khan Academy Kids, ABCmouse → même architecture
- Compatible iOS/Android natif (préparation app mobile été 2026)
- Scalable à des millions d'enfants

---

*ARCHITECTURE AUTH V2 — Académie Pirate — 26 Mai 2026*
*Document VIVANT : à mettre à jour à chaque évolution du flow auth*
