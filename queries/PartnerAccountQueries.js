const { findAllByColumnQuery } = require("./GenericQueries");

const PARTNER_ACCOUNT_TABLE = "partner_account";

const findByPartnerSidQuery = ({ tableName = PARTNER_ACCOUNT_TABLE }) => 
findAllByColumnQuery({ tableName, colName: "partner_sid"});

module.exports = {
    findByPartnerSidQuery
};