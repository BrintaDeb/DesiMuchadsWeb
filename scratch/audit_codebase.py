import os, re, glob

print('=== 1. VERIFYING ALL IMAGE ASSET REFERENCES IN CODE ===')
src_files = glob.glob('src/**/*.ts*', recursive=True)

img_pattern = re.compile(r"""(?:src|href|url|thumbnail|image|banner|poster|icon)\s*[:=]\s*["'`](/[^"'`\s]+?\.(?:png|jpg|jpeg|webp|svg|ico|gif|mp4|webm))["'`]""", re.IGNORECASE)

missing_assets = set()
used_assets = set()

for sf in src_files:
    with open(sf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        matches = img_pattern.findall(content)
        for m in matches:
            if m.startswith('http'): continue
            clean_path = m.split('?')[0].split('#')[0]
            used_assets.add(clean_path)
            local_path = os.path.join('public', clean_path.lstrip('/'))
            if not os.path.exists(local_path):
                missing_assets.add((clean_path, sf))

print(f'Total referenced media paths found: {len(used_assets)}')
if missing_assets:
    print(f'MISSING ASSETS ({len(missing_assets)}):')
    for ma, sf in sorted(missing_assets):
        print(f'  {ma} (in {sf})')
else:
    print('ALL referenced media files exist in public/!')

print('\n=== 2. SCANNING PUBLIC/ FOR UNREFERENCED / REDUNDANT FILES ===')
public_files = []
for root, dirs, files in os.walk('public'):
    for file in files:
        rel = os.path.relpath(os.path.join(root, file), 'public').replace('\\', '/')
        public_files.append('/' + rel)

print(f'Total files in public/: {len(public_files)}')

all_code = ''
for sf in src_files:
    with open(sf, 'r', encoding='utf-8', errors='ignore') as f:
        all_code += f.read()

# Also check manifest and layout
with open('public/sw.js', 'r', encoding='utf-8', errors='ignore') as f:
    all_code += f.read()

unreferenced = []
for pf in public_files:
    basename = os.path.basename(pf)
    if pf not in all_code and basename not in all_code:
        unreferenced.append(pf)

print(f'Potentially unreferenced files ({len(unreferenced)}):')
for u in sorted(unreferenced)[:50]:
    print(' ', u)
if len(unreferenced) > 50:
    print(f'  ... and {len(unreferenced)-50} more')
