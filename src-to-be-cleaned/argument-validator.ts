exports.argumentValidator = function(request) {
    const re=/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/;
    if (typeof request.Date !== 'undefined') {
        if (!(request.Date).match(re)) {
            console.error('Date isn\'t in ISO8601 format e.g. 2018-02-16T10:22:57Z');
            return false;
        }
    }

    // amount
    if (typeof request.Amount ==='undefined' || typeof request.Amount !== 'number') {
        console.error('Missing Amount property or not a number');
        return false;
    }

    // Category
    let categories = ['Alcohol', 'Avanade', 'Baby', 'Clothing', 'Daily Expenses', 'Gift', 'Gift Cards', 'GU Health', 'Health', 'Home', 'House', 'Interest', 'Medicare', 'Others', 'Per Diem', 'Pleasure', 'Rent', 'Salary', 'Savings', 'Tax Return', 'Transport', 'University', 'Utilities', 'Visa'];
    if ((typeof request.Category ==='undefined' || typeof request.Description === 'undefined' || !(categories.includes(request.Category)))) {
        console.error('Missing Category or Description in request. Or the category doesn\'t exist');
        return false;
    }

    // store, WE
    if (request.Amount <= 0 && (typeof request.Store === 'undefined' || typeof request.WE ==='undefined' || typeof request.WE !== 'boolean')) {
        console.error('Missing Store or WE in request. Or WE isn\'t a boolean');
        return false;
    }
    return true;
};
