import re

with open("src/data/demoProductsData.ts", "r", encoding="utf-8") as f:
    text = f.read()

# find keys in DEMO_PROJECTS_DATABASE
keys = re.findall(r'"([a-z0-9-]+)":\s*\{', text)
print("Keys found in demoProductsData:", keys)
