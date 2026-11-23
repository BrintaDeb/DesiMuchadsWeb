import re

target_slugs = [
    "snacknation-makhanas",
    "bharat-bio-health",
    "sobha-heritage-villas",
    "chaichaska-ctc",
    "chaichaska-premium-tea",
    "streethreads-handloom",
    "streetthreads-handloom",
    "lionelp-restaurant",
    "ganesha-cyber-mandala",
    "lord-ganesha-cyber-mandala",
    "samurai-ronin-ink-sketch",
    "neotokyo-street-food-hawker",
    "varanasi-ghats-heritage-matte",
    "vedaroots-ayurveda",
    "urbandrift-ev"
]

with open("src/data/projectsData.ts", "r", encoding="utf-8") as f:
    text = f.read()

for slug in target_slugs:
    idx = text.find(f'"{slug}"')
    if idx != -1:
        # print snippet around it
        start = max(0, idx - 100)
        end = min(len(text), idx + 800)
        print("="*60)
        print(f"FOUND: {slug}")
        print(text[start:end])
        print("="*60)
    else:
        print(f"NOT FOUND: {slug}")
