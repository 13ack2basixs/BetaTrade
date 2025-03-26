const express = require('express');
const router = express.Router();
const { getMarketStatus, getHistoricalData } = require('../controllers/marketController');

router.get('/market-status', getMarketStatus);
router.get('/historical/:symbol', getHistoricalData);

module.exports = router;
