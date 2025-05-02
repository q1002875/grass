const fetch = require('node-fetch');

async function getGrassPoints() {
    const response = await fetch('https://api.getgrass.io/user', {
        headers: {
            'Authorization': `Bearer ${process.env.GRASS_API_KEY}`
        }
    });
    const data = await response.json();
    return data?.points || 0;
}

module.exports = { getGrassPoints };