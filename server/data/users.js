const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Aman (Admin)',
        email: 'er.aman.aktu@gmail.com',
        password: 'password123',
        role: 'super-admin',
        isAdmin: true,
    },
    {
        name: 'Admin User',
        email: 'admin@hospital.com',
        password: 'password123',
        role: 'super-admin',
        isAdmin: true,
    },
    {
        name: 'Dr. Sarah Smith',
        email: 'sarah@hospital.com',
        password: 'password123',
        role: 'doctor',
        isAdmin: false,
    },
    {
        name: 'Nurse Sarah J.',
        email: 'nurse@hospital.com',
        password: 'password123',
        role: 'nurse',
        isAdmin: false,
    }
];

module.exports = users;
