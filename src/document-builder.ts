export interface IDocument {
    Date?: string
    Amount?: number
    Store?: string
    WE?: boolean
    Category?: string
    Description?: string
}

export class DocumentBuilder {
    public document: object

    constructor(param: IDocument) {
        this.document = this.createTransactionDocument(param)
    }

    private createTransactionDocument(param: IDocument) {
        if (param.hasOwnProperty('Date')) {
            document.Date = (Date.parse(param.Date||""))/1000;
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
    }
}


exports.createTransactionDocument = function(request) {
    let document = {};

    // date
    if (request.hasOwnProperty('Date')) {
        document.Date = (Date.parse(request.Date))/1000;
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
