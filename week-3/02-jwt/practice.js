const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  const user = ALL_USERS.find((user) => user.username === username && user.password === password);
  return user ? true : false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token part after 'Bearer'
  if (!token) {
    return res.status(403).json({
      msg: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // You can now use the username to filter users if needed
    const otherUsers = ALL_USERS.filter(user => user.username !== username);
    return res.json(otherUsers);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
