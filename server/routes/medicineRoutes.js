const express = require('express');
const router = express.Router();
const { getMedicines, getMedicineById, createMedicine } = require('../controllers/medicineController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getMedicines)
    .post(protect, admin, createMedicine);

router.route('/:id')
    .get(getMedicineById);

module.exports = router;
