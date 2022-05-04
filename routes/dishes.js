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
dishes.get('/dishes', upload.none(), dishesController.dishes);
dishes.get('/dishes/search', upload.none(), dishesController.dishesSearch);

// UPDATE

// DELETE
dishes.get('/delete-dish', dishesController.deleteDishPage);
dishes.delete('/delete-dish', upload.none(), dishesController.deleteDish);

export default dishes;