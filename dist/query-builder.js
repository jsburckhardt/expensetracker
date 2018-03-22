"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(values) {
        this.query = this.createSelectQuery(values);
    }
    createSelectQuery(values) {
        if (Object.keys(values).length === 0) {
            let query = 'SELECT * FROM c';
            return query;
        }
        let query = 'SELECT * FROM c WHERE ';
        if (values.hasOwnProperty('start')) {
            query = this.appendCondition(query, `c.Date >= ${(Date.parse(values.start)) / 1000}`);
        }
        if (values.hasOwnProperty('end')) {
            query = this.appendCondition(query, `c.Date <= ${(Date.parse(values.end)) / 1000}`);
        }
        if (values.hasOwnProperty('Amount')) {
            query = this.appendCondition(query, `c.Amount = ${values.Amount}`);
        }
        if (values.hasOwnProperty('Description')) {
            query = this.appendCondition(query, `CONTAINS(LOWER(c.Description),LOWER("${values.Description}"))`);
        }
        return query;
    }
    appendCondition(query, condition, type = 'and') {
        if (query.search(/c\./) != -1) {
            query += ` ${type} `;
        }
        query += condition;
        return query;
    }
}
exports.QueryBuilder = QueryBuilder;
