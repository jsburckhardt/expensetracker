import { DocumentClient, DocumentQuery } from 'documentdb'
import { Request, Response } from 'express'
import { DocumentBuilder } from './document-builder'
import { DocumentValidator } from './document-validator'


const queryHandler = (req: Request, res: Response) => {
    const body = req.body || '{}'
    const validatePostBody = new DocumentValidator(body).validator
    if( validatePostBody.validation){
        const newdocument = new DocumentBuilder(body).document;
        res.status(200)
        res.send(body)
    }
    else{
        res.status(400)
        res.send(validatePostBody.exception)
    }
    
};

module.exports = {queryHandler};
