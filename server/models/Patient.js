const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    diagnosis: { type: String },
    status: { type: String, enum: ['Stable', 'Critical', 'Observation', 'Discharged'], default: 'Stable' },
    bedNumber: { type: String },
    ward: { type: String },
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vitals: {
        heartRate: { type: Number },
        bloodPressure: { type: String }, // e.g., "120/80"
        temperature: { type: Number },
        oxygenSaturation: { type: Number }
    },
    admissionDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
