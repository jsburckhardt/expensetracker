let config = {};

config.connection = {};
config.connection.endpoint = 'https://cdb0000001.documents.azure.com:443/';
config.connection.authKey = 'usA1lH4N03EVAKynQUksGpCHoB2MDX8IrwBsHkz80ZinwMtrQ1PEwnEuumt9gGU2nO9tthHqZMZyMl2tfQ1lfg==';
config.databaseId = 'expensetrackerdb';
config.collectionId = 'expensetrackercollection';
config.collectionCategoryId = {
    id: 'categorycollection',
};
config.documents = {
    'id': 'options',
    'categories': [
        'Alcohol',
        'Avanade',
        'Baby',
        'Clothing',
        'Daily Expenses',
        'Gift',
        'Gift Cards',
        'GU Health',
        'Health',
        'Home',
        'House',
        'Interest',
        'Medicare',
        'Others',
        'Per Diem',
        'Pleasure',
        'Rent',
        'Salary',
        'Savings',
        'Tax Return',
        'Transport',
        'University',
        'Utilities',
        'Visa',
    ],
};

module.exports = config;
