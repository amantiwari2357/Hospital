const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    usage: { type: String, required: true },
    image: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
    prescriptionRequired: { type: Boolean, required: true, default: false },
    customId: { type: String, unique: true } // Preserving the string ID from static data
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;
