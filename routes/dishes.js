import express from 'express';
import multer from 'multer';
import * as dishesController from '../controllers/dishesController.js';

const dishes = express.Router();
const upload = multer();

// CRUD

// CREATE
// /dishes/add
dishes.get('/dishes/add', dishesController.addDishPage);
dishes.post('/dishes/add', upload.none(), dishesController.addDish);

// READ
dishes.get('/dishes', upload.none(), dishesController.dishes);
dishes.get('/dishes/search', upload.none(), dishesController.dishesSearch);
dishes.get('/dishes/ingredients/names', dishesController.ingredientNames);

// UPDATE

// DELETE
dishes.get('/delete-dish', dishesController.deleteDishPage);
dishes.delete('/delete-dish', upload.none(), dishesController.deleteDish);

export default dishes;