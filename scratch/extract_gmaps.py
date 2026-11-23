import subprocess
import re

cmd = ["curl.exe", "-sL", "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "https://maps.google.com/maps?q=12.9002701,77.6454546"]
res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
content = res.stdout
print("Content length:", len(content))

for p in [r'<title>(.*?)</title>', r'property="og:title" content="(.*?)"', r'property="og:description" content="(.*?)"', r'name="description" content="(.*?)"']:
    m = re.search(p, content)
    if m:
        print(p, "->", m.group(1))

for line in content.split('\n'):
    if '12.9002' in line or '77.6454' in line:
        print("Found line with coords:", line[:300])

# Search for Plus Code or pin details
plus_code = re.findall(r'[2-9CFGHJMPQRVWX]{4}\+[2-9CFGHJMPQRVWX]{2,}', content)
if plus_code:
    print("Plus code:", plus_code[:5])

# Search for window.APP_INITIALIZATION_STATE
init_state = re.search(r'window\.APP_INITIALIZATION_STATE\s*=\s*(.*?);window', content)
if init_state:
    print("Found APP_INITIALIZATION_STATE, len:", len(init_state.group(1)))
    # find all strings inside APP_INITIALIZATION_STATE that look like roads or addresses
    strings = re.findall(r'\"([^\"]{5,80})\"', init_state.group(1))
    for s in strings:
        if any(w in s.lower() for w in ['road', 'rd', 'nagar', 'layout', 'palya', 'bengaluru', 'bangalore', 'floor', 'block', 'main', 'cross', 'karnataka', '560']):
            print("Address piece:", s)

