"""Make a locally playable proof and transparent reduced-motion posters."""

from html import escape
from pathlib import Path
import sys
from scenes import SCENES, build, DURATION, POINTER_SHAPE


def number(v):
    return f"{v:.4f}".rstrip("0").rstrip(".") or "0"


def animate(prop, times, values):
    keys = ";".join(number(t / DURATION) for t in times)
    values = ";".join(map(str, values))
    return f'<animate attributeName="{prop}" keyTimes="{keys}" values="{values}" dur="{DURATION}s" repeatCount="indefinite"/>'


def draw(item, moving):
    x, y = item["x"], item["y"]
    if item["kind"] == "cursor":
        if not moving:
            return ""
        positions = item["positions"]
        keys = [(0, *positions[0][1:]), *positions, (10, *positions[-1][1:])]
        translations = ";".join(f"{px} {py}" for _, px, py in keys)
        times = ";".join(number(t / DURATION) for t, _, _ in keys)
        points = " ".join(f"{px},{py}" for px, py in POINTER_SHAPE)
        tag = (
            f'<g><animateTransform attributeName="transform" type="translate" values="{translations}" keyTimes="{times}" dur="10s" repeatCount="indefinite"/>'
            + animate("opacity", [0, 1.55, 1.85, 4.8, 5.15, 10], [0, 0, 1, 1, 0, 0])
            + f'<polygon points="{points}" fill="#363B40" stroke="white" stroke-width="2" stroke-linejoin="round"/></g>'
        )
        return tag
    if item["kind"] == "text":
        size = item["size"]
        tag = f'<text x="{x}" y="{y + size * 0.88}" fill="{item["color"]}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{600 if item["bold"] else 400}">{escape(item["value"])}</text>'
    else:
        rotation = (
            f' transform="rotate({number(item["angle"] * 57.29578)} {x + item["w"] / 2} {y + item["h"] / 2})"'
            if "angle" in item
            else ""
        )
        motion = ""
        if "wipe" in item:
            if not moving:
                return ""
            start, end = item["wipe"]
            times = [0,start,end,8.6,9.3,10]
            motion = animate("x",times,[x,x,x+item["w"],x+item["w"],x,x]) + animate("width",times,[item["w"],item["w"],0,0,item["w"],item["w"]])
        tag = f'<rect x="{x}" y="{y}" width="{item["w"]}" height="{item["h"]}" rx="{item["r"]}" fill="{item["color"]}"{rotation}>{motion}</rect>'
    start = item["start"]
    if moving and start:
        return (
            "<g>"
            + animate(
                "opacity", [0, start, start + 0.32, 8.18, 8.58, 10], [0, 0, 1, 1, 0, 0]
            )
            + tag
            + "</g>"
        )
    return tag


def svg(scene, moving):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">'
        + "".join(draw(i, moving) for i in scene.layers)
        + "</svg>"
    )


def gallery(directory):
    directory.mkdir(parents=True, exist_ok=True)
    options = "".join(
        f'<option value="{n}">{SCENES[n][0]} · {SCENES[n][1]}</option>' for n in SCENES
    )
    scenes = "".join(
        f'<template id="s{n}">{svg(build(n), True)}</template>' for n in SCENES
    )
    (
        directory / "index.html"
    ).write_text(f"""<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Innflow feature loops</title><style>body{{font:16px system-ui;background:#f7f7f6;margin:2rem auto;max-width:680px;padding:0 1rem}}select,button{{font:inherit;padding:6px;margin-right:6px}}svg{{width:min(100%,640px);display:block}}</style>
<label>Preview <select>{options}</select></label><button id="pause">Pause</button><button id="replay">Replay</button><main></main>{scenes}
<script>const select=document.querySelector('select'),main=document.querySelector('main');function show(){{main.replaceChildren(document.querySelector('#s'+select.value).content.cloneNode(true));main.firstChild.setCurrentTime(0);pause.textContent='Pause'}}select.onchange=show;pause.onclick=()=>{{const s=main.firstChild;if(s.animationsPaused()){{s.unpauseAnimations();pause.textContent='Pause'}}else{{s.pauseAnimations();pause.textContent='Play'}}}};replay.onclick=show;show()</script>""")


if __name__ == "__main__":
    gallery(Path(sys.argv[1]))
