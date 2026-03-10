// ═══════════════════════════════════════
// ISLANDS.JS — Académie Pirate
// Chargement images Jikan + background manga
// ═══════════════════════════════════════

const JIKAN = 'https://api.jikan.moe/v4';
const CHAR_IDS = { 1:40, 2:723, 3:53, 4:194, 5:60, 6:45, 7:318, 8:425 };
const FALLBACK = {
  1:'assets/images/avatars/luffy.png',
  2:'assets/images/avatars/nami.png',
  3:'assets/images/avatars/zoro.png',
  4:'assets/images/avatars/robin.png',
  5:'assets/images/avatars/usopp.png',
  6:'assets/images/avatars/sanji.png',
  7:'assets/images/avatars/chopper.png',
  8:'assets/images/avatars/brook.png'
};
const charImages = {...FALLBACK};
const wait = ms => new Promise(r => setTimeout(r, ms));

function showIsleImage(isleId, url) {
  const imgEl  = document.getElementById('img'  + isleId);
  const skelEl = document.getElementById('skel' + isleId);
  if (!imgEl) return;
  imgEl.src = url;
  imgEl.onload  = () => { imgEl.style.display='block'; if(skelEl) skelEl.style.display='none'; };
  imgEl.onerror = () => {
    if (url !== FALLBACK[isleId]) {
      charImages[isleId] = FALLBACK[isleId];
      showIsleImage(isleId, FALLBACK[isleId]);
    } else {
      imgEl.style.display='block'; if(skelEl) skelEl.style.display='none';
    }
  };
}

async function loadJikanImages() {
  for (const isleId of Object.keys(CHAR_IDS)) showIsleImage(isleId, FALLBACK[isleId]);
  for (const [isleId, charId] of Object.entries(CHAR_IDS)) {
    await fetchJikanChar(isleId, charId);
    await wait(500);
  }
}

async function fetchJikanChar(isleId, charId, attempt) {
  attempt = attempt || 1;
  try {
    const r = await fetch(JIKAN + '/characters/' + charId + '/pictures');
    if (r.status === 429) {
      if (attempt <= 2) { await wait(attempt * 1500); return fetchJikanChar(isleId, charId, attempt + 1); }
      return;
    }
    if (!r.ok) return;
    const data = await r.json();
    if (data.data && data.data.length > 0) {
      const url = data.data[0].jpg.image_url;
      charImages[isleId] = url;
      showIsleImage(isleId, url);
    }
  } catch(e) {}
}

async function loadBgStrips() {
  try {
    const r = await fetch(`${JIKAN}/anime/21/pictures`);
    const data = await r.json();
    if (!data.data) return;
    const pics = data.data.slice(0, 20);
    const bg = document.getElementById('manga-bg');
    const perStrip = Math.ceil(pics.length / 5);
    for (let s = 0; s < 5; s++) {
      const strip = document.createElement('div');
      strip.className = 'bg-strip';
      const slicePics = pics.slice(s * perStrip, s * perStrip + perStrip);
      const all = [...slicePics, ...slicePics];
      all.forEach(p => {
        const img = document.createElement('img');
        img.src = p.jpg.image_url || p.jpg.large_image_url;
        img.alt = ''; img.loading = 'lazy';
        strip.appendChild(img);
      });
      bg.appendChild(strip);
    }
  } catch(e) {}
}