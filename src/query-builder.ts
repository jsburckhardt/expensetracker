export interface IQuery {
    start: string
    end: string
    Amount: number
    Description: string
}

export class QueryBuilder {
    public query: string

    constructor(values: IQuery) {
        this.query = this.createSelectQuery(values)
    }
    
    private createSelectQuery(values: IQuery) {
        if (Object.keys(values).length === 0) {
            let query = 'SELECT * FROM c';
            return query;
        }
        let query = 'SELECT * FROM c WHERE ';
        if (values.hasOwnProperty('start')) {
            query = this.appendCondition(query, `c.Date >= ${(Date.parse(values.start))/1000}`);
        }
        if (values.hasOwnProperty('end')) {
            query = this.appendCondition(query, `c.Date <= ${(Date.parse(values.end))/1000}`);
        }
        if (values.hasOwnProperty('Amount')) {
            query = this.appendCondition(query, `c.Amount = ${values.Amount}`);
        }
        if (values.hasOwnProperty('Description')) {
            query = this.appendCondition(query, `CONTAINS(LOWER(c.Description),LOWER("${values.Description}"))`);
        }
        return query;
    }

    private appendCondition(query: string, condition: string, type: string = 'and') {
        if (query.search(/c\./) != -1) {
            query += ` ${type} `;
        }
        query += condition;
        return query;
    }
}


