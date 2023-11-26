const CrudService = require("./CrudService");
const CategoryRepository = require("../repository/CategoryRepository");

// Repository
const categoryRepository = new CategoryRepository();

class CategoryService extends CrudService {

    constructor() {
        super(categoryRepository, "CT");
    }

};

module.exports = CategoryService;