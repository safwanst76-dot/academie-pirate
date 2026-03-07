# 🎯 ASSETS À AJOUTER

## 🎵 BGM — assets/audio/bgm/
| Fichier            | Musique One Piece              |
|--------------------|-------------------------------|
| map-theme.mp3      | We Are! (Opening 1)           |
| battle-theme.mp3   | Overtaken (OST tension)       |
| victory-theme.mp3  | Binks' Sake                   |
| defeat-theme.mp3   | Thème triste Marineford        |

## 🗣️ VOIX — assets/audio/voices/[perso]/
Nommer : intro_1.mp3 / correct_1.mp3 / wrong_1.mp3 / perfect_1.mp3

| Perso   | intro_1                         | correct_1    | wrong_1     |
|---------|---------------------------------|--------------|-------------|
| luffy   | "Ore wa kaizoku-ou ni naru!"    | "Yatta!"     | "Nani?!"    |
| zoro    | "Santoryu!"                     | "Yoshi!"     | "Urusai!"   |
| nami    | "Beri beri!"                    | "Kanpeki!"   | "Chigau!"   |
| usopp   | "8000 soldiers!"                | "Sugoi!"     | "Hontou?!"  |
| sanji   | "Diable Jambe!"                 | "Parfait!"   | "Merde!"    |
| chopper | "Ureshikunai zo!"               | "Yatta!"     | "Chigau!"   |
| brook   | "Yohohoho!"                     | "Subarashii!"| "Chigaimasu"|
| robin   | "Hana Hana no mi!"              | "Seikai yo!" | "Zannen."   |

## 🎬 VIDÉOS — assets/video/combat/
| Fichier              | Scène                    | Durée |
|----------------------|--------------------------|-------|
| luffy-punch.webm     | Gomu Gomu no Pistol      | 3-4s  |
| zoro-slice.webm      | Onigiri                  | 3s    |
| sanji-kick.webm      | Diable Jambe             | 3s    |
| luffy-confused.webm  | Luffy réaction drôle     | 2s    |
| chopper-happy.webm   | Chopper "pas content"    | 2s    |

## 🖼️ GIFs — assets/images/gifs/
- correct/ : célébrations One Piece
- wrong/   : réactions comiques
Source : tenor.com → "one piece luffy reaction"

## ⚙️ COMMANDES UTILES

# Télécharger audio (usage perso uniquement)
yt-dlp -x --audio-format mp3 -o "assets/audio/bgm/map-theme.mp3" "URL"

# Extraire clip vidéo court
ffmpeg -i source.mp4 -ss 00:01:23 -t 4 -vf scale=480:-1 -an assets/video/combat/luffy-punch.webm
