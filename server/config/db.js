const mongoose = require('mongoose');

// Disable buffering so that commands fail immediately if the DB is disconnected
mongoose.set('bufferCommands', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Fail faster if server is down
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\x1b[31m[ERROR]\x1b[0m MongoDB Connection Failed: ${error.message}`);
        console.error('\x1b[33m[TIP]\x1b[0m Please ensure your IP is whitelisted in MongoDB Atlas and your MONGO_URI is correct.');
        console.warn('\x1b[36m[STATUS]\x1b[0m Server will continue running, but database-dependent features will fail.');
        // process.exit(1); // Removed to prevent server crash loop
    }
};

module.exports = connectDB;
