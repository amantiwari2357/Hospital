const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Debug Tip: Log the auth header to verify token presence if needed

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from DB (check both User and PatientPortal collections)
            const user = await User.findById(decoded.id).select('-password');

            if (user) {
                req.user = user;
            } else {
                // If not found in User collection, check PatientPortal collection
                // This is required for website users booking appointments
                const PatientPortal = require('../models/PatientPortal');
                const patient = await PatientPortal.findById(decoded.id).select('-password');

                if (patient) {
                    req.user = patient;
                    req.isPatient = true; // Flag to identify patient users
                } else {
                    return res.status(401).json({ message: "User not found" });
                }
            }

            next();
        } catch (error) {
            console.error("JWT Error:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed: " + error.message });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

const admin = (req, res, next) => {
    if (req.user && (req.user.role === 'super-admin' || req.user.role === 'admin' || req.user.isAdmin)) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
