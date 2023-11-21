
const express = require("express");
const CustomerService = require("../service/CustomerService");

const router = express.Router();
const customerService = new CustomerService();
router.post(`/`, async (req, res, next) => {
    try {

        const {
            phone_number = null,
            email = null,
            address
        } = req.body;

        const sid = await customerService.insert({
            values: [phone_number, email, address]
        });
        
        return res.status(201).json({ sid, message: "Customer created!"})

    } catch(err) {
        next(err);

    }
});

module.exports = router;