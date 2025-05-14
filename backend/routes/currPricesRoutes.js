const express = require('express');
const router = express.Router();
const { getPricesForUser } = require('../controllers/currPricesController');

router.get('/:userId', getPricesForUser);

module.exports = router;
