import express from 'express'
import morgan from 'morgan'

const app = express();
const query = require('./query');

app.use(morgan('combined'))

// GET /transactions?q={}
app.get('/transactions', query.queryHandler);

app.post('/transactions',ingest.)

app.listen(8122);
