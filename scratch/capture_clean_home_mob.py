import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_home_mob5')
os.makedirs(temp_dir, exist_ok=True)
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9235', f'--user-data-dir={temp_dir}', 'about:blank'])
time.sleep(2.0)

async def run():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9235/json')
        tabs = json.loads(res.read())
        async with websockets.connect(tabs[0]['webSocketDebuggerUrl'], max_size=30*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
            await ws.send(json.dumps({'id': 2, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 390, 'height': 844, 'deviceScaleFactor': 1, 'mobile': True}}))
            
            # Navigate to page and inject sessionStorage flag immediately
            await ws.send(json.dumps({'id': 3, 'method': 'Page.addScriptToEvaluateOnNewDocument', 'params': {
                'source': 'sessionStorage.setItem("dm_winter_discount_seen_v1", "true"); sessionStorage.setItem("dm_intro_skipped", "true");'
            }}))
            
            await ws.send(json.dumps({'id': 4, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/#work'}}))
            await asyncio.sleep(2.5)

            script = '''
                const skip = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("SKIP INTRO"));
                if (skip) skip.click();
                const closeBtn = document.querySelector("button[aria-label*=\'Close\']");
                if (closeBtn) closeBtn.click();
                const work = document.getElementById("work");
                if (work) work.scrollIntoView({ behavior: "instant", block: "center" });
            '''
            await ws.send(json.dumps({'id': 5, 'method': 'Runtime.evaluate', 'params': {'expression': script}}))
            await asyncio.sleep(1.0)

            await ws.send(json.dumps({'id': 6, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 6:
                    data = base64.b64decode(msg['result']['data'])
                    out_path = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\homepage_work_carousel_mobile_clean.png'
                    with open(out_path, 'wb') as f:
                        f.write(data)
                    print('Captured homepage_work_carousel_mobile_clean.png')
                    break
    finally:
        proc.terminate()
        proc.wait()

asyncio.run(run())
