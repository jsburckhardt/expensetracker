/*jshint esversion: 6 */ 
if(process.argv[2] === undefined){
    console.log('Failure'); 
    process.exit(1)  
} 
let query = "SELECT * FROM c WHERE "
let values = JSON.parse(process.argv[2]);

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

console.log(query)