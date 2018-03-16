const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');
const queryBuilder = require('./query-builder');

let param;

if (typeof process.argv[2] === 'undefined') {
    console.error('Fail - no arguments included');
    process.exit(1);
} else {
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


function updateStringtoNumberDoc(document) {
    let documentUrl = `${collLink}/docs/${document.id}`;
    console.log(`Replacing document:\n${document.Amount}\n`);
    let temp = parseFloat(document.Amount);
    document.Amount = temp;

    //return new Promise((resolve, reject) => {
    client.replaceDocument(documentUrl, document, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            // console.log(typeof document.Amount);
        }
    });
    //});
};


client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
    if (err) {
        handleError(err);
    } else if (results.length == 0) {
        console.error('No documents found matching');
    } else {
        for (let j = 0; j < results.length; j++) {
            // updateStringtoNumberDoc(results[j]);
            if (typeof results[j].Amount === 'string') console.log(results[j].Amount + ' ' + typeof results[j].Amount);
        }
    }
});
