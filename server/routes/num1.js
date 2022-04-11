const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const num1Controller = require('../controllers/num1Controller');

router.get('/', num1Controller.read);
router.post('/fiind', num1Controller.find);
// this poitns to space keydown ^| form btn
// router.post('/meal_no_ingredients', upload.none(), num1Controller.meal_no_ingredients);
router.post('/generate_meal', upload.none(), num1Controller.generateMeal);

router.get('/add-dish', num1Controller.add);

module.exports = router;