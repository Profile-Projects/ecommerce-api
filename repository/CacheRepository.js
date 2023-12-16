const { createClient } = require("redis");
class CacheRepository {

    constructor() {
        this.client = createClient();
        this.connect();
    }

    async connect() {
        this.client.on('error', err => console.log('Redis client error', err));
        await this.client.connect();
    }

    async setHash({ key, val = [] }) {
        const str = JSON.stringify(val);
        await this.client.hSet('shopping_cart', key, str);
    }

    async getHash({ key }) {
        const res = await this.client.hGet('shopping_cart', key);
        return JSON.parse(res);
    }

    async hasHashKey({ key }) {
        return await this.client.hExists('shopping_cart', key);
    }
};

module.exports = CacheRepository;