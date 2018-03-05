const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('./config');

function processRequest(request) {
    let document = {};

    // date
    if (request.hasOwnProperty('Date')) {
        document.Date = param.Date;
    } else {
        document.Date = (Date.now()) / 1000;
    }

    // expense or income
    if (request.Amount >= 0) {
        document.Store = 'N/A';
        document.WE = 'N/A';
    } else {
        document.Store = request.Store;
        document.WE = request.WE;
    }

    document.Category = request.Category;
    document.Amount = request.Amount;
    document.Description = request.Description;

    return document;
};

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

let transaction = processRequest(param);
client.createDocument(collLink, transaction, (err, created) => {
    if (err) console.log(err);
});
