import {Router} from 'express'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { addBlog, deleteBlog, getBlog, getBlogs, getAllBlogs, getBlogBySlug, removeImageFromCloudinary, updatedBlog, uploadImages } from '../controllers/blog.controller.js';


const blogRouter = Router();
// Public routes (no auth required)
blogRouter.get('/public/all', getAllBlogs)
blogRouter.get('/public/slug/:slug', getBlogBySlug)

// Protected routes (auth required)
blogRouter.post('/uploadImages', auth, upload.array('images'), uploadImages)
blogRouter.post('/addBlog', auth, addBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/all', getAllBlogs)

blogRouter.get('/:id', getBlog)
blogRouter.get('/slug/:slug', getBlogBySlug)
blogRouter.delete('/deleteImage' , auth, removeImageFromCloudinary)
blogRouter.delete('/:id' , auth, deleteBlog)
blogRouter.put('/:id' , auth, updatedBlog)


export default blogRouter
