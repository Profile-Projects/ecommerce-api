
class TokenNotFoundOnHeaderException extends Error {

    constructor(){
        super(`account-token is not found on the API request`);
    }
}