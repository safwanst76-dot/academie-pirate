# 🏴‍☠️ ROADMAP — Académie Pirate

## 🚨 PRIORITÉ #1 — SEO : Audit pages vides + noindex (cette semaine)

**Risque concret** : ~200 pages SEO sur 277 pointent actuellement vers du contenu inexistant (quiz pas encore développés en V2 DB pour 6ème/5ème/4ème/3ème). Bounce rate élevé attendu → algorithme Google Helpful Content Update peut **déclasser le site entier sous 60-120 jours**.

**Si on ne fait rien** : tout le travail SEO/maillage/IndexNow des dernières sessions risque de devenir contre-productif.

### Actions immédiates

- [ ] Audit page par page : vérifier pour chaque `/matiere/niveau/perso-notion/` que le quiz existe vraiment en prod
- [ ] Pour les pages sans quiz : ajouter `<meta name="robots" content="noindex,nofollow">` dans le head
- [ ] CTA honnête sur ces pages : "Quiz en développement — reviens en septembre 2026"
- [ ] Mettre à jour `sitemap.xml` : ne lister que les pages avec contenu prod réel
- [ ] Resoumettre sitemap dans GSC + IndexNow après nettoyage

### Critère de validation

- 0 page SEO indexable qui pointe vers un quiz inexistant
- Sitemap.xml ne contient que les pages avec contenu prod
- Test : inspecter 10 URLs random dans GSC → 100% trouvent un quiz fonctionnel

**Temps estimé** : 4-6h
**Détail complet** : voir `PLAN_ACTION.md` section P0.1

---

## ⚡ Priorités P0 suivantes (cette semaine)

2. **P0.2** — RGPD enfants + mentions légales (évite sanction CNIL)
3. **P0.3** — Disclaimer IP manga (réduit risque DMCA)

Les détails (risques, actions, critères) sont dans `PLAN_ACTION.md`.

---

## ✅ Fait
- Avatars locaux multi-univers
- Login magic link Supabase + code secret alphanumérique
- Connexion DB Supabase (Zurich 🇨🇭)
- GitHub Pages déployé + domaine custom aca-pirate.ch
- SEO complet : 277 pages indexables, sitemap, robots.txt, llms.txt
- Maillage interne : 870 liens contextuels intra-site
- IndexNow Yandex (Bing en cours de vérification)
- Avatar universel : 51 personnages, 5 univers
- English V2 complet : 4 niveaux CM2 → 4ème, 352 questions en DB
- Règle BIZ-01 documentée dans ARCHITECTURE_V2.md

## 🔜 Chantiers (à arbitrer en début de session)
- [ ] Sauvegarde progression en DB (remplacer localStorage)
- [ ] Dashboard parent (suivi progression enfant)
- [ ] Phase 4 — Contenu V2 toutes matières (niveaux 6ème/5ème/4ème en DB)
- [ ] Phase 2 — Admin onglet Contenu (CRUD questions sans code)
- [ ] Phase 3b — Leçon dialoguée (bulle manga, prénom enfant)
- [ ] Refactorisation repo progressif (CSS séparés, JS modulaire)
- [ ] RGPD complet (données enfants)

## 🏗️ Architecture cible
- [ ] Migration progressive vers architecture modulaire (IIFE + tokens.css + api.js + events.js)
- [ ] PWA / Capacitor pour iOS / Android (APP-01)

## 💰 Modèle économique — RÈGLE BIZ-01

**100% gratuit, sans publicité — apprendre en s'amusant.**

Voir `ARCHITECTURE_V2.md` → Règle BIZ-01 pour les wordings autorisés/interdits.
Aucune monétisation prévue. Pas de Stripe, pas d'abonnement, pas de freemium.
Toute modification de ce modèle nécessite la validation explicite du propriétaire du projet.
