const jwt = require('jsonwebtoken');
const PatientPortal = require('../models/PatientPortal');

const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('Auth Middleware - Token:', token ? 'Found' : 'Missing');

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            console.log('Auth Middleware - Decoded ID:', decoded.id);

            // Get patient from token
            req.patient = await PatientPortal.findById(decoded.id).select('-password');

            if (!req.patient) {
                return res.status(401).json({
                    success: false,
                    message: 'Patient not found'
                });
            }

            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }
};

module.exports = { protect };
