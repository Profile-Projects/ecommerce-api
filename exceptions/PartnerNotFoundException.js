
class PartnerNotFoundException extends Error {

    constructor(email) {
        super(`Partner ${email} not found`);
        this.partnerSid = partnerSid;
    }
}