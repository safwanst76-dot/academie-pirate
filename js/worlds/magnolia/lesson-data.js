// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA-MAGNOLIA.JS — Académie Pirate V2
// 🐉 Magnolia · Histoire · Dragon Ball Z
// Pattern exact Grand Bleu : LESSON_REGISTRY par niveau
// 5 niveaux × 8 îles = 40 entrées
// ═══════════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

var _DBZ = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-magnolia/characters/';

// ── Mapping avatars par niveau (règle CIN-01) ────────────────────
var _DBZ_AVATARS = {
  'cm2':  {1:'goku.jpg',  2:'bulma.jpg', 3:'krilin.jpg',   4:'gohan.jpg',     5:'piccolo.png', 6:'trunks.jpg',    7:'android18.jpg',8:'vegeta.jpg'},
  '6eme': {1:'goku.jpg',  2:'gohan.jpg', 3:'krilin.jpg',   4:'trunks.jpg',    5:'piccolo.png', 6:'bulma.jpg',     7:'android17.jpg',8:'vegeta.jpg'},
  '5eme': {1:'goku.jpg',  2:'vegeta.jpg',3:'trunks.jpg',   4:'gohan.jpg',     5:'piccolo.png', 6:'android18.jpg', 7:'krilin.jpg',   8:'goten.jpg'},
  '4eme': {1:'goku.jpg',  2:'bulma.jpg', 3:'gohan.jpg',    4:'vegeta.jpg',    5:'trunks.jpg',  6:'piccolo.png',   7:'android17.jpg',8:'krilin.jpg'},
  '3eme': {1:'goku.jpg',  2:'vegeta.jpg',3:'gohan.jpg',    4:'piccolo.png',   5:'trunks.jpg',  6:'android18.jpg', 7:'bulma.jpg',    8:'goten.jpg'}
};


// ══════════════════════════════════════════════════════════════════
// CM2 — Préhistoire & Antiquité
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['magnolia_cm2'] = {
  color:'#f97316', bg:'#0a0500', textAccent:'#fbbf24',
  particles:'fire', worldName:'Magnolia',
  lessons:{
    1:{
      heroName:'Goku',
      heroQuote:'Kaméhaméha ! L\'Homo sapiens arrive d\'Afrique il y a 300 000 ans. L\'outil change tout !',
      rule:'La Préhistoire va de l\'apparition des hominidés (-3 M ans) à l\'invention de l\'écriture (-3300). Le Paléolithique = nomade. Le Néolithique = agriculture.',
      sections:[
        {icon:'🦴',title:'Les premiers humains',color:'#f97316',
         content:'L\'Homo sapiens apparaît en Afrique il y a 300 000 ans. La Préhistoire se termine avec l\'écriture cunéiforme (3300 av. J.-C.).',
         examples:['Homo habilis = premier tailleur d\'outils','Homo erectus = maîtrise le feu','Homo sapiens = nous']},
        {icon:'🌾',title:'La révolution néolithique',color:'#22c55e',
         content:'Vers 8000 av. J.-C., les hommes inventent l\'agriculture et l\'élevage. Ils deviennent sédentaires et construisent des villages.',
         examples:['Lascaux = peintures rupestres (-17 000 ans)','Sédentarisation = villages permanents','Mégalithes = dolmens et menhirs']}
      ],
      heroTip:'Goku dit : "Paléolithique = Pierre taillée + nomade. Néolithique = Pierre polie + agriculture. Retiens le N de Néolithique = Nouveau mode de vie !"',
      warmup:[
        {q:'Quand apparaissent les premiers Homo sapiens ?',a:'Il y a 300 000 ans',o:['Il y a 300 000 ans','Il y a 3 000 ans','Il y a 3 millions d\'ans']},
        {q:'Qu\'est-ce que la révolution néolithique ?',a:'L\'invention de l\'agriculture',o:['L\'invention de l\'agriculture','La maîtrise du feu','La taille du silex']}
      ]
    },
    2:{
      heroName:'Bulma',
      heroQuote:'Mon Radar Dragon ? Rien comparé à l\'écriture cunéiforme des Sumériens pour compter leurs troupeaux !',
      rule:'Les Sumériens inventent l\'écriture cunéiforme vers 3300 av. J.-C. en Mésopotamie (entre le Tigre et l\'Euphrate). Le Code de Hammurabi est le premier code de lois.',
      sections:[
        {icon:'✍️',title:'L\'écriture cunéiforme',color:'#22c55e',
         content:'Les Sumériens inventent l\'écriture cunéiforme vers 3300 av. J.-C. Cunéiforme = signes en forme de coin gravés dans l\'argile.',
         examples:['Mésopotamie = entre le Tigre et l\'Euphrate (Irak actuel)','Cunéiforme = écriture en forme de coin','Code de Hammurabi = premier code de lois']},
        {icon:'🏙️',title:'Les premières villes',color:'#3b82f6',
         content:'Ur, Babylone : les premières grandes cités avec temples (ziggourats), marchés et scribes. La spécialisation du travail apparaît.',
         examples:['Ziggurat = temple en pyramide à degrés','Babylone = capitale de l\'empire babylonien','Scribes = premiers fonctionnaires']}
      ],
      heroTip:'Bulma dit : "Cunéiforme vient de cuneus = coin en latin. Les signes ressemblent à des clous. Imagine une tablette d\'argile marquée à coups de bâton !"',
      warmup:[
        {q:'Quel peuple invente l\'écriture cunéiforme ?',a:'Les Sumériens',o:['Les Sumériens','Les Égyptiens','Les Grecs']},
        {q:'La Mésopotamie est située entre quels fleuves ?',a:'Le Tigre et l\'Euphrate',o:['Le Tigre et l\'Euphrate','Le Nil et le Congo','Le Rhin et le Danube']}
      ]
    },
    3:{
      heroName:'Krilin',
      heroQuote:'Mon Destructo-Disque est aussi parfait qu\'une pyramide de Gizeh !',
      rule:'L\'Égypte ancienne dure 3000 ans (3150 à 30 av. J.-C.). Le pharaon est roi et dieu. Les hiéroglyphes sont l\'écriture sacrée.',
      sections:[
        {icon:'👑',title:'Le pharaon, roi-dieu',color:'#eab308',
         content:'Le pharaon est à la fois roi et dieu vivant. Il dirige une civilisation qui dure 3000 ans le long du Nil. Les pyramides sont ses tombeaux.',
         examples:['Hiéroglyphes = écriture sacrée égyptienne','Pyramide de Khéops = -2560 av. J.-C.','Sphinx de Gizeh = 73 m de long']},
        {icon:'🌊',title:'Le don du Nil',color:'#06b6d4',
         content:'Hérodote appelle l\'Égypte "le don du Nil". Les crues annuelles déposent un limon fertile qui permet l\'agriculture.',
         examples:['Ramsès II = pharaon le plus célèbre','Cléopâtre = dernière pharaonne (-30)','Momification = conservation du corps pour la vie éternelle']}
      ],
      heroTip:'Krilin dit : "Pour retenir : le Nil va du sud au nord. L\'Égypte se lit de bas en haut sur la carte. Les pyramides pointent vers le ciel comme les hiéroglyphes sacrés !"',
      warmup:[
        {q:'Qui est le pharaon en Égypte ancienne ?',a:'Un roi et un dieu à la fois',o:['Un roi et un dieu à la fois','Seulement un roi','Un prêtre élu']},
        {q:'Que signifie "le don du Nil" selon Hérodote ?',a:'L\'Égypte vit grâce aux crues fertiles du Nil',o:['L\'Égypte vit grâce aux crues fertiles du Nil','Le Nil est sacré','Le Nil apporte de l\'or']}
      ]
    },
    4:{
      heroName:'Gohan',
      heroQuote:'La connaissance est ma vraie force ! Comme Périclès qui gouvernait par la parole !',
      rule:'La démocratie athénienne naît au Vème siècle av. J.-C. Démocratie = demos (peuple) + kratos (pouvoir). Seuls les citoyens hommes libres votent.',
      sections:[
        {icon:'🏛️',title:'La démocratie athénienne',color:'#a855f7',
         content:'Athènes invente la démocratie au Vème s. av. J.-C. L\'Ecclésia (assemblée) réunit les citoyens pour voter les lois. Périclès est son grand dirigeant.',
         examples:['Ecclésia = assemblée des citoyens','Agora = place publique de débat','Ostracisme = exil de 10 ans pour les dangereux']},
        {icon:'🧠',title:'Philosophie & culture grecque',color:'#3b82f6',
         content:'Socrate, Platon et Aristote fondent la philosophie. Les Jeux Olympiques ont lieu à Olympie depuis 776 av. J.-C.',
         examples:['Socrate = "je sais que je ne sais rien"','Parthenon = temple d\'Athéna sur l\'Acropole','Homère = auteur de l\'Iliade et l\'Odyssée']}
      ],
      heroTip:'Gohan dit : "Démocratie = demos + kratos. Pense à démographie (science du peuple) et autoCRATe (qui a le pouvoir seul). Ensemble → pouvoir du peuple !"',
      warmup:[
        {q:'Que signifie "démocratie" en grec ?',a:'Pouvoir du peuple',o:['Pouvoir du peuple','Pouvoir des rois','Pouvoir des dieux']},
        {q:'L\'Ecclésia à Athènes est ?',a:'L\'assemblée des citoyens qui vote les lois',o:['L\'assemblée des citoyens qui vote les lois','Le tribunal','Le marché']}
      ]
    },
    5:{
      heroName:'Piccolo',
      heroQuote:'Je surpasserai Kami — comme Rome a surpassé toutes les cités !',
      rule:'Rome est fondée en 753 av. J.-C. La République romaine (509 av. J.-C.) : deux consuls élus + le Sénat. SPQR = Senatus PopulusQue Romanus.',
      sections:[
        {icon:'🏛️',title:'La République romaine',color:'#6366f1',
         content:'Rome fonde la République en 509 av. J.-C. Deux consuls élus pour 1 an dirigent. Le Sénat des patriciens conseille. SPQR est la devise.',
         examples:['753 av. J.-C. = fondation de Rome par Romulus','509 av. J.-C. = début de la République','Patriciens = aristocrates / Plébéiens = peuple libre']},
        {icon:'⚔️',title:'Les conquêtes romaines',color:'#ef4444',
         content:'Rome conquiert l\'Italie puis Carthage (Guerres puniques). Jules César conquiert la Gaule. "Veni, vidi, vici" = Je suis venu, j\'ai vu, j\'ai vaincu.',
         examples:['Guerres puniques = Rome vs Carthage (264-146 av. J.-C.)','Hannibal traverse les Alpes avec des éléphants','César assassiné aux Ides de mars 44 av. J.-C.']}
      ],
      heroTip:'Piccolo dit : "SPQR = Sénat et Peuple Romains. Retiens : S = Sénat (aristocrates), P = Peuple. Comme les patriciens et plébéiens qui se partagent le pouvoir !"',
      warmup:[
        {q:'Que signifie SPQR ?',a:'Le Sénat et le Peuple Romains',o:['Le Sénat et le Peuple Romains','La Sagesse et la Puissance Romaines','Le Souverain et la Province Romains']},
        {q:'Les deux magistrats élus chaque année à Rome s\'appellent ?',a:'Consuls',o:['Consuls','Empereurs','Sénateurs']}
      ]
    },
    6:{
      heroName:'Trunks',
      heroQuote:'Je viens du futur — et j\'ai lu toute l\'histoire de l\'Empire romain !',
      rule:'Auguste fonde l\'Empire romain en 27 av. J.-C. La Pax Romana = 200 ans de paix. L\'Empire chute en 476 ap. J.-C. avec les invasions barbares.',
      sections:[
        {icon:'👑',title:'Auguste et la Pax Romana',color:'#f59e0b',
         content:'Auguste devient le 1er Empereur en 27 av. J.-C. La Pax Romana (27 av. J.-C. - 180 ap. J.-C.) : 200 ans de paix, 50 millions d\'habitants, routes et aqueducs.',
         examples:['Colisée = 50 000 places, construit en 70 ap. J.-C.','Édit de Milan 313 = christianisme légalisé','Édit de Caracalla 212 = citoyenneté pour tous']},
        {icon:'📜',title:'La chute de l\'Empire',color:'#ef4444',
         content:'L\'Empire se divise en 395. En 476, Odoacre renverse le dernier Empereur : c\'est la fin de l\'Antiquité et le début du Moyen Âge.',
         examples:['395 = division Empire d\'Orient et d\'Occident','476 = chute de l\'Empire d\'Occident','L\'Empire byzantin (Orient) survit jusqu\'en 1453']}
      ],
      heroTip:'Trunks dit : "27 av. → Auguste. 313 → christianisme légal. 395 → division. 476 → chute Occident. Retiens ces 4 dates comme 4 coups d\'épée dans l\'histoire !"',
      warmup:[
        {q:'Qui est le premier Empereur romain ?',a:'Auguste',o:['Auguste','Jules César','Néron']},
        {q:'En quelle année l\'Empire romain d\'Occident tombe-t-il ?',a:'476 ap. J.-C.',o:['476 ap. J.-C.','395 ap. J.-C.','313 ap. J.-C.']}
      ]
    },
    7:{
      heroName:'Android 18',
      heroQuote:'Une religion qui change l\'Empire entier — fascinant à analyser !',
      rule:'Jésus naît vers -4 en Palestine. Ses apôtres diffusent son message. En 313, l\'Édit de Milan légalise le christianisme. En 380, il devient religion d\'État.',
      sections:[
        {icon:'✝️',title:'Naissance du christianisme',color:'#ec4899',
         content:'Jésus naît vers -4 en Palestine (province romaine). Ses 12 apôtres diffusent sa parole. Les premiers chrétiens sont persécutés car ils refusent les dieux romains.',
         examples:['Apôtres = 12 disciples de Jésus','Saint Paul = grands voyages missionnaires','Catacombes = lieux de réunion secrets']},
        {icon:'📖',title:'Le christianisme religion d\'État',color:'#8b5cf6',
         content:'En 313, Constantin légalise le christianisme (Édit de Milan). En 380, Théodose en fait la seule religion officielle de l\'Empire romain.',
         examples:['313 = Édit de Milan (Constantin)','380 = Théodose (religion d\'État)','Bible = Ancien + Nouveau Testament']}
      ],
      heroTip:'Android 18 dit : "313 → tolérance (Milan). 380 → obligation (Théodose). Retiens : 3-1-3 comme trois actes d\'un drame, et 3-8-0 comme la conclusion !"',
      warmup:[
        {q:'En quelle année le christianisme est-il légalisé par l\'Édit de Milan ?',a:'313 ap. J.-C.',o:['313 ap. J.-C.','380 ap. J.-C.','395 ap. J.-C.']},
        {q:'Qui est l\'auteur de nombreuses lettres aux premières communautés chrétiennes ?',a:'Saint Paul',o:['Saint Paul','Saint Pierre','Saint Jean']}
      ]
    },
    8:{
      heroName:'Vegeta',
      heroQuote:'Je suis le Prince des Saiyans — Rome aussi avait ses conquérants qui ont tout renversé !',
      rule:'Les invasions germaniques (Wisigoths, Vandales, Huns) affaiblissent Rome. En 476, Odoacre renverse le dernier Empereur. Le Moyen Âge commence.',
      sections:[
        {icon:'⚔️',title:'Les grandes invasions',color:'#ef4444',
         content:'Les Huns d\'Attila poussent les peuples germaniques vers l\'Empire. En 410, les Wisigoths pillent Rome. En 476, Odoacre renverse Romulus Augustule.',
         examples:['Attila = le Fléau de Dieu','410 = pillage de Rome par Alaric','476 = fin de l\'Empire romain d\'Occident']},
        {icon:'🔰',title:'Vers le Moyen Âge',color:'#6366f1',
         content:'Clovis, roi des Francs, se convertit vers 496. L\'Empire byzantin (Empire romain d\'Orient) survit à l\'est jusqu\'en 1453.',
         examples:['Clovis = roi des Francs converti au christianisme','Empire byzantin = survit jusqu\'en 1453','476 = date conventionnelle de début du Moyen Âge']}
      ],
      heroTip:'Vegeta dit : "476 = l\'an zéro du Moyen Âge. Avant = Antiquité. Après = Moyen Âge. C\'est simple mais fondamental. Grave cette date dans ta mémoire comme une date de bataille !"',
      warmup:[
        {q:'En quelle année l\'Empire romain d\'Occident tombe-t-il ?',a:'476 ap. J.-C.',o:['476 ap. J.-C.','410 ap. J.-C.','395 ap. J.-C.']},
        {q:'Quel roi franc se convertit au christianisme vers 496 ?',a:'Clovis',o:['Clovis','Attila','Odoacre']}
      ]
    }
  }
};

// ══════════════════════════════════════════════════════════════════
// 6ÈME — L'Antiquité complète
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['magnolia_6eme'] = {
  color:'#22c55e', bg:'#000a05', textAccent:'#86efac',
  particles:'water', worldName:'Magnolia',
  lessons:{
    1:{
      heroName:'Goku',
      heroQuote:'J\'ai toujours aimé me battre — et l\'Homo sapiens aussi luttait pour survivre !',
      rule:'L\'Homo sapiens quitte l\'Afrique il y a 70 000 ans. Le Néolithique (-8000) = agriculture + sédentarisation. L\'écriture (-3300) marque la fin de la Préhistoire.',
      sections:[
        {icon:'🦴',title:'Les hominidés et leurs migrations',color:'#f97316',
         content:'Lucy (Australopithèque, -3,2 M ans) est un ancêtre. Homo habilis, Homo erectus (maîtrise le feu), puis Homo sapiens (-300 000). Migrations hors d\'Afrique il y a 70 000 ans.',
         examples:['Lucy = Australopithèque éthiopien (-3,2 M ans)','Bipédie = marche sur deux pieds (libère les mains)','Homo sapiens = seul hominidé encore vivant']},
        {icon:'🌾',title:'La révolution néolithique',color:'#22c55e',
         content:'Vers 8000 av. J.-C., l\'agriculture et l\'élevage permettent la sédentarisation. Les mégalithes (dolmens, menhirs) apparaissent au Néolithique.',
         examples:['Art pariétal = peintures rupestres (Lascaux, Chauvet)','Mégalithes = dolmens et menhirs','Âge du Bronze = -3300 à -1200']}
      ],
      heroTip:'Goku dit : "Retiens l\'ordre : Homo habilis → Homo erectus → Homo sapiens. Habilis = habile (outils). Erectus = debout (feu). Sapiens = sage (nous) !"',
      warmup:[
        {q:'Qu\'est-ce que Lucy ?',a:'Un fossile d\'Australopithèque vieux de 3,2 millions d\'ans',o:['Un fossile d\'Australopithèque vieux de 3,2 millions d\'ans','Un Homo sapiens','Un Homo erectus']},
        {q:'La révolution néolithique désigne ?',a:'L\'invention de l\'agriculture et de l\'élevage',o:['L\'invention de l\'agriculture et de l\'élevage','La maîtrise du feu','La taille du silex']}
      ]
    },
    2:{
      heroName:'Gohan',
      heroQuote:'La connaissance est ma force ! Comme Clisthène qui invente la démocratie !',
      rule:'La polis grecque est une cité-état indépendante. La démocratie athénienne est fondée par Clisthène en 508 av. J.-C. L\'Ecclésia vote les lois.',
      sections:[
        {icon:'🏛️',title:'La polis et la démocratie',color:'#a855f7',
         content:'La polis est une cité-état autonome. Athènes invente la démocratie en 508-507 av. J.-C. avec Clisthène. L\'Ecclésia réunit tous les citoyens (hommes libres).',
         examples:['Clisthène = réformateur de la démocratie (508)','Ostracisme = exil de 10 ans par vote de coquilles','Périclès = âge d\'or d\'Athènes (Vème s.)']},
        {icon:'⚔️',title:'Les guerres médiques',color:'#ef4444',
         content:'490 av. J.-C. : bataille de Marathon (victoire grecque). 480 av. J.-C. : thermopyles (300 Spartiates). Victoire à Salamine. Les Grecs repoussent les Perses.',
         examples:['Marathon = victoire sur les Perses de Darios (490)','Thermopyles = 300 Spartiates de Léonidas (480)','Salamine = victoire navale grecque (480)']}
      ],
      heroTip:'Gohan dit : "Ecclésia = assemblée. Agora = place publique. Acropole = colline sacrée. Trois lieux clés d\'Athènes. Comme trois niveaux d\'une ville : place → assemblée → temple !"',
      warmup:[
        {q:'Qui réforme la démocratie athénienne en 508 av. J.-C. ?',a:'Clisthène',o:['Clisthène','Périclès','Solon']},
        {q:'La bataille de Marathon (490 av. J.-C.) oppose ?',a:'La Grèce à la Perse',o:['La Grèce à la Perse','Athènes à Sparte','La Grèce à Rome']}
      ]
    },
    3:{
      heroName:'Krilin',
      heroQuote:'Alexandre conquiert en 13 ans ce que personne n\'avait fait. Même moi je suis impressionné !',
      rule:'Alexandre le Grand conquiert un empire de la Grèce à l\'Inde en 13 ans (336-323 av. J.-C.). L\'hellénisme diffuse la culture grecque dans le monde conquis.',
      sections:[
        {icon:'⚔️',title:'Les conquêtes d\'Alexandre',color:'#3b82f6',
         content:'Alexandre (356-323 av. J.-C.), élève d\'Aristote, devient roi de Macédoine à 20 ans. Il conquiert la Perse, l\'Égypte et l\'Inde. Il meurt à Babylone à 32 ans.',
         examples:['Bataille d\'Issos (333) = défaite de Darios III','Alexandrie = ville fondée en Égypte (-331)','Alexandre meurt à Babylone (-323) à 32 ans']},
        {icon:'🌍',title:'L\'hellénisme',color:'#22c55e',
         content:'L\'hellénisme = diffusion de la culture grecque dans le monde. Le koiné (grec commun) devient la langue internationale. Les Diadoques se partagent l\'empire.',
         examples:['Koiné = grec commun parlé dans tout l\'empire','Diadoques = généraux qui se partagent l\'empire','Bibliothèque d\'Alexandrie = centre du savoir']}
      ],
      heroTip:'Krilin dit : "Diadoques = Di-a-doques = successeurs en grec. Après Alexandre, ses généraux se partagent le gâteau. Ptolémée prend l\'Égypte, Séleucide prend l\'Asie !"',
      warmup:[
        {q:'Alexandre le Grand était roi de ?',a:'Macédoine',o:['Macédoine','Athènes','Sparte']},
        {q:'L\'hellénisme désigne ?',a:'La diffusion de la culture grecque dans le monde conquis',o:['La diffusion de la culture grecque dans le monde conquis','La langue grecque','La religion grecque']}
      ]
    },
    4:{
      heroName:'Trunks',
      heroQuote:'Je construis pour l\'avenir — comme Rome qui dure 1000 ans !',
      rule:'Rome est fondée en 753 av. J.-C. La République (509) est dirigée par des consuls et le Sénat. Les guerres civiles aboutissent à l\'Empire en 27 av. J.-C.',
      sections:[
        {icon:'🐺',title:'Des origines à la République',color:'#6366f1',
         content:'Selon la légende, Romulus fonde Rome en 753 av. J.-C. La République naît en 509. La Loi des XII Tables (450) grave les lois pour tous.',
         examples:['Romulus = fondateur légendaire de Rome (-753)','509 = début de la République','Loi des XII Tables = premières lois écrites (-450)']},
        {icon:'⚔️',title:'Des guerres civiles à César',color:'#ef4444',
         content:'Les guerres civiles déchirent Rome : César vs Pompée. Spartacus mène une révolte d\'esclaves (73-71 av. J.-C.). César est assassiné le 15 mars 44 av. J.-C.',
         examples:['Guerres puniques = Rome vs Carthage (-264 à -146)','Spartacus = révolte des esclaves (-73)','César assassiné : "Et tu, Brute ?" (-44)']}
      ],
      heroTip:'Trunks dit : "-753 fondation. -509 République. -450 XII Tables. -44 mort de César. -27 Empire. Retiens ces 5 dates comme 5 coups d\'épée décisifs de l\'histoire romaine !"',
      warmup:[
        {q:'Selon la légende, qui fonde Rome en 753 av. J.-C. ?',a:'Romulus',o:['Romulus','César','Pompée']},
        {q:'Jules César est assassiné le ?',a:'15 mars 44 av. J.-C.',o:['15 mars 44 av. J.-C.','15 mars 27 av. J.-C.','15 mars 476 ap. J.-C.']}
      ]
    },
    5:{
      heroName:'Piccolo',
      heroQuote:'La Pax Romana — 200 ans de paix. Comme si personne n\'osait me défier !',
      rule:'Auguste fonde l\'Empire en 27 av. J.-C. La Pax Romana dure 200 ans. L\'Empire atteint 50 millions d\'habitants. Les routes, aqueducs et lois romaines structurent le monde.',
      sections:[
        {icon:'👑',title:'L\'Empire et ses institutions',color:'#06b6d4',
         content:'L\'Empire romain = Mare Nostrum (notre mer). La légion romaine est l\'unité de combat. Les insulae (immeubles) logent les citadins. Les thermes sont les bains publics.',
         examples:['Mare Nostrum = la Méditerranée romaine','Légion = 4000 à 6000 soldats','Limes = frontière fortifiée de l\'Empire']},
        {icon:'⚖️',title:'Le droit romain',color:'#8b5cf6',
         content:'Le droit romain inspire encore nos codes juridiques. La crise du IIIème siècle : 50 empereurs en 50 ans. L\'Édit de Caracalla (212) donne la citoyenneté à tous.',
         examples:['Droit romain = base des droits européens modernes','Édit de Caracalla 212 = citoyenneté pour tous les hommes libres','Crise du IIIème s. = 50 empereurs en 50 ans']}
      ],
      heroTip:'Piccolo dit : "Colisée 70 ap. J.-C. Pompeï 79 ap. J.-C. Milan 313 ap. J.-C. Caracalla 212 ap. J.-C. Retiens ces 4 chiffres comme 4 défis relevés par Rome !"',
      warmup:[
        {q:'Que signifie "Mare Nostrum" pour les Romains ?',a:'Notre mer (la Méditerranée)',o:['Notre mer (la Méditerranée)','La mer intérieure de Rome','La mer des pirates']},
        {q:'L\'Édit de Caracalla (212) accorde ?',a:'La citoyenneté romaine à tous les hommes libres',o:['La citoyenneté romaine à tous les hommes libres','La liberté aux esclaves','Le droit de vote aux femmes']}
      ]
    },
    6:{
      heroName:'Bulma',
      heroQuote:'En 313, Constantin légalise le christianisme. Une révolution politique aussi grande que mon Radar Dragon !',
      rule:'Le christianisme naît en Palestine. Persécuté puis légalisé (313) puis religion d\'État (380). La Bible = Ancien + Nouveau Testament. Schisme de 1054 : catholiques / orthodoxes.',
      sections:[
        {icon:'✝️',title:'Du monothéisme à la religion d\'État',color:'#f59e0b',
         content:'Le monothéisme = croyance en un seul Dieu. Les chrétiens sont persécutés car ils refusent les dieux romains. En 313, Constantin légalise (Édit de Milan). En 380, Théodose impose.',
         examples:['Concile de Nicée 325 = définit le dogme de la Trinité','Vulgate = Bible en latin (Saint Jérôme)','Saint Augustin = Les Confessions, La Cité de Dieu']},
        {icon:'🏛️',title:'L\'organisation de l\'Église',color:'#a855f7',
         content:'Le pape est l\'évêque de Rome. Les évêques dirigent des diocèses. En 1054, le Grand Schisme sépare catholiques romains et orthodoxes grecs.',
         examples:['Pape = évêque de Rome, successeur de saint Pierre','Schisme de 1054 = séparation catholiques/orthodoxes','Hérétique = celui qui rejette le dogme officiel']}
      ],
      heroTip:'Bulma dit : "Monothéisme = mono (un) + théos (dieu). Compare : polythéisme = poly (plusieurs). Rome passe du poly au mono entre -753 et 380. En 600 ans, tout change !"',
      warmup:[
        {q:'Quel édit légalise le christianisme en 313 ap. J.-C. ?',a:'L\'Édit de Milan',o:['L\'Édit de Milan','L\'Édit de Caracalla','L\'Édit de Thessalonique']},
        {q:'Le schisme de 1054 divise le christianisme entre ?',a:'Catholiques romains et orthodoxes grecs',o:['Catholiques romains et orthodoxes grecs','Catholiques et protestants','Chrétiens et musulmans']}
      ]
    },
    7:{
      heroName:'Android 17',
      heroQuote:'Les royaumes barbares remplacent Rome. Le monde change — il faut s\'adapter !',
      rule:'Après 476, les royaumes germaniques (Wisigoths, Francs, Ostrogoths) se partagent l\'Occident. L\'Empire byzantin (Orient) survit jusqu\'en 1453. Clovis se convertit vers 496.',
      sections:[
        {icon:'⚔️',title:'Les royaumes germaniques',color:'#ef4444',
         content:'Wisigoths (Espagne), Ostrogoths (Italie), Francs (Gaule), Vandales (Afrique du Nord) : chaque peuple crée son royaume sur les ruines de l\'Empire.',
         examples:['Wisigoths = Espagne (jusqu\'en 711)','Francs = Gaule (future France)','Vandales = Afrique du Nord (sac de Rome 455)']},
        {icon:'🔰',title:'L\'Empire byzantin et l\'Islam',color:'#3b82f6',
         content:'L\'Empire byzantin (capitale : Constantinople) survit à l\'est jusqu\'en 1453. Au VIIème s., l\'expansion islamique conquiert Syrie, Palestine, Égypte.',
         examples:['Constantinople = capitale de l\'Empire byzantin','Islam = VIIème s., conquête de la Méditerranée sud','Bataille de Poitiers 732 = arrêt de l\'expansion arabe']}
      ],
      heroTip:'Android 17 dit : "Le latin évolue en langues romanes : français, espagnol, italien, portugais. Retiens : ROM-an → ROM-ains → ROM-ance languages. L\'héritage est dans les mots !"',
      warmup:[
        {q:'Les Francs s\'installent principalement en ?',a:'Gaule (France actuelle)',o:['Gaule (France actuelle)','Espagne','Italie']},
        {q:'L\'Empire byzantin est l\'Empire romain ?',a:'D\'Orient qui survit jusqu\'en 1453',o:['D\'Orient qui survit jusqu\'en 1453','D\'Occident','De Charlemagne']}
      ]
    },
    8:{
      heroName:'Vegeta',
      heroQuote:'Je suis le plus fort — comme Rome qui a tout dominé pendant 1000 ans !',
      rule:'L\'Antiquité va de -3300 (écriture) à 476 (chute de Rome). Grèce = démocratie + philosophie. Rome = droit + organisation. Orient = monothéisme.',
      sections:[
        {icon:'🌍',title:'Bilan de l\'Antiquité',color:'#a855f7',
         content:'L\'Antiquité pose les bases de notre civilisation : démocratie (Grèce), droit (Rome), monothéisme (Proche-Orient). La route de la Soie relie Chine et Rome.',
         examples:['3300 av. J.-C. = début Antiquité (écriture)','476 ap. J.-C. = fin Antiquité (chute Rome)','Route de la Soie = échanges Chine-Rome']},
        {icon:'📚',title:'Les héritages durables',color:'#22c55e',
         content:'L\'alphabet phénicien → grec → latin → nos alphabets. Le droit romain inspire nos codes. La Bible structure l\'Occident. La philosophie grecque fonde la pensée moderne.',
         examples:['Phéniciens = inventeurs de l\'alphabet consonantique','Droit romain = base des droits européens','Langues romanes = héritages du latin']}
      ],
      heroTip:'Vegeta dit : "3 héritages à retenir : Grèce = PENSER (démocratie, philosophie). Rome = ORGANISER (droit, routes). Proche-Orient = CROIRE (monothéisme). Trois piliers de l\'Occident !"',
      warmup:[
        {q:'L\'Antiquité commence avec quelle invention ?',a:'L\'écriture cunéiforme (-3300 av. J.-C.)',o:['L\'écriture cunéiforme (-3300 av. J.-C.)','La roue','L\'agriculture']},
        {q:'Quel peuple invente l\'alphabet qui donne nos lettres ?',a:'Les Phéniciens',o:['Les Phéniciens','Les Grecs','Les Romains']}
      ]
    }
  }
};

// ══════════════════════════════════════════════════════════════════
// 5ÈME — Le Moyen Âge
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['magnolia_5eme'] = {
  color:'#8b5cf6', bg:'#05000a', textAccent:'#c4b5fd',
  particles:'fire', worldName:'Magnolia',
  lessons:{
    1:{
      heroName:'Goku',
      heroQuote:'En 622, Mahomet quitte La Mecque pour Médine. L\'Hégire — comme quand j\'ai quitté ma planète !',
      rule:'Mahomet naît à La Mecque (570). L\'Hégire = exil vers Médine (622) = début du calendrier musulman. 5 piliers : foi, prière, aumône, jeûne (Ramadan), pèlerinage (hajj).',
      sections:[
        {icon:'🌙',title:'La naissance de l\'islam',color:'#f97316',
         content:'Mahomet (570-632) reçoit les révélations d\'Allah à La Mecque. L\'Hégire (622) marque le début du calendrier musulman. Le Coran est le texte sacré de l\'islam.',
         examples:['622 = l\'Hégire = début du calendrier musulman','5 piliers : foi, prière, aumône, jeûne, pèlerinage','Coran = livre sacré de l\'islam']},
        {icon:'🌍',title:'L\'expansion islamique',color:'#22c55e',
         content:'Après Mahomet, les califes étendent l\'islam : Perse, Égypte, Afrique du Nord, Espagne (Al-Andalus). En 732, Charles Martel arrête l\'avancée à Poitiers.',
         examples:['Al-Andalus = Espagne musulmane (711-1492)','Bataille de Poitiers 732 = arrêt de l\'expansion','Calife = successeur de Mahomet']}
      ],
      heroTip:'Goku dit : "5 piliers de l\'islam = 5 doigts de la main. Foi (pouce), Prière (index), Aumône (majeur), Jeûne (annulaire), Pèlerinage (auriculaire). Facile à retenir !"',
      warmup:[
        {q:'Que désigne l\'Hégire (622) ?',a:'L\'exil de Mahomet de La Mecque à Médine',o:['L\'exil de Mahomet de La Mecque à Médine','La mort de Mahomet','La naissance de Mahomet']},
        {q:'En 732, qui arrête l\'expansion arabe à Poitiers ?',a:'Charles Martel',o:['Charles Martel','Clovis','Charlemagne']}
      ]
    },
    2:{
      heroName:'Vegeta',
      heroQuote:'Charlemagne règne sur la moitié de l\'Europe. Il serait digne d\'être un Saiyan !',
      rule:'Charlemagne est couronné Empereur le 25 décembre 800. Capitale : Aix-la-Chapelle. Le traité de Verdun (843) divise l\'empire en 3 parties.',
      sections:[
        {icon:'👑',title:'L\'Empire carolingien',color:'#22c55e',
         content:'Charlemagne (742-814) est couronné Empereur à Rome le 25 décembre 800. Il réforme l\'éducation, crée les missi dominici pour contrôler les comtes.',
         examples:['800 = couronnement de Charlemagne à Rome','Missi dominici = inspecteurs royaux','Renaissance carolingienne = essor de l\'éducation']},
        {icon:'📜',title:'La division de l\'empire',color:'#f59e0b',
         content:'Le traité de Verdun (843) divise l\'empire carolingien en 3 : Francie occidentale (→ France), Lotharingie, Francie orientale (→ Allemagne).',
         examples:['843 = traité de Verdun (3 royaumes)','Pépin le Bref = père de Charlemagne','États pontificaux = don de Pépin au pape']}
      ],
      heroTip:'Vegeta dit : "800 = couronnement. 843 = traité de Verdun. Ces deux dates séparées de 43 ans résument l\'empire carolingien. Gloire et division. Comme toujours dans l\'Histoire !"',
      warmup:[
        {q:'Charlemagne est couronné Empereur le ?',a:'25 décembre 800',o:['25 décembre 800','15 août 778','14 juillet 789']},
        {q:'Le traité de Verdun (843) fait quoi ?',a:'Divise l\'empire carolingien en 3 parties',o:['Divise l\'empire carolingien en 3 parties','Crée le royaume de France','Nomme Charlemagne roi']}
      ]
    },
    3:{
      heroName:'Trunks',
      heroQuote:'Je protège mes vassaux — le vassal jure fidélité et reçoit un fief. C\'est l\'honneur !',
      rule:'La féodalité = système de liens entre seigneur et vassal. Le vassal jure fidélité (hommage) et reçoit une terre (fief). Les serfs sont liés à la terre.',
      sections:[
        {icon:'🏰',title:'Le système féodal',color:'#8b5cf6',
         content:'Le suzerain accorde un fief (terre) au vassal qui lui jure fidélité (hommage vassalique). Le château fort protège seigneur et paysans.',
         examples:['Fief = terre accordée en échange de services militaires','Hommage vassalique = serment de fidélité','Château fort = centre du pouvoir seigneurial']},
        {icon:'🌾',title:'Les paysans au Moyen Âge',color:'#f97316',
         content:'Les serfs sont attachés à la terre (glèbe) et ne peuvent la quitter. Ils doivent la corvée (travail gratuit) et le cens (impôt) au seigneur.',
         examples:['Serf = paysan lié à la terre (pas esclave mais pas libre)','Corvée = travail gratuit obligatoire','Adoubement = cérémonie qui fait un chevalier']}
      ],
      heroTip:'Trunks dit : "Pyramide féodale du bas vers le haut : serfs → paysans libres → chevaliers → barons → grands seigneurs → roi. Comme une hiérarchie Saiyan !"',
      warmup:[
        {q:'Un fief est ?',a:'Une terre accordée par le seigneur au vassal',o:['Une terre accordée par le seigneur au vassal','Un impôt','Un château']},
        {q:'Les serfs au Moyen Âge sont ?',a:'Des paysans liés à la terre du seigneur',o:['Des paysans liés à la terre du seigneur','Des esclaves','Des chevaliers']}
      ]
    },
    4:{
      heroName:'Gohan',
      heroQuote:'L\'Église structure toute la société médiévale — même moi j\'aurais dû respecter ses règles !',
      rule:'L\'Église catholique structure le Moyen Âge : pape, évêques, prêtres. La dîme = 10% des revenus. L\'excommunication exclut de la communauté.',
      sections:[
        {icon:'⛪',title:'L\'Église, pouvoir spirituel et temporel',color:'#eab308',
         content:'Le pape dirige l\'Église depuis Rome. Les évêques dirigent les diocèses. La querelle des Investitures (1076-1122) oppose le pape et l\'Empereur germanique.',
         examples:['Dîme = 10% des revenus versés à l\'Église','Excommunication = exclusion de l\'Église','Concordat de Worms 1122 = fin de la querelle des Investitures']},
        {icon:'🏛️',title:'Art et culture médiévaux',color:'#a855f7',
         content:'Les cathédrales gothiques (arcs-boutants, grandes fenêtres) et les abbayes sont les grandes constructions du Moyen Âge. Thomas d\'Aquin concilie foi et raison.',
         examples:['Gothique = arcs-boutants + grandes fenêtres + rosaces','Abbaye de Cluny = réforme du monachisme (910)','Schisme de 1054 = séparation catholiques/orthodoxes']}
      ],
      heroTip:'Gohan dit : "Schisme de 1054 = Schisme de 10 + 54. Rome + 10 → Constantinople. Retiens : deux papes, deux Églises, une seule foi. La chrétienté se fissure !"',
      warmup:[
        {q:'La dîme au Moyen Âge est ?',a:'Un impôt ecclésiastique (10% des revenus)',o:['Un impôt ecclésiastique (10% des revenus)','Un impôt royal','Un droit de passage']},
        {q:'Le schisme de 1054 sépare ?',a:'Les catholiques romains et les orthodoxes grecs',o:['Les catholiques romains et les orthodoxes grecs','Catholiques et Protestants','Chrétiens et Musulmans']}
      ]
    },
    5:{
      heroName:'Piccolo',
      heroQuote:'En 1095, le pape appelle à libérer Jérusalem. Même moi je serais parti en croisade !',
      rule:'En 1095, Urbain II lance la 1ère croisade. 1099 : prise de Jérusalem. 1187 : Saladin la reprend. 1291 : chute d\'Acre = fin des croisades.',
      sections:[
        {icon:'✝️',title:'Les croisades',color:'#6366f1',
         content:'1095 : le pape Urbain II appelle à la croisade à Clermont. 1099 : les croisés prennent Jérusalem. 1187 : Saladin reprend Jérusalem, déclenchant la 3ème croisade.',
         examples:['1099 = prise de Jérusalem par les croisés','Saladin = sultan qui reprend Jérusalem en 1187','Richard Cœur de Lion = chef de la 3ème croisade']},
        {icon:'🏰',title:'Les ordres militaires',color:'#ec4899',
         content:'Les Templiers et Hospitaliers sont des ordres militaro-religieux protégeant les pèlerins. La 4ème croisade (1204) pille Constantinople au lieu de combattre les musulmans.',
         examples:['Templiers = ordre militaire de défense des pèlerins','1204 = 4ème croisade pille Constantinople','1291 = chute d\'Acre = fin des croisades']}
      ],
      heroTip:'Piccolo dit : "1095 → appel. 1099 → prise. 1187 → perte. 1291 → fin. Quatre dates, quatre actes du drame des croisades. Montée, sommet, déclin, chute !"',
      warmup:[
        {q:'Qui lance la 1ère croisade en 1095 ?',a:'Le pape Urbain II',o:['Le pape Urbain II','L\'Empereur Frédéric Barberousse','Le roi de France']},
        {q:'Saladin reprend Jérusalem en ?',a:'1187',o:['1187','1099','1204']}
      ]
    },
    6:{
      heroName:'Android 18',
      heroQuote:'La Peste noire tue un tiers de l\'Europe. Une catastrophe que même les Cyborgs ne pourraient pas arrêter !',
      rule:'La Peste noire (1347-1351) tue 30 à 50% des Européens. La Grande Famine (1315-1322) précède. La Jacquerie (1358) = révolte paysanne. Le Grand Schisme d\'Occident (1378-1417).',
      sections:[
        {icon:'💀',title:'La Peste noire',color:'#ec4899',
         content:'1347 : la Peste noire arrive en Europe par la Sicile. Transmise par les puces de rats noirs des navires, elle tue entre 25 et 50 millions de personnes.',
         examples:['1347-1351 = Peste noire en Europe','Transmission = puces des rats noirs','Flagellants = se fouettent pour expier les péchés']},
        {icon:'⚔️',title:'La crise du XIVème siècle',color:'#6366f1',
         content:'La Grande Famine (1315-1322) précède la peste. La Jacquerie (1358) : révolte des paysans normands. Le Grand Schisme d\'Occident (1378-1417) : deux papes à la fois.',
         examples:['Jacquerie 1358 = révolte paysanne en France','Grand Schisme 1378-1417 = deux papes (Rome et Avignon)','Philippe IV le Bel = installe le pape à Avignon (1309)']}
      ],
      heroTip:'Android 18 dit : "1347 = Peste. 1358 = Jacquerie. 1378 = Grand Schisme. Le XIVème siècle = siècle de crise. Comme une série de catastrophes dans un anime !"',
      warmup:[
        {q:'La Peste noire arrive en Europe en ?',a:'1347',o:['1347','1337','1300']},
        {q:'La Jacquerie (1358) est ?',a:'Une révolte de paysans français contre la noblesse',o:['Une révolte de paysans français contre la noblesse','Une croisade','Une épidémie']}
      ]
    },
    7:{
      heroName:'Krilin',
      heroQuote:'Jeanne d\'Arc, une fille du peuple qui sauve la France. Même moi je suis impressionné !',
      rule:'La Guerre de Cent Ans (1337-1453) oppose France et Angleterre. Jeanne d\'Arc (1429) lève le siège d\'Orléans et fait sacrer Charles VII à Reims.',
      sections:[
        {icon:'⚔️',title:'La Guerre de Cent Ans',color:'#f59e0b',
         content:'1337-1453 : la France et l\'Angleterre s\'affrontent pour le trône de France. Azincourt (1415) = défaite française. Traité de Troyes (1420) = Henri V héritier de France.',
         examples:['Cause = Édouard III revendique le trône de France','Azincourt 1415 = défaite des chevaliers français','Traité de Troyes 1420 = Henri V héritier de France']},
        {icon:'🌟',title:'Jeanne d\'Arc',color:'#ef4444',
         content:'Jeanne (1412-1431) entend des voix. Elle lève le siège d\'Orléans (1429) et conduit Charles VII au sacre de Reims. Capturée, elle est brûlée à Rouen le 30 mai 1431.',
         examples:['1429 = Jeanne lève le siège d\'Orléans','1429 = sacre de Charles VII à Reims','1431 = Jeanne brûlée à Rouen (30 mai)']}
      ],
      heroTip:'Krilin dit : "1337 → début. 1415 → Azincourt. 1429 → Jeanne. 1453 → fin. La guerre dure 116 ans mais Jeanne change tout en 2 ans. Une héroïne hors du commun !"',
      warmup:[
        {q:'La Guerre de Cent Ans oppose ?',a:'La France et l\'Angleterre',o:['La France et l\'Angleterre','La France et l\'Espagne','La France et l\'Empire']},
        {q:'Jeanne d\'Arc est brûlée vive à ?',a:'Rouen (30 mai 1431)',o:['Rouen (30 mai 1431)','Paris','Reims']}
      ]
    },
    8:{
      heroName:'Goten',
      heroQuote:'1453 : chute de Constantinople. L\'imprimerie. Les découvertes. Le Moyen Âge s\'achève !',
      rule:'1453 : chute de Constantinople = fin du Moyen Âge. Gutenberg invente l\'imprimerie (~1450). Colomb atteint l\'Amérique (1492). La Reconquista s\'achève avec la prise de Grenade (1492).',
      sections:[
        {icon:'🗼',title:'La fin du Moyen Âge',color:'#ef4444',
         content:'1453 : les Ottomans de Mehmed II prennent Constantinople, fin de l\'Empire byzantin. C\'est la date conventionnelle de fin du Moyen Âge et de début des Temps Modernes.',
         examples:['1453 = chute de Constantinople (Ottomans)','1450 = imprimerie de Gutenberg','1492 = Colomb + fin Reconquista + expulsion des Juifs d\'Espagne']},
        {icon:'🌍',title:'Les grandes inventions et découvertes',color:'#22c55e',
         content:'L\'imprimerie de Gutenberg (~1450) révolutionne la diffusion du savoir. La boussole, l\'astrolabe et la caravelle permettent les explorations maritimes.',
         examples:['Imprimerie = révolution de la connaissance','Caravelle = navire d\'exploration','1492 = Colomb découvre les Amériques']}
      ],
      heroTip:'Goten dit : "1453 = fin Moyen Âge. 1492 = 3 événements en 1 an (Colomb, Grenade, expulsion Juifs). Retiens 1453 et 1492 comme les deux bornes qui ferment le Moyen Âge !"',
      warmup:[
        {q:'Quelle date marque conventionnellement la fin du Moyen Âge ?',a:'1453 (chute de Constantinople)',o:['1453 (chute de Constantinople)','1492 (Colomb)','1517 (Luther)']},
        {q:'Qui invente l\'imprimerie vers 1450 ?',a:'Gutenberg',o:['Gutenberg','Léonard de Vinci','Colomb']}
      ]
    }
  }
};

// ══════════════════════════════════════════════════════════════════
// 4ÈME — Temps Modernes & Révolution
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['magnolia_4eme'] = {
  color:'#ef4444', bg:'#0a0000', textAccent:'#fca5a5',
  particles:'fire', worldName:'Magnolia',
  lessons:{
    1:{
      heroName:'Goku',
      heroQuote:'La Renaissance réveille l\'Europe ! Comme quand je me réveille en Super Saiyan !',
      rule:'La Renaissance (XVème-XVIème s.) = retour à l\'Antiquité + humanisme. Elle naît en Italie. Léonard de Vinci, Michel-Ange, Raphaël sont ses grandes figures.',
      sections:[
        {icon:'🎨',title:'La Renaissance artistique',color:'#f97316',
         content:'La Renaissance naît à Florence au XVème s. Les Médicis financent les artistes. La perspective donne l\'illusion de profondeur. Léonard peint la Joconde.',
         examples:['Joconde = Léonard de Vinci','Chapelle Sixtine = Michel-Ange','École d\'Athènes = Raphaël (au Vatican)']},
        {icon:'🔭',title:'L\'humanisme et la révolution scientifique',color:'#8b5cf6',
         content:'L\'humanisme place l\'homme au centre. Copernic (1543) : la Terre tourne autour du Soleil (héliocentrisme). Galilée confirme mais est condamné par l\'Inquisition.',
         examples:['Humanisme = l\'homme au centre de la pensée','Copernic 1543 = héliocentrisme','Galilée = condamné par l\'Inquisition (1633)']}
      ],
      heroTip:'Goku dit : "Renaissance = re + naissance. L\'Antiquité renaît. Retiens les 3 artistes par leurs œuvres : Léonard = Joconde. Michel-Ange = Sixtine. Raphaël = École d\'Athènes !"',
      warmup:[
        {q:'Où naît la Renaissance ?',a:'En Italie (Florence)',o:['En Italie (Florence)','En France','En Espagne']},
        {q:'L\'héliocentrisme de Copernic affirme que ?',a:'La Terre tourne autour du Soleil',o:['La Terre tourne autour du Soleil','Le Soleil tourne autour de la Terre','La Lune est une planète']}
      ]
    },
    2:{
      heroName:'Bulma',
      heroQuote:'Christophe Colomb atteint l\'Amérique en 1492. Mon Radar Dragon est plus précis !',
      rule:'1492 : Colomb atteint les Amériques. Vasco de Gama ouvre la route des Indes (1498). Magellan fait le tour du monde (1519-1522). La traite atlantique déporte des millions d\'Africains.',
      sections:[
        {icon:'🌍',title:'Les Grandes Découvertes',color:'#22c55e',
         content:'Colomb (Espagne, 1492), Vasco de Gama (Portugal, 1498), Magellan (1519-1522). La boussole, l\'astrolabe et la caravelle permettent ces explorations.',
         examples:['1492 = Colomb → Bahamas (Amériques)','1498 = Vasco de Gama → Inde (cap de Bonne-Espérance)','1519-1522 = Magellan = 1er tour du monde']},
        {icon:'⚠️',title:'Conquêtes et traite',color:'#ef4444',
         content:'Cortés conquiert les Aztèques (1521), Pizarro les Incas (1533). La traite atlantique déporte des millions d\'Africains vers les Amériques. Las Casas défend les indigènes.',
         examples:['Cortés 1521 = conquête de l\'Empire aztèque (Mexique)','Pizarro 1533 = conquête de l\'Empire inca (Pérou)','Las Casas = défenseur des droits des indigènes']}
      ],
      heroTip:'Bulma dit : "CO-lomb = 1492. VAS-co = 1498. MA-gellan = 1519. Les initiales C-V-M forment un ordre chronologique. Colomb, Vasco, Magellan !"',
      warmup:[
        {q:'Qui finance l\'expédition de Christophe Colomb ?',a:'L\'Espagne',o:['L\'Espagne','Le Portugal','La France']},
        {q:'Vasco de Gama ouvre la route des Indes en contournant ?',a:'Le cap de Bonne-Espérance',o:['Le cap de Bonne-Espérance','L\'Amérique du Sud','La péninsule arabique']}
      ]
    },
    3:{
      heroName:'Gohan',
      heroQuote:'Luther remet en question l\'autorité de l\'Église. Comme moi qui dépasse mon père !',
      rule:'1517 : Luther affiche ses 95 thèses. La sola fide (foi seule) et sola scriptura (Bible seule) sont les principes protestants. Calvin fonde le calvinisme à Genève.',
      sections:[
        {icon:'📜',title:'La Réforme protestante',color:'#a855f7',
         content:'1517 : Luther affiche ses 95 thèses à Wittenberg contre les indulgences. Il traduit la Bible en allemand. En France, les huguenots sont protestants.',
         examples:['1517 = Luther et ses 95 thèses (Wittenberg)','Sola fide = la foi seule sauve','Sola scriptura = la Bible seule fait autorité']},
        {icon:'⚔️',title:'Guerres de religion et Contre-Réforme',color:'#ef4444',
         content:'Les guerres de religion (1562-1598) déchirent la France. La nuit de la Saint-Barthélemy (1572). L\'Édit de Nantes (1598) accorde la liberté de culte aux protestants.',
         examples:['Saint-Barthélemy 1572 = massacre de protestants à Paris','Édit de Nantes 1598 = tolérance protestante','Concile de Trente (1545-1563) = Contre-Réforme catholique']}
      ],
      heroTip:'Gohan dit : "Luther 1517 → Genève Calvin → Guerres de Religion → Saint-Barthélemy 1572 → Édit de Nantes 1598. Un siècle de conflits résumé en 5 étapes !"',
      warmup:[
        {q:'Quand Luther affiche-t-il ses 95 thèses ?',a:'1517',o:['1517','1534','1598']},
        {q:'L\'Édit de Nantes (1598) signé par Henri IV ?',a:'Accorde la liberté de culte aux protestants',o:['Accorde la liberté de culte aux protestants','Interdit le protestantisme','Crée un état protestant']}
      ]
    },
    4:{
      heroName:'Vegeta',
      heroQuote:'L\'État c\'est moi ! Louis XIV — la seule phrase qui rivalise avec ma fierté de Saiyan !',
      rule:'Louis XIV = le Roi Soleil. Règne de 72 ans (1643-1715). Versailles = symbole de l\'absolutisme. "L\'État c\'est moi." Révocation de l\'Édit de Nantes (1685).',
      sections:[
        {icon:'👑',title:'L\'absolutisme de Louis XIV',color:'#eab308',
         content:'Louis XIV concentre tous les pouvoirs. Versailles (construit à partir de 1661) éblouit l\'Europe et domestique la noblesse. Colbert développe l\'économie (mercantilisme).',
         examples:['Versailles = symbole du pouvoir absolu','Colbert = mercantilisme et manufactures royales','Révocation de l\'Édit de Nantes 1685 = exode des protestants']},
        {icon:'⚖️',title:'Le droit divin et les limites',color:'#6366f1',
         content:'Bossuet théorise le droit divin : le roi tient son pouvoir de Dieu. La Fronde (1648-1653) = révolte des nobles. Louis XIV l\'écrase et renforce son pouvoir absolu.',
         examples:['Droit divin = le roi rend compte à Dieu seul','La Fronde 1648-1653 = révolte des nobles et parlements','Louis XIV règne 72 ans : record absolu !']}
      ],
      heroTip:'Vegeta dit : "Louis XIV = 1638 (naissance) → 1643 (roi à 5 ans) → 1661 (début du vrai règne) → 1685 (révocation Nantes) → 1715 (mort). 72 ans de règne !"',
      warmup:[
        {q:'Combien d\'années Louis XIV règne-t-il ?',a:'72 ans',o:['72 ans','47 ans','60 ans']},
        {q:'La révocation de l\'Édit de Nantes (1685) entraîne ?',a:'L\'exode de 200 000 protestants hors de France',o:['L\'exode de 200 000 protestants hors de France','La paix religieuse','Une guerre civile']}
      ]
    },
    5:{
      heroName:'Trunks',
      heroQuote:'Voltaire, Rousseau, Montesquieu — les philosophes des Lumières éclairent tout comme moi avec mon épée !',
      rule:'Les Lumières (XVIIIème s.) : raison, liberté, tolérance. Montesquieu = séparation des pouvoirs. Rousseau = contrat social. Voltaire = tolérance. Encyclopédie = Diderot.',
      sections:[
        {icon:'💡',title:'Les philosophes des Lumières',color:'#3b82f6',
         content:'Montesquieu (De l\'esprit des lois) : 3 pouvoirs séparés. Rousseau (Contrat social) : souveraineté du peuple. Voltaire : tolérance et raison contre le fanatisme.',
         examples:['Montesquieu = séparation des pouvoirs (législatif, exécutif, judiciaire)','Rousseau = contrat social et souveraineté du peuple','Voltaire = tolérance, raison, anti-fanatisme']},
        {icon:'📚',title:'L\'Encyclopédie et l\'influence',color:'#22c55e',
         content:'L\'Encyclopédie de Diderot (28 volumes) diffuse les savoirs. Les Lumières inspirent la Déclaration d\'indépendance américaine (1776) et la Révolution française (1789).',
         examples:['Encyclopédie = 28 volumes, Diderot et d\'Alembert','1776 = Déclaration d\'indépendance américaine','Kant = "Sapere aude" (ose penser par toi-même)']}
      ],
      heroTip:'Trunks dit : "Séparation des pouvoirs = MON-tesquieu → 3 pouvoirs. ROU-sseau → peuple souverain. VOL-taire → tolérance. M-R-V = les 3 piliers des Lumières !"',
      warmup:[
        {q:'Montesquieu est célèbre pour ?',a:'La théorie de la séparation des pouvoirs',o:['La théorie de la séparation des pouvoirs','Le contrat social','L\'Encyclopédie']},
        {q:'L\'Encyclopédie de Diderot sert à ?',a:'Diffuser les savoirs et les idées nouvelles',o:['Diffuser les savoirs et les idées nouvelles','Critiquer la religion','Défendre la monarchie']}
      ]
    },
    6:{
      heroName:'Piccolo',
      heroQuote:'La prise de la Bastille ! La Révolution, c\'est comme un Kaméhaméha contre l\'injustice !',
      rule:'14 juillet 1789 : prise de la Bastille. 26 août 1789 : DDHC. Louis XVI guillotiné le 21 janvier 1793. La Terreur (1793-1794). Robespierre guillotiné le 9 Thermidor.',
      sections:[
        {icon:'⚡',title:'1789 : L\'an I de la Révolution',color:'#ef4444',
         content:'14 juillet 1789 = prise de la Bastille. 4 août = nuit des nobles renonçant aux privilèges. 26 août = DDHC : "Les hommes naissent libres et égaux en droits."',
         examples:['Nuit du 4 août 1789 = abolition des privilèges féodaux','DDHC article 1 = "Les hommes naissent et demeurent libres et égaux"','Trois ordres de l\'Ancien Régime : Clergé, Noblesse, Tiers État']},
        {icon:'⚖️',title:'La Terreur et le Directoire',color:'#6366f1',
         content:'Louis XVI est guillotiné le 21 janvier 1793. La Terreur (1793-94) : Robespierre envoie 40 000 personnes à la guillotine. Le 9 Thermidor = chute de Robespierre.',
         examples:['21 janvier 1793 = Louis XVI guillotiné','9 Thermidor (27 juillet 1794) = fin de la Terreur','Directoire 1795-1799 = 5 directeurs instables']}
      ],
      heroTip:'Piccolo dit : "Les dates clés de 1789 : 14 juillet (Bastille), 4 août (privilèges), 26 août (DDHC). Retiens 14-4-26 comme trois coups de tonnerre en 6 semaines !"',
      warmup:[
        {q:'La DDHC est adoptée le ?',a:'26 août 1789',o:['26 août 1789','14 juillet 1789','4 août 1789']},
        {q:'Louis XVI est guillotiné le ?',a:'21 janvier 1793',o:['21 janvier 1793','9 Thermidor 1794','14 juillet 1789']}
      ]
    },
    7:{
      heroName:'Android 17',
      heroQuote:'Napoléon conquiert l\'Europe. Un homme seul qui change tout. Je comprends ça !',
      rule:'Napoléon Bonaparte, 1er Consul puis Empereur (2 déc. 1804). Code civil (1804). Bataille d\'Austerlitz (1805). Campagne de Russie (1812). Waterloo (1815). Exil à Sainte-Hélène.',
      sections:[
        {icon:'👑',title:'L\'Empire napoléonien',color:'#f59e0b',
         content:'Napoléon se couronne Empereur le 2 décembre 1804. Il gagne Austerlitz (1805) mais perd en Russie (1812) et à Waterloo (1815). Exilé à Sainte-Hélène, il meurt en 1821.',
         examples:['2 décembre 1804 = couronnement à Notre-Dame','Austerlitz 1805 = plus grande victoire de Napoléon','Waterloo 18 juin 1815 = défaite définitive']},
        {icon:'📜',title:'L\'héritage napoléonien',color:'#22c55e',
         content:'Le Code civil (1804) unifie le droit français. La Légion d\'honneur (1802) récompense le mérite. Le Concordat (1801) règle les relations avec l\'Église.',
         examples:['Code civil 1804 = droit unifié, encore en vigueur','Légion d\'honneur 1802 = basée sur le mérite','Cent-Jours = retour de l\'Elbe jusqu\'à Waterloo']}
      ],
      heroTip:'Android 17 dit : "1804 = Code civil + couronnement. 1805 = Austerlitz. 1812 = Russie (désastre). 1815 = Waterloo. Ces 4 dates résument la gloire et la chute de Napoléon !"',
      warmup:[
        {q:'Napoléon est couronné Empereur le ?',a:'2 décembre 1804',o:['2 décembre 1804','18 juin 1815','9 novembre 1799']},
        {q:'Napoléon est exilé définitivement à ?',a:'Sainte-Hélène',o:['Sainte-Hélène','L\'île d\'Elbe','La Corse']}
      ]
    },
    8:{
      heroName:'Krilin',
      heroQuote:'Bilan 4ème : Renaissance → Réforme → Révolution. Les 3 R qui changent l\'Europe !',
      rule:'Les Temps Modernes (1453-1789) : Renaissance, Grandes Découvertes, Réforme, Absolutisme, Lumières, Révolution. 1492 = date charnière. La Révolution pose les bases de la démocratie moderne.',
      sections:[
        {icon:'📅',title:'La chronologie des Temps Modernes',color:'#06b6d4',
         content:'1453 = fin Moyen Âge. 1492 = Colomb + fin Reconquista. 1517 = Luther. 1598 = Édit de Nantes. 1661 = Louis XIV au pouvoir. 1789 = Révolution française.',
         examples:['1492 = triple événement clé (Colomb, Grenade, Juifs expulsés)','1517 → 1598 = siècle de Réforme et guerres de religion','1661 → 1789 = siècle de l\'Absolutisme et des Lumières']},
        {icon:'🌍',title:'Les grandes transformations',color:'#ef4444',
         content:'Les Temps Modernes = naissance de l\'Europe moderne. La DDHC (1789) inspire encore les démocraties. La Révolution industrielle va transformer le XIXème siècle.',
         examples:['DDHC = "Liberté, Égalité, Fraternité" — devise de la République','Traité de Westphalie 1648 = naissance des États-nations','Code civil 1804 = héritage juridique encore actif']}
      ],
      heroTip:'Krilin dit : "Retiens 3 R de la 4ème : Renaissance (art et science), Réforme (religion), Révolution (politique). Trois révolutions qui construisent l\'Europe moderne. Simple !"',
      warmup:[
        {q:'La devise de la République française héritée de la Révolution est ?',a:'Liberté, Égalité, Fraternité',o:['Liberté, Égalité, Fraternité','Honneur et Patrie','Travail, Famille, Patrie']},
        {q:'Les Temps Modernes couvrent la période ?',a:'1453-1789',o:['1453-1789','1000-1453','1789-1914']}
      ]
    }
  }
};

// ══════════════════════════════════════════════════════════════════
// 3ÈME — Époque contemporaine & Brevet
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['magnolia_3eme'] = {
  color:'#3b82f6', bg:'#00050a', textAccent:'#93c5fd',
  particles:'water', worldName:'Magnolia',
  lessons:{
    1:{
      heroName:'Goku',
      heroQuote:'La machine à vapeur change tout ! Comme ma première transformation en Super Saiyan !',
      rule:'La Révolution industrielle commence en Angleterre (1760-1780). Machine à vapeur (Watt), chemin de fer, usines. Le prolétariat = classe ouvrière. Marx et Engels publient le Manifeste (1848).',
      sections:[
        {icon:'🏭',title:'La Révolution industrielle',color:'#f97316',
         content:'Angleterre, 1760-1780 : la machine à vapeur de Watt révolutionne la production. Usines, mines de charbon, chemins de fer transforment l\'économie et la société.',
         examples:['James Watt = machine à vapeur (1769)','Prolétariat = ouvriers qui vendent leur force de travail','Taylorisme = organisation scientifique du travail']},
        {icon:'⚡',title:'Mouvements sociaux',color:'#22c55e',
         content:'Marx et Engels publient le Manifeste communiste (1848). La Commune de Paris (1871) = 1ère expérience ouvrière. La loi de 1884 légalise les syndicats en France.',
         examples:['Manifeste communiste 1848 = Marx et Engels','Commune de Paris 1871 = gouvernement révolutionnaire de 72 jours','Loi 1884 = légalisation des syndicats en France']}
      ],
      heroTip:'Goku dit : "La IIIème République française est fondée en 1875. Belle Époque = 1890-1914. Émile Zola = Germinal (condition des mineurs). Retiens ces repères du XIXème siècle !"',
      warmup:[
        {q:'La Révolution industrielle commence d\'abord en ?',a:'Angleterre',o:['Angleterre','France','Allemagne']},
        {q:'Karl Marx publie le Manifeste communiste en ?',a:'1848',o:['1848','1871','1884']}
      ]
    },
    2:{
      heroName:'Vegeta',
      heroQuote:'L\'Europe colonise l\'Afrique et l\'Asie. Moi, je domine les planètes. Même idée !',
      rule:'La conférence de Berlin (1884-1885) partage l\'Afrique entre les puissances européennes. Jules Ferry développe l\'empire colonial français. Résistances : Abdelkader, Samori Touré.',
      sections:[
        {icon:'🌍',title:'L\'impérialisme colonial',color:'#22c55e',
         content:'À la fin du XIXème s., l\'Europe colonise l\'Afrique et l\'Asie. Justifications : marchés, matières premières, "mission civilisatrice". La conférence de Berlin (1884) partage l\'Afrique.',
         examples:['Conférence de Berlin 1884-1885 = partage de l\'Afrique','Jules Ferry = ministre de la colonisation française','Léopold II = Congo belge exploité brutalement']},
        {icon:'✊',title:'Les résistances',color:'#ef4444',
         content:'Abdelkader résiste en Algérie. Samori Touré en Afrique de l\'Ouest. Le Japon (ère Meiji) se modernise pour résister. La Chine est affaiblie par les Guerres de l\'opium.',
         examples:['Abdelkader = résistance en Algérie','Samori Touré = résistance en Afrique de l\'Ouest','Ère Meiji 1868-1912 = modernisation du Japon']}
      ],
      heroTip:'Vegeta dit : "Colonisation = 3 motivations. Économique (matières premières). Politique (puissance). Idéologique (mission civilisatrice). Ces 3 raisons justifient l\'injustifiable !"',
      warmup:[
        {q:'La conférence de Berlin (1884-1885) ?',a:'Partage l\'Afrique entre les puissances européennes',o:['Partage l\'Afrique entre les puissances européennes','Crée l\'Union européenne','Met fin aux guerres coloniales']},
        {q:'Jules Ferry est célèbre pour ?',a:'La colonisation et les lois scolaires laïques',o:['La colonisation et les lois scolaires laïques','La Commune de Paris','La Révolution industrielle']}
      ]
    },
    3:{
      heroName:'Gohan',
      heroQuote:'28 juin 1914 : l\'assassinat de François-Ferdinand déclenche la Grande Guerre. 18 millions de morts !',
      rule:'28 juin 1914 : attentat de Sarajevo. WWI (1914-1918) : Alliés vs Empires centraux. Verdun = 300 000 morts. 11 novembre 1918 = armistice. Traité de Versailles (1919).',
      sections:[
        {icon:'💣',title:'La Grande Guerre',color:'#ef4444',
         content:'28 juin 1914 : assassinat de François-Ferdinand à Sarajevo. La guerre des tranchées (no man\'s land). Verdun (1916) : 300 000 morts en 10 mois pour un résultat nul.',
         examples:['28 juin 1914 = attentat de Sarajevo','Verdun 1916 = 300 000 morts (symbole de l\'horreur)','11 novembre 1918 = armistice à 11h dans un wagon']},
        {icon:'📜',title:'Bilan et conséquences',color:'#6366f1',
         content:'18-20 millions de morts. Le traité de Versailles (1919) humilie l\'Allemagne : réparations, article 231 (clause de responsabilité). La SDN est créée. La Révolution russe (1917).',
         examples:['18-20 millions de morts (soldats + civils)','Traité de Versailles 1919 = humiliation de l\'Allemagne','SDN = ancêtre de l\'ONU (créée 1919)']}
      ],
      heroTip:'Gohan dit : "Juillet 1914 → guerre. Verdun 1916 → horreur. USA 1917 → entrent. 11/11/1918 → armistice. Versailles 1919 → traité. Cinq étapes, cinq dates à mémoriser !"',
      warmup:[
        {q:'L\'attentat déclencheur de la WWI a lieu à Sarajevo le ?',a:'28 juin 1914',o:['28 juin 1914','4 août 1914','11 novembre 1918']},
        {q:'La bataille de Verdun (1916) fait combien de morts ?',a:'300 000 morts en 10 mois',o:['300 000 morts en 10 mois','18 millions de morts','50 000 morts']}
      ]
    },
    4:{
      heroName:'Piccolo',
      heroQuote:'Fascisme, nazisme, stalinisme. Les totalitarismes sont comme les ennemis les plus dangereux — ils semblent forts mais détruisent tout.',
      rule:'Les totalitarismes : fascisme (Mussolini 1922), nazisme (Hitler 1933), stalinisme (URSS). Krach boursier 1929 = Grande Dépression. Hitler chancelier le 30 janvier 1933.',
      sections:[
        {icon:'⚠️',title:'La montée des totalitarismes',color:'#6366f1',
         content:'Mussolini prend le pouvoir en 1922 (Marche sur Rome). Hitler est nommé chancelier le 30 janvier 1933. Staline instaure la Grande Terreur en URSS : Goulags, purges.',
         examples:['Mussolini 1922 = 1er régime fasciste (Italie)','Hitler 30 janvier 1933 = chancelier d\'Allemagne','Staline = Goulags, purges, collectivisation forcée']},
        {icon:'📺',title:'La propagande et la crise',color:'#ef4444',
         content:'Le krach boursier de 1929 = Grande Dépression mondiale. Les nazis utilisent le cinéma, la radio et les rassemblements de masse. Lois de Nuremberg (1935) = antisémitisme légal.',
         examples:['1929 = krach de Wall Street → chômage massif','Lois de Nuremberg 1935 = exclusion légale des Juifs','Nuit de Cristal 1938 = pogrom antisémite organisé']}
      ],
      heroTip:'Piccolo dit : "Totalitarisme = TOUT contrôler. Un parti, un chef, un programme, une idéologie. Mussolini 1922, Hitler 1933, Staline 1924. Retiens ces 3 dates noires !"',
      warmup:[
        {q:'Hitler arrive au pouvoir en Allemagne en ?',a:'1933',o:['1933','1929','1922']},
        {q:'Le krach boursier de 1929 provoque ?',a:'La Grande Dépression mondiale avec chômage massif',o:['La Grande Dépression mondiale avec chômage massif','La WWI','La montée du nazisme uniquement']}
      ]
    },
    5:{
      heroName:'Trunks',
      heroQuote:'La Shoah = 6 millions de victimes. Je protège le futur pour que ça ne recommence jamais !',
      rule:'WWII (1939-1945). La Shoah = génocide de 6 millions de Juifs. D-Day = 6 juin 1944. Hiroshima et Nagasaki = bombes atomiques (6 et 9 août 1945). Procès de Nuremberg.',
      sections:[
        {icon:'💀',title:'La Shoah',color:'#8b5cf6',
         content:'La conférence de Wannsee (1942) planifie la "solution finale". 6 millions de Juifs sont exterminés dans des camps. Auschwitz est le plus grand camp d\'extermination.',
         examples:['Wannsee 1942 = planification de la Shoah','Auschwitz = principal camp d\'extermination','Nuremberg 1945-46 = procès des dirigeants nazis']},
        {icon:'🌍',title:'Les grandes batailles et la Résistance',color:'#22c55e',
         content:'Stalingrad (1942-43) = tournant. 6 juin 1944 = Débarquement en Normandie. Jean Moulin unifie la Résistance française. Le régime de Vichy collabore avec les Nazis.',
         examples:['Stalingrad 1942-43 = 1ère grande défaite allemande','D-Day 6 juin 1944 = 156 000 soldats alliés en Normandie','Vichy = collaboration avec l\'Allemagne nazie']}
      ],
      heroTip:'Trunks dit : "WWII = 50-70 millions de morts (3x WWI). Dates clés : 1939 (début), 1941 (USA entrent), 1942 (tournant Stalingrad), 1944 (D-Day), 1945 (fin). Cinq jalons !"',
      warmup:[
        {q:'Le débarquement en Normandie (D-Day) a lieu le ?',a:'6 juin 1944',o:['6 juin 1944','6 juin 1943','8 mai 1945']},
        {q:'La Shoah est le génocide systématique de ?',a:'6 millions de Juifs par les nazis',o:['6 millions de Juifs par les nazis','Les Arméniens','Les Roms uniquement']}
      ]
    },
    6:{
      heroName:'Android 18',
      heroQuote:'Guerre froide = 1947-1991. USA vs URSS. Même moi je dois choisir mon camp !',
      rule:'Guerre froide (1947-1991) : USA (capitalisme) vs URSS (communisme). Plan Marshall, Rideau de fer, Mur de Berlin (1961-1989). Crise de Cuba (1962). Gorbatchev et la chute de l\'URSS (1991).',
      sections:[
        {icon:'⚡',title:'La Guerre froide',color:'#ec4899',
         content:'1947 : doctrine Truman (endiguement du communisme). Plan Marshall = aide américaine à l\'Europe. Rideau de fer. Course aux armements et à l\'espace (Spoutnik 1957, Apollo 1969).',
         examples:['Plan Marshall 1947 = aide économique américaine à l\'Europe','Mur de Berlin 1961-1989 = symbole de la division du monde','Crise de Cuba 1962 = 13 jours au bord de la guerre nucléaire']},
        {icon:'🌍',title:'La fin de la Guerre froide',color:'#3b82f6',
         content:'Gorbatchev : Glasnost (transparence) + Perestroïka (restructuration). Le Mur de Berlin tombe le 9 novembre 1989. Réunification allemande (3 oct. 1990). L\'URSS se dissout le 25 déc. 1991.',
         examples:['9 novembre 1989 = chute du Mur de Berlin','3 octobre 1990 = réunification allemande','25 décembre 1991 = dissolution de l\'URSS']}
      ],
      heroTip:'Android 18 dit : "1947 = début. 1961 = Mur. 1962 = Cuba. 1989 = Mur tombe. 1991 = URSS disparaît. Ces 5 dates ponctuent 44 ans de Guerre froide. Mémorise-les !"',
      warmup:[
        {q:'Le Mur de Berlin est construit en ?',a:'1961',o:['1961','1947','1953']},
        {q:'La crise de Cuba (1962) est ?',a:'La crise la plus dangereuse de la Guerre froide',o:['La crise la plus dangereuse de la Guerre froide','Une invasion de Cuba','Une révolution']}
      ]
    },
    7:{
      heroName:'Bulma',
      heroQuote:'L\'Inde indépendante en 1947. L\'Algérie en 1962. La Ve République en 1958. Le monde se transforme !',
      rule:'Décolonisation : Inde 1947 (Gandhi), Algérie 1954-1962 (accords d\'Évian). Ve République fondée par de Gaulle en 1958. Apartheid en Afrique du Sud (Mandela).',
      sections:[
        {icon:'🌍',title:'La décolonisation',color:'#f59e0b',
         content:'1947 = indépendance de l\'Inde (Gandhi, non-violence). La guerre d\'Algérie (1954-1962) se termine par les accords d\'Évian. En 1960, 17 pays africains deviennent indépendants.',
         examples:['Gandhi = non-violence et désobéissance civile','Accords d\'Évian 19 mars 1962 = indépendance algérienne','1960 = "Année de l\'Afrique" : 17 indépendances']},
        {icon:'🇫🇷',title:'La Ve République',color:'#3b82f6',
         content:'1958 : de Gaulle fonde la Ve République avec une nouvelle Constitution. Mai 68 = révolte étudiante et ouvrière. Nelson Mandela lutte contre l\'apartheid (élu président en 1994).',
         examples:['1958 = Constitution de la Ve République','Mai 68 = 10 millions de grévistes en France','Mandela 1994 = 1er président noir d\'Afrique du Sud']}
      ],
      heroTip:'Bulma dit : "Trois grandes figures de la décolonisation : Gandhi (Inde, 1947), Ho Chi Minh (Vietnam), Mandela (Afrique du Sud). Trois continents, trois résistances, trois victoires !"',
      warmup:[
        {q:'L\'Inde obtient son indépendance en ?',a:'1947',o:['1947','1954','1962']},
        {q:'La Ve République est fondée en ?',a:'1958',o:['1958','1944','1946']}
      ]
    },
    8:{
      heroName:'Goten',
      heroQuote:'Brevet bilan ! L\'ONU, l\'euro, le 11 septembre, l\'accord de Paris… Goten est prêt !',
      rule:'ONU fondée en 1945. DUDH en 1948. Construction européenne : CECA (1951), CEE (1957), UE (1992, Maastricht). Attentats du 11 sept. 2001. Accord de Paris sur le climat (2015).',
      sections:[
        {icon:'🌍',title:'Le monde contemporain',color:'#06b6d4',
         content:'1945 = création de l\'ONU. 1948 = DUDH. 1957 = Traité de Rome (CEE). 1992 = Maastricht (UE + euro). 2001 = attentats du 11 septembre → guerre contre le terrorisme.',
         examples:['ONU 1945 = maintenir la paix internationale','DUDH 10 décembre 1948 = droits universels de l\'Homme','Maastricht 1992 = Union européenne + préparation de l\'euro']},
        {icon:'🇪🇺',title:'La construction européenne',color:'#3b82f6',
         content:'CECA (1951) = charbon + acier. CEE (1957) = marché commun. L\'euro entre en circulation le 1er janvier 2002. Accord de Paris (2015) : limiter le réchauffement à 1,5-2°C.',
         examples:['Euro en circulation depuis le 1er janvier 2002','Accord de Paris 2015 = lutte contre le réchauffement climatique','11 septembre 2001 = attentats → invasion Afghanistan (2001) et Irak (2003)']}
      ],
      heroTip:'Goten dit : "Brevet = connaître le XXème siècle complet. De 1914 (WWI) à 2001 (11 sept.), c\'est un siècle de bouleversements. Mais aussi de progrès : ONU, droits de l\'Homme, Europe !"',
      warmup:[
        {q:'L\'ONU est fondée en ?',a:'1945',o:['1945','1919','1948']},
        {q:'Le traité de Maastricht (1992) crée ?',a:'L\'Union européenne et prépare l\'euro',o:['L\'Union européenne et prépare l\'euro','La CEE','L\'OTAN']}
      ]
    }
  }
};


console.info('🐉 lesson-data-magnolia.js — 40 leçons Histoire × Dragon Ball Z chargées (LESSON_REGISTRY V2)');
