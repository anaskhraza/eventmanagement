import express from 'express';
import path from "path"
import CategoryController from '../controllers/CategoryController';

const router = express.Router();

const categoryController = new CategoryController();

// declare routes 
router.get('/', categoryController.fetchAllCategories);
router.get('/:id', categoryController.fetchCategory);
router.post('/create', categoryController.createCategory);
router.delete('/delete', categoryController.deleteCategory);
router.post('/createBulkCategory', categoryController.createBulkCategory);


module.exports = router;