
class CustomerNotFoundException extends Error{
    constructor(email) {
        super(`Customer ${email} not found`);
        this.customerSid = customerSid;
    }
}

module.exports = CustomerNotFoundException;