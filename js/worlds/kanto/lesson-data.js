// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA-KANTO.JS — Académie Pirate V2
// ⚔️ Kanto · Sciences · Demon Slayer
// Pattern exact Grand Bleu / Magnolia : LESSON_REGISTRY par niveau
// 5 niveaux × 8 îles = 40 entrées prévues (CM2 d'abord)
// ═══════════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

var _DS = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer/characters/';

// ══════════════════════════════════════════════════════════════════
// CM2 — Sciences & technologie cycle 3 (BO 2020 + 2023)
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['kanto_cm2'] = {
  color:'#f97316', bg:'#0a0500', textAccent:'#fbbf24',
  particles:'sword', worldName:'Kanto',
  lessons:{
    1:{
      heroName:'Tanjiro',
      heroQuote:'Solide, liquide, gaz — la matière prend trois visages, comme mes techniques de respiration !',
      rule:'La matière existe sous trois états : solide (forme fixe), liquide (épouse le récipient), gaz (occupe tout l\'espace). Les changements d\'état sont des transformations physiques.',
      sections:[
        {icon:'❄️',title:'Les trois états',color:'#3b82f6',
         content:'Solide = matière dure avec une forme propre (glace). Liquide = matière qui coule et prend la forme du récipient (eau). Gaz = matière invisible qui remplit tout l\'espace (vapeur).',
         examples:['Glaçon → solide','Eau qui coule → liquide','Vapeur de la bouilloire → gaz']},
        {icon:'🔄',title:'Les changements d\'état',color:'#f97316',
         content:'Fusion = solide → liquide (glace qui fond). Solidification = liquide → solide (eau qui gèle). Vaporisation = liquide → gaz (eau qui bout). Condensation = gaz → liquide (buée).',
         examples:['Glaçon dans un verre → fusion','Eau au congélateur → solidification','Casserole qui bout → vaporisation']},
        {icon:'🧪',title:'Les mélanges',color:'#22c55e',
         content:'Mélange homogène = on ne distingue plus les parties (eau + sel). Mélange hétérogène = on voit les parties (eau + sable). On sépare avec filtre, décantation ou évaporation.',
         examples:['Eau salée → homogène (le sel a disparu)','Eau + sable → hétérogène (sable visible)','Filtre à café → sépare le marc']}
      ],
      heroTip:'Tanjiro dit : "Pour retenir : F-S-V-C. Fusion (vers liquide), Solidification (vers solide), Vaporisation (vers gaz), Condensation (vers liquide). 4 transformations, 1 cycle !"',
      warmup:[
        {q:'Quand la glace fond, elle passe de l\'état :',a:'Solide à liquide',o:['Solide à liquide','Liquide à gaz','Gaz à solide']},
        {q:'L\'eau qui bout dans une casserole devient :',a:'Un gaz (vapeur)',o:['Un gaz (vapeur)','Un solide','Un mélange']}
      ]
    },
    2:{
      heroName:'Nezuko',
      heroQuote:'Soleil, vent, eau — la nature donne l\'énergie. Et moi, je transforme la mienne en force pure !',
      rule:'L\'énergie vient de plusieurs sources. Renouvelables = elles se reconstituent vite (soleil, vent, eau). Non renouvelables = elles s\'épuisent (charbon, pétrole, uranium).',
      sections:[
        {icon:'☀️',title:'Énergies renouvelables',color:'#fbbf24',
         content:'Soleil → panneaux solaires (électricité). Vent → éoliennes. Eau → barrages hydrauliques. Biomasse → bois. Ces sources ne s\'épuisent pas à l\'échelle humaine.',
         examples:['Panneau solaire sur un toit','Éolienne dans un champ','Barrage qui produit de l\'électricité']},
        {icon:'🛢️',title:'Énergies non renouvelables',color:'#6b7280',
         content:'Charbon, pétrole, gaz naturel : combustibles fossiles formés en millions d\'années. Uranium : combustible nucléaire. Une fois épuisés, on ne peut pas les recréer rapidement.',
         examples:['Pétrole pour les voitures','Charbon pour le chauffage','Uranium pour le nucléaire']},
        {icon:'⚡',title:'Transformations d\'énergie',color:'#a855f7',
         content:'L\'énergie se transforme : pile (chimique → électrique), ampoule (électrique → lumière + chaleur), corps humain (chimique → mouvement).',
         examples:['Pile → électrique → ampoule → lumière','Aliments → corps qui bouge','Soleil → panneau → électricité']}
      ],
      heroTip:'Nezuko dit : "Renouvelables = R comme Reproduit vite (Soleil, Vent, Eau). Non renouvelables = N comme N\'reviennent pas (pétrole, charbon, uranium). Simple !"',
      warmup:[
        {q:'Lequel est une énergie renouvelable ?',a:'Le vent',o:['Le vent','Le pétrole','Le charbon']},
        {q:'Une éolienne transforme l\'énergie de :',a:'Le vent en électricité',o:['Le vent en électricité','Le soleil en chaleur','L\'eau en gaz']}
      ]
    },
    3:{
      heroName:'Zenitsu',
      heroQuote:'AAAAH ! L\'électricité est dangereuse mais utile — comme ma technique du dieu du tonnerre !',
      rule:'Un circuit électrique simple a 3 éléments : un générateur (pile), un récepteur (ampoule), des fils. Le circuit doit être fermé pour que le courant circule.',
      sections:[
        {icon:'🔋',title:'Le circuit fermé',color:'#eab308',
         content:'Pile = source de courant (2 bornes : ⊕ et ⊖). Fils = chemin du courant. Ampoule = récepteur qui s\'allume. Interrupteur = ouvre/ferme le circuit.',
         examples:['Pile + fils + ampoule + interrupteur fermé → ampoule allumée','Interrupteur ouvert → pas de courant','2 piles → ampoule plus brillante']},
        {icon:'🔌',title:'Conducteurs et isolants',color:'#3b82f6',
         content:'Conducteurs = laissent passer le courant (métaux : cuivre, fer, or). Isolants = bloquent le courant (plastique, bois, verre, caoutchouc).',
         examples:['Fil en cuivre → conduit','Gaine en plastique → isole','Eau salée → conduit (danger !)']},
        {icon:'⚠️',title:'Sécurité électrique',color:'#ef4444',
         content:'Ne jamais toucher une prise avec des mains mouillées. Ne jamais introduire d\'objet dans une prise. Disjoncteur = coupe l\'électricité en cas de problème.',
         examples:['Mains sèches avant la prise','Cache-prises pour les enfants','Couper le disjoncteur avant de réparer']}
      ],
      heroTip:'Zenitsu dit : "Pour qu\'un circuit MARCHE, il faut qu\'il soit FERMÉ. Pour SE PROTÉGER, il faut être ISOLÉ (gants, chaussures sèches). Marche fermé, protection isolée !"',
      warmup:[
        {q:'Pour qu\'une ampoule s\'allume, le circuit doit être :',a:'Fermé',o:['Fermé','Ouvert','Cassé']},
        {q:'Lequel est un bon conducteur d\'électricité ?',a:'Le cuivre',o:['Le cuivre','Le bois','Le plastique']}
      ]
    },
    4:{
      heroName:'Inosuke',
      heroQuote:'GRAOOOH ! Animaux, plantes, champignons — il faut tous les classer pour les comprendre !',
      rule:'Les êtres vivants sont classés selon les caractères qu\'ils PARTAGENT. Les grands règnes : animaux, végétaux, champignons, bactéries. Les animaux se subdivisent en mammifères, oiseaux, reptiles, poissons, insectes, etc.',
      sections:[
        {icon:'🐺',title:'Les mammifères',color:'#a855f7',
         content:'Caractères : poils, allaitement des petits, respiration par poumons, sang chaud. Vivipares (naissent vivants) sauf rares exceptions.',
         examples:['Chien, chat, vache','Baleine, dauphin (mammifères marins)','Humain']},
        {icon:'🦅',title:'Oiseaux, reptiles, poissons',color:'#3b82f6',
         content:'Oiseaux : plumes, bec, œufs, 2 pattes, ailes. Reptiles : écailles, sang froid (serpent, lézard). Poissons : écailles, branchies, vivent dans l\'eau.',
         examples:['Aigle, poule → oiseaux','Serpent, tortue → reptiles','Truite, requin → poissons']},
        {icon:'🐛',title:'Insectes et autres',color:'#22c55e',
         content:'Insectes : 6 pattes, 3 parties (tête, thorax, abdomen), souvent ailes. Plantes : font la photosynthèse. Champignons : règne à part (ni plante ni animal).',
         examples:['Abeille, fourmi, papillon → insectes','Arbre, fleur, herbe → plantes','Cèpe, champignon de Paris → champignons']}
      ],
      heroTip:'Inosuke dit : "Pour reconnaître un MAMMIFÈRE : 3 P → Poils + Petits allaités + Poumons. Pour un OISEAU : 3 P → Plumes + Pondre + Picorer (bec). Trois P = Trois groupes !"',
      warmup:[
        {q:'Quel est le caractère propre aux mammifères ?',a:'Ils ont des poils et allaitent leurs petits',o:['Ils ont des poils et allaitent leurs petits','Ils ont des plumes','Ils pondent des œufs toujours']},
        {q:'Combien de pattes a un insecte ?',a:'6 pattes',o:['6 pattes','4 pattes','8 pattes']}
      ]
    },
    5:{
      heroName:'Giyu',
      heroQuote:'L\'alimentation équilibrée est la base de la force — comme la respiration de l\'eau pour mes techniques.',
      rule:'L\'alimentation apporte l\'énergie et les nutriments pour grandir. Les groupes : glucides (énergie), protéines (construction), lipides (réserve), vitamines/minéraux (santé). Une alimentation équilibrée = variée.',
      sections:[
        {icon:'🍞',title:'Les groupes d\'aliments',color:'#fbbf24',
         content:'Glucides = pain, pâtes, riz (énergie rapide). Protéines = viande, poisson, œufs, légumineuses (construction). Lipides = huile, beurre (réserve d\'énergie).',
         examples:['Pain → glucides','Poulet → protéines','Huile d\'olive → lipides']},
        {icon:'🥗',title:'Vitamines et minéraux',color:'#22c55e',
         content:'Fruits et légumes apportent vitamines (C, A, B...), minéraux (calcium, fer) et fibres. Le calcium (lait) renforce les os. Le fer (épinards) combat la fatigue.',
         examples:['Orange → vitamine C','Lait → calcium','Épinards → fer']},
        {icon:'❄️',title:'Conservation des aliments',color:'#3b82f6',
         content:'Le froid (réfrigérateur, congélateur) ralentit les microbes. Cuisson, séchage, salage, stérilisation conservent aussi. La date limite (DLC) protège la santé.',
         examples:['Yaourt au frigo (4°C)','Viande au congélateur (-18°C)','Conserve stérilisée → 1 an']}
      ],
      heroTip:'Giyu dit : "Repas équilibré = 1 plat de chaque groupe. Pain (glucides) + Poisson (protéines) + Légumes (vitamines) + Yaourt (calcium). 4 groupes, 1 repas, équilibre parfait !"',
      warmup:[
        {q:'Lequel est riche en protéines ?',a:'La viande',o:['La viande','Le pain','L\'huile']},
        {q:'Pourquoi mettre les yaourts au réfrigérateur ?',a:'Pour ralentir les microbes',o:['Pour ralentir les microbes','Pour les rendre durs','Pour leur donner du goût']}
      ]
    },
    6:{
      heroName:'Shinobu',
      heroQuote:'De la graine à la fleur, du papillon à l\'œuf — la vie suit toujours un cycle. Élégant, n\'est-ce pas ?',
      rule:'Tous les êtres vivants se reproduisent et grandissent. Reproduction sexuée = fusion de cellules de 2 parents. Croissance = augmentation de taille au cours du temps.',
      sections:[
        {icon:'🌸',title:'Reproduction des plantes',color:'#ec4899',
         content:'Fleurs → pollinisation (insectes ou vent transportent le pollen) → fruits avec graines. Les graines germent (eau + chaleur + oxygène) et donnent une nouvelle plante.',
         examples:['Abeille pollinise une fleur','Pomme = fruit avec pépins','Graine de haricot germe en pousse']},
        {icon:'🐦',title:'Reproduction animale',color:'#3b82f6',
         content:'Ovipares = pondent des œufs (oiseaux, reptiles, poissons, insectes). Vivipares = petits naissent vivants (mammifères). Tous : besoin d\'un mâle et d\'une femelle.',
         examples:['Poule pond des œufs (ovipare)','Chatte met bas des chatons (vivipare)','Œuf de papillon → chenille → chrysalide → papillon']},
        {icon:'📈',title:'Croissance et développement',color:'#22c55e',
         content:'Bébé → enfant → ado → adulte. La croissance dure ~18 ans chez l\'humain, avec une poussée à l\'adolescence. Besoins : nourriture, eau, sommeil, affection.',
         examples:['Bébé : marche à 1 an','Ado : pousse de 5-10 cm/an','Plante : pousse vers la lumière']}
      ],
      heroTip:'Shinobu dit : "Cycle du papillon = ŒCCP : Œuf, Chenille, Chrysalide, Papillon. Chaque étape transforme la précédente. La métamorphose, c\'est la magie de la vie !"',
      warmup:[
        {q:'Comment se reproduit la plupart des oiseaux ?',a:'En pondant des œufs',o:['En pondant des œufs','En donnant naissance directement','En se divisant']},
        {q:'À quoi servent les fleurs ?',a:'À la reproduction des plantes',o:['À la reproduction des plantes','À nourrir l\'arbre','À décorer seulement']}
      ]
    },
    7:{
      heroName:'Kanao',
      heroQuote:'... La Terre danse autour du Soleil. Le rythme du cosmos est immuable.',
      rule:'La Terre est la 3ème planète du système solaire. Elle tourne sur elle-même en 24h (jour/nuit) et autour du Soleil en 365 jours (année). L\'inclinaison de son axe crée les saisons.',
      sections:[
        {icon:'🌞',title:'Le système solaire',color:'#fbbf24',
         content:'Le Soleil = étoile au centre. 8 planètes tournent autour : Mercure, Vénus, Terre, Mars (rocheuses), Jupiter, Saturne, Uranus, Neptune (gazeuses). Pluton = planète naine.',
         examples:['Mercure : la plus proche du Soleil','Jupiter : la plus grosse','Terre : la nôtre, 3ème position']},
        {icon:'🌗',title:'Jour, nuit et année',color:'#6366f1',
         content:'Rotation = la Terre tourne sur elle-même → 24 heures = 1 jour. Révolution = la Terre tourne autour du Soleil → 365,25 jours = 1 an.',
         examples:['Le Soleil "se lève" car la Terre tourne','La Lune nous éclaire la nuit','365 jours = 1 année (1 tour autour du Soleil)']},
        {icon:'🌳',title:'Les saisons',color:'#22c55e',
         content:'L\'axe de la Terre est incliné de 23,5°. Quand l\'hémisphère nord est tourné vers le Soleil → été. Sinon → hiver. Au milieu : printemps et automne.',
         examples:['Été : jours longs, soleil haut','Hiver : jours courts, soleil bas','Équinoxes : jour = nuit (printemps/automne)']}
      ],
      heroTip:'Kanao dit : "Rotation = jour/nuit (24h). Révolution = saisons (1 an). L\'inclinaison de l\'axe = pourquoi il y a 4 saisons. Sans inclinaison, on aurait toujours la même météo !"',
      warmup:[
        {q:'Pourquoi y a-t-il le jour et la nuit ?',a:'La Terre tourne sur elle-même',o:['La Terre tourne sur elle-même','Le Soleil s\'éteint la nuit','La Lune cache le Soleil']},
        {q:'Combien de temps la Terre met-elle à tourner autour du Soleil ?',a:'1 an (365 jours)',o:['1 an (365 jours)','1 jour','1 mois']}
      ]
    },
    8:{
      heroName:'Rengoku',
      heroQuote:'ENFLAMME TON CŒUR ! La Terre est puissante — volcans et séismes, nous devons les comprendre pour nous protéger !',
      rule:'La Terre est dynamique : volcans et séismes viennent de son activité interne (chaleur + plaques tectoniques). Tempêtes et inondations viennent de l\'atmosphère. Connaître les risques permet de se protéger.',
      sections:[
        {icon:'🌋',title:'Volcans et séismes',color:'#ef4444',
         content:'Volcan = roche en fusion (lave) qui sort par une fissure. Séisme = tremblement causé par le mouvement des plaques tectoniques. Tsunami = vague géante après séisme sous-marin.',
         examples:['Vésuve, Etna : volcans actifs','Séisme du Japon 2011','Tsunami de l\'océan Indien 2004']},
        {icon:'🌪️',title:'Phénomènes atmosphériques',color:'#3b82f6',
         content:'Tempête = vents très violents. Cyclone/ouragan = tempête tropicale. Inondation = eau qui déborde et envahit un lieu. Causés par météo extrême.',
         examples:['Tempête de neige en montagne','Ouragan tropical aux Antilles','Crue de la Seine à Paris']},
        {icon:'🛡️',title:'Se protéger des risques',color:'#22c55e',
         content:'Connaître les zones à risques. Avoir un kit d\'urgence (eau, lampe, radio). Suivre les consignes officielles. Construire avec normes anti-sismiques.',
         examples:['Plan d\'évacuation à l\'école','Kit d\'urgence : 3L d\'eau/personne/jour','Maison anti-sismique : structure souple']}
      ],
      heroTip:'Rengoku dit : "Volcans + Séismes = Terre INTERNE (cœur chaud). Tempêtes + Inondations = Terre EXTERNE (atmosphère). Deux origines différentes, deux protections différentes !"',
      warmup:[
        {q:'Un volcan crache de la :',a:'Lave (roche en fusion)',o:['Lave (roche en fusion)','Eau froide','Glace']},
        {q:'Que faut-il faire en cas de séisme ?',a:'Se protéger sous une table solide',o:['Se protéger sous une table solide','Courir dehors immédiatement','Sauter par la fenêtre']}
      ]
    }
  }
};

console.info('⚔️ lesson-data-kanto.js — 8 leçons CM2 Sciences × Demon Slayer chargées (LESSON_REGISTRY V2)');
