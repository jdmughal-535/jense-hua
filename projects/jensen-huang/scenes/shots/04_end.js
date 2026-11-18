// shots/04_end.js — rejoin odds, spy question, why you care, closing gag (s047–s069)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake, noise, seg, circle, ring, rr, poly, text, glow, alpha, shade, mix, linGrad, backdrop, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { rooftop, street } from '../sets/outdoor.js';
import { office, desk } from '../sets/office.js';
import { hearing } from '../sets/rooms.js';
import { JENSEN, ELON, BOARD, CROWD, SPY, REPORTER, YOU } from '../cast.js';
import { rimOf, camPush, pop, fadeIn, fadeOut, fit, card, stamp, chip, speech, tag, voidBg, headline, tower, GYf, wt, fmtNum } from '../_h.js';
const FS = () => V(1.3, 1.5);
const GOLD = () => S().ui.gold;

// a horizontal odds bar row inside a card
function oddsBar(g, x, y, w, label, pct, p, color, o = {}) {
  text(g, label, x, y - 26, { size: V(34, 34), color: '#fff1dc', font: FONTS.ui, weight: 900, align: 'left' }); text(g, Math.round(pct * p) + '%', x + w, y - 26, { size: V(54, 54), color, font: FONTS.ui, weight: 900, align: 'right', glow: 18, glowColor: alpha(color, 0.5) });
  rr(g, x, y, w, 36, 18); g.fillStyle = alpha('#9fb6ff', 0.12); g.fill(); const fw = Math.max(36, w * (pct / 100) * p * (o.scale ?? 2.4)); rr(g, x, y, Math.min(w, fw), 36, 18); g.fillStyle = color; g.fill(); glow(g, x + Math.min(w, fw), y + 18, 70, color, 0.5 * p);
}
function rejoinCard(g, t, info, rows) {
  voidBg(g, t, { glow: '#76b900', ga: 0.12 }); const cx = E.W / 2, w = V(1300, 940), h = V(640, 700), x0 = cx - w / 2, y0 = (E.H - h) / 2; card(g, x0, y0, w, h);
  text(g, 'REJOIN NVIDIA', x0 + 70, y0 + 86, { size: V(50, 50), color: '#8fe05a', font: FONTS.ui, weight: 900, align: 'left', spacing: 3 }); text(g, 'POLYMARKET ODDS', x0 + 72, y0 + 130, { size: 24, color: S().ui.sub, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  rows.forEach((r, i) => oddsBar(g, x0 + 70, y0 + V(290, 310) + i * V(150, 170), w - 140, r.label, r.pct, r.p, r.color));
}
// s047 — "Seven percent by year-end."
registerShot('s047', { draw(g, t, info) { const tw = wt(info, t, 'Seven', 0.3); rejoinCard(g, t, info, [{ label: 'BY YEAR-END', pct: 7, p: ease.out(prog(t, tw, tw + 0.9)), color: '#76b900' }]); } });
// s048 — "Thirty-one percent by the end of next year."
registerShot('s048', { draw(g, t, info) { const tw = wt(info, t, 'Thirty-one', 0.3); rejoinCard(g, t, info, [{ label: 'BY YEAR-END', pct: 7, p: 1, color: '#76b900' }, { label: 'BY END OF NEXT YEAR', pct: 31, p: ease.out(prog(t, tw, tw + 1.1)), color: '#8fe05a' }]); } });
// s049 — "That's higher than every rival."
registerShot('s049', { draw(g, t, info) {
  voidBg(g, t, { glow: '#76b900', ga: 0.14 }); const cx = E.W / 2, base = E.H * V(0.78, 0.76), maxH = E.H * V(0.5, 0.46);
  [['REJOIN NVIDIA', 31, '#76b900'], ['ELON', 10, '#ff7a1a'], ['TSMC', 5, '#f2c21a']].forEach(([lab, v, c], i) => { const x = cx + (i - 1) * V(420, 300), p = ease.out(prog(t, 0.1 + i * 0.25, 0.9 + i * 0.25)), h = maxH * (v / 31) * p, bw = V(240, 200);
    rr(g, x - bw / 2, base - h, bw, h, 14); g.fillStyle = c; g.fill(); glow(g, x, base - h, 160, c, 0.35 * p); text(g, Math.round(v * p) + '%', x, base - h - 52, { size: V(84, 76), color: c, font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(c, 0.5) }); fit(g, lab, x, base + 48, bw + 60, V(34, 34), { color: '#fff1dc', font: FONTS.ui, weight: 900 }); });
  seg(g, [[cx - V(700, 480), base + 6], [cx + V(700, 480), base + 6]], 4, alpha('#9fb6ff', 0.4));
} });

// s050 — "The reason is the spy question."
registerShot('s050', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.09); const { GY, CX, M } = street(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX + V(40, 0), y: GY + 10, s: V(1.5, 1.6), facing: 1, outfit: SPY, pose: breathe(posesAt(t, [[0, 'stand'], [0.8, 'crossArms']]), t), expr: 'neutral', rim: { color: M.rim, dir: [-1, -0.5], w: 5 } }); });
  g.fillStyle = linGrad(g, 0, 0, E.W, 0, [alpha('#02030a', 0.78), alpha('#02030a', 0)]); g.fillRect(0, 0, E.W, E.H); FX.rain(g, t, { count: 180, a: 0.2 });
  text(g, '?', E.W * 0.62 + 20 * Math.sin(t * 1.3), E.H * 0.3, { size: 240 * pop(t, 0.4, 0.5), color: GOLD(), font: FONTS.ui, weight: 900, glow: 40, glowColor: 'rgba(255,170,60,.8)' });
} });

// s051 — "Trump said:"  podium + quote
registerShot('s051', { draw(g, t, info) {
  const M = voidBg(g, t, { mood: 'night', glow: '#9fb6ff', ga: 0.12, gx: E.W * 0.3 }), GY = GYf(), px = E.W * V(0.27, 0.5);
  FX.lightCone(g, px, -40, { angle: Math.PI / 2, spread: 0.45, len: E.H * 1.1, color: '#cfe0ff', a: 0.2 }); g.fillStyle = linGrad(g, 0, GY, 0, E.H, ['#10131f', '#07080f']); g.fillRect(-E.W, GY, E.W * 3, E.H);
  rr(g, px - 110, GY - 330, 220, 330, 10); g.fillStyle = '#161a2c'; g.fill(); g.fillStyle = alpha('#9fb6ff', 0.25); g.fillRect(px - 110, GY - 330, 220, 6); seg(g, [[px - 30, GY - 330], [px - 30, GY - 410]], 6, '#0c0f1a'); seg(g, [[px + 30, GY - 330], [px + 30, GY - 400]], 6, '#0c0f1a'); circle(g, px - 30, GY - 414, 12, '#0c0f1a'); circle(g, px + 30, GY - 404, 12, '#0c0f1a');
  const w = V(1000, 860), h = V(380, 420), qx = E.W * V(0.7, 0.5), qy = E.H * V(0.42, 0.28), k = pop(t, 0.35, 0.4); g.save(); g.globalAlpha *= clamp(k); g.translate(qx, qy); g.scale(k, k); card(g, -w / 2, -h / 2, w, h, { fill: '#0f1424' });
  text(g, 'TRUMP', -w / 2 + 60, -h / 2 + 62, { size: 34, color: '#9fb6ff', font: FONTS.ui, weight: 900, align: 'left', spacing: 4 }); const ws = [['“IF SHE WAS A SPY,', 'she'], ['HE WAS RIGHT TO GO.”', 'right']];
  ws.forEach(([s, w0], i) => { const a = fadeIn(t, wt(info, t, w0, 1.0 + i * 1.5) - (i ? 0.7 : 0.1), 0.3); fit(g, s, 0, -10 + i * 86, w - 100, V(64, 58), { color: '#fff1dc', font: FONTS.ui, weight: 900, alpha: a }); }); g.restore();
} });

// s052 — "If not,"  fork in the road + second quote
registerShot('s052', { draw(g, t, info) {
  const M = voidBg(g, t, { mood: 'night', glow: '#ffc66e', ga: 0.12, gy: E.H * 0.7 }), GY = E.H * 0.8, cx = E.W / 2;
  g.fillStyle = '#0a0d18'; g.fillRect(0, E.H * 0.55, E.W, E.H); poly(g, [[cx - 80, E.H], [cx + 80, E.H], [cx + 24, E.H * 0.58], [cx - 24, E.H * 0.58]], '#161b2e');
  const f = ease.out(prog(t, 0.1, 1.1)); poly(g, [[cx - 24, E.H * 0.58], [cx + 24, E.H * 0.58], [cx + 24 + 640 * f, E.H * 0.5], [cx + 560 * f, E.H * 0.52]], '#161b2e'); poly(g, [[cx - 24, E.H * 0.58], [cx + 24, E.H * 0.58], [cx - 560 * f, E.H * 0.52], [cx - 24 - 640 * f, E.H * 0.5]], '#161b2e');
  FX.lampPost(g, cx + 130, E.H * 0.9, 380, { light: '#ffd59a', a: 0.22 }); drawFigure(g, { x: cx - 20, y: E.H * 0.92, s: V(0.9, 1.1), facing: 1, outfit: JENSEN, pose: breathe(POSES.stand, t), expr: 'thinking', rim: rimOf(mood('night'), [1, -0.3], 4) });
  const k = pop(t, 0.5, 0.4); g.save(); g.translate(cx, E.H * V(0.2, 0.22)); g.scale(k, k); g.globalAlpha *= clamp(k); fit(g, '“PERHAPS IT WOULD BE DIFFERENT.”', 0, 0, E.W * 0.86, V(76, 64), { color: GOLD(), font: FONTS.ui, weight: 900, glow: 24, glowColor: 'rgba(255,170,60,.6)' }); g.restore();
} });

// s053 — "Nothing has been proven, China denies it,"
registerShot('s053', { draw(g, t, info) {
  const sw = wt(info, t, 'China', 1.6) - 0.1; voidBg(g, t, { glow: '#9fb6ff', ga: 0.1 }); const cx = E.W / 2, cy = E.H * 0.5, ui = S().ui;
  if (t < sw) { const w = V(1300, 940), h = V(560, 640); card(g, cx - w / 2, cy - h / 2, w, h); text(g, 'EVIDENCE BOARD', cx - w / 2 + 70, cy - h / 2 + 80, { size: 36, color: ui.sub, font: FONTS.ui, weight: 900, align: 'left', spacing: 4 });
    for (let i = 0; i < 4; i++) { const k = pop(t, 0.1 + i * 0.12, 0.3), x = cx - w / 2 + 90 + i * (w - 180) / 4 + (w - 180) / 8, y = cy + 20; g.save(); g.translate(x, y); g.scale(k, k); rr(g, -70, -90, 140, 180, 8); g.strokeStyle = alpha('#9fb6ff', 0.5); g.lineWidth = 3; g.setLineDash([10, 8]); g.stroke(); g.setLineDash([]); text(g, '?', 0, 6, { size: 72, color: alpha('#9fb6ff', 0.5), font: FONTS.ui, weight: 900 }); circle(g, 0, -90, 7, '#e8503a'); g.restore(); }
    stamp(g, 'NOTHING PROVEN', cx, cy + h * 0.32, { k: lerp(2.4, 1, ease.out(prog(t, 0.5, 0.7))), a: prog(t, 0.5, 0.6), size: V(66, 56), rot: -0.06 });
  } else { const u = t - sw, k = pop(u, 0, 0.35);
    drawFigure(g, { x: E.W * V(0.3, 0.5), y: E.H * V(0.86, 0.9), s: V(1.7, 1.7), facing: 1, outfit: CROWD, pose: breathe(POSES.crossArms, t), expr: 'neutral', rim: rimOf(mood('night'), [0, -1], 5) });
    g.save(); g.translate(E.W * V(0.68, 0.5), E.H * V(0.4, 0.32)); g.scale(k, k); seg(g, [[-120, -120], [120, 120]], 36, '#e8503a'); seg(g, [[120, -120], [-120, 120]], 36, '#e8503a'); glow(g, 0, 0, 340, '#e8503a', 0.25); g.restore();
    text(g, 'CHINA DENIES IT', E.W * V(0.68, 0.5), E.H * V(0.72, 0.64), { size: V(80, 66), color: '#fff1dc', font: FONTS.ui, weight: 900, spacing: 3, alpha: fadeIn(u, 0.15, 0.3) }); }
} });

// s054 — "and Jensen has admitted the affair and apologized."
registerShot('s054', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.14, 0, 0, 0, -20); const { GY, CX, M } = street(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => drawFigure(g, { x: CX, y: GY + 10, s: V(1.55, 1.65), facing: 1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'stand'], [1.2, 'sad']]), t, 0.6), expr: 'sad', look: [0.3, 0.8], rim: rimOf(M, [-1, -0.4], 5) }));
  FX.rain(g, t, { count: 340, a: 0.32 }); FX.fog(g, GY - 100, 220, M.fog, 0.16);
} });

// s055 — "Why should you care?"
registerShot('s055', { draw(g, t, info) {
  const M = voidBg(g, t, { mood: 'night', glow: '#2aa6a0', ga: 0.16 });
  bigFace(g, E.W / 2, E.H * V(0.64, 0.6), V(320, 340) * (1 + 0.05 * t), { outfit: YOU, expr: 'surprised', look: [0, -0.2], blink: (t % 2.7) > 2.6, rimColor: M.rim, rimSide: -1 });
  const k = pop(t, 0.15, 0.4); g.save(); g.translate(E.W / 2, E.H * V(0.2, 0.2)); g.scale(k, k); text(g, 'WHY CARE?', 0, 0, { size: V(120, 100), color: GOLD(), font: FONTS.ui, weight: 900, glow: 34, glowColor: 'rgba(255,170,60,.7)', spacing: 4 }); g.restore();
} });

// s056 — "If you own an S&P 500 fund,"
registerShot('s056', { draw(g, t, info) {
  voidBg(g, t, { glow: '#5fd39a', ga: 0.1 }); const cx = E.W / 2, w = V(1400, 940), h = V(680, 740), x0 = cx - w / 2, y0 = (E.H - h) / 2, ui = S().ui; card(g, x0, y0, w, h);
  text(g, 'S&P 500 FUND', x0 + 70, y0 + 90, { size: V(50, 50), color: ui.good, font: FONTS.ui, weight: 900, align: 'left', spacing: 3 }); text(g, 'YOUR RETIREMENT ACCOUNT', x0 + 72, y0 + 134, { size: 24, color: ui.sub, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  const p = ease.inOut(prog(t, 0.3, info.dur - 0.2)), ax = x0 + 100, bx = x0 + w - 100, ay = y0 + h - 100, by = y0 + h * 0.3; const pt = (u) => [lerp(ax, bx, u), lerp(ay, by, u) + noise(u * 14, 3) * 26 * (1 - u * 0.3) - Math.sin(u * 9) * 10];
  g.strokeStyle = ui.good; g.lineWidth = 7; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); for (let i = 0; i <= 120; i++) { const [x, y] = pt((i / 120) * p); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); const [hx, hy] = pt(p); glow(g, hx, hy, 80, ui.good, 0.7);
} });

// s057 — "a big slice of it is Nvidia."  pie chart
registerShot('s057', { draw(g, t, info) {
  voidBg(g, t, { glow: '#76b900', ga: 0.14 }); const cx = E.W / 2, cy = E.H * 0.5, R = V(300, 320), p = ease.out(prog(t, 0.3, 1.5)), a0 = -Math.PI / 2, big = Math.PI * 2 * 0.3 * p;
  const rest = ['#3a4a78', '#2f3d66', '#4a5a8a', '#27345a', '#566698']; let a = a0 + big; rest.forEach((c, i) => { const sw = (Math.PI * 2 - big) / 5; g.fillStyle = c; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, a, a + sw - 0.02); g.closePath(); g.fill(); a += sw; });
  const mx = Math.cos(a0 + big / 2) * 30, my = Math.sin(a0 + big / 2) * 30; g.fillStyle = '#76b900'; g.beginPath(); g.moveTo(cx + mx, cy + my); g.arc(cx + mx, cy + my, R, a0, a0 + big); g.closePath(); g.fill(); glow(g, cx + mx, cy + my, R * 1.4, '#76b900', 0.25 * p);
  const lx = cx + Math.cos(a0 + big / 2) * (R + 150), ly = cy + Math.sin(a0 + big / 2) * (R + 90); text(g, 'NVIDIA', lx, ly, { size: V(64, 56), color: '#8fe05a', font: FONTS.ui, weight: 900, spacing: 3, alpha: fadeIn(t, 1.0, 0.3), glow: 20, glowColor: 'rgba(118,185,0,.6)' });
  text(g, 'YOUR FUND', cx, cy + R + V(110, 100), { size: 34, color: '#9fb6d8', font: FONTS.ui, weight: 900, spacing: 4 });
} });

// s058 — "This is your retirement."  porch at sunset
registerShot('s058', { draw(g, t, info) {
  const M = mood('golden'), GY = E.H * V(0.78, 0.7), CX = E.W / 2, cam = camPush(t, info.dur, 1.0, 1.06);
  layer(g, cam, 0.15, (g) => { backdrop(g, M.sky); FX.sun(g, CX + 380, GY - V(260, 380), 70, '#fff3dc', M.key, 5); FX.clouds(g, { y: GY - 560, h: 160, color: '#ffe7c7', a: 0.16 }); }); layer(g, cam, 0.35, (g) => FX.hills(g, { y: GY - 60, amp: 90, color: '#4a3652', seed: 4 }));
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H, ['#4a3030', '#241418']); g.fillRect(-E.W, GY, E.W * 3, E.H); FX.floorLines(g, GY, GY + 500, 'rgba(0,0,0,.3)', 0.08); });
  layer(g, cam, 1, (g) => { FX.chair(g, CX - 120, GY, 1.3, '#2a1a1e'); drawFigure(g, { x: CX - 120, y: GY - 6, s: V(1.45, 1.5), facing: 1, outfit: YOU, pose: breathe(POSES.sitBack, t), expr: 'smile', rim: rimOf(M, [1, -0.2], 5), shadow: false }); });
  const k = pop(t, 0.6, 0.5); glow(g, CX + 300, GY - 440, 260 * k, '#76b900', 0.35); chip(g, CX + 300, GY - 440 + 10 * Math.sin(t * 2), 1.6 * k, '#76b900'); FX.dust(g, t, { count: 40, color: '#ffe2bd', a: 0.3 });
} });

// s059 — "Watch two dates:"
registerShot('s059', { draw(g, t, info) {
  voidBg(g, t, { glow: '#ffc66e', ga: 0.14 }); const cx = E.W / 2, cy = E.H * 0.56;
  [[-1, '?', 'EARNINGS'], [1, 'DEC 1', 'CONGRESS']].forEach(([s, big, sub], i) => { const k = pop(t, 0.3 + i * 0.4, 0.4); g.save(); g.translate(cx + s * V(380, 250), cy); g.scale(k, k); rr(g, -230, -250, 460, 500, 24); g.fillStyle = '#efe9da'; g.fill(); g.fillStyle = '#e8503a'; rr(g, -230, -250, 460, 110, 24); g.fill(); g.fillRect(-230, -200, 460, 60); text(g, sub, 0, -194, { size: 42, color: '#fff', font: FONTS.ui, weight: 900, spacing: 5 }); text(g, big, 0, 40, { size: big.length > 2 ? 110 : 220, color: '#14161f', font: FONTS.ui, weight: 900 }); g.restore(); });
  headline(g, t, info.dur, 'WATCH 2 DATES', { y: E.H * V(0.18, 0.18), size: V(100, 84) });
} });

// s060 — "Nvidia's first earnings without him,"  empty chair at the earnings call
registerShot('s060', { draw(g, t, info) {
  const M = voidBg(g, t, { glow: '#76b900', ga: 0.12 }), GY = GYf(), cx = E.W / 2, ui = S().ui, w = V(900, 880), h = V(560, 520), x0 = cx - V(260, 0) - w / 2, y0 = E.H * V(0.14, 0.12); card(g, x0, y0, w, h);
  text(g, 'NVIDIA · EARNINGS', x0 + 60, y0 + 78, { size: 40, color: '#8fe05a', font: FONTS.ui, weight: 900, align: 'left', spacing: 3 }); text(g, 'FIRST REPORT WITHOUT HIM', x0 + 62, y0 + 122, { size: 24, color: ui.sub, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  for (let i = 0; i < 6; i++) { const p = ease.out(prog(t, 0.3 + i * 0.1, 1.0 + i * 0.1)), bh = (60 + 38 * i + (i % 2) * 24) * p; rr(g, x0 + 80 + i * (w - 160) / 6, y0 + h - 60 - bh, (w - 160) / 6 - 24, bh, 8); g.fillStyle = '#76b900'; g.fill(); }
  g.fillStyle = linGrad(g, 0, GY, 0, E.H, ['#10131f', '#07080f']); g.fillRect(-E.W, GY, E.W * 3, E.H); const chx = x0 + w + V(180, 0) - (E.vertical ? 380 : 0);
  FX.chair(g, E.vertical ? cx : chx, GY, 1.5, '#1a2036'); glow(g, E.vertical ? cx : chx, GY - 120, 300, '#76b900', 0.1); tag(g, 'JENSEN', E.vertical ? cx : chx, GY + 70, { color: '#8fe05a' }); const ak = fadeIn(t, 1.0, 0.3); if (ak > 0) { const ex = E.vertical ? cx : chx; seg(g, [[ex - 60, GY - 250], [ex + 60, GY - 130]], 7, alpha('#e8503a', ak)); seg(g, [[ex + 60, GY - 250], [ex - 60, GY - 130]], 7, alpha('#e8503a', ak)); }
} });

// s061 — "and December 1st,"
registerShot('s061', { draw(g, t, info) {
  voidBg(g, t, { glow: '#e8503a', ga: 0.12 }); const cx = E.W / 2, cy = E.H * 0.5, k = ease.outBack(prog(t, 0, 0.4)), flip = Math.abs(Math.cos(Math.PI * clamp((t - 0.05) / 0.4)));
  g.save(); g.translate(cx, cy); g.scale(k, k * Math.max(0.05, flip)); rr(g, -330, -300, 660, 600, 28); g.fillStyle = '#efe9da'; g.fill(); g.fillStyle = '#e8503a'; rr(g, -330, -300, 660, 130, 28); g.fill(); g.fillRect(-330, -230, 660, 60); text(g, 'DECEMBER', 0, -232, { size: 64, color: '#fff', font: FONTS.ui, weight: 900, spacing: 6 }); text(g, '1', 0, 40, { size: 340, color: '#14161f', font: FONTS.ui, weight: 900 });
  const cp = ease.out(prog(t, 0.6, 1.2)); g.strokeStyle = '#e8503a'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.ellipse(0, 30, 250, 220, -0.1, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * cp); g.stroke(); g.restore();
} });

// s062 — "when Congress questions him."
registerShot('s062', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.1); const M0 = mood('interiorWarm');
  const { GY, CX, M } = hearing(g, t, cam, { behind: (g, GY, CX) => { [-600, -300, 0, 300, 600].forEach((dx, i) => drawFigure(g, { x: CX + dx, y: GY - 16, s: V(1.2, 1.3), facing: i < 2 ? 1 : -1, outfit: BOARD, pose: breathe(POSES.sit, t, 1, i), expr: 'neutral', rim: rimOf(M0, [0, -1]), shadow: false })); } });
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX - V(480, 220), y: GY + 90, s: V(1.4, 1.5), facing: 1, outfit: JENSEN, pose: breathe(POSES.relaxed, t), expr: 'nervous', rim: rimOf(M, [1, -0.2], 5) }); const mx = CX - V(400, 140), my = GY + 10; seg(g, [[mx, my], [mx, my - 60]], 5, '#0c0f1a'); circle(g, mx, my - 66, 10, '#0c0f1a'); glow(g, mx, my - 66, 60, '#ffd59a', 0.3); });
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3 });
} });

// s063 — "Two weeks ago,"  Nvidia tower with Jensen on the roof
registerShot('s063', { draw(g, t, info) {
  const M = mood('night'), GY = E.H * 0.9, cx = E.W / 2, cam = { z: lerp(1.0, 1.12, ease.inOut(t / info.dur)), y: lerp(0, -140, ease.inOut(t / info.dur)) };
  layer(g, cam, 0.15, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 130, area: [0, 0, E.W, E.H * 0.6] }); FX.moon(g, cx - 520, E.H * 0.2, 48); }); layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: GY, w: E.W * 3, minH: 120, maxH: 420, color: mix(M.sky[1], '#05060c', 0.6), windowColor: alpha(M.practical, 0.5), lit: 0.2, seed: 63 }));
  layer(g, cam, 0.9, (g) => { g.fillStyle = '#07080f'; g.fillRect(-E.W, GY, E.W * 3, E.H); tower(g, cx, GY, V(1.0, 1.05)); const ty = GY - 760 * V(1.0, 1.05) - 14; drawFigure(g, { x: cx, y: ty, s: 0.55, facing: 1, outfit: JENSEN, pose: breathe(POSES.stand, t), expr: 'neutral', rim: rimOf(M, [-1, -0.4], 3), shadow: false }); });
  FX.dust(g, t, { count: 40, speed: -30, color: '#cfe0ff', a: 0.25 });
} });
// s064 — "nobody could picture Nvidia without Jensen."  he fades from the roof
registerShot('s064', { draw(g, t, info) {
  const M = mood('night'), GY = E.H * 0.9, cx = E.W / 2, cam = { z: 1.12, y: -140 }, fade = 1 - ease.inOut(prog(t, wt(info, t, 'without', 1.6) - 0.2, wt(info, t, 'without', 1.6) + 1.0));
  layer(g, cam, 0.15, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 130, area: [0, 0, E.W, E.H * 0.6] }); FX.moon(g, cx - 520, E.H * 0.2, 48); }); layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: GY, w: E.W * 3, minH: 120, maxH: 420, color: mix(M.sky[1], '#05060c', 0.6), windowColor: alpha(M.practical, 0.5), lit: 0.2, seed: 63 }));
  layer(g, cam, 0.9, (g) => { g.fillStyle = '#07080f'; g.fillRect(-E.W, GY, E.W * 3, E.H); tower(g, cx, GY, V(1.0, 1.05)); const ty = GY - 760 * V(1.0, 1.05) - 14; drawFigure(g, { x: cx, y: ty, s: 0.55, facing: 1, outfit: JENSEN, pose: breathe(POSES.stand, t), expr: 'neutral', rim: rimOf(M, [-1, -0.4], 3), shadow: false, alpha: Math.max(0, fade) }); });
  FX.dust(g, t, { count: 40, speed: -30, color: '#cfe0ff', a: 0.25 });
} });

// s065 — "Now the betting money says neither picture lasts."  two frames fall
registerShot('s065', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.0, 1.06); const { GY, CX, M } = office(g, t, cam, { mood: 'interiorWarm' }); const tf = wt(info, t, 'neither', 2.0);
  layer(g, cam, 0.8, (g) => { [[-1, 'AT NVIDIA'], [1, 'ELSEWHERE']].forEach(([s, lab], i) => { const fall = Math.max(0, t - (tf + i * 0.25)), y = fall * fall * 900, rot = s * fall * 1.1, fx = CX + s * V(360, 260), fy = GY - V(440, 520);
    g.save(); g.translate(fx, fy + y); g.rotate(rot); rr(g, -150, -190, 300, 380, 10); g.fillStyle = '#7a5a30'; g.fill(); rr(g, -130, -170, 260, 340, 6); g.fillStyle = '#1a2036'; g.fill(); circle(g, 0, -30, 52, '#0a0c16'); g.fillStyle = '#76b900'; g.beginPath(); g.ellipse(0, 100, 90, 70, 0, Math.PI, 0); g.fill(); if (i === 0) chip(g, 0, -105, 0.6); else text(g, '?', 0, -105, { size: 54, color: GOLD(), font: FONTS.ui, weight: 900 }); text(g, lab, 0, 150, { size: 26, color: '#fff1dc', font: FONTS.ui, weight: 900, spacing: 2 }); g.restore(); }); });
  const sh = t > tf ? shake(t, 6 * (1 - prog(t, tf, tf + 0.5)), 30) : [0, 0]; if (sh[0]) { g.save(); g.translate(sh[0], sh[1]); g.restore(); }
} });

// s066 — "'Any offers, Mr. Huang?'"  reporter + flashes
registerShot('s066', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.08); const { GY, CX, M } = street(g, t, cam, { mood: 'night' }); const s = V(1.5, 1.55);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX - 280, y: GY + 10, s, facing: 1, outfit: REPORTER, pose: breathe(posesAt(t, [[0, 'stand'], [0.4, 'holdFront']]), t), expr: 'smile', talk: t < 1.6 ? 0.8 : 0, rim: rimOf(M, [1, -0.3], 5) });
    const mx = CX - 280 + 70 * s * 0.8, my = GY - 125 * s; seg(g, [[mx, my], [mx + 20, my - 18]], 7, '#0c0f1a'); circle(g, mx + 24, my - 24, 11, '#9fb6d8');
    drawFigure(g, { x: CX + 280, y: GY + 10, s, facing: -1, outfit: JENSEN, pose: breathe(POSES.relaxed, t, 1, 3), expr: 'smirk', rim: rimOf(M, [-1, -0.3], 5) }); });
  const f = (Math.floor(t * 6) % 5 === 0 && (t * 6) % 1 < 0.35) ? 0.35 : 0; if (f) { g.fillStyle = `rgba(255,255,255,${f})`; g.fillRect(0, 0, E.W, E.H); } FX.rain(g, t, { count: 120, a: 0.14 });
  const k = pop(t, 0.2, 0.35); speech(g, CX - 280, GY - V(560, 600), V(620, 560), 120, 'ANY OFFERS, MR. HUANG?', { tx: CX - 250, ty: GY - V(430, 460), k, a: clamp(k), size: 36 });
} });

// s067 — "'Elon, TSMC, SoftBank, a few governments.'"  offers fly in
registerShot('s067', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.0, 1.06); const { GY, CX, M } = street(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => drawFigure(g, { x: CX, y: GY + 10, s: V(1.5, 1.55), facing: 1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'relaxed'], [0.5, 'shrug']]), t), expr: 'smirk', rim: rimOf(M, [-1, -0.3], 5) }));
  [['ELON', 'Elon', '#ff7a1a', -1, 0.30], ['TSMC', 'TSMC', '#f2c21a', 1, 0.62], ['SOFTBANK', 'SoftBank', '#3a8de0', -1, 0.38], ['GOVERNMENTS', 'governments', '#9fb6d8', 1, 0.7]].forEach(([lab, w, c, sd, yy], i) => { const t0 = wt(info, t, w, 0.3 + i * 0.7), p = ease.out(prog(t, t0 - 0.05, t0 + 0.55)); if (p <= 0) return;
    const tx = CX + sd * V(560, 320) * (i > 1 ? 0.85 : 1), x = lerp(CX + sd * E.W * 0.7, tx, p), y = E.H * yy * V(1, 1) - (i % 2) * 40 + Math.sin(t * 3 + i) * 8; g.save(); g.translate(x, y); g.rotate(sd * 0.12 * (1 - p)); rr(g, -140, -70, 280, 140, 10); g.fillStyle = '#efe6cf'; g.fill(); g.fillStyle = c; g.fillRect(-140, -70, 280, 22); fit(g, lab, 0, 8, 250, 38, { color: '#14161f', font: FONTS.ui, weight: 900 }); text(g, 'OFFER', 0, 44, { size: 20, color: '#6a6a5a', font: FONTS.ui, weight: 900, spacing: 4 }); g.restore(); });
  FX.rain(g, t, { count: 100, a: 0.12 });
} });

// s068 — "'What are you looking for?'"  reporter close-up
registerShot('s068', { draw(g, t, info) {
  const M = mood('night'); blurLayer(g, 14, (g) => street(g, t, { z: 1.5, x: -60, y: -80 }, { mood: 'night' })); veil(g, '#060814', 0.45);
  bigFace(g, E.W / 2 - V(100, 0), E.H * V(0.62, 0.58), V(310, 330) * (1 + 0.04 * t), { outfit: REPORTER, expr: 'smile', talk: t < 1.0 ? 0.7 : 0, look: [0.4, 0], blink: (t % 2.8) > 2.7, rimColor: M.rim, rimSide: -1 });
  const mx = E.W * V(0.76, 0.7), my = E.H * 0.82; seg(g, [[mx, E.H + 40], [mx - 40, my]], 28, '#0c0f1a'); circle(g, mx - 46, my - 10, 44, '#9fb6d8'); circle(g, mx - 46, my - 10, 44, 'rgba(0,0,0,.35)'); ring(g, mx - 46, my - 10, 44, 6, '#cfe0ff');
} });

// s069 — "'My old desk.'"  warm office, he sits at his desk; fade out
registerShot('s069', { draw(g, t, info) {
  const cam = { z: lerp(1.14, 1.0, ease.inOut(t / info.dur)), x: lerp(40, 0, ease.inOut(t / info.dur)) }; const { GY, CX, M } = office(g, t, cam, { mood: 'interiorWarm' });
  layer(g, cam, 1, (g) => { FX.chair(g, CX - V(200, 100), GY, 1.4, '#2a1a22'); desk(g, CX + V(60, 20), GY, { s: 1.35, lampOn: true, lamp: '#ffd59a' });
    drawFigure(g, { x: CX - V(200, 100), y: GY - 6, s: V(1.45, 1.5), facing: 1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'sit'], [1.0, 'sit']]), t), expr: 'smile', rim: { color: '#ffcf8f', dir: [1, -0.3], w: 5 }, shadow: false, blink: (t % 3.0) > 2.9 }); });
  const k = pop(t, wt(info, t, 'desk', 1.0) - 0.1, 0.4); tag(g, 'MY OLD DESK', CX + V(60, 20), GY - V(430, 460) - 20 * k, { k, a: clamp(k), color: '#ffc66e', size: V(34, 36) });
  FX.dust(g, t, { count: 45, color: '#ffe2bd', a: 0.35 }); FX.godRays(g, E.W * 0.82, E.H * 0.3, { angle: Math.PI * 0.62, spread: 0.7, color: '#ffd59a', a: 0.05, t });
} });
