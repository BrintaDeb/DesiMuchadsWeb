import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9222', '--disable-gpu', 'about:blank'])
time.sleep(2)

async def capture_home():
    res = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
        await ws.send(json.dumps({'id': 1, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 1440, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False}}))
        await ws.recv()
        await ws.send(json.dumps({'id': 2, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/'}}))
        await ws.recv()
        # Wait 4.5s for preloader to finish
        await asyncio.sleep(4.5)
        
        close_code = """
        document.querySelectorAll('button').forEach(function(b) {
            if (b.innerText.indexOf('×') !== -1 || b.querySelector('svg.lucide-x') || (b.getAttribute('aria-label') && b.getAttribute('aria-label').indexOf('Close') !== -1)) {
                b.click();
            }
        });
        """
        await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': close_code}}))
        await ws.recv()
        await asyncio.sleep(0.5)

        # 1. Hero
        await ws.send(json.dumps({'id': 4, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open(r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\bg-verify-home-hero.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))
            
        # 2. Services Section (Scroll down)
        await ws.send(json.dumps({'id': 5, 'method': 'Runtime.evaluate', 'params': {'expression': 'window.scrollTo(0, 850)'}}))
        await ws.recv()
        await asyncio.sleep(0.8)
        await ws.send(json.dumps({'id': 6, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open(r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\bg-verify-home-services.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))

        # 3. Work Section (Scroll down)
        await ws.send(json.dumps({'id': 7, 'method': 'Runtime.evaluate', 'params': {'expression': 'window.scrollTo(0, 2000)'}}))
        await ws.recv()
        await asyncio.sleep(0.8)
        await ws.send(json.dumps({'id': 8, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open(r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\bg-verify-home-work.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))

        print('Captured home sections successfully!')

asyncio.run(capture_home())
proc.terminate()
