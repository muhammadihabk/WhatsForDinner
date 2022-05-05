import express from 'express';
import multer from 'multer';
import * as dishesController from '../controllers/dishesController.js';

const dishes = express.Router();
const upload = multer();

// CRUD

// CREATE
// Add dish
dishes.get('/dishes/add', dishesController.addDishPage);
dishes.get('/dishes/ingredients/names', dishesController.ingredientNames);
dishes.post('/dishes/add', upload.none(), dishesController.addDish);

// READ
// Generate meal
dishes.get('/dishes', upload.none(), dishesController.dishes);
// Search for a dish
dishes.get('/dishes/search', upload.none(), dishesController.dishesSearch);

// UPDATE

// DELETE
// Delete a dish
dishes.get('/delete-dish', dishesController.deleteDishPage);
dishes.delete('/delete-dish', upload.none(), dishesController.deleteDish);

export default dishes;