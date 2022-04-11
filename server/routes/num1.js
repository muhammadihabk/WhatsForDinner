const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(upload.array());

const num1Controller = require('../controllers/num1Controller');

router.get('/', num1Controller.read);
router.post('/fiind', num1Controller.find);
// this poitns to space keydown ^| form btn
router.get('/meal_no_ingredients', num1Controller.meal_no_ingredients);
router.post('/meal_ingredients', upload.none(), num1Controller.meal_ingredients);

router.get('/add-dish', num1Controller.add);

module.exports = router;