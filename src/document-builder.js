exports.createTransactionDocument = function(request) {
    let document = {};

    // date
    if (request.hasOwnProperty('Date')) {
        document.Date = param.Date;
    } else {
        document.Date = (Date.now()) / 1000;
    }

    // expense or income
    if (request.Amount >= 0) {
        document.Store = 'N/A';
        document.WE = 'N/A';
    } else {
        document.Store = request.Store;
        document.WE = request.WE;
    }

    document.Category = request.Category;
    document.Amount = request.Amount;
    document.Description = request.Description;

    return document;
};
