#!/usr/bin/env python3
"""Match Framer product images to the authoritative Dropbox asset archive."""

from __future__ import annotations

import argparse
import io
import json
import ssl
import urllib.request
from pathlib import Path

import certifi
import numpy as np
from PIL import Image, ImageOps


ASSET_ROOT = Path(
    "/Users/ak/Library/CloudStorage/Dropbox/beam_ai_assets"
)
PRODUCT_FOLDERS = {
    "platform": "Agentic_Platform",
    "agent-os": "Agent OS _ Beam AI",
    "ai-agents": "AI Agents for Agentic Automation _ Beam AI",
    "agentic-workflows": (
        "Agentic Workflows_ Definition, Tools & Platform _ Beam AI"
    ),
    "databases": "Databases _ Beam AI",
}
SUPPORTED_SUFFIXES = {".png", ".webp", ".jpg", ".jpeg", ".avif"}


def fingerprint(image: Image.Image, size: int = 48) -> np.ndarray:
    image = ImageOps.exif_transpose(image).convert("RGBA")
    background = Image.new("RGBA", image.size, "white")
    background.alpha_composite(image)
    rgb = background.convert("RGB")
    contained = ImageOps.contain(rgb, (size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (size, size), "white")
    canvas.paste(
        contained,
        ((size - contained.width) // 2, (size - contained.height) // 2),
    )
    return np.asarray(canvas, dtype=np.float32) / 255.0


def image_refs(product: dict) -> list[dict]:
    refs: list[dict] = []

    def add(role: str, value: dict | None) -> None:
        if value and value.get("src"):
            refs.append({"role": role, **value})

    add("hero", product.get("hero", {}).get("image"))
    add("seo", product.get("seo", {}).get("socialImage"))
    for card in product.get("spiral", []):
        add(f"spiral:{card['slot']}", card.get("image"))
    for card in product.get("mosaic", []):
        add(f"mosaic:{card['slot']}", card.get("image"))
    for index, section in enumerate(product.get("details", []), start=1):
        add(f"detail:{index}", section.get("image"))

    unique: dict[str, dict] = {}
    for ref in refs:
        unique.setdefault(ref["src"], ref)
    return list(unique.values())


def remote_fingerprint(url: str) -> np.ndarray:
    request = urllib.request.Request(url, headers={"User-Agent": "InnflowAssetMapper/1.0"})
    context = ssl.create_default_context(cafile=certifi.where())
    with urllib.request.urlopen(request, timeout=30, context=context) as response:
        return fingerprint(Image.open(io.BytesIO(response.read())))


def local_fingerprints(folder: Path) -> list[tuple[Path, np.ndarray]]:
    results = []
    for path in sorted(folder.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in SUPPORTED_SUFFIXES:
            continue
        try:
            with Image.open(path) as image:
                results.append((path, fingerprint(image)))
        except (OSError, ValueError):
            continue
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input",
        default="scripts/data/product-pages-framer.json",
        type=Path,
    )
    parser.add_argument("--output", type=Path)
    parser.add_argument("--threshold", type=float, default=0.12)
    args = parser.parse_args()

    products = json.loads(args.input.read_text())
    output: dict[str, list[dict]] = {}

    for product in products:
        slug = product["slug"]
        candidates = local_fingerprints(ASSET_ROOT / PRODUCT_FOLDERS[slug])
        matches = []
        for ref in image_refs(product):
            target = remote_fingerprint(ref["src"])
            ranked = sorted(
                (
                    (float(np.mean(np.abs(target - candidate))), path)
                    for path, candidate in candidates
                ),
                key=lambda item: item[0],
            )
            score, path = ranked[0]
            matches.append(
                {
                    **ref,
                    "localPath": (
                        str(path.relative_to(ASSET_ROOT))
                        if score <= args.threshold
                        else None
                    ),
                    "score": round(score, 5),
                    "closestPath": str(path.relative_to(ASSET_ROOT)),
                }
            )
        output[slug] = matches

    encoded = json.dumps(output, indent=2)
    if args.output:
        args.output.write_text(f"{encoded}\n")
    else:
        print(encoded)


if __name__ == "__main__":
    main()
