import re

with open('index.html', 'r') as f:
    content = f.read()

fixes = 0

# ═══ FIX 1: Remplacer les images MAL par des images qui marchent ═══
mal_replacements = {
    'https://cdn.myanimelist.net/images/characters/9/310307.jpg': 'https://i.pinimg.com/236x/b4/c3/d8/b4c3d8e8c7b5a8b2d1e9f3c4a2b1d8e7.jpg',
}

# Remplacer TOUTES les URLs myanimelist par des emojis SVG inline
content = re.sub(
    r'https://cdn\.myanimelist\.net/images/characters/[^"\']+',
    lambda m: '',
    content
)
fixes += 1
print('✅ FIX 1: URLs MAL supprimées')

# ═══ FIX 2: Corriger loadPlayerData - ne pas auto-avancer ═══
old_load = """function loadPlayerData() {
  try {
    var saved = localStorage.getItem('ap_player');
    if (saved) {
      playerData = JSON.parse(saved);
      playerName = playerData.name;
      selectedAvatarId = playerData.avatarId || 'luffy';
      updateHeaderAvatar();
      loadProgress();
      return true;
    }
  } catch(e) {}
  return false;
}"""

new_load = """function loadPlayerData() {
  try {
    var saved = localStorage.getItem('ap_player');
    if (saved) {
      playerData = JSON.parse(saved);
      playerName = playerData.name;
      selectedAvatarId = playerData.avatarId || 'luffy';
      updateHeaderAvatar();
      loadProgress();
      // NE PAS auto-fermer l'écran avatar - laisser le joueur confirmer
      return false;
    }
  } catch(e) {}
  return false;
}"""

if old_load in content:
    content = content.replace(old_load, new_load)
    fixes += 1
    print('✅ FIX 2: Auto-avance désactivée (loadPlayerData)')
else:
    print('⚠️  FIX 2: pattern non trouvé - cherche dans avatar.js')

# ═══ FIX 3: Corriger aussi dans js/avatar.js ═══
try:
    with open('js/avatar.js', 'r') as f:
        av = f.read()
    if 'return true;' in av and 'loadPlayerData' in av:
        av = av.replace(
            '      updateHeaderAvatar();\n      loadProgress();\n      return true;',
            '      updateHeaderAvatar();\n      loadProgress();\n      return false; // pas d\'auto-avance'
        )
        with open('js/avatar.js', 'w') as f:
            f.write(av)
        fixes += 1
        print('✅ FIX 3: avatar.js corrigé')
except:
    print('⚠️  FIX 3: avatar.js non modifié')

# ═══ FIX 4: Ajouter des avatars emoji SVG dans avatars.json ═══
import json, os
av_path = 'data/avatars.json'
if os.path.exists(av_path):
    with open(av_path, 'r') as f:
        av_data = json.load(f)
    
    # Map emoji par personnage
    emojis = {
        'luffy':   '🏴‍☠️', 'zoro': '⚔️', 'nami': '🗺️',
        'usopp':   '🎯', 'sanji': '🔥', 'chopper': '🦌',
        'robin':   '📖', 'brook': '🎵', 'ace': '🌋',
        'shanks':  '🍺', 'law': '💊', 'hancock': '💘'
    }
    colors = {
        'luffy':'#e63946','zoro':'#22c55e','nami':'#f59e0b',
        'usopp':'#92400e','sanji':'#3b82f6','chopper':'#ec4899',
        'robin':'#8b5cf6','brook':'#6366f1','ace':'#f97316',
        'shanks':'#dc2626','law':'#0ea5e9','hancock':'#f43f5e'
    }
    
    for av in av_data['avatars']:
        emoji = emojis.get(av['id'], '🏴‍☠️')
        color = colors.get(av['id'], '#e63946')
        # SVG inline data URI
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="{color}"/><text x="50" y="65" font-size="50" text-anchor="middle">{emoji}</text></svg>'
        import base64
        b64 = base64.b64encode(svg.encode()).decode()
        av['img'] = f'data:image/svg+xml;base64,{b64}'
    
    with open(av_path, 'w', encoding='utf-8') as f:
        json.dump(av_data, f, ensure_ascii=False, indent=2)
    fixes += 1
    print('✅ FIX 4: Avatars emoji SVG inline (pas de 404)')

with open('index.html', 'w') as f:
    f.write(content)

print(f'\n🏴‍☠️ TOTAL: {fixes} fixes appliqués')
