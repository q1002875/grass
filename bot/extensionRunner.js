const puppeteer = require('puppeteer');

async function launchWithExtension(proxy) {
    const browser = await puppeteer.launch({
        headless: true,
        args: proxy ? [`--proxy-server=${proxy}`] : []
    });
    const page = await browser.newPage();
    await page.goto('https://app.getgrass.io');
    await page.waitForTimeout(5000);
    await browser.close();
}

module.exports = { launchWithExtension };