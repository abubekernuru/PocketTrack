const express = require('express');
const { addTransaction } = require('../controllers/transaction.controller');
const { verifyUser } = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/', verifyUser, addTransaction)

module.exports = router;