const pptxgen = require("pptxgenjs");
const path = require("path");
const { applyTheme } = require("/root/.claude/skills/synced/5ee89fbe-4dd3-4dd9-b68c-1a3ffd397f5a_b93dcb02-b9f8-4562-a479-8ad578fc1368/pptx/scripts/apply_theme.js");

const LOGO = path.resolve(__dirname, "logo-master-olive.png"); // 1600 x 676: designer master logo, 29 Oct 2026
const LOGO_RATIO = 676 / 1600;

// Sous-bois core colours only (Brand Brain 04). White used as a neutral card fill.
const HEX = {
  deepOlive: "565A32", midOlive: "8B8B5C", sage: "B9BC9A", cream: "EFEAE0", blush: "E3AC9A", white: "FFFFFF",
};
// Game card family fills (game slide only, to signify families)
const FAMILY = { Savour: "8D84A6", Pour: "C89B3C", Mischief: "BC6B4A", Wild: "A8503F", "Secret Missions": "6E8B93" };

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

const C = new pptxgen().SchemeColor;
const OLIVE = C.text1, CREAM = C.background2, WHITE = C.background1;
const MID = C.accent2, SAGE = C.accent3, BLUSH = C.accent4;
const BOLD = "Raleway SemiBold";
const W = 13.333, M = 0.6, CW = W - 2 * M;
let pres;
function init(title) {
pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = title;
pres.author = "Entre Amis";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };


// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "EA Cover",
  background: { color: CREAM },
  objects: [],
});
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
  slideNumber: { x: W - M - 1.6, y: 6.95, w: 0.4, h: 0.3, fontSize: 10, color: OLIVE, fontFace: THEME.bodyFontFace },
});

}

// ---------- Helpers ----------
const sh = () => ({ type: "outer", color: "565A32", opacity: 0.12, blur: 6, offset: 2, angle: 90 });

function card(s, x, y, w, h, name, fill = WHITE) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: 0.12, shadow: fill === WHITE ? sh() : undefined, objectName: name });
}
function label(text, color = OLIVE, size = 12) {
  return { text, options: { fontFace: BOLD, fontSize: size, color, charSpacing: 1.5, breakLine: true } };
}
function txt(s, runs, o) {
  s.addText(runs, Object.assign({ isTextBox: true, margin: 0, color: OLIVE, fontSize: 14, valign: "top", paraSpaceAfter: 4 }, o));
}
// A visible review flag: white box, blush border. Delete before sharing.
function flag(s, x, y, w, h, kind, text, size = 11) {
  s.addText([
    { text: kind + "  ", options: { fontFace: BOLD, color: OLIVE } },
    { text, options: { color: OLIVE } },
  ], { x, y, w, h, isTextBox: true, fontSize: size, margin: [3, 6, 3, 6], valign: "middle", fill: { color: WHITE }, line: { color: BLUSH, width: 2 }, objectName: "FLAG — delete before sharing" });
}
function placeholderBox(s, x, y, w, h, text) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: SAGE }, line: { color: OLIVE, width: 1, dashType: "dash" }, rectRadius: 0.12, objectName: "Image placeholder" });
  txt(s, [{ text, options: { fontFace: BOLD } }], { x: x + 0.3, y, w: w - 0.6, h, align: "center", valign: "middle", fontSize: 14 });
}
function tag(s, x, y, w, text, name = "Stage tag", h = 0.32) {
  s.addText(text, { x, y, w, h, isTextBox: true, fontFace: BOLD, fontSize: 12, color: OLIVE, align: "center", valign: "middle", margin: 0, fill: { color: CREAM }, line: { color: OLIVE, width: 1 }, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: Math.min(0.16, h / 2), objectName: name });
}
function content(section, title, subtitle) {
  const s = pres.addSlide({ masterName: "EA Content", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  if (subtitle) s.addText(subtitle, { placeholder: "subtitle" });
  return s;
}
// Three (or n) cards in a row with a SemiBold label and body.
function cardRow(s, y, h, items, opts = {}) {
  const gap = 0.3, n = items.length, w = (CW - gap * (n - 1)) / n;
  items.forEach(([head, body], i) => {
    const x = M + i * (w + gap);
    card(s, x, y, w, h, "Card: " + head);
    txt(s, [label(head), { text: " ", options: { fontSize: 6, breakLine: true } }, { text: body }], { x: x + 0.25, y: y + 0.25, w: w - 0.5, h: h - 0.4, fontSize: opts.size || 14 });
  });
}

// Expression colours (PROPOSED, Brand Brain 04): core palette only, used to signal each part of the offer.
const EXPR = {
  game: { fill: OLIVE, text: CREAM, label: "THE GAME" },
  app: { fill: MID, text: WHITE, label: "THE APP" },
  stays: { fill: SAGE, text: OLIVE, label: "ENTRE AMIS STAYS" },
  partners: { fill: BLUSH, text: OLIVE, label: "PARTNERS" },
  event: { fill: BLUSH, text: OLIVE, label: "EVENT MODE" },
  partnerMode: { fill: BLUSH, text: OLIVE, label: "PARTNER MODE" },
};
function pill(s, x, y, w, key, h = 0.42, text) {
  const e = EXPR[key];
  s.addText(text || e.label, { x, y, w, h, isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: h / 2, fill: { color: e.fill }, color: e.text, fontFace: BOLD, fontSize: 14, charSpacing: 1.5, align: "center", valign: "middle", margin: 0, objectName: "Expression marker: " + (text || e.label) });
}
// Marker in the top-right corner of a slide showing which part of the offer it covers.
function marker(s, key, w = 2.6) { pill(s, W - M - w, 0.5, w, key); }

function buildCore() {
// ---------- 1 · Cover ----------
pres.addSection({ title: "Introduction" });
{
  const s = pres.addSlide({ masterName: "EA Cover", sectionTitle: "Introduction" });
  const lw = 4.0, lh = lw * LOGO_RATIO;
  s.addImage({ path: LOGO, x: (W - lw) / 2, y: 1.35, w: lw, h: lh, altText: "Entre Amis logo" });
  txt(s, "The setting changes. The spirit never does.", { x: M, y: 3.75, w: CW, h: 0.6, fontSize: 28, align: "center" });
  txt(s, "An introduction · October 2026", { x: M, y: 4.45, w: CW, h: 0.4, fontSize: 14, align: "center" });
  flag(s, M, 5.55, 5.9, 0.95, "TO DECIDE", "The brand-wide consumer line. Talk. Laugh. Remember. is the game line (slide 7), so the cover uses supporting line 1 for now.");
  flag(s, W - M - 5.9, 5.55, 5.9, 0.95, "TO ADD", "Master logo artwork files. This logo is taken from the October deck at low resolution; replace with the original artwork.");
  s.addNotes("Cover uses supporting line 1 (The setting changes. The spirit never does.) because it reaches beyond the game. Talk. Laugh. Remember. is proposed as the game line. The brand-wide consumer line is still to decide.\n\nDesign: Sous-bois core colours only, master logo only, no ™, Raleway Light and SemiBold.");
}

// ---------- 2 · Why now ----------
pres.addSection({ title: "The brand" });
{
  const s = content("The brand", "More connected. Not always closer.", "Why now, and why wine first");
  txt(s, [
    { text: "Being in touch isn't the same as feeling close. The moments that stay with us are usually conversations, discoveries and stories shared with other people.", options: { breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Wine is one of life's everyday pleasures. Yet long wine lists and specialist words can leave people unsure of their choice, and quiet about what they really think." },
  ], { x: M, y: 1.95, w: 6.9, h: 1.8, fontSize: 16 });
  const px = M + 7.3, pw = CW - 7.3;
  card(s, px, 1.95, pw, 1.8, "What we often hear", OLIVE);
  txt(s, [
    label("WHAT WE OFTEN HEAR", CREAM),
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "You'll be better at choosing the wine than me.", options: { italic: true, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "People want to enjoy themselves, not prove themselves.", options: { italic: true } },
  ], { x: px + 0.3, y: 2.15, w: pw - 0.6, h: 1.5, color: CREAM, fontSize: 15 });
  cardRow(s, 4.05, 1.75, [
    ["DIGITAL EVERYWHERE", "We talk and discover through screens, but closeness happens in person."],
    ["TIME TOGETHER", "A shared table gives people room to be present, curious and open."],
    ["WINE, FIRST", "A glass on the table is a natural place to start a conversation."],
  ]);
  s.addNotes("Merges deck slides 2 and 3. The observations are shown without quotation marks or handwriting, following the proposed unattributed observations rule. 'Even in everyday pubs, people feel they need expertise' is left out until there is evidence for it (Evidence still needed, Brand Brain 00).");
}

// ---------- 3 · The idea ----------
{
  const s = content("The brand", "Conversation, not knowledge.", "The idea");
  card(s, M, 1.95, CW, 1.35, "Idea statement", OLIVE);
  txt(s, "We start with a simple belief: conversation flows when nobody is worried about getting it right.", { x: M + 0.5, y: 1.95, w: CW - 1, h: 1.35, color: CREAM, fontSize: 24, valign: "middle", align: "center" });
  cardRow(s, 3.65, 2.6, [
    ["BETWEEN FRIENDS", "Entre Amis is French for \"between friends\". Any wine. Any table. Everyone has something worth saying."],
    ["WINE IS OUR FIRST INVITATION", "Wine is where we begin, not where we stop."],
    ["WHAT PEOPLE TAKE AWAY", "Not a score or a lesson. Stories, discoveries, people and moments worth coming back to."],
  ], { size: 16 });
  s.addNotes("Uses the confirmed idea wording ('flows'). 'Conversations are better when…' is a claim still under review in the Brand Brain, so it is left out. 'Makes it easier to connect' is left out because it is a benefit claim.");
}

// ---------- 4 · Is / isn't ----------
{
  const s = content("The brand", "What Entre Amis is, and isn't");
  const cw = (CW - 0.3) / 2, top = 1.6, h = 4.4;
  card(s, M, top, cw, h, "Entre Amis is");
  const isItems = ["About conversation, discovery and belonging", "For anyone who enjoys wine with friends, whatever they know", "Quietly premium, contemporary and considered", "Wine-led today, with room to grow beyond wine"];
  txt(s, [label("ENTRE AMIS IS", OLIVE, 14), { text: " ", options: { fontSize: 8, breakLine: true } },
    ...isItems.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < isItems.length - 1, paraSpaceAfter: 10 } }))],
    { x: M + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.5, fontSize: 16 });
  const x2 = M + cw + 0.3;
  card(s, x2, top, cw, h, "Entre Amis isn't", OLIVE);
  const isnt = [
    ["A wine course or a test", ""], ["A judge of wine.", " The table decides."], ["Snobbish.", " Any bottle belongs."],
    ["A drinking game.", " Corks are won for conversation, never for how much anyone drinks."],
    ["Screen-first.", " The app supports the table; it never becomes it."], ["A wine retailer", ""], ["For under-18s", ""],
  ];
  const runs = [label("ENTRE AMIS ISN'T", CREAM, 14), { text: " ", options: { fontSize: 8, breakLine: true } }];
  isnt.forEach(([a, b], i) => {
    const last = i === isnt.length - 1;
    runs.push({ text: a + b, options: { bullet: { indent: 16 }, breakLine: !last } });
  });
  txt(s, runs, { x: x2 + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.5, fontSize: 14, color: CREAM, paraSpaceAfter: 6 });
  txt(s, "When you're at an Entre Amis table, nobody has to prove they belong there.", { x: M, y: 6.2, w: CW, h: 0.45, fontSize: 20, italic: true, align: "center" });
  s.addNotes("Merges deck slides 5, 6 and 7. Adds confirmed 'isn't' items partners will look for (drinking game, judge of wine, under-18s). 'Ecosystem' removed.");
}

// ---------- 5 · Friend at the table ----------
{
  const s = content("The brand", "The friend you want at the table", "Knows enough to make things interesting. Never makes anyone feel left out.");
  const beh = ["Pulls people in when they go quiet.", "Shares something fascinating without turning it into a lesson.", "Loves any bottle, the special one or the everyday one.", "Encourages opinions, not correct answers.", "Cares more about the company than the score.", "Always brings a little more than you expected."];
  card(s, M, 1.95, 5.4, 4.6, "Behaviours", OLIVE);
  txt(s, [label("AT THE TABLE, WE…", CREAM, 13), { text: " ", options: { fontSize: 8, breakLine: true } },
    ...beh.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < beh.length - 1, paraSpaceAfter: 9 } }))],
    { x: M + 0.35, y: 2.25, w: 4.7, h: 4.1, color: CREAM, fontSize: 15 });
  const tones = [["WARM, NEVER WORTHY", "Knowledge shared generously, never used as status."], ["CURIOUS, NEVER CORRECTIVE", "Any wine belongs. Every opinion counts."], ["PREMIUM, NEVER PRECIOUS", "Considered design, relaxed enough to use."], ["PLAYFUL, NEVER SILLY", "Wit and a little mischief, always grown-up."]];
  const gx = M + 5.7, gw = (CW - 5.7 - 0.3) / 2, gh = 2.15;
  tones.forEach(([h, b], i) => {
    const x = gx + (i % 2) * (gw + 0.3), y = 1.95 + Math.floor(i / 2) * (gh + 0.3);
    card(s, x, y, gw, gh, "Tone: " + h);
    txt(s, [label(h, OLIVE, 13), { text: " ", options: { fontSize: 6, breakLine: true } }, { text: b }], { x: x + 0.3, y: y + 0.3, w: gw - 0.6, h: gh - 0.5, fontSize: 16 });
  });
  s.addNotes("'At the table, we…' is a design label for the confirmed behaviours. Adds 'Warm, never worthy', which the October deck was missing. Deck slide 8 (Selfridges and Tesco, Mercedes-Benz and Ford, Brand Brain guardrails) stays internal.");
}

// ---------- 6 · How it fits together ----------
pres.addSection({ title: "What we're building" });
{
  const s = content("What we're building", "How it fits together", "One brand. Several ways to take part.");
  const steps = ["Inspire", "Discover", "Experience", "Belong"];
  const sw = 1.95, ag = 0.5, total = steps.length * sw + (steps.length - 1) * ag, sx = M;
  steps.forEach((t, i) => {
    const x = sx + i * (sw + ag);
    s.addText(t, { x, y: 1.95, w: sw, h: 0.6, isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.3, fill: { color: OLIVE }, color: CREAM, fontSize: 18, align: "center", valign: "middle", margin: 0, objectName: "Journey: " + t });
    if (i < steps.length - 1) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + sw + 0.12, y: 2.13, w: 0.31, h: 0.24, fill: { color: MID }, line: { color: MID, width: 0 } });
  });
  const keys = ["game", "app", "stays", "partners"];
  const cols = [
    ["THE GAME", "A premium, giftable table game that turns any wine into conversation.", "Prototype, playable"],
    ["THE APP", "Hosts the game, adds plain-English wine information when curiosity appears, and keeps the wines and moments people want to remember.", "Prototype, Host and Guest tested"],
    ["ENTRE AMIS STAYS", "Entre Amis lived for a few days, rather than played for an evening.", "A future ambition"],
    ["WITH PARTNERS", "Partner Mode and Event Mode. Bringing the Entre Amis table to vineyards, retailers, wine clubs and wine events.", "Prototype"],
  ];
  const gap = 0.3, w = (CW - gap * 3) / 4, y = 2.75, h = 3.2;
  cols.forEach(([hd, body, stage], i) => {
    const x = M + i * (w + gap);
    card(s, x, y, w, h, "Offer: " + hd);
    pill(s, x + 0.25, y + 0.25, w - 0.5, keys[i], 0.42, i === 3 ? "WITH PARTNERS" : hd);
    txt(s, body, { x: x + 0.25, y: y + 0.85, w: w - 0.5, h: h - 1.6, fontSize: 14 });
    tag(s, x + 0.25, y + h - 0.7, w - 0.5, stage, "Stage tag", 0.5);
  });
  flag(s, M + 2 * (w + gap), 6.05, w, 0.6, "TO DECIDE", "Your approval to show stays as a future ambition.", 10);
  s.addNotes("The game, app and stays are shown as ways to take part in the journey, not as a Play → Discover → Experience process. If the journey isn't confirmed before sharing, delete the journey line; the rest of the slide stands without it.\n\nGameCo, ExperienceCo, 'routes to value', IP, licences and 'insight' are removed because they are internal language.");
}

// ---------- 7 · The game ----------
{
  const s = content("What we're building", "The game", "A wine game for people who would rather have an opinion than know the answer.");
  marker(s, "game");
  tag(s, W - M - 2.6, 1.0, 2.6, "In development");
  placeholderBox(s, M, 1.95, 4.2, 2.55, "Photo of the prototype — to add");
  txt(s, "Talk. Laugh. Remember.", { x: M, y: 4.62, w: 4.2, h: 0.4, fontSize: 20 });
  const rx = M + 4.6, rw = CW - 4.6;
  txt(s, [{ text: "A beautifully made table game that turns any wine into conversation.", options: { breakLine: true } }, { text: "Pour. Spin. Play. Talk.", options: { fontFace: BOLD } }], { x: rx, y: 1.95, w: rw, h: 0.65, fontSize: 15, paraSpaceAfter: 0 });
  const fam = [["Savour", "the flavours, tastes and look of the wine."], ["Pour", "the occasions and places a wine might be enjoyed."], ["Mischief", "changes the course of the game."], ["Wild", "questions that simply get people talking."], ["Secret Missions", "private challenges, brought up by the spinner."]];
  fam.forEach(([n, d], i) => {
    const y = 2.68 + i * 0.37;
    s.addShape(pres.shapes.OVAL, { x: rx, y: y + 0.06, w: 0.24, h: 0.24, fill: { color: FAMILY[n] }, line: { color: FAMILY[n], width: 0 }, objectName: "Family colour: " + n });
    txt(s, [{ text: n + ": ", options: { fontFace: BOLD } }, { text: d }], { x: rx + 0.38, y, w: rw - 0.38, h: 0.36, fontSize: 14, valign: "middle" });
  });
  txt(s, [{ text: "At the end, the table chooses its favourite wine together and gives it the crown. " }, { text: "Corks are won for conversation and play, never for how much anyone drinks.", options: { fontFace: BOLD } }], { x: rx, y: 4.58, w: rw, h: 0.55, fontSize: 14 });
  const facts = [["2–8 PLAYERS", "Easy to start, easy to join."], ["ANY WINE", "A single glass is enough to play."], ["ANY TIME OF DAY", "Lunch or evening."], ["NO APP NEEDED", "Complete on its own; the app adds more."], ["18+", "For adults only."]];
  const gap = 0.2, fw = (CW - gap * 4) / 5, fy = 5.2, fh = 1.0;
  facts.forEach(([h, b], i) => {
    const x = M + i * (fw + gap);
    card(s, x, fy, fw, fh, "Fact: " + h);
    txt(s, [label(h, OLIVE, 12), { text: b }], { x: x + 0.18, y: fy + 0.14, w: fw - 0.36, h: fh - 0.2, fontSize: 12 });
  });
  s.addNotes("Add photos of the prototype: the most persuasive thing the deck can show. Word Play and Wine Knowledge are app-only, so they appear on the app slide. Card family colours are used here only to signify the five families. If Talk. Laugh. Remember. isn't confirmed as the game line before sharing, move it to the cover.");
}

// ---------- 8 · The app ----------
{
  const s = content("What we're building", "The app", "Works with the table, never instead of it.");
  marker(s, "app");
  tag(s, W - M - 2.6, 1.0, 2.6, "In development");
  const feats = ["Hosts and Guests play together.", "Runs the game, including a digital spinner.", "Photograph a label to add a wine and its details.", "Plain-English hints when curiosity appears.", "Saves the occasion and the scores.", "Wine 101: wine facts and help, like a directory.", "My wines: your tastings, favourites, events and experiences, on any device.", "Optional Word Play and Wine Knowledge, with questions about the wine in your glass.", "Just tasting: guided questions when you taste on your own."];
  card(s, M, 1.95, 6.6, 4.65, "App features");
  txt(s, feats.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < feats.length - 1, paraSpaceAfter: 5 } })), { x: M + 0.35, y: 2.2, w: 5.9, h: 3.8, fontSize: 15 });
  txt(s, [{ text: "18+ age gate on entry.", options: { fontFace: BOLD } }], { x: M + 0.35, y: 6.05, w: 5.9, h: 0.35, fontSize: 14 });
  const px = M + 6.95, pw = (CW - 6.95 - 0.3) / 2;
  placeholderBox(s, px, 1.95, pw, 3.85, "App screen — to add");
  placeholderBox(s, px + pw + 0.3, 1.95, pw, 3.85, "App screen — to add");
  s.addNotes("Updated 16 October to the confirmed feature status: photographing a label, My wines on any device, questions about the wine in the glass and Just tasting are now claimable as in development. Never name the supplier behind the label photo, and never claim it knows every wine. Wine 101 and My wines follow the founder's correction (12 October): Wine 101 is a directory of wine facts; My wines is the personal record. Add app screens.");
}

// ---------- 9 · Partners ----------
{
  const s = pres.addSlide({ masterName: "EA Content", sectionTitle: "What we're building" });
  s.addText("For vineyards, retailers, wine clubs and wine events", { placeholder: "title", h: 1.15 });
  txt(s, "What we add isn't content. It's connection.", { x: M, y: 1.68, w: CW, h: 0.4, fontSize: 18 });
  marker(s, "partners");
  txt(s, "Wine businesses already have stories, tasting notes and expertise. We help capture what people say and really think about your wines, and help them remember those wines afterwards.", { x: M, y: 2.15, w: CW, h: 0.65, fontSize: 16 });
  cardRow(s, 2.85, 1.95, [
    ["BETWEEN PEOPLE", "Tasting becomes conversation and shared discovery."],
    ["WITH THE WINE", "People taste, talk and choose, so your wines become part of the occasion."],
    ["BEYOND THE MOMENT", "Wines and memories saved, so the relationship carries on."],
    ["WHAT PEOPLE REALLY THINK", "In the words people naturally use. Anonymised, and only with consent."],
  ], { size: 14 });
  card(s, M, 5.0, 8.6, 1.45, "Two ways in", OLIVE);
  txt(s, [
    label("TWO WAYS IN", CREAM, 13),
    { text: "Partner Mode: ", options: { fontFace: BOLD } }, { text: "for a vineyard, wine brand, retailer or wine club.", options: { breakLine: true } },
    { text: "Event Mode: ", options: { fontFace: BOLD } }, { text: "for organisers bringing several vineyards together.", options: { breakLine: true } },
    { text: "Meet the Maker ", options: { fontFace: BOLD } }, { text: "stories and videos work in both." },
  ], { x: M + 0.35, y: 5.12, w: 8.0, h: 1.3, color: CREAM, fontSize: 14, paraSpaceAfter: 3 });
  flag(s, M + 8.9, 5.75, CW - 8.9, 0.7, "TO DECIDE", "How Event Mode differs from Partner Mode, in detail.", 11);
  s.addNotes("Heading and supporting line swapped so the slide says who it is for first. Body reworded (founder, 11 October): we help capture what people say and think, and help them remember. 'Useful insight' is renamed because 'insight' as a product is internal language. Contact sharing (proposed, needs legal review) is not mentioned here; it belongs in the partner decks once confirmed. 'Make wines more memorable' is reworded to avoid a benefit claim.");
}

pres.addSection({ title: "About us" });
responsibleSlide("About us");
founderSlide("About us");

// ---------- 12 · Where we are ----------
pres.addSection({ title: "Close" });
{
  const s = content("Close", "Where we are", "Prototype and validation stage. Nothing is on sale yet.");
  const cw = (CW - 0.3) / 2, top = 1.95, h = 2.75;
  const built = ["Physical game assembled and playable: cards, spinner, game mat, crown and printed materials working together.", "App developed, with Host and Guest tested together.", "Partner Mode prototype built."];
  const next = ["Structured playtesting at real tables.", "Testing Partner Mode with selected partners.", "Conversations across the wine industry.", "Refining from what we learn."];
  [["BUILT", built, 0], ["NEXT", next, 1]].forEach(([hd, items, i]) => {
    const x = M + i * (cw + 0.3);
    card(s, x, top, cw, h, hd);
    txt(s, [label(hd, OLIVE, 14), { text: " ", options: { fontSize: 6, breakLine: true } },
      ...items.map((t, j) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: j < items.length - 1, paraSpaceAfter: 8 } }))],
      { x: x + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.45, fontSize: 15 });
  });
  card(s, M, 4.95, CW, 0.95, "The real test", OLIVE);
  txt(s, "The real test: does this feel like something you'd want at your table?", { x: M + 0.4, y: 4.95, w: CW - 0.8, h: 0.95, color: CREAM, fontSize: 22, valign: "middle", align: "center" });
  flag(s, M, 6.05, (CW - 0.3) / 2, 0.6, "TO DECIDE", "The ask, for each audience (e.g. join a playtest).", 11);
  flag(s, M + (CW - 0.3) / 2 + 0.3, 6.05, (CW - 0.3) / 2, 0.6, "TO ADD", "Playtest results, once you have them.", 11);
  s.addNotes("Removed: the trade mark (never a public claim), 'commercialised', pricing, unit economics, 'shareholder' and manufacturing costs. 'Spinners' corrected to one spinner.");
}

// ---------- 13 · Stays ----------
{
  const s = content("Close", "Looking ahead: Entre Amis stays", "A future ambition.");
  marker(s, "stays", 3.2);
  card(s, M, 1.95, 5.2, 4.1, "Stays statement", OLIVE);
  txt(s, [
    { text: "Not a tour. Not a retreat. More like staying with friends who know all the good places.", options: { fontSize: 22, breakLine: true } },
    { text: " ", options: { fontSize: 10, breakLine: true } },
    { text: "Entre Amis, lived for a few days rather than played for an evening.", options: { fontSize: 16, italic: true } },
  ], { x: M + 0.4, y: 2.25, w: 4.4, h: 3.6, color: CREAM });
  const items = ["Shared tables, never rigid itineraries.", "Everything is optional.", "Wine explained when you're curious, not taught at you.", "Local places chosen because we love them, not because they're on a checklist.", "Time to disappear for an afternoon if you want to.", "A relaxed Provençal home where you can wander, read and swim."];
  const x = M + 5.5, w = CW - 5.5;
  card(s, x, 1.95, w, 4.1, "Stays details");
  txt(s, items.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < items.length - 1, paraSpaceAfter: 9 } })), { x: x + 0.35, y: 2.25, w: w - 0.7, h: 3.6, fontSize: 16 });
  txt(s, "The setting changes. The spirit never does.", { x: M, y: 6.15, w: 7.5, h: 0.45, fontSize: 20, italic: true });
  flag(s, M + 7.8, 6.15, CW - 7.8, 0.5, "TO DECIDE", "Your approval to show stays as a future ambition.", 11);
  s.addNotes("Optional slide. 'Pour another glass' removed (responsible drinking). 'One or two brilliant surprises' and 'friends who happen to know Provence rather well' cut for length; add them back if you like.");
}

backCover("Close");

// ---------- 15 · Working notes ----------
pres.addSection({ title: "Working notes — delete before sharing" });
{
  const s = content("Working notes — delete before sharing", "Before this deck is shared", "Working notes. Delete this slide, and every white box with a blush border, before sharing.");
  const decide = ["Brand-wide consumer line (cover)", "How Event Mode differs from Partner Mode (slide 9)", "Approval to show stays as a future ambition (slides 6, 13)", "The ask, for each audience (slide 12)"];
  const add = ["Master logo artwork files", "Photos of the prototype (slide 7)", "App screens (slide 8)", "Your surname and photo; optional line in your words (slide 11)", "Playtest results, when available (slide 12)", "Contact details (back cover)"];
  const cw = (CW - 0.3) / 2;
  [["TO DECIDE OR CONFIRM", decide, 0], ["TO ADD", add, 1]].forEach(([hd, items, i]) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 1.95, cw, 4.65, hd);
    txt(s, [label(hd, OLIVE, 14), { text: " ", options: { fontSize: 6, breakLine: true } },
      ...items.map((t, j) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: j < items.length - 1, paraSpaceAfter: 8 } }))],
      { x: x + 0.35, y: 2.25, w: cw - 0.7, h: 4.2, fontSize: 15 });
  });
  s.addNotes("Then run the pre-publish check in brand-brain/03-guardrails.md. Raleway (Light and SemiBold) must be installed for the deck to display as designed; it is free from Google Fonts.");
}

}

// ---------- 10 · Responsible by design ----------
function responsibleSlide(sec) {
  const s = content(sec, "Responsible by design");
  const rows = [
    ["18+", "18+ only.", "The game is clearly marked 18+, and the app has an age gate."],
    ["01", "Never a drinking game.", "Corks are won for conversation and play, never for how much anyone drinks."],
    ["02", "A single glass is enough.", "Any wine works."],
    ["03", "No pressure to taste.", "At events, tasting is always optional."],
    ["04", "Safe to say what you think.", "What people say is anonymised, needs their consent, and is never sold."],
  ];
  rows[1][0] = "Corks"; rows[2][0] = "1 glass"; rows[3][0] = "Optional"; rows[4][0] = "Consent";
  const top = 1.55, rh = 0.98;
  rows.forEach(([badge, head, body], i) => {
    const y = top + i * rh;
    card(s, M, y, CW, rh - 0.18, "Responsible: " + head);
    s.addText(badge, { x: M + 0.25, y: y + 0.12, w: 1.5, h: rh - 0.42, isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.28, fill: { color: OLIVE }, color: CREAM, fontFace: BOLD, fontSize: 14, align: "center", valign: "middle", margin: 0 });
    txt(s, [{ text: head + "  ", options: { fontFace: BOLD } }, { text: body }], { x: M + 2.05, y, w: CW - 2.3, h: rh - 0.18, fontSize: 16, valign: "middle" });
  });
  s.addNotes("New slide, built from confirmed responsible-drinking and Partner Mode data rules. 'No pressure to taste' comes from the visitor journey slide in the October deck.");
}


// ---------- 11 · Founder ----------
function founderSlide(sec) {
  const s = content(sec, "Who's behind Entre Amis");
  placeholderBox(s, M, 1.6, 3.8, 4.6, "Photo of Caroline — to add");
  const x = M + 4.3, w = CW - 4.3;
  txt(s, [{ text: "Caroline [surname]", options: { fontSize: 32, breakLine: true } }, { text: "Founder", options: { fontFace: BOLD, fontSize: 14, charSpacing: 1.5 } }], { x, y: 1.6, w, h: 1.0 });
  card(s, x, 2.8, w, 1.5, "Credentials");
  txt(s, [
    { text: "A marketing and commercial leader with over 30 years across UK and international brands.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "WSET Level 3 in Wines, with Distinction.", options: { bullet: { indent: 16 } } },
  ], { x: x + 0.35, y: 3.0, w: w - 0.7, h: 1.2, fontSize: 16 });
  txt(s, "Entre Amis brings together Caroline's marketing experience and her focus on customers.", { x, y: 4.5, w, h: 0.7, fontSize: 18, italic: true });
  flag(s, x, 5.4, (w - 0.3) / 2, 0.8, "TO ADD", "Your surname and a photo.", 11);
  flag(s, x + (w - 0.3) / 2 + 0.3, 5.4, (w - 0.3) / 2, 0.8, "TO ADD", "Optional: a short line in your own words.", 11);
  s.addNotes("Brand voice about Caroline, not written as her. A first-person line would work well here, but it must be Caroline's own words.");
}


// ---------- 14 · Back cover ----------
function backCover(sec) {
  const s = pres.addSlide({ masterName: "EA Cover", sectionTitle: sec });
  const lw = 3.4, lh = lw * LOGO_RATIO;
  s.addImage({ path: LOGO, x: (W - lw) / 2, y: 2.0, w: lw, h: lh, altText: "Entre Amis logo" });
  txt(s, "Say what you really think.", { x: M, y: 4.0, w: CW, h: 0.5, fontSize: 20, align: "center" });
  flag(s, (W - 5) / 2, 4.9, 5, 0.6, "TO ADD", "Contact details.", 12);
}


const CTX = { get pres() { return pres; }, C, OLIVE, CREAM, WHITE, MID, SAGE, BLUSH, BOLD, W, M, CW, LOGO, LOGO_RATIO, card, label, txt, flag, placeholderBox, tag, content, cardRow, pill, marker, responsibleSlide, founderSlide, backCover, exportsTo: module.exports };
require("./event.js")(CTX);
require("./partner.js")(CTX);

(async () => {
  const outCore = process.argv[2], outEvent = process.argv[3];
  init("Entre Amis — core brand story"); buildCore();
  await pres.writeFile({ fileName: outCore }); await applyTheme(outCore, THEME); console.log("wrote", outCore);
  init("Entre Amis — Event Mode"); module.exports.buildEvent();
  await pres.writeFile({ fileName: outEvent }); await applyTheme(outEvent, THEME); console.log("wrote", outEvent);
  const outPartner = process.argv[4];
  init("Entre Amis — Partner Mode"); module.exports.buildPartner();
  await pres.writeFile({ fileName: outPartner }); await applyTheme(outPartner, THEME); console.log("wrote", outPartner);
})();
