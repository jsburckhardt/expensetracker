const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');

const collLink = `dbs/${config.databaseId}/colls/${config.collectionCategoryId.id}`;
const client = new DocumentDBClient(config.connection.endpoint, {
    masterKey: config.connection.authKey,
});

client.createDocument(collLink, config.documents, (err, created) => {
    if (err) console.log(err);
    else console.log(created);
});
