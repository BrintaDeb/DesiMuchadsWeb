import urllib.request
import subprocess
import time

# 1. HTML verification
contact_html = urllib.request.urlopen("http://localhost:3000/contact").read().decode("utf-8")
home_html = urllib.request.urlopen("http://localhost:3000").read().decode("utf-8")

print("--- Contact Page Verification ---")
print("Has new maps link qNmRs1e5AeqprpuL8:", "qNmRs1e5AeqprpuL8" in contact_html)
print("Has coordinates in map iframe:", "12.9002701" in contact_html)
print("Has Hosapalaya:", "Hosapalaya" in contact_html)
print("Has B&W square logo in concierge:", "desi-muchads-square-logo.png" in contact_html)
print("Old Splendid Royale absent:", "Splendid Royale" not in contact_html)
print("Old link k4LoVj2pqinVFZsA8 absent:", "k4LoVj2pqinVFZsA8" not in contact_html)

print("\n--- Home Page Verification ---")
print("Has new maps link in footer:", "qNmRs1e5AeqprpuL8" in home_html)
print("Has coordinates in footer map:", "12.9002701" in home_html)
print("Has Hosapalaya in footer:", "Hosapalaya" in home_html)
print("Old Splendid Royale absent in footer:", "Splendid Royale" not in home_html)

# 2. Capture verification screenshots
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb"

# Screenshot of contact page
contact_shot = f"{artifact_dir}\\verify_contact_hq_and_concierge.png"
subprocess.run([
    chrome_path,
    "--headless=new",
    f"--screenshot={contact_shot}",
    "--window-size=1440,2200",
    "http://localhost:3000/contact"
], check=True)
print(f"Captured contact screenshot: {contact_shot}")

# Screenshot of footer map on home page
footer_shot = f"{artifact_dir}\\verify_footer_map_hq.png"
subprocess.run([
    chrome_path,
    "--headless=new",
    f"--screenshot={footer_shot}",
    "--window-size=1440,1200",
    "http://localhost:3000#footer"
], check=True)
print(f"Captured footer screenshot: {footer_shot}")
