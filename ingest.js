/*jshint esversion: 6 */

//FUNCTION TO PROCESS THE REQUEST
function processRequest(request) {
    //date
    if (request.hasOwnProperty('Date')) {
        document.Date = param.Date;
    } else {
        document.Date = (Date.now()) / 1000;
    }

    //expense or income
    if (request.Amount >= 0) {
        document.Store  = "N/A";
        document.WE     = "N/A";
    } else {
        document.Store  = request.Store;
        document.WE     = request.WE;
    }

    document.Category       = request.Category;
    document.Amount         = request.Amount;
    document.Description    = request.Description;

    return document;
};




var DocumentDBClient    = require('documentdb').DocumentClient;
var config              = require('./config');
var fs                  = require('fs');
var async               = require('async');
var databaseId          = config.databaseId;
var collectionId        = config.collectionId;
var host                = config.connection.endpoint;
var masterKey           = config.connection.authKey;
var dbLink              = 'dbs/' + databaseId;
var collLink            = dbLink + '/colls/' + collectionId;
var client              = new DocumentDBClient(host, {
    masterKey: masterKey
});
var document = {}
if (process.argv[2] === undefined) {
    console.log('Failure');
    process.exit(1);
} else {
    console.log('Success');
    var param = JSON.parse(process.argv[2]);
}

var transaction = processRequest(param)

console.log(transaction)

client.createDocument('dbs/expensetrackerdb/colls/expensetrackercollection',document, (err, created) => {
    if (err) console.log(err)
    //else resolve(created);
});