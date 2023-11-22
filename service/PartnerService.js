const CrudService = require("./CrudService");
const PartnerRepository = require("../repository/PartnerRepository");
const PartnerAccountService = require("./PartnerAccountService");
const { generateToken, SECRET } = require("../utils/tokenUtils");

// Service
const partnerAccountService = new PartnerAccountService();

// Repository
const partnerRepository = new PartnerRepository();

class PartnerService extends CrudService {

    constructor() {
        super(partnerRepository, "PR");
    }

    async insert({ values }) {

        const [ name, phone_number, email, address, password ] = values;

        const sid = await super.insert({ values: [name, phone_number, email, address ]});

        const account_sid = await partnerAccountService.insert({
            values: [sid, password]
        })

        return { sid, account_sid };
    }

    async login({
        email,
        phone_number,
        password
    }) {
        const partner = await partnerRepository.findByEmail({ email });

        if (!partner) {
            throw new PartnerNotFoundException(email);
        }

        const { sid } = partner;

        const { sid: account_sid, password: actual_password } = await partnerAccountService.findByPartnerSid({ partner_sid: sid });

        if (!actual_password || actual_password !== password) {
            return {
                valid: false,
                message: "Inalid credentials"
            }
        }

        const token = generateToken({
            account_sid,
            secret: SECRET,
        })

        return {
            valid: true,
            account_sid,
            token
        }
    }


}

module.exports = PartnerService;