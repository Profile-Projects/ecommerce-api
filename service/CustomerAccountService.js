const CustomerAccountNotFoundException = require("../exceptions/CustomerAccountNotFoundException");
const CustomerAccountRepository = require("../repository/CustomerAccountRepository");
const CrudService = require("./CrudService");

const customerAccountRepository = new CustomerAccountRepository();

class CustomerAccountService extends CrudService {
    
    constructor() {
        super(customerAccountRepository, "CA");
    }

    async findByCustomerSid({ customer_sid }) {
        const account = await customerAccountRepository.findByCustomerSid({ customer_sid });
        if (!account) {
            throw new CustomerAccountNotFoundException(customer_sid);
        }
        return account;
    }
};

module.exports = CustomerAccountService;