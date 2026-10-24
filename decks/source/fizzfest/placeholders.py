"""Draw replaceable photo and screenshot placeholders for the Fizz Fest deck.

Reads a JSON list of {file, w, h, kind, text} (w and h in inches) and writes
one PNG per entry. In PowerPoint, right-click > Change Picture swaps the real
image in at the same size and crop.
"""
import json, sys, os
from PIL import Image, ImageDraw, ImageFont, ImageOps

FONTS = os.path.expanduser("~/.fonts")
BOLD = os.path.join(FONTS, "raleway-latin-600-normal.ttf")
LIGHT = os.path.join(FONTS, "raleway-latin-300-normal.ttf")
DEEP, MID, SAGE, CREAM = (86, 90, 50), (139, 139, 92), (185, 188, 154), (239, 234, 224)
DPI = 110


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def wrap(draw, text, font, width):
    lines, line = [], ""
    for word in text.split():
        test = (line + " " + word).strip()
        if draw.textlength(test, font=font) <= width:
            line = test
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def crop(spec, out_dir):
    """Cover-crop a real photo to the frame's shape, around focus (fx, fy: 0-1)."""
    im = ImageOps.exif_transpose(Image.open(spec["src"])).convert("RGB")
    fx, fy = spec.get("focus", (0.5, 0.5))
    target = spec["w"] / spec["h"]
    w, h = im.size
    if w / h > target:
        nw = int(h * target); x = min(max(int(fx * w - nw / 2), 0), w - nw); im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w / target); y = min(max(int(fy * h - nh / 2), 0), h - nh); im = im.crop((0, y, w, y + nh))
    im.save(os.path.join(out_dir, spec["file"]), quality=92)


def make(spec, out_dir):
    if spec.get("src"):
        return crop(spec, out_dir)
    W, H = int(spec["w"] * DPI), int(spec["h"] * DPI)
    photo = spec["kind"] == "photo"
    top, bottom = (MID, DEEP) if photo else (CREAM, SAGE)
    ink = CREAM if photo else DEEP
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    for y in range(H):  # soft diagonal light, top left to bottom right
        d.line([(0, y), (W, y)], fill=lerp(top, bottom, y / max(H - 1, 1)))
    s = min(W, H)
    label = ImageFont.truetype(BOLD, max(15, int(s * 0.06)))
    body = ImageFont.truetype(LIGHT, max(16, int(s * 0.07)))
    head = "PHOTOGRAPHY TO SOURCE" if photo else "SCREENSHOT TO ADD"
    while d.textlength(head, font=label) > W * 0.86 and label.size > 8:
        label = ImageFont.truetype(BOLD, label.size - 1)
    lines = wrap(d, spec["text"], body, W * 0.78)
    lh = body.size * 1.35
    block = label.size * 2.2 + lh * len(lines)
    y = (H - block) / 2
    d.text((W / 2, y), head, font=label, fill=ink, anchor="mt")
    y += label.size * 2.2
    for ln in lines:
        d.text((W / 2, y), ln, font=body, fill=ink, anchor="mt")
        y += lh
    img.save(os.path.join(out_dir, spec["file"]), optimize=True)


if __name__ == "__main__":
    specs = json.load(open(sys.argv[1]))
    for sp in specs:
        make(sp, sys.argv[2])
