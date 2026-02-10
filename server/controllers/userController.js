const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.licenseId = req.body.licenseId || user.licenseId;
            user.bio = req.body.bio || user.bio;
            user.tags = req.body.tags || user.tags;
            user.schedule = req.body.schedule || user.schedule;
            user.isOnCall = req.body.isOnCall !== undefined ? req.body.isOnCall : user.isOnCall;
            user.socialLinks = req.body.socialLinks || user.socialLinks;
            user.image = req.body.image || user.image; // Add image update support

            // Handle password update if provided
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                licenseId: updatedUser.licenseId,
                bio: updatedUser.bio,
                tags: updatedUser.tags,
                schedule: updatedUser.schedule,
                isOnCall: updatedUser.isOnCall,
                socialLinks: updatedUser.socialLinks,
                role: updatedUser.role,
                isAdmin: updatedUser.isAdmin,
                image: updatedUser.image,
                token: req.headers.authorization.split(' ')[1] // Return existing token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getUserProfile, updateUserProfile };
