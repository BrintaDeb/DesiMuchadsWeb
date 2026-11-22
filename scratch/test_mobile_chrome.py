import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9229', '--window-size=393,852', 'about:blank'])
time.sleep(2)

async def capture_mobile():
    res = urllib.request.urlopen('http://127.0.0.1:9229/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
        # Set mobile emulation for iPhone
        await ws.send(json.dumps({
            'id': 1,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {
                'width': 393,
                'height': 852,
                'deviceScaleFactor': 2,
                'mobile': True
            }
        }))
        await ws.recv()
        
        await ws.send(json.dumps({'id': 2, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
        await ws.recv()
        await asyncio.sleep(4.5)
        
        # Dismiss preloader / winter discount modal
        js_dismiss = 'sessionStorage.setItem("dm_winter_discount_seen", "true"); document.querySelectorAll("button").forEach(b => { if (b.getAttribute("aria-label") && b.getAttribute("aria-label").includes("Close")) b.click(); });'
        await ws.send(json.dumps({'id': 3, 'method': 'Runtime.evaluate', 'params': {'expression': js_dismiss}}))
        await ws.recv()
        await asyncio.sleep(0.8)
        
        # Capture iPhone 14 Pro view (Hero + Floating Bars + Small APK Widget)
        await ws.send(json.dumps({'id': 4, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_mobile_iphone.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))
            
        # Switch to Android Pixel viewport (412x915)
        await ws.send(json.dumps({
            'id': 5,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {
                'width': 412,
                'height': 915,
                'deviceScaleFactor': 2.5,
                'mobile': True
            }
        }))
        await ws.recv()
        await asyncio.sleep(0.5)
        
        await ws.send(json.dumps({'id': 6, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_mobile_pixel.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))

asyncio.run(capture_mobile())
proc.terminate()
print('Mobile screenshots captured!')
