import urllib.request
import re

url = "https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req) as resp:
        final_url = resp.geturl()
        print("Final URL:", final_url)
        content = resp.read().decode("utf-8", errors="ignore")
        title = re.search(r"<title>(.*?)</title>", content)
        if title:
            print("Title:", title.group(1))
        coords = re.findall(r"@(-?\d+\.\d+),(-?\d+\.\d+)", final_url)
        if coords:
            print("Coordinates in URL:", coords)
        # Search for place details or addresses in content
        og_title = re.search(r'property="og:title" content="(.*?)"', content)
        if og_title:
            print("OG Title:", og_title.group(1))
        og_desc = re.search(r'property="og:description" content="(.*?)"', content)
        if og_desc:
            print("OG Description:", og_desc.group(1))
        meta_desc = re.search(r'name="description" content="(.*?)"', content)
        if meta_desc:
            print("Meta Description:", meta_desc.group(1))
        # Look for full address or coordinates patterns in the script tags
        all_coords = re.findall(r'\[\s*(-?\d+\.\d{5,})\s*,\s*(-?\d+\.\d{5,})\s*\]', content)
        if all_coords:
            print("Coords in content array:", all_coords[:5])
except Exception as e:
    print("Error:", e)
