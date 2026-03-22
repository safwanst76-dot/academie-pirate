// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA.JS — 🐉 Magnolia — Histoire / Dragon Ball Z
// Données pédagogiques : règles, exemples, questions échauffement
// Moteur : js/lesson.js (ne pas modifier ici)
// Règle A3 : les données sont séparées du moteur
// ═══════════════════════════════════════════════════════════════════

// Enregistrement dans le registry global
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['magnolia'] = {
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
  };

console.info('🐉 lesson-data magnolia chargé — 8 îles');
