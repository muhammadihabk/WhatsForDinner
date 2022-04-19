import express from 'express';
import multer from 'multer';
import * as dishesController from '../controllers/dishesController.js';

const dishes = express.Router();
const upload = multer();

// CRUD
// CREATE
dishes.get('/add-dish', dishesController.addDishPage);
dishes.post('/add-dish', upload.none(), dishesController.addDish);
// READ
dishes.post('/generate_meal', upload.none(), dishesController.generateMeal);
dishes.post('/search', upload.none(), dishesController.search);
// UPDATE
// DELETE

export default dishes;