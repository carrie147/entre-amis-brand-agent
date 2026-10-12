// Event Mode pack v2 — written to the organiser, built from slides 14–22 of the revised brand deck (10 October)
// and founder direction (11 October): talk to organisers first; what your visitors get / what you get; insight is the pay-off.
module.exports = (ctx) => {
  const { OLIVE, CREAM, WHITE, BOLD, W, M, CW, LOGO, LOGO_RATIO, card, label, txt, flag, placeholderBox, content, cardRow, pill, marker, responsibleSlide, founderSlide, backCover } = ctx;
  const P = () => ctx.pres;
  const common = require("./common.js")(ctx);
  const SEC1 = "Introduction", SEC2 = "Event Mode", SEC3 = "Working together", SEC4 = "About us";
  const bullets = (items, gap = 8) => items.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < items.length - 1, paraSpaceAfter: gap } }));
  const spacer = (n = 6) => ({ text: " ", options: { fontSize: n, breakLine: true } });

  ctx.exportsTo.buildEvent = () => {
    const pres = P();

    // ---------- 1 · Cover ----------
    pres.addSection({ title: SEC1 });
    {
      const s = pres.addSlide({ masterName: "EA Cover", sectionTitle: SEC1 });
      const lw = 3.4, lh = lw * LOGO_RATIO;
      s.addImage({ path: LOGO, x: (W - lw) / 2, y: 1.1, w: lw, h: lh, altText: "Entre Amis logo" });
      pill(s, (W - 3) / 2, 3.1, 3, "event", 0.5);
      txt(s, "For wine festivals, tasting events and regional wine bodies", { x: M, y: 3.8, w: CW, h: 0.6, fontSize: 28, align: "center" });
      txt(s, "Conversation creates connection. Connection creates insight.", { x: M, y: 4.5, w: CW, h: 0.4, fontSize: 16, italic: true, align: "center" });
      flag(s, M, 5.55, 5.9, 0.95, "TO DECIDE", "Event Mode's stage, and its detailed differences from Partner Mode.");
      flag(s, W - M - 5.9, 5.55, 5.9, 0.95, "TO ADD", "Master logo artwork files (this logo is low resolution).");
      s.addNotes("Written to organisers: wine festivals and tasting events, and regional wine bodies that take on a marketing role for an area (organisations like Vineyards of Hampshire or Vins de Provence). 'Marketing areas' replaced, as it's too generic. Named events and organisations are kept out so the pack can go to anyone; use names in each organiser's own proposal.");
    }

    // ---------- 2 · The brand ----------
    common.brandSlide(SEC1, "Event Mode");

    // ---------- 3 · What you know today ----------
    pres.addSection({ title: SEC2 });
    {
      const s = content(SEC2, "What you know after a tasting day", "Often, only who bought the tickets.");
      marker(s, "event");
      cardRow(s, 1.95, 2.3, [
        ["WHO CAME", "You often know the ticket buyer, not everyone with them. One person may buy eight tickets."],
        ["WHAT THEY THOUGHT", "Visitors talk about the wines all day. Most of what they say isn't captured."],
        ["WHAT HAPPENS NEXT", "The wines and producers visitors discovered are easily forgotten once the day ends."],
      ], { size: 16 });
      card(s, M, 4.55, CW, 1.0, "Event Mode answer", OLIVE);
      txt(s, "Event Mode turns the conversations at your event into insight you can use, and gives visitors a reason to remember the day.", { x: M + 0.5, y: 4.55, w: CW - 1, h: 1.0, color: CREAM, fontSize: 18, valign: "middle", align: "center" });
      flag(s, M, 5.75, CW, 0.7, "TO ADD", "Evidence for 'most of what they say isn't captured' and 'easily forgotten' from organiser conversations, so these read as findings, not assumptions.", 11);
      s.addNotes("Rewritten from 'The event opportunity: a real gap' so it speaks to the organiser's problem first. Ticket buyers and 'one person may buy eight tickets' are your points. 'Where do all the wines you discovered go?' becomes the third card.");
    }

    // ---------- 4 · What your visitors get / what you get ----------
    {
      const s = content(SEC2, "What your visitors get. What you get.", "One experience, two sets of benefits.");
      marker(s, "event");
      const cw = (CW - 0.3) / 2, top = 1.95, h = 4.0;
      card(s, M, top, cw, h, "Your visitors get");
      txt(s, [label("YOUR VISITORS GET", OLIVE, 14), spacer(8), ...bullets([
        "Meet the Maker: producer stories and videos.",
        "Tasting prompts, polls and questions, with no wrong answers.",
        "Their wines and notes saved as they go.",
        "Their own Wine of the Day, crowned.",
        "A personal record in My wines, to revisit after the event.",
      ])], { x: M + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.5, fontSize: 16 });
      const x2 = M + cw + 0.3;
      card(s, x2, top, cw, h, "You get", OLIVE);
      txt(s, [label("YOU GET", CREAM, 14), spacer(8), ...bullets([
        "Insight into what visitors really think, in their own words.",
        "Combined, anonymised reporting on saved wines, crowns, polls and tasting responses.",
        "A home for your producers' stories, and a view of how visitors use them.",
        "New contacts, where visitors choose to hear from you.",
        "A reason to reconnect after the event.",
      ])], { x: x2 + 0.35, y: top + 0.3, w: cw - 0.7, h: h - 0.5, fontSize: 16, color: CREAM });
      flag(s, M, 6.1, cw, 0.55, "TO DECIDE", "Quizzes and prizes (in the October deck): keep, and how?", 11);
      flag(s, x2, 6.1, cw, 0.55, "TO CONFIRM", "Contacts: proposed rule, needs legal review.", 11);
      s.addNotes("New spine for the pack, as you suggested. Visitor side from the October 'During / Personal / After' slide. Quizzes and prizes left off until decided: quizzes need to fit 'no wrong answers', and prizes near alcohol need checking against CAP and Portman Group rules. 'Save wines in seconds' isn't used: it's a speed claim and suggests wine recognition, which isn't claimable yet.");
    }

    // ---------- 5 · How Entre Amis shows up ----------
    {
      const s = content(SEC2, "How we show up at your event", "Mostly on visitors' phones and through the tasting itself.");
      marker(s, "event");
      cardRow(s, 1.95, 2.35, [
        ["ON VISITORS' PHONES", "A QR code is all it takes. The experience runs alongside the tasting, at each visitor's own pace."],
        ["ON YOUR MAIN SCREEN", "Where you have one: live shared questions and results, in scheduled moments."],
        ["A SMALL ENTRE AMIS CORNER", "Comfortable seats and a place to connect and find comfort. Never a sales space."],
      ], { size: 15 });
      txt(s, [label("IT FITS DIFFERENT EVENTS", OLIVE, 13), { text: "Large festivals with a main screen.  Tented tastings with no installed screens.  A smaller seasonal follow-up to reconnect with visitors." }], { x: M, y: 4.55, w: 7.8, h: 1.0, fontSize: 15 });
      placeholderBox(s, M + 8.1, 4.5, CW - 8.1, 1.95, "Photo of the corner or the app in use — to add");
      flag(s, M, 5.8, 7.8, 0.65, "TO CONFIRM", "'A QR code is all it takes' assumes visitors join by QR at every event.", 11);
      s.addNotes("Replaces 'The Entre Amis table' and 'One platform. Different event formats.' The table is no longer front and centre: it's one small way Entre Amis shows up. 'Comfortable seats... a place to connect and find comfort, never a sales space' is your wording. The fee line ('Staffing, furniture, transport, setup and operational support must be covered by the agreed event fee') moves to each organiser's proposal.");
    }

    // ---------- 6 · Visitor journey ----------
    {
      const s = content(SEC2, "Your visitors' day", "Built around what actually happens at a discovery day.");
      marker(s, "event");
      const steps = ["Arrive", "Explore", "Taste", "Sit and talk", "Save", "Crown", "Revisit"];
      const g = 0.32, sw = (CW - g * 6) / 7;
      steps.forEach((t, i) => {
        const x = M + i * (sw + g);
        s.addText(t, { x, y: 2.0, w: sw, h: 0.75, isTextBox: true, shape: P().shapes.ROUNDED_RECTANGLE, rectRadius: 0.37, fill: { color: OLIVE }, color: CREAM, fontFace: BOLD, fontSize: 15, align: "center", valign: "middle", margin: 0, objectName: "Journey: " + t });
        if (i < steps.length - 1) s.addShape(P().shapes.RIGHT_ARROW, { x: x + sw + 0.06, y: 2.27, w: 0.2, h: 0.2, fill: { color: ctx.MID }, line: { color: ctx.MID, width: 0 } });
      });
      cardRow(s, 3.25, 1.6, [
        ["QUICK TO USE", "Easy to start, easy to join."],
        ["OPTIONAL QUESTIONS", "Visitors answer as much or as little as they like."],
        ["NO COMPULSORY TASTING", "Tasting is always optional."],
        ["SET UP FOR YOUR EVENT", "Tailored to how your day runs."],
      ], { size: 15 });
      placeholderBox(s, M, 5.1, CW, 1.4, "Visitor screens — to add");
      s.addNotes("Subtitle and cards now speak to the organiser. 'Enhance' and 'lasting memories' were benefit claims, so they're out.");
    }

    // ---------- 7 · The insight you receive ----------
    {
      const s = content(SEC2, "The insight you receive", "Three layers, all built on consent.");
      marker(s, "event");
      const rows = [
        ["1", "Your event", "Combined discoveries, favourites, crown patterns, poll and tasting responses, and how visitors used your content."],
        ["2", "Your new contacts", "Individual visitors who choose to hear from you, and only them."],
        ["3", "Wider trends", "Carefully anonymised Entre Amis trends across events, where numbers and permissions allow."],
      ];
      rows.forEach(([n, h, b], i) => {
        const y = 1.95 + i * 1.2;
        card(s, M, y, CW, 1.05, "Layer: " + h);
        s.addText(n, { x: M + 0.3, y: y + 0.2, w: 0.65, h: 0.65, isTextBox: true, shape: P().shapes.OVAL, fill: { color: OLIVE }, color: CREAM, fontFace: BOLD, fontSize: 16, align: "center", valign: "middle", margin: 0 });
        txt(s, h, { x: M + 1.25, y, w: 2.9, h: 1.05, fontFace: BOLD, fontSize: 16, valign: "middle" });
        txt(s, b, { x: M + 4.2, y, w: CW - 4.5, h: 1.05, fontSize: 16, valign: "middle" });
      });
      flag(s, M, 5.65, (CW - 0.3) / 2, 0.8, "TO CONFIRM", "Layer 2 depends on the proposed contact rule and legal review.", 11);
      flag(s, M + (CW - 0.3) / 2 + 0.3, 5.65, (CW - 0.3) / 2, 0.8, "TO DECIDE", "Whether crowned wines are reported, and to whom, without ranking vineyards.", 11);
      s.addNotes("'Three layers of insight' with the labels fixed to match their descriptions (they were swapped in the October deck). Event Mode contacts go to the organiser by default; individual vineyards only where each is named in the visitor's permission (proposed, Brand Brain 03).");
    }

    // ---------- 8 · Trust ----------
    common.trustSlide(SEC2, "event", "visitors");

    // ---------- 9 · What a partnership might include ----------
    pres.addSection({ title: SEC3 });
    {
      const s = content(SEC3, "What a partnership might include", "A possible year-round relationship across your events.");
      marker(s, "event");
      cardRow(s, 1.95, 2.4, [
        ["DIGITAL", "The visitor experience, your producers' content, saved discoveries, polls, consent journeys and reporting."],
        ["AT THE EVENT", "A small Entre Amis corner and scheduled moments on your main screen, fully costed."],
        ["AFTER THE EVENT", "The post-event visitor experience, combined insight reports, a partner review and a potential Christmas activation."],
      ], { size: 15 });
      flag(s, M, 4.65, CW, 0.7, "TO DECIDE", "The indicative price line is removed: nothing may be priced until confirmed. Pricing belongs in each organiser's proposal.", 11);
      s.addNotes("'Hosted Entre Amis Table' is now 'a small Entre Amis corner', in line with how Entre Amis shows up at events.");
    }

    // ---------- 10 · Founding partnership ----------
    {
      const s = content(SEC3, "A founding partnership, not exclusivity", "Help shape the future of the Entre Amis event experience.");
      marker(s, "event");
      const rows = [
        ["FOUNDING EXPERIENCE PARTNER", "Co-design input, launch recognition, a set-up tailored to your event and a shared post-event learning review."],
        ["TWO-YEAR INSIGHT BENEFIT", "Enhanced reporting and strategic insight conversations, within agreed deliverables and data-quality thresholds."],
        ["PREFERENTIAL RATES", "A preferential rate for comparable future events. Annual adjustments and wider scope agreed separately. No exclusivity."],
      ];
      rows.forEach(([h, b], i) => {
        const y = 1.95 + i * 1.12;
        card(s, M, y, CW, 0.98, "Founding: " + h);
        txt(s, h, { x: M + 0.3, y, w: 3.6, h: 0.98, fontFace: BOLD, fontSize: 13, charSpacing: 1.5, valign: "middle" });
        txt(s, b, { x: M + 4.1, y, w: CW - 4.4, h: 0.98, fontSize: 15, valign: "middle" });
      });
      flag(s, M, 5.45, (CW - 0.3) / 2, 0.8, "TO DECIDE", "Preferential rates imply pricing. Keep here, or move to the proposal?", 11);
      flag(s, M + (CW - 0.3) / 2 + 0.3, 5.45, (CW - 0.3) / 2, 0.8, "TO DECIDE", "'Launch recognition': confirm what is launching, and when.", 11);
      s.addNotes("Heading typo fixed: 'foundering' (sinking) is now 'founding'. 'Insight' restored, as it's allowed in partner materials (proposed).");
    }

    // ---------- 11 · How we'll show it working ----------
    {
      const s = content(SEC3, "How we'll show it working", "The experience and evidence first.");
      marker(s, "event");
      cardRow(s, 1.95, 2.6, [
        ["CLICKABLE PROTOTYPE", "Your visitors' screens: discover, Meet the Maker, tasting prompts, save, crown, join in, memories and consent."],
        ["EXAMPLE INSIGHT REPORT", "An illustrative dashboard and post-event report. Every number tied to a real interaction."],
        ["FIRST EVENT PILOT", "Defined scope, costs, responsibilities, no exclusivity, and measures of success for your first event."],
      ], { size: 15 });
      flag(s, M, 4.85, CW, 0.7, "TO ADD", "Where each of these is today (e.g. built, in progress, planned).", 11);
      s.addNotes("From 'Before we build event partner mode'. The 'Ecosystem story' card was a note about the deck itself, so it's left out.");
    }

    // ---------- 12–14 · Shared slides ----------
    pres.addSection({ title: SEC4 });
    responsibleSlide(SEC4);
    founderSlide(SEC4);
    backCover(SEC4);

    // ---------- 15 · Working notes ----------
    pres.addSection({ title: "Working notes — delete before sharing" });
    {
      const s = content("Working notes — delete before sharing", "Before this pack is shared", "Working notes. Delete this slide, and every white box with a blush border, before sharing.");
      const decide = ["Event Mode: its stage and how it differs from Partner Mode", "Quizzes and prizes (slide 4)", "QR joining at every event (slide 5)", "Contacts rule, legal review; reporting crowns (slides 4, 7)", "'By default' and 'automatic' (slide 8)", "Pricing, preferential rates, launch recognition (slides 9, 10)"];
      const add = ["Master logo artwork files", "Organiser evidence for slide 3", "Visitor screens and photos (slides 5, 6)", "Stage of each proof step (slide 11)", "Your surname and photo (slide 13)", "Contact details (back cover)"];
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
