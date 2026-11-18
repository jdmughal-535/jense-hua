// shots/03_suitors.js — TSMC, AMD, SoftBank, start-over (s031–s046)
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake, seg, circle, ring, rr, poly, text, glow, alpha, shade, mix, linGrad, backdrop, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { rooftop, street } from '../sets/outdoor.js';
import { office, desk } from '../sets/office.js';
import { diner, booth } from '../sets/rooms.js';
import { JENSEN, ELON, MORRIS, LISA, MASA, BOARD, CROWD } from '../cast.js';
import { rimOf, camPush, pop, fadeIn, fadeOut, fit, card, stamp, chip, speech, tag, voidBg, headline, tower, GYf, wt, fmtNum } from '../_h.js';
const FS = () => V(1.3, 1.5);
const GOLD = () => S().ui.gold;

// s031 — "Back in 2013, founder Morris Chang tried to hire Jensen as his successor."
registerShot('s031', { draw(g, t, info) {
  const sw = wt(info, t, 'founder', 1.4) - 0.1;
  if (t < sw) { voidBg(g, t, { glow: '#f2c21a', ga: 0.15 }); const k = ease.outBack(prog(t, 0, 0.4)), flip = Math.abs(Math.cos(Math.PI * clamp((t - 0.3) / 0.5))) ;
    g.save(); g.translate(E.W / 2, E.H / 2); g.scale(k, k); rr(g, -330, -270, 660, 540, 28); g.fillStyle = '#efe9da'; g.fill(); g.fillStyle = '#e8503a'; rr(g, -330, -270, 660, 120, 28); g.fill(); g.fillRect(-330, -210, 660, 60);
    for (const x of [-200, 200]) { circle(g, x, -270, 18, '#0a0c16'); } text(g, 'YEAR', 0, -210, { size: 54, color: '#fff', font: FONTS.ui, weight: 900, spacing: 8 });
    g.save(); g.scale(1, Math.max(0.05, flip)); text(g, t < 0.55 ? '2012' : '2013', 0, 30, { size: 210, color: '#14161f', font: FONTS.ui, weight: 900 }); g.restore(); g.restore();
  } else { const u = t - sw, M = mood('interiorCool'), cam = camPush(u, info.dur - sw, 1.02, 1.1, 0, 0); const { GY, CX } = office(g, t, cam, { mood: 'interiorCool' }); const s = V(1.5, 1.55);
    layer(g, cam, 1, (g) => { drawFigure(g, { x: CX - 260, y: GY, s, facing: 1, outfit: MORRIS, pose: breathe(posesAt(u, [[0, 'stand'], [0.5, 'reach']]), t), expr: 'smile', rim: rimOf(M, [0, -1], 5) });
      const tb = wt(info, t, 'hire', sw + 1) ; const shakeHead = Math.sin(Math.max(0, t - tb - 0.5) * 9) * 0.12 * clamp(t - tb - 0.4);
      drawFigure(g, { x: CX + 260, y: GY, s, facing: -1, outfit: JENSEN, pose: breathe(POSES.crossArms, t, 1, 3), rot: shakeHead, expr: t > tb + 0.6 ? 'determined' : 'worried', rim: rimOf(M, [0, -1], 5) });
      if (t > tb - 0.2) { const bx = lerp(CX - 150, CX + 40, ease.out(prog(t, tb - 0.2, tb + 0.6))), by = GY - 190 * s * 0.8; g.save(); g.translate(bx, by); g.rotate(-0.25); rr(g, -60, -9, 120, 18, 9); g.fillStyle = '#ffc66e'; g.fill(); g.restore(); glow(g, bx, by, 100, '#ffc66e', 0.3); } });
    tag(g, 'MORRIS CHANG · TSMC FOUNDER', E.W * 0.34, GY + V(90, 80), { a: fadeIn(u, 0.1, 0.25), size: V(28, 30) });
  }
} });

// s032 — "Jensen said no."
registerShot('s032', { draw(g, t, info) {
  const M = mood('night'); blurLayer(g, 14, (g) => office(g, t, { z: 1.4, x: 60, y: -60 }, { mood: 'interiorCool' })); veil(g, '#060814', 0.5);
  bigFace(g, E.W / 2 - V(180, 0), E.H * V(0.62, 0.58), V(320, 340) * (1 + 0.04 * t), { outfit: JENSEN, expr: 'determined', look: [-0.4, 0], rimColor: M.rim, rimSide: 1, tilt: -0.05 + 0.04 * Math.sin(t * 9) * clamp(1 - t) });
  const k = pop(t, 0.12, 0.3); g.save(); g.translate(E.W * V(0.74, 0.7), E.H * 0.34); g.rotate(-0.1); g.scale(k, k); text(g, 'NO.', 0, 0, { size: V(230, 190), color: '#ff8a5c', font: FONTS.ui, weight: 900, glow: 36, glowColor: 'rgba(255,100,60,.8)' }); g.restore();
} });

// s033 — "Today it sits at about 5%."
registerShot('s033', { draw(g, t, info) {
  voidBg(g, t, { glow: '#f2c21a', ga: 0.1 }); const cx = E.W / 2, w = V(1300, 940), h = V(560, 640), x0 = cx - w / 2, y0 = (E.H - h) / 2, ui = S().ui; card(g, x0, y0, w, h);
  text(g, 'TSMC', x0 + 70, y0 + 92, { size: 50, color: '#f2c21a', font: FONTS.ui, weight: 900, align: 'left', spacing: 3 }); text(g, 'POLYMARKET ODDS', x0 + 72, y0 + 136, { size: 24, color: ui.sub, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  const tw = wt(info, t, '5%', 0.8), n = lerp(0, 5, ease.out(prog(t, tw - 0.2, tw + 0.7)));
  text(g, Math.round(n) + '%', x0 + w - 70, y0 + 120, { size: V(140, 130), color: ui.accent, font: FONTS.ui, weight: 900, align: 'right', glow: 24, glowColor: alpha(ui.accent, 0.5) });
  const by = y0 + h - 160, bw = w - 140; rr(g, x0 + 70, by, bw, 46, 23); g.fillStyle = alpha('#9fb6ff', 0.12); g.fill(); const fw = Math.max(46, bw * 0.05 * ease.out(prog(t, 0.2, 1.0))); rr(g, x0 + 70, by, fw, 46, 23); g.fillStyle = '#f2c21a'; g.fill(); glow(g, x0 + 70 + fw, by + 23, 80, '#f2c21a', 0.6);
  for (const u of [0, 0.5, 1]) text(g, Math.round(u * 100) + '%', x0 + 70 + bw * u, by + 84, { size: 26, color: ui.sub, font: FONTS.ui, weight: 900 });
} });

// s034 — "AMD's Lisa Su is a distant relative of Jensen's."  family-tree blueprint
registerShot('s034', { draw(g, t, info) {
  UI.blueprint(g); const cx = E.W / 2, ui = S().ui, bp = UI.bpStroke(), yTop = E.H * V(0.2, 0.2), yBot = E.H * V(0.62, 0.6), lx = cx - V(420, 260), rx = cx + V(420, 260);
  const p = ease.out(prog(t, 0.2, 1.4)), p2 = ease.out(prog(t, 0.9, 1.8)); g.setLineDash([14, 12]);
  seg(g, [[lx, yBot - 150], [lx, lerp(yBot - 150, yTop + 90, p)]], 4, bp); seg(g, [[rx, yBot - 150], [rx, lerp(yBot - 150, yTop + 90, p)]], 4, bp);
  seg(g, [[lx, yTop + 90], [lerp(lx, cx, p2), yTop + 90]], 4, bp); seg(g, [[rx, yTop + 90], [lerp(rx, cx, p2), yTop + 90]], 4, bp); g.setLineDash([]);
  const k = pop(t, 1.2, 0.4); ring(g, cx, yTop + 40, 56 * k, 5, ui.gold); text(g, '?', cx, yTop + 44, { size: 60 * k, color: ui.gold, font: FONTS.ui, weight: 900 });
  UI.lineFigure(g, { x: lx, y: yBot, s: 1.3, color: '#ff7a8a', pose: POSES.relaxed }); UI.lineFigure(g, { x: rx, y: yBot, s: 1.3, color: '#9fe05a', pose: POSES.relaxed, facing: -1 });
  text(g, 'LISA SU · AMD', lx, yBot + 70, { size: 34, color: '#ff7a8a', font: FONTS.ui, weight: 900, spacing: 2 }); text(g, 'JENSEN HUANG', rx, yBot + 70, { size: 34, color: '#9fe05a', font: FONTS.ui, weight: 900, spacing: 2 });
  const kk = pop(t, wt(info, t, 'distant', 0.8), 0.35); g.save(); g.translate(cx, E.H * 0.82); g.scale(kk, kk); text(g, 'DISTANT RELATIVE', 0, 0, { size: V(66, 56), color: ui.gold, font: FONTS.ui, weight: 900, spacing: 4, glow: 20, glowColor: 'rgba(255,170,60,.6)' }); g.restore();
} });

// s035 — "Imagine that family dinner."  awkward dinner in the booth
registerShot('s035', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.04, 1.1); const { GY, CX, M } = diner(g, t, cam);
  layer(g, cam, 1, (g) => { const tb = booth(g, GY, CX, { seat: '#5a2a44' }); const s = V(1.5, 1.55), look = Math.sin(t * 1.4) > 0 ? 1 : -1;
    drawFigure(g, { x: CX - 250, y: GY, s, facing: 1, outfit: LISA, pose: breathe(POSES.sit, t), expr: 'nervous', look: [look * 0.8, 0.2], rim: rimOf(M, [0, -1]), shadow: false });
    drawFigure(g, { x: CX + 250, y: GY, s, facing: -1, outfit: JENSEN, pose: breathe(POSES.sit, t, 1, 3), expr: 'nervous', look: [-look * 0.8, 0.2], rim: rimOf(M, [0, -1]), shadow: false });
    rr(g, CX - 70, tb.top - 20, 140, 22, 11); g.fillStyle = '#e8e2d4'; g.fill(); g.fillStyle = '#7a3a20'; g.beginPath(); g.ellipse(CX, tb.top - 24, 56, 20, 0, Math.PI, 0); g.fill();
    for (let i = 0; i < 4; i++) circle(g, CX - 20 + i * 14 + Math.sin(t * 2 + i) * 10, tb.top - 50 - ((t * 40 + i * 26) % 110), 12 + i * 2, alpha('#ffffff', 0.18 * (1 - ((t * 40 + i * 26) % 110) / 110))); });
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3 });
} });

// s036 — "Then SoftBank."
registerShot('s036', { draw(g, t, info) {
  voidBg(g, t, { mood: 'night', glow: '#3a8de0', ga: 0.22, gy: E.H * 0.62 }); const GY = GYf();
  FX.skyline(g, { x: -50, y: E.H, w: E.W + 100, minH: 160, maxH: V(460, 560), color: '#080a14', windowColor: alpha('#6ab0ff', 0.55), lit: 0.25, seed: 36 });
  headline(g, t, info.dur, 'SOFTBANK', { color: '#5aa8ff', y: E.H * 0.38, size: V(210, 150) });
  drawFigure(g, { x: E.W * V(0.78, 0.7), y: E.H * 0.9, s: V(1.2, 1.3), facing: -1, outfit: MASA, pose: breathe(POSES.relaxed, t), expr: 'smile', rim: rimOf(mood('night'), [-1, -0.3], 5) });
} });

// s037 — "Masayoshi Son sold his Nvidia stake twice."  SOLD stamped twice
registerShot('s037', { draw(g, t, info) {
  const M = mood('night'); voidBg(g, t, { mood: 'night', glow: '#3a8de0', ga: 0.15 }); const GY = GYf(), cx = E.W * V(0.62, 0.5), cy = E.H * 0.46;
  drawFigure(g, { x: E.W * V(0.2, 0.2), y: GY + 20, s: V(1.5, 1.55), facing: 1, outfit: MASA, pose: breathe(posesAt(t, [[0, 'stand'], [0.5, 'point']]), t), expr: 'smirk', rim: rimOf(M, [1, -0.3], 5) });
  const k = ease.out(prog(t, 0, 0.4)); g.save(); g.translate(cx, cy + (1 - k) * 60); g.rotate(-0.04); g.globalAlpha *= k; rr(g, -330, -230, 660, 460, 14); g.fillStyle = '#efe6cf'; g.fill(); g.strokeStyle = '#8a7a4a'; g.lineWidth = 6; g.strokeRect(-310, -210, 620, 420);
  chip(g, 0, -70, 1.8, '#4a7a00'); text(g, 'NVIDIA SHARES', 0, 50, { size: 54, color: '#2a2a22', font: FONTS.ui, weight: 900, spacing: 3 }); g.restore();
  const t1 = wt(info, t, 'sold', 0.7), t2 = wt(info, t, 'twice', 2.2);
  stamp(g, 'SOLD', cx - 60, cy - 10, { k: lerp(2.6, 1, ease.out(prog(t, t1, t1 + 0.18))), a: prog(t, t1, t1 + 0.08), size: 90, rot: -0.2 });
  stamp(g, 'SOLD', cx + 90, cy + 70, { k: lerp(2.6, 1, ease.out(prog(t, t2 - 0.15, t2 + 0.03))), a: prog(t, t2 - 0.15, t2 - 0.07), size: 90, rot: 0.12 });
  text(g, t > t2 - 0.1 ? '×2' : t > t1 ? '×1' : '', cx, E.H * 0.14, { size: 130, color: GOLD(), font: FONTS.ui, weight: 900, glow: 28, glowColor: 'rgba(255,170,60,.7)' });
} });

// s038 — "Now he'd have to buy the man himself."  cash bag vs. price-tagged Jensen
registerShot('s038', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.1); const { GY, CX, M } = street(g, t, cam, { mood: 'night' }); const s = V(1.5, 1.55);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - 300, y: GY + 10, s, facing: 1, outfit: MASA, pose: breathe(POSES.holdFront, t), expr: t > 1.4 ? 'determined' : 'worried', rim: rimOf(M, [1, -0.3], 5) });
    const bx = CX - 180, by = GY - 190 * s * 0.75; g.fillStyle = '#76b900'; g.beginPath(); g.ellipse(bx, by, 52, 58, 0, 0, 7); g.fill(); rr(g, bx - 18, by - 74, 36, 24, 6); g.fillStyle = '#5a8f00'; g.fill(); text(g, '$', bx, by + 4, { size: 62, color: '#0b2200', font: FONTS.ui, weight: 900 }); glow(g, bx, by, 150, '#76b900', 0.15);
    drawFigure(g, { x: CX + 300, y: GY + 10, s, facing: -1, outfit: JENSEN, pose: breathe(POSES.relaxed, t, 1, 3), expr: 'smirk', rim: rimOf(M, [-1, -0.3], 5) });
    const tx = CX + 300 - 30, ty = GY - 190 * s * 0.52, sw = Math.sin(t * 3) * 0.1; g.save(); g.translate(tx, ty); g.rotate(sw); seg(g, [[0, -40], [0, 10]], 3, '#e8e2d4'); rr(g, -50, 10, 100, 70, 8); g.fillStyle = '#f4efe6'; g.fill(); circle(g, 0, 26, 5, '#14161f'); text(g, '$ ?', 0, 56, { size: 40, color: '#14161f', font: FONTS.ui, weight: 900 }); g.restore(); });
  FX.rain(g, t, { count: 140, a: 0.16 });
} });

// s039 — "And SoftBank owns ARM,"  big ARM chip, blue flag planted
registerShot('s039', { draw(g, t, info) {
  voidBg(g, t, { glow: '#3a8de0', ga: 0.18 }); const cx = E.W / 2, cy = E.H * 0.56, k = pop(t, 0, 0.45);
  g.save(); g.translate(cx, cy); g.scale(k, k); chip(g, 0, 0, V(7, 6), '#9fb6ff'); text(g, 'ARM', 0, 8, { size: V(120, 100), color: '#0b1324', font: FONTS.ui, weight: 900, spacing: 6 }); g.restore();
  const fk = ease.out(prog(t, 0.5, 1.0)), fx = cx + V(120, 80), fy = cy - V(150, 130) - (1 - fk) * 400; seg(g, [[fx, fy], [fx, fy - 280]], 8, '#e8e2d4'); const wv = Math.sin(t * 5) * 14;
  poly(g, [[fx, fy - 280], [fx + 190, fy - 260 + wv], [fx + 170, fy - 200 - wv * 0.5], [fx, fy - 190]], '#3a8de0'); text(g, 'SB', fx + 90, fy - 232, { size: 54, color: '#fff', font: FONTS.ui, weight: 900 }); glow(g, fx + 90, fy - 230, 240, '#3a8de0', 0.25);
  FX.dust(g, t, { count: 40, color: '#9fb6ff' });
} });

// s040 — "whose boss Nvidia's board reportedly approached for Jensen's old job."
registerShot('s040', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.08, -30, 30); const { GY, CX, M } = office(g, t, cam, { mood: 'interiorCool' }); const s = V(1.45, 1.5);
  layer(g, cam, 1, (g) => {
    desk(g, CX + V(560, 330), GY, { s: 1.1, lampOn: true }); tag(g, "JENSEN'S OLD JOB", CX + V(560, 330), GY - V(360, 380), { a: fadeIn(t, 0.6, 0.3), size: V(26, 28), color: '#ffc66e' });
    const bx = (i) => lerp(CX - V(980, 700) - i * 130, CX - V(60, 0) - i * 140, ease.out(prog(t, 0, info.dur - 0.4)));
    [0, 1, 2].forEach(i => drawFigure(g, { x: bx(i), y: GY + (i - 1) * 14, s, facing: 1, outfit: BOARD, pose: walkPose(t * Math.PI * 1.7 + i * 0.7), expr: 'neutral', rim: rimOf(M, [0, -1]) }));
    drawFigure(g, { x: CX + V(180, 60), y: GY, s, facing: -1, outfit: CROWD, pose: breathe(POSES.holdFront, t), prop: { type: 'paper', hand: 'F' }, expr: 'smirk', rim: rimOf(M, [0, -1], 5) });
    const cp = headPos({ x: CX + V(180, 60), y: GY, s, facing: -1, pose: POSES.stand }); text(g, 'ARM', cp[0] + 10, cp[1] + 140 * s * 0.55, { size: 34, color: '#9fb6ff', font: FONTS.ui, weight: 900 }); });
} });

// s041 — "Musical chairs, with trillion-dollar chairs."  top-down, five players, one chair short
registerShot('s041', { draw(g, t, info) {
  voidBg(g, t, { glow: '#ffc66e', ga: 0.12 }); const cx = E.W / 2, cy = E.H * 0.5, R = V(360, 330), ts = wt(info, t, 'trillion-dollar', 2.2), stop = t > ts;
  const players = [['#ff7a1a'], ['#f2c21a'], ['#ed3a4a'], ['#3a8de0'], ['#76b900']];
  players.forEach(([c], i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, last = i === 4, k = last && stop ? 1 - ease.out(prog(t, ts + 0.1, ts + 0.7)) : 1;
    g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2); g.scale(k, k); rr(g, -62, -62, 124, 124, 22); g.fillStyle = '#1a2036'; g.fill(); g.strokeStyle = '#9fb6ff'; g.lineWidth = 3; g.stroke(); text(g, '$', 0, 4, { size: 66, color: GOLD(), font: FONTS.ui, weight: 900 }); g.restore(); });
  players.forEach(([c], i) => { const run = stop ? 0 : (t * 1.7), a0 = (i / 5) * Math.PI * 2 - Math.PI / 2 + 0.55, a = stop ? ((i / 5) * Math.PI * 2 - Math.PI / 2 + (i === 4 ? 0.4 : 0)) : a0 + run, rr2 = R + (stop && i < 4 ? 0 : 74); const x = cx + Math.cos(a) * rr2, y = cy + Math.sin(a) * rr2;
    circle(g, x, y, 46, '#0a0c16'); circle(g, x, y, 30, c); glow(g, x, y, 100, c, 0.3); });
  text(g, 'ONE CHAIR SHORT', cx, cy, { size: 40, color: '#9fb6d8', font: FONTS.ui, weight: 900, spacing: 4, alpha: stop ? fadeIn(t, ts + 0.4, 0.3) : 0 });
} });

// s042 — "Or he starts over,"  Jensen walks off with a box
registerShot('s042', { draw(g, t, info) {
  const cam = { z: 1.03, x: lerp(-60, 120, ease.inOut(t / info.dur)) }; const { GY, CX, M } = street(g, t, cam, { mood: 'night' }); const s = FS(), x = lerp(CX - 380, CX + 380, ease.inOut(t / info.dur));
  layer(g, cam, 1, (g) => { drawFigure(g, { x, y: GY + 10, s, facing: 1, outfit: JENSEN, pose: walkPose(t * Math.PI * 1.8), expr: 'sad', rim: rimOf(M, [-1, -0.3], 5) });
    const bx = x + 46 * s, by = GY - 120 * s; rr(g, bx - 30, by - 22, 78, 54, 6); g.fillStyle = '#b89a6a'; g.fill(); g.fillStyle = alpha('#fff', 0.2); g.fillRect(bx - 30, by - 22, 78, 8); });
  FX.rain(g, t, { count: 300, a: 0.3 });
} });

// s043 — "like 1993, three engineers in a Denny's booth."
registerShot('s043', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.1); const { GY, CX, M } = diner(g, t, cam);
  layer(g, cam, 1, (g) => { const tb = booth(g, GY, CX, { seat: '#8a2a3a' }), s = V(1.45, 1.5), glass = { top: 'tshirt', color: '#2a2e40', face: 'glasses', head: 'none' };
    drawFigure(g, { x: CX - 250, y: GY, s, facing: 1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'sit'], [1.0, 'sitBack']]), t), expr: 'smile', rim: rimOf(M, [0, -1]), shadow: false });
    drawFigure(g, { x: CX - 420, y: GY, s: s * 0.96, facing: 1, outfit: glass, pose: breathe(POSES.sit, t, 1, 2), expr: 'happy', rim: rimOf(M, [0, -1]), shadow: false });
    drawFigure(g, { x: CX + 260, y: GY, s, facing: -1, outfit: { ...glass, face: 'none' }, pose: breathe(POSES.sit, t, 1, 4), expr: 'smile', rim: rimOf(M, [0, -1]), shadow: false });
    for (const dx of [-60, 70, 150]) { rr(g, CX + dx - 14, tb.top - 28, 28, 30, 5); g.fillStyle = '#f2ece4'; g.fill(); } });
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3 }); UI.badge(g, { str: '1993', a: fadeIn(t, 0.4, 0.3), size: V(70, 70), y: V(150, 170) });
} });

// s044 — "This time, with $100 billion."  cash tower fills the booth
registerShot('s044', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.02, 1.08); const { GY, CX, M } = diner(g, t, cam);
  layer(g, cam, 1, (g) => { const tb = booth(g, GY, CX, { seat: '#8a2a3a' }), s = V(1.45, 1.5), up = ease.out(prog(t, 0.3, 1.6));
    drawFigure(g, { x: CX - 300, y: GY, s, facing: 1, outfit: JENSEN, pose: breathe(POSES.cheer, t), expr: 'joy', rim: rimOf(M, [0, -1]), shadow: false });
    drawFigure(g, { x: CX + 300, y: GY, s, facing: -1, outfit: { top: 'tshirt', color: '#2a2e40', face: 'glasses', head: 'none' }, pose: breathe(POSES.cheer, t, 1, 4), expr: 'shocked', rim: rimOf(M, [0, -1]), shadow: false });
    const rows = Math.floor(12 * up); for (let r = 0; r < rows; r++) { const w = 150 - r * 4; rr(g, CX - w / 2, tb.top - 22 - r * 26, w, 22, 5); g.fillStyle = r % 2 ? '#5aa046' : '#6bb855'; g.fill(); g.fillStyle = alpha('#fff', 0.2); g.fillRect(CX - w / 2 + 6, tb.top - 20 - r * 26, w - 12, 3); }
    glow(g, CX, tb.top - 150, 420 * up, '#8fe05a', 0.28); });
  const tw = wt(info, t, '100', 0.5), n = lerp(0, 100, ease.out(prog(t, tw, tw + 1.2)));
  UI.readout(g, { value: '$' + Math.round(n) + ' BILLION', x: E.W / 2, y: V(150, 190), align: 'center', size: V(110, 90), a: fadeIn(t, tw - 0.1, 0.2) });
  FX.sparkle(g, CX + 130, E.H * 0.4, 24 + 8 * Math.sin(t * 7), '#ffffff', 0.9);
} });

// s045 — "But here's the strangest bet."
registerShot('s045', { draw(g, t, info) {
  voidBg(g, t, { glow: '#76b900', ga: 0.15 }); const cx = E.W / 2, w = V(1400, 940), h = V(620, 700), x0 = cx - w / 2, y0 = (E.H - h) / 2, k = ease.outBack(prog(t, 0, 0.45)), ui = S().ui;
  g.save(); g.translate(cx, E.H / 2); g.scale(k, k); g.translate(-cx, -E.H / 2); card(g, x0, y0, w, h);
  circle(g, x0 + 80, y0 + 84, 12 + 3 * Math.sin(t * 5), '#76b900'); text(g, 'LIVE MARKET', x0 + 112, y0 + 86, { size: 30, color: '#8fe05a', font: FONTS.ui, weight: 900, align: 'left', spacing: 3 });
  fit(g, 'WILL JENSEN', cx, y0 + h * 0.36, w - 120, V(120, 110), { color: '#fff1dc', font: FONTS.ui, weight: 900 }); fit(g, 'REJOIN NVIDIA?', cx, y0 + h * 0.58, w - 120, V(120, 110), { color: '#8fe05a', font: FONTS.ui, weight: 900, glow: 24, glowColor: 'rgba(118,185,0,.6)' });
  rr(g, cx - 270, y0 + h - 130, 240, 80, 40); g.fillStyle = '#76b900'; g.fill(); text(g, 'YES', cx - 150, y0 + h - 88, { size: 40, color: '#0b2200', font: FONTS.ui, weight: 900, spacing: 3 }); rr(g, cx + 30, y0 + h - 130, 240, 80, 40); g.fillStyle = alpha('#9fb6ff', 0.18); g.fill(); text(g, 'NO', cx + 150, y0 + h - 88, { size: 40, color: '#9fb6d8', font: FONTS.ui, weight: 900, spacing: 3 }); g.restore();
} });

// s046 — "Will Jensen rejoin Nvidia?"  at the door, green light spills out
registerShot('s046', { draw(g, t, info) {
  const cam = camPush(t, info.dur, 1.0, 1.1, 20, -20); const { GY, CX, M } = street(g, t, cam, { mood: 'night' }); const pulse = 0.5 + 0.5 * Math.sin(t * 4.5);
  layer(g, cam, 1, (g) => { const dx = CX + V(300, 180), dh = V(430, 470); FX.door(g, { x: dx - 90, y: GY, w: 190, h: dh, color: '#10131f', open: 0.34 + 0.06 * pulse, light: '#76b900' }); glow(g, dx, GY - dh * 0.4, 520 + 60 * pulse, '#76b900', 0.2); FX.pool(g, dx - 160, GY + 36, 360, 40, '#76b900', 0.3);
    chip(g, dx, GY - dh - 70, 1.6, '#76b900'); text(g, 'NVIDIA', dx, GY - dh - 8, { size: 36, color: '#8fe05a', font: FONTS.ui, weight: 900, spacing: 4 });
    drawFigure(g, { x: CX - V(130, 20), y: GY + 10, s: FS(), facing: 1, outfit: JENSEN, pose: breathe(posesAt(t, [[0, 'stand'], [0.9, 'reach']]), t), expr: 'worried', rim: { color: '#8fe05a', dir: [1, -0.2], w: 5 } }); });
  FX.rain(g, t, { count: 160, a: 0.16 });
} });
