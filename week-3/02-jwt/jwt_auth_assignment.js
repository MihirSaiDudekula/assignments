const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const jwtSecret = "mySuperSecretKey"; // Secret key for JWT

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory user database
const USERS = [
  {
    username: "john.doe@gmail.com",
    password: "password123",
    name: "John Doe",
    age: 30,
    city: "New York",
  },
  {
    username: "jane.smith@gmail.com",
    password: "mysecretpassword",
    name: "Jane Smith",
    age: 25,
    city: "San Francisco",
  },
  {
    username: "sam.wilson@gmail.com",
    password: "anotherpassword",
    name: "Sam Wilson",
    age: 35,
    city: "Chicago",
  },
];

// Function to check if a user exists
function getUser(username, password) {
  return USERS.find((user) => user.username === username && user.password === password);
}

// Sign-in route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  const user = getUser(username, password);

  if (!user) {
    return res.status(403).json({ msg: "Invalid username or password" });
  }

  // Generate JWT
  const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is required" });
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = USERS.find((user) => user.username === decoded.username);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return user's profile information
    res.json({
      msg: `Welcome, ${user.name}!`,
      profile: {
        username: user.username,
        name: user.name,
        age: user.age,
        city: user.city,
      },
    });
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
