const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const patientSchema = mongoose.Schema({
    // Authentication Fields
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    patientId: {
        type: String,
        unique: true,
        required: true
    },

    // Personal Information
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: true },
    address: { type: String },

    // Medical Information
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    height: { type: String }, // e.g., "178 cm"
    weight: { type: String }, // e.g., "72 kg"
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],

    // Hospital Management Fields
    diagnosis: { type: String },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Stable', 'Critical', 'Observation', 'Discharged'],
        default: 'Active'
    },
    bedNumber: { type: String },
    ward: { type: String },
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Vitals
    vitals: {
        heartRate: { type: Number },
        bloodPressure: { type: String }, // e.g., "120/80"
        temperature: { type: Number },
        oxygenSaturation: { type: Number }
    },

    // Tracking
    admissionDate: { type: Date },
    lastVisit: { type: Date, default: Date.now },

    // Statistics (for CRM display)
    appointments: { type: Number, default: 0 },
    prescriptions: { type: Number, default: 0 },
    orders: { type: Number, default: 0 }

}, { timestamps: true });

// Hash password before saving
patientSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
patientSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
patientSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id, patientId: this.patientId, email: this.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
    );
};

// Generate unique patient ID before validation
patientSchema.pre('validate', async function () {
    if (!this.patientId) {
        // Generate patient ID like P-992834
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        this.patientId = `P-${randomNum}`;

        // Check if it already exists
        const existing = await mongoose.model('PatientPortal').findOne({ patientId: this.patientId });
        if (existing) {
            // If exists, try one more time (simple collision avoidance)
            const newRandom = Math.floor(100000 + Math.random() * 900000);
            this.patientId = `P-${newRandom}`;
        }
    }
});

const PatientPortal = mongoose.model('PatientPortal', patientSchema);
module.exports = PatientPortal;
