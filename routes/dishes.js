import express from 'express';
import multer from 'multer';
import * as dishesController from '../controllers/dishesController.js';

const dishes = express.Router();
const upload = multer();

// CRUD
// CREATE
// READ
dishes.post('/generate_meal', upload.none(), dishesController.generateMeal);
dishes.post('/search', upload.none(), dishesController.search);
// UPDATE
// DELETE
dishes.get('/add-dish', dishesController.add);

export default dishes;