const express = require('express');
const { getSummary, getCategorySummary } = require('../controllers/analytics.controller.js');
const { verifyUser } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/summary', verifyUser, getSummary);
router.get('/by-category', verifyUser, getCategorySummary);

module.exports = router;