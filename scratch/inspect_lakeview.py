import urllib.request
import re

url = "https://lakeview-bakes.vercel.app/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as response:
        html = response.read().decode('utf-8', errors='ignore')
        title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
        print("Page Title:", title.group(1) if title else "No title")
        # print some clean text
        text = re.sub(r'<script.*?</script>', '', html, flags=re.DOTALL)
        text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL)
        text = re.sub(r'<[^>]+>', ' ', text)
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        print("Text snippet:")
        print("\n".join(lines[:30]))
except Exception as e:
    print("Error fetching:", e)
