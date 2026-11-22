import subprocess, time, asyncio, json, base64, urllib.request, websockets

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9222', '--disable-gpu', 'about:blank'])
time.sleep(2)

pages = [
    ('/', 'bg-verify-home-hero.png', 0),
    ('/', 'bg-verify-home-services.png', 900),
    ('/', 'bg-verify-home-work.png', 2100),
    ('/about', 'bg-verify-about.png', 0),
    ('/services', 'bg-verify-services.png', 0),
    ('/work', 'bg-verify-work.png', 0),
    ('/pricing', 'bg-verify-pricing.png', 0),
    ('/contact', 'bg-verify-contact.png', 0),
]

close_code = """
document.querySelectorAll('button').forEach(b => {
    if (b.innerText.includes('×') || b.querySelector('svg.lucide-x') || b.getAttribute('aria-label')?.includes('Close')) {
        b.click();
    }
});
"""

async def capture_all():
    res = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(res.read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
        await ws.send(json.dumps({'id': 1, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 1440, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False}}))
        await ws.recv()
        
        req_id = 10
        for path, filename, scroll_y in pages:
            req_id += 1
            await ws.send(json.dumps({'id': req_id, 'method': 'Page.navigate', 'params': {'url': f'http://localhost:3000{path}'}}))
            await ws.recv()
            await asyncio.sleep(2.0)
            
            # Close any popup
            req_id += 1
            await ws.send(json.dumps({'id': req_id, 'method': 'Runtime.evaluate', 'params': {'expression': close_code}}))
            await ws.recv()
            
            if scroll_y > 0:
                req_id += 1
                await ws.send(json.dumps({'id': req_id, 'method': 'Runtime.evaluate', 'params': {'expression': f'window.scrollTo(0, {scroll_y})'}}))
                await ws.recv()
                await asyncio.sleep(0.5)
                
            req_id += 1
            await ws.send(json.dumps({'id': req_id, 'method': 'Page.captureScreenshot'}))
            resp = json.loads(await ws.recv())
            data = base64.b64decode(resp['result']['data'])
            out_path = fr'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\{filename}'
            with open(out_path, 'wb') as f:
                f.write(data)
            print(f'Captured {filename} for {path} (scrollY={scroll_y})')

asyncio.run(capture_all())
proc.terminate()
