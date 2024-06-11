const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();

// Let's trace an example where a user with user-id: "123" sends multiple requests.

// Initial State
// numberOfRequestsForUser: {} (empty)
// 1. First Request
// Headers: {"user-id": "123"}
// Current State:
// numberOfRequestsForUser["123"] does not exist.
// Initialize numberOfRequestsForUser["123"] to 1.
// Call next().
// Response: Depends on the route handler (e.g., GET /user returns {"name": "john"}).
// 2. Second Request (within the same second)
// Headers: {"user-id": "123"}
// Current State:
// numberOfRequestsForUser["123"] exists and is 1.
// Increment numberOfRequestsForUser["123"] to 2.
// Call next().
// Response: Depends on the route handler (e.g., POST /user returns {"msg": "created dummy user"}).
// 3. Third, Fourth, and Fifth Requests (within the same second)
// Headers: {"user-id": "123"}
// Current State:
// Each request increments numberOfRequestsForUser["123"] by 1.
// For the fifth request, numberOfRequestsForUser["123"] becomes 5.
// Call next() for each request.
// Response: Depends on the route handler.
// 4. Sixth Request (within the same second)
// Headers: {"user-id": "123"}
// Current State:
// numberOfRequestsForUser["123"] is 5.
// Increment numberOfRequestsForUser["123"] to 6.
// Since the count exceeds 5, respond with 404 status and "no entry" message.
// Response: 404 {"message": "no entry"}.
// 5. New Second Interval
// After one second, setInterval resets numberOfRequestsForUser.
// State Reset: numberOfRequestsForUser is now {} (empty).
// The user can make 5 new requests in the new second.
// Using an Object for Tracking Requests
// Why an Object?: An object is used to map each user ID to their request count. This allows for easy and quick access and update operations.
// Example:
// If numberOfRequestsForUser is { "123": 4, "456": 2 }, it means user "123" has made 4 requests and user "456" has made 2 requests.
// When a request from user "123" comes in, the middleware simply increments numberOfRequestsForUser["123"].
// This allows the server to efficiently track and limit requests per user.
app.use((req,res,next)=>{
  const id = req.headers['user-id'];
  // check if any requests for that id exist
  if(numberOfRequestsForUser[id])
  {
    //this id already has seen more than once
    numberOfRequestsForUser[id]++;
    if (numberOfRequestsForUser[userId] > 5) {
      res.status(404).send("no entry");
    } else {
      next();
    }
  }
  else 
  {
    numberOfRequestsForUser[userId] = 1;
    next();
  }

});
//

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;