const db = require("../db/db");
const { insertQuery, findAllByColumnIdsQuery, fetchByColumnsQuery, findMaxSidQuery } = require("../queries/GenericQueries");


class CrudRepository {

    constructor(tableName, columns) {
        this.tableName = tableName;
        this.columns = columns;
        this.sid = "sid";
    }

    async insert({ values }) { 
        const query = insertQuery(this.tableName, this.columns, values);
        const result = await db.query(query, [...values]);
        return this.getRow(result);
    }

    async findMaxSid() {
        const query = findMaxSidQuery({ tableName: this.tableName, sid: this.sid });
        const result = await db.query(query);
        return this.getRow(result);
    }

    async findByIds({ values}) {
        const query = findByIdsQuery({
            tableName: this.tableName,
            values
        });
        const result = await db.query(query);
        return this.getRows(result);
    }

    async findById({ sid = "sid", value}) {
        const query = findByIdQuery({ tableName: this.tableName, sid });
        const result = await db.query(query, [value]);
        return this.getRow(result);
    };

    async findAll() {
        const query = findAllQuery(this.tableName);
        const result = await db.query(query);

        return this.getRows(result);
    }

    async findAllByColumn({colName, colVal}) {
        const query = findAllByColumnQuery({ tableName: this.tableName, colName });
        const result = await db.query(query, [colVal]);
        return this.getRows(result);
    };

    async findAllByColumnIds({ colName, values }) {
        const query = findAllByColumnIdsQuery({ tableName: this.tableName, colName, values });
        const result = await db.query(query);
        return this.getRows(result);
    };

    async findAllByColumns({ columnObjList }) {
        const query = fetchByColumnsQuery({ tableName: this.tableName, columnObjList });
        const result = await db.query(query);
        return this.getRows(result);
    };
    
    async update({
        sidValue,
        columnsToUpdate,
        values
    }) {
        const query = updateQuery({ 
            tableName: this.tableName, 
            sid: this.sid,
            sidValue, 
            columnsToUpdate
        });

        const { rowCount = 0} = await db.query(query, [sidValue, ...values]);
        return rowCount;
    }

    async delete({ value, sid = "sid" }) {
        const query = deleteQuery({ tableName: this.tableName, sid, value});
        const result = await db.query(query, [value]);
        return this.getRow(result);
    }

    getRow(result) {
        if (result?.rows?.length > 0) {
            return result.rows[0];
        }
        return null;
    };

    getRows(result) {
        if (result?.rows?.length > 0) return result.rows;
        return [];
    };
}

module.exports = CrudRepository;