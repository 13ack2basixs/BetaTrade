const express = require('express');
const router = express.Router();
const { trade, getAllTrades } = require('../controllers/tradeController');

router.post('/', trade);
router.get('/', getAllTrades);

module.exports = router;
