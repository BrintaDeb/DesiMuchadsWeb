import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9222', '--disable-gpu', 'about:blank'])
time.sleep(2)

async def capture():
    res = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
        # Desktop
        await ws.send(json.dumps({'id': 1, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 1440, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False}}))
        await ws.recv()
        await ws.send(json.dumps({'id': 2, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
        await ws.recv()
        await asyncio.sleep(4.0)
        
        # Close any modal if open (press Escape or click close)
        close_code = """
        document.querySelectorAll('button').forEach(b => {
            if (b.innerText.includes('×') || b.querySelector('svg.lucide-x') || b.getAttribute('aria-label')?.includes('Close')) {
                b.click();
            }
        });
        """
        await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': close_code}}))
        await ws.recv()
        await asyncio.sleep(0.5)

        await ws.send(json.dumps({'id': 4, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        data = base64.b64decode(resp['result']['data'])
        with open(r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\final-desktop-hero.png', 'wb') as f:
            f.write(data)
            
        # Mobile iPhone 14 Pro
        await ws.send(json.dumps({'id': 5, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 393, 'height': 852, 'deviceScaleFactor': 2, 'mobile': True}}))
        await ws.recv()
        await asyncio.sleep(0.5)
        await ws.send(json.dumps({'id': 6, 'method': 'Runtime.evaluate', 'params': {'expression': close_code}}))
        await ws.recv()
        await asyncio.sleep(0.5)
        await ws.send(json.dumps({'id': 7, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        data = base64.b64decode(resp['result']['data'])
        with open(r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\final-mobile-iphone.png', 'wb') as f:
            f.write(data)
            
        print('Captured clean final screenshots!')

asyncio.run(capture())
proc.terminate()
