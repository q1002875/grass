require('dotenv').config();
const { launchWithExtension } = require('./bot/extensionRunner');
const { rotateProxy } = require('./bot/proxyManager');
const { sendTelegramMessage } = require('./utils/telegram');
const { getGrassPoints } = require('./services/grassApi');

async function run() {
    try {
        const proxy = rotateProxy();
        await launchWithExtension(proxy);
        const points = await getGrassPoints();
        await sendTelegramMessage(`🌱 種植完成，目前 Grass 點數：${points}`);
    } catch (err) {
        console.error("🚨 執行失敗：", err);
        await sendTelegramMessage(`❌ 種植失敗：${err.message}`);
    }
}

setInterval(run, 1000 * 60 * 60); // 每小時執行一次
run(); // 啟動時立即執行一次