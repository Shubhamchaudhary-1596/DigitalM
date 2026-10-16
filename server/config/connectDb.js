// config/connectDb.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function connectDB () {
    try {
        // Connect to MongoDB using the URL from the .env file
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;
 