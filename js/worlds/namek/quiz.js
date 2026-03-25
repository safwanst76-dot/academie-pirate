// ═══════════════════════════════════════════════════════════════
// QUIZ-NAMEK.JS — Académie Pirate
// Monde : Namek · Matière : Géographie · Univers : JUJUTSU KAISEN
// Niveau : CM2 + 6ème — Programme officiel "Habiter une métropole"
// Bucket Supabase : island-namek
// Règle AA #4 : sync xp global dans jjk_corriger()
// Règle AU-04 : playBGM après leçon dans callback
// ═══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// 1. ASSETS SUPABASE — bucket island-namek
// ══════════════════════════════════════════════════════════════
var SUPABASE_URL_JJK = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
var BUCKET_JJK       = 'island-namek';
var JJK_STORAGE      = SUPABASE_URL_JJK + '/storage/v1/object/public/' + BUCKET_JJK;

var JJK_AVATARS = {
  1: JJK_STORAGE + '/characters/yuji.jpg',
  2: JJK_STORAGE + '/characters/megumi.jpg',
  3: JJK_STORAGE + '/characters/nobara.jpg',
  4: JJK_STORAGE + '/characters/gojo.jpg',
  5: JJK_STORAGE + '/characters/nanami.jpg',
  6: JJK_STORAGE + '/characters/sukuna.jpg',
  7: JJK_STORAGE + '/characters/todo.jpg',
  8: JJK_STORAGE + '/characters/inumaki.jpg',
};

var JJK_BOSS_AVATARS = {
  'Mahito':        JJK_STORAGE + '/characters/mahito.jpg',
  'Jogo':          JJK_STORAGE + '/characters/jogo.jpg',
  'Hanami':        JJK_STORAGE + '/characters/hanami.jpg',
  'Ryomen Sukuna': JJK_STORAGE + '/characters/sukuna.jpg',
  'Dagon':         JJK_STORAGE + '/characters/dagon.jpg',
  'Choso':         JJK_STORAGE + '/characters/choso.jpg',
  'Geto Suguru':   JJK_STORAGE + '/characters/geto.jpg',
  'Kenjaku':       JJK_STORAGE + '/characters/kenjaku.jpg',
};

var JJK_FALLBACK = { 1:'🔥', 2:'🐉', 3:'⚔️', 4:'♾️', 5:'💼', 6:'👹', 7:'💪', 8:'🌿' };

// ── GIFs Giphy JJK (sélectionnés par l'utilisateur) ──
var JJK_GIFS_PERFECT = [
  'https://media1.giphy.com/media/fJUaFqUCNGLQT99fS8/giphy.gif',
  'https://media0.giphy.com/media/yxdPHj5KIxMd4Gt0kr/giphy.gif',
  'https://media1.giphy.com/media/qLErpwsfLyY6RSTJlJ/giphy.gif',
];
var JJK_GIFS_WIN = [
  'https://media0.giphy.com/media/6MRe9ImMnIDAafDPSy/giphy.gif',
  'https://media2.giphy.com/media/RUsFm8oUwgqkStRtKk/giphy.gif',
  'https://media1.giphy.com/media/4HpF6CHNB4jsBTV266/giphy.gif',
];
var JJK_GIFS_LOSE = [
  'https://media2.giphy.com/media/DlSDrFfiyoDHQO2w3q/giphy.gif',
];

// ══════════════════════════════════════════════════════════════
// 2. DONNÉES — 8 îles × 11 questions
//    Programme officiel 6ème : "Habiter une métropole"
//    Études de cas : New York (pays développé) + Lagos (pays en dev.)
// ══════════════════════════════════════════════════════════════
var ISLANDS_JJK = {

  1: {
    name: 'Île de Yuji', charName: 'Yuji Itadori', color: '#e63946',
    topic: "L'urbanisation dans le monde", level: 'CM2',
    bgm: 'jjk-map',
    msgs: [
      "Je suis fait pour protéger — et toi pour apprendre !",
      "La géo c'est comme le sport : entraîne-toi !",
      "Continue, tu progresses !",
      "Ne lâche pas !",
      "Je crois en toi !"
    ],
    qs: [
      { q:"Que désigne le terme 'urbanisation' ?",
        o:["La destruction des villes","La concentration croissante de la population dans les villes","La construction de routes","La pollution des villes"],
        a:"La concentration croissante de la population dans les villes",
        exp:"L'urbanisation désigne la concentration croissante de la population dans les villes. C'est l'un des grands phénomènes géographiques du XXIe siècle." },
      { q:"Depuis quelle année la majorité de l'humanité vit-elle en ville ?",
        o:["1950","1980","2007","2020"],
        a:"2007",
        exp:"2007 est l'année historique où, pour la première fois, les citadins ont dépassé les ruraux dans le monde entier." },
      { q:"En 2025, environ quel pourcentage de la population mondiale vit en ville ?",
        o:["Environ 25 %","Environ 55 %","Environ 80 %","Environ 35 %"],
        a:"Environ 55 %",
        exp:"Plus de la moitié de l'humanité vit en ville depuis 2007. Ce pourcentage continue d'augmenter chaque année." },
      { q:"En 1900, combien d'habitants sur 10 vivaient en ville ?",
        o:["1 sur 10","3 sur 10","5 sur 10","8 sur 10"],
        a:"1 sur 10",
        exp:"En 1900, seulement 10 % de la population mondiale (1 habitant sur 10) vivait en ville. L'urbanisation s'est massivement accélérée au XXe siècle." },
      { q:"Qu'est-ce que l'exode rural ?",
        o:["Des gens qui quittent la ville pour la campagne","Des gens qui quittent la campagne pour aller en ville","Les migrations entre continents","L'augmentation de la population rurale"],
        a:"Des gens qui quittent la campagne pour aller en ville",
        exp:"L'exode rural est le déplacement des populations rurales vers les villes en quête d'emploi et de meilleures conditions de vie." },
      { q:"Sur quels continents la croissance urbaine est-elle la plus rapide aujourd'hui ?",
        o:["Europe et Amérique du Nord","Afrique et Asie","Océanie","Amérique du Sud uniquement"],
        a:"Afrique et Asie",
        exp:"L'Afrique et l'Asie connaissent les plus fortes croissances urbaines. Des villes comme Lagos ou Dhaka grandissent très rapidement." },
      { q:"Comment appelle-t-on l'extension de la ville qui grignote les campagnes environnantes ?",
        o:["La rurbanisation","L'étalement urbain","La densification","La métropolisation"],
        a:"L'étalement urbain",
        exp:"L'étalement urbain (urban sprawl) désigne l'extension des villes sur les terres agricoles et naturelles environnantes." },
      { q:"Qu'est-ce qu'un espace périurbain ?",
        o:["Le centre historique d'une ville","La zone autour d'une ville qui s'urbanise aux dépens de la campagne","Un bidonville","Une zone industrielle"],
        a:"La zone autour d'une ville qui s'urbanise aux dépens de la campagne",
        exp:"Les espaces périurbains sont les zones entre la ville et la campagne qui s'urbanisent progressivement." },
      { q:"Selon les projections, combien de personnes vivront en ville en 2050 ?",
        o:["3 milliards","5 milliards","7 milliards","2 milliards"],
        a:"7 milliards",
        exp:"D'ici 2050, environ les 2/3 de la population mondiale vivra en ville, soit environ 7 milliards de personnes." },
      { q:"Qu'est-ce que la population rurale ?",
        o:["Les habitants des grandes villes","Les personnes vivant à la campagne, hors des zones urbaines","Les habitants des bidonvilles","Les touristes"],
        a:"Les personnes vivant à la campagne, hors des zones urbaines",
        exp:"La population rurale vit dans les campagnes, villages et zones agricoles, par opposition à la population urbaine qui vit en ville." },
      { q:"⚔️ BOSS — Mahito surgit ! Si en 2050 il y a 10 milliards d'habitants et que les 2/3 vivent en ville, combien de milliards de citadins ?",
        o:["5 milliards","6,6 milliards","7 milliards","8 milliards"],
        a:"6,6 milliards",
        exp:"2/3 de 10 milliards = 10 × 0,66 = 6,6 milliards de citadins. Presque les 2/3 de l'humanité vivra en ville !",
        isBoss:true, bossName:'Mahito' }
    ]
  },

  2: {
    name: 'Île de Megumi', charName: 'Megumi Fushiguro', color: '#1e3a5f',
    topic: "Qu'est-ce qu'une métropole ?", level: 'CM2',
    bgm: 'jjk-map',
    msgs: [
      "Dix-Ombres — chaque ville a son ombre.",
      "La précision est une technique.",
      "Continue — même moi j'ai dû réviser.",
      "Bien. Tu maîtrises ces définitions.",
      "Presque aussi fort que moi."
    ],
    qs: [
      { q:"Comment définit-on une métropole ?",
        o:["Un petit village","Une grande ville qui concentre habitants, activités et pouvoirs de commandement","Un bidonville","Une zone industrielle"],
        a:"Une grande ville qui concentre habitants, activités et pouvoirs de commandement",
        exp:"Une métropole est une très grande ville qui concentre la population, les activités économiques et les fonctions de commandement (politique, culture, finance)." },
      { q:"Qu'est-ce qu'une mégapole ?",
        o:["Un quartier pauvre","Une ville de plus de 10 millions d'habitants","Un réseau de petites villes","Une banlieue résidentielle"],
        a:"Une ville de plus de 10 millions d'habitants",
        exp:"Une mégapole est une ville géante de plus de 10 millions d'habitants. Exemples : Tokyo (~37M), Delhi (~32M), Shanghai (~24M)." },
      { q:"Qu'est-ce qu'une mégalopole ?",
        o:["Un seul immense gratte-ciel","Des villes connectées en réseau qui rayonnent sur tout un territoire","Une ville de moins d'un million d'habitants","Un bidonville géant"],
        a:"Des villes connectées en réseau qui rayonnent sur tout un territoire",
        exp:"La mégalopole est un réseau de plusieurs métropoles proches et interconnectées. Ex : la 'BosWash' (Boston-New York-Washington)." },
      { q:"Quelle est la plus grande aire urbaine du monde en 2025 ?",
        o:["New York","Shanghai","Tokyo","Mexico"],
        a:"Tokyo",
        exp:"Tokyo (Japon) est la plus grande aire urbaine du monde avec environ 37-38 millions d'habitants en 2025." },
      { q:"Parmi les fonctions d'une métropole, laquelle N'en est PAS une ?",
        o:["Fonction économique","Fonction culturelle","Fonction politique","Fonction agricole"],
        a:"Fonction agricole",
        exp:"Les 4 grandes fonctions d'une métropole sont : l'habitat, les activités économiques, les transports/mobilités et le tourisme/loisirs. L'agriculture est rurale." },
      { q:"Qu'est-ce qu'un CBD (Central Business District) ?",
        o:["Un quartier résidentiel calme","Le quartier d'affaires d'une métropole (bureaux, sièges sociaux)","Un bidonville central","Un parc naturel urbain"],
        a:"Le quartier d'affaires d'une métropole (bureaux, sièges sociaux)",
        exp:"Le CBD est le cœur économique d'une métropole, souvent constitué de gratte-ciels (bureaux, banques). Ex : Manhattan à New York, La Défense à Paris." },
      { q:"Une métropole est dite 'cosmopolite' car :",
        o:["Elle n'a qu'un seul type d'habitants","Sa population vient de partout et est très diverse","Elle est isolée du reste du monde","Elle n'a pas de bidonvilles"],
        a:"Sa population vient de partout et est très diverse",
        exp:"Cosmopolite vient du grec 'kosmos' (monde). Une ville cosmopolite accueille des habitants de nombreuses origines : ruraux, migrants, touristes." },
      { q:"Comment s'appelle l'ensemble formé par la ville-centre et ses banlieues ?",
        o:["La mégalopole","L'agglomération","Le bidonville","Le CBD"],
        a:"L'agglomération",
        exp:"L'agglomération = ville-centre + banlieues. Ex : l'agglomération parisienne = Paris + petite et grande couronne, soit 12 millions d'habitants." },
      { q:"La 'métropolisation' désigne :",
        o:["La destruction des villes","La concentration croissante des hommes et des activités dans les métropoles","La construction de bidonvilles","L'abandon des grandes villes"],
        a:"La concentration croissante des hommes et des activités dans les métropoles",
        exp:"La métropolisation est le processus par lequel les métropoles attirent de plus en plus de personnes et d'activités." },
      { q:"La mégalopole japonaise 'Tokaido' relie :",
        o:["Tokyo-Osaka-Hiroshima","Pékin-Shanghai-Canton","Séoul-Busan-Incheon","Bangkok-Singapour"],
        a:"Tokyo-Osaka-Hiroshima",
        exp:"La mégalopole japonaise relie Tokyo, Nagoya, Osaka, Kobe et Hiroshima sur 700 km — la plus dense du monde." },
      { q:"⚔️ BOSS — Jogo attaque ! Mumbai est une métropole majeure. Dans quel pays se trouve-t-elle ?",
        o:["Pakistan","Bangladesh","Inde","Sri Lanka"],
        a:"Inde",
        exp:"Mumbai est la plus grande ville de l'Inde avec plus de 20 millions d'habitants. C'est une métropole mondiale majeure (finance, cinéma Bollywood).",
        isBoss:true, bossName:'Jogo' }
    ]
  },

  3: {
    name: 'Île de Nobara', charName: 'Nobara Kugisaki', color: '#e91e8c',
    topic: 'Étude de cas : New York (pays développé)', level: '6ème',
    bgm: 'jjk-map',
    msgs: [
      "Je viens de la campagne — je sais ce que c'est !",
      "Straw Doll Technique — les villes n'ont pas de secrets !",
      "N'essaie pas de me dépasser en géo !",
      "Bien joué, continue !",
      "Parfait — digne d'un Grade Spécial !"
    ],
    qs: [
      { q:"New York est souvent citée comme exemple de métropole d'un pays développé. Dans quel pays est-elle ?",
        o:["Canada","Royaume-Uni","États-Unis","Mexique"],
        a:"États-Unis",
        exp:"New York est la plus grande ville des États-Unis, un pays développé. Elle est surnommée 'la ville qui ne dort jamais'." },
      { q:"Quel est le quartier d'affaires (CBD) de New York ?",
        o:["Harlem","Brooklyn","La City","Wall Street / Midtown"],
        a:"Wall Street / Midtown",
        exp:"Le CBD de New York se situe à Wall Street (finance mondiale, NYSE) et Midtown (sièges sociaux, Empire State Building)." },
      { q:"Environ combien d'habitants dans l'aire urbaine de New York en 2025 ?",
        o:["3 millions","8 millions","Environ 20 millions","50 millions"],
        a:"Environ 20 millions",
        exp:"L'aire urbaine de New York (New York Metropolitan Area) compte environ 20 millions d'habitants en 2025." },
      { q:"New York est une métropole mondiale car elle concentre :",
        o:["Uniquement des touristes","Des fonctions financières, culturelles et politiques mondiales","Principalement des usines","Des zones agricoles importantes"],
        a:"Des fonctions financières, culturelles et politiques mondiales",
        exp:"New York abrite le siège de l'ONU, Wall Street (bourse mondiale), de nombreux musées, Broadway et est le symbole de la diversité mondiale." },
      { q:"Manhattan, cœur de New York, est organisé avec son CBD et :",
        o:["Des bidonvilles uniquement","Des quartiers très divers (Harlem, Greenwich Village, Upper East Side...)","Des zones agricoles","Des forêts"],
        a:"Des quartiers très divers (Harlem, Greenwich Village, Upper East Side...)",
        exp:"Manhattan concentre des quartiers très différents : le CBD (Wall Street), des quartiers résidentiels riches (Upper East Side) et populaires (Harlem)." },
      { q:"Comment appelle-t-on la banlieue résidentielle qui s'étend autour de New York ?",
        o:["Le bidonville","L'espace périurbain","Le CBD","La mégalopole"],
        a:"L'espace périurbain",
        exp:"L'espace périurbain (New Jersey, Long Island, Connecticut) est la zone résidentielle qui s'urbanise autour du centre de New York." },
      { q:"New York est une ville 'cosmopolite'. Cela signifie concrètement :",
        o:["Tous ses habitants sont américains","Ses habitants viennent du monde entier (Chinatown, Little Italy, Harlem...)","Elle est très petite","Elle est fermée aux immigrants"],
        a:"Ses habitants viennent du monde entier (Chinatown, Little Italy, Harlem...)",
        exp:"New York est l'une des villes les plus cosmopolites : on y parle plus de 800 langues et ses habitants viennent de presque tous les pays du monde." },
      { q:"La 'gentrification' d'un quartier de New York désigne :",
        o:["Sa construction à partir de rien","Sa transformation : les pauvres sont remplacés par des habitants plus aisés","Sa destruction","Sa fermeture aux touristes"],
        a:"Sa transformation : les pauvres sont remplacés par des habitants plus aisés",
        exp:"La gentrification : un quartier populaire se rénove, les loyers montent et les habitants les plus modestes sont contraints de partir." },
      { q:"La 'BosWash' est une mégalopole américaine qui relie Boston à Washington. Quelle ville est au centre ?",
        o:["Chicago","Los Angeles","New York","Miami"],
        a:"New York",
        exp:"La mégalopole BosWash (Boston-New York-Washington) est le principal réseau de métropoles des États-Unis. New York en est le centre." },
      { q:"Quelle fonction internationale rend New York unique parmi les villes mondiales ?",
        o:["C'est la capitale des États-Unis","Elle abrite le siège de l'ONU","Elle est la ville la plus peuplée du monde","Elle n'a aucune fonction internationale"],
        a:"Elle abrite le siège de l'ONU",
        exp:"Le siège de l'ONU (Organisation des Nations Unies) est à New York, ce qui lui donne un rôle politique mondial unique." },
      { q:"⚔️ BOSS — Hanami attaque ! Dans une métropole de pays développé, comment appelle-t-on le phénomène où un quartier populaire monte en gamme et chasse ses habitants modestes ?",
        o:["L'étalement urbain","La gentrification","La métropolisation","La ségrégation"],
        a:"La gentrification",
        exp:"La gentrification est un processus fréquent dans les métropoles des pays riches (New York, Paris, Londres) : rénovation → hausse des loyers → départ des habitants modestes.",
        isBoss:true, bossName:'Hanami' }
    ]
  },

  4: {
    name: 'Île de Gojo', charName: 'Satoru Gojo', color: '#38bdf8',
    topic: 'Étude de cas : Lagos (pays en développement)', level: '6ème',
    bgm: 'jjk-map',
    msgs: [
      "Je suis le plus fort — et les défis de Lagos, c'est immense.",
      "Infinity Technique... face aux bidonvilles.",
      "Même les yeux bandés, je vois les inégalités !",
      "Tu progresses bien, jeune exorciste !",
      "C'est parfait. Grade Spécial !"
    ],
    qs: [
      { q:"Lagos est une grande métropole africaine. Dans quel pays se trouve-t-elle ?",
        o:["Côte d'Ivoire","Ghana","Nigeria","Sénégal"],
        a:"Nigeria",
        exp:"Lagos est la plus grande ville du Nigeria (Afrique de l'Ouest). C'est l'une des métropoles africaines à la croissance la plus rapide du monde." },
      { q:"Lagos est une métropole d'un pays :",
        o:["Développé","En développement (PED)","Émergent très avancé","Sans croissance"],
        a:"En développement (PED)",
        exp:"Le Nigeria est un Pays En Développement (PED) : les conditions de vie progressent, mais restent insuffisantes pour une grande partie de la population." },
      { q:"Makoko est un quartier célèbre de Lagos. Sa particularité est :",
        o:["C'est le quartier des affaires","C'est un bidonville construit sur l'eau (sur pilotis)","C'est le quartier le plus riche","C'est un parc national"],
        a:"C'est un bidonville construit sur l'eau (sur pilotis)",
        exp:"Makoko est un bidonville lacustre de Lagos où des centaines de milliers de personnes vivent dans des maisons sur pilotis au-dessus d'un lagon." },
      { q:"Pourquoi Lagos grandit-elle si vite ?",
        o:["Les habitants fuient la ville","L'exode rural et un fort taux de natalité","Le gouvernement y construit des logements en masse","Les étrangers s'y installent uniquement"],
        a:"L'exode rural et un fort taux de natalité",
        exp:"Lagos grandit d'environ 300 000 personnes par an grâce aux migrations depuis les campagnes (exode rural) et à la forte natalité." },
      { q:"Un bidonville se caractérise par :",
        o:["Des logements modernes et confortables","Des habitations précaires en matériaux de récupération, sans eau ni électricité","Des quartiers résidentiels de luxe","Des zones industrielles bien équipées"],
        a:"Des habitations précaires en matériaux de récupération, sans eau ni électricité",
        exp:"Les bidonvilles sont construits avec des planches, tôles et plastiques. Ils manquent souvent d'eau courante, d'électricité et d'égouts." },
      { q:"Victoria Island à Lagos représente :",
        o:["Un bidonville dense","Un quartier d'affaires et résidentiel aisé, contrastant avec les bidonvilles","Une île naturelle inhabitée","Un parc industriel"],
        a:"Un quartier d'affaires et résidentiel aisé, contrastant avec les bidonvilles",
        exp:"Victoria Island concentre les sièges sociaux, hôtels de luxe et résidences aisées — à quelques kilomètres des bidonvilles de Makoko." },
      { q:"La coexistence de Victoria Island (luxe) et Makoko (bidonville) à Lagos illustre :",
        o:["L'étalement urbain","La métropolisation","La ségrégation socio-spatiale","L'exode rural"],
        a:"La ségrégation socio-spatiale",
        exp:"La ségrégation socio-spatiale est la séparation dans l'espace de groupes sociaux différents. Lagos en est un exemple frappant." },
      { q:"Pourquoi reloger les habitants des bidonvilles en périphérie n'est pas toujours une bonne solution ?",
        o:["Les habitants ne veulent jamais déménager","Cela les éloigne de leur travail et de leurs réseaux sociaux en ville","C'est trop cher pour les architectes","Les bidonvilles sont plus confortables"],
        a:"Cela les éloigne de leur travail et de leurs réseaux sociaux en ville",
        exp:"En éloignant les habitants du centre, on les coupe de leurs emplois informels, marchés et réseaux. La solution doit intégrer emploi et transport." },
      { q:"Comment s'appellent les personnes qui habitent Lagos ?",
        o:["Les Lagoïens","Les Lagossiens","Les Nigerians uniquement","Les Africains"],
        a:"Les Lagossiens",
        exp:"Les habitants de Lagos s'appellent les Lagossiens. C'est le terme utilisé dans le programme officiel de géographie 6ème." },
      { q:"Quelle est la principale différence entre Lagos et New York en termes de logement ?",
        o:["New York a plus de bidonvilles","À Lagos, une grande partie de la population vit dans des bidonvilles, beaucoup moins à New York","Les deux villes ont les mêmes logements","New York n'a aucun quartier pauvre"],
        a:"À Lagos, une grande partie de la population vit dans des bidonvilles, beaucoup moins à New York",
        exp:"Cela reflète le différent niveau de développement : pays développé (New York) vs pays en développement (Lagos)." },
      { q:"⚔️ BOSS — Ryomen Sukuna ressuscite ! Lagos est à la fois une métropole attractive et inégalitaire. Quelle notion géographique résume le mieux cette situation ?",
        o:["L'étalement urbain","La ségrégation socio-spatiale","La métropolisation","L'exode rural"],
        a:"La ségrégation socio-spatiale",
        exp:"La ségrégation socio-spatiale désigne la séparation des groupes sociaux dans l'espace. À Lagos : Victoria Island (riche) vs Makoko (bidonville) = parfait exemple.",
        isBoss:true, bossName:'Ryomen Sukuna' }
    ]
  },

  5: {
    name: 'Île de Nanami', charName: 'Nanami Kento', color: '#d4a254',
    topic: 'Les bidonvilles dans le monde', level: '6ème',
    bgm: 'jjk-map',
    msgs: [
      "Après 17h30, je ne travaille plus. Mais la géo, si.",
      "Chaque définition compte. Précision.",
      "Observons la réalité des bidonvilles.",
      "Bien. Continuez.",
      "Correct. Digne d'un Grade 1."
    ],
    qs: [
      { q:"Combien de personnes pourraient vivre dans des bidonvilles en 2050 selon l'ONU ?",
        o:["500 millions","1 milliard","3 milliards","7 milliards"],
        a:"3 milliards",
        exp:"L'ONU estime que 3 milliards de personnes pourraient vivre dans des bidonvilles en 2050 si les inégalités persistent." },
      { q:"Comment appelle-t-on les bidonvilles au Brésil ?",
        o:["Slums","Townships","Favelas","Shanty towns"],
        a:"Favelas",
        exp:"Au Brésil, les bidonvilles s'appellent favelas. La favela da Rocinha à Rio de Janeiro est la plus grande d'Amérique du Sud." },
      { q:"Comment appelle-t-on les bidonvilles en Inde et dans les pays anglophones ?",
        o:["Favelas","Townships","Slums","Barriadas"],
        a:"Slums",
        exp:"En Inde et dans les pays anglophones, les bidonvilles s'appellent slums. Dharavi à Mumbai est l'un des plus célèbres au monde." },
      { q:"Comment appelle-t-on les zones résidentielles pauvres en Afrique du Sud ?",
        o:["Favelas","Slums","Townships","Bidonvilles"],
        a:"Townships",
        exp:"En Afrique du Sud, les townships sont des zones ségrégées créées sous l'apartheid. Soweto à Johannesburg est le plus célèbre." },
      { q:"Kibera, l'un des plus grands bidonvilles d'Afrique, se trouve dans quelle ville ?",
        o:["Lagos","Nairobi","Johannesburg","Dakar"],
        a:"Nairobi",
        exp:"Kibera à Nairobi (Kenya) est l'un des plus grands bidonvilles d'Afrique subsaharienne, avec entre 250 000 et 1 million d'habitants." },
      { q:"Dharavi, l'un des plus grands bidonvilles d'Asie, se trouve dans quelle ville ?",
        o:["Pékin","Jakarta","Mumbai","Karachi"],
        a:"Mumbai",
        exp:"Dharavi à Mumbai (Inde) compte environ 1 million d'habitants sur 2 km². Malgré la pauvreté, il abrite une activité économique intense." },
      { q:"Quelle est la principale cause de la formation des bidonvilles ?",
        o:["Le choix délibéré des habitants","Une croissance urbaine plus rapide que la construction de logements décents","Le manque de place en centre-ville","Les catastrophes naturelles uniquement"],
        a:"Une croissance urbaine plus rapide que la construction de logements décents",
        exp:"Les villes grandissent si vite que les États ne peuvent pas construire assez de logements formels. Les nouveaux arrivants construisent alors illégalement." },
      { q:"À Sao Paulo (Brésil), le quartier de Paraisopolis (bidonville) jouxte un quartier de résidences luxueuses avec piscines. Ce contraste illustre :",
        o:["La métropolisation","L'étalement urbain","La ségrégation socio-spatiale","L'urbanisation durable"],
        a:"La ségrégation socio-spatiale",
        exp:"Paraisopolis illustre parfaitement la ségrégation socio-spatiale : bidonville dense et résidences de luxe séparés par un simple mur à São Paulo." },
      { q:"Quel organisme international œuvre pour améliorer les conditions de vie dans les bidonvilles ?",
        o:["L'OTAN","L'OMS uniquement","ONU-Habitat","L'Union européenne"],
        a:"ONU-Habitat",
        exp:"ONU-Habitat (UN-Habitat) est le programme des Nations Unies pour les établissements humains. Il défend le 'droit à la ville' pour tous les habitants." },
      { q:"Les bidonvilles se trouvent généralement :",
        o:["Dans les centres historiques des villes riches","En périphérie des grandes villes des pays en développement","Dans les zones touristiques","Dans les banlieues résidentielles aisées"],
        a:"En périphérie des grandes villes des pays en développement",
        exp:"Les bidonvilles se forment généralement en périphérie des grandes villes des pays pauvres, là où les terrains sont moins chers ou non revendiqués." },
      { q:"⚔️ BOSS — Dagon surgit ! Les 'gated communities' sont des résidences fermées et sécurisées pour les habitants aisés. Elles sont une manifestation de :",
        o:["L'étalement urbain","La ségrégation socio-spatiale des classes riches","L'urbanisation durable","L'exode rural"],
        a:"La ségrégation socio-spatiale des classes riches",
        exp:"Les gated communities (résidences fermées avec vigiles, murs et caméras) sont une forme de ségrégation volontaire des classes aisées.",
        isBoss:true, bossName:'Dagon' }
    ]
  },

  6: {
    name: 'Île de Sukuna', charName: 'Ryomen Sukuna', color: '#7c3aed',
    topic: "Ségrégation et organisation des métropoles", level: '6ème',
    bgm: 'jjk-map',
    msgs: [
      "Roi des Fléaux — les inégalités sont mon domaine.",
      "À genoux devant la connaissance !",
      "Même moi, je dois connaître la géographie.",
      "Pas mal... pour un humain.",
      "Acceptable. Tu mérites de survivre."
    ],
    qs: [
      { q:"Qu'est-ce que la ségrégation socio-spatiale ?",
        o:["La fusion des quartiers riches et pauvres","La séparation dans l'espace des différents groupes sociaux dans une même ville","La construction de bidonvilles en périphérie uniquement","L'étalement de la ville sur les campagnes"],
        a:"La séparation dans l'espace des différents groupes sociaux dans une même ville",
        exp:"La ségrégation socio-spatiale désigne la séparation des groupes sociaux dans l'espace : les riches dans certains quartiers, les pauvres dans d'autres." },
      { q:"L'organisation type d'une métropole (du centre vers la périphérie) est :",
        o:["Banlieue → Ville-centre → Espaces périurbains → Campagnes","Campagnes → Espaces périurbains → Banlieue → Ville-centre","Ville-centre → Banlieue → Espaces périurbains → Campagnes","Espaces périurbains → Campagnes → Ville-centre → Banlieue"],
        a:"Ville-centre → Banlieue → Espaces périurbains → Campagnes",
        exp:"Organisation concentrique : 1. Ville-centre (noyau historique) → 2. Banlieue → 3. Espaces périurbains (transition) → 4. Campagnes." },
      { q:"Qu'est-ce que la 'gentrification' ?",
        o:["La création de bidonvilles","La rénovation d'un quartier populaire qui monte en gamme, chassant les habitants modestes","L'extension d'une ville sur les campagnes","La construction de logements sociaux"],
        a:"La rénovation d'un quartier populaire qui monte en gamme, chassant les habitants modestes",
        exp:"La gentrification est un processus fréquent dans les métropoles riches : rénovation → hausse des loyers → départ des habitants modestes." },
      { q:"Qu'est-ce que la 'mixité sociale' dans les villes ?",
        o:["La séparation stricte des groupes sociaux","Le mélange de personnes de différentes origines sociales dans un même quartier","La construction de murs entre quartiers","La gentrification systématique"],
        a:"Le mélange de personnes de différentes origines sociales dans un même quartier",
        exp:"La mixité sociale est un objectif des politiques urbaines : faire cohabiter dans un même espace des personnes de niveaux de vie différents." },
      { q:"La 'rénovation urbaine' vise à :",
        o:["Construire plus de bidonvilles","Améliorer les quartiers défavorisés pour réduire les inégalités","Séparer davantage les riches des pauvres","Détruire des villes"],
        a:"Améliorer les quartiers défavorisés pour réduire les inégalités",
        exp:"La rénovation urbaine rénove les logements dégradés, améliore les équipements (écoles, transports) des quartiers défavorisés." },
      { q:"Dans les métropoles des pays développés (ex: New York, Paris), comment se manifeste la ségrégation ?",
        o:["Tous les quartiers se ressemblent","Des quartiers riches bien équipés coexistent avec des quartiers défavorisés dans la même ville","Il n'y a aucune inégalité","Seuls les bidonvilles existent"],
        a:"Des quartiers riches bien équipés coexistent avec des quartiers défavorisés dans la même ville",
        exp:"Même dans les métropoles riches, la ségrégation est visible : Upper East Side vs South Bronx à New York, beaux quartiers vs banlieues défavorisées à Paris." },
      { q:"Quelle métropole illustre la ségrégation avec son apartheid historique ?",
        o:["New York","Paris","Johannesburg (Afrique du Sud)","Tokyo"],
        a:"Johannesburg (Afrique du Sud)",
        exp:"Johannesburg est marquée par l'héritage de l'apartheid : townships noirs ségrégués (comme Soweto) vs quartiers blancs aisés." },
      { q:"Les inégalités entre quartiers se mesurent notamment par :",
        o:["La couleur des bâtiments","La différence de qualité des logements, équipements et services (écoles, hôpitaux, transports)","La hauteur des immeubles","La forme des rues"],
        a:"La différence de qualité des logements, équipements et services (écoles, hôpitaux, transports)",
        exp:"On peut voir les inégalités en comparant la qualité des logements, des écoles, des hôpitaux et des transports selon les quartiers d'une même ville." },
      { q:"Pourquoi la ségrégation socio-spatiale est-elle un problème social ?",
        o:["Elle favorise les échanges culturels","Elle renforce les inégalités et limite les opportunités des habitants des quartiers pauvres","Elle améliore les transports","Elle réduit la pollution"],
        a:"Elle renforce les inégalités et limite les opportunités des habitants des quartiers pauvres",
        exp:"Vivre dans un quartier défavorisé limite l'accès aux bonnes écoles, aux emplois et aux services. La ségrégation reproduit et amplifie les inégalités." },
      { q:"L'agglomération parisienne s'étend bien au-delà de Paris intra-muros. Elle comprend :",
        o:["Uniquement les 20 arrondissements de Paris","Paris + une banlieue étendue = 12 millions d'habitants","Paris + la Normandie","Paris + toute la France"],
        a:"Paris + une banlieue étendue = 12 millions d'habitants",
        exp:"Paris intra-muros = 2 millions d'hab. L'agglomération parisienne (ville-centre + banlieues) = 12 millions d'habitants, la plus grande métropole d'Europe de l'Ouest." },
      { q:"⚔️ BOSS — Choso ! Un chercheur observe qu'à Lagos, 80 % des logements sociaux sont dans un seul quartier. C'est un exemple de :",
        o:["Métropolisation","Étalement urbain","Ségrégation socio-spatiale","Urbanisation durable"],
        a:"Ségrégation socio-spatiale",
        exp:"Concentrer les logements sociaux dans un seul quartier crée une ségrégation socio-spatiale : les populations modestes sont isolées dans un espace à part.",
        isBoss:true, bossName:'Choso' }
    ]
  },

  7: {
    name: 'Île de Todo', charName: 'Aoi Todo', color: '#15803d',
    topic: 'Localisation des grandes villes mondiales', level: '6ème',
    bgm: 'jjk-map',
    msgs: [
      "Dis-moi, quelle est ta ville préférée ?",
      "BOOGIE WOOGIE — les villes se téléportent !",
      "Ma force me vient de la géographie !",
      "Bien ! Tu aurais été mon ami.",
      "KAKICHI ! Réponse parfaite !"
    ],
    qs: [
      { q:"Tokyo est la plus grande aire urbaine du monde. Dans quel pays est-elle ?",
        o:["Corée du Sud","Chine","Japon","Thaïlande"],
        a:"Japon",
        exp:"Tokyo est la capitale du Japon et la plus grande aire urbaine du monde avec environ 37-38 millions d'habitants." },
      { q:"Sur quel continent se trouvent New York et Mexico ?",
        o:["Europe","Asie","Amérique","Afrique"],
        a:"Amérique",
        exp:"New York est aux États-Unis (Amérique du Nord) et Mexico est au Mexique (Amérique centrale/du Nord)." },
      { q:"Quelle est la plus grande ville d'Afrique ?",
        o:["Lagos","Nairobi","Johannesburg","Le Caire"],
        a:"Le Caire",
        exp:"Le Caire (Égypte) est la plus grande ville d'Afrique avec plus de 20 millions d'habitants dans son aire urbaine." },
      { q:"São Paulo est la plus grande ville du Brésil. Sur quel continent est-elle ?",
        o:["Afrique","Europe","Amérique du Sud","Asie"],
        a:"Amérique du Sud",
        exp:"São Paulo est la plus grande ville d'Amérique du Sud, avec plus de 22 millions d'habitants dans son aire urbaine." },
      { q:"Séoul est la capitale de quel pays ?",
        o:["Japon","Chine","Corée du Nord","Corée du Sud"],
        a:"Corée du Sud",
        exp:"Séoul est la capitale de la Corée du Sud et l'une des métropoles asiatiques les plus développées." },
      { q:"Mumbai est une métropole de quel continent ?",
        o:["Afrique","Europe","Asie","Amérique"],
        a:"Asie",
        exp:"Mumbai (anciennement Bombay) est la plus grande ville d'Inde, en Asie, avec plus de 20 millions d'habitants dans son aire urbaine." },
      { q:"Shanghai est la plus grande ville de quel pays ?",
        o:["Japon","Corée du Sud","Inde","Chine"],
        a:"Chine",
        exp:"Shanghai est la plus grande ville de Chine par sa population et l'une des premières métropoles mondiales pour l'économie et la finance." },
      { q:"Laquelle de ces villes n'est PAS en Asie ?",
        o:["Tokyo","Shanghai","Mumbai","Buenos Aires"],
        a:"Buenos Aires",
        exp:"Buenos Aires est la capitale de l'Argentine, en Amérique du Sud. Tokyo, Shanghai et Mumbai sont toutes les trois en Asie." },
      { q:"Londres est l'une des 3 grandes villes mondiales. Dans quel pays d'Europe est-elle ?",
        o:["France","Allemagne","Espagne","Royaume-Uni"],
        a:"Royaume-Uni",
        exp:"Londres est la capitale du Royaume-Uni. C'est l'un des 3 centres financiers mondiaux avec New York et Tokyo." },
      { q:"Delhi (New Delhi) est la capitale de quel pays d'Asie du Sud ?",
        o:["Pakistan","Bangladesh","Inde","Népal"],
        a:"Inde",
        exp:"Delhi est la capitale de l'Inde. Avec plus de 32 millions d'habitants en 2025, c'est l'une des 2 plus grandes villes du monde avec Tokyo." },
      { q:"⚔️ BOSS — Geto Suguru ! Associe correctement chaque ville à son continent : New York / Lagos / Tokyo / São Paulo",
        o:["Amér.Nord / Afrique / Asie / Amér.Sud","Asie / Afrique / Amér.Nord / Amér.Sud","Amér.Nord / Asie / Afrique / Europe","Europe / Afrique / Asie / Amér.Nord"],
        a:"Amér.Nord / Afrique / Asie / Amér.Sud",
        exp:"New York = Amérique du Nord (USA) · Lagos = Afrique (Nigeria) · Tokyo = Asie (Japon) · São Paulo = Amérique du Sud (Brésil). À connaître absolument !",
        isBoss:true, bossName:'Geto Suguru' }
    ]
  },

  8: {
    name: "Île d'Inumaki", charName: 'Toge Inumaki', color: '#059669',
    topic: 'Habiter une métropole — bilan et révisions', level: '6ème',
    bgm: 'jjk-map',
    msgs: [
      "Tarte au saumon...",
      "Riz aux cornichons !",
      "Salée de poulpe !",
      "Bonite !",
      "Saumon ! (= Parfait !!!)"
    ],
    qs: [
      { q:"Qu'est-ce qu'une 'métropole durable' ?",
        o:["Une ville qui ne grandit jamais","Une ville qui concilie croissance économique, bien-être social et respect de l'environnement","Une ville sans voitures","Une ville uniquement pour les riches"],
        a:"Une ville qui concilie croissance économique, bien-être social et respect de l'environnement",
        exp:"La ville durable (ou soutenable) cherche à satisfaire les besoins présents sans compromettre ceux des générations futures : les 3 piliers du développement durable." },
      { q:"Quels sont les 3 piliers du développement durable ?",
        o:["Économie, politique, défense","Économie, social, environnement","Culture, sport, tourisme","Finance, industrie, agriculture"],
        a:"Économie, social, environnement",
        exp:"Le développement durable repose sur 3 piliers : économique (prospérité), social (équité) et environnemental (protection de la nature). À connaître absolument !" },
      { q:"Qu'est-ce qu'un écoquartier ?",
        o:["Un quartier très pollué","Un quartier conçu durablement : énergie verte, transports propres, mixité sociale, espaces verts","Un bidonville reconverti","Un quartier uniquement pour les voitures"],
        a:"Un quartier conçu durablement : énergie verte, transports propres, mixité sociale, espaces verts",
        exp:"Les écoquartiers (ex : Vauban à Fribourg, Hammarby à Stockholm) montrent qu'une autre façon de vivre en ville est possible." },
      { q:"Pourquoi les métropoles sont-elles attractives ?",
        o:["Parce qu'elles sont moins chères","Parce qu'elles offrent emplois, services, éducation et culture","Parce qu'elles ont moins de pollution","Parce qu'elles sont plus calmes"],
        a:"Parce qu'elles offrent emplois, services, éducation et culture",
        exp:"Les métropoles concentrent les opportunités économiques (emplois), les services (hôpitaux, universités), la culture et les loisirs." },
      { q:"Qu'est-ce qu'une 'smart city' (ville intelligente) ?",
        o:["Une ville uniquement pour les personnes intelligentes","Une ville qui utilise les technologies numériques pour gérer efficacement transports, énergie et services","Une ville sans habitants","Une ville construite par des robots"],
        a:"Une ville qui utilise les technologies numériques pour gérer efficacement transports, énergie et services",
        exp:"Une smart city utilise des capteurs, données et IA pour optimiser les transports, la consommation d'énergie et les services. Ex : Songdo (Corée du Sud)." },
      { q:"Quel est l'un des problèmes environnementaux majeurs des grandes métropoles ?",
        o:["Trop de nature","Pollution de l'air, congestion, déchets, manque d'espaces verts","Trop d'eau","Température trop froide"],
        a:"Pollution de l'air, congestion, déchets, manque d'espaces verts",
        exp:"Les métropoles font face à des défis : pollution atmosphérique, embouteillages, gestion des déchets et imperméabilisation des sols." },
      { q:"Dubai a connu une croissance très rapide. Sur quelle ressource est-elle basée ?",
        o:["L'agriculture","La pêche","Le pétrole et les investissements étrangers","Le tourisme uniquement"],
        a:"Le pétrole et les investissements étrangers",
        exp:"Dubai (Émirats arabes unis) a utilisé ses revenus pétroliers pour construire une métropole ultramoderne attirant investissements et tourisme mondiaux." },
      { q:"La problématique officielle du chapitre 'Habiter une métropole' en 6ème est :",
        o:["Comment cultiver en ville ?","Comment habiter et cohabiter durablement dans une métropole ?","Pourquoi les villes disparaissent-elles ?","Comment construire des bidonvilles ?"],
        a:"Comment habiter et cohabiter durablement dans une métropole ?",
        exp:"La problématique du programme officiel Eduscol est : 'Comment habiter et cohabiter durablement dans une métropole ?' Elle explore les inégalités et la ville de demain." },
      { q:"La 'ville inclusive' désigne :",
        o:["Une ville réservée aux habitants les plus riches","Une ville où tous les habitants ont accès aux mêmes services et opportunités","Une ville sans bidonvilles uniquement","Une ville entourée de murs"],
        a:"Une ville où tous les habitants ont accès aux mêmes services et opportunités",
        exp:"La ville inclusive garantit à tous — riches, pauvres, handicapés, migrants — un accès équitable aux transports, logements, écoles et espaces publics." },
      { q:"Comment les habitants peuvent-ils participer à la construction de la ville de demain ?",
        o:["Ils n'ont aucun rôle","Par des débats publics, consultations citoyennes et projets participatifs d'urbanisme","Uniquement les élus décident","En payant plus d'impôts"],
        a:"Par des débats publics, consultations citoyennes et projets participatifs d'urbanisme",
        exp:"Les habitants participent à l'urbanisme via des réunions publiques et ateliers de concertation. C'est la démocratie locale en action." },
      { q:"⚔️ BOSS FINAL — Kenjaku ! Une ville a : un CBD avec gratte-ciels, des bidonvilles en périphérie, 20 millions d'habitants, de fortes inégalités et une population cosmopolite. C'est :",
        o:["Une petite ville de province","Une métropole d'un pays en développement avec ségrégation socio-spatiale","Une ville durable modèle","Un village rural"],
        a:"Une métropole d'un pays en développement avec ségrégation socio-spatiale",
        exp:"Cette description correspond à une grande métropole d'un pays émergent (Mumbai, Lagos, São Paulo) : centre moderne et bidonvilles en périphérie, population diverse et inégalités.",
        isBoss:true, bossName:'Kenjaku' }
    ]
  }

};

// ══════════════════════════════════════════════════════════════
// 3. CINÉMATIQUES INTRO
// ══════════════════════════════════════════════════════════════
var JJK_ISLE_INTRO = {
  1: { bg:'#1a0005', lines:["URBANISATION…","… MONDIALE !!","2007 : le tournant !"], kanji:'都市化 !!', kanjiColor:'#e63946', bubble:"Je suis fait pour protéger ! L'urbanisation, 55 % de l'humanité en ville depuis 2007 !" },
  2: { bg:'#001030', lines:["MÉTROPOLE…","… MÉGAPOLE !!","Connais les grandes villes !"], kanji:'大都市 !!', kanjiColor:'#1e3a5f', bubble:"Dix-Ombres ! Une métropole concentre habitants, activités et pouvoirs. Connais les définitions !" },
  3: { bg:'#2d0030', lines:["NEW YORK…","… VILLE MONDIALE !!","La ville qui ne dort jamais !"], kanji:'世界都市 !!', kanjiColor:'#e91e8c', bubble:"Je viens de la campagne — New York, je connais ! Wall Street, Manhattan, Central Park..." },
  4: { bg:'#001a10', lines:["LAGOS…","… EN DÉVELOPPEMENT !!","Makoko sur l'eau !"], kanji:'開発途上 !!', kanjiColor:'#38bdf8', bubble:"Je suis le plus fort — et Lagos mérite qu'on la comprenne. Victoria Island vs Makoko !" },
  5: { bg:'#1a1000', lines:["BIDONVILLES…","… DU MONDE !!","Favelas, slums, townships !"], kanji:'スラム !!', kanjiColor:'#d4a254', bubble:"Chaque définition compte. Favelas au Brésil, slums en Inde, townships en Afrique du Sud !" },
  6: { bg:'#0d0020', lines:["INÉGALITÉS…","… URBAINES !!","Ségrégation socio-spatiale !"], kanji:'格差 !!', kanjiColor:'#7c3aed', bubble:"Roi des Fléaux ! Ville-centre, banlieues, espaces périurbains — l'organisation d'une métropole !" },
  7: { bg:'#001a05', lines:["REPÈRES…","… GÉOGRAPHIQUES !!","Localise les métropoles !"], kanji:'地理 !!', kanjiColor:'#15803d', bubble:"BOOGIE WOOGIE ! New York, Lagos, Tokyo, São Paulo, Mumbai — connais leurs continents !" },
  8: { bg:'#002020', lines:["VILLE…","… DE DEMAIN !!","Smart city & écoquartier !"], kanji:'未来都市 !!', kanjiColor:'#059669', bubble:"Saumon... (= Smart city, écoquartier, développement durable — la ville de demain c'est maintenant !)" }
};

// ══════════════════════════════════════════════════════════════
// 4. ÉTAT GLOBAL
// ══════════════════════════════════════════════════════════════
var jjk_xp               = 0;
var jjk_completedIslands = {};
var jjk_currentIsland    = 0;
var jjk_streak           = 0;
var jjk_answers          = {};

// ══════════════════════════════════════════════════════════════
// 5. AUDIO
// ══════════════════════════════════════════════════════════════
function jjk_playBGM(track) {
  if (typeof playBGM === 'function') { try { playBGM(track); } catch(e) {} }
}
function jjk_stopBGM() {
  if (typeof stopBGM === 'function') stopBGM();
}

// ══════════════════════════════════════════════════════════════
// 6. CINÉMATIQUE
// ══════════════════════════════════════════════════════════════
function jjk_playCinematic(n, callback) {
  var cfg  = JJK_ISLE_INTRO[n];
  var isle = ISLANDS_JJK[n];
  if (!cfg || !isle) { if (callback) callback(); return; }

  var ov = document.getElementById('jjk-cine-overlay');
  if (!ov) { ov = document.createElement('div'); ov.id = 'jjk-cine-overlay'; document.body.appendChild(ov); }

  ov.innerHTML =
    '<div class="jjk-cine-inner" style="background:' + cfg.bg + ';min-height:100vh;height:100vh">' +
      '<div class="jjk-cine-char-wrap">' +
        '<img src="' + (JJK_AVATARS[n] || '') + '" class="jjk-cine-char" onerror="this.style.display=\'none\'">' +
        '<div class="jjk-cine-char-emoji" style="color:' + cfg.kanjiColor + '">' + JJK_FALLBACK[n] + '</div>' +
      '</div>' +
      '<div class="jjk-cine-content">' +
        '<div class="jjk-cine-kanji" style="color:' + cfg.kanjiColor + '">' + cfg.kanji + '</div>' +
        '<div class="jjk-cine-lines">' + cfg.lines.map(function(l){ return '<div class="jjk-cine-line">' + l + '</div>'; }).join('') + '</div>' +
        '<div class="jjk-cine-bubble">' +
          '<span class="jjk-cine-char-name" style="color:' + cfg.kanjiColor + '">' + isle.charName + '</span>' +
          '<span class="jjk-cine-bubble-text">"' + cfg.bubble + '"</span>' +
        '</div>' +
      '</div>' +
      '<button class="jjk-skip-btn" onclick="jjk_skipCine()">⏭ PASSER</button>' +
    '</div>';

  ov.style.cssText = 'position:fixed;inset:0;z-index:9500;display:flex;opacity:0;transition:opacity .3s;pointer-events:auto';
  ov._cb = callback;
  requestAnimationFrame(function(){ ov.style.opacity = '1'; });
  ov._t  = setTimeout(jjk_skipCine, 4500);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(cfg.bubble);
    utt.lang = 'fr-FR'; utt.rate = 0.9; utt.pitch = 1.1;
    window.speechSynthesis.speak(utt);
  }
}

function jjk_skipCine() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  var ov = document.getElementById('jjk-cine-overlay');
  if (!ov) return;
  clearTimeout(ov._t);
  var cb = ov._cb;
  ov.style.display = 'none'; ov.style.zIndex = '-1'; ov.innerHTML = '';
  if (cb) cb();
}

// ══════════════════════════════════════════════════════════════
// 7. DÉMARRAGE — règle AU-04 : playBGM dans callback leçon
// ══════════════════════════════════════════════════════════════
function jjk_startIsland(n) {
  var isle = ISLANDS_JJK[n];
  if (!isle) return;

  // Leçon d'abord, puis BGM + cinématique dans le callback (règle AU-04)
  if (typeof showLesson === 'function' && window.LESSON_REGISTRY && window.LESSON_REGISTRY['namek']) {
    var avatar = JJK_AVATARS[n] || '';
    showLesson('namek', n, avatar, isle.color, function() {
      jjk_playBGM(isle.bgm || 'jjk-map');
      jjk_playCinematic(n, function(){ jjk_launchIsland(n); });
    });
  } else {
    jjk_playBGM(isle.bgm || 'jjk-map');
    jjk_playCinematic(n, function(){ jjk_launchIsland(n); });
  }
}

function jjk_launchIsland(n) {
  jjk_currentIsland = n;
  jjk_answers       = {};

  // Boss battle — init si l'île contient une question boss
  var _jb = ISLANDS_JJK[n];
  if (_jb && _jb.qs && _jb.qs.some(function(q){ return q.isBoss; })) {
    var _bq = _jb.qs.find(function(q){ return q.isBoss; });
    if (window.AP && window.AP.boss) {
      window.AP.boss.init('namek', _bq.bossName || 'BOSS', JJK_BOSS_AVATARS[_bq.bossName] || '', 1);
    }
  }

  var ov = document.getElementById('jjk-cine-overlay');
  if (ov) { ov.style.display = 'none'; ov.style.zIndex = '-1'; ov.innerHTML = ''; }

  var secIles = document.getElementById('jjk-iles-sec');
  var secQuiz = document.getElementById('jjk-quiz-sec');
  if (secIles) secIles.style.display = 'none';
  if (secQuiz) { secQuiz.style.display = 'block'; secQuiz.style.zIndex = '5'; }
  window.scrollTo(0, 0);

  var isle = ISLANDS_JJK[n];
  document.getElementById('jjk-qTitle').textContent    = isle.name + ' — ' + isle.topic;
  document.getElementById('jjk-qProgFill').style.width = '0%';
  document.getElementById('jjk-qProgLbl').textContent  = '0 / ' + isle.qs.length;

  var keys = ['A', 'B', 'C', 'D'];
  var html = '';

  isle.qs.forEach(function(e, i) {
    var msg    = isle.msgs[i % isle.msgs.length];
    var avatar = JJK_AVATARS[n] || '';
    var bossBanner = e.isBoss
      ? '<div class="jjk-boss-banner">' +
          '<div class="jjk-boss-label">⚔️ COMBAT FINAL</div>' +
          '<div class="jjk-boss-name">' + (e.bossName || 'BOSS') + '</div>' +
          '<div class="jjk-boss-hp"><div class="jjk-boss-hp-fill"></div></div>' +
        '</div>'
      : '';
    var opts = e.o.map(function(opt, j) {
      var safe = opt.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
      return '<label class="jjk-opt" id="jjk-lbl' + i + '_' + j + '"' +
        ' data-qi="' + i + '" data-oi="' + j + '" data-v="' + safe + '"' +
        ' onclick="jjk_selectOpt(this.dataset.qi,this.dataset.oi,this.dataset.v)">' +
        '<span class="jjk-opt-key">' + keys[j] + '</span>' +
        '<span class="jjk-opt-txt">' + opt + '</span></label>';
    }).join('');

    html +=
      '<div class="jjk-q-card' + (e.isBoss ? ' jjk-boss-card' : '') + '" style="--isle-color:' + isle.color + '">' +
        bossBanner +
        '<div class="jjk-char-panel">' +
          '<img src="' + avatar + '" class="jjk-char-img" onerror="this.style.display=\'none\'">' +
          '<div class="jjk-char-info">' +
            '<div class="jjk-char-name" style="color:' + isle.color + '">' + isle.charName + '</div>' +
            '<div class="jjk-speech-bubble">' + msg + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="jjk-q-body">' +
          '<div class="jjk-q-num">Question ' + (i + 1) + ' / ' + isle.qs.length + '</div>' +
          '<div class="jjk-q-txt">' + e.q + '</div>' +
          '<div class="jjk-opts">' + opts + '</div>' +
          '<div class="jjk-feedback" id="jjk-fb' + i + '"></div>' +
          '<div class="jjk-expl" id="jjk-expl' + i + '"></div>' +
        '</div>' +
      '</div>';
  });

  html += '<div class="jjk-submit-wrap"><button class="jjk-btn jjk-btn-main" onclick="jjk_corriger(' + n + ')">🔮 CORRIGER MES RÉPONSES</button></div>';
  document.getElementById('jjk-qContainer').innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// 8. SÉLECTION
// ══════════════════════════════════════════════════════════════
function jjk_selectOpt(qi, oi, val) {
  qi = parseInt(qi); oi = parseInt(oi);
  var isle = ISLANDS_JJK[jjk_currentIsland];
  if (!isle) return;
  if (typeof sfxSwoosh === 'function') sfxSwoosh();

  for (var j = 0; j < isle.qs[qi].o.length; j++) {
    var lbl = document.getElementById('jjk-lbl' + qi + '_' + j);
    if (lbl) lbl.classList.remove('jjk-selected');
  }
  var sel = document.getElementById('jjk-lbl' + qi + '_' + oi);
  if (sel) sel.classList.add('jjk-selected');

  jjk_answers[qi] = { oi: oi, val: val };

  var filled = Object.keys(jjk_answers).length;
  var total  = isle.qs.length;
  var prog   = document.getElementById('jjk-qProgFill');
  var lbl2   = document.getElementById('jjk-qProgLbl');
  if (prog) prog.style.width = Math.round(filled / total * 100) + '%';
  if (lbl2) lbl2.textContent = filled + ' / ' + total;
}

// ══════════════════════════════════════════════════════════════
// 9. CORRECTION
// ══════════════════════════════════════════════════════════════
function jjk_corriger(n) {
  var isle = ISLANDS_JJK[n];
  if (!isle) return;
  var score = 0;
  jjk_streak = 0;

  isle.qs.forEach(function(e, i) {
    var fb   = document.getElementById('jjk-fb' + i);
    var expl = document.getElementById('jjk-expl' + i);
    var ans  = jjk_answers[i];

    // Désactiver les options
    for (var j = 0; j < e.o.length; j++) {
      var lbl = document.getElementById('jjk-lbl' + i + '_' + j);
      if (lbl) {
        lbl.style.pointerEvents = 'none';
        if (e.o[j] === e.a) lbl.classList.add('jjk-correct');
      }
    }

    if (!ans) {
      if (fb) { fb.textContent = '⚠️ Pas de réponse !'; fb.className = 'jjk-feedback jjk-ko'; }
      if (typeof sfxKO === 'function') sfxKO();
      jjk_streak = 0;
    } else if (ans.val === e.a) {
      score++;
      jjk_streak++;
      if (fb) { fb.textContent = '✅ Correct !'; fb.className = 'jjk-feedback jjk-ok'; }
      if (typeof sfxOK    === 'function') sfxOK();
      if (typeof starRain === 'function' && jjk_streak >= 3) starRain(3);
      if (typeof showToast === 'function' && jjk_streak >= 5) setTimeout(function(){ showToast('🔮 SÉRIE × ' + jjk_streak + ' !'); }, 400);
    } else {
      var wrong = document.getElementById('jjk-lbl' + i + '_' + ans.oi);
      if (wrong) wrong.classList.add('jjk-wrong');
      if (fb) { fb.textContent = '❌ Raté ! Réponse : ' + e.a; fb.className = 'jjk-feedback jjk-ko'; }
      if (typeof sfxKO === 'function') sfxKO();
      jjk_streak = 0;
    }
    if (expl) { expl.innerHTML = '💡 ' + e.exp; expl.classList.add('jjk-show'); }
  });

  // ── XP + progression — Règle AA #4 : sync xp global ──
  var gained = score * 2;
  window._jjkLastScore     = score;
  jjk_xp                  += gained;
  jjk_completedIslands[n]  = score;

  if (typeof xp               !== 'undefined') xp              += gained;
  if (typeof completedIslands !== 'undefined') completedIslands['jjk_' + n] = score;
  if (typeof updateHUD        === 'function')  updateHUD();
  if (typeof checkBadges      === 'function')  checkBadges();
  if (typeof saveProgress     === 'function')  saveProgress();

  // Sauvegarde Supabase
  _jjkSaveDB(n, score, gained);

  // Boss battle — résultat
  if (window.AP && window.AP.boss && window.AP.boss.isActive()) {
    if (isle.qs.some(function(q){ return q.isBoss; })) {
      window.AP.boss.hit(score >= isle.qs.length - 1, true);
    }
  }

  // BGM résultat
  if (score === isle.qs.length) {
    jjk_playBGM('jjk-victory');
    if (typeof sfxPerfect === 'function') sfxPerfect();
    if (typeof starRain   === 'function') starRain(12);
  } else {
    jjk_playBGM('jjk-map');
  }

  jjk_showResults(n, score);
}

async function _jjkSaveDB(n, score, xpGained) {
  try {
    if (typeof dbGetActiveChild !== 'function') return;
    var child = dbGetActiveChild();
    if (!child) return;
    await dbSaveProgression(child.id, 'jjk_' + n, score, xpGained);
  } catch(e) { console.warn('[JJK] DB save:', e && e.message); }
}

// ══════════════════════════════════════════════════════════════
// 10. RÉSULTATS
// ══════════════════════════════════════════════════════════════
function jjk_showResults(n, score) {
  var isle   = ISLANDS_JJK[n];
  var gained = score * 2;
  var txts   = [
    { min:11, t:'GRADE SPÉCIAL ! 11/11 !!!' },
    { min:9,  t:'GRADE 1 — Exorciste confirmé !' },
    { min:7,  t:'Bien joué, Grade 2 !' },
    { min:5,  t:'Continue, Grade 3 !' },
    { min:0,  t:'Ne lâche pas ! Semi-Grade 2 !' }
  ];
  var res  = txts.find(function(r){ return score >= r.min; }) || txts[txts.length - 1];
  var gif  = (score === isle.qs.length)
    ? JJK_GIFS_PERFECT[Math.floor(Math.random() * JJK_GIFS_PERFECT.length)]
    : score >= Math.ceil(isle.qs.length * 0.6)
      ? JJK_GIFS_WIN[score % JJK_GIFS_WIN.length]
      : JJK_GIFS_LOSE[0];
  var stars = isle.qs.map(function(_, i){ return i < score ? '⭐' : '☆'; }).join('');

  var html =
    '<div class="jjk-result-card" id="jjk-resCard" style="--isle-color:' + isle.color + '">' +
      '<div class="jjk-result-banner">' +
        '<img src="' + (JJK_AVATARS[n] || '') + '" class="jjk-result-avatar" onerror="this.style.display=\'none\'">' +
        '<div class="jjk-result-score-wrap">' +
          '<div class="jjk-result-score">' + score + '/' + isle.qs.length + '</div>' +
          '<div class="jjk-result-title">' + res.t + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="jjk-result-body">' +
        '<div class="jjk-result-topic">🌍 ' + isle.topic + '</div>' +
        '<div class="jjk-result-stars">' + stars + '</div>' +
        (gif ? '<img src="' + gif + '" class="jjk-result-gif" onerror="this.style.display=\'none\'">' : '') +
        '<div class="jjk-result-xp">+' + gained + ' XP Géographie 🔮 — Total Namek : ' + jjk_xp + ' XP</div>' +
        '<button class="jjk-btn jjk-btn-main" onclick="jjk_goBack()">🗺️ RETOUR À LA CARTE</button>' +
        '<button class="jjk-btn jjk-btn-outline" onclick="jjk_retry(' + n + ')">🔁 REJOUER</button>' +
      '</div>' +
    '</div>';

  var c = document.getElementById('jjk-qContainer');
  if (c) c.innerHTML += html;

  var stEl = document.getElementById('jjk-stars' + n);
  if (stEl) stEl.textContent = stars;

  setTimeout(function(){
    var rc = document.getElementById('jjk-resCard');
    if (rc) rc.scrollIntoView({ behavior:'smooth', block:'center' });
  }, 400);
}

// ══════════════════════════════════════════════════════════════
// 11. NAVIGATION
// ══════════════════════════════════════════════════════════════
function jjk_goBack() {
  if (window.AP && window.AP.recap) {
    var isle  = ISLANDS_JJK[jjk_currentIsland];
    var total = isle ? isle.qs.length : 11;
    window.AP.recap.show('namek', window._jjkLastScore || 0, total, jjk_currentIsland, function() {
      jjk_playBGM('jjk-map');
      var secQuiz = document.getElementById('jjk-quiz-sec');
      var secIles = document.getElementById('jjk-iles-sec');
      if (secQuiz) secQuiz.style.display = 'none';
      if (secIles) secIles.style.display = 'block';
      jjk_answers = {};
      window.scrollTo(0, 0);
      var grid = document.getElementById('jjk-islands-grid');
      if (grid) { grid.innerHTML = ''; buildJjkGrid(); }
    });
  } else {
    jjk_playBGM('jjk-map');
    var secQuiz = document.getElementById('jjk-quiz-sec');
    var secIles = document.getElementById('jjk-iles-sec');
    if (secQuiz) secQuiz.style.display = 'none';
    if (secIles) secIles.style.display = 'block';
    jjk_answers = {};
    window.scrollTo(0, 0);
    var grid = document.getElementById('jjk-islands-grid');
    if (grid) { grid.innerHTML = ''; buildJjkGrid(); }
  }
}

function jjk_retry(n) { jjk_answers = {}; jjk_startIsland(n); }

// ══════════════════════════════════════════════════════════════
// 12. GRILLE DES ÎLES
// ══════════════════════════════════════════════════════════════
function buildJjkGrid() {
  var grid = document.getElementById('jjk-islands-grid');
  if (!grid || grid.children.length > 0) return;
  var html = '';

  for (var n = 1; n <= 8; n++) {
    var isle   = ISLANDS_JJK[n];
    var avatar = JJK_AVATARS[n] || '';
    var score  = jjk_completedIslands[n] || 0;
    var done   = jjk_completedIslands[n] !== undefined;
    var stars  = isle.qs.map(function(_, i){ return i < score ? '⭐' : '☆'; }).join('');

    html +=
      '<div class="jjk-isle-card' + (done ? ' done' : '') + '"' +
        ' onclick="jjk_startIsland(' + n + ')"' +
        ' style="--isle-color:' + isle.color + '">' +
        '<div class="jjk-isle-img-wrap">' +
          '<img src="' + avatar + '" alt="' + isle.charName + '" class="jjk-isle-img"' +
            ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="jjk-isle-img-fallback" style="background:' + isle.color + '22;color:' + isle.color + '">' +
            JJK_FALLBACK[n] +
          '</div>' +
          '<div class="jjk-isle-overlay" style="background:linear-gradient(to top,' + isle.color + 'cc,transparent)"></div>' +
        '</div>' +
        '<div class="jjk-isle-body">' +
          '<div class="jjk-isle-num">ÎLE #' + n + '</div>' +
          '<div class="jjk-isle-name" style="color:' + isle.color + '">' + isle.charName.toUpperCase() + '</div>' +
          '<div class="jjk-isle-topic">' + isle.topic + '</div>' +
          '<div class="jjk-isle-level" style="border-color:' + isle.color + '55;color:' + isle.color + '">' + isle.level + '</div>' +
          '<div class="jjk-isle-stars" id="jjk-stars' + n + '">' + stars + '</div>' +
        '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// 13. PROGRESSION
// ══════════════════════════════════════════════════════════════
async function loadJjkProgress() {
  var child = (typeof dbGetActiveChild === 'function') ? dbGetActiveChild() : null;
  if (child && typeof dbGetProgression === 'function') {
    try {
      var prog = await dbGetProgression(child.id);
      prog.forEach(function(row) {
        if (String(row.island_id).startsWith('jjk_')) {
          var n = parseInt(row.island_id.replace('jjk_', ''));
          if (n >= 1 && n <= 8) { jjk_completedIslands[n] = row.score || 0; jjk_xp += row.xp || 0; }
        }
      });
      return;
    } catch(e) { /* fallback localStorage */ }
  }
  try {
    var saved = localStorage.getItem('jjk_progress');
    if (!saved) return;
    var d = JSON.parse(saved);
    jjk_xp = d.xp || 0; jjk_completedIslands = d.completedIslands || {};
  } catch(e) {}
}

// ══════════════════════════════════════════════════════════════
// 14. ENTRÉE DANS LE MONDE (appelé par router.js)
// ══════════════════════════════════════════════════════════════
async function showNamek() {
  jjk_stopBGM();
  setTimeout(function(){ jjk_playBGM('jjk-map'); }, 300);

  var secIles = document.getElementById('jjk-iles-sec');
  if (secIles) { secIles.style.display = 'block'; buildJjkGrid(); }

  var bg = document.getElementById('jjk-bg');
  if (bg) bg.classList.add('visible');

  await loadJjkProgress();
}

console.info('🔮 quiz-namek.js chargé — Géographie · JJK · 8 îles × 11 questions · programme officiel 6ème');