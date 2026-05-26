# 🔐 SECURITY AUDIT — Académie Pirate
*Audit complet sécurité Supabase RLS + CSP + RGPD*
*Démarré 22 mai 2026 — Document VIVANT*

---

## 📋 SOMMAIRE

1. État RLS Supabase (21 tables auditées)
2. Failles critiques détectées + corrections
3. Findings secondaires à traiter
4. CSP & frontend (à auditer)
5. RGPD enfants (à auditer)
6. Edge functions (à auditer)
7. Plan d'action priorisé

---

## 1️⃣ ÉTAT RLS SUPABASE — Audit du 22 mai 2026

### 21 tables auditées : TOUTES ont RLS ENABLED ✅
analytics_events · badges_unlocked · chapitres · child_profiles · content_releases
daily_rewards · email_log · funnel_sessions · island_assets · lecons · matieres
niveaux · parents · profiles · profiles_parents · progression · progressions
push_subscriptions · questions · sessions · pin_attempts (ajoutée le 22/05)

### Auto-enable RLS pour nouvelles tables : ✅ ACTIVÉ

### 49 policies inventoriées et décodées
SQL utilisé : `SELECT * FROM pg_policies WHERE schemaname = 'public'`

---

## 2️⃣ FAILLES CRITIQUES DÉTECTÉES + CORRECTIONS

### 🚨 FAILLE #1 — child_profiles.anon_pin_lookup — CORRIGÉE ✅

**Policy vulnérable (avant)** :
```sql
CREATE POLICY anon_pin_lookup ON child_profiles
  FOR SELECT TO anon
  USING (true);   -- ⚠️ AUCUN FILTRE
```

**Impact** : Anon avec l'anon key publique pouvait lire TOUS les profils enfants.

**Correctif appliqué (22/05/2026)** :
1. Création table `pin_attempts` (rate limiting)
2. Création fonction `lookup_child_by_pin(pin_input)` SECURITY DEFINER
3. Migration `js/auth.js:afSubmitChildPinLogin` → `sb.rpc(...)`
4. DROP POLICY anon_pin_lookup

**Vérification post-fix** :
- ✅ Login enfant fonctionne via RPC
- ✅ `sb.from('child_profiles').select('*')` anon retourne `[]`
- ✅ Rate limiting opérationnel (5 fails/15min)

### 🚨 FAILLE #2 — progressions.users_own_progressions — À CORRIGER

**Policy vulnérable** :
```sql
CREATE POLICY users_own_progressions ON progressions
  FOR ALL TO public
  USING (true)
  WITH CHECK (true);   -- ⚠️ AUCUN FILTRE
```

**Impact** : N'importe quel anon peut SELECT/INSERT/UPDATE/DELETE toutes les progressions.

**Correctif prévu** :
```sql
DROP POLICY IF EXISTS users_own_progressions ON progressions;
CREATE POLICY user_own_progressions ON progressions
  FOR ALL TO authenticated
  USING (child_id IN (SELECT id FROM child_profiles WHERE parent_id = auth.uid()))
  WITH CHECK (child_id IN (SELECT id FROM child_profiles WHERE parent_id = auth.uid()));
```

---

## 3️⃣ FINDINGS SECONDAIRES À TRAITER

| # | Table | Policy | Risque | Action prévue |
|---|-------|--------|--------|---------------|
| P3 | badges_unlocked | badges-select-auth | SELECT public sans filtre | Restreindre par child_id |
| P4 | badges_unlocked | badges-insert-auth | INSERT WITH CHECK=true | Valider child_id appartient |
| P4 | daily_rewards | daily-insert-auth | INSERT WITH CHECK=true | Valider child_id appartient |
| P4 | funnel_sessions | funnel-insert-anon | INSERT WITH CHECK=true | OK pour analytics anon |
| P5 | content_releases | authenticated_update_releases | UPDATE par tout user auth | Restreindre à admin |
| P6 | funnel_sessions | anon_update_funnel | UPDATE tout anon toute session | Restreindre par session_id |
| P7 | profiles | DOUBLON policies | "Users can manage" ET "enfant voit ses données" | Nettoyer |
| P7 | profiles_parents | DOUBLON policies | "parent voit ses données" ET "user_own_profile" | Nettoyer |
| P8 | progression + progressions | 2 tables similaires | Legacy à clarifier | Audit fonctionnel + migration |

---

## 4️⃣ CSP & FRONTEND (à auditer)

À faire :
- [ ] index.html : présence meta CSP ?
- [ ] Cloudflare : Content-Security-Policy header ?
- [ ] Inputs utilisateur (PIN, username) : sanitisation correcte ?
- [ ] innerHTML utilisé quelque part ? (vecteur XSS)
- [ ] document.write() utilisé ?
- [ ] eval() ou Function() utilisés ?
- [ ] SUPABASE_ANON_KEY exposé : OK (public par design)

---

## 5️⃣ RGPD ENFANTS (à auditer)

À faire :
- [ ] PRIVACY_POLICY.md : politique de confidentialité publique
- [ ] CGU.md : conditions générales d'utilisation
- [ ] Consentement parental explicite + traçable (consent_date OK dans profiles_parents)
- [ ] Minimisation données enfants (vérifier table child_profiles)
- [ ] Droit à l'oubli : UI parent pour supprimer compte enfant
- [ ] Cookies/analytics : bannière consentement
- [ ] Hébergement EU (Supabase EU region ?)
- [ ] DPO/DPD désigné ?
- [ ] Registre des traitements

---

## 6️⃣ EDGE FUNCTIONS (à auditer)

Fonctions présentes :
- send-notification : `verify_jwt = true` ✅
- send-push : config à compléter ⚠️
- send-content-email : config à compléter ⚠️

À faire :
- [ ] Rate limiting sur les 3 fonctions
- [ ] Logging sans secrets
- [ ] Validation inputs

---

## 7️⃣ PLAN D'ACTION PRIORISÉ

### ✅ FAIT (22/05/2026)
- Audit complet 21 tables Supabase
- Correction faille #1 (anon_pin_lookup)
- Migration JS auth.js vers RPC sécurisée
- Rate limiting login enfant
- Documentation LESSONS_LEARNED.md erreur #5

### 🔴 PROCHAINE SESSION SÉCURITÉ
- Correction faille #2 (users_own_progressions)
- Nettoyage doublons policies profiles + profiles_parents
- Audit CSP + sanitization frontend

### 🟡 SESSIONS ULTÉRIEURES
- Création PRIVACY_POLICY.md + CGU.md
- Audit fonctionnel progression vs progressions
- Edge functions config complète
- Bannière cookies
- 5 alertes console détectées en passant

---

*SECURITY AUDIT V1.0 — Académie Pirate — 22 Mai 2026*
*À ENRICHIR à chaque audit ultérieur*
