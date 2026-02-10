const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
