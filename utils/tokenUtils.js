const jwt = require("jsonwebtoken");


const generateCustomerToken = ({
    customer_sid,
    secret,
    expiry = '30m'
}) => {
    return jwt.sign(
        {
            customer_sid
        },
        secret,
        {
            expiresIn: expiry
        })
};

module.exports = {
    generateCustomerToken
};