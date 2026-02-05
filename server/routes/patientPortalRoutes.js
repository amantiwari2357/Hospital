const express = require('express');
const router = express.Router();
const {
    registerPatient,
    loginPatient,
    getProfile,
    updateProfile,
    getAllPatients,
    updatePatientByAdmin
} = require('../controllers/patientPortalController');
const { protect } = require('../middleware/patientAuth');

// Public routes
router.post('/register', registerPatient);
router.post('/login', loginPatient);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// CRM route (get all patients)
router.get('/all', getAllPatients);
router.put('/update/:id', updatePatientByAdmin);

module.exports = router;
