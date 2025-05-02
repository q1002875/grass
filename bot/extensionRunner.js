const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function launchWithExtension(proxy) {
    const executablePath = await chromium.executablePath;

    const browser = await puppeteer.launch({
        args: chromium.args.concat(proxy ? [`--proxy-server=${proxy}`] : []),
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await page.goto('https://app.getgrass.io');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
}

module.exports = { launchWithExtension };
