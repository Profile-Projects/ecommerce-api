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

    async findAll({ req }) {
        const cols = [];
        const values = [];

        if (req['partner_account_sid']) {
            cols.push('partner_account_sid');
            values.push(req.partner_account_sid);
        }

        if (req['category_sid']) {
            cols.push('category_sid');
            values.push(req['category_sid']);
        }

        if (req['in_stock'] !== undefined) {
            cols.push('in_stock');
            values.push(req['in_stock']);
        }
        const products = await productRepository.findProducts({ cols, values }) || [];

        if (req['min_price'] || req['max_price']) {
            const min = parseInt(req['min_price']);
            const max = parseInt(req['max_price']);
            const minFiltered = min ? products.filter(product => product.price >= min) : products;
            return max ? minFiltered.filter(product => product.price <= max) : minFiltered;
            }
        return products;
    }


};

module.exports = ProductService;