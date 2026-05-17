const express = require('express');
const { verifyUser } = require('../middleware/auth.middleware');
const { updateUser, deleteUser, logoutUser } = require('../controllers/user.controller');
const router = express.Router();

router.put('/update/:userId', verifyUser, updateUser);
router.delete('/delete/:userId', verifyUser, deleteUser);
router.post('/logout', verifyUser, logoutUser);

module.exports = router;