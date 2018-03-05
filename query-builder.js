exports.appendCondition = function(query, condition, type = 'and') {
    if (query.search(/c\./) != -1) {
        query += ` ${type} `;
    }
    query += condition;
    return query;
};

exports.createSelectQuery = function(request) {
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
};
