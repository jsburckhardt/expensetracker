function appendCondition(query, condition, type = 'and') {
    if (query.search(/c\./) != -1) {
        query += ` ${type} `;
    }
    query += condition;
    return query;
}

function createSelectQuery(values) {
    if (Object.keys(values).length === 0) {
        let query = 'SELECT * FROM c';
        return query;
    }
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

exports.createSelectQuery = createSelectQuery;
exports.appendCondition = appendCondition;
