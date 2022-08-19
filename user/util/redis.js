const redis = require('redis');
const config = require('./config.json')


async function Client() {
    const client = redis.createClient(config.redis);
    client.on('error', err => console.log('the connection is error'))
    await client.connect()
    return client
}

module.exports = await Client()