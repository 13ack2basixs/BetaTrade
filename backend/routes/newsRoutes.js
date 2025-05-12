const express = require('express');
const router = express.Router();
const { getLatestNews } = require('../controllers/newsController');

router.get('/latest', getLatestNews);

module.exports = router;
