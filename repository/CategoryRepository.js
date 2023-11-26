const db = require("../db/db");
const { findByEmailQuery } = require("../queries/CustomerQueries");
const CrudRepository = require("./CrudRepository");

const tableName = "category";
const columns = ["sid", "name", "path"];

class CategoryRepository extends CrudRepository {

    constructor() {
        super(tableName, columns, "sid");
    }
    
    // async insert({ values}) {
    //     return await super.insert({values: this.format(values)});
    // }

    // format([ sid, name, phone_number, email, address]) {
    //     return [sid, name, phone_number, email, JSON.stringify(address)];
    // }
}

module.exports = CategoryRepository;