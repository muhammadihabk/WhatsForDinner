const express = require('express');
const router = express.Router();

const num1Controller = require('../controllers/num1Controller');

router.get('/', num1Controller.read);
router.post('/fiind', num1Controller.find);
router.get('/add-dish', num1Controller.add);

module.exports = router;