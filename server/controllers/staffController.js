const User = require('../models/User');

// @desc    Get all staff (doctors, nurses, etc.)
// @route   GET /api/staff
// @access  Private (Admin)
const getStaff = async (req, res) => {
    try {
        const staff = await User.find({}).select('-password');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update staff metadata
// @route   PUT /api/staff/:id
// @access  Private (Admin)
const updateStaffMetadata = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.specialization = req.body.specialization || user.specialization;
            user.department = req.body.department || user.department;
            user.roleDescription = req.body.roleDescription || user.roleDescription;
            user.rating = req.body.rating !== undefined ? req.body.rating : user.rating;
            user.image = req.body.image || user.image;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                specialization: updatedUser.specialization,
                department: updatedUser.department,
                roleDescription: updatedUser.roleDescription,
                rating: updatedUser.rating,
                image: updatedUser.image,
            });
        } else {
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getStaff, updateStaffMetadata };
