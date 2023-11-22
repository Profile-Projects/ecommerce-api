const CrudService = require("./CrudService");
const PartnerRepository = require("../repository/PartnerRepository");

// Repository
const partnerRepository = new PartnerRepository();

class PartnerService extends CrudService {

    constructor() {
        super(partnerRepository, "PR");
    }

    async insert({ values }) {

        const [ name, phone_number, email, address ] = values;

        const sid = await super.insert({ values: [name, phone_number, email, address ]});

        return { sid };
    }


}

module.exports = PartnerService;