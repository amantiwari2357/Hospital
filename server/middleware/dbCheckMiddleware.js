const mongoose = require('mongoose');

const checkDbConnection = (req, res, next) => {
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: 'Database connection is not established. Please whitelist your IP in MongoDB Atlas.',
            status: 'Offline'
        });
    }
    next();
};

module.exports = checkDbConnection;
