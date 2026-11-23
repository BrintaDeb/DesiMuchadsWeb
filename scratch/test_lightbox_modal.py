import subprocess
import time
import json
import urllib.request
import urllib.error
import base64
import os

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9222
ARTIFACT_DIR = r"c:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb"

def run_test():
    # Start Chrome in headless mode with remote debugging
    cmd = [
        CHROME_PATH,
        "--headless=new",
        f"--remote-debugging-port={PORT}",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=1440,900"
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2)

    try:
        # Get list of targets
        req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list")
        targets = json.loads(req.read().decode())
        ws_url = targets[0]["webSocketDebuggerUrl"]

        import asyncio
        import websockets

        async def cdp_session():
            async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
                msg_id = 1
                async def send(method, params=None):
                    nonlocal msg_id
                    cur_id = msg_id
                    msg_id += 1
                    payload = {"id": cur_id, "method": method}
                    if params:
                        payload["params"] = params
                    await ws.send(json.dumps(payload))
                    while True:
                        res = await ws.recv()
                        data = json.loads(res)
                        if data.get("id") == cur_id:
                            return data.get("result", {})

                await send("Page.enable")
                await send("Runtime.enable")
                await send("DOM.enable")

                print("Navigating to http://localhost:3000/work...")
                await send("Page.navigate", {"url": "http://localhost:3000/work"})
                await asyncio.sleep(3)

                # Find the Lakeview Bakes card and click it
                click_eval = """
                (() => {
                    const cards = Array.from(document.querySelectorAll('h3, h4, span, div'));
                    const lakeviewEl = cards.find(el => el.textContent && el.textContent.includes('Lakeview Milk Bar'));
                    if (lakeviewEl) {
                        const clickable = lakeviewEl.closest('button') || lakeviewEl.closest('a') || lakeviewEl.closest('[role="button"]') || lakeviewEl;
                        clickable.click();
                        return "Clicked Lakeview element: " + lakeviewEl.textContent;
                    }
                    return "Lakeview element not found";
                })()
                """
                res = await send("Runtime.evaluate", {"expression": click_eval})
                print("Click result:", res.get("result", {}).get("value"))
                await asyncio.sleep(3)

                # Capture desktop screenshot
                shot = await send("Page.captureScreenshot", {"format": "png"})
                img_data = base64.b64decode(shot["data"])
                desktop_path = os.path.join(ARTIFACT_DIR, "lakeview_lightbox_desktop.png")
                with open(desktop_path, "wb") as f:
                    f.write(img_data)
                print(f"Saved desktop screenshot: {desktop_path} ({len(img_data)} bytes)")

                # Now switch to mobile view in the lightbox
                mobile_toggle_eval = """
                (() => {
                    const buttons = Array.from(document.querySelectorAll('button'));
                    const mobileBtn = buttons.find(b => b.title && b.title.includes('Mobile') || b.textContent && b.textContent.includes('Mobile'));
                    if (mobileBtn) {
                        mobileBtn.click();
                        return "Clicked Mobile View toggle";
                    }
                    return "Mobile toggle not found";
                })()
                """
                res = await send("Runtime.evaluate", {"expression": mobile_toggle_eval})
                print("Mobile toggle result:", res.get("result", {}).get("value"))
                await asyncio.sleep(2)

                shot_mobile = await send("Page.captureScreenshot", {"format": "png"})
                img_data_mobile = base64.b64decode(shot_mobile["data"])
                mobile_path = os.path.join(ARTIFACT_DIR, "lakeview_lightbox_mobile_frame.png")
                with open(mobile_path, "wb") as f:
                    f.write(img_data_mobile)
                print(f"Saved mobile screenshot: {mobile_path} ({len(img_data_mobile)} bytes)")

        asyncio.run(cdp_session())
    finally:
        proc.terminate()
        proc.wait()

if __name__ == "__main__":
    run_test()
