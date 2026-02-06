const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }, // Link to patient if registered
    patientPortalId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientPortal' }, // Link to website user
    patientName: { type: String }, // For unregistered patients or quick booking
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // e.g., "09:30 AM"
    type: { type: String, enum: ['Check-up', 'Consultation', 'Follow-up', 'Emergency', 'Vaccination', 'Surgery'], default: 'Check-up' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
    department: { type: String, required: true },
    notes: { type: String },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
