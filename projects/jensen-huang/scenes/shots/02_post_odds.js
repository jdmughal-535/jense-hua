// shots/02_post_odds.js — reactions, Polymarket, Elon section (s014–s030)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake, seg, circle, ring, rr, poly, text, glow, alpha, shade, mix, linGrad, backdrop, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { rooftop, street } from '../sets/outdoor.js';
import { office } from '../sets/office.js';
import { JENSEN, ELON, MORRIS, CROWD } from '../cast.js';
import { rimOf, camPush, pop, fadeIn, fadeOut, fit, card, stamp, chip, speech, tag, voidBg, headline, tower, GYf, wt, fmtNum } from '../_h.js';
const FS = () => V(1.3, 1.5);
const GOLD = () => S().ui.gold;

// s014 — "Tech split in two."  a crack opens down the middle, two crowds drift apart
registerShot('s014', { draw(g, t, info) {
  const M = mood('night'), GY = GYf(), CX = E.W / 2, gap = ease.out(prog(t, 0.1, 0.9)) * V(110, 70);
  g.fillStyle = '#05060c'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  for (const side of [-1, 1]) {
    g.save(); g.beginPath(); g.rect(side < 0 ? -E.W : CX, -E.H, E.W + (side < 0 ? CX : E.W * 0.5), E.H * 3); g.clip(); g.translate(side * gap / 2, 0);
    const tint = side < 0 ? '#5a82ff' : '#ff8a4a'; backdrop(g, M.sky); glow(g, CX + side * 320, GY - 260, 700, tint, 0.2);
    FX.skyline(g, { x: -E.W, y: GY - 40, w: E.W * 3, minH: 100, maxH: V(380, 520), color: mix(M.sky[1], '#05060c', 0.6), windowColor: alpha(tint, 0.55), lit: 0.25, seed: 14 });
    g.fillStyle = linGrad(g, 0, GY, 0, E.H, [shade(M.floor, 0.1), '#07080f']); g.fillRect(-E.W, GY, E.W * 3, E.H);
    FX.crowd(g, t, { x: -E.W * 0.2, y: GY - 150, w: E.W * 1.6, rows: 6, rowH: 44, size: V(2.1, 2.3), color: side < 0 ? '#1a2a50' : '#3a2214', seed: 5 + side, cheer: 0.8, wave: side });
    g.restore();
  }
  const cr = ease.out(prog(t, 0.0, 0.25)); if (cr > 0) { const pts = []; for (let i = 0; i <= 14; i++) pts.push([CX + Math.sin(i * 2.7) * 14 * (1 - i / 20), (E.H * i) / 14]); seg(g, pts, 5 * (1 - 0.6 * ease.out(prog(t, 0.4, 1.0))), alpha('#ffffff', 0.9 * cr)); glow(g, CX, E.H / 2, 380, '#ffffff', 0.18 * (1 - prog(t, 0.6, 1.4))); }
  FX.dust(g, t, { count: 40, color: '#ffffff', a: 0.25 });
} });

// reusable speaker shot: spotlight, anonymous silhouette, name tag, bubble
function stage(g, t, info, o = {}) {
  const M = voidBg(g, t, { mood: 'night', gx: o.gx ?? E.W * 0.32, gy: E.H * 0.5, ga: 0.14, glow: o.glow || '#9fb6ff' }), GY = GYf(), x = o.x ?? E.W * V(0.3, 0.5);
  FX.lightCone(g, x, -40, { angle: Math.PI / 2, spread: 0.5, len: E.H * 1.1, color: '#cfe0ff', a: 0.2 }); g.fillStyle = linGrad(g, 0, GY, 0, E.H, ['#10131f', '#07080f']); g.fillRect(-E.W, GY, E.W * 3, E.H); FX.pool(g, x, GY + 30, 340, 46, '#cfe0ff', 0.28);
  drawFigure(g, { x, y: GY, s: V(1.5, 1.6), facing: 1, outfit: CROWD, pose: breathe(o.pose || POSES.explain, t, 1, 2), expr: o.expr || 'neutral', talk: o.talk ?? 0, rim: rimOf(M, [0, -1], 5), blink: (t % 3.2) > 3.1 });
  tag(g, o.name, x, GY + V(90, 80), { a: fadeIn(t, 0.15, 0.25) }); return { M, GY, x };
}
// s015 — "Tim Sweeney called it a sad day for 'all humanity.'"
registerShot('s015', { draw(g, t, info) {
  const { GY, x } = stage(g, t, info, { name: 'TIM SWEENEY', pose: posesAt(t, [[0, 'explain'], [0.8, 'shrug']]), expr: 'sad' });
  const k = pop(t, wt(info, t, 'sad', 0.8) - 0.1, 0.4); speech(g, x + V(560, 380), E.H * 0.3, V(760, 640), V(230, 260), ['A SAD DAY FOR', 'ALL HUMANITY'], { tx: x + 30, ty: GY - V(330, 370), k, a: clamp(k), size: V(52, 50) });
} });
// s016 — "Lex Fridman compared it to Apple firing Steve Jobs."
registerShot('s016', { draw(g, t, info) {
  const { M, GY, x } = stage(g, t, info, { name: 'LEX FRIDMAN', pose: POSES.explain, x: E.W * V(0.24, 0.5), expr: 'thinking' });
  const jx = lerp(E.W * 0.52, E.W * 0.86, ease.inOut(prog(t, wt(info, t, 'Steve', 1.8), info.dur - 0.2))), dx = E.W * V(0.9, 0.85);
  FX.door(g, { x: dx - 70, y: GY, w: 170, h: V(360, 380), color: '#14182a', open: 0.5, light: '#ffd59a' }); glow(g, dx, GY - 160, 340, '#ffd59a', 0.18);
  const ax = dx + 15, ay = GY - V(440, 460); circle(g, ax, ay, 40, '#e8e6ee'); circle(g, ax + 22, ay - 14, 14, '#0a0c16'); seg(g, [[ax + 2, ay - 40], [ax + 20, ay - 62]], 6, '#e8e6ee'); glow(g, ax, ay, 120, '#cfe0ff', 0.2);
  drawFigure(g, { x: jx, y: GY, s: V(1.35, 1.45), facing: 1, outfit: { top: 'tshirt', color: '#0f111a', face: 'glasses', head: 'none' }, pose: walkPose(t * Math.PI * 1.6), expr: 'neutral', rim: rimOf(M, [-1, -0.2], 5) });
  tag(g, 'APPLE FIRES STEVE JOBS', E.W * V(0.7, 0.5), E.H * V(0.18, 0.2), { a: fadeIn(t, 1.2, 0.3), color: '#ffc66e' });
} });
// s017 — "But investor Sarah Guo said it best:"
registerShot('s017', { draw(g, t, info) {
  const { GY, x } = stage(g, t, info, { name: 'SARAH GUO · INVESTOR', pose: posesAt(t, [[0, 'relaxed'], [0.9, 'explain']]), x: E.W * V(0.3, 0.5), expr: 'smile' });
  const k = pop(t, 0.7, 0.4); const bx = x + V(420, 300), by = E.H * 0.34; g.save(); g.globalAlpha *= clamp(k); g.translate(bx, by); g.scale(k, k); rr(g, -120, -60, 240, 120, 60); g.fillStyle = '#f4efe6'; g.fill(); poly(g, [[-70, 54], [-30, 54], [-110, 110]], '#f4efe6'); for (let i = 0; i < 3; i++) circle(g, -50 + i * 50, 0, 13 + 5 * Math.max(0, Math.sin(t * 6 - i * 0.8)), '#14161f'); g.restore();
} });
// s018 — "greatness doesn't guarantee goodness."
registerShot('s018', { draw(g, t, info) {
  voidBg(g, t, { glow: '#76b900', ga: 0.15 }); const cx = E.W / 2, ui = S().ui;
  const a = pop(t, wt(info, t, 'greatness', 0.2) - 0.05, 0.4), b = pop(t, wt(info, t, 'guarantee', 0.9), 0.3), c = pop(t, wt(info, t, 'goodness', 1.6) - 0.05, 0.4);
  const sz = V(150, 110), y0 = E.H * V(0.3, 0.3), y1 = E.H * 0.5, y2 = E.H * V(0.7, 0.7);
  g.save(); g.translate(cx, y0); g.scale(a, a); fit(g, 'GREATNESS', 0, 0, E.W * 0.86, sz, { color: ui.gold, glow: 36, glowColor: 'rgba(255,170,60,.7)', spacing: 5 }); g.restore();
  g.save(); g.translate(cx, y1); g.scale(b, b); text(g, '≠', 0, 0, { size: sz * 0.9, color: '#e8503a', font: FONTS.ui, weight: 900, glow: 24, glowColor: 'rgba(232,80,58,.8)' }); g.restore();
  g.save(); g.translate(cx, y2); g.scale(c, c); fit(g, 'GOODNESS', 0, 0, E.W * 0.86, sz, { color: '#8fe05a', glow: 36, glowColor: 'rgba(118,185,0,.8)', spacing: 5 }); g.restore();
  FX.lensStreak(g, cx, y1, E.W, '#ffffff', 0.12, 3);
} });

// s019 — "On Polymarket,"  odds board, bars slide in (no numbers yet)
registerShot('s019', { draw(g, t, info) {
  voidBg(g, t, { glow: '#9fb6ff', ga: 0.12 }); const cx = E.W / 2, w = V(1500, 940), h = V(760, 900), x0 = cx - w / 2, y0 = (E.H - h) / 2; card(g, x0, y0, w, h);
  text(g, 'POLYMARKET', x0 + 70, y0 + 80, { size: V(50, 50), color: '#9fb6ff', font: FONTS.ui, weight: 900, align: 'left', spacing: 4 }); text(g, 'WHERE WILL JENSEN LAND?', x0 + 72, y0 + 134, { size: V(30, 30), color: '#6f84a6', font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  [['ELON · SPACEX + XAI', 0.6, '#ff7a1a'], ['TSMC', 0.2, '#f2c21a'], ['AMD', 0.3, '#ed3a4a'], ['SOFTBANK', 0.35, '#3a8de0'], ['BACK TO NVIDIA', 0.5, '#76b900']].forEach(([n, v, c], i) => {
    const y = y0 + V(240, 270) + i * V(108, 128), p = ease.out(prog(t, 0.25 + i * 0.18, 0.9 + i * 0.18)); text(g, n, x0 + 70, y - 22, { size: V(32, 32), color: '#fff1dc', font: FONTS.ui, weight: 900, align: 'left' });
    rr(g, x0 + 70, y + 2, w - 140, 24, 12); g.fillStyle = alpha('#9fb6ff', 0.1); g.fill(); rr(g, x0 + 70, y + 2, Math.max(24, (w - 140) * v * p), 24, 12); g.fillStyle = c; g.fill(); glow(g, x0 + 70 + (w - 140) * v * p, y + 14, 50, c, 0.5 * p); });
} });

// s020 — "Elon's SpaceX and xAI started near 27%, then dropped to about 10."  falling chart
registerShot('s020', { draw(g, t, info) {
  voidBg(g, t, { glow: '#ff7a1a', ga: 0.1 }); const cx = E.W / 2, w = V(1300, 940), h = V(700, 760), x0 = cx - w / 2, y0 = (E.H - h) / 2, ui = S().ui;
  const kIn = ease.out(prog(t, 0, 0.35)); g.save(); g.globalAlpha *= kIn; card(g, x0, y0, w, h);
  text(g, 'ELON · SPACEX + XAI', x0 + 70, y0 + 92, { size: V(46, 46), color: ui.text, font: FONTS.ui, weight: 900, align: 'left' }); text(g, 'POLYMARKET ODDS', x0 + 72, y0 + 136, { size: 24, color: ui.sub, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  const t0 = wt(info, t, '27%', 0.6), t1 = wt(info, t, 'dropped', 2.4), p = ease.inOut(prog(t, t0, t1 + 1.4)), v = lerp(27, 10, p);
  text(g, Math.round(v) + '%', x0 + w - 150, y0 + 110, { size: V(96, 96), color: ui.accent, font: FONTS.ui, weight: 900, align: 'right', glow: 22, glowColor: alpha(ui.accent, 0.5) }); poly(g, [[x0 + w - 124, y0 + 92], [x0 + w - 70, y0 + 92], [x0 + w - 97, y0 + 128]], ui.accent);
  const ax = x0 + 110, bx = x0 + w - 110, ay = y0 + h * 0.4, by = y0 + h - 100; const yAt = (u) => lerp(ay, by, 1 - Math.pow(1 - u, 1.6) * 0 - (1 - u) * 0) ;
  const pt = (u) => [lerp(ax, bx, u), lerp(ay, by, ease.inOut(u) * 0.7 + u * 0.3)];
  for (let i = 0; i < 4; i++) { g.fillStyle = alpha(ui.text, 0.08); g.fillRect(x0 + 70, y0 + h * 0.36 + i * h * 0.14, w - 140, 2); }
  g.strokeStyle = ui.accent; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 100; i++) { const [x, y] = pt((i / 100) * p); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); const [hx, hy] = pt(p); glow(g, hx, hy, 70, ui.accent, 0.8);
  text(g, '27%', ax, ay - 40, { size: 36, color: '#ffd9c8', font: FONTS.ui, weight: 900 }); if (p > 0.97) text(g, '10%', bx, by - 40, { size: 36, color: '#ffd9c8', font: FONTS.ui, weight: 900 }); g.restore();
} });

// s021 — "Why?"  confused giant face
registerShot('s021', { draw(g, t, info) {
  const M = mood('night'); blurLayer(g, 14, (g) => street(g, t, { z: 1.5, x: -40, y: -80 }, { mood: 'night' })); veil(g, '#060814', 0.5);
  bigFace(g, E.W / 2, E.H * V(0.62, 0.58), V(320, 340) * (1 + 0.05 * t), { outfit: JENSEN, expr: 'confused', look: [0.2, -0.3], rimColor: M.rim, rimSide: -1, tilt: 0.06 });
  text(g, '?', E.W * 0.7, E.H * 0.28, { size: 200 * pop(t, 0.1, 0.3), color: GOLD(), font: FONTS.ui, weight: 900, glow: 30, glowColor: 'rgba(255,170,60,.8)' });
} });

// s022 — "Every name on that board is Nvidia's customer, supplier, or rival."  blueprint diagram
registerShot('s022', { draw(g, t, info) {
  UI.blueprint(g); const cx = E.W / 2, cy = E.H * 0.5, bp = UI.bpStroke(), ui = S().ui;
  const nodes = [['CUSTOMER', cx - V(520, 0), cy + V(10, -330), 'customer,', 0], ['SUPPLIER', cx + V(520, 0), cy - V(10, -330), 'supplier,', 1], ['RIVAL', cx + V(0, 0), cy + V(300, 520), 'rival.', 2]];
  nodes.forEach(([lab, x, y, w, i]) => { const tw = wt(info, t, w.replace(/[,.]/g, ''), 0.4 + i * 0.9), p = ease.out(prog(t, tw - 0.1, tw + 0.5)); if (p <= 0) return;
    seg(g, [[x, y], [lerp(x, cx, p * 0.72), lerp(y, cy, p * 0.72)]], 4, alpha(bp, 0.9)); ring(g, x, y, 78 * p, 5, bp); glow(g, x, y, 130, bp, 0.18 * p);
    if (i === 0) { UI.lineFigure(g, { x, y: y + 44, s: 0.55, color: '#e8f0ff' }); } else if (i === 1) { rr(g, x - 28, y - 28, 56, 56, 6); g.strokeStyle = '#e8f0ff'; g.lineWidth = 5; g.stroke(); seg(g, [[x - 28, y], [x + 28, y]], 4, '#e8f0ff'); } else { seg(g, [[x - 28, y - 28], [x + 28, y + 28]], 7, ui.accent); seg(g, [[x + 28, y - 28], [x - 28, y + 28]], 7, ui.accent); }
    text(g, lab, x, y + 118, { size: V(40, 42), color: ui.gold, font: FONTS.ui, weight: 900, spacing: 3, alpha: p }); });
  const kp = pop(t, 0.1, 0.45); g.save(); g.translate(cx, cy); g.scale(kp, kp); glow(g, 0, 0, 240, '#76b900', 0.35); circle(g, 0, 0, 104, '#0b1324'); ring(g, 0, 0, 104, 7, '#76b900'); chip(g, 0, -14, 1.5); text(g, 'NVIDIA', 0, 74, { size: 34, color: '#8fe05a', font: FONTS.ui, weight: 900, spacing: 3 }); g.restore();
} });

// s023 — "Elon first."
registerShot('s023', { draw(g, t, info) {
  const M = voidBg(g, t, { mood: 'night', glow: '#ff7a1a', ga: 0.22, gy: E.H * 0.6 }); FX.skyline(g, { x: -50, y: E.H, w: E.W + 100, minH: 140, maxH: V(420, 520), color: '#080a14', windowColor: alpha('#ff9a4a', 0.55), lit: 0.25, seed: 23 });
  headline(g, t, info.dur, 'ELON', { color: '#ff8a3a', y: E.H * 0.42, size: V(240, 180) }); FX.dust(g, t, { count: 40, color: '#ffb070' });
} });

// s024 — "Perfect on paper:"  handshake on the roof
registerShot('s024', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.05, 1.12, 0, 0); const { GY, CX, M } = rooftop(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => { const s = V(1.45, 1.55), hy = GY - 170 * s;
    drawFigure(g, { x: CX - 150, y: GY, s, facing: 1, outfit: ELON, pose: breathe(POSES.reach, t), expr: 'happy', rim: rimOf(M, [1, -0.3], 5) });
    drawFigure(g, { x: CX + 150, y: GY, s, facing: -1, outfit: JENSEN, pose: breathe(POSES.reach, t, 1, 3), expr: 'smile', rim: rimOf(M, [-1, -0.3], 5) });
    if (t > 0.5) { FX.sparkle(g, CX, hy, 26 + 6 * Math.sin(t * 8), '#ffd59a', 0.9); glow(g, CX, hy, 300, '#ffd59a', 0.16); } });
  FX.lensStreak(g, E.W / 2, E.H * 0.45, E.W * 1.3, '#ffd59a', 0.18);
} });

// s025 — "he wants his own chip factory."
registerShot('s025', { draw(g, t, info) {
  const M = mood('night'), GY = GYf(), CX = E.W / 2, cam = camPush(t, info.dur, 1.0, 1.08);
  layer(g, cam, 0.15, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 100, area: [0, 0, E.W, E.H * 0.5] }); }); layer(g, cam, 0.4, (g) => FX.skyline(g, { x: -E.W, y: GY, w: E.W * 3, minH: 80, maxH: 260, color: mix(M.sky[1], '#05060c', 0.6), windowColor: alpha(M.practical, 0.5), lit: 0.2, seed: 25 }));
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H, [shade(M.floor, 0.05), '#07080f']); g.fillRect(-E.W, GY, E.W * 3, E.H);
    const fx = CX + V(80, 0), fw = V(900, 720), fh = V(300, 340); g.fillStyle = '#10131f'; g.fillRect(fx - fw / 2, GY - fh, fw, fh); g.beginPath(); for (let i = 0; i < 5; i++) { const x = fx - fw / 2 + i * fw / 5; g.moveTo(x, GY - fh); g.lineTo(x, GY - fh - 70); g.lineTo(x + fw / 5, GY - fh); } g.fillStyle = '#10131f'; g.fill();
    for (const sx of [-0.3, 0.2, 0.36]) { const x = fx + sx * fw; g.fillStyle = '#0c0f1a'; g.fillRect(x - 26, GY - fh - 230, 52, 230); for (let k = 0; k < 6; k++) circle(g, x + Math.sin(t * 0.8 + k) * 14 + k * 10, GY - fh - 250 - ((t * 40 + k * 60) % 380), 24 + k * 6, alpha('#9fb0d8', 0.12 - k * 0.015)); }
    for (let i = 0; i < 7; i++) { g.fillStyle = alpha('#ffd59a', 0.55 + 0.2 * Math.sin(t * 3 + i)); g.fillRect(fx - fw / 2 + 40 + i * (fw - 80) / 7, GY - fh * 0.6, 50, 70); }
    glow(g, fx, GY - fh * 0.5, 560, '#ffd59a', 0.12); drawFigure(g, { x: CX - V(700, 280), y: GY + 30, s: V(1.2, 1.3), facing: 1, outfit: ELON, pose: breathe(POSES.stand, t), expr: 'smirk', rim: rimOf(M, [1, -0.3], 5) }); });
  const cyy = E.H * 0.2 + 10 * Math.sin(t * 2); glow(g, CX + V(80, 0), cyy, 280, '#76b900', 0.3 * pop(t, 0.3)); chip(g, CX + V(80, 0), cyy, 2.4 * pop(t, 0.3));
} });

// s026 — "But Jensen still owns over 800 million Nvidia shares."
registerShot('s026', { draw(g, t, info) {
  const M = voidBg(g, t, { mood: 'night', glow: '#76b900', ga: 0.2, gx: E.W * 0.65, gy: E.H * 0.6 }), GY = GYf(), CX = E.W / 2, cam = camPush(t, info.dur, 1.0, 1.05);
  g.fillStyle = linGrad(g, 0, GY, 0, E.H, ['#10131f', '#07080f']); g.fillRect(-E.W, GY, E.W * 3, E.H);
  layer(g, cam, 1, (g) => { const rows = 7; for (let r = 0; r < rows; r++) for (let c = 0; c <= rows - 1 - r; c++) { const k = pop(t, 0.1 + r * 0.06 + c * 0.02, 0.3); if (k <= 0) continue; chip(g, CX + V(380, 150) + (c - (rows - 1 - r) / 2) * 92, GY - 40 - r * 78, 1.1 * k, '#76b900', 0.95); }
    drawFigure(g, { x: CX - V(260, 120), y: GY, s: V(1.45, 1.55), facing: 1, outfit: JENSEN, pose: breathe(POSES.relaxed, t), expr: 'smirk', rim: rimOf(M, [1, -0.3], 5), blink: (t % 3.0) > 2.9 }); });
  const tw = wt(info, t, '800', 0.7), n = lerp(0, 800, ease.out(prog(t, tw, tw + 1.1)));
  UI.readout(g, { label: 'NVIDIA SHARES', value: fmtNum(n) + 'M+', x: E.W / 2, y: V(150, 190), align: 'center', size: V(100, 90), a: fadeIn(t, tw - 0.1, 0.25) });
} });

// s027 — "Every chip he helps Elon build is one Nvidia doesn't sell."  conveyor, last chip crossed out
registerShot('s027', { draw(g, t, info) {
  voidBg(g, t, { glow: '#ff7a1a', ga: 0.1 }); const GY = GYf(), by = E.H * V(0.58, 0.55), ts = wt(info, t, 'sell', 3.2);
  rr(g, -40, by, E.W + 80, 38, 10); g.fillStyle = '#1a2036'; g.fill(); for (let i = -2; i < 40; i++) { const x = ((i * 70 + t * 150) % (E.W + 140)); g.fillStyle = alpha('#9fb6ff', 0.18); g.fillRect(x, by + 6, 6, 26); }
  rr(g, E.W * 0.04, by - 330, 380, 330, 14); g.fillStyle = '#10131f'; g.fill(); text(g, 'ELON FAB', E.W * 0.04 + 190, by - 250, { size: 56, color: '#ff8a3a', font: FONTS.ui, weight: 900, spacing: 3 });
  for (let i = 0; i < 9; i++) { const x = E.W * 0.27 + (((i * 230 + t * 230) % (E.W * 0.72))), isLast = x > E.W * 0.58 && x < E.W * 0.7 && t > ts - 0.2; chip(g, x, by - 50, 1.5, isLast ? '#e8503a' : '#76b900', isLast ? 0.45 : 1); if (isLast) { seg(g, [[x - 54, by - 104], [x + 54, by + 4]], 10, '#e8503a'); seg(g, [[x + 54, by - 104], [x - 54, by + 4]], 10, '#e8503a'); } }
  const mk = pop(t, ts, 0.3); text(g, '−1', E.W * 0.64, by - 190 - 40 * ease.out(prog(t, ts, ts + 1.2)), { size: 150 * mk, color: '#e8503a', font: FONTS.ui, weight: 900, glow: 28, glowColor: 'rgba(232,80,58,.8)', alpha: clamp(mk) });
  text(g, 'NVIDIA SALE LOST', E.W * 0.64, by + 120, { size: 36, color: '#9fb6d8', font: FONTS.ui, weight: 900, spacing: 3, alpha: fadeIn(t, ts + 0.3, 0.3) });
} });

// s028 — "And two men who always need the final word?"  face-off
registerShot('s028', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.1); const { GY, CX, M } = rooftop(g, t, cam, { mood: 'night' }); const s = V(1.5, 1.55);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - 230, y: GY, s, facing: 1, outfit: ELON, pose: breathe(posesAt(t, [[0, 'talk'], [0.5, 'point']]), t), expr: 'angry', talk: 0.8, rim: { color: '#ffb070', dir: [1, -0.2], w: 5 } });
    drawFigure(g, { x: CX + 230, y: GY, s, facing: -1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'talk'], [0.7, 'point']]), t, 1, 3), expr: 'angry', talk: 0.8, rim: { color: '#9fe05a', dir: [-1, -0.2], w: 5 } });
    const k1 = pop(t, 0.5, 0.3), k2 = pop(t, 1.0, 0.3); speech(g, CX - 330, GY - V(560, 600), 360, 130, 'MY WAY!', { tx: CX - 250, ty: GY - V(420, 450), k: k1, a: clamp(k1), size: 56 }); speech(g, CX + 330, GY - V(660, 700), 360, 130, 'MY WAY!', { tx: CX + 250, ty: GY - V(420, 450), k: k2, a: clamp(k2), size: 56 }); });
  FX.speedLines(g, t, { cx: E.W / 2, cy: E.H * 0.5, count: 30, a: 0.12 });
} });

// s029 — "Same building? Same company?"  squeezing through one door, then one sign with two names
registerShot('s029', { draw(g, t, info) {
  const M = mood('interiorCool'), GY = GYf(), CX = E.W / 2, sw = wt(info, t, 'company?', 1.1) - 0.05;
  if (t < sw) { backdrop(g, M.sky); g.fillStyle = linGrad(g, 0, 0, 0, E.H, [shade(M.wall, -0.1), shade(M.wall, -0.4)]); g.fillRect(0, 0, E.W, E.H); g.fillStyle = linGrad(g, 0, GY, 0, E.H, [M.floor, M.dark]); g.fillRect(0, GY, E.W, E.H);
    const dw = V(260, 240), dh = V(560, 600); g.fillStyle = '#05060c'; g.fillRect(CX - dw / 2, GY - dh, dw, dh); glow(g, CX, GY - dh / 2, 400, '#ffd59a', 0.2); g.strokeStyle = shade(M.wall, 0.2); g.lineWidth = 14; g.strokeRect(CX - dw / 2, GY - dh, dw, dh);
    const jig = Math.sin(t * 28) * 6 * clamp(t / 0.3), s = V(1.8, 1.8);
    drawFigure(g, { x: CX - 70 + jig, y: GY, s, facing: 1, outfit: ELON, pose: POSES.cheer, expr: 'worried', rim: rimOf(M, [0, -1]) }); drawFigure(g, { x: CX + 70 - jig, y: GY, s, facing: -1, outfit: JENSEN, pose: POSES.cheer, expr: 'worried', rim: rimOf(M, [0, -1]) });
    text(g, 'SAME BUILDING?', CX, E.H * 0.16, { size: V(78, 70), color: GOLD(), font: FONTS.ui, weight: 900, spacing: 4, alpha: fadeIn(t, 0.1, 0.2), glow: 20, glowColor: 'rgba(255,170,60,.7)' });
  } else { const u = t - sw; backdrop(g, M.sky); g.fillStyle = shade(M.wall, -0.25); g.fillRect(0, 0, E.W, E.H); const k = pop(u, 0, 0.35), w = V(900, 820), h = V(420, 480);
    g.save(); g.translate(CX, E.H * 0.5); g.scale(k, k); card(g, -w / 2, -h / 2, w, h, { fill: '#0f1424' }); text(g, 'CEO', 0, -h * 0.28, { size: V(120, 110), color: GOLD(), font: FONTS.ui, weight: 900, spacing: 8, glow: 24, glowColor: 'rgba(255,170,60,.6)' });
    text(g, 'ELON', -w * 0.2 + Math.sin(u * 12) * 5, h * 0.14, { size: V(64, 58), color: '#ff8a3a', font: FONTS.ui, weight: 900 }); text(g, 'JENSEN', w * 0.2 - Math.sin(u * 12) * 5, h * 0.14, { size: V(64, 58), color: '#8fe05a', font: FONTS.ui, weight: 900 });
    text(g, 'ONE DOOR · TWO NAMES', 0, h * 0.34, { size: 28, color: '#6f84a6', font: FONTS.ui, weight: 900, spacing: 3 }); g.restore(); }
} });

// s030 — "Next, TSMC."
registerShot('s030', { draw(g, t, info) {
  voidBg(g, t, { mood: 'night', glow: '#f2c21a', ga: 0.2, gy: E.H * 0.62 }); const GY = GYf();
  g.fillStyle = '#080a14'; g.fillRect(0, GY - 20, E.W, E.H); for (let i = 0; i < 6; i++) { g.fillStyle = '#0c0f1a'; g.fillRect(E.W * (0.05 + i * 0.16), GY - 220 - (i % 3) * 60, E.W * 0.13, 220 + (i % 3) * 60 + 20); for (let k = 0; k < 4; k++) { g.fillStyle = alpha('#f2c21a', 0.5); g.fillRect(E.W * (0.06 + i * 0.16) + k * 36, GY - 160 - (i % 3) * 60, 18, 28); } }
  headline(g, t, info.dur, 'TSMC', { color: '#f2c21a', y: E.H * 0.38, size: V(240, 180) });
  drawFigure(g, { x: E.W * V(0.78, 0.7), y: GY + 40, s: V(1.3, 1.4), facing: -1, outfit: MORRIS, pose: breathe(POSES.relaxed, t), expr: 'smile', rim: rimOf(mood('night'), [-1, -0.3], 5) });
} });
