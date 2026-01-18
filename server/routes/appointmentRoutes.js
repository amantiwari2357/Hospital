const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAppointments).post(protect, createAppointment);

module.exports = router;
