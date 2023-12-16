const express = require("express");
const ShoppingCartService = require("../service/ShoppingCartService");



const router = express.Router();

const shoppingCartService = new ShoppingCartService();

router.post(`/:customer_account_sid`, async (req, res, next) => {
    try {
        const {
            product_sid,
            quantity,
        } = req.body;
    
        const {
            customer_account_sid
        } = req.params;
        const shopping_cart = await shoppingCartService.addToShoppingCart({
            product_sid,
            quantity,
            customer_account_sid
        });
        return res.status(200).json({ shopping_cart });
    } catch (err) {
        next(err);
    }
});

router.get(`/:customer_account_sid`, async (req, res, next) => {
    try {
        const {
            customer_account_sid
        } = req.params;

        const shopping_cart = await shoppingCartService.getShoppingCart({ customer_account_sid });
        return res.status(200).json({ shopping_cart });

    } catch(err) {
        next(err);
    }
});

module.exports = router;