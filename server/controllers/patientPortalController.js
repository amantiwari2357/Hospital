const PatientPortal = require('../models/PatientPortal');

// @desc    Register new patient
// @route   POST /api/patient-portal/register
// @access  Public
const registerPatient = async (req, res) => {
    try {
        const { name, email, password, age, gender, phone, address, bloodGroup } = req.body;

        // Validation
        if (!name || !email || !password || !age || !gender || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if patient already exists
        const existingPatient = await PatientPortal.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create patient
        const patient = await PatientPortal.create({
            name,
            email,
            password,
            age,
            gender,
            phone,
            address,
            bloodGroup,
            status: 'Active',
            lastVisit: new Date()
        });

        // Generate token
        const token = patient.generateToken();

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: {
                token,
                patient: {
                    id: patient._id,
                    patientId: patient.patientId,
                    name: patient.name,
                    email: patient.email,
                    age: patient.age,
                    gender: patient.gender,
                    phone: patient.phone,
                    bloodGroup: patient.bloodGroup
                }
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
};

// @desc    Login patient
// @route   POST /api/patient-portal/login
// @access  Public
const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find patient
        const patient = await PatientPortal.findOne({ email });
        if (!patient) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordValid = await patient.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last visit
        patient.lastVisit = new Date();
        await patient.save();

        // Generate token
        const token = patient.generateToken();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                patient: {
                    id: patient._id,
                    patientId: patient.patientId,
                    name: patient.name,
                    email: patient.email,
                    age: patient.age,
                    gender: patient.gender,
                    phone: patient.phone,
                    bloodGroup: patient.bloodGroup,
                    status: patient.status
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
};

// @desc    Get patient profile
// @route   GET /api/patient-portal/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const patient = await PatientPortal.findById(req.patient.id)
            .select('-password')
            .populate('assignedDoctor', 'name specialization');

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update patient profile
// @route   PUT /api/patient-portal/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const patient = await PatientPortal.findById(req.patient.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Update allowed fields
        const allowedUpdates = [
            'name', 'age', 'gender', 'phone', 'address',
            'bloodGroup', 'height', 'weight', 'allergies', 'chronicConditions'
        ];

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                patient[field] = req.body[field];
            }
        });

        await patient.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: patient._id,
                patientId: patient.patientId,
                name: patient.name,
                email: patient.email,
                age: patient.age,
                gender: patient.gender,
                phone: patient.phone,
                address: patient.address,
                bloodGroup: patient.bloodGroup,
                height: patient.height,
                weight: patient.weight,
                allergies: patient.allergies,
                chronicConditions: patient.chronicConditions
            }
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all patients (for CRM)
// @route   GET /api/patient-portal/all
// @access  Private (CRM only)
const getAllPatients = async (req, res) => {
    try {
        const patients = await PatientPortal.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });

    } catch (error) {
        console.error('Get all patients error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update patient by Admin (CRM)
// @route   PUT /api/patient-portal/update/:id
// @access  Private (CRM)
const updatePatientByAdmin = async (req, res) => {
    try {
        const patient = await PatientPortal.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        const allowedUpdates = [
            'name', 'age', 'gender', 'phone', 'address',
            'bloodGroup', 'status', 'height', 'weight',
            'allergies', 'chronicConditions'
        ];

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                patient[field] = req.body[field];
            }
        });

        await patient.save();

        res.status(200).json({
            success: true,
            message: 'Patient updated successfully',
            data: patient
        });

    } catch (error) {
        console.error('Admin update error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    registerPatient,
    loginPatient,
    getProfile,
    updateProfile,
    getAllPatients,
    updatePatientByAdmin
};
