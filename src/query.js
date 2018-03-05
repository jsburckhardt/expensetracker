const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');
const queryBuilder = require('./query-builder');

let param;

if (typeof process.argv[2] === 'undefined') {
    console.error('Failure');
    process.exit(1);
} else {
    console.log('Success');
    param = process.argv[2];
}

let queryString = queryBuilder.createSelectQuery(JSON.parse(param));
let querySpec = {
    query: queryString,
};

const collLink = `dbs/${config.databaseId}/colls/${config.collectionId}`;
const client = new DocumentDBClient(config.connection.endpoint, {
    masterKey: config.connection.authKey,
});

client.queryDocuments(collLink, querySpec).toArray(function(err, results) {
    if (err) {
        handleError(err);
    } else if (results.length == 0) {
        console.error('No documents found matching');
    } else {
        for (let j = 0; j < results.length; j++) {
            console.log(results[j].Amount + ' ' + results[j].Description);
        }
    }
});
