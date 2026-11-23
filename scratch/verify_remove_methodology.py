import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9229', '--window-size=1280,1000', 'about:blank'])
time.sleep(2)

async def capture_transition():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9229/json')
        tabs = json.loads(res.read())
        ws_url = tabs[0]['webSocketDebuggerUrl']
        async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
            await ws.recv()
            await asyncio.sleep(2.0)
            
            # Dismiss discount modal in session
            await ws.send(json.dumps({
                'id': 2,
                'method': 'Runtime.evaluate',
                'params': {'expression': 'sessionStorage.setItem("dm_winter_discount_seen", "true");'}
            }))
            await ws.recv()
            
            await ws.send(json.dumps({'id': 3, 'method': 'Page.reload'}))
            await ws.recv()
            await asyncio.sleep(4.5)
            
            # Scroll to #work
            js_scroll = '''
            const el = document.getElementById("work");
            if (el) {
                el.scrollIntoView({behavior: "instant", block: "start"});
            }
            '''
            await ws.send(json.dumps({'id': 4, 'method': 'Runtime.evaluate', 'params': {'expression': js_scroll}}))
            await ws.recv()
            await asyncio.sleep(1.0)
            
            await ws.send(json.dumps({'id': 5, 'method': 'Page.captureScreenshot'}))
            resp = json.loads(await ws.recv())
            with open('scratch/verify_no_methodology.png', 'wb') as f:
                f.write(base64.b64decode(resp['result']['data']))
            print('Screenshot saved to scratch/verify_no_methodology.png')
    finally:
        proc.terminate()

asyncio.run(capture_transition())
