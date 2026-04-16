// ═══════════════════════════════════════════════════════════════
// LESSON-DATA-PAYS-DU-FEU.JS V2 — Académie Pirate
// Maths × Naruto | CM2 → 3ème
// Règle PED-01 : warmup = strictement la notion de CETTE leçon
// ═══════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['paysdufeu'] = {
  color      : '#F97316',
  bg         : '#0d0500',
  textAccent : '#fbbf24',
  particles  : 'fire',
  worldName  : 'Pays du Feu',

  // ── Avatar par numéro d'île ─────────────────────────────────
  avatar: function (n) {
    var map = {
      1: 'naruto', 2: 'sakura', 3: 'sasuke',
      4: 'kakashi', 5: 'rock-lee', 6: 'hinata',
      7: 'gaara',  8: 'hokage'
    };
    return 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/pays-du-feu/characters/'
         + (map[n] || 'naruto') + '.png';
  },

  // ── Leçons CM2 ─────────────────────────────────────────────
  lessons: {

    // Île 1 — Naruto : Numération
    1: {
      heroName  : 'Naruto Uzumaki',
      heroQuote : 'Je deviendrai Hokage — et je maîtriserai les milliards !',
      rule      : 'Un nombre entier se lit par classes de 3 chiffres : milliards | millions | mille | unités',
      sections  : [
        {
          icon   : '🔢',
          title  : 'Les classes de nombres',
          color  : '#F97316',
          content: 'On regroupe les chiffres par <strong>paquets de 3</strong> en partant de la droite. Chaque paquet = une classe.',
          examples: [
            '3 427 000 000 → classe milliards : 3 | classe millions : 427 | classe mille : 000 | unités : 000',
            '7 504 321 → 7 millions 504 mille 321',
            '1 000 000 000 = un milliard'
          ]
        },
        {
          icon   : '📊',
          title  : 'Comparer et arrondir',
          color  : '#ef4444',
          content: 'Pour <strong>comparer</strong> : d\'abord compte les chiffres, puis compare de gauche à droite. Pour <strong>arrondir</strong> au million : regarde les centaines de mille.',
          examples: [
            '4 500 000 > 4 050 000 (position des dizaines de mille : 5 > 0)',
            '4 782 000 ≈ 5 000 000 (car 7 ≥ 5 en centaines de mille)',
            '4 278 000 ≈ 4 000 000 (car 2 < 5 en centaines de mille)'
          ]
        }
      ],
      heroTip: 'Naruto dit : "Pour ne pas confondre les classes, écris le nombre en séparant les groupes de 3 avec un espace !"',
      warmup : [
        { q: 'Combien de zéros dans un million ?', a: '6', o: ['4','5','6','7'] },
        { q: 'Quel est le chiffre des dizaines de mille dans 347 821 ?', a: '2', o: ['3','4','2','8'] }
      ]
    },

    // Île 2 — Sakura : Fractions & décimaux
    2: {
      heroName  : 'Sakura Haruno',
      heroQuote : 'Une fraction, c\'est une potion à moitié préparée — maîtrise le numérateur !',
      rule      : 'Fraction a/b = a parties d\'un tout découpé en b parts. Fraction décimale = dénominateur en 10, 100, 1000...',
      sections  : [
        {
          icon   : '🍕',
          title  : 'Lire et écrire une fraction',
          color  : '#ec4899',
          content: '<strong>Numérateur</strong> (en haut) = parties prises. <strong>Dénominateur</strong> (en bas) = nombre de parts égales. Si numérateur ≥ dénominateur → fraction > 1.',
          examples: [
            '3/4 = trois quarts (3 parts sur 4)',
            '5/3 > 1 car 5 > 3',
            '1/2 = 2/4 = 3/6 (fractions équivalentes)'
          ]
        },
        {
          icon   : '💧',
          title  : 'Décimaux ↔ Fractions',
          color  : '#3b82f6',
          content: 'Pour convertir une fraction en décimal : divise le numérateur par le dénominateur.',
          examples: [
            '3/4 = 3 ÷ 4 = 0,75',
            '1/8 = 1 ÷ 8 = 0,125',
            '7/10 = 0,7 (fraction décimale)'
          ]
        },
        {
          icon   : '⚖️',
          title  : 'Comparer des fractions',
          color  : '#a855f7',
          content: 'Pour comparer, réduis au même dénominateur (PPCM).',
          examples: [
            '2/3 vs 3/5 → 10/15 vs 9/15 → 2/3 > 3/5',
            '1/4 vs 1/3 → 3/12 vs 4/12 → 1/4 < 1/3'
          ]
        }
      ],
      heroTip: 'Sakura dit : "Le dénominateur dit COMBIEN de parts, le numérateur dit LESQUELLES tu prends. Ne les confonds jamais !"',
      warmup : [
        { q: '3/5 en décimal ?', a: '0,6', o: ['0,35','0,6','6','3,5'] },
        { q: 'Quelle fraction est > 1 ?', a: '7/4', o: ['3/5','1/2','7/4','4/7'] }
      ]
    },

    // Île 3 — Sasuke : Multiplication & Division
    3: {
      heroName  : 'Sasuke Uchiha',
      heroQuote : 'Un ninja connaît ses tables par cœur. Sans exception.',
      rule      : 'Critères de divisibilité : par 2 (pair), par 3 (somme chiffres divisible par 3), par 5 (fin 0 ou 5), par 9 (somme divisible par 9)',
      sections  : [
        {
          icon   : '✖️',
          title  : 'Multiplication posée',
          color  : '#3b82f6',
          content: 'Multiplie chiffre par chiffre. Chaque nouvelle ligne est décalée d\'un rang vers la gauche. Additionne les résultats partiels.',
          examples: [
            '234 × 16 : d\'abord 234×6=1404, puis 234×10=2340',
            '1404 + 2340 = 3744',
            'Ordre de grandeur : 200 × 20 = 4000 ✓'
          ]
        },
        {
          icon   : '➗',
          title  : 'Division posée',
          color  : '#F97316',
          content: '<strong>dividende = diviseur × quotient + reste</strong>. Le reste est TOUJOURS inférieur au diviseur.',
          examples: [
            '1008 ÷ 24 : 24×40=960, 1008-960=48, 48÷24=2 → quotient=42',
            '127 ÷ 5 = 25 reste 2 (car 5×25=125 et 127-125=2)',
            'Vérif : 5×25+2 = 127 ✓'
          ]
        }
      ],
      heroTip: 'Sasuke dit : "Avant de poser une multiplication, estime l\'ordre de grandeur. Ça évite les erreurs stupides."',
      warmup : [
        { q: '9 × 7 = ?', a: '63', o: ['54','63','72','56'] },
        { q: '252 est divisible par 9 ?', a: 'Oui (2+5+2=9)', o: ['Non','Oui (2+5+2=9)','Seulement par 3','Non (252 est pair)'] }
      ]
    },

    // Île 4 — Kakashi : + et − décimaux
    4: {
      heroName  : 'Kakashi Hatake',
      heroQuote : 'La virgule est sacrée. Qui la déplace perd tout.',
      rule      : 'Pour additionner ou soustraire des décimaux : ALIGNER LES VIRGULES, compléter avec des zéros si besoin',
      sections  : [
        {
          icon   : '📏',
          title  : 'La règle d\'or : aligner les virgules',
          color  : '#6b7280',
          content: 'On place chaque chiffre sous son correspondant : unités/unités, dixièmes/dixièmes, etc. On complète avec des zéros si nécessaire.',
          examples: [
            '12,45 + 3,6 → écrire 3,60 pour aligner',
            '20 − 7,35 → écrire 20,00',
            '5,3 − 2,14 → écrire 5,30'
          ]
        },
        {
          icon   : '🔢',
          title  : 'Calcul puis virgule',
          color  : '#22c55e',
          content: 'Après avoir aligné, on calcule comme avec des entiers. La virgule du résultat est sous les autres virgules.',
          examples: [
            '3,75 + 2,50 = 6,25',
            '20,00 − 7,35 = 12,65',
            '0,875 + 0,125 = 1,000 = 1'
          ]
        }
      ],
      heroTip: 'Kakashi dit : "Désolé d\'être en retard… je complétais mes zéros. ALIGNE TOUJOURS LES VIRGULES avant de calculer."',
      warmup : [
        { q: '7,5 + 2,35 = ?', a: '9,85', o: ['9,85','9,8','10,05','9,75'] },
        { q: '10 − 4,7 = ?', a: '5,3', o: ['6,3','5,7','5,3','4,3'] }
      ]
    },

    // Île 5 — Rock Lee : Mesures
    5: {
      heroName  : 'Rock Lee',
      heroQuote : 'Je ne suis pas un génie — mais je connais TOUTES les conversions !',
      rule      : 'Longueurs : ×1000 pour km→m. Masses : ×1000 pour kg→g. Durées : 1h=60min, 1min=60s (pas en base 10 !)',
      sections  : [
        {
          icon   : '📐',
          title  : 'Longueurs et masses',
          color  : '#22c55e',
          content: 'Pour convertir une grande unité en petite : <strong>multiplier</strong>. Pour convertir une petite unité en grande : <strong>diviser</strong>.',
          examples: [
            '3,5 km × 1000 = 3500 m',
            '4500 g ÷ 1000 = 4,5 kg',
            '2 km 300 m = 2300 m'
          ]
        },
        {
          icon   : '⏰',
          title  : 'Durées — attention au piège !',
          color  : '#ef4444',
          content: 'Les durées ne sont PAS en base 10 ! 1 heure = 60 minutes. Quand les minutes dépassent 60, il faut convertir.',
          examples: [
            '1h45 + 2h20 = 3h65 → 3h + 60min + 5min = 4h05',
            '8h45 + 2h35 = 10h80 = 11h20',
            'Durée entre 9h30 et 11h15 = 1h45'
          ]
        }
      ],
      heroTip: 'Rock Lee dit : "Pour les durées, souviens-toi : 60 minutes = 1 heure. Quand tu dépasses 60, tu regroupe !"',
      warmup : [
        { q: '0,75 km = ? m', a: '750 m', o: ['75 m','750 m','7500 m','7,5 m'] },
        { q: '2h15 + 1h50 = ?', a: '4h05', o: ['3h65','4h05','3h25','4h65'] }
      ]
    },

    // Île 6 — Hinata : Périmètres & Aires
    6: {
      heroName  : 'Hinata Hyuga',
      heroQuote : 'N-Naruto-kun… aire et périmètre sont deux choses différentes !',
      rule      : 'Périmètre = contour (cm, m). Aire = surface (cm², m²). Carré : P=4c, A=c². Rectangle : P=2(L+l), A=L×l',
      sections  : [
        {
          icon   : '📏',
          title  : 'Le périmètre',
          color  : '#a855f7',
          content: 'Le périmètre mesure la <strong>longueur du bord</strong> d\'une figure. Unité : cm, m, km...',
          examples: [
            'Carré côté 6 cm : P = 4 × 6 = 24 cm',
            'Rectangle 8 cm × 5 cm : P = 2 × (8+5) = 26 cm',
            'Triangle 3cm, 4cm, 5cm : P = 3+4+5 = 12 cm'
          ]
        },
        {
          icon   : '🟦',
          title  : 'L\'aire',
          color  : '#3b82f6',
          content: 'L\'aire mesure la <strong>surface intérieure</strong>. Unité : cm², m², km²... Toujours une unité au CARRÉ.',
          examples: [
            'Carré côté 6 cm : A = 6 × 6 = 36 cm²',
            'Rectangle 8 cm × 5 cm : A = 8 × 5 = 40 cm²',
            'Même périmètre ≠ même aire !'
          ]
        }
      ],
      heroTip: 'Hinata dit : "Mémo : Périmètre = je fais le tour (cm). Aire = je remplis l\'intérieur (cm²). Le ² fait toute la différence !"',
      warmup : [
        { q: 'Périmètre d\'un carré de côté 9 cm ?', a: '36 cm', o: ['18 cm','36 cm','81 cm','9 cm'] },
        { q: 'Aire d\'un rectangle 7 cm × 4 cm ?', a: '28 cm²', o: ['22 cm²','28 cm²','28 cm','11 cm²'] }
      ]
    },

    // Île 7 — Gaara : Géométrie
    7: {
      heroName  : 'Gaara du Désert',
      heroQuote : 'Dans le sable je trace des figures parfaites. La géométrie est ma force.',
      rule      : 'Triangle : somme des angles = 180°. Quadrilatères : carré (4 côtés =, 4 angles 90°), rectangle (4 angles 90°), losange (4 côtés =)',
      sections  : [
        {
          icon   : '📐',
          title  : 'Les triangles',
          color  : '#92400e',
          content: 'La somme des 3 angles d\'un triangle est toujours <strong>180°</strong>. Types : équilatéral (3 côtés =, 3 angles 60°), isocèle (2 côtés =), rectangle (1 angle 90°).',
          examples: [
            'Triangle rectangle : 90° + 35° + 55° = 180°',
            'Triangle équilatéral : 60° + 60° + 60° = 180°',
            'Si 2 angles connus → 3ème = 180° − somme des 2'
          ]
        },
        {
          icon   : '🔄',
          title  : 'Symétrie axiale',
          color  : '#22c55e',
          content: 'Un axe de symétrie divise une figure en 2 parties superposables (comme un miroir). On "plie" la figure sur l\'axe.',
          examples: [
            'Rectangle : 2 axes (milieux des côtés)',
            'Carré : 4 axes (milieux + diagonales)',
            'Cercle : infinité d\'axes'
          ]
        }
      ],
      heroTip: 'Gaara dit : "Pour trouver un axe de symétrie, imagine que tu plies la figure. Si les deux moitiés se superposent parfaitement — c\'est un axe !"',
      warmup : [
        { q: 'Un triangle a des angles 90°, 40°. Quel est le 3ème ?', a: '50°', o: ['30°','40°','50°','60°'] },
        { q: 'Combien d\'axes de symétrie a un carré ?', a: '4', o: ['1','2','4','8'] }
      ]
    },

    // Île 8 — Orochimaru (Boss) : Proportionnalité
    8: {
      heroName  : 'L\'Hokage',
      heroQuote : 'Protège Konoha avec la proportionnalité — la clé de tous les problèmes !',
      rule      : 'Proportionnalité : si on multiplie une grandeur par k, l\'autre aussi. Coefficient k = valeur1/valeur2',
      sections  : [
        {
          icon   : '🔢',
          title  : 'Tableau de proportionnalité',
          color  : '#dc2626',
          content: 'Dans un tableau proportionnel, le <strong>rapport entre valeurs correspondantes</strong> est toujours le même (= coefficient k).',
          examples: [
            '3 ramens = 9€ → k = 3. 6 ramens = 18€ (6×3)',
            'Si ×2 d\'un côté → ×2 de l\'autre',
            'Si ÷3 d\'un côté → ÷3 de l\'autre'
          ]
        },
        {
          icon   : '📈',
          title  : 'Graphiques et pourcentages',
          color  : '#3b82f6',
          content: 'Un graphique de proportionnalité est une <strong>droite passant par (0,0)</strong>. Un pourcentage est une proportion sur 100.',
          examples: [
            '25% de 200 = 200 × 25/100 = 50',
            'Échelle 1/50 000 : 1 cm carte = 500 m réel',
            'Vitesse : Distance = Vitesse × Temps'
          ]
        }
      ],
      heroTip: 'L\'Hokage dit : "Pour détecter la proportionnalité, vérifie que le RAPPORT est constant. 3/9 = 6/18 = 1/3 → proportionnel !"',
      warmup : [
        { q: '5 shuriken = 15€. Prix de 8 ?', a: '24€', o: ['20€','24€','40€','3€'] },
        { q: '20% de 500 = ?', a: '100', o: ['20','50','100','250'] }
      ]
    }

  } // fin lessons CM2
};

// ── Point d'entrée global (appelé par lesson.js) ──────────────
// Règle LG-01 : lesson_paysdufeu(numero, callback)
window.lesson_paysdufeu = function (numero, callback) {
  var registry = window.LESSON_REGISTRY && window.LESSON_REGISTRY['paysdufeu'];
  if (!registry) { if (callback) callback(); return; }

  var lessonData = registry.lessons[numero];
  if (!lessonData) { if (callback) callback(); return; }

  if (typeof showLesson === 'function') {
    showLesson('paysdufeu', numero, lessonData, registry, callback);
  } else {
    if (callback) callback();
  }
};
