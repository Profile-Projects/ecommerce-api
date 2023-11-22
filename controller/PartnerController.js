const express = require("express");
const PartnerService = require("../service/PartnerService");
const { DEFAULT_PASSWORD } = require("../utils/passwordUtils");
const { validateToken } = require("../utils/tokenUtils");

const router = express.Router();

const partnerService = new PartnerService();

router.post(`/login`, async (req, res, next) => {
    try {

        const {
            email,
            phone_number,
            password
        } = req.body;

        const { valid, message, token, account_sid } = await partnerService.login({ email, phone_number, password });

        if (!valid) {
            return res.status(400).json({ message })
        }

        return res.status(200).json({ message: "Partner logged in!", token, account_sid });
    } catch(err) {
        next(err);
    }
});


router.post(`/logout`, validateToken, async (req, res, next) => {
    try {
        return res.status(200).json({ message: "Partner logged out!"});
    } catch(err) {
        next();
    }
});


router.post(`/`, async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone_number,
            password=DEFAULT_PASSWORD,
            address
        } = req.body;

        const {sid, account_sid } = await partnerService.insert({
            values: [name, phone_number, email, address, password]
        });

        return res.status(201).json({ sid, account_sid, message: "Partner Created!" });
    } catch(err) {
        next(err);
    }
});

module.exports = router;