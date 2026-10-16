import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './routes/user.route.js';
import leadRouter from './routes/lead.route.js';
import blogRouter from './routes/blog.route.js';
import categoryRouter from './routes/category.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy :false
}))

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple route to check server is working
app.get("/", (request, response) => {
  response.json({
      message: `Hello World! Server is running on port ${process.env.PORT}`
  });
});

app.use('/api/user', userRouter)
app.use('/api/lead', leadRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)

// Connect to the database and start the server
import UserModel from './models/user.model.js';
import CategoryModel from './models/category.model.js';
import BlogModel from './models/blog.model.js';
import LeadModel from './models/lead.model.js';

connectDB().then(() => {
    
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
});

