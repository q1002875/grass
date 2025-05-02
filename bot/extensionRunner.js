const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function launchWithExtension(proxy) {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    headless: true,
    args: [
      ...chromium.args,
      ...(proxy ? [`--proxy-server=${proxy}`] : [])
    ],
    defaultViewport: chromium.defaultViewport,
  });

  const page = await browser.newPage();
  await page.goto('https://app.getgrass.io');
  await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
}

module.exports = { launchWithExtension };
