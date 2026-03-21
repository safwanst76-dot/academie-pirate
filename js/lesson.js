// ═══════════════════════════════════════════════════════════════════════
// LESSON.JS — Académie Pirate
// Page Leçon : Héros animé (30s) + Contenu pédagogique coloré
// Lancée AVANT le quiz depuis startIsland() de chaque monde
// Règle ND-03 : overlay isolé z-index:8500, propre show/hide
// ═══════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// 1. DONNÉES PÉDAGOGIQUES — 4 MONDES × 8 ÎLES
// ══════════════════════════════════════════════════════════════

var LESSON_DATA = {

  // ─── GRAND BLEU — Français (One Piece) ───────────────────────
  grandbleu: {
    color: '#e63946', bg: '#0a0510', textAccent: '#f4c95d',
    particles: 'water', worldName: 'Grand Bleu',
    avatar: function(n){
      var SUPABASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/grand-bleu';
      var map = {1:'nami',2:'luffy',3:'robin',4:'zoro',5:'nami',6:'luffy',7:'robin',8:'zoro'};
      return SUPABASE + '/characters/' + (map[n]||'luffy') + '.jpg';
    },
    lessons: {
      1: {
        heroName:'Nami', heroQuote:'Je navigue avec les étoiles — toi tu navigues avec les règles de grammaire !',
        rule:'L\'infinitif répond à "quoi ?" · Le participe passé s\'accorde avec le sujet (avec ÊTRE) ou le COD placé avant (avec AVOIR)',
        sections:[
          {icon:'⚓',title:'L\'infinitif', color:'#e63946',
           content:'L\'infinitif est la forme de base du verbe. Il se termine par <strong>-er, -ir, -re, -oir</strong>.',
           examples:['Luffy veut <strong>manger</strong> (manger = infinitif)','Je vais <strong>partir</strong> en mer','Il faut <strong>lire</strong> la carte']},
          {icon:'🗺️',title:'Le participe passé', color:'#f4c95d',
           content:'Le participe passé s\'utilise avec un auxiliaire (avoir ou être). Avec ÊTRE, il s\'accorde en genre et nombre avec le <strong>sujet</strong>.',
           examples:['Nami est <strong>partie</strong> (partie = accord avec Nami, féminin)','Les pirates sont <strong>arrivés</strong>','Luffy a <strong>mangé</strong> (avec avoir → pas d\'accord)']},
          {icon:'💡',title:'L\'astuce de Nami', color:'#06d6a0',
           content:'Pour distinguer infinitif et participe passé, remplace par un verbe en <strong>-RE</strong> : si ça marche, c\'est l\'infinitif !',
           examples:['"Il va chanter" → "Il va prendre" ✅ → infinitif','Si tu peux dire "il a pris" → c\'est un participe passé']}
        ],
        heroTip:'Nami dit : "Si tu hésites entre -ER et -É, essaie de mettre VENDRE à la place. Ça marche → infinitif !"',
        warmup:[
          {q:'"Luffy veut man___ !" Quelle terminaison ?',a:'manger',o:['mangé','manger','mangèr']},
          {q:'"Nami a mang___ !" Quelle terminaison ?',a:'mangé',o:['mangé','manger','mangi']}
        ]
      },
      2: {
        heroName:'Luffy', heroQuote:'Mon équipage s\'accorde TOUJOURS ensemble — comme le sujet et son verbe !',
        rule:'Le verbe s\'accorde TOUJOURS avec son sujet en personne et en nombre',
        sections:[
          {icon:'⚓',title:'Trouver le sujet', color:'#e63946',
           content:'Le sujet répond à la question <strong>"Qui est-ce qui ?" ou "Qu\'est-ce qui ?"</strong> avant le verbe.',
           examples:['"<strong>Luffy</strong> mange." → Qui est-ce qui mange ? Luffy → sujet','\"<strong>L\'équipage</strong> navigue\" → sujet = l\'équipage','\"<strong>Nami et Zoro</strong> combattent\" → sujet pluriel']},
          {icon:'🌊',title:'L\'accord du verbe', color:'#3b82f6',
           content:'Avec un sujet singulier → verbe singulier. Avec un sujet pluriel → verbe pluriel. Avec "je" → terminaison en <strong>-e, -s</strong>.',
           examples:['Je <strong>mange</strong> · Tu <strong>manges</strong> · Il <strong>mange</strong>','Nous <strong>mangeons</strong> · Vous <strong>mangez</strong> · Ils <strong>mangent</strong>','Luffy et Zoro <strong>combattent</strong> (pluriel → -ent)']},
          {icon:'⚠️',title:'Attention aux pièges !', color:'#f97316',
           content:'Quand le sujet est séparé du verbe par un groupe de mots, ne te trompe pas !',
           examples:['<strong>L\'équipage de pirates</strong> <em>navigue</em> → sujet = l\'équipage (singulier) !','<strong>Les enfants de l\'école</strong> <em>jouent</em> → sujet = les enfants (pluriel)']}
        ],
        heroTip:'Luffy dit : "Encadre le verbe avec NE... PAS — le mot qui reste devant, c\'est le sujet !"',
        warmup:[
          {q:'"Les pirates _____ sur le bateau." Quel verbe ?',a:'naviguent',o:['navigue','naviguent','naviguez']},
          {q:'"Luffy, accompagné de son équipage, _____ heureux."',a:'est',o:['est','sont','seront']}
        ]
      },
      3: {
        heroName:'Robin', heroQuote:'Les homophones sont comme des îles qui se ressemblent — mais elles ne sont pas pareilles !',
        rule:'Les homophones se prononcent pareil mais s\'écrivent différemment selon leur nature grammaticale',
        sections:[
          {icon:'📚',title:'a / à', color:'#e63946',
           content:'<strong>a</strong> = verbe avoir (on peut dire "avait") · <strong>à</strong> = préposition (indique le lieu, la direction)',
           examples:['"Luffy <strong>a</strong> faim" → avait faim ✅','\"Il va <strong>à</strong> l\'aventure\" → lieu/direction','\"Robin <strong>a</strong> lu <strong>à</strong> la bibliothèque\"']},
          {icon:'🌊',title:'est / et', color:'#3b82f6',
           content:'<strong>est</strong> = verbe être (on peut dire "était") · <strong>et</strong> = conjonction (relie deux éléments, = "et puis")',
           examples:['\"Zoro <strong>est</strong> fort\" → était fort ✅','"Nami <strong>et</strong> Robin naviguent" → et puis ✅','\"Il <strong>est</strong> courageux <strong>et</strong> généreux\"']},
          {icon:'💡',title:'son / sont · on / ont · ou / où', color:'#06d6a0',
           content:'<strong>son</strong> (possession) / <strong>sont</strong> (être, pluriel) · <strong>on</strong> (pronom) / <strong>ont</strong> (avoir, pluriel) · <strong>ou</strong> (choix) / <strong>où</strong> (lieu)',
           examples:['"<strong>Son</strong> bateau <strong>est</strong> grand" ≠ "Ils <strong>sont</strong> grands"','\"<strong>On</strong> part" vs "Ils <strong>ont</strong> la carte"','\"Tu viens <strong>ou</strong> tu restes ?" vs \"<strong>Où</strong> es-tu ?"']}
        ],
        heroTip:'Robin dit : "Pour a/à, essaie de remplacer par AVAIT. Pour est/et, essaie ÉTAIT."',
        warmup:[
          {q:'"Robin ___ lu le livre à la bibliothèque."',a:'a',o:['a','à','â']},
          {q:'"Luffy ___ son équipage partent en mer."',a:'et',o:['et','est','é']}
        ]
      },
      4: {
        heroName:'Zoro', heroQuote:'Je m\'entraîne avec trois épées — toi tu t\'entraînes avec les trois groupes de verbes !',
        rule:'Les verbes se classent en 3 groupes selon leur infinitif. Chaque groupe a ses propres terminaisons',
        sections:[
          {icon:'⚔️',title:'Groupe 1 — verbes en -ER', color:'#e63946',
           content:'Le plus grand groupe (90% des verbes). Infinitif en <strong>-ER</strong>. Présent : -e, -es, -e, -ons, -ez, -ent.',
           examples:['manger, parler, chanter, naviguer → groupe 1','Je <strong>mange</strong> · Tu <strong>manges</strong> · Il <strong>mange</strong>','Nous <strong>mangeons</strong> · Vous <strong>mangez</strong> · Ils <strong>mangent</strong>']},
          {icon:'🗡️',title:'Groupe 2 — verbes en -IR réguliers', color:'#8b5cf6',
           content:'Infinitif en <strong>-IR</strong> avec participe présent en <strong>-ISSANT</strong>.',
           examples:['finir → finissant → groupe 2','grandir, choisir, rougir, obéir, réussir','Je <strong>finis</strong> · Nous <strong>finissons</strong> · Ils <strong>finissent</strong>']},
          {icon:'🌀',title:'Groupe 3 — verbes irréguliers', color:'#f97316',
           content:'Tous les autres : aller, faire, venir, pouvoir, vouloir, voir... Leurs terminaisons varient — il faut les apprendre !',
           examples:['aller → je vais · tu vas · il va','faire → je fais · tu fais · il fait','vouloir → je veux · tu veux · il veut']}
        ],
        heroTip:'Zoro dit : "Groupe 1 = le plus facile. Groupe 3 = les 3 épées — il faut s\'entraîner !"',
        warmup:[
          {q:'Dans quel groupe est le verbe "choisir" ?',a:'Groupe 2',o:['Groupe 1','Groupe 2','Groupe 3']},
          {q:'Conjugue "finir" à la 1ère personne du pluriel',a:'finissons',o:['finissons','finons','finissez']}
        ]
      },
      5: {
        heroName:'Nami', heroQuote:'Complément direct ou indirect ? Je localise tout avec précision, comme sur une carte !',
        rule:'Le COD répond à "quoi ?" ou "qui ?" directement après le verbe · Le COI est introduit par une préposition (à, de...)',
        sections:[
          {icon:'🎯',title:'Le COD — Complément d\'Objet Direct', color:'#e63946',
           content:'Le COD complète le verbe <strong>sans préposition</strong>. Il répond à "Verbe + quoi ?" ou "Verbe + qui ?"',
           examples:['Nami dessine <strong>une carte</strong> → dessine quoi ? une carte = COD','Luffy aime <strong>la viande</strong> → aime quoi ? la viande = COD','Robin rencontre <strong>un géant</strong> → COD']},
          {icon:'🌊',title:'Le COI — Complément d\'Objet Indirect', color:'#3b82f6',
           content:'Le COI est relié au verbe par une préposition (à, de, pour...). Il répond à "Verbe à/de... qui ?/quoi ?"',
           examples:['Luffy parle <strong>à son équipage</strong> → parle à qui ? = COI','Nami rêve <strong>de l\'or</strong> → rêve de quoi ? = COI','Zoro s\'entraîne <strong>avec ses épées</strong> → COI']}
        ],
        heroTip:'Nami dit : "COD = réponse directe. COI = il faut une préposition pour y arriver !"',
        warmup:[
          {q:'"Luffy mange de la viande" — "de la viande" est :',a:'COD',o:['COD','COI','Sujet']},
          {q:'"Robin parle de son passé" — "de son passé" est :',a:'COI',o:['COD','COI','Attribut']}
        ]
      },
      6: {
        heroName:'Luffy', heroQuote:'Présent, passé, futur — comme mon voyage qui continue toujours !',
        rule:'Le temps du verbe indique QUAND se passe l\'action : présent / passé composé / imparfait / futur',
        sections:[
          {icon:'⏰',title:'Présent et Futur', color:'#e63946',
           content:'<strong>Présent</strong> = maintenant · <strong>Futur</strong> = demain, plus tard. Futur simple = infinitif + terminaisons (-rai, -ras, -ra, -rons, -rez, -ront)',
           examples:['Je <strong>mange</strong> (maintenant)','Je <strong>mangerai</strong> demain (futur)','Nous <strong>partirons</strong> en mer demain']},
          {icon:'📖',title:'Passé composé vs Imparfait', color:'#8b5cf6',
           content:'<strong>Passé composé</strong> = action terminée, ponctuelle · <strong>Imparfait</strong> = action qui dure, habitude dans le passé',
           examples:['Luffy <strong>a mangé</strong> (action finie, ponctuelle)','Luffy <strong>mangeait</strong> toujours beaucoup (habitude)','Il <strong>faisait</strong> beau quand nous <strong>sommes arrivés</strong>']}
        ],
        heroTip:'Luffy dit : "Passé composé = BOOM c\'est fini. Imparfait = ça durait, ça continuait !"',
        warmup:[
          {q:'"Chaque jour, il ___ (manger) avant l\'entraînement."',a:'mangeait',o:['mangeait','a mangé','mangera']},
          {q:'"Hier, Zoro ___ (gagner) son combat."',a:'a gagné',o:['gagnait','a gagné','gagnera']}
        ]
      },
      7: {
        heroName:'Robin', heroQuote:'Chaque mot a une nature — comme chaque île a son trésor unique !',
        rule:'La nature d\'un mot = ce qu\'il est (nom, verbe, adjectif...) · La fonction = son rôle dans la phrase',
        sections:[
          {icon:'📚',title:'Les classes de mots', color:'#e63946',
           content:'Nom (personne/chose), Verbe (action/état), Adjectif (qualité), Déterminant (devant le nom), Pronom (remplace nom), Adverbe (modifie verbe), Préposition (relie)',
           examples:['<strong>Luffy</strong> (nom) <strong>mange</strong> (verbe) <strong>une</strong> (déterminant) <strong>énorme</strong> (adjectif) viande.','<strong>Il</strong> (pronom) court <strong>vite</strong> (adverbe).','Nami <strong>de</strong> (préposition) l\'équipage.']},
          {icon:'🔍',title:'Identifier la nature d\'un mot', color:'#3b82f6',
           content:'Un mot peut avoir la même forme mais des natures différentes selon son rôle dans la phrase !',
           examples:['"Le <strong>soleil</strong> brille" → soleil = NOM','\"<strong>Soleil</strong> ! Nom d\'un pirate !" → soleil = apostrophe','Un adjectif qualifie toujours un nom ou un pronom']}
        ],
        heroTip:'Robin dit : "Demande-toi : ce mot fait une ACTION ? → verbe. Il QUALIFIE ? → adjectif. Il REMPLACE ? → pronom."',
        warmup:[
          {q:'Dans "Nami navigue vite", quelle est la nature de "vite" ?',a:'Adverbe',o:['Adverbe','Adjectif','Nom']},
          {q:'Dans "Le grand pirate", quelle est la nature de "grand" ?',a:'Adjectif',o:['Adjectif','Nom','Adverbe']}
        ]
      },
      8: {
        heroName:'Zoro', heroQuote:'Les accords complexes ? Trois épées, trois règles — maîtrise-les toutes !',
        rule:'Accord du participe passé : avec ÊTRE → accord avec le sujet · avec AVOIR → accord avec le COD si placé AVANT',
        sections:[
          {icon:'⚔️',title:'Accord avec ÊTRE', color:'#e63946',
           content:'Avec l\'auxiliaire ÊTRE, le participe passé s\'accorde en genre et nombre avec le <strong>sujet</strong>.',
           examples:['Nami est <strong>partie</strong> (féminin singulier)','Les pirates sont <strong>arrivés</strong> (masculin pluriel)','Zoro et Robin sont <strong>partis</strong> (groupe mixte = masculin pluriel)']},
          {icon:'🗡️',title:'Accord avec AVOIR', color:'#8b5cf6',
           content:'Avec AVOIR, le participe passé s\'accorde avec le COD <strong>seulement si le COD est placé AVANT</strong> le verbe.',
           examples:['Luffy a <strong>mangé</strong> la viande → pas d\'accord (COD après)','La viande que Luffy a <strong>mangée</strong> → accord avec "que" (féminin = viande)','Les îles qu\'ils ont <strong>découvertes</strong> → "qu\'" = les îles = féminin pluriel']}
        ],
        heroTip:'Zoro dit : "Avec AVOIR, cherche si le COD est AVANT le verbe. Si oui → accord. Sinon → rien !"',
        warmup:[
          {q:'"Les pirates sont arr___" (arriver)',a:'arrivés',o:['arrivé','arrivées','arrivés']},
          {q:'"La carte qu\'il a trouv___"',a:'trouvée',o:['trouvé','trouvées','trouvée']}
        ]
      }
    }
  },

  // ─── MAGNOLIA — Histoire (Dragon Ball Z) ──────────────────────
  magnolia: {
    color: '#8b5cf6', bg: '#080418', textAccent: '#f59e0b',
    particles: 'energy', worldName: 'Magnolia',
    avatar: function(n){
      var map = {1:'assets/images/dbz/1.png',2:'assets/images/dbz/2.png',3:'assets/images/dbz/3.png',4:'assets/images/dbz/4.png',5:'assets/images/dbz/5.png',6:'assets/images/dbz/6.png',7:'assets/images/dbz/7.png',8:'assets/images/dbz/8.png'};
      return map[n] || 'assets/images/dbz/1.png';
    },
    lessons: {
      1: {
        heroName:'Goku', heroQuote:'L\'Égypte ancienne c\'était la plus grande puissance du monde — comme moi en Super Saiyen !',
        rule:'L\'Égypte ancienne (3000 av. J.-C. → 30 av. J.-C.) = civilisation du Nil, pharaons, pyramides, écriture hiéroglyphique',
        sections:[
          {icon:'🏺',title:'Le Nil, source de vie', color:'#f59e0b',
           content:'Le Nil permettait l\'agriculture grâce aux <strong>crues annuelles</strong> qui fertilisaient les terres. Sans le Nil, pas d\'Égypte !',
           examples:['Crues en juillet → limon fertile déposé sur les berges','Delta du Nil = terres les plus fertiles d\'Égypte','Hérodote : "L\'Égypte est un don du Nil"']},
          {icon:'👑',title:'Le Pharaon, dieu sur Terre', color:'#8b5cf6',
           content:'Le <strong>pharaon</strong> était à la fois roi et dieu. Il possédait toutes les terres et commandait l\'armée, la religion et la justice.',
           examples:['Toutânkhamon (18e dynastique, ~1330 av. J.-C.)','Ramsès II = pharaon le plus célèbre et le plus long règne (67 ans)','Cléopâtre = dernier pharaon d\'Égypte (30 av. J.-C.)']},
          {icon:'📐',title:'Pyramides et techniques', color:'#06d6a0',
           content:'Les pyramides servaient de <strong>tombeaux pour les pharaons</strong>. La Grande Pyramide de Gizeh = 2,3 millions de blocs !',
           examples:['Grande Pyramide de Gizeh : ~2,5 millions de blocs de 2,5 tonnes','Construction vers 2560 av. J.-C. sous Khéops','Les hiéroglyphes = système d\'écriture avec 700+ signes']}
        ],
        heroTip:'Goku dit : "Retiens TROIS choses : le Nil donne la vie, le pharaon est roi-dieu, les pyramides sont des tombeaux !"',
        warmup:[
          {q:'Quelle rivière était essentielle à la civilisation égyptienne ?',a:'Le Nil',o:['Le Nil','L\'Euphrate','Le Tigre']},
          {q:'Que représentaient les pyramides ?',a:'Des tombeaux pour les pharaons',o:['Des temples religieux','Des tombeaux pour les pharaons','Des palais royaux']}
        ]
      },
      2: {
        heroName:'Végéta', heroQuote:'La Grèce antique ? Ce peuple a tout inventé — même le concept de GLOIRE !',
        rule:'La Grèce antique (800-300 av. J.-C.) invente la démocratie, la philosophie, les Jeux olympiques et pose les bases de notre civilisation',
        sections:[
          {icon:'🏛️',title:'La cité grecque (polis)', color:'#3b82f6',
           content:'La Grèce était divisée en <strong>cités-États</strong> indépendantes. Les deux principales : <strong>Athènes</strong> (démocratie, arts) et <strong>Sparte</strong> (guerriers, discipline).',
           examples:['Athènes = démocratie : les citoyens votent les lois (mais pas les femmes ni les esclaves)','Sparte = cité militaire : entraînement dès 7 ans','Agora = place centrale de la cité, lieu de débat']},
          {icon:'🏅',title:'Les Jeux olympiques', color:'#f59e0b',
           content:'Les JO naissent en <strong>776 av. J.-C.</strong> à Olympie en l\'honneur de Zeus. Ils rassemblaient toutes les cités grecques en trêve.',
           examples:['Jeux toutes les 4 ans depuis 776 av. J.-C.','Épreuves : course à pied, lutte, lancer de disque, saut, course de chars','Pendant les JO : pause dans toutes les guerres entre cités']},
          {icon:'🔮',title:'Philosophie et sciences', color:'#8b5cf6',
           content:'Les Grecs inventent la <strong>philosophie</strong> (amour de la sagesse). Socrate, Platon, Aristote posent les bases de la pensée occidentale.',
           examples:['Socrate : "Connais-toi toi-même" — méthode de questionnement','Platon : idée que le monde visible n\'est qu\'une copie du monde des idées','Aristote : classification de tous les êtres vivants (ancêtre de la biologie)']}
        ],
        heroTip:'Végéta dit : "3 héritages grecs à retenir : la DÉMOCRATIE, les JEUX OLYMPIQUES, la PHILOSOPHIE !"',
        warmup:[
          {q:'Où ont eu lieu les premiers Jeux olympiques ?',a:'À Olympie',o:['À Athènes','À Olympie','À Sparte']},
          {q:'Qu\'est-ce que la démocratie athénienne ?',a:'Les citoyens votent les lois',o:['Le roi décide seul','Les citoyens votent les lois','Les philosophes gouvernent']}
        ]
      },
      3: {
        heroName:'Piccolo', heroQuote:'Rome a conquis le monde connu — leur stratégie était imbattable, comme ma Technique Spéciale !',
        rule:'Rome (753 av. J.-C. → 476 ap. J.-C.) passe de la monarchie à la République puis à l\'Empire, dominant tout le bassin méditerranéen',
        sections:[
          {icon:'🦅',title:'La République romaine', color:'#e63946',
           content:'De 509 à 27 av. J.-C., Rome est une <strong>République</strong> : deux consuls élus par an, un Sénat de patriciens. "SPQR" = Senatus Populusque Romanus.',
           examples:['Sénat = assemblée des nobles (patriciens) qui vote les lois','Deux consuls élus pour 1 an dirigent l\'État','Jules César franchit le Rubicon en 49 av. J.-C. → fin de la République']},
          {icon:'👑',title:'L\'Empire romain', color:'#f97316',
           content:'Auguste devient le premier <strong>Empereur</strong> en 27 av. J.-C. L\'Empire s\'étend de l\'Angleterre à la Mésopotamie.',
           examples:['Auguste (27 av. J.-C. - 14 ap. J.-C.) = premier Empereur','Pax Romana = 200 ans de paix relative (27 av. J.-C. → 180 ap. J.-C.)','Rome = 1 million d\'habitants au IIe siècle → plus grande ville du monde']},
          {icon:'✝️',title:'Naissance du christianisme', color:'#8b5cf6',
           content:'Jésus nait en Palestine (province romaine) vers -4 / 0. Condamné à mort par Ponce Pilate. Le christianisme se répand dans l\'Empire.',
           examples:['Naissance de Jésus : point de départ de notre calendrier','313 ap. J.-C. : Edit de Milan → Constantin autorise le christianisme','380 ap. J.-C. : le christianisme devient religion officielle de l\'Empire']}
        ],
        heroTip:'Piccolo dit : "Rome en 3 phases : MONARCHIE (rois) → RÉPUBLIQUE (Sénat) → EMPIRE (Empereurs) !"',
        warmup:[
          {q:'Qu\'est-ce que la Pax Romana ?',a:'Une période de paix dans l\'Empire romain',o:['Une guerre civile romaine','Une période de paix dans l\'Empire romain','Un traité de paix avec les Grecs']},
          {q:'En quelle année Auguste devient-il le premier Empereur ?',a:'27 av. J.-C.',o:['509 av. J.-C.','27 av. J.-C.','476 ap. J.-C.']}
        ]
      },
      4: {
        heroName:'Gohan', heroQuote:'L\'Islam a illuminé le Moyen Âge — leurs scientifiques étaient aussi forts que les Guerriers Z !',
        rule:'L\'Islam naît en 622 (Hégire). En un siècle, il s\'étend de l\'Espagne à l\'Inde. L\'Âge d\'Or arabe (IXe-XIIIe s.) révolutionne les sciences',
        sections:[
          {icon:'☪️',title:'Naissance de l\'Islam', color:'#06d6a0',
           content:'<strong>Mahomet</strong> reçoit la révélation en 610. En 622, l\'Hégire (exil de La Mecque vers Médine) marque le début du calendrier islamique.',
           examples:['622 = Hégire = an 1 du calendrier islamique','Le Coran = livre sacré de l\'Islam, révélé à Mahomet','5 piliers : shahada, prière, aumône, jeûne du Ramadan, pèlerinage']},
          {icon:'🌍',title:'L\'expansion arabe', color:'#f59e0b',
           content:'En moins d\'un siècle, l\'Islam s\'étend de l\'Espagne (711) à l\'Inde. Les Arabes créent un vaste empire uni par la langue arabe et l\'Islam.',
           examples:['632-750 : conquête de la Perse, Égypte, Afrique du Nord, Espagne','732 : bataille de Poitiers — Charles Martel stoppe l\'expansion en France','Bagdad fondée en 762 → capitale du califat abbasside']},
          {icon:'🔬',title:'L\'Âge d\'Or arabe', color:'#8b5cf6',
           content:'Entre le IXe et XIIIe siècle, les savants arabes préservent et enrichissent les sciences grecques. Ils inventent l\'algèbre, l\'alchimie...',
           examples:['Al-Kwarizmi invente l\'algèbre (le mot "algèbre" vient de l\'arabe)','Avicenne (Ibn Sina) : Canon de médecine, encyclopédie médicale','Chiffres arabes (0 à 9) adoptés par l\'Europe → révolution du calcul']}
        ],
        heroTip:'Gohan dit : "622 = Hégire, 711 = arrivée en Espagne, IXe-XIIIe = Âge d\'Or des sciences !"',
        warmup:[
          {q:'Qu\'est-ce que l\'Hégire ?',a:'L\'exil de Mahomet de La Mecque vers Médine',o:['La mort de Mahomet','L\'exil de Mahomet de La Mecque vers Médine','La naissance de l\'Islam']},
          {q:'Quel mathématicien arabe a inventé l\'algèbre ?',a:'Al-Kwarizmi',o:['Avicenne','Al-Kwarizmi','Ibn Khaldoun']}
        ]
      },
      5: {
        heroName:'Trunks', heroQuote:'Le Moyen Âge ? J\'arrive du futur — laisse-moi t\'expliquer comment la féodalité fonctionnait !',
        rule:'La société féodale (IXe-XIVe s.) est organisée en 3 ordres : ceux qui prient (clergé), ceux qui combattent (nobles), ceux qui travaillent (paysans)',
        sections:[
          {icon:'🏰',title:'Les trois ordres', color:'#8b5cf6',
           content:'La société médiévale est divisée en <strong>3 ordres</strong> fixes et héréditaires. Chacun a ses devoirs et ses privilèges.',
           examples:['Clergé (10%) : prières, hôpitaux, écoles, archives — exemptés d\'impôts','Noblesse (10%) : protection militaire, justice locale, perception des droits','Paysans/serfs (80%) : travail des champs, paiement de taxes, corvées']},
          {icon:'⚔️',title:'Le système seigneurial', color:'#e63946',
           content:'Le seigneur protège les paysans en échange de <strong>corvées</strong> (travail gratuit) et de <strong>taxes</strong>. Les paysans serfs ne peuvent pas quitter la terre.',
           examples:['Fief = terre accordée par le roi au noble en échange de service militaire','Serf ≠ esclave : il ne peut pas être vendu mais est lié à la terre','Château fort = centre administratif et militaire de la seigneurie']},
          {icon:'⛪',title:'L\'Église au cœur de tout', color:'#f59e0b',
           content:'L\'Église catholique est la plus grande puissance du Moyen Âge. Elle contrôle l\'éducation, l\'art, les hôpitaux et le calendrier.',
           examples:['Dîme = impôt de 10% des récoltes versé à l\'Église','Cathédrale = centre de la ville médiévale (12-13e siècle : style gothique)','Croisades (1095-1291) : guerres religieuses pour reconquérir Jérusalem']}
        ],
        heroTip:'Trunks dit : "3 ordres = Clergé (prient) + Noblesse (combattent) + Paysans (travaillent) !"',
        warmup:[
          {q:'Que représente la dîme ?',a:'Un impôt de 10% versé à l\'Église',o:['Un impôt payé au roi','Un impôt de 10% versé à l\'Église','Le travail gratuit pour le seigneur']},
          {q:'Comment appelle-t-on le travail gratuit que les paysans faisaient pour le seigneur ?',a:'La corvée',o:['La dîme','La corvée','Le fief']}
        ]
      },
      6: {
        heroName:'Krilin', heroQuote:'Les Croisades ? Autant de combats que j\'en ai perdu — mais l\'histoire retient les leçons !',
        rule:'Les Croisades (1095-1291) = expéditions militaires chrétiennes pour reprendre Jérusalem aux musulmans. 8 croisades en 2 siècles.',
        sections:[
          {icon:'✝️',title:'Pourquoi les Croisades ?', color:'#e63946',
           content:'En 1095, le pape <strong>Urbain II</strong> appelle les chrétiens à reprendre Jérusalem aux Turcs seldjoucides. "Dieu le veut !"',
           examples:['1095 : Concile de Clermont — Urbain II lance la 1ère Croisade','1099 : 1ère Croisade → prise de Jérusalem, massacres','4 États latins fondés en Orient : Royaume de Jérusalem, Comté de Tripoli...']},
          {icon:'☪️',title:'La résistance musulmane', color:'#06d6a0',
           content:'<strong>Saladin</strong> réunifie le monde musulman et reprend Jérusalem en 1187. Richard Cœur de Lion mène la 3ème Croisade sans succès.',
           examples:['1187 : Saladin reprend Jérusalem → choc en Europe','3ème Croisade (1189-92) : Richard Ier d\'Angleterre vs Saladin → match nul','1291 : chute de Saint-Jean d\'Acre → fin des États latins d\'Orient']},
          {icon:'🌍',title:'Conséquences des Croisades', color:'#8b5cf6',
           content:'Les Croisades renforcent les échanges commerciaux, transmettent des savoirs arabes en Europe, mais creusent les divisions entre chrétiens et musulmans.',
           examples:['Retour des épices, soie, coton et savoirs scientifiques arabes','Développement des villes marchandes italiennes (Venise, Gênes)','Traumatismes durables dans les relations judéo-chrétiens-musulmans']}
        ],
        heroTip:'Krilin dit : "1095 = début, 1099 = prise Jérusalem, 1187 = Saladin reprend, 1291 = fin !"',
        warmup:[
          {q:'Qui a lancé la 1ère Croisade en 1095 ?',a:'Le pape Urbain II',o:['Le pape Urbain II','L\'Empereur d\'Allemagne','Richard Cœur de Lion']},
          {q:'Qui a repris Jérusalem en 1187 ?',a:'Saladin',o:['Saladin','Richard Cœur de Lion','Frédéric Barberousse']}
        ]
      },
      7: {
        heroName:'Android 18', heroQuote:'La Renaissance ? Une révolution dans les têtes — exactement ce dont ce monde avait besoin !',
        rule:'La Renaissance (XVe-XVIe s.) = renouveau culturel venu d\'Italie qui remet l\'Homme au centre de tout. Humanisme, arts, sciences, imprimerie.',
        sections:[
          {icon:'🎨',title:'L\'art de la Renaissance', color:'#f97316',
           content:'Les artistes de la Renaissance redécouvrent l\'Antiquité et peignent le monde réel avec <strong>perspective</strong> et <strong>réalisme</strong>.',
           examples:['Léonard de Vinci (1452-1519) : La Joconde, La Cène — artiste et scientifique','Michel-Ange (1475-1564) : Chapelle Sixtine, Le David (sculpture)','Raphaël (1483-1520) : peintures religieuses d\'une beauté classique']},
          {icon:'📖',title:'L\'imprimerie — révolution de l\'information', color:'#3b82f6',
           content:'<strong>Gutenberg</strong> invente l\'imprimerie à caractères mobiles vers 1450. Les idées se propagent à toute l\'Europe à une vitesse inédite.',
           examples:['1450 : Gutenberg invente l\'imprimerie → fin du monopole des copistes','Bible de Gutenberg = 1er livre imprimé en série (1455)','Diffusion des idées de la Renaissance et de la Réforme protestante']},
          {icon:'🌍',title:'Les Grandes Découvertes', color:'#06d6a0',
           content:'Les Européens explorent le monde : Amériques, Afrique, route des Indes. Début du commerce mondial et... de la colonisation.',
           examples:['1492 : Christophe Colomb arrive en Amérique (pour l\'Espagne)','1498 : Vasco de Gama atteint l\'Inde par l\'Afrique','1519-22 : Magellan = 1er tour du monde']}
        ],
        heroTip:'Android 18 dit : "3 révolutions Renaissance : ARTS (Léonard), IMPRIMERIE (Gutenberg), DÉCOUVERTES (Colomb) !"',
        warmup:[
          {q:'Qui a inventé l\'imprimerie à caractères mobiles ?',a:'Gutenberg',o:['Gutenberg','Léonard de Vinci','Colomb']},
          {q:'En quelle année Christophe Colomb arrive-t-il en Amérique ?',a:'1492',o:['1450','1492','1498']}
        ]
      },
      8: {
        heroName:'Babidi', heroQuote:'La Révolution française a tout détruit pour reconstruire — même Buu a ses limites !',
        rule:'La Révolution française (1789) renverse la monarchie absolue et proclame la Déclaration des droits de l\'Homme : Liberté, Égalité, Fraternité',
        sections:[
          {icon:'⚡',title:'Les causes de la Révolution', color:'#e63946',
           content:'La France de 1789 est en crise : famine, banqueroute de l\'État, inégalités criantes entre les 3 ordres (clergé, noblesse, tiers état).',
           examples:['97% de la population = tiers état, mais paye tous les impôts','Hiver 1788-89 : famine → le pain coûte 80% du salaire ouvrier','Louis XVI = roi absolu de droit divin, indéboulonnable... jusqu\'à 1789']},
          {icon:'📜',title:'Les événements clés', color:'#8b5cf6',
           content:'1789 : l\'année qui change tout. De la prise de la Bastille à la Déclaration des droits de l\'Homme.',
           examples:['14 juillet 1789 : prise de la Bastille (prison royale) → début symbolique','26 août 1789 : Déclaration des Droits de l\'Homme et du Citoyen','1792 : 1ère République · 1793 : exécution de Louis XVI · 1799 : Bonaparte']},
          {icon:'🗽',title:'L\'héritage de 1789', color:'#06d6a0',
           content:'La Révolution invente les principes modernes : droits de l\'Homme, souveraineté du peuple, séparation des pouvoirs, laïcité.',
           examples:['La Marseillaise = hymne national (écrite en 1792)','Le drapeau tricolore (bleu-blanc-rouge) = symbole républicain','Devise française : Liberté - Égalité - Fraternité']}
        ],
        heroTip:'Babidi dit : "14 juillet 1789 = Bastille. 26 août = DDHC. 3 mots = LIBERTÉ - ÉGALITÉ - FRATERNITÉ !"',
        warmup:[
          {q:'Que s\'est-il passé le 14 juillet 1789 ?',a:'Prise de la Bastille',o:['Prise de la Bastille','Exécution de Louis XVI','Déclaration des Droits de l\'Homme']},
          {q:'Quelle est la devise de la République française ?',a:'Liberté - Égalité - Fraternité',o:['Dieu - Roi - Patrie','Liberté - Égalité - Fraternité','Travail - Famille - Patrie']}
        ]
      }
    }
  },

  // ─── KANTO — Sciences Physiques (Demon Slayer) ───────────────
  kanto: {
    color: '#C0392B', bg: '#0a0408', textAccent: '#D4AF37',
    particles: 'sword', worldName: 'Kanto',
    avatar: function(n){
      var SUPABASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer';
      var map = {1:'tanjiro',2:'zenitsu',3:'inosuke',4:'shinobu',5:'kanao',6:'tengen',7:'rengoku',8:'mitsuri'};
      return SUPABASE + '/characters/' + (map[n]||'tanjiro') + '.jpeg';
    },
    lessons: {
      1: {
        heroName:'Tanjiro', heroQuote:'Les signaux, c\'est comme sentir un démon — il faut savoir les reconnaître et les décoder !',
        rule:'Un signal transporte une information. Il peut être lumineux, sonore ou électrique. Tout signal a un émetteur et un récepteur.',
        sections:[
          {icon:'💡',title:'Qu\'est-ce qu\'un signal ?', color:'#C0392B',
           content:'Un <strong>signal</strong> est un phénomène physique (lumière, son, électricité) qui transporte une <strong>information</strong> d\'un point à un autre.',
           examples:['Signal lumineux : feu rouge, flash, laser','Signal sonore : voix, sirène, sonnerie de portable','Signal électrique : courant dans un câble, onde radio']},
          {icon:'📡',title:'Émetteur et Récepteur', color:'#D4AF37',
           content:'<strong>Émetteur</strong> = celui qui envoie le signal · <strong>Récepteur</strong> = celui qui reçoit et interprète le signal.',
           examples:['Téléphone → émetteur ET récepteur (bidirectionnel)','Télévision : antenne = récepteur · chaîne TV = émetteur','Soleil = émetteur de lumière · Tes yeux = récepteur']}
        ],
        heroTip:'Tanjiro dit : "Pour tout signal, pose-toi 3 questions : QUOI ? (nature) D\'OÙ ? (émetteur) VERS OÙ ? (récepteur)"',
        warmup:[
          {q:'Un signal lumineux est :',a:'Un phénomène lumineux transportant une information',o:['Un phénomène lumineux transportant une information','Un courant électrique','Un signal sonore très fort']},
          {q:'Dans une conversation téléphonique, ton téléphone est :',a:'À la fois émetteur et récepteur',o:['Seulement émetteur','Seulement récepteur','À la fois émetteur et récepteur']}
        ]
      },
      2: {
        heroName:'Zenitsu', heroQuote:'Le tonnerre transmet mon énergie — et les signaux transmettent l\'information !',
        rule:'Un signal transporte une information codée. Le code morse encode les lettres en signaux courts (.) et longs (-). Binaire = 0 et 1.',
        sections:[
          {icon:'⚡',title:'Coder une information', color:'#D4AF37',
           content:'Coder = transformer une information en un signal compréhensible. <strong>Code morse</strong> : . = court · - = long. <strong>Binaire</strong> : 0 = éteint, 1 = allumé.',
           examples:['A en morse : .-  ·  S en morse : ...  ·  O en morse : ---','SOS = ... --- ... (3 courts, 3 longs, 3 courts)','Binaire : la lettre A = 01000001']},
          {icon:'📟',title:'Ondes radio et Wi-Fi', color:'#C0392B',
           content:'Les <strong>ondes radio</strong> sont des ondes électromagnétiques invisibles qui transportent des informations sans fil à la vitesse de la lumière.',
           examples:['Radio FM : ondes entre 87,5 et 108 MHz','Wi-Fi : ondes à 2,4 GHz ou 5 GHz','Bluetooth : courte portée (~10m), ondes à 2,4 GHz']}
        ],
        heroTip:'Zenitsu dit : "SOS = ...---... en morse — retiens ça, c\'est toujours au bac !"',
        warmup:[
          {q:'Que signifie SOS en code morse ?',a:'... --- ...',o:['... --- ...','--- ... ---','.. -- ..']},
          {q:'La lettre S en code morse c\'est :',a:'...',o:['...','-.-','---']}
        ]
      },
      3: {
        heroName:'Inosuke', heroQuote:'RARGH ! La fibre optique c\'est comme moi — ça passe PARTOUT à toute vitesse !',
        rule:'La fibre optique transporte la lumière (information) à travers un câble de verre. Elle est plus rapide que les câbles électriques.',
        sections:[
          {icon:'🔦',title:'Comment fonctionne la fibre optique ?', color:'#C0392B',
           content:'La <strong>fibre optique</strong> est un câble de verre (ou plastique) qui transmet des signaux lumineux par <strong>réflexion totale interne</strong>.',
           examples:['La lumière rebondit à l\'intérieur de la fibre (angle d\'incidence > angle critique)','Débit : jusqu\'à 10 Gbps (vs 100 Mbps pour ADSL)','Utilisée pour Internet, télécommunications, chirurgie médicale']},
          {icon:'💎',title:'Avantages vs câble électrique', color:'#D4AF37',
           content:'La fibre optique est <strong>plus rapide</strong> (lumière > électricité), <strong>insensible aux interférences électriques</strong> et permet des débits bien supérieurs.',
           examples:['Pas de pertes d\'énergie sur de longues distances','Insensible aux champs magnétiques (pas de coupures)','Peut transporter plusieurs signaux en même temps (multiplexage)']}
        ],
        heroTip:'Inosuke dit : "Fibre = lumière dans du verre = plus vite que l\'électricité dans du cuivre !"',
        warmup:[
          {q:'Quel type de signal transporte la fibre optique ?',a:'Un signal lumineux',o:['Un signal électrique','Un signal lumineux','Un signal sonore']},
          {q:'Quel est l\'avantage principal de la fibre optique ?',a:'Elle est plus rapide et insensible aux interférences',o:['Elle est moins chère','Elle est plus lourde','Elle est plus rapide et insensible aux interférences']}
        ]
      },
      4: {
        heroName:'Shinobu', heroQuote:'Le téléphone transforme ta voix en signal électrique — aussi précisément que mon poison !',
        rule:'Le téléphone convertit le son (voix) en signal électrique (émission) puis reconvertit le signal électrique en son (réception)',
        sections:[
          {icon:'📱',title:'Comment fonctionne un téléphone ?', color:'#8b5cf6',
           content:'Le téléphone réalise deux conversions : <strong>son → signal électrique</strong> (microphone) et <strong>signal électrique → son</strong> (haut-parleur).',
           examples:['Microphone : membrane vibrante → courant électrique variable','Haut-parleur : courant électrique → membrane vibrante → son','Réseau téléphonique = ensemble de câbles, antennes et commutateurs']},
          {icon:'📶',title:'Téléphonie mobile (4G, 5G)', color:'#C0392B',
           content:'Le téléphone mobile transmet sans fil grâce aux <strong>antennes relais</strong>. Le signal numérique code la voix en 0 et 1.',
           examples:['4G : débit ~100 Mbps → streaming vidéo','5G : débit ~1 Gbps → voitures autonomes, chirurgie à distance','Antenne relais = relayeur de signal entre téléphones']}
        ],
        heroTip:'Shinobu dit : "Son → électricité (micro) → Son (HP). Retiens cette chaîne de conversion !"',
        warmup:[
          {q:'Que fait un microphone ?',a:'Convertit le son en signal électrique',o:['Convertit le son en signal électrique','Convertit le signal électrique en son','Amplifie le son']},
          {q:'Qu\'est-ce qu\'une antenne relais ?',a:'Un relayeur de signal entre téléphones mobiles',o:['Un relayeur de signal entre téléphones mobiles','Un satellite','Un câble sous-marin']}
        ]
      },
      5: {
        heroName:'Kanao', heroQuote:'Mes yeux voient tout sans effort — la lumière transporte toujours l\'information à 300 000 km/s !',
        rule:'La lumière se propage en ligne droite dans un milieu homogène à 300 000 km/s. Elle peut être réfléchie (miroir) ou réfractée (prisme)',
        sections:[
          {icon:'💡',title:'Propagation de la lumière', color:'#0891B2',
           content:'La lumière se propage en ligne droite ("<strong>rayons lumineux</strong>"). Dans le vide : 300 000 km/s = 3×10⁸ m/s. Dans l\'eau ou le verre : elle ralentit.',
           examples:['Ombre = preuve que la lumière se propage en ligne droite','Éclipse = alignement Terre-Lune-Soleil (ou Terre-Soleil-Lune)','La lumière du Soleil met 8 minutes pour atteindre la Terre']},
          {icon:'🌈',title:'Réflexion et réfraction', color:'#D4AF37',
           content:'<strong>Réflexion</strong> = la lumière rebondit (miroir). <strong>Réfraction</strong> = la lumière change de direction en changeant de milieu.',
           examples:['Réflexion : miroir, surface de l\'eau calme','Réfraction : la paille semble cassée dans un verre d\'eau','Arc-en-ciel : réfraction de la lumière dans les gouttes de pluie']}
        ],
        heroTip:'Kanao dit : "300 000 km/s dans le vide · Réflexion = rebondit · Réfraction = change de direction !"',
        warmup:[
          {q:'À quelle vitesse se propage la lumière dans le vide ?',a:'300 000 km/s',o:['300 km/s','300 000 km/s','3 000 000 km/s']},
          {q:'Qu\'est-ce que la réfraction de la lumière ?',a:'La lumière change de direction en changeant de milieu',o:['La lumière rebondit sur un miroir','La lumière change de direction en changeant de milieu','La lumière s\'arrête dans l\'eau']}
        ]
      },
      6: {
        heroName:'Tengen', heroQuote:'Le STYLE c\'est aussi transmettre une information — exactement comme les ondes !',
        rule:'Une onde est une perturbation qui se propage dans un milieu. Onde sonore = vibration mécanique · Onde radio = onde électromagnétique',
        sections:[
          {icon:'〰️',title:'Les ondes sonores', color:'#C0392B',
           content:'Le son est une <strong>onde mécanique</strong> qui nécessite un milieu pour se propager (air, eau, solide). Dans le vide : pas de son !',
           examples:['Vitesse du son dans l\'air : ~340 m/s (mach 1)','Vitesse du son dans l\'eau : ~1500 m/s (4x plus vite que dans l\'air)','Fréquence : nombre de vibrations par seconde (Hz) → grave ou aigu']},
          {icon:'📡',title:'Les ondes électromagnétiques', color:'#D4AF37',
           content:'Se propagent dans le vide à la vitesse de la lumière. Classées selon leur fréquence : radio, micro-ondes, infrarouge, visible, UV, rayons X, gamma.',
           examples:['Radio FM : fréquence 87-108 MHz','Lumière visible : fréquence 400-800 THz (couleurs de l\'arc-en-ciel)','Rayons X : pénètrent les tissus mous, bloqués par les os']}
        ],
        heroTip:'Tengen dit : "Son = onde MÉCANIQUE (besoin d\'un milieu). Lumière = onde ÉLECTROMAGNÉTIQUE (pas besoin) !"',
        warmup:[
          {q:'Peut-on entendre un son dans le vide (espace) ?',a:'Non, le son ne se propage pas dans le vide',o:['Oui, le son se propage partout','Non, le son ne se propage pas dans le vide','Ça dépend de la fréquence']},
          {q:'Quelle est la vitesse du son dans l\'air ?',a:'340 m/s',o:['340 m/s','300 000 km/s','1 500 m/s']}
        ]
      },
      7: {
        heroName:'Rengoku', heroQuote:'UGOKU ! Mon énergie n\'a pas de limite — comme les ondes qui parcourent le monde connecté !',
        rule:'Internet = réseau mondial d\'ordinateurs connectés. Un paquet = unité de données envoyée sur Internet. Adresse IP = identifiant unique de chaque machine.',
        sections:[
          {icon:'🌐',title:'Comment fonctionne Internet ?', color:'#e63946',
           content:'Internet est un réseau de <strong>réseaux</strong>. Les données voyagent en <strong>paquets</strong> qui prennent le chemin le plus rapide jusqu\'à destination.',
           examples:['Protocole TCP/IP = règles de communication sur Internet','Routeur = appareil qui dirige les paquets sur le bon chemin','Adresse IP : ex. 192.168.1.1 — identifie chaque machine']},
          {icon:'🔒',title:'Sécurité et chiffrement', color:'#D4AF37',
           content:'<strong>HTTPS</strong> = connexion chiffrée (cadenas dans le navigateur). Les données sont codées pour que seul le destinataire puisse les lire.',
           examples:['Cadenas 🔒 dans le navigateur = connexion HTTPS sécurisée','Chiffrement = données rendues illisibles sans clé','Phishing = faux site imitant un vrai pour voler tes données']}
        ],
        heroTip:'Rengoku dit : "Adresse IP = identité · Paquet = enveloppe de données · Routeur = facteur d\'Internet !"',
        warmup:[
          {q:'À quoi sert une adresse IP ?',a:'À identifier un appareil sur un réseau',o:['À identifier un appareil sur un réseau','À chiffrer les données','À envoyer des courriels']},
          {q:'Que signifie HTTPS ?',a:'Une connexion sécurisée et chiffrée',o:['Une connexion sécurisée et chiffrée','Un protocole très rapide','Une adresse de site web']}
        ]
      },
      8: {
        heroName:'Mitsuri', heroQuote:'L\'énergie circule dans mon corps comme le courant dans un circuit — laisse-moi t\'expliquer !',
        rule:'Un circuit électrique = générateur + conducteurs + récepteurs. Courant = mouvement des électrons. Tension (V) = pression · Intensité (A) = débit',
        sections:[
          {icon:'⚡',title:'Le circuit électrique simple', color:'#C0392B',
           content:'Un circuit doit être <strong>fermé</strong> pour que le courant circule. Il comprend un <strong>générateur</strong> (pile), des <strong>conducteurs</strong> (fils) et un <strong>récepteur</strong> (ampoule).',
           examples:['Pile 9V → fils → ampoule → fils → pile = circuit fermé','Si on coupe un fil = circuit ouvert → plus de courant → ampoule éteinte','Interrupteur = ouvre/ferme le circuit']},
          {icon:'🔋',title:'Tension et intensité', color:'#D4AF37',
           content:'<strong>Tension (U)</strong> = différence de potentiel, mesurée en Volts (V) avec un voltmètre. <strong>Intensité (I)</strong> = débit de courant, mesurée en Ampères (A) avec un ampèremètre.',
           examples:['Pile AAA = 1,5 V · Secteur = 230 V · Batterie voiture = 12 V','Loi d\'Ohm : U = R × I (tension = résistance × intensité)','Fusible = protection qui coupe le circuit si intensité trop forte']}
        ],
        heroTip:'Mitsuri dit : "Tension en VOLTS (V) avec voltmètre. Intensité en AMPÈRES (A) avec ampèremètre !"',
        warmup:[
          {q:'Quelle est l\'unité de la tension électrique ?',a:'Le Volt (V)',o:['Le Volt (V)','L\'Ampère (A)','Le Watt (W)']},
          {q:'Pour qu\'un courant circule, le circuit doit être :',a:'Fermé',o:['Ouvert','Fermé','Court-circuité']}
        ]
      }
    }
  },

  // ─── PAYS DU FEU — Maths (Naruto) ────────────────────────────
  paysdufeu: {
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
  }
};

// ══════════════════════════════════════════════════════════════
// 2. ÉTAT DE LA PAGE LEÇON
// ══════════════════════════════════════════════════════════════
var _lesson_world   = null;
var _lesson_island  = 0;
var _lesson_cb      = null; // callback → lance le quiz après la leçon
var _lesson_timer   = null;

// ══════════════════════════════════════════════════════════════
// 3. ENTRÉE PRINCIPALE — appelée par startIsland() de chaque monde
// ══════════════════════════════════════════════════════════════
function showLesson(worldKey, islandN, avatarUrl, color, callback) {
  var worldData = LESSON_DATA[worldKey];
  if (!worldData || !worldData.lessons[islandN]) {
    // Pas de leçon pour cette île → lancer le quiz directement
    if (callback) callback();
    return;
  }

  _lesson_world  = worldKey;
  _lesson_island = islandN;
  _lesson_cb     = callback;

  var lesson    = worldData.lessons[islandN];
  var worldCfg  = worldData;

  _buildLessonOverlay(lesson, worldCfg, avatarUrl, color, islandN);
}

// ══════════════════════════════════════════════════════════════
// 4. CONSTRUIRE L'OVERLAY
// ══════════════════════════════════════════════════════════════
function _buildLessonOverlay(lesson, worldCfg, avatarUrl, color, n) {
  var ov = document.getElementById('lesson-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'lesson-overlay';
    document.body.appendChild(ov);
  }

  var accent    = color || worldCfg.color;
  var bg        = worldCfg.bg || '#080010';
  var textAccent = worldCfg.textAccent || '#FFD700';
  var particles  = worldCfg.particles || 'fire';

  ov.innerHTML = _buildLessonHTML(lesson, accent, bg, textAccent, avatarUrl, n, worldCfg);
  ov.style.cssText = 'position:fixed;inset:0;z-index:8500;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;background:'+bg+';opacity:0;transition:opacity .4s;pointer-events:auto';

  // Lancer les particules CSS
  _spawnParticles(ov, particles, accent);

  requestAnimationFrame(function(){ ov.style.opacity = '1'; });
  window.scrollTo(0,0);

  // Auto-skip après 90s (sécurité)
  clearTimeout(_lesson_timer);
  _lesson_timer = setTimeout(function(){ lesson_start(); }, 90000);
}

function _buildLessonHTML(lesson, accent, bg, textAccent, avatarUrl, n, worldCfg) {
  // Sections de la leçon
  var sectionsHTML = lesson.sections.map(function(sec) {
    var examplesHTML = sec.examples.map(function(ex) {
      return '<li class="lesson-example">' + ex + '</li>';
    }).join('');
    return '<div class="lesson-section" style="--sec-color:' + sec.color + '">' +
      '<div class="lesson-sec-header">' +
        '<span class="lesson-sec-icon">' + sec.icon + '</span>' +
        '<span class="lesson-sec-title">' + sec.title + '</span>' +
      '</div>' +
      '<ul class="lesson-examples">' + examplesHTML + '</ul>' +
    '</div>';
  }).join('');

  // Questions d'échauffement
  var warmupHTML = lesson.warmup.map(function(w, i) {
    var optsHTML = w.o.map(function(opt, j) {
      return '<button class="lesson-warmup-opt" id="lwu_'+i+'_'+j+'" onclick="lessonWarmupSelect('+i+','+j+','+JSON.stringify(w.a).replace(/</g,'&lt;')+')" data-val="'+opt.replace(/"/g,'&quot;')+'">'+opt+'</button>';
    }).join('');
    return '<div class="lesson-warmup-card" id="lwucard_'+i+'">' +
      '<div class="lesson-warmup-q">' + (i+1) + '. ' + w.q + '</div>' +
      '<div class="lesson-warmup-opts">' + optsHTML + '</div>' +
      '<div class="lesson-warmup-fb" id="lwufb_'+i+'"></div>' +
    '</div>';
  }).join('');

  return '' +
  // ─ HÉROS ANIMÉ ────────────────────────────────────────────
  '<div class="lesson-hero-panel" style="background:linear-gradient(180deg,'+_hexDarken(bg,0.4)+' 0%,'+bg+' 100%)">' +
    '<div class="lesson-particles" id="lesson-particles"></div>' +
    '<div class="lesson-hero-inner">' +
      '<div class="lesson-hero-img-wrap">' +
        '<div class="lesson-hero-aura" style="background:radial-gradient(ellipse,'+accent+'55 0%,transparent 70%)"></div>' +
        '<img class="lesson-hero-img" src="'+avatarUrl+'" alt="'+lesson.heroName+'" onerror="this.style.display=\'none\'">' +
        '<div class="lesson-hero-power-ring" style="border-color:'+accent+'"></div>' +
        '<div class="lesson-hero-power-ring lesson-ring-2" style="border-color:'+accent+'88"></div>' +
      '</div>' +
      '<div class="lesson-hero-content">' +
        '<div class="lesson-hero-name" style="color:'+accent+'">' + lesson.heroName + '</div>' +
        '<div class="lesson-hero-world" style="color:'+textAccent+'">' + worldCfg.worldName + '</div>' +
        '<div class="lesson-hero-bubble">' +
          '<div class="lesson-hero-bubble-inner">' +
            '<div class="lesson-hero-quote" id="lesson-hero-quote">' + lesson.heroQuote + '</div>' +
          '</div>' +
          '<div class="lesson-bubble-tail" style="border-top-color:rgba(255,255,255,.95)"></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="lesson-hero-bar">' +
      '<div class="lesson-hero-bar-fill" id="lesson-hero-bar-fill" style="background:linear-gradient(90deg,'+accent+','+textAccent+')"></div>' +
    '</div>' +
    '<button class="lesson-skip-hero-btn" onclick="lesson_skipHero()" style="border-color:'+accent+'44;color:'+accent+'">⏭ Passer</button>' +
  '</div>' +
  // ─ CONTENU LEÇON ──────────────────────────────────────────
  '<div class="lesson-content-panel" id="lesson-content-panel" style="display:none">' +
    '<div class="lesson-content-inner">' +
      // Bannière titre
      '<div class="lesson-banner" style="background:linear-gradient(135deg,'+_hexDarken(accent,0.3)+','+accent+'22);border-color:'+accent+'44">' +
        '<div class="lesson-banner-world" style="color:'+accent+'">' + worldCfg.worldName + ' · ' + lesson.heroName + '</div>' +
        '<div class="lesson-rule-title">📌 La règle du jour</div>' +
        '<div class="lesson-rule-text">' + lesson.rule + '</div>' +
      '</div>' +
      // Sections
      sectionsHTML +
      // Astuce du héros
      '<div class="lesson-hero-tip" style="background:'+accent+'15;border-color:'+accent+'44">' +
        '<div class="lesson-tip-icon">💡</div>' +
        '<div class="lesson-tip-text">' + lesson.heroTip + '</div>' +
      '</div>' +
      // Échauffement
      '<div class="lesson-warmup">' +
        '<div class="lesson-warmup-title" style="color:'+accent+'">⚡ Échauffement rapide</div>' +
        '<div class="lesson-warmup-sub">2 questions avant le vrai quiz !</div>' +
        warmupHTML +
      '</div>' +
      // Bouton lancer
      '<div class="lesson-start-wrap">' +
        '<button class="lesson-start-btn" id="lesson-start-btn" onclick="lesson_start()" style="background:linear-gradient(135deg,'+accent+','+_hexDarken(accent,0.3)+');box-shadow:0 4px 20px '+accent+'66">⚔️ JE SUIS PRÊT — LANCER LE QUIZ !</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ══════════════════════════════════════════════════════════════
// 5. ANIMATION BARRE DU HÉROS (30 secondes)
// ══════════════════════════════════════════════════════════════
var _heroBarInterval = null;
var _heroBarProgress = 0;
var _heroBarDuration = 30; // secondes

function _startHeroBar() {
  _heroBarProgress = 0;
  clearInterval(_heroBarInterval);
  _heroBarInterval = setInterval(function() {
    _heroBarProgress += 100 / (_heroBarDuration * 20); // 20fps
    var bar = document.getElementById('lesson-hero-bar-fill');
    if (bar) bar.style.width = Math.min(_heroBarProgress, 100) + '%';
    if (_heroBarProgress >= 100) {
      clearInterval(_heroBarInterval);
      lesson_skipHero();
    }
  }, 50);
}

function lesson_skipHero() {
  clearInterval(_heroBarInterval);
  var heroPanel    = document.querySelector('.lesson-hero-panel');
  var contentPanel = document.getElementById('lesson-content-panel');
  if (heroPanel)    { heroPanel.style.opacity = '0'; setTimeout(function(){ heroPanel.style.display='none'; }, 400); }
  if (contentPanel) { setTimeout(function(){ contentPanel.style.display='block'; window.scrollTo(0,0); }, 420); }
}

// ══════════════════════════════════════════════════════════════
// 6. QUESTIONS D'ÉCHAUFFEMENT
// ══════════════════════════════════════════════════════════════
var _warmupAnswers = [null, null];

function lessonWarmupSelect(qi, oi, correctAnswer) {
  if (_warmupAnswers[qi] !== null) return; // déjà répondu
  _warmupAnswers[qi] = oi;

  var allOpts = document.querySelectorAll('[id^="lwu_'+qi+'_"]');
  allOpts.forEach(function(btn) { btn.disabled = true; });

  var selectedOpt = document.getElementById('lwu_'+qi+'_'+oi);
  var fb          = document.getElementById('lwufb_'+qi);
  var isCorrect   = selectedOpt && selectedOpt.getAttribute('data-val') === correctAnswer;

  if (selectedOpt) selectedOpt.classList.add(isCorrect ? 'lwu-correct' : 'lwu-wrong');

  if (!isCorrect) {
    allOpts.forEach(function(btn) {
      if (btn.getAttribute('data-val') === correctAnswer) btn.classList.add('lwu-correct');
    });
  }

  if (fb) {
    fb.textContent = isCorrect ? '✅ Parfait !' : '❌ La bonne réponse était : ' + correctAnswer;
    fb.className   = 'lesson-warmup-fb ' + (isCorrect ? 'lwu-fb-ok' : 'lwu-fb-ko');
  }

  if (typeof sfxOK === 'function' && isCorrect)  sfxOK();
  if (typeof sfxKO === 'function' && !isCorrect) sfxKO();
}

// ══════════════════════════════════════════════════════════════
// 7. LANCER LE QUIZ
// ══════════════════════════════════════════════════════════════
function lesson_start() {
  clearTimeout(_lesson_timer);
  clearInterval(_heroBarInterval);
  var ov = document.getElementById('lesson-overlay');
  if (ov) {
    ov.style.opacity = '0';
    ov.style.pointerEvents = 'none';
    setTimeout(function(){
      ov.style.display = 'none';
      ov.innerHTML     = '';
      if (_lesson_cb) { _lesson_cb(); _lesson_cb = null; }
    }, 400);
  } else {
    if (_lesson_cb) { _lesson_cb(); _lesson_cb = null; }
  }
}

// ══════════════════════════════════════════════════════════════
// 8. FERMETURE DIRECTE (retour arrière)
// ══════════════════════════════════════════════════════════════
function lesson_close() {
  clearTimeout(_lesson_timer);
  clearInterval(_heroBarInterval);
  var ov = document.getElementById('lesson-overlay');
  if (ov) { ov.style.opacity='0'; ov.style.pointerEvents='none'; setTimeout(function(){ ov.style.display='none'; ov.innerHTML=''; }, 400); }
  _lesson_cb = null;
}

// ══════════════════════════════════════════════════════════════
// 9. PARTICULES CSS (sans library)
// ══════════════════════════════════════════════════════════════
function _spawnParticles(container, type, accent) {
  var count = 18;
  var wrap  = container.querySelector('.lesson-particles') || container;
  for (var i = 0; i < count; i++) {
    (function(idx) {
      var p = document.createElement('div');
      p.className = 'lesson-particle lesson-particle-' + type;
      var x = Math.random() * 100;
      var delay = Math.random() * 4;
      var dur   = 2.5 + Math.random() * 3;
      var size  = 4 + Math.random() * 8;
      p.style.cssText = 'left:'+x+'%;animation-delay:'+delay+'s;animation-duration:'+dur+'s;width:'+size+'px;height:'+size+'px;background:'+accent;
      wrap.appendChild(p);
    })(i);
  }
  // Démarrer la barre héros après un court délai
  setTimeout(_startHeroBar, 500);
}

// ══════════════════════════════════════════════════════════════
// 10. INTÉGRATION — WRAPPERS POUR CHAQUE MONDE
// ══════════════════════════════════════════════════════════════
//
// AUDIT ASSETS (Mars 2026) — règle JS-05 : vérification d'existence avant usage
//
// GRAND BLEU  : bucket grand-bleu → AUDIO uniquement (pas de characters uploadés)
//               → Priorité 1 : charImages[n] (Jikan API, chargé par islands.js)
//               → Priorité 2 : assets/images/avatars/ (locaux dans le repo)
//
// MAGNOLIA    : characters = assets/images/dbz/1.png à 8.png (LOCAUX repo GitHub)
//               → Pas dans Supabase → chemins locaux directs
//
// KANTO       : bucket island-demon-slayer/characters/ (uploadés et confirmés 200)
//               → tanjiro.jpeg, zenitsu.jpeg, inosuke.jpeg, shinobu.png,
//                 kanao.jpeg, tengen.jpeg, rengoku.jpg, mitsuri.jpeg, obanai.jpeg
//
// PAYS DU FEU : bucket island-pays-du-feu/characters/ + /gifs/ (uploadés et confirmés)
//               → sasuke.png, sakura.jpg, "hatake kakashi.jpeg", "gaara .jpg",
//                 "minato .jpg", jiraiya.webp → espaces encodés en %20
//               → île #1 : gifs/naruto%20GIF6.gif (GIF animé)
//               → île #6 : gifs/itachi%20uchiha%20naruto%20GIF.gif
// ══════════════════════════════════════════════════════════════

// ── GRAND BLEU — Français / One Piece ──────────────────────────
// Les characters ne sont PAS dans Supabase grand-bleu.
// On utilise charImages[n] (alimenté par islands.js via Jikan API)
// avec fallback sur les assets locaux du repo.
function lesson_grand_bleu(n, thenCallback) {
  var LOCAL = {
    1: 'assets/images/avatars/luffy.png',
    2: 'assets/images/avatars/nami.png',
    3: 'assets/images/avatars/zoro.png',
    4: 'assets/images/avatars/robin.png',
    5: 'assets/images/avatars/usopp.png',
    6: 'assets/images/avatars/sanji.png',
    7: 'assets/images/avatars/chopper.png',
    8: 'assets/images/avatars/brook.png'
  };
  // Priorité : Jikan (charImages chargé par islands.js) > local fallback
  var avatar = (typeof charImages !== 'undefined' && charImages[n] && charImages[n] !== LOCAL[n])
    ? charImages[n]
    : (LOCAL[n] || 'assets/images/avatars/luffy.png');
  showLesson('grandbleu', n, avatar, '#e63946', thenCallback);
}

// ── MAGNOLIA — Histoire / Dragon Ball Z ────────────────────────
// Assets DBZ = LOCAUX dans le repo (assets/images/dbz/).
// Pas dans Supabase. HIST_AVATARS de quiz-histoire.js est la référence.
function lesson_magnolia(n, thenCallback) {
  // Utiliser HIST_AVATARS si disponible (défini dans quiz-histoire.js)
  var avatar;
  if (typeof HIST_AVATARS !== 'undefined' && HIST_AVATARS[n]) {
    avatar = HIST_AVATARS[n];
  } else {
    var LOCAL_DBZ = {
      1: 'assets/images/dbz/1.png',
      2: 'assets/images/dbz/2.png',
      3: 'assets/images/dbz/3.png',
      4: 'assets/images/dbz/4.png',
      5: 'assets/images/dbz/5.png',
      6: 'assets/images/dbz/6.png',
      7: 'assets/images/dbz/7.png',
      8: 'assets/images/dbz/8.png'
    };
    avatar = LOCAL_DBZ[n] || 'assets/images/dbz/1.png';
  }
  showLesson('magnolia', n, avatar, '#8b5cf6', thenCallback);
}

// ── KANTO — Sciences / Demon Slayer ────────────────────────────
// Tous les characters sont dans Supabase island-demon-slayer/characters/
// Confirmés uploadés. Utiliser KANTO_AVATARS si disponible (quiz-kanto.js).
function lesson_kanto(n, thenCallback) {
  var SUPABASE_DS = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-demon-slayer';
  // Map exact des fichiers uploadés (noms vérifiés)
  var KANTO_MAP = {
    1: SUPABASE_DS + '/characters/tanjiro.jpeg',
    2: SUPABASE_DS + '/characters/zenitsu.jpeg',
    3: SUPABASE_DS + '/characters/inosuke.jpeg',
    4: SUPABASE_DS + '/characters/obanai.jpeg',   // île 4 = obanai (fix appliqué)
    5: SUPABASE_DS + '/characters/kanao.jpeg',
    6: SUPABASE_DS + '/characters/tengen.jpeg',
    7: SUPABASE_DS + '/characters/rengoku.jpg',
    8: SUPABASE_DS + '/characters/mitsuri.jpeg'
  };
  // Priorité : KANTO_AVATARS (quiz-kanto.js) > KANTO_MAP Supabase
  var avatar = (typeof KANTO_AVATARS !== 'undefined' && KANTO_AVATARS[n])
    ? KANTO_AVATARS[n]
    : (KANTO_MAP[n] || KANTO_MAP[1]);
  showLesson('kanto', n, avatar, '#C0392B', thenCallback);
}

// ── PAYS DU FEU — Maths / Naruto ───────────────────────────────
// Characters + GIFs dans Supabase island-pays-du-feu/
// Attention : certains noms ont des espaces → encodés en %20
// PDF_AVATARS de quiz-pays-du-feu.js est la référence.
function lesson_paysdufeu(n, thenCallback) {
  var SUPABASE_PDF = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-pays-du-feu';
  var PDF_MAP = {
    1: SUPABASE_PDF + '/gifs/naruto%20GIF6.gif',           // GIF animé île Naruto
    2: SUPABASE_PDF + '/characters/sasuke.png',
    3: SUPABASE_PDF + '/characters/sakura.jpg',
    4: SUPABASE_PDF + '/characters/hatake%20kakashi.jpeg',  // espace encodé
    5: SUPABASE_PDF + '/characters/gaara%20.jpg',           // espace encodé
    6: SUPABASE_PDF + '/gifs/itachi%20uchiha%20naruto%20GIF.gif',
    7: SUPABASE_PDF + '/characters/minato%20.jpg',          // espace encodé
    8: SUPABASE_PDF + '/characters/jiraiya.webp'
  };
  // Priorité : PDF_AVATARS (quiz-pays-du-feu.js) > PDF_MAP
  var avatar = (typeof PDF_AVATARS !== 'undefined' && PDF_AVATARS[n])
    ? PDF_AVATARS[n]
    : (PDF_MAP[n] || PDF_MAP[2]);
  showLesson('paysdufeu', n, avatar, '#F97316', thenCallback);
}

// ══════════════════════════════════════════════════════════════
// 11. UTILITAIRES
// ══════════════════════════════════════════════════════════════
function _hexDarken(hex, amount) {
  var c = hex.replace('#','');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  var r = Math.max(0, parseInt(c.substr(0,2),16) - Math.round(255*amount));
  var g = Math.max(0, parseInt(c.substr(2,2),16) - Math.round(255*amount));
  var b = Math.max(0, parseInt(c.substr(4,2),16) - Math.round(255*amount));
  return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
}

console.info('📖 lesson.js chargé — 4 mondes × 8 îles × 2 questions échauffement');