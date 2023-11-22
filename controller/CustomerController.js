
const express = require("express");
const CustomerService = require("../service/CustomerService");
const CustomerAccountService = require("../service/CustomerAccountService");
const { DEFAULT_PASSWORD } = require("../utils/passwordUtils");
const { validateToken } = require("../utils/tokenUtils");

const router = express.Router();

// services
const customerService = new CustomerService();
const customerAccountService = new CustomerAccountService();


router.post(`/login`, async (req, res, next) => {
    //  TODO: password should be encrypted while getting
    //  TODO: separate APIs for login by phone number and email
    try {
        const {
            email,
            password,
            phone_number
        } = req.body;
    
        const { valid, message, token, account_sid } = await customerService.login({ email, phone_number, password });

        if (!valid) {
            return res.status(400).json({ message });
        }

        return res.status(200).json({ message: "logged in!", token, account_sid })

    } catch(err) {
        next(err);
    }
});

router.post(`/logout`, validateToken, async (req, res, next) => {
    try {
        return res.status(200).json({ message: "Customer logged out!"});
    } catch(err) {
        next();
    }
});

router.post(`/`, async (req, res, next) => {
    try {

        const {
            name,
            phone_number = null,
            email = null,
            password = DEFAULT_PASSWORD,
            address
        } = req.body;

        const { sid, account_sid } = await customerService.insert({
            values: [name, phone_number, email, address, password]
        });

        return res.status(201).json({ sid, account_sid, message: "Customer created!"})

    } catch(err) {
        next(err);
    }
});

module.exports = router;