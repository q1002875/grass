const proxies = process.env.PROXY_LIST?.split(',') || [];
let index = 0;

function rotateProxy() {
    if (proxies.length === 0) return null;
    const proxy = proxies[index];
    index = (index + 1) % proxies.length;
    return proxy;
}

module.exports = { rotateProxy };