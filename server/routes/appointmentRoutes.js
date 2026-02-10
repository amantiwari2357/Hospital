const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, getDoctorSpecialities, getPublicDoctors } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/specialities', getDoctorSpecialities);
router.get('/doctors', getPublicDoctors);
router.route('/').get(protect, getAppointments).post(protect, createAppointment);

module.exports = router;
