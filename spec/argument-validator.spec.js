const av = require('../src/argument-validator');

describe('Argument validator: argumentValidator', function() {
    it('should be able to work with the following request', function() {
        let r = av.argumentValidator({Date: '2018-02-16T10:22:57Z', Amount: -6, Category: 'house', Description: 'some random test', WE: true, Store: 'Ebay'});
        expect(r).toBe(true);
    });
});
