// ═══════════════════════════════════════════════════════════════
// LESSON-DATA-PAYS-DU-FEU.JS V3 — Académie Pirate
// Maths × Naruto | CM2 → 3ème — 5 niveaux × 8 leçons = 40 leçons
// Clés composites : 'cm2_1', '6eme_1', etc.
// ═══════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['paysdufeu'] = {
  color      : '#F97316',
  bg         : '#0d0500',
  textAccent : '#fbbf24',
  particles  : 'fire',
  worldName  : 'Pays du Feu',

  // ── Avatars par niveau et numéro ───────────────────────────
  avatars: {
    'cm2':  { 1:'naruto.jpg',   2:'sakura.jpg',    3:'sasuke.png',  4:'kakashi.jpg',
              5:'rock-lee.jpg', 6:'hinata.jpg',    7:'gaara.jpg',   8:'hokage.jpg' },
    '6eme': { 1:'naruto.jpg',   2:'hinata.jpg',    3:'shikamaru.jpg',4:'ino.jpg',
              5:'choji.gif',    6:'tenten.jpg',    7:'neji.jpg',    8:'zabuza.jpg' },
    '5eme': { 1:'naruto.jpg',   2:'sasuke.png',    3:'sakura.jpg',  4:'rock-lee.jpg',
              5:'gaara.jpg',    6:'temari.jpg',     7:'kankuro.jpg', 8:'orochimaru.jpg' },
    '4eme': { 1:'naruto.jpg',   2:'sasuke.png',    3:'sakura.jpg',  4:'kakashi.jpg',
              5:'shikamaru.jpg',6:'hinata.jpg',    7:'rock-lee.jpg',8:'pain.jpg' },
    '3eme': { 1:'naruto.jpg',   2:'sasuke.png',    3:'sakura.jpg',  4:'kakashi.jpg',
              5:'minato.jpg',   6:'jiraiya.jpg',   7:'tsunade.jpg', 8:'madara.jpg' },
  },

  lessons: {

    // ════════════════════════════════════════
    // CM2
    // ════════════════════════════════════════
    'cm2_1': {
      heroName:'Naruto Uzumaki', heroQuote:'Je deviendrai Hokage — et je maîtriserai les milliards !',
      rule:'Un nombre entier se lit par classes de 3 chiffres : milliards | millions | mille | unités',
      sections:[
        { icon:'🔢', title:'Les classes de nombres', color:'#F97316',
          content:'On regroupe les chiffres par <strong>paquets de 3</strong> en partant de la droite.',
          examples:['3 427 000 000 → milliards:3 | millions:427 | mille:000 | unités:000','7 504 321 → 7 millions 504 mille 321'] },
        { icon:'📊', title:'Comparer et arrondir', color:'#ef4444',
          content:'Pour comparer : compte d\'abord les chiffres, puis compare de gauche à droite.',
          examples:['4 500 000 > 4 050 000','4 782 000 ≈ 5 000 000 (7 ≥ 5 en centaines de mille)'] }
      ],
      heroTip:'Naruto : "Sépare les groupes de 3 avec un espace pour ne pas te tromper !"',
      warmup:[{ q:'Chiffres dans un million ?', a:'6', o:['4','5','6','7'] },
              { q:'Chiffre des dizaines de mille dans 347 821 ?', a:'2', o:['3','4','2','8'] }]
    },
    'cm2_2': {
      heroName:'Sakura Haruno', heroQuote:'Une fraction = une potion à moitié préparée !',
      rule:'Fraction a/b : a = parties prises, b = parts égales. Fraction décimale = dénominateur en 10, 100...',
      sections:[
        { icon:'🍕', title:'Lire une fraction', color:'#ec4899',
          content:'<strong>Numérateur</strong> (haut) = parties prises. <strong>Dénominateur</strong> (bas) = parts totales.',
          examples:['3/4 = trois quarts','5/3 > 1 car 5 > 3','1/2 = 2/4 = 0,5'] },
        { icon:'🔄', title:'Fractions et décimaux', color:'#3b82f6',
          content:'Une fraction décimale se convertit facilement : 3/10 = 0,3 | 7/100 = 0,07.',
          examples:['2/5 = 4/10 = 0,4','3/4 = 75/100 = 0,75'] }
      ],
      heroTip:'Sakura : "Pour convertir une fraction en décimal, divise le numérateur par le dénominateur !"',
      warmup:[{ q:'3/4 en décimal ?', a:'0,75', o:['0,34','0,43','0,75','0,25'] },
              { q:'0,6 en fraction ?', a:'6/10', o:['6/10','6/100','3/4','1/6'] }]
    },
    'cm2_3': {
      heroName:'Sasuke Uchiha', heroQuote:'La multiplication, c\'est mon Sharingan — je vois tout !',
      rule:'Multiplication et division : priorité sur + et −. Tables à connaître parfaitement.',
      sections:[
        { icon:'✖️', title:'Multiplication posée', color:'#3b82f6',
          content:'Multiplier chiffre par chiffre, de droite à gauche, en ajoutant les retenues.',
          examples:['47 × 23 = 47×3 + 47×20 = 141 + 940 = 1081','5 × 300 = 1500'] },
        { icon:'➗', title:'Division posée', color:'#8b5cf6',
          content:'Diviser en cherchant combien de fois le diviseur entre dans chaque tranche.',
          examples:['156 ÷ 4 = 39','372 ÷ 6 = 62'] }
      ],
      heroTip:'Sasuke : "La multiplication = addition répétée. 7 × 8 = sept fois 8."',
      warmup:[{ q:'47 × 3 = ?', a:'141', o:['121','141','150','138'] },
              { q:'156 ÷ 4 = ?', a:'39', o:['38','39','40','36'] }]
    },
    'cm2_4': {
      heroName:'Kakashi Hatake', heroQuote:'Désolé d\'être en retard — j\'alignais mes décimaux.',
      rule:'Nombres décimaux : partie entière + virgule + partie décimale. Dixièmes, centièmes, millièmes.',
      sections:[
        { icon:'🔢', title:'Lire les décimaux', color:'#6b7280',
          content:'La virgule sépare la partie entière des décimales : 3,47 → 3 unités, 4 dixièmes, 7 centièmes.',
          examples:['3,47 : 4 = dixièmes, 7 = centièmes','0,05 < 0,5 < 5'] },
        { icon:'📏', title:'Comparer et arrondir', color:'#F97316',
          content:'Arrondir au dixième : regarde le centième. ≥5 → monte. <5 → reste.',
          examples:['6,847 → 6,8 (centième=4<5)','6,85 → 6,9 (centième=5≥5)'] }
      ],
      heroTip:'Kakashi : "Aligne les virgules pour additionner/soustraire des décimaux !"',
      warmup:[{ q:'Centièmes dans 5,374 ?', a:'7', o:['5','3','7','4'] },
              { q:'Arrondi 4,76 au dixième ?', a:'4,8', o:['4,7','4,8','5,0','4,76'] }]
    },

    'cm2_5': {
      heroName:'Rock Lee', heroQuote:'Les conversions ? 1000 répétitions et je les maîtrise !',
      rule:'Convertir les mesures : multiplier ou diviser par 10, 100, 1000 selon l\'unité.',
      sections:[
        { icon:'📏', title:'Longueurs et masses', color:'#22c55e',
          content:'km → m : ×1000 | m → cm : ×100 | kg → g : ×1000 | t → kg : ×1000',
          examples:['3,5 km = 3500 m','2,4 kg = 2400 g','500 cm = 5 m'] },
        { icon:'🕐', title:'Durées et aires', color:'#F97316',
          content:'1h = 60 min | 1 min = 60 s | 1 m² = 10 000 cm²',
          examples:['2h30 = 150 min','1,5 h = 90 min','3 m² = 30 000 cm²'] }
      ],
      heroTip:'Rock Lee : "Pour convertir, demande-toi si tu passes à une unité plus grande ou plus petite !"',
      warmup:[{ q:'3,5 km = ? m', a:'3500', o:['350','3500','35000','0,35'] },
              { q:'2h15min = ? min', a:'135', o:['115','135','125','215'] }]
    },
    'cm2_6': {
      heroName:'Hinata Hyuga', heroQuote:'P-périmètre et aire... je peux le faire !',
      rule:'Périmètre = somme des côtés. Aire = surface occupée. Unités : cm pour P, cm² pour A.',
      sections:[
        { icon:'📐', title:'Périmètres', color:'#a855f7',
          content:'Rectangle : P = 2×(L+l). Carré : P = 4×c. Triangle : P = a+b+c.',
          examples:['Rectangle 5×3 : P = 2×(5+3) = 16 cm','Carré côté 4 : P = 16 cm'] },
        { icon:'🟦', title:'Aires', color:'#ec4899',
          content:'Rectangle : A = L×l. Carré : A = c². Triangle : A = (b×h)÷2.',
          examples:['Rectangle 5×3 : A = 15 cm²','Triangle base 6, hauteur 4 : A = 12 cm²'] }
      ],
      heroTip:'Hinata : "Périmètre = tour du contour. Aire = intérieur. Ne les confonds pas !"',
      warmup:[{ q:'Périmètre rectangle 6×4 ?', a:'20 cm', o:['24 cm','20 cm','10 cm','14 cm'] },
              { q:'Aire carré côté 5 cm ?', a:'25 cm²', o:['20 cm²','25 cm²','10 cm²','50 cm²'] }]
    },
    'cm2_7': {
      heroName:'Gaara', heroQuote:'La géométrie, c\'est mon sable — précis et maîtrisé.',
      rule:'Figures géométriques : reconnaître, nommer, construire. Angles et droites.',
      sections:[
        { icon:'🔺', title:'Polygones et angles', color:'#92400e',
          content:'Triangle (3), carré (4), rectangle (4), pentagone (5)... Angle droit = 90°.',
          examples:['Carré = 4 côtés égaux + 4 angles droits','Losange = 4 côtés égaux (pas forcément 90°)'] },
        { icon:'📏', title:'Droites et symétrie', color:'#22c55e',
          content:'Perpendiculaires ⊥ (angle 90°). Parallèles // (ne se croisent pas). Axe de symétrie = pli miroir.',
          examples:['Les côtés d\'un rectangle sont perpendiculaires','Un carré a 4 axes de symétrie'] }
      ],
      heroTip:'Gaara : "L\'angle droit se reconnaît avec le petit carré. Cherche-le dans les figures !"',
      warmup:[{ q:'Angles droits dans un rectangle ?', a:'4', o:['2','3','4','1'] },
              { q:'Côtés d\'un hexagone ?', a:'6', o:['5','6','7','8'] }]
    },
    'cm2_8': {
      heroName:'Hokage', heroQuote:'La proportionnalité est la loi fondamentale du village !',
      rule:'Tableau de proportionnalité : rapport constant entre deux grandeurs. k = y/x.',
      sections:[
        { icon:'📊', title:'Reconnaître la proportionnalité', color:'#dc2626',
          content:'Si on multiplie une valeur par k, l\'autre est multipliée par le même k.',
          examples:['3 kunais → 12€. 6 kunais → 24€. Coefficient k=4','Non proportionnel : âge et taille'] },
        { icon:'💯', title:'Pourcentages', color:'#F97316',
          content:'p% de N = N × p/100. 50% = moitié. 25% = quart. 10% = dixième.',
          examples:['10% de 80 = 8','25% de 120 = 30','TVA 20% sur 50€ → 50×1,2 = 60€'] }
      ],
      heroTip:'Hokage : "Pour vérifier la proportionnalité : tous les rapports y/x doivent être égaux !"',
      warmup:[{ q:'10% de 150 ?', a:'15', o:['15','150','1,5','50'] },
              { q:'k dans : 4→20, 5→25 ?', a:'5', o:['4','5','8','10'] }]
    },

    // ════════════════════════════════════════
    // 6ÈME
    // ════════════════════════════════════════
    '6eme_1': {
      heroName:'Naruto Uzumaki', heroQuote:'6ème ? Aucun problème pour un futur Hokage !',
      rule:'Numération décimale : lire, écrire, comparer, arrondir les décimaux.',
      sections:[
        { icon:'🔢', title:'Décimaux niveau 6ème', color:'#F97316',
          content:'Chaque chiffre a une position : unités, dixièmes (÷10), centièmes (÷100), millièmes (÷1000).',
          examples:['47,356 : 3=dixièmes, 5=centièmes, 6=millièmes','0,07 < 0,17 < 0,7 (comparer de gauche à droite)'] },
        { icon:'📏', title:'Arrondir et encadrer', color:'#ef4444',
          content:'Arrondir au centième : regarde le millième. Encadrer entre deux décimaux d\'une unité donnée.',
          examples:['6,847 ≈ 6,85 (millième=7≥5)','8 < 8,47 < 9'] }
      ],
      heroTip:'Naruto : "Pour comparer des décimaux, aligne les virgules et compare chiffre par chiffre !"',
      warmup:[{ q:'Centièmes dans 3,742 ?', a:'4', o:['3','7','4','2'] },
              { q:'Arrondi 5,647 au centième ?', a:'5,65', o:['5,6','5,64','5,65','5,7'] }]
    },
    '6eme_2': {
      heroName:'Hinata Hyuga', heroQuote:'Les fractions, c\'est comme partager un onigiri équitablement !',
      rule:'Fractions : simplifier (diviser par PGCD), comparer (même dénominateur), additionner.',
      sections:[
        { icon:'🍕', title:'Fractions équivalentes', color:'#a855f7',
          content:'On peut multiplier/diviser numérateur et dénominateur par le même nombre sans changer la valeur.',
          examples:['2/3 = 4/6 = 6/9 (×2, ×3)','6/9 = 2/3 (÷3, PGCD=3)'] },
        { icon:'➕', title:'Additionner des fractions', color:'#3b82f6',
          content:'Même dénominateur : on additionne les numérateurs. Sinon : on met au même dénominateur (PPCM).',
          examples:['2/7 + 3/7 = 5/7','1/3 + 1/4 = 4/12 + 3/12 = 7/12'] }
      ],
      heroTip:'Hinata : "Pour simplifier, divise numérateur ET dénominateur par leur PGCD !"',
      warmup:[{ q:'2/5 + 2/5 = ?', a:'4/5', o:['4/10','2/5','4/5','1'] },
              { q:'Simplifie 6/9', a:'2/3', o:['2/3','1/2','3/4','6/9'] }]
    },
    '6eme_3': {
      heroName:'Shikamaru Nara', heroQuote:'La proportionnalité... troublant mais résolu.',
      rule:'Tableau proportionnel : rapport k constant. Pourcentages = proportionnalité sur 100.',
      sections:[
        { icon:'📊', title:'Tableau de proportionnalité', color:'#3b82f6',
          content:'Si k = y/x est constant pour toutes les colonnes, la situation est proportionnelle.',
          examples:['3→15 (k=5), 7→35, 10→50','Vitesse constante = proportionnalité'] },
        { icon:'💯', title:'Pourcentages', color:'#F97316',
          content:'p% de N = N × p ÷ 100. Augmentation p% → ×(1+p/100). Réduction p% → ×(1-p/100).',
          examples:['25% de 200 = 50','Prix 40€ +20% → 40×1,2 = 48€'] }
      ],
      heroTip:'Shikamaru : "y = x × constante ? Si oui, c\'est proportionnel. La droite passe par l\'origine."',
      warmup:[{ q:'5 ramens = 15€. 9 ramens ?', a:'27€', o:['20€','27€','45€','18€'] },
              { q:'20% de 150 ?', a:'30', o:['20','30','50','70'] }]
    },
    '6eme_4': {
      heroName:'Ino Yamanaka', heroQuote:'Un angle précis — jamais approximatif !',
      rule:'Types d\'angles : aigu (<90°), droit (=90°), obtus (90°<x<180°), plat (=180°). Somme triangle = 180°.',
      sections:[
        { icon:'📐', title:'Angles et droites', color:'#ec4899',
          content:'Aigu < 90° < Obtus < 180° = Plat. Droites ⊥ (90°). Droites // (ne se croisent pas).',
          examples:['35° = aigu','130° = obtus','Angles complémentaires = somme 90°'] },
        { icon:'🔺', title:'Angles dans un triangle', color:'#3b82f6',
          content:'La somme des 3 angles d\'un triangle vaut TOUJOURS 180°.',
          examples:['50°+80°+50°=180° ✓','Triangle rectangle : un angle = 90°'] }
      ],
      heroTip:'Ino : "Aigu < 90° < Obtus. Pense à l\'alphabet : A avant O !"',
      warmup:[{ q:'75° est aigu ou obtus ?', a:'Aigu', o:['Aigu','Obtus','Droit','Plat'] },
              { q:'Triangle 50° et 80°. 3ème angle ?', a:'50°', o:['30°','40°','50°','60°'] }]
    },

    '6eme_5': {
      heroName:'Choji Akimichi', heroQuote:'L\'aire d\'une pizza ? Je calcule avant de commander !',
      rule:'Triangle : A=(b×h)/2. Disque : A=π×r². Périmètre cercle : P=2×π×r. π≈3,14.',
      sections:[
        { icon:'🔺', title:'Aire du triangle', color:'#22c55e',
          content:'A = (base × hauteur) ÷ 2. La hauteur est PERPENDICULAIRE à la base.',
          examples:['Base 8 cm, h=5 → A=(8×5)/2=20 cm²','Base 12 m, h=8 → A=48 m²'] },
        { icon:'⭕', title:'Disque et cercle', color:'#F97316',
          content:'Aire disque = π×r². Périmètre cercle = 2×π×r = π×d. π≈3,14.',
          examples:['r=4 cm → A=3,14×16=50,24 cm²','d=8 cm → P=3,14×8=25,12 cm'] }
      ],
      heroTip:'Choji : "Aire triangle = base × hauteur DIVISÉ PAR 2. N\'oublie pas le ÷2 !"',
      warmup:[{ q:'Triangle b=6, h=4. Aire ?', a:'12 cm²', o:['24 cm²','12 cm²','10 cm²','8 cm²'] },
              { q:'Disque r=5 (π≈3,14). Aire ?', a:'78,5 cm²', o:['31,4 cm²','78,5 cm²','15,7 cm²','50 cm²'] }]
    },
    '6eme_6': {
      heroName:'Tenten', heroQuote:'Mes armes sont circulaires — je maîtrise le cercle !',
      rule:'Cercle = ligne courbe. Disque = surface. Vocabulaire : centre, rayon r, diamètre d=2r, corde, arc.',
      sections:[
        { icon:'⭕', title:'Cercle vs Disque', color:'#f59e0b',
          content:'<strong>Cercle</strong> = la ligne courbe (le bord). <strong>Disque</strong> = la surface remplie.',
          examples:['Diamètre = 2 × rayon','Corde = segment entre 2 points du cercle','Arc = partie de la courbe'] },
        { icon:'📏', title:'Formules', color:'#ec4899',
          content:'P = π × d = 2 × π × r. A = π × r². Pour d : r = d/2.',
          examples:['r=3 → P=18,84 cm','r=3 → A=28,26 cm²','d=10 → r=5'] }
      ],
      heroTip:'Tenten : "P = π × DIAMÈTRE. Aire = π × RAYON². Le carré est pour l\'aire !"',
      warmup:[{ q:'Cercle r=3. Périmètre (π≈3,14) ?', a:'18,84 cm', o:['9,42 cm','18,84 cm','28,26 cm','6 cm'] },
              { q:'Diamètre si rayon = 7 cm ?', a:'14 cm', o:['3,5 cm','7 cm','14 cm','21 cm'] }]
    },
    '6eme_7': {
      heroName:'Neji Hyuga', heroQuote:'Les statistiques ne mentent pas. Le destin est dans les données.',
      rule:'Moyenne = somme ÷ effectif. Mode = valeur la plus fréquente. Étendue = max − min.',
      sections:[
        { icon:'📊', title:'Indicateurs statistiques', color:'#6b7280',
          content:'<strong>Moyenne</strong> = somme de toutes les valeurs ÷ nombre de valeurs.',
          examples:['8,12,10,14 → (8+12+10+14)/4 = 44/4 = 11','Mode de 3,5,5,7,5 = 5 (3 fois)'] },
        { icon:'📈', title:'Représentations graphiques', color:'#3b82f6',
          content:'Bâtons (catégories), courbe (évolution dans le temps), circulaire (parts du tout).',
          examples:['25% dans un diagramme circulaire = 90° (25%×360°)','Étendue de 3,7,12,5 = 12−3 = 9'] }
      ],
      heroTip:'Neji : "Mode = le plus fréquent. Étendue = max−min. Moyenne = somme÷effectif."',
      warmup:[{ q:'Moyenne de 6,8,10,12 ?', a:'9', o:['9','10','8','36'] },
              { q:'Étendue de 3,7,15,11 ?', a:'12', o:['15','3','12','8'] }]
    },
    '6eme_8': {
      heroName:'Zabuza Momochi', heroQuote:'Prouve que tu mérites de passer en 5ème !',
      rule:'Bilan 6ème : fractions, proportionnalité, angles, aires, statistiques.',
      sections:[
        { icon:'🔥', title:'Récapitulatif 6ème', color:'#dc2626',
          content:'Fractions (simplifier, additionner, comparer), pourcentages, angles du triangle, aires, moyenne.',
          examples:['2/3 = 4/6','Somme angles triangle = 180°','Aire triangle = (b×h)/2'] },
        { icon:'💡', title:'Points clés à retenir', color:'#F97316',
          content:'π≈3,14. Périmètre = tour. Aire = surface. Moyenne = somme÷effectif.',
          examples:['Aire disque = π×r²','P cercle = 2πr','Mode = valeur la plus fréquente'] }
      ],
      heroTip:'Zabuza : "Mets au même dénominateur avant d\'additionner des fractions !"',
      warmup:[{ q:'1/4 + 2/4 = ?', a:'3/4', o:['3/8','3/4','1/2','3/16'] },
              { q:'Aire disque r=4 (π≈3,14) ?', a:'50,24 cm²', o:['12,56 cm²','25,12 cm²','50,24 cm²','16 cm²'] }]
    },

    // ════════════════════════════════════════
    // 5ÈME
    // ════════════════════════════════════════
    '5eme_1': {
      heroName:'Naruto Uzumaki', heroQuote:'x = ma puissance ! Je vais trouver sa valeur !',
      rule:'Calcul littéral : expressions avec lettres. Substituer, réduire, développer.',
      sections:[
        { icon:'🔤', title:'Expressions littérales', color:'#F97316',
          content:'Remplace la lettre par sa valeur et calcule. Termes semblables : même lettre → on additionne.',
          examples:['2x+7 pour x=3 : 6+7=13','3a+5a=8a','Développer : 2(x+5)=2x+10'] },
        { icon:'📐', title:'Résoudre une équation simple', color:'#3b82f6',
          content:'On cherche x. Même opération des deux côtés. Vérifier la solution.',
          examples:['2x+3=11 → 2x=8 → x=4','3x=21 → x=7. Vérif : 3×7=21 ✓'] }
      ],
      heroTip:'Naruto : "Pour évaluer, remplace la lettre par sa valeur et calcule dans l\'ordre !"',
      warmup:[{ q:'3x+2 pour x=4 ?', a:'14', o:['12','14','9','18'] },
              { q:'Simplifie 4a+3a', a:'7a', o:['7a²','7a','12a','a'] }]
    },
    '5eme_2': {
      heroName:'Sasuke Uchiha', heroQuote:'L\'ordre des opérations est vital — comme en combat.',
      rule:'Priorités : 1)Parenthèses 2)Puissances 3)×÷ (gauche→droite) 4)+− (gauche→droite).',
      sections:[
        { icon:'⚡', title:'Priorités opératoires', color:'#3b82f6',
          content:'× et ÷ AVANT + et −. Les parenthèses TOUJOURS en premier.',
          examples:['3+2×4 = 3+8 = 11 (× avant +)','(3+2)×4 = 5×4 = 20'] },
        { icon:'🔢', title:'Fractions avancées', color:'#ec4899',
          content:'Multiplier : num×num / dénom×dénom. Diviser : multiplier par l\'inverse.',
          examples:['2/3 × 4/5 = 8/15','2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6'] }
      ],
      heroTip:'Sasuke : "× et ÷ AVANT + et −. Les parenthèses TOUJOURS en premier !"',
      warmup:[{ q:'2+3×5 = ?', a:'17', o:['25','17','13','10'] },
              { q:'1/2 × 2/3 = ?', a:'1/3', o:['3/5','1/3','2/5','2/6'] }]
    },
    '5eme_3': {
      heroName:'Sakura Haruno', heroQuote:'Pythagore ! Le triangle rectangle n\'a aucun secret.',
      rule:'a²+b²=c² (c=hypoténuse, côté opposé à l\'angle droit). Réciproque : si a²+b²=c² → rectangle.',
      sections:[
        { icon:'📐', title:'Théorème de Pythagore', color:'#ec4899',
          content:'Dans un triangle RECTANGLE, la somme des carrés des deux côtés = carré de l\'hypoténuse.',
          examples:['3²+4²=9+16=25=5² → hypoténuse=5','5²+12²=25+144=169=13²'] },
        { icon:'🔄', title:'Réciproque', color:'#3b82f6',
          content:'Si a²+b²=c² alors le triangle est rectangle (angle droit en face de c).',
          examples:['6²+8²=36+64=100=10² → rectangle ✓','3²+5²=34 ≠ 6² → pas rectangle'] }
      ],
      heroTip:'Sakura : "Hypoténuse = côté le PLUS LONG dans un triangle rectangle !"',
      warmup:[{ q:'Triangle 6-8-? Hypoténuse ?', a:'10', o:['10','14','√14','100'] },
              { q:'√25 = ?', a:'5', o:['5','12,5','√5','25'] }]
    },
    '5eme_4': {
      heroName:'Rock Lee', heroQuote:'Aires avancées ? 1000 répétitions et je les maîtrise !',
      rule:'Parallélogramme : A=b×h. Trapèze : A=(b1+b2)×h÷2. Losange : A=(d1×d2)÷2.',
      sections:[
        { icon:'▱', title:'Parallélogramme et Trapèze', color:'#22c55e',
          content:'Parallélogramme : A = base × hauteur. Trapèze : A = (b1+b2) × h ÷ 2.',
          examples:['Parallélogramme 7×4 = 28 cm²','Trapèze bases 5 et 9, h=4 : (5+9)×4/2=28 cm²'] },
        { icon:'💎', title:'Losange', color:'#F97316',
          content:'Losange : A = (diagonale1 × diagonale2) ÷ 2.',
          examples:['Diagonales 6 et 8 : A = 6×8/2 = 24 cm²'] }
      ],
      heroTip:'Rock Lee : "Trapèze = somme des bases × hauteur ÷ 2. Parallélogramme = base × hauteur (sans ÷2) !"',
      warmup:[{ q:'Parallélogramme b=9, h=5. Aire ?', a:'45 cm²', o:['22,5 cm²','45 cm²','14 cm²','90 cm²'] },
              { q:'Losange diag 4 et 6. Aire ?', a:'12 cm²', o:['24 cm²','12 cm²','10 cm²','6 cm²'] }]
    },

    '5eme_5': {
      heroName:'Gaara', heroQuote:'Médiatrice : équidistante des deux extrémités.',
      rule:'Médiatrice de [AB] = perpendiculaire à [AB] passant par son milieu. M sur médiatrice ↔ MA=MB.',
      sections:[
        { icon:'📏', title:'Définition et propriété', color:'#92400e',
          content:'La médiatrice passe par le MILIEU de [AB] et lui est PERPENDICULAIRE. Tout point sur la médiatrice est équidistant de A et B.',
          examples:['Construction au compas : arcs de même rayon depuis A et B','M sur médiatrice → MA = MB'] },
        { icon:'⭕', title:'Les 3 médiatrices d\'un triangle', color:'#3b82f6',
          content:'Les 3 médiatrices se croisent au centre du cercle CIRCONSCRIT (OA = OB = OC).',
          examples:['Centre circonscrit = équidistant des 3 sommets'] }
      ],
      heroTip:'Gaara : "Médiatrice = PERPENDICULAIRE + MILIEU. Point sur médiatrice = ÉQUIDISTANT."',
      warmup:[{ q:'MA=4cm, M sur médiatrice. MB=?', a:'4 cm', o:['2 cm','4 cm','8 cm','Impossible'] },
              { q:'Outil pour construire une médiatrice ?', a:'Compas et règle', o:['Rapporteur','Compas et règle','Règle seule','Équerre'] }]
    },
    '5eme_6': {
      heroName:'Temari', heroQuote:'Symétrie centrale : comme un boomerang, ça revient toujours !',
      rule:'Symétrie centrale de centre O : O est le MILIEU de [AA\']. A\' = (2Ox−Ax ; 2Oy−Ay).',
      sections:[
        { icon:'🔄', title:'Définition', color:'#6b7280',
          content:'Dans une symétrie centrale de centre O, O est le milieu de [AA\']. Rotation 180° = symétrie centrale.',
          examples:['A(2;3), O(5;5) → A\'=(8;7)','Parallélogramme : centre = intersection des diagonales'] },
        { icon:'🔷', title:'Figures avec centre de symétrie', color:'#a855f7',
          content:'Parallélogramme, losange, rectangle, carré, cercle ont un centre de symétrie. Le triangle NON.',
          examples:['Centre d\'un parallélogramme = milieu des diagonales'] }
      ],
      heroTip:'Temari : "Pour trouver le symétrique : O est le MILIEU. A\' = 2×O − A (en coordonnées)."',
      warmup:[{ q:'A(1;2), O(3;4). Symétrique A\' ?', a:'(5;6)', o:['(5;6)','(2;2)','(4;6)','(6;4)'] },
              { q:'Figure avec centre de symétrie ?', a:'Losange', o:['Triangle isocèle','Losange','Triangle rect.','Trapèze'] }]
    },
    '5eme_7': {
      heroName:'Kankuro', heroQuote:'Chaque mouvement de ma marionnette est une transformation précise.',
      rule:'Translation (vecteur) : A\' = A + vecteur. Rotation 90° direct : (x;y)→(−y;x).',
      sections:[
        { icon:'➡️', title:'Translation', color:'#a855f7',
          content:'Définie par un vecteur (direction + sens + distance). A\'=(Ax+vx ; Ay+vy).',
          examples:['Vecteur (3;−2) : A(1;4) → A\'(4;2)','Conserve longueurs, angles, aires'] },
        { icon:'🔃', title:'Rotation', color:'#F97316',
          content:'Centre + angle + sens. 90° direct : (x;y)→(−y;x). 180° = symétrie centrale.',
          examples:['A(3;0) rot.90° direct → A\'(0;3)','Rotation 270° direct = 90° indirect'] }
      ],
      heroTip:'Kankuro : "Translation : ajoute le vecteur. Rotation 90° direct : (x;y) → (−y;x) !"',
      warmup:[{ q:'Vecteur (2;3). A(1;1)→?', a:'(3;4)', o:['(3;4)','(2;3)','(−1;−2)','(4;4)'] },
              { q:'Rotation 180° = ?', a:'Symétrie centrale', o:['Translation','Sym. axiale','Sym. centrale','Homothétie'] }]
    },
    '5eme_8': {
      heroName:'Orochimaru', heroQuote:'Bilan 5ème. Tu as survécu jusqu\'ici ?',
      rule:'Pythagore, calcul littéral, transformations, proportionnalité avancée.',
      sections:[
        { icon:'🔥', title:'Bilan 5ème', color:'#dc2626',
          content:'a²+b²=c². Calcul littéral : substituer et développer. D=V×T. Transformations : translation, rotation, symétrie.',
          examples:['Pythagore : 3²+4²=5²','Translation : A\'= A + vecteur','D=V×T → V=D÷T'] },
        { icon:'💡', title:'Astuces brevet', color:'#F97316',
          content:'Translation = ajouter le vecteur. Rotation 90° = (x;y)→(−y;x). V×T = D.',
          examples:['Prix +15% → ×1,15','Prix −25% → ×0,75','Échelle 1/50 : 8cm → 4m'] }
      ],
      heroTip:'Orochimaru : "Pythagore = carrés. Translation = ajouter le vecteur. Rotation 90° = (x;y)→(−y;x)."',
      warmup:[{ q:'Triangle rect. côtés 8 et 15. Hyp ?', a:'17', o:['17','23','√161','√289'] },
              { q:'120€ −10%. Nouveau prix ?', a:'108€', o:['110€','108€','90€','100€'] }]
    },

    // ════════════════════════════════════════
    // 4ÈME
    // ════════════════════════════════════════
    '4eme_1': {
      heroName:'Naruto Uzumaki', heroQuote:'x puissance n = la puissance d\'un ninja au carré !',
      rule:'Puissances : aⁿ = a×a×...×a (n fois). aᵐ×aⁿ=a^(m+n). aᵐ÷aⁿ=a^(m-n). (aᵐ)ⁿ=a^(mn). a⁰=1.',
      sections:[
        { icon:'🔢', title:'Règles de calcul', color:'#F97316',
          content:'Même base : additionne les exposants pour ×, soustrais pour ÷.',
          examples:['2³×2²=2⁵=32','10⁴=10000','10⁻³=0,001','a⁰=1'] },
        { icon:'📐', title:'Notation scientifique', color:'#3b82f6',
          content:'a×10ⁿ avec 1≤a<10. Grand nombre → exposant positif. Petit nombre → négatif.',
          examples:['45600 = 4,56×10⁴','0,00347 = 3,47×10⁻³'] }
      ],
      heroTip:'Naruto : "Même base : additionne les exposants pour ×, soustrais pour ÷ !"',
      warmup:[{ q:'2⁶ = ?', a:'64', o:['32','64','128','12'] },
              { q:'a³ × a⁴ = ?', a:'a⁷', o:['a⁷','a¹²','a','2a⁷'] }]
    },
    '4eme_2': {
      heroName:'Sasuke Uchiha', heroQuote:'Développer = attaquer. Factoriser = mettre en commun.',
      rule:'(a+b)²=a²+2ab+b². (a-b)²=a²-2ab+b². (a+b)(a-b)=a²-b². Factoriser = mettre en facteur commun.',
      sections:[
        { icon:'🔓', title:'Les 3 identités remarquables', color:'#3b82f6',
          content:'(a+b)² = a²+2ab+b². (a−b)² = a²−2ab+b². (a+b)(a−b) = a²−b².',
          examples:['(x+3)²=x²+6x+9','(x−4)²=x²−8x+16','(x+5)(x−5)=x²−25'] },
        { icon:'🔒', title:'Factoriser', color:'#22c55e',
          content:'Mettre en facteur commun ou utiliser les identités remarquables à l\'envers.',
          examples:['6x+9 = 3(2x+3)','x²−25 = (x+5)(x−5)','9x²−6x+1 = (3x−1)²'] }
      ],
      heroTip:'Sasuke : "Les 3 identités par cœur ! 99²=(100−1)²=10000−200+1=9801."',
      warmup:[{ q:'Développe 2(x+6)', a:'2x+12', o:['2x+6','2x+12','x+12','2x+8'] },
              { q:'Factorise x²−49', a:'(x+7)(x−7)', o:['(x−7)²','(x+7)²','(x+7)(x−7)','x(x−49)'] }]
    },
    '4eme_3': {
      heroName:'Sakura Haruno', heroQuote:'Une équation = trouver la vérité cachée derrière x.',
      rule:'Équation du 1er degré : isoler x. Même opération des deux côtés. Toujours vérifier.',
      sections:[
        { icon:'⚖️', title:'Méthode de résolution', color:'#ec4899',
          content:'1) Développer. 2) Regrouper les x d\'un côté. 3) Résoudre. 4) Vérifier.',
          examples:['2x+3=11 → 2x=8 → x=4. Vérif: 2(4)+3=11 ✓','3(x−2)=9 → x−2=3 → x=5'] },
        { icon:'✅', title:'Équations avec fractions', color:'#22c55e',
          content:'(x+3)/2 = 5 → x+3 = 10 → x = 7. Multiplier les deux membres par le dénominateur.',
          examples:['x/4 = 3 → x = 12','(2x+1)/3 = 5 → 2x+1 = 15 → x = 7'] }
      ],
      heroTip:'Sakura : "TOUJOURS vérifier en substituant x dans l\'équation initiale !"',
      warmup:[{ q:'2x+1 = 9. x = ?', a:'x = 4', o:['x = 4','x = 5','x = 8','x = 3'] },
              { q:'3(x−2) = 9. x = ?', a:'x = 5', o:['x = 3','x = 5','x = 7','x = 9'] }]
    },
    '4eme_4': {
      heroName:'Kakashi Hatake', heroQuote:'La réciproque de Pythagore : si les carrés s\'additionnent...',
      rule:'Si a²+b²=c² alors triangle rectangle. Distance AB = √[(xB−xA)²+(yB−yA)²].',
      sections:[
        { icon:'🔄', title:'Réciproque de Pythagore', color:'#6b7280',
          content:'Si a²+b²=c² → triangle rectangle, angle droit en face du grand côté c.',
          examples:['7²+24²=49+576=625=25² → rectangle','8²+15²=64+225=289=17² → rectangle'] },
        { icon:'📍', title:'Distance entre deux points', color:'#3b82f6',
          content:'AB = √[(xB−xA)²+(yB−yA)²]. Application directe de Pythagore dans le repère.',
          examples:['A(1;2), B(4;6) : AB=√(9+16)=5','A(0;0), B(3;4) : AB=5'] }
      ],
      heroTip:'Kakashi : "Grand²=petit1²+petit2² → rectangle ! Calcule les 3 carrés pour vérifier."',
      warmup:[{ q:'Côtés 5,12,13. Rectangle ?', a:'Oui', o:['Oui','Non','Peut-être','Isocèle'] },
              { q:'A(0;0), B(6;8). AB = ?', a:'10', o:['6','8','10','14'] }]
    },

    '4eme_5': {
      heroName:'Shikamaru Nara', heroQuote:'Médiane vs Moyenne. Troublant mais fascinant.',
      rule:'Médiane = valeur centrale (50% en dessous). Q1 = 1er quartile. Q3 = 3ème quartile.',
      sections:[
        { icon:'📊', title:'Médiane et quartiles', color:'#92400e',
          content:'Série rangée. Médiane = valeur du milieu (impair) ou moyenne des deux du milieu (pair).',
          examples:['3,4,5,6,7,8,9 → médiane = 6 (4ème valeur)','2,4,6,8,10,12 → médiane = (6+8)/2 = 7'] },
        { icon:'📦', title:'Boîte à moustaches', color:'#3b82f6',
          content:'Min − Q1 − Médiane − Q3 − Max. Étendue interquartile = Q3−Q1.',
          examples:['Q1=6, Q3=14 → étendue interquartile = 8','Médiane plus robuste que la moyenne aux extrêmes'] }
      ],
      heroTip:'Shikamaru : "Médiane = robuste aux extrêmes. Moyenne = sensible aux valeurs aberrantes."',
      warmup:[{ q:'Médiane de 1,3,5,7,9 ?', a:'5', o:['5','4','6','3'] },
              { q:'Q3−Q1=14−6 = ?', a:'8', o:['8','20','7','10'] }]
    },
    '4eme_6': {
      heroName:'Hinata Hyuga', heroQuote:'Le hasard... même pour un Hyuga, tout n\'est pas certain.',
      rule:'Probabilité = favorable/total. Entre 0 et 1. P(non A) = 1−P(A).',
      sections:[
        { icon:'🎲', title:'Probabilité', color:'#a855f7',
          content:'P(événement) = nb cas favorables / nb cas totaux (équiprobables). 0 = impossible. 1 = certain.',
          examples:['Dé : P(pair) = 3/6 = 1/2','Urne 3R+2B : P(rouge) = 3/5'] },
        { icon:'🔄', title:'Probabilité du contraire', color:'#ec4899',
          content:'P(non A) = 1 − P(A). La somme de toutes les probabilités = 1.',
          examples:['P(A)=0,3 → P(non A)=0,7','Dé : P(non 6) = 5/6'] }
      ],
      heroTip:'Hinata : "Probabilité = favorable÷total. P(contraire) = 1 − P(événement)."',
      warmup:[{ q:'Sac 4R 6B. P(bleu) ?', a:'3/5', o:['2/5','3/5','1/2','6/10'] },
              { q:'P(A)=0,4. P(non A) ?', a:'0,6', o:['0,4','0,6','1,4','0,16'] }]
    },
    '4eme_7': {
      heroName:'Rock Lee', heroQuote:'SOH CAH TOA : le secret de toutes mes techniques !',
      rule:'cos(α) = Adjacent/Hypoténuse. sin(α) = Opposé/Hypoténuse. tan(α) = Opposé/Adjacent.',
      sections:[
        { icon:'📐', title:'SOH CAH TOA', color:'#22c55e',
          content:'<strong>S</strong>OH : Sin = Opposé/Hyp. <strong>C</strong>AH : Cos = Adjacent/Hyp. <strong>T</strong>OA : Tan = Opposé/Adjacent.',
          examples:['cos(60°)=0,5. Hyp=10 → Adj=10×0,5=5','cos(angle)=8/10=0,8 → angle≈37°'] },
        { icon:'🔢', title:'Valeurs remarquables', color:'#F97316',
          content:'30° : sin=0,5, cos=0,866. 45° : sin=cos≈0,707. 60° : sin=0,866, cos=0,5.',
          examples:['sin²(α)+cos²(α)=1 (toujours)','Adj = Hyp × cos(α)'] }
      ],
      heroTip:'Rock Lee : "SOH-CAH-TOA ! Identifie d\'abord Opp, Adj, Hyp AVANT de calculer."',
      warmup:[{ q:'Adj=6, Hyp=10. cos = ?', a:'0,6', o:['0,4','0,6','0,8','1,6'] },
              { q:'cos(60°)=0,5. Hyp=8. Adj = ?', a:'4', o:['4','5','6','8'] }]
    },
    '4eme_8': {
      heroName:'Pain (Nagato)', heroQuote:'La douleur des maths difficiles mène à la maîtrise.',
      rule:'Bilan 4ème : puissances, identités remarquables, équations, Pythagore avancé, stats, proba, cosinus.',
      sections:[
        { icon:'🔥', title:'Bilan 4ème', color:'#dc2626',
          content:'Puissances (aᵐ×aⁿ=a^(m+n)), identités ((a+b)²...), équations (isoler x), cos=adj/hyp.',
          examples:['(a+b)(a−b)=a²−b²','P(non A)=1−P(A)','cos=adjacent/hypoténuse'] },
        { icon:'💡', title:'Ce qui tombe au brevet', color:'#F97316',
          content:'Factoriser, résoudre une équation, Pythagore, probabilité d\'un événement.',
          examples:['x²−25=(x+5)(x−5)','2x+5=15 → x=5','P(pair au dé)=3/6=1/2'] }
      ],
      heroTip:'Pain : "a²−b²=(a+b)(a−b). Résoudre = isoler x. cos = adjacent/hypoténuse."',
      warmup:[{ q:'(x+5)(x−5) = ?', a:'x²−25', o:['x²+25','x²−25','x²−10x','x²+10x−25'] },
              { q:'2x+5=15. x = ?', a:'x = 5', o:['x = 5','x = 10','x = 7','x = 3'] }]
    },

    // ════════════════════════════════════════
    // 3ÈME
    // ════════════════════════════════════════
    '3eme_1': {
      heroName:'Naruto Uzumaki', heroQuote:'f(x) = ma puissance au temps x. En avant !',
      rule:'Fonction f(x) = ax+b (droite) ou f(x) = ax² (parabole). f(x) = valeur image de x.',
      sections:[
        { icon:'📈', title:'Fonctions affines et linéaires', color:'#F97316',
          content:'f(x)=ax+b est une droite. a = pente (coefficient directeur). b = ordonnée à l\'origine.',
          examples:['f(x)=2x+3, f(4)=11','f(x)=5x : linéaire (passe par l\'origine)','Pente=2 → +2 en y quand x+1'] },
        { icon:'📐', title:'Graphique et tableau de valeurs', color:'#3b82f6',
          content:'Tableau de valeurs → points dans un repère. Intersection de 2 droites = solution du système.',
          examples:['f(x)=3x−2 et g(x)=x+6 : égales pour x=4'] }
      ],
      heroTip:'Naruto : "f(x) = remplace x par sa valeur. Pente a = la montée de la droite."',
      warmup:[{ q:'f(x)=4x−1. f(3) = ?', a:'11', o:['11','13','9','12'] },
              { q:'Droite y=3x+2. Pente ?', a:'3', o:['2','3','5','1'] }]
    },
    '3eme_2': {
      heroName:'Sasuke Uchiha', heroQuote:'(a+b)², (a−b)², (a+b)(a−b) : trois armes absolues.',
      rule:'Maîtrise complète des identités. Factorisation avancée. Calcul mental avec identités.',
      sections:[
        { icon:'⚡', title:'Rappel des 3 identités', color:'#3b82f6',
          content:'(a+b)²=a²+2ab+b². (a−b)²=a²−2ab+b². (a+b)(a−b)=a²−b².',
          examples:['(x+4)²=x²+8x+16','99×101=(100−1)(100+1)=10000−1=9999'] },
        { icon:'🔑', title:'Factorisation avancée', color:'#ec4899',
          content:'Reconnaître la forme pour factoriser. 3x²−12 = 3(x+2)(x−2).',
          examples:['x²+10x+25=(x+5)²','4x²−9=(2x+3)(2x−3)','3x²−12=3(x²−4)=3(x+2)(x−2)'] }
      ],
      heroTip:'Sasuke : "51×49=(50+1)(50−1)=2500−1=2499. Utilise (a+b)(a−b) pour calculer vite !"',
      warmup:[{ q:'Factorise x²−64', a:'(x+8)(x−8)', o:['(x−8)²','(x+8)²','(x+8)(x−8)','x(x−64)'] },
              { q:'99² = (100−1)² = ?', a:'9801', o:['9801','9999','10201','10000'] }]
    },
    '3eme_3': {
      heroName:'Sakura Haruno', heroQuote:'Deux inconnues, deux équations — tout se résout !',
      rule:'Systèmes d\'équations : substitution (isoler une variable) ou combinaison (additionner pour éliminer).',
      sections:[
        { icon:'⚖️', title:'Méthode de substitution', color:'#ec4899',
          content:'Exprimer x (ou y) depuis une équation, puis substituer dans l\'autre.',
          examples:['y=2x et x+y=9 → x+2x=9 → x=3, y=6','x+y=8 et 2x+y=13 → x=5, y=3'] },
        { icon:'🔗', title:'Méthode de combinaison', color:'#22c55e',
          content:'Additionner ou soustraire les équations pour éliminer une variable.',
          examples:['x+y=10 et x−y=4 → 2x=14 → x=7, y=3'] }
      ],
      heroTip:'Sakura : "Substitution = isoler puis remplacer. Combinaison = additionner pour éliminer."',
      warmup:[{ q:'x+y=9 et x−y=3. x = ?', a:'6', o:['6','3','9','4'] },
              { q:'2x+y=8, x=3. y = ?', a:'2', o:['2','5','6','1'] }]
    },
    '3eme_4': {
      heroName:'Kakashi Hatake', heroQuote:'Thalès : les proportions sont toujours respectées.',
      rule:'MN//BC dans ABC : AM/AB = AN/AC = MN/BC. Réciproque : égalité des ratios → MN//BC.',
      sections:[
        { icon:'📏', title:'Théorème de Thalès', color:'#6b7280',
          content:'Si MN//BC alors AM/AB = AN/AC = MN/BC. Permet de calculer une longueur inconnue.',
          examples:['AM=4, AB=10, MN=3 → BC = 10×3/4 = 7,5','AM=6, AB=15, BC=10 → MN=4'] },
        { icon:'🔄', title:'Réciproque', color:'#3b82f6',
          content:'Si AM/AB = AN/AC alors MN//BC. Permet de prouver le parallélisme.',
          examples:['AM/AB=3/9=1/3 et AN/AC=2/6=1/3 → MN//BC ✓'] }
      ],
      heroTip:'Kakashi : "Thalès = ratios proportionnels. AM/AB = AN/AC = MN/BC."',
      warmup:[{ q:'AM=3, AB=9, MN=2. BC = ?', a:'6', o:['6','4','9','3'] },
              { q:'AM/AB=AN/AC. Conclusion ?', a:'MN // BC', o:['MN=BC','MN⊥BC','MN//BC','Triangle rect.'] }]
    },

    '3eme_5': {
      heroName:'Minato Namikaze', heroQuote:'SOH CAH TOA — la formule du Yondaime Hokage !',
      rule:'sin=Opp/Hyp. cos=Adj/Hyp. tan=Opp/Adj. sin²+cos²=1.',
      sections:[
        { icon:'📐', title:'Trigonométrie complète', color:'#22c55e',
          content:'<strong>S</strong>OH : Sin=Opposé/Hyp. <strong>C</strong>AH : Cos=Adj/Hyp. <strong>T</strong>OA : Tan=Opp/Adj.',
          examples:['sin(30°)=0,5. cos(30°)≈0,866. tan(45°)=1','Opp = Hyp × sin(α). Adj = Hyp × cos(α)'] },
        { icon:'🔢', title:'Trouver un angle ou un côté', color:'#F97316',
          content:'Si cos(α)=adj/hyp connu → cherche l\'angle avec la calculatrice. sin²+cos²=1 toujours.',
          examples:['cos(angle)=8/10=0,8 → angle≈37°','tan(50°)=1,192. Opp=9 → Adj=9/1,192≈7,56'] }
      ],
      heroTip:'Minato : "SOH-CAH-TOA ! Identifie d\'abord Opp, Adj, Hyp AVANT de calculer."',
      warmup:[{ q:'sin(α)=Opp/Hyp. Opp=5, Hyp=10. sin = ?', a:'0,5', o:['0,5','2','0,2','5'] },
              { q:'cos(60°)=0,5. Hyp=20. Adj = ?', a:'10', o:['10','40','5','15'] }]
    },
    '3eme_6': {
      heroName:'Jiraiya', heroQuote:'Le grand Jiraiya a tout expérimenté — même les proba composées.',
      rule:'P(A et B) indépendants = P(A)×P(B). P(A ou B) incompatibles = P(A)+P(B). Loi des grands nombres.',
      sections:[
        { icon:'🎲', title:'Probabilités composées', color:'#f59e0b',
          content:'Événements <strong>indépendants</strong> : multiplier. Événements <strong>incompatibles</strong> : additionner.',
          examples:['2 dés : P(6 et 6) = 1/6×1/6 = 1/36','Dé : P(1 ou 2) = 1/6+1/6 = 1/3'] },
        { icon:'📊', title:'Loi des grands nombres', color:'#3b82f6',
          content:'Plus on répète l\'expérience, plus la fréquence se rapproche de la probabilité théorique.',
          examples:['1000 lancers pièce → fréquence face ≈ 0,5','Simulation = estimation expérimentale'] }
      ],
      heroTip:'Jiraiya : "Indépendants = multiplier. Incompatibles = additionner. Contraire = 1−P."',
      warmup:[{ q:'2 dés indép. P(6 aux deux) = ?', a:'1/36', o:['1/6','1/12','1/36','2/6'] },
              { q:'P(A)=0,3, P(B)=0,5, incomp. P(A ou B) = ?', a:'0,8', o:['0,8','0,15','0,2','1'] }]
    },
    '3eme_7': {
      heroName:'Tsunade', heroQuote:'Je calcule les volumes de mes potions avec une précision absolue.',
      rule:'Cylindre : V=π×r²×h. Cône : V=(1/3)×π×r²×h. Sphère : V=(4/3)×π×r³. Pyramide : V=(1/3)×A×h.',
      sections:[
        { icon:'🔵', title:'Volumes des solides', color:'#a855f7',
          content:'Cylindre = π×r²×h. Cône = (1/3) cylindre. Sphère = (4/3)×π×r³. Pyramide = (1/3)×base×h.',
          examples:['Cylindre r=3, h=5 → 3,14×9×5=141,3 cm³','Sphère r=6 → 4/3×3,14×216=904,3 cm³'] },
        { icon:'💡', title:'Astuce', color:'#F97316',
          content:'Cône = (1/3) × cylindre de même base. Pyramide = (1/3) × prisme de même base.',
          examples:['V cône / V cylindre = 1/3 toujours','Cube côté a : V = a³'] }
      ],
      heroTip:'Tsunade : "Cylindre=π×r²×h. Cône=1/3×cylindre. Sphère=4/3×π×r³. Mémorise le 1/3 et le 4/3 !"',
      warmup:[{ q:'Cube côté 3. Volume ?', a:'27 cm³', o:['27 cm³','9 cm³','81 cm³','18 cm³'] },
              { q:'Cylindre r=2,h=5 (π≈3,14). Volume ?', a:'62,8 cm³', o:['31,4 cm³','62,8 cm³','125,6 cm³','20 cm³'] }]
    },
    '3eme_8': {
      heroName:'Madara Uchiha', heroQuote:'Prouve que tu maîtrises les maths de CM2 à la 3ème.',
      rule:'Brevet blanc : fonctions, identités, systèmes, Thalès, trigonométrie, volumes, probabilités.',
      sections:[
        { icon:'🔥', title:'Synthèse brevet', color:'#dc2626',
          content:'f(x)=ax+b. Identités : (a+b)². Thalès : AM/AB=AN/AC. Trig : SOH-CAH-TOA.',
          examples:['f(x)=2x+3, f(4)=11','(x+5)(x−5)=x²−25','sin(30°)=0,5'] },
        { icon:'📋', title:'Check-list brevet', color:'#F97316',
          content:'Thalès→proportions. Pythagore→carrés. Trig→SOH-CAH-TOA. Volume→formules.',
          examples:['Cylindre=π×r²×h','Cône=1/3×cylindre','P(indép.)=P(A)×P(B)'] }
      ],
      heroTip:'Madara : "Brevet = régularité. 20 min par exercice. Ne laisse JAMAIS une question vide !"',
      warmup:[{ q:'f(x)=x²−4. f(−2) = ?', a:'0', o:['0','−8','8','4'] },
              { q:'sin(α)=0,5. α = ?', a:'30°', o:['30°','45°','60°','90°'] }]
    }

  } // fin lessons
};

// ── Point d'entrée global — UNIQUE, écrase l'ancienne version ──
// Signature : lesson_paysdufeu(niveauCode, numeroIle, callback)
// Clé composite : 'cm2_1', '6eme_3', etc.
window.lesson_paysdufeu = function (niveauCode, numeroIle, callback) {
  var STORAGE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu/characters/';
  var registry = window.LESSON_REGISTRY && window.LESSON_REGISTRY['paysdufeu'];

  if (!registry) { if (callback) callback(); return; }

  // Clé composite : 'cm2_1', '6eme_3', etc.
  var lessonKey = niveauCode + '_' + numeroIle;
  var lessonData = registry.lessons[lessonKey];

  if (!lessonData) {
    // Fallback : essayer la clé numérique seule (compatibilité ancienne CM2)
    lessonData = registry.lessons[numeroIle];
  }

  if (!lessonData) {
    if (callback) callback();
    return;
  }

  // Avatar correct selon niveau et île
  var avatarsMap = registry.avatars && registry.avatars[niveauCode];
  var avatarFile = (avatarsMap && avatarsMap[numeroIle]) || 'naruto.jpg';
  var avatarUrl  = STORAGE + avatarFile;

  if (typeof showLesson === 'function') {
    showLesson('paysdufeu', lessonKey, avatarUrl, '#F97316', callback);
  } else {
    if (callback) callback();
  }
};

console.info('🔥 lesson-data pays-du-feu v3 chargé — 5 niveaux × 8 îles = 40 leçons');
