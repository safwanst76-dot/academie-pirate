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

console.info('🔮 lesson-data-namek.js — 8 leçons CM2 Géographie × JJK chargées (LESSON_REGISTRY V2)');
