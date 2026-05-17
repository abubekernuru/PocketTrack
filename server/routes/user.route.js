const express = require('express');
const { verifyUser } = require('../middleware/auth.middleware');
const { updateUser } = require('../controllers/user.controller');
const router = express.Router();

router.put('/update/:userId', verifyUser, updateUser)

module.exports = router;