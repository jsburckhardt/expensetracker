/*jshint esversion: 6 */

function createQuery(request){
    let query = "SELECT * FROM c WHERE ";
    let values = JSON.parse(request);

    if(values.hasOwnProperty('start')){
        if(query.search(/c\./) != -1){
            query += ' and ';
        }
        query += `c.Date >= ${(Date.parse(values.start))/1000}`;
    }
    if(values.hasOwnProperty('end')){
        if(query.search(/c\./) != -1){
            query += ' and ';
        }
        query += `c.Date <= ${(Date.parse(values.end))/1000}`;
    }
    if(values.hasOwnProperty('Amount')){
        if(query.search(/c\./) != -1){
            query += ' and ';
        }
        query += `c.Amount == ${values.Amount}`;
    }
    return query;
};

var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var fs = require('fs');
var async = require('async');
var databaseId = config.databaseId;
var collectionId = config.collectionId;
var host = config.connection.endpoint;
var masterKey = config.connection.authKey;
var dbLink = 'dbs/' + databaseId;
var collLink = dbLink + '/colls/' + collectionId;
var client = new DocumentDBClient(host, {
    masterKey: masterKey
});

if(process.argv[2] === undefined){
    console.log('Failure'); 
    process.exit(1);  
} else {
    console.log('Success');
    var param = process.argv[2];
}



let queryString = createQuery(param);
console.log(queryString);
var querySpec = {
    query: queryString
    //parameters: [
    //    {
    //        name: '@Id',
    //        value: "test"
    //    }
    //]
};
//console.log(querySpec.query);
//console.log(querySpec.parameters[0].value);   



client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
    if (err) {
        handleError(err);
    } else if (results.length == 0) {
        throw ("No documents found matching");

    } else {
        for (var j = 0; j < results.length; j++) {
            console.log(results[j].Amount +" " +results[j].Description);
        }
    }
})