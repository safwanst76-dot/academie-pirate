// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA.JS — 🔥 Pays du Feu — Maths / Naruto
// Données pédagogiques : règles, exemples, questions échauffement
// Moteur : js/lesson.js (ne pas modifier ici)
// Règle A3 : les données sont séparées du moteur
// ═══════════════════════════════════════════════════════════════════

// Enregistrement dans le registry global
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['paysdufeu'] = {
    color: '#F97316', bg: '#0d0500', textAccent: '#FFD700',
    particles: 'fire', worldName: 'Pays du Feu',
    avatar: function(n){ return { 1:'gifs/naruto%20GIF6.gif',2:'characters/sasuke.png',3:'characters/sakura.jpg',4:'characters/hatake%20kakashi.jpeg',5:'characters/gaara%20.jpg',6:'gifs/itachi%20uchiha%20naruto%20GIF.gif',7:'characters/minato%20.jpg',8:'characters/jiraiya.webp' }; },
    avatarBase: 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu/',
    lessons: {
      1: {
        heroName:'Naruto', heroQuote:'Dattebayo ! Les grands nombres sont comme mes clones — plus il y en a, plus c\'est puissant !',
        rule:'Un grand nombre se lit et s\'écrit chiffre par chiffre en séparant les tranches de 3. Valeur positionnelle = place du chiffre × puissance de 10',
        sections:[
          {icon:'🔢',title:'Lire et écrire les grands nombres', color:'#F97316',
           content:'On regroupe les chiffres <strong>par 3 en partant de la droite</strong> : milliards · millions · milliers · unités.',
           examples:['1 234 567 = 1 million 234 mille 567','3 000 000 = trois millions','On dit "372 450" et pas "trois-cent-soixante-douze-mille-quatre-cent-cinquante" — mais on ÉCRIT tout ça !']},
          {icon:'📍',title:'La valeur positionnelle', color:'#FFD700',
           content:'Chaque chiffre a une <strong>valeur selon sa position</strong>. Dans 372 450, le chiffre 7 est en position des dizaines de milliers : sa valeur est 70 000.',
           examples:['372 450 : le 3 vaut 300 000 · le 7 vaut 70 000 · le 2 vaut 2 000','Critère ÷2 : se termine par 0, 2, 4, 6 ou 8','Critère ÷5 : se termine par 0 ou 5 · Critère ÷10 : se termine par 0']},
          {icon:'💡',title:'Calcul mental × et ÷ par 10, 100, 1000', color:'#06d6a0',
           content:'<strong>×10</strong> = ajouter un zéro · <strong>÷10</strong> = enlever un zéro (ou décaler la virgule). Règle de base pour tous les calculs rapides.',
           examples:['37 × 100 = 3 700 · 450 ÷ 10 = 45 · 8 × 1000 = 8 000','Naruto crée 30 clones × 10 = 300 clones en tout','Pour × 40 : d\'abord × 4 puis × 10']}
        ],
        heroTip:'Naruto dit : "Pour lire un grand nombre, sépare par groupes de 3 depuis la droite : milliards · millions · milliers !"',
        warmup:[
          {q:'Quelle est la valeur du chiffre 5 dans 2 350 000 ?',a:'50 000',o:['5 000','50 000','500 000']},
          {q:'480 ÷ 10 = ?',a:'48',o:['4 800','48','4,8']}
        ]
      },
      2: {
        heroName:'Sasuke', heroQuote:'Chaque calcul posé est comme un Chidori — précision absolue, sinon tu rates ta cible !',
        rule:'Addition posée : aligner les unités sous les unités, dizaines sous les dizaines. Partir des unités, gérer les retenues. Soustraction : emprunter si nécessaire.',
        sections:[
          {icon:'➕',title:'Addition posée — la retenue', color:'#1D4ED8',
           content:'Poser l\'addition en colonnes, commencer par les <strong>unités</strong>. Si la somme ≥ 10 : écrire les unités et retenir 1 (ou plus) à la colonne suivante.',
           examples:['3 847 + 2 965 : unités 7+5=12 (écrire 2, retenir 1)','Dizaines : 4+6+1(retenue)=11 (écrire 1, retenir 1)','Centaines : 8+9+1=18 (écrire 8, retenir 1) → 6 812']},
          {icon:'➖',title:'Soustraction posée — l\'emprunt', color:'#e63946',
           content:'Si le chiffre du dessus est plus petit que celui du dessous, <strong>emprunter</strong> 10 à la colonne de gauche.',
           examples:['10 000 − 3 547 : unités 0 − 7 impossible → emprunter','On travaille toujours de droite à gauche','Vérification : résultat + soustrahende = minuende']}
        ],
        heroTip:'Sasuke dit : "Toujours commencer par les UNITÉS (droite). Retenue en addition, Emprunt en soustraction !"',
        warmup:[
          {q:'5 000 − 2 347 = ?',a:'2 653',o:['2 653','2 763','3 653']},
          {q:'4 286 + 3 857 = ?',a:'8 143',o:['8 043','8 143','7 143']}
        ]
      },
      3: {
        heroName:'Sakura', heroQuote:'Les fractions sont comme les chakra points — il faut les partager avec précision !',
        rule:'Une fraction a/b = a parties sur b parties égales. b > a → fraction < 1. Pour convertir en décimal : diviser le numérateur par le dénominateur.',
        sections:[
          {icon:'🌸',title:'Lire et représenter une fraction', color:'#EC4899',
           content:'La fraction <strong>3/4</strong> signifie : on divise en 4 parts égales et on prend 3. Le <strong>numérateur</strong> (dessus) = parties prises · <strong>dénominateur</strong> (dessous) = total des parts.',
           examples:['3/4 de 480 = 480 ÷ 4 × 3 = 360','1/2 = 0,5 · 1/4 = 0,25 · 3/4 = 0,75','Si numérateur > dénominateur → fraction > 1 (ex : 7/4 = 1,75)']},
          {icon:'🔢',title:'Fractions et décimaux', color:'#FFD700',
           content:'Tout décimal peut s\'écrire en fraction : <strong>0,7 = 7/10</strong> · <strong>0,25 = 25/100 = 1/4</strong>. Pour comparer, ramener au même dénominateur ou convertir en décimaux.',
           examples:['0,45 > 0,4 car 0,450 > 0,400','2/3 ≈ 0,667 et 3/4 = 0,75 → 2/3 < 3/4','Pour comparer 3/5 et 5/8 : 3/5 = 24/40 et 5/8 = 25/40 → 3/5 < 5/8']}
        ],
        heroTip:'Sakura dit : "Pour trouver une fraction d\'un nombre : DIVISE par le dénominateur, MULTIPLIE par le numérateur !"',
        warmup:[
          {q:'3/4 de 120 = ?',a:'90',o:['90','30','80']},
          {q:'Quel décimal correspond à 7/10 ?',a:'0,7',o:['0,07','7','0,7']}
        ]
      },
      4: {
        heroName:'Kakashi', heroQuote:'Mille techniques copiées, une seule méthode : poser, calculer, vérifier — sans exception !',
        rule:'Multiplication posée : multiplier par les unités puis les dizaines en décalant. Division euclidienne : dividende = diviseur × quotient + reste (reste < diviseur)',
        sections:[
          {icon:'✖️',title:'Multiplication posée', color:'#6B7280',
           content:'Multiplier <strong>chiffre par chiffre</strong> en commençant par les unités. Pour les dizaines : décaler d\'un rang (ajouter un 0).',
           examples:['347 × 6 : 6×7=42 (2, ret.4) · 6×4+4=28 (8, ret.2) · 6×3+2=20 → 2 082','347 × 24 = 347×4 + 347×20 = 1 388 + 6 940 = 8 328','Vérification : résultat ÷ un facteur = l\'autre facteur']},
          {icon:'÷',title:'Division euclidienne', color:'#FFD700',
           content:'Diviser c\'est partager. <strong>Quotient</strong> = résultat · <strong>Reste</strong> = ce qu\'il reste (toujours < diviseur).',
           examples:['2 856 ÷ 8 : combien de fois 8 dans 28 ? 3 fois → 28−24=4 · descendre 5 → 45 ÷ 8 = 5 reste 5... → quotient 357','Vérification : 357 × 8 = 2 856 ✓ (reste 0)','1 247 ÷ 6 = 207 reste 5 → vérif : 207×6+5 = 1 247 ✓']}
        ],
        heroTip:'Kakashi dit : "Après toute division, VÉRIFIE : diviseur × quotient + reste = dividende !"',
        warmup:[
          {q:'1 500 ÷ 6 = ?',a:'250',o:['150','250','25']},
          {q:'246 × 7 = ?',a:'1 722',o:['1 622','1 722','1 822']}
        ]
      },
      5: {
        heroName:'Gaara', heroQuote:'La proportionnalité est absolue — comme mon sable qui suit toujours les mêmes règles !',
        rule:'Une situation est proportionnelle si le rapport entre les deux grandeurs est toujours le même (coefficient de proportionnalité).',
        sections:[
          {icon:'📊',title:'Reconnaître la proportionnalité', color:'#D97706',
           content:'Dans un tableau de proportionnalité, en multipliant une valeur par un nombre, on multiplie l\'autre par le même nombre. Le coefficient k = y/x.',
           examples:['2→8, 3→12, 5→20 : k = 4 (toujours la même) → proportionnel','2→8, 3→12, 4→17 : 17÷4 ≈ 4,25 ≠ 4 → PAS proportionnel','Vitesse constante = proportionnalité (distance = vitesse × temps)']},
          {icon:'%',title:'Pourcentages', color:'#FFD700',
           content:'Un <strong>pourcentage</strong> est une fraction de dénominateur 100. 25% = 25/100 = 1/4. Pour calculer x% de N : N × x ÷ 100.',
           examples:['20% de 80 = 80 × 20 ÷ 100 = 16','Remise de 20% sur 80€ → prix = 80 − 16 = 64€','10% de N = N ÷ 10 (méthode rapide : déplacer la virgule)']}
        ],
        heroTip:'Gaara dit : "Pour vérifier la proportionnalité : divise chaque y par son x. Si toujours pareil → proportionnel !"',
        warmup:[
          {q:'Ce tableau est-il proportionnel ? 2→6, 4→12, 5→15',a:'Oui, coefficient = 3',o:['Oui, coefficient = 3','Non','Oui, coefficient = 2']},
          {q:'25% de 200 = ?',a:'50',o:['25','75','50']}
        ]
      },
      6: {
        heroName:'Itachi', heroQuote:'Le Sharingan voit chaque angle — comme moi tu dois voir chaque mesure avec précision !',
        rule:'Périmètre = somme de tous les côtés. Aire = surface intérieure. Formules : Rectangle P=2(L+l) A=L×l · Triangle A=(b×h)÷2 · Disque P=2πr A=πr²',
        sections:[
          {icon:'📐',title:'Périmètre des figures', color:'#7C3AED',
           content:'Le <strong>périmètre</strong> est la longueur du contour. Pour un cercle : P = 2 × π × r (avec π ≈ 3,14).',
           examples:['Rectangle 8×5 : P = 2×(8+5) = 26 cm','Cercle r=5 : P = 2×3,14×5 = 31,4 cm','Carré côté 7 : P = 4×7 = 28 cm']},
          {icon:'⬛',title:'Aire des figures', color:'#FFD700',
           content:'L\'<strong>aire</strong> mesure la surface en cm², m², etc. 1 m² = 10 000 cm². Divise une figure complexe en formes simples !',
           examples:['Rectangle 12×7 : A = 12×7 = 84 cm²','Triangle base 10 hauteur 6 : A = (10×6)÷2 = 30 cm²','Disque r=4 : A = 3,14×4² = 3,14×16 = 50,24 cm²']}
        ],
        heroTip:'Itachi dit : "Périmètre = TOUR (cm). Aire = SURFACE (cm²). Ne mélange jamais les unités !"',
        warmup:[
          {q:'Périmètre d\'un rectangle 9cm × 4cm ?',a:'26 cm',o:['36 cm','26 cm','13 cm']},
          {q:'Aire d\'un triangle base 8cm hauteur 5cm ?',a:'20 cm²',o:['40 cm²','20 cm²','10 cm²']}
        ]
      },
      7: {
        heroName:'Minato', heroQuote:'Le Flash Jaune calcule en un instant — maîtrise les fractions pour être aussi rapide que moi !',
        rule:'Addition de fractions de même dénominateur : additionner les numérateurs. Multiplier une fraction par un entier : multiplier le numérateur. Simplifier : diviser par le PGCD.',
        sections:[
          {icon:'⚡',title:'Addition et soustraction de fractions', color:'#0891B2',
           content:'Si les <strong>dénominateurs sont identiques</strong> : additionner les numérateurs. Si différents : trouver un dénominateur commun.',
           examples:['3/5 + 1/5 = (3+1)/5 = 4/5','7/8 − 3/8 = (7−3)/8 = 4/8 = 1/2','Pour 2/3 + 1/4 : LCD=12 → 8/12 + 3/12 = 11/12']},
          {icon:'✖️',title:'Multiplier une fraction par un entier', color:'#FFD700',
           content:'Multiplier une fraction par un entier : multiplier le <strong>numérateur</strong> par l\'entier.',
           examples:['3 × 2/7 = (3×2)/7 = 6/7','4 × 3/5 = 12/5 = 2,4','2 × 5/8 = 10/8 = 5/4 = 1,25']}
        ],
        heroTip:'Minato dit : "Fractions de MÊME dénominateur → ajoute les numérateurs. Sinon → trouve le dénominateur commun !"',
        warmup:[
          {q:'2/7 + 3/7 = ?',a:'5/7',o:['5/14','5/7','6/7']},
          {q:'4 × 3/5 = ?',a:'12/5',o:['12/5','12/20','7/5']}
        ]
      },
      8: {
        heroName:'Jiraiya', heroQuote:'L\'Ermite Grenouille t\'apprend les nombres relatifs — positifs comme la vie, négatifs comme mes romans !',
        rule:'Les nombres relatifs ont un signe + ou −. Valeur absolue = distance à 0 (toujours positive). Addition : même signe → additionner · signes différents → soustraire.',
        sections:[
          {icon:'🌡️',title:'Les nombres relatifs', color:'#DC2626',
           content:'Les entiers relatifs incluent positifs (+) et négatifs (−). Sur la droite numérique : les négatifs sont à gauche de 0, les positifs à droite.',
           examples:['−5 < −2 < 0 < +3 < +7 (ordre croissant)','|−8| = 8 (valeur absolue = distance à 0)','Opposé de −7 = +7 · Opposé de +4 = −4']},
          {icon:'➕➖',title:'Calculer avec les relatifs', color:'#FFD700',
           content:'(+5) + (−3) = +2 (on recule de 3 depuis +5). (−4) + (−6) = −10 (deux négatifs → on additionne). (+7) − (−3) = +7 + 3 = +10.',
           examples:['Soustraire un négatif = ajouter son opposé','−8°C + 5°C = −3°C (on monte de 5)','(−3) + (+8) + (−5) = 0']}
        ],
        heroTip:'Jiraiya dit : "Pour soustraire un négatif : ADDITIONNE son opposé ! (+7) − (−3) = +7 + (+3) = +10 !"',
        warmup:[
          {q:'Quel est l\'opposé de −12 ?',a:'+12',o:['+12','−24','0']},
          {q:'(+8) + (−5) = ?',a:'+3',o:['+13','+3','−3']}
        ]
      }
    }
  };

console.info('🔥 lesson-data pays-du-feu chargé — 8 îles');
