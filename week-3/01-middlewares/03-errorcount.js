const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

app.get('/user', function(req, res) {
  throw new Error("User not found");
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});


// In Express, error handling is done via special middleware functions that have four arguments: err, req, res, and next. The presence of the err argument is what distinguishes error-handling middleware from regular middleware.
app.use(function(err, req, res, next) {
  res.status(404).send({});
  errorCount = errorCount + 1;
});
// Error Parameter (err): The first parameter of the middleware function is err. seeing this err as first argument ,Express automatically passes any errors that occur in the application to this function.


//NOTE : Placement of this middleware
// If you mistakenly place error-handling middleware before your routes, it won't serve its intended purpose because errors haven't occurred yet,Error-handling middleware will be skipped since there's no error upfront.

//hence error handling middleware must be placed after the all the routes,i.e, in the end


module.exports = app;