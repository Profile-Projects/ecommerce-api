const db = require("../db/db");

const CrudRepository = require("./CrudRepository");

const tableName = "product";
const columns = ["sid", "partner_sid", "category_sid", "name", "description", "price", "stock"];

class ProductRepository extends CrudRepository {
    constructor() {
        super(tableName, columns, "sid");
    }

    // format([sid, partner_sid, category_sid, name, description, price, stock, created_at, updated_at]) {
    //     return 
    // }
}

module.exports = ProductRepository;