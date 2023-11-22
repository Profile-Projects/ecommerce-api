const { findAllByColumnQuery } = require("./GenericQueries")

const CUSTOMER_TABLE = "customer"
/*********************
 * Fetch Queries
 *********************/
const findByEmailQuery = ({ tableName = CUSTOMER_TABLE }) => findAllByColumnQuery({ tableName, colName: "email"});


module.exports = { 
    findByEmailQuery
}