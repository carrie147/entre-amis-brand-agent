// Entre Amis × Fizz Fest 2027: founding Event Partner deck (nine slides, draft for founder approval).
// Copy: EA_Fizz_Fest_Event_Mode_Pitch_v2_20_Oct_2026.md and the founder's brief (21 October 2026).
// Feature status: Event and Partner readiness audit, 21 October 2026. Brand Brain wins where they differ.
//
//   node build.js [out.pptx] [--final]
//
// Without --final the blush-bordered review flags are kept on the slides.
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const { applyTheme } = require("/root/.claude/skills/synced/5ee89fbe-4dd3-4dd9-b68c-1a3ffd397f5a_b93dcb02-b9f8-4562-a479-8ad578fc1368/pptx/scripts/apply_theme.js");

const OUT = process.argv[2] || "Entre Amis x Fizz Fest 2027 - founding Event Partner - DRAFT.pptx";
const FINAL = process.argv.includes("--final");
const LOGO = path.resolve(__dirname, "../logo.png"); // 304 x 153, low-res placeholder
const LOGO_RATIO = 153 / 304;
const IMG_DIR = path.resolve(__dirname, "images");

// Sous-bois core colours only (Brand Brain 04). Blush is the single accent.
const HEX = { deepOlive: "565A32", midOlive: "8B8B5C", sage: "B9BC9A", cream: "EFEAE0", blush: "E3AC9A", white: "FFFFFF" };
const THEME = {
  name: "Entre Amis Sous-bois",
  headFontFace: "Raleway Light",
  bodyFontFace: "Raleway Light",
  colors: {
    dk1: HEX.deepOlive, lt1: HEX.white, dk2: HEX.deepOlive, lt2: HEX.cream,
    accent1: HEX.deepOlive, accent2: HEX.midOlive, accent3: HEX.sage, accent4: HEX.blush,
    accent5: HEX.cream, accent6: HEX.deepOlive, hlink: HEX.deepOlive, folHlink: HEX.midOlive,
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Entre Amis × Fizz Fest 2027";
pres.author = "Entre Amis";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };

const C = pres.SchemeColor;
const OLIVE = C.text1, CREAM = C.background2, WHITE = C.background1;
const MID = C.accent2, SAGE = C.accent3, BLUSH = C.accent4;
const BOLD = "Raleway SemiBold";
const W = 13.333, H = 7.5, M = 0.6, CW = W - 2 * M;

// ---------- Placeholder images (swap with Change Picture) ----------
// Founder's photos (project files, entre-amis/fizz-fest/photos), by placeholder file. focus = crop centre (0-1).
const PHOTO_DIR = "/mnt/project-files/entre-amis/fizz-fest/photos";
const PHOTOS = {
  "01-cover.png": ["09-fizz-fest-letters.jpeg", [0.5, 0.45]],
  "02-why.png": ["10-glass-in-vineyard.jpeg", [0.3, 0.5]],
  "03-world-1.png": ["15-game.jpg", [0.5, 0.42]],
  "03-world-3.png": ["04-terrace-bistrot-sign.jpeg", [0.8, 0.5]],
  "03-world-4.png": ["02-stand-sparkling-bottles.jpeg", [0.5, 0.45]],
  "04-beyond-1.png": ["01-vineyard-rows.jpeg", [0.5, 0.55]],
  "04-beyond-2.png": ["12-stand-ice-bucket.jpeg", [0.5, 0.82]],
  "04-beyond-3.png": ["06-table-written-on-2.jpeg", [0.5, 0.9]],
  "07-vineyard.png": ["05-vineyard-rows-post.jpeg", [0.5, 0.5]],
  "08-table.png": ["03-table-written-on.jpeg", [0.5, 0.55]],
  "09-close.png": ["07-terrace-orange-table.jpg", [0.5, 0.45]],
};
const shots = [];
function shot(file, w, h, kind, text) {
  const real = PHOTOS[file] && fs.existsSync(path.join(PHOTO_DIR, PHOTOS[file][0]));
  shots.push(real ? { file: file.replace(".png", ".jpg"), w, h, src: path.join(PHOTO_DIR, PHOTOS[file][0]), focus: PHOTOS[file][1] } : { file, w, h, kind, text });
  return path.join(IMG_DIR, real ? file.replace(".png", ".jpg") : file);
}

// ---------- Layouts (house style: decks/source/build.js) ----------
pres.defineSlideMaster({ title: "EA Cover", background: { color: CREAM }, objects: [] });
pres.defineSlideMaster({
  title: "EA Content",
  background: { color: CREAM },
  margin: [0.5, 0.6, 0.75, 0.6],
  objects: [
    { text: { text: "Say what you really think.", options: { x: M, y: 6.95, w: 5, h: 0.3, fontSize: 10, color: OLIVE, margin: 0, isTextBox: true } } },
    { image: { path: LOGO, x: W - M - 1.1, y: 6.72, w: 1.1, h: 1.1 * LOGO_RATIO, altText: "Entre Amis logo" } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.45, w: 8.9, h: 0.75, fontSize: 36, color: OLIVE, fontFace: THEME.headFontFace, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "subtitle", type: "body", x: M, y: 1.22, w: CW, h: 0.45, fontSize: 18, color: OLIVE, fontFace: THEME.bodyFontFace, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: W - M - 0.6, y: 0.5, w: 0.6, h: 0.3, fontSize: 12, color: OLIVE, fontFace: THEME.bodyFontFace, align: "right" },
});

// ---------- Helpers ----------
const sh = () => ({ type: "outer", color: "565A32", opacity: 0.12, blur: 6, offset: 2, angle: 90 });
function txt(s, runs, o) {
  s.addText(runs, Object.assign({ isTextBox: true, margin: 0, color: OLIVE, fontSize: 15, valign: "top", paraSpaceAfter: 4 }, o));
}
function label(text, color = OLIVE, size = 12) {
  return { text, options: { fontFace: BOLD, fontSize: size, color, charSpacing: 1.5, breakLine: true } };
}
const gap = (n = 6) => ({ text: " ", options: { fontSize: n, breakLine: true } });
function card(s, x, y, w, h, name, fill = WHITE) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: 0.1, shadow: fill === WHITE ? sh() : undefined, objectName: name });
}
function content(title, subtitle, size) {
  const s = pres.addSlide({ masterName: "EA Content" });
  s.addText(size ? [{ text: title, options: { fontSize: size } }] : title, { placeholder: "title" });
  if (subtitle) s.addText(subtitle, { placeholder: "subtitle" });
  return s;
}
function photo(s, file, x, y, w, h, text, alt) {
  s.addImage({ path: shot(file, w, h, "photo", text), x, y, w, h, altText: alt || text, objectName: "Photo placeholder: " + text });
}
// Status tags: honest distinctions between what's built and what isn't (audit, 21 October 2026).
const STATUS = {
  built: { text: "BUILT IN THE PROTOTYPE", fill: OLIVE, color: CREAM, line: OLIVE },
  setup: { text: "BUILT · NEEDS SET-UP", fill: WHITE, color: OLIVE, line: OLIVE },
  proposed: { text: "PROPOSED", fill: SAGE, color: OLIVE, line: SAGE },
  illustrative: { text: "ILLUSTRATIVE", fill: CREAM, color: OLIVE, line: OLIVE, dash: "dash" },
  future: { text: "FUTURE AMBITION", fill: SAGE, color: OLIVE, line: SAGE },
  dev: { text: "IN DEVELOPMENT", fill: OLIVE, color: CREAM, line: OLIVE },
  concept: { text: "CONCEPT", fill: SAGE, color: OLIVE, line: SAGE },
};
function status(s, x, y, key, w, text, maxW = 9) {
  const t = STATUS[key], label = text || t.text;
  w = Math.min(w || 0.4 + label.length * 0.09, maxW);
  s.addText(label, { x, y, w, h: 0.3, isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.15, fill: { color: t.fill }, line: { color: t.line, width: 1, dashType: t.dash || "solid" }, color: t.color, fontFace: BOLD, fontSize: 10, charSpacing: 1, align: "center", valign: "middle", margin: 0, objectName: "Status: " + label });
}
// A visible review flag: white box, blush border. Removed with --final.
function flag(s, x, y, w, h, kind, text, size = 11) {
  if (FINAL) return;
  s.addText([
    { text: kind + "  ", options: { fontFace: BOLD, color: OLIVE } },
    { text, options: { color: OLIVE } },
  ], { x, y, w, h, isTextBox: true, fontSize: size, margin: [3, 6, 3, 6], valign: "middle", fill: { color: WHITE }, line: { color: BLUSH, width: 2 }, objectName: "FLAG — delete before sharing" });
}

// ---------- 1 · Make more of every discovery ----------
{
  const s = pres.addSlide({ masterName: "EA Cover" });
  const lw = 2.8, lh = lw * LOGO_RATIO;
  s.addImage({ path: LOGO, x: (W - lw) / 2, y: 0.45, w: lw, h: lh, altText: "Entre Amis logo" });
  txt(s, "Make more of every discovery", { x: M, y: 2.35, w: CW, h: 0.6, fontSize: 32, align: "center" });
  txt(s, "Entre Amis × Fizz Fest 2027", { x: M, y: 3.1, w: CW, h: 0.4, fontSize: 16, align: "center" });
  photo(s, "01-cover.png", 0, 4.3, W, H - 4.3, "An atmospheric festival table: glasses of sparkling wine catching the light, people leaning in to talk", "Atmospheric photograph of a festival tasting table");
  s.addNotes("Opening: the partnership opportunity, with one atmospheric image. Cover follows the Event Mode pack: logo and line, with no Event Mode marker as this is a specific proposal (founder, v4 review).\n\nFrom the v2 copy, not on the slide (kept for what you say): more discovery, more connection, more understanding; more engaging for visitors, more valuable for vineyards, more memorable beyond the day.\n\nNo Fizz Fest logo is used. The deck is a proposal: nothing implies Fizz Fest has agreed to anything.");
}

// ---------- 2 · Why we created Entre Amis ----------
{
  const s = content("Why we created Entre Amis", "Great wines deserve to be discovered. And remembered.");
  const lw = 7.0, cw = (lw - 0.3) / 2, y = 4.6, h = 1.75;
  card(s, M, 1.95, lw, 2.35, "Brand promise", OLIVE);
  txt(s, [label("OUR PROMISE", CREAM), gap(8), { text: "Any wine. Any table. Everyone has something worth saying.", options: { fontSize: 26 } }], { x: M + 0.4, y: 2.2, w: lw - 0.8, h: 1.85, color: CREAM, valign: "middle" });
  [["FOR YOUR VISITORS", "Discover, learn and remember."], ["FOR PRODUCERS", "Be noticed, and gain useful feedback."]].forEach(([hd, b], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, y, cw, h, "Card: " + hd);
    txt(s, [label(hd), gap(8), { text: b }], { x: x + 0.3, y: y + 0.3, w: cw - 0.6, h: h - 0.5, fontSize: 20 });
  });
  photo(s, "02-why.png", M + lw + 0.3, 1.95, CW - lw - 0.3, 4.4, "Close up: a glass raised at a stand, the maker pouring and talking", "Photograph of a producer pouring at a tasting stand");
  s.addNotes("The emotional proposition for visitors and the opportunity for producers, from the v2 copy.\n\nThe promise is confirmed supporting line 3 (Brand Brain 02), used exactly as written.");
}

// ---------- 3 · The Entre Amis world ----------
{
  const s = content("The Entre Amis world", "Connection doesn't end when tasting does.");
  const steps = ["Inspire", "Discover", "Experience", "Belong"];
  const sw = 1.95, ag = 0.5, sx = (W - (4 * sw + 3 * ag)) / 2;
  steps.forEach((t, i) => {
    const x = sx + i * (sw + ag);
    s.addText(t, { x, y: 1.95, w: sw, h: 0.5, isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.25, fill: { color: OLIVE }, color: CREAM, fontSize: 18, align: "center", valign: "middle", margin: 0, objectName: "Journey: " + t });
    if (i < steps.length - 1) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + sw + 0.12, y: 2.08, w: 0.31, h: 0.24, fill: { color: MID }, line: { color: MID, width: 0 } });
  });
  const tiles = [
    ["THE GAME", "A table game that turns any wine into conversation, for two to eight players.", "The boxed game on a table: cards, spinner and crown, glasses beside it"],
    ["THE APP", "Hosts the game, explains wine in plain English, and keeps My wines: a record of tastings and favourites.", "Stock shot to find: a phone on a table showing a wine in My wines"],
    ["PARTNER MODE", "A hosted tasting that guests join, for a vineyard, bar, restaurant, retailer or wine club.", "A hosted tasting at a vineyard: the host presenting, guests with phones and glasses"],
    ["EVENT MODE", "Entre Amis across a whole event, for organisers, producers and visitors. We're looking for a launch partner.", "Visitors at a stand scanning a QR card with their phones"],
  ];
  const g = 0.3, tw = (CW - 3 * g) / 4, ty = 2.7, ih = 1.5, th = 3.85;
  tiles.forEach(([hd, b, ph], i) => {
    const x = M + i * (tw + g);
    card(s, x, ty, tw, th, "Tile: " + hd);
    photo(s, `03-world-${i + 1}.png`, x, ty, tw, ih, ph);
    txt(s, [label(hd), gap(5), { text: b }], { x: x + 0.22, y: ty + ih + 0.2, w: tw - 0.44, h: th - ih - 0.4, fontSize: 14 });
  });
  s.addNotes("The journey is the confirmed Inspire → Discover → Experience → Belong (Brand Brain 00; founder, 21 October). The v2 line 'Discover → Play → Remember → Experience → Belong' is replaced: Play is not shown as a step.\n\nFour parts of the Entre Amis world, all in development (nothing is launched); the tags are off the slide to let people imagine it (founder, v4 review). The game photo is the founder's prototype. Stays are left off (founder, 21 October). Event Mode: in development, and we're looking for a launch partner (founder, 21 October).");
}

// ---------- 4 · What if Fizz Fest lasted beyond the day? ----------
{
  const s = content("What if Fizz Fest lasted beyond the day?", "One day of discovery. A longer relationship.", 28);
  const cols = [
    ["BEFORE", "Build anticipation. Visitors discover the vineyards and wines they'll meet.", "proposed", "PLANNING PROPOSED", "Hands holding a festival programme and a phone, a garden table"],
    ["DURING", "Capture discoveries and conversations, stand by stand, as visitors taste.", "built", null, "A busy hall: people talking at a stand, glasses in hand"],
    ["AFTER", "Visitors revisit their favourites in My wines, and stay connected where they've given permission.", "built", "MY WINES BUILT", "Back at home: a phone beside a glass, a saved wine on screen"],
  ];
  const g = 0.3, cw = (CW - 2 * g) / 3, y = 1.95, ih = 1.75, ch = 4.4;
  // A quiet thread through the three moments.
  s.addShape(pres.shapes.LINE, { x: M + cw / 2, y: y + ih + 0.35, w: CW - cw, h: 0, line: { color: SAGE, width: 1.5 }, objectName: "Timeline" });
  cols.forEach(([hd, b, st, stText, ph], i) => {
    const x = M + i * (cw + g);
    photo(s, `04-beyond-${i + 1}.png`, x, y, cw, ih, ph);
    s.addShape(pres.shapes.OVAL, { x: x + cw / 2 - 0.11, y: y + ih + 0.24, w: 0.22, h: 0.22, fill: { color: i === 1 ? BLUSH : OLIVE }, line: { color: CREAM, width: 2 }, objectName: "Timeline dot: " + hd });
    txt(s, [label(hd, OLIVE, 13), gap(5), { text: b }], { x, y: y + ih + 0.6, w: cw, h: ch - ih - 0.6 - 0.4, fontSize: 16 });
    status(s, x, y + ch - 0.3, st, null, stText);
  });
  s.addNotes("Before / During / After, from the v2 copy.\n\nAudit, 21 October: producer and wine discovery are built in the prototype for the day itself; there is no planning or pre-event programme (not found). During is built in the prototype, not yet run live. After: Save my day to My wines is built (Event save not yet founder-tested).\n\n'Stay connected where they've given permission' uses the contact-details rule: separate, unticked consent per business, contact details only (founder confirmed, 21 October). Legal review of the wording still comes before it's used with visitors.");
}

// ---------- 5 · Simple for visitors ----------
{
  const s = content("Simple for visitors. Useful beyond the day.", "Discover → Plan → Experience → Remember", 28);
  const steps = [
    ["DISCOVER", "Meet the vineyards and their wines, and read each producer's story.", "Producer page: story and wines"],
    ["PLAN", "Plan a personal visit around the stands.", "Visit plan (proposed screen)"],
    ["EXPERIENCE", "Scan a stand's QR code, react to a wine, answer its question and see the room's answers.", "Wine page: question and the room's answers"],
    ["REMEMBER", "Save favourites, crown a personal Wine of the Day, and keep the day in My wines.", "My day: Wine of the Day crowned"],
  ];
  const g = 0.3, cw = (CW - 3 * g) / 4, y = 1.95, ch = 4.4;
  const phW = 1.15, phH = 2.1;
  steps.forEach(([hd, b, scr], i) => {
    const x = M + i * (cw + g);
    card(s, x, y, cw, ch, "Step: " + hd);
    const fx = x + 0.25, fy = y + 0.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: fx, y: fy, w: phW, h: phH, fill: { color: OLIVE }, line: { color: OLIVE, width: 0 }, rectRadius: 0.16, objectName: "Phone frame" });
    s.addImage({ path: shot(`05-screen-${i + 1}.png`, phW - 0.14, phH - 0.28, "screen", scr), x: fx + 0.07, y: fy + 0.14, w: phW - 0.14, h: phH - 0.28, altText: "App screenshot placeholder: " + scr, objectName: "Screenshot placeholder: " + scr });
    txt(s, String(i + 1), { x: fx + phW + 0.25, y: fy, w: cw - phW - 0.75, h: 0.7, fontSize: 36 });
    txt(s, [label(hd, OLIVE, 12), gap(4), { text: b }], { x: x + 0.25, y: fy + phH + 0.2, w: cw - 0.5, h: ch - phH - 0.6, fontSize: 14 });
  });
  s.addNotes("Visitor flow from the v2 copy. Audit, 21 October: producer discovery with stories, wine discovery, QR stand links, reactions, favourites, one question per wine with the room's answers, Wine of the Day crown and Save my day to My wines are all built, not yet run live. Not found: Meet the Maker videos, event programme, visit planning, shopping list. Plan is proposed (not built), and videos are not shown. Status tags are off the slide (founder, v4 review).\n\nThe Wine of the Day prize line and its legal note are off the slide (founder, v4 review). If a prize draw comes up: we'll work with each partner to make sure it's legal and appropriate. Audit: the draw is built (organiser taps Draw) and needs the legal check (UK prize draw rules, 18+, alcohol promotion) and terms; it also flags a two-phones fairness decision.\n\nThe 45–60 second captioned walkthrough (storyboard to follow) would sit on this slide once filmed.");
}

// ---------- 6 · A clearer picture of Fizz Fest ----------
{
  const s = content("A clearer picture of Fizz Fest", "Insight beyond ticket sales.");
  const rows = [
    ["ATTENTION", "Which wines and vineyards visitors explored."],
    ["ENJOYMENT", "Reactions, favourites and Wine of the Day crowns, in total."],
    ["TASTING RESPONSES", "How the room answered each wine's question."],
    ["RETURN ENGAGEMENT", "Who comes back to their saved day, and interest in buying."],
    ["YOUR AUDIENCE", "More than the ticket buyer: visitors can opt in, separately, to hear from you."],
  ];
  const lw = 5.2, rh = 0.8;
  rows.forEach(([hd, b], i) => {
    const y = 1.95 + i * rh;
    txt(s, [label(hd, OLIVE, 11), { text: b }], { x: M, y, w: lw, h: rh - 0.08, fontSize: 13 });
    if (i < rows.length - 1) s.addShape(pres.shapes.LINE, { x: M, y: y + rh - 0.08, w: lw, h: 0, line: { color: SAGE, width: 0.75 }, objectName: "Row rule" });
  });
  txt(s, "Anonymised and combined. No result is shown for fewer than five people.", { x: M, y: 6.05, w: lw, h: 0.5, fontSize: 12, fontFace: BOLD });

  // Illustrative organiser view: example figures only, labelled so nothing reads as a result.
  const dx = M + lw + 0.4, dw = W - M - dx, dy = 1.95, dh = 4.6, pad = 0.3, iw = dw - 2 * pad;
  card(s, dx, dy, dw, dh, "Illustrative organiser dashboard");
  txt(s, [label("THE DAY AT A GLANCE", OLIVE, 11)], { x: dx + pad, y: dy + 0.25, w: iw - 2.2, h: 0.3 });
  status(s, dx + dw - pad - 2.0, dy + 0.2, "illustrative", 2.0, "ILLUSTRATIVE EXAMPLE");
  const panel = (x, y, w, h, name) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: CREAM }, line: { color: CREAM, width: 0 }, rectRadius: 0.08, objectName: "Panel: " + name });
  // Headline numbers.
  const kpis = [["1,240", "wines tasted"], ["386", "favourites saved"], ["212", "comments"]];
  const kw = (iw - 0.4) / 3, ky = dy + 0.7;
  kpis.forEach(([n, t], j) => {
    const kx = dx + pad + j * (kw + 0.2);
    panel(kx, ky, kw, 0.8, t);
    txt(s, [{ text: n, options: { fontSize: 24, breakLine: true } }, { text: t, options: { fontSize: 11 } }], { x: kx + 0.18, y: ky + 0.08, w: kw - 0.36, h: 0.7, paraSpaceAfter: 0 });
  });
  // Votes by wine type, and the awards of the day.
  const py = ky + 0.95, ph = 1.4, pw = (iw - 0.2) / 2;
  panel(dx + pad, py, pw, ph, "Votes by wine type");
  txt(s, "Votes by wine type", { x: dx + pad + 0.18, y: py + 0.12, w: pw - 0.36, h: 0.3, fontSize: 12, fontFace: BOLD });
  [["Sparkling", 0.9, "48%"], ["White", 0.62, "33%"], ["Red", 0.36, "19%"]].forEach(([t, v, pc], j) => {
    const by = py + 0.48 + j * 0.3, bx = dx + pad + 1.05, bw = pw - 1.65;
    txt(s, t, { x: dx + pad + 0.18, y: by, w: 0.85, h: 0.24, fontSize: 10, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y: by + 0.04, w: bw * v, h: 0.16, fill: { color: j === 0 ? BLUSH : MID }, line: { color: MID, width: 0 }, objectName: "Illustrative bar" });
    txt(s, pc, { x: bx + bw * v + 0.06, y: by, w: 0.5, h: 0.24, fontSize: 10, valign: "middle" });
  });
  const ax = dx + pad + pw + 0.2;
  panel(ax, py, pw, ph, "Awards of the day");
  txt(s, "Awards of the day", { x: ax + 0.18, y: py + 0.12, w: pw - 0.36, h: 0.3, fontSize: 12, fontFace: BOLD });
  txt(s, [["Best sparkling", "Vineyard A"], ["Best white", "Vineyard B"], ["Best red", "Vineyard C"], ["Winner of the day", "Vineyard A"]].map(([a, v], j, all) => (
    { text: a + ":  " + v, options: { breakLine: j < all.length - 1, fontFace: j === 3 ? BOLD : undefined } })), { x: ax + 0.18, y: py + 0.45, w: pw - 0.36, h: 0.9, fontSize: 10.5, paraSpaceAfter: 3 });
  // What visitors said: a simple word cloud.
  const wy = py + ph + 0.15, wh = dy + dh - pad - wy;
  panel(dx + pad, wy, iw, wh, "What visitors said");
  txt(s, "What visitors said", { x: dx + pad + 0.18, y: wy + 0.1, w: 2.5, h: 0.3, fontSize: 12, fontFace: BOLD });
  txt(s, [
    { text: "delicious  ", options: { fontSize: 20, fontFace: BOLD } },
    { text: "fresh  ", options: { fontSize: 13, color: MID } },
    { text: "surprising  ", options: { fontSize: 16 } },
    { text: "elegant", options: { fontSize: 11, color: MID, breakLine: true } },
    { text: "first time with English wine  ", options: { fontSize: 14, fontFace: BOLD, color: MID } },
    { text: "crisp  ", options: { fontSize: 12 } },
    { text: "new favourite", options: { fontSize: 14 } },
  ], { x: dx + pad + 0.18, y: wy + 0.36, w: iw - 0.36, h: wh - 0.4, align: "center", valign: "middle", paraSpaceAfter: 0 });
  s.addNotes("Aggregate engagement, reactions, favourites and tasting responses, from the v2 copy.\n\nThe dashboard is an illustrative example, labelled as such: every figure, vineyard and word is made up to show the kind of picture an organiser would get, not a result (founder, v4 review: show wines tasted, favourites, votes by wine type, awards of the day, comments and a word cloud). Votes by wine type and an overall winner of the day follow the founder's 21 October answer, tailored to each event.\n\nAudit, 21 October: organiser and producer reports are built in code, refuse anything under five people, and are tested on a local database and a simulated app, not yet live. Purchase interest is not built (no shopping list or purchase offers). The word cloud, per-type votes and awards are not confirmed as report features: check against the build before describing them as built. Status tags are off the slide (founder, v4 review).\n\nReports are shown as illustrative only, and not described as in development (founder, 21 October). Audience relationships use the contact-details rule the founder confirmed on 21 October: separate, unticked consent per business; opinions and tasting responses never attached to contact details. Legal review of the wording comes before use.");
}

// ---------- 7 · Value for every vineyard ----------
{
  const s = content("Value for every vineyard", "Beyond being tasted. Being remembered.");
  const PX = M, PW = 8.3;
  photo(s, "07-vineyard.png", M + PW + 0.3, 1.95, CW - PW - 0.3, 4.4, "A maker among the vines, or a vineyard's stand dressed with its bottles", "Photograph of a winemaker in the vineyard");
  const rows = [
    ["BE DISCOVERED", "Each vineyard's story and wines, on visitors' phones at its stand.", "built"],
    ["BE REMEMBERED", "Their wines saved in visitors' own My wines, to revisit after the day.", "built"],
    ["UNDERSTAND", "What visitors thought of their wines, anonymised and combined.", "illustrative"],
  ];
  const rw = PW - 2.95, rh = 1.05;
  rows.forEach(([hd, b, st], i) => {
    const y = 1.95 + i * rh;
    txt(s, [label(hd, OLIVE, 12), { text: b }], { x: PX, y, w: rw, h: 0.9, fontSize: 13 });
    const tw = 0.4 + STATUS[st].text.length * 0.09;
    status(s, PX + rw - tw, y - 0.04, st, tw);
  });
  // Illustrative producer summary.
  const sx = PX + rw + 0.3, sw = PW - rw - 0.3, sy = 1.95, shh = 3.35;
  card(s, sx, sy, sw, shh, "Illustrative producer summary");
  txt(s, [label("PRODUCER SUMMARY", OLIVE, 10), { text: "Illustrative example", options: { fontSize: 11, italic: true } }], { x: sx + 0.25, y: sy + 0.2, w: sw - 0.5, h: 0.55 });
  ["Saved as a favourite", "Crowned Wine of the Day", "Answered your question"].forEach((t, j) => {
    const yy = sy + 0.95 + j * 0.62;
    txt(s, t, { x: sx + 0.25, y: yy, w: sw - 0.5, h: 0.25, fontSize: 11 });
    s.addShape(pres.shapes.RECTANGLE, { x: sx + 0.25, y: yy + 0.3, w: (sw - 0.5) * [0.7, 0.35, 0.55][j], h: 0.12, fill: { color: j === 1 ? BLUSH : MID }, line: { color: MID, width: 0 }, objectName: "Illustrative bar" });
  });
  txt(s, "Every result shows how many people it's based on. Nothing under five.", { x: sx + 0.25, y: sy + 2.7, w: sw - 0.5, h: 0.45, fontSize: 10, italic: true });
  // Anonymous visitor comments, illustrative: no names, ever.
  txt(s, [label("WHAT VISITORS SAID", OLIVE, 10)], { x: PX, y: 5.3, w: 3, h: 0.25 });
  status(s, PX + 2.35, 5.27, "illustrative", 1.6, "ILLUSTRATIVE");
  const quotes = ["\u201CDelicious. My first time with English sparkling.\u201D", "\u201CSurprising, in the best way.\u201D", "\u201CA new favourite. I\u2019ll look for it again.\u201D"];
  const qg = 0.2, qw = (PW - 2 * qg) / 3;
  quotes.forEach((q, j) => {
    const qx = PX + j * (qw + qg);
    card(s, qx, 5.65, qw, 0.7, "Comment: " + q);
    txt(s, q, { x: qx + 0.18, y: 5.65, w: qw - 0.36, h: 0.7, fontSize: 12, italic: true, valign: "middle" });
  });
  txt(s, "Anonymised responses. Contact details only with a visitor's opt-in.", { x: PX, y: 6.48, w: PW, h: 0.3, fontSize: 12, fontFace: BOLD });
  s.addNotes("Saved wine memories, producer stories and aggregate insight, from the v2 copy.\n\nAudit, 21 October: producer pages with stories are built (stories entered by Entre Amis for now); Save my day to My wines is built; a producer report sees only its own wines and questions, never the votes, and refuses anything under five people. Built in code, not yet live-tested. Meet the Maker videos are not built, so 'videos' is left off the slide.\n\nNothing suggests personal data is shared automatically. Producer contact permission is separate, unticked by default and explicit, per the contact-details rule the founder confirmed on 21 October; the wording still needs legal review. The producer summary and the visitor comments are illustrative: made up to show the kind of feedback a vineyard would see, never attributed to anyone (founder, v4 review). Title shortened to 'Value for every vineyard' (founder, v4 review).");
}

// ---------- 8 · Imagine Fizz Fest with Entre Amis ----------
{
  const s = content("Imagine Fizz Fest with Entre Amis", "A more connected experience, live on the day.");
  const hx = M, hy = 1.95, hw = 5.4, hh = 4.35;
  photo(s, "08-table.png", hx, hy, hw, hh, "The Entre Amis Table: guests seated around a long table, glasses, the game laid out, mid-conversation", "Photograph of the Entre Amis Table at an event");
  const zones = [
    ["AT VINEYARD STANDS", "QR discovery, reactions, favourites and a personal Wine of the Day."],
    ["ON THE HALL SCREEN", "Votes by wine type, an overall winner of the day, and prize moments."],
    ["AT THE ENTRE AMIS TABLE", "A welcoming place to sit, talk and play a short game. A moment to relax, never a sales stand."],
    ["AFTER THE EVENT", "Saved discoveries in each visitor's My wines, and the prize draw."],
  ];
  const gx = hx + hw + 0.4, gw = (W - M - gx - 0.3) / 2, gh = 2.05;
  zones.forEach(([hd, b], i) => {
    const x = gx + (i % 2) * (gw + 0.3), y = hy + Math.floor(i / 2) * (gh + 0.25);
    card(s, x, y, gw, gh, "Zone: " + hd);
    txt(s, [label(hd, OLIVE, 11), gap(4), { text: b }], { x: x + 0.25, y: y + 0.22, w: gw - 0.5, h: gh - 0.44, fontSize: 14 });
  });
  s.addNotes("Live on the day, from the v2 copy.\n\nAudit, 21 October: stand QR links, reactions, favourites and the crown are built, not run live. The hall screen is built (join QR, phones joined, crowns, votes, newest comments with Hide), with its laptop and TV layout not yet uploaded; moderation is partly built, and the polling and load work must be done before a festival-sized crowd. These are noted here, not on the slide: status tags and the small print about votes are off the slide to sell the idea first (founder, v4 review).\n\nThe Entre Amis Table: the Brand Brain describes a small Entre Amis area with comfortable seats, a place to connect, never a sales space. Language kept loose on purpose (founder, 21 October): no guest number. 'A signature Entre Amis table setting' is early thinking and isn't described.\n\nVotes: visitors vote by wine type and for an overall winner of the day, tailored to each event (founder, 21 October). These are visitors' own votes, not Entre Amis judging wines. Personal crowns stay private by default.\n\nPrize moments and prize-draw follow-up: we'll work with each partner to make sure any prize draw is legal and appropriate.");
}

// ---------- 9 · Be the first ----------
{
  const s = content("Be the first", "Fizz Fest: founding Entre Amis Event Partner.");
  const lw = 7.0;
  ["Co-shape the experience.", "Learn from your visitors.", "Create something worth remembering."].forEach((t, i) => {
    const y = 1.95 + i * 0.95;
    card(s, M, y, lw, 0.75, "Promise: " + t);
    s.addText(String(i + 1), { x: M + 0.25, y: y + 0.17, w: 0.42, h: 0.42, shape: pres.shapes.OVAL, fill: { color: OLIVE }, line: { color: OLIVE, width: 0 }, color: CREAM, fontFace: BOLD, fontSize: 14, align: "center", valign: "middle", margin: 0, isTextBox: true });
    txt(s, t, { x: M + 0.9, y, w: lw - 1.2, h: 0.75, fontSize: 20, valign: "middle" });
  });
  card(s, M, 4.85, lw, 0.85, "Invitation", OLIVE);
  txt(s, "Let's explore the first activation together.", { x: M + 0.4, y: 4.85, w: lw - 0.8, h: 0.85, fontSize: 22, color: CREAM, valign: "middle" });
  txt(s, "Caroline, Founder of Entre Amis", { x: M, y: 5.9, w: lw, h: 0.3, fontSize: 14, fontFace: BOLD });
  flag(s, M, 6.25, lw, 0.45, "CLAIM", "\"Be the first\" is a claim: kept as written. TO ADD: contact details.", 10);
  photo(s, "09-close.png", M + lw + 0.3, 1.95, CW - lw - 0.3, 4.4, "Golden hour at the festival: two glasses raised across a table, faces softly in view", "Photograph of guests raising a glass together");
  s.addNotes("Closing invitation from the v2 copy. No pricing, no financial projections, no exclusivity: 'founding partner' describes being first to shape it, not an exclusive arrangement.\n\nContact details to add once you confirm which to use.");
}

(async () => {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const specFile = path.join(IMG_DIR, "specs.json");
  fs.writeFileSync(specFile, JSON.stringify(shots));
  execFileSync("python3", [path.join(__dirname, "placeholders.py"), specFile, IMG_DIR], { stdio: "inherit" });
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("Wrote " + OUT);
})();
