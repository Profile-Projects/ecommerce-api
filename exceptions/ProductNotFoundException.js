class ProductNotFoundException extends Error {

    constructor(product_sid) {
        super(`Product not found for ${product_sid}`);
        this.product_sid = product_sid;
    }
};

module.exports = ProductNotFoundException;
