const express = require('express');
const { addTransaction, getTransactions, getSummary, getCategorySummary, updateTransaction, deleteTransaction, getTransaction } = require('../controllers/transaction.controller.js');
const { verifyUser } = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/', verifyUser, addTransaction);
router.get('/',verifyUser, getTransactions);
router.get('/summary', verifyUser, getSummary);
router.get('/by-category', verifyUser, getCategorySummary);
router.put('/update/:trxnId', verifyUser, updateTransaction)
router.delete('/delete/:trxnId', verifyUser, deleteTransaction)

module.exports = router;