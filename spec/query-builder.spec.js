const qb = require('../src/query-builder');

describe('Query builder: createSelectQuery', function() {
    it('should return error when value is empty', function() {
        let r = qb.createSelectQuery({});
        expect(r).toBe('SELECT * FROM c');
    });

    it('should be able to handle "start"', function() {
        let r = qb.createSelectQuery({start: '2018-03-05T05:40:16+00:00'});
        expect(r).toBe('SELECT * FROM c WHERE c.Date >= 1520228416');
    });

    it('should be able to handle "end"', function() {
        let r = qb.createSelectQuery({end: '2018-03-05T05:43:01+00:00'});
        expect(r).toBe('SELECT * FROM c WHERE c.Date <= 1520228581');
    });

    it('should be able to handle "start" and "end"', function() {
        let r = qb.createSelectQuery({start: '2018-03-05T05:40:16+00:00', end: '2018-03-05T05:43:01+00:00'});
        expect(r).toBe('SELECT * FROM c WHERE c.Date >= 1520228416 and c.Date <= 1520228581');
    });
});
