// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA-MAGNOLIA.JS — Académie Pirate V2
// 🐉 Magnolia · Histoire · Dragon Ball Z
// 5 niveaux × 8 îles = 40 leçons
// Clés composites : 'cm2_1' … '3eme_8'
// Point d'entrée : window.lesson_magnolia(niveauCode, numeroIle, callback)
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var DBZ = 'assets/images/dbz/';

  // ── Données des leçons ──────────────────────────────────────────
  var LESSONS = {
    // ════════════════════════════════════════════
    // CM2 — Préhistoire & Antiquité
    // ════════════════════════════════════════════
    'cm2_1': {
      hero: 'Goku', heroImg: DBZ+'goku.jpg', color: '#f97316',
      title: '🦴 La Préhistoire',
      slides: [
        { icon:'🦴', title:'Les premiers hommes', color:'#f97316',
          content:'L\'Homo sapiens apparaît en Afrique il y a 300 000 ans. La Préhistoire va de l\'apparition des hominidés jusqu\'à l\'invention de l\'écriture (3300 av. J.-C.).',
          examples:['Paléolithique = nomade, chasse/cueillette','Néolithique = agriculture + sédentarisation','Lascaux : peintures rupestres il y a 17 000 ans'] },
        { icon:'🔥', title:'Les grandes inventions', color:'#ef4444',
          content:'La maîtrise du feu (Homo erectus), la taille du silex (Homo habilis) et l\'agriculture (Néolithique, -8000) transforment l\'humanité.',
          examples:['Homo habilis = premier tailleur d\'outils','Homo erectus = maîtrise le feu','Homo sapiens = nous, apparu il y a 300 000 ans'] }
      ],
      quote: 'Kaméhaméha ! Les premiers Homo sapiens arrivent d\'Afrique. L\'outil change tout !'
    },
    'cm2_2': {
      hero: 'Bulma', heroImg: DBZ+'bulma.jpg', color: '#22c55e',
      title: '✍️ La Mésopotamie',
      slides: [
        { icon:'✍️', title:'L\'écriture cunéiforme', color:'#22c55e',
          content:'Les Sumériens inventent l\'écriture cunéiforme vers 3300 av. J.-C. entre le Tigre et l\'Euphrate (actuel Irak). Cunéiforme = signes en forme de coin.',
          examples:['Sumériens = inventeurs de l\'écriture','Code de Hammurabi = premier code de lois','Ziggurat = temple en pyramide à degrés'] },
        { icon:'🏙️', title:'Premières villes', color:'#3b82f6',
          content:'Ur, Babylone, Ninive : les premières grandes villes naissent en Mésopotamie avec la spécialisation du travail (scribes, prêtres, artisans).',
          examples:['Babylon = capitale de l\'Empire babylonien','Invention de la roue et de la charrue','Système de lois : Code de Hammurabi'] }
      ],
      quote: 'Mon Radar Dragon ? Rien comparé au Radar des Sumériens pour compter leurs moutons !'
    },
    'cm2_3': {
      hero: 'Krilin', heroImg: DBZ+'krilin.jpg', color: '#eab308',
      title: '🔺 L\'Égypte ancienne',
      slides: [
        { icon:'👑', title:'Pharaons & pyramides', color:'#eab308',
          content:'L\'Égypte ancienne dure 3000 ans. Le pharaon est roi et dieu. Les pyramides sont des tombeaux royaux. La pyramide de Khéops date de -2560.',
          examples:['Hiéroglyphes = écriture sacrée','Momification = vie éternelle du corps','Nil = source de vie et de fertilité'] },
        { icon:'🌊', title:'Le don du Nil', color:'#06b6d4',
          content:'Hérodote appelle l\'Égypte « le don du Nil ». Les crues annuelles déposent du limon fertile. Sans le Nil, l\'Égypte serait désert.',
          examples:['Ramsès II = pharaon le plus célèbre','Cléopâtre = dernière pharaonne (-30)','Sphinx de Gizeh = 73 mètres de long'] }
      ],
      quote: 'Mon Destructo-Disque est aussi parfait qu\'une pyramide !'
    },
    'cm2_4': {
      hero: 'Gohan', heroImg: DBZ+'gohan.jpg', color: '#a855f7',
      title: '🏛️ La Grèce antique',
      slides: [
        { icon:'🏛️', title:'La démocratie athénienne', color:'#a855f7',
          content:'Démocratie = demos (peuple) + kratos (pouvoir). Inventée à Athènes au Vème s. av. J.-C. sous Périclès. L\'Agora est le lieu de réunion des citoyens.',
          examples:['Polis = cité-état autonome','Ecclésia = assemblée des citoyens','Parthenon = temple d\'Athéna sur l\'Acropole'] },
        { icon:'🧠', title:'Philosophie & culture', color:'#3b82f6',
          content:'Socrate, Platon, Aristote : les trois grands philosophes. Les JO ont lieu à Olympie depuis 776 av. J.-C. Homère écrit l\'Iliade et l\'Odyssée.',
          examples:['Socrate = je sais que je ne sais rien','Platon = monde des idées','Aristote = logique et sciences'] }
      ],
      quote: 'La connaissance est ma vraie force ! Comme les philosophes grecs !'
    },
    'cm2_5': {
      hero: 'Piccolo', heroImg: DBZ+'piccolo.png', color: '#6366f1',
      title: '🏛️ Rome républicaine',
      slides: [
        { icon:'🏛️', title:'SPQR — La République', color:'#6366f1',
          content:'Rome est fondée en 753 av. J.-C. par Romulus. La République naît en 509 av. J.-C. : deux consuls élus dirigent, le Sénat conseille.',
          examples:['SPQR = Sénat et Peuple Romains','Consul = magistrat élu pour 1 an','Patriciens = aristocrates / Plébéiens = peuple'] },
        { icon:'⚔️', title:'Conquêtes romaines', color:'#ef4444',
          content:'Rome conquiert l\'Italie, puis Carthage (Guerres puniques). Hannibal traverse les Alpes avec des éléphants. César : Veni, vidi, vici.',
          examples:['Guerres puniques = Rome vs Carthage','Via Appia = première grande route','Spartacus = révolte des esclaves (73 av. J.-C.)'] }
      ],
      quote: 'Je surpasserai Kami — comme Rome a surpassé toutes les cités !'
    },
    'cm2_6': {
      hero: 'Trunks', heroImg: DBZ+'trunks.jpg', color: '#f59e0b',
      title: '👑 L\'Empire romain',
      slides: [
        { icon:'👑', title:'Auguste & la Pax Romana', color:'#f59e0b',
          content:'Auguste devient 1er Empereur en 27 av. J.-C. La Pax Romana (27 av. J.-C.-180 ap. J.-C.) : 200 ans de paix. 50 millions d\'habitants.',
          examples:['Colisée = 50 000 places','Aqueducs = transport d\'eau','Édit de Milan 313 = christianisme légalisé'] },
        { icon:'📜', title:'L\'héritage romain', color:'#22c55e',
          content:'Le droit romain inspire nos codes juridiques. L\'Empire se divise en 395. L\'Occident tombe en 476 ap. J.-C.',
          examples:['Pompéi = ensevelie en 79 ap. J.-C.','Édit de Caracalla 212 = citoyenneté à tous','476 = fin de l\'Empire d\'Occident'] }
      ],
      quote: 'Je viens du futur — et j\'ai lu toute l\'histoire de l\'Empire !'
    },
    'cm2_7': {
      hero: 'Android 18', heroImg: DBZ+'android18.jpg', color: '#ec4899',
      title: '✝️ Christianisme',
      slides: [
        { icon:'✝️', title:'Naissance du christianisme', color:'#ec4899',
          content:'Jésus naît en Palestine vers -4. Ses apôtres diffusent son message. En 313, Constantin légalise le christianisme (Édit de Milan). En 380, Théodose en fait la religion d\'État.',
          examples:['Apôtres = 12 disciples de Jésus','Catacombes = réunions secrètes','Pape = évêque de Rome'] },
        { icon:'📖', title:'La Bible', color:'#a855f7',
          content:'La Bible : Ancien Testament (héritage juif) + Nouveau Testament (vie de Jésus + épîtres de Paul). Saint Paul évangélise l\'Empire.',
          examples:['313 = Édit de Milan (tolérance)','380 = Théodose (religion d\'État)','Saint Paul = grands voyages missionnaires'] }
      ],
      quote: 'Une religion qui change l\'Empire entier — fascinant à analyser.'
    },
    'cm2_8': {
      hero: 'Vegeta', heroImg: DBZ+'vegeta.jpg', color: '#ef4444',
      title: '⚔️ Chute de Rome',
      slides: [
        { icon:'⚔️', title:'Les grandes invasions', color:'#ef4444',
          content:'Les peuples germaniques (Wisigoths, Vandales, Francs) et les Huns d\'Attila envahissent l\'Empire. En 410, les Wisigoths pillent Rome. En 476, Odoacre renverse le dernier Empereur.',
          examples:['Attila = le Fléau de Dieu','410 = pillage de Rome par Alaric','476 = fin de l\'Empire d\'Occident'] },
        { icon:'🔰', title:'Nouveau Moyen Âge', color:'#6366f1',
          content:'Clovis, roi des Francs, se convertit vers 496. L\'Empire byzantin survit à l\'est jusqu\'en 1453. Le Moyen Âge commence.',
          examples:['Clovis = roi des Francs converti au christianisme','Byzance survit jusqu\'en 1453','476 = début du Moyen Âge'] }
      ],
      quote: 'Je suis le Prince des Saiyans — Rome aussi avait ses princes barbares !'
    },
    // ════════════════════════════════════════════
    // 6ÈME — L'Antiquité complète
    // ════════════════════════════════════════════
    '6eme_1': {
      hero: 'Goku', heroImg: DBZ+'goku.jpg', color: '#f97316',
      title: '🦴 Origines de l\'humanité',
      slides: [
        { icon:'🦴', title:'Lucy et les hominidés', color:'#f97316',
          content:'Lucy (Australopithèque, -3,2 millions d\'ans) est l\'un des plus anciens fossiles d\'hominidés. Homo habilis taille des outils. Homo erectus maîtrise le feu et quitte l\'Afrique.',
          examples:['Homo habilis = homme habile (-2,4 M)','Homo erectus = premier à quitter l\'Afrique','Homo sapiens = nous, -300 000 ans'] },
        { icon:'🌾', title:'La révolution néolithique', color:'#22c55e',
          content:'Le Néolithique (-8000 av. J.-C.) : invention de l\'agriculture et de l\'élevage → sédentarisation → villages → villes. Art pariétal : Chauvet (-36 000 ans).',
          examples:['Bipédie = marche sur 2 pieds','Mégalithes = dolmens, menhirs (Stonehenge)','Âge du Bronze = alliage cuivre + étain'] }
      ],
      quote: 'J\'ai toujours aimé me battre — comme nos ancêtres préhistoriques !'
    },
    '6eme_2': {
      hero: 'Gohan', heroImg: DBZ+'gohan.jpg', color: '#a855f7',
      title: '🏛️ Grèce & Démocratie',
      slides: [
        { icon:'🏛️', title:'La polis et la démocratie', color:'#a855f7',
          content:'La polis est une cité-état autonome. Clisthène réforme la démocratie en 508 av. J.-C. L\'Ecclésia est l\'assemblée où tous les citoyens votent directement.',
          examples:['Ecclésia = assemblée populaire','Ostracisme = exil pour 10 ans','Stratège = chef militaire élu'] },
        { icon:'⚔️', title:'Guerres médiques', color:'#ef4444',
          content:'490-479 av. J.-C. : la Grèce affronte la Perse. Marathon (490), Thermopyles (480, 300 Spartiates), Salamine (victoire navale). Hérodote = père de l\'histoire.',
          examples:['Marathon = victoire athénienne sur Darios','Thermopyles = 300 Spartiates de Léonidas','Périclès = âge d\'or d\'Athènes'] }
      ],
      quote: 'La connaissance est ma force — Clisthène l\'a su avant moi !'
    },
    '6eme_3': {
      hero: 'Krilin', heroImg: DBZ+'krilin.jpg', color: '#eab308',
      title: '🗡️ Alexandre le Grand',
      slides: [
        { icon:'🗡️', title:'Les conquêtes d\'Alexandre', color:'#eab308',
          content:'Alexandre III de Macédoine conquiert un empire de la Grèce à l\'Inde en 13 ans (336-323 av. J.-C.). Son précepteur est Aristote. Il meurt à Babylone à 32 ans.',
          examples:['Issos (333) = victoire sur Darios III','Alexandrie = grande bibliothèque','Diadoques = généraux qui se partagent l\'empire'] },
        { icon:'🌍', title:'L\'hellénisme', color:'#3b82f6',
          content:'L\'hellénisme est la diffusion de la culture grecque dans le monde conquis. Le koiné (grec commun) devient la langue de culture internationale.',
          examples:['Koiné = grec commun de l\'empire','Phalange macédonienne = lances de 6m','Alexandrie = bibliothèque + phare (7ème merveille)'] }
      ],
      quote: 'Alexandre conquiert tout en 13 ans — presque aussi rapide que moi !'
    },
    '6eme_4': {
      hero: 'Trunks', heroImg: DBZ+'trunks.jpg', color: '#6366f1',
      title: '🏛️ Rome — Fondation',
      slides: [
        { icon:'🏛️', title:'Des origines à la République', color:'#6366f1',
          content:'Rome est fondée en 753 av. J.-C. par Romulus (légende de la Louve). La République naît en 509 av. J.-C. Loi des XII Tables (450) : premières lois écrites publiques.',
          examples:['753 = fondation de Rome','509 = début de la République','Patriciens vs Plébéiens = lutte sociale'] },
        { icon:'⚔️', title:'Guerres puniques', color:'#ef4444',
          content:'3 guerres contre Carthage (264-146). Hannibal traverse les Alpes avec 37 éléphants. Scipion l\'Africain vainc Carthage à Zama (202). Carthage détruite en 146.',
          examples:['Guerres puniques = Rome vs Carthage','Hannibal = éléphants dans les Alpes','Spartacus = révolte d\'esclaves (73-71)'] }
      ],
      quote: 'Je construis pour l\'avenir — comme les fondateurs de Rome !'
    },
    '6eme_5': {
      hero: 'Piccolo', heroImg: DBZ+'piccolo.png', color: '#06b6d4',
      title: '👑 L\'Empire romain',
      slides: [
        { icon:'👑', title:'Mare Nostrum', color:'#06b6d4',
          content:'L\'Empire romain contrôle toute la Méditerranée (Mare Nostrum). La légion est l\'unité militaire de base. Le Limes protège les frontières.',
          examples:['Légion = 5000 soldats','Limes = frontière fortifiée','Mur d\'Hadrien = frontière en Bretagne'] },
        { icon:'🏗️', title:'Société et crises', color:'#22c55e',
          content:'30-35% de la population sont esclaves. L\'Édit de Caracalla (212) donne la citoyenneté à tous les libres. La crise du IIIème siècle : 50 empereurs en 50 ans.',
          examples:['Thermes = bains + vie sociale','Insulae = immeubles populaires','Colisée = 50 000 spectateurs'] }
      ],
      quote: 'Je surveille tout — comme les légions surveille le Limes !'
    },
    '6eme_6': {
      hero: 'Bulma', heroImg: DBZ+'bulma.jpg', color: '#f59e0b',
      title: '✝️ Christianisme & Empire',
      slides: [
        { icon:'✝️', title:'Monothéisme et Empire', color:'#f59e0b',
          content:'Le christianisme : monothéiste, fondé par Jésus en Palestine. 313 : Édit de Milan (tolérance). 380 : Théodose fait du christianisme la religion d\'État. Concile de Nicée 325 = Trinité.',
          examples:['Arianisme = hérésie condamnée à Nicée','Vulgate = Bible en latin par Jérôme','Pape = évêque de Rome successeur de Pierre'] },
        { icon:'📖', title:'Division et héritage', color:'#a855f7',
          content:'Constantin fonde Constantinople (330). Le Schisme de 1054 sépare catholiques et orthodoxes. Saint Augustin écrit Les Confessions et La Cité de Dieu.',
          examples:['Constantinople = nouvelle capitale orientale','1054 = Grand Schisme (catholiques/orthodoxes)','Saint Paul = épîtres aux premières communautés'] }
      ],
      quote: 'J\'analyse la transformation de l\'Empire par une seule religion !'
    },
    '6eme_7': {
      hero: 'Android 17', heroImg: DBZ+'android17.jpg', color: '#22c55e',
      title: '⚔️ Royaumes barbares',
      slides: [
        { icon:'⚔️', title:'Les royaumes germaniques', color:'#22c55e',
          content:'Après 476, les royaumes germaniques remplacent Rome en Occident. Wisigoths → Espagne. Vandales → Afrique. Francs → Gaule (future France). Ostrogoths → Italie.',
          examples:['Clovis = roi des Francs, baptisé ~496','Théodoric = roi des Ostrogoths d\'Italie','Vandales → « vandalisme »'] },
        { icon:'🌙', title:'Islam & Byzance', color:'#3b82f6',
          content:'L\'Empire byzantin survit à l\'est jusqu\'en 1453. Dès 634, l\'islam arabe conquiert Syrie, Palestine, Égypte. Charles Martel arrête l\'expansion à Poitiers (732).',
          examples:['Byzance = Empire romain d\'Orient (-476 à 1453)','Poitiers 732 = arrêt de l\'expansion arabe','Latin → langues romanes (français, espagnol...)'] }
      ],
      quote: 'Je résiste — comme les peuples germaniques face à l\'Empire !'
    },
    '6eme_8': {
      hero: 'Vegeta', heroImg: DBZ+'vegeta.jpg', color: '#ef4444',
      title: '📚 Bilan Antiquité',
      slides: [
        { icon:'📚', title:'Synthèse de l\'Antiquité', color:'#ef4444',
          content:'L\'Antiquité : de l\'écriture sumérienne (3300 av. J.-C.) à la chute de Rome (476 ap. J.-C.). Grèce = démocratie + philosophie. Rome = droit + organisation. Orient = monothéisme.',
          examples:['Phéniciens = inventeurs de l\'alphabet','Route de la Soie = Chine ↔ Rome','Papyrus (Égypte) → parchemin → papier'] },
        { icon:'🌍', title:'Héritages durables', color:'#22c55e',
          content:'Les langues romanes viennent du latin. La démocratie vient de la Grèce. Le droit romain inspire nos codes. Les religions abrahamiques viennent du Proche-Orient.',
          examples:['Acropole + Capitole = collines sacrées','Agora + Forum = lieux politiques','Pax Romana + âge d\'or de Périclès = apogées'] }
      ],
      quote: 'Je suis le plus fort — l\'Antiquité aussi était la plus forte de son époque !'
    },
    // ════════════════════════════════════════════
    // 5ÈME — Le Moyen Âge
    // ════════════════════════════════════════════
    '5eme_1': {
      hero: 'Goku', heroImg: DBZ+'goku.jpg', color: '#f97316',
      title: '🌙 L\'islam',
      slides: [
        { icon:'🌙', title:'Naissance de l\'islam', color:'#f97316',
          content:'Mahomet naît à La Mecque (570). L\'Hégire (622) = départ vers Médine, début du calendrier musulman. Le Coran est le texte sacré. Les 5 piliers : foi, prière, aumône, jeûne, pèlerinage.',
          examples:['Calife = successeur de Mahomet','Mosquée = lieu de prosternation','Ramadan = mois de jeûne'] },
        { icon:'🌍', title:'Expansion et civilisation', color:'#22c55e',
          content:'732 : Charles Martel arrête l\'expansion arabe à Poitiers. Al-Andalus = Espagne musulmane (711-1492). Avicenne et Al-Khawarizmi (algèbre) : savants arabes majeurs.',
          examples:['Calife omeyyade → capitale Damas','Reconquista = reconquête de l\'Espagne','Algèbre = Al-jabr en arabe'] }
      ],
      quote: 'En 622, Mahomet quitte La Mecque — moi j\'ai quitté le Mont Paozu !'
    },
    '5eme_2': {
      hero: 'Vegeta', heroImg: DBZ+'vegeta.jpg', color: '#22c55e',
      title: '👑 Charlemagne',
      slides: [
        { icon:'👑', title:'L\'Empire carolingien', color:'#22c55e',
          content:'Charlemagne est couronné Empereur le 25 déc. 800 à Rome par le pape. Capitale : Aix-la-Chapelle. Il réforme l\'administration avec les comtes et les missi dominici.',
          examples:['Missi dominici = inspecteurs royaux','Écriture caroline = notre écriture actuelle','Traité de Verdun 843 = France/Lotharingie/Allemagne'] },
        { icon:'📚', title:'La renaissance carolingienne', color:'#3b82f6',
          content:'Charlemagne crée des écoles dans les monastères. L\'écriture caroline standardise l\'écriture. La Chanson de Roland raconte la mort de son neveu à Roncevaux (778).',
          examples:['Pépin le Bref = père de Charlemagne','États pontificaux = don de Pépin au pape','Roland = mort à Roncevaux en 778'] }
      ],
      quote: 'Je règne sur tout l\'empire — comme Charlemagne à son apogée !'
    },
    '5eme_3': {
      hero: 'Trunks', heroImg: DBZ+'trunks.jpg', color: '#8b5cf6',
      title: '🏰 La féodalité',
      slides: [
        { icon:'🏰', title:'Seigneurs et vassaux', color:'#8b5cf6',
          content:'L\'hommage vassalique : le vassal jure fidélité et reçoit un fief. Les serfs sont attachés à la terre. La pyramide : serf → chevalier → baron → seigneur → roi.',
          examples:['Fief = terre accordée en échange de services','Serf = attaché à la terre du seigneur','Corvée = travail gratuit pour le seigneur'] },
        { icon:'⚔️', title:'La chevalerie', color:'#ef4444',
          content:'Le code chevaleresque : prouesse, loyauté, foi, protection des faibles. L\'adoubement fait d\'un écuyer un chevalier. Le château fort protège seigneur et paysans.',
          examples:['Adoubement = cérémonie du chevalier','Magna Carta 1215 = limite le pouvoir royal','Suzerain = seigneur des seigneurs'] }
      ],
      quote: 'Je jure fidélité — mais je reste toujours libre comme un guerrier !'
    },
    '5eme_4': {
      hero: 'Gohan', heroImg: DBZ+'gohan.jpg', color: '#eab308',
      title: '⛪ L\'Église',
      slides: [
        { icon:'⛪', title:'L\'Église médiévale', color:'#eab308',
          content:'L\'Église structure toute la société. La dîme = 10% des revenus. L\'excommunication = exclusion de l\'Église. Le schisme de 1054 sépare catholiques et orthodoxes.',
          examples:['Querelle des Investitures = pape vs Empereur','Concordat de Worms 1122 = accord final','Cluny = abbaye réformatrice fondée en 910'] },
        { icon:'🏗️', title:'Art gothique & scolastique', color:'#a855f7',
          content:'La cathédrale gothique : arcs-boutants, rosaces, voûtes en ogive. Thomas d\'Aquin concilie foi et raison (Aristote). Les ordres mendiants (Franciscains, Dominicains) prêchent.',
          examples:['Gothique = arcs-boutants + grandes fenêtres','Thomas d\'Aquin = foi + raison','Inquisition = tribunal contre les hérétiques'] }
      ],
      quote: 'La foi et la connaissance — Thomas d\'Aquin avait compris l\'essentiel !'
    },
    '5eme_5': {
      hero: 'Piccolo', heroImg: DBZ+'piccolo.png', color: '#6366f1',
      title: '✝️ Les croisades',
      slides: [
        { icon:'✝️', title:'Libérer Jérusalem', color:'#6366f1',
          content:'1095 : Urbain II lance la 1ère croisade à Clermont. 1099 : prise de Jérusalem. 1187 : Saladin reprend Jérusalem. 1291 : chute d\'Acre = fin des croisades.',
          examples:['Templiers + Hospitaliers = ordres militaires','Richard Cœur de Lion = 3ème croisade','4ème croisade = pillage de Constantinople (1204)'] },
        { icon:'🗺️', title:'États latins & impact', color:'#f59e0b',
          content:'Les croisés fondent le royaume de Jérusalem. Les échanges culturels s\'intensifient entre Orient et Occident. Pèlerinages majeurs : Rome, Jérusalem, Saint-Jacques.',
          examples:['Indulgence = rémission des péchés','Templiers = banquiers + soldats','Saladin = sultan ayyoubide qui reprend Jérusalem'] }
      ],
      quote: 'Je pars en croisade pour la justice — mais sans violence inutile !'
    },
    '5eme_6': {
      hero: 'Android 18', heroImg: DBZ+'android18.jpg', color: '#ec4899',
      title: '☠️ La Peste noire',
      slides: [
        { icon:'☠️', title:'La grande épidémie', color:'#ec4899',
          content:'1347 : la Peste noire arrive en Europe. Elle tue 1/3 à 1/2 de la population en 4 ans. Transmise par les puces des rats noirs. Les Flagellants se fouettent pour expier.',
          examples:['Peste bubonique = puces de rats','Danse macabre = art montrant la mort','Grande Famine 1315-1322 précède la peste'] },
        { icon:'⚡', title:'Crises du XIVème siècle', color:'#f59e0b',
          content:'La Jacquerie (1358) : révolte paysanne. Grand Schisme d\'Occident (1378-1417) : deux papes. Les survivants négocient de meilleures conditions grâce à la pénurie de main-d\'œuvre.',
          examples:['Jacquerie = révolte paysanne (1358)','Grand Schisme = 2 papes (Rome/Avignon)','Avignon = papes français (1309-1377)'] }
      ],
      quote: 'La Peste noire — je dois analyser pour mieux combattre !'
    },
    '5eme_7': {
      hero: 'Krilin', heroImg: DBZ+'krilin.jpg', color: '#f59e0b',
      title: '⚔️ Guerre de Cent Ans',
      slides: [
        { icon:'⚔️', title:'France contre Angleterre', color:'#f59e0b',
          content:'1337-1453 : Guerre de Cent Ans entre France et Angleterre. Cause : Édouard III revendique le trône de France. Azincourt (1415) : désastre français face aux archers anglais.',
          examples:['Traité de Troyes 1420 = héritier anglais','Jeanne d\'Arc = libère Orléans (1429)','Fin 1453 = Castillon, France libérée'] },
        { icon:'⭐', title:'Jeanne d\'Arc', color:'#ef4444',
          content:'Jeanne d\'Arc (née à Domrémy-la-Pucelle) entend des voix, lève le siège d\'Orléans (1429), fait sacrer Charles VII à Reims. Brûlée à Rouen (30 mai 1431). Canonisée en 1920.',
          examples:['Siège d\'Orléans levé (1429)','Sacre de Reims = légitimité royale','1431 = brûlée vive à Rouen'] }
      ],
      quote: 'Krilin résiste jusqu\'au bout — comme Jeanne d\'Arc à Orléans !'
    },
    '5eme_8': {
      hero: 'Goten', heroImg: DBZ+'goten.jpg', color: '#ef4444',
      title: '🌅 Fin du Moyen Âge',
      slides: [
        { icon:'🌅', title:'1453 : tournant historique', color:'#ef4444',
          content:'1453 : chute de Constantinople (Ottomans de Mehmed II) + fin de la Guerre de Cent Ans. 1450 : imprimerie de Gutenberg. 1492 : Colomb atteint les Amériques + fin de la Reconquista.',
          examples:['Ottoman = empire turc musulman','Gutenberg = livres en grande quantité','Reconquista = reconquête de l\'Espagne (711-1492)'] },
        { icon:'🌍', title:'Vers la Renaissance', color:'#a855f7',
          content:'Le Moyen Âge dure ~1000 ans (476-1453). L\'humanisme naît (Pétrarque, Érasme). Boussole, astrolabe et caravelle permettent les grandes explorations.',
          examples:['Marco Polo = voyages en Chine (1271-1295)','Caravelle = navire d\'exploration','Humanisme = l\'homme au centre de la pensée'] }
      ],
      quote: 'Goten est prêt pour la Renaissance — comme l\'Europe en 1453 !'
    },
    // ════════════════════════════════════════════
    // 4ÈME — Temps Modernes & Révolution
    // ════════════════════════════════════════════
    '4eme_1': {
      hero: 'Goku', heroImg: DBZ+'goku.jpg', color: '#f97316',
      title: '🎨 La Renaissance',
      slides: [
        { icon:'🎨', title:'Art et humanisme', color:'#f97316',
          content:'La Renaissance (XVème-XVIème s.) naît en Italie (Florence, Médicis). Léonard de Vinci (Joconde), Michel-Ange (chapelle Sixtine + David), Raphaël (École d\'Athènes). Perspective : illusion de profondeur.',
          examples:['Humanisme = l\'homme au centre','Médicis = mécènes florentins','Copernic (1543) = héliocentrisme'] },
        { icon:'🔬', title:'Révolution scientifique', color:'#3b82f6',
          content:'Copernic (1543) : la Terre tourne autour du Soleil. Galilée confirme et est condamné par l\'Inquisition (1633). Gutenberg (1450) : imprimerie → diffusion des idées.',
          examples:['Galilée = télescope + condamné en 1633','Vinci = peintre + ingénieur + scientifique','Imprimerie = révolution de l\'information'] }
      ],
      quote: 'Goku s\'éveille à la Renaissance — l\'art renaît comme après une bataille !'
    },
    '4eme_2': {
      hero: 'Bulma', heroImg: DBZ+'bulma.jpg', color: '#22c55e',
      title: '🌍 Les Grandes Découvertes',
      slides: [
        { icon:'🌍', title:'Explorer le monde', color:'#22c55e',
          content:'1492 : Colomb atteint les Amériques (financé par l\'Espagne). 1498 : Vasco de Gama ouvre la route des Indes. 1522 : Magellan = premier tour du monde. Traité de Tordesillas (1494) : Espagne + Portugal se partagent le monde.',
          examples:['Caravelle = navire d\'exploration','Boussole + astrolabe = navigation','Hernán Cortés = conquête des Aztèques (1519-1521)'] },
        { icon:'⚠️', title:'Conquêtes et traite', color:'#ef4444',
          content:'Les conquistadors vainquent Aztèques (Cortés) et Incas (Pizarro) grâce aux armes et aux épidémies. La traite atlantique déporte des millions d\'Africains vers les Amériques.',
          examples:['Las Casas = défend les Amérindiens','Traite = commerce triangulaire','−90% de la population amérindienne'] }
      ],
      quote: 'Mon Radar Dragon trouve tout — Colomb avait juste une boussole !'
    },
    '4eme_3': {
      hero: 'Gohan', heroImg: DBZ+'gohan.jpg', color: '#a855f7',
      title: '✝️ La Réforme',
      slides: [
        { icon:'✝️', title:'Luther et le protestantisme', color:'#a855f7',
          content:'1517 : Luther affiche ses 95 thèses à Wittenberg. Il critique les indulgences. Traduit la Bible en allemand. Doctrine : sola fide (foi seule) + sola scriptura (Bible seule).',
          examples:['Luthéranisme = Allemagne','Calvinisme = Genève (Calvin)','Anglicanisme = Henri VIII (divorce)'] },
        { icon:'⚔️', title:'Guerres de religion', color:'#ef4444',
          content:'Contre-Réforme catholique : concile de Trente (1545-1563) + Jésuites (1540). En France : 8 guerres de religion (1562-1598). Saint-Barthélemy (1572) = massacre huguenots. Édit de Nantes (1598) = paix.',
          examples:['Édit de Nantes 1598 = tolérance religieuse','Prédestination = Calvin (Dieu choisit à l\'avance)','Inquisition espagnole = tribunal anti-hérétiques'] }
      ],
      quote: 'Gohan remet tout en question — comme Luther en 1517 !'
    },
    '4eme_4': {
      hero: 'Vegeta', heroImg: DBZ+'vegeta.jpg', color: '#eab308',
      title: '👑 Louis XIV',
      slides: [
        { icon:'👑', title:'Le Roi Soleil', color:'#eab308',
          content:'Louis XIV règne 72 ans (1643-1715). « L\'État c\'est moi ». Versailles : symbole du pouvoir absolu et outil pour domestiquer la noblesse. Colbert : mercantilisme + manufactures.',
          examples:['Droit divin = pouvoir donné par Dieu','Révocation Édit de Nantes 1685 = exode huguenot','Fronde (1648-1653) = révolte traumatisante'] },
        { icon:'📜', title:'L\'absolutisme', color:'#6366f1',
          content:'Bossuet théorise le droit divin. Les intendants administrent les provinces. La Fronde (1648-1653) traumatise le jeune Louis. Rivaux : Habsbourgs d\'Autriche.',
          examples:['Intendants = représentants royaux en province','Louis XIV = plus long règne de l\'histoire de France','Versailles = noblesse surveillée + fêtes']  }
      ],
      quote: 'L\'État c\'est moi — Vegeta comprend cette mentalité !'
    },
    '4eme_5': {
      hero: 'Trunks', heroImg: DBZ+'trunks.jpg', color: '#3b82f6',
      title: '💡 Les Lumières',
      slides: [
        { icon:'💡', title:'Philosophes des Lumières', color:'#3b82f6',
          content:'Voltaire : tolérance + critique du fanatisme. Montesquieu : séparation des 3 pouvoirs (De l\'esprit des lois). Rousseau : souveraineté du peuple (Contrat social). Diderot + d\'Alembert : Encyclopédie (1751-1772).',
          examples:['Séparation des pouvoirs = législatif/exécutif/judiciaire','Locke = vie + liberté + propriété','Kant = Sapere aude (ose penser)'] },
        { icon:'🌍', title:'Révolutions inspirées', color:'#22c55e',
          content:'1776 : Déclaration d\'indépendance américaine (Jefferson, inspiré par Locke, Montesquieu, Rousseau). 1789 : Révolution française. Despotisme éclairé : Frédéric II de Prusse.',
          examples:['Déisme = Dieu créateur non interventionniste','Encyclopédie = 28 volumes de savoirs','Déspotisme éclairé = monarchie + idées Lumières'] }
      ],
      quote: 'Trunks pense par lui-même — Kant aurait approuvé : Sapere aude !'
    },
    '4eme_6': {
      hero: 'Piccolo', heroImg: DBZ+'piccolo.png', color: '#ef4444',
      title: '🔴 Révolution française',
      slides: [
        { icon:'🔴', title:'1789 : la rupture', color:'#ef4444',
          content:'14 juillet 1789 : prise de la Bastille. 4 août 1789 : nuit des privilèges abolis. 26 août 1789 : DDHC = droits naturels universels. 3 ordres : clergé (1er), noblesse (2ème), Tiers État (3ème, 97%).',
          examples:['DDHC = liberté, égalité, propriété, sûreté','Constitution 1791 = monarchie constitutionnelle','21 janv. 1793 = exécution de Louis XVI'] },
        { icon:'☠️', title:'La Terreur et le Directoire', color:'#6366f1',
          content:'La Terreur (1793-1794) : Robespierre + Comité de salut public = 40 000 guillotinés. 9 Thermidor (27 juill. 1794) : chute de Robespierre. Le Directoire (1795-1799) précède Napoléon.',
          examples:['Marseillaise = composée le 25 avril 1792','Nuit du 4 août = abolition des privilèges','Directoire = 5 directeurs instables'] }
      ],
      quote: 'La révolution éclate — Piccolo se soulève pour la justice !'
    },
    '4eme_7': {
      hero: 'Android 17', heroImg: DBZ+'android17.jpg', color: '#6366f1',
      title: '⚔️ Napoléon',
      slides: [
        { icon:'⚔️', title:'L\'Empire napoléonien', color:'#6366f1',
          content:'Napoléon couronné Empereur le 2 déc. 1804. Code civil (1804) = droit unifié. Austerlitz (1805) = sa plus grande victoire. Blocus continental (1806) = affaiblir l\'Angleterre.',
          examples:['Code civil = héritage majeur','Légion d\'honneur = mérite, non naissance','Concordat 1801 = accord avec le pape'] },
        { icon:'🌡️', title:'Chute de l\'Empire', color:'#ef4444',
          content:'Campagne de Russie (1812) : 500 000 soldats morts dans le froid. Waterloo (18 juin 1815) = défaite finale. Exil à Sainte-Hélène. Congrès de Vienne (1815) = restauration monarchique.',
          examples:['Cent-Jours = retour avant Waterloo','Sainte-Hélène = exil final (1815-1821)','Congrès de Vienne = redécoupage de l\'Europe'] }
      ],
      quote: 'Android 17 conquiert — mais même Napoléon finit à Sainte-Hélène !'
    },
    '4eme_8': {
      hero: 'Krilin', heroImg: DBZ+'krilin.jpg', color: '#ec4899',
      title: '📚 Bilan 4ème',
      slides: [
        { icon:'📚', title:'Temps Modernes (1453-1789)', color:'#ec4899',
          content:'Renaissance (art + science) → Réforme (religion) → Grandes Découvertes (monde) → Absolutisme (Louis XIV) → Lumières (philosophie) → Révolution (1789).',
          examples:['1492 = fin Reconquista + Amériques + expulsion Juifs Espagne','1789 = DDHC = droits universels','1804 = Code civil = droit unifié'] },
        { icon:'🔴', title:'Héritage révolutionnaire', color:'#ef4444',
          content:'Liberté – Égalité – Fraternité = devise républicaine. Séparation des pouvoirs. Souveraineté nationale. Napoléon conserve l\'égalité civile mais concentre le pouvoir.',
          examples:['Luther/Calvin/Henri VIII = 3 protestantismes','Montesquieu = 3 pouvoirs séparés','Napoléon = héritier + trahisseur de la Révolution'] }
      ],
      quote: 'Krilin synthétise 400 ans d\'histoire pour le Brevet !'
    },
    // ════════════════════════════════════════════
    // 3ÈME — Époque contemporaine & Brevet
    // ════════════════════════════════════════════
    '3eme_1': {
      hero: 'Goku', heroImg: DBZ+'goku.jpg', color: '#f97316',
      title: '🏭 Révolution industrielle',
      slides: [
        { icon:'🏭', title:'L\'industrialisation', color:'#f97316',
          content:'La Révolution industrielle commence en Angleterre (~1760). James Watt perfectionne la machine à vapeur. Exode rural : les paysans vont travailler dans les usines des villes.',
          examples:['Prolétariat = ouvriers salariés','Taylorisme = travail à la chaîne chronométré','Commune de Paris 1871 = 72 jours, réprimée dans le sang'] },
        { icon:'📜', title:'Luttes sociales', color:'#22c55e',
          content:'Marx et Engels : Manifeste (1848) = lutte des classes. Loi de 1884 : syndicats légalisés. La Belle Époque (1890-1914) : optimisme technologique (auto, cinéma, avion). IIIème République (1875).',
          examples:['Émile Zola = Germinal (condition ouvrière)','Grève = arme ouvrière légalisée en 1884','IIIème République = 1875, dure jusqu\'en 1940'] }
      ],
      quote: 'Goku travaille dur — comme les ouvriers de la Révolution industrielle !'
    },
    '3eme_2': {
      hero: 'Vegeta', heroImg: DBZ+'vegeta.jpg', color: '#22c55e',
      title: '🌍 Impérialisme colonial',
      slides: [
        { icon:'🌍', title:'Le partage du monde', color:'#22c55e',
          content:'Conférence de Berlin (1884-1885) : partage de l\'Afrique. Jules Ferry : colonisation (Indochine, Tunisie) + école laïque. Racisme scientifique = fausse justification.',
          examples:['Léopold II = Congo belge (brutalité extrême)','Algérie française = 1830-1962','Canal de Suez 1869 = route vers l\'Asie raccourcie'] },
        { icon:'⚔️', title:'Résistances', color:'#ef4444',
          content:'Résistances africaines : Samori Touré, Abdelkader, Menelik II (Éthiopie). Japon ère Meiji (1868) : modernisation pour résister. Guerres de l\'opium → affaiblissement de la Chine.',
          examples:['Gandhi = non-violence (ahimsa)','Apartheid = ségrégation raciale en Afrique du Sud','Ère Meiji = modernisation du Japon'] }
      ],
      quote: 'Vegeta domine — mais la résistance des colonisés est légitime !'
    },
    '3eme_3': {
      hero: 'Gohan', heroImg: DBZ+'gohan.jpg', color: '#ef4444',
      title: '⚔️ Première Guerre mondiale',
      slides: [
        { icon:'⚔️', title:'La Grande Guerre (1914-1918)', color:'#ef4444',
          content:'28 juin 1914 : attentat de Sarajevo (François-Ferdinand). Deux camps : Alliés (France, UK, Russie, USA en 1917) vs Empires centraux (Allemagne, Autriche-Hongrie, Ottomans).',
          examples:['Verdun (1916) = 300 000 morts pour résultat nul','Tranchées = guerre de position','Génocide arménien 1915 = premier génocide du XXème s.'] },
        { icon:'📜', title:'Bilan et Versailles', color:'#6366f1',
          content:'11 novembre 1918 : armistice. Traité de Versailles (1919) : Allemagne humiliée (réparations + clause de responsabilité). SDN créée. Révolution russe d\'octobre 1917 : Lénine.',
          examples:['18-20 millions de morts total','Traité de Versailles = germe de la WWII','SDN = ancêtre de l\'ONU (inefficace)'] }
      ],
      quote: 'Gohan combat pour ses amis — comme les soldats de 14-18 !'
    },
    '3eme_4': {
      hero: 'Piccolo', heroImg: DBZ+'piccolo.png', color: '#6366f1',
      title: '🔴 Totalitarismes',
      slides: [
        { icon:'🔴', title:'Les régimes totalitaires', color:'#6366f1',
          content:'1922 : Mussolini (fascisme, Italie). 1933 : Hitler (nazisme, Allemagne). URSS : Staline (communisme totalitaire). 1929 : krach de Wall Street → Grande Dépression → chômage massif.',
          examples:['Nuit de Cristal 9-10 nov. 1938 = pogrom antisémite','Lois de Nuremberg 1935 = exclusion des Juifs','Goulag = camps de travail soviétiques'] },
        { icon:'📜', title:'Vers la guerre', color:'#ef4444',
          content:'Munich (1938) : appaisement = erreur. Anschluss (mars 1938) = annexion de l\'Autriche. Pacte germano-soviétique (août 1939) = partage secret de la Pologne. Front populaire (1936) : congés payés.',
          examples:['Propagande nazie = cinéma + radio + affiches','Pacte Ribbentrop-Molotov = non-agression','Front populaire = 40h + congés payés'] }
      ],
      quote: 'Piccolo résiste aux dictatures — la démocratie doit être défendue !'
    },
    '3eme_5': {
      hero: 'Trunks', heroImg: DBZ+'trunks.jpg', color: '#8b5cf6',
      title: '⚔️ Seconde Guerre mondiale',
      slides: [
        { icon:'⚔️', title:'1939-1945', color:'#8b5cf6',
          content:'La Shoah : génocide industriel de 6 millions de Juifs. Wannsee (janv. 1942) : planification de la solution finale. D-Day : 6 juin 1944, débarquement en Normandie. Vichy = collaboration.',
          examples:['Stalingrad (1942-43) = tournant à l\'est','Jean Moulin = CNR unifié (1943)','Hiroshima + Nagasaki (août 1945) = bombes atomiques'] },
        { icon:'📜', title:'Fin et bilan', color:'#22c55e',
          content:'8 mai 1945 : capitulation allemande. 2 sept. 1945 : capitulation japonaise. Procès de Nuremberg (1945-1946) : crimes contre l\'humanité. 50-70 millions de morts : bilan le plus meurtrier.',
          examples:['Résistance française = FFI + gaullistes','Hiroshima = 140 000 morts immédiats','Nuremberg = naissance du droit pénal international'] }
      ],
      quote: 'Trunks vient du futur pour empêcher la catastrophe — comme la Résistance !'
    },
    '3eme_6': {
      hero: 'Android 18', heroImg: DBZ+'android18.jpg', color: '#ec4899',
      title: '🌡️ Guerre froide',
      slides: [
        { icon:'🌡️', title:'USA vs URSS (1947-1991)', color:'#ec4899',
          content:'Guerre froide = rivalité USA (capitalisme) vs URSS (communisme) sans affrontement direct. Plan Marshall (1947). Doctrine Truman. OTAN (1949) vs Pacte de Varsovie.',
          examples:['Mur de Berlin = construit 13 août 1961','Crise de Cuba 1962 = 13 jours de terreur nucléaire','Spoutnik 1957 + Gagarine 1961 = URSS en avance'] },
        { icon:'🌍', title:'Fin de la Guerre froide', color:'#3b82f6',
          content:'Glasnost + Perestroïka de Gorbatchev (1985) → libéralisation → effondrement. Mur de Berlin tombe le 9 nov. 1989. URSS dissoute le 25 déc. 1991. Réunification allemande : 3 oct. 1990.',
          examples:['Guerre du Vietnam = guerre par procuration','Déstalinisation = Khrouchtchev au XXème congrès (1956)','Guerre froide = 1947-1991'] }
      ],
      quote: 'Android 18 choisit son camp — comme l\'Europe pendant la Guerre froide !'
    },
    '3eme_7': {
      hero: 'Bulma', heroImg: DBZ+'bulma.jpg', color: '#f59e0b',
      title: '🌍 Décolonisation',
      slides: [
        { icon:'🌍', title:'Accès à l\'indépendance', color:'#f59e0b',
          content:'Après 1945 : grandes vagues de décolonisation. Inde (1947, Gandhi). 1960 = année de l\'Afrique (17 indépendances). Guerre d\'Algérie (1954-1962) → accords d\'Évian.',
          examples:['Gandhi = non-violence + ahimsa','Ho Chi Minh = indépendance du Vietnam','Mandela = anti-apartheid + président 1994'] },
        { icon:'🏛️', title:'Ve République & Europe', color:'#22c55e',
          content:'1958 : De Gaulle fonde la Ve République (semi-présidentielle). 1962 : élection du président au suffrage universel. Mai 68 : mouvement social majeur. CECA (1951) + traité de Rome (1957) = Europe.',
          examples:['Accords d\'Évian 1962 = indépendance algérienne','Mai 68 = 10 millions de grévistes','Traité de Rome 1957 = CEE → ancêtre UE'] }
      ],
      quote: 'Bulma construit le futur — comme les nations décolonisées !'
    },
    '3eme_8': {
      hero: 'Goten', heroImg: DBZ+'goten.jpg', color: '#06b6d4',
      title: '🌐 Monde contemporain',
      slides: [
        { icon:'🌐', title:'L\'ONU et les droits', color:'#06b6d4',
          content:'ONU fondée en 1945 (24 octobre). DUDH adoptée le 10 déc. 1948. Traité de Maastricht (1992) : Union européenne + euro. Euro en circulation : 1er janvier 2002.',
          examples:['P5 = USA, UK, France, Russie, Chine (droit de veto)','DUDH = droits fondamentaux universels','Réunification allemande = 3 oct. 1990'] },
        { icon:'🌡️', title:'Enjeux contemporains', color:'#ef4444',
          content:'11 sept. 2001 : attentats Al-Qaïda → guerre contre le terrorisme. Mondialisation = interdépendance économique et culturelle. Réchauffement climatique : accord de Paris (2015) → limiter à 1,5°C.',
          examples:['Accord de Paris 2015 = 195 pays','Mondialisation = libre-échange + internet + migrations','Euro = monnaie unique depuis 2002'] }
      ],
      quote: 'Goten est prêt pour le Brevet — l\'histoire du monde contemporain n\'a plus de secrets !'
    }
  };

  // ── Moteur de leçon ─────────────────────────────────────────────
  function lesson_magnolia(niveauCode, numeroIle, callback) {
    var key = niveauCode + '_' + numeroIle;
    var data = LESSONS[key];
    if (!data) {
      console.warn('[lesson-magnolia] Leçon introuvable :', key);
      if (callback) callback();
      return;
    }
    _showLesson(data, callback);
  }

  function _showLesson(data, callback) {
    var overlay = document.getElementById('lesson-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'lesson-overlay';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9000;display:flex;align-items:center;' +
        'justify-content:center;background:rgba(0,0,0,.92);padding:16px;';
      document.body.appendChild(overlay);
    }

    var slidesHtml = (data.slides || []).map(function(s) {
      return '<div class="lesson-slide" style="border-left:4px solid '+s.color+';padding:12px 16px;margin:12px 0;' +
        'background:rgba(255,255,255,.05);border-radius:8px;">' +
        '<div style="font-size:1.4rem;margin-bottom:4px">'+s.icon+' <strong style="color:'+s.color+'">'+s.title+'</strong></div>' +
        '<div style="font-family:Nunito,sans-serif;font-size:.88rem;color:rgba(255,255,255,.85);line-height:1.5;margin-bottom:8px">'+s.content+'</div>' +
        '<ul style="list-style:none;padding:0;margin:0">' +
        (s.examples || []).map(function(ex){
          return '<li style="font-family:Nunito,sans-serif;font-size:.78rem;color:'+s.color+';padding:2px 0">▸ '+ex+'</li>';
        }).join('') +
        '</ul></div>';
    }).join('');

    overlay.innerHTML =
      '<div style="background:#111;border-radius:20px;max-width:560px;width:100%;' +
      'max-height:90vh;overflow-y:auto;padding:20px;box-shadow:0 0 40px '+data.color+'44;' +
      'border:2px solid '+data.color+'66;">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
          '<img src="'+data.heroImg+'" style="height:70px;object-fit:cover;border-radius:10px;' +
            'border:2px solid '+data.color+'" onerror="this.style.display=\'none\'">' +
          '<div>' +
            '<div style="font-family:Bangers,cursive;font-size:1.6rem;color:'+data.color+';letter-spacing:2px">'+data.title+'</div>' +
            '<div style="font-family:Nunito,sans-serif;font-size:.8rem;font-weight:800;' +
              'color:rgba(255,255,255,.5)">'+(data.hero||'')+'</div>' +
          '</div>' +
        '</div>' +
        '<div style="font-family:Nunito,sans-serif;font-size:.85rem;font-weight:800;' +
          'color:rgba(255,255,255,.7);font-style:italic;margin-bottom:10px;' +
          'border-bottom:1px solid rgba(255,255,255,.15);padding-bottom:10px">' +
          '"'+(data.quote||'')+'"' +
        '</div>' +
        slidesHtml +
        '<button onclick="window._magnoliaLessonDone()" style="width:100%;margin-top:16px;' +
          'padding:12px;background:'+data.color+';color:#000;border:none;border-radius:12px;' +
          'font-family:Bangers,cursive;font-size:1.2rem;letter-spacing:2px;cursor:pointer;">' +
          '🐉 J\'AI COMPRIS — EN AVANT !' +
        '</button>' +
      '</div>';
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .3s';
    window._magnoliaLessonDone = function() {
      overlay.style.opacity = '0';
      setTimeout(function(){
        overlay.style.display = 'none';
        if (callback) callback();
      }, 300);
    };
    requestAnimationFrame(function(){ overlay.style.opacity = '1'; });
  }

  // ── Export global ────────────────────────────────────────────────
  window.lesson_magnolia = lesson_magnolia;
  window.LESSONS_MAGNOLIA = LESSONS;
  console.info('🐉 lesson-data-magnolia.js — 40 leçons Histoire × Dragon Ball Z chargées');
})();
