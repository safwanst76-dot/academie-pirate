// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA.JS — 🏴‍☠️ Grand Bleu — Français / One Piece
// Données pédagogiques : règles, exemples, questions échauffement
// Moteur : js/lesson.js (ne pas modifier ici)
// Règle A3 : les données sont séparées du moteur
// ═══════════════════════════════════════════════════════════════════

// Enregistrement dans le registry global
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['grandbleu'] = {
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
  };

console.info('🏴‍☠️ lesson-data grand-bleu chargé — 8 îles');
