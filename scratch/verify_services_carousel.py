import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})

        print("Navigating to http://localhost:3000/services...")
        await page.goto("http://localhost:3000/services", wait_until="networkidle")
        await page.wait_for_timeout(2500)

        # 1. Capture initial 3D carousel view (Discipline 01)
        await page.screenshot(path="C:/Users/Shreyam/.gemini/antigravity/brain/9ea9d0a4-f51a-4019-b233-94e10f3118cb/services_carousel_slide1.png", full_page=False)
        print("Captured Slide 1 preview.")

        # 2. Click Next arrow button
        next_button = page.locator("button[aria-label='Next Service']").first
        if await next_button.is_visible():
            print("Clicking Next Service arrow button...")
            await next_button.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path="C:/Users/Shreyam/.gemini/antigravity/brain/9ea9d0a4-f51a-4019-b233-94e10f3118cb/services_carousel_slide2.png", full_page=False)
            print("Captured Slide 2 preview.")

        # 3. Switch to Bento Grid View
        grid_button = page.locator("button:has-text('Bento Grid')").first
        if await grid_button.is_visible():
            print("Switching to Bento Grid view...")
            await grid_button.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path="C:/Users/Shreyam/.gemini/antigravity/brain/9ea9d0a4-f51a-4019-b233-94e10f3118cb/services_bento_grid.png", full_page=False)
            print("Captured Bento Grid preview.")

        await browser.close()
        print("Verification complete!")

if __name__ == "__main__":
    asyncio.run(run())
