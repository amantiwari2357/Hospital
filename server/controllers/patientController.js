const Patient = require('../models/Patient');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
const getPatients = async (req, res) => {
    const patients = await Patient.find({});
    res.json(patients);
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ message: 'Patient not found' });
    }
};

module.exports = { getPatients, getPatientById };
