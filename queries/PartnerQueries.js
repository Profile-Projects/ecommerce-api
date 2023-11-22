const { findAllByColumnQuery } = require("./GenericQueries");

const PARTNER_TABLE = "partner";
const findByEmailQuery = ({ tableName = PARTNER_TABLE}) => findAllByColumnQuery({ tableName, colName: "email"});

module.exports = {
    findByEmailQuery
};