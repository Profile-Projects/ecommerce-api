const { findAllByColumnQuery } = require("./GenericQueries");

const CUSTOMER_ACCOUNT_TABLE = "customer_account";


const findByCustomerSidQuery = ({ tableName = CUSTOMER_ACCOUNT_TABLE }) =>
    findAllByColumnQuery({ tableName, colName: "customer_sid"});

module.exports = {
    findByCustomerSidQuery
}