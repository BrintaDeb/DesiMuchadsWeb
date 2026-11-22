import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9228', '--window-size=1440,1080', 'about:blank'])
time.sleep(2)

async def capture_all():
    res = urllib.request.urlopen('http://127.0.0.1:9228/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
        # 1. Homepage
        await ws.send(json.dumps({'id': 1, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000'}}))
        await ws.recv()
        await asyncio.sleep(4.5)
        # Dismiss preloader / modal
        js_dismiss = 'sessionStorage.setItem("dm_winter_discount_seen", "true"); document.querySelectorAll("button").forEach(b => { if (b.getAttribute("aria-label") && b.getAttribute("aria-label").includes("Close")) b.click(); });'
        await ws.send(json.dumps({'id': 2, 'method': 'Runtime.evaluate', 'params': {'expression': js_dismiss}}))
        await ws.recv()
        await asyncio.sleep(0.8)
        
        # Header + Hero capture
        await ws.send(json.dumps({'id': 3, 'method': 'Page.captureScreenshot', 'params': {'clip': {'x': 0, 'y': 0, 'width': 1440, 'height': 850, 'scale': 1}}}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_header_hero.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))
            
        # Footer capture
        await ws.send(json.dumps({'id': 4, 'method': 'Runtime.evaluate', 'params': {'expression': 'window.scrollTo(0, document.body.scrollHeight)'}}))
        await ws.recv()
        await asyncio.sleep(2.0)
        await ws.send(json.dumps({'id': 5, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_footer_map.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))
            
        # 2. Contact Page
        await ws.send(json.dumps({'id': 6, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/contact'}}))
        await ws.recv()
        await asyncio.sleep(3.0)
        js_scroll_contact = 'const mapEl = document.querySelector("iframe"); if (mapEl) mapEl.scrollIntoView({ behavior: "instant", block: "center" });'
        await ws.send(json.dumps({'id': 7, 'method': 'Runtime.evaluate', 'params': {'expression': js_scroll_contact}}))
        await ws.recv()
        await asyncio.sleep(1.5)
        await ws.send(json.dumps({'id': 8, 'method': 'Page.captureScreenshot'}))
        resp = json.loads(await ws.recv())
        with open('scratch/verify_contact_map.png', 'wb') as f:
            f.write(base64.b64decode(resp['result']['data']))

asyncio.run(capture_all())
proc.terminate()
print('All verification screenshots captured successfully!')
