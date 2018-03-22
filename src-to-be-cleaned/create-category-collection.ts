const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');

const client = new DocumentDBClient(config.connection.endpoint, {
    masterKey: config.connection.authKey,
});

client.createCollection(`dbs/${config.databaseId}`, config.collectionCategoryId, {offerThroughput: 400}, (err, created) => {
    if (err) console.log(err);
    else console.log(created.id);
});
