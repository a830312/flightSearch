require('isomorphic-fetch');
require('es6-promise').polyfill();

const express = require('express');
const app = express();
const api = require('./api/');
const validateQuery = require('./middleware/validateQuery')
const { paramWhiteList } = require('./config')
const { sanitizeQuery } = require('express-validator/filter')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
  Simple flight search api wrapper.

  TODO: client should provide params

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', validateQuery, (req, res) => {
  // TODO client to provide params
  // check in api docs what client should provide
  console.log(req.query)
  //res.send('done')
  api.livePricing.search(req.query)
  .then((results) => {
    // TODO - a better format for displaying results to the client
    console.log('TODO: transform results for consumption by client');
    res.json(results);
  })
  .catch(console.error);
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});