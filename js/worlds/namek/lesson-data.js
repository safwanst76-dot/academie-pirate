// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA.JS — 🔮 Namek — Géographie / Jujutsu Kaisen
// Données pédagogiques : règles, exemples, questions échauffement
// Moteur : js/lesson.js (ne pas modifier ici)
// Règle A3 : les données sont séparées du moteur
// Programme : "Habiter une métropole" — 6ème Géographie (Eduscol)
// ═══════════════════════════════════════════════════════════════════

// Enregistrement dans le registry global
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['namek'] = {
  color: '#7c3aed', bg: '#0a0208', textAccent: '#38bdf8',
  particles: 'star', worldName: 'Namek',
  avatar: function(n) {
    var SUPABASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-namek';
    var map = { 1:'yuji', 2:'megumi', 3:'nobara', 4:'gojo', 5:'nanami', 6:'sukuna', 7:'todo', 8:'inumaki' };
    return SUPABASE + '/characters/' + (map[n] || 'yuji') + '.jpg';
  },
  lessons: {

    1: {
      heroName: 'Yuji Itadori',
      heroQuote: "Je cours partout pour sauver les gens — c'est l'exode rural à l'envers ! Partons à la découverte de l'urbanisation !",
      rule: "L'urbanisation = concentration croissante de la population dans les villes. En 2007, pour la première fois, les citadins ont dépassé les ruraux. En 2050 : 7 milliards de citadins.",
      sections: [
        {
          icon: '🌍', title: "Qu'est-ce que l'urbanisation ?", color: '#e63946',
          content: "L'<strong>urbanisation</strong> désigne l'augmentation de la part de la population vivant en ville. C'est l'un des grands phénomènes géographiques du XXIe siècle.",
          examples: [
            "1900 : 1 habitant sur 10 en ville (10 %)",
            "2007 : bascule historique — 50 % de citadins pour la 1ère fois",
            "2025 : ~55 % de la population mondiale est urbaine",
            "2050 : ~66 % soit environ 7 milliards de citadins"
          ]
        },
        {
          icon: '🌿', title: "Population urbaine et rurale", color: '#38bdf8',
          content: "La <strong>population urbaine</strong> vit en ville. La <strong>population rurale</strong> vit à la campagne. L'<strong>exode rural</strong> = mouvement des campagnes vers les villes en quête d'emploi.",
          examples: [
            "Europe et Amérique du Nord : plus de 75 % de population urbaine",
            "Afrique et Asie : croissance urbaine la plus rapide aujourd'hui",
            "Exode rural : cause principale de la croissance des villes des PED"
          ]
        },
        {
          icon: '🏘️', title: "Organisation d'une ville", color: '#7c3aed',
          content: "Du centre vers la périphérie : <strong>ville-centre</strong> → <strong>banlieue</strong> → <strong>espaces périurbains</strong> (zones qui s'urbanisent aux dépens des campagnes). Ville-centre + banlieue = <strong>agglomération</strong>.",
          examples: [
            "Étalement urbain = la ville grignote les campagnes",
            "Agglomération parisienne : Paris + banlieues = 12 millions d'habitants",
            "Espaces périurbains : entre la ville et la campagne"
          ]
        }
      ],
      heroTip: "Yuji dit : \"3 chiffres à retenir → 2007 (bascule) · 55 % (aujourd'hui) · 7 milliards (2050). Mémorise-les !\"",
      warmup: [
        { q: "Depuis quelle année la majorité de l'humanité vit-elle en ville ?", a: "2007", o: ["1950", "1980", "2007", "2020"] },
        { q: "L'exode rural désigne :", a: "Le mouvement des campagnes vers les villes", o: ["Le mouvement des villes vers les campagnes", "Le mouvement des campagnes vers les villes", "La croissance de la population rurale"] }
      ]
    },

    2: {
      heroName: 'Megumi Fushiguro',
      heroQuote: "Technique des Dix Ombres — chaque ombre est une ville. Apprends à les distinguer : métropole, mégapole, mégalopole.",
      rule: "Métropole = grande ville concentrant habitants, activités et pouvoirs de commandement. Mégapole = +10 millions d'habitants. Mégalopole = réseau de métropoles connectées.",
      sections: [
        {
          icon: '🏙️', title: "La métropole", color: '#1e3a5f',
          content: "Une <strong>métropole</strong> est une très grande ville qui concentre habitants, activités variées et fonctions de commandement. Elle est <strong>cosmopolite</strong> : ses habitants viennent de partout.",
          examples: [
            "4 fonctions : habitat · activités économiques · transports · tourisme/loisirs",
            "CBD (Central Business District) = quartier d'affaires avec gratte-ciels",
            "Exemples : Paris, Londres, Tokyo, New York, Lagos"
          ]
        },
        {
          icon: '🌆', title: "Mégapole et mégalopole", color: '#38bdf8',
          content: "<strong>Mégapole</strong> = ville de plus de <strong>10 millions d'habitants</strong>. <strong>Mégalopole</strong> = réseau de plusieurs métropoles proches et connectées.",
          examples: [
            "Top mégapoles 2025 : Tokyo (37M) · Delhi (32M) · Shanghai (24M) · São Paulo (22M)",
            "Mégalopole BosWash (Boston-New York-Washington) : ~700 km",
            "Mégalopole japonaise Tokaido (Tokyo-Osaka-Hiroshima) : ~700 km"
          ]
        },
        {
          icon: '🌐', title: "Les villes mondiales", color: '#7c3aed',
          content: "Une <strong>ville mondiale</strong> joue un rôle de commandement dans l'économie mondiale. Les 3 majeures : <strong>New York</strong>, <strong>Londres</strong>, <strong>Tokyo</strong>.",
          examples: [
            "Wall Street (New York), City (Londres), TSE (Tokyo) = Bourses mondiales",
            "Agglomération = ville-centre + banlieues",
            "Paris intra-muros : 2M · Agglomération parisienne : 12M d'habitants"
          ]
        }
      ],
      heroTip: "Megumi dit : \"Mémo : Métropole = grande ville · Mégapole = +10M habitants · Mégalopole = réseau de métropoles. Les 3 méga !\"",
      warmup: [
        { q: "Qu'est-ce qu'une mégapole ?", a: "Une ville de plus de 10 millions d'habitants", o: ["Une ville de plus de 10 millions d'habitants", "Un réseau de villes", "Un quartier d'affaires"] },
        { q: "Quel est le CBD de New York ?", a: "Wall Street / Midtown Manhattan", o: ["Harlem", "Wall Street / Midtown Manhattan", "Brooklyn"] }
      ]
    },

    3: {
      heroName: 'Nobara Kugisaki',
      heroQuote: "Je viens de la campagne et je suis arrivée à Tokyo ! C'est exactement ce qu'on étudie avec New York — une métropole de pays développé !",
      rule: "New York = exemple de métropole d'un pays développé. Fonctions mondiales (ONU, Wall Street), cosmopolite, organisée en CBD + quartiers divers + suburbs. Problème : gentrification et ségrégation.",
      sections: [
        {
          icon: '🗽', title: "New York en chiffres", color: '#e91e8c',
          content: "New York est la plus grande ville des <strong>États-Unis</strong> (pays développé). Aire urbaine : <strong>~20 millions d'habitants</strong>. L'une des 3 villes mondiales majeures.",
          examples: [
            "5 boroughs : Manhattan · Brooklyn · Queens · Bronx · Staten Island",
            "Wall Street = centre financier mondial (Bourse NYSE)",
            "Siège de l'ONU = rôle politique mondial unique",
            "Plus de 800 langues parlées = ville cosmopolite"
          ]
        },
        {
          icon: '🏘️', title: "Organisation et inégalités", color: '#38bdf8',
          content: "Manhattan concentre le <strong>CBD</strong> (Wall Street, Midtown) et des quartiers très différents. La <strong>gentrification</strong> : un quartier populaire se rénove, les loyers montent, les habitants modestes partent.",
          examples: [
            "Upper East Side (riche) vs South Bronx (défavorisé) : ségrégation socio-spatiale",
            "Harlem : en cours de gentrification",
            "Mégalopole BosWash : New York au centre (Boston → New York → Washington)",
            "Espaces périurbains (New Jersey, Long Island) : étalement urbain"
          ]
        }
      ],
      heroTip: "Nobara dit : \"New York = pays développé → CBD + cosmopolite + suburbs. Retiens : gentrification = rénovation → loyers montent → pauvres partent !\"",
      warmup: [
        { q: "New York est un exemple de métropole d'un pays :", a: "Développé", o: ["En développement", "Développé", "Émergent"] },
        { q: "Qu'est-ce que la gentrification ?", a: "La rénovation d'un quartier qui chasse les habitants modestes", o: ["La construction de bidonvilles", "La rénovation d'un quartier qui chasse les habitants modestes", "L'étalement urbain"] }
      ]
    },

    4: {
      heroName: 'Satoru Gojo',
      heroQuote: "Même les yeux bandés je vois les inégalités de Lagos. Makoko sur l'eau d'un côté, Victoria Island de l'autre — c'est la ségrégation socio-spatiale.",
      rule: "Lagos (Nigeria) = exemple de métropole d'un pays en développement (PED). Croissance rapide : exode rural + forte natalité. Bidonvilles (Makoko) vs quartiers riches (Victoria Island) = ségrégation socio-spatiale.",
      sections: [
        {
          icon: '🌍', title: "Lagos, métropole du Nigeria", color: '#38bdf8',
          content: "Lagos est la plus grande ville du <strong>Nigeria</strong>, un Pays En Développement (PED). Environ <strong>15 millions de Lagossiens</strong>. Elle grandit d'environ 300 000 personnes par an.",
          examples: [
            "Causes : exode rural + fort taux de natalité",
            "PED = conditions de vie insuffisantes mais en progression",
            "Lagos : une des villes à croissance la plus rapide du monde"
          ]
        },
        {
          icon: '🏚️', title: "Makoko et Victoria Island", color: '#e63946',
          content: "<strong>Makoko</strong> = bidonville lacustre sur pilotis (planches, tôles, sans eau ni électricité). <strong>Victoria Island</strong> = quartier d'affaires luxueux. Ces deux réalités côte à côte = <strong>ségrégation socio-spatiale</strong>.",
          examples: [
            "Bidonville = logements précaires en matériaux de récupération",
            "Problème du relogement en périphérie : éloignement du travail et des réseaux",
            "PED vs pays développé : Lagos ≠ New York en termes de logement"
          ]
        }
      ],
      heroTip: "Gojo dit : \"Lagos = PED + exode rural + Makoko (bidonville) + Victoria Island (luxe) = ségrégation socio-spatiale. Deux mondes dans une même ville !\"",
      warmup: [
        { q: "Makoko est un quartier de Lagos caractérisé par :", a: "Un bidonville construit sur l'eau", o: ["Un quartier d'affaires luxueux", "Un bidonville construit sur l'eau", "Un parc naturel"] },
        { q: "La coexistence de quartiers très riches et très pauvres dans une même ville s'appelle :", a: "La ségrégation socio-spatiale", o: ["L'étalement urbain", "La ségrégation socio-spatiale", "La métropolisation"] }
      ]
    },

    5: {
      heroName: 'Nanami Kento',
      heroQuote: "Précision et méthode. Les bidonvilles portent différents noms selon les pays. Favelas, slums, townships : il faut les connaître tous.",
      rule: "Bidonville = logements précaires en matériaux de récupération. Noms : favelas (Brésil) · slums (Inde) · townships (Afrique du Sud). 1 milliard de personnes aujourd'hui, 3 milliards en 2050 selon l'ONU.",
      sections: [
        {
          icon: '🏚️', title: "Les bidonvilles dans le monde", color: '#d4a254',
          content: "Un <strong>bidonville</strong> est un quartier pauvre où les maisons sont construites avec des matériaux de récupération. Manque d'eau potable, d'électricité et d'assainissement.",
          examples: [
            "🇧🇷 Brésil → favelas (Rocinha à Rio : 70-150 000 hab.)",
            "🇮🇳 Inde → slums (Dharavi à Mumbai : ~1 million sur 2 km²)",
            "🇿🇦 Afrique du Sud → townships (Soweto à Johannesburg)",
            "🇰🇪 Kenya → Kibera à Nairobi : l'un des plus grands d'Afrique"
          ]
        },
        {
          icon: '📊', title: "Chiffres clés et causes", color: '#e63946',
          content: "Aujourd'hui : <strong>1 milliard</strong> de personnes en bidonvilles. En 2050 : <strong>3 milliards</strong> selon l'ONU. Cause : croissance urbaine plus rapide que la construction de logements décents.",
          examples: [
            "Paraisopolis (São Paulo) = bidonville collé à un quartier luxueux → ségrégation",
            "ONU-Habitat défend le 'droit à la ville' pour tous",
            "Reloger en périphérie : problème d'éloignement du travail et des réseaux"
          ]
        }
      ],
      heroTip: "Nanami dit : \"Brésil = FAVELAS · Inde = SLUMS · Afrique du Sud = TOWNSHIPS. Et 3 milliards en 2050 sans action. Précision !\"",
      warmup: [
        { q: "Comment appelle-t-on les bidonvilles au Brésil ?", a: "Favelas", o: ["Slums", "Townships", "Favelas"] },
        { q: "Dharavi à Mumbai est un exemple de :", a: "Slum (bidonville en Inde)", o: ["Quartier d'affaires", "Slum (bidonville en Inde)", "Écoquartier"] }
      ]
    },

    6: {
      heroName: 'Ryomen Sukuna',
      heroQuote: "Roi des Fléaux — je règne sur les territoires ségrégués. Ville-centre, banlieue, espaces périurbains : connais l'organisation d'une métropole.",
      rule: "Organisation d'une métropole (centre → périphérie) : ville-centre → banlieue → espaces périurbains → campagnes. Ségrégation socio-spatiale = séparation des groupes sociaux dans l'espace urbain.",
      sections: [
        {
          icon: '🏙️', title: "Organisation concentrique d'une métropole", color: '#7c3aed',
          content: "Les métropoles s'organisent en cercles du centre vers la périphérie :<br><strong>1.</strong> Ville-centre (noyau historique, CBD)<br><strong>2.</strong> Banlieue (extension urbaine)<br><strong>3.</strong> Espaces périurbains (s'urbanisent aux dépens des campagnes)<br><strong>4.</strong> Campagnes",
          examples: [
            "Agglomération = ville-centre + banlieue",
            "Étalement urbain = la ville grignote les espaces périurbains et les campagnes",
            "Gated communities = résidences fermées et sécurisées pour les habitants aisés"
          ]
        },
        {
          icon: '⚖️', title: "Ségrégation et inégalités", color: '#e63946',
          content: "La <strong>ségrégation socio-spatiale</strong> est la séparation des groupes sociaux dans l'espace urbain. Elle existe dans toutes les métropoles, riches comme pauvres.",
          examples: [
            "New York : Upper East Side (riche) vs South Bronx (défavorisé)",
            "São Paulo : Paraisopolis (bidonville) vs Morumbi (luxe) séparés par un mur",
            "Johannesburg : townships hérités de l'apartheid vs quartiers aisés",
            "Rénovation urbaine = améliorer les quartiers défavorisés"
          ]
        }
      ],
      heroTip: "Sukuna dit : \"L'organisation : Ville-centre → Banlieue → Périurbain → Campagne. Ségrégation = riches d'un côté, pauvres de l'autre. À savoir absolument !\"",
      warmup: [
        { q: "L'organisation d'une métropole du centre vers la périphérie est :", a: "Ville-centre → Banlieue → Espaces périurbains → Campagnes", o: ["Banlieue → Ville-centre → Campagnes", "Ville-centre → Banlieue → Espaces périurbains → Campagnes", "Campagnes → Banlieue → Ville-centre"] },
        { q: "Les 'gated communities' sont :", a: "Des résidences fermées et sécurisées pour les aisés", o: ["Des bidonvilles", "Des résidences fermées et sécurisées pour les aisés", "Des écoquartiers"] }
      ]
    },

    7: {
      heroName: 'Aoi Todo',
      heroQuote: "Dis-moi ta ville préférée ! BOOGIE WOOGIE — on téléporte les villes sur le planisphère ! New York, Lagos, Tokyo, São Paulo : connais leurs continents !",
      rule: "Repères indispensables : Tokyo (Asie/Japon) · New York (Amér. du Nord/USA) · Lagos (Afrique/Nigeria) · São Paulo (Amér. du Sud/Brésil) · Paris (Europe/France) · Mumbai (Asie/Inde) · Le Caire (Afrique/Égypte).",
      sections: [
        {
          icon: '🗺️', title: "Les grandes métropoles mondiales", color: '#15803d',
          content: "Sache <strong>localiser</strong> ces métropoles sur un planisphère et connaître leur continent et pays :",
          examples: [
            "🇯🇵 Tokyo (Asie, Japon) → ~37M = plus grande aire urbaine du monde",
            "🇺🇸 New York (Amér. du Nord, USA) → ~20M = ville mondiale",
            "🇳🇬 Lagos (Afrique, Nigeria) → ~15M = plus grande ville d'Afrique de l'Ouest",
            "🇧🇷 São Paulo (Amér. du Sud, Brésil) → ~22M",
            "🇮🇳 Delhi (Asie, Inde) → ~32M = 2e aire urbaine mondiale",
            "🇫🇷 Paris (Europe, France) → ~12M (agglomération)",
            "🇨🇳 Shanghai (Asie, Chine) → ~24M"
          ]
        },
        {
          icon: '🌐', title: "Les 3 villes mondiales majeures", color: '#38bdf8',
          content: "🗽 <strong>New York</strong> (Wall Street, ONU) · 🎡 <strong>Londres</strong> (City, finance) · 🗼 <strong>Tokyo</strong> (Bourse TSE, technologie) = les 3 villes qui commandent l'économie mondiale.",
          examples: [
            "Buenos Aires = Amérique du Sud (Argentine) — ne pas confondre !",
            "Séoul = Asie (Corée du Sud)",
            "Mumbai = Asie (Inde) — anciennement Bombay"
          ]
        }
      ],
      heroTip: "Todo dit : \"Mémo : Tokyo=Japon · New York=USA · Lagos=Nigeria · São Paulo=Brésil · Le Caire=Égypte · Delhi=Inde · Londres=Royaume-Uni. KAKICHI !\"",
      warmup: [
        { q: "Sur quel continent se trouve Lagos ?", a: "Afrique", o: ["Asie", "Afrique", "Amérique"] },
        { q: "Quelle est la plus grande aire urbaine du monde ?", a: "Tokyo", o: ["New York", "Delhi", "Tokyo"] }
      ]
    },

    8: {
      heroName: 'Toge Inumaki',
      heroQuote: "Saumon... (= Révisions finales ! Smart city, écoquartier, développement durable — la ville de demain c'est maintenant !)",
      rule: "Développement durable = 3 piliers : économique + social + environnemental. Écoquartier = quartier durable. Smart city = ville intelligente numérique. Problématique : 'Habiter et cohabiter durablement dans une métropole ?'",
      sections: [
        {
          icon: '🌱', title: "Développement durable et ville", color: '#059669',
          content: "Le <strong>développement durable</strong> = satisfaire les besoins présents sans compromettre ceux des générations futures. <strong>3 piliers</strong> : économique (prospérité) + social (équité) + environnemental (nature).",
          examples: [
            "Écoquartier = bâtiments éco, transports propres, espaces verts, mixité sociale",
            "Vauban (Fribourg) et Hammarby (Stockholm) = exemples d'écoquartiers",
            "Smart city = capteurs, apps transport, gestion numérique",
            "Songdo (Corée du Sud) = 1ère smart city construite de zéro"
          ]
        },
        {
          icon: '🏙️', title: "Bilan : habiter une métropole", color: '#7c3aed',
          content: "Problématique officielle : <strong>'Comment habiter et cohabiter durablement dans une métropole ?'</strong> Les métropoles attirent (emplois, services) mais créent des inégalités (ségrégation). La ville durable cherche l'équilibre.",
          examples: [
            "Ville inclusive = accès équitable aux services pour tous",
            "Mixité sociale = mélange de personnes de différentes origines",
            "Dubai : croissance basée sur le pétrole → métropole ultramoderne",
            "Rénovation urbaine = améliorer les quartiers défavorisés"
          ]
        }
      ],
      heroTip: "Inumaki dit : \"Saumon ! (= 3 piliers : ECO + SOCIAL + ENVIRO. Problématique : 'Habiter ET cohabiter durablement'. Smart city + écoquartier = ville de demain !)\"",
      warmup: [
        { q: "Quels sont les 3 piliers du développement durable ?", a: "Économique, social, environnemental", o: ["Politique, économique, culturel", "Économique, social, environnemental", "Finance, industrie, agriculture"] },
        { q: "Qu'est-ce qu'une smart city ?", a: "Une ville qui utilise le numérique pour gérer ses ressources", o: ["Une ville sans voitures", "Une ville qui utilise le numérique pour gérer ses ressources", "Une ville très ancienne"] }
      ]
    }

  }
};

console.info('🔮 lesson-data-namek.js chargé — 8 leçons Géographie JJK · programme officiel 6ème');