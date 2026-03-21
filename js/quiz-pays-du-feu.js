// ═══════════════════════════════════════════════════════════════
// QUIZ-PAYS-DU-FEU.JS — Académie Pirate
// Pays : Pays du Feu · Matière : Mathématiques
// Univers : NARUTO — CM2 · 6ème · 5ème
// Architecture : 100% isolée (règle ND-02) — ne touche à rien d'autre
// ═══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// 1. ASSETS SUPABASE
// ══════════════════════════════════════════════════════════════
var SUPABASE_URL_PDF   = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
var BUCKET_PDF         = 'island-pays-du-feu';
var PDF_STORAGE        = SUPABASE_URL_PDF + '/storage/v1/object/public/' + BUCKET_PDF;

var PDF_AVATARS = {
  1: PDF_STORAGE + '/gifs/naruto%20GIF6.gif',
  2: PDF_STORAGE + '/characters/sasuke.png',
  3: PDF_STORAGE + '/characters/sakura.jpg',
  4: PDF_STORAGE + '/characters/hatake%20kakashi.jpeg',
  5: PDF_STORAGE + '/characters/gaara%20.jpg',
  6: PDF_STORAGE + '/gifs/itachi%20uchiha%20naruto%20GIF.gif',
  7: PDF_STORAGE + '/characters/minato%20.jpg',
  8: PDF_STORAGE + '/characters/jiraiya.webp',
};

var PDF_FALLBACK = {
  1:'🍃', 2:'⚡', 3:'🌸', 4:'📖',
  5:'🏜️', 6:'👁️', 7:'⚡', 8:'🐸'
};

var PDF_GIFS_CORRECT = [
  PDF_STORAGE + '/gifs/naruto GIF.gif',
  PDF_STORAGE + '/gifs/naruto GIF6.gif',
];
var PDF_GIFS_PERFECT = [
  PDF_STORAGE + '/gifs/Naruto Shippuden GIF2.gif',
  PDF_STORAGE + '/gifs/naruto shippuden GIF5.gif',
];
var PDF_GIFS_WRONG = [
  PDF_STORAGE + '/gifs/naruto shippuden GIF3.gif',
  PDF_STORAGE + '/gifs/naruto shippuden GIF1.gif',
];
var PDF_GIFS_LOSE = [
  PDF_STORAGE + '/gifs/naruto shippuden GIF1.gif',
];

// ══════════════════════════════════════════════════════════════
// 2. DONNÉES DES ÎLES — 8 îles × 11 questions
// ══════════════════════════════════════════════════════════════
var ISLANDS_PDF = {
  1: {
    name: 'Île de Naruto', charName: 'Naruto', color: '#F97316',
    topic: 'Grands nombres & calcul mental', level: 'CM2',
    bgm: 'naruto-map',
    msgs: ['Crois en toi, et calcule !', 'Dattebayo ! Montre-moi ton calcul !', 'Je ne lâche jamais — toi non plus !'],
    qs: [
      { q:'Quelle est la valeur du chiffre 7 dans 3 <strong>7</strong>2 450 ?', a:'70 000', o:['7 000','700 000','70 000'], exp:'Dans 372 450, le 7 est en position des dizaines de milliers = 70 000.' },
      { q:'Range ces nombres du plus petit au plus grand : 48 200 · 48 020 · 48 002', a:'48 002 < 48 020 < 48 200', o:['48 200 < 48 020 < 48 002','48 002 < 48 020 < 48 200','48 020 < 48 002 < 48 200'], exp:'On compare chiffre par chiffre : les milliers sont égaux, les centaines aussi (0), les dizaines : 0 < 2 < 2, puis les unités.' },
      { q:'Naruto fait <em>37 × 100</em>. Quel est le résultat ?', a:'3 700', o:['370','37 000','3 700'], exp:'Multiplier par 100 → on ajoute 2 zéros : 37 × 100 = 3 700.' },
      { q:'Calcule mentalement : <em>450 ÷ 10</em>', a:'45', o:['4 500','4,5','45'], exp:'Diviser par 10 → on supprime un zéro : 450 ÷ 10 = 45.' },
      { q:'Quel est le critère de divisibilité par 2 ?', a:'Le dernier chiffre est pair (0,2,4,6,8)', o:['La somme des chiffres est paire','Le dernier chiffre est pair (0,2,4,6,8)','Le nombre se termine par 0 ou 5'], exp:'Un nombre est divisible par 2 si son dernier chiffre est 0, 2, 4, 6 ou 8.' },
      { q:'Est-ce que 3 456 est divisible par 5 ?', a:'Non', o:['Oui','Non','Seulement si on divise par 2 d\'abord'], exp:'Pour être divisible par 5, un nombre doit se terminer par 0 ou 5. 3 456 se termine par 6 → non.' },
      { q:'Naruto a 10 000 clones. Il en envoie 2 750. Combien reste-t-il ?', a:'7 250', o:['8 250','7 250','7 500'], exp:'10 000 − 2 750 = 7 250.' },
      { q:'Encadre 58 340 entre deux dizaines de milliers consécutifs.', a:'50 000 < 58 340 < 60 000', o:['40 000 < 58 340 < 50 000','50 000 < 58 340 < 60 000','58 000 < 58 340 < 59 000'], exp:'58 340 est compris entre 50 000 et 60 000 (les dizaines de milliers consécutives).' },
      { q:'Calcule : <em>800 × 40</em>', a:'32 000', o:['3 200','320 000','32 000'], exp:'800 × 40 = 8 × 4 × 100 × 10 = 32 × 1 000 = 32 000.' },
      { q:'Combien y a-t-il de centaines dans 45 700 ?', a:'457', o:['45','4 570','457'], exp:'45 700 ÷ 100 = 457 centaines.' },
      { q:'⚔️ BOSS — Kakashi surgit ! Résous : Naruto parcourt 124 750 m en une journée d\'entraînement. Arrondi à la dizaine de milliers la plus proche ?', a:'120 000', o:['130 000','125 000','120 000'], exp:'On regarde le chiffre des milliers : 4 < 5 → on arrondit vers le bas : 120 000.', isBoss:true, bossName:'Kakashi' },
    ]
  },
  2: {
    name: 'Île de Sasuke', charName: 'Sasuke', color: '#1D4ED8',
    topic: 'Additions & soustractions posées', level: 'CM2',
    bgm: 'naruto-battle',
    msgs: ['Frappe avec précision comme mon Chidori !', 'Calcule ou sois défait !', 'La puissance vient de la rigueur.'],
    qs: [
      { q:'Pose et calcule : <em>3 847 + 2 965</em>', a:'6 812', o:['6 712','5 812','6 812'], exp:'3 847 + 2 965 : unités 7+5=12 (j\'écris 2, retenue 1), dizaines 4+6+1=11 (j\'écris 1, retenue 1), centaines 8+9+1=18 (j\'écris 8, retenue 1), milliers 3+2+1=6. Résultat : 6 812.' },
      { q:'Calcule : <em>10 000 − 3 547</em>', a:'6 453', o:['6 543','7 453','6 453'], exp:'10 000 − 3 547 = 6 453. On emprunte successivement.' },
      { q:'Sasuke dépense 4 280 ryō sur 12 500. Combien reste-t-il ?', a:'8 220', o:['7 220','8 220','8 320'], exp:'12 500 − 4 280 = 8 220.' },
      { q:'Pose et calcule : <em>56 234 + 18 909</em>', a:'75 143', o:['74 143','75 143','75 043'], exp:'56 234 + 18 909 = 75 143.' },
      { q:'Vérifie : <em>7 835 + 2 168 = 10 003</em>. Est-ce juste ?', a:'Non, le résultat est 10 003', o:['Oui','Non, le résultat est 9 903','Non, le résultat est 10 003'], exp:'7 835 + 2 168 : 5+8=13 (2, ret.1), 3+6+1=10 (0, ret.1), 8+1+1=10 (0, ret.1), 7+2+1=10. Résultat = 10 003. C\'est juste en fait !', },
      { q:'Calcule : <em>25 000 − 8 356</em>', a:'16 644', o:['17 644','16 644','16 344'], exp:'25 000 − 8 356 = 16 644.' },
      { q:'Un ninja parcourt 34 500 m le matin et 27 830 m l\'après-midi. Quelle distance totale ?', a:'62 330 m', o:['61 330 m','62 330 m','72 330 m'], exp:'34 500 + 27 830 = 62 330 m.' },
      { q:'Quelle somme faut-il ajouter à 46 750 pour obtenir 100 000 ?', a:'53 250', o:['54 250','53 250','43 250'], exp:'100 000 − 46 750 = 53 250.' },
      { q:'Estime l\'ordre de grandeur de <em>4 892 + 3 107</em>', a:'Environ 8 000', o:['Environ 7 000','Environ 9 000','Environ 8 000'], exp:'4 892 ≈ 5 000 et 3 107 ≈ 3 000 → 5 000 + 3 000 = 8 000.' },
      { q:'Calcule : <em>8 000 − 2 375 − 1 625</em>', a:'4 000', o:['3 000','5 000','4 000'], exp:'D\'abord 2 375 + 1 625 = 4 000, puis 8 000 − 4 000 = 4 000.' },
      { q:'⚔️ BOSS — Orochimaru ! Sasuke attaque : un village a 125 480 habitants. 37 950 partent en mission. Combien restent-il ?', a:'87 530', o:['88 530','87 530','87 430'], exp:'125 480 − 37 950 = 87 530.', isBoss:true, bossName:'Orochimaru' },
    ]
  },
  3: {
    name: 'Île de Sakura', charName: 'Sakura', color: '#EC4899',
    topic: 'Fractions & nombres décimaux', level: 'CM2',
    bgm: 'naruto-isle',
    msgs: ['Soigne tes calculs comme je soigne mes blessés !', 'La précision est une arme.', 'Force intérieure et rigueur !'],
    qs: [
      { q:'Écris la fraction correspondant à : <em>3 parts sur 5</em>', a:'3/5', o:['5/3','3/5','2/5'], exp:'3 parts sur 5 parties égales = 3/5.' },
      { q:'Quelle fraction est supérieure à 1 ?', a:'7/5', o:['3/7','4/8','7/5'], exp:'7/5 = 1 + 2/5 > 1. Une fraction est > 1 quand le numérateur > dénominateur.' },
      { q:'Complète : <em>3/4 = ?/8</em>', a:'6', o:['4','3','6'], exp:'Pour passer de 4 à 8, on multiplie par 2. On fait pareil au numérateur : 3 × 2 = 6. Donc 3/4 = 6/8.' },
      { q:'Écris 0,7 sous forme de fraction', a:'7/10', o:['7/100','70/10','7/10'], exp:'0,7 = 7 dixièmes = 7/10.' },
      { q:'Compare : <em>0,45 __ 0,4</em>', a:'0,45 > 0,4', o:['0,45 < 0,4','0,45 = 0,4','0,45 > 0,4'], exp:'0,45 = 0,450 et 0,4 = 0,400. Comme 450 > 400, alors 0,45 > 0,4.' },
      { q:'Sakura utilise <em>3/4</em> de ses 480 chakra points. Combien utilise-t-elle ?', a:'360', o:['120','240','360'], exp:'3/4 de 480 = 480 ÷ 4 × 3 = 120 × 3 = 360.' },
      { q:'Calcule : <em>2,5 + 1,75</em>', a:'4,25', o:['3,25','4,75','4,25'], exp:'2,5 + 1,75 = 2,50 + 1,75 = 4,25. On aligne les virgules.' },
      { q:'Calcule : <em>5,3 − 2,8</em>', a:'2,5', o:['3,5','2,5','2,3'], exp:'5,3 − 2,8 = 2,5.' },
      { q:'Place sur une droite : <em>1/2, 3/4, 1/4</em>. Quel est l\'ordre croissant ?', a:'1/4 < 1/2 < 3/4', o:['1/2 < 1/4 < 3/4','3/4 < 1/2 < 1/4','1/4 < 1/2 < 3/4'], exp:'1/4 = 0,25 · 1/2 = 0,5 · 3/4 = 0,75 → ordre : 1/4 < 1/2 < 3/4.' },
      { q:'Quel est le nombre décimal correspondant à <em>7/4</em> ?', a:'1,75', o:['0,75','1,25','1,75'], exp:'7 ÷ 4 = 1 reste 3 → 3/4 = 0,75 → 7/4 = 1,75.' },
      { q:'⚔️ BOSS — Tsunade ! Sakura soigne 3/5 des 450 ninjas blessés. Combien soigne-t-elle ? Reste-t-il combien de blessés ?', a:'270 soignés, 180 restants', o:['200 soignés, 250 restants','270 soignés, 180 restants','225 soignés, 225 restants'], exp:'3/5 de 450 = 450 ÷ 5 × 3 = 270. Restants = 450 − 270 = 180.', isBoss:true, bossName:'Tsunade' },
    ]
  },
  4: {
    name: 'Île de Kakashi', charName: 'Kakashi', color: '#6B7280',
    topic: 'Multiplication & division posées', level: 'CM2',
    bgm: 'naruto-map',
    msgs: ['Mille techniques, un seul principe : la méthode.', 'Copie ma précision dans tes calculs.', 'Les ninjas d\'élite vérifient toujours leur résultat.'],
    qs: [
      { q:'Pose et calcule : <em>347 × 6</em>', a:'2 082', o:['2 142','2 082','1 982'], exp:'347 × 6 : 7×6=42 (2, ret.4), 4×6+4=28 (8, ret.2), 3×6+2=20. Résultat : 2 082.' },
      { q:'Pose et calcule : <em>523 × 24</em>', a:'12 552', o:['12 452','12 552','11 552'], exp:'523 × 24 = 523×20 + 523×4 = 10 460 + 2 092 = 12 552.' },
      { q:'Calcule la division : <em>648 ÷ 8</em>', a:'81', o:['80','81','82'], exp:'8 × 81 = 648. Vérification : 81 × 8 = 648 ✓.' },
      { q:'Pose : <em>2 856 ÷ 8</em>. Quel est le quotient ?', a:'357', o:['357','367','347'], exp:'2 856 ÷ 8 = 357. Vérification : 357 × 8 = 2 856 ✓.' },
      { q:'Pose : <em>1 247 ÷ 6</em>. Quel est le reste ?', a:'5', o:['1','3','5'], exp:'1 247 = 6 × 207 + 5. Le reste est 5.' },
      { q:'Kakashi répartit 2 856 shurikens en 8 équipes égales. Combien par équipe ?', a:'357', o:['357','457','257'], exp:'2 856 ÷ 8 = 357 shurikens par équipe.' },
      { q:'Vérifie : <em>436 × 7 = 3 052</em>. Est-ce juste ?', a:'Non, 436 × 7 = 3 052', o:['Oui, c\'est juste','Non, 436 × 7 = 3 052','Non, 436 × 7 = 2 952'], exp:'436 × 7 : 6×7=42 (2, ret.4), 3×7+4=25 (5, ret.2), 4×7+2=30. Résultat = 3 052. C\'est juste !' },
      { q:'Calcule : <em>4 500 ÷ 9</em>', a:'500', o:['450','5 000','500'], exp:'4 500 ÷ 9 = 500. (45 ÷ 9 = 5, puis × 100).' },
      { q:'Un carré a un périmètre de 248 cm. Quelle est la longueur d\'un côté ?', a:'62 cm', o:['56 cm','62 cm','58 cm'], exp:'Périmètre = 4 × côté → côté = 248 ÷ 4 = 62 cm.' },
      { q:'Pose et calcule : <em>1 035 × 32</em>', a:'33 120', o:['33 120','32 120','34 120'], exp:'1 035 × 32 = 1 035×30 + 1 035×2 = 31 050 + 2 070 = 33 120.' },
      { q:'⚔️ BOSS — Zabuza ! Kakashi partage 15 300 kunais entre 9 escouades. Combien chaque escouade reçoit-elle ? Quel est le reste ?', a:'1 700 kunais, reste 0', o:['1 600 kunais, reste 3','1 700 kunais, reste 0','1 800 kunais, reste 0'], exp:'15 300 ÷ 9 = 1 700. Vérification : 1 700 × 9 = 15 300, reste = 0.', isBoss:true, bossName:'Zabuza' },
    ]
  },
  5: {
    name: 'Île de Gaara', charName: 'Gaara', color: '#D97706',
    topic: 'Proportionnalité & pourcentages', level: '6ème',
    bgm: 'naruto-battle',
    msgs: ['Sable de l\'Absolu — aucune erreur ne passe !', 'Chaque rapport est absolu, comme ma protection.', 'Calcule ou disparais dans le sable.'],
    qs: [
      { q:'La distance entre deux villages est proportionnelle au temps. En 2h on parcourt 60 km. En 5h, quelle distance ?', a:'150 km', o:['100 km','120 km','150 km'], exp:'Coefficient = 60 ÷ 2 = 30 km/h. En 5h : 30 × 5 = 150 km.' },
      { q:'Un tableau est proportionnel si :<br>2 → 8 et 3 → 12 et 5 → 20. Quel est le coefficient ?', a:'4', o:['2','6','4'], exp:'8 ÷ 2 = 4, 12 ÷ 3 = 4, 20 ÷ 5 = 4. Coefficient de proportionnalité = 4.' },
      { q:'Calcule 25 % de 200', a:'50', o:['25','75','50'], exp:'25 % = 25/100 = 1/4. 200 ÷ 4 = 50.' },
      { q:'Calcule 10 % de 350', a:'35', o:['3,5','350','35'], exp:'10 % de 350 = 350 ÷ 10 = 35.' },
      { q:'Gaara court 45 km en 3h. À cette vitesse, en 4h il court :', a:'60 km', o:['48 km','60 km','55 km'], exp:'Vitesse = 45 ÷ 3 = 15 km/h. En 4h : 15 × 4 = 60 km.' },
      { q:'Une recette pour 4 personnes nécessite 300 g de farine. Pour 6 personnes, combien faut-il ?', a:'450 g', o:['400 g','500 g','450 g'], exp:'300 ÷ 4 = 75 g par personne. 75 × 6 = 450 g.' },
      { q:'Calcule 50 % de 480', a:'240', o:['48','240','120'], exp:'50 % = 1/2. 480 ÷ 2 = 240.' },
      { q:'Cette situation est-elle proportionnelle ? 1→4 · 2→8 · 3→13', a:'Non', o:['Oui','Non','Seulement pour 1 et 2'], exp:'4÷1=4, 8÷2=4, mais 13÷3≈4,33 ≠ 4. Ce n\'est pas proportionnel.' },
      { q:'Sur une carte à l\'échelle 1/50 000, une distance mesure 3 cm. Quelle est la distance réelle ?', a:'1 500 m', o:['150 m','15 000 m','1 500 m'], exp:'3 cm × 50 000 = 150 000 cm = 1 500 m.' },
      { q:'Un article coûte 80 €. Il est soldé à 20 %. Quel est le prix après remise ?', a:'64 €', o:['60 €','72 €','64 €'], exp:'Remise = 20 % de 80 = 16 €. Prix soldé = 80 − 16 = 64 €.' },
      { q:'⚔️ BOSS — Gaara du désert ! Un ninja voyage à vitesse constante. En 2h30 il parcourt 100 km. Combien parcourt-il en 3h45 ?', a:'150 km', o:['125 km','140 km','150 km'], exp:'2h30 = 2,5h. Vitesse = 100 ÷ 2,5 = 40 km/h. 3h45 = 3,75h. Distance = 40 × 3,75 = 150 km.', isBoss:true, bossName:'Gaara Kazekage' },
    ]
  },
  6: {
    name: 'Île d\'Itachi', charName: 'Itachi', color: '#7C3AED',
    topic: 'Géométrie — Périmètre & Aire', level: '6ème',
    bgm: 'naruto-boss',
    msgs: ['Le Sharingan voit chaque détail de ta figure.', 'Mesure avec précision ou sombre dans l\'illusion.', 'La géométrie est un genjutsu que tu dois percer.'],
    qs: [
      { q:'Calcule le périmètre d\'un rectangle de longueur 8 cm et largeur 5 cm.', a:'26 cm', o:['40 cm','13 cm','26 cm'], exp:'P = 2 × (L + l) = 2 × (8 + 5) = 2 × 13 = 26 cm.' },
      { q:'Calcule l\'aire d\'un rectangle de longueur 12 cm et largeur 7 cm.', a:'84 cm²', o:['38 cm²','96 cm²','84 cm²'], exp:'A = L × l = 12 × 7 = 84 cm².' },
      { q:'Calcule l\'aire d\'un triangle de base 10 cm et hauteur 6 cm.', a:'30 cm²', o:['60 cm²','30 cm²','15 cm²'], exp:'A = (base × hauteur) ÷ 2 = (10 × 6) ÷ 2 = 30 cm².' },
      { q:'Quel est le périmètre d\'un cercle de rayon 5 cm ? (π ≈ 3,14)', a:'31,4 cm', o:['78,5 cm','15,7 cm','31,4 cm'], exp:'P = 2 × π × r = 2 × 3,14 × 5 = 31,4 cm.' },
      { q:'Calcule l\'aire d\'un disque de rayon 4 cm. (π ≈ 3,14)', a:'50,24 cm²', o:['25,12 cm²','50,24 cm²','100,48 cm²'], exp:'A = π × r² = 3,14 × 4² = 3,14 × 16 = 50,24 cm².' },
      { q:'Un carré a une aire de 49 cm². Quelle est la longueur de son côté ?', a:'7 cm', o:['9 cm','7 cm','12,25 cm'], exp:'Aire = côté². Côté = √49 = 7 cm.' },
      { q:'Convertis : <em>3,5 m² = ? cm²</em>', a:'35 000 cm²', o:['350 cm²','3 500 cm²','35 000 cm²'], exp:'1 m² = 10 000 cm². 3,5 m² = 3,5 × 10 000 = 35 000 cm².' },
      { q:'Itachi trace un rectangle 15 cm × 8 cm. Quelle est son aire ?', a:'120 cm²', o:['46 cm²','120 cm²','180 cm²'], exp:'A = 15 × 8 = 120 cm².' },
      { q:'Un terrain carré a un périmètre de 120 m. Quelle est son aire ?', a:'900 m²', o:['30 m²','900 m²','14 400 m²'], exp:'Périmètre = 4 × côté → côté = 120 ÷ 4 = 30 m. Aire = 30² = 900 m².' },
      { q:'Quelle figure a la plus grande aire : un carré de côté 6 cm ou un rectangle 8 cm × 4 cm ?', a:'Ils ont la même aire (36 cm²)', o:['Le carré (36 cm²)','Le rectangle (32 cm²)','Ils ont la même aire (36 cm²)'], exp:'Carré : 6² = 36 cm². Rectangle : 8 × 4 = 32 cm². Le carré est plus grand.' },
      { q:'⚔️ BOSS — Itachi Uchiha ! Un dojo a la forme d\'un L : rectangle 20m×10m auquel on retire un coin de 6m×4m. Quelle est l\'aire ?', a:'176 m²', o:['200 m²','176 m²','160 m²'], exp:'Aire totale = 20 × 10 = 200 m². Coin retiré = 6 × 4 = 24 m². Aire finale = 200 − 24 = 176 m².', isBoss:true, bossName:'Itachi Uchiha' },
    ]
  },
  7: {
    name: 'Île de Minato', charName: 'Minato', color: '#0891B2',
    topic: 'Fractions — Opérations (5ème)', level: '5ème',
    bgm: 'naruto-map',
    msgs: ['Le 4ème Hokage calcule à la vitesse de l\'éclair !', 'Flash Jaune — résous avant que je disparaisse.', 'La rapidité et la précision : mes deux armes.'],
    qs: [
      { q:'Calcule : <em>1/4 + 2/4</em>', a:'3/4', o:['3/8','1/2','3/4'], exp:'Fractions de même dénominateur : 1/4 + 2/4 = (1+2)/4 = 3/4.' },
      { q:'Calcule : <em>3/5 + 1/5</em>', a:'4/5', o:['4/10','4/5','2/5'], exp:'3/5 + 1/5 = 4/5. Mêmes dénominateurs, on additionne les numérateurs.' },
      { q:'Simplifie la fraction <em>6/8</em>', a:'3/4', o:['6/8','2/3','3/4'], exp:'6/8 : on divise numérateur et dénominateur par 2 → 3/4.' },
      { q:'Calcule : <em>3 × 2/7</em>', a:'6/7', o:['6/21','5/7','6/7'], exp:'3 × 2/7 = (3 × 2)/7 = 6/7.' },
      { q:'Compare : <em>2/3 __ 3/4</em>', a:'2/3 < 3/4', o:['2/3 > 3/4','2/3 = 3/4','2/3 < 3/4'], exp:'2/3 ≈ 0,667 et 3/4 = 0,75. Donc 2/3 < 3/4.' },
      { q:'Calcule : <em>5/6 − 2/6</em>', a:'3/6 = 1/2', o:['3/6','1/3','3/6 = 1/2'], exp:'5/6 − 2/6 = 3/6 = 1/2 (en simplifiant par 3).' },
      { q:'Minato utilise 2/5 de son chakra le matin et 1/5 l\'après-midi. Quelle fraction totale ?', a:'3/5', o:['3/10','3/5','2/10'], exp:'2/5 + 1/5 = 3/5 de son chakra total.' },
      { q:'Calcule : <em>4 × 3/5</em>', a:'12/5 = 2,4', o:['7/5','12/20','12/5 = 2,4'], exp:'4 × 3/5 = 12/5 = 2 + 2/5 = 2,4.' },
      { q:'Simplifie <em>15/20</em>', a:'3/4', o:['5/4','15/20','3/4'], exp:'PGCD(15,20)=5. 15÷5=3, 20÷5=4 → 3/4.' },
      { q:'Calcule : <em>7/8 − 3/8</em>', a:'4/8 = 1/2', o:['4/8 = 1/2','4/16','10/8'], exp:'7/8 − 3/8 = 4/8 = 1/2.' },
      { q:'⚔️ BOSS FINAL — Madara Uchiha ! Minato utilise 2/3 + 1/4 de sa puissance totale. Quelle fraction a-t-il utilisée ? (même dénominateur = 12)', a:'11/12', o:['3/7','11/12','8/12'], exp:'2/3 = 8/12 et 1/4 = 3/12. Total = 11/12.', isBoss:true, bossName:'Madara Uchiha' },
    ]
  },
  8: {
    name: 'Île de Jiraiya — BOSS FINAL', charName: 'Jiraiya', color: '#DC2626',
    topic: 'Nombres relatifs (5ème)', level: '5ème',
    bgm: 'naruto-boss',
    msgs: ['Le grand Ermite Grenouille te met à l\'épreuve !', 'Positif ou négatif ? La vie est relative !', 'Mes romans et les maths — tout est une question de sens.'],
    qs: [
      { q:'Place sur une droite graduée : −3, +2, −1, +5. Quel est l\'ordre croissant ?', a:'−3 < −1 < +2 < +5', o:['−1 < −3 < +2 < +5','−3 < −1 < +2 < +5','+5 < +2 < −1 < −3'], exp:'Sur la droite des relatifs, les négatifs sont à gauche du 0, les positifs à droite. −3 < −1 < 0 < +2 < +5.' },
      { q:'Quel est l\'opposé de −7 ?', a:'+7', o:['7/1','+7','−14'], exp:'L\'opposé d\'un nombre est son symétrique par rapport à 0. L\'opposé de −7 est +7.' },
      { q:'Calcule : <em>(+5) + (−3)</em>', a:'+2', o:['−2','+8','+2'], exp:'On part de +5 et on recule de 3 : +5 − 3 = +2.' },
      { q:'Calcule : <em>(−4) + (−6)</em>', a:'−10', o:['+10','−2','−10'], exp:'Deux négatifs s\'additionnent : −4 − 6 = −10.' },
      { q:'La température est de −8°C. Elle monte de 5°C. Nouvelle température ?', a:'−3°C', o:['+3°C','−13°C','−3°C'], exp:'−8 + 5 = −3°C.' },
      { q:'Calcule : <em>(+7) − (−3)</em>', a:'+10', o:['+4','−10','+10'], exp:'Soustraire un négatif revient à additionner son opposé : +7 − (−3) = +7 + 3 = +10.' },
      { q:'Quelle est la valeur absolue de −12 ?', a:'12', o:['−12','12','0'], exp:'La valeur absolue est la distance à 0, toujours positive. |−12| = 12.' },
      { q:'Compare : <em>−5 __ −2</em>', a:'−5 < −2', o:['−5 > −2','−5 = −2','−5 < −2'], exp:'Sur la droite numérique, −5 est à gauche de −2, donc −5 < −2.' },
      { q:'Jiraiya plonge à −15 m puis monte de 8 m. À quelle profondeur est-il ?', a:'−7 m', o:['−23 m','+7 m','−7 m'], exp:'−15 + 8 = −7 m. Il est à 7 mètres sous la surface.' },
      { q:'Calcule : <em>(−3) + (+8) + (−5)</em>', a:'0', o:['+6','−16','0'], exp:'(−3) + (+8) + (−5) = −3 + 8 − 5 = 5 − 5 = 0.' },
      { q:'⚔️ BOSS FINAL ABSOLU — Pain ! Résous le défi ultime : la température à Konoha passe de −12°C à +8°C. De combien de degrés a-t-elle augmenté ?', a:'20°C', o:['−4°C','4°C','20°C'], exp:'+8 − (−12) = +8 + 12 = 20°C d\'augmentation.', isBoss:true, bossName:'Pain — Le Dieu' },
    ]
  }
};

// ══════════════════════════════════════════════════════════════
// 3. CINÉMATIQUES INTRO
// ══════════════════════════════════════════════════════════════
var PDF_ISLE_INTRO = {
  1:{bg:'#1a0a00',lines:['GRANDS…','… NOMBRES !!','L\'entraînement commence !'],kanji:'数字 !!',kanjiColor:'#F97316',bubble:"Dattebayo ! Les grands nombres n'ont aucun secret pour moi. À toi de jouer !"},
  2:{bg:'#00051a',lines:['OPÉRATIONS…','… POSÉES !!','Chidori Arithmétique !'],kanji:'計算 !!',kanjiColor:'#1D4ED8',bubble:"Frappe avec précision. Addition, soustraction — aucune erreur tolérée !"},
  3:{bg:'#1a0010',lines:['FRACTIONS…','… DÉCIMAUX !!','Sakura soigne tes lacunes !'],kanji:'分数 !!',kanjiColor:'#EC4899',bubble:"La précision est une arme. Maîtrise les fractions et les décimaux !"},
  4:{bg:'#0a0a0a',lines:['MULTIPLICATION…','… DIVISION !!','Mille techniques !'],kanji:'乗除 !!',kanjiColor:'#6B7280',bubble:"Kakashi te guide. Pose, calcule, vérifie. Pas d'erreur possible."},
  5:{bg:'#1a0e00',lines:['PROPORTION…','… NALITÉ !!','Sable de l\'Absolu !'],kanji:'比例 !!',kanjiColor:'#D97706',bubble:"Le sable ne ment pas. La proportionnalité est absolue comme ma défense !"},
  6:{bg:'#0a001a',lines:['PÉRIMÈTRE…','… AIRE !!','Sharingan Géométrique !'],kanji:'面積 !!',kanjiColor:'#7C3AED',bubble:"Mon Sharingan voit chaque millimètre. La géométrie n'a aucun secret."},
  7:{bg:'#001520',lines:['FRACTIONS…','… OPÉRATIONS !!','Flash Jaune !'],kanji:'演算 !!',kanjiColor:'#0891B2',bubble:"À la vitesse de l'éclair ! Additionne et multiplie les fractions !"},
  8:{bg:'#1a0000',lines:['NOMBRES…','… RELATIFS !!','L\'Ermite Grenouille défie !'],kanji:'相対 !!',kanjiColor:'#DC2626',bubble:"Positif, négatif — la vie est relative. Prouve ta valeur, jeune ninja !"},
};

// ══════════════════════════════════════════════════════════════
// 4. ÉTAT
// ══════════════════════════════════════════════════════════════
var pdf_currentIsland    = 0;
var pdf_answers          = {};
var pdf_completedIslands = {};
var pdf_xp               = 0;

// ══════════════════════════════════════════════════════════════
// 5. AUDIO
// ══════════════════════════════════════════════════════════════
function pdf_playBGM(track) {
  if (typeof playBGM === 'function') {
    try { playBGM(track); } catch(e) {}
  }
}
function pdf_stopBGM() {
  if (typeof stopBGM === 'function') stopBGM();
}

// ══════════════════════════════════════════════════════════════
// 6. CINÉMATIQUE
// ══════════════════════════════════════════════════════════════
function pdf_playCinematic(n, callback) {
  var cfg  = PDF_ISLE_INTRO[n];
  var isle = ISLANDS_PDF[n];
  if (!cfg || !isle) { if (callback) callback(); return; }

  var ov = document.getElementById('pdf-cine-overlay');
  if (!ov) { ov = document.createElement('div'); ov.id = 'pdf-cine-overlay'; document.body.appendChild(ov); }

  ov.innerHTML =
    '<div class="pdf-cine-inner" style="background:' + cfg.bg + ';min-height:100vh;height:100vh">' +
      '<div class="pdf-cine-char-wrap">' +
        '<img src="' + (PDF_AVATARS[n]||'') + '" class="pdf-cine-char" onerror="this.style.display=\'none\'">' +
        '<div class="pdf-cine-char-emoji" style="color:' + cfg.kanjiColor + '">' + PDF_FALLBACK[n] + '</div>' +
      '</div>' +
      '<div class="pdf-cine-content">' +
        '<div class="pdf-cine-kanji" style="color:' + cfg.kanjiColor + '">' + cfg.kanji + '</div>' +
        '<div class="pdf-cine-lines">' + cfg.lines.map(function(l){return '<div class="pdf-cine-line">'+l+'</div>';}).join('') + '</div>' +
        '<div class="pdf-cine-bubble">' +
          '<span class="pdf-cine-char-name" style="color:' + cfg.kanjiColor + '">' + isle.charName + '</span>' +
          '<span class="pdf-cine-bubble-text">"' + cfg.bubble + '"</span>' +
        '</div>' +
      '</div>' +
      '<button class="pdf-skip-btn" onclick="pdf_skipCine()">⏭ PASSER</button>' +
    '</div>';

  ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;opacity:0;transition:opacity .3s;pointer-events:auto';
  ov._cb = callback;
  requestAnimationFrame(function(){ ov.style.opacity='1'; });
  ov._t  = setTimeout(pdf_skipCine, 4500);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(cfg.bubble);
    utt.lang='fr-FR'; utt.rate=0.9; utt.pitch=1.1;
    window.speechSynthesis.speak(utt);
  }
}

function pdf_skipCine() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  var ov = document.getElementById('pdf-cine-overlay');
  if (!ov) return;
  clearTimeout(ov._t);
  var cb = ov._cb;
  ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML='';
  if (cb) cb();
}

// ══════════════════════════════════════════════════════════════
// 7. DÉMARRAGE D'UNE ÎLE
// ══════════════════════════════════════════════════════════════
function pdf_startIsland(n) {
  var isle = ISLANDS_PDF[n];
  if (!isle) return;
  pdf_playBGM(isle.bgm || 'naruto-map');
  // Leçon avant cinématique
  if (typeof lesson_paysdufeu === 'function') {
    lesson_paysdufeu(n, function() { pdf_playCinematic(n, function(){ pdf_launchIsland(n); }); });
  } else {
    pdf_playCinematic(n, function(){ pdf_launchIsland(n); });
  }
}

function pdf_launchIsland(n) {
  pdf_currentIsland = n;
  pdf_answers = {};

  var ov = document.getElementById('pdf-cine-overlay');
  if (ov) { ov.style.display='none'; ov.style.zIndex='-1'; ov.innerHTML=''; }

  var secIles = document.getElementById('pdf-iles-sec');
  var secQuiz = document.getElementById('pdf-quiz-sec');
  if (secIles) secIles.style.display='none';
  if (secQuiz) { secQuiz.style.display='block'; secQuiz.style.zIndex='5'; }
  window.scrollTo(0,0);

  var isle = ISLANDS_PDF[n];
  document.getElementById('pdf-qTitle').textContent    = isle.name + ' — ' + isle.topic;
  document.getElementById('pdf-qProgFill').style.width = '0%';
  document.getElementById('pdf-qProgLbl').textContent  = '0 / ' + isle.qs.length;

  var keys = ['A','B','C','D'];
  var html = '';
  isle.qs.forEach(function(e, i) {
    var msg    = isle.msgs[i % isle.msgs.length];
    var avatar = PDF_AVATARS[n] || '';
    var bossBanner = e.isBoss
      ? '<div class="pdf-boss-banner"><div class="pdf-boss-label">⚔️ COMBAT FINAL</div><div class="pdf-boss-name">' + (e.bossName||'BOSS') + '</div></div>'
      : '';
    var opts = e.o.map(function(opt,j){
      var safe = opt.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      return '<label class="pdf-opt" id="pdf-lbl'+i+'_'+j+'" data-qi="'+i+'" data-oi="'+j+'" data-v="'+safe+'" onclick="pdf_selectOpt(this.dataset.qi,this.dataset.oi,this.dataset.v)">' +
        '<span class="pdf-opt-key">'+keys[j]+'</span><span class="pdf-opt-txt">'+opt+'</span></label>';
    }).join('');
    html +=
      '<div class="pdf-q-card' + (e.isBoss?' pdf-boss-card':'') + '">' +
        bossBanner +
        '<div class="pdf-char-panel">' +
          '<div class="pdf-char-img">' +
            '<img src="'+avatar+'" onerror="this.style.display=\'none\'">' +
          '</div>' +
          '<div class="pdf-char-speech">' +
            '<div class="pdf-char-name">' + isle.charName + '</div>' +
            '<div class="pdf-speech-bubble">' + msg + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pdf-q-body">' +
          '<div class="pdf-q-num">Question ' + (i+1) + ' / ' + isle.qs.length + '</div>' +
          '<div class="pdf-q-txt">' + e.q + '</div>' +
          '<div class="pdf-opts">' + opts + '</div>' +
          '<div class="pdf-feedback" id="pdf-fb'+i+'"></div>' +
          '<div class="pdf-expl" id="pdf-expl'+i+'"></div>' +
        '</div>' +
      '</div>';
  });
  html += '<div class="pdf-submit-wrap"><button class="pdf-btn pdf-btn-orange" onclick="pdf_corriger('+n+')">🔥 CORRIGER MES RÉPONSES</button></div>';
  document.getElementById('pdf-qContainer').innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// 8. SÉLECTION D'UNE RÉPONSE
// ══════════════════════════════════════════════════════════════
function pdf_selectOpt(qi, oi, val) {
  qi = parseInt(qi); oi = parseInt(oi);
  var isle = ISLANDS_PDF[pdf_currentIsland];
  if (!isle) return;
  var nb = isle.qs[qi].o.length;
  for (var j = 0; j < nb; j++) {
    var lbl = document.getElementById('pdf-lbl' + qi + '_' + j);
    if (lbl) lbl.classList.remove('pdf-selected');
  }
  var sel = document.getElementById('pdf-lbl' + qi + '_' + oi);
  if (sel) sel.classList.add('pdf-selected');
  pdf_answers[qi] = val;

  // Mettre à jour la barre de progression
  var filled  = Object.keys(pdf_answers).length;
  var total   = isle.qs.length;
  var progEl  = document.getElementById('pdf-qProgFill');
  var lblEl   = document.getElementById('pdf-qProgLbl');
  if (progEl) progEl.style.width = Math.round(filled / total * 100) + '%';
  if (lblEl)  lblEl.textContent  = filled + ' / ' + total;
}

// ══════════════════════════════════════════════════════════════
// 9. CORRECTION
// ══════════════════════════════════════════════════════════════
function pdf_corriger(n) {
  var isle  = ISLANDS_PDF[n];
  if (!isle) return;
  var score = 0;

  isle.qs.forEach(function(e, i) {
    var fb   = document.getElementById('pdf-fb' + i);
    var expl = document.getElementById('pdf-expl' + i);
    var ans  = pdf_answers[i];
    var opts = document.querySelectorAll('[id^="pdf-lbl' + i + '_"]');

    opts.forEach(function(lbl){
      lbl.style.pointerEvents = 'none';
      if (lbl.dataset.v === e.a) lbl.classList.add('pdf-correct');
    });

    if (ans === e.a) {
      score++;
      if (fb) { fb.textContent = '✅ Correct !'; fb.className = 'pdf-feedback pdf-ok'; }
      if (typeof sfxOK === 'function') sfxOK();
    } else {
      if (fb) { fb.textContent = '❌ ' + (ans ? 'Mauvaise réponse.' : 'Non répondu.'); fb.className = 'pdf-feedback pdf-ko'; }
      var selLbl = ans ? document.querySelector('[id^="pdf-lbl' + i + '_"][data-v="' + ans.replace(/"/g,'&quot;') + '"]') : null;
      if (selLbl) selLbl.classList.add('pdf-wrong');
      if (typeof sfxKO === 'function') sfxKO();
    }
    if (expl) { expl.innerHTML = '💡 ' + e.exp; expl.classList.add('pdf-show'); }
  });

  pdf_completedIslands[n] = score;
  pdf_xp += score * 2;

  // Sauvegarder progression
  pdf_saveProgress(n, score, score * 2);

  // Mettre à jour barre prog à 100%
  var progEl = document.getElementById('pdf-qProgFill');
  var lblEl  = document.getElementById('pdf-qProgLbl');
  if (progEl) progEl.style.width = '100%';
  if (lblEl)  lblEl.textContent  = isle.qs.length + ' / ' + isle.qs.length;

  pdf_showResults(n, score);
}

// ══════════════════════════════════════════════════════════════
// 10. RÉSULTATS
// ══════════════════════════════════════════════════════════════
function pdf_showResults(n, score) {
  var isle   = ISLANDS_PDF[n];
  var gained = score * 2;
  var txts   = [
    {min:11,t:'HOKAGE DES MATHS ! 11/11 !!!'},
    {min:9, t:'EXCELLENT ! Niveau Jonin !'},
    {min:7, t:'Bien joué, Chunin confirmé !'},
    {min:5, t:'Continue l\'entraînement !'},
    {min:0, t:'Ne lâche pas ! Réessaie !'}
  ];
  var res  = txts.find(function(r){return score>=r.min;})||txts[txts.length-1];
  var gif  = score === isle.qs.length
    ? PDF_GIFS_PERFECT[Math.floor(Math.random()*PDF_GIFS_PERFECT.length)]
    : score >= Math.ceil(isle.qs.length*0.6)
      ? PDF_GIFS_CORRECT[score % PDF_GIFS_CORRECT.length]
      : PDF_GIFS_LOSE[0];
  var stars = isle.qs.map(function(_,i){return i<score?'⭐':'☆';}).join('');

  var html =
    '<div class="pdf-result-card" id="pdf-resCard" style="--isle-color:' + isle.color + '">' +
      '<div class="pdf-result-banner">' +
        '<img src="' + (PDF_AVATARS[n]||'') + '" class="pdf-result-avatar" onerror="this.style.display=\'none\'">' +
        '<div class="pdf-result-score-wrap">' +
          '<div class="pdf-result-score">' + score + '/' + isle.qs.length + '</div>' +
          '<div class="pdf-result-title">' + res.t + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pdf-result-body">' +
        '<div class="pdf-result-topic">📐 ' + isle.topic + '</div>' +
        '<div class="pdf-result-stars">' + stars + '</div>' +
        (gif ? '<img src="'+gif+'" class="pdf-result-gif" onerror="this.style.display=\'none\'">' : '') +
        '<div class="pdf-result-xp">+' + gained + ' XP Maths 🔥 — Total Pays du Feu : ' + pdf_xp + ' XP</div>' +
        '<button class="pdf-btn pdf-btn-orange" onclick="pdf_goBack()">🗺️ RETOUR À LA CARTE</button>' +
        '<button class="pdf-btn pdf-btn-outline" onclick="pdf_retry(' + n + ')">🔁 REJOUER</button>' +
      '</div>' +
    '</div>';

  var c = document.getElementById('pdf-qContainer');
  if (c) c.innerHTML += html;

  var stEl = document.getElementById('pdf-stars' + n);
  if (stEl) stEl.textContent = stars;

  setTimeout(function(){
    var rc = document.getElementById('pdf-resCard');
    if (rc) rc.scrollIntoView({behavior:'smooth',block:'center'});
  }, 400);

  if (score === isle.qs.length && typeof sfxPerfect === 'function') sfxPerfect();
  else if (score >= Math.ceil(isle.qs.length*0.6) && typeof sfxFanfare === 'function') sfxFanfare();
}

// ══════════════════════════════════════════════════════════════
// 11. NAVIGATION
// ══════════════════════════════════════════════════════════════
function pdf_goBack() {
  pdf_playBGM('naruto-map');
  var secQuiz = document.getElementById('pdf-quiz-sec');
  var secIles = document.getElementById('pdf-iles-sec');
  if (secQuiz) secQuiz.style.display='none';
  if (secIles) secIles.style.display='block';
  pdf_answers = {};
  window.scrollTo(0,0);
  var grid = document.getElementById('pdf-islands-grid');
  if (grid) { grid.innerHTML=''; buildPdfGrid(); }
}

function pdf_retry(n) {
  pdf_answers = {};
  pdf_startIsland(n);
}

// ══════════════════════════════════════════════════════════════
// 12. GRILLE DES ÎLES
// ══════════════════════════════════════════════════════════════
function buildPdfGrid() {
  var grid = document.getElementById('pdf-islands-grid');
  if (!grid || grid.children.length > 0) return;
  var html = '';
  for (var n = 1; n <= 8; n++) {
    var isle   = ISLANDS_PDF[n];
    var avatar = PDF_AVATARS[n] || '';
    var score  = pdf_completedIslands[n] || 0;
    var done   = pdf_completedIslands[n] !== undefined;
    var stars  = isle.qs.map(function(_,i){return i<score?'⭐':'☆';}).join('');
    html +=
      '<div class="pdf-isle-card' + (done?' done':'') + '" onclick="pdf_startIsland(' + n + ')" style="--isle-color:' + isle.color + '">' +
        '<div class="pdf-isle-img-wrap">' +
          '<img src="' + avatar + '" class="pdf-isle-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="pdf-isle-img-fallback" style="background:' + isle.color + '22;color:' + isle.color + '">' + PDF_FALLBACK[n] + '</div>' +
          '<div class="pdf-isle-overlay" style="background:linear-gradient(to top,' + isle.color + 'cc,transparent)"></div>' +
        '</div>' +
        '<div class="pdf-isle-body">' +
          '<div class="pdf-isle-num">ÎLE #' + n + '</div>' +
          '<div class="pdf-isle-name" style="color:' + isle.color + '">' + isle.charName.toUpperCase() + '</div>' +
          '<div class="pdf-isle-topic">' + isle.topic + '</div>' +
          '<div class="pdf-isle-level" style="border-color:' + isle.color + '55;color:' + isle.color + '">' + isle.level + '</div>' +
          '<div class="pdf-isle-stars" id="pdf-stars' + n + '">' + stars + '</div>' +
        '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// 13. SAUVEGARDE PROGRESSION
// ══════════════════════════════════════════════════════════════
async function pdf_saveProgress(n, score, xpGained) {
  var child = (typeof dbGetActiveChild === 'function') ? dbGetActiveChild() : null;
  if (child && typeof dbSaveProgression === 'function') {
    try {
      await dbSaveProgression(child.id, 'pdf_' + n, score, xpGained);
    } catch(e) { /* fallback localStorage */ }
  }
  // Toujours sauvegarder en localStorage
  try {
    var key  = 'pdf_progress';
    var data = JSON.parse(localStorage.getItem(key) || '{"xp":0,"completedIslands":{}}');
    data.xp = (data.xp || 0) + xpGained;
    data.completedIslands[n] = score;
    localStorage.setItem(key, JSON.stringify(data));
  } catch(e) {}
}

async function loadPdfProgress() {
  var child = (typeof dbGetActiveChild === 'function') ? dbGetActiveChild() : null;
  if (child && typeof dbGetProgression === 'function') {
    try {
      var prog = await dbGetProgression(child.id);
      prog.forEach(function(row) {
        if (String(row.island_id).startsWith('pdf_')) {
          var n = parseInt(row.island_id.replace('pdf_', ''));
          if (n >= 1 && n <= 8) {
            pdf_completedIslands[n] = row.score || 0;
            pdf_xp += row.xp || 0;
          }
        }
      });
      return;
    } catch(e) {}
  }
  try {
    var saved = localStorage.getItem('pdf_progress');
    if (!saved) return;
    var d = JSON.parse(saved);
    pdf_xp               = d.xp || 0;
    pdf_completedIslands = d.completedIslands || {};
  } catch(e) {}
}

// ══════════════════════════════════════════════════════════════
// 14. ENTRÉE DANS LE MONDE
// ══════════════════════════════════════════════════════════════
async function showPaysduFeu() {
  pdf_stopBGM();
  setTimeout(function(){ pdf_playBGM('naruto-map'); }, 300);

  var secIles = document.getElementById('pdf-iles-sec');
  if (secIles) { secIles.style.display='block'; buildPdfGrid(); }

  var bg = document.getElementById('pdf-bg');
  if (bg) bg.classList.add('visible');

  await loadPdfProgress();
  if (typeof loadPdfBgStrips === 'function') loadPdfBgStrips();
}

// Charger le fond animé — Jikan Naruto Shippuden (anime 1735) comme les autres mondes
var _pdfBgLoaded = false;
async function loadPdfBgStrips() {
  if (_pdfBgLoaded) return;
  _pdfBgLoaded = true;
  var bg = document.getElementById('pdf-bg');
  if (!bg) return;
  bg.innerHTML = '';

  // ── Priorité 1 : GIFs Naruto déjà dans Supabase (jamais de rate-limit)
  var supabaseGifs = [
    PDF_STORAGE + '/gifs/Naruto%20Shippuden%20GIF%20copie.gif',
    PDF_STORAGE + '/gifs/naruto%20shippuden%20GIF1.gif',
    PDF_STORAGE + '/gifs/Naruto%20Shippuden%20GIF2.gif',
    PDF_STORAGE + '/gifs/naruto%20shippuden%20GIF3.gif',
    PDF_STORAGE + '/gifs/naruto%20shippuden%20GIF5.gif',
    PDF_STORAGE + '/gifs/naruto%20GIF.gif',
    PDF_STORAGE + '/gifs/naruto%20GIF6.gif',
    PDF_STORAGE + '/gifs/itachi%20uchiha%20naruto%20GIF.gif',
  ];

  // ── Priorité 2 : Jikan anime artworks (si Supabase échoue)
  var urls = supabaseGifs;

  try {
    var r = await fetch('https://api.jikan.moe/v4/anime/1735/pictures');
    if (r.ok) {
      var data = await r.json();
      if (data.data && data.data.length >= 8) {
        urls = data.data.map(function(p) {
          return p.jpg.large_image_url || p.jpg.image_url;
        });
      }
    }
  } catch(e) {}

  // Distribuer en round-robin sur 5 strips
  var doubled = urls.concat(urls);
  for (var s = 0; s < 5; s++) {
    var strip = document.createElement('div');
    strip.className = 'pdf-bg-strip';
    var stripImgs = doubled.filter(function(_, i){ return i % 5 === s; });
    if (!stripImgs.length) stripImgs = doubled.slice(0, 4);
    stripImgs.forEach(function(src) {
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.loading = 'lazy';
      strip.appendChild(img);
    });
    bg.appendChild(strip);
  }
}

console.info('🔥 quiz-pays-du-feu.js chargé — Maths · Naruto · 8 îles × 11 questions');