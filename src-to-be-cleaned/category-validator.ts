const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');

if (process.argv[2] === undefined) {
    console.log('Failure');
    process.exit(1);
} else {
    category = process.argv[2];
}

const documentUrl = `dbs/${config.databaseId}/colls/${config.collectionCategoryId.id}/docs/options`;
const client = new DocumentDBClient(config.connection.endpoint, {
    masterKey: config.connection.authKey,
});

client.readDocument(documentUrl, (err, result) => {
    if (err) console.log(err);
    else {
        let categories = (result.categories);
        let categoriesToLower = [];
        for (let i = 0; i < categories.length; i++) {
            categoriesToLower.push(categories[i].toLowerCase());
        }
        if (categoriesToLower.includes(category.toLowerCase())) {
            console.log(true);
        } else {
            console.log(false);
        }
    }
});
