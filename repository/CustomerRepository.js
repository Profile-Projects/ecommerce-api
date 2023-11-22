const db = require("../db/db");
const { findByEmailQuery } = require("../queries/CustomerQueries");
const CrudRepository = require("./CrudRepository");

const tableName = "customer";
const columns = ["sid", "phone_number", "email", "address"];

class CustomerRepository extends CrudRepository {

    constructor() {
        super(tableName, columns, "sid");
    }
    
    async insert({ values}) {
        return await super.insert({values: this.format(values)});
    }

    async findByEmail({ email }) {
        const query = findByEmailQuery({});
        const result = await db.query(query, [email]);
        return this.getRow(result);
    }

    format([ sid, phone_number, email, address]) {
        return [sid, phone_number, email, JSON.stringify(address)];
    }
}

module.exports = CustomerRepository;