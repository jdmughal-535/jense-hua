// shots/01_open.js — cold open + recap + the post (s001–s013)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake, talkAmount, seg, circle, ring, rr, poly, text, glow, alpha, shade, mix, linGrad, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { office, desk } from '../sets/office.js';
import { rooftop, street } from '../sets/outdoor.js';
import { boardroom } from '../sets/rooms.js';
import { JENSEN, ELON, BOARD, CROWD, SPY } from '../cast.js';
import { rimOf, camPush, pop, fadeIn, fadeOut, fit, card, stamp, chip, speech, tag, voidBg, headline, tower, GYf, wt, fmtNum } from '../_h.js';

const FS = () => V(1.3, 1.5);   // hero figure scale

// s001 — "Thursday morning, Jensen Huang lost his job."  wide office, push-in
registerShot('s001', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1, 1.09, -20, 40);
  const { GY, CX, M } = office(g, t, cam, { mood: 'interiorCool' });
  layer(g, cam, 1, (g) => {
    desk(g, CX + V(520, 330), GY, { s: 1.1, lampOn: false });
    drawFigure(g, { x: CX - V(160, 40), y: GY, s: FS(), facing: 1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'stand'], [1.1, 'think']]), t), expr: t > 1.3 ? 'sad' : 'worried', rim: rimOf(M, [0, -1], 5), blink: (t % 3.1) > 3.0 });
  });
  FX.godRays(g, E.W / 2, E.H * 0.2, { angle: Math.PI / 2, spread: 1.0, color: M.rim, a: 0.05, t });
  FX.dust(g, t, { count: 36, color: '#cfe0ff', a: 0.3 });
  UI.badge(g, { str: 'THU · 9:00 AM', a: fadeIn(t, 0.3) * fadeOut(t, info.dur, 0.25) });
} });

// s002 — "By Thursday night, the richest man on Earth had offered him a new one."  rooftop, Elon with the offer
registerShot('s002', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.04, 1.0, -40, 30);
  const { GY, CX, M } = rooftop(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - V(140, 20), y: GY, s: FS(), facing: 1, outfit: ELON, pose: breathe(posesAt(t, [[0, 'stand'], [0.9, 'holdFront']]), t), prop: t > 0.8 ? { type: 'paper', hand: 'F' } : null, expr: t > 1.0 ? 'smirk' : 'neutral', rim: rimOf(M, [-1, -0.3], 5) });
  });
  const k = pop(t, 1.3); if (k > 0) tag(g, 'NEW JOB OFFER', E.W / 2 + V(120, 60), E.H * V(0.3, 0.34) - 30 * k, { k, color: '#ffc66e' });
  FX.dust(g, t, { count: 70, speed: -60, color: '#cfe0ff', a: 0.3 });
  FX.lensStreak(g, E.W / 2, E.H * 0.35, E.W * 1.2, '#cfe0ff', 0.1);
} });

// s003 — "Gamblers were betting real money on where he'd land."  odds screen, three silhouettes, rising dollars
registerShot('s003', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.0, 1.06);
  const M = voidBg(g, t, { mood: 'night', gy: E.H * 0.4, ga: 0.2, glow: '#76b900' }); const GY = GYf();
  layer(g, cam, 1, (g) => {
    const cx = E.W / 2, cy = E.H * V(0.3, 0.3), w = V(920, 900), h = V(260, 300); card(g, cx - w / 2, cy - h / 2, w, h);
    text(g, 'WHERE WILL HE LAND?', cx, cy - h * 0.28, { size: V(46, 50), color: S().ui.gold, font: FONTS.ui, weight: 900, spacing: 3 });
    const names = ['ELON', 'TSMC', 'AMD', 'SOFTBANK']; names.forEach((n, i) => { const x = cx - w / 2 + 80 + i * (w - 160) / 3; const v = 4 + ((Math.floor(t * 5 + i * 3) * 7 + i * 11) % 26); text(g, n, x, cy + h * 0.05, { size: 26, color: '#9fb6d8', font: FONTS.ui, weight: 900 }); text(g, v + '%', x, cy + h * 0.28, { size: 44, color: i === 0 ? '#ff8a5c' : '#fff1dc', font: FONTS.ui, weight: 900 }); });
    glow(g, cx, cy, 700, '#76b900', 0.12);
    [[-0.28, 'cheer', 1], [0.0, 'handsOnHead', 1], [0.28, 'think', -1]].forEach(([dx, p, f], i) => drawFigure(g, { x: cx + dx * E.W * V(1, 0.9), y: GY, s: V(1.35, 1.5), facing: f, outfit: CROWD, pose: breathe(POSES[p], t, 1, i), expr: i === 1 ? 'shocked' : 'smile', rim: rimOf(M, [0, -1]), look: [0, -0.8] }));
    for (let i = 0; i < 16; i++) { const r = ((i * 97) % 100) / 100, ph = (t * 0.35 + i / 16) % 1; text(g, '$', E.W * (0.1 + 0.8 * ((i * 53) % 100) / 100), GY - ph * E.H * 0.75, { size: 44 + r * 40, color: '#76b900', alpha: Math.sin(ph * Math.PI) * 0.7, font: FONTS.ui, weight: 900 }); }
  });
} });

// s004 — "And 1,600 Nvidia employees were begging for one thing: bring him back."
registerShot('s004', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.0, 1.07, -30, 30);
  const { GY, CX, M } = street(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => {
    tower(g, CX + V(520, 200), GY, V(1.0, 0.9));
    for (let i = 0; i < 14; i++) { const row = i % 2, x = CX - V(760, 400) + (i >> 1) * V(210, 130) + row * 60, y = GY + row * 46, s = V(1.0, 1.1) + row * 0.12;
      drawFigure(g, { x, y, s, facing: 1, outfit: CROWD, pose: breathe(i % 3 ? POSES.cheer : POSES.handsOnHead, t + i * 0.3, 1, i), expr: i % 2 ? 'cry' : 'worried', rim: rimOf(M, [0, -1]), shadow: false });
      if (i % 2 === 0) { const sx = x + 22, sy = y - 250 * s; seg(g, [[sx, y - 150 * s], [sx, sy + 40]], 6, '#0a0c16'); rr(g, sx - 90, sy - 30, 180, 74, 6); g.fillStyle = '#f4efe6'; g.fill(); fit(g, 'BRING HIM BACK', sx, sy + 7, 160, 24, { color: '#14161f', font: FONTS.ui, weight: 900 }); } }
  });
  FX.rain(g, t, { count: 160, a: 0.2 });
  const tw = wt(info, t, '1,600', 0.4), n = lerp(0, 1600, ease.out(prog(t, tw, tw + 1.4)));
  UI.readout(g, { label: 'NVIDIA EMPLOYEES', value: fmtNum(n), x: E.W / 2, y: V(150, 220), align: 'center', size: V(96, 90), a: fadeIn(t, tw - 0.1, 0.25) });
} });

// s005 — "Quick recap."
registerShot('s005', { draw(g, t, info) { voidBg(g, t, { glow: '#ffc66e', ga: 0.2 }); FX.dust(g, t, { count: 50, color: '#cfe0ff' }); headline(g, t, info.dur, 'QUICK RECAP'); FX.lensStreak(g, E.W / 2, E.H / 2, E.W, '#ffc66e', 0.3, 3); } });

// small silhouette portrait for the case file
function portrait(g, x, y, s, o = {}) { rr(g, x - 90 * s, y - 110 * s, 180 * s, 220 * s, 10); g.fillStyle = '#e8e2d4'; g.fill(); rr(g, x - 78 * s, y - 98 * s, 156 * s, 196 * s, 6); g.fillStyle = o.bg || '#2b3550'; g.fill(); circle(g, x, y - 20 * s, 34 * s, '#0a0c16'); g.fillStyle = '#0a0c16'; g.beginPath(); g.ellipse(x, y + 78 * s, 62 * s, 50 * s, 0, Math.PI, 0); g.fill(); circle(g, x, y - 104 * s, 7, '#e8503a'); }
// s006 — "Two affairs,"
registerShot('s006', { draw(g, t, info) {
  voidBg(g, t, { glow: '#e8503a', ga: 0.12 }); const k = ease.outBack(prog(t, 0, 0.5)), cx = E.W / 2, cy = E.H * 0.46;
  g.save(); g.translate(0, (1 - k) * 80); g.globalAlpha *= clamp(k);
  portrait(g, cx - V(380, 250), cy, V(1.5, 1.3)); portrait(g, cx + V(380, 250), cy, V(1.5, 1.3), { bg: '#3a2b50' });
  const sag = 60 + 12 * Math.sin(t * 2); g.strokeStyle = '#e8503a'; g.lineWidth = 5; g.beginPath(); g.moveTo(cx - V(380, 250), cy - 140); g.quadraticCurveTo(cx, cy - 140 + sag, cx + V(380, 250), cy - 140); g.stroke(); g.restore();
  const p = pop(t, 0.35, 0.4); text(g, '2', cx, cy + 20, { size: 280 * p, color: '#ffc66e', glow: 40, glowColor: 'rgba(255,140,60,.8)', font: FONTS.ui, weight: 900 });
  text(g, 'AFFAIRS', cx, cy + V(210, 190), { size: 70, color: '#fff1dc', font: FONTS.ui, weight: 900, spacing: 8, alpha: fadeIn(t, 0.5, 0.3) });
} });
// s007 — "one alleged spy,"
registerShot('s007', { draw(g, t, info) {
  voidBg(g, t, { glow: '#9fb6ff', ga: 0.1 }); const M = mood('night'), GY = GYf(), cx = E.W / 2;
  FX.lightCone(g, cx, -40, { angle: Math.PI / 2, spread: 0.55, len: E.H * 1.1, color: '#cfe0ff', a: 0.22 }); FX.pool(g, cx, GY + 30, 360, 50, '#cfe0ff', 0.3);
  g.fillStyle = linGrad(g, 0, GY, 0, E.H, ['#10131f', '#090b13']); g.fillRect(-E.W, GY, E.W * 3, E.H);
  drawFigure(g, { x: cx, y: GY, s: V(1.5, 1.6), facing: 1, outfit: SPY, pose: breathe(posesAt(t, [[0, 'stand'], [0.6, 'crossArms']]), t), expr: 'neutral', rim: rimOf(M, [0, -1], 5) });
  const hp = headPos({ x: cx, y: GY, s: V(1.5, 1.6), facing: 1, pose: POSES.stand }), mx = hp[0] + 40 + 30 * Math.sin(t * 1.5), my = hp[1] - 10;
  ring(g, mx, my, 120, 12, '#ffc66e'); seg(g, [[mx + 86, my + 86], [mx + 190, my + 190]], 18, '#ffc66e'); glow(g, mx, my, 220, '#ffc66e', 0.12);
  stamp(g, 'ALLEGED SPY', cx, E.H * V(0.2, 0.22), { k: lerp(2.2, 1, ease.out(prog(t, 0.2, 0.4))), a: prog(t, 0.2, 0.35), size: V(86, 70) });
} });

// s008 — "and a board that said 'effective immediately.'"  boardroom, stamp slams, Jensen walks out
registerShot('s008', { draw(g, t, info) {
  const sh = t > 1.0 ? shake(t, 14 * (1 - prog(t, 1.0, 1.6)), 30) : [0, 0];
  const cam = { z: 1.22 + 0.04 * t / info.dur, x: sh[0] - 40, y: sh[1] + 30 };
  const M0 = mood('interiorCool');
  const { GY, CX, M } = boardroom(g, t, cam, { behind: (g, GY, CX) => {
    [-560, -280, 280, 560].forEach((dx, i) => drawFigure(g, { x: CX + dx, y: GY - 6, s: V(1.2, 1.3), facing: dx < 0 ? 1 : -1, outfit: BOARD, pose: breathe(POSES.sit, t, 1, i), expr: 'neutral', rim: rimOf(M0, [0, -1]), shadow: false }));
    drawFigure(g, { x: CX, y: GY - 6, s: V(1.35, 1.45), facing: 1, outfit: BOARD, pose: breathe(posesAt(t, [[0, 'stand'], [0.5, 'point']]), t), expr: 'angry', rim: rimOf(M0, [0, -1]) }); } });
  layer(g, cam, 1, (g) => { const wx = CX + V(980, 700) + Math.max(0, t - 1.5) * 150 * V(1.3, 1.4); drawFigure(g, { x: Math.min(wx, E.W * 1.4), y: GY + 70, s: V(1.4, 1.5), facing: 1, outfit: JENSEN, pose: t > 1.5 ? walkPose(t * Math.PI * 1.8) : breathe(POSES.sad, t), expr: 'sad', rim: rimOf(M, [0, -1]), shadow: true }); });
  stamp(g, 'EFFECTIVE IMMEDIATELY', E.W / 2, E.H * V(0.27, 0.27), { k: lerp(3, 1, ease.out(prog(t, 0.95, 1.15))), a: prog(t, 0.95, 1.05), size: V(70, 56) });
} });

// s009 — "Today's question is different:"  Jensen alone in the rain
registerShot('s009', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.0, 1.08, 30, -20);
  const { GY, CX, M } = street(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => drawFigure(g, { x: CX - V(40, 0), y: GY + 10, s: FS(), facing: 1, outfit: JENSEN, pose: breathe(POSES.stand, t), expr: 'sad', rim: rimOf(M, [-1, -0.4], 5), blink: (t % 3.4) > 3.3 }));
  FX.rain(g, t, { count: 300, a: 0.3 }); FX.fog(g, GY - 120, 240, M.fog, 0.18);
} });
// s010 — "who gets him next?"  giant face + question mark
registerShot('s010', { draw(g, t, info) {
  const M = mood('night');
  blurLayer(g, 14, (g) => street(g, t, { z: 1.5, x: 60, y: -80 }, { mood: 'night' })); veil(g, '#060814', 0.45);
  const r = V(310, 330) * (1 + 0.04 * t); bigFace(g, E.W / 2 - V(120, 0), E.H * V(0.62, 0.58), r, { outfit: JENSEN, expr: 'thinking', look: [0.5, -0.4], blink: (t % 2.9) > 2.8, rimColor: M.rim, rimSide: 1 });
  const k = ease.outBack(prog(t, 0.2, 0.7)); text(g, '?', E.W / 2 + V(330, 260), E.H * 0.3 - 10 * Math.sin(t * 2.2), { size: 260 * k, color: '#ffc66e', glow: 40, glowColor: 'rgba(255,170,60,.8)', font: FONTS.ui, weight: 900, alpha: clamp(k) });
  FX.rain(g, t, { count: 140, a: 0.18 });
} });

// s011 — "It started with one post. Zero Hedge wrote: 'Elon, please hire Jensen.'"  phone insert, post types in
registerShot('s011', { draw(g, t, info) {
  const M = mood('night');
  blurLayer(g, 16, (g) => street(g, t, { z: 1.4, x: -60, y: -60 }, { mood: 'night' })); veil(g, '#060814', 0.55);
  const k = ease.out(prog(t, 0, 0.5)), cx = E.W / 2, cy = E.H / 2 + (1 - k) * 160; g.save(); g.translate(cx, cy); g.rotate(-0.04 + 0.01 * Math.sin(t * 0.8)); g.scale(V(1.15, 1.2), V(1.15, 1.2));
  rr(g, -250, -420, 500, 840, 56); g.fillStyle = '#05060b'; g.fill(); g.strokeStyle = '#2a3248'; g.lineWidth = 6; g.stroke(); rr(g, -228, -396, 456, 792, 38); g.fillStyle = '#0f1626'; g.fill();
  glow(g, 0, 0, 520, '#9fd8ff', 0.1); circle(g, -170, -250, 38, '#2a3a5a'); text(g, 'Z', -170, -248, { size: 40, color: '#9fd8ff', font: FONTS.ui, weight: 900 });
  text(g, 'Zero Hedge', -112, -262, { size: 36, color: '#e8f0ff', font: FONTS.ui, weight: 900, align: 'left' }); text(g, '@zerohedge', -112, -222, { size: 26, color: '#6f84a6', font: FONTS.ui, weight: 700, align: 'left' });
  const tq = wt(info, t, 'Elon,', 1.8), full = 'Elon, please hire Jensen.', n = Math.floor(clamp((t - tq) / 1.9) * full.length), shown = full.slice(0, n);
  const words = shown.split(' '); let lines = [], cur = ''; for (const w of words) { if ((cur + ' ' + w).trim().length > 14) { lines.push(cur.trim()); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) lines.push(cur);
  lines.forEach((ln, i) => text(g, ln, -190, -130 + i * 74, { size: 62, color: '#ffffff', font: FONTS.ui, weight: 900, align: 'left' }));
  if (n > 0 && n < full.length || (t * 2) % 1 < 0.5) { const last = lines[lines.length - 1] || ''; const lw = measureW(g, last, 62); rr(g, -190 + lw + 8, -130 + (Math.max(1, lines.length) - 1) * 74 - 30, 6, 60, 2); g.fillStyle = '#9fd8ff'; g.fill(); }
  for (let i = 0; i < 4; i++) rr(g, -190 + i * 112, 300, 70, 14, 7), g.fillStyle = 'rgba(159,184,216,.35)', g.fill();
  g.restore();
} });
function measureW(g, s, size) { g.save(); g.font = `900 ${size}px Nunito`; const w = g.measureText(s).width; g.restore(); return w; }

// s012 — "Elon replied in five words:"  Elon typing on the rooftop
registerShot('s012', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.1, 20, -30);
  const { GY, CX, M } = rooftop(g, t, cam, { mood: 'night' });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - V(60, 0), y: GY, s: FS() * 1.1, facing: 1, outfit: ELON, pose: breathe(POSES.phone, t, 1.3), prop: { type: 'phone', glow: '#9fd8ff' }, expr: t > 1.0 ? 'smirk' : 'neutral', rim: rimOf(M, [-1, -0.3], 5), blink: (t % 3.2) > 3.1 });
    for (let i = 0; i < 3; i++) circle(g, CX + V(70, 40) + i * 26, GY - V(300, 330), 8 + 3 * Math.max(0, Math.sin(t * 6 - i)), alpha('#9fd8ff', 0.8));
  });
  FX.dust(g, t, { count: 50, speed: -40, color: '#cfe0ff', a: 0.25 });
} });

// s013 — "That would be an honor."  reply card, words pop on the beat, 5-word counter
registerShot('s013', { draw(g, t, info) {
  voidBg(g, t, { glow: '#ff7a1a', ga: 0.14 }); const cx = E.W / 2, cy = E.H * 0.46, w = V(1500, 940), h = V(480, 640); card(g, cx - w / 2, cy - h / 2, w, h);
  circle(g, cx - w / 2 + 90, cy - h / 2 + 90, 44, '#ff7a1a'); text(g, 'Elon Musk', cx - w / 2 + 160, cy - h / 2 + 78, { size: 42, color: '#fff1dc', font: FONTS.ui, weight: 900, align: 'left' }); text(g, 'replying', cx - w / 2 + 160, cy - h / 2 + 118, { size: 26, color: '#6f84a6', font: FONTS.ui, weight: 700, align: 'left' });
  const ws = ['That', 'would', 'be', 'an', 'honor.'], size = V(110, 96); const widths = ws.map(s => measureW(g, s, size)); const gap = size * 0.28, total = widths.reduce((a, b) => a + b, 0) + gap * 4;
  const rows = total > w - 120 ? [[0, 1, 2], [3, 4]] : [[0, 1, 2, 3, 4]];
  rows.forEach((row, ri) => { const tw = row.reduce((a, i) => a + widths[i], 0) + gap * (row.length - 1); let x = cx - tw / 2; row.forEach((i) => { const t0 = wt(info, t, ws[i].replace('.', ''), 0.3 + i * 0.4), k = pop(t, t0, 0.3);
    if (k > 0) { g.save(); g.translate(x + widths[i] / 2, cy + (ri - (rows.length - 1) / 2) * size * 1.15 + V(10, 0)); g.scale(k, k); text(g, ws[i], 0, 0, { size, color: i === 4 ? '#ffc66e' : '#ffffff', font: FONTS.ui, weight: 900, glow: i === 4 ? 30 : 0, glowColor: 'rgba(255,170,60,.8)' }); g.restore(); } x += widths[i] + gap; }); });
  for (let i = 0; i < 5; i++) { const t0 = wt(info, t, ws[i].replace('.', ''), 0.3 + i * 0.4); circle(g, cx - 100 + i * 50, cy + h / 2 - 60, 12, t > t0 ? '#ffc66e' : 'rgba(159,184,216,.25)'); }
  text(g, '5 WORDS', cx, cy + h / 2 - 108, { size: 30, color: '#6f84a6', font: FONTS.ui, weight: 900, spacing: 4 });
} });
