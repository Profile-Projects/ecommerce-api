const CustomerNotFoundException = require("../exceptions/CustomerNotFoundException");
const CustomerRepository = require("../repository/CustomerRepository");
const { generateCustomerToken } = require("../utils/tokenUtils");
const CrudService = require("./CrudService");
const CustomerAccountService = require("./CustomerAccountService");

// Service
const customerAccountService = new CustomerAccountService();

// Repository
const customerRepository = new CustomerRepository();

class CustomerService extends CrudService {
    
    constructor() {
        super(customerRepository, "CS");
    }

    async insert({ values }) {

        const [phone_number, email, address, password] = values;
        const sid = await super.insert({ values: [phone_number, email, address] });
        const account_sid = await customerAccountService.insert({
            values: [sid, password]
        });
        return { sid, account_sid};
    }

    async login({ email, phone_number, password }) {
        const customer = await customerRepository.findByEmail({email});
        if (!customer) {
            throw new CustomerNotFoundException(email);
        }
        const { sid } = customer;

        const account = await customerAccountService.findByCustomerSid({
            customer_sid: sid
        });

        // TODO if actual password is wrong add exception
        const { password: actual_password } = account;

        if (!actual_password || actual_password !== password) {
            return {
                valid: false,
                message: "Customer password is invalid"
            };
        }

        // token generation
        const token = generateCustomerToken({
            customer_sid: sid,
            secret: "secret",
        });

        return {
            valid: true,
            token
        }
    }
};

module.exports = CustomerService;