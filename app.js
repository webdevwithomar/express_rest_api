'use strict';

// load modules
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bodyParser = require('body-parser');
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// routes
app.use(routes);

// setup morgan which gives us http request logging
app.use(logger('dev'));

// body-parser
app.use(bodyParser.json());

// setup morgan which gives us http request logging
app.use(logger('dev'));

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restapi');

const db = mongoose.connection;

db.on("error", function (err) {
  console.error("connection error:", err);
});

db.once("open", function () {
  console.log("db connection successful");
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
