export interface IDocument {
    date?: number
    store?: string
    category?: string
    amount?: number
    we?: string
    description?: string
}

export class DocumentBuilder {
    public document: IDocument

    constructor(values: object) {
        this.document = this.createDocument(values)
    }

    private createDocument(values: object) {
        let doco: IDocument = {
            date: 12354,
            store: "something",
            category: "category",
            amount: 123456,
            we: "yes",
            description: "description"
        }
        return doco
    }
}