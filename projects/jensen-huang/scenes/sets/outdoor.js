// sets/outdoor.js — night rooftop and rainy night street.
import { E, V, mood, layer, backdrop, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { GYf } from '../_h.js';
export function rooftop(g, t, cam, o = {}) {
  const M = mood(o.mood || 'night'), GY = GYf(), CX = E.W / 2, dark = shade(M.dark, -0.3);
  layer(g, cam, 0.12, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 120, area: [0, 0, E.W, E.H * 0.5] }); FX.moon(g, CX - V(560, 200), GY - V(620, 1000), 52); });
  layer(g, cam, 0.3, (g) => FX.skyline(g, { x: -E.W, y: GY - V(80, 180), w: E.W * 3, minH: 120, maxH: V(420, 640), color: mix(M.sky[1], dark, 0.6), windowColor: alpha(M.practical, 0.6), lit: 0.2, seed: 31 }));
  layer(g, cam, 0.55, (g) => { FX.skyline(g, { x: -E.W, y: GY - 10, w: E.W * 3, minH: 60, maxH: V(260, 420), color: shade(M.wall, -0.35), windowColor: alpha(M.practical, 0.75), lit: 0.3, seed: 41, minW: 60, maxW: 140 }); seg(g, [[CX + 520, GY - 10], [CX + 520, GY - 400]], 5, dark); circle(g, CX + 520, GY - 404, 7, '#ff4a3a'); glow(g, CX + 520, GY - 404, 60 + 20 * Math.sin(t * 3), '#ff4a3a', 0.5); });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + 300, [shade(M.floor, 0.12), shade(M.dark, -0.4)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    g.fillStyle = shade(M.wall, 0.05); g.fillRect(-E.W, GY, E.W * 3, 8); FX.floorLines(g, GY, GY + 500, 'rgba(0,0,0,.3)', 0.08);
    rr(g, CX - 520, GY - 70, 160, 70, 6); g.fillStyle = shade(M.wall, -0.2); g.fill(); rr(g, CX + 380, GY - 56, 120, 56, 6); g.fillStyle = shade(M.wall, -0.25); g.fill();
    FX.pool(g, CX, GY + 36, 560, 60, M.rim, 0.08);
  });
  return { GY, CX, M };
}
export function street(g, t, cam, o = {}) {
  const M = mood(o.mood || 'night'), GY = GYf(), CX = E.W / 2, dark = shade(M.dark, -0.3);
  layer(g, cam, 0.12, (g) => { backdrop(g, M.sky); FX.skyline(g, { x: -E.W, y: GY - V(160, 300), w: E.W * 3, minH: 120, maxH: V(460, 700), color: mix(M.sky[1], dark, 0.65), windowColor: alpha(M.practical, 0.55), lit: 0.22, seed: 51 }); });
  layer(g, cam, 0.5, (g) => { for (let i = -3; i < 6; i++) FX.facade(g, { x: i * 520 - 200, y: GY - 6, w: 500, h: V(460, 700) - (i % 2) * 90, color: shade(M.wall, -0.3 - (i % 3) * 0.06), win: M.practical, dark: dark, cols: 5, rows: 5, lit: 0.34, seed: 60 + i }); });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + 380, [shade(M.road, -0.05), shade(M.dark, -0.45)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    g.fillStyle = shade(M.road, 0.14); g.fillRect(-E.W, GY, E.W * 3, 7);
    for (const lx of [CX - 640, CX + 560]) { FX.lampPost(g, lx, GY, V(360, 520), { light: M.practical, a: 0.22 }); FX.pool(g, lx + 30, GY + 40, 260, 40, M.practical, 0.28); }
    FX.floorLines(g, GY, GY + 600, 'rgba(0,0,0,.25)', 0.08);
  });
  return { GY, CX, M };
}
