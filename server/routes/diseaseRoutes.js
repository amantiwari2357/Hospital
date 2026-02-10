const express = require('express');
const router = express.Router();
const { getDiseases, getDiseaseById, createDisease, updateDisease, deleteDisease } = require('../controllers/diseaseController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getDiseases);
router.get('/:id', getDiseaseById);
router.post('/', protect, createDisease);
router.put('/:id', protect, updateDisease);
router.delete('/:id', protect, deleteDisease);

module.exports = router;
