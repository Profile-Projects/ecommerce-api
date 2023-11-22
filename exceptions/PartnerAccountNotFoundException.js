
class PartnerAccountNotFoundException extends Error{
    constructor(partner_sid) {
        super(`Account not found for Partner with id ${partner_sid}`);
        this.partner_sid = partner_sid;
    }
}

module.exports = PartnerAccountNotFoundException;