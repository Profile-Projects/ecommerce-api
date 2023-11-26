const db = require("../db/db");
const CrudRepository = require("./CrudRepository");

const tableName = "product_category";
const columns = ["sid", "product_sid", "category_sid"];


class ProductCategoryRepository extends CrudRepository{

    constructor() {
        super(tableName, columns, "sid");
    }


};

module.exports = ProductCategoryRepository;