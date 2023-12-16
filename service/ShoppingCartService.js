const CustomerAccountRepository = require("../repository/CustomerAccountRepository");
const CustomerRepository = require("../repository/CustomerRepository");
const ProductRepository =  require("../repository/ProductRepository");
const ShoppingCartCacheRepository = require("../repository/ShoppingCardCacheRepository");

const customerAccountRepository = new CustomerAccountRepository();
const productRepository = new ProductRepository();
const cusotmerRepository = new CustomerRepository();

class ShoppingCartService {

    constructor() {
        this.repository = new ShoppingCartCacheRepository();
    }

    async addToShoppingCart({ product_sid, quantity, customer_account_sid }) {
        const product = await productRepository.findById({ value: product_sid });
        if (!product) return;
        const { sid, stock } = product;
        if (stock < quantity) return;

        const customer_account = await customerAccountRepository.findById({ value: customer_account_sid });
        if (!customer_account) return;
        const exists = await this.repository.checkShoppingCartExists({ customer_account_sid });
        if (!exists) {
            return await this.repository.addShoppingCartForCustomer({ customer_account_sid });
        }

        return await this.repository.updateOrInsertShoppingCartItem({customer_account_sid, item: { product_sid, quantity }});
    }

    async getShoppingCart({ customer_account_sid }) {
        const shopping_cart = await this.repository.getShoppingCart({ customer_account_sid });
        return shopping_cart;
    }
};

module.exports= ShoppingCartService;