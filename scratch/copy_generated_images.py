import os
import shutil
import glob

brain_dir = r"C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb"
dest_dir = r"c:\Users\Shreyam\Downloads\DesiMuchads\public\projects"

mapping = {
    "snacknation_makhana_hero": "snacknation-hero.jpg",
    "bharat_biohealth_hero": "bharat-biohealth-hero.jpg",
    "sobha_heritage_villas_hero": "sobha-heritage-villas-hero.jpg",
    "chaichaska_tea_hero": "chaichaska-tea-hero.jpg",
    "streetthreads_handloom_hero": "streetthreads-handloom-hero.jpg",
    "lionelp_restaurant_hero": "lionelp-restaurant-hero.jpg",
    "vedaroots_ayurveda_hero": "vedaroots-ayurveda-hero.jpg",
    "urbandrift_ev_hero": "urbandrift-ev-hero.jpg",
}

copied = {}
for prefix, target in mapping.items():
    pattern = os.path.join(brain_dir, f"{prefix}*.jpg")
    files = glob.glob(pattern)
    if files:
        latest = max(files, key=os.path.getmtime)
        dest_path = os.path.join(dest_dir, target)
        shutil.copy2(latest, dest_path)
        copied[target] = dest_path
        print(f"Copied {os.path.basename(latest)} -> {target} ({os.path.getsize(dest_path)} bytes)")
    else:
        print(f"Waiting for {prefix}...")

print(f"\nTotal copied: {len(copied)} / {len(mapping)}")
