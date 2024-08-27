import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI; 

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};
