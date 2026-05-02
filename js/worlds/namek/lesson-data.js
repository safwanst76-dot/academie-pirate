// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA-NAMEK.JS — Académie Pirate V2
// 🔮 Namek · Géographie · Jujutsu Kaisen
// Pattern exact Grand Bleu / Magnolia / Kanto : LESSON_REGISTRY par niveau
// 5 niveaux × 8 îles = 40 entrées prévues (CM2 d'abord)
// ═══════════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

// ══════════════════════════════════════════════════════════════════
// CM2 — Géographie cycle 3 (BO 2020 + 2023)
// Thème principal : "Se déplacer, communiquer, habiter"
// ══════════════════════════════════════════════════════════════════
window.LESSON_REGISTRY['namek_cm2'] = {
  color:'#f97316', bg:'#0a0500', textAccent:'#fbbf24',
  particles:'curse', worldName:'Namek',
  lessons:{
    1:{
      heroName:'Yuji',
      heroQuote:'Les villes sont vivantes — pleines de gens, de bruits, de mouvement ! Comme moi quand je combats !',
      rule:'Une ville est un espace très peuplé concentrant beaucoup de constructions, de services et de transports. On y trouve des quartiers, des banlieues, des transports en commun (métro, bus, tram).',
      sections:[
        {icon:'🏙️',title:'Qu\'est-ce qu\'une ville ?',color:'#3b82f6',
         content:'Forte densité de population (beaucoup de gens au m²). Grands bâtiments, immeubles. Concentration de services (hôpitaux, écoles, mairie, magasins).',
         examples:['Paris : 2,1 millions d\'habitants','Lyon : 520 000 habitants','Marseille : 870 000 habitants']},
        {icon:'🚇',title:'Les transports urbains',color:'#a855f7',
         content:'Métro = train souterrain (Paris, Lyon, Marseille). Bus = en surface, partout. Tram = sur rails au sol. Vélos en libre-service (Vélib\').',
         examples:['Métro parisien : 16 lignes','Tram à Strasbourg','Vélib\' : 1400 stations']},
        {icon:'🏘️',title:'Quartiers et banlieue',color:'#22c55e',
         content:'Quartier = partie d\'une ville (centre, affaires, résidentiel). Banlieue = communes autour de la ville-centre. Métropole = très grande ville influente.',
         examples:['La Défense : quartier d\'affaires','Banlieues de Paris (92, 93, 94)','Métropole = Paris/Lyon/Marseille']}
      ],
      heroTip:'Yuji dit : "Une VILLE = beaucoup de gens + beaucoup de bâtiments + beaucoup de services. Plus elle est grande, plus elle attire les gens (emplois, écoles)."',
      warmup:[
        {q:'Capitale de la France ?',a:'Paris',o:['Paris','Lyon','Marseille']},
        {q:'Habitants d\'une ville =',a:'Citadins',o:['Citadins','Ruraux','Marins']}
      ]
    },
    2:{
      heroName:'Megumi',
      heroQuote:'La campagne... le calme. Peu de gens, beaucoup d\'espace. Comme mes invocations dans la nature.',
      rule:'La campagne (espace rural) a une faible densité de population, des paysages agricoles (champs, prés, forêts), et l\'agriculture y est l\'activité principale. Les habitants s\'appellent les ruraux.',
      sections:[
        {icon:'🌾',title:'L\'agriculture',color:'#fbbf24',
         content:'L\'agriculteur cultive la terre ou élève des animaux. Le blé est la 1ère culture française. Beaucoup de fromages, vins, viandes viennent de la campagne.',
         examples:['Blé : Beauce','Vin : Bordeaux, Bourgogne','Camembert : Normandie']},
        {icon:'🏡',title:'Villages et hameaux',color:'#22c55e',
         content:'Village = petite commune rurale (souvent <2000 habitants). Avec église, place centrale, école, parfois boulangerie/épicerie.',
         examples:['Village provençal','Hameau breton','Bourg auvergnat']},
        {icon:'🚜',title:'Exode rural et néo-ruraux',color:'#3b82f6',
         content:'Exode rural = habitants partent vers la ville (manque emplois). Néo-ruraux = citadins qui viennent vivre à la campagne (qualité de vie).',
         examples:['Exode 19e-20e siècle','Néo-ruraux post-Covid','AOP : produits locaux protégés']}
      ],
      heroTip:'Megumi dit : "La CAMPAGNE = peu de gens + AGRICULTURE + paysages naturels. C\'est l\'inverse de la ville : faible densité, calme, espaces ouverts."',
      warmup:[
        {q:'Espace rural =',a:'Campagne avec peu d\'habitants',o:['Campagne avec peu d\'habitants','Centre-ville','Port']},
        {q:'1ère culture en France ?',a:'Le blé',o:['Le blé','Le riz','Le café']}
      ]
    },
    3:{
      heroName:'Nobara',
      heroQuote:'Le littoral, c\'est ma zone de confort ! Pêcheurs, surfeurs, touristes — tout bouge !',
      rule:'Le littoral est la zone où la mer rencontre la terre. Il a 3 fonctions principales : la pêche, le tourisme balnéaire, et le commerce maritime via les ports. C\'est aussi une zone fragile.',
      sections:[
        {icon:'🌊',title:'Plages et stations balnéaires',color:'#06b6d4',
         content:'Stations balnéaires = villes touristiques au bord de mer. Tourisme estival massif. Hôtels, plages aménagées, ports de plaisance.',
         examples:['Nice (Côte d\'Azur)','Saint-Tropez','Biarritz']},
        {icon:'🚢',title:'Ports et commerce maritime',color:'#3b82f6',
         content:'Port = lieu où les bateaux accostent. Marseille = 1er port français. Porte-conteneurs transportent les marchandises mondiales.',
         examples:['Marseille (1er port)','Le Havre','Rotterdam (1er d\'Europe)']},
        {icon:'🐟',title:'Pêche et aquaculture',color:'#22c55e',
         content:'Pêche en mer = bateaux pêchent poissons, crustacés. Aquaculture = élevage d\'huîtres (Bretagne, Charentes), moules, saumons.',
         examples:['Pêche en Bretagne','Huîtres d\'Arcachon','Moules de bouchot']}
      ],
      heroTip:'Nobara dit : "Le LITTORAL a 3 fonctions : pêche, tourisme, commerce maritime. Mais il est fragile (érosion, montée des mers, pollution). Il faut le protéger !"',
      warmup:[
        {q:'Le littoral est :',a:'Où mer rencontre terre',o:['Où mer rencontre terre','Une montagne','Un désert']},
        {q:'Plus grand port de France ?',a:'Marseille',o:['Marseille','Nice','Cannes']}
      ]
    },
    4:{
      heroName:'Gojo',
      heroQuote:'En montagne, je vois LOIN — comme avec mes Six Yeux. Sommets, neige, glaciers. Magnifique.',
      rule:'La montagne est un relief élevé (>600m) avec des contraintes : froid, pente, isolement, neige. Les principales chaînes françaises sont les Alpes, Pyrénées, Massif Central, Jura, Vosges.',
      sections:[
        {icon:'⛰️',title:'Les chaînes de montagnes',color:'#a855f7',
         content:'Alpes (Mont Blanc 4809m, plus haut sommet d\'Europe occidentale). Pyrénées (frontière Espagne). Massif Central (centre France). Jura (Suisse). Vosges.',
         examples:['Mont Blanc : 4809 m','Pic du Midi : Pyrénées','Puy de Dôme : Massif Central']},
        {icon:'🎿',title:'Stations de ski',color:'#3b82f6',
         content:'Tourisme d\'hiver = ski. Stations célèbres : Chamonix, Val d\'Isère, Tignes, Les Arcs, La Plagne, Méribel.',
         examples:['Chamonix (1er ski mondial)','Val d\'Isère','Méribel']},
        {icon:'🐄',title:'Alpages et transhumance',color:'#22c55e',
         content:'Alpage = pâturage en haute montagne. Transhumance = on monte les troupeaux en été et on les redescend en hiver.',
         examples:['Vaches en alpages','Tomme de Savoie','Beaufort, Reblochon']}
      ],
      heroTip:'Gojo dit : "La MONTAGNE = relief élevé + froid + neige. Tourisme été (randonnée) ET hiver (ski). Mais attention au réchauffement : glaciers fondent !"',
      warmup:[
        {q:'Plus haute montagne de France ?',a:'Mont Blanc (4809 m)',o:['Mont Blanc (4809 m)','Pic du Midi','Mont Saint-Michel']},
        {q:'Sport typique en hiver ?',a:'Le ski',o:['Le ski','La natation','La pêche']}
      ]
    },
    5:{
      heroName:'Inumaki',
      heroQuote:'Saumon ! (Se déplacer rapidement, c\'est important comme mes paroles maudites !)',
      rule:'En France, on se déplace en TGV (très rapide), avion, voiture, train, bus, vélo, ou à pied. Les transports doux (vélo, marche) ne polluent pas. Les transports en commun réduisent les bouchons et la pollution.',
      sections:[
        {icon:'🚄',title:'TGV et train',color:'#fbbf24',
         content:'TGV = Train à Grande Vitesse, jusqu\'à 320 km/h. Paris-Lyon en 2h, Paris-Marseille en 3h. Très écologique vs avion/voiture.',
         examples:['TGV Paris-Lyon : 2h','TGV Paris-Marseille : 3h','Eurostar Paris-Londres : 2h20']},
        {icon:'✈️',title:'Avion et autoroute',color:'#3b82f6',
         content:'Avion = très rapide pour longues distances mais polluant. Aéroport principal : Paris-CDG. Autoroutes (A6, A7, A1) à 130 km/h max.',
         examples:['CDG : 76M passagers/an','Avion Paris-NY : 8h','Autoroute A7 : Paris-Marseille']},
        {icon:'🚲',title:'Transports doux',color:'#22c55e',
         content:'Vélo, marche, trottinette = 0 émissions. Idéal en ville. Pistes cyclables, voies vertes. Vélos en libre-service comme Vélib\'.',
         examples:['Vélib\' : 1400 stations','Voies vertes : 4000 km','Marche : 0 carbone']}
      ],
      heroTip:'Inumaki dit : "TGV = rapide + écologique. Avion = pour LOIN. Vélo/marche = ville + écolo. Choisis selon distance et impact !"',
      warmup:[
        {q:'Transport le plus rapide en France ?',a:'TGV',o:['TGV','Bus','Vélo']},
        {q:'Transport le moins polluant ?',a:'Vélo',o:['Vélo','Avion','Voiture seule']}
      ]
    },
    6:{
      heroName:'Yuta',
      heroQuote:'Communiquer m\'a sauvé — autrefois isolé, maintenant je suis en lien avec le monde entier !',
      rule:'Internet relie des millions d\'ordinateurs dans le monde. La fibre optique transmet à grande vitesse. 99% du trafic mondial passe par des câbles sous-marins. Mais il reste une fracture numérique : tous n\'ont pas accès.',
      sections:[
        {icon:'🌐',title:'Internet et la fibre',color:'#3b82f6',
         content:'Internet = réseau mondial. Fibre optique = câble qui transmet via la lumière, super rapide. Câbles sous-marins relient les continents.',
         examples:['Fibre : 1 Gbits/s','~400 câbles sous-marins','Hub Marseille (méditerranéen)']},
        {icon:'📱',title:'Smartphones et réseaux sociaux',color:'#a855f7',
         content:'Smartphone = téléphone connecté à Internet. Réseaux sociaux : Instagram, TikTok, Snapchat. Attention à la vie privée et aux fake news !',
         examples:['Instagram','TikTok','WhatsApp']},
        {icon:'🛰️',title:'Satellites de communication',color:'#06b6d4',
         content:'Satellites = en orbite autour de la Terre. Relaient télé, GPS, téléphone, Internet partout sur le globe. Indispensables pour zones isolées.',
         examples:['GPS (Global Positioning)','Starlink','Satellites télé']}
      ],
      heroTip:'Yuta dit : "INTERNET = câbles sous-marins + fibre + satellites. Mais 1/3 de l\'humanité n\'y a pas accès = fracture numérique. La techno doit être pour TOUS !"',
      warmup:[
        {q:'Internet est :',a:'Réseau mondial d\'ordinateurs',o:['Réseau mondial d\'ordinateurs','Une chaîne TV','Un journal']},
        {q:'Comment relie-t-on les continents ?',a:'Câbles sous-marins',o:['Câbles sous-marins','Pigeons','Voitures']}
      ]
    },
    7:{
      heroName:'Todo',
      heroQuote:'BROTHER ! Mieux habiter, c\'est respecter la nature ET vivre mieux. Les vrais hommes pensent à demain !',
      rule:'Mieux habiter = réduire l\'empreinte écologique tout en améliorant la qualité de vie. Écoquartiers, énergies renouvelables, recyclage, transports doux, isolation, espaces verts.',
      sections:[
        {icon:'🌱',title:'Écoquartiers',color:'#22c55e',
         content:'Écoquartier = quartier respectueux de l\'environnement. Panneaux solaires, isolation, espaces verts, transports doux, jardins partagés.',
         examples:['Bedzed (Londres)','Vauban (Fribourg)','Confluence (Lyon)']},
        {icon:'♻️',title:'Tri et recyclage',color:'#3b82f6',
         content:'Tri sélectif : jaune (emballages), verte (verre), bleue (papier), grise (autres). Recycler économise les ressources.',
         examples:['Jaune : plastique, métal','Verte : bouteilles verre','Bleue : journaux']},
        {icon:'☀️',title:'Énergies renouvelables',color:'#fbbf24',
         content:'Solaire (panneaux), éolien (éoliennes), hydroélectrique (barrages), géothermique. Inépuisables et propres.',
         examples:['Solaire toits','Éoliennes en mer','Barrages hydro']}
      ],
      heroTip:'Todo dit : "BROTHER ! Mieux habiter = ÉCO-quartiers + recyclage + énergies vertes + transports doux. Petit geste = grand impact !"',
      warmup:[
        {q:'Un écoquartier est :',a:'Quartier respectueux de l\'environnement',o:['Quartier respectueux de l\'environnement','Quartier pollué','Désert']},
        {q:'Énergie renouvelable ?',a:'Solaire et éolien',o:['Solaire et éolien','Pétrole','Charbon']}
      ]
    },
    8:{
      heroName:'Nanami',
      heroQuote:'7h - 19h. Les métropoles sont des fourmilières humaines. Pouvoir, économie, culture concentrés.',
      rule:'Une métropole est une très grande ville influente concentrant population, services et pouvoirs économiques/politiques. Tokyo (37M) est la plus grande mégapole du monde. Paris est la métropole française dominante.',
      sections:[
        {icon:'🏙️',title:'Métropoles françaises',color:'#a855f7',
         content:'Top 3 : Paris (2,1M ville, 12M agglomération), Marseille (870k), Lyon (520k). Concentrent emplois, universités, hôpitaux, sièges sociaux.',
         examples:['Paris : 1ère métropole','Lyon : 2ème','Marseille : grand port']},
        {icon:'🌍',title:'Mégapoles mondiales',color:'#3b82f6',
         content:'Mégapole = >10 millions habitants. Tokyo (37M), New York, Shanghai, Mumbai, São Paulo, Mexico, Le Caire.',
         examples:['Tokyo : 37 millions','New York : 23M','Shanghai : 28M']},
        {icon:'🏠',title:'Quartiers et banlieue',color:'#22c55e',
         content:'Centre-ville = monuments, commerces. Quartier d\'affaires (La Défense). Banlieue = pavillons, immeubles. Périurbain = transition vers campagne.',
         examples:['Centre Paris','La Défense (affaires)','Banlieue parisienne']}
      ],
      heroTip:'Nanami dit : "Métropole = forte concentration population + services + POUVOIRS. Centre-ville → banlieue → périurbain → campagne. Logements chers en métropole."',
      warmup:[
        {q:'Une métropole est :',a:'Très grande ville influente',o:['Très grande ville influente','Petit village','Désert']},
        {q:'Plus grande mégapole mondiale ?',a:'Tokyo (37 millions)',o:['Tokyo (37 millions)','Paris','Lyon']}
      ]
    }
  }
};

// ═════════════════════════════════════════════════
// 6ÈME — Habiter le monde (BO Education Nationale cycle 3-4)
// ═════════════════════════════════════════════════
window.LESSON_REGISTRY['namek_6eme'] = {
  color:'#22c55e', bg:'#0a0500', textAccent:'#34d399',
  particles:'curse', worldName:'Namek',
  lessons:{
    1:{
      heroName:'Choso',
      heroQuote:'Les métropoles mondiales — fourmilières géantes, comme Tokyo ou Mumbai !',
      rule:'Les métropoles mondiales sont des villes de plus de 10 millions d\'habitants (mégapoles) qui concentrent populations, activités économiques, services et pouvoirs. Tokyo est la plus grande avec 37 millions.',
      sections:[
        {icon:'🟢',title:'Les mégapoles mondiales',color:'#22c55e',
         content:'Mégapole = > 10 millions d\'habitants. Top : Tokyo (37M), Delhi (32M), Shanghai (28M), São Paulo (22M), Mexico (22M), Le Caire (22M), Mumbai (21M).',
         examples:['Tokyo : 37M','Mumbai : 21M','São Paulo : 22M']},
        {icon:'🏙️',title:'Centre-ville et périphérie',color:'#3b82f6',
         content:'CBD (Central Business District) = quartier d\'affaires (Manhattan, La Défense). Étalement urbain massif. Bidonvilles dans les pays pauvres.',
         examples:['Manhattan : finance','Dharavi : 1M hab/2km²','La Défense : 180k emplois']},
        {icon:'🏞️',title:'Défis des métropoles',color:'#ef4444',
         content:'Pollution, transports saturés, inégalités logements, gestion déchets. Solutions : éco-quartiers, transports en commun, smart cities.',
         examples:['Smog à Pékin','Embouteillages Mumbai','Eco-Tokyo : tri déchets']}
      ],
      heroTip:'Choso dit : "Les MÉTROPOLES = + de 10M hab + concentration richesse/services + défis (pollution, inégalités). Tokyo est la plus grande au monde !"',
      warmup:[
        {q:'Plus grande métropole mondiale ?',a:'Tokyo (37M)',o:['Tokyo (37M)','Paris','Marseille']},
        {q:'Mégapole =',a:'> 10M hab',o:['> 10M hab','100k hab','1k hab']}
      ]
    },
    2:{
      heroName:'Todo',
      heroQuote:'BROTHER ! Vivre dans le Sahara ou l\'Arctique demande de la FORCE et de l\'adaptation !',
      rule:'Les espaces de fortes contraintes (déserts chauds, polaires, hautes montagnes) ont des conditions extrîmes. Les humains s\'y adaptent par des habitats spécifiques (tentes, igloos), des activités (élevage nomade, pêche) et des savoirs ancestraux.',
      sections:[
        {icon:'🌵',title:'Déserts chauds',color:'#fbbf24',
         content:'Sahara = 9M km², 11 pays. Témpératures jusqu\'à 50°C. Très peu peuplé. Oasis = vie autour des sources d\'eau. Bédouins, Touaregs nomades.',
         examples:['Sahara (Afrique)','Gobi (Asie)','Atacama (Chili)']},
        {icon:'❄️',title:'Espaces polaires',color:'#06b6d4',
         content:'Arctique = -50°C. Inuits adaptés (Groenland, Canada). Pêche, chasse aux phoques. Igloos traditionnels. Antarctique = scientifiques uniquement.',
         examples:['Inuits (Arctique)','Lapons (nord Europe)','Antarctique : 1000 scientifiques']},
        {icon:'⛰️',title:'Hautes montagnes',color:'#a855f7',
         content:'Andes (Pérou, Bolivie) > 4000m. Sherpas dans l\'Himalaya. Lamas, alpagas. Terrasses pour cultures. Adaptation à l\'altitude (oxygène).',
         examples:['Sherpas Himalaya','Quechuas Andes','Tibétains']}
      ],
      heroTip:'Todo dit : "BROTHER ! Espaces extrêmes = adaptation spécifique : habitat (tentes, igloos), activités (nomadisme), savoirs traditionnels. Les humains sont résilients !"',
      warmup:[
        {q:'Plus grand désert chaud ?',a:'Sahara',o:['Sahara','Gobi','Antarctique']},
        {q:'Inuits vivent en :',a:'Arctique',o:['Arctique','Sahara','Amazonie']}
      ]
    },
    3:{
      heroName:'Nanami',
      heroQuote:'7h - 19h. Les littoraux mondiaux concentrent activités humaines : ports, tourisme, pêche.',
      rule:'Les littoraux concentrent 60% de l\'humanité. 3 fonctions : tourisme balnaire (Miami), commerce maritime (Shanghai 1er port mondial), industries (raffineries, pétrochimie). Mais zones fragiles (montée des eaux).',
      sections:[
        {icon:'🏝️',title:'Tourisme balnaire',color:'#06b6d4',
         content:'Miami, Cancún, Bali, Maldives = stations balneaires mondiales. 1,4 milliard touristes/an. Plages, hôtels, croisières.',
         examples:['Miami (USA)','Cancún (Mexique)','Bali (Indonésie)']},
        {icon:'🚢',title:'Commerce maritime',color:'#3b82f6',
         content:'80% du commerce mondial = bateaux. Shanghai 1er port mondial, Singapour 2e, Rotterdam 1er Europe. Porte-conteneurs géants.',
         examples:['Shanghai (1er)','Singapour (hub)','Rotterdam (Europe)']},
        {icon:'🏭',title:'Industries littorales',color:'#ef4444',
         content:'Raffineries de pétrole, pétrochimie, sidérurgie. Le Havre, Rotterdam, Houston. Pollution import.',
         examples:['Le Havre (raffineries)','Houston (pétrochimie)','Yokohama']}
      ],
      heroTip:'Nanami dit : "7h - 19h. Le LITTORAL = tourisme + commerce + industries. 60% des humains y vivent. Mais montée des eaux menace ces zones."',
      warmup:[
        {q:'1er port mondial ?',a:'Shanghai',o:['Shanghai','Marseille','Bordeaux']},
        {q:'% humanité sur littoraux ?',a:'60%',o:['60%','5%','99%']}
      ]
    },
    4:{
      heroName:'Panda',
      heroQuote:'Les espaces ruraux du monde nourrissent l\'humanité — du Sahel aux rizières !',
      rule:'Les espaces ruraux mondiaux varient énormément : agriculture vivrière en Afrique/Asie (nourrir famille) vs commerciale aux USA/Europe (vendre). Riz en Asie, blé dans les plaines américaines, mil au Sahel.',
      sections:[
        {icon:'🌾',title:'Agriculture vivrière',color:'#fbbf24',
         content:'Petites parcelles familiales (Afrique, Asie). Manioc, mil, sorgho. Outils manuels. Nourrir la famille avant de vendre.',
         examples:['Mil au Sahel','Manioc Amazonie','Riz familial Vietnam']},
        {icon:'🚜',title:'Agriculture commerciale',color:'#22c55e',
         content:'Grandes exploitations USA (Midwest), Brésil, Europe. Tracteurs, engrais, OGM. Production massive pour export mondial.',
         examples:['Midwest USA (blé)','Brésil (soja)','France (vin)']},
        {icon:'🍚',title:'Rizières en terrasses',color:'#06b6d4',
         content:'Asie SE (Vietnam, Bali, Philippines) : rizières inondées en terrasses. Travail manuel intensif. Buffles d\'eau. Patrimoine UNESCO.',
         examples:['Bali (Indonésie)','Vietnam','Philippines (Banaue)']}
      ],
      heroTip:'Panda dit : "Les ESPACES RURAUX MONDIAUX = vivrière (familiale) vs commerciale (massive). Différents climats, différentes productions, même défi : nourrir 8Mrd humains."',
      warmup:[
        {q:'1ère culture asiatique ?',a:'Le riz',o:['Le riz','Le blé','Le maïs']},
        {q:'Sahel cultive surtout ?',a:'Mil et sorgho',o:['Mil et sorgho','Riz','Vigne']}
      ]
    },
    5:{
      heroName:'Maki',
      heroQuote:'Faible densité = vastes espaces presque vides : Sibérie, Outback australien, steppes mongoles !',
      rule:'Les espaces de faible densité sont les zones où vivent peu d\'habitants : Antarctique (0/km²), Sahara, Sibérie, Outback australien, hautes Andes. Causes : froid, chaleur, altitude, manque d\'eau. Vie nomade ou disperse.',
      sections:[
        {icon:'🌬️',title:'Steppes et toundra',color:'#a855f7',
         content:'Mongolie : nomades dans yourtes. Sibérie : taïga (forêts boréales) + toundra. Population dispersée. Ressources : pétrole, gaz, minerais.',
         examples:['Mongolie (yourtes)','Sibérie (taïga)','Patagonie']},
        {icon:'🖤',title:'Déserts d\'altitude et océans',color:'#06b6d4',
         content:'Plateau tibétain (>4000m), Antarctique (0 hab/km²), océans. Conditions extrîmes. Population minimale ou inexistante.',
         examples:['Tibet','Antarctique','Greenland intérieur']},
        {icon:'🐠',title:'Outback australien',color:'#fbbf24',
         content:'Outback = centre désertique de l\'Australie. 0,5 hab/km². Aborigènes (1ers habitants). Sydney/Melbourne sur côtes uniquement.',
         examples:['Outback','Aborigènes','Uluru']}
      ],
      heroTip:'Maki dit : "Faible densité = contraintes naturelles fortes : froid (Sibérie), chaleur (Sahara), altitude (Tibet). Adaptation = nomadisme, dispersion, savoirs ancestraux."',
      warmup:[
        {q:'Densité Antarctique ?',a:'0 hab/km²',o:['0 hab/km²','100/km²','1000/km²']},
        {q:'Mongols vivent dans :',a:'Yourtes',o:['Yourtes','Gratte-ciels','Igloos']}
      ]
    },
    6:{
      heroName:'Naoya',
      heroQuote:'Mieux habiter la planète = développement durable, smart cities, transition !',
      rule:'Mieux habiter la planète = adopter le développement durable (3 piliers : environnement, social, économie). Solutions : éco-quartiers, smart cities (technologies), énergies renouvelables, agriculture bio, commerce équitable. ODD ONU 2030.',
      sections:[
        {icon:'🌱',title:'Développement durable',color:'#22c55e',
         content:'Défini en 1987 (Brundtland). 3 piliers : environnement (planète), social (justice), économie (richesse). 17 ODD ONU 2030.',
         examples:['Rapport Brundtland 1987','17 ODD ONU','COP21 Paris 2015']},
        {icon:'📱',title:'Smart cities',color:'#3b82f6',
         content:'Villes connectées : capteurs, apps, IA. Optimisent transports, énergie, déchets. Singapour, Barcelone, Copenhague modèles.',
         examples:['Singapour','Copenhague','Barcelone']},
        {icon:'♻️',title:'Économie circulaire',color:'#fbbf24',
         content:'Réduire-réutiliser-recycler. Vs économie linéaire (jeter). Bio + commerce équitable. Éco-quartiers (Vauban Fribourg).',
         examples:['Tri déchets','Vauban (Fribourg)','Commerce équitable']}
      ],
      heroTip:'Naoya dit : "Mieux habiter = DÉVELOPPEMENT DURABLE : équilibrer environnement + social + économie. Smart cities + éco-quartiers + énergies vertes = avenir !"',
      warmup:[
        {q:'DD a combien de piliers ?',a:'3 (environnement, social, économie)',o:['3 (environnement, social, économie)','1','10']},
        {q:'COP21 a eu lieu à :',a:'Paris',o:['Paris','Tokyo','New York']}
      ]
    },
    7:{
      heroName:'Geto',
      heroQuote:'6 continents, 5 océans — voici notre planète ! L\'Asie est la plus peuplée !',
      rule:'La Terre a 6 continents (Afrique, Amérique, Antarctique, Asie, Europe, Océanie) et 5 océans (Pacifique, Atlantique, Indien, Arctique, Austral). L\'Asie est le plus peuplé (4,7Mrd). Le Pacifique = 1/3 planète.',
      sections:[
        {icon:'🌍',title:'Les 6 continents',color:'#22c55e',
         content:'Asie (4,7Mrd, 60% humanité), Afrique (1,4Mrd), Amérique du N+S (1Mrd), Europe (750M), Océanie (45M), Antarctique (0).',
         examples:['Asie : 4,7Mrd','Afrique : 1,4Mrd','Antarctique : 0']},
        {icon:'🌊',title:'Les 5 océans',color:'#06b6d4',
         content:'Pacifique = 1/3 Terre (165M km²). Atlantique. Indien. Arctique (nord). Austral (autour Antarctique). Fossé Mariannes -11 000m.',
         examples:['Pacifique (1er)','Atlantique','Fossé Mariannes']},
        {icon:'🏔️',title:'Reliefs majeurs',color:'#a855f7',
         content:'Mont Everest (8849m, Himalaya). Mont Blanc (Alpes 4809m). Andes (chaîne la + longue). Déserts (Sahara, Gobi).',
         examples:['Everest 8849m','Mariannes -11km','Sahara 9M km²']}
      ],
      heroTip:'Geto dit : "6 continents + 5 océans = notre planète. L\'Asie est la + peuplée. Le Pacifique est immense. Connaitre la Terre = comprendre les humains !"',
      warmup:[
        {q:'Combien de continents ?',a:'6',o:['6','2','100']},
        {q:'Plus grand océan ?',a:'Pacifique',o:['Pacifique','Atlantique','Indien']}
      ]
    },
    8:{
      heroName:'Yuji',
      heroQuote:'Les repères de la Terre — équateur, tropiques, pôles, méridiens — boss SUKUNA m\'attend !',
      rule:'La Terre a des repères géographiques essentiels : équateur (0° latitude), tropiques (Cancer 23°N, Capricorne 23°S), pôles, cercles polaires, méridiens (longitude, Greenwich 0°), parallèles (latitude). 24 fuseaux horaires. 5 zones climatiques.',
      sections:[
        {icon:'🌍',title:'Lignes imaginaires',color:'#3b82f6',
         content:'Équateur = 0° latitude (sépare 2 hémisphères). Tropiques (limites tropicales). Cercles polaires (limites zones froides). Méridien Greenwich = 0° longitude.',
         examples:['Équateur 0°','Tropique Cancer 23°N','Greenwich 0°']},
        {icon:'☀️',title:'5 zones climatiques',color:'#fbbf24',
         content:'Équatoriale (chaude humide), tropicale (chaude sèche), tempérée (modérée), polaire (très froid), aride (sèche). Influence sur la vie humaine.',
         examples:['Equateur : 25-30°C','Pôles : -50°C','Sahara : 50°C']},
        {icon:'⏰',title:'Fuseaux horaires',color:'#a855f7',
         content:'24 fuseaux (1 par heure). Greenwich = référence. Paris +1h. Tokyo +9h. NY -5h. La Terre tourne en 24h créant jour/nuit.',
         examples:['Paris UTC+1','Tokyo UTC+9','NY UTC-5']}
      ],
      heroTip:'Yuji dit : "Les REPÈRES TERRE : équateur, tropiques, pôles, méridiens, parallèles. Connaitre ces lignes = comprendre climats et fuseaux. Boss SUKUNA, je suis prêt !"',
      warmup:[
        {q:'Équateur =',a:'0° latitude',o:['0° latitude','100°','-50°']},
        {q:'Combien de fuseaux ?',a:'24',o:['24','1','100']}
      ]
    }
  }
};

// ═════════════════════════════════════════════════
// 5ÈME — Démographie, ressources, développement durable
// ═════════════════════════════════════════════════
window.LESSON_REGISTRY['namek_5eme'] = {
  color:'#8b5cf6', bg:'#0a0500', textAccent:'#a78bfa',
  particles:'curse', worldName:'Namek',
  lessons:{
    1:{
      heroName:'Yuji',
      heroQuote:'8 milliards d\'humains sur Terre ! L\'Inde dépasse la Chine !',
      rule:'L\'humanité atteint 8 milliards en 2022. Croissance ralentit (+0,9%/an). L\'Inde dépasse la Chine. Pays riches vieillissent (Japon, Europe), pays pauvres explosent (Afrique : 2,5Mrd en 2050).',
      sections:[
        {icon:'👥',title:'Démographie mondiale',color:'#8b5cf6',
         content:'8Mrd humains. Inde 1,43Mrd > Chine 1,42Mrd depuis 2023. France 68M. Niger : 7 enfants/femme (record).',
         examples:['Inde 1,43Mrd','Chine 1,42Mrd','Niger 7 enfants']},
        {icon:'👴',title:'Vieillissement',color:'#3b82f6',
         content:'Japon (+30% > 65 ans), Europe, Russie. Faible natalité (<2,1) = renouvellement insuffisant. Défi retraites/santé.',
         examples:['Japon : 30% > 65 ans','France : 1,8 enfants/femme','Russie : déclin']},
        {icon:'🌍',title:'Croissance Sud',color:'#22c55e',
         content:'Afrique va doubler d\'ici 2050 : 1,4Mrd → 2,5Mrd. Forte natalité, jeunesse (40% < 15 ans). Défis : emplois, écoles.',
         examples:['Nigeria 220M','Niger croissance','Afrique 2,5Mrd 2050']}
      ],
      heroTip:'Yuji dit : "DÉMOGRAPHIE = 8Mrd humains. Pays riches vieillissent, pays pauvres explosent. Défis Nord (retraites) et Sud (emplois jeunes). Inégalités majeures !"',
      warmup:[
        {q:'Pays le + peuplé ?',a:'Inde (1,43Mrd)',o:['Inde (1,43Mrd)','Chine','USA']},
        {q:'Combien sur Terre ?',a:'8 milliards',o:['8 milliards','1 milliard','100']}
      ]
    },
    2:{
      heroName:'Megumi',
      heroQuote:'L\'eau, ressource vitale — 2,2 milliards n\'ont pas d\'eau potable !',
      rule:'Seulement 3% d\'eau douce sur Terre (97% salée). 2,2Mrd humains n\'ont pas d\'eau potable. Agriculture utilise 70% de l\'eau mondiale. Stress hydrique en hausse. 1 jean = 10 000L. Conflits Moyen-Orient (Jourdain, Tigre).',
      sections:[
        {icon:'💧',title:'Ressource vitale',color:'#06b6d4',
         content:'97% eau salée (océans), 3% douce dont 2/3 dans glaces. 1L par jour minimum. Le Nil sauve l\'Égypte du désert.',
         examples:['97% salée','3% douce','Nil = vie Égypte']},
        {icon:'🚱',title:'Stress hydrique',color:'#ef4444',
         content:'2Mrd humains en stress (manque d\'eau). 2,2Mrd sans eau potable. Maladies mortelles (choléra). Inde, Afrique en tête.',
         examples:['2,2Mrd sans eau potable','Inde : 600M en stress','Afrique : pénurie']},
        {icon:'🏞️',title:'Solutions',color:'#22c55e',
         content:'Goutte-à-goutte (Israël), dessalement (Émirats), récupération pluie, économies. Stop gaspillage : 1 jean = 10 000L !',
         examples:['Israël : goutte-à-goutte','Émirats : dessalement','Récup pluie']}
      ],
      heroTip:'Megumi dit : "L\'EAU = vitale et inégale. 2,2Mrd sans eau potable. Agriculture = 70% conso. Solutions : économies, dessalement, goutte-à-goutte. URGENT !"',
      warmup:[
        {q:'% eau douce sur Terre ?',a:'3%',o:['3%','50%','100%']},
        {q:'Activité utilise + eau ?',a:'Agriculture',o:['Agriculture','Industrie','Maison']}
      ]
    },
    3:{
      heroName:'Gojo',
      heroQuote:'L\'énergie défie l\'humanité — fossiles, nucléaire, renouvelables !',
      rule:'80% de l\'énergie mondiale = fossiles (pétrole, charbon, gaz). USA + Arabie + Russie = top pétrole. France 70% nucléaire. Transition vers renouvelables (solaire, éolien) urgente pour le climat.',
      sections:[
        {icon:'⛽',title:'Énergies fossiles',color:'#ef4444',
         content:'80% mondial = fossiles. Pétrole (33%), charbon (26%), gaz (24%). OPEP fixe prix pétrole. Émissions CO2 massives.',
         examples:['Pétrole : 33%','Charbon : 26%','OPEP']},
        {icon:'⚛️',title:'Nucléaire',color:'#a855f7',
         content:'France 70% électricité nucléaire (56 réacteurs). USA #1 mondial (92 réacteurs). Peu de CO2 mais déchets radioactifs.',
         examples:['France 56 réacteurs','USA 92 réacteurs','Fukushima 2011']},
        {icon:'☀️',title:'Renouvelables',color:'#22c55e',
         content:'Solaire (panneaux photovoltaïques), éolien (vent), hydro (barrages), géothermie. Allemagne leader (Energiewende).',
         examples:['Allemagne : Energiewende','Chine : éolien','Solaire Sahara']}
      ],
      heroTip:'Gojo dit : "ÉNERGIE = défi #1. Fossiles = climat menacé. Nucléaire = peu CO2. Solaire/éolien = avenir. Mix énergétique + sobriété = solution !"',
      warmup:[
        {q:'Énergie la + utilisée ?',a:'Pétrole + charbon + gaz',o:['Pétrole + charbon + gaz','Solaire seul','Éolien']},
        {q:'France a 70% en :',a:'Nucléaire',o:['Nucléaire','Pétrole','Charbon']}
      ]
    },
    4:{
      heroName:'Nanami',
      heroQuote:'7h - 19h. 700M ont faim ET 30% est gaspillé — paradoxe insensé !',
      rule:'700 millions souffrent de la faim, surtout en Afrique. Mais 30% de la nourriture mondiale est gaspillée ! Agriculture intensive (engrais, OGM) vs bio. Élevage = 14% GES. Manger moins de viande aide.',
      sections:[
        {icon:'🍚',title:'Cultures mondiales',color:'#fbbf24',
         content:'1ère = maïs (1,2Mrd t). Blé (770M). Riz (510M). USA, Chine, Inde grands producteurs. Brésil leader soja.',
         examples:['Maïs : 1ère mondiale','Riz : Asie','Soja : Brésil']},
        {icon:'🍔',title:'Paradoxe alimentaire',color:'#ef4444',
         content:'700M ont faim (Afrique surtout). 30% gaspillé (pays riches, dates, défauts). 1Mrd obèses. Inégalités terribles.',
         examples:['700M faim','30% gaspillé','1Mrd obèses']},
        {icon:'🌱',title:'Solutions',color:'#22c55e',
         content:'Bio (sans pesticides), local (moins CO2), commerce équitable, manger moins de viande. ODD ONU : zéro faim 2030.',
         examples:['Bio en hausse','Commerce équitable','Vegan/végétarien']}
      ],
      heroTip:'Nanami dit : "7h - 19h. PARADOXE = 700M ont faim ET 30% gaspillé. Solutions = bio + local + équitable + moins viande. Système à revoir !"',
      warmup:[
        {q:'1ère culture mondiale ?',a:'Le maïs',o:['Le maïs','Le riz','Le blé']},
        {q:'% nourriture gaspillée ?',a:'1/3',o:['1/3','100%','0%']}
      ]
    },
    5:{
      heroName:'Maki',
      heroQuote:'Les risques climatiques amplifiés — vulnérabilité maximale !',
      rule:'Cyclones (Philippines, Bangladesh), séismes (Japon), tsunamis, sécheresses (Sahel), inondations. Le réchauffement amplifie tout. Pays pauvres + exposés (Haïti, Bangladesh) car moins de moyens pour prévenir/reconstruire.',
      sections:[
        {icon:'🌀',title:'Cyclones et tempêtes',color:'#06b6d4',
         content:'Cyclone = vents > 118 km/h + pluies torrentielles. Philippines : 20 cyclones/an. USA : ouragans (Katrina 2005). Réchauffement les amplifie.',
         examples:['Philippines : 20/an','Bangladesh','Cyclone Katrina']},
        {icon:'🌋',title:'Séismes et volcans',color:'#ef4444',
         content:'Plaques tectoniques bougent. Japon, Indonésie, Chili = "Ceinture de feu" Pacifique. Tsunamis (vagues 30m). Volcans : Etna, Fuji.',
         examples:['Japon : 2011 (Fukushima)','Indonésie','Chili']},
        {icon:'🏚️',title:'Vulnérabilité',color:'#fbbf24',
         content:'Pays pauvres + touchés (Haïti séisme 2010, Bangladesh inondations). Construction fragile, pas d\'alerte, pas de fonds. Inégalité brutale.',
         examples:['Haïti 2010 : 230k morts','Bangladesh','Sahel : sécheresses']}
      ],
      heroTip:'Maki dit : "RISQUES = climat amplifie tout. Pays pauvres souffrent + : pas de moyens. Solutions : alerte + plan + adaptation + reconstruction durable."',
      warmup:[
        {q:'Plus grand risque Bangladesh ?',a:'Inondations',o:['Inondations','Volcan','Désert']},
        {q:'Japon connu pour :',a:'Séismes/tsunamis',o:['Séismes/tsunamis','Sécheresses','Cyclones']}
      ]
    },
    6:{
      heroName:'Todo',
      heroQuote:'BROTHER ! Les inégalités Nord-Sud sont un combat ! IDH = mesure développement !',
      rule:'IDH (Indice Développement Humain ONU) mesure 3 indicateurs : santé, éducation, revenus. Pays développés (USA, Europe, Japon) vs PMA (Tchad, Niger, Mali). Espérance vie : Japon 84 ans vs Tchad 55 ans.',
      sections:[
        {icon:'📊',title:'IDH',color:'#8b5cf6',
         content:'IDH = 0 (mauvais) à 1 (parfait). Norvège 0,96 (top), Niger 0,40 (bas). 3 critères : espérance vie, école, revenus.',
         examples:['Norvège 0,96','Niger 0,40','France 0,90']},
        {icon:'💼',title:'Pays développés/émergents',color:'#22c55e',
         content:'Développés : USA, Europe, Japon, Australie. BRICS : Brésil, Russie, Inde, Chine, Afrique du Sud (émergents). PMA : 46 pays pauvres.',
         examples:['USA, Europe (riches)','BRICS (émergents)','46 PMA']},
        {icon:'🌐',title:'Réduire inégalités',color:'#3b82f6',
         content:'17 ODD ONU 2030 (pauvreté, faim, santé...). APD (Aide Publique Développement) = 0,7% PIB recommandé. Commerce équitable.',
         examples:['17 ODD ONU','APD 0,7% PIB','Commerce équitable']}
      ],
      heroTip:'Todo dit : "BROTHER ! Inégalités = défi majeur. IDH mesure tout. Réduire écart Nord/Sud + dans chaque pays. ODD ONU = feuille de route 2030 !"',
      warmup:[
        {q:'IDH mesure :',a:'Développement humain',o:['Développement humain','La taille','Le poids']},
        {q:'BRICS =',a:'Brésil, Russie, Inde, Chine, Afrique du Sud',o:['Brésil, Russie, Inde, Chine, Afrique du Sud','Petit village','Sport']}
      ]
    },
    7:{
      heroName:'Yuta',
      heroQuote:'Le développement durable, seule voie pour l\'avenir !',
      rule:'DD défini en 1987 (Brundtland). 3 piliers : environnement (planète), social (justice), économie (richesse). Solutions : éco-quartiers, économie circulaire, énergies renouvelables, commerce équitable. ODD ONU 2030.',
      sections:[
        {icon:'🌍',title:'3 piliers',color:'#22c55e',
         content:'Environnement (préserver planète) + Social (justice/équité) + Économie (richesse, emplois). ÉQUILIBRER les 3 = DD.',
         examples:['Environnement','Social','Économie']},
        {icon:'🔄',title:'Économie circulaire',color:'#fbbf24',
         content:'Réduire-Réutiliser-Recycler. Vs économie linéaire (jeter). Évite gaspillage et pollution.',
         examples:['Recycler verre','Réutiliser','Réduire emballage']},
        {icon:'🏘️',title:'Éco-quartiers',color:'#3b82f6',
         content:'Vauban (Fribourg), Bedzed (Londres). Panneaux solaires, isolation, transports doux, jardins partagés.',
         examples:['Vauban (Fribourg)','Bedzed','Confluence Lyon']}
      ],
      heroTip:'Yuta dit : "DD = SEULE solution. Sans environnement → pas de vie. Sans social → injustice. Sans économie → pas de moyens. ÉQUILIBRE = avenir !"',
      warmup:[
        {q:'DD = combien de piliers ?',a:'3',o:['3','1','10']},
        {q:'Économie circulaire =',a:'Réutiliser déchets',o:['Réutiliser déchets','Tout brûler','Tout jeter']}
      ]
    },
    8:{
      heroName:'Nobara',
      heroQuote:'Le changement climatique — défi #1, boss SUKUNA m\'attend !',
      rule:'Réchauffement +1,2°C depuis 1900. Causes : GES (CO2 fossiles, méthane). Conséquences : fonte glaciers, montée mers, canicules, 6e extinction de masse. Accord de Paris : limiter à +1,5°C. Au rythme actuel : +3°C en 2100.',
      sections:[
        {icon:'🔥',title:'Réchauffement',color:'#ef4444',
         content:'+1,2°C depuis 1900. Causes : CO2 fossile (transports, industrie). Méthane (élevage). 1°C = climat instable.',
         examples:['+1,2°C depuis 1900','CO2 fossile','Méthane élevage']},
        {icon:'🌊',title:'Conséquences',color:'#06b6d4',
         content:'Glaciers fondent, mers montent (+3,4mm/an). Canicules + sécheresses + cyclones violents. 6e extinction (espèces).',
         examples:['Tuvalu menacée','Canicules Europe','Pertes biodiversité']},
        {icon:'📉',title:'Accord de Paris',color:'#22c55e',
         content:'COP21 (2015, Paris) : limiter à +1,5°C. 195 pays signataires. Au rythme actuel : +3°C 2100. Action urgente !',
         examples:['COP21 Paris 2015','+1,5°C objectif','+3°C trajectoire']}
      ],
      heroTip:'Nobara dit : "CLIMAT = défi #1 humanité. +1,2°C déjà. Sans action : +3°C = catastrophe. Atténuation + adaptation + transition. URGENT, boss SUKUNA !"',
      warmup:[
        {q:'Réchauffement actuel ?',a:'+1,2°C',o:['+1,2°C','+10°C','-5°C']},
        {q:'COP21 a eu lieu à :',a:'Paris',o:['Paris','Tokyo','New York']}
      ]
    }
  }
};

// ═════════════════════════════════════════════════
// 4ÈME — Urbanisation et mondialisation
// ═════════════════════════════════════════════════
window.LESSON_REGISTRY['namek_4eme'] = {
  color:'#ef4444', bg:'#0a0500', textAccent:'#f87171',
  particles:'curse', worldName:'Namek',
  lessons:{
    1:{
      heroName:'Panda',
      heroQuote:'L\'urbanisation mondiale s\'accélère sans fin !',
      rule:'57% humains en ville (2024), 70% prévu en 2050. Mégapoles (>10M hab) : Tokyo, Mumbai, Shanghai. Étalement urbain consomme terres agricoles. Métropolisation = grandes villes concentrent richesse. Bidonvilles dans pays pauvres (Dharavi 1M/2km²).',
      sections:[
        {icon:'🏙️',title:'Mégapoles',color:'#ef4444',
         content:'>10M habitants. Tokyo (37M), Delhi (32M), Shanghai, São Paulo, Mexico, Le Caire, Mumbai. ~30 dans le monde.',
         examples:['Tokyo 37M','Mumbai 21M','São Paulo 22M']},
        {icon:'🏠',title:'Bidonvilles',color:'#fbbf24',
         content:'1Mrd humains en bidonvilles (favelas Rio, slums Mumbai, townships Cape Town). Économie informelle florissante.',
         examples:['Dharavi 1M/2km²','Favelas Rio','Townships SA']},
        {icon:'🌆',title:'Étalement et métropolisation',color:'#a855f7',
         content:'Étalement urbain consomme terres agricoles, dépendance voiture. Métropolisation = grandes villes concentrent + en + (richesse, pouvoir).',
         examples:['Étalement urbain','Métropolisation','Gentrification']}
      ],
      heroTip:'Panda dit : "URBANISATION = 57%, mégapoles, bidonvilles, étalement, ségrégation. Défis = pollution, logement, transports. Solutions = smart cities, éco-quartiers."',
      warmup:[
        {q:'% humains en ville ?',a:'~57%',o:['~57%','10%','99%']},
        {q:'Mégapole =',a:'>10M hab',o:['>10M hab','100k','1k']}
      ]
    },
    2:{
      heroName:'Inumaki',
      heroQuote:'Saumon ! (Migrations, réfugiés, tourisme — les humains bougent !)',
      rule:'280 millions migrants internationaux dans le monde. Causes : économique (emplois), politique (réfugiés - 36M), climatique. 1ère migration : Mexique → USA (12M). Tourisme international : 1,4Mrd touristes/an. France 1ère destination (90M).',
      sections:[
        {icon:'✈️',title:'Migrations',color:'#3b82f6',
         content:'280M migrants internationaux. Économique (Mexique-USA), réfugiés (Syrie, Ukraine), climatique (futur). Diaspora = communauté hors pays.',
         examples:['280M migrants','12M Mexicains aux USA','36M réfugiés']},
        {icon:'🌐',title:'Tourisme',color:'#22c55e',
         content:'1,4Mrd touristes/an (avant Covid). France 1ère destination (90M). Italie, Espagne, USA. Économie majeure.',
         examples:['France 90M','Italie','Espagne']},
        {icon:'🚢',title:'Routes dangereuses',color:'#ef4444',
         content:'Méditerranée : 30 000 morts depuis 2014. Bateaux gonflables, passeurs. Lampedusa = porte Europe. Drame humanitaire.',
         examples:['Méditerranée','Lampedusa','Frontière US-MX']}
      ],
      heroTip:'Inumaki dit : "Saumon ! MOBILITÉS = 280M migrants + 1,4Mrd touristes. Causes variées (emploi, guerre, climat). Mais drames humanitaires. Régulation nécessaire !"',
      warmup:[
        {q:'Migrants internationaux ?',a:'~280M',o:['~280M','100','1Mrd']},
        {q:'1ère destination touristique ?',a:'France',o:['France','USA','Chine']}
      ]
    },
    3:{
      heroName:'Choso',
      heroQuote:'La mondialisation = réseaux invisibles partout ! FMN, OMC, paradis fiscaux !',
      rule:'Mondialisation = explosion échanges depuis 1990. FMN (Apple, Nestlé, Toyota) = 80% commerce mondial. OMC règle commerce. Chine = atelier du monde. DIT (Division Internationale du Travail). Paradis fiscaux cachent 30% richesse.',
      sections:[
        {icon:'🌐',title:'Acteurs',color:'#a855f7',
         content:'FMN (80 000 entreprises mondiales : Apple, Toyota, LVMH). États (USA, Chine). Organisations (ONU, OMC, FMI). ONG. Criminalité.',
         examples:['Apple, Toyota','OMC, ONU','FMI']},
        {icon:'🏭',title:'Production mondiale',color:'#fbbf24',
         content:'Chine = atelier du monde depuis 1990. iPhone = conçu USA, fabriqué Chine, vendu mondial. DIT = chaque pays se spécialise.',
         examples:['Chine atelier','iPhone : 3 continents','DIT']},
        {icon:'💸',title:'Paradis fiscaux',color:'#ef4444',
         content:'Bahamas, Caïmans, Suisse, Luxembourg, Panama. Impôts très bas. Cachent ~30% richesse mondiale. Évasion fiscale FMN.',
         examples:['Bahamas','Suisse','Luxembourg']}
      ],
      heroTip:'Choso dit : "MONDIALISATION = échanges + FMN + Chine atelier + paradis fiscaux. Réseaux invisibles partout. Avantages ET inégalités majeures."',
      warmup:[
        {q:'OMC =',a:'Organisation Mondiale Commerce',o:['Organisation Mondiale Commerce','Sport','Médicament']},
        {q:'Atelier du monde ?',a:'Chine',o:['Chine','Mali','Vatican']}
      ]
    },
    4:{
      heroName:'Naoya',
      heroQuote:'80% du commerce mondial passe par les océans !',
      rule:'80% commerce = bateaux. Canal de Suez (Méditerranée-mer Rouge), Détroit de Malacca (Inde-Chine). ZEE = 200 milles. Singapour 2e port. 99% Internet via câbles sous-marins. Piraterie : Somalie, Asie SE, Golfe Guinée.',
      sections:[
        {icon:'⚓',title:'Routes maritimes',color:'#06b6d4',
         content:'80% commerce mondial = bateaux. Suez (12% commerce), Malacca (25%), Panama. Porte-conteneurs géants : 24 000 conteneurs.',
         examples:['Suez','Malacca','Panama']},
        {icon:'🌊',title:'ZEE et ressources',color:'#3b82f6',
         content:'ZEE = 200 milles. France 2e ZEE mondiale (DROM-COM). Pêche, pétrole offshore (30% prod), gaz, minerais.',
         examples:['ZEE 200 milles','France 2e ZEE','Offshore Mer du Nord']},
        {icon:'🔌',title:'Câbles sous-marins',color:'#a855f7',
         content:'99% Internet mondial passe par 500 câbles sous-marins. Stratégique. Cibles potentielles (sabotage). Marines patrouillent.',
         examples:['500 câbles','99% Internet','Hub Marseille']}
      ],
      heroTip:'Naoya dit : "OCÉANS = autoroutes du commerce mondial. Suez, Malacca = vitales. ZEE = ressources. Câbles sous-marins = Internet. Espaces stratégiques !"',
      warmup:[
        {q:'% commerce par bateau ?',a:'~80%',o:['~80%','10%','100%']},
        {q:'Canal de Suez relie :',a:'Méditerranée et mer Rouge',o:['Méditerranée et mer Rouge','Atlantique-Pacifique','Mer Noire']}
      ]
    },
    5:{
      heroName:'Mei-Mei',
      heroQuote:'L\'Amérique du Nord, puissance et complexité !',
      rule:'USA + Canada + Mexique = 500M hab. USMCA (ex-ALENA) = libre-échange. New York = ville-monde. Silicon Valley = tech. Hollywood = cinéma. Frontière USA-Mexique très contrôlée. Maquiladoras = atelier des USA.',
      sections:[
        {icon:'🗽',title:'USA superpuissance',color:'#3b82f6',
         content:'NY (ville-monde finance), Silicon Valley (tech : Apple, Google), Hollywood (cinéma). Manhattan = CBD. 336M hab.',
         examples:['NY 20M','Silicon Valley','Hollywood']},
        {icon:'🍁',title:'Canada',color:'#ef4444',
         content:'2e + grand pays. Forêts, mines, pétrole. Faible densité (40M hab). Population au sud (frontière USA).',
         examples:['Toronto','Montréal','Vancouver']},
        {icon:'🌮',title:'Mexique',color:'#fbbf24',
         content:'130M hab. Mexico City 22M (mégapole). Maquiladoras = ateliers près frontière USA. Migration vers USA (12M Mexicains).',
         examples:['Mexico 22M','Maquiladoras','Frontière US']}
      ],
      heroTip:'Mei-Mei dit : "Amérique du N. = USMCA + intégration + complémentarités. USA conçoit, Mexique fabrique, Canada matières. Puissance majeure du monde !"',
      warmup:[
        {q:'USMCA = ex-',a:'ALENA',o:['ALENA','UE','OTAN']},
        {q:'Silicon Valley =',a:'Hub tech californien',o:['Hub tech californien','Mine','Plage']}
      ]
    },
    6:{
      heroName:'Ijichi',
      heroQuote:'L\'Afrique — continent d\'avenir avec ses défis !',
      rule:'Afrique = 55 pays, 1,4Mrd hab (2,5Mrd en 2050). Très diversifiée. Sahara au nord, Sahel, savanes, forêts (Congo). 30% des ressources mondiales : pétrole, or, diamants, cobalt. Nigeria 220M = +peuplé. Lagos, Le Caire = mégapoles.',
      sections:[
        {icon:'🦁',title:'Diversité',color:'#fbbf24',
         content:'55 pays. Sahara (nord), Sahel, savanes, forêts équatoriales. Climats variés. Populations très jeunes (40% < 15 ans).',
         examples:['Sahara','Sahel','Forêt Congo']},
        {icon:'💎',title:'Ressources',color:'#a855f7',
         content:'30% ressources mondiales. Pétrole (Nigeria, Angola). Or (Afrique du Sud). Diamants. Cobalt RDC (batteries). Uranium.',
         examples:['Pétrole Nigeria','Or SA','Cobalt RDC']},
        {icon:'🏙️',title:'Mégapoles africaines',color:'#22c55e',
         content:'Le Caire (22M, Égypte), Lagos (15M, Nigeria), Kinshasa, Johannesburg. Boom urbain massif. Bidonvilles + croissance.',
         examples:['Le Caire 22M','Lagos 15M','Kinshasa']}
      ],
      heroTip:'Ijichi dit : "AFRIQUE = continent d\'avenir : ressources + jeunesse + croissance. Mais défis : pauvreté, conflits, climat, gouvernance. Influence Chine forte."',
      warmup:[
        {q:'Combien de pays en Afrique ?',a:'55',o:['55','10','2']},
        {q:'Pays le + peuplé ?',a:'Nigeria (220M)',o:['Nigeria (220M)','Tchad','Mali']}
      ]
    },
    7:{
      heroName:'Geto',
      heroQuote:'L\'Asie de l\'Est, nouveau centre du monde !',
      rule:'Chine + Japon + Corées = 1,7Mrd hab. Chine = "atelier du monde" + 2e PIB mondial + technologies (5G, IA, batteries). Japon = mégapole Tokyo + tech. Corée du S. = K-pop + Samsung. BRI (Belt and Road) = projet chinois. Tensions Taïwan.',
      sections:[
        {icon:'🐉',title:'Chine puissante',color:'#ef4444',
         content:'1,4Mrd hab, 2e PIB mondial. "Atelier du monde". Investit en tech (5G, IA, batteries). BRI vers Europe/Afrique.',
         examples:['Chine 1,4Mrd','Shanghai 25M','BRI']},
        {icon:'🗼',title:'Japon high-tech',color:'#a855f7',
         content:'Tokyo 37M (1ère mégapole mondiale). High-tech, robotique, jeux vidéo. Train Shinkansen. Vieillissement défi.',
         examples:['Tokyo 37M','Shinkansen','Tech robotique']},
        {icon:'🎵',title:'Corée du Sud',color:'#3b82f6',
         content:'Tigre asiatique. Soft power : K-pop (BTS), drama, jeux. Industrie : Samsung, LG, Hyundai. PIB élevé. Tensions Corée du N.',
         examples:['BTS, K-pop','Samsung','Hyundai']}
      ],
      heroTip:'Geto dit : "ASIE EST = nouveau centre mondial. Chine #1 production. Japon/Corée tech. Influence culturelle énorme. Multipolarité du monde !"',
      warmup:[
        {q:'Chine = atelier du monde depuis :',a:'1990',o:['1990','1500','2050']},
        {q:'Plus grande métropole mondiale ?',a:'Tokyo',o:['Tokyo','New York','Paris']}
      ]
    },
    8:{
      heroName:'Yuji',
      heroQuote:'Bilan mondialisation — gagnants et perdants. SUKUNA, boss final 4ème !',
      rule:'Mondialisation a augmenté richesse mondiale. Gagnants : émergents (Chine, Inde, Vietnam) sortis pauvreté. Perdants : PMA + désindustrialisés. Inégalités explosent : 1% détient 38% richesse. Empreinte écologique = 1,7 Terre.',
      sections:[
        {icon:'📈',title:'Gagnants',color:'#22c55e',
         content:'Émergents (Chine, Inde, Vietnam) sortis de la pauvreté. Cadres FMN. Élites mondialisées (Silicon Valley, Wall Street).',
         examples:['Chine','Inde','Vietnam']},
        {icon:'📉',title:'Perdants',color:'#ef4444',
         content:'PMA (Tchad, Mali) restés pauvres. Régions désindustrialisées (Détroit, Nord France). Ouvriers, paysans, peu qualifiés.',
         examples:['PMA','Détroit','Nord France']},
        {icon:'🌍',title:'Impact écologique',color:'#fbbf24',
         content:'Empreinte = 1,7 Terre. + transport = + CO2. Pollution. Solutions : régulation, commerce équitable, DD.',
         examples:['1,7 Terre','+ CO2','Démondialisation']}
      ],
      heroTip:'Yuji dit : "BILAN mondialisation = mixte. Gains (richesse, sortie pauvreté Asie) + Inégalités (1% = 38%) + Pollution. SUKUNA, boss final, je suis prêt !"',
      warmup:[
        {q:'Empreinte écologique mondiale ?',a:'1,7 Terre',o:['1,7 Terre','0,5','100']},
        {q:'Gagnants mondialisation ?',a:'Chine, Inde, Vietnam',o:['Chine, Inde, Vietnam','PMA','Tous']}
      ]
    }
  }
};

// ═════════════════════════════════════════════════
// 3ÈME — France, Europe, mondialisation (BREVET)
// ═════════════════════════════════════════════════
window.LESSON_REGISTRY['namek_3eme'] = {
  color:'#3b82f6', bg:'#0a0500', textAccent:'#60a5fa',
  particles:'curse', worldName:'Namek',
  lessons:{
    1:{
      heroName:'Gojo',
      heroQuote:'Les aires urbaines françaises sont nos foyers de vie !',
      rule:'~700 aires urbaines en France (INSEE). 95% des Français y vivent. Aire urbaine = pôle + couronne périurbaine. Top 5 : Paris (12,7M), Lyon (2,3M), Marseille (1,8M), Lille (1,5M), Toulouse (1,4M). Métropolisation + périurbanisation.',
      sections:[
        {icon:'🏙️',title:'Top aires urbaines',color:'#3b82f6',
         content:'Paris 12,7M (1ère Europe). Lyon 2,3M. Marseille 1,8M. Lille 1,5M. Toulouse 1,4M. Concentrent emplois et services.',
         examples:['Paris 12,7M','Lyon 2,3M','Toulouse 1,4M']},
        {icon:'🏘️',title:'Périurbanisation',color:'#22c55e',
         content:'Pavillons en périphérie. ~30% Français. Voiture obligatoire. Étalement urbain consomme campagnes.',
         examples:['Pavillons','Étalement','Voiture obligatoire']},
        {icon:'🏗️',title:'Rénovation urbaine',color:'#ef4444',
         content:'Quartiers populaires rénovés (ANRU). Gentrification (Marais Paris). Métropolisation = grandes villes concentrent richesse.',
         examples:['ANRU','Gentrification','Métropolisation']}
      ],
      heroTip:'Gojo dit : "AIRES URBAINES = 95% Français. Métropolisation + étalement + ségrégation + rénovation. Paris = 1ère Europe. Comprendre ces dynamiques = clé du Brevet !"',
      warmup:[
        {q:'Combien aires urbaines en France ?',a:'~700',o:['~700','10','100 000']},
        {q:'1ère aire urbaine ?',a:'Paris (12,7M)',o:['Paris (12,7M)','Lyon','Marseille']}
      ]
    },
    2:{
      heroName:'Yuji',
      heroQuote:'La France produit, exporte, innove — puissance économique !',
      rule:'France = 7e PIB mondial. 3 secteurs : primaire (agriculture 1ère UE), secondaire (industries : Airbus, auto, pharma), tertiaire (75% emplois : services, finance, tourisme). Leader mondial vin, luxe (LVMH), tourisme (90M visiteurs/an).',
      sections:[
        {icon:'🌾',title:'Agriculture',color:'#22c55e',
         content:'1ère agriculture UE. Blé (Beauce), vin (Bordeaux, Champagne), lait (Normandie). PAC = 9Mrd€/an. Bio en hausse (12%).',
         examples:['Beauce blé','Bordeaux vin','PAC 9Mrd€']},
        {icon:'✈️',title:'Industries',color:'#ef4444',
         content:'Aéronautique (Airbus Toulouse, 2e mondial), auto (Renault, Peugeot), pharma (Sanofi). Désindustrialisation Nord/Lorraine.',
         examples:['Airbus Toulouse','Renault','Sanofi']},
        {icon:'💼',title:'Services et luxe',color:'#a855f7',
         content:'75% emplois en tertiaire. Finance (Paris). Luxe (LVMH 1ère valorisation Europe). Tourisme : 90M visiteurs (1er mondial).',
         examples:['LVMH','Paris finance','Tourisme 90M']}
      ],
      heroTip:'Yuji dit : "FRANCE PRODUIT = agriculture (1ère UE) + industries (Airbus, auto) + services (luxe, tourisme). 7e PIB mondial. Atouts variés !"',
      warmup:[
        {q:'1ère industrie française ?',a:'Aéronautique',o:['Aéronautique','Pétrole','Charbon']},
        {q:'1ère destination touristique ?',a:'France',o:['France','USA','Chine']}
      ]
    },
    3:{
      heroName:'Megumi',
      heroQuote:'La diagonale du vide — espaces à ressusciter !',
      rule:'Diagonale du vide = bande Ardennes-Landes peu peuplée (Massif Central, Lozère 14 hab/km²). Causes : relief, exode rural, fermeture services. Lozère = département le moins peuplé. Hyper-ruralité. Néo-ruraux et télétravail = espoir.',
      sections:[
        {icon:'🏞️',title:'Diagonale du vide',color:'#22c55e',
         content:'Bande NE-SO peu peuplée. Lozère 14 hab/km². Massif Central, Ardennes, Landes. Densité moyenne France 120 hab/km².',
         examples:['Lozère 14/km²','Ardennes','Massif Central']},
        {icon:'🚪',title:'Désertification',color:'#ef4444',
         content:'Exode rural ancien. Fermeture écoles, hôpitaux, postes. Désert médical = pas assez de médecins. 30% Français concernés.',
         examples:['Exode rural','Désert médical','Fermeture services']},
        {icon:'🌟',title:'Renouveau',color:'#fbbf24',
         content:'Néo-ruraux (citadins post-Covid). Télétravail. PNR (58 parcs naturels régionaux). Action Cœur de Ville (222 villes moyennes).',
         examples:['Néo-ruraux','Télétravail','PNR Cévennes']}
      ],
      heroTip:'Megumi dit : "DIAGONALE DU VIDE = défi français. Solutions = numérique + tourisme + politiques. Néo-ruraux + télétravail = espoir post-Covid."',
      warmup:[
        {q:'Département le moins peuplé ?',a:'Lozère',o:['Lozère','Paris','Bouches-du-Rhône']},
        {q:'Densité moyenne France ?',a:'~120 hab/km²',o:['~120 hab/km²','1000','10']}
      ]
    },
    4:{
      heroName:'Nobara',
      heroQuote:'La France au cœur de l\'UE, 27 pays unis !',
      rule:'UE = 27 pays depuis Brexit (2020). 450M habitants. Zone euro = 20 pays. Schengen = libre circulation. France = pays fondateur (1957 Rome). Bruxelles = capitale UE. PAC, marché unique, paix. Concurrence USA/Chine.',
      sections:[
        {icon:'🇪🇺',title:'27 pays',color:'#3b82f6',
         content:'27 États membres. 450M hab. Élargissements successifs. Brexit 2020 (UK sort). 6 fondateurs : France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg.',
         examples:['27 pays','Brexit 2020','6 fondateurs']},
        {icon:'💶',title:'Euro et Schengen',color:'#fbbf24',
         content:'20 pays utilisent l\'euro (zone euro). Schengen = pas de douanes (27 pays + Suisse, Norvège). Libre circulation totale.',
         examples:['Zone euro 20','Schengen 27','Libre circulation']},
        {icon:'🏛️',title:'Institutions',color:'#a855f7',
         content:'Bruxelles = Commission. Strasbourg = Parlement (705 députés). Luxembourg = Cour Justice. France co-leader avec Allemagne.',
         examples:['Bruxelles','Strasbourg','Luxembourg']}
      ],
      heroTip:'Nobara dit : "UE = 27 pays + euro + Schengen + paix. France = pays fondateur, leader. Réussites = paix, marché unique, mobilité. Brevet = essentiel !"',
      warmup:[
        {q:'Combien de pays UE ?',a:'27',o:['27','100','2']},
        {q:'Capitale UE ?',a:'Bruxelles',o:['Bruxelles','Paris','Berlin']}
      ]
    },
    5:{
      heroName:'Nanami',
      heroQuote:'7h - 19h. La France rayonne dans la mondialisation.',
      rule:'France = 7e PIB mondial. ~2,5M Français à l\'étranger. Francophonie : 320M parlent français. FMN : LVMH (1ère Europe), TotalEnergies, L\'Oréal. Soft power : cinéma (Cannes), gastronomie UNESCO, mode. Conseil Sécurité ONU. DROM-COM = 2e ZEE mondiale.',
      sections:[
        {icon:'💼',title:'FMN françaises',color:'#a855f7',
         content:'LVMH (1ère valorisation Europe), TotalEnergies, L\'Oréal, Sanofi, Carrefour, Renault. Influence économique mondiale.',
         examples:['LVMH','TotalEnergies','L\'Oréal']},
        {icon:'🎬',title:'Soft power',color:'#3b82f6',
         content:'Cinéma (Cannes), gastronomie (UNESCO), mode (Chanel, Dior), parfums (Grasse). Académie française. Influence culturelle.',
         examples:['Cannes','UNESCO gastro','Chanel, Dior']},
        {icon:'🌐',title:'Diplomatie',color:'#22c55e',
         content:'Conseil Sécurité ONU (5 permanents). DROM-COM (2e ZEE mondiale). 320M francophones (Afrique, Canada, Belgique, Suisse).',
         examples:['Conseil Sécurité ONU','DROM-COM','320M francophones']}
      ],
      heroTip:'Nanami dit : "7h - 19h. FRANCE MONDIALISÉE = économie + culture + diplomatie + outre-mer. Influence majeure mais puissance moyenne face à USA/Chine."',
      warmup:[
        {q:'Rang économique France ?',a:'7e PIB',o:['7e PIB','100e','1er']},
        {q:'Combien francophones ?',a:'~320M',o:['~320M','100','1Mrd']}
      ]
    },
    6:{
      heroName:'Maki',
      heroQuote:'Aménager les territoires — réduire les inégalités !',
      rule:'Aménagement = État organise espace pour réduire inégalités. ANRU = rénovation urbaine (700 quartiers, 50Mrd€). QPV = ~1500 quartiers prioritaires. Loi SRU = 20%+ logements sociaux. TGV = aménagement majeur. CPER État-Régions. PNR (58 parcs).',
      sections:[
        {icon:'🏗️',title:'ANRU',color:'#ef4444',
         content:'Agence Nationale Rénovation Urbaine. 700 quartiers populaires rénovés. 50Mrd€ depuis 2003. Démolition + reconstruction.',
         examples:['ANRU 2003','700 quartiers','50Mrd€']},
        {icon:'🏘️',title:'Loi SRU et QPV',color:'#3b82f6',
         content:'Loi SRU 2000 : communes >3500 hab doivent 20-25% logements sociaux. 1500 QPV (Quartiers Prioritaires). Mixité sociale.',
         examples:['Loi SRU 2000','1500 QPV','Mixité sociale']},
        {icon:'🚄',title:'Aménagements majeurs',color:'#a855f7',
         content:'TGV (Paris-Marseille en 3h). Action Cœur de Ville (222 villes moyennes). Euroméditerranée Marseille. Lyon-Confluence.',
         examples:['TGV','Action Cœur Ville','Euroméditerranée']}
      ],
      heroTip:'Maki dit : "AMÉNAGER = réduire inégalités territoriales (urbain/rural, riches/pauvres). ANRU + SRU + TGV + PNR = outils. Transition écologique = nouveau défi."',
      warmup:[
        {q:'ANRU =',a:'Rénovation urbaine',o:['Rénovation urbaine','Sport','Médicament']},
        {q:'Loi SRU oblige :',a:'20%+ logements sociaux',o:['20%+ logements sociaux','100%','Aucun']}
      ]
    },
    7:{
      heroName:'Yuta',
      heroQuote:'Défendre la République et ses valeurs — mission sacrée !',
      rule:'Armée française = 200k soldats actifs. OTAN (32 pays depuis Suède/Finlande). Devise : Liberté Égalité Fraternité. Ve République 1958. ONU : France = membre permanent Conseil Sécurité (5 : USA, Chine, Russie, France, UK). Dissuasion nucléaire. Cyberdéfense.',
      sections:[
        {icon:'🪖',title:'Forces armées',color:'#ef4444',
         content:'200k actifs + 40k réservistes. 1ère armée UE après Brexit. Budget ~50Mrd€/an. OPEX (opérations extérieures) : Mali, Liban.',
         examples:['200k actifs','OTAN','OPEX Mali']},
        {icon:'⚛️',title:'Dissuasion nucléaire',color:'#a855f7',
         content:'4 sous-marins nucléaires (SNLE) + Rafale. ~290 ogives. Indépendance militaire. France = 5e puissance nucléaire mondiale.',
         examples:['4 SNLE','Rafale','290 ogives']},
        {icon:'🇫🇷',title:'Valeurs républicaines',color:'#3b82f6',
         content:'Liberté Égalité Fraternité (1789). Ve République 1958. Démocratie représentative. Conseil Sécurité ONU permanent.',
         examples:['Devise 1789','Ve République','ONU permanent']}
      ],
      heroTip:'Yuta dit : "DÉFENSE FRANÇAISE = armée + dissuasion + cyber + alliances (OTAN, UE). Valeurs républicaines au cœur. Mission : protéger la nation et ses citoyens !"',
      warmup:[
        {q:'Devise française ?',a:'Liberté Égalité Fraternité',o:['Liberté Égalité Fraternité','Argent','Pouvoir']},
        {q:'Conseil Sécurité ONU permanents ?',a:'5 (USA, Chine, Russie, France, UK)',o:['5 (USA, Chine, Russie, France, UK)','100','2']}
      ]
    },
    8:{
      heroName:'Todo',
      heroQuote:'BROTHER ! Géopolitique mondiale — boss SUKUNA, BREVET final !',
      rule:'Monde multipolaire (USA, Chine, UE, Russie, BRICS+). Conflits : Ukraine (2022), Gaza (2023-24), tensions Taïwan. Climat enjeu géopolitique majeur (migrations, ressources Arctique). COP climat. Terrorisme (Daech, Al-Qaïda). Défi 21e siècle complexe.',
      sections:[
        {icon:'🌐',title:'Multipolarité',color:'#a855f7',
         content:'USA décline relativement, Chine monte, UE, Russie, Inde, Brésil. BRICS+ élargi 2024 (Iran, Émirats, Égypte, Éthiopie).',
         examples:['USA','Chine','BRICS+ 2024']},
        {icon:'⚔️',title:'Conflits actuels',color:'#ef4444',
         content:'Ukraine (févr 2022, Russie envahit). Gaza (oct 2023). Tensions Taïwan-Chine. Sahel (terrorisme). OTAN élargie (Suède, Finlande).',
         examples:['Ukraine 2022','Gaza 2023','Taïwan']},
        {icon:'🌡️',title:'Climat géopolitique',color:'#22c55e',
         content:'Migrations climatiques. Tensions ressources (eau Moyen-Orient). Course Arctique (gaz, routes maritimes). COP climat ONU.',
         examples:['Migrations climatiques','Conflits eau','Course Arctique']}
      ],
      heroTip:'Todo dit : "BROTHER ! GÉOPOLITIQUE = multipolarité + conflits + climat + inégalités. Avenir incertain. SUKUNA, BREVET FINAL, je suis prêt à passer !"',
      warmup:[
        {q:'Guerre Russie-Ukraine ?',a:'24 février 2022',o:['24 février 2022','2010','2050']},
        {q:'BRICS+ inclut désormais :',a:'Iran, Émirats, Égypte',o:['Iran, Émirats, Égypte','Suisse','Norvège']}
      ]
    }
  }
};

console.info('🔮 lesson-data-namek.js — 5 niveaux × 8 leçons Géographie × JJK chargées (LESSON_REGISTRY V2)');
