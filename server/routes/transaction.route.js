const express = require('express');
const { addTransaction, getTransactions, getSummary, getCategorySummary } = require('../controllers/transaction.controller.js');
const { verifyUser } = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/', verifyUser, addTransaction);
router.get('/',verifyUser, getTransactions);
router.get('/summary', verifyUser, getSummary);
router.get('/category-summary', verifyUser, getCategorySummary);

module.exports = router;