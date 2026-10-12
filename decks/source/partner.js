// Partner Mode pack — a hosted tasting at a single vineyard, bar, restaurant, retailer or wine club.
// From founder definition (12 October) and slide 24 of the revised brand deck. Written to the host first.
module.exports = (ctx) => {
  const { OLIVE, CREAM, BOLD, W, M, CW, LOGO, LOGO_RATIO, card, label, txt, flag, placeholderBox, content, cardRow, pill, marker, responsibleSlide, founderSlide, backCover } = ctx;
  const P = () => ctx.pres;
  const common = require("./common.js")(ctx);
  const SEC1 = "Introduction", SEC2 = "Partner Mode", SEC3 = "Working together", SEC4 = "About us";
  const bullets = (items, gap = 8) => items.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < items.length - 1, paraSpaceAfter: gap } }));
  const spacer = (n = 6) => ({ text: " ", options: { fontSize: n, breakLine: true } });

  ctx.exportsTo.buildPartner = () => {
    const pres = P();

    // ---------- 1 · Cover ----------
    pres.addSection({ title: SEC1 });
    {
      const s = pres.addSlide({ masterName: "EA Cover", sectionTitle: SEC1 });
      const lw = 3.4, lh = lw * LOGO_RATIO;
      s.addImage({ path: LOGO, x: (W - lw) / 2, y: 1.1, w: lw, h: lh, altText: "Entre Amis logo" });
      pill(s, (W - 3.2) / 2, 3.1, 3.2, "partners", 0.5, "PARTNER MODE");
      txt(s, "For vineyards, bars, restaurants, retailers and wine clubs", { x: M, y: 3.8, w: CW, h: 0.6, fontSize: 28, align: "center" });
      txt(s, "Conversation creates connection. Connection creates insight.", { x: M, y: 4.5, w: CW, h: 0.4, fontSize: 16, italic: true, align: "center" });
      flag(s, M, 5.55, 5.9, 0.95, "TO CONFIRM", "Partner Mode as a hosted tasting, and the partner line, are proposed in the Brand Brain.");
      flag(s, W - M - 5.9, 5.55, 5.9, 0.95, "TO ADD", "Master logo artwork files (this logo is low resolution).");
      s.addNotes("Written to the host: a single vineyard, wine brand, bar, restaurant, retailer or wine club running its own tasting. Named partners are kept out so the pack can go to anyone.");
    }

    // ---------- 2 · The brand ----------
    common.brandSlide(SEC1, "Partner Mode");

    // ---------- 3 · After a tasting ----------
    pres.addSection({ title: SEC2 });
    {
      const s = content(SEC2, "What you know after a tasting", "Your guests taste, talk and leave. What did they really think?");
      marker(s, "partnerMode", 2.9);
      cardRow(s, 1.95, 2.3, [
        ["WHAT THEY THOUGHT", "Guests talk about your wines all through a tasting. Most of what they say isn't captured."],
        ["WHAT THEY REMEMBER", "Which wines they liked, and why, is easily forgotten once they leave."],
        ["WHAT HAPPENS NEXT", "Without a way to stay in touch, the relationship often ends at the door."],
      ], { size: 16 });
      card(s, M, 4.55, CW, 1.0, "Partner Mode answer", OLIVE);
      txt(s, "Partner Mode gives your tasting a social layer: guests take part, keep what they discover, and you hear what they really think.", { x: M + 0.5, y: 4.55, w: CW - 1, h: 1.0, color: CREAM, fontSize: 18, valign: "middle", align: "center" });
      flag(s, M, 5.75, CW, 0.7, "TO ADD", "Evidence for these three points from host conversations, so they read as findings, not assumptions.", 11);
      s.addNotes("Mirrors the Event Mode pack. 'Entre Amis adds the social layer' comes from slide 24 of the October deck.");
    }

    // ---------- 4 · How a tasting works ----------
    {
      const s = content(SEC2, "How a Partner Mode tasting works", "You host. We add the conversation.");
      marker(s, "partnerMode", 2.9);
      const steps = ["Join", "Taste and talk", "Vote and discover", "Note and favourite", "Share and keep"];
      const g = 0.35, sw = (CW - g * 4) / 5;
      steps.forEach((t, i) => {
        const x = M + i * (sw + g);
        s.addText(t, { x, y: 2.0, w: sw, h: 0.7, isTextBox: true, shape: P().shapes.ROUNDED_RECTANGLE, rectRadius: 0.35, fill: { color: OLIVE }, color: CREAM, fontFace: BOLD, fontSize: 15, align: "center", valign: "middle", margin: 0, objectName: "Step: " + t });
        if (i < steps.length - 1) s.addShape(P().shapes.RIGHT_ARROW, { x: x + sw + 0.07, y: 2.24, w: 0.22, h: 0.22, fill: { color: ctx.MID }, line: { color: ctx.MID, width: 0 } });
      });
      const desc = [
        "Guests join your tasting on their phones.",
        "Information on each wine and on you. Savour and Pour cards get people talking, if you'd like them.",
        "Live votes and your own questions and quizzes, shared with the group as they learn.",
        "Guests keep their own notes and favourite the wines they like.",
        "Favourites are saved under My wines in their account. Notes are theirs to keep or share.",
      ];
      desc.forEach((d, i) => {
        const x = M + i * (sw + g);
        card(s, x, 2.95, sw, 2.2, "Step detail " + (i + 1));
        txt(s, d, { x: x + 0.2, y: 3.15, w: sw - 0.4, h: 1.9, fontSize: 14 });
      });
      flag(s, M, 5.4, CW, 0.7, "TO CONFIRM", "Quizzes are framed as learning about you: answers revealed as discoveries, nobody told they were wrong.", 11);
      s.addNotes("From your description (12 October): hosted tasting; Savour and Pour cards as an option; host-specific questions and quizzes; interactive voting shared as a learning experience; guests collate and share notes; information about the wines and the vineyard; favourite and store wines in a profile.");
    }

    // ---------- 5 · Guests get / you get ----------
    {
      const s = content(SEC2, "What your guests get. What you get.", "One tasting, two sets of benefits.");
      marker(s, "partnerMode", 2.9);
      const cw = (CW - 0.3) / 2, top = 1.95, h = 4.1;
      card(s, M, top, cw, h, "Your guests get");
      txt(s, [label("YOUR GUESTS GET", OLIVE, 14), spacer(8), ...bullets([
        "A tasting they take part in, not just listen to.",
        "Plain information on each wine and on you.",
        "Questions, quizzes and votes to learn as a group.",
        "Their own notes, in one place, to keep or share.",
        "Their favourite wines, saved under My wines.",
      ])], { x: M + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.5, fontSize: 16 });
      const x2 = M + cw + 0.3;
      card(s, x2, top, cw, h, "You get", OLIVE);
      txt(s, [label("YOU GET", CREAM, 14), spacer(8), ...bullets([
        "Insight into what guests really think about your wines, in their own words.",
        "Live votes and responses, combined and anonymised.",
        "A view of which of your wines guests favourite.",
        "A home for your story, and your makers' voices.",
        "New contacts, where guests choose to hear from you.",
      ])], { x: x2 + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.5, fontSize: 16, color: CREAM });
      flag(s, x2, 6.15, cw, 0.5, "TO CONFIRM", "Contacts: proposed rule, needs legal review.", 11);
      s.addNotes("Same spine as the Event Mode pack. Guests' own notes are not part of your insight unless they consent (proposed, Brand Brain 00). Favourites are among your own wines only; we never compare your wines with anyone else's.");
    }

    // ---------- 6 · Your tasting, your way ----------
    {
      const s = content(SEC2, "Your tasting, your way", "Set up around your wines, your story and your space.");
      marker(s, "partnerMode", 2.9);
      cardRow(s, 1.95, 2.0, [
        ["YOUR WINES", "Information on each wine you pour, in plain English."],
        ["YOUR STORY", "Your vineyard or venue, and Meet the Maker videos."],
        ["YOUR QUESTIONS", "Questions and quizzes written around you."],
        ["YOUR CHOICE", "Savour and Pour cards, if you'd like them."],
      ], { size: 15 });
      txt(s, [label("WHERE IT WORKS", OLIVE, 13), { text: "At the cellar door or vineyard.  In a bar or restaurant.  In store, or at a wine club tasting." }], { x: M, y: 4.25, w: 7.8, h: 1.0, fontSize: 15 });
      placeholderBox(s, M + 8.1, 4.2, CW - 8.1, 2.25, "Photo of a hosted tasting — to add");
      s.addNotes("Savour and Pour are the card families used in the partner set-up (confirmed, Brand Brain 02). When describing your wines we stay neutral: what they're like, never better than anyone else's.");
    }

    // ---------- 7 · The insight you receive ----------
    {
      const s = content(SEC2, "The insight you receive", "Two layers, both built on consent.");
      marker(s, "partnerMode", 2.9);
      const rows = [
        ["1", "Your tasting", "Combined votes, quiz and tasting responses, favourites, and how guests used your content."],
        ["2", "Your new contacts", "Individual guests who choose to hear from you, and only them."],
      ];
      rows.forEach(([n, h, b], i) => {
        const y = 1.95 + i * 1.2;
        card(s, M, y, CW, 1.05, "Layer: " + h);
        s.addText(n, { x: M + 0.3, y: y + 0.2, w: 0.65, h: 0.65, isTextBox: true, shape: P().shapes.OVAL, fill: { color: OLIVE }, color: CREAM, fontFace: BOLD, fontSize: 16, align: "center", valign: "middle", margin: 0 });
        txt(s, h, { x: M + 1.25, y, w: 2.9, h: 1.05, fontFace: BOLD, fontSize: 16, valign: "middle" });
        txt(s, b, { x: M + 4.2, y, w: CW - 4.5, h: 1.05, fontSize: 16, valign: "middle" });
      });
      flag(s, M, 4.45, CW, 0.6, "TO CONFIRM", "Layer 2 depends on the proposed contact rule and legal review.", 11);
      placeholderBox(s, M, 5.25, CW, 1.25, "Example insight report — to add");

      s.addNotes("In Partner Mode, contacts go to that one host only (proposed, Brand Brain 03). Wider Entre Amis trends are not promised in Partner Mode: they depend on how it is built (founder, 12 October).");
    }

    // ---------- 8 · Trust ----------
    common.trustSlide(SEC2, "partnerMode", "guests");

    // ---------- 9 · Partner Mode and Event Mode ----------
    pres.addSection({ title: SEC3 });
    {
      const s = content(SEC3, "Two ways to work with us", "Partner Mode for your own tastings. Event Mode for combined events.");
      const cw = (CW - 0.3) / 2, top = 1.95, h = 3.7;
      [["PARTNER MODE", "partners", ["Hosted by you: a vineyard, bar, restaurant, retailer or wine club.", "Your own tasting, around your wines.", "Your guests, your questions, your story.", "Insight on your tasting and your wines."]],
       ["EVENT MODE", "event", ["Run by an organiser: a festival, tasting event or regional wine body.", "Many producers at one combined event.", "Visitors move between tastings at their own pace.", "Insight for the organiser across the event."]]].forEach(([hd, key, items], i) => {
        const x = M + i * (cw + 0.3);
        card(s, x, top, cw, h, hd);
        pill(s, x + 0.35, top + 0.3, 2.9, key, 0.42, hd);
        txt(s, bullets(items, 10), { x: x + 0.35, y: top + 0.95, w: cw - 0.7, h: h - 1.15, fontSize: 16 });
      });
      flag(s, M, 5.85, CW, 0.6, "TO DECIDE", "Detailed feature differences between Partner Mode and Event Mode.", 11);
      s.addNotes("Lets a host see where they fit, and points organisers to the Event Mode pack.");
    }

    // ---------- 10 · How we'll show it working ----------
    {
      const s = content(SEC3, "How we'll show it working", "The experience and evidence first.");
      marker(s, "partnerMode", 2.9);
      cardRow(s, 1.95, 2.6, [
        ["CLICKABLE PROTOTYPE", "Your guests' screens: join, wine and vineyard information, votes and quizzes, notes, favourites and consent."],
        ["EXAMPLE INSIGHT REPORT", "An illustrative report after a tasting. Every number tied to a real interaction."],
        ["FIRST TASTING PILOT", "Defined scope, responsibilities and measures of success for your first hosted tasting."],
      ], { size: 15 });
      flag(s, M, 4.85, CW, 0.7, "TO ADD", "Where each of these is today. The Partner Mode prototype is built; confirm what guests and hosts can see in it.", 11);
      s.addNotes("'Partner Mode prototype built' is confirmed in the core brand story.");
    }

    // ---------- 11–13 · Shared slides ----------
    pres.addSection({ title: SEC4 });
    responsibleSlide(SEC4);
    founderSlide(SEC4);
    backCover(SEC4);

    // ---------- 14 · Working notes ----------
    pres.addSection({ title: "Working notes — delete before sharing" });
    {
      const s = content("Working notes — delete before sharing", "Before this pack is shared", "Working notes. Delete this slide, and every white box with a blush border, before sharing.");
      const decide = ["Partner Mode as a hosted tasting; partner line (slides 1, 2)", "How quizzes are framed (slide 4)", "Contacts rule, legal review (slides 5, 7)", "'By default' and 'automatic' (slide 8)", "Feature differences from Event Mode (slide 9)"];
      const add = ["Master logo artwork files", "Host evidence for slide 3", "Photo of a hosted tasting (slide 6)", "Stage of each proof step (slide 10)", "Your surname and photo (slide 12)", "Contact details (back cover)"];
      const cw = (CW - 0.3) / 2;
      [["TO DECIDE OR CONFIRM", decide, 0], ["TO ADD", add, 1]].forEach(([hd, items, i]) => {
        const x = M + i * (cw + 0.3);
        card(s, x, 1.95, cw, 4.65, hd);
        txt(s, [label(hd, OLIVE, 14), spacer(6), ...bullets(items, 6)], { x: x + 0.35, y: 2.25, w: cw - 0.7, h: 4.2, fontSize: 14 });
      });
      s.addNotes("Then run the pre-publish check in brand-brain/03-guardrails.md.");
    }
  };
};
