// ═══════════════════════════════════════
// QUIZ.JS — Académie Pirate
// Données questions + moteur quiz complet
// ═══════════════════════════════════════

const ISLANDS = {
  1:{
    name:"ÎLE DE LUFFY",charName:"Luffy",color:"#e63946",
    msgs:["Gum Gum Pistol ! Réponds vite !","Je vais être Roi des Pirates !","On avance moussaillon !","Vas-y ! Je te fais confiance !","Même Shanks serait fier !"],
    qs:[
      {q:"J'ai mang__ une pomme du diable.",o:["er","é"],a:"é",exp:"Après 'avoir' (j'ai) → participe passé en -é"},
      {q:"Je vais cherch__ le One Piece !",o:["er","é"],a:"er",exp:"Après 'vais' (verbe de mode) → infinitif en -er"},
      {q:"Tu dois termin__ ta mission.",o:["er","é"],a:"er",exp:"Après 'dois' → infinitif en -er"},
      {q:"Nous avons regard__ la carte.",o:["er","é"],a:"é",exp:"Passé composé avec avoir → participe passé en -é"},
      {q:"J'ai oubli__ mon chapeau de paille.",o:["er","é"],a:"é",exp:"'ai oublié' : participe passé, jamais accordé avec avoir"},
      {q:"Il faut trouv__ le trésor !",o:["er","é"],a:"er",exp:"Après 'faut' → infinitif en -er"},
      {q:"Ils ont combatt__ vaillamment.",o:["er","u"],a:"u",exp:"'Combattre' → participe passé = 'combattu' (verbe en -re)"},
      {q:"Nous allons navigu__ vers le sud.",o:["er","é"],a:"er",exp:"Après 'allons' → infinitif en -er"},
      {q:"Luffy a décid__ de partir.",o:["er","é"],a:"é",exp:"'a décidé' : participe passé avec avoir → -é"},
      {q:"Peux-tu vérifi__ cette route ?",o:["er","é"],a:"er",exp:"Après 'peux' → infinitif en -er"},
      {q:"⚔️ BOSS — Arlong frappe ! Choisis la bonne forme !<br><em>\"Luffy a ____ nager jusqu'à l'île.\"</em>",o:["réussir","réussi","réussit"],a:"réussi",exp:"Avec AVOIR → participe passé : réussi. 'a réussi' = passé composé.",isBoss:true,bossName:"Arlong",bossImg:""}
    ]
  },
  2:{
    name:"ÎLE DE NAMI",charName:"Nami",color:"#f97316",
    msgs:["Surveille tes accords !","Carte ou pas, il faut s'accorder !","L'argent et la grammaire, ça compte !","Tu progresses moussaillon !","Presque ! Encore un effort !"],
    qs:[
      {q:"Marie est arriv__ au port.",o:["é","ée"],a:"ée",exp:"Être + féminin singulier → on ajoute -e : -ée"},
      {q:"Paul a cass__ son épée.",o:["é","ée"],a:"é",exp:"Avoir → le participe ne s'accorde PAS avec le sujet"},
      {q:"Les garçons ont mang__.",o:["é","és"],a:"é",exp:"Avoir → invariable → -é (jamais accordé avec le sujet)"},
      {q:"Les enfants sont arriv__.",o:["és","é"],a:"és",exp:"Être + masculin pluriel → -és"},
      {q:"Les filles sont tomb__.",o:["ées","é"],a:"ées",exp:"Être + féminin pluriel → -ées"},
      {q:"La navigatrice est part__.",o:["ie","i"],a:"ie",exp:"Être + féminin : 'parti' → 'partie'"},
      {q:"Nous sommes all__ à l'aventure.",o:["és","é"],a:"és",exp:"Être + nous (masculin/mixte pluriel) → -és"},
      {q:"Elles sont retourn__ au navire.",o:["ées","és"],a:"ées",exp:"Être + féminin pluriel → -ées"},
      {q:"Le pirate a trouv__ un trésor.",o:["é","és"],a:"é",exp:"Avoir → invariable → -é"},
      {q:"La capitaine est ven__ nous aider.",o:["ue","u"],a:"ue",exp:"Être + féminin : 'venu' → 'venue'"},
      {q:"⚔️ BOSS — Don Krieg attaque ! Laquelle est correcte ?<br><em>\"Nami est ____ sur le Merry.\"</em>",o:["monté","montée","montés"],a:"montée",exp:"Avec ÊTRE, le participe s'accorde : Nami est féminin singulier → montée.",isBoss:true,bossName:"Don Krieg",bossImg:""}
    ]
  },
  3:{
    name:"ÎLE DE ZORO",charName:"Zoro",color:"#22c55e",
    msgs:["Je ne me perdrai pas !","Rien ne peut m'arrêter !","Style des Trois Sabres !","Entraîne-toi encore !","Tu es sur la bonne voie !"],
    qs:[
      {q:"Les femmes sont entr__ dans la salle.",o:["ées","és"],a:"ées",exp:"Être + féminin pluriel → -ées"},
      {q:"Les pirates sont tomb__ à l'eau.",o:["és","é"],a:"és",exp:"Être + masculin pluriel → -és"},
      {q:"Nami est arriv__ en retard.",o:["é","ée"],a:"ée",exp:"Être + féminin singulier → -ée"},
      {q:"Les marins sont part__ en mer.",o:["is","i"],a:"is",exp:"'Partir' : participe passé pluriel = 'partis'"},
      {q:"La pirate est tomb__ du bateau.",o:["ée","é"],a:"ée",exp:"Être + féminin singulier → -ée"},
      {q:"Robin et Nami sont arriv__.",o:["ées","és"],a:"ées",exp:"Être + groupe 100% féminin → -ées"},
      {q:"Zoro et Luffy sont mont__ sur le pont.",o:["és","ées"],a:"és",exp:"Être + masculin ou mixte pluriel → -és"},
      {q:"La sentinelle est rest__ à bord.",o:["ée","é"],a:"ée",exp:"Être + féminin singulier : 'restée'"},
      {q:"Les équipiers sont reparti__ au combat.",o:["s",""],a:"s",exp:"'Partir' pluriel masculin → 'repartis'"},
      {q:"La navigatrice est retourn__ à la carte.",o:["ée","é"],a:"ée",exp:"Être + féminin singulier → -ée"},
      {q:"⚔️ BOSS — Mihawk défie Zoro ! Choisis !<br><em>\"Les épées se sont ____ dans l'air.\"</em>",o:["croisé","croisées","croisés"],a:"croisées",exp:"Avec ÊTRE + pronom, accord avec le sujet : épées = féminin pluriel → croisées.",isBoss:true,bossName:"Mihawk",bossImg:""}
    ]
  },
  4:{
    name:"ÎLE DE ROBIN",charName:"Robin",color:"#845ef7",
    msgs:["Je veux vivre !","Fleur Fleur !","La connaissance est une arme !","Cherche dans tes souvenirs !","La vérité est dans les textes !"],
    qs:[
      {q:"Les pirates ont trouv__ un trésor.",o:["é","és"],a:"é",exp:"Avoir → participe invariable → -é"},
      {q:"Les aventurières sont arriv__.",o:["ées","és"],a:"ées",exp:"Être + féminin pluriel → -ées"},
      {q:"Nous avons termin__ la mission.",o:["é","és"],a:"é",exp:"Avoir → invariable → -é"},
      {q:"Les garçons sont mont__ sur le pont.",o:["és","é"],a:"és",exp:"Être + masculin pluriel → -és"},
      {q:"La navigatrice est tomb__ à la mer.",o:["ée","é"],a:"ée",exp:"Être + féminin singulier → -ée"},
      {q:"Robin a lu__ tous les ponéglyphes.",o:["","s"],a:"",exp:"'Lire' → participe 'lu', avec avoir = invariable"},
      {q:"Les archéologues sont all__ fouiller.",o:["és","ées"],a:"és",exp:"Être + groupe masculin/mixte pluriel → -és"},
      {q:"Les étudiantes ont termin__ leur devoir.",o:["é","ées"],a:"é",exp:"Avoir → participe invariable avec le sujet → -é"},
      {q:"Elles sont rest__ studieuses.",o:["ées","és"],a:"ées",exp:"Être + féminin pluriel → -ées"},
      {q:"Il a fallu travaill__ dur.",o:["er","é"],a:"er",exp:"Après 'fallu' (infinitif sous-jacent) → infinitif en -er"},
      {q:"⚔️ BOSS — Crocodile surgit ! Quelle forme ?<br><em>\"Robin s'est ____ de ses ennemis.\"</em>",o:["débarrassé","débarrassée","débarrassés"],a:"débarrassée",exp:"Avec ÊTRE, accord avec Robin = féminin singulier → débarrassée.",isBoss:true,bossName:"Crocodile",bossImg:""}
    ]
  },
  5:{
    name:"ÎLE D'USOPP",charName:"Usopp",color:"#f59e0b",mode:"write",
    msgs:["J'ai 8000 hommes derrière moi !","Le brave guerrier de la mer parle !","Prépare-toi, c'est facile !","Tu peux le faire, je le jure !","Sniper King est fier de toi !"],
    qs:[
      {level:1,q:"Usopp a {v} toute la nuit. (travailler)",verb:"travailler",subject:"Usopp",aux:"avoir",genre:"m",nombre:"s",a:"travaillé",hint:"Avec AVOIR → participe passé. Travailler → travaillé",exp:"Avec <strong>avoir</strong>, le participe passé des verbes en -er se termine par <strong>-é</strong>. Travailler → travaillé."},
      {level:1,q:"Il veut {v} son tir. (améliorer)",verb:"améliorer",subject:"il",aux:"vouloir",genre:"m",nombre:"s",a:"améliorer",hint:"Après 'veut' → infinitif. Les verbes en -er gardent leur infinitif.",exp:"Après un verbe de mode comme <strong>veut, doit, peut, faut</strong> → on utilise l'<strong>infinitif en -er</strong>."},
      {level:1,q:"Les pirates ont {v} l'île. (attaquer)",verb:"attaquer",subject:"les pirates",aux:"avoir",genre:"m",nombre:"p",a:"attaqué",hint:"Avec AVOIR → participe passé en -é, invariable.",exp:"Avec <strong>avoir</strong>, le participe passé ne s'accorde JAMAIS avec le sujet. Attaquer → attaqué."},
      {level:2,q:"Usopp est {v} au combat. (partir)",verb:"partir",subject:"Usopp",aux:"être",genre:"m",nombre:"s",a:"parti",hint:"Avec ÊTRE → accord avec le sujet. Usopp est masculin singulier.",exp:"Avec <strong>être</strong>, on accorde avec le sujet. Usopp (masc. sing.) → <strong>parti</strong> (sans -e)."},
      {level:2,q:"Il faut {v} ses ennemis. (affronter)",verb:"affronter",subject:"il",aux:"falloir",genre:"m",nombre:"s",a:"affronter",hint:"Après 'faut' → infinitif en -er.",exp:"<strong>Il faut</strong> est suivi de l'<strong>infinitif</strong>. Affronter reste affronter."},
      {level:2,q:"Kaya est {v} à la fête. (venir)",verb:"venir",subject:"Kaya",aux:"être",genre:"f",nombre:"s",a:"venue",hint:"Avec ÊTRE + féminin singulier → ajouter -e. Venu → venue",exp:"Avec <strong>être</strong>, accord au <strong>féminin singulier</strong> : venu → <strong>venue</strong> (on ajoute -e)."},
      {level:2,q:"Les soldats sont {v} sur le bateau. (monter)",verb:"monter",subject:"les soldats",aux:"être",genre:"m",nombre:"p",a:"montés",hint:"Avec ÊTRE + masculin pluriel → ajouter -és. Monté → montés",exp:"Avec <strong>être</strong>, accord au <strong>masculin pluriel</strong> : monté → <strong>montés</strong> (on ajoute -s)."},
      {level:3,q:"Les guerrières sont {v} victorieuses. (rentrer)",verb:"rentrer",subject:"les guerrières",aux:"être",genre:"f",nombre:"p",a:"rentrées",hint:"Avec ÊTRE + féminin pluriel → ajouter -ées. Rentré → rentrées",exp:"Avec <strong>être</strong>, accord au <strong>féminin pluriel</strong> : rentré → <strong>rentrées</strong> (on ajoute -es)."},
      {level:3,q:"Usopp pouvait {v} n'importe qui. (tromper)",verb:"tromper",subject:"Usopp",aux:"pouvoir",genre:"m",nombre:"s",a:"tromper",hint:"Après 'pouvait' (imparfait de pouvoir) → infinitif.",exp:"Après <strong>pouvait</strong> (forme de pouvoir), on utilise l'<strong>infinitif</strong> : tromper."},
      {level:3,q:"Les deux amies sont {v} ensemble. (tomber)",verb:"tomber",subject:"les deux amies",aux:"être",genre:"f",nombre:"p",a:"tombées",hint:"Avec ÊTRE + féminin pluriel → tomber → tombées",exp:"Avec <strong>être</strong>, accord au <strong>féminin pluriel</strong> : tombé → <strong>tombées</strong>."},
      {q:"⚔️ BOSS — Perona attaque ! Laquelle est juste ?<br><em>\"Usopp a ____ son ennemi avec précision.\"</em>",a:"visé",o:["viser","visé","visée"],exp:"Après avoir, participe passé invariable avec avoir : visé.",isBoss:true,bossName:"Perona",bossImg:""}
    ]
  },
  6:{
    name:"ÎLE DE SANJI",charName:"Sanji",color:"#3b82f6",mode:"write",
    msgs:["Mesdames, je cuisine pour vous !","Jambe Diable ! Réponds !","L'amour guide ma plume !","C'est parfait, comme ma cuisine !","Allons-y, ne te décourage pas !"],
    qs:[
      {level:1,q:"Sanji a {v} un repas délicieux. (préparer)",verb:"préparer",subject:"Sanji",aux:"avoir",genre:"m",nombre:"s",a:"préparé",hint:"Avec AVOIR → participe passé. Préparer → préparé",exp:"Avec <strong>avoir</strong>, les verbes en -er font leur participe passé en <strong>-é</strong>. Préparer → préparé."},
      {level:1,q:"Il aime {v} des gâteaux. (cuisiner)",verb:"cuisiner",subject:"il",aux:"aimer",genre:"m",nombre:"s",a:"cuisiner",hint:"Après 'aime' → infinitif. Le verbe reste à l'infinitif.",exp:"Après <strong>aime</strong> (verbe de goût), on utilise l'<strong>infinitif</strong> : cuisiner."},
      {level:1,q:"Les marins ont {v} tout le repas. (dévorer)",verb:"dévorer",subject:"les marins",aux:"avoir",genre:"m",nombre:"p",a:"dévoré",hint:"Avec AVOIR → participe invariable. Dévorer → dévoré.",exp:"Avec <strong>avoir</strong>, le participe ne s'accorde pas avec le sujet. Dévorer → <strong>dévoré</strong>."},
      {level:2,q:"Sanji est {v} en cuisine. (rester)",verb:"rester",subject:"Sanji",aux:"être",genre:"m",nombre:"s",a:"resté",hint:"Avec ÊTRE + masculin singulier → pas de modification. Rester → resté.",exp:"Avec <strong>être</strong>, accord au masculin singulier : rester → <strong>resté</strong> (sans -e ni -s)."},
      {level:2,q:"Nami a voulu {v} le dessert. (goûter)",verb:"goûter",subject:"Nami",aux:"avoir+voulu",genre:"f",nombre:"s",a:"goûter",hint:"Après 'voulu' (participe passé de vouloir) → infinitif.",exp:"<strong>A voulu</strong> = passé composé de vouloir, suivi de l'<strong>infinitif</strong> : goûter."},
      {level:2,q:"Les cuisinières sont {v} épuisées. (rentrer)",verb:"rentrer",subject:"les cuisinières",aux:"être",genre:"f",nombre:"p",a:"rentrées",hint:"Avec ÊTRE + féminin pluriel → rentré → rentrées.",exp:"Avec <strong>être</strong> au féminin pluriel : rentré → <strong>rentrées</strong>."},
      {level:2,q:"La serveuse est {v} servir les clients. (venir)",verb:"venir",subject:"la serveuse",aux:"être",genre:"f",nombre:"s",a:"venue",hint:"Avec ÊTRE + féminin singulier → venu → venue.",exp:"Avec <strong>être</strong> au féminin singulier : venu → <strong>venue</strong>."},
      {level:3,q:"Sanji et Zoro sont {v} en mer. (partir)",verb:"partir",subject:"Sanji et Zoro",aux:"être",genre:"m",nombre:"p",a:"partis",hint:"Avec ÊTRE + masculin pluriel (groupe mixte) → parti → partis.",exp:"Avec <strong>être</strong>, groupe mixte ou masculin → pluriel masculin : parti → <strong>partis</strong>."},
      {level:3,q:"Il aurait fallu {v} plus tôt. (partir)",verb:"partir",subject:"il",aux:"falloir",genre:"m",nombre:"s",a:"partir",hint:"Après 'fallu' → infinitif. Partir reste partir.",exp:"<strong>Aurait fallu</strong> est suivi de l'<strong>infinitif</strong> : partir."},
      {level:3,q:"Les deux amies sont {v} au marché. (aller)",verb:"aller",subject:"les deux amies",aux:"être",genre:"f",nombre:"p",a:"allées",hint:"Avec ÊTRE + féminin pluriel → aller → allées.",exp:"Avec <strong>être</strong> au féminin pluriel : allé → <strong>allées</strong>."},
      {q:"⚔️ BOSS — Absalom surgit ! Choisis !<br><em>\"Sanji a ____ un repas parfait.\"</em>",a:"préparé",o:["préparer","préparé","préparée"],exp:"Avec avoir, pas d'accord : préparé reste invariable.",isBoss:true,bossName:"Absalom",bossImg:""}
    ]
  },
  7:{
    name:"ÎLE DE CHOPPER",charName:"Chopper",color:"#ec4899",mode:"write",
    msgs:["Je ne suis pas content d'être félicité !","Point Rumble ! Allez !","Le docteur Chopper te soigne !","Tu progresses, continue !","Bonne réponse, idiot ! (je suis content)"],
    qs:[
      {level:1,q:"Chopper a {v} ses médicaments. (préparer)",verb:"préparer",subject:"Chopper",aux:"avoir",genre:"m",nombre:"s",a:"préparé",hint:"Avec AVOIR → participe passé en -é.",exp:"Avec <strong>avoir</strong> : préparer → <strong>préparé</strong>. Le participe ne s'accorde pas."},
      {level:1,q:"Il doit {v} le malade. (soigner)",verb:"soigner",subject:"il",aux:"devoir",genre:"m",nombre:"s",a:"soigner",hint:"Après 'doit' → infinitif en -er.",exp:"Après <strong>doit</strong> (verbe de mode), on met l'<strong>infinitif</strong> : soigner."},
      {level:1,q:"Nous avons {v} toute la nuit. (marcher)",verb:"marcher",subject:"nous",aux:"avoir",genre:"m",nombre:"p",a:"marché",hint:"Avec AVOIR → participe passé invariable. Marcher → marché.",exp:"Avec <strong>avoir</strong>, participe invariable : marcher → <strong>marché</strong>."},
      {level:2,q:"Chopper est {v} sur le navire. (arriver)",verb:"arriver",subject:"Chopper",aux:"être",genre:"m",nombre:"s",a:"arrivé",hint:"Avec ÊTRE + masculin singulier → pas d'accord. Arriver → arrivé.",exp:"Avec <strong>être</strong> au masculin singulier : arriver → <strong>arrivé</strong> (sans ajout)."},
      {level:2,q:"La patiente est {v} guérie. (repartir)",verb:"repartir",subject:"la patiente",aux:"être",genre:"f",nombre:"s",a:"repartie",hint:"Avec ÊTRE + féminin singulier → repartir → repartie.",exp:"Avec <strong>être</strong> au féminin singulier : reparti → <strong>repartie</strong> (on ajoute -e)."},
      {level:2,q:"Les infirmières sont {v} à l'hôpital. (rester)",verb:"rester",subject:"les infirmières",aux:"être",genre:"f",nombre:"p",a:"restées",hint:"Avec ÊTRE + féminin pluriel → rester → restées.",exp:"Avec <strong>être</strong> au féminin pluriel : resté → <strong>restées</strong>."},
      {level:2,q:"Chopper pouvait {v} ses ennemis. (vaincre)",verb:"vaincre",subject:"Chopper",aux:"pouvoir",genre:"m",nombre:"s",a:"vaincre",hint:"Après 'pouvait' → infinitif. Vaincre reste vaincre.",exp:"Après <strong>pouvait</strong> (pouvoir à l'imparfait), on utilise l'<strong>infinitif</strong> : vaincre."},
      {level:3,q:"Les deux médecins sont {v} ensemble. (travailler)",verb:"travailler",subject:"les deux médecins",aux:"être",genre:"m",nombre:"p",a:"travaillés",hint:"Avec ÊTRE + masculin pluriel → travailler → travaillés.",exp:"Avec <strong>être</strong> au masculin pluriel : travaillé → <strong>travaillés</strong>."},
      {level:3,q:"Les malades sont {v} à temps. (arriver)",verb:"arriver",subject:"les malades",aux:"être",genre:"m",nombre:"p",a:"arrivés",hint:"Avec ÊTRE + masculin pluriel → arriver → arrivés.",exp:"Avec <strong>être</strong> au masculin pluriel : arrivé → <strong>arrivés</strong>."},
      {level:3,q:"Les deux guerrières sont {v} blessées. (tomber)",verb:"tomber",subject:"les deux guerrières",aux:"être",genre:"f",nombre:"p",a:"tombées",hint:"Avec ÊTRE + féminin pluriel → tomber → tombées.",exp:"Avec <strong>être</strong> au féminin pluriel : tombé → <strong>tombées</strong>."},
      {q:"⚔️ BOSS — Hogback défie Chopper ! Quelle réponse ?<br><em>\"Les patients se sont ____ grâce au médecin.\"</em>",a:"rétablis",o:["rétabli","rétablis","rétablies"],exp:"Se sont + rétabli : accord avec patients = masculin pluriel → rétablis.",isBoss:true,bossName:"Hogback",bossImg:""}
    ]
  },
  8:{
    name:"ÎLE DE BROOK",charName:"Brook",color:"#8b5cf6",mode:"write",
    msgs:["Yohohoho ! Une devinette ?","Puis-je voir ta culotte ?... Pardon !","Soul King Brook chante pour toi !","Yohohoho ! Presque !","Magnificent ! Comme ma musique !"],
    qs:[
      {level:1,q:"Brook a {v} une belle chanson. (composer)",verb:"composer",subject:"Brook",aux:"avoir",genre:"m",nombre:"s",a:"composé",hint:"Avec AVOIR → participe passé en -é. Composer → composé.",exp:"Avec <strong>avoir</strong> : composer → <strong>composé</strong>. Pas d'accord avec le sujet."},
      {level:1,q:"Il aime {v} sur scène. (chanter)",verb:"chanter",subject:"il",aux:"aimer",genre:"m",nombre:"s",a:"chanter",hint:"Après 'aime' → infinitif. Chanter reste chanter.",exp:"Après le verbe <strong>aime</strong>, on utilise l'<strong>infinitif</strong> : chanter."},
      {level:1,q:"Les musiciens ont {v} pendant des heures. (jouer)",verb:"jouer",subject:"les musiciens",aux:"avoir",genre:"m",nombre:"p",a:"joué",hint:"Avec AVOIR → participe invariable. Jouer → joué.",exp:"Avec <strong>avoir</strong>, le participe ne s'accorde jamais avec le sujet : jouer → <strong>joué</strong>."},
      {level:2,q:"Brook est {v} d'entre les morts. (revenir)",verb:"revenir",subject:"Brook",aux:"être",genre:"m",nombre:"s",a:"revenu",hint:"Avec ÊTRE + masculin singulier → revenir → revenu (sans ajout).",exp:"Avec <strong>être</strong> au masculin singulier : revenir → <strong>revenu</strong>."},
      {level:2,q:"La musicienne est {v} jouer. (venir)",verb:"venir",subject:"la musicienne",aux:"être",genre:"f",nombre:"s",a:"venue",hint:"Avec ÊTRE + féminin singulier → venir → venue.",exp:"Avec <strong>être</strong> au féminin singulier : venu → <strong>venue</strong>."},
      {level:2,q:"Les spectateurs sont {v} enchantés. (repartir)",verb:"repartir",subject:"les spectateurs",aux:"être",genre:"m",nombre:"p",a:"repartis",hint:"Avec ÊTRE + masculin pluriel → repartir → repartis.",exp:"Avec <strong>être</strong> au masculin pluriel : reparti → <strong>repartis</strong>."},
      {level:2,q:"Les spectatrices sont {v} dans la salle. (entrer)",verb:"entrer",subject:"les spectatrices",aux:"être",genre:"f",nombre:"p",a:"entrées",hint:"Avec ÊTRE + féminin pluriel → entrer → entrées.",exp:"Avec <strong>être</strong> au féminin pluriel : entré → <strong>entrées</strong>."},
      {level:3,q:"Brook et Nami sont {v} danser. (aller)",verb:"aller",subject:"Brook et Nami",aux:"être",genre:"m",nombre:"p",a:"allés",hint:"Groupe mixte avec ÊTRE → masculin pluriel → aller → allés.",exp:"Groupe mixte avec <strong>être</strong> → accord masculin pluriel : aller → <strong>allés</strong>."},
      {level:3,q:"Il aurait pu {v} plus fort. (chanter)",verb:"chanter",subject:"il",aux:"pouvoir",genre:"m",nombre:"s",a:"chanter",hint:"Après 'pu' (participe de pouvoir) → infinitif.",exp:"<strong>Aurait pu</strong> est suivi de l'<strong>infinitif</strong> : chanter."},
      {level:3,q:"Les deux chanteuses sont {v} applaudies. (tomber)",verb:"tomber",subject:"les deux chanteuses",aux:"être",genre:"f",nombre:"p",a:"tombées",hint:"Avec ÊTRE + féminin pluriel → tomber → tombées.",exp:"Avec <strong>être</strong> au féminin pluriel : tombé → <strong>tombées</strong>."},
      {q:"⚔️ BOSS — Ryuma surgit ! Choisis !<br><em>\"Les notes se sont ____ dans la nuit.\"</em>",a:"envolées",o:["envolé","envolés","envolées"],exp:"notes = féminin pluriel → envolées. Accord avec le sujet avec ÊTRE.",isBoss:true,bossName:"Ryuma",bossImg:""}
    ]
  }
};

// ── STATE — var pour être vraiment global (accessible depuis hud.js, save.js, etc.) ──
var xp = 0, completedIslands = {}, currentIsland = 0, streak = 0, answers = {};

// GIFs are in ui.js — do not redeclare here

// ── QUIZ CORE ──
function startIsland(n) {
  if (typeof lesson_grand_bleu === 'function') {
    lesson_grand_bleu(n, function() {
      sfxIsland();
      playBGM('isle-' + n);
      setTimeout(function() { speakCharQuote(n); }, 1200);
      playIntroScene(n, function() { _launchIsland(n); });
    });
  } else {
    sfxIsland();
    playBGM('isle-' + n);
    setTimeout(function() { speakCharQuote(n); }, 1200);
    playIntroScene(n, function() { _launchIsland(n); });
  }
}
function _launchIsland(n) {
  setTimeout(() => speakChar(n, 'intro'), 400);
  currentIsland = n; answers = {};
  const isle = ISLANDS[n];
  const isWrite = isle.mode === 'write';
  document.getElementById('map-sec').style.display = 'none';
  const qs = document.getElementById('quiz-sec'); qs.style.display = 'block';
  document.getElementById('qTitle').textContent = isle.name;
  document.getElementById('qProgFill').style.width = '0%';
  document.getElementById('qProgLbl').textContent = '0 / ' + isle.qs.length;
  window.scrollTo(0, 0);

  let levelTrackHtml = '';
  if (isWrite) {
    const steps = [{lv:1,label:'⭐ Niveau 1'},{lv:2,label:'⭐⭐ Niveau 2'},{lv:3,label:'⭐⭐⭐ Niveau 3'}];
    levelTrackHtml = '<div class="level-track">' + steps.map(s => `<div class="level-step" id="lvstep${n}_${s.lv}">${s.label}</div>`).join('<span style="color:#1f2937;font-size:.7rem">›</span>') + '</div>';
  }

  const keys = ['A','B','C','D','E'];
  let html = levelTrackHtml;
  isle.qs.forEach((e, i) => {
    const msg = isle.msgs[i % isle.msgs.length];
    const charImg = charImages[n] || FALLBACK[n];
    const levelBadge = isWrite ? `<span class="level-badge lv${e.level}">Niv.${e.level}</span>` : '';
    html += isWrite ? buildWriteBody(e, i, charImg, msg, isle, levelBadge) : buildMCQBody(e, i, charImg, msg, isle, keys);
  });
  html += `<div class="submit-wrap"><button class="btn btn-gold" onclick="corriger(${n})">⚓ CORRIGER MES RÉPONSES</button></div>`;
  document.getElementById('qContainer').innerHTML = html;
  updateStreakDots();
  if (isWrite) updateLevelSteps(n);
}

function buildMCQBody(e, i, charImg, msg, isle, keys) {
  const n = currentIsland;
  const bossBanner = e.isBoss ? `<div class="boss-banner">
      <img class="boss-banner-img" src="${e.bossImg||''}" alt="${e.bossName||'BOSS'}" onerror="this.style.display='none'">
      <div class="boss-banner-text">
        <div class="boss-banner-label">⚔️ COMBAT FINAL</div>
        <div class="boss-banner-name">${e.bossName||'BOSS'}</div>
        <div class="boss-banner-hp"><div class="boss-hp-bar"><div class="boss-hp-fill"></div></div>
          <div class="boss-hp-lbl">HP: ██████████ 100%</div></div>
      </div></div>` : '';
  return `
  <div class="q-card${e.isBoss?' boss-question':''}" id="card${i}">
  ${bossBanner}
    <div class="streak-bar" id="streakBar${i}">
      🔥 Série : <div class="streak-dots" id="streakDots${i}">
        ${[0,1,2,3,4].map(j=>`<div class="streak-dot" id="sd${i}_${j}"></div>`).join('')}
      </div>
    </div>
    <div class="char-panel">
      <div class="char-panel-img">
        <img src="${charImg}" alt="${isle.charName}" onerror="this.src='${FALLBACK[n]}'">
      </div>
      <div class="char-panel-speech">
        <div class="char-name-badge">${isle.charName.toUpperCase()}</div>
        <div class="speech-bubble">${msg}</div>
      </div>
    </div>
    <div class="q-body">
      <div class="q-num">Question ${i+1} sur ${isle.qs.length}</div>
      <div class="q-txt">${fmtQ(e.q)}</div>
      <div class="opts" id="opts${i}">
        ${e.o.map((opt,j)=>`<button class="opt" id="lbl${i}_${j}" onclick="selectOpt(${i},${j},'${opt}')"><span class="opt-key">${keys[j]}</span>${opt}</button>`).join('')}
      </div>
      <div class="fb" id="fb${i}"></div>
      <div class="expl" id="exp${i}"></div>
    </div>
  </div>`;
}

function buildWriteBody(e, i, charImg, msg, isle, levelBadge) {
  const n = currentIsland;
  const accents = ['é','è','ê','ë','à','â','î','ï','ô','û','ù','ç'];
  const accentBtns = accents.map(a => `<button class="acc-btn" onclick="insertAccent(${i},'${a}')" tabindex="-1">${a}</button>`).join('');
  const qFormatted = e.q.replace('{v}', `<span class="q-blank" style="min-width:90px;display:inline-block;text-align:center">_____</span>`);
  const bossBannerW = e.isBoss ? `
    <div class="boss-banner">
      <img class="boss-banner-img" src="${e.bossImg||''}" alt="${e.bossName||'BOSS'}" onerror="this.style.display='none'">
      <div class="boss-banner-text">
        <div class="boss-banner-label">⚔️ COMBAT FINAL</div>
        <div class="boss-banner-name">${e.bossName||'BOSS'}</div>
        <div class="boss-banner-hp">
          <div class="boss-hp-bar"><div class="boss-hp-fill"></div></div>
          <div class="boss-hp-lbl">HP: ██████████ 100%</div>
        </div>
      </div>
    </div>` : '';
  return `
  <div class="q-card${e.isBoss?' boss-question':''}" id="card${i}">
  ${bossBannerW}
    <div class="streak-bar" id="streakBar${i}">
      🔥 Série : <div class="streak-dots" id="streakDots${i}">
        ${[0,1,2,3,4].map(j=>`<div class="streak-dot" id="sd${i}_${j}"></div>`).join('')}
      </div>
    </div>
    <div class="char-panel">
      <div class="char-panel-img">
        <img src="${charImg}" alt="${isle.charName}" onerror="this.src='${FALLBACK[n]}'">
      </div>
      <div class="char-panel-speech">
        <div class="char-name-badge">${isle.charName.toUpperCase()}</div>
        <div class="speech-bubble">${msg}</div>
      </div>
    </div>
    <div class="q-body">
      <div class="q-num" style="display:flex;align-items:center;gap:8px">
        Question ${i+1} sur ${isle.qs.length} ${levelBadge}
      </div>
      <div class="q-txt">${qFormatted}</div>
      <div class="write-zone">
        <div class="write-prompt">
          Verbe à conjuguer : <span class="verb-badge">${e.verb}</span>
          <button class="hint-btn" onclick="toggleHint(${i})">💡 Indice</button>
        </div>
        <div class="hint-box" id="hint${i}">${e.hint}</div>
        <div class="write-input-wrap">
          <input class="write-input" id="inp${i}" type="text" autocomplete="off" autocorrect="off" spellcheck="false"
            placeholder="Écris la forme correcte…"
            oninput="onWriteInput(${i})" onkeydown="onWriteKey(event,${i})">
        </div>
        <div class="accent-bar">${accentBtns}</div>
      </div>
      <div class="fb" id="fb${i}"></div>
      <div class="expl" id="exp${i}"></div>
    </div>
  </div>`;
}

function fmtQ(q) { return q.replace('__', '<span class="q-blank">___</span>'); }

function updateStreakDots() {
  const isle = ISLANDS[currentIsland];
  if (!isle) return;
  isle.qs.forEach((_, i) => {
    for (let j = 0; j < 5; j++) {
      const dot = document.getElementById(`sd${i}_${j}`);
      if (dot) dot.className = 'streak-dot' + (j < streak ? ' lit' : '');
    }
  });
}

function selectOpt(qi, oi, val) {
  sfxSwoosh();
  const isle = ISLANDS[currentIsland];
  if (isle.mode === 'write') return;
  answers[qi] = {oi, val};
  isle.qs[qi].o.forEach((_, j) => { const b = document.getElementById('lbl'+qi+'_'+j); if(b) b.classList.remove('selected'); });
  document.getElementById('lbl'+qi+'_'+oi).classList.add('selected');
  const answered = Object.keys(answers).length, total = isle.qs.length;
  document.getElementById('qProgFill').style.width = Math.round(answered/total*100) + '%';
  document.getElementById('qProgLbl').textContent = answered + ' / ' + total;
}

function insertAccent(i, char) {
  const inp = document.getElementById('inp' + i);
  if (!inp || inp.disabled) return;
  sfxSwoosh();
  const start = inp.selectionStart, end = inp.selectionEnd, val = inp.value;
  inp.value = val.slice(0, start) + char + val.slice(end);
  inp.setSelectionRange(start+1, start+1);
  inp.focus();
  onWriteInput(i);
}

function onWriteInput(i) {
  const inp = document.getElementById('inp' + i);
  if (!inp) return;
  answers[i] = {val: inp.value.trim()};
  const total = ISLANDS[currentIsland].qs.length;
  const filled = Object.keys(answers).filter(k => answers[k].val && answers[k].val.length > 0).length;
  document.getElementById('qProgFill').style.width = Math.round(filled/total*100) + '%';
  document.getElementById('qProgLbl').textContent = filled + ' / ' + total;
  updateLevelSteps(currentIsland);
}

function onWriteKey(event, i) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const next = document.getElementById('inp' + (i+1));
    if (next && !next.disabled) next.focus();
  }
}

function toggleHint(i) { const hb = document.getElementById('hint' + i); if(hb) hb.classList.toggle('show'); }

function updateLevelSteps(n) {
  const isle = ISLANDS[n];
  if (!isle || isle.mode !== 'write') return;
  [1,2,3].forEach(lv => {
    const el = document.getElementById('lvstep'+n+'_'+lv);
    if (!el) return;
    const qs = isle.qs.filter(q => q.level === lv);
    const answeredCount = qs.filter(q => {
      const qi = isle.qs.indexOf(q);
      return answers[qi] && answers[qi].val && answers[qi].val.length > 0;
    }).length;
    if (answeredCount === qs.length && qs.length > 0) el.className = 'level-step done';
    else if (answeredCount > 0) el.className = 'level-step active';
    else el.className = 'level-step';
  });
}

function corriger(n) {
  const isle = ISLANDS[n]; let score = 0;
  const isWrite = isle.mode === 'write';
  const comboWords = ['PARFAIT!','INCROYABLE!','SUPERBE!','EXCELLENT!','BRAVO!','GUM GUM!','NAKAMA!'];

  isle.qs.forEach((e, i) => {
    const ans = answers[i];
    const fb  = document.getElementById('fb'  + i);
    const expl = document.getElementById('exp' + i);

    if (isWrite) {
      const inp = document.getElementById('inp' + i);
      if (inp) inp.disabled = true;
      const rawAnswer = (ans && ans.val) ? ans.val.trim() : '';
      if (!rawAnswer) {
        fb.innerHTML = '⚠️ Pas de réponse ! La bonne réponse était : <span class="answer-reveal">' + e.a + '</span>';
        fb.className = 'fb show ko'; streak = 0;
        if (inp) inp.classList.add('wrong-input');
      } else {
        const correct = rawAnswer.toLowerCase() === e.a.toLowerCase();
        if (correct) {
          score++; streak++;
          fb.innerHTML = '✅ Excellent ! <span class="answer-reveal">' + e.a + '</span>';
          fb.className = 'fb show ok';
          if (inp) inp.classList.add('correct-input');
          setTimeout(() => fxCorrect(comboWords[Math.floor(Math.random()*comboWords.length)]), 80+i*40);
          sfxOK(); sfxPow(); speakChar(currentIsland,'correct'); showCombatGif(score===10?'perfect':'correct');
          if (streak >= 3) starRain(4);
          if (streak >= 5) { sfxCombo(); setTimeout(() => showToast('🔥 Série de '+streak+' ! INCROYABLE !'), 400); }
        } else {
          streak = 0;
          const wrongHtml = rawAnswer.split('').map((ch, ci) => {
            const expected = e.a[ci] || '';
            return ch === expected
              ? `<span style="color:var(--green)">${ch}</span>`
              : `<span style="color:var(--red);text-decoration:underline">${ch}</span>`;
          }).join('');
          fb.innerHTML = `❌ Tu as écrit : <strong>${wrongHtml}</strong><br>✔ Bonne réponse : <span class="answer-reveal">${e.a}</span>`;
          fb.className = 'fb show ko';
          if (inp) inp.classList.add('wrong-input');
          sfxKO(); sfxSlash(); fxWrong(); speakChar(currentIsland,'wrong'); showCombatGif('wrong');
        }
      }
    } else {
      isle.qs[i].o.forEach((_, j) => { const b = document.getElementById('lbl'+i+'_'+j); if(b) b.disabled = true; });
      if (!ans) {
        fb.innerHTML = '⚠️ Pas de réponse !'; fb.className = 'fb show ko'; streak = 0;
      } else {
        const correct = ans.val === e.a;
        if (correct) {
          score++; streak++;
          fb.innerHTML = '✅ Parfait !'; fb.className = 'fb show ok';
          document.getElementById('lbl'+i+'_'+ans.oi).classList.add('correct');
          setTimeout(() => fxCorrect(comboWords[Math.floor(Math.random()*comboWords.length)]), 100+i*50);
          sfxOK(); sfxPow(); speakChar(currentIsland,'correct'); showCombatGif(score===10?'perfect':'correct');
          if (streak >= 3) starRain(4);
          if (streak >= 5) { sfxCombo(); setTimeout(() => showToast('🔥 Série de '+streak+' ! INCROYABLE !'), 400); }
        } else {
          streak = 0;
          fb.innerHTML = '❌ Raté ! La bonne réponse : <strong>' + e.a + '</strong>'; fb.className = 'fb show ko';
          document.getElementById('lbl'+i+'_'+ans.oi).classList.add('wrong');
          e.o.forEach((opt, j) => { if(opt===e.a) document.getElementById('lbl'+i+'_'+j).classList.add('correct'); });
          sfxKO(); sfxSlash(); fxWrong(); speakChar(currentIsland,'wrong'); showCombatGif('wrong');
        }
      }
    }
    expl.innerHTML = '💡 ' + e.exp;
    expl.className = 'expl show';
    updateStreakDots();
  });

  const gained = score * 2; xp += gained; window.lastScore = score;completedIslands[n] = score;
  document.getElementById('stars'+n).textContent = starsStr(score, 10);
  document.getElementById('isle'+n).classList.add('done');
  updateHUD(); checkBadges();
  if (score === 10) { sfxPerfect(); starRain(12); setTimeout(() => fxCorrect('NAKAMA! 10/10!'), 300); setTimeout(() => speakChar(currentIsland,'perfect'), 800); }

  const results = [
    {min:10,emoji:'🏆',txt:'LÉGENDAIRE ! Digne du Roi des Pirates !'},
    {min:8, emoji:'⭐',txt:'EXCELLENT ! Tu es un vrai Nakama !'},
    {min:6, emoji:'😄',txt:'Bien joué, Moussaillon courageux !'},
    {min:4, emoji:'😅',txt:"Continue l'entraînement !"},
    {min:0, emoji:'💪',txt:"Ne lâche pas ! La mer t'attend !"}
  ];
  const res = results.find(r => score >= r.min) || results[results.length-1];
  const charImg = charImages[n] || FALLBACK[n];

  const html = `
  <div class="result-card" id="resCard">
    <div class="result-banner">
      <img src="${charImg}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="result-banner-emoji" style="display:none">${res.emoji}</div>
      <div class="result-lines"></div>
      <div class="result-banner-overlay"></div>
      <div class="result-score-overlay"><div class="result-score-big">${score}/10</div></div>
    </div>
    <div class="result-body">
      <div class="result-title">${res.txt}</div>
      <div class="result-stars">${starsStr(score, 10)}</div>
      <div class="result-gif-wrap">
        <img src="${score===10 ? GIFS_PERFECT[0] : score>=6 ? GIFS_ISLE_WIN[(n-1)%GIFS_ISLE_WIN.length] : GIFS_ISLE_LOSE[0]}"
             alt="reaction" class="result-gif" onerror="this.style.display='none'">
      </div>
      <div class="result-xp">+${gained} XP pirate 🏴‍☠️ — Total : ${xp} XP</div>
      <button class="btn btn-gold" onclick="goBack()">🗺️ RETOUR À LA CARTE</button>
      <button class="btn btn-outline" onclick="retry(${n})">🔁 REJOUER CETTE ÎLE</button>
    </div>
  </div>`;
  document.getElementById('qContainer').innerHTML += html;
  setTimeout(() => { document.getElementById('resCard').scrollIntoView({behavior:'smooth',block:'center'}); }, 400);
  saveProgress();
  setTimeout(() => {
    playEndScene(n, score, () => {
      const rc = document.getElementById('resCard');
      if (rc) setTimeout(() => rc.scrollIntoView({behavior:'smooth',block:'center'}), 200);
    });
  }, 800);
}

 function goBack() {
  if (window.AP && window.AP.recap) {
    window.AP.recap.show('grandbleu', lastScore || 0, 10, currentIsland, function() {
      playBGM('map');
      document.getElementById('quiz-sec').style.display = 'none';
      document.getElementById('map-sec').style.display = 'block';
      answers = {}; window.scrollTo(0, 0);
    });
  } else {
    playBGM('map');
    document.getElementById('quiz-sec').style.display = 'none';
    document.getElementById('map-sec').style.display = 'block';
    answers = {}; window.scrollTo(0, 0);
  }
}

function retry(n) { answers = {}; startIsland(n); }

// ══════════════════════════════════
// 📱 RESPONSIVE MOBILE — Ajustements dynamiques
// ══════════════════════════════════

function adjustQuizResponsive() {
  // Ajuster les polices selon la largeur
  const w = window.innerWidth;
  const base = w < 375 ? 0.95 : w < 768 ? 1 : 1.1;
  
  document.querySelectorAll('.q-txt').forEach(el => {
    el.style.fontSize = `clamp(${base}rem, ${base + 0.2}vw, ${base + 0.3}rem)`;
  });
  
  // Ajuster la hauteur du panel personnage sur très petits écrans
  const charPanel = document.querySelector('.char-panel');
  if (charPanel && w < 375) {
    charPanel.style.height = 'auto';
  }
  
  // Empêcher le zoom sur double-tap des boutons
  document.querySelectorAll('.opt, .btn, .acc-btn, .hint-btn').forEach(btn => {
    btn.style.touchAction = 'manipulation';
  });
}

// Appliquer au chargement et aux changements d'orientation
document.addEventListener('DOMContentLoaded', adjustQuizResponsive);
window.addEventListener('resize', adjustQuizResponsive);
window.addEventListener('orientationchange', adjustQuizResponsive);

// Support tactile : effet de pression au touch
document.addEventListener('touchstart', function(e) {
  if (e.target.closest('.opt, .btn, .acc-btn, .hint-btn')) {
    e.target.closest('.opt, .btn, .acc-btn, .hint-btn').style.transform = 'scale(0.98)';
  }
}, {passive: true});

document.addEventListener('touchend', function(e) {
  if (e.target.closest('.opt, .btn, .acc-btn, .hint-btn')) {
    e.target.closest('.opt, .btn, .acc-btn, .hint-btn').style.transform = '';
  }
});