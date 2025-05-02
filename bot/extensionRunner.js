const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function launchWithExtension() {
  const isRender = !!process.env.AWS_EXECUTION_ENV || process.env.RENDER;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: isRender
      ? await chromium.executablePath // Render 或 Lambda 上使用 chrome-aws-lambda 內建路徑
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // 你本機的 Chrome 路徑（視作業系統調整）
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log(await page.title());
  await browser.close();
}

module.exports = launchWithExtension;
