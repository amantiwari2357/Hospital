const express = require('express');
const router = express.Router();
const { analyzeSkin, getAllDiagnoses, updateDiagnosisStatus } = require('../controllers/skinDiagnosisController');
const { protect } = require('../middleware/authMiddleware');

// Public route for analysis and updating (consultation request)
router.post('/analyze', analyzeSkin);
router.put('/:id', updateDiagnosisStatus);

// Protected routes for CRM management
router.get('/', protect, getAllDiagnoses);

module.exports = router;
