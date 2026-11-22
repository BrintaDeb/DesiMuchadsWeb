import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9232', '--window-size=393,852', 'about:blank'])
time.sleep(2)

async def capture_scrolled():
    res = urllib.request.urlopen('http://127.0.0.1:9232/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
        await ws.send(json.dumps({
            'id': 1,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {'width': 393, 'height': 852, 'deviceScaleFactor': 2, 'mobile': True}
        }))
        await ws.recv()
        await ws.send(json.dumps({'id': 2, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
        await ws.recv()
        await asyncio.sleep(4.5)
        
        # Click close modal button or press Escape
        await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': '''
            sessionStorage.setItem("dm_winter_discount_seen", "true");
            const btn = document.querySelector('button[aria-label="Close modal"]');
            if (btn) btn.click();
        '''}}))
        await ws.recv()
        await asyncio.sleep(0.5)
        
        # Scroll down to services
        await ws.send(json.dumps({'id': 4, 'method': 'Runtime.evaluate', 'params': {'expression': 'window.scrollTo(0, 950);'}}))
        await ws.recv()
        await asyncio.sleep(1.0)
        
        await ws.send(json.dumps({'id': 5, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_mobile_scrolled_services.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))

asyncio.run(capture_scrolled())
proc.terminate()
print('Services mobile screenshot captured!')
