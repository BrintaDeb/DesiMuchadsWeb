import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_ios_verify')
os.makedirs(temp_dir, exist_ok=True)
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9262', f'--user-data-dir={temp_dir}', 'about:blank'])
time.sleep(2.5)

brain_dir = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb'

async def run():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9262/json')
        tabs = json.loads(res.read())
        async with websockets.connect(tabs[0]['webSocketDebuggerUrl'], max_size=30*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))
            await ws.send(json.dumps({'id': 2, 'method': 'Network.setUserAgentOverride', 'params': {
                'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
            }}))
            await ws.send(json.dumps({'id': 3, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 390, 'height': 844, 'deviceScaleFactor': 2, 'mobile': True}}))
            await ws.send(json.dumps({'id': 4, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/work'}}))
            await asyncio.sleep(2.0)

            script_open_ios = '''
                sessionStorage.setItem("dm_winter_discount_seen_v1", "true");
                const closeBtn = document.querySelector("button[aria-label*='Close']");
                if (closeBtn) closeBtn.click();
                window.dispatchEvent(new CustomEvent('dm_open_app_installer'));
            '''
            await ws.send(json.dumps({'id': 5, 'method': 'Runtime.evaluate', 'params': {'expression': script_open_ios}}))
            await asyncio.sleep(1.0)

            await ws.send(json.dumps({'id': 6, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 6:
                    data = base64.b64decode(msg['result']['data'])
                    with open(os.path.join(brain_dir, 'ios_safari_app_install_modal.png'), 'wb') as f:
                        f.write(data)
                    print('Captured ios_safari_app_install_modal.png')
                    break
    finally:
        proc.kill()

asyncio.run(run())
