import re

with open('src/data/projectsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

targets = [
    'snacknation', 'bharat-bio', 'sobha', 'chaichaska', 'streetheads', 'lionelp',
    'ganesha', 'samurai', 'neo-tokyo', 'varanasi', 'vedaroots', 'urbandrift'
]

# Find all projects
projects = re.findall(r'id:\s*["\']([^"\']+)["\'],[\s\S]*?client:\s*["\']([^"\']+)["\'],[\s\S]*?category:\s*["\']([^"\']+)["\'],[\s\S]*?liveUrl:\s*["\']([^"\']+)["\'],[\s\S]*?thumbnail:\s*["\']([^"\']+)["\']', content)

print(f"Total projects found: {len(projects)}")
for p_id, client, category, liveUrl, thumb in projects:
    for t in targets:
        if t in p_id.lower() or t in client.lower():
            print(f"{client:32s} | ID: {p_id:25s} | LiveUrl: {liveUrl:35s} | Thumb: {thumb}")
