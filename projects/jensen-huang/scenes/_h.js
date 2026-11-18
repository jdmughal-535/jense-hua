// _h.js — shared helpers for the Jensen Huang video (underscore = not auto-loaded as a scene).
import { E, V, S, mood, ease, prog, clamp, lerp, alpha, shade, mix, rr, seg, poly, circle, ring, text, glow, linGrad, radGrad, FONTS, measure, rng, wordTime } from '/engine/core.js';
export const GYf = () => E.H * V(0.8, 0.68);
export const rimOf = (M, dir = [0, -1], w = 4) => ({ color: M.rim, dir, w });
export const camPush = (t, dur, z0 = 1, z1 = 1.07, x0 = 0, x1 = 0, y0 = 0, y1 = 0) => { const k = ease.inOut(t / Math.max(0.01, dur)); return { z: lerp(z0, z1, k), x: lerp(x0, x1, k), y: lerp(y0, y1, k) }; };
export const pop = (t, a, d = 0.35) => ease.outBack(prog(t, a, a + d));
export const fadeIn = (t, a, d = 0.3) => ease.out(prog(t, a, a + d));
export const fadeOut = (t, dur, d = 0.3) => clamp((dur - t) / d);
// text that shrinks to fit maxW
export function fit(g, str, x, y, maxW, size, o = {}) { const w = measure(g, str, size, o.font || FONTS.title, o.weight || 700); text(g, str, x, y, { ...o, size: size * Math.min(1, maxW / Math.max(1, w)) }); }
// dark UI card
export function card(g, x, y, w, h, o = {}) { const ui = S().ui; rr(g, x, y, w, h, o.r ?? 24); g.fillStyle = o.fill || ui.card; g.fill(); g.strokeStyle = o.line || ui.cardLine; g.lineWidth = 2.5; g.stroke(); }
// rubber stamp (rotated, bordered)
export function stamp(g, str, x, y, o = {}) {
  const { size = 64, rot = -0.12, color = '#e8503a', a = 1, k = 1 } = o; if (a <= 0 || k <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); g.globalAlpha *= a; const w = measure(g, str, size, FONTS.ui, 900) + size * 0.8;
  rr(g, -w / 2, -size * 0.75, w, size * 1.5, 12); g.strokeStyle = color; g.lineWidth = size * 0.1; g.stroke();
  text(g, str, 0, 0, { size, color, font: FONTS.ui, weight: 900, spacing: 3 }); g.restore();
}
// computer chip icon
export function chip(g, x, y, s = 1, color = '#76b900', a = 1) {
  g.save(); g.translate(x, y); g.scale(s, s); g.globalAlpha *= a;
  for (let i = -2; i <= 2; i++) { seg(g, [[i * 14, -34], [i * 14, -22]], 4, alpha(color, 0.9)); seg(g, [[i * 14, 22], [i * 14, 34]], 4, alpha(color, 0.9)); seg(g, [[-34, i * 14], [-22, i * 14]], 4, alpha(color, 0.9)); seg(g, [[22, i * 14], [34, i * 14]], 4, alpha(color, 0.9)); }
  rr(g, -24, -24, 48, 48, 8); g.fillStyle = shade(color, -0.55); g.fill(); g.strokeStyle = color; g.lineWidth = 3; g.stroke();
  rr(g, -11, -11, 22, 22, 4); g.fillStyle = color; g.fill(); g.restore();
}
// speech bubble with tail pointing at (tx,ty); text auto-fits (supports one or two lines)
export function speech(g, x, y, w, h, lines, o = {}) {
  const { tx = x, ty = y + h, a = 1, k = 1, size = 40, color = '#f4efe6', tcolor = '#14161f' } = o; if (a <= 0 || k <= 0) return;
  g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(k, k); g.translate(-x, -y);
  rr(g, x - w / 2, y - h / 2, w, h, 26); g.fillStyle = color; g.fill();
  poly(g, [[x - 22, y + h / 2 - 3], [x + 22, y + h / 2 - 3], [tx, ty]], color);
  const L = Array.isArray(lines) ? lines : [lines];
  L.forEach((s, i) => fit(g, s, x, y + (i - (L.length - 1) / 2) * size * 1.1, w - 50, size, { color: tcolor, font: FONTS.ui, weight: 900 }));
  g.restore();
}
// name tag pill
export function tag(g, str, x, y, o = {}) {
  const { size = V(30, 34), color = S().ui.cream, a = 1, k = 1 } = o; if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(k, k);
  const w = measure(g, str, size, FONTS.ui, 900) + 40; rr(g, -w / 2, -size * 0.8, w, size * 1.6, size * 0.8); g.fillStyle = 'rgba(8,12,24,.78)'; g.fill(); g.strokeStyle = alpha(color, 0.5); g.lineWidth = 2; g.stroke();
  text(g, str, 0, 2, { size, color, font: FONTS.ui, weight: 900, spacing: 2 }); g.restore();
}
// glowing dark backdrop for titles / data / text shots
export function voidBg(g, t, o = {}) {
  const M = mood(o.mood || 'void'); g.fillStyle = linGrad(g, 0, 0, 0, E.H, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  glow(g, o.gx ?? E.W / 2, o.gy ?? E.H * 0.55, E.W * 0.55, o.glow || M.rim, o.ga ?? 0.16);
  g.strokeStyle = 'rgba(143,184,232,.045)'; g.lineWidth = 1; for (let x = 0; x <= E.W; x += 80) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 80) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); }
  return M;
}
// big glowing headline word(s)
export function headline(g, t, dur, str, o = {}) {
  const a = clamp(Math.min(t / 0.3, (dur - t) / 0.3)), k = 0.9 + 0.1 * ease.outBack(prog(t, 0, 0.45)); if (a <= 0) return;
  g.save(); g.globalAlpha *= a; g.translate(E.W / 2, o.y ?? E.H / 2); g.scale(k, k);
  fit(g, str, 0, 0, E.W * 0.86, o.size ?? V(150, 120), { color: o.color || S().ui.gold, glow: 34, glowColor: alpha(o.color || S().ui.gold, 0.7), spacing: 5 }); g.restore();
}
// Nvidia tower (night)
export function tower(g, x, GY, s = 1, o = {}) {
  const M = mood('night'), w = 240 * s, h = 760 * s, c = o.color || '#76b900';
  g.fillStyle = linGrad(g, 0, GY - h, 0, GY, [shade(M.wall, -0.2), shade(M.wall, -0.55)]); g.fillRect(x - w / 2, GY - h, w, h);
  for (let r = 0; r < 24; r++) for (let q = 0; q < 6; q++) if (((r * 7 + q * 13) % 5) > 1) { g.fillStyle = alpha(M.practical, 0.35 + ((r + q) % 3) * 0.12); g.fillRect(x - w / 2 + 14 * s + q * 36 * s, GY - h + 24 * s + r * 30 * s, 20 * s, 14 * s); }
  rr(g, x - w / 2 - 10 * s, GY - h - 14 * s, w + 20 * s, 18 * s, 4); g.fillStyle = shade(M.wall, -0.3); g.fill();
  glow(g, x, GY - h * 0.52, h * 0.8, c, 0.09); seg(g, [[x - w / 2, GY - h * 0.2], [x - w / 2, GY - h]], 4 * s, alpha(c, 0.8)); seg(g, [[x + w / 2, GY - h * 0.2], [x + w / 2, GY - h]], 4 * s, alpha(c, 0.8));
}

// local (shot) time of a spoken word: wt(info, t, 'Elon,', 0.5). Falls back to `fb` seconds if the word isn't found.
export const wt = (info, t, word, fb = 0.5) => { const s0 = info.globalT - t; const w = wordTime(word, s0 - 0.05); return w == null ? fb : Math.max(0, w - s0); };
export const fmtNum = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
