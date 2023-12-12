const express = require("express");
const ProductService = require("../service/ProductService");
const { validateToken } = require("../utils/tokenUtils");
const CategoryService = require("../service/CategoryService");


const router = express.Router();
const productService = new ProductService();
const categoryService = new CategoryService();

router.post(`/category`, validateToken, async (req, res, next) => {
    try {
        const {
            name,
            path
        } = req.body;

        const category_sid = await categoryService.insert({
            values: [name, path]
        });

        return res.status(201).json({ sid: category_sid, message: "Category is created"});

    } catch(err) {
        next();
    }
});

router.post(`/add`, validateToken, async (req, res, next) => {
    try {
        const {
            name,
            description,
            stock,
            price,
            partner_account_sid,
            category_sid
        } = req.body;

        const product_sid = await productService.insert({
            values: [partner_account_sid, category_sid, name, description, price, stock]
        })

        return res.status(201).json({ sid: product_sid, message: "Product added to partner"});
    } catch(err) {
        next();
    }
});

router.get(`/`, validateToken, async (req, res, next) => {
    try {
        const {
            partner_account_sid,
            category_sid,
            in_stock
        } = req.query;
        
        const products = await productService.findAll({
            req: {
                partner_account_sid,
                category_sid,
                in_stock
            }
        });
        return res.status(200).json({ products });

    } catch (err) {
        next();
    }
})

router.get(`/:product_sid`, validateToken, async (req, res, next) => {
    try {
        const {
            product_sid
        } = req.params;

        const product = await productService.findById({ value: product_sid });
        return res.status(200).json({ product});
    } catch(err) {
        next();
    }
});

module.exports = router;