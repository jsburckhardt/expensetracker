import express from 'express'
import morgan from 'morgan'

const app = express();
app.use(morgan('combined'))

// GET /transactions?q={}
const query = require('./query');
app.get('/transactions', query.queryHandler);

//app.post('/transactions',ingest.)
import * as bodyparser from 'body-parser'
const jsonParser = bodyparser.json()
const ingest = require('./ingest');
app.post('/transactions',jsonParser,ingest.queryHandler)

app.listen(8122);
