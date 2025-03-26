const express = require('express');
const router = express.Router();
const { getPortfolio, getTransactions } = require('../controllers/portfolioController');

router.get('/portfolio/:userId', getPortfolio);
router.get('/transactions/:userId', getTransactions);

module.exports = router;
