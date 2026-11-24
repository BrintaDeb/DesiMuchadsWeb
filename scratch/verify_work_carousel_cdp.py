import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_cdp_work_carousel')
os.makedirs(temp_dir, exist_ok=True)

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9228',
    f'--user-data-dir={temp_dir}',
    'about:blank'
])
time.sleep(2.5)

ARTIFACT_DIR = r"C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb"

async def send_cmd(ws, msg_id, method, params=None):
    payload = {'id': msg_id, 'method': method}
    if params:
        payload['params'] = params
    await ws.send(json.dumps(payload))
    while True:
        raw = await ws.recv()
        data = json.loads(raw)
        if data.get('id') == msg_id:
            return data

async def run():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9228/json')
        tabs = json.loads(res.read())
        ws_url = tabs[0]['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url, max_size=30*1024*1024) as ws:
            await send_cmd(ws, 1, 'Page.enable')
            await send_cmd(ws, 2, 'Runtime.enable')

            cmd_id = 10

            async def capture_screen(url, filename, width=1440, height=1100, scroll_y=0, is_mobile=False):
                nonlocal cmd_id
                cmd_id += 1
                await send_cmd(ws, cmd_id, 'Emulation.setDeviceMetricsOverride', {
                    'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': is_mobile
                })
                cmd_id += 1
                await send_cmd(ws, cmd_id, 'Page.navigate', {'url': url})
                await asyncio.sleep(2.5)

                if scroll_y > 0:
                    cmd_id += 1
                    await send_cmd(ws, cmd_id, 'Runtime.evaluate', {'expression': f'window.scrollTo(0, {scroll_y});'})
                    await asyncio.sleep(1.0)

                cmd_id += 1
                snap = await send_cmd(ws, cmd_id, 'Page.captureScreenshot', {'format': 'png'})
                img_data = snap['result']['data']
                out_path = os.path.join(ARTIFACT_DIR, filename)
                with open(out_path, 'wb') as f:
                    f.write(base64.b64decode(img_data))
                print(f"Captured {filename} ({len(img_data)} bytes)")

            # 1. Desktop Work Auto-Slider (Initial Slide)
            await capture_screen("http://localhost:3000/work", "work_auto_carousel_desktop.png", 1440, 1100, scroll_y=520)

            # Wait 4.5 seconds for auto-slide transition to trigger
            print("Waiting 5s for auto-slide to advance...")
            await asyncio.sleep(5.0)

            # 2. Desktop Work Auto-Slider (After Auto-Slide Transition)
            cmd_id += 1
            snap2 = await send_cmd(ws, cmd_id, 'Page.captureScreenshot', {'format': 'png'})
            out_path2 = os.path.join(ARTIFACT_DIR, "work_auto_carousel_advanced.png")
            with open(out_path2, 'wb') as f:
                f.write(base64.b64decode(snap2['result']['data']))
            print("Captured work_auto_carousel_advanced.png")

            # 3. Mobile Work Auto-Slider (390px iPhone / Android)
            await capture_screen("http://localhost:3000/work", "work_auto_carousel_mobile.png", 390, 844, scroll_y=420, is_mobile=True)

    finally:
        proc.terminate()
        proc.wait()

asyncio.run(run())
