-- ════════════════════════════════════════════════════════════════
-- MIGRATION MAGNOLIA — HISTOIRE 6ÈME
-- L'Antiquité complète | Boss : Cell | 8 îles × 11 questions + 8 leçons
-- ════════════════════════════════════════════════════════════════

-- ÎLE 1 — Goku : ORIGINES DE L'HUMANITÉ
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 1, 'Île de Goku', 'Les origines de l''humanité', 'Goku',
  'assets/images/dbz/goku.jpg', 'dbz-map', 'Raditz', '#f97316', 1
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=1)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Qu''est-ce que Lucy (Australopithèque) ?','["Un Homo sapiens","Un fossile d''hominidé vieux de 3,2 millions d''ans","Un singe","Un Homo erectus"]','Un fossile d''hominidé vieux de 3,2 millions d''ans','Lucy est un fossile d''Australopithèque découvert en Éthiopie en 1974, vieux de 3,2 millions d''années.','qcm',false,1),
  (2,'La bipédie est ?','["La capacité à utiliser des outils","La marche sur deux pieds","La parole articulée","La capacité à nager"]','La marche sur deux pieds','La bipédie (marche sur deux pieds) est une caractéristique fondamentale des hominidés, libérant les mains.','qcm',false,1),
  (3,'Homo habilis signifie ?','["Homme debout","Homme sage","Homme habile","Homme préhistorique"]','Homme habile','Homo habilis (2,4-1,5 millions d''années) est le premier tailleur d''outils, son nom signifie « homme habile ».','qcm',false,1),
  (4,'La révolution néolithique désigne ?','["La taille du silex","Le passage au nomadisme","L''invention de l''agriculture et de l''élevage","La maîtrise du feu"]','L''invention de l''agriculture et de l''élevage','Le Néolithique (vers -8000 av. J.-C.) voit l''invention de l''agriculture, de l''élevage et la sédentarisation.','qcm',false,2),
  (5,'L''art pariétal désigne ?','["La taille de statues","Les peintures sur les parois des grottes","La construction de menhirs","La gravure sur os"]','Les peintures sur les parois des grottes','L''art pariétal désigne les peintures et gravures réalisées sur les parois des grottes (Lascaux, Chauvet).','qcm',false,2),
  (6,'Les mégalithes (dolmens, menhirs) datent du ?','["Paléolithique","Néolithique","Âge du Bronze","Âge du Fer"]','Néolithique','Les mégalithes apparaissent au Néolithique. Le site de Stonehenge (Angleterre) est construit vers 3000 av. J.-C.','qcm',false,2),
  (7,'Homo erectus est le premier hominidé à ?','["Parler","Utiliser le feu","Écrire","Faire de l''agriculture"]','Utiliser le feu','Homo erectus (1,8 millions-300 000 ans) est le premier à maîtriser le feu, permettant cuisson et protection.','qcm',false,3),
  (8,'L''Âge du Bronze se caractérise par ?','["L''utilisation du silex","La fabrication d''outils en bronze (cuivre + étain)","L''invention de l''écriture","La construction de pyramides"]','La fabrication d''outils en bronze (cuivre + étain)','L''Âge du Bronze (3300-1200 av. J.-C.) voit le développement de la métallurgie : alliage de cuivre et d''étain.','qcm',false,3),
  (9,'La grotte de Chauvet (Ardèche) contient des peintures datant d''environ ?','["17 000 ans","36 000 ans","100 000 ans","3 000 ans"]','36 000 ans','La grotte Chauvet contient les plus anciennes peintures connues, datant d''environ 36 000 ans.','qcm',false,3),
  (10,'🔥 Goku maîtrise son ki ! Quel hominidé est le premier à quitter l''Afrique ?','["Australopithèque","Homo habilis","Homo erectus","Homo sapiens"]','Homo erectus','Homo erectus est le premier hominidé à quitter l''Afrique pour coloniser l''Asie et l''Europe.','qcm',false,2),
  (11,'⚔️ BOSS Raditz ! La sédentarisation liée au Néolithique entraîne ?','["Le nomadisme","La création de villages permanents","La disparition des outils","La fin des guerres"]','La création de villages permanents','L''agriculture permet de rester au même endroit : des villages permanents et des villes se forment.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 2 — Gohan : GRÈCE DÉMOCRATIE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 2, 'Île de Gohan', 'La Grèce — Cité, démocratie, religion', 'Gohan',
  'assets/images/dbz/gohan.jpg', 'dbz-map', 'Nappa', '#a855f7', 2
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=2)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'La polis grecque est ?','["Un temple","Une ville-état autonome","Un marché","Un port"]','Une ville-état autonome','La polis (cité) est une ville-état indépendante avec son propre gouvernement, ses lois et sa monnaie.','qcm',false,1),
  (2,'Clisthène réforme la démocratie athénienne en ?','["508 av. J.-C.","753 av. J.-C.","490 av. J.-C.","336 av. J.-C."]','508 av. J.-C.','Clisthène réforme la constitution d''Athènes en 508-507 av. J.-C., donnant plus de pouvoir au peuple.','qcm',false,1),
  (3,'L''Ecclésia athénienne est ?','["L''armée d''Athènes","L''assemblée des citoyens qui vote les lois","Le tribunal","Le temple d''Athéna"]','L''assemblée des citoyens qui vote les lois','L''Ecclésia est l''assemblée populaire athénienne où tous les citoyens (hommes libres) votent directement les lois.','qcm',false,1),
  (4,'Qui était Périclès ?','["Un général qui conquiert Alexandre","Un stratège qui dirige Athènes à son apogée","Un philosophe","Un roi de Sparte"]','Un stratège qui dirige Athènes à son apogée','Périclès (495-429 av. J.-C.) est l''homme d''État qui conduit Athènes à son âge d''or culturel et politique.','qcm',false,2),
  (5,'Les dieux grecs vivent sur ?','["Le Parnasse","L''Olympe","L''Acropole","Le Péloponnèse"]','L''Olympe','Les 12 dieux de l''Olympe (Zeus, Héra, Athéna, Apollon...) résident sur le mont Olympe selon la mythologie grecque.','qcm',false,2),
  (6,'Sparte est différente d''Athènes car ?','["Elle a aussi une démocratie","Elle est dirigée par une oligarchie militaire","Elle n''a pas d''armée","Elle commerce beaucoup"]','Elle est dirigée par une oligarchie militaire','Sparte est une cité militaire dirigée par deux rois et le Sénat des anciens (Gérousie) : le contraire d''Athènes.','qcm',false,2),
  (7,'Les Guerres médiques opposent ?','["Athènes à Sparte","La Grèce à la Perse","Rome à la Grèce","Athènes à Thèbes"]','La Grèce à la Perse','Les Guerres médiques (490-479 av. J.-C.) opposent les cités grecques aux Perses de Darios puis Xerxès.','qcm',false,3),
  (8,'La bataille des Thermopyles (480 av. J.-C.) est célèbre pour ?','["La victoire d''Athènes sur les Perses","La résistance héroïque de 300 Spartiates contre l''armée perse","La fondation d''Athènes","Le premier Jeux Olympiques"]','La résistance héroïque de 300 Spartiates contre l''armée perse','300 Spartiates menés par Léonidas retardent l''invasion perse pendant 3 jours aux Thermopyles.','qcm',false,3),
  (9,'Hérodote est considéré comme le père de ?','["La philosophie","La démocratie","L''histoire","La médecine"]','L''histoire','Hérodote (484-425 av. J.-C.) écrit les Histoires, récit des Guerres médiques : il est le père de l''historiographie.','qcm',false,3),
  (10,'📚 Gohan étudie ! Le théâtre grec comporte deux types de pièces ?','["Tragédie et comédie","Épopée et ode","Roman et nouvelle","Fable et conte"]','Tragédie et comédie','Le théâtre grec comprend la tragédie (Eschyle, Sophocle, Euripide) et la comédie (Aristophane).','qcm',false,2),
  (11,'⚔️ BOSS Nappa ! L''ostracisme athénien permettait de ?','["Condamner à mort un criminel","Exiler pendant 10 ans un citoyen jugé dangereux","Élire les stratèges","Nommer les prêtres"]','Exiler pendant 10 ans un citoyen jugé dangereux','L''ostracisme permettait aux Athéniens de voter l''exil d''un citoyen menaçant la démocratie, pour 10 ans.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 3 — Krilin : ALEXANDRE LE GRAND
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 3, 'Île de Krilin', 'Alexandre le Grand & l''hellénisme', 'Krilin',
  'assets/images/dbz/krilin.jpg', 'dbz-map', 'Zarbon', '#eab308', 3
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=3)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Alexandre le Grand est roi de ?','["Rome","Athènes","Macédoine","Sparte"]','Macédoine','Alexandre III de Macédoine (356-323 av. J.-C.) hérite du royaume de Macédoine de son père Philippe II.','qcm',false,1),
  (2,'Alexandre conquiert son empire en combien d''années environ ?','["50 ans","25 ans","13 ans","5 ans"]','13 ans','Alexandre conquiert un empire de la Grèce à l''Inde en seulement 13 ans (336-323 av. J.-C.).','qcm',false,1),
  (3,'L''hellénisme désigne ?','["La langue grecque","La diffusion de la culture grecque dans le monde conquis","La religion d''Athènes","L''art de la guerre grec"]','La diffusion de la culture grecque dans le monde conquis','L''hellénisme est la période et la culture nées des conquêtes d''Alexandre, mélange grec et oriental.','qcm',false,1),
  (4,'Aristote était le précepteur (professeur) de ?','["Jules César","Périclès","Alexandre le Grand","Auguste"]','Alexandre le Grand','Aristote fut le précepteur du jeune Alexandre, lui transmettant philosophie, science et littérature.','qcm',false,2),
  (5,'La ville d''Alexandrie en Égypte est célèbre pour ?','["Sa pyramide","Sa bibliothèque et son phare","Son temple","Sa muraille"]','Sa bibliothèque et son phare','Alexandrie (fondée 331 av. J.-C.) abrite la grande Bibliothèque d''Alexandrie et le Phare, 7ème Merveille du monde.','qcm',false,2),
  (6,'Alexandre meurt à ?','["Rome","Alexandrie","Babylone","Persépolis"]','Babylone','Alexandre le Grand meurt à Babylone le 10 ou 11 juin 323 av. J.-C. à l''âge de 32 ans.','qcm',false,2),
  (7,'La bataille d''Issos (333 av. J.-C.) est une victoire d''Alexandre sur ?','["Les Grecs","Darios III, roi de Perse","Les Indiens","Les Égyptiens"]','Darios III, roi de Perse','À Issos, Alexandre bat l''armée perse de Darios III malgré sa supériorité numérique.','qcm',false,3),
  (8,'Après la mort d''Alexandre, son empire est ?','["Transmis à son fils","Partagé entre ses généraux (Diadoques)","Conquis par Rome","Uni sous un seul roi"]','Partagé entre ses généraux (Diadoques)','À sa mort, l''empire est partagé entre ses généraux : Ptolémée prend l''Égypte, Séleucos l''Asie.','qcm',false,3),
  (9,'Le koiné est ?','["Une monnaie grecque","Une forme de grec commun parlé dans tout l''empire","Un temple","Une armée"]','Une forme de grec commun parlé dans tout l''empire','Le koiné (grec commun) devient la langue de culture et de commerce dans tout le monde hellénistique.','qcm',false,3),
  (10,'🥋 Krilin combat ! La phalange macédonienne est ?','["Une formation de soldats portant de longues lances (sarisses)","Une flotte navale","Une catapulte","Un groupe d''espions"]','Une formation de soldats portant de longues lances (sarisses)','La phalange macédonienne, armée de sarrisses de 4-7m, est la principale force militaire d''Alexandre.','qcm',false,2),
  (11,'⚔️ BOSS Zarbon ! Qu''est-ce qu''un Diadoque ?','["Un général d''Alexandre qui se taille un royaume après sa mort","Un philosophe grec","Un gouverneur perse","Un roi macédonien"]','Un général d''Alexandre qui se taille un royaume après sa mort','Les Diadoques (successeurs) sont les généraux qui se partagent l''empire d''Alexandre à sa mort.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 4 — Trunks : ROME FONDATION ET REPUBLIQUE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 4, 'Île de Trunks', 'Rome — Fondation et République', 'Trunks',
  'assets/images/dbz/trunks.jpg', 'dbz-map', 'Ginyu', '#6366f1', 4
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=4)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Qui fonde Rome selon la légende ?','["Rémus","Romulus","Romulus et Rémus ensemble","Énée"]','Romulus','Selon la tradition, Romulus tue son frère Rémus et fonde Rome le 21 avril 753 av. J.-C.','qcm',false,1),
  (2,'La Louve Capitoline est le symbole de Rome car ?','["Elle représente la déesse de Rome","Elle aurait allaité Romulus et Rémus","Elle gardait le temple de Jupiter","Elle symbolise la puissance militaire"]','Elle aurait allaité Romulus et Rémus','La légende raconte qu''une louve a sauvé et allaité Romulus et Rémus, les fondateurs de Rome.','qcm',false,1),
  (3,'Les Plébéiens à Rome sont ?','["Les aristocrates","Le reste des citoyens libres (ni patriciens, ni esclaves)","Les esclaves affranchis","Les soldats"]','Le reste des citoyens libres (ni patriciens, ni esclaves)','Les plébéiens forment la majorité du peuple libre romain, en dehors des aristocrates patriciens.','qcm',false,1),
  (4,'La Loi des XII Tables (450 av. J.-C.) est importante car ?','["Elle crée l''Empire","Elle codifie les lois et les rend accessibles à tous","Elle abolit l''esclavage","Elle donne le droit de vote aux femmes"]','Elle codifie les lois et les rend accessibles à tous','La Loi des XII Tables grave les lois romaines sur des tables en bronze, les rendant publiques et incontestables.','qcm',false,2),
  (5,'Le Dictateur romain était ?','["Un poste permanent","Un magistrat élu pour 6 mois en cas de crise grave","L''équivalent du roi","Un titre honorifique"]','Un magistrat élu pour 6 mois en cas de crise grave','En cas de crise, Rome pouvait nommer un Dictateur avec pleins pouvoirs pour 6 mois maximum.','qcm',false,2),
  (6,'Les Guerres puniques opposent Rome à ?','["Carthage","La Grèce","La Gaule","La Perse"]','Carthage','Les trois Guerres puniques (264-146 av. J.-C.) opposent Rome à Carthage pour la domination de la Méditerranée.','qcm',false,2),
  (7,'Hannibal est célèbre pour ?','["Sa fondation de Carthage","Avoir traversé les Alpes avec des éléphants pour attaquer Rome","Sa défense de Carthage","Avoir été le dernier roi de Carthage"]','Avoir traversé les Alpes avec des éléphants pour attaquer Rome','Hannibal Barca franchit les Alpes avec 37 éléphants de guerre et envahit l''Italie lors de la 2ème Guerre punique.','qcm',false,3),
  (8,'« Carthago delenda est » (Carthage doit être détruite) est dit par ?','["César","Hannibal","Caton l''Ancien","Scipion"]','Caton l''Ancien','Caton l''Ancien répétait cette phrase au Sénat pour pousser à la destruction totale de Carthage, réalisée en 146 av. J.-C.','qcm',false,3),
  (9,'Les guerres civiles à la fin de la République opposent ?','["Rome à la Gaule","César à Pompée puis Octave à Antoine","Les patriciens aux plébéiens","Rome à la Perse"]','César à Pompée puis Octave à Antoine','Les guerres civiles (49-31 av. J.-C.) : d''abord César vs Pompée, puis Octave (Auguste) vs Antoine.','qcm',false,3),
  (10,'⚔️ Trunks du futur ! Spartacus est célèbre pour ?','["Avoir fondé Sparte","Avoir mené une révolte d''esclaves contre Rome","Avoir vaincu Hannibal","Avoir assassiné César"]','Avoir mené une révolte d''esclaves contre Rome','Spartacus mène une révolte d''esclaves (73-71 av. J.-C.) qui menace temporairement le pouvoir romain.','qcm',false,2),
  (11,'⚔️ BOSS Ginyu ! Quel événement met fin à la République romaine ?','["La mort d''Alexandre","L''assassinat de César en 44 av. J.-C. et la victoire d''Octave","La prise de Rome par les Huns","La construction du Colisée"]','L''assassinat de César en 44 av. J.-C. et la victoire d''Octave','L''assassinat de César (44 av. J.-C.) et la victoire d''Octave sur Antoine (31 av. J.-C.) mettent fin à la République.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 5 — Piccolo : L'EMPIRE ROMAIN
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 5, 'Île de Piccolo', 'L''Empire romain — Organisation & Société', 'Piccolo',
  'assets/images/dbz/piccolo.png', 'dbz-map', 'Raditz', '#06b6d4', 5
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=5)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Les Romains appellent leur mer intérieure ?','["Mare Nostrum (notre mer)","La Méditerranée","La mer Tyrrhénienne","L''Adriatique"]','Mare Nostrum (notre mer)','Les Romains appellent la Méditerranée « Mare Nostrum » (notre mer) car ils la contrôlent entièrement.','qcm',false,1),
  (2,'La légion romaine est ?','["L''unité de base de l''armée (environ 5 000 soldats)","Un navire de guerre","Un corps de cavalerie","Une catapulte géante"]','L''unité de base de l''armée (environ 5 000 soldats)','La légion romaine est composée de 4 200 à 6 000 légionnaires organisés en cohortes et centuries.','qcm',false,1),
  (3,'Le Limes est ?','["Un fruit citronné","La frontière fortifiée de l''Empire romain","Un aqueduc","Un forum"]','La frontière fortifiée de l''Empire romain','Le Limes désigne les frontières fortifiées de l''Empire : le Mur d''Hadrien en Bretagne, le Rhin et le Danube.','qcm',false,1),
  (4,'Le Forum romain était ?','["Un stade","La place centrale de la vie politique et commerciale de Rome","Un temple","Un aqueduc"]','La place centrale de la vie politique et commerciale de Rome','Le Forum est le cœur de Rome : temples, basiliques, tribunaux, boutiques s''y rassemblent.','qcm',false,2),
  (5,'Les thermes romains servaient à ?','["Se baigner et se détendre socialement","Faire des sacrifices aux dieux","Entraîner les gladiateurs","Stocker de la nourriture"]','Se baigner et se détendre socialement','Les thermes sont des bains publics romains où l''on se baigne, fait du sport et discute politics.','qcm',false,2),
  (6,'Les esclaves représentaient environ quelle proportion de la population de Rome ?','["5%","30-35%","70%","1%"]','30-35%','Au Ier siècle ap. J.-C., les esclaves représentent 30-35% de la population de l''Empire romain.','qcm',false,2),
  (7,'L''Édit de Caracalla (212 ap. J.-C.) accorde ?','["La liberté aux esclaves","La citoyenneté romaine à tous les habitants libres de l''Empire","Le droit de vote aux femmes","L''autorisation du christianisme"]','La citoyenneté romaine à tous les habitants libres de l''Empire','Caracalla étend la citoyenneté romaine à tous les hommes libres de l''Empire pour augmenter les impôts.','qcm',false,3),
  (8,'Les insulae à Rome sont ?','["Des temples","Des immeubles d''appartements pour les classes moyennes","Des fortifications","Des entrepôts"]','Des immeubles d''appartements pour les classes moyennes','Les insulae sont des immeubles de 3-7 étages où vivent la plupart des Romains, souvent insalubres.','qcm',false,3),
  (9,'L''incendie de Rome (64 ap. J.-C.) sous Néron a conduit à ?','["La reconstruction de Rome","La persécution des chrétiens accusés de l''incendie","La chute de Néron","La construction du Colisée"]','La persécution des chrétiens accusés de l''incendie','Néron accuse les chrétiens d''avoir allumé l''incendie, déclenchant les premières grandes persécutions.','qcm',false,3),
  (10,'👽 Piccolo observe ! Les Romains utilisent le béton (opus caementicium) pour ?','["Les armes","Construire ponts, arcs et dômes","Les navires","Les habits"]','Construire ponts, arcs et dômes','Le béton romain permet de construire des structures innovantes : Panthéon, aqueducs, arcs de triomphe.','qcm',false,2),
  (11,'⚔️ BOSS ! Qu''est-ce que la « crise du IIIème siècle » (235-284 ap. J.-C.) ?','["Une guerre contre la Grèce","Une période d''instabilité avec 50 empereurs en 50 ans","La fin de l''Empire","Une révolution sociale"]','Une période d''instabilité avec 50 empereurs en 50 ans','La crise du IIIème siècle voit l''Empire fragmenté, menacé par des invasions et des usurpateurs.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 6 — Bulma : CHRISTIANISME ET EMPIRE
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 6, 'Île de Bulma', 'Le christianisme dans l''Empire romain', 'Bulma',
  'assets/images/dbz/bulma.jpg', 'dbz-map', 'Babidi', '#f59e0b', 6
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=6)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Le monothéisme signifie ?','["Croyance en de nombreux dieux","Croyance en un seul dieu","Absence de croyance","Culte des empereurs"]','Croyance en un seul dieu','Le monothéisme (mono = un, théos = dieu) est la croyance en un seul dieu, caractéristique du judaïsme et du christianisme.','qcm',false,1),
  (2,'Saint Pierre est considéré comme ?','["Le premier évêque d''Alexandrie","Le fondateur du premier pape de Rome","L''auteur des Évangiles","Le baptiseur de Jésus"]','Le fondateur du premier pape de Rome','Saint Pierre, apôtre de Jésus, est considéré comme le premier évêque de Rome et le fondateur de la papauté.','qcm',false,1),
  (3,'Le Nouveau Testament est rédigé en quelle langue ?','["Latin","Araméen","Grec","Hébreu"]','Grec','Le Nouveau Testament est rédigé en grec koiné, la langue commune du monde hellénistique et de l''Empire romain.','qcm',false,1),
  (4,'Constantin transfère la capitale de l''Empire à ?','["Alexandrie","Carthage","Constantinople","Antioche"]','Constantinople','Constantin fonde Constantinople (330 ap. J.-C.) sur le site de Byzance, nouvelle capitale de l''Empire.','qcm',false,2),
  (5,'L''arianisme est ?','["Une hérésie qui nie la divinité du Christ","La religion des Arabes","Le culte de l''empereurs","Une forme de bouddhisme"]','Une hérésie qui nie la divinité du Christ','L''arianisme (d''Arius) nie que le Christ soit consubstantiel (de même nature) au Père, condamné à Nicée en 325.','qcm',false,2),
  (6,'Le concile de Nicée (325) définit ?','["Le canon des textes sacrés","Le dogme de la Trinité","Les frontières de l''Empire","La date de Pâques uniquement"]','Le dogme de la Trinité','Le Concile de Nicée réunit des évêques pour définir la doctrine de la Trinité (Père, Fils, Saint-Esprit).','qcm',false,2),
  (7,'La Vulgate est ?','["La langue populaire latine","La traduction latine de la Bible par saint Jérôme","Un recueil de lois","Un hymne chrétien"]','La traduction latine de la Bible par saint Jérôme','La Vulgate est la traduction de la Bible en latin par saint Jérôme (fin IVème s.), utilisée pendant 1000 ans.','qcm',false,3),
  (8,'Après 380, les Romains qui refusent le christianisme sont appelés ?','["Hérétiques","Barbares","Chrétiens","Juifs"]','Hérétiques','Après l''Édit de 380, ceux qui rejettent le christianisme officiel sont considérés comme hérétiques.','qcm',false,3),
  (9,'Le Schisme de 1054 sépare ?','["Catholiques et Protestants","Catholiques romains et Orthodoxes grecs","Chrétiens et Musulmans","Juifs et Chrétiens"]','Catholiques romains et Orthodoxes grecs','Le Grand Schisme de 1054 divise le christianisme entre Rome (catholiques) et Constantinople (orthodoxes).','qcm',false,3),
  (10,'💡 Bulma analyse ! Saint Augustin d''Hippone est l''auteur de ?','["La Bible","Les Confessions et La Cité de Dieu","L''Édit de Milan","La Vulgate"]','Les Confessions et La Cité de Dieu','Saint Augustin (354-430) écrit Les Confessions et La Cité de Dieu, œuvres fondamentales de la théologie chrétienne.','qcm',false,2),
  (11,'⚔️ BOSS Babidi ! Quelle est la différence entre un évêque et un pape ?','["Aucune","L''évêque dirige un diocèse, le pape dirige l''Église universelle","L''évêque est plus important","Le pape est laïc"]','L''évêque dirige un diocèse, le pape dirige l''Église universelle','L''évêque dirige un diocèse (territoire). Le pape est l''évêque de Rome et chef suprême de l''Église catholique.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 7 — Android 17 : LES ROYAUMES BARBARES
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 7, 'Île d''Android 17', 'Les royaumes barbares — Fin de l''Antiquité', 'Android 17',
  'assets/images/dbz/android17.jpg', 'dbz-map', 'Babidi', '#22c55e', 7
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=7)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'Les royaumes germaniques s''installent sur les terres de ?','["L''Empire byzantin","L''Empire romain d''Occident","La Perse","L''Afrique du Nord"]','L''Empire romain d''Occident','Après 476, les royaumes germaniques (Wisigoths, Francs, Ostrogoths, Vandales) se partagent l''Occident romain.','qcm',false,1),
  (2,'Les Wisigoths s''installent principalement en ?','["Gaule","Espagne","Angleterre","Afrique du Nord"]','Espagne','Les Wisigoths créent un royaume en Espagne (Tolède) qui dure jusqu''à la conquête arabe en 711.','qcm',false,1),
  (3,'L''Empire romain d''Orient survit à la chute de Rome sous le nom de ?','["Empire arabe","Empire byzantin","Empire germanique","Empire slave"]','Empire byzantin','L''Empire romain d''Orient, avec Constantinople pour capitale, survit sous le nom d''Empire byzantin jusqu''en 1453.','qcm',false,1),
  (4,'Clovis unifie les Francs et se convertit au christianisme vers ?','["476 ap. J.-C.","496 ap. J.-C.","550 ap. J.-C.","600 ap. J.-C."]','496 ap. J.-C.','Clovis se fait baptiser vers 496, scellant l''alliance entre les Francs et l''Église catholique romaine.','qcm',false,2),
  (5,'Les Vandales sont célèbres pour ?','["Leur art","Le sac de Rome en 455 et leur destruction systématique","Leur commerce","Leur science"]','Le sac de Rome en 455 et leur destruction systématique','Les Vandales saccagent Rome en 455. Leur nom donne le mot « vandalisme » pour destruction gratuite.','qcm',false,2),
  (6,'L''Empire byzantin est menacé au VIIème siècle par ?','["Les Francs","Les Normands","L''expansion de l''islam arabe","Les Mongols"]','L''expansion de l''islam arabe','Dès 634, les armées arabes musulmanes conquièrent Syrie, Palestine et Égypte, réduisant l''Empire byzantin.','qcm',false,2),
  (7,'La bataille de Poitiers (732) arrête ?','["Les Wisigoths","L''expansion arabe en Europe occidentale","Les Vikings","Les Huns"]','L''expansion arabe en Europe occidentale','Charles Martel arrête l''armée arabo-berbère à Poitiers en 732, stoppant l''expansion islamique en Europe.','qcm',false,3),
  (8,'L''anglosaxon est un mélange de ?','["Latin et grec","Langues germaniques et latin","Langues celtes et normandes","Latin et arabe"]','Langues germaniques et latin','Les Anglo-Saxons (Angles et Saxons germaniques) s''installent en Angleterre et leur langue mélange germanique et latin.','qcm',false,3),
  (9,'Théodoric est le roi des ?','["Wisigoths","Vandales","Ostrogoths","Francs"]','Ostrogoths','Théodoric le Grand est le roi des Ostrogoths qui conquiert l''Italie en 493 et maintient la culture romaine.','qcm',false,3),
  (10,'🤖 Android 17 résiste ! Qui unifie les trois royaumes arabes sous l''islam ?','["Mahomet","Ali","Abu Bakr","Omar"]','Mahomet','Mahomet (570-632) est le prophète de l''islam qui unifie les tribus arabes de la péninsule arabique.','qcm',false,2),
  (11,'⚔️ BOSS ! Quel est le principal héritage de l''Empire romain en Occident ?','["La langue latine qui donne les langues romanes","L''architecture uniquement","La religion chrétienne uniquement","Les routes"]','La langue latine qui donne les langues romanes','Le latin évolue en langues romanes : français, espagnol, italien, portugais, roumain. Héritage linguistique majeur.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);

-- ÎLE 8 — Vegeta : BILAN ANTIQUITÉ & BOSS CELL
INSERT INTO chapitres (matiere_id, niveau_id, numero, nom, topic, hero_name, hero_image, bgm, boss_name, ile_color, ordre_affichage)
SELECT m.id, n.id, 8, 'Île de Vegeta', 'Bilan Antiquité — De -3300 à 476', 'Vegeta',
  'assets/images/dbz/vegeta.jpg', 'dbz-map', 'Cell', '#ef4444', 8
FROM matieres m, niveaux n WHERE m.code='histoire' AND n.code='6eme';

WITH ch AS (SELECT c.id FROM chapitres c JOIN matieres m ON c.matiere_id=m.id JOIN niveaux n ON c.niveau_id=n.id WHERE m.code='histoire' AND n.code='6eme' AND c.numero=8)
INSERT INTO questions (chapitre_id, question, options, reponse, explication, type, is_boss, difficulte, ordre)
SELECT ch.id, q.question, q.options::jsonb, q.reponse, q.explication, q.type, q.is_boss, q.diff, q.ordre FROM ch, (VALUES
  (1,'L''Antiquité va de quelle date à quelle date ?','["3300 av. J.-C. à 476 ap. J.-C.","3000 av. J.-C. à 1000 ap. J.-C.","500 av. J.-C. à 500 ap. J.-C.","0 à 476 ap. J.-C."]','3300 av. J.-C. à 476 ap. J.-C.','L''Antiquité commence avec l''invention de l''écriture (3300 av. J.-C.) et finit avec la chute de Rome (476 ap. J.-C.).','qcm',false,1),
  (2,'Quelle civilisation invente l''alphabet ?','["Les Sumériens","Les Phéniciens","Les Grecs","Les Romains"]','Les Phéniciens','Les Phéniciens inventent l''alphabet consonantique vers 1050 av. J.-C., base de nos alphabets modernes.','qcm',false,1),
  (3,'Les trois grandes religions monothéistes nées au Proche-Orient sont ?','["Judaïsme, Christianisme, Islam","Christianisme, Bouddhisme, Islam","Hinduïsme, Judaïsme, Islam","Christianisme, Judaïsme, Bouddhisme"]','Judaïsme, Christianisme, Islam','Le judaïsme, le christianisme et l''islam sont les trois religions abrahamiques monothéistes du Proche-Orient.','qcm',false,1),
  (4,'Le papyrus est utilisé par ?','["Les Grecs","Les Romains","Les Égyptiens","Les Sumériens"]','Les Égyptiens','Le papyrus, fabriqué à partir du roseau Cyperus papyrus, est le support d''écriture principal de l''Égypte ancienne.','qcm',false,2),
  (5,'Le sénat romain et l''agora athénienne sont tous les deux des lieux de ?','["Culte religieux","Vie politique et débats","Spectacles","Commerce"]','Vie politique et débats','Le Sénat romain et l''Ecclésia/Agora athénienne sont des lieux de débats et de prise de décision politique.','qcm',false,2),
  (6,'L''Acropole d''Athènes et le Capitole de Rome sont tous les deux ?','["Des marchés","Des forums","Des collines sacrées au cœur des cités","Des fortifications"]','Des collines sacrées au cœur des cités','L''Acropole et le Capitole sont des collines sacrées (avec temples) qui dominent respectivement Athènes et Rome.','qcm',false,2),
  (7,'Quelle invention technique romaine a le plus d''influence ?','["Le béton et les aqueducs","La catapulte","Le glaive","Les gladiateurs"]','Le béton et les aqueducs','Le béton romain et les aqueducs (certains encore utilisés) sont les contributions techniques majeures de Rome.','qcm',false,3),
  (8,'La route de la Soie relie ?','["Rome à Carthage","La Chine à l''Empire romain","L''Inde à l''Afrique","La Grèce à la Perse"]','La Chine à l''Empire romain','La route de la Soie est un réseau commercial reliant la Chine à l''Empire romain, favorisant les échanges culturels.','qcm',false,3),
  (9,'La Pax Romana et l''âge d''or d''Athènes ont en commun ?','["La guerre permanente","Des périodes de stabilité et de brillance culturelle","L''empire sur tout le monde connu","La démocratie"]','Des périodes de stabilité et de brillance culturelle','La Pax Romana et l''âge d''or de Périclès sont deux apogées caractérisées par paix, arts et construction.','qcm',false,3),
  (10,'👑 Vegeta teste tes connaissances ! Qui traduit l''Antiquité en termes de grandes ruptures ?','["Rome fonde la démocratie","L''écriture fonde l''Antiquité, la chute de Rome ouvre le Moyen Âge","Alexandre crée l''Europe","Les Grecs fondent tout"]','L''écriture fonde l''Antiquité, la chute de Rome ouvre le Moyen Âge','L''invention de l''écriture (3300 av. J.-C.) débute l''Antiquité. La chute de Rome (476) ouvre le Moyen Âge.','qcm',false,2),
  (11,'⚔️ BOSS FINAL CELL ! Quelle formule résume le mieux l''héritage antique ?','["Grèce = démocratie et philosophie, Rome = droit et organisation, Proche-Orient = monothéisme","Grèce = sport, Rome = gladiateurs, Orient = commerce","Tout vient de Rome","Rien n''a survécu"]','Grèce = démocratie et philosophie, Rome = droit et organisation, Proche-Orient = monothéisme','La synthèse de l''Antiquité : la Grèce apporte démocratie et philosophie, Rome le droit, l''Orient le monothéisme.','boss',true,3)
) AS q(ordre, question, options, reponse, explication, type, is_boss, diff);
