
const puppeteer = require('puppeteer-core');

async function launchWithExtension() {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/opt/render/.chromium/chromium',  // 更新為 Render 預設的 Chromium 路徑
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://app.getgrass.io');
    await page.waitForTimeout(5000);  // 或其他需要等待的時間
    await browser.close();
}

launchWithExtension();
