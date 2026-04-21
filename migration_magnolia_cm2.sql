-- ════════════════════════════════════════════════════════════════
-- MIGRATION MAGNOLIA — HISTOIRE CM2
-- Académie Pirate · Dragon Ball Z · Images locales assets/images/dbz/
-- 8 îles × 11 questions + 8 leçons | Boss : Freezer
-- ════════════════════════════════════════════════════════════════

-- ÎLE 1 — Goku : LA PRÉHISTOIRE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 1, 'Île de Goku', 'La Préhistoire — Les premiers Hommes', 'Goku',
  'assets/images/dbz/goku.jpg', 'dbz-map', 'Raditz', '#f97316', 1
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=1)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Quand apparaissent les premiers Homo sapiens ?','["Il y a 300 000 ans","Il y a 3 000 ans","Il y a 30 000 ans","Il y a 3 millions d''ans"]','Il y a 300 000 ans','Les premiers Homo sapiens apparaissent en Afrique il y a environ 300 000 ans.','qcm',false,1),
  (2,'Quel continent est considéré comme le berceau de l''humanité ?','["L''Europe","L''Asie","L''Afrique","L''Amérique"]','L''Afrique','L''Afrique est le berceau de l''humanité : c''est là que sont apparus les premiers hominidés.','qcm',false,1),
  (3,'La Préhistoire commence avec ?','["L''invention de l''écriture","L''apparition des premiers hominidés","La naissance de Jésus","La fondation de Rome"]','L''apparition des premiers hominidés','La Préhistoire commence avec l''apparition des premiers hominidés et se termine avec l''invention de l''écriture.','qcm',false,1),
  (4,'Homo sapiens signifie ?','["Homme debout","Homme habile","Homme sage","Homme préhistorique"]','Homme sage','Homo sapiens est le nom scientifique de l''espèce humaine actuelle. Il signifie « homme sage » en latin.','qcm',false,2),
  (5,'Quand l''Homo sapiens quitte-t-il l''Afrique pour peupler le monde ?','["Il y a 70 000 ans","Il y a 700 000 ans","Il y a 7 000 ans","Il y a 700 ans"]','Il y a 70 000 ans','Les premières migrations hors d''Afrique ont eu lieu il y a environ 70 000 ans.','qcm',false,2),
  (6,'La Préhistoire se termine avec ?','["La mort des dinosaures","L''invention de l''écriture","L''invention de la roue","La construction des pyramides"]','L''invention de l''écriture','La Préhistoire prend fin avec l''invention de l''écriture, vers 3300 av. J.-C. en Mésopotamie.','qcm',false,2),
  (7,'Qu''est-ce que la taille de silex ?','["Une danse préhistorique","Une technique pour fabriquer des outils en pierre","Une façon de construire des huttes","Une méthode de chasse"]','Une technique pour fabriquer des outils en pierre','La taille du silex est la technique par laquelle les hommes préhistoriques façonnaient des outils.','qcm',false,3),
  (8,'Les hommes préhistoriques vivaient principalement de ?','["Agriculture et élevage","Chasse, pêche et cueillette","Commerce et artisanat","Pêche uniquement"]','Chasse, pêche et cueillette','Au Paléolithique, les hommes étaient nomades et vivaient de chasse, pêche et cueillette.','qcm',false,3),
  (9,'Qu''est-ce que le Néolithique ?','["L''âge de la pierre taillée","L''âge de la pierre polie et des premières agricultures","L''âge des métaux","L''âge des cavernes"]','L''âge de la pierre polie et des premières agricultures','Le Néolithique (−8000 av. J.-C.) est marqué par la sédentarisation, l''agriculture et l''élevage.','qcm',false,3),
  (10,'🔥 Goku affronte un Homo erectus. Quand vivait-il ?','["Il y a 1,8 million à 300 000 ans","Il y a 300 000 à 30 000 ans","Il y a 30 000 à 10 000 ans","Il y a 10 000 à 3 000 ans"]','Il y a 1,8 million à 300 000 ans','Homo erectus a vécu de 1,8 million à 300 000 ans avant notre ère.','qcm',false,2),
  (11,'⚔️ BOSS Raditz ! La grotte de Lascaux contient des peintures datant d''environ ?','["17 000 ans","3 000 ans","100 000 ans","500 ans"]','17 000 ans','Les peintures de Lascaux (Dordogne) datent d''environ 17 000 ans. Elles représentent des animaux.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 2 — Bulma : LA MÉSOPOTAMIE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 2, 'Île de Bulma', 'La Mésopotamie — Premières civilisations', 'Bulma',
  'assets/images/dbz/bulma.jpg', 'dbz-map', 'Nappa', '#22c55e', 2
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=2)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'La Mésopotamie se trouve entre quels fleuves ?','["Le Nil et le Congo","Le Tigre et l''Euphrate","Le Rhin et le Danube","La Seine et la Loire"]','Le Tigre et l''Euphrate','La Mésopotamie, qui signifie « pays entre les fleuves », est située entre le Tigre et l''Euphrate.','qcm',false,1),
  (2,'Quel peuple invente l''écriture cunéiforme ?','["Les Égyptiens","Les Romains","Les Sumériens","Les Grecs"]','Les Sumériens','Les Sumériens inventent l''écriture cunéiforme vers 3300 av. J.-C. en Mésopotamie.','qcm',false,1),
  (3,'Cunéiforme signifie ?','["En forme de flèche","En forme de coin","En forme de cercle","En forme de croix"]','En forme de coin','Cunéiforme vient du latin cuneus (coin) : les signes en forme de clous sont tracés dans l''argile.','qcm',false,1),
  (4,'Qu''est-ce que le Code de Hammurabi ?','["Un traité de paix","Le premier code de lois écrit","Une carte géographique","Un calendrier"]','Le premier code de lois écrit','Le Code de Hammurabi (vers 1750 av. J.-C.) est l''un des premiers codes de lois de l''histoire.','qcm',false,2),
  (5,'La Mésopotamie correspond à quel pays actuel ?','["L''Égypte","L''Iran","L''Irak","La Grèce"]','L''Irak','La Mésopotamie correspond approximativement à l''Irak actuel, ainsi qu''une partie de la Syrie.','qcm',false,2),
  (6,'Quelle invention sumérienne transforme les échanges commerciaux ?','["La monnaie","L''écriture","La roue","L''imprimerie"]','L''écriture','L''invention de l''écriture permet de noter les transactions commerciales et de garder des archives.','qcm',false,2),
  (7,'Babylone était la capitale de quel empire ?','["L''Empire sumérien","L''Empire babylonien","L''Empire assyrien","L''Empire perse"]','L''Empire babylonien','Babylone fut la capitale de l''Empire babylonien, dont le roi Hammurabi est le plus célèbre représentant.','qcm',false,3),
  (8,'Les Jardins suspendus de Babylone étaient ?','["Une tour immense","Des jardins aménagés en terrasses","Un temple","Un palais souterrain"]','Des jardins aménagés en terrasses','Les Jardins suspendus sont une des Sept Merveilles du monde antique : des terrasses cultivées superposées.','qcm',false,3),
  (9,'La ziggurat était ?','["Un temple en forme de pyramide à degrés","Un palais royal","Un marché","Une école"]','Un temple en forme de pyramide à degrés','La ziggurat est un temple mésopotamien en forme de pyramide à gradins, lieu de culte des dieux.','qcm',false,3),
  (10,'💡 Bulma invente un Radar Dragon. L''écriture cunéiforme sert d''abord à ?','["Raconter des histoires","Compter et faire du commerce","Écrire des lois","Décorer les temples"]','Compter et faire du commerce','L''écriture est d''abord utilisée pour noter les échanges commerciaux et les inventaires.','qcm',false,2),
  (11,'⚔️ BOSS Nappa ! Vers quelle date les Sumériens inventent-ils l''écriture ?','["3300 av. J.-C.","1000 av. J.-C.","500 av. J.-C.","100 apr. J.-C."]','3300 av. J.-C.','L''écriture cunéiforme sumérienne apparaît vers 3300 av. J.-C., ce qui marque la fin de la Préhistoire.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 3 — Krilin : L'ÉGYPTE ANCIENNE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 3, 'Île de Krilin', 'L''Égypte ancienne — Pharaons & Pyramides', 'Krilin',
  'assets/images/dbz/krilin.jpg', 'dbz-map', 'Zarbon', '#eab308', 3
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=3)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Sur quel fleuve est construite l''Égypte ancienne ?','["Le Tigre","L''Euphrate","Le Nil","Le Congo"]','Le Nil','L''Égypte est construite autour du Nil, fleuve qui la fertilise par ses crues annuelles.','qcm',false,1),
  (2,'Le pharaon est à la fois ?','["Roi et dieu","Roi et général","Prêtre et soldat","Agriculteur et roi"]','Roi et dieu','Le pharaon est considéré comme un dieu vivant sur terre, à la fois roi et divinité.','qcm',false,1),
  (3,'Les hiéroglyphes sont ?','["L''écriture des Grecs","L''écriture sacrée des Égyptiens","L''écriture des Romains","L''écriture des Sumériens"]','L''écriture sacrée des Égyptiens','Les hiéroglyphes sont les caractères de l''écriture de l''Égypte ancienne, utilisés depuis 3200 av. J.-C.','qcm',false,1),
  (4,'La Grande Pyramide de Gizeh a été construite pour ?','["Stocker des aliments","Servir de temple","Servir de tombeau au pharaon Khéops","Observer les étoiles"]','Servir de tombeau au pharaon Khéops','La pyramide de Khéops est la plus grande et a servi de tombeau royal vers 2560 av. J.-C.','qcm',false,2),
  (5,'Le sphinx est ?','["Une pyramide","Une statue à corps de lion et tête humaine","Un bateau funéraire","Un dieu égyptien"]','Une statue à corps de lion et tête humaine','Le Sphinx de Gizeh représente un lion au corps humain, il mesure 73 mètres de long.','qcm',false,2),
  (6,'Ramsès II est célèbre pour ?','["La construction des pyramides","La bataille de Qadesh et ses nombreux monuments","L''invention des hiéroglyphes","La fondation de l''Égypte"]','La bataille de Qadesh et ses nombreux monuments','Ramsès II (1279-1213 av. J.-C.) est le pharaon le plus célèbre, connu pour ses guerres et ses temples.','qcm',false,2),
  (7,'Qu''est-ce que la momification ?','["Une technique de construction","La conservation du corps après la mort","Un rituel de naissance","Une danse religieuse"]','La conservation du corps après la mort','La momification est le processus de conservation du corps du défunt pour lui assurer la vie éternelle.','qcm',false,3),
  (8,'Que contient le Livre des Morts ?','["Les lois de l''Égypte","Des formules magiques pour guider le mort","L''histoire des pharaons","Des recettes de cuisine"]','Des formules magiques pour guider le mort','Le Livre des Morts est un recueil de formules magiques destinées à guider l''âme du défunt dans l''au-delà.','qcm',false,3),
  (9,'La Cléopâtre célèbre était de la dynastie ?','["Des Ramsès","Des Thoutmosis","Des Ptolémées","Des Aménophis"]','Des Ptolémées','Cléopâtre VII (69-30 av. J.-C.) appartient à la dynastie des Ptolémées, une famille d''origine grecque.','qcm',false,3),
  (10,'🥋 Krilin affronte le pharaon ! Quelle mer est au nord de l''Égypte ?','["La mer Rouge","La mer Noire","La mer Méditerranée","L''océan Indien"]','La mer Méditerranée','L''Égypte est bordée au nord par la mer Méditerranée et à l''est par la mer Rouge.','qcm',false,2),
  (11,'⚔️ BOSS Zarbon ! Environ combien d''années dure la civilisation égyptienne ?','["300 ans","1 000 ans","3 000 ans","10 000 ans"]','3 000 ans','La civilisation égyptienne dure environ 3 000 ans, de 3150 av. J.-C. à 30 av. J.-C.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 4 — Gohan : LA GRÈCE ANTIQUE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 4, 'Île de Gohan', 'La Grèce antique — Athènes & Démocratie', 'Gohan',
  'assets/images/dbz/gohan.jpg', 'dbz-map', 'Ginyu', '#a855f7', 4
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=4)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'La démocratie athénienne est inventée au ?','["VIIIème siècle av. J.-C.","Vème siècle av. J.-C.","IIIème siècle av. J.-C.","Ier siècle av. J.-C."]','Vème siècle av. J.-C.','La démocratie athénienne se développe principalement au Vème siècle av. J.-C. sous Périclès.','qcm',false,1),
  (2,'Démocratie vient du grec et signifie ?','["Pouvoir des rois","Pouvoir du peuple","Pouvoir des dieux","Pouvoir des soldats"]','Pouvoir du peuple','Démocratie vient du grec demos (peuple) et kratos (pouvoir) : « pouvoir du peuple ».','qcm',false,1),
  (3,'L''Agora à Athènes était ?','["Le temple principal","La place publique où se réunissaient les citoyens","Le palais du roi","L''armée"]','La place publique où se réunissaient les citoyens','L''Agora était la place centrale d''Athènes, lieu de réunion politique, de commerce et de vie sociale.','qcm',false,1),
  (4,'Les Jeux Olympiques antiques avaient lieu à ?','["Athènes","Sparte","Olympie","Corinthe"]','Olympie','Les premiers Jeux Olympiques ont lieu à Olympie en 776 av. J.-C. en l''honneur de Zeus.','qcm',false,2),
  (5,'Le Parthénon est ?','["Le palais des rois d''Athènes","Un temple dédié à Athéna sur l''Acropole","Un théâtre","Une école de philosophie"]','Un temple dédié à Athéna sur l''Acropole','Le Parthénon est le temple principal d''Athènes, dédié à la déesse Athéna, construit au Vème s. av. J.-C.','qcm',false,2),
  (6,'Socrate, Platon et Aristote sont des ?','["Généraux","Philosophes","Sculpteurs","Poètes"]','Philosophes','Socrate, Platon et Aristote sont les trois grands philosophes grecs de l''Antiquité.','qcm',false,2),
  (7,'Qui pouvait voter dans la démocratie athénienne ?','["Tous les habitants","Les hommes libres d''Athènes","Les femmes","Les esclaves"]','Les hommes libres d''Athènes','Seuls les citoyens (hommes libres, nés athéniens) participaient à la démocratie. Femmes et esclaves exclus.','qcm',false,3),
  (8,'La cité-État (polis) grecque est ?','["Un grand empire","Une ville indépendante avec son propre gouvernement","Une colonie","Un village"]','Une ville indépendante avec son propre gouvernement','La polis est une cité-état indépendante, avec sa propre organisation politique, ses lois et ses dieux.','qcm',false,3),
  (9,'La bataille de Marathon (490 av. J.-C.) oppose ?','["Athènes à Sparte","La Grèce à l''empire perse","Rome à Carthage","Athènes à Corinthe"]','La Grèce à l''empire perse','La bataille de Marathon est une victoire grecque contre les Perses de Darios, qui envahissaient la Grèce.','qcm',false,3),
  (10,'📚 Gohan étudie ! L''Iliade et l''Odyssée sont écrits par ?','["Platon","Socrate","Homère","Aristote"]','Homère','L''Iliade et l''Odyssée sont deux épopées attribuées au poète Homère, composées vers le VIIIème s. av. J.-C.','qcm',false,2),
  (11,'⚔️ BOSS Ginyu ! Périclès est célèbre pour avoir ?','["Fondé Rome","Dirigé Athènes à son âge d''or","Vaincu Alexandre","Inventé la démocratie"]','Dirigé Athènes à son âge d''or','Périclès (495-429 av. J.-C.) dirige Athènes à l''époque de son plus grand rayonnement culturel et politique.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 5 — Piccolo : ROME RÉPUBLICAINE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 5, 'Île de Piccolo', 'Rome — Des origines à la République', 'Piccolo',
  'assets/images/dbz/piccolo.png', 'dbz-map', 'Raditz', '#6366f1', 5
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=5)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Selon la légende, Rome est fondée en ?','["753 av. J.-C.","509 av. J.-C.","44 av. J.-C.","27 av. J.-C."]','753 av. J.-C.','Selon la tradition, Rome est fondée par Romulus le 21 avril 753 av. J.-C.','qcm',false,1),
  (2,'SPQR signifie ?','["Le Sénat et le Peuple Romains","La Supériorité et la Puissance Romaines","La Sagesse et la Paix Romaines","Le Souverain et la Province Romains"]','Le Sénat et le Peuple Romains','SPQR = Senatus PopulusQue Romanus : le Sénat et le Peuple Romains. Devise de la République romaine.','qcm',false,1),
  (3,'La République romaine est instaurée en ?','["753 av. J.-C.","509 av. J.-C.","44 av. J.-C.","27 av. J.-C."]','509 av. J.-C.','La République romaine est fondée en 509 av. J.-C. après le renversement du roi Tarquin le Superbe.','qcm',false,1),
  (4,'Les consuls étaient ?','["Des empereurs","Deux magistrats élus chaque année dirigeant Rome","Des généraux permanents","Des prêtres"]','Deux magistrats élus chaque année dirigeant Rome','La République est dirigée par deux consuls élus pour un an, qui se contrôlent mutuellement.','qcm',false,2),
  (5,'Le Sénat romain est composé de ?','["Soldats","Esclaves","Aristocrates appelés sénateurs","Marchands"]','Aristocrates appelés sénateurs','Le Sénat est l''assemblée des sénateurs, des aristocrates (patres) qui conseillent les magistrats.','qcm',false,2),
  (6,'Veni, vidi, vici (Je suis venu, j''ai vu, j''ai vaincu) est dit par ?','["Auguste","Pompée","Jules César","Cicéron"]','Jules César','Jules César prononce cette phrase après sa victoire rapide contre Pharnace II du Pont en 47 av. J.-C.','qcm',false,2),
  (7,'Carthage était une puissante cité de ?','["Grèce","Égypte","Afrique du Nord","Gaule"]','Afrique du Nord','Carthage était une cité punique d''Afrique du Nord (actuelle Tunisie), rivale de Rome lors des Guerres puniques.','qcm',false,3),
  (8,'Jules César est assassiné aux ides de mars, le ?','["15 mars 44 av. J.-C.","15 mars 27 av. J.-C.","15 mars 476 av. J.-C.","15 mars 100 av. J.-C."]','15 mars 44 av. J.-C.','Jules César est assassiné le 15 mars (ides de mars) 44 av. J.-C. par des sénateurs menés par Brutus.','qcm',false,3),
  (9,'La Via Appia est ?','["Un temple romain","La première grande route pavée de Rome","Un aqueduc","Un forum"]','La première grande route pavée de Rome','La Via Appia, construite en 312 av. J.-C., est la première grande route stratégique romaine vers le sud.','qcm',false,3),
  (10,'👽 Piccolo observe Rome ! Les patriciens sont ?','["Des esclaves affranchis","Des aristocrates descendants des familles fondatrices","Des soldats d''élite","Des marchands riches"]','Des aristocrates descendants des familles fondatrices','Les patriciens sont les aristocrates de Rome, descendants des familles originelles. Les plébéiens sont le reste.','qcm',false,2),
  (11,'⚔️ BOSS ! La République romaine est-elle une démocratie comme Athènes ?','["Oui, tous les citoyens votent également","Non, les patriciens dominent le Sénat","Oui, les femmes votent","Non, seul l''empereur décide"]','Non, les patriciens dominent le Sénat','La République romaine est oligarchique : le Sénat des patriciens exerce le vrai pouvoir malgré les assemblées.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 6 — Trunks : L'EMPIRE ROMAIN
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 6, 'Île de Trunks', 'L''Empire romain — Auguste & Pax Romana', 'Trunks',
  'assets/images/dbz/trunks.jpg', 'dbz-map', 'Nappa', '#f59e0b', 6
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=6)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Auguste est le premier ?','["Consul","Dictateur","Empereur romain","Roi de Rome"]','Empereur romain','Auguste (63 av. J.-C.-14 ap. J.-C.) est le premier Empereur romain, neveu et héritier de Jules César.','qcm',false,1),
  (2,'La Pax Romana est ?','["Une guerre civile","Une période de paix relative dans l''Empire","Un traité avec les Barbares","Un temple à Rome"]','Une période de paix relative dans l''Empire','La Pax Romana (27 av. J.-C.-180 ap. J.-C.) est une période de stabilité et de prospérité romaine.','qcm',false,1),
  (3,'L''Empire romain à son apogée compte environ ?','["1 million","10 millions","50 millions","500 millions"]','50 millions','L''Empire romain compte environ 50 millions d''habitants à son apogée au IIème siècle ap. J.-C.','qcm',false,1),
  (4,'Le Colisée de Rome pouvait accueillir jusqu''à ?','["5 000 personnes","50 000 personnes","500 000 personnes","1 000 personnes"]','50 000 personnes','Le Colisée, construit entre 70 et 80 ap. J.-C., peut accueillir entre 50 000 et 80 000 spectateurs.','qcm',false,2),
  (5,'Les aqueducs romains servaient à ?','["Irriguer les champs","Transporter l''eau vers les villes","Défendre les frontières","Connecter les provinces"]','Transporter l''eau vers les villes','Les aqueducs transportaient l''eau des sources vers les villes, alimentant fontaines, thermes et maisons.','qcm',false,2),
  (6,'La religion romaine est d''abord ?','["Monothéiste","Polythéiste","Athée","Bouddhiste"]','Polythéiste','Les Romains vénèrent de nombreux dieux : Jupiter, Mars, Vénus... avant l''adoption du christianisme.','qcm',false,2),
  (7,'La ville de Pompéi est détruite par ?','["Un tremblement de terre","L''éruption du Vésuve","Une invasion barbare","Un incendie"]','L''éruption du Vésuve','Pompéi est ensevelie le 24 août 79 ap. J.-C. par l''éruption du Vésuve, conservant la ville intacte.','qcm',false,3),
  (8,'Le droit romain est important car ?','["Il a inspiré de nombreux systèmes juridiques modernes","Il abolissait l''esclavage","Il donnait le droit de vote aux femmes","Il interdisait la guerre"]','Il a inspiré de nombreux systèmes juridiques modernes','Le droit romain, codifié sous Justinien, est le fondement de nombreux droits européens modernes.','qcm',false,3),
  (9,'En quelle année l''empire est-il divisé en deux parties ?','["395 ap. J.-C.","476 ap. J.-C.","27 av. J.-C.","313 ap. J.-C."]','395 ap. J.-C.','L''Empire romain est définitivement divisé en Empire romain d''Occident et d''Orient en 395 ap. J.-C.','qcm',false,3),
  (10,'⚔️ Trunks du futur ! Quand l''Empire romain d''Occident tombe-t-il ?','["395 ap. J.-C.","476 ap. J.-C.","313 ap. J.-C.","800 ap. J.-C."]','476 ap. J.-C.','L''Empire romain d''Occident chute en 476 ap. J.-C. quand Odoacre dépose le dernier empereur Romulus Augustule.','qcm',false,2),
  (11,'⚔️ BOSS Nappa ! Quel édit autorise le christianisme dans l''Empire romain en 313 ?','["L''Édit de Milan","L''Édit de Rome","L''Édit de Carthage","L''Édit d''Auguste"]','L''Édit de Milan','L''Édit de Milan (313 ap. J.-C.) de Constantin légalise le christianisme dans tout l''Empire romain.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 7 — Android 18 : LES DÉBUTS DU CHRISTIANISME
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 7, 'Île d''Android 18', 'Les débuts du christianisme', 'Android 18',
  'assets/images/dbz/android18.jpg', 'dbz-map', 'Babidi', '#ec4899', 7
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=7)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Jésus naît en Palestine sous quel règne ?','["Jules César","Auguste","Constantin","Néron"]','Auguste','Jésus naît vers -4 av. J.-C. en Palestine, province romaine, sous le règne de l''Empereur Auguste.','qcm',false,1),
  (2,'Les apôtres sont ?','["Les ennemis de Jésus","Les disciples proches de Jésus qui répandent son message","Les prêtres juifs","Les soldats romains"]','Les disciples proches de Jésus qui répandent son message','Les 12 apôtres sont les disciples choisis par Jésus pour diffuser son enseignement.','qcm',false,1),
  (3,'Les premiers chrétiens sont persécutés parce que ?','["Ils payaient trop d''impôts","Ils refusaient de vénérer les dieux romains","Ils s''opposaient à l''armée","Ils voulaient envahir Rome"]','Ils refusaient de vénérer les dieux romains','Les chrétiens sont persécutés car ils refusent le culte impérial et des dieux romains, vu comme rébellion.','qcm',false,1),
  (4,'Saint Paul est important pour le christianisme car il ?','["Dirige l''Église à Rome","Évangélise l''Empire romain en voyageant","Écrit la Bible entière","Combat les Romains"]','Évangélise l''Empire romain en voyageant','Saint Paul effectue plusieurs voyages missionnaires et fonde des communautés chrétiennes dans l''Empire.','qcm',false,2),
  (5,'Les catacombes romaines étaient ?','["Des prisons","Des tunnels funéraires où se réunissaient les premiers chrétiens","Des temples","Des marchés souterrains"]','Des tunnels funéraires où se réunissaient les premiers chrétiens','Les catacombes sont des galeries souterraines qui servaient de cimetières et de lieux de réunion discrets.','qcm',false,2),
  (6,'En 380, Théodose fait du christianisme ?','["Une religion interdite","La religion officielle de l''Empire romain","Une religion tolérée parmi d''autres","Une religion réservée aux nobles"]','La religion officielle de l''Empire romain','L''Édit de Thessalonique (380) fait du christianisme la religion d''État obligatoire de l''Empire romain.','qcm',false,2),
  (7,'L''évêque de Rome est aussi appelé ?','["Sultan","Pape","Calife","Patriarche"]','Pape','L''évêque de Rome, héritier de saint Pierre, est appelé pape et est le chef de l''Église catholique.','qcm',false,3),
  (8,'La Bible est composée de ?','["L''Ancien et le Nouveau Testament","L''Ancien Testament uniquement","Le Nouveau Testament uniquement","Les Évangiles uniquement"]','L''Ancien et le Nouveau Testament','La Bible chrétienne comprend l''Ancien Testament (héritage juif) et le Nouveau Testament (vie de Jésus et lettres des apôtres).','qcm',false,3),
  (9,'Pâques commémore ?','["La naissance de Jésus","La résurrection de Jésus","Le baptême de Jésus","L''entrée à Jérusalem"]','La résurrection de Jésus','Pâques est la fête chrétienne célébrant la résurrection de Jésus, événement central de la foi chrétienne.','qcm',false,3),
  (10,'🤖 Android 18 analyse ! Dans quelle ville Jésus est-il crucifié ?','["Bethléem","Nazareth","Jérusalem","Rome"]','Jérusalem','Jésus est crucifié à Jérusalem sous l''ordre du gouverneur romain Ponce Pilate, vers 30 ap. J.-C.','qcm',false,2),
  (11,'⚔️ BOSS Babidi ! Quel saint a écrit beaucoup de lettres (épîtres) aux premières communautés chrétiennes ?','["Saint Pierre","Saint Jean","Saint Paul","Saint Marc"]','Saint Paul','Saint Paul est l''auteur de nombreuses épîtres (lettres) aux premières communautés chrétiennes de l''Empire.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 8 — Vegeta : GRANDES INVASIONS & BOSS FREEZER
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 8, 'Île de Vegeta', 'Les grandes invasions — Chute de Rome', 'Vegeta',
  'assets/images/dbz/vegeta.jpg', 'dbz-map', 'Freezer', '#ef4444', 8
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='cm2';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=8)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Les Huns viennent d''?','["Europe du nord","Asie centrale","Afrique","Proche-Orient"]','Asie centrale','Les Huns sont des nomades d''Asie centrale qui envahissent l''Europe au IVème siècle, poussant les peuples germaniques.','qcm',false,1),
  (2,'Les Wisigoths pillent Rome en ?','["376 ap. J.-C.","410 ap. J.-C.","476 ap. J.-C.","500 ap. J.-C."]','410 ap. J.-C.','En 410 ap. J.-C., les Wisigoths d''Alaric pillent Rome pour la première fois depuis 800 ans.','qcm',false,1),
  (3,'L''Empire romain d''Occident tombe en ?','["395 ap. J.-C.","410 ap. J.-C.","476 ap. J.-C.","527 ap. J.-C."]','476 ap. J.-C.','En 476 ap. J.-C., Odoacre, chef germanique, dépose Romulus Augustule, dernier Empereur d''Occident.','qcm',false,1),
  (4,'Attila était le chef des ?','["Wisigoths","Vandales","Huns","Francs"]','Huns','Attila (406-453) est le roi des Huns, surnommé le « Fléau de Dieu », qui terrorise l''Empire romain.','qcm',false,2),
  (5,'Les peuples germaniques qui envahissent l''Empire sont appelés ?','["Les Arabes","Les Barbares","Les Nomades","Les Celtes"]','Les Barbares','Les Romains appellent « Barbares » tous les peuples extérieurs à l''Empire : Wisigoths, Ostrogoths, Vandales, Francs...','qcm',false,2),
  (6,'Après la chute de Rome, l''Empire romain d''Orient survit sous le nom d''?','["Empire byzantin","Empire arabe","Empire franc","Empire germanique"]','Empire byzantin','L''Empire romain d''Orient (capitale Constantinople) survit jusqu''en 1453 sous le nom d''Empire byzantin.','qcm',false,2),
  (7,'Les Francs s''installent principalement en ?','["Italie","Espagne","Gaule (France actuelle)","Angleterre"]','Gaule (France actuelle)','Les Francs s''installent en Gaule, qui deviendra le royaume des Francs, ancêtre de la France.','qcm',false,3),
  (8,'Clovis est le roi franc célèbre pour ?','["Sa conquête de Rome","Son baptême et la conversion des Francs au christianisme","Sa défaite contre les Huns","Sa construction de châteaux"]','Son baptême et la conversion des Francs au christianisme','Clovis, roi franc, se convertit au christianisme vers 496, appuyé par l''évêque Rémi de Reims.','qcm',false,3),
  (9,'Le Moyen Âge commence conventionnellement avec ?','["La naissance de Jésus","La chute de Rome en 476","La mort d''Auguste","La naissance de Mahomet"]','La chute de Rome en 476','Le Moyen Âge commence en 476 ap. J.-C. avec la chute de l''Empire romain d''Occident.','qcm',false,3),
  (10,'👑 Vegeta est le Prince des Saiyans ! Quel titre portait Clovis ?','["Empereur","Roi des Francs","Consul","Pape"]','Roi des Francs','Clovis (481-511) est le premier roi des Francs à unifier les tribus et à se convertir au christianisme.','qcm',false,2),
  (11,'⚔️ BOSS FINAL FREEZER ! Bilan CM2. En quelle année tombe l''Empire romain d''Occident, marquant la fin de l''Antiquité ?','["476 av. J.-C.","476 ap. J.-C.","395 ap. J.-C.","410 ap. J.-C."]','476 ap. J.-C.','476 ap. J.-C. marque la chute de l''Empire romain d''Occident et la fin de l''Antiquité : début du Moyen Âge.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ════════════════════════════════════════════════════════
-- LEÇONS CM2 — 8 leçons Histoire
-- ════════════════════════════════════════════════════════
INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Goku', 'Kaméhaméha ! La Préhistoire n''a aucun secret pour moi !',
'[{"icon":"🦴","title":"La Préhistoire","color":"#f97316","content":"La Préhistoire commence avec les premiers hominidés et se termine avec l''invention de l''écriture (3300 av. J.-C.). L''Homo sapiens apparaît en Afrique il y a 300 000 ans.","examples":["Homo sapiens = homme sage","Paléolithique = âge de la pierre taillée (nomade)","Néolithique = agriculture + sédentarisation"]},{"icon":"🖼️","title":"Art préhistorique","color":"#ef4444","content":"Les hommes préhistoriques créent des peintures rupestres (grottes de Lascaux, -17 000 ans) et des sculptures.","examples":["Lascaux : peintures d''animaux","Taille du silex : outil tranchant","Feu domestiqué = grande révolution"]}]'::jsonb,
'[]'::jsonb,'Goku dit : "Préhistoire = avant l''écriture. Paléolithique = nomade. Néolithique = agriculture !"',
'[{"q":"Quand apparaissent les premiers Homo sapiens ?","a":"Il y a 300 000 ans","o":["Il y a 300 000 ans","Il y a 3 000 ans","Il y a 30 000 ans","Il y a 3 millions d''ans"]},{"q":"La Préhistoire se termine avec ?","a":"L''invention de l''écriture","o":["L''invention de l''écriture","La naissance de Jésus","La chute de Rome","La fondation de Rome"]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=1;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Bulma', 'J''ai inventé le Radar Dragon — les Sumériens ont inventé l''écriture !',
'[{"icon":"✍️","title":"La Mésopotamie","color":"#22c55e","content":"La Mésopotamie (= entre les fleuves Tigre et Euphrate) est le berceau des premières civilisations. Les Sumériens inventent l''écriture cunéiforme vers 3300 av. J.-C.","examples":["Cunéiforme = signes en forme de coin dans l''argile","Code de Hammurabi = premier code de lois","Ziggurat = temple en forme de pyramide à degrés"]},{"icon":"🏙️","title":"Les premières villes","color":"#3b82f6","content":"Les premières grandes villes apparaissent en Mésopotamie : Ur, Babylone, Ninive. La spécialisation du travail se développe.","examples":["Artisans, marchands, scribes, prêtres","Irrigation des champs grâce aux fleuves","Invention de la roue"]}]'::jsonb,
'[]'::jsonb,'Bulma dit : "Mésopotamie = Tigre + Euphrate. Sumériens = écriture cunéiforme vers 3300 av. J.-C. !"',
'[{"q":"Qui invente l''écriture cunéiforme ?","a":"Les Sumériens","o":["Les Égyptiens","Les Romains","Les Sumériens","Les Grecs"]},{"q":"La Mésopotamie correspond à quel pays actuel ?","a":"L''Irak","o":["L''Égypte","L''Iran","L''Irak","La Grèce"]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=2;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Krilin', 'Destructo-Disque ! Comme les pyramides, parfait et imparable !',
'[{"icon":"🔺","title":"L''Égypte ancienne","color":"#eab308","content":"L''Égypte ancienne dure 3000 ans (3150-30 av. J.-C.). Le pharaon est roi et dieu. L''économie repose sur les crues du Nil.","examples":["Hiéroglyphes = écriture sacrée","Pharaon = dieu-roi","Momification = conserver le corps pour la vie éternelle"]},{"icon":"🌊","title":"Le Nil, vie de l''Égypte","color":"#06b6d4","content":"Le Nil fertilise les terres par ses crues annuelles. Sans le Nil, l''Égypte serait un désert.","examples":["Crue = dépôt de limon fertile","Pyramide de Khéops = tombeau du pharaon (-2560)","Cléopâtre = dernière pharaonne (-69 à -30)"]}]'::jsonb,
'[]'::jsonb,'Krilin dit : "Pharaon = dieu-roi. Nil = vie de l''Égypte. Pyramides = tombeaux des pharaons !"',
'[{"q":"Quel fleuve est central dans la civilisation égyptienne ?","a":"Le Nil","o":["Le Tigre","L''Euphrate","Le Nil","Le Congo"]},{"q":"Les hiéroglyphes sont l''écriture de ?","a":"L''Égypte","o":["La Grèce","L''Égypte","Rome","La Mésopotamie"]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=3;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Gohan', 'La connaissance est ma vraie force ! Comme les philosophes grecs !',
'[{"icon":"🏛️","title":"La Grèce antique","color":"#a855f7","content":"La Grèce antique est composée de cités-états (poleis) indépendantes. Athènes invente la démocratie au Vème siècle av. J.-C.","examples":["Polis = cité-état autonome","Démocratie = pouvoir du peuple (demos + kratos)","Agora = place publique de la cité"]},{"icon":"🧠","title":"Culture grecque","color":"#3b82f6","content":"La Grèce donne au monde la philosophie, le théâtre, les Jeux Olympiques et les bases de la science.","examples":["Socrate, Platon, Aristote = grands philosophes","Jeux Olympiques à Olympie depuis 776 av. J.-C.","Parthenon = temple d''Athéna sur l''Acropole"]}]'::jsonb,
'[]'::jsonb,'Gohan dit : "Démocratie = demos + kratos. Athènes invente la démocratie au Vème s. av. J.-C. !"',
'[{"q":"Que signifie démocratie ?","a":"Pouvoir du peuple","o":["Pouvoir des rois","Pouvoir du peuple","Pouvoir des dieux","Pouvoir des soldats"]},{"q":"Le Parthénon est dédié à ?","a":"Athéna","o":["Zeus","Athéna","Apollon","Poséidon"]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=4;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Piccolo', 'Je surpasserai Kami ! Comme Rome a surpassé toutes les cités !',
'[{"icon":"🏛️","title":"Rome républicaine","color":"#6366f1","content":"Rome est fondée en 753 av. J.-C. (légende de Romulus). La République est instaurée en 509 av. J.-C. avec deux consuls élus par an.","examples":["SPQR = Sénat et Peuple Romains","Consul = magistrat élu pour 1 an","Sénat = assemblée des aristocrates (patriciens)"]},{"icon":"⚔️","title":"Expansion romaine","color":"#ef4444","content":"Rome conquiert progressivement l''Italie, Carthage (Guerres puniques) et la Méditerranée.","examples":["Guerres puniques contre Carthage","Veni vidi vici = Jules César","La Via Appia = première grande route romaine"]}]'::jsonb,
'[]'::jsonb,'Piccolo dit : "SPQR = Sénat et Peuple Romains. 753 av. J.-C. = fondation. 509 av. J.-C. = République !"',
'[{"q":"SPQR signifie ?","a":"Sénat et Peuple Romains","o":["Sénat et Peuple Romains","Soleil et Puissance Romains","Sagesse et Paix Romaines","Soldats et Provinces Romains"]},{"q":"La République romaine commence en ?","a":"509 av. J.-C.","o":["753 av. J.-C.","509 av. J.-C.","44 av. J.-C.","27 av. J.-C."]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=5;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Trunks', 'Je viens du futur ! Et je connais toute l''histoire de l''Empire !',
'[{"icon":"👑","title":"L''Empire romain","color":"#f59e0b","content":"Auguste devient le premier Empereur en 27 av. J.-C. La Pax Romana (27 av. J.-C.-180 ap. J.-C.) est une période de paix et de prospérité.","examples":["Auguste = premier Empereur romain","Pax Romana = 200 ans de paix relative","50 millions d''habitants à l''apogée"]},{"icon":"🏗️","title":"Réalisations romaines","color":"#22c55e","content":"Rome construit routes, aqueducs, thermes et colisées dans tout l''Empire. Le droit romain influencera toute l''Europe.","examples":["Aqueducs = transport d''eau","Colisée = 50 000 places","Édit de Milan 313 = christianisme légalisé"]}]'::jsonb,
'[]'::jsonb,'Trunks dit : "27 av. J.-C. = Auguste = 1er Empereur. 476 ap. J.-C. = chute de l''Empire d''Occident !"',
'[{"q":"Qui est le premier Empereur romain ?","a":"Auguste","o":["Jules César","Auguste","Néron","Constantin"]},{"q":"En quelle année tombe l''Empire romain d''Occident ?","a":"476 ap. J.-C.","o":["395 ap. J.-C.","476 ap. J.-C.","313 ap. J.-C.","27 av. J.-C."]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=6;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Android 18', 'Une religion qui change l''Empire ! Fascinant à analyser.',
'[{"icon":"✝️","title":"Débuts du christianisme","color":"#ec4899","content":"Jésus naît en Palestine vers -4 av. J.-C. Ses apôtres répandent son message dans l''Empire malgré les persécutions.","examples":["Apôtres = disciples de Jésus","Catacombes = réunions secrètes des premiers chrétiens","313 = Édit de Milan = christianisme légalisé"]},{"icon":"📖","title":"La Bible","color":"#a855f7","content":"La Bible chrétienne comprend l''Ancien Testament (Hébreux) et le Nouveau Testament (vie de Jésus + épîtres de Paul).","examples":["Ancien Testament = tradition juive","Nouveau Testament = Évangiles + épîtres","380 = christianisme religion d''État"]}]'::jsonb,
'[]'::jsonb,'Android 18 dit : "313 = Édit de Milan (tolérance). 380 = Théodose (religion d''État). Pape = évêque de Rome !"',
'[{"q":"Qui signe l''Édit de Milan en 313 ?","a":"Constantin","o":["Auguste","Néron","Constantin","Théodose"]},{"q":"Les catacombes servaient à ?","a":"Se réunir discrètement","o":["Faire du commerce","Se réunir discrètement","Stocker des armes","Élever des animaux"]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=7;

INSERT INTO lecons (chapitre_id, hero_name, hero_quote, slides, mini_jeux, hero_tip, warmup)
SELECT c.id, 'Vegeta', 'Je suis le Prince des Saiyans ! Et Rome avait des princes barbares !',
'[{"icon":"⚔️","title":"Les grandes invasions","color":"#ef4444","content":"Les peuples germaniques (Wisigoths, Vandales, Francs, Huns) envahissent l''Empire romain au IVème-Vème siècle.","examples":["Attila = roi des Huns, le Fléau de Dieu","410 = Wisigoths pillent Rome","476 = chute de l''Empire d''Occident"]},{"icon":"🔰","title":"Le nouveau monde médiéval","color":"#6366f1","content":"Les royaumes germaniques remplacent Rome. Clovis (roi des Francs) se convertit au christianisme. Début du Moyen Âge.","examples":["476 = fin de l''Antiquité, début du Moyen Âge","Clovis + christianisme = alliance Francs-Église","Empire byzantin survit à l''est jusqu''en 1453"]}]'::jsonb,
'[]'::jsonb,'Vegeta dit : "476 ap. J.-C. = chute de Rome d''Occident = début du Moyen Âge. Clovis = roi des Francs !"',
'[{"q":"En quelle année Rome est-elle pillée par les Wisigoths ?","a":"410 ap. J.-C.","o":["376 ap. J.-C.","410 ap. J.-C.","476 ap. J.-C.","527 ap. J.-C."]},{"q":"Qui est le chef des Huns qui terrorise l''Empire ?","a":"Attila","o":["Clovis","Attila","Odoacre","Alaric"]}]'::jsonb
FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='cm2' AND c.numero=8;
