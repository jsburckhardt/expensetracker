export interface IPostRequest {
    date?: string
    store?: string
    category?: string
    amount?: number
    we?: string
    description?: string
}

export interface IPostValidated {
    exception: string
    validation: boolean
}

export class DocumentValidator {
    public validator: IPostValidated

    constructor(values: IPostRequest) {
        this.validator = this.validateDocument(values)
    }

    private validateDocument(values: IPostRequest) {
        let validationResult: IPostValidated = {
            exception: '',
            validation: true
        }
        const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/;
        if (typeof values.date !== 'undefined') {
            if (!(values.date).match(re)) {
                validationResult.exception = 'Date isn\'t in ISO8601 format e.g. 2018-02-16T10:22:57Z';
                validationResult.validation = false;
                return validationResult
            }
        }

        // amount
        if (typeof values.amount === 'undefined' || typeof values.amount !== 'number') {
            validationResult.exception = 'Missing Amount property or not a number';
            validationResult.validation = false;
            return validationResult
        }

        // Category, description, 
        let categories = ['Alcohol', 'Avanade', 'Baby', 'Clothing', 'Daily Expenses', 'Gift', 'Gift Cards', 'GU Health', 'Health', 'Home', 'House', 'Interest', 'Medicare', 'Others', 'Per Diem', 'Pleasure', 'Rent', 'Salary', 'Savings', 'Tax Return', 'Transport', 'University', 'Utilities', 'Visa'];
        if ((typeof values.category === 'undefined' || typeof values.description === 'undefined' || !(categories.includes(values.category)))) {
            validationResult.exception = 'Missing Category or Description in request. Or the category doesn\'t exist';
            validationResult.validation = false;
            return validationResult
        }

        // store, WE
        if (values.amount <= 0 && (typeof values.store === 'undefined' || typeof values.we === 'undefined')) {
            validationResult.exception = 'Missing Store or WE in request. Or WE isn\'t a boolean';
            validationResult.validation = false;
            return validationResult
        }
        return validationResult
    }

}
