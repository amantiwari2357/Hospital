const express = require('express');
const router = express.Router();
const { getStaff, updateStaffMetadata } = require('../controllers/staffController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.route('/').get(getStaff);
router.route('/:id').put(updateStaffMetadata);

module.exports = router;
