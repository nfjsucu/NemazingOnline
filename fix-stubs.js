const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\Даниил\\Documents\\Default Project\\amazing-clone\\public\\assets';
const targets = [
  path.join(root, 'icons'),
  path.join(root, 'images', 'icons'),
  path.join(root, 'images'),
];

function isStub(file) {
  const c = fs.readFileSync(file, 'utf8');
  return /location\.href/.test(c);
}

// Generic 24x24 monochrome (currentColor) icon paths, keyed by name fragment
const ICONS = {
  arrow: '<path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z" fill="currentColor"/>',
  'arrow-bold': '<path d="M13 5l7 7-7 7v-4H4v-6h9z" fill="currentColor"/>',
  'arrow-full': '<path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z" fill="currentColor"/>',
  'arrow-right-fill': '<path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z" fill="currentColor"/>',
  'corner-top-right': '<path d="M6 18V8h10v10h-2V10H8v8z" fill="currentColor"/>',
  'cross-middle': '<path d="M6 5l1-1 5 5 5-5 1 1-5 5 5 5-1 1-5-5-5 5-1-1 5-5z" fill="currentColor"/>',
  'menu-hamb': '<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" fill="currentColor"/>',
  'menu-tripple-horizontally': '<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" fill="currentColor"/>',
  'ok-normal': '<path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" fill="currentColor"/>',
  'pause': '<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/>',
  'people-add-green': '<path d="M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 19a6 6 0 0112 0zM15 14l-1 5h2v3h2v-3h2l-1-5z" fill="currentColor"/>',
  'roulette': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
  'roulette-gold': '<circle cx="12" cy="12" r="9" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="#d4af37"/>',
  'roulette-brilliant': '<circle cx="12" cy="12" r="9" fill="none" stroke="#5ad1ff" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="#5ad1ff"/>',
  'coinflip': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v10M9 9h6M9 15h6" stroke="currentColor" stroke-width="2"/>',
  'help': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.5 9a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="17" r="1.2" fill="currentColor"/>',
  'forum': '<path d="M4 4h16v11H8l-4 4z" fill="none" stroke="currentColor" stroke-width="2"/>',
  'rules': '<path d="M6 3h9l3 3v15H6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" stroke-width="2"/>',
  'wiki': '<path d="M5 3h9l5 5v13H5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 3v5h5" fill="none" stroke="currentColor" stroke-width="2"/>',
  'settings': '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" stroke-width="2"/>',
  'logout': '<path d="M10 4H5v16h5v-2H7V6h3zM14 8l4 4-4 4v-3H9v-2h5z" fill="currentColor"/>',
  'wallet': '<path d="M3 6h15a3 3 0 013 3v6a3 3 0 01-3 3H3z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/>',
  'flag': '<path d="M5 3v18M5 4h11l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="2"/>',
  'top': '<path d="M4 18h16v2H4zM7 14h10v3H7zM10 9h4v6h-4zM11 4h2v6h-2z" fill="currentColor"/>',
  'discord': '<path d="M7 8a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0zM8 16l-1 4M17 16l1 4M5 11c0 5 3 7 7 7s7-2 7-7l-2-1-2 2-3-1-3 1-2-1z" fill="none" stroke="currentColor" stroke-width="2"/>',
  'telegram': '<path d="M21 5L3 11l5 2 2 5 3-3 4 3z" fill="currentColor"/>',
  'tiktok': '<path d="M14 3v9a3 3 0 11-3-3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 3c1 3 3 4 5 4" fill="none" stroke="currentColor" stroke-width="2"/>',
  'youtube': '<rect x="3" y="6" width="18" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 9l4 3-4 3z" fill="currentColor"/>',
  'rutube': '<rect x="3" y="6" width="18" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  'vk-white': '<path d="M13 17h-2c-1 0-1-.4-1-1V11H9V9h1V8c0-2 1-3 3-3h2v2h-1c-1 0-1 .5-1 1v1h2l-.3 2H13v5c0 .6 0 1-1 1z" fill="currentColor"/>',
  'vkvideo': '<rect x="3" y="6" width="18" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9l4 3-4 3z" fill="currentColor"/>',
  'max': '<path d="M5 5h14v14H5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/>',
  'ok-normal': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  'age_marker': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" fill="none" stroke="currentColor" stroke-width="2"/>',
  'atmosphere': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2"/>',
  'handshake': '<path d="M3 12l4-4 5 4 4-3 5 4-3 6H8z" fill="none" stroke="currentColor" stroke-width="2"/>',
  'hd': '<rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 10v4M10 10v4M13 10h2a2 2 0 010 4h-2z" stroke="currentColor" stroke-width="1.5"/>',
  'kremlin': '<path d="M12 3l2 3h3v3h-2v9H9V9H7V6h3z" fill="currentColor"/>',
  'microphone': '<rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" stroke-width="2"/>',
  'plus-red': '<path d="M12 5v14M5 12h14" stroke="#e53935" stroke-width="3"/>',
  '16+': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 9h5v3a2.5 2.5 0 11-5 0zM12 10h4" stroke="currentColor" stroke-width="2"/>',
};

function pickIcon(name) {
  const n = name.toLowerCase();
  for (const key of Object.keys(ICONS)) {
    if (n.includes(key)) return ICONS[key];
  }
  return '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>';
}

let count = 0;
for (const dir of targets) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.toLowerCase().endsWith('.svg')) continue;
    const fp = path.join(dir, f);
    if (!isStub(fp)) continue;
    const body = pickIcon(f);
    const svg = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';
    fs.writeFileSync(fp, svg, 'utf8');
    count++;
    console.log('replaced: ' + fp);
  }
}

// Fix the two logo stub files to be a neutral placeholder referencing nothing external.
for (const lf of ['amazing-logo-black.svg', 'amazing-logo-white.svg']) {
  const fp = path.join(root, 'images', lf);
  if (fs.existsSync(fp) && isStub(fp)) {
    const fill = lf.includes('white') ? 'white' : 'black';
    const svg = '<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="60" fill="' + (lf.includes('white') ? 'transparent' : 'transparent') + '"/><text x="100" y="38" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="' + fill + '" text-anchor="middle">Nemazing</text></svg>';
    fs.writeFileSync(fp, svg, 'utf8');
    count++;
    console.log('replaced logo stub: ' + fp);
  }
}

console.log('TOTAL replaced: ' + count);
