const express = require('express');
const router = express.Router();
const { analyzeSkin, getDiagnoses, updateDiagnosis } = require('../controllers/skinDiagnosisController');
const { protect } = require('../middleware/authMiddleware');

// Public route for analysis
router.post('/analyze', analyzeSkin);

// Protected routes for CRM management
router.route('/').get(protect, getDiagnoses);
router.route('/:id').put(protect, updateDiagnosis);

module.exports = router;
