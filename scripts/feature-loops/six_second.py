"""Generate transparent, six-second homepage Lotties with independent UI layers."""

import base64
import hashlib
import io
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public/brand/homepage/feature-lotties"
MANIFEST = ROOT / "src/app/preview/scroll-showcase/homepage-storyboards.json"
INK, MUTED, SOFT, GREEN = "#232522", "#61665f", "#f1f3f0", "#dceee1"


def fixed(value):
    return {"a": 0, "k": value}


def track(pairs):
    return {
        "a": 1,
        "k": [
            {
                "t": t,
                "s": value,
                "i": {"x": [0.66], "y": [1]},
                "o": {"x": [0.33], "y": [0]},
            }
            for t, value in pairs
        ],
    }


class Scene:
    def __init__(self):
        self.assets, self.layers = [], []

    def layer(self, name, box, draw, start=None, move=(0, 12), scale=False):
        x, y, w, h = box
        im = Image.new("RGBA", (w * 2, h * 2))
        d = ImageDraw.Draw(im)

        def rect(x, y, w, h, c, r=10):
            d.rounded_rectangle(
                (2 * x, 2 * y, 2 * (x + w) - 1, 2 * (y + h) - 1), radius=r * 2, fill=c
            )

        def text(x, y, s, size=18, c=INK, bold=False):
            font = ImageFont.truetype(
                str(
                    Path(__file__).parent
                    / "fonts"
                    / f"Geist-{600 if bold else 400}.ttf"
                ),
                size * 2,
            )
            d.text((x * 2, y * 2), s, font=font, fill=c, anchor="lt")

        draw(rect, text)
        buf = io.BytesIO()
        im.save(buf, "PNG", optimize=True)
        idx = len(self.assets) + 1
        self.assets.append(
            dict(
                id=str(idx),
                w=w * 2,
                h=h * 2,
                u="",
                e=1,
                p="data:image/png;base64," + base64.b64encode(buf.getvalue()).decode(),
            )
        )
        pos = [x, y, 0]
        ks = dict(
            p=fixed(pos),
            a=fixed([0, 0, 0]),
            s=fixed([50, 50, 100]),
            r=fixed(0),
            o=fixed(100),
        )
        if start is not None:
            offset = [x + move[0], y + move[1], 0]

            def anim(initial, final):
                return track(
                    [
                        (0, initial),
                        (start, initial),
                        (start + 12, final),
                        (147, final),
                        (172, initial),
                        (179, initial),
                    ]
                )

            ks.update(o=anim([0], [100]), p=anim(offset, pos))
            if scale:
                ks["s"] = anim([1, 50, 100], [50, 50, 100])
        self.layers.insert(
            0,
            dict(
                ty=2,
                ind=idx,
                refId=str(idx),
                nm=name,
                ks=ks,
                ip=0,
                op=180,
                st=0,
                sr=1,
                bm=0,
            ),
        )

    def panel(self, title, sub):
        self.layer(
            title,
            (48, 154, 544, 332),
            lambda r, t: (
                r(0, 0, 544, 332, "white", 24),
                t(28, 27, title, 25, bold=True),
                t(28, 68, sub, 16, MUTED),
            ),
        )

    def tile(self, x, y, w, label, start=None, color=SOFT, move=(0, 10), scale=False):
        self.layer(
            label,
            (x, y, w, 44),
            lambda r, t: (r(0, 0, w, 44, color, 12), t(14, 13, label, 16)),
            start,
            move,
            scale,
        )

    def text(self, x, y, label, start=None, size=18, move=(0, 6)):
        self.layer(
            label,
            (x, y, min(570, max(90, len(label) * size)), size + 8),
            lambda r, t: t(0, 2, label, size),
            start,
            move,
        )


def build(n):
    s = Scene()
    p, t, b = s.panel, s.text, s.tile
    if n == 2:
        p("Allowed sources", "Choose the tools this agent can read.")
        for i, name in enumerate(
            ["Pipeline CRM", "Last week’s report", "Personal inbox"]
        ):
            b(80, 260 + i * 58, 475, name)
            if i < 2:
                b(436, 260 + i * 58, 119, "✓  Allowed", 24 + i * 34, GREEN, (-10, 0))
    elif n == 1:
        p("Pinned brief", "Friday pipeline recap")
        b(80, 270, 305, "Include all opportunities.")
        b(196, 338, 355, "Correction: closed deals only.", 25)
        b(80, 401, 245, "✓  Brief updated", 82, GREEN)
    elif n == 4:
        p("Source checks", "Building the weekly report")
        for i, name in enumerate(["CRM records", "Revenue sheet", "Prior recap"]):
            t(80, 260 + 62 * i, name)
            s.layer(
                name + " progress",
                (292, 269 + 62 * i, 235, 9),
                lambda r, t: r(0, 0, 235, 9, "#567e66", 4),
                18 + 30 * i,
                (0, 0),
                True,
            )
    elif n == 5:
        p("Approval requested", "One detail needs your decision.")
        t(80, 268, "Include the unconfirmed renewal?")
        b(80, 326, 155, "Hold for review")
        b(247, 326, 130, "Exclude it")
        b(247, 326, 130, "✓  Excluded", 42, GREEN, (0, 0))
        t(80, 405, "Quinn can finish the reply.", 79)
    elif n == 7:
        p("Request workflow", "Trace a request from intake to delivery.")
        for i, name in enumerate(["Request", "Review", "Deliver"]):
            b(80 + 164 * i, 320, 136, name, None if not i else 27 * i, SOFT, (-22, 0))
            if i < 2:
                t(219 + 164 * i, 329, "→", 15 + 27 * i)
    elif n == 8:
        p("Step ownership", "Assign the review before the handoff.")
        b(80, 264, 210, "Draft   ·   Quinn")
        b(321, 264, 227, "Review   ·   Unassigned")
        b(85, 371, 153, "Maya Chen")
        b(321, 264, 227, "Review   ·   Maya", 38, GREEN, (-220, 94))
    elif n == 10:
        p("Release gate", "The export waits for approval.")
        b(80, 260, 200, "Ⅱ   Awaiting review")
        b(80, 260, 200, "✓   Approved", 38, GREEN, (0, 0))
        t(105, 322, "↓", 58)
        b(80, 361, 330, "Export delivered to Sales", 75)
    elif n == 11:
        p("# launch-room", "Project workspace")
        for i, name in enumerate(["Maya", "Fred", "Quinn"]):
            b(80 + i * 115, 267, 102, name, 15 + 14 * i, SOFT, (0, -16))
        b(80, 355, 380, "Pinned   ·   Launch brief.pdf", 83, GREEN)
    elif n == 12:
        p("Message to the channel", "Launch review")
        b(80, 267, 108, "@Quinn", 16)
        t(199, 280, "summarize", 36)
        t(303, 280, "the brief.", 53)
        b(80, 333, 211, "Launch brief.pdf", 72)
        b(302, 395, 242, "Quinn joined the thread", 102, GREEN)
    elif n == 13:
        p("# product", "Launch checklist")
        b(80, 256, 260, "Is the rollout date final?")
        t(112, 322, "↳", 22)
        b(148, 323, 360, "Thread   ·   Friday is confirmed.", 38, SOFT, (40, 0))
        b(148, 391, 215, "2 replies in thread", 80, GREEN)
    elif n == 14:
        p("Search the channel", "Find a decision and its source.")
        b(80, 258, 465, "Search   /   rollout date")
        b(80, 327, 460, "“Friday is confirmed.”   ·   Maya", 32, SOFT, (0, 27))
        b(80, 394, 232, "Open launch brief.pdf", 81, GREEN)
    elif n == 15:
        p("Analytics dashboard", "Teach the browser a report")
        b(80, 259, 227, "Date range   ▾")
        b(80, 259, 227, "This week   ✓", 31, GREEN, (0, 0))
        for i, h in enumerate([24, 45, 36, 72, 57]):
            s.layer(
                "Daily total",
                (86 + 39 * i, 430 - h, 23, h),
                lambda r, t, h=h: r(0, 0, 23, h, "#748c9f", 5),
                43 + i * 6,
                (0, 12),
            )
        b(357, 375, 182, "Export CSV   ↓", 97)
    elif n == 16:
        p("Record lookup", "Orders / Search")
        b(80, 256, 458, "Find order   #1042")
        b(80, 323, 220, "Order 1042", 33, SOFT, (-25, 0))
        t(315, 334, "Shipped", 62)
        b(80, 397, 274, "Tracking   ·   LX 48021", 83, GREEN)
    elif n == 17:
        p("Prepare a return", "Stop before submission.")
        for i, (k, v) in enumerate([("Order", "#1042"), ("Reason", "Size exchange")]):
            t(80, 270 + 58 * i, k)
            b(200, 257 + 58 * i, 335, v, 22 + 38 * i)
        b(200, 395, 245, "Paused for your review", 98, GREEN)
    elif n == 18:
        p("Export validation", "Compare the file with the expected result.")
        for i, (k, v) in enumerate(
            [
                ("File format", "CSV"),
                ("Row count", "24 records"),
                ("Required fields", "All present"),
            ]
        ):
            t(80, 265 + 57 * i, k)
            b(319, 250 + 57 * i, 218, "✓   " + v, 20 + i * 32, GREEN, (16, 0))
    else:
        raise ValueError(n)
    return s


def main():
    rows = json.loads(MANIFEST.read_text())
    for row in rows:
        if row.get("status") == "native":
            continue
        stem = Path(row["src"]).stem
        dest = OUT / (stem + ".json")
        if row["number"] in (3, 6, 9):
            data = json.loads(dest.read_text())
            ratio = 180 / data["op"]
            for layer in data["layers"]:
                layer["op"] = 180
                for prop in layer["ks"].values():
                    if prop["a"]:
                        for key in prop["k"]:
                            key["t"] = min(179, round(key["t"] * ratio, 3))
        else:
            scene = build(row["number"])
            data = dict(
                v="5.12.2",
                fr=30,
                ip=0,
                w=640,
                h=640,
                nm=row["title"],
                ddd=0,
                assets=scene.assets,
                layers=scene.layers,
            )
        data["op"] = 180
        dest.write_text(json.dumps(data, separators=(",", ":")))
        for field in ("stateMachine", "artboard", "animation"):
            row.pop(field, None)
        row.update(
            src="/" + str(dest.relative_to(ROOT / "public")),
            poster="/" + str(dest.with_suffix(".png").relative_to(ROOT / "public")),
            duration=6,
            status="lottie",
            bytes=dest.stat().st_size,
            sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),
        )
    MANIFEST.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
