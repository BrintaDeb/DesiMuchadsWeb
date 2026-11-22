import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9222', 'about:blank'])
time.sleep(2)

async def check_map():
    res = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
        await ws.send(json.dumps({'id': 1, 'method': 'Page.navigate', 'params': {'url': 'https://maps.app.goo.gl/k4LoVj2pqinVFZsA8?g_st=iw'}}))
        print('Navigating...')
        await ws.recv()
        await asyncio.sleep(5.0)
        
        await ws.send(json.dumps({'id': 2, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        data = base64.b64decode(resp['result']['data'])
        with open('scratch/map_screen.png', 'wb') as f:
            f.write(data)
            
        await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': 'document.body.innerText'}}))
        text_resp = json.loads(await ws.recv())
        print('BODY TEXT:', text_resp.get('result', {}).get('value')[:500] if text_resp.get('result', {}).get('value') else 'None')

asyncio.run(check_map())
proc.terminate()
