const CrudService = require("./CrudService");
const ProductCategoryRepository = require("../repository/ProductCategoryRepository");
const ProductRepository = require("../repository/ProductRepository");
const CategoryRepository = require("../repository/CategoryRepository");
const CategoryService = require("./CategoryService");
const CategoryNotFoundException = require("../exceptions/CategoryNotFoundExcption");

// Repository
const productCategoryRepository = new ProductCategoryRepository();
const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

class ProductCategoryService extends CrudService {

    constructor() {
        super(productCategoryRepository, "PC");
    }

    async insert({ values }) {
        const [product_sid, category_sid] = values;
        const product = await productRepository.findById({ value: product_sid });
        if (!product) {
            throw new ProductNotFoundException(product_sid);
        }

        const category = await categoryRepository.findById({ value: category_sid });
        if (!category) {
            throw new CategoryNotFoundException(category_sid);
        }

        const product_category_sid = await super.insert({ values });
        return { sid: product_category_sid };
    }
};

module.exports = ProductCategoryService;