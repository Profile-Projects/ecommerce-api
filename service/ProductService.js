const CrudService = require("./CrudService");
const ProductRepository = require("../repository/ProductRepository");
const PartnerRepository = require("../repository/PartnerRepository");
const PartnerNotFoundException = require("../exceptions/PartnerNotFoundException");
const CategoryRepository = require("../repository/CategoryRepository");
const CategoryNotFoundException = require("../exceptions/CategoryNotFoundExcption");

// Repository
const productRepository = new ProductRepository();
const partnerRepository = new PartnerRepository();
const categoryRepository = new CategoryRepository();


class ProductService extends CrudService {
    constructor() {
        super(productRepository, "PD")
    }

    async insert({ values}) {
        const [partner_sid, category_sid, name, description, price, stock] = values;

        const partner = await partnerRepository.findById({ value: partner_sid });

        if (!partner) {
            throw new PartnerNotFoundException(partner_sid);
        }

        const category = await categoryRepository.findById({ value: category_sid });
        if (!category) {
            throw new CategoryNotFoundException(category_sid);
        }
        return await super.insert({ values });
    }


};

module.exports = ProductService;