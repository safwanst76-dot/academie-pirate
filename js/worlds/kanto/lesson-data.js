// ═══════════════════════════════════════════════════════════════════
// LESSON-DATA.JS — ⚔️ Kanto — Sciences / Demon Slayer
// Données pédagogiques : règles, exemples, questions échauffement
// Moteur : js/lesson.js (ne pas modifier ici)
// Règle A3 : les données sont séparées du moteur
// ═══════════════════════════════════════════════════════════════════

// Enregistrement dans le registry global
window.LESSON_REGISTRY = window.LESSON_REGISTRY || {};

window.LESSON_REGISTRY['kanto'] = {
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
  };

console.info('⚔️ lesson-data kanto chargé — 8 îles');
