const db = require("../db/db");

const CrudRepository = require("./CrudRepository");

const tableName = "partner";
const columns = ["sid", "name", "phone_number", "email", "address"];

class PartnerRepository extends CrudRepository {

    constructor() {
        super(tableName, columns, "sid");
    }

    async insert({ values }) {
        return await super.insert({ values: this.format(values)});
    }

    format([ sid, name, phone_number, email, address]) {
        return [sid, name, phone_number, email, JSON.stringify(address)];
    }

    parse(partner) {
        const {
            address,
            ...remaining
        } = partner;
        return {
            ...remaining,
            address: JSON.parse(address)
        }
    }

};

module.exports = PartnerRepository;