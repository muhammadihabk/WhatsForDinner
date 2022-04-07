const express = require('express');
const router = express.Router();

const num1Controller = require('../controllers/num1Controller');

router.get('/', num1Controller.read);

module.exports = router;