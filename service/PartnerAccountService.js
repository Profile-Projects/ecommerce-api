const CustomerAccountNotFoundException = require("../exceptions/CustomerAccountNotFoundException");
const PartnerAccountNotFoundException = require("../exceptions/PartnerAccountNotFoundException");
const PartnerAccountRepository = require("../repository/PartnerAccountRepository");
const CrudService = require("./CrudService");

const partnerAccountRepository = new PartnerAccountRepository();

class PartnerAccountService extends CrudService {
    
    constructor() {
        super(partnerAccountRepository, "PA");
    }

    async findByPartnerSid({ partner_sid }) {
        const account = await partnerAccountRepository.findByPartnerSid({ partner_sid });
        if (!account) {
            throw new PartnerAccountNotFoundException(partner_sids);
        }
        return account;
    }
};

module.exports = PartnerAccountService;