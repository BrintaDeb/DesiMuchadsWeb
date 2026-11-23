import re
import json

with open("src/data/projectsData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# find all objects with id, slug, client, liveUrl, thumbnail
matches = re.findall(r'id:\s*(\d+),\s*slug:\s*"([^"]+)",\s*client:\s*"([^"]+)",(?:.*?liveUrl:\s*"([^"]+)",)?(?:.*?thumbnail:\s*"([^"]+)",)?', content, re.DOTALL)
print(f"Total regex matches: {len(matches)}")
for m in matches:
    print(f"ID {m[0]}: {m[1]} | {m[2]} | LiveUrl: {m[3]} | Thumb: {m[4]}")
