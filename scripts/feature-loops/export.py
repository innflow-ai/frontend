"""Build standalone, transparent Rive feature scenes from their editable scene descriptions.

Run with Python 3 from the website root.
The exporter uses Rive v7's native artboard, text, parametric shape and animation objects.
"""

from pathlib import Path
import hashlib
import json
import struct
import xml.etree.ElementTree as ET

from scenes import SCENES, build, DURATION, POINTER_SHAPE
from preview import svg

DEST = Path("public/brand/homepage/feature-loops")
MANIFEST = Path("src/app/preview/scroll-showcase/homepage-storyboards.json")


def uint(n):
    data = bytearray()
    while n >= 128:
        data.append(n % 128 + 128)
        n //= 128
    data.append(n)
    return bytes(data)


def encode(value):
    if isinstance(value, int):
        return uint(value)
    if isinstance(value, float):
        return struct.pack("<f", value)
    if isinstance(value, str):
        value = value.encode()
    return uint(len(value)) + value


def record(kind, properties=None):
    return (
        uint(kind)
        + b"".join(
            uint(key) + encode(value) for key, value in (properties or {}).items()
        )
        + b"\0"
    )


def font_asset(weight):
    font = Path(__file__).parent / "fonts" / f"Geist-{weight}.ttf"
    return record(141, {203: f"Geist {weight}"}) + record(106, {212: font.read_bytes()})


class Artboard:
    def __init__(self, title):
        self.objects = [record(1, {4: title, 7: 640.0, 8: 640.0, 11: 0.0, 12: 0.0})]
        self.tracks = {}
        self.source = ET.Element("Rive", version="1", kind="fragment")
        self.artboard = ET.SubElement(
            self.source,
            "Artboard",
            id="0:10",
            name=title,
            width="640",
            height="640",
            defaultStateMachineId="0:3",
        )
        self.elements = [self.artboard]
        for index, weight in enumerate((400, 600), 1):
            ET.SubElement(
                self.source,
                "FontAsset",
                id=f"0:{index}",
                name=f"Geist {weight}",
                file=f"../fonts/Geist-{weight}.ttf",
            )

    def add(self, kind, props):
        tags = {
            2: "Node",
            3: "Shape",
            7: "Rectangle",
            20: "Fill",
            134: "Text",
            137: "TextStylePaint",
            135: "TextValueRun",
            16: "PointsPath",
            5: "StraightVertex",
        }
        keys = {
            4: "name",
            13: "x",
            14: "y",
            15: "rotation",
            16: "scaleX",
            17: "scaleY",
            20: "width",
            21: "height",
            31: "cornerRadiusTL",
            274: "fontSize",
            279: "fontAssetId",
            268: "text",
            272: "styleId",
            24: "x",
            25: "y",
        }
        index = len(self.objects)
        attributes = {keys[k]: str(v) for k, v in props.items() if k != 5}
        if 279 in props:
            attributes["fontAssetId"] = f"0:{props[279] + 1}"
        if 272 in props:
            attributes["styleId"] = f"0:{props[272] + 10}"
        self.elements.append(
            ET.SubElement(
                self.elements[props[5]],
                tags[kind],
                attrib=attributes,
                id=f"0:{index + 10}",
            )
        )
        self.objects.append(record(kind, props))
        return index

    def fill(self, parent, color):
        fill = self.add(20, {5: parent})
        self.elements.append(
            ET.SubElement(
                self.elements[fill], "SolidColor", colorValue="FF" + color[1:]
            )
        )
        # Colors are fixed-width little-endian ARGB values.
        self.objects.append(
            uint(18)
            + uint(5)
            + uint(fill)
            + uint(37)
            + struct.pack("<I", 0xFF000000 | int(color[1:], 16))
            + b"\0"
        )

    def track(self, index, prop, keys):
        self.tracks.setdefault(index, {})[prop] = keys

    def rect(self, layer, parent):
        x, y, w, h = [layer[k] for k in ("x", "y", "w", "h")]
        shape = self.add(
            3,
            {
                4: layer["group"],
                5: parent,
                13: float(x + w / 2),
                14: float(y + h / 2),
                15: float(layer.get("angle", 0)),
            },
        )
        path = self.add(
            7, {5: shape, 20: float(w), 21: float(h), 31: float(layer["r"])}
        )
        self.fill(shape, layer["color"])
        if "wipe" in layer:
            start, end = layer["wipe"]
            times = [0, start, end, 8.6, 9.3, DURATION]
            widths = [w, w, 0, 0, w, w]
            self.track(path, 20, zip(times, widths))
            self.track(shape, 13, zip(times, [x + w - width / 2 for width in widths]))
        if "opening" in layer:
            heights = [layer["opening"]] * 2 + [h, h] + [layer["opening"]] * 2
            times = [0, 1, 1.68, 8.62, 9.32, DURATION]
            self.track(path, 21, zip(times, heights))
            self.track(shape, 14, zip(times, [y + height / 2 for height in heights]))

    def text(self, layer, parent):
        content, size = layer["value"], layer["size"]
        text = self.add(
            134, {4: content, 5: parent, 13: float(layer["x"]), 14: float(layer["y"])}
        )
        style = self.add(
            137, {4: "Type", 5: text, 274: float(size), 279: int(layer["bold"])}
        )
        self.fill(style, layer["color"])
        self.add(135, {4: "Copy", 5: text, 268: content, 272: style})

    def cursor(self, layer, parent):
        positions = layer["positions"]
        pointer = self.add(2, {4: "Cursor position", 5: parent})
        self.track(pointer, 13, [(t, x) for t, x, _ in positions])
        self.track(pointer, 14, [(t, y) for t, _, y in positions])
        self.track(
            pointer,
            18,
            [(0, 0), (1.55, 0), (1.85, 1), (4.8, 1), (5.15, 0), (DURATION, 0)],
        )
        for name, scale, offset, color in [
            ("Arrow", 1, 0, "#363B40"),
            ("Outline", 1.17, -1.5, "#FFFFFF"),
        ]:
            shape = self.add(
                3,
                {
                    4: name,
                    5: pointer,
                    13: float(offset),
                    14: float(offset),
                    16: float(scale),
                    17: float(scale),
                },
            )
            path = self.add(16, {5: shape})
            for x, y in POINTER_SHAPE:
                self.add(5, {5: path, 24: float(x), 25: float(y)})
            self.fill(shape, color)

    def compile(self, scene, fonts):
        # Rive draws earlier sibling drawables in front. Authoring order is back to front.
        last_group = None
        for layer in reversed(scene.layers):
            group = layer["group"]
            if group != last_group:
                parent = self.add(2, {4: group, 5: 0})
                last_group = group
                start = layer["start"]
                if start:
                    self.track(
                        parent,
                        18,
                        [
                            (0, 0),
                            (start, 0),
                            (start + 0.32, 1),
                            (8.18, 1),
                            (8.58, 0),
                            (DURATION, 0),
                        ],
                    )
            if layer["kind"] == "cursor":
                self.cursor(layer, parent)
            elif layer["kind"] == "text":
                self.text(layer, parent)
            else:
                self.rect(layer, parent)
        timeline = record(31, {55: "Demonstration", 56: 60, 57: DURATION * 60, 59: 1})
        clip = ET.SubElement(
            self.artboard,
            "LinearAnimation",
            id="0:4",
            name="Demonstration",
            fps="60",
            duration=str(DURATION * 60),
            loopValue="1",
        )
        for index, props in self.tracks.items():
            target = ET.SubElement(clip, "KeyedObject", objectId=f"0:{index + 10}")
            timeline += record(25, {51: index})
            for prop, keys in props.items():
                property_node = ET.SubElement(
                    target, "KeyedProperty", propertyKey=str(prop)
                )
                timeline += record(26, {53: prop})
                for t, value in keys:
                    ET.SubElement(
                        property_node,
                        "KeyFrameDouble",
                        frame=str(round(t * 60)),
                        value=str(value),
                        interpolationType="1",
                    )
                    timeline += record(30, {67: round(t * 60), 68: 1, 70: float(value)})
        machine = (
            record(53, {55: "Playback"})
            + record(57)
            + record(63)
            + record(65, {151: 1})
            + record(61, {149: 0})
            + record(62)
            + record(64)
        )
        controller = ET.SubElement(
            self.artboard, "StateMachine", id="0:3", name="Playback"
        )
        layer = ET.SubElement(controller, "StateMachineLayer", name="Default")
        entry = ET.SubElement(layer, "EntryState")
        ET.SubElement(entry, "StateTransition", stateToId="0:6")
        ET.SubElement(layer, "AnimationState", id="0:6", animationId="0:4")
        ET.SubElement(layer, "AnyState")
        ET.SubElement(layer, "ExitState")
        return (
            b"RIVE\x07\x00\x00\x00"
            + record(23)
            + fonts
            + b"".join(self.objects)
            + timeline
            + machine
        )


def main():
    import argparse
    from shutil import copytree

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--editable", type=Path, help="Also write editable Rive CLI projects here"
    )
    editable = parser.parse_args().editable
    if editable:
        copytree(
            Path(__file__).parent / "fonts", editable / "fonts", dirs_exist_ok=True
        )
    DEST.mkdir(parents=True, exist_ok=True)
    fonts = font_asset(400) + font_asset(600)
    rows = json.loads(MANIFEST.read_text())
    for row in rows:
        if row.get("status") == "lottie":
            continue
        scene = build(row["number"])
        stem = row["title"].lower().replace(" ", "-")
        artboard = Artboard(row["title"])
        data = artboard.compile(scene, fonts)
        if editable:
            project = editable / stem
            project.mkdir(exist_ok=True)
            (project / "rive.yaml").write_text(f"name: {stem}\n")
            ET.indent(artboard.source)
            ET.ElementTree(artboard.source).write(
                project / "scene.rml", encoding="utf-8"
            )
            (project / f"{stem}.riv").write_bytes(data)
        (DEST / f"{stem}.riv").write_bytes(data)
        (DEST / f"{stem}.svg").write_text(svg(scene, False))
        for outdated in ("sourceUrl", "figmaNode"):
            row.pop(outdated, None)
        base = "/brand/homepage/feature-loops/" + stem
        row.update(
            src=base + ".riv",
            poster=base + ".svg",
            artboard=row["title"],
            animation="Demonstration",
            stateMachine="Playback",
            duration=DURATION,
            status="rive",
            bytes=len(data),
            sha256=hashlib.sha256(data).hexdigest(),
        )
    MANIFEST.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
