const express = require('express');
const router = express.Router();
const { getCompanyProfile } = require('../controllers/companyProfileController');

router.get('/:symbol', getCompanyProfile);

module.exports = router;
