const express = require('express');
const router = express.Router();
const { subscribe, subscribeMultiple } = require('../controllers/subscribeController');

router.post('/', subscribe);
router.post('/multiple/:userId', subscribeMultiple);

module.exports = router;
