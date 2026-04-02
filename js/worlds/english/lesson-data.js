// ═══════════════════════════════════════════════════════════════
// LESSON-DATA.JS — ⚔️ Paradis — Anglais / Attack on Titan
// Données pédagogiques : règles, exemples, questions échauffement
// Moteur : js/lesson.js (ne pas modifier ici)
// Règle A3 : les données sont séparées du moteur
// Programme : Anglais CM2 → 4ème — Éducation Nationale France
// 4 niveaux × 8 îles = 32 leçons
// CORRECTIONS v1.1 :
//   - 3_1 warmup Q1 : go→walk (verbe régulier, cohérent avec la leçon)
//   - 4_1 warmup Q2 : since→ever (since/for appartient à 4_2)
//   - 3_4 warmup Q1 : explication should vs must ajoutée
//   - 3_4 warmup Q2 : rappel règle modale + V-BASE ajouté
// ═══════════════════════════════════════════════════════════════

window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['english'] = {
  color: '#4a5c3f', bg: '#0a0a0a', textAccent: '#8b6914',
  particles: 'star', worldName: 'Paradis',
  avatar: function(niveau, n) {
    var SUPABASE = 'https://bwxzrqsvccqmzvonsswi.supabase.co/storage/v1/object/public/island-aot/characters/';
    var N1 = { 1:'eren.jpeg', 2:'mikasa.gif', 3:'armin.jpg', 4:'levi.jpg', 5:'historia.png', 6:'jean.jpg', 7:'hange.jpeg', 8:'erwin.jpg' };
    var N2 = { 1:'armin.jpg', 2:'levi.jpg', 3:'historia.png', 4:'jean.jpg', 5:'hange.jpeg', 6:'erwin.jpg', 7:'connie.jpg', 8:'sasha.jpeg' };
    var N3 = { 1:'eren.jpeg', 2:'levi.jpg', 3:'hange.jpeg', 4:'erwin.jpg', 5:'connie.jpg', 6:'sasha.jpeg', 7:'armin.jpg', 8:'historia.png' };
    var N4 = { 1:'historia.png', 2:'levi.jpg', 3:'hange.jpeg', 4:'erwin.jpg', 5:'eren.jpeg', 6:'historia.png', 7:'jean.jpg', 8:'connie.jpg' };
    var maps = { 1: N1, 2: N2, 3: N3, 4: N4 };
    var map  = maps[niveau] || N1;
    return SUPABASE + (map[n] || 'eren.jpeg');
  },
  lessons: {

    // ══════════════════════════════════════════════════════════
    // NIVEAU 1 — CM2 : Vocabulaire de base
    // ══════════════════════════════════════════════════════════

    '1_1': {
      heroName: 'Eren Jäger',
      heroQuote: "L'alphabet, c'est la première étape vers la liberté ! 26 lettres pour conquérir l'anglais !",
      rule: "L'alphabet anglais = 26 lettres. Voyelles : A, E, I, O, U. Consonnes : les 21 autres. La prononciation des lettres en anglais est différente du français.",
      sections: [
        {
          icon: '🔤', title: "L'alphabet anglais", color: '#4a5c3f',
          content: "L'alphabet anglais compte <strong>26 lettres</strong> comme le français. Mais elles se prononcent différemment ! Les <strong>voyelles</strong> sont A, E, I, O, U.",
          examples: [
            "A = [eɪ] · B = [biː] · C = [siː] · D = [diː] · E = [iː]",
            "F = [ɛf] · G = [dʒiː] · H = [eɪtʃ] · I = [aɪ] · J = [dʒeɪ]",
            "K = [keɪ] · L = [ɛl] · M = [ɛm] · N = [ɛn] · O = [oʊ]",
            "P = [piː] · Q = [kjuː] · R = [ɑːr] · S = [ɛs] · T = [tiː]",
            "U = [juː] · V = [viː] · W = [ˈdʌbəljuː] · X = [ɛks] · Y = [waɪ] · Z = [ziː]"
          ]
        },
        {
          icon: '📢', title: "Épeler en anglais (Spelling)", color: '#8b6914',
          content: "Savoir <strong>épeler</strong> un mot (spelling) est essentiel. On dit : <em>\"How do you spell it?\"</em> = Comment ça s'écrit ?",
          examples: [
            "TITAN → T-I-T-A-N = [tiː]-[aɪ]-[tiː]-[eɪ]-[ɛn]",
            "LEVI → L-E-V-I = [ɛl]-[iː]-[viː]-[aɪ]",
            "CAT → C-A-T = [siː]-[eɪ]-[tiː]",
            "My name is Eren. E-R-E-N."
          ]
        },
        {
          icon: '🔊', title: "Sons particuliers", color: '#c0a030',
          content: "Certaines lettres ont des sons uniques en anglais : <strong>W</strong> = [w] comme dans <em>wall</em> · <strong>Y</strong> = [j] comme dans <em>yes</em> · <strong>TH</strong> = [θ] comme dans <em>think</em>",
          examples: [
            "Th- voicé : the, this, that, there → [ð]",
            "Th- sourd : think, three, through → [θ]",
            "Wh- : what, where, when, who → [w] ou [h]",
            "Short vowels : cat [æ], bed [ɛ], bit [ɪ], hot [ɒ], cup [ʌ]"
          ]
        }
      ],
      heroTip: "Eren dit : \"Mémorise l'ordre : A-B-C-D-E-F-G ! Les voyelles AEIOU sont tes alliées. Chante l'alphabet chaque matin !\"",
      warmup: [
        { q: "Combien de lettres comporte l'alphabet anglais ?", a: "26", o: ["24", "26", "28", "30"] },
        { q: "Quelles sont les 5 voyelles de l'alphabet anglais ?", a: "A, E, I, O, U", o: ["A, E, I, O, U", "A, B, C, D, E", "E, I, O, U, Y", "A, I, O, U, W"] }
      ]
    },

    '1_2': {
      heroName: 'Mikasa Ackerman',
      heroQuote: "Les chiffres sont des armes. Compte de 1 à 100 comme un vrai soldat de l'Armée d'Exploration !",
      rule: "Les nombres cardinaux : one, two, three... twenty, thirty... hundred. Les ordinaux : first, second, third, fourth... Les règles de formation : twenty-one, thirty-five...",
      sections: [
        {
          icon: '🔢', title: "Nombres 1-20", color: '#4a5c3f',
          content: "Les nombres de <strong>1 à 20</strong> sont irréguliers et doivent être mémorisés un par un.",
          examples: [
            "1=one · 2=two · 3=three · 4=four · 5=five",
            "6=six · 7=seven · 8=eight · 9=nine · 10=ten",
            "11=eleven · 12=twelve · 13=thirteen · 14=fourteen · 15=fifteen",
            "16=sixteen · 17=seventeen · 18=eighteen · 19=nineteen · 20=twenty"
          ]
        },
        {
          icon: '💯', title: "Dizaines et grands nombres", color: '#8b6914',
          content: "Les <strong>dizaines</strong> de 20 à 100 : twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, one hundred. Pour les nombres composés : twenty + one = twenty-one.",
          examples: [
            "30=thirty · 40=forty · 50=fifty · 60=sixty",
            "70=seventy · 80=eighty · 90=ninety · 100=one hundred",
            "21=twenty-one · 35=thirty-five · 48=forty-eight",
            "1000=one thousand · 1000000=one million"
          ]
        },
        {
          icon: '🥇', title: "Nombres ordinaux", color: '#c0a030',
          content: "Les <strong>ordinaux</strong> servent à classer. Règle générale : ajouter -th. Exceptions : 1st=first, 2nd=second, 3rd=third.",
          examples: [
            "1st=first · 2nd=second · 3rd=third · 4th=fourth · 5th=fifth",
            "8th=eighth (pas eightth) · 9th=ninth · 12th=twelfth",
            "20th=twentieth · 21st=twenty-first",
            "Usage : the 1st of January = le 1er janvier"
          ]
        }
      ],
      heroTip: "Mikasa dit : \"Attention : eight → eighth (pas eightth !) · nine → ninth · twelve → twelfth. Ces irréguliers sont des pièges !\"",
      warmup: [
        { q: "Comment écrit-on le nombre 15 en anglais ?", a: "fifteen", o: ["fiveteen", "fifteen", "fifteeen", "fivetin"] },
        { q: "Comment dit-on '3ème' en anglais ?", a: "third", o: ["threeth", "thirteenth", "third", "thirdth"] }
      ]
    },

    '1_3': {
      heroName: 'Armin Arlert',
      heroQuote: "Les couleurs du monde sont infinies ! Apprends-les en anglais et peins ta liberté !",
      rule: "Les couleurs en anglais : red, blue, green, yellow, white, black, orange, purple, pink, brown, grey. Les adjectifs de couleur se placent AVANT le nom : a red apple.",
      sections: [
        {
          icon: '🎨', title: "Les couleurs principales", color: '#4a5c3f',
          content: "Les <strong>couleurs</strong> sont des adjectifs. En anglais, ils se placent <strong>avant</strong> le nom.",
          examples: [
            "red=rouge · blue=bleu · green=vert · yellow=jaune",
            "white=blanc · black=noir · orange=orange · purple=violet",
            "pink=rose · brown=marron · grey=gris · light blue=bleu clair",
            "a red rose · blue eyes · green grass · a black cat"
          ]
        },
        {
          icon: '🌈', title: "Nuances et combinaisons", color: '#8b6914',
          content: "Pour les nuances : <strong>light</strong> (clair) + couleur · <strong>dark</strong> (foncé) + couleur. Ex : <em>light green</em> = vert clair / <em>dark blue</em> = bleu foncé.",
          examples: [
            "light blue=bleu clair · dark green=vert foncé",
            "light brown=beige-marron · dark red=bordeaux",
            "golden=doré · silver=argenté",
            "What colour is it? — It's red. / It's blue and white."
          ]
        }
      ],
      heroTip: "Armin dit : \"En anglais on dit 'colour' (UK) ou 'color' (US). Les deux sont corrects ! L'adjectif se place TOUJOURS avant le nom.\"",
      warmup: [
        { q: "Comment dit-on 'vert' en anglais ?", a: "green", o: ["grey", "green", "blue", "yellow"] },
        { q: "Quelle phrase est correcte ?", a: "a blue sky", o: ["a sky blue", "blue a sky", "a blue sky", "sky a blue"] }
      ]
    },

    '1_4': {
      heroName: 'Levi Ackerman',
      heroQuote: "Même les animaux méritent le respect. Connais leurs noms en anglais, c'est un ordre !",
      rule: "Les animaux : domestiques (cat, dog, rabbit), ferme (cow, pig, horse, sheep), sauvages (lion, tiger, elephant, bear). La possession : It's a cat. They are dogs.",
      sections: [
        {
          icon: '🐾', title: "Animaux domestiques et de ferme", color: '#4a5c3f',
          content: "Les animaux <strong>domestiques</strong> (pets) et de <strong>ferme</strong> (farm animals) sont parmi les premiers vocabulaires à apprendre.",
          examples: [
            "Pets : cat=chat · dog=chien · rabbit=lapin · fish=poisson · bird=oiseau",
            "Farm : cow=vache · pig=cochon · horse=cheval · sheep=mouton · hen=poule",
            "duck=canard · goat=chèvre · donkey=âne · sheep/sheep (pl.)",
            "It's a cat. / They are cows. / I have a dog."
          ]
        },
        {
          icon: '🦁', title: "Animaux sauvages", color: '#8b6914',
          content: "Les <strong>animaux sauvages</strong> (wild animals) : lion, tiger, elephant, bear, wolf, fox, deer, eagle, snake, shark.",
          examples: [
            "lion=lion · tiger=tigre · elephant=éléphant · bear=ours",
            "wolf=loup · fox=renard · deer=cerf · eagle=aigle",
            "snake=serpent · shark=requin · whale=baleine · dolphin=dauphin",
            "The lion is big. / Eagles fly high. / I like tigers!"
          ]
        }
      ],
      heroTip: "Levi dit : \"Attention : sheep ne change pas au pluriel ! one sheep / two sheep. Même chose pour fish (souvent). Retiens ces exceptions !\"",
      warmup: [
        { q: "Comment dit-on 'chien' en anglais ?", a: "dog", o: ["cat", "dog", "bird", "fish"] },
        { q: "Comment dit-on 'cheval' en anglais ?", a: "horse", o: ["cow", "pig", "horse", "sheep"] }
      ]
    },

    '1_5': {
      heroName: 'Historia Reiss',
      heroQuote: "La famille, c'est ce qu'on choisit. Apprenons les membres de la famille en anglais !",
      rule: "La famille : mother/mum, father/dad, sister, brother, grandmother/granny, grandfather/granddad, aunt, uncle, cousin. Les possessifs : my, your, his, her.",
      sections: [
        {
          icon: '👨‍👩‍👧‍👦', title: "La famille proche", color: '#4a5c3f',
          content: "Les <strong>membres de la famille</strong> immédiate. Deux formes : formelle et familière.",
          examples: [
            "mother/mum=mère · father/dad=père · sister=sœur · brother=frère",
            "parents=parents · children=enfants (child=enfant)",
            "baby=bébé · teenager=adolescent(e) · adult=adulte",
            "This is my mother. / He is my brother. / I have two sisters."
          ]
        },
        {
          icon: '👴', title: "La famille étendue et possessifs", color: '#8b6914',
          content: "La famille <strong>étendue</strong> + les adjectifs <strong>possessifs</strong> : my (mon/ma), your (ton/ta), his (son/sa-masc), her (son/sa-fém).",
          examples: [
            "grandmother/granny=grand-mère · grandfather/granddad=grand-père",
            "aunt=tante · uncle=oncle · cousin=cousin(e) · nephew=neveu · niece=nièce",
            "my mother · your father · his sister · her brother",
            "our parents · their children · its name (animal)"
          ]
        }
      ],
      heroTip: "Historia dit : \"his = son/sa (pour un homme) · her = son/sa (pour une femme). Sa sœur : HIS sister (si c'est un garçon) / HER sister (si c'est une fille). L'accord se fait sur le possesseur !\"",
      warmup: [
        { q: "Comment dit-on 'mère' en anglais (informel) ?", a: "mum", o: ["mum", "sister", "aunt", "granny"] },
        { q: "Complète : ___ brother is tall. (Il parle de son frère à elle)", a: "Her", o: ["His", "Her", "My", "Your"] }
      ]
    },

    '1_6': {
      heroName: 'Jean Kirstein',
      heroQuote: "Connais ton corps comme tu connais ton équipement d'équilibre multidirectionnel ! Tête, épaules, genoux et pieds !",
      rule: "Le corps humain : head, face, eye, nose, mouth, ear, neck, shoulder, arm, hand, leg, foot/feet. Pluriels irréguliers : foot → feet, tooth → teeth.",
      sections: [
        {
          icon: '🧠', title: "La tête et le visage", color: '#4a5c3f',
          content: "Les parties du <strong>visage et de la tête</strong> sont essentielles pour se décrire.",
          examples: [
            "head=tête · face=visage · hair=cheveux · eye=œil / eyes=yeux",
            "nose=nez · mouth=bouche · ear=oreille · tooth/teeth=dent/dents",
            "chin=menton · forehead=front · cheek=joue · neck=cou",
            "She has blue eyes. / He has short hair. / My nose is big."
          ]
        },
        {
          icon: '💪', title: "Le corps : tronc et membres", color: '#8b6914',
          content: "Les parties du <strong>corps</strong> et pluriels irréguliers importants.",
          examples: [
            "shoulder=épaule · arm=bras · elbow=coude · hand=main · finger=doigt",
            "chest=poitrine · stomach/belly=ventre · back=dos",
            "leg=jambe · knee=genou · foot/feet=pied/pieds · toe=orteil",
            "Touch your nose! / Raise your hand! / Stand on one foot!"
          ]
        }
      ],
      heroTip: "Jean dit : \"Pluriels irréguliers à retenir : foot→feet · tooth→teeth · child→children. Pas de -s ici ! Piège d'examen classique !\"",
      warmup: [
        { q: "Quel est le pluriel de 'foot' (pied) ?", a: "feet", o: ["foots", "feet", "feets", "footes"] },
        { q: "Comment dit-on 'genou' en anglais ?", a: "knee", o: ["knee", "elbow", "ankle", "wrist"] }
      ]
    },

    '1_7': {
      heroName: 'Hange Zoë',
      heroQuote: "À l'école on apprend, on découvre, on grandit ! Voici le vocabulaire de l'école en anglais !",
      rule: "L'école : school, classroom, teacher, student, book, pen, pencil, ruler, bag, desk. Les matières : English, Maths, Science, History, Art, P.E. Les jours : Monday to Friday.",
      sections: [
        {
          icon: '📚', title: "Objets scolaires", color: '#4a5c3f',
          content: "Les <strong>objets de la classe</strong> et les <strong>personnes</strong> à l'école.",
          examples: [
            "school=école · classroom=salle de classe · teacher=professeur",
            "student/pupil=élève · desk=bureau · chair=chaise · board=tableau",
            "book=livre · notebook=cahier · pen=stylo · pencil=crayon",
            "ruler=règle · eraser=gomme · bag=sac · scissors=ciseaux"
          ]
        },
        {
          icon: '🏫', title: "Matières et emploi du temps", color: '#8b6914',
          content: "Les <strong>matières scolaires</strong> (school subjects) et les <strong>jours de la semaine</strong>.",
          examples: [
            "English=anglais · Maths=maths · Science=sciences · History=histoire",
            "Art=arts plastiques · P.E. (Physical Education)=EPS · Music=musique",
            "Monday=lundi · Tuesday=mardi · Wednesday=mercredi · Thursday=jeudi",
            "Friday=vendredi · Saturday=samedi · Sunday=dimanche",
            "I have English on Monday. / My favourite subject is Art."
          ]
        }
      ],
      heroTip: "Hange dit : \"P.E. = Physical Education = EPS. En anglais, les jours et les matières prennent une MAJUSCULE : Monday, English, History !\"",
      warmup: [
        { q: "Comment dit-on 'professeur' en anglais ?", a: "teacher", o: ["student", "teacher", "principal", "doctor"] },
        { q: "Comment dit-on 'mercredi' en anglais ?", a: "Wednesday", o: ["Tuesday", "Thursday", "Wednesday", "Monday"] }
      ]
    },

    '1_8': {
      heroName: 'Erwin Smith',
      heroQuote: "Un bon commandant connaît la météo avant la mission ! Apprenons à décrire le temps qu'il fait !",
      rule: "La météo : sunny, cloudy, rainy, windy, snowy, foggy, hot, cold, warm. Structure : It is sunny. / The weather is cold. / What's the weather like today?",
      sections: [
        {
          icon: '☀️', title: "Décrire la météo", color: '#4a5c3f',
          content: "Pour parler de la <strong>météo</strong>, on utilise : <em>It is + adjectif</em> ou <em>It is + verbe-ing</em>.",
          examples: [
            "It is sunny. = Il fait soleil.",
            "It is raining. = Il pleut. / It is snowing. = Il neige.",
            "It is cold. = Il fait froid. / It is hot. = Il fait chaud.",
            "It is cloudy. = Il est nuageux. / It is windy. = Il y a du vent.",
            "It is foggy. = Il y a du brouillard. / It is stormy. = Il y a une tempête."
          ]
        },
        {
          icon: '🌡️', title: "Saisons et questions météo", color: '#8b6914',
          content: "Les <strong>saisons</strong> et les <strong>questions</strong> pour parler de la météo.",
          examples: [
            "spring=printemps · summer=été · autumn/fall=automne · winter=hiver",
            "What's the weather like? = Quel temps fait-il ?",
            "What's the temperature? = Quelle est la température ?",
            "In summer, it is hot and sunny. / In winter, it is cold.",
            "I love autumn because the leaves are orange and red."
          ]
        }
      ],
      heroTip: "Erwin dit : \"What's the weather like today? C'est LA question météo à connaître. Réponse : It's sunny / It's raining / It's cold. Simple et efficace !\"",
      warmup: [
        { q: "Comment dit-on 'Il pleut.' en anglais ?", a: "It is raining.", o: ["It is raining.", "The rain is.", "It rains now.", "Rain is here."] },
        { q: "Comment dit-on 'été' en anglais ?", a: "summer", o: ["spring", "autumn", "winter", "summer"] }
      ]
    },

    // ══════════════════════════════════════════════════════════
    // NIVEAU 2 — 6ème : Grammaire de base
    // ══════════════════════════════════════════════════════════

    '2_1': {
      heroName: 'Armin Arlert',
      heroQuote: "Le Present Simple, c'est l'arme de base ! Maîtrise-le et tu pourras tout exprimer !",
      rule: "Present Simple = action habituelle ou vérité générale. Affirmation : I/You/We/They + V-base · He/She/It + V+s. Négation : don't/doesn't + V. Question : Do/Does + sujet + V ?",
      sections: [
        {
          icon: '✅', title: "Affirmation au Present Simple", color: '#4a5c3f',
          content: "Le <strong>Present Simple</strong> décrit des habitudes, des faits permanents. Règle clé : à la 3ème personne du singulier (he/she/it), on ajoute <strong>-s</strong> au verbe.",
          examples: [
            "I eat breakfast. / You eat breakfast. / We eat breakfast.",
            "He eat<strong>s</strong> breakfast. / She read<strong>s</strong>. / It work<strong>s</strong>.",
            "Exceptions : go → goes · do → does · have → has · watch → watches",
            "Finish → finishes · study → studies · fly → flies (y→ies)"
          ]
        },
        {
          icon: '❌', title: "Négation et questions", color: '#8b6914',
          content: "Pour la <strong>négation</strong> : don't (I/You/We/They) ou doesn't (He/She/It) + verbe base. Pour les <strong>questions</strong> : Do/Does + sujet + V-base ?",
          examples: [
            "I don't like rain. / They don't live here.",
            "He doesn't eat meat. / She doesn't play tennis.",
            "Do you speak English? — Yes, I do. / No, I don't.",
            "Does he work here? — Yes, he does. / No, he doesn't.",
            "Marqueurs : every day, always, never, often, sometimes, usually"
          ]
        }
      ],
      heroTip: "Armin dit : \"Règle d'or : He/She/It → +s au verbe. Et pour les questions/négations : does/doesn't efface le -s ! Does he work? (pas works !)\"",
      warmup: [
        { q: "Quelle forme est correcte ? She ___ French.", a: "speaks", o: ["speak", "speaks", "speaking", "to speak"] },
        { q: "Forme la négation : He plays football.", a: "He doesn't play football.", o: ["He don't play football.", "He doesn't play football.", "He doesn't plays football.", "He not play football."] }
      ]
    },

    '2_2': {
      heroName: 'Levi Ackerman',
      heroQuote: "BE et HAVE sont les deux verbes fondamentaux. Apprends-les, pas d'excuses !",
      rule: "Verbe BE : I am / You are / He-She-It is / We-You-They are. Verbe HAVE : I have / You have / He-She-It has / We-You-They have. Formes contractées : I'm, you're, he's, she's, it's, we're, they're.",
      sections: [
        {
          icon: '🔵', title: "Verbe TO BE", color: '#4a5c3f',
          content: "Le verbe <strong>to be</strong> (être) est le plus utilisé en anglais. Conjugaison complète :",
          examples: [
            "I am (I'm) · You are (You're) · He is (He's) · She is (She's) · It is (It's)",
            "We are (We're) · You are (You're) · They are (They're)",
            "Négatif : I am not (I'm not) · He is not (He isn't) · They are not (aren't)",
            "Question : Am I? / Are you? / Is he? / Are they?",
            "I'm French. / She's a teacher. / Are you happy? — Yes, I am."
          ]
        },
        {
          icon: '🟢', title: "Verbe TO HAVE", color: '#8b6914',
          content: "Le verbe <strong>to have</strong> (avoir) : I/You/We/They have · He/She/It <strong>has</strong>.",
          examples: [
            "I have a dog. / You have blue eyes. / We have two cats.",
            "He has a sister. / She has long hair. / It has sharp teeth.",
            "Négatif : I don't have / He doesn't have (PAS hasn't en Present Simple)",
            "Question : Do you have...? / Does she have...?",
            "Have got (UK) : I've got / He's got — plus informel"
          ]
        }
      ],
      heroTip: "Levi dit : \"Jamais 'he have' — toujours 'he HAS' ! C'est la règle n°1. Et les contractions : I'm / She's / They're — obligatoires à l'oral !\"",
      warmup: [
        { q: "Complète : She ___ a very good student.", a: "is", o: ["are", "am", "is", "be"] },
        { q: "Complète : My brother ___ two dogs.", a: "has", o: ["have", "has", "is have", "haves"] }
      ]
    },

    '2_3': {
      heroName: 'Historia Reiss',
      heroQuote: "A, an, the... Trois petits mots, une grande différence ! Je vais te les expliquer !",
      rule: "Articles indéfinis : a (avant consonne) / an (avant voyelle) = un/une. Article défini : the = le/la/les. Pas d'article : pluriels généraux, matières, pays (souvent).",
      sections: [
        {
          icon: '📖', title: "A et AN — articles indéfinis", color: '#4a5c3f',
          content: "<strong>A</strong> et <strong>AN</strong> = un/une. Règle : <em>a</em> devant consonne, <em>an</em> devant voyelle (a-e-i-o-u) ou 'h' muet.",
          examples: [
            "a cat · a dog · a book · a teacher · a soldier (s=consonne)",
            "an apple · an egg · an island · an orange · an umbrella",
            "an hour [aʊər] ← h muet → an ! / a university [juː] ← son [j] → a !",
            "a + nom singulier comptable non spécifié : I have a dog."
          ]
        },
        {
          icon: '🎯', title: "THE — article défini", color: '#8b6914',
          content: "<strong>THE</strong> = le/la/les. Il désigne quelque chose de <strong>spécifique</strong> ou déjà mentionné.",
          examples: [
            "I have a dog. The dog is brown. (2ème mention = spécifique)",
            "The sun / the moon / the Earth (unique au monde)",
            "Pass the salt, please. (objet précis devant soi)",
            "Pas d'article : I like cats (généralité) · I speak English · I live in France",
            "Pas d'article : school, breakfast, lunch, home, bed (expressions fixes)"
          ]
        }
      ],
      heroTip: "Historia dit : \"an HOUR (h muet) → an ! / a UNIVERSITY (son [j]) → a ! La règle c'est le SON, pas la lettre écrite. Écoute avant de décider !\"",
      warmup: [
        { q: "Choisis le bon article : ___ elephant is big.", a: "An", o: ["A", "An", "The", "—"] },
        { q: "Choisis le bon article : I eat ___ breakfast every morning.", a: "—", o: ["a", "an", "the", "—"] }
      ]
    },

    '2_4': {
      heroName: 'Jean Kirstein',
      heroQuote: "Un soldat, deux soldats ! Les pluriels en anglais, c'est pas si compliqué si on connaît les règles !",
      rule: "Pluriels réguliers : +s (cat/cats). Règles spéciales : +es (box/boxes), y→ies (baby/babies), f→ves (leaf/leaves). Pluriels irréguliers : man/men, woman/women, child/children, mouse/mice.",
      sections: [
        {
          icon: '📝', title: "Pluriels réguliers et règles", color: '#4a5c3f',
          content: "La règle générale du pluriel : ajouter <strong>-s</strong>. Mais plusieurs cas particuliers !",
          examples: [
            "+s : cat→cats · book→books · house→houses · soldier→soldiers",
            "+es (après s,x,z,sh,ch) : box→boxes · watch→watches · bush→bushes",
            "y→ies (consonne+y) : baby→babies · city→cities · story→stories",
            "y→ys (voyelle+y) : boy→boys · day→days · key→keys",
            "f/fe→ves : leaf→leaves · wolf→wolves · life→lives · knife→knives"
          ]
        },
        {
          icon: '⚠️', title: "Pluriels irréguliers", color: '#8b6914',
          content: "Les <strong>pluriels irréguliers</strong> ne suivent aucune règle — ils doivent être mémorisés.",
          examples: [
            "man→men · woman→women · child→children · person→people",
            "mouse→mice · tooth→teeth · foot→feet · goose→geese",
            "sheep→sheep · fish→fish · deer→deer (invariables !)",
            "ox→oxen · cactus→cacti · criterion→criteria"
          ]
        }
      ],
      heroTip: "Jean dit : \"Les pièges classiques : child→children (pas childs !) · woman→women · mouse→mice. Et sheep reste sheep, jamais sheeps !\"",
      warmup: [
        { q: "Quel est le pluriel de 'child' ?", a: "children", o: ["childs", "childrens", "children", "childes"] },
        { q: "Quel est le pluriel de 'city' ?", a: "cities", o: ["citys", "cities", "cityes", "city"] }
      ]
    },

    '2_5': {
      heroName: 'Hange Zoë',
      heroQuote: "Les adjectifs, ce sont les couleurs du langage ! Plus t'en connais, plus tu es expressif !",
      rule: "Adjectifs qualificatifs : big/small, fast/slow, hot/cold, beautiful/ugly, happy/sad, new/old. Placement : AVANT le nom (a big house) ou après BE (The house is big). Pas de pluriel en anglais.",
      sections: [
        {
          icon: '🌟', title: "Adjectifs : placement et accord", color: '#4a5c3f',
          content: "En anglais, les adjectifs se placent <strong>avant le nom</strong> et ne s'accordent <strong>jamais</strong> en genre ou en nombre.",
          examples: [
            "a big house · a big houses ✗ → big houses ✓",
            "a beautiful girl · a beautiful boy (pas de féminin !)",
            "Après BE : The house is big. / The girls are beautiful.",
            "Ordre des adjectifs : opinion→taille→âge→forme→couleur→origine+nom",
            "a lovely small old round green French vase (rare mais correct)"
          ]
        },
        {
          icon: '🔄', title: "Antonymes et vocabulaire", color: '#8b6914',
          content: "Les <strong>antonymes</strong> (contraires) et vocabulaire d'adjectifs fréquents.",
          examples: [
            "big/large ↔ small/little · fast/quick ↔ slow · hot ↔ cold · warm ↔ cool",
            "happy ↔ sad · angry ↔ calm · tired ↔ energetic · bored ↔ excited",
            "beautiful/pretty ↔ ugly · clean ↔ dirty · new ↔ old · easy ↔ difficult",
            "strong ↔ weak · tall ↔ short · fat/chubby ↔ thin/slim · rich ↔ poor"
          ]
        }
      ],
      heroTip: "Hange dit : \"JAMAIS d'accord en anglais ! two tall soldiers (pas 'talls'). Et ordre : opinion avant tout, puis taille, âge, couleur, origine !\"",
      warmup: [
        { q: "Quelle phrase est correcte ?", a: "She has a beautiful dress.", o: ["She has a dress beautiful.", "She has a beautifuls dress.", "She has a beautiful dress.", "Beautiful she has a dress."] },
        { q: "Quel est le contraire de 'happy' ?", a: "sad", o: ["angry", "tired", "sad", "bored"] }
      ]
    },

    '2_6': {
      heroName: 'Erwin Smith',
      heroQuote: "La position de tes soldats sur le terrain, c'est comme les prépositions : in, on, under, between !",
      rule: "Prépositions de lieu : in (dans), on (sur), under (sous), between (entre), next to (à côté de), in front of (devant), behind (derrière), opposite (en face de).",
      sections: [
        {
          icon: '📍', title: "Prépositions de lieu principales", color: '#4a5c3f',
          content: "Les <strong>prépositions de lieu</strong> indiquent où se trouve quelque chose. Les plus importantes :",
          examples: [
            "in = dans : The cat is in the box.",
            "on = sur : The book is on the desk.",
            "under = sous : The dog is under the table.",
            "behind = derrière : She is behind the door.",
            "in front of = devant : He is in front of the class."
          ]
        },
        {
          icon: '🗺️', title: "Autres prépositions fréquentes", color: '#8b6914',
          content: "Prépositions de lieu <strong>supplémentaires</strong> et <strong>de temps</strong> essentielles.",
          examples: [
            "next to / beside = à côté de : Sit next to me.",
            "between = entre : The bank is between the school and the park.",
            "opposite = en face de : The supermarket is opposite the station.",
            "near = près de : I live near the school.",
            "Temps : at (at 8 o'clock) · on (on Monday) · in (in July / in winter)"
          ]
        }
      ],
      heroTip: "Erwin dit : \"Prépositions de temps : AT (heure : at 3pm) · ON (jour : on Monday) · IN (mois/saison : in July, in summer). C'est mémorisable !\"",
      warmup: [
        { q: "The cat is ___ the box. (le chat est DANS la boîte)", a: "in", o: ["on", "under", "in", "behind"] },
        { q: "Quelle préposition pour les jours ? I go to school ___ Monday.", a: "on", o: ["in", "at", "on", "to"] }
      ]
    },

    '2_7': {
      heroName: 'Connie Springer',
      heroQuote: "Do you like manga? Does she play sports? Les questions au Present Simple, c'est fastoche !",
      rule: "Questions fermées (yes/no) : Do/Does + sujet + V-base ? Questions ouvertes (WH-) : WH-word + do/does + sujet + V ? Réponses courtes : Yes, I do. / No, she doesn't.",
      sections: [
        {
          icon: '❓', title: "Questions fermées (Yes/No)", color: '#4a5c3f',
          content: "Pour poser une <strong>question</strong> au Present Simple, on utilise l'auxiliaire <strong>do</strong> ou <strong>does</strong>.",
          examples: [
            "Do you like pizza? — Yes, I do. / No, I don't.",
            "Does he play football? — Yes, he does. / No, he doesn't.",
            "Do they speak English? — Yes, they do.",
            "Does she watch TV? — No, she doesn't.",
            "Are you happy? (avec BE, pas de do !)"
          ]
        },
        {
          icon: '🔍', title: "Questions ouvertes (WH-)", color: '#8b6914',
          content: "Les <strong>mots interrogatifs</strong> (WH- questions) permettent d'obtenir des informations précises.",
          examples: [
            "What = quoi/que : What do you eat? / What does he do?",
            "Where = où : Where do you live? / Where does she work?",
            "When = quand : When does the film start?",
            "Who = qui : Who do you like? / Who is your teacher?",
            "Why = pourquoi : Why do you study English? — Because I like it!",
            "How = comment : How do you go to school?"
          ]
        }
      ],
      heroTip: "Connie dit : \"WH- + do/does + sujet + V-base. Exemple : WHERE does she LIVE? (pas 'lives'). Le -s disparaît car does est là !\"",
      warmup: [
        { q: "Forme la question : He lives in Paris.", a: "Does he live in Paris?", o: ["Do he lives in Paris?", "Does he live in Paris?", "Does he lives in Paris?", "Do he live in Paris?"] },
        { q: "Complète la question : ___ does she go to school?", a: "Where", o: ["What", "Who", "Where", "When"] }
      ]
    },

    '2_8': {
      heroName: 'Sasha Blouse',
      heroQuote: "La nourriture, c'est ma passion ! Et le vocabulaire quotidien c'est la nourriture de l'esprit !",
      rule: "Vocabulaire quotidien : food (bread, meat, rice, fruit, vegetables), drinks (water, milk, juice), activities (read, write, play, watch, listen), time expressions (in the morning, at noon, in the evening).",
      sections: [
        {
          icon: '🍎', title: "Nourriture et boissons", color: '#4a5c3f',
          content: "La <strong>nourriture</strong> (food) et les <strong>boissons</strong> (drinks) sont un vocabulaire de base incontournable.",
          examples: [
            "Meals : breakfast=petit-déjeuner · lunch=déjeuner · dinner=dîner",
            "Food : bread=pain · meat=viande · rice=riz · pasta=pâtes · fish=poisson",
            "Fruit : apple=pomme · banana=banane · strawberry=fraise · orange=orange",
            "Vegetables : carrot=carotte · potato=pomme de terre · tomato=tomate",
            "Drinks : water=eau · milk=lait · juice=jus · tea=thé · coffee=café"
          ]
        },
        {
          icon: '⏰', title: "Routines et expressions de temps", color: '#8b6914',
          content: "Les <strong>expressions de temps</strong> et les <strong>activités quotidiennes</strong>.",
          examples: [
            "in the morning=le matin · at noon=à midi · in the afternoon=l'après-midi",
            "in the evening=le soir · at night=la nuit · at midnight=à minuit",
            "I wake up at 7 o'clock. / I have breakfast in the morning.",
            "I go to school by bus. / I do my homework in the evening.",
            "Fréquence : always(100%) · usually(80%) · often(60%) · sometimes(40%) · rarely(20%) · never(0%)"
          ]
        }
      ],
      heroTip: "Sasha dit : \"I always eat breakfast (toujours après le sujet pour always/never/usually/often). But : Sometimes I eat pizza (peut aller en début !) \"",
      warmup: [
        { q: "Comment dit-on 'petit-déjeuner' en anglais ?", a: "breakfast", o: ["lunch", "dinner", "breakfast", "snack"] },
        { q: "Comment dit-on 'le soir' en anglais ?", a: "in the evening", o: ["in the morning", "at noon", "in the evening", "at night"] }
      ]
    },

    // ══════════════════════════════════════════════════════════
    // NIVEAU 3 — 5ème : Grammaire intermédiaire
    // ══════════════════════════════════════════════════════════

    '3_1': {
      heroName: 'Eren Jäger',
      heroQuote: "Le passé m'obsède ! Le Past Simple, c'est pour parler d'actions terminées dans le passé !",
      rule: "Past Simple régulier : V + -ed (walked, played, finished). Règles : stop→stopped (double consonne), like→liked (e muet = +d), study→studied (y→ied). Négation : didn't + V-base. Question : Did + sujet + V-base ?",
      sections: [
        {
          icon: '⏪', title: "Past Simple régulier", color: '#4a5c3f',
          content: "Le <strong>Past Simple</strong> s'utilise pour des actions <strong>terminées</strong> dans le passé. Verbes réguliers : V + -ed.",
          examples: [
            "walk → walked · play → played · watch → watched",
            "stop → stopped (consonne double) · plan → planned",
            "like → liked (e muet : juste +d) · dance → danced",
            "study → studied (y→ied) · cry → cried",
            "Marqueurs : yesterday, last week, in 2020, ago, when I was young"
          ]
        },
        {
          icon: '⚠️', title: "Négation et questions au passé", color: '#8b6914',
          content: "Pour la <strong>négation</strong> et les <strong>questions</strong>, on utilise <strong>didn't</strong> ou <strong>Did</strong> + V-BASE (pas -ed !).",
          examples: [
            "Négatif : I didn't walk. / She didn't play. (V-BASE après didn't !)",
            "Question : Did you walk? / Did she play?",
            "did/didn't + V-BASE → le -ed disparaît car did porte le temps",
            "I didn't go (jamais 'didn't went') · Did she come? (jamais 'Did she came?')",
            "Réponses : Yes, I did. / No, she didn't."
          ]
        }
      ],
      heroTip: "Eren dit : \"Après didn't : toujours la base verbale ! 'I didn't went' est FAUX → 'I didn't go' ✓. Le did porte le passé — le verbe reste à la base !\"",
      // ✅ CORRECTION v1.1 : warmup Q1 — remplacé "go" (irrégulier) par "walk" (régulier)
      // La leçon 3_1 porte sur les RÉGULIERS. "go" est irrégulier → cohérence pédagogique.
      warmup: [
        { q: "Mets au Past Simple (régulier) : I (walk) to school yesterday.", a: "I walked to school yesterday.", o: ["I walking to school yesterday.", "I walkd to school yesterday.", "I walked to school yesterday.", "I walks to school yesterday."] },
        { q: "Forme la négation au passé : She watched TV.", a: "She didn't watch TV.", o: ["She didn't watched TV.", "She didn't watch TV.", "She doesn't watch TV.", "She not watched TV."] }
      ]
    },

    '3_2': {
      heroName: 'Levi Ackerman',
      heroQuote: "Les irréguliers, c'est comme l'entraînement : il faut les répéter jusqu'à les connaître par cœur !",
      rule: "Liste des 30 verbes irréguliers les plus fréquents. Les 3 formes : infinitif / Past Simple / Participe passé. Ex : go/went/gone · see/saw/seen · write/wrote/written.",
      sections: [
        {
          icon: '📋', title: "Les 30 irréguliers essentiels (groupe 1)", color: '#4a5c3f',
          content: "Verbes irréguliers <strong>groupe A</strong> : même forme base et participe.",
          examples: [
            "be→was/were→been · have→had→had · do→did→done",
            "go→went→gone · come→came→come · become→became→become",
            "begin→began→begun · run→ran→run · swim→swam→swum",
            "see→saw→seen · give→gave→given · take→took→taken",
            "make→made→made · say→said→said · tell→told→told"
          ]
        },
        {
          icon: '📋', title: "Irréguliers groupe 2 + passé composé", color: '#8b6914',
          content: "Verbes irréguliers <strong>groupe B</strong> et formation du <strong>Present Perfect</strong> (prévu en 4ème).",
          examples: [
            "write→wrote→written · ride→rode→ridden · know→knew→known",
            "break→broke→broken · speak→spoke→spoken · choose→chose→chosen",
            "buy→bought→bought · bring→brought→brought · think→thought→thought",
            "find→found→found · leave→left→left · lose→lost→lost",
            "meet→met→met · sit→sat→sat · stand→stood→stood"
          ]
        }
      ],
      heroTip: "Levi dit : \"Méthode : apprends les irréguliers par groupes de sons : ring/rang/rung · sing/sang/sung · swim/swam/swum → même pattern !\"",
      warmup: [
        { q: "Quelle est la forme Past Simple de 'write' ?", a: "wrote", o: ["writed", "written", "wrote", "wrotes"] },
        { q: "Quelle est la forme Past Simple de 'buy' ?", a: "bought", o: ["buyed", "buys", "bought", "boughted"] }
      ]
    },

    '3_3': {
      heroName: 'Hange Zoë',
      heroQuote: "Le Present Continuous ! On l'utilise pour les actions en cours, look ! I am explaining grammar right now!",
      rule: "Present Continuous : BE (am/is/are) + V-ing. Usage : action en cours maintenant ou dans un futur proche planifié. Attention : verbes d'état (like, know, want, have) ne s'utilisent PAS en -ing.",
      sections: [
        {
          icon: '🔄', title: "Formation du Present Continuous", color: '#4a5c3f',
          content: "Le <strong>Present Continuous</strong> = am/is/are + V-<strong>ing</strong>. Il exprime une action qui se passe <strong>en ce moment</strong>.",
          examples: [
            "I am eating. / You are running. / She is sleeping.",
            "He is working. / We are studying. / They are playing.",
            "Règles -ing : stop→stopping (consonne double) · make→making (e muet disparaît)",
            "Négatif : I'm not watching. / He isn't sleeping. / They aren't running.",
            "Question : Are you eating? — Yes, I am. / What are you doing?"
          ]
        },
        {
          icon: '🚫', title: "Stative verbs — jamais en -ing !", color: '#8b6914',
          content: "Les <strong>verbes d'état</strong> (stative verbs) ne s'utilisent pas au Present Continuous.",
          examples: [
            "know : I know (✓) / I am knowing (✗)",
            "like/love/hate : I like (✓) / I am liking (✗)",
            "want/need : I want (✓) / I am wanting (✗)",
            "have (possession) : I have a dog (✓) / I am having a dog (✗)",
            "believe/think(opinion)/remember/forget/prefer/belong"
          ]
        }
      ],
      heroTip: "Hange dit : \"Listen ! I am CURRENTLY speaking → -ing. Markers : now, right now, at the moment, look!, listen! Ces mots déclenchent le Continuous !\"",
      warmup: [
        { q: "Mets au Present Continuous : She (read) a book now.", a: "She is reading a book now.", o: ["She reads a book now.", "She is reading a book now.", "She reading a book now.", "She is read a book now."] },
        { q: "Quel verbe NE peut PAS s'utiliser en -ing ?", a: "know", o: ["eat", "run", "know", "play"] }
      ]
    },

    '3_4': {
      heroName: 'Erwin Smith',
      heroQuote: "Les modaux expriment la possibilité, l'obligation, le conseil. Un commandant doit les maîtriser !",
      rule: "Modaux : CAN (capacité/permission), MUST (obligation), SHOULD (conseil), MAY (permission formelle), MIGHT (possibilité). Après un modal : toujours V-base (jamais -s, -ing, -ed).",
      sections: [
        {
          icon: '💪', title: "CAN et MUST", color: '#4a5c3f',
          content: "<strong>CAN</strong> = pouvoir (capacité) / pouvoir (permission informelle). <strong>MUST</strong> = devoir (obligation forte).",
          examples: [
            "I can swim. / She can speak French. / Can you help me?",
            "Can I open the window? (permission informelle)",
            "You must study hard. = Tu dois travailler dur. (OBLIGATION forte)",
            "You must not (mustn't) run here. = Tu ne dois pas courir ici. (interdiction)",
            "Après CAN/MUST : TOUJOURS V-base → He can swim (pas swims !)"
          ]
        },
        {
          icon: '💡', title: "SHOULD, MAY, MIGHT", color: '#8b6914',
          content: "<strong>SHOULD</strong> = devoir (conseil, recommandation douce). <strong>MAY/MIGHT</strong> = peut-être (probabilité).",
          examples: [
            "You should eat vegetables. = Tu DEVRAIS manger des légumes. (conseil, pas obligation)",
            "You shouldn't stay up late. = Tu ne devrais pas te coucher tard.",
            "SHOULD ≠ MUST : should = je te conseille / must = c'est obligatoire",
            "May I come in? = Puis-je entrer ? (permission formelle)",
            "It may rain today. = Il se peut qu'il pleuve. (possibilité ~50%)",
            "It might snow. = Il se pourrait qu'il neige. (possibilité ~30%)"
          ]
        }
      ],
      heroTip: "Erwin dit : \"Règle d'or des modaux : JAMAIS de -s, -ing ou -ed après ! He can SWIM · She must GO · They should EAT · SHOULD = conseil doux / MUST = obligation forte !\"",
      // ✅ CORRECTION v1.1 — Mineurs améliorés :
      // Q1 : reformulé pour distinguer SHOULD (conseil) vs MUST (obligation) — l'élève comprend la nuance
      // Q2 : rappel explicite de la règle modal + V-BASE dans la question elle-même
      warmup: [
        { q: "CONSEIL (tu devrais) vs OBLIGATION (tu dois) : Tu veux donner un CONSEIL, pas une obligation — You ___ eat more vegetables.", a: "should", o: ["must", "should", "might", "can"] },
        { q: "Règle des modaux : modal + V-BASE (jamais -s ni -ing) ! Laquelle EST correcte ?", a: "He can swim.", o: ["He can swims.", "He can swimming.", "He can swim.", "He cans swim."] }
      ]
    },

    '3_5': {
      heroName: 'Connie Springer',
      heroQuote: "Les comparatifs ! Mon cheval est PLUS rapide que le tien ! Plus grand, plus fort, meilleur !",
      rule: "Comparatifs d'infériorité/supériorité/égalité. Court (<3 syl) : adj+er (taller). Long (≥3 syl) : more + adj (more beautiful). Irrég : good→better, bad→worse, far→farther.",
      sections: [
        {
          icon: '📊', title: "Comparatif de supériorité", color: '#4a5c3f',
          content: "Adjectifs courts (1-2 syllabes) : adj + <strong>-er + than</strong>. Adjectifs longs (3 syllabes+) : <strong>more</strong> + adj + <strong>than</strong>.",
          examples: [
            "tall → taller than : Eren is taller than Armin.",
            "big → bigger than (double finale) : This titan is bigger than that one.",
            "happy → happier than (y→ier) : She is happier than before.",
            "beautiful → more beautiful than : This view is more beautiful than the last.",
            "intelligent → more intelligent than · expensive → more expensive than"
          ]
        },
        {
          icon: '⚖️', title: "Égalité, infériorité, irréguliers", color: '#8b6914',
          content: "Comparatif d'<strong>égalité</strong> : as + adj + as. D'<strong>infériorité</strong> : less + adj + than. <strong>Irréguliers</strong> à mémoriser.",
          examples: [
            "Égalité : He is as tall as me. / It's as cold as yesterday.",
            "Infériorité : This is less difficult than that. (moins difficile)",
            "good → better than (meilleur que)",
            "bad → worse than (pire que)",
            "far → farther/further than (plus loin que)"
          ]
        }
      ],
      heroTip: "Connie dit : \"Court → -er · Long → more. Mais good→better, bad→worse : pas de règle ! Et double la consonne finale : big→bigg-er · hot→hott-er !\"",
      warmup: [
        { q: "Forme le comparatif : tall (grand)", a: "taller", o: ["more tall", "taller", "tallier", "taller than"] },
        { q: "Forme le comparatif : beautiful (beau)", a: "more beautiful", o: ["beautifuler", "more beautiful", "beautifuller", "beautifulier"] }
      ]
    },

    '3_6': {
      heroName: 'Sasha Blouse',
      heroQuote: "Past ou Present Continuous ? C'est comme choisir entre du pain et de la viande : les deux ont leur moment !",
      rule: "Past Simple vs Present Continuous. Past : action terminée (yesterday, ago, in 2020). Present Continuous : action en cours (now, right now, at the moment). Was/were + V-ing = Past Continuous.",
      sections: [
        {
          icon: '🔀', title: "Past Simple vs Present Continuous", color: '#4a5c3f',
          content: "Distinguer le <strong>Past Simple</strong> (passé révolu) du <strong>Present Continuous</strong> (présent en cours).",
          examples: [
            "Yesterday, I ate an apple. (Past Simple — c'est fini)",
            "Right now, I am eating an apple. (Present Continuous — en cours)",
            "She played tennis last week. / She is playing tennis now.",
            "They went to school. / They are going to school.",
            "Marqueurs Past : yesterday, last night, ago, in 2010, when..."
          ]
        },
        {
          icon: '🔙', title: "Past Continuous : was/were + V-ing", color: '#8b6914',
          content: "Le <strong>Past Continuous</strong> = was/were + V-ing. Action en cours dans le passé, souvent interrompue.",
          examples: [
            "I was eating when you called. = Je mangeais quand tu as appelé.",
            "She was sleeping at 8pm. = Elle dormait à 20h.",
            "They were running when it started to rain.",
            "While I was studying, my phone rang.",
            "Forme : was (I/he/she/it) + -ing / were (you/we/they) + -ing"
          ]
        }
      ],
      heroTip: "Sasha dit : \"While + Past Continuous = action en cours, THEN + Past Simple = interruption. While I was eating, the bell rang !\"",
      warmup: [
        { q: "Choisis le bon temps : Yesterday, I ___ to the cinema.", a: "went", o: ["am going", "go", "went", "was going"] },
        { q: "Choisis le bon temps : She ___ TV when I arrived.", a: "was watching", o: ["watched", "watches", "is watching", "was watching"] }
      ]
    },

    '3_7': {
      heroName: 'Armin Arlert',
      heroQuote: "Les questions au passé permettent de reconstituer l'histoire ! Who? What? When? Where? Why?",
      rule: "Questions au Past Simple : Did + sujet + V-base ? WH- + did + sujet + V-base ? Questions avec BE : Was/Were + sujet ? Questions avec Past Continuous : Was/Were + sujet + V-ing ?",
      sections: [
        {
          icon: '❓', title: "Questions au Past Simple", color: '#4a5c3f',
          content: "Pour les <strong>questions au passé</strong>, on utilise l'auxiliaire <strong>did</strong>.",
          examples: [
            "Did you go to school? — Yes, I did. / No, I didn't.",
            "Did she eat breakfast? — Yes, she did.",
            "Where did they go? / What did you do yesterday?",
            "When did he arrive? / Why did she leave?",
            "Questions avec BE : Was he happy? / Were they there?"
          ]
        },
        {
          icon: '🔍', title: "Questions avancées au passé", color: '#8b6914',
          content: "Questions sur le <strong>sujet</strong> (who/what comme sujet) et questions indirectes.",
          examples: [
            "Who ate my food? (who = sujet → PAS de did !)",
            "What happened? (what = sujet → PAS de did !)",
            "Who did you see? (who = objet → did !) ",
            "Was she crying? / Were they watching TV?",
            "How long did it take? / How many titans appeared?"
          ]
        }
      ],
      heroTip: "Armin dit : \"Piège : 'Who ATE my sandwich?' (who=sujet → pas did) VS 'Who did you SEE?' (who=objet → did). La position du 'qui' change tout !\"",
      warmup: [
        { q: "Forme la question : She went to Paris.", a: "Did she go to Paris?", o: ["Did she went to Paris?", "Did she go to Paris?", "Was she go to Paris?", "Did she goes to Paris?"] },
        { q: "Choisis la bonne question : ___ happened? (qui=sujet)", a: "What", o: ["What did", "What", "Did what", "What does"] }
      ]
    },

    '3_8': {
      heroName: 'Mikasa Ackerman',
      heroQuote: "Révisions de 5ème : Present Simple, Past Simple, Continuous, modaux, comparatifs. Tout en un !",
      rule: "Révisions niveau 5ème. Present Simple (habitudes), Past Simple (passé révolu), Present Continuous (action en cours), Past Continuous (action en cours dans le passé), modaux (can/must/should), comparatifs.",
      sections: [
        {
          icon: '📚', title: "Synthèse des temps étudiés", color: '#4a5c3f',
          content: "Récapitulatif des <strong>4 temps</strong> et structures du niveau 5ème.",
          examples: [
            "Present Simple : She speaks English. (habitude, fait)",
            "Present Continuous : She is speaking now. (en cours)",
            "Past Simple : She spoke English yesterday. (terminé)",
            "Past Continuous : She was speaking when I arrived.",
            "Modal : She can speak / must speak / should speak."
          ]
        },
        {
          icon: '🎯', title: "Points clés à ne pas oublier", color: '#8b6914',
          content: "Les <strong>pièges</strong> et <strong>points clés</strong> à maîtriser pour les évaluations.",
          examples: [
            "He/She/It → +s au Present Simple (he speak<strong>s</strong>)",
            "Irréguliers : go→went, see→saw, have→had, make→made, take→took",
            "Après did/didn't : V-base ! (She didn't go, pas went !)",
            "Modaux + V-base : He can swim (pas swims)",
            "Comparatifs : -er (court) / more (long) / better, worse (irrég.)"
          ]
        }
      ],
      heroTip: "Mikasa dit : \"Récapitulatif clé : PRÉSENT simple → habitude / PRÉSENT continuous → maintenant / PASSÉ simple → terminé / PASSÉ continuous → en cours dans passé.\"",
      warmup: [
        { q: "Quel temps ? 'She was running when it started to rain.'", a: "Past Continuous + Past Simple", o: ["Present Simple", "Past Continuous + Past Simple", "Present Continuous", "Past Simple only"] },
        { q: "Quelle forme est correcte avec 'must' ?", a: "He must go", o: ["He must goes", "He must going", "He must go", "He musts go"] }
      ]
    },

    // ══════════════════════════════════════════════════════════
    // NIVEAU 4 — 4ème : Grammaire avancée
    // ══════════════════════════════════════════════════════════

    '4_1': {
      heroName: 'Historia Reiss',
      heroQuote: "Le Present Perfect relie le passé et le présent. J'ai vécu tant de choses qui façonnent qui je suis !",
      rule: "Present Perfect : HAVE/HAS + participe passé. Usage : expérience de vie, action passée avec effet présent. Marqueurs : ever, never, already, yet, just. Formation : have/has + pp irréguliers (been, seen, done, gone...).",
      sections: [
        {
          icon: '🔗', title: "Formation du Present Perfect", color: '#4a5c3f',
          content: "Le <strong>Present Perfect</strong> = have/has + <strong>participe passé</strong>. Il relie une action passée au présent.",
          examples: [
            "I have visited London. / She has eaten sushi.",
            "They have never seen a titan. / He has already left.",
            "Have you ever been to Japan? — Yes, I have. / No, I haven't.",
            "I haven't finished yet. / She has just arrived.",
            "Participes irrég : gone · seen · eaten · written · spoken · taken"
          ]
        },
        {
          icon: '🔑', title: "Marqueurs clés : ever, never, already, yet, just", color: '#8b6914',
          content: "Les <strong>marqueurs</strong> du Present Perfect changent le sens de la phrase.",
          examples: [
            "EVER = jamais (questions) : Have you EVER tried sushi?",
            "NEVER = jamais (négatif) : I have NEVER been to the USA.",
            "ALREADY = déjà (affirmatif) : She has ALREADY done it.",
            "YET = encore/déjà (négatif/question) : I haven't done it YET. / Have you done it YET?",
            "JUST = venir de : He has JUST arrived. (il vient d'arriver)"
          ]
        }
      ],
      heroTip: "Historia dit : \"EVER dans les questions · NEVER dans les négatifs · ALREADY = déjà (avant la date prévue) · YET = encore pas fait · JUST = vient de se passer !\"",
      // ✅ CORRECTION v1.1 — warmup Q2 : supprimé la question sur SINCE/FOR
      // SINCE/FOR appartient au chapitre 4_2 (PP vs PS). Remplacé par une question
      // sur les marqueurs EVER/ALREADY/YET — cohérent avec la leçon 4_1.
      warmup: [
        { q: "Complète : I ___ never ___ to Australia. (Present Perfect)", a: "have / been", o: ["have / went", "have / been", "has / been", "did / go"] },
        { q: "Complète : Have you ___ visited London ? (expérience de vie)", a: "ever", o: ["ever", "just", "since", "for"] }
      ]
    },

    '4_2': {
      heroName: 'Levi Ackerman',
      heroQuote: "Present Perfect ou Past Simple ? Je n'ai pas le temps pour les erreurs. Distingue-les précisément !",
      rule: "Present Perfect : lien avec le présent, pas de moment précis. Past Simple : action terminée à un moment précis (yesterday, in 2020, last week). SINCE = depuis quand (point). FOR = depuis combien de temps (durée).",
      sections: [
        {
          icon: '🔀', title: "Present Perfect vs Past Simple", color: '#4a5c3f',
          content: "Distinguer les deux temps selon le <strong>contexte temporel</strong>.",
          examples: [
            "I have seen this film. (expérience — pas de date précise)",
            "I saw this film yesterday. (date précise → Past Simple !)",
            "She has lost her keys. (résultat présent : elle les a toujours pas)",
            "She lost her keys this morning. (ce matin = passé précis OK)",
            "Have you eaten? vs Did you eat at the restaurant last night?"
          ]
        },
        {
          icon: '⏳', title: "SINCE vs FOR — la règle essentielle", color: '#8b6914',
          content: "<strong>SINCE</strong> + point de départ (date/moment). <strong>FOR</strong> + durée (combien de temps).",
          examples: [
            "I have lived here FOR 5 years. (for + durée)",
            "I have lived here SINCE 2019. (since + point de départ)",
            "FOR 3 years / FOR two months / FOR a long time (durée)",
            "SINCE 2020 / SINCE Monday / SINCE I was young (moment précis)",
            "✗ I have seen him yesterday → ✓ I saw him yesterday. (date précise = PS)"
          ]
        }
      ],
      heroTip: "Levi dit : \"Règle ultime : yesterday/last week/in 2020 → Past Simple. Ever/never/already/yet/since/for → Present Perfect. La date précise = PS !\"",
      warmup: [
        { q: "Quel temps ? 'I ___ Tokyo last year.'", a: "visited (Past Simple)", o: ["have visited (PP)", "visited (Past Simple)", "visit (Present Simple)", "am visiting (Continuous)"] },
        { q: "Quel temps ? 'Have you ___ sushi?'", a: "ever eaten (Present Perfect)", o: ["ever eaten (Present Perfect)", "ever ate (Past Simple)", "ever eat (Present Simple)", "ever eating (Continuous)"] }
      ]
    },

    '4_3': {
      heroName: 'Hange Zoë',
      heroQuote: "Le futur avec WILL ! Une prédiction, une décision spontanée, une promesse — will est parfait !",
      rule: "WILL + V-base : prédictions, décisions spontanées, promesses, offres. Forme : will (I'll, he'll...) / won't (will not). Question : Will + sujet + V-base ?",
      sections: [
        {
          icon: '🔮', title: "Formation et usages de WILL", color: '#4a5c3f',
          content: "<strong>Will</strong> + V-base pour le futur. Usage principal : prédictions et décisions spontanées.",
          examples: [
            "Prédiction : It will rain tomorrow. / Titans will attack.",
            "Décision spontanée : — I'm hungry. — I'll make you a sandwich! (décidé maintenant)",
            "Promesse : I will always protect you. / I won't tell anyone.",
            "Offre : Shall I help you? / I'll carry that for you.",
            "Contractions : I'll · he'll · she'll · we'll · they'll / won't = will not"
          ]
        },
        {
          icon: '❓', title: "Négation et questions avec WILL", color: '#8b6914',
          content: "Formes <strong>négative</strong> et <strong>interrogative</strong> avec will.",
          examples: [
            "Négatif : I won't go. / She won't eat. / They won't come.",
            "Question : Will you help me? — Yes, I will. / No, I won't.",
            "Will he come to the party? / Will it be sunny?",
            "WH- : What will you do? / Where will they go? / When will it start?",
            "Shall I/we...? = offre formelle (Shall I open the window?)"
          ]
        }
      ],
      heroTip: "Hange dit : \"WILL = décision au moment où on parle ou prédiction. GOING TO = plan déjà décidé ou évidence physique. The phone is ringing → I'll answer (spontané) !\"",
      warmup: [
        { q: "Complète avec WILL : I ___ call you tomorrow. (promesse)", a: "will", o: ["am going to", "will", "would", "shall"] },
        { q: "Forme la négation : She will come.", a: "She won't come.", o: ["She will not comes.", "She won't come.", "She willn't come.", "She don't will come."] }
      ]
    },

    '4_4': {
      heroName: 'Erwin Smith',
      heroQuote: "Going to, c'est pour les plans stratégiques déjà décidés. Une attaque qui se prépare, un futur certain !",
      rule: "BE + GOING TO + V-base : plan décidé, intention, évidence visible. Diffère de WILL (spontané/prédiction sans preuve). Forme : am/is/are + going to + V.",
      sections: [
        {
          icon: '📅', title: "BE GOING TO — plans et intentions", color: '#4a5c3f',
          content: "<strong>BE going to</strong> + V exprime un <strong>plan déjà décidé</strong> ou une <strong>intention</strong>.",
          examples: [
            "I am going to study medicine. (plan décidé avant)",
            "She is going to visit her grandparents this weekend.",
            "We are going to buy a new car. (intention = plan)",
            "Négatif : I'm not going to give up. / She isn't going to come.",
            "Question : Are you going to study? / Is he going to leave?"
          ]
        },
        {
          icon: '🌩️', title: "Évidence + Will vs Going To", color: '#8b6914',
          content: "<strong>Going to</strong> pour l'évidence visible. Comparatif avec <strong>will</strong>.",
          examples: [
            "Look at those clouds! It's going to rain. (évidence visible)",
            "Be careful! You're going to fall! (évidence visible)",
            "WILL : spontané/promesse → Phone rings: I'll answer it!",
            "GOING TO : plan → I'm going to call her at 8 (décidé avant)",
            "Present Continuous aussi pour futur proche : I'm leaving at 6."
          ]
        }
      ],
      heroTip: "Erwin dit : \"Distinguer : WILL = décision maintenant ou prédiction sans preuve / GOING TO = plan déjà fait ou évidence concrète. Look at the sky — it's going to rain !\"",
      warmup: [
        { q: "Quel futur ? 'I have decided: I ___ study English.' (plan décidé)", a: "am going to", o: ["will", "am going to", "would", "shall"] },
        { q: "Forme correcte : She (go) to Paris next week. (plan)", a: "She is going to go to Paris next week.", o: ["She will goes to Paris next week.", "She is going to go to Paris next week.", "She going to go to Paris next week.", "She go to Paris next week."] }
      ]
    },

    '4_5': {
      heroName: 'Eren Jäger',
      heroQuote: "Comparatifs ET superlatifs ! Le plus fort, le plus grand, le meilleur — c'est moi ! Enfin, en grammaire...",
      rule: "Superlatifs : THE + adj+est (court) / THE most + adj (long). Irréguliers : good→best, bad→worst, far→farthest. Comparatif + and + comparatif = de plus en plus. The + comparatif, the + comparatif = plus...plus...",
      sections: [
        {
          icon: '🏆', title: "Superlatifs", color: '#4a5c3f',
          content: "Le <strong>superlatif</strong> exprime le maximum ou minimum dans un groupe. Toujours précédé de <strong>THE</strong>.",
          examples: [
            "Adjectif court : tall → the tallest · big → the biggest",
            "Adjectif long : interesting → the most interesting",
            "good → the best · bad → the worst · far → the farthest",
            "Levi is the best soldier. / This is the most difficult question.",
            "Mount Everest is the highest mountain in the world."
          ]
        },
        {
          icon: '📈', title: "Structures avancées de comparaison", color: '#8b6914',
          content: "Structures <strong>avancées</strong> avec les comparatifs et superlatifs.",
          examples: [
            "Comparatif + and + comparatif : It's getting colder and colder.",
            "The + comp, the + comp : The harder you work, the better you get.",
            "not as...as : She is not as tall as him. (inégalité)",
            "much/a lot + comparatif : He's much taller than me. (renforcement)",
            "a bit/slightly : This is a bit easier than that. (petite différence)"
          ]
        }
      ],
      heroTip: "Eren dit : \"Superlatif = THE + -est OU THE most. Piège : adj en -y → happiest (pas happyest !). Good→best, bad→worst : irréguliers obligatoires !\"",
      warmup: [
        { q: "Forme le superlatif : cold (froid)", a: "the coldest", o: ["the most cold", "the coldest", "the coldestest", "coldest"] },
        { q: "Complète : This is ___ film I've ever seen! (good)", a: "the best", o: ["the goodest", "the most good", "the better", "the best"] }
      ]
    },

    '4_6': {
      heroName: 'Historia Reiss',
      heroQuote: "Les question tags, c'est comme chercher une confirmation. You understand me, don't you?",
      rule: "Question tags : phrase affirmative + tag négatif / phrase négative + tag positif. Règle : auxiliaire de la phrase principale, pronom sujet. Ex : She is French, isn't she? / They don't know, do they?",
      sections: [
        {
          icon: '🏷️', title: "Formation des question tags", color: '#4a5c3f',
          content: "Les <strong>question tags</strong> sont de petites questions ajoutées en fin de phrase pour confirmer.",
          examples: [
            "She is French, isn't she? = Elle est française, n'est-ce pas ?",
            "You like pizza, don't you? / He plays football, doesn't he?",
            "They went home, didn't they? / It was cold, wasn't it?",
            "You can swim, can't you? / She will come, won't she?",
            "Phrase négative + tag positif : She isn't happy, is she?"
          ]
        },
        {
          icon: '⚖️', title: "Règles et cas particuliers", color: '#8b6914',
          content: "<strong>Règles</strong> des question tags et cas <strong>particuliers</strong>.",
          examples: [
            "I am right, aren't I? (I am → aren't I = exception !)",
            "Let's go, shall we? (suggestion)",
            "Don't do that, will you? (impératif → will you?)",
            "He's never been there, has he? (never=négatif → tag positif)",
            "Nothing happened, did it? (nothing=négatif → tag positif)"
          ]
        }
      ],
      heroTip: "Historia dit : \"Règle simple : phrase positive → tag NÉGATIF. Phrase négative → tag POSITIF. Et reprendre l'auxiliaire de la phrase principale, TOUJOURS !\"",
      warmup: [
        { q: "Complète : You speak English, ___ you?", a: "don't", o: ["do", "don't", "didn't", "aren't"] },
        { q: "Complète : She wasn't happy, ___ she?", a: "was", o: ["wasn't", "was", "is", "isn't"] }
      ]
    },

    '4_7': {
      heroName: 'Jean Kirstein',
      heroQuote: "La voix passive ! On ne sait pas qui a attaqué le mur... Le mur a été attaqué. C'est le passif !",
      rule: "Voix passive : BE + participe passé. Actif : 'Someone attacked the wall.' → Passif : 'The wall was attacked (by someone).' Usage : quand l'agent est inconnu, non important ou évident.",
      sections: [
        {
          icon: '🔄', title: "Formation de la voix passive", color: '#4a5c3f',
          content: "La <strong>voix passive</strong> = sujet reçoit l'action. Formation : <strong>BE + participe passé</strong> (+ by... si nécessaire).",
          examples: [
            "Actif : The titan breaks the wall.",
            "Passif : The wall is broken by the titan.",
            "Present : The book is written by Armin.",
            "Past : The book was written by Armin.",
            "Future : The book will be written. / PP : The book has been written."
          ]
        },
        {
          icon: '🎯', title: "Usages et transformations", color: '#8b6914',
          content: "<strong>Quand</strong> utiliser le passif ? Transformations actif → passif.",
          examples: [
            "Agent inconnu : Windows were broken. (on ne sait pas qui)",
            "Agent sans importance : French is spoken in France.",
            "Sujet important : The president was elected. (pas 'people elected him')",
            "Actif → Passif : C.O.D. → sujet · V-actif → be+pp · Sujet → (by + agent)",
            "Mistakes were made. / Mistakes have been made. / Mistakes will be made."
          ]
        }
      ],
      heroTip: "Jean dit : \"Transforme : Actif = 'Levi trained the soldiers' → Passif = 'The soldiers WERE TRAINED by Levi.' COD devient sujet !\"",
      warmup: [
        { q: "Mets à la voix passive : 'They speak English here.'", a: "English is spoken here.", o: ["English speaks here.", "English is spoken here.", "English was spoken here.", "English is speaking here."] },
        { q: "Complète : The cake ___ baked by Sasha yesterday.", a: "was", o: ["is", "were", "was", "has been"] }
      ]
    },

    '4_8': {
      heroName: 'Connie Springer',
      heroQuote: "Grande révision de 4ème ! Present Perfect, Will, Going To, comparatifs, passif — on récapitule tout !",
      rule: "Révision niveau 4ème : Present Perfect (have/has+pp), Will (spontané/promesse), Going to (plan/intention), comparatifs/superlatifs avancés, question tags, voix passive.",
      sections: [
        {
          icon: '📚', title: "Synthèse niveau 4ème", color: '#4a5c3f',
          content: "Récapitulatif des <strong>structures avancées</strong> du niveau 4ème.",
          examples: [
            "Present Perfect : I have already done it. / She hasn't arrived yet.",
            "Will : I'll help you! (spontané) / It will snow. (prédiction)",
            "Going to : I'm going to study. (plan) / It's going to rain. (évidence)",
            "Superlatif : the most difficult / the best / the worst",
            "Passif : The wall was destroyed. / English is spoken worldwide."
          ]
        },
        {
          icon: '🎯', title: "Distinctions et pièges finaux", color: '#8b6914',
          content: "<strong>Distinctions clés</strong> et pièges des évaluations de 4ème.",
          examples: [
            "PP vs PS : Have you ever? (PP) vs Did you go yesterday? (PS)",
            "Will vs Going to : spontané vs plan pré-décidé",
            "since (point) vs for (durée) : since 2020 / for 3 years",
            "Question tag : positive → tag négatif / négative → tag positif",
            "Passif : COD actif → sujet passif / BE + pp / by + agent"
          ]
        }
      ],
      heroTip: "Connie dit : \"Mémo final : PP = have+been/gone/seen... | Will = décision/promesse | Going to = plan/preuve | Superlatif = THE+est/THE most | Passif = be+pp !\"",
      warmup: [
        { q: "Quel futur ? La météo annonce de la pluie, tu vois des nuages noirs : 'It ___ rain.'", a: "is going to", o: ["will", "is going to", "has", "does"] },
        { q: "Question tag : He has been there, ___ he?", a: "hasn't", o: ["has", "hasn't", "didn't", "wasn't"] }
      ]
    }

  }
};

console.info('⚔️ lesson-data-english.js v1.1 chargé — 32 leçons · corrections warmup 3_1/3_4/4_1 appliquées');
