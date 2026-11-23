import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9229', '--window-size=1280,1000', 'about:blank'])
time.sleep(2)

async def capture_pricing():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9229/json')
        tabs = json.loads(res.read())
        ws_url = tabs[0]['webSocketDebuggerUrl']
        async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/#pricing'}}))
            await ws.recv()
            await asyncio.sleep(4.5)
            
            # Remove any modal dialogs and backdrops completely
            js_clean = '''
            document.querySelectorAll('[role="dialog"]').forEach(el => el.remove());
            document.querySelectorAll('.fixed.inset-0').forEach(el => el.remove());
            const el = document.getElementById("pricing");
            if (el) {
                el.scrollIntoView({behavior: "instant", block: "start"});
            }
            '''
            await ws.send(json.dumps({'id': 2, 'method': 'Runtime.evaluate', 'params': {'expression': js_clean}}))
            await ws.recv()
            await asyncio.sleep(0.5)
            
            await ws.send(json.dumps({'id': 3, 'method': 'Page.captureScreenshot'}))
            resp = json.loads(await ws.recv())
            with open('scratch/verify_pricing_no_simulator.png', 'wb') as f:
                f.write(base64.b64decode(resp['result']['data']))
            print('Clean screenshot saved!')
    finally:
        proc.terminate()

asyncio.run(capture_pricing())
