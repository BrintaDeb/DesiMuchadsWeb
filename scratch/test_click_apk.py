import subprocess, time, asyncio, json, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9229', '--window-size=1280,900', 'about:blank'])
time.sleep(2)

async def test_download():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9229/json')
        tabs = json.loads(res.read())
        ws_url = tabs[0]['webSocketDebuggerUrl']
        async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
            await ws.recv()
            await asyncio.sleep(4.5)
            
            # Dismiss winter discount modal if open
            js_dismiss = 'sessionStorage.setItem("dm_winter_discount_seen", "true"); document.querySelectorAll("button").forEach(b => { if (b.getAttribute("aria-label") && b.getAttribute("aria-label").includes("Close")) b.click(); });'
            await ws.send(json.dumps({'id': 2, 'method': 'Runtime.evaluate', 'params': {'expression': js_dismiss}}))
            await ws.recv()
            await asyncio.sleep(0.5)
            
            # Find and click the APK download popup container
            js_click = '''
            const btn = document.querySelector('aside [role="button"]') || document.querySelector('aside button');
            if (btn) {
                btn.click();
                'CLICKED_APK_WIDGET: ' + btn.textContent.trim().replace(/\\s+/g, ' ');
            } else {
                'WIDGET_NOT_FOUND';
            }
            '''
            await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': js_click}}))
            r = json.loads(await ws.recv())
            print('Click result:', r.get('result', {}).get('result', {}).get('value'))
    finally:
        proc.terminate()

asyncio.run(test_download())
