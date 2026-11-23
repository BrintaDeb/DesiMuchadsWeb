with open("src/data/projectsData.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'slug: "snacknation-makhanas"' in l or 'slug: "ganesha-cyber-mandala"' in l:
        print("".join(lines[max(0, i-2):min(len(lines), i+15)]))
