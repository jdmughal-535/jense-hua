// sets/rooms.js — boardroom, hearing room, diner.
import { E, V, mood, layer, backdrop, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { GYf } from '../_h.js';
export function boardroom(g, t, cam, o = {}) {
  const M = mood('interiorCool'), night = mood('night'), GY = GYf(), CX = E.W / 2, dark = shade(M.dark, -0.2);
  layer(g, cam, 0.15, (g) => { backdrop(g, night.sky); FX.skyline(g, { x: -E.W, y: GY - V(240, 420), w: E.W * 3, minH: 100, maxH: V(360, 560), color: mix(night.sky[1], dark, 0.65), windowColor: alpha(night.practical, 0.6), lit: 0.25, seed: 71 }); });
  layer(g, cam, 0.55, (g) => {
    const top = GY - V(620, 960); g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(M.wall, -0.1), shade(M.wall, -0.4)]); g.fillRect(CX - 1700, top, 3400, GY - top + 4);
    for (const i of [-1, 0, 1]) FX.windowFrame(g, { x: CX + i * 560 - 240, y: GY - V(540, 880), w: 480, h: V(420, 600), cols: 3, rows: 1, frame: dark, bar: 12 }, (g, x, y, w, h) => { g.fillStyle = linGrad(g, 0, y, 0, y + h, night.sky); g.fillRect(x, y, w, h); FX.skyline(g, { x, y: y + h, w, minH: 40, maxH: h * 0.7, color: mix(night.sky[1], dark, 0.5), windowColor: alpha(night.practical, 0.8), lit: 0.4, seed: 80 + i }); });
    glow(g, CX, GY - V(300, 500), 700, night.rim, 0.06);
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, GY + 400, [shade(M.floor, 0.05), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2); FX.floorLines(g, GY, GY + 600, 'rgba(0,0,0,.3)', 0.08); });
  layer(g, cam, 1, (g) => o.behind?.(g, GY, CX));
  layer(g, cam, 1, (g) => {
    rr(g, CX - 760, GY - 150, 1520, 20, 8); g.fillStyle = shade(M.wall, 0.1); g.fill(); g.fillStyle = dark; g.fillRect(CX - 740, GY - 130, 1480, 130); g.fillStyle = alpha(night.rim, 0.12); g.fillRect(CX - 740, GY - 150, 1480, 4); });
  return { GY, CX, M, tableTop: GY - 150 };
}
export function hearing(g, t, cam, o = {}) {
  const M = mood('interiorWarm'), GY = GYf(), CX = E.W / 2, dark = shade(M.dark, -0.3), wood = '#3a2620';
  layer(g, cam, 0.5, (g) => { const top = GY - V(640, 980); g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(wood, 0.1), shade(wood, -0.45)]); g.fillRect(CX - 1800, top, 3600, GY - top + 4);
    for (let i = -4; i <= 4; i++) { g.fillStyle = alpha('#000', 0.2); g.fillRect(CX + i * 220 - 4, top, 8, GY - top); }
    for (const s of [-1, 1]) { rr(g, CX + s * 660 - 60, GY - V(520, 800), 120, V(360, 520), 8); g.fillStyle = '#26324a'; g.fill(); for (let k = 0; k < 3; k++) { g.fillStyle = k % 2 ? '#a02a2a' : '#d8d8e4'; g.fillRect(CX + s * 660 - 60, GY - V(520, 800) + 20 + k * 40, 120, 20); } }
    glow(g, CX, GY - V(420, 700), 760, M.practical, 0.08); });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, GY + 380, [shade('#2a1c1a', 0.1), shade('#1a1010', -0.2)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2); FX.floorLines(g, GY, GY + 600, 'rgba(0,0,0,.3)', 0.08); });
  layer(g, cam, 1, (g) => o.behind?.(g, GY, CX));
  layer(g, cam, 1, (g) => {
    g.fillStyle = shade(wood, -0.1); g.fillRect(CX - 900, GY - 230, 1800, 230); g.fillStyle = shade(wood, 0.18); g.fillRect(CX - 920, GY - 242, 1840, 14); });
  return { GY, CX, M, dais: GY - 242 };
}
export function diner(g, t, cam, o = {}) {
  const M = mood('interiorWarm'), night = mood('night'), GY = GYf(), CX = E.W / 2, dark = shade(M.dark, -0.2);
  layer(g, cam, 0.55, (g) => {
    const top = GY - V(640, 980); g.fillStyle = linGrad(g, 0, top, 0, GY, [shade('#5a2a34', -0.1), shade('#3a1a24', -0.3)]); g.fillRect(CX - 1700, top, 3400, GY - top + 4);
    FX.windowFrame(g, { x: CX - 520, y: GY - V(520, 860), w: 1040, h: V(360, 520), cols: 4, rows: 1, frame: dark, bar: 12 }, (g, x, y, w, h) => { g.fillStyle = linGrad(g, 0, y, 0, y + h, night.sky); g.fillRect(x, y, w, h); FX.skyline(g, { x, y: y + h, w, minH: 40, maxH: h * 0.6, color: mix(night.sky[1], dark, 0.5), windowColor: alpha(night.practical, 0.8), lit: 0.4, seed: 91 }); });
    text(g, 'DINER', CX + V(560, 300), GY - V(560, 900), { size: 54, color: '#ff6aa8', glow: 30, glowColor: 'rgba(255,90,160,.9)', spacing: 8, alpha: 0.75 + 0.25 * Math.sin(t * 7 + Math.sin(t * 2) * 3) });
    for (const dx of [-420, 0, 420]) { glow(g, CX + dx, GY - V(620, 1000), 160, M.practical, 0.35); }
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, GY + 380, ['#4a2a30', '#241418']); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    for (let i = -10; i < 24; i++) { g.fillStyle = (i % 2) ? alpha('#000', 0.18) : alpha('#fff', 0.05); g.fillRect(i * 100, GY, 100, E.H); }
    FX.pool(g, CX, GY + 40, 520, 60, M.practical, 0.2); });
  return { GY, CX, M };
}
// booth: seat backs left/right + table (side view); call before drawing figures
export function booth(g, GY, CX, o = {}) {
  const c1 = o.seat || '#8a2a3a', top = GY - 150;
  for (const s of [-1, 1]) { rr(g, CX + s * 330 - 40, GY - 250, 80, 250, 18); g.fillStyle = shade(c1, -0.2); g.fill(); rr(g, CX + s * 250 - (s > 0 ? 0 : 130), GY - 100, 130, 100, 14); g.fillStyle = c1; g.fill(); }
  seg(g, [[CX, top], [CX, GY - 4]], 14, '#1a1216'); rr(g, CX - 190, top - 14, 380, 18, 8); g.fillStyle = '#d8c8b0'; g.fill(); g.fillStyle = 'rgba(255,220,160,.5)'; g.fillRect(CX - 184, top - 14, 368, 3);
  return { top: top - 14 };
}
