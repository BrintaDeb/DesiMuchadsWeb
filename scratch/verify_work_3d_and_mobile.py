import subprocess, time, asyncio, json, base64, urllib.request, websockets, os

temp_dir = os.path.join(os.environ.get('TEMP', '.'), 'chrome_3d_verify')
os.makedirs(temp_dir, exist_ok=True)
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
proc = subprocess.Popen([chrome_path, '--headless=new', '--remote-debugging-port=9260', f'--user-data-dir={temp_dir}', 'about:blank'])
time.sleep(2.5)

brain_dir = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb'

async def run():
    try:
        res = urllib.request.urlopen('http://127.0.0.1:9260/json')
        tabs = json.loads(res.read())
        async with websockets.connect(tabs[0]['webSocketDebuggerUrl'], max_size=30*1024*1024) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Page.enable'}))

            # -------------------------------------------------------------
            # TEST 1: DESKTOP 3D CAROUSEL ON /work
            # -------------------------------------------------------------
            await ws.send(json.dumps({'id': 2, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 1440, 'height': 1000, 'deviceScaleFactor': 1, 'mobile': False}}))
            await ws.send(json.dumps({'id': 3, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/work'}}))
            await asyncio.sleep(2.5)

            # Dismiss any popup & scroll directly to the carousel
            script_scroll = '''
                sessionStorage.setItem("dm_winter_discount_seen_v1", "true");
                const closeBtn = document.querySelector("button[aria-label*='Close']");
                if (closeBtn) closeBtn.click();
                
                const carousel = document.querySelector("#featured");
                if (carousel) {
                    carousel.scrollIntoView({ behavior: 'instant', block: 'center' });
                }
            '''
            await ws.send(json.dumps({'id': 4, 'method': 'Runtime.evaluate', 'params': {'expression': script_scroll}}))
            await asyncio.sleep(1.0)

            # Capture Desktop 3D Carousel (Visual Mode)
            await ws.send(json.dumps({'id': 5, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 5:
                    data = base64.b64decode(msg['result']['data'])
                    with open(os.path.join(brain_dir, 'work_3d_carousel_desktop.png'), 'wb') as f:
                        f.write(data)
                    print('Captured work_3d_carousel_desktop.png')
                    break

            # -------------------------------------------------------------
            # TEST 2: 3D CARD FLIP TO SPECS & ROI DOSSIER
            # -------------------------------------------------------------
            script_flip = '''
                (() => {
                    const flipBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Specs') || b.textContent.includes('ROI'));
                    if (flipBtn) {
                        flipBtn.click();
                        return true;
                    }
                    return false;
                })()
            '''
            await ws.send(json.dumps({'id': 6, 'method': 'Runtime.evaluate', 'params': {'expression': script_flip, 'returnByValue': True}}))
            await asyncio.sleep(1.2)

            await ws.send(json.dumps({'id': 7, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 7:
                    data = base64.b64decode(msg['result']['data'])
                    with open(os.path.join(brain_dir, 'work_3d_carousel_flipped.png'), 'wb') as f:
                        f.write(data)
                    print('Captured work_3d_carousel_flipped.png')
                    break

            # -------------------------------------------------------------
            # TEST 3: MOBILE RESPONSIVE IPHONE (390 x 844)
            # -------------------------------------------------------------
            await ws.send(json.dumps({'id': 8, 'method': 'Emulation.setDeviceMetricsOverride', 'params': {'width': 390, 'height': 844, 'deviceScaleFactor': 2, 'mobile': True}}))
            await ws.send(json.dumps({'id': 9, 'method': 'Page.navigate', 'params': {'url': 'http://localhost:3000/work'}}))
            await asyncio.sleep(2.0)

            script_mobile_scroll = '''
                sessionStorage.setItem("dm_winter_discount_seen_v1", "true");
                const closeBtn = document.querySelector("button[aria-label*='Close']");
                if (closeBtn) closeBtn.click();
                const carousel = document.querySelector("#featured");
                if (carousel) {
                    carousel.scrollIntoView({ behavior: 'instant', block: 'start' });
                }
            '''
            await ws.send(json.dumps({'id': 10, 'method': 'Runtime.evaluate', 'params': {'expression': script_mobile_scroll}}))
            await asyncio.sleep(1.0)

            await ws.send(json.dumps({'id': 11, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 11:
                    data = base64.b64decode(msg['result']['data'])
                    with open(os.path.join(brain_dir, 'work_3d_carousel_mobile_iphone.png'), 'wb') as f:
                        f.write(data)
                    print('Captured work_3d_carousel_mobile_iphone.png')
                    break

            # -------------------------------------------------------------
            # TEST 4: UNIVERSAL APP DOWNLOAD MODAL OPEN ON MOBILE
            # -------------------------------------------------------------
            script_open_app = '''
                (() => {
                    window.dispatchEvent(new CustomEvent('dm_open_app_installer'));
                })()
            '''
            await ws.send(json.dumps({'id': 12, 'method': 'Runtime.evaluate', 'params': {'expression': script_open_app}}))
            await asyncio.sleep(1.0)

            await ws.send(json.dumps({'id': 13, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 13:
                    data = base64.b64decode(msg['result']['data'])
                    with open(os.path.join(brain_dir, 'universal_app_install_modal_mobile.png'), 'wb') as f:
                        f.write(data)
                    print('Captured universal_app_install_modal_mobile.png')
                    break

    finally:
        proc.kill()

asyncio.run(run())
