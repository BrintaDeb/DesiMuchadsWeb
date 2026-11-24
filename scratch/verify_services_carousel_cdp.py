import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_cdp_services2')
os.makedirs(temp_dir, exist_ok=True)

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9225',
    f'--user-data-dir={temp_dir}',
    'about:blank'
])
time.sleep(2.5)

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

async def capture():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9225/json')
        tabs = json.loads(res.read())
        ws_url = tabs[0]['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url, max_size=30*1024*1024) as ws:
            await send_cmd(ws, 1, 'Page.enable')
            await send_cmd(ws, 2, 'Runtime.enable')

            # Set wide desktop viewport
            await send_cmd(ws, 3, 'Emulation.setDeviceMetricsOverride', {
                'width': 1440, 'height': 1200, 'deviceScaleFactor': 1, 'mobile': False
            })

            print("Navigating to http://localhost:3000/services...")
            await send_cmd(ws, 4, 'Page.navigate', {'url': 'http://localhost:3000/services'})
            await asyncio.sleep(2.5)

            # Scroll into carousel view
            print("Scrolling into carousel view...")
            await send_cmd(ws, 5, 'Runtime.evaluate', {'expression': 'window.scrollTo(0, 680)'})
            await asyncio.sleep(1.0)

            # Capture 1: Scrolled Carousel View (Discipline 01)
            msg1 = await send_cmd(ws, 6, 'Page.captureScreenshot', {'format': 'png'})
            data1 = base64.b64decode(msg1['result']['data'])
            out1 = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\services_carousel_focused.png'
            with open(out1, 'wb') as f:
                f.write(data1)
            print(f"Captured Focused Carousel View ({len(data1)} bytes) to {out1}")

            # Click Next arrow button
            print("Clicking Next button...")
            await send_cmd(ws, 7, 'Runtime.evaluate', {
                'expression': 'document.querySelector("button[aria-label=\'Next Service\']")?.click()'
            })
            await asyncio.sleep(1.0)

            # Capture 2: Transitioned Carousel View (Discipline 02)
            msg2 = await send_cmd(ws, 8, 'Page.captureScreenshot', {'format': 'png'})
            data2 = base64.b64decode(msg2['result']['data'])
            out2 = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\services_carousel_next_slide.png'
            with open(out2, 'wb') as f:
                f.write(data2)
            print(f"Captured Next Slide View ({len(data2)} bytes) to {out2}")

    finally:
        proc.terminate()
        print("CDP browser terminated cleanly.")

if __name__ == '__main__':
    asyncio.run(capture())
