const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    symptoms: [{ type: String }],
    treatments: [{ type: String }],
    image: { type: String }
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema);
module.exports = Disease;
