// ═══════════════════════════════════════════════════════
// GLOBE 3D — Académie Pirate
// Carte du monde interactive avec continents/matières
// Three.js r128
// ═══════════════════════════════════════════════════════

const CONTINENTS = [
  {
    id: 'french',
    name: 'Grand Bleu',
    subject: 'Français',
    universe: 'One Piece',
    emoji: '🏴‍☠️',
    color: 0xe63946,
    glowColor: '#e63946',
    lat: 20, lon: -30,
    chars: ['Nami', 'Luffy', 'Robin'],
    desc: 'Maîtrise la grammaire avec l\'équipage Chapeau de Paille !',
    locked: false
  },
  {
    id: 'math',
    name: 'Pays du Feu',
    subject: 'Maths',
    universe: 'Naruto',
    emoji: '⚔️',
    color: 0xff6b35,
    glowColor: '#ff6b35',
    lat: 35, lon: 80,
    chars: ['Sakura', 'Naruto', 'Tsunade'],
    desc: 'Entraîne-toi aux calculs comme un vrai ninja !',
    locked: true
  },
  {
    id: 'history',
    name: 'Royaume Magnolia',
    subject: 'Histoire',
    universe: 'Fairy Tail',
    emoji: '✨',
    color: 0x8b5cf6,
    glowColor: '#8b5cf6',
    lat: 50, lon: 10,
    chars: ['Erza', 'Lucy', 'Wendy'],
    desc: 'Voyage dans le temps avec la guilde Fairy Tail !',
    locked: true
  },
  {
    id: 'science',
    name: 'Région Kanto',
    subject: 'Sciences',
    universe: 'Pokémon',
    emoji: '🌿',
    color: 0x22c55e,
    glowColor: '#22c55e',
    lat: -20, lon: 140,
    chars: ['Misty', 'Dawn', 'May'],
    desc: 'Explore la nature et les créatures avec tes Pokémon !',
    locked: true
  },
  {
    id: 'geography',
    name: 'Planète Namek',
    subject: 'Géographie',
    universe: 'Dragon Ball Z',
    emoji: '💥',
    color: 0x3b82f6,
    glowColor: '#3b82f6',
    lat: -40, lon: -70,
    chars: ['Bulma', 'Videl', 'Android 18'],
    desc: 'Parcours l\'univers avec Goku et ses amis !',
    locked: true
  }
];

let globeScene, globeCamera, globeRenderer, globeGlobe;
let globeMarkers = [];
let globeRaycaster, globeMouse;
let globeAnimId;
let globeRotating = true;
let globeSelectedContinent = null;

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container || !window.THREE) return;

  const W = container.clientWidth;
  const H = container.clientHeight;

  // Scene
  globeScene = new THREE.Scene();

  // Camera
  globeCamera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  globeCamera.position.z = 2.8;

  // Renderer
  globeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  globeRenderer.setSize(W, H);
  globeRenderer.setPixelRatio(window.devicePixelRatio);
  globeRenderer.setClearColor(0x000000, 0);
  container.appendChild(globeRenderer.domElement);

  // Raycaster
  globeRaycaster = new THREE.Raycaster();
  globeMouse = new THREE.Vector2();

  // ── Globe principal ──
  const globeGeo = new THREE.SphereGeometry(1, 64, 64);
  const globeMat = new THREE.MeshPhongMaterial({
    color: 0x0a1628,
    emissive: 0x051020,
    specular: 0x223366,
    shininess: 30,
    transparent: true,
    opacity: 0.95,
  });
  globeGlobe = new THREE.Mesh(globeGeo, globeMat);
  globeScene.add(globeGlobe);

  // ── Grille de longitude/latitude (style carte ancienne) ──
  const gridMat = new THREE.LineBasicMaterial({ color: 0x1a3a5c, transparent: true, opacity: 0.4 });
  for (let lat = -80; lat <= 80; lat += 20) {
    const pts = [];
    for (let lon = 0; lon <= 360; lon += 5) {
      pts.push(latLonToVec3(lat, lon - 180, 1.005));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    globeScene.add(new THREE.Line(geo, gridMat));
  }
  for (let lon = -180; lon < 180; lon += 20) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      pts.push(latLonToVec3(lat, lon, 1.005));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    globeScene.add(new THREE.Line(geo, gridMat));
  }

  // ── Atmosphère ──
  const atmGeo = new THREE.SphereGeometry(1.08, 32, 32);
  const atmMat = new THREE.MeshPhongMaterial({
    color: 0x1a3a7c,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide
  });
  globeScene.add(new THREE.Mesh(atmGeo, atmMat));

  // ── Étoiles ──
  const starPts = [];
  for (let i = 0; i < 2000; i++) {
    starPts.push(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPts, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.7 });
  globeScene.add(new THREE.Points(starGeo, starMat));

  // ── Lumières ──
  globeScene.add(new THREE.AmbientLight(0x334466, 1.2));
  const sun = new THREE.DirectionalLight(0xffd700, 1.5);
  sun.position.set(3, 2, 3);
  globeScene.add(sun);
  const rimLight = new THREE.DirectionalLight(0x3b82f6, 0.8);
  rimLight.position.set(-3, -1, -2);
  globeScene.add(rimLight);

  // ── Marqueurs continents ──
  CONTINENTS.forEach(c => {
    const pos = latLonToVec3(c.lat, c.lon, 1.02);

    // Disque du continent
    const markerGeo = new THREE.CircleGeometry(0.12, 32);
    const markerMat = new THREE.MeshBasicMaterial({
      color: c.color,
      transparent: true,
      opacity: c.locked ? 0.5 : 0.9,
      side: THREE.DoubleSide
    });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.copy(pos);
    marker.lookAt(new THREE.Vector3(0, 0, 0).multiplyScalar(-1));
    marker.lookAt(pos.clone().multiplyScalar(2));
    marker.userData = { continent: c };
    globeScene.add(marker);
    globeMarkers.push(marker);

    // Anneau pulsant
    const ringGeo = new THREE.RingGeometry(0.13, 0.16, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: c.color,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos.clone().multiplyScalar(1.01));
    ring.lookAt(pos.clone().multiplyScalar(2));
    ring.userData = { isRing: true, baseColor: c.color };
    globeScene.add(ring);

    // Verrou si locked
    if (c.locked) {
      const lockGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const lockMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
      const lock = new THREE.Mesh(lockGeo, lockMat);
      lock.position.copy(pos.clone().multiplyScalar(1.05));
      globeScene.add(lock);
    }
  });

  // ── Interactions souris ──
  container.addEventListener('mousemove', onGlobeMouseMove);
  container.addEventListener('click', onGlobeClick);
  container.addEventListener('touchstart', onGlobeTouch, { passive: true });

  // ── Drag rotation ──
  let isDragging = false, prevX = 0, prevY = 0;
  container.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; globeRotating = false; });
  window.addEventListener('mouseup', () => { isDragging = false; setTimeout(() => globeRotating = true, 2000); });
  container.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = (e.clientX - prevX) * 0.005;
    const dy = (e.clientY - prevY) * 0.005;
    globeGlobe.rotation.y += dx;
    globeGlobe.rotation.x += dy;
    globeMarkers.forEach(m => { m.parent === globeScene && (m.rotation.y += dx); });
    globeScene.children.forEach(c => { if (c.userData.continent || c.userData.isRing) { c.rotation.y += dx; } });
    prevX = e.clientX; prevY = e.clientY;
  });

  animateGlobe();

  // Resize
  window.addEventListener('resize', () => {
    const W2 = container.clientWidth, H2 = container.clientHeight;
    globeCamera.aspect = W2 / H2;
    globeCamera.updateProjectionMatrix();
    globeRenderer.setSize(W2, H2);
  });
}

function onGlobeMouseMove(e) {
  const rect = globeRenderer.domElement.getBoundingClientRect();
  globeMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  globeMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  globeRaycaster.setFromCamera(globeMouse, globeCamera);
  const hits = globeRaycaster.intersectObjects(globeMarkers);

  globeMarkers.forEach(m => {
    if (!m.userData.continent) return;
    const c = m.userData.continent;
    m.material.opacity = c.locked ? 0.5 : 0.9;
    m.scale.set(1, 1, 1);
  });

  if (hits.length > 0) {
    const m = hits[0].object;
    if (m.userData.continent) {
      m.material.opacity = 1;
      m.scale.set(1.3, 1.3, 1.3);
      globeRenderer.domElement.style.cursor = 'pointer';
      showContinentTooltip(m.userData.continent, e.clientX, e.clientY);
    }
  } else {
    globeRenderer.domElement.style.cursor = 'grab';
    hideContinentTooltip();
  }
}

function onGlobeClick(e) {
  globeRaycaster.setFromCamera(globeMouse, globeCamera);
  const hits = globeRaycaster.intersectObjects(globeMarkers);
  if (hits.length > 0 && hits[0].object.userData.continent) {
    const c = hits[0].object.userData.continent;
    showContinentPanel(c);
  }
}

function onGlobeTouch(e) {
  if (!e.touches[0]) return;
  const rect = globeRenderer.domElement.getBoundingClientRect();
  globeMouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
  globeMouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
  globeRaycaster.setFromCamera(globeMouse, globeCamera);
  const hits = globeRaycaster.intersectObjects(globeMarkers);
  if (hits.length > 0 && hits[0].object.userData.continent) {
    showContinentPanel(hits[0].object.userData.continent);
  }
}

function showContinentTooltip(c, x, y) {
  let tip = document.getElementById('globe-tooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'globe-tooltip';
    tip.style.cssText = `position:fixed;pointer-events:none;z-index:9999;
      background:rgba(0,0,0,0.85);border:2px solid ${c.glowColor};
      border-radius:12px;padding:8px 14px;font-family:'Nunito',sans-serif;
      color:#fff;font-size:.8rem;font-weight:700;
      box-shadow:0 0 20px ${c.glowColor}66;transition:opacity .2s;`;
    document.body.appendChild(tip);
  }
  tip.style.borderColor = c.glowColor;
  tip.style.boxShadow = `0 0 20px ${c.glowColor}66`;
  tip.innerHTML = `${c.emoji} <b style="font-family:'Bangers',cursive;font-size:1rem;letter-spacing:1px">${c.name}</b><br>
    <span style="color:${c.glowColor}">${c.subject} — ${c.universe}</span>
    ${c.locked ? '<br><span style="color:#888">🔒 Bientôt disponible</span>' : ''}`;
  tip.style.left = (x + 16) + 'px';
  tip.style.top = (y - 10) + 'px';
  tip.style.opacity = '1';
}

function hideContinentTooltip() {
  const tip = document.getElementById('globe-tooltip');
  if (tip) tip.style.opacity = '0';
}

function showContinentPanel(c) {
  const panel = document.getElementById('globe-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="gp-header" style="border-color:${c.glowColor}">
      <div class="gp-emoji">${c.emoji}</div>
      <div>
        <div class="gp-name">${c.name}</div>
        <div class="gp-universe" style="color:${c.glowColor}">${c.universe}</div>
      </div>
      <button class="gp-close" onclick="hideContinentPanel()">✕</button>
    </div>
    <div class="gp-subject">📚 ${c.subject}</div>
    <div class="gp-desc">${c.desc}</div>
    <div class="gp-chars">
      ${c.chars.map(ch => `<span class="gp-char-badge" style="border-color:${c.glowColor}33;color:${c.glowColor}">👤 ${ch}</span>`).join('')}
    </div>
    ${c.locked
      ? `<div class="gp-locked">🔒 Bientôt disponible !</div>`
      : `<button class="gp-play-btn" style="background:linear-gradient(135deg,${c.glowColor},${c.glowColor}99)"
           onclick="hideContinentPanel(); document.getElementById('map-sec').scrollIntoView({behavior:'smooth'})">
           ⚔️ COMMENCER L'AVENTURE !
         </button>`
    }
  `;
  panel.classList.add('visible');
  globeRotating = false;
}

function hideContinentPanel() {
  const panel = document.getElementById('globe-panel');
  if (panel) panel.classList.remove('visible');
  globeRotating = true;
}

function animateGlobe() {
  globeAnimId = requestAnimationFrame(animateGlobe);
  const t = Date.now() * 0.001;

  if (globeRotating) {
    globeGlobe.rotation.y += 0.002;
    globeScene.children.forEach(c => {
      if (c.userData.continent || c.userData.isRing) {
        c.rotation.y += 0.002;
      }
    });
  }

  // Pulsation des anneaux
  globeScene.children.forEach(c => {
    if (c.userData.isRing) {
      c.material.opacity = 0.3 + 0.3 * Math.sin(t * 2 + Math.random());
      const s = 1 + 0.1 * Math.sin(t * 2);
      c.scale.set(s, s, s);
    }
  });

  globeRenderer.render(globeScene, globeCamera);
}

// Init au chargement
document.addEventListener('DOMContentLoaded', () => {
  if (window.THREE) {
    initGlobe();
  } else {
    // Three.js pas encore chargé, on attend
    const check = setInterval(() => {
      if (window.THREE) { clearInterval(check); initGlobe(); }
    }, 100);
  }
});