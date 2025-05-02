const puppeteer = require('puppeteer-core');

async function launchWithExtension(proxy) {
    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: '/opt/render/.chromium/chromium',
        args: proxy ? [`--proxy-server=${proxy}`] : []
    });
    const page = await browser.newPage();
    await page.goto('https://app.getgrass.io');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
}

module.exports = { launchWithExtension };
 