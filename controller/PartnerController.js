const express = require("express");
const PartnerService = require("../service/PartnerService");

const router = express.Router();

const partnerService = new PartnerService();


router.post(`/`, async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone_number,
            password,
            address
        } = req.body;

        const {sid, partner_account_sid } = await partnerService.insert({
            values: [name, phone_number, email, address]
        });

        return res.status(201).json({ sid, account_sid: partner_account_sid, message: "Partner Created!" });
    } catch(err) {
        next(err);
    }
});

module.exports = router;