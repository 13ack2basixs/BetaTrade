const express = require('express');
const router = express.Router();
const { trade } = require('../controllers/tradeController');

router.post('/', trade);

module.exports = router;
