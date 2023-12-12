const jwt = require("jsonwebtoken");
const TokenExpiredException = require("../exceptions/TokenExpiredException");
const TokenInvalidException = require("../exceptions/TokenInvalidException");

const SECRET = "secret";


const generateToken = ({
    account_sid,
    secret,
    expiry = '120m'
}) => {
    return jwt.sign(
        {
            account_sid
        },
        secret,
        {
            expiresIn: expiry
        })
};

const validateToken = (
    req,
    res, 
    next
) => {
    try {

        const token = req.headers['account_token'];
        const account_sid = req.headers['account_sid'];

        if (!token) {
            throw new TokenNotFoundOnHeaderException();
        }

        const decoded = jwt.decode(token, SECRET);

        const expirationTime = decoded.exp;
        const expirationTimeInMilliSeconds = expirationTime * 1000;
        const currentTime = Date.now();

        if (currentTime > expirationTimeInMilliSeconds) {
            throw new TokenExpiredException(account_sid);
        } 

        if (decoded?.account_sid !== account_sid) {
            throw new TokenInvalidException(account_sid);
        }

        req.account_sid = decoded.account_sid;
        next();
    } catch (err) {
        throw new Error(`Error on Token decoding. ${err?.message}`);
    }
};

module.exports = {
    generateToken,
    validateToken,
    SECRET
};