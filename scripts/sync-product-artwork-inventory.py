"""Copy the reviewed CSV's stable asset/placement identities into the website.

Run from the repository root after reviewing inventory changes. Scene compositions
are authored separately in src/content/product-artwork-scenes.ts.
"""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'outputs/product-asset-inventory-2026-09-27/product-assets.csv'
rows = list(csv.DictReader(SOURCE.open(encoding='utf-8-sig', newline='')))
assets = {}
pages = {}
for row in rows:
    asset_id = row['Asset ID']
    assets.setdefault(asset_id, {
        'id': asset_id,
        'name': row['Asset name'],
        'brief': row['Recommended artwork'],
        'action': row['Action'],
    })
    page = pages.setdefault(row['Page path'], {
        'name': row['Page'], 'style': row['Design style'].lower(),
        'hero': None, 'overview': None, 'capability': None,
        'cards': [], 'details': {}, 'related': {},
    })
    placement = {'id': row['Placement ID'], 'assetId': asset_id}
    section = row['Section']
    if section == 'Hero background': page['hero'] = placement
    elif section == 'Product overview': page['overview'] = placement
    elif section == 'Capability overview': page['capability'] = placement
    elif section == 'Feature card': page['cards'].append(placement)
    elif section == 'Feature detail':
        page['details'][row['Page reference'].split('#', 1)[1]] = placement
    elif section == 'Related product thumbnail':
        page['related'][row['Section title']] = placement
    else: raise ValueError(f'Unknown artwork placement: {section}')

dest = ROOT / 'src/content/product-artwork-inventory.json'
dest.write_text(json.dumps({'assets': assets, 'pages': pages}, indent=2) + '\n')
print(f'{len(assets)} assets, {len(rows)} placements, {len(pages)} pages -> {dest}')
