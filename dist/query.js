"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentdb_1 = require("documentdb");
const query_builder_1 = require("./query-builder");
const queryHandler = (req, res) => {
    const query = req.query.q || '{}';
    const queryString = new query_builder_1.QueryBuilder(JSON.parse(query)).query;
    const documentQuery = {
        query: queryString,
        parameters: []
    };
    const collLink = `dbs/${process.env.DDB_DB_ID}/colls/${process.env.DDB_DB_COLLECTION_ID}`;
    const client = new documentdb_1.DocumentClient(process.env.DDB_ENDPOINT || '', {
        masterKey: process.env.DDB_AUTHKEY,
    });
    client.queryDocuments(collLink, documentQuery).toArray((err, results) => {
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        if (results.length == 0) {
            res.status(404);
            res.send([]);
            return;
        }
        res.status(200);
        res.send(results);
    });
};
module.exports = { queryHandler };
