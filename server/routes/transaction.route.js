const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transaction.controller.js');
const { verifyUser } = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/', verifyUser, addTransaction);
router.get('/',verifyUser, getTransactions)

module.exports = router;