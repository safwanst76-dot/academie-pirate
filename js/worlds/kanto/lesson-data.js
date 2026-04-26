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


// ══════════════════════════════════════════════════════════════════
// 6ÈME — Sciences SVT cycle 3 (BO 2023)
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['kanto_6eme'] = {
  color:'#22c55e', bg:'#000a05', textAccent:'#86efac',
  particles:'sword', worldName:'Kanto',
  lessons:{
    1:{
      heroName:'Tengen',
      heroQuote:'Tous les êtres vivants sont faits de cellules — c\'est le secret du vivant !',
      rule:'La cellule est l\'unité structurelle de tous les êtres vivants. Une cellule = membrane + cytoplasme + noyau. Êtres unicellulaires (1 cellule) ou pluricellulaires (milliards).',
      sections:[
        {icon:'🔬',title:'La cellule au microscope',color:'#3b82f6',
         content:'On observe les cellules grâce au microscope optique (×400 ou plus). Trop petites pour l\'œil nu (10-100 micromètres).',
         examples:['Cellule de joue humaine : visible au microscope','Cellule d\'oignon : facile à observer','Bactérie : 10 fois plus petite encore']},
        {icon:'🧬',title:'Composition d\'une cellule',color:'#8b5cf6',
         content:'Membrane = enveloppe. Cytoplasme = liquide gélatineux. Noyau = contient l\'ADN qui dirige la cellule.',
         examples:['Membrane = peau de la cellule','Cytoplasme = "intérieur" gélatineux','Noyau = "cerveau" de la cellule']},
        {icon:'🌳',title:'Unicellulaires et pluricellulaires',color:'#22c55e',
         content:'Unicellulaire = 1 seule cellule (bactérie, levure, paramécie). Pluricellulaire = milliards de cellules (humain, plante, animal).',
         examples:['Bactérie = 1 cellule','Humain = ~37 000 milliards de cellules','Chêne = millions de cellules']}
      ],
      heroTip:'Tengen dit : "Membrane → Cytoplasme → Noyau. M-C-N : 3 lettres pour la cellule. Et toutes les cellules du vivant ont ces 3 éléments. C\'est la PREUVE que tous les êtres vivants ont un ancêtre commun !"',
      warmup:[
        {q:'Quelle est l\'unité de base du vivant ?',a:'La cellule',o:['La cellule','L\'atome','L\'organe']},
        {q:'L\'humain est :',a:'Pluricellulaire',o:['Pluricellulaire','Unicellulaire','Sans cellules']}
      ]
    },
    2:{
      heroName:'Mitsuri',
      heroQuote:'Classer les êtres vivants — c\'est l\'amour de la science qui révèle la parenté universelle !',
      rule:'La classification scientifique repose sur les caractères PARTAGÉS. Les êtres vivants sont rangés en groupes emboîtés : plus on partage de caractères, plus on est apparentés.',
      sections:[
        {icon:'📦',title:'Les groupes emboîtés',color:'#a855f7',
         content:'On range les êtres vivants dans des boîtes : une grande boîte (caractère général) contient des plus petites (caractères plus précis).',
         examples:['Boîte "vertébrés" → contient mammifères, oiseaux, reptiles','Boîte "mammifères" → contient chiens, chats, baleines','Boîte "primates" → contient humains, singes']},
        {icon:'🐺',title:'Vertébrés et invertébrés',color:'#3b82f6',
         content:'Vertébrés = animaux à colonne vertébrale (poisson, oiseau, mammifère, reptile, amphibien). Invertébrés = sans colonne (insectes, mollusques, vers).',
         examples:['Lion, aigle, requin → vertébrés','Abeille, escargot, ver → invertébrés','Squelette interne = vertébré']},
        {icon:'🔗',title:'Parenté et ancêtre commun',color:'#22c55e',
         content:'Plus deux espèces partagent de caractères, plus leur ancêtre commun est récent. Humain + chimpanzé = très apparentés (primates).',
         examples:['Chien et loup : très proches','Humain et chimpanzé : 98% d\'ADN commun','Humain et bactérie : ancêtre très lointain']}
      ],
      heroTip:'Mitsuri dit : "Classer = mettre dans des BOÎTES selon ce qui est PARTAGÉ. Pas selon la couleur ou le poids ! Les vrais critères sont les attributs anatomiques. Et l\'amour entre les êtres vivants = leur PARENTÉ !"',
      warmup:[
        {q:'Sur quoi repose la classification scientifique ?',a:'Caractères partagés',o:['Caractères partagés','Couleur','Poids']},
        {q:'Lesquels sont vertébrés ?',a:'Poisson, oiseau, mammifère',o:['Poisson, oiseau, mammifère','Insecte, ver, méduse','Plantes seulement']}
      ]
    },
    3:{
      heroName:'Obanai',
      heroQuote:'La biodiversité… du microbe à la baleine, tous unis dans la chaîne du vivant.',
      rule:'La biodiversité est la variété des êtres vivants. Elle s\'observe à toutes les échelles : microscopique (bactéries) et macroscopique (animaux, plantes). Elle est menacée par l\'humain.',
      sections:[
        {icon:'🦠',title:'Microorganismes',color:'#06b6d4',
         content:'Microorganismes = êtres vivants invisibles (bactéries, levures, virus, paramécies). Beaucoup sont utiles (digestion, fermentation).',
         examples:['Bactérie du yaourt : utile','Levure du pain : fait gonfler la pâte','Bactérie intestinale : aide à digérer']},
        {icon:'🌍',title:'Diversité visible',color:'#22c55e',
         content:'~2 millions d\'espèces décrites, mais on estime 8-15 millions au total. Forêts tropicales = hauts lieux de biodiversité.',
         examples:['Amazonie : poumon vert de la planète','Récif corallien : forêt sous-marine','Insectes : 1 million d\'espèces décrites']},
        {icon:'⚠️',title:'Menaces et protection',color:'#ef4444',
         content:'Déforestation, pollution, chasse, climat menacent la biodiversité. Solutions : aires protégées, lois, sensibilisation.',
         examples:['Parc national : zone protégée','Espèces protégées : panda, tigre, baleine','Convention internationale : CITES']}
      ],
      heroTip:'Obanai dit : "Biodiversité = BIO (vivant) + DIVERSITÉ (variété). Du microscopique au visible. PROTEGER la biodiversité = protéger l\'humanité elle-même !"',
      warmup:[
        {q:'Que signifie biodiversité ?',a:'Diversité des êtres vivants',o:['Diversité des êtres vivants','Diversité des roches','Diversité des étoiles']},
        {q:'À quel niveau s\'observe la biodiversité ?',a:'Microscopique ET macroscopique',o:['Microscopique ET macroscopique','Macroscopique seulement','Atomique']}
      ]
    },
    4:{
      heroName:'Sanemi',
      heroQuote:'Dans un écosystème, chaque être joue un rôle — qui mange qui ? L\'équilibre est tout !',
      rule:'Un écosystème = êtres vivants (biocénose) + milieu (biotope) en interaction. Les chaînes alimentaires montrent qui mange qui : producteurs → consommateurs → décomposeurs.',
      sections:[
        {icon:'🌳',title:'Composants d\'un écosystème',color:'#22c55e',
         content:'Biocénose = ensemble des êtres vivants. Biotope = milieu physique (sol, eau, air, climat). Les deux interagissent en permanence.',
         examples:['Forêt = biocénose (arbres, animaux) + biotope (sol, climat)','Mare = écosystème aquatique','Désert = écosystème extrême']},
        {icon:'🍃',title:'Producteurs, consommateurs',color:'#fbbf24',
         content:'Producteurs (plantes) → fabriquent la matière. Consommateurs (animaux) → mangent. Niveaux : primaires (herbivores), secondaires (carnivores), tertiaires (super-prédateurs).',
         examples:['Producteur = arbre, herbe, algue','Consommateur 1 = lapin, vache (herbivore)','Consommateur 2 = renard, loup (carnivore)']},
        {icon:'🍂',title:'Décomposeurs',color:'#a855f7',
         content:'Décomposeurs (champignons, bactéries) recyclent la matière morte en sels minéraux pour les plantes. Sans eux, pas de cycle de vie.',
         examples:['Champignons sur tronc mort','Bactéries du sol','Cloportes, vers de terre']}
      ],
      heroTip:'Sanemi dit : "Écosystème = 3 acteurs : Producteurs (P) + Consommateurs (C) + Décomposeurs (D). PCD = équilibre. Casser un seul = effondrement total. Comme un Hashira tombé !"',
      warmup:[
        {q:'Qu\'est-ce qu\'un écosystème ?',a:'Êtres vivants + milieu où ils vivent',o:['Êtres vivants + milieu où ils vivent','Une simple forêt','Un zoo']},
        {q:'Lequel est producteur ?',a:'Une plante',o:['Une plante','Un lion','Une bactérie']}
      ]
    },
    5:{
      heroName:'Muichiro',
      heroQuote:'… les saisons changent, les êtres vivants s\'adaptent. Je suis comme la brume du matin.',
      rule:'Les êtres vivants survivent à l\'hiver par migration, hibernation, hivernage, ou en laissant des graines/œufs. Le peuplement d\'un milieu change avec les saisons (température, lumière).',
      sections:[
        {icon:'🦅',title:'Migration',color:'#3b82f6',
         content:'Migration = voyage saisonnier vers des régions plus favorables. Surtout les oiseaux (hirondelles, cigognes), aussi certains poissons et papillons.',
         examples:['Hirondelles : Europe → Afrique en automne','Saumon : océan → rivière pour pondre','Monarque : Canada → Mexique']},
        {icon:'🐻',title:'Hibernation et hivernage',color:'#8b5cf6',
         content:'Hibernation = sommeil profond avec ralentissement métabolique (ours, marmotte). Hivernage = vie ralentie sans vrai sommeil (escargot, grenouille).',
         examples:['Marmotte : hibernation profonde','Ours : sommeil léger','Grenouille : enfouie dans la vase']},
        {icon:'🌱',title:'Stratégies des plantes',color:'#22c55e',
         content:'Caduques = perdent feuilles (chêne). Persistantes = gardent feuilles (sapin). Annuelles = meurent et laissent des graines (coquelicot).',
         examples:['Chêne en hiver = sans feuilles','Sapin en hiver = vert','Coquelicot = renaît au printemps']}
      ],
      heroTip:'Muichiro dit : "4 stratégies : Migration (loin), Hibernation (dort), Hivernage (ralentit), Graine/œuf (attente). M-H-H-G : 4 façons de traverser l\'hiver. La nature s\'adapte toujours !"',
      warmup:[
        {q:'Que font les hirondelles en hiver ?',a:'Elles migrent vers l\'Afrique',o:['Elles migrent vers l\'Afrique','Elles hibernent','Elles meurent toutes']},
        {q:'L\'ours brun en hiver :',a:'Hiberne (sommeil profond)',o:['Hiberne (sommeil profond)','Joue dans la neige','Migre']}
      ]
    },
    6:{
      heroName:'Gyomei',
      heroQuote:'L\'alimentation est la base de la force — bénis soient ceux qui mangent équilibré.',
      rule:'Le corps a besoin d\'énergie (kcal) et de nutriments. Les besoins varient selon âge, sexe, activité. Une alimentation variée couvre glucides, protéines, lipides, vitamines, minéraux.',
      sections:[
        {icon:'⚡',title:'Énergie alimentaire',color:'#fbbf24',
         content:'L\'énergie se mesure en kcal ou kJ. Ado de 13 ans : 2400-2800 kcal/jour. Sportif : plus. Personne âgée : moins.',
         examples:['1 pomme = ~80 kcal','1 plat de pâtes = ~400 kcal','1 carré de chocolat = ~50 kcal']},
        {icon:'🥩',title:'Nutriments principaux',color:'#ef4444',
         content:'Glucides (énergie rapide). Protéines (construction). Lipides (réserve). Vitamines + minéraux (régulation, croissance).',
         examples:['Glucides : pâtes, riz, pain','Protéines : viande, œuf, légumineuses','Lipides : huile, beurre, noix']},
        {icon:'🥬',title:'Variété et équilibre',color:'#22c55e',
         content:'Aucun aliment ne contient TOUT. Varier les groupes alimentaires couvre tous les besoins. Boire 1,5 L d\'eau par jour.',
         examples:['Repas équilibré : céréales + protéines + légumes + laitage + fruit','Carence en fer = fatigue','Carence en calcium = os fragiles']}
      ],
      heroTip:'Gyomei dit : "5 groupes alimentaires : Céréales, Protéines, Légumes/Fruits, Laitage, Lipides. CPLLL = équilibre. Et eau ! La force du corps vient de la VARIÉTÉ, comme la prière !"',
      warmup:[
        {q:'L\'énergie alimentaire se mesure en :',a:'Kilocalories ou kilojoules',o:['Kilocalories ou kilojoules','Mètres','Litres']},
        {q:'Lequel apporte des protéines ?',a:'La viande',o:['La viande','Le pain','L\'huile']}
      ]
    },
    7:{
      heroName:'Genya',
      heroQuote:'De la fleur au fruit, de l\'enfance à l\'âge adulte — la vie continue grâce à la reproduction !',
      rule:'La reproduction sexuée nécessite la fusion d\'une cellule mâle et d\'une cellule femelle. Plantes : pollinisation → fécondation → graines. Humain : puberté → ovule + spermatozoïde → embryon.',
      sections:[
        {icon:'🌸',title:'Reproduction des plantes',color:'#ec4899',
         content:'Étamines (mâle) + pistil (femelle). Pollinisation = transport du pollen. Fécondation → fruit avec graines. Pollinisateurs : abeilles, vent.',
         examples:['Abeille butine et pollinise','Pommier : fleur → pomme','Graine germe → nouvel arbre']},
        {icon:'🧬',title:'Reproduction humaine',color:'#a855f7',
         content:'Homme : testicules → spermatozoïdes. Femme : ovaires → ovules. Fécondation = fusion ovule + spermatozoïde → cellule-œuf → embryon.',
         examples:['Spermatozoïde : très petit, mobile','Ovule : plus gros, immobile','Fécondation : 1 cellule-œuf forme l\'embryon']},
        {icon:'🌱',title:'Puberté',color:'#3b82f6',
         content:'Puberté (10-15 ans) = transformation du corps vers l\'âge adulte. Caractères sexuels secondaires : voix, pilosité, formes du corps.',
         examples:['Garçon : voix grave, poils, muscles','Fille : seins, hanches, règles','Acné, sueur, croissance rapide']}
      ],
      heroTip:'Genya dit : "Pollinisation → Fécondation → Fruit/Graine. P-F-F : 3 étapes pour les plantes. Pour l\'humain : Puberté → Ovule+Spermatozoïde → Embryon. Toujours 2 cellules qui fusionnent !"',
      warmup:[
        {q:'Que faut-il pour la reproduction sexuée ?',a:'Cellule mâle + cellule femelle',o:['Cellule mâle + cellule femelle','Une seule cellule','Du soleil seul']},
        {q:'Que devient une fleur après pollinisation ?',a:'Un fruit avec graines',o:['Un fruit avec graines','Une feuille','Une racine']}
      ]
    },
    8:{
      heroName:'Tanjiro',
      heroQuote:'La biodiversité est un trésor à protéger — ensemble, sauvons la planète comme on sauve les démons !',
      rule:'La vie évolue depuis 3,8 milliards d\'années. Les fossiles racontent les espèces disparues. Aujourd\'hui, l\'humain provoque la 6ème extinction par pollution, déforestation, climat.',
      sections:[
        {icon:'🦴',title:'Fossiles et évolution',color:'#a855f7',
         content:'Fossiles = restes minéralisés d\'organismes anciens. Ils prouvent que la vie a CHANGÉ : dinosaures disparus, mammifères apparus.',
         examples:['Os de dinosaure (-65 Ma)','Coquilles d\'ammonites','Empreintes de pas fossilisées']},
        {icon:'🌡️',title:'Réchauffement climatique',color:'#ef4444',
         content:'Émission de CO2 (énergies fossiles) → effet de serre → réchauffement → fonte glaciers, montée mers, climat déréglé.',
         examples:['Glaciers fondent à vue d\'œil','Espèces polaires en danger','Tempêtes plus violentes']},
        {icon:'🌱',title:'Préservation et écogestes',color:'#22c55e',
         content:'Aires protégées + lois + écogestes (tri, transport doux, alimentation locale, économies d\'énergie). Chacun peut agir !',
         examples:['Tri des déchets','Manger local et de saison','Transports doux : vélo, marche']}
      ],
      heroTip:'Tanjiro dit : "3 actions pour préserver : Protéger les habitats (forêts, océans) + Limiter la pollution + Consommer responsable. Comme couper la tête d\'un démon : il faut PCC, agir partout en même temps !"',
      warmup:[
        {q:'Que sont les fossiles ?',a:'Restes d\'êtres vivants du passé',o:['Restes d\'êtres vivants du passé','Des cailloux ordinaires','Des météorites']},
        {q:'Quel impact humain menace le climat ?',a:'Émission de CO2 (gaz à effet de serre)',o:['Émission de CO2 (gaz à effet de serre)','Planter des arbres','Recycler']}
      ]
    }
  }
};

console.info('⚔️ lesson-data-kanto.js — 8 leçons 6ème SVT × Demon Slayer chargées (LESSON_REGISTRY V2)');


// ══════════════════════════════════════════════════════════════════
// 5ÈME — Physique-Chimie + SVT cycle 4 (BO 2020)
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['kanto_5eme'] = {
  color:'#8b5cf6', bg:'#05000a', textAccent:'#c4b5fd',
  particles:'sword', worldName:'Kanto',
  lessons:{
    1:{
      heroName:'Tanjiro',
      heroQuote:'L\'eau prend trois visages — comme mes danses du dieu du feu, elle se transforme sans disparaître !',
      rule:'L\'eau pure bout à 100°C et gèle à 0°C. Lors d\'un changement d\'état, la masse est CONSERVÉE (les molécules H2O restent les mêmes), mais le volume peut varier.',
      sections:[
        {icon:'🌡️',title:'États et températures',color:'#3b82f6',
         content:'Solide (glace) → 0°C → Liquide (eau) → 100°C → Gaz (vapeur). À pression atmosphérique normale.',
         examples:['Glace : -10°C','Eau du robinet : 15°C','Eau qui bout : 100°C']},
        {icon:'⚖️',title:'Conservation de la masse',color:'#22c55e',
         content:'En changeant d\'état, les molécules H2O ne disparaissent pas. La masse reste identique. Seul le volume change.',
         examples:['100 g glace → 100 g eau','Volume glace > volume eau (anomalie)','Bouteille au congélo explose']},
        {icon:'🌍',title:'Cycle de l\'eau',color:'#06b6d4',
         content:'Évaporation (océans) → Condensation (nuages) → Précipitations (pluie/neige) → Ruissellement (rivières) → retour mer.',
         examples:['97% eau salée (océans)','3% eau douce (glaciers, rivières)','Pluie = condensation puis chute']}
      ],
      heroTip:'Tanjiro dit : "100°C ébullition, 0°C solidification. Masse CONSERVÉE en changement d\'état, volume PEUT changer. Pour l\'eau, la glace prend PLUS de place que l\'eau liquide. Anomalie unique !"',
      warmup:[
        {q:'À quelle température l\'eau pure bout-elle ?',a:'100 °C',o:['100 °C','0 °C','50 °C']},
        {q:'Lors d\'un changement d\'état, la masse :',a:'Reste constante',o:['Reste constante','Augmente','Disparaît']}
      ]
    },
    2:{
      heroName:'Zenitsu',
      heroQuote:'AAH ! Mélanges et corps purs… j\'ai peur de tout mélanger ! Heureusement il y a des techniques !',
      rule:'Corps pur = une seule espèce chimique (eau distillée). Mélange homogène = aspect uniforme (eau salée). Mélange hétérogène = on voit les phases (eau+sable). Techniques : filtration, décantation, distillation.',
      sections:[
        {icon:'💧',title:'Corps purs et mélanges',color:'#3b82f6',
         content:'Corps pur = une seule espèce. Mélange = plusieurs constituants. Homogène (uniforme) ou hétérogène (visible).',
         examples:['Eau distillée = corps pur','Eau salée = homogène','Vinaigrette = hétérogène']},
        {icon:'🧪',title:'Techniques de séparation',color:'#a855f7',
         content:'Filtration (solide/liquide). Décantation (2 liquides non miscibles). Distillation (eau pure d\'un mélange).',
         examples:['Filtre à café = filtration','Eau + huile = décantation','Eau salée bouillie = distillation']},
        {icon:'🌫️',title:'Solubilité et saturation',color:'#22c55e',
         content:'Solubilité du sel = ~360 g/L à 20°C. Au-delà, le sel ne se dissout plus = solution saturée.',
         examples:['Sucre dans le thé : se dissout','Trop de sel : reste au fond','Eau de mer = saturée en sel']}
      ],
      heroTip:'Zenitsu dit : "3 techniques à retenir : F-D-D. Filtration (filtre), Décantation (laisse reposer), Distillation (chauffe + condense). 3 outils du chimiste !"',
      warmup:[
        {q:'Un corps pur contient :',a:'Une seule espèce chimique',o:['Une seule espèce chimique','Plusieurs constituants','Forcément de l\'eau']},
        {q:'Pour séparer eau et sable on utilise :',a:'Filtration',o:['Filtration','Distillation','Décantation simple']}
      ]
    },
    3:{
      heroName:'Inosuke',
      heroQuote:'GRAOOOH ! Plus vite, toujours plus vite ! v = d/t, c\'est ma formule de combat !',
      rule:'Vitesse = distance ÷ durée (v = d/t). Unité internationale = m/s. Pour passer de km/h à m/s : ÷ 3,6. Mouvement rectiligne (ligne droite), circulaire (cercle), uniforme (vitesse constante).',
      sections:[
        {icon:'📏',title:'Formule de la vitesse',color:'#fbbf24',
         content:'v = d / t. Distance en mètres, durée en secondes → vitesse en m/s. Pour km/h : ÷ 3,6 pour avoir m/s.',
         examples:['100 km en 2 h = 50 km/h','360 m en 60 s = 6 m/s','60 km/h = 16,67 m/s']},
        {icon:'🛣️',title:'Types de trajectoires',color:'#3b82f6',
         content:'Rectiligne = ligne droite (TGV). Circulaire = cercle (grande roue). Parabolique = ballon en l\'air.',
         examples:['Voiture autoroute = rectiligne','Aiguille horloge = circulaire','Lancé ballon = parabolique']},
        {icon:'🏃',title:'Mouvement uniforme et relativité',color:'#a855f7',
         content:'Uniforme = vitesse constante. Le mouvement est RELATIF : dépend du référentiel choisi (sol, train...).',
         examples:['Conducteur immobile par rapport au train','En mouvement par rapport au sol','Récréation : tu cours, ton sac est immobile/toi']}
      ],
      heroTip:'Inosuke dit : "v = d/t, retiens \'distance DIVISÉE par temps\'. Plus tu vas loin en peu de temps = plus tu es rapide ! Et pour km/h vers m/s : DIVISE par 3,6. Toujours plus vite !"',
      warmup:[
        {q:'La formule de la vitesse est :',a:'v = distance / durée',o:['v = distance / durée','v = distance × durée','v = durée / distance']},
        {q:'100 km en 2 h donne :',a:'50 km/h',o:['50 km/h','200 km/h','100 km/h']}
      ]
    },
    4:{
      heroName:'Rengoku',
      heroQuote:'ENFLAMME TON CŒUR ! L\'énergie ne se perd pas, elle se TRANSFORME — comme la flamme qui éclaire et chauffe !',
      rule:'L\'énergie se mesure en joules (J) ou kWh. Elle se conserve : ne se crée ni ne se perd, elle se TRANSFORME. Sources renouvelables (soleil, vent) vs fossiles (pétrole, charbon).',
      sections:[
        {icon:'⚡',title:'Formes d\'énergie',color:'#fbbf24',
         content:'Cinétique (mouvement), thermique (chaleur), chimique (piles, aliments), lumineuse, électrique, nucléaire.',
         examples:['Voiture qui roule = cinétique','Bougie qui chauffe = thermique','Pile = chimique']},
        {icon:'🔄',title:'Conservation et transformation',color:'#a855f7',
         content:'L\'énergie se TRANSFORME (pile → électrique → lumière). La quantité totale est conservée.',
         examples:['Sucre → muscle qui bouge','Soleil → photosynthèse → biomasse','Charbon brûlé → chaleur + lumière']},
        {icon:'🌱',title:'Renouvelables vs fossiles',color:'#22c55e',
         content:'Renouvelables : soleil, vent, eau, biomasse, géothermie. Fossiles : pétrole, charbon, gaz (limités, polluants).',
         examples:['Éolienne = vent (renouvelable)','Voiture diesel = pétrole (fossile)','Centrale nucléaire = uranium (limité)']}
      ],
      heroTip:'Rengoku dit : "L\'énergie se CONSERVE — elle change de forme mais sa quantité reste. Comme un guerrier qui change de technique mais reste fort. ENFLAMME TON CŒUR de SAVOIR !"',
      warmup:[
        {q:'L\'énergie se mesure en :',a:'Joules (J) ou kilowatt-heure (kWh)',o:['Joules (J) ou kilowatt-heure (kWh)','Mètres','Kilogrammes']},
        {q:'Une éolienne transforme :',a:'Cinétique (vent) → électrique',o:['Cinétique (vent) → électrique','Solaire → chimique','Nucléaire → thermique']}
      ]
    },
    5:{
      heroName:'Shinobu',
      heroQuote:'Série ou parallèle… deux beautés différentes. En parallèle, chaque ampoule garde sa lumière, élégant !',
      rule:'Circuit série = composants alignés sur 1 boucle (1 panne = tout éteint). Circuit parallèle = branches indépendantes (1 panne n\'affecte pas les autres). Les maisons sont en parallèle.',
      sections:[
        {icon:'🔗',title:'Circuit en série',color:'#3b82f6',
         content:'Composants l\'un après l\'autre. Tension partagée. Si un casse, TOUT s\'éteint. Plus de lampes = moins brillantes.',
         examples:['Ampoules en série = ligne droite','Plus on ajoute, moins ça brille','Une ampoule grillée = tout s\'éteint']},
        {icon:'🌳',title:'Circuit en parallèle',color:'#22c55e',
         content:'Composants sur des branches séparées. Chacun reçoit la pleine tension. Une panne n\'affecte pas les autres.',
         examples:['Maison = parallèle','Guirlande moderne = parallèle','Lampe défectueuse = autres ok']},
        {icon:'⚠️',title:'Court-circuit et sécurité',color:'#ef4444',
         content:'Court-circuit = fil sans récepteur entre + et -. Pile chauffe, dangereux. Fusible/disjoncteur = protection.',
         examples:['Court-circuit = pile qui fond','Fusible = casse pour protéger','Disjoncteur = coupe automatiquement']}
      ],
      heroTip:'Shinobu dit : "SÉRIE = en LIGNE = TOUS DÉPENDENT. PARALLÈLE = en BRANCHES = INDÉPENDANTS. Les maisons utilisent parallèle pour éteindre une lampe sans tout couper. Élégant !"',
      warmup:[
        {q:'Si une ampoule grille en série :',a:'Toutes s\'éteignent',o:['Toutes s\'éteignent','Les autres brillent plus','Aucune réaction']},
        {q:'Une maison utilise un circuit :',a:'Parallèle',o:['Parallèle','Série','Court-circuit']}
      ]
    },
    6:{
      heroName:'Mitsuri',
      heroQuote:'L\'amour de la lumière éclaire le monde ! Source primaire ou secondaire, tout brille avec joie !',
      rule:'La lumière se propage en LIGNE DROITE dans un milieu transparent et homogène. Source primaire = produit sa lumière (Soleil). Source secondaire = reflète (Lune, miroir). Vitesse : 300 000 km/s.',
      sections:[
        {icon:'☀️',title:'Sources primaires',color:'#fbbf24',
         content:'Produisent leur propre lumière : Soleil, étoiles, ampoules allumées, flammes, écrans.',
         examples:['Soleil = source primaire','Bougie allumée = source primaire','Écran de téléphone = primaire']},
        {icon:'🌙',title:'Sources secondaires',color:'#8b5cf6',
         content:'Reflètent ou diffusent la lumière reçue. Sans lumière, elles sont invisibles.',
         examples:['Lune = reflète Soleil','Miroir = reflète','Mur blanc = diffuse']},
        {icon:'⚡',title:'Propagation et ombres',color:'#06b6d4',
         content:'Vitesse : 300 000 km/s dans le vide. Soleil → Terre = 8 min. Objet opaque + source = ombre.',
         examples:['Lumière soleil = 8 min pour arriver','Ombre = bloquage par objet opaque','Éclipse Lune : Terre entre Soleil et Lune']}
      ],
      heroTip:'Mitsuri dit : "Source PRIMAIRE = produit l\'amour de la lumière. SECONDAIRE = reflète cet amour. Pour voir un objet : Source → Objet → Œil. Trois étoiles d\'amour !"',
      warmup:[
        {q:'La lumière se propage :',a:'En ligne droite (milieu transparent et homogène)',o:['En ligne droite (milieu transparent et homogène)','En courbes','Aléatoirement']},
        {q:'La Lune est :',a:'Une source secondaire (reflète)',o:['Une source secondaire (reflète)','Une source primaire','Une étoile']}
      ]
    },
    7:{
      heroName:'Muichiro',
      heroQuote:'… inspirer, expirer. Le souffle nourrit le sang, le sang nourrit le corps. Cycle éternel.',
      rule:'Inspiration = O2 entre. Expiration = CO2 sort. Échanges gazeux dans les ALVÉOLES pulmonaires. Le cœur pompe le sang : artères (vers organes), capillaires (échanges), veines (retour).',
      sections:[
        {icon:'🫁',title:'Respiration',color:'#3b82f6',
         content:'Inspirer O2 → bronches → alvéoles. Échange avec le sang. Expirer CO2 (déchet) + vapeur d\'eau.',
         examples:['Air inspiré : 21% O2','Air expiré : plus de CO2','Alvéoles = sacs minuscules']},
        {icon:'💓',title:'Circulation sanguine',color:'#ef4444',
         content:'Cœur (muscle) → artères → capillaires (échanges avec organes) → veines → retour cœur.',
         examples:['Cœur bat ~70 bpm au repos','Artères = sang oxygéné rouge vif','Veines = sang appauvri rouge sombre']},
        {icon:'🏃',title:'Effort et adaptation',color:'#fbbf24',
         content:'À l\'effort : muscles consomment plus d\'O2. Cœur bat plus vite, respiration accélère pour compenser.',
         examples:['Repos : 70 bpm','Course : 150 bpm','Sportif entraîné : récupère vite']}
      ],
      heroTip:'Muichiro dit : "Air → Poumons → Sang → Cœur → Organes → Sang → Poumons → CO2 expiré. C\'est un CYCLE. Comme la brume qui revient toujours…"',
      warmup:[
        {q:'Quel gaz inspirons-nous ?',a:'Du dioxygène (O2)',o:['Du dioxygène (O2)','Du dioxyde de carbone','De l\'hydrogène']},
        {q:'Quel organe pompe le sang ?',a:'Le cœur',o:['Le cœur','Les poumons','Le foie']}
      ]
    },
    8:{
      heroName:'Sanemi',
      heroQuote:'Mâcher, digérer, absorber — la force du Pilier vient de ce qu\'il MANGE et ASSIMILE !',
      rule:'Digestion : bouche → œsophage → estomac → intestins → anus. Mécanique (mastication) + chimique (enzymes). Nutriments absorbés dans l\'INTESTIN GRÊLE → sang. Eau récupérée dans le côlon.',
      sections:[
        {icon:'👄',title:'Tube digestif',color:'#fbbf24',
         content:'Bouche → œsophage → estomac → intestin grêle → côlon → rectum → anus. ~9 m de long !',
         examples:['Bouche : mastication, salive','Estomac : sucs gastriques acides','Intestin grêle : 6-7 m']},
        {icon:'🧪',title:'Enzymes et transformations',color:'#a855f7',
         content:'Enzymes découpent gros aliments en petits NUTRIMENTS. Protéases (protéines), amylases (sucres), lipases (graisses).',
         examples:['Salive : amylase (sucres)','Estomac : pepsine (protéines)','Intestin : multiples enzymes']},
        {icon:'🩸',title:'Absorption et alimentation',color:'#ef4444',
         content:'Nutriments passent dans le sang via l\'intestin grêle. Côlon récupère l\'eau. Alimentation déséquilibrée → obésité, carences.',
         examples:['Glucose → énergie','Acides aminés → muscles','Carence fer → anémie']}
      ],
      heroTip:'Sanemi dit : "BOUCHE-ESTOMAC-INTESTIN-CÔLON-ANUS. À chaque étape, transformations. Le sang récupère les nutriments dans l\'intestin GRÊLE. C\'est là le SECRET de la force !"',
      warmup:[
        {q:'Où commence la digestion ?',a:'Dans la bouche',o:['Dans la bouche','Dans l\'estomac','Dans l\'intestin']},
        {q:'Où passent les nutriments dans le sang ?',a:'Dans l\'intestin grêle',o:['Dans l\'intestin grêle','Dans l\'estomac','Dans la bouche']}
      ]
    }
  }
};

console.info('⚔️ lesson-data-kanto.js — 8 leçons 5ème PC+SVT × Demon Slayer chargées (LESSON_REGISTRY V2)');


// ══════════════════════════════════════════════════════════════════
// 4ÈME — Physique-Chimie + SVT cycle 4 (BO 2020)
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['kanto_4eme'] = {
  color:'#ef4444', bg:'#0a0000', textAccent:'#fca5a5',
  particles:'sword', worldName:'Kanto',
  lessons:{
    1:{
      heroName:'Giyu',
      heroQuote:'Atomes et molécules — la matière n\'est rien d\'autre qu\'un assemblage. Calme et précis.',
      rule:'La matière est faite d\'atomes regroupés en molécules. Loi de Lavoisier : "Rien ne se crée, rien ne se perd, tout se transforme". La masse est CONSERVÉE lors d\'une réaction chimique : les atomes se réorganisent.',
      sections:[
        {icon:'⚛️',title:'Atomes et éléments',color:'#3b82f6',
         content:'Atome = unité de base. ~118 éléments dans le tableau périodique. Symboles : H (hydrogène), O (oxygène), C (carbone), N (azote), Fe (fer)...',
         examples:['H = hydrogène','O = oxygène','C = carbone']},
        {icon:'🧬',title:'Molécules',color:'#a855f7',
         content:'Molécule = assemblage d\'atomes. H2O = eau. O2 = dioxygène. CO2 = dioxyde de carbone. Formule = type et nombre d\'atomes.',
         examples:['H2O = 2H + 1O','O2 = 2O','CO2 = 1C + 2O']},
        {icon:'⚖️',title:'Loi de Lavoisier',color:'#22c55e',
         content:'En chimie, la masse est CONSERVÉE. Les atomes ne se créent ni ne se détruisent : ils se RÉ-ORGANISENT. Combustion C + O2 → CO2 : 12 + 32 = 44 g.',
         examples:['12 g C + 32 g O2 = 44 g CO2','100 g réactifs = 100 g produits','Aucune disparition d\'atome']}
      ],
      heroTip:'Giyu dit : "Loi de Lavoisier (1789) : RIEN ne se crée, RIEN ne se perd. Les atomes se réarrangent, la masse reste. C\'est la base de toute la chimie. Calme et inéluctable."',
      warmup:[
        {q:'De quoi est faite la matière ?',a:'D\'atomes et de molécules',o:['D\'atomes et de molécules','De cellules uniquement','De rien']},
        {q:'Lors d\'une réaction chimique, la masse :',a:'Est conservée',o:['Est conservée','Augmente','Disparaît']}
      ]
    },
    2:{
      heroName:'Tengen',
      heroQuote:'TENSION et INTENSITÉ — voilà la flamboyance de l\'électricité ! V × A, c\'est ma loi !',
      rule:'Tension U en VOLTS (V) avec un voltmètre EN PARALLÈLE. Intensité I en AMPÈRES (A) avec un ampèremètre EN SÉRIE. Loi d\'Ohm : U = R × I (R en ohms Ω).',
      sections:[
        {icon:'⚡',title:'Tension et voltmètre',color:'#fbbf24',
         content:'Tension = "pression" électrique entre 2 points. Mesurée en volts (V). Voltmètre branché EN PARALLÈLE. Prise française : 230 V.',
         examples:['Pile plate : 4,5 V','Batterie voiture : 12 V','Prise maison : 230 V']},
        {icon:'🔌',title:'Intensité et ampèremètre',color:'#3b82f6',
         content:'Intensité = "débit" de courant. Mesurée en ampères (A). Ampèremètre EN SÉRIE pour que le courant le traverse.',
         examples:['LED : ~0,02 A','Ampoule : ~0,5 A','Bouilloire : ~10 A']},
        {icon:'📐',title:'Loi d\'Ohm : U = R × I',color:'#a855f7',
         content:'Résistance R en ohms (Ω). Plus R grande, plus I petit pour même U. Si U = 12 V, R = 4 Ω → I = 3 A.',
         examples:['12 V / 4 Ω = 3 A','6 V / 12 Ω = 0,5 A','230 V / 100 Ω = 2,3 A']}
      ],
      heroTip:'Tengen dit : "FLAMBOYANCE ! Voltmètre = PARALLÈLE (V parallèle). Ampèremètre = SÉRIE (A série). U = R × I. 3 lettres pour 3 grandeurs. Magnifique !"',
      warmup:[
        {q:'La tension se mesure en :',a:'Volts (V)',o:['Volts (V)','Ampères','Ohms']},
        {q:'Le voltmètre se branche :',a:'En parallèle',o:['En parallèle','En série','Au hasard']}
      ]
    },
    3:{
      heroName:'Obanai',
      heroQuote:'Le son… une vibration silencieuse qui se propage. Comme ma haine, il se propage partout.',
      rule:'Le son est une VIBRATION qui se propage dans un milieu (air, eau, solide). PAS dans le vide. Vitesse dans l\'air : ~340 m/s. Fréquence en Hz (hauteur), intensité en dB (volume). Audible : 20-20000 Hz.',
      sections:[
        {icon:'〰️',title:'Propagation du son',color:'#3b82f6',
         content:'Le son a besoin de matière. Air : 340 m/s. Eau : 1500 m/s. Acier : 5000 m/s. Vide : pas de son.',
         examples:['Cri à 1 km : 3 s à entendre','Cloche sous l\'eau : on entend','Espace : silence total']},
        {icon:'📊',title:'Fréquence et hauteur',color:'#a855f7',
         content:'Fréquence en Hz = nombre de vibrations/seconde. Aigu = haute fréquence. Grave = basse fréquence.',
         examples:['Basse de musique : 50 Hz (grave)','La 440 Hz : note médium','Sifflet : 4000 Hz (aigu)']},
        {icon:'🔊',title:'Intensité et danger',color:'#ef4444',
         content:'Intensité en dB. 0 dB seuil audition. 85 dB exposition prolongée DANGER. 120 dB seuil de douleur.',
         examples:['Conversation : 60 dB','Aspirateur : 80 dB','Concert : 100-110 dB (danger)']}
      ],
      heroTip:'Obanai dit : "Hertz = HAUTEUR du son (aigu/grave). Décibels = VOLUME (fort/faible). Pas confondre. Et au-delà de 85 dB longtemps : protection obligatoire ou perte d\'audition."',
      warmup:[
        {q:'Le son se propage-t-il dans le vide ?',a:'Non',o:['Non','Oui','Cela dépend']},
        {q:'La fréquence se mesure en :',a:'Hertz (Hz)',o:['Hertz (Hz)','Décibels','Mètres']}
      ]
    },
    4:{
      heroName:'Gyomei',
      heroQuote:'Bénie soit la lumière. Toutes les couleurs cachées dans le blanc — un mystère sacré.',
      rule:'La lumière BLANCHE contient toutes les couleurs visibles. Un PRISME la décompose en arc-en-ciel. 3 couleurs primaires LUMIÈRE : Rouge, Vert, Bleu (RVB). Un objet apparaît coloré car il DIFFUSE certaines couleurs et ABSORBE les autres.',
      sections:[
        {icon:'🌈',title:'Décomposition de la lumière',color:'#fbbf24',
         content:'Prisme = décompose lumière blanche en spectre (rouge → violet). Arc-en-ciel = même phénomène avec gouttes d\'eau.',
         examples:['Arc-en-ciel après pluie','Prisme en classe','Rosée du matin au soleil']},
        {icon:'🎨',title:'Synthèse additive RVB',color:'#3b82f6',
         content:'En LUMIÈRE : Rouge + Vert = Jaune. R+B = Magenta. V+B = Cyan. R+V+B = Blanc. Écrans = pixels RVB.',
         examples:['TV/téléphone : pixels RVB','R+V = jaune','R+V+B = blanc']},
        {icon:'👁️',title:'Couleurs des objets',color:'#a855f7',
         content:'Objet rouge : DIFFUSE le rouge, ABSORBE le reste. Sous lumière verte : objet rouge apparaît NOIR (rien à diffuser).',
         examples:['Pomme rouge sous lumière blanche : rouge','Sous lumière verte : noir','Objet noir : absorbe tout']}
      ],
      heroTip:'Gyomei dit : "RVB en LUMIÈRE (additive). En PEINTURE = différent (cyan/magenta/jaune). Et un objet RENVOIE seulement les couleurs qu\'il NE PEUT PAS absorber. Lumière sacrée."',
      warmup:[
        {q:'La lumière blanche contient :',a:'Toutes les couleurs visibles',o:['Toutes les couleurs visibles','Une seule couleur','Du gris']},
        {q:'3 couleurs primaires en lumière :',a:'Rouge, vert, bleu',o:['Rouge, vert, bleu','Rouge, jaune, bleu','Cyan, magenta, jaune']}
      ]
    },
    5:{
      heroName:'Kanao',
      heroQuote:'… La reproduction humaine. Un mystère du vivant que je peux comprendre maintenant.',
      rule:'À la PUBERTÉ (10-15 ans), le corps devient capable de se reproduire. Homme = testicules → spermatozoïdes. Femme = ovaires → ovules. Fécondation = fusion gamètes → cellule-œuf → embryon → fœtus → naissance (~9 mois).',
      sections:[
        {icon:'🌱',title:'Puberté et caractères',color:'#a855f7',
         content:'Puberté débute 10-15 ans. Apparition caractères sexuels secondaires : poitrine, voix grave, pilosité. Hormones du cerveau régulent.',
         examples:['Fille : seins, règles 12-13 ans','Garçon : voix grave, barbe 13-14 ans','Variabilité individuelle']},
        {icon:'🧬',title:'Cycle féminin et fécondation',color:'#ec4899',
         content:'Cycle ~28 jours. Ovulation au milieu. Si fécondation = grossesse. Si pas = règles. Spermatozoïde + ovule = cellule-œuf.',
         examples:['28 jours en moyenne','Ovulation : jour 14 environ','Règles : 3-7 jours']},
        {icon:'👶',title:'Grossesse et contraception',color:'#3b82f6',
         content:'Grossesse 9 mois (40 semaines). Contraception = éviter grossesse. Préservatif = SEUL à protéger des IST aussi.',
         examples:['Embryon : 0-8 semaines','Fœtus : 9-40 semaines','Préservatif : grossesse + IST']}
      ],
      heroTip:'Kanao dit : "… Préservatif = double protection (grossesse + IST). Pilule = grossesse seulement. Le respect de soi et de l\'autre est essentiel."',
      warmup:[
        {q:'À quel âge commence la puberté ?',a:'Entre 10 et 15 ans',o:['Entre 10 et 15 ans','5 ans','25 ans']},
        {q:'La fécondation, c\'est :',a:'Fusion ovule + spermatozoïde',o:['Fusion ovule + spermatozoïde','La naissance','La puberté']}
      ]
    },
    6:{
      heroName:'Genya',
      heroQuote:'L\'ADN… c\'est ce qui nous fait tous différents. 46 chromosomes, et chacun unique !',
      rule:'Chaque cellule contient un NOYAU avec l\'ADN, organisé en CHROMOSOMES. L\'humain a 46 chromosomes (23 paires). Les GÈNES sont des fragments d\'ADN qui codent les caractères héréditaires. Sexe : XX = fille, XY = garçon.',
      sections:[
        {icon:'🧬',title:'ADN et chromosomes',color:'#a855f7',
         content:'ADN = molécule double-hélice contenant l\'information génétique. Compactée en chromosomes dans le noyau. 46 chez l\'humain.',
         examples:['46 chromosomes humains','23 du père + 23 de la mère','Chromosome X et Y déterminent le sexe']},
        {icon:'📚',title:'Gènes et caractères',color:'#3b82f6',
         content:'Gène = fragment d\'ADN qui code un caractère. ~20 000 gènes humains. Couleur des yeux, groupe sanguin = héréditaires.',
         examples:['Gène couleur yeux','Gène groupe sanguin (A, B, O)','Gène couleur cheveux']},
        {icon:'⚠️',title:'Mutations et anomalies',color:'#ef4444',
         content:'Mutation = changement dans l\'ADN. Trisomie 21 = 3 chromosomes 21 au lieu de 2. Mucoviscidose = mutation héréditaire.',
         examples:['Trisomie 21','Mucoviscidose','Drépanocytose']}
      ],
      heroTip:'Genya dit : "Hiérarchie : Cellule → Noyau → Chromosomes (46) → ADN → Gènes (20 000). Du grand au petit. Chaque gène = un caractère. C\'est la VIE codée !"',
      warmup:[
        {q:'Combien de chromosomes a une cellule humaine ?',a:'46 (23 paires)',o:['46 (23 paires)','2','100']},
        {q:'Un gène est :',a:'Un fragment d\'ADN qui détermine un caractère',o:['Un fragment d\'ADN qui détermine un caractère','Une cellule','Une molécule d\'air']}
      ]
    },
    7:{
      heroName:'Nezuko',
      heroQuote:'Mmh ! La Terre tremble ! Les plaques se déplacent — les volcans grondent !',
      rule:'La croûte terrestre est divisée en PLAQUES TECTONIQUES qui bougent (~cm/an). Leurs mouvements causent SÉISMES (libération d\'énergie) et VOLCANS (remontée de magma). Échelle de Richter pour mesurer la magnitude.',
      sections:[
        {icon:'🌍',title:'Plaques tectoniques',color:'#3b82f6',
         content:'~12 grandes plaques rigides flottent sur le manteau. Limites de plaques = zones d\'activité (séismes, volcans).',
         examples:['Plaque eurasienne','Plaque pacifique','Plaque africaine']},
        {icon:'🌋',title:'Séismes et volcans',color:'#ef4444',
         content:'Séisme = libération brutale d\'énergie. Volcan = magma remonte. Échelle Richter (séisme), épicentre = zone surface au-dessus du foyer.',
         examples:['Magnitude 9 = catastrophique','Vésuve, Etna : actifs','Japon : ceinture de feu']},
        {icon:'🔄',title:'Mouvements de plaques',color:'#a855f7',
         content:'Dorsales = plaques s\'écartent (Atlantique). Subduction = plaque plonge sous une autre (Pacifique). Collision = montagnes (Himalaya).',
         examples:['Dorsale médio-atlantique','Fosse des Mariannes','Himalaya = collision Inde/Asie']}
      ],
      heroTip:'Nezuko dit : "Plaques bougent → frottement → SÉISME ou VOLCAN. Là où plaques se rencontrent = ZONES À RISQUE. Japon, Indonésie, Chili : ceinture de feu Pacifique. Mmh !"',
      warmup:[
        {q:'Que sont les plaques tectoniques ?',a:'Fragments de la croûte terrestre qui bougent',o:['Fragments de la croûte terrestre qui bougent','Des assiettes','Des nuages']},
        {q:'L\'échelle de Richter mesure :',a:'La magnitude des séismes',o:['La magnitude des séismes','La pluie','La température']}
      ]
    },
    8:{
      heroName:'Tanjiro',
      heroQuote:'La planète SOUFFRE. Le climat se réchauffe. Nous devons agir comme contre les démons !',
      rule:'Le CLIMAT change : +1,2°C depuis l\'ère pré-industrielle. Cause = émissions de CO2 (énergies fossiles, déforestation) qui amplifient l\'effet de serre. Conséquences : fonte glaciers, montée des mers, événements extrêmes. Solutions : réduire les émissions + adaptation.',
      sections:[
        {icon:'🌡️',title:'Climat vs météo',color:'#3b82f6',
         content:'Météo = court terme (jours). Climat = long terme (30+ ans). Le climat se réchauffe globalement, même s\'il fait froid certains jours.',
         examples:['Météo : pluie demain','Climat : +1,2°C en 150 ans','Pas confondre les deux']},
        {icon:'☁️',title:'Effet de serre amplifié',color:'#ef4444',
         content:'Effet de serre NATUREL = nécessaire (sinon -18°C). PROBLÈME = amplification par CO2 humain (énergies fossiles, déforestation).',
         examples:['CO2 : énergies fossiles','Méthane : agriculture','Déforestation : perte de puits']},
        {icon:'🌱',title:'Solutions et écogestes',color:'#22c55e',
         content:'2 axes : 1) ATTÉNUATION (réduire émissions). 2) ADAPTATION (digues, plans canicule). Écogestes : transports doux, alimentation locale, sobriété.',
         examples:['Vélo > voiture','Manger local et de saison','Économiser énergie']}
      ],
      heroTip:'Tanjiro dit : "Comme on coupe la tête d\'un démon : ATTÉNUATION (réduire CO2 = couper la cause) + ADAPTATION (se protéger). Ensemble, nous SAUVERONS la planète !"',
      warmup:[
        {q:'Quelle est la cause du réchauffement ?',a:'Émissions humaines de CO2 et autres GES',o:['Émissions humaines de CO2 et autres GES','Le Soleil seulement','Un cycle naturel']},
        {q:'Quelle est la solution principale ?',a:'Réduire les émissions de gaz à effet de serre',o:['Réduire les émissions de gaz à effet de serre','Climatiser plus','Ignorer']}
      ]
    }
  }
};

console.info('⚔️ lesson-data-kanto.js — 8 leçons 4ème PC+SVT × Demon Slayer chargées (LESSON_REGISTRY V2)');


// ══════════════════════════════════════════════════════════════════
// 3ÈME — Brevet Sciences (cycle 4 BO 2020)
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['kanto_3eme'] = {
  color:'#3b82f6', bg:'#000510', textAccent:'#93c5fd',
  particles:'sword', worldName:'Kanto',
  lessons:{
    1:{
      heroName:'Tanjiro',
      heroQuote:'Forces et mouvement — la mécanique de Newton ! Comprends-les pour briser les limites !',
      rule:'Une FORCE se mesure en NEWTONS (N). Le POIDS = m × g (g ≈ 9,8 N/kg sur Terre). Principe d\'inertie : sans force, un objet conserve son mouvement. 3ème loi de Newton : action = réaction.',
      sections:[
        {icon:'⚖️',title:'Poids et masse',color:'#fbbf24',
         content:'Masse en kg (constante). Poids = force d\'attraction = m × g, en newtons. g ≈ 10 N/kg sur Terre, ~1,6 sur Lune.',
         examples:['70 kg → 700 N sur Terre','70 kg → 112 N sur Lune','La masse reste 70 kg partout']},
        {icon:'🌍',title:'Gravitation',color:'#3b82f6',
         content:'La Terre attire tout objet qui a une masse (gravitation). La Lune est attirée par la Terre (orbite).',
         examples:['Pomme tombe sur Newton','Lune en orbite autour Terre','Terre en orbite autour Soleil']},
        {icon:'➡️',title:'Lois de Newton',color:'#a855f7',
         content:'1ère : sans force, mouvement constant. 2ème : F = m × a. 3ème : action = réaction (forces opposées).',
         examples:['Patin sur glace : continue (inertie)','Pousser un mur : il pousse autant','Fusée : gaz éjecté = poussée']}
      ],
      heroTip:'Tanjiro dit : "P = m × g. ENFLAMME ton calcul ! Et 3ème loi : si tu pousses, tu es poussé EN RETOUR. Pas de force seule. Toujours en couple !"',
      warmup:[
        {q:'Une force se mesure en :',a:'Newtons (N)',o:['Newtons (N)','Mètres','Joules']},
        {q:'Le poids d\'un objet est :',a:'P = m × g',o:['P = m × g','P = m / g','P = m + g']}
      ]
    },
    2:{
      heroName:'Rengoku',
      heroQuote:'PUISSANCE et ÉNERGIE ! P = U×I, c\'est la flamboyance de l\'électricité moderne !',
      rule:'Puissance électrique P (watts) = U × I. Énergie consommée E (joules ou kWh) = P × t. 1 kWh = 3,6 millions de joules. Sur la facture, l\'énergie est vendue en kWh.',
      sections:[
        {icon:'⚡',title:'Puissance électrique',color:'#fbbf24',
         content:'P = U × I. Watts = volts × ampères. Une LED 5 W consomme 25× moins qu\'une ampoule 125 W classique.',
         examples:['Ampoule 60 W','LED 5 W (équivaut 60 W)','Bouilloire 2000 W']},
        {icon:'🔌',title:'Énergie consommée',color:'#a855f7',
         content:'E = P × t. Énergie en joules (J) ou en kWh. 1 kW × 1 h = 1 kWh. Facturée par les fournisseurs.',
         examples:['Bouilloire 2 kW × 5 min = 0,17 kWh','TV 100 W × 4 h = 0,4 kWh','Chauffage 2 kW × 8 h = 16 kWh']},
        {icon:'💡',title:'Économies d\'énergie',color:'#22c55e',
         content:'Sobriété + efficacité. LED, A+++, isolation, baisse 1°C de chauffage = -7% conso. Couper les veilles.',
         examples:['LED + extinction veilles','19°C max dans les pièces','Isolation des bâtiments']}
      ],
      heroTip:'Rengoku dit : "P = U × I (watts = V × A). E = P × t (énergie = puissance × temps). 2 formules CLÉS du Brevet ! ENFLAMME TON CŒUR de SAVOIR !"',
      warmup:[
        {q:'La puissance électrique se mesure en :',a:'Watts (W)',o:['Watts (W)','Volts','Joules']},
        {q:'Formule de l\'énergie :',a:'E = P × t',o:['E = P × t','E = P / t','E = P + t']}
      ]
    },
    3:{
      heroName:'Mitsuri',
      heroQuote:'Réactions chimiques ! Les atomes se réarrangent par AMOUR ! Lavoisier, mon héros !',
      rule:'Une réaction chimique TRANSFORME des réactifs en produits. La masse est CONSERVÉE (Lavoisier). Combustion = combustible + O2 + énergie. Masse molaire (g/mol) = somme des masses atomiques.',
      sections:[
        {icon:'🔥',title:'Combustion',color:'#ef4444',
         content:'Triangle du feu : combustible + O2 + énergie. Combustion complète : CO2 + H2O. Incomplète : CO toxique + suie.',
         examples:['CH4 + 2 O2 → CO2 + 2 H2O','C + O2 → CO2','Sans O2 → CO mortel']},
        {icon:'⚖️',title:'Conservation de la masse',color:'#22c55e',
         content:'Loi de Lavoisier : masse réactifs = masse produits. Atomes RÉARRANGÉS, ni créés ni détruits.',
         examples:['12g C + 32g O2 = 44g CO2','Tous les atomes retrouvés','Équilibrer les équations']},
        {icon:'🧪',title:'Mole et masse molaire',color:'#a855f7',
         content:'1 mole = 6,02×10²³ particules (Avogadro). Masse molaire en g/mol. M(H2O) = 18 g/mol.',
         examples:['M(H2O) = 18 g/mol','M(CO2) = 44 g/mol','36g d\'eau = 2 moles']}
      ],
      heroTip:'Mitsuri dit : "Loi de Lavoisier = AMOUR ! Les atomes ne disparaissent JAMAIS, ils se réarrangent. Masse conservée toujours. Et la mole = 6,02×10²³ particules. Chiffre magique !"',
      warmup:[
        {q:'Une réaction chimique transforme :',a:'Des réactifs en produits',o:['Des réactifs en produits','Rien','De l\'eau en bois']},
        {q:'M(H2O) =',a:'18 g/mol',o:['18 g/mol','2 g/mol','32 g/mol']}
      ]
    },
    4:{
      heroName:'Sanemi',
      heroQuote:'Acides et bases ! pH 0 à 14, et MALHEUR à qui se trompe d\'échelle !',
      rule:'pH va de 0 (très acide) à 14 (très basique). pH 7 = neutre. Acide libère H+. Base libère OH-. Acide + base → sel + eau (neutralisation).',
      sections:[
        {icon:'🧪',title:'Échelle de pH',color:'#a855f7',
         content:'0-7 acide, 7 neutre, 7-14 basique. Mesuré avec papier pH ou pH-mètre.',
         examples:['Citron : pH 2','Eau pure : pH 7','Eau de Javel : pH 12']},
        {icon:'⚛️',title:'Ions H+ et OH-',color:'#3b82f6',
         content:'Acide en solution → libère H+. Base en solution → libère OH-. Ions = particules chargées.',
         examples:['HCl → H+ + Cl-','NaOH → Na+ + OH-','H+ + OH- → H2O']},
        {icon:'⚠️',title:'Danger et neutralisation',color:'#ef4444',
         content:'Acides/bases forts = corrosifs (peau, yeux). Toujours acide DANS l\'eau (jamais l\'inverse). Neutralisation = mélange acide-base.',
         examples:['Eau de Javel : pH 12 (manipuler avec gants)','Acide chlorhydrique : pH 1','HCl + NaOH → NaCl + H2O']}
      ],
      heroTip:'Sanemi dit : "Acide = pH < 7 = H+. Base = pH > 7 = OH-. Neutre = pH 7. Et JAMAIS verser eau dans acide → projection ! Acide DANS eau, doucement !"',
      warmup:[
        {q:'L\'échelle de pH va de :',a:'0 à 14',o:['0 à 14','0 à 100','-10 à +10']},
        {q:'Une solution acide contient :',a:'Ions H+',o:['Ions H+','Ions OH-','Aucun ion']}
      ]
    },
    5:{
      heroName:'Muichiro',
      heroQuote:'… L\'évolution. Darwin l\'a vue. Les espèces changent au cours du temps. Comme la brume.',
      rule:'L\'ÉVOLUTION : les espèces changent au cours du temps. Mécanisme = MUTATIONS (variation génétique) + SÉLECTION NATURELLE (les mieux adaptés survivent et se reproduisent). Découvert par DARWIN (1859).',
      sections:[
        {icon:'🦴',title:'Preuves de l\'évolution',color:'#a855f7',
         content:'Fossiles montrent espèces disparues + transitions. ADN comparé : humain et chimpanzé partagent 98% (ancêtre commun -6 Ma).',
         examples:['Dinosaures fossiles','Humain et chimpanzé : ADN 98%','Lien évolutif tétrapodes']},
        {icon:'🔄',title:'Sélection naturelle',color:'#22c55e',
         content:'Variations génétiques (mutations) entre individus. Ceux qui survivent + se reproduisent transmettent leurs gènes. Sur des millions d\'années.',
         examples:['Phalène : forme sombre survit en zone polluée','Girafe : long cou favorisé','Bactéries résistantes aux antibiotiques']},
        {icon:'⏰',title:'Échelle du temps',color:'#3b82f6',
         content:'Terre : 4,5 Ga. Vie : 3,8 Ga. Mammifères : 200 Ma. Humains modernes : 300 ka. Évolution = TRÈS LENTE (millions d\'années).',
         examples:['Terre : 4,5 milliards d\'années','Dinosaures : 245-65 Ma','Homo sapiens : 300 000 ans']}
      ],
      heroTip:'Muichiro dit : "… Mutations + sélection naturelle + temps long = évolution. Darwin a TOUT compris. La vie change, comme la brume."',
      warmup:[
        {q:'Qui a proposé la théorie de l\'évolution ?',a:'Charles Darwin',o:['Charles Darwin','Newton','Einstein']},
        {q:'Mécanisme de l\'évolution :',a:'Mutations + sélection naturelle',o:['Mutations + sélection naturelle','Volonté individuelle','Aucun']}
      ]
    },
    6:{
      heroName:'Gyomei',
      heroQuote:'Bénis soient les neurones et les anticorps. Le corps humain est une CATHÉDRALE.',
      rule:'Système nerveux : cerveau + moelle épinière + nerfs. Neurones transmettent des signaux électriques. Système immunitaire : globules blancs (phagocytes, lymphocytes), anticorps. Vaccins = immunité acquise.',
      sections:[
        {icon:'🧠',title:'Système nerveux',color:'#a855f7',
         content:'Centre = cerveau + moelle épinière. Périphérique = nerfs. Neurones transmettent à ~100 m/s. Réflexes = passent par moelle.',
         examples:['Cerveau : ~100 milliards de neurones','Vue, ouïe, odorat = nerfs','Réflexe : main au feu = retire']},
        {icon:'🛡️',title:'Système immunitaire',color:'#3b82f6',
         content:'Phagocytes : englobent les microbes. Lymphocytes : produisent des anticorps spécifiques. Mémoire immunitaire = protection durable.',
         examples:['Globules blancs','Anticorps = clé-serrure','Lymphocytes mémoire']},
        {icon:'💉',title:'Vaccination',color:'#22c55e',
         content:'Vaccin = antigène atténué. Active immunité sans tomber malade. Mémoire pour de futurs combats. Immunité collective protège tous.',
         examples:['Variole éradiquée par vaccin','Polio quasi disparue','Tétanos, rougeole...']}
      ],
      heroTip:'Gyomei dit : "Vaccin = MÉMOIRE de défense. Sans tomber malade. Et l\'immunité COLLECTIVE protège ceux qui ne peuvent pas être vaccinés. Bénédiction !"',
      warmup:[
        {q:'Cellule du système nerveux :',a:'Neurone',o:['Neurone','Globule rouge','Os']},
        {q:'Comment agit un vaccin ?',a:'Active l\'immunité sans tomber malade',o:['Active l\'immunité sans tomber malade','Tue le microbe','Donne la maladie']}
      ]
    },
    7:{
      heroName:'Shinobu',
      heroQuote:'Génotype, phénotype, microbiote… des subtilités à comprendre. Élégant, n\'est-ce pas ?',
      rule:'Allèle = variante d\'un gène (2 par gène). Génotype = combinaison d\'allèles. Phénotype = caractères visibles. Allèle dominant s\'exprime même seul, récessif besoin d\'être en double. Microbiote = bactéries utiles dans l\'intestin.',
      sections:[
        {icon:'🧬',title:'Allèles et génotype',color:'#a855f7',
         content:'Pour chaque gène : 2 allèles (1 du père, 1 de la mère). Combinaison = génotype. Mb, MM, bb...',
         examples:['Gène yeux : M (marron) ou b (bleu)','MM = marron, Mb = marron, bb = bleu','Génotype écrit avec lettres']},
        {icon:'👁️',title:'Phénotype et dominance',color:'#3b82f6',
         content:'Phénotype = ce qu\'on voit (yeux marron, taille...). Dominant : 1 copie suffit. Récessif : il faut 2 copies.',
         examples:['M dominant sur b','MM ou Mb → marron','bb seul → bleu (récessif)']},
        {icon:'🦠',title:'Microbiote et biotechnologies',color:'#22c55e',
         content:'Microbiote = bactéries utiles (digestion, immunité, vitamines). OGM = organismes modifiés génétiquement. Médecine génétique en plein essor.',
         examples:['Microbiote intestinal','OGM agricoles','Thérapie génique']}
      ],
      heroTip:'Shinobu dit : "Génotype = ALLÈLES (ce qui est codé). Phénotype = CARACTÈRES (ce qui s\'exprime). Et le microbiote ? Des MILLIARDS de bactéries amies dans nos intestins. Élégant !"',
      warmup:[
        {q:'Un allèle est :',a:'Une variante d\'un gène',o:['Une variante d\'un gène','Un chromosome','Une cellule']},
        {q:'Le phénotype, c\'est :',a:'Caractères visibles/observables',o:['Caractères visibles/observables','Les chromosomes','L\'ADN seul']}
      ]
    },
    8:{
      heroName:'Giyu',
      heroQuote:'Les défis planétaires… atténuer, adapter, transitionner. Pour préserver la VIE.',
      rule:'3 grands défis planétaires : CLIMAT (réchauffement), BIODIVERSITÉ (6ème extinction), RESSOURCES (eau, énergie, sols). Solutions : transition énergétique + sobriété + économie circulaire + adaptation.',
      sections:[
        {icon:'🌡️',title:'Climat — Accord de Paris',color:'#ef4444',
         content:'Objectif : limiter réchauffement à +1,5°C (idéal) ou +2°C (max). Réduire CO2 et autres GES drastiquement.',
         examples:['Accord Paris (COP21, 2015)','Neutralité carbone 2050','Empreinte carbone individuelle']},
        {icon:'🦋',title:'Biodiversité',color:'#22c55e',
         content:'6ème extinction massive en cours, causée par humains. Protection = aires protégées, lutte braconnage, agriculture durable.',
         examples:['1 million d\'espèces menacées','Disparition pollinisateurs','Aires Natura 2000']},
        {icon:'♻️',title:'Économie circulaire + sobriété',color:'#3b82f6',
         content:'Réutiliser, réparer, recycler. Sobriété = consommer moins/mieux. Transition énergétique : 100% renouvelables possible.',
         examples:['Réparer plutôt que jeter','Manger local + moins de viande','Solaire/éolien à grande échelle']}
      ],
      heroTip:'Giyu dit : "ATTÉNUATION (réduire CO2) + ADAPTATION (s\'ajuster) + SOBRIÉTÉ (consommer moins) + TRANSITION (renouvelables) + PROTECTION (biodiversité). 5 piliers pour la vie !"',
      warmup:[
        {q:'L\'Accord de Paris vise à limiter le réchauffement à :',a:'+1,5 à +2°C',o:['+1,5 à +2°C','+10°C','-5°C']},
        {q:'L\'économie circulaire consiste à :',a:'Réutiliser, réparer, recycler',o:['Réutiliser, réparer, recycler','Tout jeter','Acheter neuf']}
      ]
    }
  }
};

console.info('⚔️ lesson-data-kanto.js — 8 leçons 3ème Brevet Sciences × Demon Slayer chargées (LESSON_REGISTRY V2)');
