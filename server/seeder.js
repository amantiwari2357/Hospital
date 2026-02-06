const dotenv = require('dotenv');
const users = require('./data/users');
const patients = require('./data/patients');
const medicines = require('./data/medicines');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const Medicine = require('./models/Medicine');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Appointment.deleteMany();
        await Patient.deleteMany();
        await User.deleteMany();
        await Medicine.deleteMany();

        // Use loop to trigger pre-save middleware for password hashing
        const createdUsers = [];
        for (const user of users) {
            const newUser = await User.create(user);
            createdUsers.push(newUser);
        }
        const doctor = createdUsers.find(u => u.role === 'doctor');

        // Assign doctor to patients
        const samplePatients = patients.map(p => {
            return { ...p, assignedDoctor: doctor._id };
        });

        await Patient.insertMany(samplePatients);

        // Seed Medicines
        await Medicine.insertMany(medicines);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Appointment.deleteMany();
        await Patient.deleteMany();
        await User.deleteMany();
        await Medicine.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
