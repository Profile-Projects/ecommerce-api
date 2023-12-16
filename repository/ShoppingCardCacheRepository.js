const CacheRepository = require("./CacheRepository");


class ShoppingCartCacheRepository extends CacheRepository {
    
    constructor() {
        super();
    }

    async addShoppingCartForCustomer({ customer_account_sid }) {
        await super.setHash({ key: customer_account_sid, val: [] });
        return await super.getHash({ key: customer_account_sid });
    } 

    async addItemToShoppingCart({ customer_account_sid, item }) {
        const shopping_cart = await super.getHash({ key: customer_account_sid }) || [];
        await super.setHash({ key: customer_account_sid, val: [...shopping_cart, item ]});
        return await super.getHash({ key: customer_account_sid });
    }

    async updateItemToShoppingCart({ customer_account_sid, product_sid, item}) {
        const shopping_cart = await super.getHash({ key: customer_account_sid });
        const updated_shopping_cart = shopping_cart.map(cartItem => {
            const { product_sid: current_sid } = cartItem;
            if (current_sid == product_sid) return item;
            return cartItem;
        });
        await super.setHash({ key: customer_account_sid, val: updated_shopping_cart });
        return super.getHash({ key: customer_account_sid });
    }

    async getShoppingCart({ customer_account_sid }) {
        return super.getHash({ key: customer_account_sid });
    }

    async checkShoppingCartExists({ customer_account_sid }) {
        const exists = await super.hasHashKey({ key: customer_account_sid });
        return exists;
    }

    async getShoppingCartItemExists({ customer_account_sid, product_sid }) {
        const shopping_cart = await this.getShoppingCart({ customer_account_sid });
        return shopping_cart.filter(item => item?.product_sid === product_sid).length == 1;
    }

    async updateOrInsertShoppingCartItem({ customer_account_sid, item }) {
        const { product_sid } = item;
        const exists = await this.getShoppingCartItemExists({ customer_account_sid, product_sid});
        if (exists)
            return await this.updateItemToShoppingCart({ customer_account_sid, product_sid, item });
        return await this.addItemToShoppingCart({ customer_account_sid, item });
    }
};

module.exports = ShoppingCartCacheRepository;