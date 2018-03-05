const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');
const documentBuilder = require('./document-builder');

let param;

if (process.argv[2] === undefined) {
    console.log('Failure');
    process.exit(1);
} else {
    console.log('Success');
    param = JSON.parse(process.argv[2]);
}

const collLink = `dbs/${config.databaseId}/colls/${config.collectionId}`;
const client = new DocumentDBClient(config.connection.endpoint, {
    masterKey: config.connection.authKey,
});

let transaction = documentBuilder.createTransactionDocument(param);
client.createDocument(collLink, transaction, (err, created) => {
    if (err) console.log(err);
});
