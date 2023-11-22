const db = require("../db/db");
const { findByPartnerSidQuery } = require("../queries/PartnerAccountQueries");

const CrudRepository = require("./CrudRepository");

const tableName = "partner_account";
const columns = ["sid", "partner_sid", "password"];

class PartnerAccountRepository extends CrudRepository {

    constructor() {
        super(tableName, columns, "sid");
    }

    async findByPartnerSid({ partner_sid }) {
        const query = findByPartnerSidQuery({});
        const result = await db.query(query, [partner_sid], false);
        return this.getRow(result);
    }


    // format([ sid, name, phone_number, email, address]) {
    //     return [sid, name, phone_number, email, JSON.stringify(address)];
    // }

    // parse(partner) {
    //     const {
    //         address,
    //         ...remaining
    //     } = partner;
    //     return {
    //         ...remaining,
    //         address: JSON.parse(address)
    //     }
    // }

};

module.exports = PartnerAccountRepository;