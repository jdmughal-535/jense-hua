// sets/office.js — Jensen's corner office: big window onto a lit night skyline, desk lamp pool. mood: interiorCool (cold) or interiorWarm (end).
import { E, V, mood, layer, backdrop, rr, seg, circle, linGrad, radGrad, glow, alpha, shade, mix } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { GYf } from '../_h.js';
export function office(g, t, cam, o = {}) {
  const M = mood(o.mood || 'interiorCool'), GY = GYf(), CX = E.W / 2, night = mood('night');
  const wall = shade(M.wall, -0.35), dark = shade(M.dark, -0.2);
  layer(g, cam, 0.15, (g) => { backdrop(g, night.sky); FX.stars(g, t, { count: 90, area: [0, 0, E.W, E.H * 0.5] }); FX.moon(g, CX + V(520, 260), GY - V(640, 1000), 46); FX.skyline(g, { x: -E.W, y: GY - V(300, 520), w: E.W * 3, minH: 90, maxH: V(330, 520), color: mix(night.sky[1], dark, 0.7), windowColor: alpha(night.practical, 0.55), lit: 0.22, seed: 21 }); });
  layer(g, cam, 0.55, (g) => {
    const top = GY - V(640, 980); g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(wall, 0.05), wall, dark]); g.fillRect(CX - 1700, top, 3400, GY - top + 4);
    const ww = V(1180, 900), wh = V(480, 640), wx = CX - ww / 2, wy = GY - V(560, 900);
    FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 4, rows: 2, frame: dark, bar: 12 }, (g, x, y, w, h) => {
      g.fillStyle = linGrad(g, 0, y, 0, y + h, night.sky); g.fillRect(x, y, w, h);
      FX.skyline(g, { x, y: y + h, w, minH: 70, maxH: h * 0.8, color: mix(night.sky[1], dark, 0.55), windowColor: alpha(night.practical, 0.8), lit: 0.4, seed: 5, minW: 40, maxW: 100 });
      glow(g, x + w * 0.78, y + h * 0.22, 160, '#dfe8ff', 0.25); });
    glow(g, CX, wy + wh / 2, 520, night.rim, 0.07);
    g.fillStyle = dark; g.fillRect(CX - 1700, GY - 34, 3400, 34);                   // skirting
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + 420, [shade(M.floor, 0.05), shade(M.dark, -0.2)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.floorLines(g, GY, GY + 640, 'rgba(0,0,0,.28)', 0.08);
    FX.pool(g, CX, GY + 40, 520, 70, night.rim, 0.12);
  });
  return { GY, CX, M };
}
// the desk (side view) with lamp + monitor; returns { top }
export function desk(g, x, GY, o = {}) {
  const { s = 1, lamp = '#ffd59a', lampOn = true, color = '#1a1a26' } = o, top = GY - 150 * s;
  rr(g, x - 190 * s, top, 380 * s, 18 * s, 6); g.fillStyle = shade(color, 0.1); g.fill(); g.fillStyle = color; g.fillRect(x - 176 * s, top + 18 * s, 22 * s, 132 * s); g.fillRect(x + 154 * s, top + 18 * s, 22 * s, 132 * s); g.fillRect(x - 176 * s, top + 40 * s, 352 * s, 70 * s);
  seg(g, [[x + 90 * s, top], [x + 70 * s, top - 70 * s], [x + 120 * s, top - 110 * s]], 5 * s, color); rr(g, x + 100 * s, top - 124 * s, 46 * s, 22 * s, 8); g.fillStyle = color; g.fill();
  if (lampOn) { glow(g, x + 124 * s, top - 96 * s, 260 * s, lamp, 0.5); FX.pool(g, x + 40 * s, top + 4, 190 * s, 24 * s, lamp, 0.4); }
  rr(g, x - 120 * s, top - 96 * s, 130 * s, 84 * s, 6); g.fillStyle = '#0c0e16'; g.fill(); g.fillStyle = alpha('#9fe0ff', 0.2); g.fillRect(x - 112 * s, top - 88 * s, 114 * s, 68 * s);
  return { top };
}
