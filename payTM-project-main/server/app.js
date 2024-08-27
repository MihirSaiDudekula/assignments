import express from 'express';
import cors from 'cors';
import router from './routes/index.js'; 
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/api/v1', router); 

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


