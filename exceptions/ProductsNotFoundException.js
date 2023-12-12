class PartnersNotFoundException extends Error {
    constructor() {
        super(`Partners not found for provided search params`);
    }
}

module.exports = PartnersNotFoundException;