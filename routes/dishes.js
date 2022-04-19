import express from 'express';
import multer from 'multer';
import * as dishesController from '../controllers/dishesController.js';

const dishes = express.Router();
const upload = multer();

// CRUD
// CREATE
// READ
dishes.post('/generate_meal', upload.none(), dishesController.generateMeal);
// UPDATE
// DELETE
dishes.post('/find', dishesController.find);
dishes.get('/add-dish', dishesController.add);

export default dishes;