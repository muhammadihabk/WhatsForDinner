const express = require('express');
const router = express.Router();

const num1Controller = require('../controllers/num1Controller');

router.get('/', num1Controller.read);
router.post('/fiind', num1Controller.find);

module.exports = router;