const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function launchWithExtension(proxy) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath, // 適用於 Lambda 或 Render 環境
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
        ignoreHTTPSErrors: true,
        env: {
            ...process.env,
            http_proxy: proxy,
            https_proxy: proxy
        }
    });

    const page = await browser.newPage();
    await page.goto('https://app.getgrass.io');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
}

module.exports = { launchWithExtension }; // 這裡需要確保正確導出
