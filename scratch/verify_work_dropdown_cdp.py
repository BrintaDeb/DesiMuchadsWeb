import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_work_drop')
os.makedirs(temp_dir, exist_ok=True)
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9254', f'--user-data-dir={temp_dir}', 'about:blank'])
time.sleep(2.5)

async def run():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9254/json')
        tabs = json.loads(res.read())
        async with websockets.connect(tabs[0]['webSocketDebuggerUrl'], max_size=30*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
            await ws.send(json.dumps({'id': 2, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 1440, 'height': 1100, 'deviceScaleFactor': 1, 'mobile': False}}))
            await ws.send(json.dumps({'id': 3, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/work'}}))
            await asyncio.sleep(2.5)

            # Pre-seed session storage and dismiss popups
            script_dismiss = '''
                sessionStorage.setItem("dm_winter_discount_seen_v1", "true");
                const closeBtn = document.querySelector("button[aria-label*='Close']");
                if (closeBtn) closeBtn.click();
            '''
            await ws.send(json.dumps({'id': 4, 'method': 'Runtime.evaluate', 'params': {'expression': script_dismiss}}))
            await asyncio.sleep(0.5)

            # Get center coordinates of Work link in header
            script_coord = '''
                (() => {
                    const link = Array.from(document.querySelectorAll('header nav a')).find(a => a.textContent.trim().startsWith('Work'));
                    if (!link) return null;
                    const r = link.getBoundingClientRect();
                    return { x: r.left + r.width/2, y: r.top + r.height/2 };
                })()
            '''
            await ws.send(json.dumps({'id': 5, 'method': 'Runtime.evaluate', 'params': {'expression': script_coord, 'returnByValue': True}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 5:
                    pos = msg['result']['result']['value']
                    break

            print('Work link pos on /work:', pos)
            if pos:
                # Dispatch mouseMove to open dropdown
                await ws.send(json.dumps({'id': 6, 'method': 'Input.dispatchMouseEvent', 'params': {'type': 'mouseMoved', 'x': pos['x'], 'y': pos['y']}}))
                await asyncio.sleep(1.5)

            await ws.send(json.dumps({'id': 7, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 7:
                    data = base64.b64decode(msg['result']['data'])
                    out_path = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\work_dropdown_featured_only.png'
                    with open(out_path, 'wb') as f:
                        f.write(data)
                    print('Captured successfully!')
                    break
    finally:
        proc.kill()

asyncio.run(run())
