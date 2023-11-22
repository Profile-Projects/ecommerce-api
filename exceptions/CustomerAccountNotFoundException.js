
class CustomerAccountNotFoundException extends Error{
    constructor(customer_sid) {
        super(`Account not found for Customer with id ${customer_sid}`);
        this.customerSid = customerSid;
    }
}

module.exports = CustomerAccountNotFoundException;