const CrudService = require("./CrudService");
const ProductRepository = require("../repository/ProductRepository");
const PartnerRepository = require("../repository/PartnerRepository");
const PartnerNotFoundException = require("../exceptions/PartnerNotFoundException");
const CategoryRepository = require("../repository/CategoryRepository");
const CategoryNotFoundException = require("../exceptions/CategoryNotFoundExcption");
const PartnerAccountRepository = require("../repository/PartnerAccountRepository");
const PartnerAccountNotFoundException = require("../exceptions/PartnerAccountNotFoundException");

// Repository
const productRepository = new ProductRepository();
const partnerRepository = new PartnerRepository();
const partnerAccountRepository = new PartnerAccountRepository();
const categoryRepository = new CategoryRepository();


class ProductService extends CrudService {
    constructor() {
        super(productRepository, "PD")
    }

    async insert({ values}) {
        const [partner_account_sid, category_sid, name, description, price, stock] = values;

        const partner_account = await partnerAccountRepository.findById({ value: partner_account_sid });

        if (!partner_account) {
            throw new PartnerAccountNotFoundException(partner_account_sid);
        }
        const { partner_sid } = partner_account;
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