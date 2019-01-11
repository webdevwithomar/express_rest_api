'use strict';

const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();
app.use(bodyParser.json());
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

// Routers
app.use(routes);

// 404 and error handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found :(',
  });
});

app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    // message:'Sorry no user was found with the given ID',
    message: err.message,
    error: {}
  });
});

// set our port
const port = process.env.PORT || 5000;

// start listening on our port
app.listen('port', () => {
  console.log(`Listening on port ${port}`);
});