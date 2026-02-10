const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['super-admin', 'admin', 'doctor', 'nurse'], default: 'doctor' },
    specialization: { type: String },
    department: { type: String },
    roleDescription: { type: String },
    rating: { type: Number, default: 0 },
    image: { type: String },
    phone: { type: String },
    licenseId: { type: String },
    bio: { type: String },
    tags: [{ type: String }],
    schedule: [{
        day: { type: String },
        slots: [{
            time: { type: String },
            label: { type: String }
        }]
    }],
    isOnCall: { type: Boolean, default: true },
    socialLinks: {
        linkedin: { type: String },
        twitter: { type: String },
        facebook: { type: String }
    },
    isAdmin: { type: Boolean, default: false, required: true },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
