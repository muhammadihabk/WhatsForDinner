const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const dishesController = require('../controllers/dishesController');

// CRUD
// CREATE
// READ
router.post('/generate_meal', upload.none(), dishesController.generateMeal);
// UPDATE
// DELETE
router.post('/find', dishesController.find);
router.get('/add-dish', dishesController.add);

module.exports = router;