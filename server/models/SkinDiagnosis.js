const mongoose = require('mongoose');

const skinDiagnosisSchema = mongoose.Schema({
    patientName: { type: String },
    patientId: { type: String },
    phone: { type: String },
    email: { type: String },
    imageUrl: { type: String, required: true }, // Base64 or URL
    status: {
        type: String,
        enum: ['Processing', 'Pending Review', 'Reviewed', 'Follow-up Scheduled', 'Failed'],
        default: 'Processing'
    },
    aiAnalysis: {
        condition: { type: String },
        confidence: { type: String },
        severity: { type: String }, // Mild, Moderate, Severe
        description: { type: String },
        suggestions: [{ type: String }],
        isUrgent: { type: Boolean, default: false }
    },
    doctorNotes: { type: String },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date }
}, {
    timestamps: true
});

const SkinDiagnosis = mongoose.model('SkinDiagnosis', skinDiagnosisSchema);
module.exports = SkinDiagnosis;
