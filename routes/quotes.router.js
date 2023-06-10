const express = require('express');
const { getQuotes, addQuote, updateQuote, deleteQuote, getQuotesById } = require('../controllers/quotes.controller');
const {validateToken} = require('../config/uservalidation')

const router = express.Router();

router.get('/quotes',validateToken, getQuotes);

router.get('/quotes/:quoteId',validateToken, getQuotesById);

router.post('/quotes',validateToken, addQuote);

router.put('/quotes/:quoteId',validateToken, updateQuote);

router.delete('/quotes/:quoteId',validateToken, deleteQuote);


module.exports = router;