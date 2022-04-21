import express from 'express';
import multer from 'multer';
import * as dishesController from '../controllers/dishesController.js';

const dishes = express.Router();
const upload = multer();

// CRUD
// CREATE
dishes.get('/add-dish', dishesController.addDishPage);
dishes.post('/add-dish', upload.none(), dishesController.addDish);
dishes.get('/ingredientNames', dishesController.ingredientNames);
// READ
dishes.post('/generate_meal', upload.none(), dishesController.generateMeal);
dishes.post('/search', upload.none(), dishesController.search);
// UPDATE
// DELETE
dishes.get('/delete-dish', dishesController.deleteDishPage);
dishes.delete('/delete-dish', upload.none(), dishesController.deleteDish);

export default dishes;