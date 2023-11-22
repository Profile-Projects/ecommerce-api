
class TokenExpiredException extends Error {

    constructor(account_sid) {
        super(`Token for account ${account_sid} has expired`);
    }
}

module.exports = TokenExpiredException;