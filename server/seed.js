const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Disease = require('./models/Disease');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const diseasesData = [];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Seed Diseases
        await Disease.deleteMany({});
        await Disease.insertMany(diseasesData);
        console.log('Dermatological Records Seeded Successfully.');

        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
