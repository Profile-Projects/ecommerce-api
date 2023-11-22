
class TokenInvalidException extends Error {

    constructor(account_sid) {
        super(`Token for account ${account_sid} is not valid`);
        this.account_sid = account_sid;
    }
};

module.exports = TokenInvalidException;