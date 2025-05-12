const express = require('express');
const router = express.Router();
const { depositFunds, getCashAndAssets } = require('../controllers/depositController');

router.post('/deposit', depositFunds);
router.post('/cash-and-assets', getCashAndAssets);


module.exports = router;
