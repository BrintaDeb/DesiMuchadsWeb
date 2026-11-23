import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        # 1. Desktop Test
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        errors = []
        page.on("pageerror", lambda err: errors.append(f"PageError: {err}"))
        page.on("console", lambda msg: errors.append(f"ConsoleError: {msg.text}") if msg.type == "error" else None)

        print("Navigating to desktop homepage...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Check logo
        logo = page.locator("header img[alt='Desi Muchads Logo']").first
        is_logo_visible = await logo.is_visible()
        print(f"Header logo visible on desktop: {is_logo_visible}")
        
        # Save header crop
        header = page.locator("header nav").first
        await header.screenshot(path="scratch/final_header_desktop.png")

        await browser.close()

        # 2. iOS Mobile Test
        browser_mobile = await p.chromium.launch(headless=True)
        context_ios = await browser_mobile.new_context(
            viewport={"width": 393, "height": 852},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
            is_mobile=True,
            has_touch=True
        )
        page_ios = await context_ios.new_page()
        page_ios.on("pageerror", lambda err: errors.append(f"iOS PageError: {err}"))

        print("Navigating to iOS mobile...")
        await page_ios.goto("http://localhost:3000", wait_until="networkidle")
        await page_ios.wait_for_timeout(2000)

        # Click install pill
        install_btn = page_ios.locator("aside button:has-text('INSTALL APP')").first
        if await install_btn.is_visible():
            await install_btn.click()
            await page_ios.wait_for_timeout(800)
            await page_ios.screenshot(path="scratch/final_ios_modal.png")
            print("iOS install modal opened and captured.")
        else:
            print("Install button not directly visible on iOS?")

        # 3. Android Mobile Test
        context_android = await browser_mobile.new_context(
            viewport={"width": 412, "height": 915},
            user_agent="Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
            is_mobile=True,
            has_touch=True
        )
        page_android = await context_android.new_page()
        print("Navigating to Android mobile...")
        await page_android.goto("http://localhost:3000", wait_until="networkidle")
        await page_android.wait_for_timeout(2000)

        install_btn_android = page_android.locator("aside button:has-text('INSTALL APP')").first
        if await install_btn_android.is_visible():
            await install_btn_android.click()
            await page_android.wait_for_timeout(800)
            await page_android.screenshot(path="scratch/final_android_modal.png")
            print("Android install modal opened and captured.")

        await browser_mobile.close()

        print(f"Total runtime console/page errors detected: {len(errors)}")
        if errors:
            for e in errors:
                print("  -", e)

asyncio.run(verify())
