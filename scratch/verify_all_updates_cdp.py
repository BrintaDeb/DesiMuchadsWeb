import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_cdp_verify_all')
os.makedirs(temp_dir, exist_ok=True)

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9227',
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
        res = urllib.request.urlopen('http://127.0.0.1:9227/json')
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

            # 1. Contact page - Clock and IST live timing
            await capture_screen("http://localhost:3000/contact", "contact_clock_desktop.png", 1440, 1100, scroll_y=350)

            # 2. Services page - Streamlined description
            await capture_screen("http://localhost:3000/services", "services_streamlined_desktop.png", 1440, 1200, scroll_y=600)

            # 3. Pricing page - Verify ROAS simulator removed
            await capture_screen("http://localhost:3000/pricing", "pricing_no_simulator.png", 1440, 1100, scroll_y=750)

            # 4. Mobile Services (390x844 iPhone / Android)
            await capture_screen("http://localhost:3000/services", "services_mobile_390.png", 390, 844, scroll_y=350, is_mobile=True)

            # 5. Mobile Contact (390x844)
            await capture_screen("http://localhost:3000/contact", "contact_mobile_390.png", 390, 844, scroll_y=600, is_mobile=True)

            # 6. Footer Clock (Desktop)
            await capture_screen("http://localhost:3000/", "footer_clock_desktop.png", 1440, 1100, scroll_y=4200)

    finally:
        proc.terminate()
        proc.wait()

asyncio.run(run())
