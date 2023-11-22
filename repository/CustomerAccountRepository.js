const db = require("../db/db");
const { findByCustomerSidQuery } = require("../queries/CutomerAccountQueries");
const CrudRepository = require("./CrudRepository");

const tableName = "customer_account";
const columns = ["sid", "customer_sid", "password"];

class CustomerAccountRepository extends CrudRepository {

    constructor() {
        super(tableName, columns, "sid");
    }
    
    // async insert({ values}) {
    //     return await super.insert({values: this.format(values)});
    // }

    // format([ sid, phone_number, email, address]) {
    //     return [sid, phone_number, email, JSON.stringify(address)];
    // }

    async findByCustomerSid({ customer_sid }) {
        const query = findByCustomerSidQuery({});
        const result = await db.query(query, [customer_sid], false);
        return this.getRow(result);
    }
}

module.exports = CustomerAccountRepository;