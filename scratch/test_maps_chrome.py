import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9222', 'about:blank'])
time.sleep(2)

async def check_map():
    res = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
        await ws.send(json.dumps({'id': 1, 'method': 'Page.navigate', 'params': {'url': 'https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw'}}))
        print('Navigating to new maps URL...')
        await ws.recv()
        await asyncio.sleep(6.0)
        
        # Get final URL and title
        await ws.send(json.dumps({'id': 2, 'method': 'Runtime.evaluate', 'params': {'expression': 'window.location.href'}}))
        url_resp = json.loads(await ws.recv())
        print('FINAL LOCATION HREF:', url_resp.get('result', {}).get('value'))
        
        await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': 'document.title'}}))
        title_resp = json.loads(await ws.recv())
        print('DOCUMENT TITLE:', title_resp.get('result', {}).get('value'))

        await ws.send(json.dumps({'id': 4, 'method': 'Runtime.evaluate', 'params': {'expression': 'document.body.innerText'}}))
        text_resp = json.loads(await ws.recv())
        val = text_resp.get('result', {}).get('value')
        print('BODY TEXT (first 1000 chars):', val[:1000] if val else 'None')

        await ws.send(json.dumps({'id': 5, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        data = base64.b64decode(resp['result']['data'])
        with open('scratch/new_map_screen.png', 'wb') as f:
            f.write(data)
        print('Saved screenshot to scratch/new_map_screen.png')

try:
    asyncio.run(check_map())
finally:
    proc.terminate()
