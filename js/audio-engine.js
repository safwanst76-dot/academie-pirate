// 🏴‍☠️ AUDIO ENGINE — Académie Pirate
// Dépendance : Howler.js (chargé dans index.html)

const AudioEngine = {
  bgm: null,
  masterVolume: 0.5,
  sfxEnabled: true,
  voiceEnabled: true,
  bgmEnabled: false,

  BGM_TRACKS: {
    map:     'assets/audio/bgm/map-theme.mp3',
    battle:  'assets/audio/bgm/battle-theme.mp3',
    victory: 'assets/audio/bgm/victory-theme.mp3',
    defeat:  'assets/audio/bgm/defeat-theme.mp3',
  },

  VOICES: {
    luffy:   { correct: ['assets/audio/voices/luffy/correct_1.mp3'],   wrong: ['assets/audio/voices/luffy/wrong_1.mp3'],   intro: ['assets/audio/voices/luffy/intro_1.mp3'],   perfect: ['assets/audio/voices/luffy/perfect_1.mp3']   },
    nami:    { correct: ['assets/audio/voices/nami/correct_1.mp3'],    wrong: ['assets/audio/voices/nami/wrong_1.mp3'],    intro: ['assets/audio/voices/nami/intro_1.mp3'],    perfect: ['assets/audio/voices/nami/perfect_1.mp3']    },
    zoro:    { correct: ['assets/audio/voices/zoro/correct_1.mp3'],    wrong: ['assets/audio/voices/zoro/wrong_1.mp3'],    intro: ['assets/audio/voices/zoro/intro_1.mp3'],    perfect: ['assets/audio/voices/zoro/perfect_1.mp3']    },
    robin:   { correct: ['assets/audio/voices/robin/correct_1.mp3'],   wrong: ['assets/audio/voices/robin/wrong_1.mp3'],   intro: ['assets/audio/voices/robin/intro_1.mp3'],   perfect: ['assets/audio/voices/robin/perfect_1.mp3']   },
    usopp:   { correct: ['assets/audio/voices/usopp/correct_1.mp3'],   wrong: ['assets/audio/voices/usopp/wrong_1.mp3'],   intro: ['assets/audio/voices/usopp/intro_1.mp3'],   perfect: ['assets/audio/voices/usopp/perfect_1.mp3']   },
    sanji:   { correct: ['assets/audio/voices/sanji/correct_1.mp3'],   wrong: ['assets/audio/voices/sanji/wrong_1.mp3'],   intro: ['assets/audio/voices/sanji/intro_1.mp3'],   perfect: ['assets/audio/voices/sanji/perfect_1.mp3']   },
    chopper: { correct: ['assets/audio/voices/chopper/correct_1.mp3'], wrong: ['assets/audio/voices/chopper/wrong_1.mp3'], intro: ['assets/audio/voices/chopper/intro_1.mp3'], perfect: ['assets/audio/voices/chopper/perfect_1.mp3'] },
    brook:   { correct: ['assets/audio/voices/brook/correct_1.mp3'],   wrong: ['assets/audio/voices/brook/wrong_1.mp3'],   intro: ['assets/audio/voices/brook/intro_1.mp3'],   perfect: ['assets/audio/voices/brook/perfect_1.mp3']   },
  },

  // Joue une voix personnage
  playVoice(char, type) {
    if (!this.voiceEnabled) return;
    const list = this.VOICES[char]?.[type] || [];
    if (!list.length) return;
    const src = list[Math.floor(Math.random() * list.length)];
    try { new Howl({ src: [src], volume: this.masterVolume }).play(); } catch(e) {}
  },

  // Démarre la musique de fond
  playBGM(track) {
    if (!this.bgmEnabled) return;
    if (this.bgm) { this.bgm.stop(); this.bgm.unload(); }
    const src = this.BGM_TRACKS[track];
    if (!src) return;
    this.bgm = new Howl({ src: [src], loop: true, volume: this.masterVolume * 0.35, html5: true });
    this.bgm.play();
  },

  stopBGM() {
    if (this.bgm) this.bgm.fade(this.masterVolume * 0.35, 0, 1000);
  },

  setVolume(v) {
    this.masterVolume = parseFloat(v);
    if (this.bgm) this.bgm.volume(this.masterVolume * 0.35);
    Howler.volume(this.masterVolume);
  },

  toggle(type) {
    if (type === 'bgm') {
      this.bgmEnabled = !this.bgmEnabled;
      this.bgmEnabled ? this.playBGM('map') : this.stopBGM();
    }
    if (type === 'sfx') this.sfxEnabled = !this.sfxEnabled;
    if (type === 'voice') this.voiceEnabled = !this.voiceEnabled;
  }
};

window.AudioEngine = AudioEngine;
