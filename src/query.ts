import { DocumentClient, DocumentQuery } from 'documentdb'
import { Request, Response } from 'express'
import { QueryBuilder } from './query-builder'


const queryHandler = (req: Request, res: Response) => {
    const query = req.query.q || '{}';
    const queryString = new QueryBuilder(JSON.parse(query)).query;

    const documentQuery: DocumentQuery = {
        query: queryString,
        parameters: []
    };
    const collLink = `dbs/${process.env.DDB_DB_ID}/colls/${process.env.DDB_DB_COLLECTION_ID}`;
    const client = new DocumentClient(process.env.DDB_ENDPOINT || '', {
        masterKey: process.env.DDB_AUTHKEY,
    });

    client.queryDocuments(collLink, documentQuery).toArray((err, results) => {
        if (err) {
            res.status(500)
            res.send(err)
            return
        }
        if (results.length == 0) {
            res.status(404)
            res.send([])
            return
        }
        res.status(200)
        res.send(results)
    });
};

module.exports = {queryHandler};
