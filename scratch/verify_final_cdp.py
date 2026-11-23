import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9223', 'about:blank'])
time.sleep(2)

async def run_audit():
    res = urllib.request.urlopen('http://127.0.0.1:9223/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
        # Enable Page and Runtime
        await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
        await ws.recv()
        await ws.send(json.dumps({'id': 2, 'method': 'Runtime.enable'}))
        await ws.recv()

        # Set desktop viewport
        await ws.send(json.dumps({
            'id': 3,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {'width': 1440, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False}
        }))
        await ws.recv()

        # Navigate to desktop
        print("Navigating to http://localhost:3000...")
        await ws.send(json.dumps({'id': 4, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
        await ws.recv()
        await asyncio.sleep(3.0)

        # Check logo element
        await ws.send(json.dumps({
            'id': 5,
            'method': 'Runtime.evaluate',
            'params': {'expression': 'Boolean(document.querySelector("header img[alt=\'Desi Muchads Logo\']"))'}
        }))
        logo_eval = json.loads(await ws.recv())
        print("Header logo present on page:", logo_eval.get('result', {}).get('value'))

        # Check document title
        await ws.send(json.dumps({'id': 6, 'method': 'Runtime.evaluate', 'params': {'expression': 'document.title'}}))
        title_eval = json.loads(await ws.recv())
        print("Page Title:", title_eval.get('result', {}).get('value'))

        # Capture Desktop Header screenshot
        await ws.send(json.dumps({'id': 7, 'method': 'Page.captureScreenshot', 'params': {
            'clip': {'x': 0, 'y': 0, 'width': 1440, 'height': 160, 'scale': 1}
        }}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_desktop_header_final.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))
        print("Saved scratch/verify_desktop_header_final.png")

        # Now test iOS Mobile Viewport (iPhone 16 Pro)
        print("Testing iOS Mobile Viewport...")
        await ws.send(json.dumps({
            'id': 8,
            'method': 'Network.setUserAgentOverride',
            'params': {
                'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
            }
        }))
        await ws.recv()

        await ws.send(json.dumps({
            'id': 9,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {'width': 393, 'height': 852, 'deviceScaleFactor': 2, 'mobile': True}
        }))
        await ws.recv()

        # Reload to apply user agent
        await ws.send(json.dumps({'id': 10, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
        await ws.recv()
        await asyncio.sleep(2.5)

        # Click Install App button
        await ws.send(json.dumps({
            'id': 11,
            'method': 'Runtime.evaluate',
            'params': {'expression': '''(() => {
                const btn = Array.from(document.querySelectorAll("aside button")).find(b => b.innerText.includes("INSTALL APP"));
                if (btn) {
                    btn.click();
                    return "clicked";
                }
                return "not found";
            })()'''}
        }))
        click_eval = json.loads(await ws.recv())
        print("Install button click status:", click_eval.get('result', {}).get('value'))
        await asyncio.sleep(1.0)

        # Capture iOS full screenshot with modal open
        await ws.send(json.dumps({'id': 12, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_ios_pwa_sheet.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))
        print("Saved scratch/verify_ios_pwa_sheet.png")

try:
    asyncio.run(run_audit())
finally:
    proc.terminate()
