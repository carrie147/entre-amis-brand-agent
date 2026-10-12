// Slides shared by the Partner Mode and Event Mode packs.
module.exports = (ctx) => {
  const { OLIVE, CREAM, BOLD, M, CW, card, label, txt, flag, content, cardRow, marker } = ctx;
  const spacer = (n = 6) => ({ text: " ", options: { fontSize: n, breakLine: true } });

  // The brand, made explicit, ending on the partner line.
  function brandSlide(sec, mode) {
    const s = content(sec, "The brand behind " + mode, "Conversation, not knowledge.");
    card(s, M, 1.95, CW, 1.05, "Idea statement", OLIVE);
    txt(s, "We start with a simple belief: conversation flows when nobody is worried about getting it right.", { x: M + 0.5, y: 1.95, w: CW - 1, h: 1.05, color: CREAM, fontSize: 22, valign: "middle", align: "center" });
    cardRow(s, 3.2, 1.85, [
      ["WHO WE ARE", "Entre Amis is French for \"between friends\". A wine brand where everyone has something worth saying, whatever they know."],
      ["WHAT WE MAKE", "A table game and an app that turn any wine into conversation, and Partner Mode and Event Mode for the wine world."],
      ["WHAT WE BRING YOU", "What we add isn't content. It's connection."],
    ], { size: 15 });
    txt(s, "Conversation creates connection. Connection creates insight.", { x: M, y: 5.25, w: CW, h: 0.6, fontSize: 26, align: "center" });
    flag(s, M + (CW - 6.4) / 2, 6.0, 6.4, 0.5, "TO CONFIRM", "Partner line, proposed in the Brand Brain.", 11);
    s.addNotes("Makes it explicit that this is the brand. The closing line is the partner line (founder, 12 October): for Partner Mode and Event Mode materials only, not a consumer line.");
    return s;
  }

  // Why the insight can be trusted, built from the confirmed Partner Mode data rules.
  function trustSlide(sec, key, people) {
    const s = content(sec, "Honest insight starts with trust", "People only say what they really think when it's safe to.");
    marker(s, key);
    const prom = [
      ["Consent first", "Nothing is collected for your insight without clear, informed consent."],
      ["Anonymised", "Opinions and responses are combined and anonymised, never linked to a name."],
      ["Never sold", "What someone says is never sold or passed on as individual data."],
      ["Personal crowns stay personal", "No public ranking of producers by default."],
      ["No re-identification", "No automatic data sharing across platforms."],
    ];
    if (people === "guests") prom.splice(3, 0, ["Notes belong to guests", "Their tasting notes are theirs to keep or share."]);
    const rh = people === "guests" ? 0.66 : 0.78, ch = rh - 0.12;
    prom.forEach(([h, b], i) => {
      const y = 1.95 + i * rh;
      card(s, M, y, 8.4, ch, "Promise: " + h);
      txt(s, [{ text: h + "  ", options: { fontFace: BOLD } }, { text: b }], { x: M + 0.3, y, w: 7.9, h: ch, fontSize: 14, valign: "middle" });
    });
    const px = M + 8.7, pw = CW - 8.7;
    card(s, px, 1.95, pw, 3.78, "Why it matters", OLIVE);
    txt(s, [label("WHY IT MATTERS", CREAM, 13), spacer(8), { text: "Say what you really think. It only works if people are safe to. That trust is what makes the insight worth having." }], { x: px + 0.3, y: 2.2, w: pw - 0.6, h: 3.3, color: CREAM, fontSize: 17 });
    flag(s, M, 5.95, CW, 0.55, "TO DECIDE", "'By default' and 'automatic' suggest exceptions. Keep, or make absolute?", 11);
    s.addNotes("Built from the confirmed Partner Mode data rules ('That trust is the brand — Say what you really think only works if people are safe to do so') and the promises from the October deck's 'Three layers of insight'.");
    return s;
  }

  return { brandSlide, trustSlide };
};
