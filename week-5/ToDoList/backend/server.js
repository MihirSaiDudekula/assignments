require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createTodo,updateTodo } = require('./validators/todoValidator');

const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Todo = require('./models/todoModel');

app.use(express.json());
const cors = require('cors');
// List of allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173'
];

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow request if the origin is in the list or if no origin is provided (e.g., for server-to-server requests)
      callback(null, true);
    } else {
      // Reject request if origin is not in the list
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.post("/todo", async (req, res) => {
  try {
    const createPayload = req.body;

    // Validate and parse data using Zod schema
    const parsedPayload = createTodo.safeParse(createPayload);

    // Check if the validation was successful
    if (!parsedPayload.success) {
      // Return an error response if validation fails
      res.status(411).json({
        msg: "You sent the Wrong Inputs",
        errors: parsedPayload.error.errors, // Optional: Include validation errors for debugging
      });
      return;
    }

    // Extract validated data from parsedPayload.data
    const { title, description } = parsedPayload.data;

    // Create a new todo item in the database
    const newTodo = await Todo.create({
      title,
      description,
      completed: false
    });

    // Send a success response with the created todo item
    res.json({
      msg: "Todo Created",
      todo: newTodo
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      msg: "Internal server error"
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json({
      todos: todos
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      msg: "Internal server error"
    });
  }
});

app.put("/completed", async (req, res) => {
  try {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);

    // Check if the validation was successful
    if (!parsePayload.success) {
      return res.status(411).json({
        msg: "You sent the Wrong Input",
      });
    }

    // Extract the validated ID
    const { id } = parsePayload.data;

    // Update the todo item to mark it as completed
    const result = await Todo.updateOne(
      { _id: id },
      { $set: { completed: true } }
    );

    // Check if the todo item was found and updated
    if (result.nModified === 0) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo Marked as Completed" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});


app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the todo item with the specified ID
    const result = await Todo.deleteOne({ _id: id });

    // Check if a document was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
