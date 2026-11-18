// cast.js — one outfit per recurring character. Exactly ONE saturated signature colour each; identical in every shot.
const sh = (c) => c;   // (colour kept literal on purpose: these are identity colours, not mood colours)
export const JENSEN = { top: 'suit', color: '#76b900', color2: '#5a8f00', head: 'none' };           // Nvidia green jacket
export const ELON = { top: 'tshirt', color: '#ff7a1a', head: 'none' };                                // orange tee
export const MORRIS = { top: 'suit', color: '#f2c21a', color2: '#c99a0a', face: 'glasses', head: 'none' }; // yellow suit + glasses
export const LISA = { top: 'dress', color: '#ed3a4a', head: 'bun' };                                  // red dress + bun
export const MASA = { top: 'suit', color: '#3a8de0', color2: '#2a6cb0', head: 'none' };               // blue suit
export const BOARD = { top: 'suit', color: '#1b1e2e', color2: '#1b1e2e', head: 'none' };              // board member, no colour
export const CROWD = { top: 'tshirt', color: '#1b1e2e', head: 'none' };                               // plain background people
export const SPY = { top: 'trench', color: '#16181f', face: 'sunglasses', head: 'fedora', headColor: '#16181f' };
export const REPORTER = { top: 'tshirt', color: '#1b1e2e', head: 'beanie', headColor: '#1b1e2e' };
export const CAST = [JENSEN, ELON, MORRIS, LISA, MASA];
export const YOU = { top: 'hoodie', color: '#2aa6a0', head: 'none' };                                  // the viewer
