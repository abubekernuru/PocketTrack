const express = require('express');
const { getSummary, getCategorySummary, getMonthlySummary } = require('../controllers/analytics.controller.js');
const { verifyUser } = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/summary', verifyUser, getSummary);
router.get('/by-category', verifyUser, getCategorySummary);
router.get('/monthly-summary', verifyUser, getMonthlySummary);

module.exports = router;