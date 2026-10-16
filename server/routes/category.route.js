import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createCategory, deleteCategory, getCategories, getCategoriesCount, getCategory, getSubCategoriesCount, updatedCategory, deleteMultipleCategories } from '../controllers/category.controller.js';

const categoryRouter = Router();

// Public routes (no auth required)
categoryRouter.get('/public', getCategories);

// Protected routes (auth required)
categoryRouter.post('/create', auth, createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/get/count', getCategoriesCount);
categoryRouter.get('/get/count/subCat', getSubCategoriesCount);
categoryRouter.get('/:id', getCategory);
categoryRouter.delete('/:id', auth, deleteCategory);
categoryRouter.put('/:id', auth, updatedCategory);
categoryRouter.post('/deleteMultipleCategory', auth, deleteMultipleCategories);

export default categoryRouter;

