#!/usr/bin/env node
/**
 * ACADÉMIE PIRATE — Script upload complet TOUS LES MONDES
 * scripts/upload-all-characters.js
 *
 * USAGE :
 *   cd ~/academie-pirate/academie-pirate
 *   SUPABASE_SERVICE_KEY=xxx node scripts/upload-all-characters.js
 *
 *   Options :
 *   --world=aot        → Seulement AOT
 *   --world=naruto     → Seulement Naruto
 *   --world=ds         → Seulement Demon Slayer
 *   --world=jjk        → Seulement JJK
 *   --world=op         → Seulement One Piece (local)
 *   --world=dbz        → Seulement DBZ (local)
 *   --type=heroes      → Seulement les héros
 *   --type=villains    → Seulement les méchants
 *   --type=bosses      → Seulement les boss
 *   --dry-run          → Afficher la liste sans télécharger
 *
 * RÈGLE ASSET-01 : uploader via ce script, jamais manuellement
 */

const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const os     = require('os');

// ─── CONFIG ────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://bwxzrqsvccqmzvonsswi.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY || '';
const JIKAN_BASE   = 'https://api.jikan.moe/v4';
const TMP_DIR      = path.join(os.tmpdir(), 'ap-upload');
const REPO_ROOT    = path.resolve(__dirname, '..');

// Args
const args      = process.argv.slice(2);
const WORLD_ARG = (args.find(a => a.startsWith('--world=')) || '').split('=')[1] || 'all';
const TYPE_ARG  = (args.find(a => a.startsWith('--type='))  || '').split('=')[1] || 'all';
const DRY_RUN   = args.includes('--dry-run');

if (!SERVICE_KEY && !DRY_RUN) {
  console.error('❌ SUPABASE_SERVICE_KEY manquant.');
  console.error('   Usage : SUPABASE_SERVICE_KEY=xxx node scripts/upload-all-characters.js');
  console.error('   Dry run : node scripts/upload-all-characters.js --dry-run');
  process.exit(1);
}

// ─── CATALOGUE COMPLET DES PERSONNAGES ─────────────────────────────
// Format : { bucket, path, jikanId, name, type, world }
// type : 'hero' | 'villain' | 'boss'
// Pour les assets locaux (OP, DBZ) : bucket = null, localPath = chemin relatif

const ALL_CHARACTERS = [

  // ══════════════════════════════════════════════════════════════════
  // AOT — Attack on Titan  (bucket: island-aot)
  // ══════════════════════════════════════════════════════════════════

  // Héros déjà uploadés (vérification + refresh)
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/eren.jpeg',    jikanId:40881,  name:'Eren Yeager' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/mikasa.gif',   jikanId:40882,  name:'Mikasa Ackerman' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/armin.jpg',    jikanId:40883,  name:'Armin Arlert' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/levi.jpg',     jikanId:34219,  name:'Levi Ackerman' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/hange.jpeg',   jikanId:36829,  name:'Hange Zoë' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/erwin.jpg',    jikanId:36827,  name:'Erwin Smith' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/historia.png', jikanId:67266,  name:'Historia Reiss' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/jean.jpg',     jikanId:67264,  name:'Jean Kirstein' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/sasha.jpeg',   jikanId:67263,  name:'Sasha Blouse' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/connie.jpg',   jikanId:67265,  name:'Connie Springer' },

  // Nouveaux héros AOT (N2, N3, N4)
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/ymir.jpg',     jikanId:67267,  name:'Ymir' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/petra.jpg',    jikanId:80804,  name:'Petra Ral' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/eld.jpg',      jikanId:80805,  name:'Eld Jinn' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/oluo.jpg',     jikanId:80806,  name:'Oluo Bozado' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/moblit.jpg',   jikanId:80808,  name:'Moblit Berner' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/nanaba.jpg',   jikanId:80809,  name:'Nanaba' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/mike.jpg',     jikanId:80810,  name:'Mike Zacharias' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/falco.jpg',    jikanId:181036, name:'Falco Grice' },
  { world:'aot', type:'hero',    bucket:'island-aot', path:'characters/yelena.jpg',   jikanId:181033, name:'Yelena' },

  // Méchants AOT
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/reiner.jpg',   jikanId:36830,  name:'Reiner Braun' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/annie.jpeg',   jikanId:36832,  name:'Annie Leonhart' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/bertholdt.jpg',jikanId:36831,  name:'Bertholdt Hoover' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/zeke.jpg',     jikanId:118229, name:'Zeke Yeager' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/pieck.jpg',    jikanId:118231, name:'Pieck Finger' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/porco.jpg',    jikanId:118230, name:'Porco Galliard' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/floch.jpg',    jikanId:181034, name:'Floch Forster' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/gabi.jpg',     jikanId:181035, name:'Gabi Braun' },
  { world:'aot', type:'villain', bucket:'island-aot', path:'characters/marley-willy.jpg', jikanId:181037, name:'Willy Tybur' },

  // Boss AOT — Titans (formes titanesques)
  { world:'aot', type:'boss',    bucket:'island-aot', path:'bosses/titan-colossal.jpg',jikanId:36831,  name:'Titan Colossal' },
  { world:'aot', type:'boss',    bucket:'island-aot', path:'bosses/titan-cuirasse.jpg',jikanId:36830,  name:'Titan Cuirassé' },
  { world:'aot', type:'boss',    bucket:'island-aot', path:'bosses/titan-feminin.jpg', jikanId:36832,  name:'Titan Féminin' },
  { world:'aot', type:'boss',    bucket:'island-aot', path:'bosses/titan-bestial.jpg', jikanId:118229, name:'Titan Bestial' },

  // ══════════════════════════════════════════════════════════════════
  // DEMON SLAYER — Kanto  (bucket: island-demon-slayer)
  // ══════════════════════════════════════════════════════════════════

  // Héros existants (refresh)
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/tanjiro.jpg',   jikanId:163268, name:'Tanjiro Kamado' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/nezuko.jpeg',   jikanId:163269, name:'Nezuko Kamado' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/zenitsu.jpg',   jikanId:163270, name:'Zenitsu Agatsuma' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/inosuke.jpg',   jikanId:163271, name:'Inosuke Hashibira' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/giyu.png',      jikanId:163272, name:'Giyu Tomioka' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/shinobu.png',   jikanId:163273, name:'Shinobu Kocho' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/rengoku.jpg',   jikanId:163274, name:'Kyojuro Rengoku' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/tengen.jpg',    jikanId:163275, name:'Tengen Uzui' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/muichiro.jpg',  jikanId:163276, name:'Muichiro Tokito' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/obanai.jpeg',   jikanId:163277, name:'Obanai Iguro' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/kanao.jpg',     jikanId:163278, name:'Kanao Tsuyuri' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/mitsuri.jpeg',  jikanId:163279, name:'Mitsuri Kanroji' },

  // Nouveaux héros DS
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/sanemi.jpg',    jikanId:163280, name:'Sanemi Shinazugawa' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/gyomei.jpg',    jikanId:163281, name:'Gyomei Himejima' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/genya.jpg',     jikanId:163282, name:'Genya Shinazugawa' },
  { world:'ds', type:'hero',    bucket:'island-demon-slayer', path:'characters/aoi.jpg',       jikanId:163283, name:'Aoi Kanzaki' },

  // Boss / Méchants DS
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/muzan.jpg',     jikanId:163285, name:'Muzan Kibutsuji' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/akaza.jpg',     jikanId:163286, name:'Akaza' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/doma.jpg',      jikanId:163287, name:'Doma' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/kokushibo.png', jikanId:163288, name:'Kokushibo' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/gyutaro.jpg',   jikanId:163289, name:'Gyutaro' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/nakime.jpeg',   jikanId:163290, name:'Nakime' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/kaigaku.jpg',   jikanId:163291, name:'Kaigaku' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/hantengu.jpg',  jikanId:163292, name:'Hantengu' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/gyokko.jpg',    jikanId:163293, name:'Gyokko' },
  { world:'ds', type:'villain', bucket:'island-demon-slayer', path:'characters/rui.jpg',       jikanId:163294, name:'Rui' },

  // ══════════════════════════════════════════════════════════════════
  // NARUTO — Pays du Feu  (bucket: island-pays-du-feu)
  // ══════════════════════════════════════════════════════════════════

  // Héros existants (refresh)
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/naruto.jpg',   jikanId:17,    name:'Naruto Uzumaki' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/sasuke.png',   jikanId:13,    name:'Sasuke Uchiha' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/sakura.jpg',   jikanId:14,    name:'Sakura Haruno' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/kakashi.jpg',  jikanId:85,    name:'Kakashi Hatake' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/gaara.jpg',    jikanId:110,   name:'Gaara' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/minato.jpg',   jikanId:1103,  name:'Minato Namikaze' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/jiraiya.jpg',  jikanId:60,    name:'Jiraiya' },

  // Nouveaux héros Naruto
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/rock-lee.jpg', jikanId:67,    name:'Rock Lee' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/neji.jpg',     jikanId:68,    name:'Neji Hyuga' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/hinata.jpg',   jikanId:64,    name:'Hinata Hyuga' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/shikamaru.jpg',jikanId:65,    name:'Shikamaru Nara' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/temari.jpg',   jikanId:110,   name:'Temari' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/tsunade.jpg',  jikanId:61,    name:'Tsunade' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/killer-bee.jpg',jikanId:1104, name:'Killer Bee' },
  { world:'naruto', type:'hero',    bucket:'island-pays-du-feu', path:'characters/tenten.jpg',   jikanId:69,    name:'Tenten' },

  // Boss / Méchants Naruto
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/orochimaru.jpg',jikanId:62,   name:'Orochimaru' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/itachi.jpg',   jikanId:103,   name:'Itachi Uchiha' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/kisame.jpg',   jikanId:104,   name:'Kisame Hoshigaki' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/zabuza.jpg',   jikanId:63,    name:'Zabuza Momochi' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/pain.jpg',     jikanId:1106,  name:'Pain (Nagato)' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/madara.jpg',   jikanId:1107,  name:'Madara Uchiha' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/obito.jpg',    jikanId:1108,  name:'Obito Uchiha' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/kabuto.jpg',   jikanId:106,   name:'Kabuto Yakushi' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/hidan.jpg',    jikanId:1109,  name:'Hidan' },
  { world:'naruto', type:'villain', bucket:'island-pays-du-feu', path:'characters/deidara.jpg',  jikanId:1110,  name:'Deidara' },

  // ══════════════════════════════════════════════════════════════════
  // JJK — Jujutsu Kaisen — Namek  (bucket: island-namek)
  // ══════════════════════════════════════════════════════════════════

  // Héros existants (refresh)
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/yuji.png',      jikanId:186249, name:'Yuji Itadori' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/megumi.jpg',    jikanId:186250, name:'Megumi Fushiguro' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/nobara.png',    jikanId:186251, name:'Nobara Kugisaki' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/gojo.jpg',      jikanId:186248, name:'Satoru Gojo' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/nanami.jpg',    jikanId:186252, name:'Kento Nanami' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/todo.jpg',      jikanId:186256, name:'Aoi Todo' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/inumaki.png',   jikanId:186254, name:'Toge Inumaki' },

  // Nouveaux héros JJK
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/maki.jpg',      jikanId:186253, name:'Maki Zenin' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/panda.jpg',     jikanId:186255, name:'Panda' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/yuta.jpg',      jikanId:186257, name:'Yuta Okkotsu' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/mei-mei.jpg',   jikanId:186258, name:'Mei Mei' },
  { world:'jjk', type:'hero',    bucket:'island-namek', path:'characters/ijichi.jpg',    jikanId:186259, name:'Kiyotaka Ijichi' },

  // Boss / Méchants JJK — existants (refresh)
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/sukuna.jpg',    jikanId:195659, name:'Ryomen Sukuna' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/mahito.jpg',    jikanId:195656, name:'Mahito' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/jogo.png',      jikanId:195657, name:'Jogo' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/hanami.png',    jikanId:195658, name:'Hanami' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/dagon.png',     jikanId:195660, name:'Dagon' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/choso.png',     jikanId:195661, name:'Choso' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/geto.png',      jikanId:152591, name:'Geto Suguru' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/kenjaku.png',   jikanId:195662, name:'Kenjaku' },

  // Nouveaux méchants JJK
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/naoya.jpg',     jikanId:195663, name:'Naoya Zenin' },
  { world:'jjk', type:'villain', bucket:'island-namek', path:'characters/toji.jpg',      jikanId:195664, name:'Toji Fushiguro' },

  // ══════════════════════════════════════════════════════════════════
  // ONE PIECE — Grand Bleu  (assets locaux : assets/images/avatars/)
  // ══════════════════════════════════════════════════════════════════
  // Note : images téléchargées et placées dans le repo Git

  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/luffy.png',       jikanId:14830,  name:'Monkey D. Luffy' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/zoro.png',        jikanId:14831,  name:'Roronoa Zoro' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/nami.png',        jikanId:14832,  name:'Nami' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/usopp.png',       jikanId:14833,  name:'Usopp' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/sanji.png',       jikanId:14834,  name:'Sanji' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/chopper.png',     jikanId:14835,  name:'Tony Tony Chopper' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/robin.png',       jikanId:14836,  name:'Nico Robin' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/franky.png',      jikanId:14837,  name:'Franky' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/brook.png',       jikanId:14838,  name:'Brook' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/jinbe.png',       jikanId:14839,  name:'Jinbe' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/ace.png',         jikanId:14840,  name:'Portgas D. Ace' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/sabo.png',        jikanId:14841,  name:'Sabo' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/shanks.png',      jikanId:14842,  name:'Shanks' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/hancock.png',     jikanId:14843,  name:'Boa Hancock' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/law.png',         jikanId:14844,  name:'Trafalgar Law' },
  { world:'op', type:'hero',    bucket:null, localPath:'assets/images/avatars/vivi.png',        jikanId:14845,  name:'Nefertari Vivi' },

  // Méchants One Piece
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/crocodile.png',   jikanId:14850,  name:'Crocodile' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/doflamingo.png',  jikanId:14851,  name:'Doflamingo' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/kaido.png',       jikanId:14852,  name:'Kaido' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/bigmom.png',      jikanId:14853,  name:'Big Mom' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/blackbeard.png',  jikanId:14854,  name:'Barbe Noire' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/enel.png',        jikanId:14855,  name:'Enel' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/rob-lucci.png',   jikanId:14856,  name:'Rob Lucci' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/whitebeard.png',  jikanId:14857,  name:'Barbe Blanche' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/mihawk.png',      jikanId:14858,  name:'Mihawk' },
  { world:'op', type:'villain', bucket:null, localPath:'assets/images/avatars/clown.png',       jikanId:14859,  name:'Buggy' },

  // ══════════════════════════════════════════════════════════════════
  // DBZ — Dragon Ball Z — Magnolia  (assets locaux : assets/images/dbz/)
  // ══════════════════════════════════════════════════════════════════

  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/goku.png',       jikanId:246,    name:'Goku' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/vegeta.png',     jikanId:913,    name:'Vegeta' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/gohan.png',      jikanId:247,    name:'Gohan' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/piccolo.png',    jikanId:249,    name:'Piccolo' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/trunks.png',     jikanId:251,    name:'Trunks' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/krilin.png',     jikanId:250,    name:'Krilin' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/bulma.png',      jikanId:252,    name:'Bulma' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/android18.png',  jikanId:914,    name:'Android 18' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/goten.png',      jikanId:915,    name:'Goten' },
  { world:'dbz', type:'hero',    bucket:null, localPath:'assets/images/dbz/android17.png',  jikanId:916,    name:'Android 17' },

  // Boss DBZ
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/freezer.png',   jikanId:920,    name:'Freezer' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/cell.png',      jikanId:921,    name:'Cell' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/broly.png',     jikanId:922,    name:'Broly' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/majinbuu.png',  jikanId:923,    name:'Majin Buu' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/beerus.png',    jikanId:924,    name:'Beerus' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/babidi.png',    jikanId:925,    name:'Babidi' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/raditz.png',    jikanId:926,    name:'Raditz' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/nappa.png',     jikanId:927,    name:'Nappa' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/zarbon.png',    jikanId:928,    name:'Zarbon' },
  { world:'dbz', type:'villain', bucket:null, localPath:'assets/images/dbz/ginyu.png',     jikanId:929,    name:'Ginyu' },
];

// ─── FILTRES ───────────────────────────────────────────────────────
let TARGETS = ALL_CHARACTERS.filter(c => {
  if (WORLD_ARG !== 'all' && c.world !== WORLD_ARG) return false;
  if (TYPE_ARG  !== 'all' && c.type  !== TYPE_ARG)  return false;
  return true;
});

// ─── HELPERS ───────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'AcademiePirate/2.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchJson(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch(e) { reject(new Error('JSON parse: ' + data.slice(0,80))); }
      });
    });
    req.on('error', reject);
    req.setTimeout(12000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function getJikanImage(characterId) {
  await sleep(700); // rate limit Jikan (max 2 req/sec)
  try {
    // Essai 1 : pictures endpoint
    const r1 = await fetchJson(`${JIKAN_BASE}/characters/${characterId}/pictures`);
    if (r1.status === 200 && r1.data.data && r1.data.data.length > 0) {
      return r1.data.data[0].jpg.large_image_url || r1.data.data[0].jpg.image_url;
    }
    // Essai 2 : profil direct
    await sleep(700);
    const r2 = await fetchJson(`${JIKAN_BASE}/characters/${characterId}`);
    if (r2.status === 200 && r2.data.data) {
      return r2.data.data.images?.jpg?.large_image_url
          || r2.data.data.images?.jpg?.image_url
          || null;
    }
  } catch(e) { /* skip */ }
  return null;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const mod  = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    const req  = mod.get(url, { headers: { 'User-Agent': 'AcademiePirate/2.0' } }, res => {
      if ([301,302,303].includes(res.statusCode)) {
        file.close(); fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close(); fs.unlinkSync(dest);
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', e => { try { fs.unlinkSync(dest); } catch(_){} reject(e); });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function uploadSupabase(localPath, bucket, remotePath) {
  const data = fs.readFileSync(localPath);
  const ext  = path.extname(localPath).slice(1).toLowerCase();
  const mime = { png:'image/png', gif:'image/gif', webp:'image/webp', jpeg:'image/jpeg', jpg:'image/jpeg' }[ext] || 'image/jpeg';
  const url  = new URL(`${SUPABASE_URL}/storage/v1/object/${bucket}/${remotePath}`);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname,
      path:     url.pathname,
      method:   'POST',
      headers:  {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey':        SERVICE_KEY,
        'Content-Type':  mime,
        'Content-Length':data.length,
        'x-upsert':      'true',
      }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if ([200,201].includes(res.statusCode)) resolve({ ok: true });
        else reject(new Error(`${res.statusCode}: ${body.slice(0,150)}`));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ─── MAIN ──────────────────────────────────────────────────────────
async function main() {
  console.log('\n🏴‍☠️ ACADÉMIE PIRATE — Upload TOUS LES MONDES');
  console.log(`   Monde: ${WORLD_ARG} · Type: ${TYPE_ARG} · Mode: ${DRY_RUN ? 'DRY-RUN' : 'UPLOAD'}\n`);
  console.log(`📦 ${TARGETS.length} personnages à traiter\n`);

  // Afficher le plan
  const byWorld = {};
  TARGETS.forEach(c => {
    if (!byWorld[c.world]) byWorld[c.world] = { hero:0, villain:0, boss:0 };
    byWorld[c.world][c.type]++;
  });
  Object.entries(byWorld).forEach(([w, counts]) => {
    console.log(`  [${w.toUpperCase()}] ${counts.hero} héros · ${counts.villain} méchants · ${counts.boss || 0} boss`);
  });
  console.log('');

  if (DRY_RUN) {
    TARGETS.forEach(c => {
      const dest = c.bucket ? `${c.bucket}/${c.path}` : c.localPath;
      console.log(`  [${c.type.padEnd(7)}] ${c.name.padEnd(25)} → ${dest}`);
    });
    return;
  }

  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  const results = { ok: [], skipped: [], failed: [] };

  for (let i = 0; i < TARGETS.length; i++) {
    const c   = TARGETS[i];
    const num = `[${String(i+1).padStart(3)}/${TARGETS.length}]`;
    const emoji = c.type === 'boss' ? '⚔️' : c.type === 'villain' ? '😈' : '🦸';

    // Vérifier si fichier local déjà existant
    if (c.localPath) {
      const fullLocal = path.join(REPO_ROOT, c.localPath);
      if (fs.existsSync(fullLocal)) {
        console.log(`${num} ${emoji} ${c.name} — ✅ déjà présent`);
        results.skipped.push(c.name);
        continue;
      }
    }

    process.stdout.write(`${num} ${emoji} ${c.name}... `);

    // 1. Récupérer image via Jikan
    const imgUrl = await getJikanImage(c.jikanId);
    if (!imgUrl) {
      console.log('⚠️  image introuvable sur Jikan — skipped');
      results.failed.push({ name: c.name, reason: 'Jikan 404' });
      continue;
    }

    // 2. Télécharger
    const ext     = (imgUrl.split('.').pop().split('?')[0] || 'jpg').slice(0,4);
    const tmpFile = path.join(TMP_DIR, `char_${i}.${ext}`);
    try {
      await downloadFile(imgUrl, tmpFile);
    } catch(e) {
      console.log(`❌ dl: ${e.message}`);
      results.failed.push({ name: c.name, reason: 'Download: ' + e.message });
      continue;
    }

    // 3. Upload Supabase OU copier en local
    try {
      if (c.bucket) {
        await uploadSupabase(tmpFile, c.bucket, c.path);
        const kb = Math.round(fs.statSync(tmpFile).size / 1024);
        console.log(`✅ Supabase ${kb}KB`);
      } else {
        // Local : copier dans le repo
        const dest = path.join(REPO_ROOT, c.localPath);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(tmpFile, dest);
        const kb = Math.round(fs.statSync(dest).size / 1024);
        console.log(`✅ Local ${kb}KB → ${c.localPath}`);
      }
      results.ok.push(c.name);
    } catch(e) {
      console.log(`❌ upload: ${e.message}`);
      results.failed.push({ name: c.name, reason: 'Upload: ' + e.message });
    }

    try { fs.unlinkSync(tmpFile); } catch(_) {}
  }

  // ─── RAPPORT ──────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════');
  console.log('📊 RAPPORT FINAL');
  console.log('═══════════════════════════════════════════');
  console.log(`✅ Succès  : ${results.ok.length}`);
  console.log(`⏭  Ignorés : ${results.skipped.length} (déjà présents)`);
  console.log(`❌ Échecs  : ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ Personnages manquants :');
    results.failed.forEach(f => console.log(`   - ${f.name} (${f.reason})`));
    console.log('\n💡 Pour les images introuvables sur Jikan :');
    console.log('   Télécharge manuellement et uploade via Supabase Storage UI');
  }

  if (results.ok.filter((_, i) => !TARGETS[i]?.bucket).length > 0) {
    console.log('\n📝 Images locales ajoutées — pense à faire un commit :');
    console.log('   git add assets/images/ && git commit -m "feat: nouveaux personnages" && git push');
  }

  console.log('\n✅ Script terminé.\n');
}

main().catch(e => {
  console.error('❌ Erreur fatale:', e.message);
  process.exit(1);
});
