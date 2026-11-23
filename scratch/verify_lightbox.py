import asyncio
from playwright.async_api import async_playwright

async def verify_work_and_lightbox():
    async with async_playwright() as p:
        # 1. Desktop Verification
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        # Disable discount popup for clean test
        await page.add_init_script("""
            sessionStorage.setItem('dm_winter_discount_seen', 'true');
        """)

        print("Navigating to http://localhost:3000/work (Desktop)...")
        await page.goto("http://localhost:3000/work", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Screenshot of work grid with new photos
        await page.screenshot(path="scratch/verify_work_grid_desktop.png")
        print("Captured scratch/verify_work_grid_desktop.png")

        # Click on SnackNation Makhanas card to open lightbox
        snack_btn = page.locator("text=SnackNation Makhanas").first
        if await snack_btn.count() > 0:
            print("Clicking SnackNation Makhanas...")
            await snack_btn.click()
            await page.wait_for_timeout(3000)
            await page.screenshot(path="scratch/verify_snacknation_lightbox_desktop.png")
            print("Captured scratch/verify_snacknation_lightbox_desktop.png")

            # Try toggling to iPhone mode inside lightbox
            iphone_btn = page.locator("button:has-text('iPhone')").first
            if await iphone_btn.count() > 0:
                print("Clicking iPhone mode toggle...")
                await iphone_btn.click()
                await page.wait_for_timeout(2000)
                await page.screenshot(path="scratch/verify_snacknation_iphone_view.png")
                print("Captured scratch/verify_snacknation_iphone_view.png")

            # Close lightbox
            close_btn = page.locator("button:has-text('CLOSE ✕')").first
            if await close_btn.count() > 0:
                await close_btn.click()
                await page.wait_for_timeout(1000)

        # Click on Lord Ganesha Cyber-Mandala to test Art Studio demo
        ganesha_btn = page.locator("text=Lord Ganesha Cyber-Mandala").first
        if await ganesha_btn.count() > 0:
            print("Clicking Lord Ganesha Cyber-Mandala...")
            await ganesha_btn.click()
            await page.wait_for_timeout(3500)
            await page.screenshot(path="scratch/verify_ganesha_art_studio_lightbox.png")
            print("Captured scratch/verify_ganesha_art_studio_lightbox.png")

            close_btn = page.locator("button:has-text('CLOSE ✕')").first
            if await close_btn.count() > 0:
                await close_btn.click()
                await page.wait_for_timeout(1000)

        await context.close()

        # 2. Mobile Verification (iPhone 16 Pro Viewport 393x852)
        mobile_context = await browser.new_context(
            viewport={"width": 393, "height": 852},
            is_mobile=True,
            has_touch=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1"
        )
        mobile_page = await mobile_context.new_page()
        await mobile_page.add_init_script("""
            sessionStorage.setItem('dm_winter_discount_seen', 'true');
        """)

        print("Navigating to http://localhost:3000/work (Mobile)...")
        await mobile_page.goto("http://localhost:3000/work", wait_until="networkidle")
        await mobile_page.wait_for_timeout(2000)
        await mobile_page.screenshot(path="scratch/verify_work_mobile_grid.png")
        print("Captured scratch/verify_work_mobile_grid.png")

        # Click first Inspect Work on mobile
        first_inspect = mobile_page.locator("button:has-text('Inspect Work')").first
        if await first_inspect.count() > 0:
            print("Clicking Inspect Work on mobile...")
            await first_inspect.click()
            await mobile_page.wait_for_timeout(3000)
            await mobile_page.screenshot(path="scratch/verify_mobile_lightbox_open.png")
            print("Captured scratch/verify_mobile_lightbox_open.png")

        await mobile_context.close()
        await browser.close()
        print("All verification steps completed successfully!")

asyncio.run(verify_work_and_lightbox())
