import re

with open("src/data/projectsData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replacements for thumbnails and liveUrls
replacements = [
    # SnackNation Makhanas (id 37)
    (
        r'(id:\s*37,\s*slug:\s*"snacknation-makhanas",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/snacknation-hero.jpg\g<2>'
    ),
    # Bharat Bio-Health (id 38)
    (
        r'(id:\s*38,\s*slug:\s*"bharat-bio-health",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/bharat-biohealth-hero.jpg\g<2>'
    ),
    # Sobha Heritage Villas (id 39)
    (
        r'(id:\s*39,\s*slug:\s*"sobha-heritage-villas",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/sobha-heritage-villas-hero.jpg\g<2>'
    ),
    # ChaiChaska CTC (id 40)
    (
        r'(id:\s*40,\s*slug:\s*"chaichaska-ctc",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/chaichaska-tea-hero.jpg\g<2>'
    ),
    # StreeThreads Handloom (id 41)
    (
        r'(id:\s*41,\s*slug:\s*"streethreads-handloom",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/streetthreads-handloom-hero.jpg\g<2>'
    ),
    # LionelP Restaurant (id 42)
    (
        r'(id:\s*42,\s*slug:\s*"lionelp-restaurant",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/lionelp-restaurant-hero.jpg\g<2>'
    ),
    # VedaRoots Ayurveda (id 35)
    (
        r'(id:\s*35,\s*slug:\s*"vedaroots-ayurveda",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/vedaroots-ayurveda-hero.jpg\g<2>'
    ),
    # UrbanDrift EV (id 36)
    (
        r'(id:\s*36,\s*slug:\s*"urbandrift-ev",.*?"thumbnail":\s*")[^"]+(")',
        r'\g<1>/projects/urbandrift-ev-hero.jpg\g<2>'
    ),
    # Ganesha Cyber-Mandala (id 31) liveUrl -> /demos/ganesha-cyber-mandala
    (
        r'(id:\s*31,\s*slug:\s*"ganesha-cyber-mandala",.*?"liveUrl":\s*")[^"]+(")',
        r'\g<1>/demos/ganesha-cyber-mandala\g<2>'
    ),
    # Samurai Ronin Ink Sketch (id 32) liveUrl -> /demos/samurai-ronin-ink-sketch
    (
        r'(id:\s*32,\s*slug:\s*"samurai-ronin-ink-sketch",.*?"liveUrl":\s*")[^"]+(")',
        r'\g<1>/demos/samurai-ronin-ink-sketch\g<2>'
    ),
    # Neo-Tokyo Street Food Hawker (id 33) liveUrl -> /demos/neotokyo-street-food-hawker
    (
        r'(id:\s*33,\s*slug:\s*"neotokyo-street-food-hawker",.*?"liveUrl":\s*")[^"]+(")',
        r'\g<1>/demos/neotokyo-street-food-hawker\g<2>'
    ),
    # Varanasi Dawn Ghats (id 34) liveUrl -> /demos/varanasi-ghats-heritage-matte
    (
        r'(id:\s*34,\s*slug:\s*"varanasi-ghats-heritage-matte",.*?"liveUrl":\s*")[^"]+(")',
        r'\g<1>/demos/varanasi-ghats-heritage-matte\g<2>'
    )
]

for pat, repl in replacements:
    new_content, count = re.subn(pat, repl, content, flags=re.DOTALL)
    if count > 0:
        content = new_content
        print(f"Applied replacement for {pat[:30]}... (count: {count})")
    else:
        print(f"FAILED to match: {pat[:40]}")

with open("src/data/projectsData.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated src/data/projectsData.ts successfully.")
