
const express = require("express");
const CustomerService = require("../service/CustomerService");
const CustomerAccountService = require("../service/CustomerAccountService");
const { DEFAULT_PASSWORD } = require("../utils/passwordUtils");

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
    
        const { valid, message, token } = await customerService.login({ email, phone_number, password });

        if (!valid) {
            return res.status(400).json({ message });
        }

        return res.status(200).json({ message: "logged in!", token })

    } catch(err) {
        next(err);
    }
});

router.post(`/`, async (req, res, next) => {
    try {

        const {
            phone_number = null,
            email = null,
            password = DEFAULT_PASSWORD,
            address
        } = req.body;

        const { sid, account_sid } = await customerService.insert({
            values: [phone_number, email, address, password]
        });

        return res.status(201).json({ sid, account_sid, message: "Customer created!"})

    } catch(err) {
        next(err);

    }
});

module.exports = router;