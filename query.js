const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('./config');

function appendCondition(query, condition, type = 'and') {
    if (query.search(/c\./) != -1) {
        query += ` ${type} `;
    }
    query += condition;
    return query;
}

function createQuery(request) {
    let values = JSON.parse(request);

    let query = 'SELECT * FROM c WHERE ';
    if (values.hasOwnProperty('start')) {
        query = appendCondition(query, `c.Date >= ${(Date.parse(values.start))/1000}`);
    }
    if (values.hasOwnProperty('end')) {
        query = appendCondition(query, `c.Date <= ${(Date.parse(values.end))/1000}`);
    }
    if (values.hasOwnProperty('Amount')) {
        query = appendCondition(query, `c.Amount == ${values.Amount}`);
    }
    return query;
}

let param;

if (typeof process.argv[2] === 'undefined') {
    console.error('Failure');
    process.exit(1);
} else {
    console.log('Success');
    param = process.argv[2];
}

let queryString = createQuery(param);
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
