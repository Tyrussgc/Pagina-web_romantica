const CONFIG = {
  ella: "Mi amor",
  tu: "Ivan",
  inicio: "2026-09-28T00:00:00-05:00",
  carta: [
    "Hola, Sofia.",
    "Hoy se cumple un mes desde que empezamos este maravilloso viaje juntos y quise regalarte algo que sea muy nuestro. Esta página es un regalo especialmente para ti donde puedo expresar en colores y canciones todo lo que siento por ti.",
    "Gracias por la paz, por las risas, los abrazos, las sonrisas y por dejarme entrar en tu mundo, por mostrarme todo lo que te gusta, tus pasiones y tus hermosas virtudes.",
    "Este es solo el inicio de algo muy hermoso que siempre será maravilloso, el cual se convirtio en un sueño sin fin, del cual no quiero despertar y lo quiero vivir contigo hasta el final de los tiempos.",
    "Te amo con todo mi corazón y espero que este regalo te haga sonreír y sentirte especial, porque eso es lo que eres para mi.",
  ],
  canciones: [
    { titulo: "Eres", artista: "Café Tacvba", nota: "Es lo que tu significas para mi.", spotifyUri: "spotify:track:6kdCN6gTWLcLxmLXoUcwuI", spotifyUrl: "https://open.spotify.com/track/6kdCN6gTWLcLxmLXoUcwuI" },
    { titulo: "Nada Valgo Sin Tu Amor", artista: "Juanes", nota: "Lo valiosa que eres en mi vida.", spotifyUri: "spotify:track:6QdwofpqDvvNxX88C9A0iQ", spotifyUrl: "https://open.spotify.com/track/6QdwofpqDvvNxX88C9A0iQ" },
    { titulo: "Cada Día Que Pasa", artista: "Guayacán Orquesta", nota: "Así me siento cuando estoy contigo.", spotifyUri: "spotify:track:4kxdHesYx9gy5d9vfvLZcm", spotifyUrl: "https://open.spotify.com/track/4kxdHesYx9gy5d9vfvLZcm" }
  ],
  gustos: [
    { id: "Humor", titulo: "Tu Personalidad", sub: "Brillante y mágica", atras: "Siempre eres tan divertida y encantadora." },
    { id: "Sentimiento", titulo: "Tu sensibilidad", sub: "Profunda y emotiva", atras: "Amo la forma en como me amas." },
    { id: "Amor", titulo: "Tu amor", sub: "Incondicional y apasionado", atras: "Mi corazón te pertece y con él todo mi amor." }
  ],
  razones: [
    "Porque contigo hasta un día normal se siente bonito.",
    "Porque tu risa me cambia el ánimo.",
    "Porque a tu lado todo se siente hermoso.",
    "Porque compartes conmigo lo que te gusta.",
    "Porque me dan ganas de ser mejor cada día.",
    "Porque sentimos juntos lo que nos une."
  ],
  respuestaSi: "Sabía que dirías que sí. Te amo muchoooooo."
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $ = id => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-ella]').forEach(e => e.textContent = CONFIG.ella);
document.querySelectorAll('[data-tu]').forEach(e => e.textContent = CONFIG.tu);

/* ---------- Letter ---------- */
$('paper').innerHTML = CONFIG.carta.map(p => '<p>' + esc(p).replace('{ella}', esc(CONFIG.ella)) + '</p>').join('')
  + '<p class="sign">Con cariño, ' + esc(CONFIG.tu) + '</p>';
$('envBtn').addEventListener('click', () => {
  const card = $('letterCard');
  const open = card.classList.toggle('is-open');
  $('envBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) { const r = $('envBtn').getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 30, 30); }
});

/* ---------- Counter ---------- */
const start = new Date(CONFIG.inicio).getTime();
function tick() {
  const d = Math.max(0, Date.now() - start);
  $('c-d').textContent = Math.floor(d / 864e5);
  $('c-h').textContent = Math.floor(d / 36e5) % 24;
  $('c-m').textContent = Math.floor(d / 6e4) % 60;
  $('c-s').textContent = Math.floor(d / 1e3) % 60;
}
tick(); setInterval(tick, 1000);

/* ---------- Songs ---------- */
const vinyl = '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="58" fill="#4A2340"/>'
  + '<circle cx="60" cy="60" r="50" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1.5"/>'
  + '<circle cx="60" cy="60" r="42" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1.5"/>'
  + '<circle cx="60" cy="60" r="34" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1.5"/>'
  + '<path d="M20 36A46 46 0 0 1 50 16" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>'
  + '<circle cx="60" cy="60" r="22" fill="#FF8FB5"/>'
  + '<path transform="translate(48 48) scale(1)" d="M12 21C3 14 1 8 5 5c3-2 6 0 7 2 1-2 4-4 7-2 4 3 2 9-7 16Z" fill="#fff"/>'
  + '<circle cx="60" cy="60" r="3" fill="#FFF0F5"/></svg>';
$('songs').innerHTML = CONFIG.canciones.map((s, i) => {
  return '<article class="song">'
    + '<button class="disc" type="button" aria-label="Cargando Spotify para ' + esc(s.titulo) + '" aria-pressed="false" disabled>' + vinyl + '</button>'
    + '<div class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></div>'
    + '<h3>' + esc(s.titulo) + '</h3>'
    + (s.artista ? '<p class="by">' + esc(s.artista) + '</p>' : '')
    + '<p class="note">' + esc(s.nota) + '</p>'
    + '<div class="spotify-player" id="spotify-player-' + i + '" aria-label="Reproductor de ' + esc(s.titulo) + '"></div>'
    + '<p class="spotify-status" id="spotify-status-' + i + '" role="status" aria-live="polite">Cargando reproductor de Spotify...</p>'
    + '<a class="listen" href="' + esc(s.spotifyUrl) + '" target="_blank" rel="noopener">Abrir en Spotify</a>'
    + '</article>';
}).join('');

const spotifyControllers = new Map();
window.onSpotifyIframeApiReady = IFrameAPI => {
  CONFIG.canciones.forEach((s, i) => {
    const card = $('songs').children[i];
    const button = card.querySelector('.disc');
    const status = $('spotify-status-' + i);
    try {
      IFrameAPI.createController($('spotify-player-' + i), {
        uri: s.spotifyUri,
        width: '100%',
        height: 152
      }, controller => {
        spotifyControllers.set(card, controller);
        button.disabled = false;
        button.setAttribute('aria-label', 'Reproducir ' + s.titulo);
        status.hidden = true;
        controller.addListener('playback_update', event => {
          const playing = !event.data.isPaused;
          card.classList.toggle('playing', playing);
          button.setAttribute('aria-pressed', playing ? 'true' : 'false');
          button.setAttribute('aria-label', (playing ? 'Pausar ' : 'Reproducir ') + s.titulo);
        });
      });
    } catch (error) {
      console.error('No se pudo crear el reproductor de Spotify para ' + s.titulo, error);
      status.textContent = 'No se pudo cargar el reproductor. Puedes abrir la canción en Spotify.';
    }
  });
};

const spotifyApiScript = document.createElement('script');
spotifyApiScript.src = 'https://open.spotify.com/embed/iframe-api/v1';
spotifyApiScript.async = true;
spotifyApiScript.onerror = () => {
  CONFIG.canciones.forEach((_, i) => {
    $('spotify-status-' + i).textContent = 'No se pudo conectar con Spotify. Puedes abrir la canción desde su enlace.';
  });
};
document.head.append(spotifyApiScript);

$('songs').addEventListener('click', e => {
  const b = e.target.closest('.disc'); if (!b) return;
  const card = b.closest('.song');
  const controller = spotifyControllers.get(card);
  if (!controller) return;
  if (!card.classList.contains('playing')) {
    const r = b.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 14);
  }
  controller.togglePlay();
});

/* ---------- Likes ---------- */
const ART = {
  bts: '<svg viewBox="0 0 120 110" aria-hidden="true"><path d="M60 100C10 62 6 28 32 16c14-6 24 2 28 12 4-10 14-18 28-12 26 12 22 46-28 84Z" fill="#B79CFF"/><ellipse cx="38" cy="34" rx="9" ry="6" transform="rotate(-35 38 34)" fill="#fff" opacity=".55"/><path d="M100 14c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9Z" fill="#FFB6CE"/><path d="M16 70c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z" fill="#FFB6CE"/></svg>',
  bow: '<svg viewBox="0 0 120 110" aria-hidden="true"><path d="M60 55C40 20 8 22 10 50c2 28 32 28 50 5Z" fill="#FF8FB5"/><path d="M60 55c20-35 52-33 50-5-2 28-32 28-50 5Z" fill="#FF8FB5"/><path d="M53 64 38 98l21-9Z" fill="#FF7AA6"/><path d="M67 64l15 34-21-9Z" fill="#FF7AA6"/><circle cx="60" cy="55" r="12" fill="#C93B78"/><circle cx="30" cy="45" r="3.5" fill="#fff" opacity=".85"/><circle cx="25" cy="58" r="3" fill="#fff" opacity=".85"/><circle cx="90" cy="45" r="3.5" fill="#fff" opacity=".85"/><circle cx="95" cy="58" r="3" fill="#fff" opacity=".85"/></svg>',
  sparkle: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 8C64 40 80 56 112 60 80 64 64 80 60 112 56 80 40 64 8 60 40 56 56 40 60 8Z" fill="#FF8FB5"/><path d="M96 12c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11Z" fill="#E9DDFF"/><path d="M22 86c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8Z" fill="#FFD3E2"/></svg>'
};
$('likes').innerHTML = CONFIG.gustos.map(g =>
  '<button class="flip" type="button" aria-label="Voltear tarjeta de ' + esc(g.titulo) + '"><span class="flip-in">'
  + '<span class="face front">' + (ART[g.id] || ART.sparkle) + '<h3>' + esc(g.titulo) + '</h3><small>' + esc(g.sub) + '</small></span>'
  + '<span class="face back"><span>' + esc(g.atras) + '</span></span>'
  + '</span></button>').join('');
$('likes').addEventListener('click', e => {
  const f = e.target.closest('.flip'); if (!f) return;
  f.classList.toggle('flipped');
  if (f.classList.contains('flipped')) { const r = f.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 16); }
});

/* ---------- Reasons ---------- */
$('reasons').innerHTML = CONFIG.razones.map((t, i) =>
  '<button class="tile" type="button" data-i="' + i + '"><svg aria-hidden="true"><use href="#i-heart"/></svg><span class="tap">toca</span><span class="why">' + esc(t) + '</span></button>').join('');
let found = 0;
$('reasons').addEventListener('click', e => {
  const t = e.target.closest('.tile'); if (!t || t.classList.contains('open')) return;
  t.classList.add('open'); found++;
  $('progress').textContent = found === CONFIG.razones.length
    ? 'Los descubriste todos, pero hay más'
    : found + ' de ' + CONFIG.razones.length + ' descubiertos';
  const r = t.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 18);
});

/* ---------- Final question ---------- */
const no = $('no'), area = $('answers'), yes = $('yes');
const noLabels = ['No', '¿Segura?', 'Piénsalo', 'Mejor di que sí', 'Ni lo intentes', 'Sí, mejor'];
let dodges = 0;
function dodge() {
  if (no.hidden) return;
  const c = area.getBoundingClientRect();
  if (!no.classList.contains('free')) {
    const r0 = no.getBoundingClientRect();
    no.style.left = (r0.left - c.left) + 'px';
    no.style.top = (r0.top - c.top) + 'px';
    no.classList.add('free');
    void no.offsetWidth;
  }
  const bw = no.offsetWidth, bh = no.offsetHeight, y = yes.getBoundingClientRect();
  let x = 0, t = 0;
  for (let i = 0; i < 14; i++) {
    x = Math.random() * Math.max(0, c.width - bw);
    t = Math.random() * Math.max(0, c.height - bh);
    const L = c.left + x, T = c.top + t;
    const hit = !(L + bw < y.left - 8 || L > y.right + 8 || T + bh < y.top - 8 || T > y.bottom + 8);
    if (!hit) break;
  }
  no.style.left = x + 'px';
  no.style.top = t + 'px';
  dodges++;
  no.textContent = noLabels[Math.min(dodges, noLabels.length - 1)];
}
['pointerenter', 'pointerdown', 'focus'].forEach(ev => no.addEventListener(ev, dodge));
no.addEventListener('click', e => { e.preventDefault(); dodge(); });
yes.addEventListener('click', () => {
  const r = yes.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 120);
  setTimeout(() => burst(innerWidth * .25, innerHeight * .5, 70), 250);
  setTimeout(() => burst(innerWidth * .75, innerHeight * .5, 70), 450);
  no.hidden = true;
  $('yesMsg').textContent = CONFIG.respuestaSi;
  $('yesMsg').hidden = false;
  yes.textContent = 'Sí, claro';
  area.style.minHeight = '0';
});

/* ---------- Hearts canvas ---------- */
const cv = $('fx'), cx = cv.getContext('2d');
let W = 0, H = 0;
function size() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', size); size();
const COLORS = ['#FF8FB5', '#FFB6CE', '#FFD3E2', '#E9DDFF', '#B79CFF', '#FFFFFF'];
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
function heartPath(s) {
  cx.beginPath();
  cx.moveTo(0, .4 * s - .7 * s);
  cx.bezierCurveTo(0, -.1 * s - .7 * s, -s, -.1 * s - .7 * s, -s, .45 * s - .7 * s);
  cx.bezierCurveTo(-s, 1.0 * s - .7 * s, -.2 * s, 1.2 * s - .7 * s, 0, 1.5 * s - .7 * s);
  cx.bezierCurveTo(.2 * s, 1.2 * s - .7 * s, s, 1.0 * s - .7 * s, s, .45 * s - .7 * s);
  cx.bezierCurveTo(s, -.1 * s - .7 * s, 0, -.1 * s - .7 * s, 0, .4 * s - .7 * s);
  cx.closePath();
}
function sparklePath(s) {
  cx.beginPath();
  cx.moveTo(0, -s); cx.quadraticCurveTo(.12 * s, -.12 * s, s, 0);
  cx.quadraticCurveTo(.12 * s, .12 * s, 0, s);
  cx.quadraticCurveTo(-.12 * s, .12 * s, -s, 0);
  cx.quadraticCurveTo(-.12 * s, -.12 * s, 0, -s);
  cx.closePath();
}
const parts = [];
function ambient(initial) {
  return {
    amb: true, x: rnd(0, W), y: initial ? rnd(0, H) : H + 30, s: rnd(5, 13),
    vy: -rnd(.18, .55), ph: rnd(0, 6.28), sw: rnd(.4, 1.1), r: rnd(-.4, .4),
    c: pick(COLORS.slice(0, 5)), a: rnd(.3, .65), k: Math.random() < .8 ? 'h' : 's'
  };
}
let started = false;
function boot() {
  if (reduce || started) return; started = true;
  const n = Math.max(14, Math.min(34, Math.round(innerWidth / 42)));
  for (let i = 0; i < n; i++) parts.push(ambient(true));
  requestAnimationFrame(loop);
}
function burst(x, y, n) {
  if (reduce) return;
  for (let i = 0; i < (n || 24); i++) {
    const a = rnd(0, 6.283), v = rnd(2, 7.5);
    parts.push({
      amb: false, x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, g: .13,
      s: rnd(5, 12), r: rnd(0, 6.28), vr: rnd(-.12, .12), c: pick(COLORS),
      a: 1, life: 0, max: rnd(70, 130), k: Math.random() < .7 ? 'h' : 's'
    });
  }
}
function loop() {
  cx.clearRect(0, 0, W, H);
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    if (p.amb) {
      p.y += p.vy; p.ph += .012;
      p.x += Math.sin(p.ph) * p.sw * .5;
      if (p.y < -30) { parts[i] = ambient(false); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(Math.sin(p.ph) * p.r);
      cx.globalAlpha = p.a;
    } else {
      p.life++; p.vy += p.g; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if (p.life > p.max) { parts.splice(i, 1); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.globalAlpha = Math.max(0, 1 - p.life / p.max);
    }
    cx.fillStyle = p.c;
    if (p.k === 'h') heartPath(p.s); else sparklePath(p.s * .9);
    cx.fill();
    cx.restore();
  }
  requestAnimationFrame(loop);
}
boot();

/* pointer sparkles */
let lastTrail = 0;
addEventListener('pointermove', e => {
  if (reduce || e.pointerType !== 'mouse') return;
  const t = performance.now(); if (t - lastTrail < 70) return; lastTrail = t;
  parts.push({ amb: false, x: e.clientX, y: e.clientY, vx: rnd(-.6, .6), vy: rnd(-1.2, -.2), g: .02,
    s: rnd(4, 7), r: rnd(0, 6.28), vr: .05, c: pick(COLORS), a: 1, life: 0, max: 40, k: Math.random() < .6 ? 'h' : 's' });
});
addEventListener('pointerdown', e => {
  if (e.target.closest('button,a')) return;
  burst(e.clientX, e.clientY, 8);
});
