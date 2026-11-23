import subprocess
import re

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
cmd = [
    chrome_path,
    "--headless=new",
    "--dump-dom",
    "https://maps.google.com/?q=12.9002701,77.6454546"
]
res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
dom = res.stdout
print("DOM length:", len(dom))

# Find aria-labels or text content
labels = re.findall(r'aria-label="([^"]+)"', dom)
for label in labels:
    if any(k in label.lower() for k in ['bengaluru', 'bangalore', 'hosapalaya', 'karnataka', '560', 'hsr', 'road', 'street', 'main', 'cross', 'pin']):
        print("Aria-label:", label)

# Find heading or title elements
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', dom, re.DOTALL)
for h1 in h1s:
    clean = re.sub(r'<[^>]+>', '', h1).strip()
    if clean:
        print("H1:", clean)

h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', dom, re.DOTALL)
for h2 in h2s:
    clean = re.sub(r'<[^>]+>', '', h2).strip()
    if clean:
        print("H2:", clean)

idx = dom.find("WJ2W+454")
if idx != -1:
    print("Context around Plus Code:")
    sub = dom[max(0, idx-600):idx+600]
    # strip tags
    clean = re.sub(r'<[^>]+>', ' ', sub)
    clean = ' '.join(clean.split())
    print(clean)

# Find all buttons
for b in re.findall(r'<button[^>]*aria-label="([^"]+)"', dom):
    if any(k in b.lower() for k in ['address', 'copy', 'bengaluru', 'road', 'karnataka']):
        print("Button aria-label:", b)

