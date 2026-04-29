const express = require('express');
const { register, login, checkUser } = require('../controllers/auth.controller.js');
const {verifyUser} = require('../middleware/auth.middleware.js')
const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.get('/checkUser',verifyUser, checkUser)

module.exports = router;