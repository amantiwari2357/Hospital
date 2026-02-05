const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Fail faster if server is down
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('Possible causes: IP not whitelisted in Atlas, or Network/DNS issues.');
        process.exit(1);
    }
};

module.exports = connectDB;
